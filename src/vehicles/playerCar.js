// The player's car: model + physics + input shaping + visual sync (wheels, suspension, lights).
import * as THREE from 'three';
import { buildPlayerCar, disposeCar } from './carBuilder.js';
import { VehiclePhysics } from './physics.js';
import { clamp, lerp, damp, noise1, smoothstep } from '../core/utils.js';

const moveToward = (v, t, d) => (v < t ? Math.min(t, v + d) : Math.max(t, v - d));

export class PlayerCar {
  constructor(scene) {
    this.scene = scene;
    this.model = null;
    this.phys = null;
    this.steer = 0;
    this.thr = 0;
    this.brk = 0;
    this.hb = 0;
    this.proj = { s: 0, d: 0, H: 0, E: 0, G: 0 };
    this.pitch = 0; this.pitchV = 0;
    this.roll = 0; this.rollV = 0;
    this.heave = 0; this.heaveV = 0;
    this.nextBump = 60;
    this.bumpT = 0;
    this.bumpAmp = 0;
    this.events = [];
    this.headOn = 0;
    this.brakeLight = 0;
    this._v = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._e = new THREE.Euler();
  }

  build(def, custom, plate = 'NO HESI') {
    if (this.model) {
      this.scene.remove(this.model.root);
      disposeCar(this.model);
    }
    this.def = def;
    this.custom = custom;
    this.model = buildPlayerCar(def, custom, plate);
    this.dims = this.model.dims;
    this.scene.add(this.model.root);
    const prev = this.phys;
    this.phys = new VehiclePhysics(def, custom);
    if (prev) {
      this.phys.reset(prev.X, prev.Y, prev.heading, prev.speed);
    }
    // headlights
    this.spots = [];
    const lamps = this.model.lamps.head;
    const picks = lamps.length > 2 ? [lamps[0], lamps[lamps.length - 1]] : lamps;
    for (const l of picks) {
      // gentle decay keeps the near road from blowing out while the beam still reaches far
      const sp = new THREE.SpotLight(this.model.lightColor ? this.model.lightColor.clone().lerp(new THREE.Color(0xfff2dc), 0.35) : 0xfff2dc, 0, 150, 0.42, 0.8, 0.95);
      sp.position.set(l[0] * 0.9, l[1], l[2]);
      sp.target.position.set(l[0] * 0.6, 0.15, l[2] - 34);
      sp.castShadow = false;
      this.model.body.add(sp, sp.target);
      this.spots.push(sp);
    }
    this.halfW = this.dims.W / 2;
    this.halfL = this.dims.L / 2;
  }

  place(road, s, d, speed) {
    const p = road.pos(s, d, {});
    this.phys.reset(p.X, p.Y, p.H, speed);
    this.proj.s = s;
    this.proj.d = d;
    this.steer = 0;
    this.thr = 0;
    this.brk = 0;
    this.pitch = this.roll = this.heave = 0;
    this.pitchV = this.rollV = this.heaveV = 0;
  }

  /** Shape raw controls into physics input (keyboard filtering, ramps). */
  control(raw, dt, settings) {
    const u = Math.abs(this.phys.u);
    const target = clamp(raw.steer, -1, 1);
    if (raw.analog) {
      this.steer = damp(this.steer, target, 22, dt);
    } else {
      const sens = settings.steerSpeed ?? 1;
      const up = lerp(3.4, 1.55, clamp(u / 60, 0, 1)) * sens;
      const back = 5.2;
      if (target === 0) this.steer = moveToward(this.steer, 0, back * dt);
      else if (this.steer !== 0 && Math.sign(target) !== Math.sign(this.steer)) this.steer = moveToward(this.steer, target, (back + up) * dt);
      else this.steer = moveToward(this.steer, target, up * dt);
    }
    this.thr = moveToward(this.thr, raw.throttle, (raw.throttle > this.thr ? 5 : 9) * dt);
    this.brk = moveToward(this.brk, raw.brake, (raw.brake > this.brk ? 7 : 10) * dt);
    this.hb = moveToward(this.hb, raw.handbrake ? 1 : 0, 10 * dt);
    return {
      throttle: this.thr,
      brake: this.brk,
      steer: this.steer,
      handbrake: this.hb,
      auto: settings.transmission !== 'manual',
      tc: settings.tc,
      assist: settings.assist,
      sens: settings.steerSens ?? 1,
      gripMul: settings.gripMul ?? 1,
    };
  }

  step(dt, inp) {
    this.lastInput = inp;
    this.phys.step(dt, inp);
  }

  /** Sync the 3D model with the simulation. */
  sync(road, origin, dt, night, wet) {
    const P = this.phys;
    const pr = road.project(P.X, P.Y, this.proj.s, this.proj);
    const m = this.model;
    // suspension springs driven by accelerations
    const w = 2 * Math.PI * P.susFreq;
    const k = w * w, c = 2 * 0.45 * w;
    const pitchT = clamp(P.axS * 0.0042, -0.05, 0.04);
    const rollT = clamp(P.ayS * P.rollGain, -0.07, 0.07);
    // sub-stepped springs stay stable through frame hitches
    const nSub = Math.max(1, Math.ceil(dt / (1 / 120)));
    const h = dt / nSub;
    for (let i = 0; i < nSub; i++) {
      this.pitchV += (k * (pitchT - this.pitch) - c * this.pitchV) * h;
      this.pitch += this.pitchV * h;
      this.rollV += (k * (rollT - this.roll) - c * this.rollV) * h;
      this.roll += this.rollV * h;
    }
    // road imperfections: continuous texture + occasional joints
    const sp = P.speed;
    const sNow = pr.s;
    if (sNow > this.nextBump) {
      this.nextBump = sNow + 45 + Math.random() * 110;
      if (sp > 8) {
        this.bumpAmp = 0.012 + Math.random() * 0.02;
        this.heaveV -= this.bumpAmp * 22;
        this.events.push({ type: 'bump', amp: this.bumpAmp });
      }
    }
    const texture = noise1(sNow * 0.9, 3) * 0.0025 * clamp(sp / 30, 0, 1) + noise1(sNow * 3.1, 5) * 0.001 * clamp(sp / 40, 0, 1);
    for (let i = 0; i < nSub; i++) {
      this.heaveV += (k * 1.6 * (texture - this.heave) - c * 1.2 * this.heaveV) * h;
      this.heave += this.heaveV * h;
    }
    if (!Number.isFinite(this.heave + this.pitch + this.roll)) {
      this.heave = this.heaveV = this.pitch = this.pitchV = this.roll = this.rollV = 0;
    }
    this.heave = clamp(this.heave, -0.08, 0.08);

    // root transform
    const root = m.root;
    root.position.set(P.X - origin.x, pr.E, -(P.Y - origin.y));
    // road grade relative to car heading
    const rel = P.heading - pr.H;
    const gradePitch = Math.atan(pr.G) * Math.cos(rel);
    this._e.set(gradePitch, -P.heading, 0, 'YXZ');
    root.quaternion.setFromEuler(this._e);
    m.body.position.y = this.heave;
    m.body.rotation.set(this.pitch + (m.dims.rake || 0), 0, this.roll);
    // wheels
    for (const wh of m.wheels) {
      if (wh.front) wh.pivot.rotation.y = -P.steerAngle * 1.25;
      const rot = wh.front ? P.wheelRotF : P.wheelRot;
      wh.spin.rotation.x = -rot * wh.side;
      wh.pivot.position.y = wh.baseY + clamp(this.heave * 0.4, -0.02, 0.02);
    }
    // lights
    const braking = this.brk > 0.15 || (P.gear === -1 && this.thr > 0.1);
    this.brakeLight = damp(this.brakeLight, braking ? 1 : 0, 20, dt);
    const lit = smoothstep(0.15, 0.6, night + wet * 0.3);
    this.headOn = damp(this.headOn, lit, 3, dt);
    m.mats.tail.emissiveIntensity = 0.35 + this.headOn * 0.9 + this.brakeLight * 3.2;
    m.mats.head.emissiveIntensity = 0.02 + this.headOn * 2.4;
    m.mats.head2.emissiveIntensity = 0.02 + this.headOn * 3.2;
    m.mats.drl.emissiveIntensity = 1.1 + this.headOn * 0.9;
    if (m.mats.tailLed) {
      m.mats.tailLed.emissiveIntensity = 1.0 + this.headOn * 1.4 + this.brakeLight * 4.5;
      m.mats.proj.emissiveIntensity = 0.03 + this.headOn * 3.2;
      m.mats.refl.emissiveIntensity = this.headOn * 0.35;
    }
    // turn signals (side repeaters) and reversing lamps
    const ind = this.indicator || 0, on = !!this.blinkOn;
    m.mats.amberL.emissiveIntensity = ind < 0 && on ? 3 : 0.25;
    m.mats.amberR.emissiveIntensity = ind > 0 && on ? 3 : 0.25;
    m.mats.rev.emissiveIntensity = P.gear === -1 ? 2.2 : 0;
    for (const s of this.spots) s.intensity = this.headOn * 70;
  }

  /** World-space positions (three coords) of local lamp points. */
  lampWorld(list, out = []) {
    out.length = 0;
    const body = this.model.body;
    body.updateWorldMatrix(true, false);
    for (const l of list) {
      const v = new THREE.Vector3(l[0], l[1], l[2]).applyMatrix4(body.matrixWorld);
      out.push(v);
    }
    return out;
  }

  /** Oriented box corners in 2D (X, Y). */
  corners(out = []) {
    const P = this.phys;
    const hw = this.halfW, hl = this.halfL;
    const sh = Math.sin(P.heading), ch = Math.cos(P.heading);
    const fx = sh, fy = ch, rx = ch, ry = -sh;
    out.length = 0;
    for (const [a, b] of [[1, 1], [1, -1], [-1, -1], [-1, 1]]) {
      out.push([P.X + fx * hl * a + rx * hw * b, P.Y + fy * hl * a + ry * hw * b]);
    }
    return out;
  }

  setInteriorDummyVisible(v) {
    if (this.model.meshes.interior) this.model.meshes.interior.visible = v;
    if (this.model.meshes.cabinTop) this.model.meshes.cabinTop.visible = v;
  }

  setVisible(v) {
    if (this.model) this.model.root.visible = v;
  }
}
