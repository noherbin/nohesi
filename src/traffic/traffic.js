// AI highway traffic: pooled instanced vehicles, IDM car-following, MOBIL-style lane changes,
// turn signals, brake lights, reactions to the player, and an oncoming carriageway.
import * as THREE from 'three';
import { TRAFFIC_TYPES, TRAFFIC_COLORS } from '../config/cars.js';
import { buildTrafficGeometry, withCarAO } from '../vehicles/carBuilder.js';
import { blobShadowTexture, plateTexture, beamTexture, streakTexture } from '../world/textures.js';
import { clamp, lerp, weightedPick, MPH_TO_MS, smoothstep } from '../core/utils.js';

const CAPS = { sedan: 34, compact: 24, hatch: 14, suv: 24, crossover: 22, pickup: 16, van: 12, sport: 6, box: 10, semi: 8 };
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1);
const _v = new THREE.Vector3();
const _c = new THREE.Color();

export class Traffic {
  constructor(scene, road) {
    this.scene = scene;
    this.road = road;
    this.group = new THREE.Group();
    this.group.name = 'traffic';
    scene.add(this.group);
    this.mats = {
      paint: new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.4, roughness: 0.34, envMapIntensity: 1.2, clearcoat: 0.7, clearcoatRoughness: 0.08 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x0b0e12, metalness: 0.3, roughness: 0.06, envMapIntensity: 1.5, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.75, metalness: 0.1 }),
      metal: new THREE.MeshStandardMaterial({ color: 0xb8bcc0, metalness: 0.9, roughness: 0.3 }),
      head: new THREE.MeshBasicMaterial({ color: 0xdde6f2, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }),
      tail: new THREE.MeshBasicMaterial({ color: 0xff2414, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }),
      plate: new THREE.MeshStandardMaterial({ map: plateTexture('8NHS204', 'ca'), roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }),
      body2: new THREE.MeshStandardMaterial({ color: 0xe9e9e6, roughness: 0.62, metalness: 0.05 }),
      shadow: new THREE.MeshBasicMaterial({ map: blobShadowTexture(), color: 0x000000, transparent: true, opacity: 0.6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
    };
    for (const k of ['paint', 'dark', 'body2']) withCarAO(this.mats[k]);
    this.types = TRAFFIC_TYPES.map((def, ti) => {
      const g = buildTrafficGeometry(def);
      const cap = CAPS[def.id] || 10;
      const meshes = {};
      for (const [k, geo] of Object.entries(g.groups)) {
        const mesh = new THREE.InstancedMesh(geo, this.mats[k], cap);
        mesh.frustumCulled = false;
        mesh.castShadow = k === 'paint' || k === 'body2';
        if (k === 'shadow') mesh.renderOrder = -1;
        mesh.receiveShadow = k === 'paint' || k === 'body2';
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        if (k === 'paint' || k === 'tail' || k === 'head') {
          mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3).fill(1), 3);
          mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
        }
        for (let i = 0; i < cap; i++) mesh.setMatrixAt(i, ZERO);
        this.group.add(mesh);
        meshes[k] = mesh;
      }
      for (const m of Object.values(meshes)) m.count = 0;
      return { def, ti, dims: g.dims, lamps: g.lamps, meshes, slots: [], n: 0, cap, dirty: true };
    });
    this.typeWeights = this.types.map((t) => [t, t.def.weight]);

    // Night headlight footprints and wet-road light streaks
    const beamGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    this.beamMat = new THREE.MeshBasicMaterial({ map: beamTexture(), color: 0xfff1d6, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 });
    this.beams = new THREE.InstancedMesh(beamGeo, this.beamMat, 160);
    this.beams.frustumCulled = false;
    this.streakMat = new THREE.MeshBasicMaterial({ map: streakTexture(), color: 0xff2a1a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8 });
    this.streaks = new THREE.InstancedMesh(beamGeo, this.streakMat, 160);
    this.streaks.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(160 * 3).fill(1), 3);
    this.streaks.frustumCulled = false;
    for (let i = 0; i < 160; i++) { this.beams.setMatrixAt(i, ZERO); this.streaks.setMatrixAt(i, ZERO); }
    this.group.add(this.beams, this.streaks);

    this.cars = [];
    this.opp = [];
    this.pool = [];
    this.events = [];
    this.night = 0;
    this.wet = 0;
    this.blink = 0;
    this._tmp = {};
    this._tmp2 = {};
    this.enabled = true;
  }

  /* ------------------------------------------------------------ setup */
  reset(layout, density, playerS, playerLane, opts = {}) {
    for (const c of [...this.cars, ...this.opp]) this._release(c);
    this.cars.length = 0;
    this.opp.length = 0;
    this.layout = layout;
    this.baseDensity = density;
    this.densityMul = 1;
    this.spawnAhead = opts.spawnAhead ?? 650;
    this.speedScale = opts.speedScale ?? 1;
    this.laneNext = new Array(layout.n).fill(0);
    this.oppNext = new Array(layout.oppLanes).fill(0);
    // initial population
    for (let lane = 0; lane < layout.n; lane++) {
      let s = playerS - 140 + Math.random() * 30;
      while (s < playerS + this.spawnAhead) {
        const nearPlayer = Math.abs(s - playerS) < (lane === playerLane ? 45 : Math.abs(lane - playerLane) === 1 ? 14 : 0);
        if (!nearPlayer) {
          const c = this._spawn(lane, s, false);
          if (c) s += c.len;
        }
        s += this._spacing(lane);
      }
    }
    for (let lane = 0; lane < layout.oppLanes; lane++) {
      let s = playerS - 150 + Math.random() * 40;
      while (s < playerS + this.spawnAhead) {
        const c = this._spawn(lane, s, true);
        if (c) s += c.len;
        s += this._spacing(lane) * 1.3;
      }
    }
  }

  _spacing(lane) {
    const dens = this.baseDensity * this.densityMul;
    const base = 74 / dens;
    const r = Math.random();
    // gamma-ish: occasional big gaps and occasional platoons
    return Math.max(9, base * (0.35 + r * r * 1.6 + (Math.random() < 0.08 ? 1.5 : 0)));
  }

  _laneSpeed(lane, opp) {
    const n = opp ? this.layout.oppLanes : this.layout.n;
    const f = n > 1 ? lane / (n - 1) : 0;
    const mph = lerp(77, 58, f);
    const jam = clamp((this.baseDensity * this.densityMul - 1.2) * 0.25, 0, 0.3);
    return mph * MPH_TO_MS * (1 - jam) * this.speedScale;
  }

  _pickType(lane, opp) {
    const n = opp ? this.layout.oppLanes : this.layout.n;
    for (let tries = 0; tries < 6; tries++) {
      const t = weightedPick(this.typeWeights, Math.random());
      if (t.def.truck && lane < n - 2) continue;
      if (t.n >= t.cap) continue;
      return t;
    }
    for (const t of this.types) if (!t.def.truck && t.n < t.cap) return t;
    return null;
  }

  _spawn(lane, s, opp) {
    const t = this._pickType(lane, opp);
    if (!t) return null;
    const c = this.pool.pop() || {};
    c.t = t;
    c.slot = t.n++;
    t.slots[c.slot] = c;
    for (const m of Object.values(t.meshes)) m.count = t.n;
    c.opp = opp;
    c.lane = lane;
    c.targetLane = lane;
    const L = this.layout;
    c.d = opp ? -L.laneCenter(lane) : L.laneCenter(lane);
    c.fromD = c.d;
    c.toD = c.d;
    c.laneT = -1;
    c.changeDur = 3.5;
    c.s = s;
    c.len = t.dims.L;
    c.wid = t.dims.W;
    c.mass = t.def.mass;
    c.truck = !!t.def.truck;
    c.desired = this._laneSpeed(lane, opp) * (c.truck ? 0.88 : 1) + (Math.random() - 0.5) * 4.5;
    c.speed = c.desired;
    c.accel = 0;
    c.aMax = c.truck ? 0.7 : 1.3 + Math.random() * 0.5;
    c.T = 1.1 + Math.random() * 0.8;
    c.brake = 0;
    c.signal = 0;
    c.signalT = 0;
    c.decide = 2 + Math.random() * 6;
    c.honkCD = 0;
    c.crashed = false;
    c.vd = 0;
    c.yaw = 0;
    c.yawRate = 0;
    c.hazard = false;
    c.ov = false;
    c.minGap = 99;
    c.scored = false;
    c.startAhead = false;
    c.whoosh = false;
    c.hit = false;
    const colHex = weightedPick(TRAFFIC_COLORS, Math.random());
    _c.set(colHex);
    t.meshes.paint?.setColorAt(c.slot, _c);
    if (t.meshes.paint) t.meshes.paint.instanceColor.needsUpdate = true;
    (opp ? this.opp : this.cars).push(c);
    return c;
  }

  _release(c) {
    // swap-remove keeps active instances packed in [0, n) so the GPU only draws live cars
    const t = c.t;
    const last = --t.n;
    if (c.slot !== last) {
      const moved = t.slots[last];
      moved.slot = c.slot;
      t.slots[c.slot] = moved;
      const pm = t.meshes.paint;
      if (pm) {
        pm.getColorAt(last, _c);
        pm.setColorAt(c.slot, _c);
        pm.instanceColor.needsUpdate = true;
      }
      if (moved.matrix) for (const m of Object.values(t.meshes)) m.setMatrixAt(moved.slot, moved.matrix);
    }
    t.slots[last] = null;
    for (const m of Object.values(t.meshes)) m.count = t.n;
    t.dirty = true;
    c.t = null;
    this.pool.push(c);
  }

  /* ------------------------------------------------------------ simulation */
  /**
   * ctx: { ps, pd, pv (forward speed along road), pw (player half-extent across), pl (player half length), runDist, crashMode }
   */
  update(dt, ctx) {
    if (!this.layout) return;
    this.blink += dt;
    const L = this.layout;
    this.densityMul = 1 + Math.min(0.6, (ctx.runDist || 0) / 9000);
    const cars = this.cars;
    // sort by s for neighbour queries
    cars.sort((a, b) => a.s - b.s);
    const n = cars.length;
    for (let i = 0; i < n; i++) {
      const c = cars[i];
      if (c.crashed) {
        c.speed = Math.max(0, c.speed - 7 * dt);
        c.d += c.vd * dt;
        c.vd *= Math.max(0, 1 - dt * 1.5);
        c.yaw += c.yawRate * dt;
        c.yawRate *= Math.max(0, 1 - dt * 1.2);
        c.d = clamp(c.d, L.medianHalf + c.wid / 2, L.roadEdge - c.wid / 2);
        c.s += c.speed * dt;
        c.brake = 1;
        continue;
      }
      // leader search (cars sorted by s ascending)
      const myLanes = c.laneT >= 0 ? [c.lane, c.targetLane] : [c.lane];
      let leadGap = 1e9, leadV = 0;
      for (let j = i + 1; j < n && cars[j].s - c.s < 260; j++) {
        const o = cars[j];
        if (!this._overlapsLane(o, myLanes, c)) continue;
        const gap = o.s - o.len / 2 - (c.s + c.len / 2);
        if (gap < leadGap) { leadGap = gap; leadV = o.speed; }
        break;
      }
      // the player as a leader
      let playerLead = false;
      const latOverlap = Math.abs(ctx.pd - c.d) < (c.wid / 2 + ctx.pw + 0.35);
      if (latOverlap && ctx.ps > c.s) {
        const gap = ctx.ps - ctx.pl - (c.s + c.len / 2);
        if (gap < leadGap) { leadGap = Math.max(0.1, gap); leadV = ctx.pv; playerLead = true; }
      }
      const acc = this._idm(c, leadGap, leadV);
      c.accel = acc;
      c.speed = Math.max(0, c.speed + acc * dt);
      c.s += c.speed * dt;
      const targetBrake = acc < -0.6 ? clamp(-acc / 4, 0.4, 1) : 0;
      c.brake += (targetBrake - c.brake) * Math.min(1, dt * 8);
      if (playerLead && acc < -4.2 && c.honkCD <= 0 && leadGap < 30) {
        c.honkCD = 6;
        this.events.push({ type: 'honk', s: c.s, d: c.d });
      }
      c.honkCD -= dt;
      // lane changes
      if (c.laneT >= 0) {
        if (c.signalT > 0) c.signalT -= dt;
        else {
          c.laneT += dt / c.changeDur;
          const k = c.laneT >= 1 ? 1 : 0.5 - 0.5 * Math.cos(c.laneT * Math.PI);
          const prevD = c.d;
          c.d = lerp(c.fromD, c.toD, k);
          c.yaw = Math.atan2((c.d - prevD) / Math.max(dt, 1e-4), Math.max(c.speed, 1));
          if (c.laneT >= 1) {
            c.lane = c.targetLane;
            c.laneT = -1;
            c.signal = 0;
            c.yaw = 0;
            c.decide = 5 + Math.random() * 10;
          }
        }
      } else {
        c.yaw *= Math.max(0, 1 - dt * 4);
        c.decide -= dt;
        if (c.decide <= 0) {
          c.decide = 2 + Math.random() * 5;
          this._considerLaneChange(c, i, ctx, acc);
        }
      }
    }
    this._updateOpp(dt, ctx);
    // spawn / despawn
    const sMin = ctx.ps - 230, sMax = ctx.ps + this.spawnAhead + 320;
    for (let i = cars.length - 1; i >= 0; i--) {
      const c = cars[i];
      if (c.s < sMin || c.s > sMax) {
        this._release(c);
        cars.splice(i, 1);
      }
    }
    this._spawnLanes(ctx);
  }

  _overlapsLane(o, lanes, self) {
    if (o.crashed) return Math.abs(o.d - self.d) < (o.wid + self.wid) / 2 + 0.4;
    for (const l of lanes) {
      if (o.lane === l || (o.laneT >= 0 && o.targetLane === l)) return true;
    }
    return false;
  }

  _idm(c, gap, vLead) {
    const v = c.speed, v0 = Math.max(1, c.desired);
    const s0 = c.truck ? 4 : 2.5;
    const b = 2.6;
    const dv = v - vLead;
    const sStar = s0 + Math.max(0, v * c.T + (v * dv) / (2 * Math.sqrt(c.aMax * b)));
    const g = Math.max(0.2, gap);
    let a = c.aMax * (1 - Math.pow(v / v0, 4) - (gap < 1e8 ? (sStar / g) * (sStar / g) : 0));
    return clamp(a, -9, c.aMax);
  }

  /** Nearest vehicles ahead/behind in a lane at position s (includes the player). */
  _neighbours(lane, s, self, ctx) {
    const L = this.layout;
    const cd = L.laneCenter(lane);
    let ahead = null, aGap = 1e9, behind = null, bGap = 1e9;
    for (const o of this.cars) {
      if (o === self) continue;
      const inLane = o.lane === lane || (o.laneT >= 0 && o.targetLane === lane) || (o.crashed && Math.abs(o.d - cd) < 2.4);
      if (!inLane) continue;
      if (o.s >= s) {
        const g = o.s - o.len / 2 - (s + self.len / 2);
        if (g < aGap) { aGap = g; ahead = o; }
      } else {
        const g = s - self.len / 2 - (o.s + o.len / 2);
        if (g < bGap) { bGap = g; behind = o; }
      }
    }
    // player
    if (Math.abs(ctx.pd - cd) < L.LW * 0.5 + ctx.pw + 0.4) {
      if (ctx.ps >= s) {
        const g = ctx.ps - ctx.pl - (s + self.len / 2);
        if (g < aGap) { aGap = g; ahead = { speed: ctx.pv, player: true }; }
      } else {
        const g = s - self.len / 2 - (ctx.ps + ctx.pl);
        if (g < bGap) { bGap = g; behind = { speed: ctx.pv, player: true, T: 1.0, aMax: 3, truck: false }; }
      }
    }
    return { ahead, aGap, behind, bGap };
  }

  _considerLaneChange(c, i, ctx, accCur) {
    const L = this.layout;
    const opts = [];
    if (c.lane > 0 && !(c.truck && c.lane - 1 < L.n - 2)) opts.push(-1);
    if (c.lane < L.n - 1) opts.push(1);
    let best = null, bestGain = 0.35;
    for (const dir of opts) {
      const lane = c.lane + dir;
      const nb = this._neighbours(lane, c.s, c, ctx);
      // safety: space ahead and behind
      if (nb.aGap < Math.max(10, c.speed * 0.7)) continue;
      if (nb.bGap < 8) continue;
      if (nb.behind) {
        const fv = nb.behind.speed;
        const closing = fv - c.speed;
        const needed = 8 + Math.max(0, closing) * (nb.behind.player ? 3.2 : 2.2) + fv * 0.4;
        if (nb.bGap < needed) continue;
      }
      const aNew = this._idm(c, nb.aGap, nb.ahead ? nb.ahead.speed : c.desired);
      let gain = aNew - accCur;
      gain += dir > 0 ? 0.12 : -0.05; // keep-right tendency
      if (Math.random() < 0.06) gain += 0.5; // occasional spontaneous change
      if (gain > bestGain) { bestGain = gain; best = dir; }
    }
    if (best !== null) {
      c.targetLane = c.lane + best;
      c.fromD = c.d;
      c.toD = L.laneCenter(c.targetLane);
      c.laneT = 0;
      c.signal = best;
      c.signalT = 1.0 + Math.random() * 0.8;
      c.changeDur = (c.truck ? 5 : 3.2) + Math.random() * 1.2;
    }
  }

  _updateOpp(dt, ctx) {
    const opp = this.opp;
    opp.sort((a, b) => b.s - a.s); // descending: they travel toward -s
    for (let i = 0; i < opp.length; i++) {
      const c = opp[i];
      let gap = 1e9, vl = 0;
      for (let j = i + 1; j < opp.length && c.s - opp[j].s < 200; j++) {
        const o = opp[j];
        if (o.lane !== c.lane) continue;
        gap = c.s - c.len / 2 - (o.s + o.len / 2);
        vl = o.speed;
        break;
      }
      c.accel = this._idm(c, gap, vl);
      c.speed = Math.max(0, c.speed + c.accel * dt);
      c.s -= c.speed * dt;
      c.brake += ((c.accel < -0.8 ? 1 : 0) - c.brake) * Math.min(1, dt * 8);
    }
    for (let i = opp.length - 1; i >= 0; i--) {
      const c = opp[i];
      if (c.s < ctx.ps - 220 || c.s > ctx.ps + this.spawnAhead + 400) {
        this._release(c);
        opp.splice(i, 1);
      }
    }
  }

  _spawnLanes(ctx) {
    const L = this.layout;
    const horizon = ctx.ps + this.spawnAhead;
    for (let lane = 0; lane < L.n; lane++) {
      let far = -1e9, rear = 1e9;
      for (const c of this.cars) {
        if (c.lane !== lane && !(c.laneT >= 0 && c.targetLane === lane)) continue;
        if (c.s > far) far = c.s;
        if (c.s < rear) rear = c.s;
      }
      if (!this.laneNext[lane]) this.laneNext[lane] = this._spacing(lane);
      if (far < horizon - this.laneNext[lane]) {
        const s = Math.max(far + this.laneNext[lane], horizon - 40);
        if (this._spawn(lane, s, false)) this.laneNext[lane] = this._spacing(lane);
      }
      // traffic arriving from behind when the player is slower than the flow
      const flow = this._laneSpeed(lane, false);
      if (ctx.pv < flow - 4 && rear > ctx.ps - 120) {
        const s = Math.min(rear - this._spacing(lane), ctx.ps - 170);
        const playerHere = Math.abs(ctx.pd - L.laneCenter(lane)) < 2.5;
        if (!playerHere || s < ctx.ps - 60) this._spawn(lane, s, false);
      }
    }
    for (let lane = 0; lane < L.oppLanes; lane++) {
      let far = -1e9;
      for (const c of this.opp) if (c.lane === lane && c.s > far) far = c.s;
      if (!this.oppNext[lane]) this.oppNext[lane] = this._spacing(lane) * 1.3;
      if (far < horizon - this.oppNext[lane]) {
        if (this._spawn(lane, Math.max(far + this.oppNext[lane], horizon - 40), true)) this.oppNext[lane] = this._spacing(lane) * 1.3;
      }
    }
  }

  /** Remove traffic near a position (used on reset). */
  clearAround(s, d, radius) {
    for (let i = this.cars.length - 1; i >= 0; i--) {
      const c = this.cars[i];
      if (Math.abs(c.s - s) < radius && Math.abs(c.d - d) < 6) {
        this._release(c);
        this.cars.splice(i, 1);
      }
    }
  }

  /** Apply a collision response to a traffic car. dv: [along road, lateral] velocity change. */
  impact(c, dvS, dvD) {
    c.speed = Math.max(0, c.speed + dvS);
    c.vd += dvD;
    if (!c.crashed && Math.hypot(dvS, dvD) > 1.2) {
      c.crashed = true;
      c.hazard = true;
      c.yawRate = (Math.random() - 0.5) * 1.4 + Math.sign(dvD) * 0.4;
      c.laneT = -1;
    }
  }

  /* ------------------------------------------------------------ rendering */
  render(origin, night, wet) {
    this.night = night;
    this.wet = wet;
    const road = this.road;
    const tmp = this._tmp;
    const blinkOn = (this.blink % 0.8) < 0.42;
    let bi = 0;
    for (const t of this.types) t.dirty = true;
    const all = this.cars.concat(this.opp);
    const runBright = 0.32 + smoothstep(0.2, 0.8, night) * 0.38;
    for (const c of all) {
      road.pos(c.s, c.d, tmp);
      const yaw = (c.opp ? tmp.H + Math.PI : tmp.H) + c.yaw;
      const pitch = (c.opp ? -1 : 1) * Math.atan(tmp.G) - c.brake * 0.012 + (c.accel > 0.5 ? 0.004 : 0);
      _p.set(tmp.X - origin.x, tmp.E, -(tmp.Y - origin.y));
      _e.set(pitch, -yaw, 0, 'YXZ');
      _q.setFromEuler(_e);
      _m.compose(_p, _q, _s);
      c.matrix = c.matrix || new THREE.Matrix4();
      c.matrix.copy(_m);
      const t = c.t;
      for (const m of Object.values(t.meshes)) m.setMatrixAt(c.slot, _m);
      const tb = c.brake > 0.3 ? 1 : runBright;
      if (t.meshes.tail) {
        _c.setRGB(tb, tb, tb);
        t.meshes.tail.setColorAt(c.slot, _c);
      }
      if (t.meshes.head) {
        const hb = 0.55 + smoothstep(0.2, 0.8, night) * 0.45;
        _c.setRGB(hb, hb, hb);
        t.meshes.head.setColorAt(c.slot, _c);
      }
      c.blinkL = (c.hazard || c.signal < 0) && blinkOn;
      c.blinkR = (c.hazard || c.signal > 0) && blinkOn;
      // beams & streaks
      if (bi < 160) {
        if (night > 0.15) {
          _v.set(0, 0.05, -c.len / 2 - 13).applyMatrix4(_m);
          _e.set(0, -yaw, 0, 'YXZ');
          _q.setFromEuler(_e);
          _s.set(5.2, 1, 24);
          _m.compose(_v, _q, _s);
          this.beams.setMatrixAt(bi, _m);
        } else this.beams.setMatrixAt(bi, ZERO);
        if (wet > 0.1 && !c.opp) {
          _v.set(0, 0.04, c.len / 2 + 4.5).applyMatrix4(c.matrix);
          _e.set(0, -yaw + Math.PI, 0, 'YXZ');
          _q.setFromEuler(_e);
          _s.set(1.7, 1, 9);
          _m.compose(_v, _q, _s);
          this.streaks.setMatrixAt(bi, _m);
          const sb = c.brake > 0.3 ? 1 : runBright * 0.9;
          _c.setRGB(sb, sb, sb);
          this.streaks.setColorAt(bi, _c);
        } else this.streaks.setMatrixAt(bi, ZERO);
        _s.set(1, 1, 1);
        bi++;
      }
    }
    for (let i = bi; i < 160; i++) { this.beams.setMatrixAt(i, ZERO); this.streaks.setMatrixAt(i, ZERO); }
    this._lastBeams = bi;
    this.beamMat.opacity = smoothstep(0.15, 0.8, night) * 0.27;
    this.streakMat.opacity = wet * (0.35 + 0.45 * night);
    this.beams.instanceMatrix.needsUpdate = true;
    this.streaks.instanceMatrix.needsUpdate = true;
    if (this.streaks.instanceColor) this.streaks.instanceColor.needsUpdate = true;
    for (const t of this.types) {
      if (!t.dirty) continue;
      for (const m of Object.values(t.meshes)) {
        m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
      }
      t.dirty = false;
    }
  }

  /** Visit light emitters for the glow system: cb(x, y, z, kind, intensity, facing).
   *  facing is the cosine between the lamp's outward direction and the direction to `cam` (1 = pointing at the viewer). */
  forEachLamp(cb, cam) {
    const night = this.night;
    for (const list of [this.cars, this.opp]) {
      for (const c of list) {
        if (!c.matrix) continue;
        const lp = c.t.lamps;
        const e = c.matrix.elements;
        const zl = Math.hypot(e[8], e[9], e[10]) || 1;
        const zx = e[8] / zl, zy = e[9] / zl, zz = e[10] / zl;
        const face = (l) => {
          const dx = cam.x - _v.x, dy = cam.y - _v.y, dz = cam.z - _v.z;
          const dl = Math.hypot(dx, dy, dz) || 1;
          return (Math.sign(l[2]) * (zx * dx + zy * dy + zz * dz)) / dl;
        };
        const tailI = c.brake > 0.3 ? 1 : 0.25 + night * 0.45;
        for (const l of lp.tail) {
          _v.set(l[0], l[1], l[2]).applyMatrix4(c.matrix);
          cb(_v.x, _v.y, _v.z, 'tail', tailI, face(l));
        }
        if (night > 0.2) {
          for (const l of lp.head) {
            _v.set(l[0], l[1], l[2]).applyMatrix4(c.matrix);
            cb(_v.x, _v.y, _v.z, 'head', night, face(l));
          }
        }
        if (c.blinkL || c.blinkR) {
          for (const l of lp.ind) {
            if ((l[0] < 0 && c.blinkL) || (l[0] > 0 && c.blinkR)) {
              _v.set(l[0], l[1], l[2]).applyMatrix4(c.matrix);
              cb(_v.x, _v.y, _v.z, 'ind', 1);
            }
          }
        }
      }
    }
  }

  setVisible(v) {
    this.group.visible = v;
  }
}
