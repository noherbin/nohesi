// Procedural endless road centerline.
// Coordinates: 2D plane (X right, Y forward), heading H measured clockwise from +Y.
// Rendering maps to three.js as x = X - originX, y = elevation, z = -(Y - originY).

import { mulberry32, lerp, clamp } from '../core/utils.js';

export const DS = 2; // metres between centerline samples

export class RoadPath {
  constructor() {
    this.configure({ road: {} }, 1);
  }

  configure(env, seed) {
    const r = env.road || {};
    this.p = {
      straightMin: r.straightMin ?? 250,
      straightMax: r.straightMax ?? 900,
      radiusMin: r.radiusMin ?? 900,
      radiusMax: r.radiusMax ?? 2600,
      curveMin: r.curveMin ?? 150,
      curveMax: r.curveMax ?? 500,
      transition: r.transition ?? 140,
      gradeMax: r.gradeMax ?? 0.025,
      holdMin: r.holdMin ?? 200,
      holdMax: r.holdMax ?? 700,
    };
    this.rng = mulberry32(seed * 7919 + 13);
    this.X = [0];
    this.Y = [0];
    this.E = [0];
    this.H = [0];
    this.base = 0; // global sample index of X[0]
    this.state = { x: 0, y: 0, e: 0, h: 0 };
    // curvature plan: start with a long straight for spawning
    this.kQueue = [{ len: 420, k0: 0, k1: 0, pos: 0 }];
    this.gQueue = [{ len: 500, g0: 0, g1: 0, pos: 0 }];
    this.curGrade = 0;
  }

  get sMax() { return (this.base + this.X.length - 1) * DS; }
  get sMin() { return this.base * DS; }

  _planCurve() {
    const p = this.p, R = this.rng;
    const straight = lerp(p.straightMin, p.straightMax, R());
    this.kQueue.push({ len: straight, k0: 0, k1: 0, pos: 0 });
    const radius = lerp(p.radiusMin, p.radiusMax, R() * R());
    const dir = R() < 0.5 ? -1 : 1;
    const K = dir / radius;
    const tl = p.transition * (0.7 + R() * 0.6);
    this.kQueue.push({ len: tl, k0: 0, k1: K, pos: 0 });
    this.kQueue.push({ len: lerp(p.curveMin, p.curveMax, R()), k0: K, k1: K, pos: 0 });
    // Occasionally chain an S-curve
    if (R() < 0.3) {
      const K2 = -dir / lerp(p.radiusMin, p.radiusMax, R());
      this.kQueue.push({ len: tl * 1.6, k0: K, k1: K2, pos: 0 });
      this.kQueue.push({ len: lerp(p.curveMin, p.curveMax, R()) * 0.7, k0: K2, k1: K2, pos: 0 });
      this.kQueue.push({ len: tl, k0: K2, k1: 0, pos: 0 });
    } else {
      this.kQueue.push({ len: tl, k0: K, k1: 0, pos: 0 });
    }
  }

  _planGrade() {
    const p = this.p, R = this.rng;
    // mean-reverting toward zero elevation so hills stay modest
    const bias = clamp(-this.state.e / 400, -1, 1) * p.gradeMax * 0.6;
    const target = clamp((R() * 2 - 1) * p.gradeMax + bias, -p.gradeMax, p.gradeMax);
    this.gQueue.push({ len: 160 + R() * 160, g0: this.curGrade, g1: target, pos: 0 });
    this.gQueue.push({ len: lerp(p.holdMin, p.holdMax, R()), g0: target, g1: target, pos: 0 });
    this.curGrade = target;
  }

  _step() {
    if (!this.kQueue.length) this._planCurve();
    if (!this.gQueue.length) this._planGrade();
    const kq = this.kQueue[0], gq = this.gQueue[0];
    const k = lerp(kq.k0, kq.k1, clamp(kq.pos / kq.len, 0, 1));
    const g = lerp(gq.g0, gq.g1, clamp(gq.pos / gq.len, 0, 1));
    kq.pos += DS;
    gq.pos += DS;
    if (kq.pos >= kq.len) this.kQueue.shift();
    if (gq.pos >= gq.len) this.gQueue.shift();
    const st = this.state;
    const hMid = st.h + k * DS * 0.5;
    st.x += Math.sin(hMid) * DS;
    st.y += Math.cos(hMid) * DS;
    st.h += k * DS;
    st.e += g * DS;
    this.X.push(st.x);
    this.Y.push(st.y);
    this.E.push(st.e);
    this.H.push(st.h);
  }

  ensure(sMax) {
    while (this.sMax < sMax) this._step();
  }

  trim(sMin) {
    const drop = Math.floor(sMin / DS) - this.base;
    if (drop > 600) {
      this.X.splice(0, drop);
      this.Y.splice(0, drop);
      this.E.splice(0, drop);
      this.H.splice(0, drop);
      this.base += drop;
    }
  }

  /** Sample the centerline at distance s. */
  sample(s, out = {}) {
    if (s > this.sMax) this.ensure(s + 50);
    let fi = s / DS - this.base;
    if (fi < 0) fi = 0;
    let i = Math.floor(fi);
    const n = this.X.length;
    if (i >= n - 1) i = n - 2;
    const t = fi - i;
    out.X = this.X[i] + (this.X[i + 1] - this.X[i]) * t;
    out.Y = this.Y[i] + (this.Y[i + 1] - this.Y[i]) * t;
    out.E = this.E[i] + (this.E[i + 1] - this.E[i]) * t;
    out.H = this.H[i] + (this.H[i + 1] - this.H[i]) * t;
    out.G = (this.E[i + 1] - this.E[i]) / DS;
    out.K = (this.H[i + 1] - this.H[i]) / DS;
    return out;
  }

  /** World point at road distance s and lateral offset d (positive = right). */
  pos(s, d, out = {}) {
    this.sample(s, out);
    const c = Math.cos(out.H), sn = Math.sin(out.H);
    out.X += c * d;
    out.Y -= sn * d;
    return out;
  }

  /** Project world point onto road -> {s, d}. */
  project(X, Y, sGuess, out = {}) {
    let s = sGuess;
    const tmp = this._tmp || (this._tmp = {});
    for (let it = 0; it < 3; it++) {
      this.sample(s, tmp);
      const fx = Math.sin(tmp.H), fy = Math.cos(tmp.H);
      const dx = X - tmp.X, dy = Y - tmp.Y;
      const ds = Math.max(-150, Math.min(150, dx * fx + dy * fy));
      s += ds;
      if (Math.abs(ds) < 0.01) break;
    }
    this.sample(s, tmp);
    const rx = Math.cos(tmp.H), ry = -Math.sin(tmp.H);
    out.s = s;
    out.d = (X - tmp.X) * rx + (Y - tmp.Y) * ry;
    out.H = tmp.H;
    out.E = tmp.E;
    out.G = tmp.G;
    return out;
  }
}

/** Cross-section layout of the carriageways. */
export function makeLayout(env) {
  const LW = 3.7;
  const n = env.lanes;
  const medianHalf = 0.35;
  const laneStart = medianHalf + 1.5;
  const lanesEnd = laneStart + n * LW;
  const roadEdge = lanesEnd + (env.outerShoulder ?? 3.0);
  return {
    LW, n, medianHalf, laneStart, lanesEnd, roadEdge,
    wallD: roadEdge + 0.3,
    oppLanes: env.oppLanes ?? n,
    laneCenter: (i) => laneStart + (i + 0.5) * LW,
    laneOf: (d) => clamp(Math.floor((d - laneStart) / LW), 0, n - 1),
  };
}
