// Roadside prop geometry builders and an instanced pool allocator.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry32, noise2 } from '../core/utils.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);

function prep(g) {
  // strip attributes so merges are compatible
  const keep = ['position', 'normal', 'uv'];
  for (const k of Object.keys(g.attributes)) if (!keep.includes(k)) g.deleteAttribute(k);
  if (!g.attributes.uv) {
    const n = g.attributes.position.count;
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  }
  return g.index ? g.toNonIndexed() : g;
}

export function merge(list) {
  return mergeGeometries(list.map(prep), false);
}

/** Cylinder between two points. */
export function cylBetween(a, b, r0, r1, seg = 8) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const g = new THREE.CylinderGeometry(r1, r0, len, seg, 1, false);
  g.translate(0, len / 2, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  g.applyQuaternion(q);
  g.translate(a.x, a.y, a.z);
  return g;
}

function box(w, h, d, x, y, z) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(x, y, z);
  return g;
}

/** Highway luminaire. style 'double' (median, arms both sides) or 'single' (roadside, arm to the left). */
export function streetlightGeometry(style) {
  const metal = [], lamp = [];
  const lampPos = [];
  const H = 11;
  const base = [];
  if (style === 'double') {
    // median lights stand on a widened concrete pedestal in the jersey barrier, not through it
    const ped = new THREE.CylinderGeometry(0.42, 0.56, 1.0, 4, 1).rotateY(Math.PI / 4).scale(1, 1, 2.2).translate(0, 0.5, 0);
    base.push(ped);
    metal.push(new THREE.CylinderGeometry(0.11, 0.17, H - 1.0, 8).translate(0, 1.0 + (H - 1.0) / 2, 0));
    metal.push(new THREE.CylinderGeometry(0.24, 0.27, 0.22, 8).translate(0, 1.11, 0));
  } else {
    metal.push(new THREE.CylinderGeometry(0.11, 0.2, H, 8).translate(0, H / 2, 0));
    metal.push(new THREE.CylinderGeometry(0.32, 0.36, 0.5, 8).translate(0, 0.25, 0));
  }
  const sides = style === 'double' ? [-1, 1] : [-1];
  for (const sd of sides) {
    const a = new THREE.Vector3(0, H - 0.6, 0);
    const m1 = new THREE.Vector3(sd * 1.4, H + 0.05, 0);
    const b = new THREE.Vector3(sd * 4.6, H + 0.35, 0);
    metal.push(cylBetween(a, m1, 0.08, 0.07, 6));
    metal.push(cylBetween(m1, b, 0.07, 0.06, 6));
    const head = box(1.0, 0.2, 0.42, sd * 5.0, H + 0.3, 0);
    metal.push(head);
    lamp.push(box(0.75, 0.05, 0.3, sd * 5.0, H + 0.18, 0));
    lampPos.push([sd * 5.0, H + 0.12, 0]);
  }
  return { metal: merge(metal), lamp: merge(lamp), lampPos, base: base.length ? merge(base) : null };
}

export function palmGeometry(seed = 1) {
  const rng = mulberry32(seed);
  const H = 15;
  const trunk = new THREE.CylinderGeometry(0.17, 0.3, H, 7, 10);
  trunk.translate(0, H / 2, 0);
  // gentle lean & ring texture via vertex displacement
  const p = trunk.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    const t = y / H;
    p.setX(i, p.getX(i) + t * t * 0.9);
    const ring = 1 + 0.06 * Math.sin(y * 9);
    p.setX(i, p.getX(i) * ring);
    p.setZ(i, p.getZ(i) * ring);
  }
  trunk.computeVertexNormals();
  const fronds = [];
  const n = 11;
  for (let k = 0; k < n; k++) {
    const ang = (k / n) * Math.PI * 2 + rng() * 0.3;
    const len = 4.2 + rng() * 1.2;
    const droop = 0.6 + rng() * 0.5;
    const segs = 5;
    const verts = [];
    const idx = [];
    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const r = t * len;
      const y = Math.sin(t * Math.PI * 0.55) * 1.2 - t * t * droop * 3.2;
      const w = Math.sin(t * Math.PI) * 0.75 + 0.05;
      const cx = Math.cos(ang) * r, cz = Math.sin(ang) * r;
      const px = -Math.sin(ang) * w, pz = Math.cos(ang) * w;
      verts.push(cx + px, y - w * 0.25, cz + pz, cx - px, y - w * 0.25, cz - pz, cx, y + 0.05, cz);
      if (s > 0) {
        const b = (s - 1) * 3, c = s * 3;
        idx.push(b, c, b + 2, c, c + 2, b + 2, b + 1, b + 2, c + 1, c + 1, b + 2, c + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    g.translate(0.9, H, 0);
    fronds.push(g);
  }
  fronds.push(new THREE.SphereGeometry(0.45, 6, 5).translate(0.9, H - 0.1, 0));
  return { trunk, crown: merge(fronds) };
}

function blob(r, detail, seed, squash = 1) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    _p.fromBufferAttribute(p, i);
    const n = 1 + 0.22 * noise2(_p.x * 1.7 + seed, _p.z * 1.7 + _p.y * 0.8, seed);
    p.setXYZ(i, _p.x * n, _p.y * n * squash, _p.z * n);
  }
  g.computeVertexNormals();
  return g;
}

export function treeGeometry(seed = 2) {
  const trunk = new THREE.CylinderGeometry(0.16, 0.28, 4.2, 6).translate(0, 2.1, 0);
  const rng = mulberry32(seed);
  const leaves = [];
  for (let i = 0; i < 4; i++) {
    const r = 1.8 + rng() * 1.2;
    leaves.push(blob(r, 1, seed + i, 0.85).translate((rng() - 0.5) * 2, 4.4 + rng() * 2.4, (rng() - 0.5) * 2));
  }
  return { trunk, leaves: merge(leaves) };
}

export function bushGeometry(seed = 3) {
  return merge([blob(1.0, 1, seed, 0.7).translate(0, 0.5, 0), blob(0.8, 1, seed + 9, 0.7).translate(0.8, 0.4, 0.3)]);
}

export function cactusGeometry() {
  const parts = [];
  parts.push(new THREE.CylinderGeometry(0.32, 0.36, 6, 8).translate(0, 3, 0));
  parts.push(new THREE.SphereGeometry(0.32, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, 6, 0));
  for (const [sx, y0, h] of [[1, 2.4, 2.2], [-1, 3.2, 1.8]]) {
    parts.push(new THREE.CylinderGeometry(0.22, 0.22, 1.0, 7).rotateZ(Math.PI / 2).translate(sx * 0.7, y0, 0));
    parts.push(new THREE.CylinderGeometry(0.22, 0.24, h, 7).translate(sx * 1.15, y0 + h / 2, 0));
    parts.push(new THREE.SphereGeometry(0.22, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2).translate(sx * 1.15, y0 + h, 0));
  }
  return merge(parts);
}

export function rockGeometry(seed = 4) {
  const g = blob(1.2, 1, seed, 0.6);
  g.translate(0, 0.25, 0);
  return g;
}

/** Building prototype box with per-face UV scaled to its dimensions. */
export function buildingGeometry(w, h, d, floorsPerTile, baysPerTile) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(0, h / 2, 0);
  const uv = g.attributes.uv;
  const pos = g.attributes.position;
  const nrm = g.attributes.normal;
  // tile texture by floor height (~3.6m) and bay width (~4m)
  const tileH = 3.6 * floorsPerTile, tileW = 4 * baysPerTile;
  for (let i = 0; i < uv.count; i++) {
    const nx = Math.abs(nrm.getX(i)), ny = Math.abs(nrm.getY(i));
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    if (ny > 0.5) {
      uv.setXY(i, 0.004, 0.5); // roof: sample a plain corner
    } else {
      const horiz = nx > 0.5 ? z : x;
      uv.setXY(i, horiz / tileW, y / tileH);
    }
  }
  return g;
}

export function billboardGeometry() {
  const frame = [];
  frame.push(new THREE.CylinderGeometry(0.25, 0.3, 9, 8).translate(0, 4.5, 0));
  frame.push(box(12.4, 0.3, 0.4, 0, 9.0, 0));
  frame.push(box(12.4, 0.3, 0.4, 0, 15.2, 0));
  frame.push(box(12.6, 6.6, 0.25, 0, 12.1, 0));
  // Panel faces +z: back toward approaching traffic (local -z is the travel direction).
  const panel = new THREE.PlaneGeometry(12, 6).translate(0, 12.1, 0.14);
  return { frame: merge(frame), panel };
}

export function speedSignGeometry() {
  const post = merge([box(0.08, 2.4, 0.08, 0, 1.2, 0)]);
  const plate = new THREE.PlaneGeometry(0.75, 0.95).translate(0, 2.3, 0.05);
  return { post, plate };
}

/** Allocates instances of a multi-part prop in shared InstancedMeshes. */
export class PropPool {
  constructor(scene, parts, capacity, { colors = false } = {}) {
    this.capacity = capacity;
    this.meshes = parts.map((p) => {
      const m = new THREE.InstancedMesh(p.geometry, p.material, capacity);
      m.frustumCulled = false;
      m.castShadow = !!p.castShadow;
      m.receiveShadow = !!p.receiveShadow;
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      if (p.renderOrder) m.renderOrder = p.renderOrder;
      for (let i = 0; i < capacity; i++) m.setMatrixAt(i, ZERO);
      if (colors) {
        m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3).fill(1), 3);
      }
      scene.add(m);
      return m;
    });
    this.data = new Float64Array(capacity * 8); // X, Y, E, yaw, sx, sy, sz, pitch
    this.active = new Uint8Array(capacity);
    this.dirty = false;
    this.hi = 0; // draw count = highest active index + 1
    for (const m of this.meshes) m.count = 0;
  }
  add(X, Y, E, yaw, sx, sy, sz, origin, color, pitch = 0) {
    // lowest free slot keeps instances packed so the draw count stays small
    let idx = -1;
    for (let i = 0; i < this.capacity; i++) if (!this.active[i]) { idx = i; break; }
    if (idx < 0) return -1;
    const o = idx * 8;
    const d = this.data;
    d[o] = X; d[o + 1] = Y; d[o + 2] = E; d[o + 3] = yaw;
    d[o + 4] = sx; d[o + 5] = sy; d[o + 6] = sz; d[o + 7] = pitch;
    this.active[idx] = 1;
    if (idx + 1 > this.hi) { this.hi = idx + 1; for (const m of this.meshes) m.count = this.hi; }
    this._write(idx, origin);
    if (color) for (const m of this.meshes) if (m.instanceColor) { m.setColorAt(idx, color); m.instanceColor.needsUpdate = true; }
    return idx;
  }
  remove(idx) {
    if (idx < 0 || !this.active[idx]) return;
    this.active[idx] = 0;
    for (const m of this.meshes) m.setMatrixAt(idx, ZERO);
    while (this.hi > 0 && !this.active[this.hi - 1]) this.hi--;
    for (const m of this.meshes) m.count = this.hi;
    this.dirty = true;
  }
  _write(idx, origin) {
    const d = this.data, o = idx * 8;
    _p.set(d[o] - origin.x, d[o + 2], -(d[o + 1] - origin.y));
    _e.set(d[o + 7], -d[o + 3], 0, 'YXZ');
    _q.setFromEuler(_e);
    _s.set(d[o + 4], d[o + 5], d[o + 6]);
    _m.compose(_p, _q, _s);
    for (const m of this.meshes) m.setMatrixAt(idx, _m);
    this.dirty = true;
  }
  rebase(origin) {
    for (let i = 0; i < this.capacity; i++) if (this.active[i]) this._write(i, origin);
  }
  flush() {
    if (!this.dirty) return;
    for (const m of this.meshes) m.instanceMatrix.needsUpdate = true;
    this.dirty = false;
  }
  clear() {
    for (let i = 0; i < this.capacity; i++) if (this.active[i]) this.remove(i);
  }
  dispose(scene) {
    for (const m of this.meshes) {
      scene.remove(m);
      m.dispose();
    }
  }
}

/** Simple object pool for unique Object3Ds (gantries, overpasses). */
export class ObjectPool {
  constructor(factory) {
    this.factory = factory;
    this.free = [];
  }
  get() {
    return this.free.pop() || this.factory();
  }
  release(o) {
    o.visible = false;
    this.free.push(o);
  }
}
