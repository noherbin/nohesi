// Vehicle dynamics: bicycle model with Pacejka-style tyres, load transfer, friction ellipse,
// engine torque curves, gearbox with auto/manual shifting, turbo boost, aero drag and downforce.
// 2D frame: X right, Y forward, heading clockwise from +Y, yaw rate positive = turning right.
import { clamp, lerp, lookup, MPH_TO_MS } from '../core/utils.js';

const G = 9.81;
const RHO = 1.225;
const ETA = 0.86; // drivetrain efficiency

const CURVES = {
  na: [[0, 0.5], [0.15, 0.58], [0.3, 0.7], [0.45, 0.82], [0.6, 0.92], [0.72, 0.98], [0.8, 1.0], [0.9, 0.97], [1.0, 0.9], [1.08, 0.7], [1.2, 0.3]],
  turbo: [[0, 0.42], [0.15, 0.55], [0.25, 0.86], [0.33, 1.0], [0.62, 1.0], [0.75, 0.95], [0.88, 0.86], [1.0, 0.76], [1.08, 0.55], [1.2, 0.25]],
  sc: [[0, 0.62], [0.15, 0.75], [0.3, 0.88], [0.45, 0.96], [0.6, 1.0], [0.75, 0.98], [0.88, 0.93], [1.0, 0.86], [1.08, 0.62], [1.2, 0.3]],
};

/** Normalised Pacejka magic formula (peak ~1). */
function MF(alpha, B, C = 1.45, E = -0.2) {
  const x = B * alpha;
  return Math.sin(C * Math.atan(x - E * (x - Math.atan(x))));
}

export class VehiclePhysics {
  constructor(def, custom = {}) {
    this.configure(def, custom);
    this.reset(0, 0, 0, 0);
  }

  configure(def, custom = {}) {
    const p = def.phys, b = def.body;
    this.def = def;
    this.m = p.mass;
    this.L = b.wb;
    this.b = this.L * p.weightFront; // CG to rear axle
    this.a = this.L - this.b; // CG to front axle
    const lowered = custom.suspension === 'slammed' ? 2 : custom.suspension === 'lowered' ? 1 : 0;
    this.h = p.cgH - lowered * 0.02;
    this.track = b.W - 0.3;
    this.Iz = this.m * this.a * this.b * (p.inertia ?? 1);
    this.rw = b.wr;
    this.mu = p.grip;
    this.B = p.tireB;
    this.brakeForce = p.brakeG * this.m * G;
    this.brakeBias = 0.64;
    this.lockRad = (p.steerLock * Math.PI) / 180;
    this.drive = p.drive;
    this.frontSplit = p.drive === 'FWD' ? 1 : p.drive === 'RWD' ? 0 : p.frontSplit;
    this.rollStiffFront = p.drive === 'FWD' ? 0.62 : 0.55;
    this.idle = p.idle;
    this.redline = p.redline;
    this.limiter = p.limiter;
    this.curve = CURVES[p.curve] || CURVES.na;
    this.isTurbo = !!def.engine.turbo;
    this.turboLag = p.turboLag || 0.5;
    this.shiftTime = p.shiftTime ?? 0.18;
    this.downforce = (p.downforce ?? 0.2) * (custom.spoiler === 'gt' ? 1.35 : custom.spoiler === 'wing' ? 1.15 : 1) * (custom.kit === 'aggressive' || custom.kit === 'wide' ? 1.1 : 1);
    this.gripBonus = (custom.kit === 'wide' ? 1.03 : 1) * (lowered ? 1.01 : 1);
    this.rollGain = p.rollGain * (1 - lowered * 0.18);
    this.susFreq = p.susFreq * (1 + lowered * 0.12);
    // power scaling (exhaust upgrades)
    const hpMul = custom.exhaust === 'straight' ? 1.06 : custom.exhaust === 'sport' ? 1.03 : 1;
    this.hp = p.hp * hpMul;
    // Torque scale so peak power == hp
    let best = 0, bestX = 0.8;
    for (let x = 0.2; x <= 1.0; x += 0.005) {
      const pw = lookup(this.curve, x) * x;
      if (pw > best) { best = pw; bestX = x; }
    }
    const omegaRed = (this.redline * 2 * Math.PI) / 60;
    this.Tpeak = (this.hp * 745.7) / (best * omegaRed);
    this.powerRpm = bestX * this.redline;
    // Gearing: top gear reaches top speed at the power peak
    this.gears = p.gears.slice();
    const vTop = p.topSpeed * MPH_TO_MS;
    const wTop = (this.powerRpm * 1.02 * 2 * Math.PI) / 60;
    this.finalDrive = (wTop * this.rw) / (vTop * this.gears[this.gears.length - 1]);
    this.reverseRatio = 3.3;
    // Aero drag so that power balances drag at top speed
    const Pw = this.hp * 745.7 * ETA;
    const roll = 0.013 * this.m * G * vTop;
    this.CdA = Math.max(0.45, (2 * (Pw - roll)) / (RHO * vTop * vTop * vTop));
    this.ClA = this.downforce;
    this.vTop = vTop;
    this.gripMul = 1;
  }

  reset(X, Y, heading, speed) {
    this.X = X;
    this.Y = Y;
    this.heading = heading;
    this.VX = Math.sin(heading) * speed;
    this.VY = Math.cos(heading) * speed;
    this.omega = 0;
    this.u = speed;
    this.v = 0;
    this.ax = 0;
    this.ay = 0;
    this.axS = 0;
    this.ayS = 0;
    this.gear = speed > 1 ? this._bestGear(speed) : 1;
    this.rpm = this.idle;
    this.shiftT = 0;
    this.limiterT = 0;
    this.boost = 0;
    this.throttleEff = 0;
    this.steerAngle = 0;
    this.slipF = 0;
    this.slipR = 0;
    this.wheelspin = 0;
    this.skid = 0;
    this.revHold = 0;
    this.events = [];
    this.wheelRot = 0;
    this.wheelRotF = 0;
    this.lastThrottle = 0;
    this.offThrottleT = 0;
    this.shiftCooldown = 0;
    this.manualHold = 0;
  }

  _bestGear(u) {
    for (let g = 1; g <= this.gears.length; g++) {
      const rpm = this._rpmFor(u, g);
      if (rpm < this.redline * 0.82) return g;
    }
    return this.gears.length;
  }

  _rpmFor(u, g) {
    const ratio = this.gears[g - 1] * this.finalDrive;
    return (Math.abs(u) / this.rw) * ratio * 60 / (2 * Math.PI);
  }

  torqueAt(rpm) {
    return this.Tpeak * lookup(this.curve, rpm / this.redline);
  }

  /** Maximum road-wheel steer angle at current speed (speed-sensitive steering). */
  steerLimit(sens = 1) {
    const u = Math.max(Math.abs(this.u), 1);
    const grip = this.mu * this.gripMul;
    const aTarget = grip * G * 1.02;
    // at speed the full key press asks for roughly the car's grip limit: small taps = small corrections
    return Math.min(this.lockRad, ((this.L * aTarget) / (u * u) + 0.0085 + 0.03 / (1 + u * 0.12)) * sens);
  }

  shiftUp() {
    if (this.gear < 1) { this.gear = 1; return; }
    if (this.gear >= this.gears.length || this.shiftT > 0) return;
    this.gear++;
    this.shiftT = this.shiftTime;
    this.events.push({ type: 'shift', dir: 1 });
  }

  shiftDown() {
    if (this.shiftT > 0) return;
    if (this.gear > 1) {
      const rpm = this._rpmFor(this.u, this.gear - 1);
      if (rpm > this.limiter * 1.02) return; // protect engine
      this.gear--;
      this.shiftT = this.shiftTime * 0.8;
      this.events.push({ type: 'shift', dir: -1 });
    } else if (this.gear === 1 && Math.abs(this.u) < 1.5) {
      this.gear = -1;
    }
  }

  /**
   * Advance the simulation.
   * input: { throttle, brake, steer (-1..1), handbrake, auto, tc, assist, sens, gripMul }
   */
  step(dt, input) {
    const n = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / n;
    for (let i = 0; i < n; i++) this._sub(h, input);
    this._post(dt, input);
  }

  _sub(dt, inp) {
    const m = this.m, a = this.a, b = this.b, L = this.L;
    this.gripMul = inp.gripMul ?? 1;
    const sh = Math.sin(this.heading), ch = Math.cos(this.heading);
    // car-frame velocity
    const u = this.VX * sh + this.VY * ch;
    const v = this.VX * ch - this.VY * sh;
    this.u = u;
    this.v = v;
    const speed = Math.hypot(u, v);

    // reverse handling
    let throttle = inp.throttle, brake = inp.brake;
    if (this.gear === -1) {
      throttle = inp.brake;
      brake = inp.throttle;
      if (inp.throttle > 0.1 && u > -0.8) this.gear = 1;
    } else if (inp.brake > 0.5 && inp.throttle < 0.1 && Math.abs(u) < 0.6) {
      this.revHold += dt;
      if (this.revHold > 0.35) { this.gear = -1; this.revHold = 0; }
    } else this.revHold = 0;

    // ----- Engine & drivetrain
    const ratio = this.gear === -1 ? -this.reverseRatio * this.finalDrive : this.gears[this.gear - 1] * this.finalDrive;
    const wheelRpm = (u / this.rw) * ratio * 60 / (2 * Math.PI);
    let clutch = 1;
    if (this.shiftT > 0) {
      this.shiftT -= dt;
      clutch = 0;
    }
    const launchRpm = this.idle + throttle * (this.redline * 0.42 - this.idle);
    let targetRpm = Math.max(wheelRpm, this.idle * 0.95);
    let slipping = false;
    if (Math.abs(wheelRpm) < launchRpm && Math.abs(u) < 12) {
      // clutch slipping at launch
      targetRpm = lerp(launchRpm, Math.abs(wheelRpm), clamp(Math.abs(u) / 12, 0, 1));
      slipping = true;
    }
    if (clutch === 0) {
      // free-revving during shift: drop toward new gear rpm
      this.rpm += (Math.max(this.idle, Math.abs(wheelRpm)) - this.rpm) * Math.min(1, dt * 18);
    } else {
      this.rpm += (Math.abs(targetRpm) - this.rpm) * Math.min(1, dt * (slipping ? 10 : 40));
    }
    // rev limiter
    let thr = throttle;
    if (this.rpm >= this.limiter) {
      this.limiterT = 0.06;
      this.rpm = this.limiter;
    }
    if (this.limiterT > 0) {
      this.limiterT -= dt;
      thr = 0;
    }
    // turbo boost
    if (this.isTurbo) {
      const rpmF = clamp((this.rpm / this.redline - 0.25) / 0.35, 0, 1);
      const target = thr > 0.5 ? rpmF : thr * 0.25;
      const rate = target > this.boost ? (1 / this.turboLag) * (0.4 + 0.6 * rpmF) : 4;
      this.boost += clamp(target - this.boost, -rate * dt, rate * dt);
    }
    const boostMul = this.isTurbo ? 0.62 + 0.38 * this.boost : 1;
    let Teng;
    if (thr > 0.01) Teng = this.torqueAt(this.rpm) * thr * boostMul;
    else Teng = -this.Tpeak * (0.1 + 0.16 * (this.rpm / this.redline)) * (this.gear === -1 ? 0.2 : 1);
    if (this.rpm < this.idle * 1.05 && thr < 0.01) Teng = 0;
    this.throttleEff = thr;
    let Fdrive = clutch * Teng * ratio * ETA / this.rw;
    if (Math.abs(u) < 0.5 && thr < 0.01) Fdrive = 0;

    // ----- Loads
    const Fz0 = m * G;
    const aero = 0.5 * RHO * this.ClA * u * u;
    let Fzf = (Fz0 * b) / L - (m * this.axS * this.h) / L + aero * 0.45;
    let Fzr = (Fz0 * a) / L + (m * this.axS * this.h) / L + aero * 0.55;
    Fzf = Math.max(Fzf, Fz0 * 0.12);
    Fzr = Math.max(Fzr, Fz0 * 0.12);
    // Lateral load transfer -> axle grip loss (load sensitivity)
    const dLat = (m * Math.abs(this.ayS) * this.h) / this.track;
    const sens = 0.12;
    const axleMu = (Fz, rs) => {
      const dF = dLat * rs;
      const fo = Fz / 2 + dF, fi = Math.max(0, Fz / 2 - dF);
      const nom = Fz / 2;
      const muO = 1 - sens * (fo / nom - 1), muI = 1 - sens * (fi / nom - 1);
      return (muO * fo + muI * fi) / Fz;
    };
    const gm = this.mu * this.gripBonus * this.gripMul;
    const muF = gm * axleMu(Fzf, this.rollStiffFront);
    const muR = gm * axleMu(Fzr, 1 - this.rollStiffFront) * (this.def.phys.rearGrip ?? 1);
    const capF = muF * Fzf, capR = muR * Fzr;

    // ----- Slip angles & raw lateral demand
    const delta = this.steerAngle;
    const ue = Math.max(Math.abs(u), 3);
    const sgn = u >= -0.5 ? 1 : -1;
    const alphaF = Math.atan2(v + a * this.omega, ue) - delta * sgn;
    const alphaR = Math.atan2(v - b * this.omega, ue);
    const lowSpeed = clamp(speed / 2.5, 0, 1);
    let Fyf = -capF * MF(alphaF, this.B) * lowSpeed;
    let Fyr = -capR * MF(alphaR, this.B * 0.95) * lowSpeed;

    // ----- Longitudinal forces
    let Fxf = Fdrive * this.frontSplit;
    let Fxr = Fdrive * (1 - this.frontSplit);
    let spin = 0;
    if (Fdrive > 0) {
      // traction control keeps some lateral grip in reserve so power doesn't spin the car
      const useF = Math.min(0.97, Math.abs(Fyf) / (capF + 1)), useR = Math.min(0.97, Math.abs(Fyr) / (capR + 1));
      const limF = capF * (inp.tc ? Math.max(0.3, 0.97 * Math.sqrt(1 - useF * useF)) : 1);
      const limR = capR * (inp.tc ? Math.max(0.3, 0.97 * Math.sqrt(1 - useR * useR)) : 1);
      const rF = this.frontSplit > 0 ? Fxf / limF : 0;
      const rR = this.frontSplit < 1 ? Fxr / limR : 0;
      const r = Math.max(rF, rR);
      if (r > 1) {
        spin = (Math.max(rF * limF / capF, rR * limR / capR)) - 1;
        if (inp.tc) {
          Fxf /= r;
          Fxr /= r;
          spin = Math.max(0, spin) * 0.2;
        }
      }
    }
    // brakes
    const dir = Math.abs(u) > 0.3 ? Math.sign(u) : 0;
    const Fb = brake * this.brakeForce;
    if (dir !== 0) {
      Fxf -= dir * Fb * this.brakeBias;
      Fxr -= dir * Fb * (1 - this.brakeBias);
    }
    // handbrake locks rear
    const hb = inp.handbrake;
    if (hb > 0 && dir !== 0) Fxr = lerp(Fxr, -dir * capR * 0.8, hb);
    // ABS / wheelspin saturation
    const satF = Math.abs(Fxf) > capF ? capF / Math.abs(Fxf) : 1;
    const satR = Math.abs(Fxr) > capR ? capR / Math.abs(Fxr) : 1;
    Fxf *= satF;
    Fxr *= satR;
    // static hold when stopped & braking
    if (dir === 0 && brake > 0.1 && this.gear !== -1) {
      this.VX *= Math.max(0, 1 - dt * 12);
      this.VY *= Math.max(0, 1 - dt * 12);
    }
    // friction ellipse
    Fyf *= Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(Fxf) / (capF + 1), 2)));
    const ell = Math.sqrt(Math.max(0, 1 - Math.pow(Math.abs(Fxr) / (capR + 1), 2)));
    Fyr *= hb > 0 ? lerp(ell, 0.28, hb) : ell;
    if (spin > 0 && !inp.tc && this.frontSplit < 1) Fyr *= Math.max(0.35, 1 - spin * 0.8);
    if (spin > 0 && !inp.tc && this.frontSplit > 0) Fyf *= Math.max(0.5, 1 - spin * 0.5);

    // ----- Stability control: yaw-rate tracking via virtual brake torque (off while handbraking)
    let Mesc = 0;
    if (inp.assist && hb < 0.05 && speed > 7 && sgn > 0) {
      const omegaDes = (u * Math.tan(delta)) / L;
      const omegaMax = (gm * G) / Math.max(u, 5);
      const target = clamp(omegaDes, -omegaMax * 1.05, omegaMax * 1.05);
      const err = this.omega - target;
      const beta = Math.atan2(v, Math.abs(u));
      const over = Math.sign(err) === Math.sign(this.omega) && Math.abs(this.omega) > Math.abs(target);
      const sliding = Math.abs(beta) > 0.06;
      if (Math.abs(err) > 0.04 || sliding) {
        Mesc = -err * this.Iz * (over || sliding ? 3.2 : 0.7);
        if (over || sliding) {
          if (Fxr > 0) Fxr *= 0.65;
          if (Fxf > 0) Fxf *= 0.65;
        }
        this.escActive = over || sliding ? 1 : 0;
      } else this.escActive = 0;
    }

    // ----- Resistances
    const drag = 0.5 * RHO * this.CdA * u * Math.abs(u);
    const rollRes = 0.013 * m * G * clamp(u, -1, 1);

    const cd = Math.cos(delta), sd = Math.sin(delta);
    const Fx = Fxr + Fxf * cd - Fyf * sd - drag - rollRes;
    const Fy = Fyr + Fyf * cd + Fxf * sd;
    const Mz = a * (Fyf * cd + Fxf * sd) - b * Fyr + Mesc;

    // integrate in world frame
    const FX = Fx * sh + Fy * ch;
    const FY = Fx * ch - Fy * sh;
    this.VX += (FX / m) * dt;
    this.VY += (FY / m) * dt;
    this.omega += (Mz / this.Iz) * dt;
    // Low speed: blend toward kinematic steering so parking-speed manoeuvres work
    if (speed < 3) {
      const w = (1 - speed / 3) * Math.min(1, dt * 20);
      const kin = (u * Math.tan(delta)) / L;
      this.omega += (kin - this.omega) * w;
      const vlat = this.VX * ch - this.VY * sh;
      this.VX -= vlat * ch * w;
      this.VY += vlat * sh * w;
    }
    this.omega = clamp(this.omega, -9, 9);
    this.heading += this.omega * dt;
    this.X += this.VX * dt;
    this.Y += this.VY * dt;
    if (!Number.isFinite(this.X + this.Y + this.VX + this.VY + this.omega + this.heading)) {
      this.X = this._safe?.X ?? 0; this.Y = this._safe?.Y ?? 0; this.heading = this._safe?.heading ?? 0;
      this.VX = this.VY = this.omega = 0;
    } else if (!this._safe) this._safe = { X: this.X, Y: this.Y, heading: this.heading };
    else { this._safe.X = this.X; this._safe.Y = this.Y; this._safe.heading = this.heading; }

    this.ax = Fx / m;
    this.ay = Fy / m;
    const k = Math.min(1, dt * 12);
    this.axS += (this.ax - this.axS) * k;
    this.ayS += (this.ay - this.ayS) * k;

    // diagnostics for audio/visuals
    const peak = 1.15 / this.B;
    this.slipF = Math.max(0, Math.abs(alphaF) - peak) * speed;
    this.slipR = Math.max(0, Math.abs(alphaR) - peak) * speed;
    this.wheelspin = spin;
    this.hbSlide = hb > 0 ? hb * speed : 0;
    this.capF = capF;
    this.capR = capR;
    this.alphaF = alphaF;
    this.alphaR = alphaR;
    this.wheelRot += (u / this.rw) * dt * (1 + (this.frontSplit < 1 ? spin * 1.5 : 0));
    this.wheelRotF += (u / this.rw) * dt * (1 + (this.frontSplit > 0 ? spin * 1.5 : 0));
  }

  _post(dt, inp) {
    // steering angle follows the input with assists
    const limit = this.steerLimit(inp.sens ?? 1);
    let target = inp.steer * limit;
    if (inp.assist && Math.abs(this.u) > 5) {
      const beta = Math.atan2(this.v, Math.abs(this.u));
      const k = 0.55 * (1 - Math.abs(inp.steer) * 0.5);
      target += beta * k;
    }
    target = clamp(target, -this.lockRad, this.lockRad);
    this.steerAngle += (target - this.steerAngle) * Math.min(1, dt * 18);

    // automatic gearbox
    this.shiftCooldown -= dt;
    if (inp.auto && this.gear > 0 && this.shiftT <= 0 && this.shiftCooldown <= 0) {
      const thr = inp.throttle;
      const upRpm = lerp(this.redline * 0.55, this.redline * 0.985, clamp(thr, 0, 1));
      const g = this.gear;
      if (this.rpm > upRpm && g < this.gears.length && Math.abs(this.u) > 3) {
        this.shiftUp();
        this.shiftCooldown = 0.35;
      } else if (g > 1) {
        const downRpm = lerp(this.redline * 0.3, this.redline * 0.6, clamp(thr, 0, 1));
        const lower = this._rpmFor(this.u, g - 1);
        if (this.rpm < downRpm && lower < this.redline * 0.9) {
          this.shiftDown();
          this.shiftCooldown = 0.35;
        }
      }
    }
    // throttle lift events (for pops / blow-off)
    if (this.lastThrottle > 0.6 && inp.throttle < 0.2) this.events.push({ type: 'lift', boost: this.boost, rpm: this.rpm });
    this.lastThrottle = inp.throttle;
    this.skid = clamp(Math.max(this.slipF, this.slipR) * 0.12 + this.wheelspin * 1.2 + (this.hbSlide || 0) * 0.04, 0, 1);
  }

  get speed() { return Math.hypot(this.VX, this.VY); }

  /** Apply impulse (world 2D) at offset r (world 2D, relative to CG). */
  applyImpulse(jx, jy, rx, ry) {
    this.VX += jx / this.m;
    this.VY += jy / this.m;
    // clockwise-positive cross product
    this.omega += (ry * jx - rx * jy) / this.Iz;
  }

  pointVelocity(rx, ry) {
    return [this.VX + this.omega * ry, this.VY - this.omega * rx];
  }
}
