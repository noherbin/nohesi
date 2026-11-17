// Garage show effects: spark and flame particles, and a shockwave ring on the turntable. Used by the
// customisation screen when a part is previewed or installed (see GarageScene.pulse / install).
import * as THREE from 'three';
import { glowTexture } from '../world/textures.js';

/** A pool of additive glowing particles with gravity and drag, drawn as one Points object. */
export class Particles {
  constructor(parent, n = 360, size = 0.05) {
    this.n = n;
    this.pos = new Float32Array(n * 3);
    this.col = new Float32Array(n * 3);
    this.p = Array.from({ length: n }, () => ({ life: 0, max: 1, x: 0, y: -50, z: 0, vx: 0, vy: 0, vz: 0, r: 1, g: 1, b: 1, grav: 4, drag: 1.2 }));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.mat = new THREE.PointsMaterial({ size, map: glowTexture(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    parent.add(this.points);
    this.next = 0;
    this.alive = 0;
  }

  /**
   * Emit `count` particles from point o (THREE.Vector3). dir: preferred direction (Vector3, optional);
   * spread 0..1 mixes it with a random direction. color / color2: [r, g, b] (a random mix of the two).
   */
  emit(o, count, { speed = 2.4, dir = null, spread = 1, color = [1, 0.82, 0.45], color2 = null, life = [0.45, 1.0], grav = 4, drag = 1.3, jitter = 0.03 } = {}) {
    for (let k = 0; k < count; k++) {
      const q = this.p[this.next];
      this.next = (this.next + 1) % this.n;
      let rx = Math.random() * 2 - 1, ry = Math.random() * 2 - 1, rz = Math.random() * 2 - 1;
      const rl = Math.hypot(rx, ry, rz) || 1;
      rx /= rl; ry /= rl; rz /= rl;
      let dx = rx, dy = ry, dz = rz;
      if (dir) { dx = dir.x * (1 - spread) + rx * spread; dy = dir.y * (1 - spread) + ry * spread; dz = dir.z * (1 - spread) + rz * spread; }
      const dl = Math.hypot(dx, dy, dz) || 1;
      const sp = speed * (0.45 + Math.random() * 0.75);
      q.vx = (dx / dl) * sp; q.vy = (dy / dl) * sp; q.vz = (dz / dl) * sp;
      q.x = o.x + (Math.random() - 0.5) * jitter; q.y = o.y + (Math.random() - 0.5) * jitter; q.z = o.z + (Math.random() - 0.5) * jitter;
      const m = color2 ? Math.random() : 0;
      const c2 = color2 || color;
      q.r = color[0] + (c2[0] - color[0]) * m; q.g = color[1] + (c2[1] - color[1]) * m; q.b = color[2] + (c2[2] - color[2]) * m;
      q.max = q.life = life[0] + Math.random() * (life[1] - life[0]);
      q.grav = grav;
      q.drag = drag;
    }
    this.alive = this.n;
  }

  update(dt) {
    if (!this.alive) return;
    let live = 0;
    const P = this.pos, C = this.col;
    for (let i = 0; i < this.n; i++) {
      const q = this.p[i];
      if (q.life <= 0) { if (C[i * 3] || C[i * 3 + 1] || C[i * 3 + 2]) { C[i * 3] = C[i * 3 + 1] = C[i * 3 + 2] = 0; P[i * 3 + 1] = -50; } continue; }
      live++;
      q.life -= dt;
      const k = Math.exp(-q.drag * dt);
      q.vx *= k; q.vz *= k; q.vy = q.vy * k - q.grav * dt;
      q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
      // sparks skip off the turntable instead of falling through it
      if (q.y < 0.1 && q.vy < 0) { q.y = 0.1; q.vy *= -0.35; q.vx *= 0.7; q.vz *= 0.7; }
      const f = Math.max(0, q.life / q.max);
      const a = f * f * (3 - 2 * f);
      P[i * 3] = q.x; P[i * 3 + 1] = q.y; P[i * 3 + 2] = q.z;
      C[i * 3] = q.r * a; C[i * 3 + 1] = q.g * a; C[i * 3 + 2] = q.b * a;
    }
    this.alive = live ? this.n : 0;
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
  }
}

/** A glowing ring that races out across the turntable floor and fades. */
export class Shockwave {
  constructor(parent) {
    this.mat = new THREE.MeshBasicMaterial({ color: 0xff2e4d, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 96).rotateX(-Math.PI / 2), this.mat);
    this.mesh.position.y = 0.095;
    this.mesh.visible = false;
    parent.add(this.mesh);
    this.t = -1;
  }

  fire(color = 0xff2e4d, r0 = 1.2, r1 = 4.4) {
    this.mat.color.set(color);
    this.t = 0;
    this.r0 = r0;
    this.r1 = r1;
    this.mesh.visible = true;
  }

  update(dt) {
    if (this.t < 0) return;
    this.t += dt / 0.75;
    if (this.t >= 1) { this.t = -1; this.mesh.visible = false; return; }
    const e = 1 - Math.pow(1 - this.t, 3);
    const r = this.r0 + (this.r1 - this.r0) * e;
    this.mesh.scale.set(r, 1, r);
    this.mat.opacity = (1 - this.t) * 1.4;
  }
}
