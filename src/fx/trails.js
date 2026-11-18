// Tail-light trails: two glowing red ribbons left behind the player's outermost tail lamps after dark,
// like a long-exposure photo. Points are dropped in world space as the car moves, so lane changes and
// slides draw curves; each ribbon is rebuilt every frame as a camera-facing strip that tapers and fades.
import * as THREE from 'three';
import { smoothstep } from '../core/utils.js';

const N = 48; // points per ribbon
const LIFE = 0.09; // seconds a point lives
const MAX_LEN = 3; // metres

function profileTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 4;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 64, 0);
  g.addColorStop(0, '#000');
  g.addColorStop(0.3, '#2a2a2a');
  g.addColorStop(0.46, '#fff');
  g.addColorStop(0.54, '#fff');
  g.addColorStop(0.7, '#2a2a2a');
  g.addColorStop(1, '#000');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class LightTrails {
  constructor(scene) {
    this.rib = [{ pts: [] }, { pts: [] }];
    const nv = 2 * N * 2;
    this.pos = new Float32Array(nv * 3);
    this.col = new Float32Array(nv * 3);
    const uv = new Float32Array(nv * 2);
    const idx = [];
    for (let r = 0; r < 2; r++) {
      for (let i = 0; i < N; i++) {
        const v = (r * N + i) * 2;
        uv[v * 2] = 0; uv[v * 2 + 1] = i / (N - 1);
        uv[v * 2 + 2] = 1; uv[v * 2 + 3] = i / (N - 1);
        if (i < N - 1) idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(idx);
    this.mat = new THREE.MeshBasicMaterial({
      map: profileTexture(), vertexColors: true, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    });
    this.mesh = new THREE.Mesh(g, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 4;
    this.mesh.visible = false;
    scene.add(this.mesh);
    this._a = new THREE.Vector3();
    this._t = new THREE.Vector3();
    this._c = new THREE.Vector3();
    this._s = new THREE.Vector3();
    this._lampsOf = null;
    this._pair = [0, 0];
  }

  clear() {
    for (const r of this.rib) r.pts.length = 0;
    this.mesh.visible = false;
  }

  shift(dx, dz) {
    for (const r of this.rib) for (const p of r.pts) { p.x += dx; p.z += dz; }
  }

  /** the outermost tail lamp on each side of this model */
  _pick(list) {
    if (this._lampsOf === list) return this._pair;
    let lo = 0, hi = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i][0] < list[lo][0]) lo = i;
      if (list[i][0] > list[hi][0]) hi = i;
    }
    this._lampsOf = list;
    this._pair = [lo, hi];
    return this._pair;
  }

  /**
   * intensity 0..1 (lights on x speed), brake 0..1
   */
  update(dt, car, cam, intensity, brake) {
    const list = car.model.lamps.tail;
    if (!list || list.length === 0 || (intensity < 0.01 && this.rib[0].pts.length === 0)) { this.mesh.visible = false; return; }
    const body = car.model.body;
    body.updateWorldMatrix(true, false);
    const pair = this._pick(list);
    for (let r = 0; r < 2; r++) {
      const L = list[pair[r]];
      const p = this._a.set(L[0], L[1], L[2]).applyMatrix4(body.matrixWorld);
      const pts = this.rib[r].pts;
      for (const q of pts) q.age += dt;
      while (pts.length && pts[pts.length - 1].age > LIFE) pts.pop();
      const head = pts[0];
      if (head && Math.hypot(p.x - head.x, p.y - head.y, p.z - head.z) > 20) pts.length = 0; // teleported
      if (intensity > 0.01) {
        const h0 = pts[0], h1 = pts[1];
        // keep the head on the lamp; drop a new point once the lamp is far enough from the last one left behind
        if (h0 && h1 && Math.hypot(p.x - h1.x, p.z - h1.z) < 0.35) { h0.x = p.x; h0.y = p.y; h0.z = p.z; h0.age = 0; }
        else pts.unshift({ x: p.x, y: p.y, z: p.z, age: 0 });
        if (pts.length > N) pts.length = N;
      }
      // cap the length
      let len = 0;
      for (let i = 1; i < pts.length; i++) {
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
        if (len > MAX_LEN) { pts.length = i + 1; break; }
      }
    }
    this._build(cam, intensity, brake);
  }

  _build(cam, intensity, brake) {
    const P = this.pos, C = this.col, t = this._t, c = this._c, s = this._s;
    let any = false;
    const glow = intensity * (1 + brake * 0.6);
    for (let r = 0; r < 2; r++) {
      const pts = this.rib[r].pts;
      const n = pts.length;
      let dist = 0;
      for (let i = 0; i < N; i++) {
        const v = (r * N + i) * 2;
        if (i >= n || n < 2) {
          // collapse unused vertices onto the last point (zero area, black)
          const q = n ? pts[n - 1] : { x: 0, y: -999, z: 0 };
          for (let k = 0; k < 2; k++) {
            P[(v + k) * 3] = q.x; P[(v + k) * 3 + 1] = q.y; P[(v + k) * 3 + 2] = q.z;
            C[(v + k) * 3] = 0; C[(v + k) * 3 + 1] = 0; C[(v + k) * 3 + 2] = 0;
          }
          continue;
        }
        any = true;
        const q = pts[i];
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
        t.set(a.x - b.x, a.y - b.y, a.z - b.z);
        c.set(cam.position.x - q.x, cam.position.y - q.y, cam.position.z - q.z);
        s.crossVectors(t, c);
        const sl = s.length();
        if (sl < 1e-5) s.set(0, 0.05, 0); else s.multiplyScalar(1 / sl);
        // fade by age and along the strip; the head is brightest and widest
        if (i > 0) dist += Math.hypot(q.x - pts[i - 1].x, q.z - pts[i - 1].z);
        const f = Math.min(1, Math.max(dist / MAX_LEN, q.age / LIFE, i === n - 1 ? 1 : 0));
        const fade = (1 - f) * (1 - f) * (1 - f);
        const w = 0.03 * (1 - 0.6 * f) * (1 + brake * 0.25);
        const k = glow * fade;
        for (let side = 0; side < 2; side++) {
          const sg = side ? w : -w;
          P[(v + side) * 3] = q.x + s.x * sg;
          P[(v + side) * 3 + 1] = q.y + s.y * sg;
          P[(v + side) * 3 + 2] = q.z + s.z * sg;
          C[(v + side) * 3] = 0.75 * k;
          C[(v + side) * 3 + 1] = 0.04 * k;
          C[(v + side) * 3 + 2] = 0.03 * k;
        }
      }
    }
    this.mesh.visible = any;
    const g = this.mesh.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.color.needsUpdate = true;
  }
}
