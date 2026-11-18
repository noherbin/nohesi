// Camera rig: chase, far chase, cockpit, hood, bumper and cinematic cameras with shake & G-force motion.
import * as THREE from 'three';
import { clamp, lerp, damp, dampAngle, noise1, smoothstep } from '../core/utils.js';

export const CAM_MODES = ['chase', 'far', 'cockpit', 'hood', 'bumper', 'cinematic'];
export const CAM_NAMES = { chase: 'Chase', far: 'Chase Far', cockpit: 'Cockpit', hood: 'Hood', bumper: 'Bumper', cinematic: 'Cinematic' };

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _look = new THREE.Vector3();
const _m = new THREE.Matrix4();

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    this.mode = 'chase';
    this.yaw = 0;
    this.pos = new THREE.Vector3();
    this.look = new THREE.Vector3();
    this.t = 0;
    this.impact = 0;
    this.bump = 0;
    this.fovBase = 62;
    this.snap = true;
    this.cine = { shot: 'trackside', t: 0, pos: new THREE.Vector3(), ang: 0, side: 1 };
    this.lookBackAmt = 0;
    this.headX = 0; this.headZ = 0; this.headYaw = 0;
  }

  setMode(m) {
    if (!CAM_MODES.includes(m)) m = 'chase';
    this.mode = m;
    this.snap = true;
    if (m === 'cinematic') this._newShot(null, true);
  }

  next() {
    const i = CAM_MODES.indexOf(this.mode);
    this.setMode(CAM_MODES[(i + 1) % CAM_MODES.length]);
    return this.mode;
  }

  addImpact(a) { this.impact = Math.min(1.5, this.impact + a); }
  /** a quick FOV punch for big moments (near misses, chains): 0..1.2 */
  addKick(a) {
    const cur = this._kickNow();
    this.kickA = Math.min(1.4, Math.max(a, cur + a * 0.4));
    this.kickT = 0;
  }
  _kickNow() {
    const t = this.kickT ?? 9, a = this.kickA ?? 0;
    return a * (t < 0.15 ? Math.sin((t / 0.15) * Math.PI * 0.5) : Math.exp(-(t - 0.15) * 3));
  }
  addBump(a) { this.bump = Math.min(0.06, this.bump + a); }

  /**
   * ctx: { car (PlayerCar), road, origin, settings, lookBack, layout, cinematicOnly }
   */
  update(dt, ctx) {
    const cam = this.camera;
    const car = ctx.car;
    const P = car.phys, M = car.model, D = car.dims;
    const s = ctx.settings;
    this.t += dt;
    const speed = P.speed;
    const mode = this.mode;
    this.lookBackAmt = damp(this.lookBackAmt, ctx.lookBack ? 1 : 0, 14, dt);
    const lb = this.lookBackAmt > 0.5;
    const root = M.root, body = M.body;
    root.updateMatrixWorld(true);
    const carPos = _v.copy(root.position);
    const heading = P.heading;
    const fwdX = Math.sin(heading), fwdZ = -Math.cos(heading);
    let fov = s.fov ?? 62;
    let near = 0.2;
    const shakeAmt = (s.shake ?? 1);
    const speedShake = smoothstep(45, 100, speed) * 0.006 * shakeAmt;
    this.impact = Math.max(0, this.impact - dt * 1.8);
    this.bump = Math.max(0, this.bump - dt * 0.25);

    if (mode === 'chase' || mode === 'far') {
      const far = mode === 'far';
      // follow heading, blended toward velocity direction when sliding
      let target = -heading;
      if (speed > 4) {
        const velH = Math.atan2(P.VX, P.VY);
        target = -(heading + clamp(velH - heading, -0.5, 0.5) * 0.35);
      }
      if (this.snap) this.yaw = target;
      this.yaw = dampAngle(this.yaw, target, far ? 4 : 5.5, dt);
      const size = clamp(D.L / 4.6, 0.85, 1.6);
      let dist = (far ? 7.8 : 5.5) * size + clamp(P.axS * 0.035, -0.35, 0.45);
      const height = (far ? 2.35 : 1.5) + (D.H - 1.35) * 0.8;
      const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
      const dir = lb ? -1 : 1;
      _v2.set(carPos.x - fx * dist * dir, carPos.y + height, carPos.z - fz * dist * dir);
      if (this.snap) this.pos.copy(_v2);
      this.pos.lerp(_v2, 1 - Math.exp(-18 * dt));
      _look.set(carPos.x + fx * 5.5 * dir, carPos.y + 0.85 + (far ? 0.2 : 0), carPos.z + fz * 5.5 * dir);
      this.look.copy(_look);
      fov += smoothstep(10, 95, speed) * (far ? 10 : 13);
      cam.position.copy(this.pos);
    } else if (mode === 'cockpit' || mode === 'hood' || mode === 'bumper') {
      const isCock = mode === 'cockpit';
      body.updateMatrixWorld(true);
      const mat = mode === 'bumper' ? root.matrixWorld : body.matrixWorld;
      let lx, ly, lz;
      if (isCock) {
        this.headX = damp(this.headX, clamp(-P.ayS * 0.004, -0.05, 0.05), 6, dt);
        this.headZ = damp(this.headZ, clamp(P.axS * 0.0035, -0.04, 0.05), 6, dt);
        lx = -D.cabinW * 0.46 + this.headX;
        ly = D.eyeY + Math.sin(this.t * 1.7) * 0.002;
        lz = D.eyeZ + this.headZ;
        near = 0.04;
        fov = (s.cockpitFov ?? 68) + smoothstep(20, 95, speed) * 4;
      } else if (mode === 'hood') {
        lx = 0; ly = D.wsBaseY + 0.16; lz = D.dashZ - 0.45;
        near = 0.08;
        fov = 64 + smoothstep(20, 95, speed) * 8;
      } else {
        lx = 0; ly = 0.45; lz = D.frontZ - 0.08;
        if (lb) lz = D.rearZ + 0.1;
        near = 0.08;
        fov = 70 + smoothstep(20, 95, speed) * 8;
      }
      _v2.set(lx, ly, lz).applyMatrix4(mat);
      cam.position.copy(_v2);
      // look direction in the car frame
      this.headYaw = damp(this.headYaw, isCock ? clamp(P.omega * 0.09 + car.steer * 0.025, -0.12, 0.12) : 0, 5, dt);
      const yaw = this.headYaw + (lb ? Math.PI : 0);
      _look.set(lx + Math.sin(-yaw) * -10, ly - (isCock ? 1.3 : 0.15), lz - Math.cos(yaw) * 10).applyMatrix4(mat);
      this.look.copy(_look);
      this.pos.copy(cam.position);
    } else {
      this._cinematic(dt, ctx, carPos);
      fov = this.cine.fov;
    }

    // camera shake
    const sh = speedShake + this.impact * 0.06 * shakeAmt + this.bump * shakeAmt;
    if (sh > 0.0001) {
      const n1 = noise1(this.t * 23, 1), n2 = noise1(this.t * 19, 2);
      cam.position.x += n1 * sh;
      cam.position.y += n2 * sh;
      this.look.x += noise1(this.t * 11, 3) * sh * 2;
    }
    // keep above the road surface
    cam.position.y = Math.max(cam.position.y, carPos.y + 0.18);
    cam.lookAt(this.look);
    if (this.impact > 0.05) cam.rotateZ(noise1(this.t * 17, 4) * this.impact * 0.03 * shakeAmt);
    this.fovS = this.snap || this.fovS === undefined ? fov : damp(this.fovS, fov, 4, dt);
    this.kickT = (this.kickT ?? 9) + dt;
    const kickMul = mode === 'cinematic' ? 0 : mode === 'cockpit' || mode === 'hood' || mode === 'bumper' ? 0.45 : 1;
    const fovT = this.fovS + this._kickNow() * 2.2 * kickMul;
    if (Math.abs(cam.fov - fovT) > 0.01 || cam.near !== near) {
      cam.fov = fovT;
      cam.near = near;
      cam.updateProjectionMatrix();
    }
    this.snap = false;
  }

  _newShot(ctx, first = false) {
    const shots = ['trackside', 'orbit', 'low', 'trackside', 'heli', 'low'];
    const c = this.cine;
    let next = shots[Math.floor(Math.random() * shots.length)];
    if (!first && next === c.shot) next = shots[(shots.indexOf(next) + 1) % shots.length];
    c.shot = first ? 'orbit' : next;
    c.t = 0;
    c.ang = Math.random() * Math.PI * 2;
    c.side = Math.random() < 0.5 ? -1 : 1;
    c.placed = false;
  }

  /** True if a world position is inside (or hugging) a traffic vehicle. */
  _blocked(pos, traffic) {
    if (!traffic) return false;
    for (const list of [traffic.cars, traffic.opp]) {
      for (const c of list) {
        if (!c.matrix) continue;
        const e = c.matrix.elements;
        const dx = pos.x - e[12], dy = pos.y - e[13], dz = pos.z - e[14];
        if (dx * dx + dz * dz > 400) continue;
        const lx = dx * e[0] + dy * e[1] + dz * e[2];
        const ly = dx * e[4] + dy * e[5] + dz * e[6];
        const lz = dx * e[8] + dy * e[9] + dz * e[10];
        if (Math.abs(lx) < c.wid / 2 + 0.6 && Math.abs(lz) < c.len / 2 + 0.7 && ly < (c.t?.dims.H ?? 1.5) + 0.5 && ly > -0.6) return true;
      }
    }
    return false;
  }

  _cinematic(dt, ctx, carPos) {
    const c = this.cine;
    const cam = this.camera;
    if (c.t > 0.3 && this._blocked(cam.position, ctx.traffic)) {
      this._newShot(ctx);
      c.shot = c.shot === 'heli' ? 'orbit' : 'heli';
      c.t = 0;
    }
    const car = ctx.car, P = car.phys;
    c.t += dt;
    const heading = P.heading;
    const fx = Math.sin(heading), fz = -Math.cos(heading);
    c.fov = 50;
    if (c.shot === 'trackside') {
      if (!c.placed) {
        const L = ctx.layout;
        const ahead = 40 + P.speed * 2.2;
        const d = c.side > 0 ? L.roadEdge - 1.0 : L.medianHalf + 0.9;
        const p = ctx.road.pos(car.proj.s + ahead, d, {});
        c.pos.set(p.X - ctx.origin.x, p.E + 0.9 + Math.random() * 2.2, -(p.Y - ctx.origin.y));
        c.placed = true;
      }
      cam.position.copy(c.pos);
      this.look.copy(carPos).y += 0.7;
      const dist = cam.position.distanceTo(carPos);
      c.fov = clamp(1400 / Math.max(dist, 8), 14, 60);
      const behind = (carPos.x - c.pos.x) * fx + (carPos.z - c.pos.z) * fz;
      if (behind > 30 || c.t > 11) this._newShot(ctx);
    } else if (c.shot === 'orbit') {
      c.ang += dt * 0.32;
      const r = 7.5;
      cam.position.set(carPos.x + Math.cos(c.ang) * r, carPos.y + 1.4 + Math.sin(c.t * 0.4) * 0.4, carPos.z + Math.sin(c.ang) * r);
      this.look.copy(carPos).y += 0.6;
      c.fov = 48;
      if (c.t > 9) this._newShot(ctx);
    } else if (c.shot === 'low') {
      const rx = Math.cos(heading), rz = Math.sin(heading);
      const off = 2.5 * c.side;
      const target = _v2.set(carPos.x + rx * off - fx * (1.5 + Math.sin(c.t * 0.5) * 2), carPos.y + 0.55, carPos.z + rz * off - fz * (1.5 + Math.sin(c.t * 0.5) * 2));
      if (!c.placed) { cam.position.copy(target); c.placed = true; }
      cam.position.lerp(target, 1 - Math.exp(-6 * dt));
      this.look.set(carPos.x + fx * 1.5, carPos.y + 0.5, carPos.z + fz * 1.5);
      c.fov = 40;
      if (c.t > 7) this._newShot(ctx);
    } else {
      // heli
      const target = _v2.set(carPos.x - fx * 26, carPos.y + 13, carPos.z - fz * 26);
      if (!c.placed) { cam.position.copy(target); c.placed = true; }
      cam.position.lerp(target, 1 - Math.exp(-2 * dt));
      this.look.set(carPos.x + fx * 10, carPos.y, carPos.z + fz * 10);
      c.fov = 42;
      if (c.t > 8) this._newShot(ctx);
    }
  }
}
