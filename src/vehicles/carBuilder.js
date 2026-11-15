// Procedural car models built from lofted cross-sections.
// Car-local frame: x right, y up, z backward (forward is -z). Origin at ground level, mid-length.
import * as THREE from 'three';
import { merge } from '../world/props.js';
import { makeMonotone, clamp, lerp } from '../core/utils.js';
import { plateTexture, blobShadowTexture, grilleMeshTexture, tireTexture } from '../world/textures.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { interiorFor } from '../config/interiors.js';
import { brakeDiscTexture, orangePeelNormal } from '../camera/interiorTextures.js';
const roundBox = (w, h, d, r) => new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3));

/* ------------------------------------------------------------ templates */
/**
 * Half cross-section of the body, from bottom centre (0,0) to top centre (0,1); x is a fraction of the half width.
 * Superellipse lower/upper halves, then sculpted: the sill tucks under, the flank carries a crisp
 * shoulder crease and a soft scallop lower down (the light lines that make real bodywork read as metal),
 * then resampled by arc length so flat areas don't waste vertices and the crease stays sharp.
 */
function sectionTemplate(sect, N = 24) {
  const { s, nt, nb } = sect;
  const tuck = sect.tuck ?? 0.05;
  const crease = sect.crease ?? 0.011, cy = s + (sect.creaseY ?? 0.07), cw = sect.creaseW ?? 0.022;
  const scallop = sect.scallop ?? 0.012, sy = sect.scallopY ?? s * 0.55;
  const dense = [];
  const Q = 90;
  for (let i = 0; i <= Q; i++) {
    const ph = -Math.PI / 2 + (i / Q) * (Math.PI / 2);
    const c = Math.cos(ph), sn = Math.sin(ph);
    dense.push([Math.pow(Math.abs(c), 2 / nb), s + s * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / nb)]);
  }
  for (let i = 1; i <= Q; i++) {
    const ph = (i / Q) * (Math.PI / 2);
    dense.push([Math.pow(Math.cos(ph), 2 / nt), s + (1 - s) * Math.pow(Math.sin(ph), 2 / nt)]);
  }
  dense[0][0] = 0;
  dense[dense.length - 1][0] = 0;
  const shape = (x, y) => {
    if (x <= 0) return 0;
    let k = 1 - tuck * Math.pow(1 - Math.min(1, y / (s * 0.75)), 2);
    let xx = x * k;
    // features only on the flank (where the section is near full width)
    const flank = Math.min(1, Math.max(0, (x - 0.82) / 0.12));
    xx += flank * (crease * Math.exp(-Math.pow((y - cy) / cw, 2)) - scallop * Math.exp(-Math.pow((y - sy) / 0.09, 2)));
    return xx;
  };
  const pts = dense.map(([x, y]) => [shape(x, y), y]);
  // arc-length resample, always keeping the crease crest and its flanks
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], (pts[i][1] - pts[i - 1][1]) * 1.6));
  const total = acc[acc.length - 1];
  const keepY = [cy - cw * 1.2, cy - cw * 0.45, cy, cy + cw * 0.45, cy + cw * 1.2, s];
  const out = [];
  let j = 0;
  for (let k = 0; k <= N; k++) {
    const target = (k / N) * total;
    while (j < acc.length - 2 && acc[j + 1] < target) j++;
    const f = (target - acc[j]) / Math.max(1e-9, acc[j + 1] - acc[j]);
    out.push([pts[j][0] + (pts[j + 1][0] - pts[j][0]) * f, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * f]);
  }
  for (const yk of keepY) {
    if (yk <= 0.01 || yk >= 0.99) continue;
    let i = 1;
    while (i < pts.length && pts[i][1] < yk) i++;
    if (i >= pts.length) continue;
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    out.push([x0 + (x1 - x0) * ((yk - y0) / (y1 - y0 || 1e-6)), yk]);
  }
  out.sort((a, b) => a[1] - b[1] || b[0] - a[0]);
  // drop near-duplicates, keep the profile strictly increasing in y except the flat bottom/top runs
  const res = [out[0]];
  for (let i = 1; i < out.length; i++) {
    const p = out[i], q = res[res.length - 1];
    if (Math.abs(p[1] - q[1]) < 1e-4 && Math.abs(p[0] - q[0]) < 1e-3) continue;
    res.push(p);
  }
  // bottom run must go outward (x increasing) and top run inward: fix ordering at equal y
  res.sort((a, b) => {
    if (Math.abs(a[1] - b[1]) > 1e-6) return a[1] - b[1];
    return a[1] < 0.5 ? a[0] - b[0] : b[0] - a[0];
  });
  res[0] = [0, 0];
  res[res.length - 1] = [0, 1];
  return res;
}

function templateX(tpl, yn) {
  if (yn <= 0) return tpl[1][0] * 0.0 + tpl[0][0];
  for (let i = 1; i < tpl.length; i++) {
    if (yn <= tpl[i][1]) {
      const [x0, y0] = tpl[i - 1], [x1, y1] = tpl[i];
      return x0 + (x1 - x0) * ((yn - y0) / (y1 - y0 || 1e-6));
    }
  }
  return 0;
}

function bump(t, c, w) {
  const u = (t - c) / w;
  return Math.abs(u) >= 1 ? 0 : 0.5 + 0.5 * Math.cos(u * Math.PI);
}

/** Geometric context for a body definition. */
export function bodyContext(b, custom = {}, hi = true) {
  const L = b.L, W = b.W;
  const widen = custom.kit === 'wide' ? 0.07 : 0;
  const lower = custom.suspension === 'slammed' ? 0.07 : custom.suspension === 'lowered' ? 0.035 : 0;
  const top = makeMonotone(b.top);
  const bot = makeMonotone(b.bottom);
  const plan = { f: 0.075, r: 0.06, fp: 2.6, rp: 2.6, hips: 0, flare: 0, waist: 0, ...(b.plan || {}) };
  // squarer tail in plan: flat rear panel with rounded corners instead of a rounded tub
  plan.rp = Math.max(plan.rp, 3.4);
  const sect = { s: 0.45, nt: 3.0, nb: 7, ...(b.sect || {}) };
  // flatter upper surfaces and crisper shoulders than the raw catalogue values
  sect.nt = Math.max(sect.nt, 3.0) * 1.35;
  const tpl = sectionTemplate(sect, hi ? 30 : 12);
  const tFA = b.fa; // front axle t
  const zf = -L / 2 + tFA * L, zr = zf + b.wb;
  const tRA = (zr + L / 2) / L;
  const wr = b.wr, tw = b.tw ?? 0.25;
  const lowerAmt = custom.suspension === 'slammed' ? 0.07 : custom.suspension === 'lowered' ? 0.035 : 0;
  const archR = wr + 0.045 + lowerAmt * 0.85;
  const z = (t) => -L / 2 + t * L;
  const hw = (t) => {
    let w = W / 2;
    if (t < plan.f) w *= Math.pow(Math.max(0, 1 - Math.pow((plan.f - t) / plan.f, plan.fp)), 1 / plan.fp);
    if (t > 1 - plan.r) w *= Math.pow(Math.max(0, 1 - Math.pow((t - (1 - plan.r)) / plan.r, plan.rp)), 1 / plan.rp);
    const shape = 1 + plan.hips * bump(t, tRA, 0.16) + plan.flare * bump(t, tFA, 0.12) - plan.waist * bump(t, (tFA + tRA) / 2, 0.22);
    return w * shape + widen * (bump(t, tRA, 0.11) + bump(t, tFA, 0.1)) * 0.5;
  };
  const archTop = (za) => wr + archR - lower;
  const botA = (t) => {
    let y = bot(t);
    const zz = z(t);
    for (const za of [zf, zr]) {
      const dz = zz - za;
      if (Math.abs(dz) < archR) y = Math.max(y, wr - lower + Math.sqrt(archR * archR - dz * dz));
    }
    return Math.min(y, top(t) - 0.05);
  };
  const ctx = { b, L, W, H: b.H, wr, tw, zf, zr, tFA, tRA, archR, z, hw, top, bot, botA, tpl, plan, sect, lower, widen, archTop };
  // bonnet sits slightly below the wing tops (fender peaks), boot lid a little too
  const cab = b.cabin;
  ctx.dip = (t, xn) => {
    const ax = Math.abs(xn);
    if (ax >= 0.8 || !cab) return 0;
    let d = 0;
    const hood = b.hoodDip ?? 0.028;
    if (t < cab.t0) d = hood * Math.min(1, Math.max(0, (t - 0.015) / 0.06)) * Math.min(1, Math.max(0, (cab.t0 - t) / 0.03));
    else if (t > cab.t3) d = (b.deckDip ?? 0.012) * Math.min(1, (t - cab.t3) / 0.03) * Math.min(1, Math.max(0, (0.985 - t) / 0.04));
    return d * Math.pow(1 - (ax / 0.8) * (ax / 0.8), 1.5);
  };
  ctx.track = W - tw - 0.05 + widen * 2; // tyres sit nearly flush with the arches, like a real car
  ctx.frontZ = (x, y) => surfZ(ctx, x, y, true) ?? z(0.04);
  ctx.rearZ = (x, y) => surfZ(ctx, x, y, false) ?? z(0.96);
  ctx.halfWAt = (t, y) => {
    const bt = botA(t), tp = top(t);
    const yn = (y - bt) / (tp - bt);
    if (yn < 0 || yn > 1) return 0;
    return hw(t) * templateX(tpl, yn);
  };
  return ctx;
}

function surfZ(ctx, x, y, front) {
  // scan inward from the bumper until the section is wide enough, then bisect for precision
  const steps = 70;
  let prev = front ? 0 : 1;
  const ax = Math.abs(x);
  for (let i = 0; i <= steps; i++) {
    const t = front ? (i / steps) * 0.35 : 1 - (i / steps) * 0.35;
    const wt = ctx.halfWAt(t, y);
    if (wt > 0.0005 && wt >= ax) {
      if (i === 0) return ctx.z(t);
      let a = prev, b = t;
      for (let k = 0; k < 10; k++) {
        const m = (a + b) / 2;
        const wm = ctx.halfWAt(m, y);
        if (wm > 0.0005 && wm >= ax) b = m;
        else a = m;
      }
      return ctx.z(b);
    }
    prev = t;
  }
  return null;
}

function stations(n = 64) {
  const ends = [0, 0.003, 0.008, 0.015, 0.024, 0.035, 0.048, 0.062];
  const ts = [...ends];
  const a = 0.075, bb = 0.925;
  for (let i = 0; i <= n; i++) ts.push(a + ((bb - a) * i) / n);
  for (let i = ends.length - 1; i >= 0; i--) ts.push(1 - ends[i]);
  return ts;
}

/* ------------------------------------------------------------ lofts */
function loftBody(ctx, trimH = 0.06, hi = true) {
  const ts = stations(hi ? 72 : 34);
  const tpl = ctx.tpl;
  const s = ctx.sect.s;
  // Inner wheel-well wall position (normalised half width)
  const xc = clamp((ctx.track / 2 - ctx.tw / 2 - 0.03) / (ctx.W / 2), 0.4, 0.86);
  const half = [[0, 0], [xc * 0.5, 0], [xc - 0.004, 0], [xc + 0.012, 0.002]];
  for (const p of tpl) if (p[1] > 0.002 && p[0] > xc + 0.03) half.push([p[0], p[1]]);
  half.push([0, 1]);
  // ensure the upper quarter points (which drop below xc) are included in order
  const upper = tpl.filter((p) => p[1] > s && p[0] <= xc + 0.03 && p[0] > 0);
  half.splice(half.length - 1, 0, ...upper);
  half.sort((a, b) => (a[1] - b[1]) || (a[0] - b[0]));
  const ring = [];
  for (const p of half) ring.push([p[0], p[1]]);
  for (let i = half.length - 2; i >= 1; i--) ring.push([-half[i][0], half[i][1]]);
  const R = ring.length;
  // tag the wheel-well inner wall (floor edge = 1, top of wall = 2) so it can follow the tyres' inner faces
  const wallTag = ring.map(([x, y]) => (Math.abs(Math.abs(x) - (xc - 0.004)) < 1e-6 && y === 0 ? 1 : Math.abs(Math.abs(x) - (xc + 0.012)) < 1e-6 && y === 0.002 ? 2 : 0));
  const xInnerAbs = ctx.track / 2 - ctx.tw / 2 - 0.03;
  const pos = new Float32Array(ts.length * R * 3);
  const fenderT = 0.065;
  for (let i = 0; i < ts.length; i++) {
    const t = ts[i];
    const w = ctx.hw(t), b0 = ctx.bot(t), t0 = ctx.top(t), zz = ctx.z(t);
    let archY = -Infinity;
    for (const za of [ctx.zf, ctx.zr]) {
      const dz = zz - za;
      if (Math.abs(dz) < ctx.archR) archY = Math.max(archY, ctx.wr + Math.sqrt(ctx.archR * ctx.archR - dz * dz) - ctx.lower);
    }
    let nearArch = false;
    for (const za of [ctx.zf, ctx.zr]) if (Math.abs(zz - za) < ctx.archR * 1.2) nearArch = true;
    const xcS = clamp(xInnerAbs / Math.max(0.3, w), 0.3, 0.97);
    for (let j = 0; j < R; j++) {
      const o = (i * R + j) * 3;
      let [xn, yn] = ring[j];
      if (nearArch && wallTag[j]) xn = Math.sign(xn) * (wallTag[j] === 1 ? Math.min(xc - 0.004, xcS - 0.004) : Math.min(xc + 0.012, xcS + 0.012));
      let y = b0 + yn * (t0 - b0) - ctx.lower;
      if (yn > s) y -= ctx.dip(t, xn) * Math.min(1, (yn - s) / (1 - s) * 2.5);
      if (Math.abs(xn) > Math.min(xc, xcS) && wallTag[j] !== 1 && archY > -1) {
        if (yn <= s + 1e-4) y = Math.max(y, archY);
        else y = Math.max(y, archY + fenderT * (0.6 + 0.4 * Math.min(1, (Math.abs(xn) - xc) / 0.15)));
      }
      // muscular haunches over the wheels: the flank swells slightly around each arch
      let xs = xn * w;
      if (Math.abs(xn) > xc && yn > s * 0.5 && yn < 0.97) {
        let hb = 0;
        for (const za of [ctx.zf, ctx.zr]) {
          const u = (zz - za) / (ctx.archR * 1.55);
          if (Math.abs(u) < 1) hb = Math.max(hb, 0.5 + 0.5 * Math.cos(u * Math.PI));
        }
        const vy = Math.min(1, (yn - s * 0.5) / (s * 0.5)) * Math.min(1, (0.97 - yn) / 0.25);
        xs *= 1 + (ctx.b.haunch ?? 0.022) * hb * vy;
      }
      pos[o] = xs;
      pos[o + 1] = y;
      pos[o + 2] = zz;
    }
  }
  const paint = [], trim = [], cabinTop = [];
  const cab = ctx.b.cabin;
  for (let i = 0; i < ts.length - 1; i++) {
    const tm = (ts[i] + ts[i + 1]) / 2;
    const inCabin = cab && tm > cab.t0 + 0.004 && tm < cab.t3 - 0.004;
    for (let j = 0; j < R; j++) {
      const a = i * R + j, bq = i * R + ((j + 1) % R), c = (i + 1) * R + j, d = (i + 1) * R + ((j + 1) % R);
      const yn = (ring[j][1] + ring[(j + 1) % R][1]) / 2;
      const xn = Math.max(Math.abs(ring[j][0]), Math.abs(ring[(j + 1) % R][0]));
      // the body's upper skin under the greenhouse is "interior": kept separate so the cockpit view can hide it
      const list = yn < trimH ? trim : inCabin && yn > 0.7 && xn < 0.9 ? cabinTop : paint;
      list.push(a, bq, c, bq, d, c);
    }
  }
  return [indexedGeo(pos, paint), indexedGeo(pos, trim), indexedGeo(pos, cabinTop)];
}

function indexedGeo(pos, idx) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function loftCabin(ctx, hi = true) {
  const c = ctx.b.cabin;
  const n = hi ? 40 : 18;
  const ts = [];
  for (let i = 0; i <= n; i++) ts.push(c.t0 + ((c.t3 - c.t0) * i) / n);
  const roofY = (t) => {
    const yb = ctx.top(t);
    if (t <= c.t1) {
      const u = (t - c.t0) / (c.t1 - c.t0);
      return yb + (c.roof - yb) * Math.pow(Math.sin((u * Math.PI) / 2), c.wsCurve ?? 0.85);
    }
    if (t <= c.t2) {
      const u = (t - c.t1) / (c.t2 - c.t1);
      return c.roof + (c.roofArc ?? 0.02) * Math.sin(u * Math.PI);
    }
    const u = (t - c.t2) / (c.t3 - c.t2);
    const yb2 = ctx.top(c.t3);
    return c.roof + (yb2 - c.roof) * Math.pow(u, c.rearCurve ?? 1.25);
  };
  // side: 3 glass bands + a thin window-frame band, then a 3-segment corner (A-pillar / roof rail)
  const SIDE = 4;
  const half = (t) => {
    const wb = ctx.hw(t) * (c.wBot ?? 0.86);
    // glass starts where the body surface actually is at that width (no floating greenhouse)
    const yb = Math.min(ctx.top(t) - 0.02, bodyYAtX(ctx, t, wb) + 0.004) - ctx.lower;
    const yt = Math.max(yb + 0.002, roofY(t) - ctx.lower);
    const wt = wb * (1 - (c.tumble ?? 0.2));
    const h = yt - yb;
    const r = Math.min(0.075, h * 0.3, wt * 0.3);
    const crown = (c.crown ?? 0.03) * Math.min(1, h / 0.3);
    const pts = [];
    const sideH = Math.max(1e-3, h - r);
    const uf = 1 - Math.min(0.3, 0.03 / sideH);
    for (const u of [0, uf / 3, (2 * uf) / 3, uf, 1]) pts.push([lerp(wb, wt, u), lerp(yb, yt - r, u)]);
    for (let i = 1; i <= 3; i++) {
      const a = (i / 3) * (Math.PI / 2);
      pts.push([wt - r + Math.cos(a) * r, yt - r + Math.sin(a) * r]);
    }
    pts.push([(wt - r) * 0.5, yt + crown * 0.75]);
    pts.push([0, yt + crown]);
    return pts;
  };
  const sample = half(ts[0]);
  const H = sample.length; // points per half including center
  const R = H * 2 - 1;
  const pos = new Float32Array(ts.length * R * 3);
  for (let i = 0; i < ts.length; i++) {
    const t = ts[i];
    const hp = half(t);
    const zz = ctx.z(t);
    for (let j = 0; j < R; j++) {
      const k = j < H ? j : R - 1 - j;
      const sgn = j < H ? 1 : -1;
      const p = hp[k];
      const o = (i * R + j) * 3;
      pos[o] = p[0] * sgn;
      pos[o + 1] = p[1];
      pos[o + 2] = zz;
    }
  }
  const glass = [], paint = [], pillar = [], frame = [];
  const tB = c.tB;
  const quarter = c.quarter ?? 2;
  const aPillar = c.blackPillars ? pillar : paint;
  for (let i = 0; i < ts.length - 1; i++) {
    const tm = (ts[i] + ts[i + 1]) / 2;
    for (let j = 0; j < R - 1; j++) {
      // ring segment class (mirror for left side)
      const jj = j < H - 1 ? j : R - 2 - j;
      const cls = jj < SIDE - 1 ? 'side' : jj === SIDE - 1 ? 'frame' : jj < SIDE + 3 ? 'corner' : 'roof';
      let list;
      const sideGlass = tm < c.t1 || (tm <= quarter && !(tB && Math.abs(tm - tB) < 0.016));
      if (cls === 'side') list = sideGlass ? glass : (tB && Math.abs(tm - tB) < 0.016) ? pillar : paint;
      else if (cls === 'frame') list = sideGlass || (tB && Math.abs(tm - tB) < 0.016) ? frame : paint;
      else if (cls === 'corner') list = tm < c.t1 ? aPillar : paint;
      else list = tm < c.t1 || tm > c.t2 ? glass : paint;
      // right side winding: going up the ring then back along z gives outward normal
      const a = i * R + j, b = i * R + j + 1, cc = (i + 1) * R + j, d = (i + 1) * R + j + 1;
      list.push(a, b, cc, b, d, cc);
    }
  }
  return { glass: indexedGeo(pos, glass), paint: indexedGeo(pos, paint), pillar: indexedGeo(pos, [...pillar, ...frame]) };
}

/* ------------------------------------------------------------ wheels */
export function wheelGeometries(r, w, style, hi = true) {
  const seg = hi ? 28 : 14;
  const rr = r * (hi ? 0.7 : 0.66);
  const tireProf = [
    [rr, -w / 2], [r - 0.035, -w / 2], [r - 0.008, -w / 2 + 0.03], [r, -w / 2 + 0.06],
    [r, w / 2 - 0.06], [r - 0.008, w / 2 - 0.03], [r - 0.035, w / 2], [rr, w / 2],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const tire = new THREE.LatheGeometry(tireProf, seg).rotateZ(-Math.PI / 2);
  // Rim: barrel + outer lip + spokes on the +x (outer) face
  const parts = [];
  const barrel = new THREE.LatheGeometry([
    new THREE.Vector2(rr * 0.98, w / 2 - 0.012), new THREE.Vector2(rr * 0.96, w / 2 - 0.05),
    new THREE.Vector2(rr * 0.94, -w / 2 + 0.03), new THREE.Vector2(rr * 0.9, -w / 2 + 0.02),
  ], seg).rotateZ(-Math.PI / 2);
  parts.push(barrel);
  const lip = style === 'deep' ? 0.06 : 0.025;
  parts.push(new THREE.CylinderGeometry(rr, rr, 0.02, seg, 1, true).rotateZ(Math.PI / 2).translate(w / 2 - 0.02, 0, 0));
  parts.push(new THREE.RingGeometry(rr - lip, rr * 1.005, seg).rotateY(Math.PI / 2).translate(w / 2 - 0.012, 0, 0));
  const face = w / 2 - (style === 'deep' ? 0.07 : 0.035);
  const hub = rr * 0.24;
  parts.push(new THREE.CylinderGeometry(hub, hub * 1.1, 0.06, 12).rotateZ(Math.PI / 2).translate(face, 0, 0));
  // spokes taper toward the rim and are dished: the outer ends sit further out toward the lip
  const dish = style === 'deep' ? 0.0 : 0.028;
  const spoke = (ang, width, depth, len0, len1, twist = 0, taper = 0.72) => {
    const g = new THREE.BoxGeometry(depth, len1 - len0, width, 1, 3, 1);
    g.translate(0, (len0 + len1) / 2, 0);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const f = (p.getY(i) - len0) / (len1 - len0);
      p.setZ(i, p.getZ(i) * (1 - (1 - taper) * f));
      p.setX(i, p.getX(i) + dish * f);
    }
    g.computeVertexNormals();
    if (twist) g.rotateY(twist);
    g.rotateX(ang);
    g.translate(face, 0, 0);
    return g;
  };
  if (!hi) {
    parts.push(new THREE.CylinderGeometry(rr * 0.92, rr * 0.92, 0.02, seg).rotateZ(Math.PI / 2).translate(face - 0.01, 0, 0));
  } else if (style === 'mesh') {
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      parts.push(spoke(a + 0.16, 0.022, 0.03, hub * 0.8, rr * 0.97));
      parts.push(spoke(a - 0.16, 0.022, 0.03, hub * 0.8, rr * 0.97));
    }
  } else if (style === 'multi') {
    for (let i = 0; i < 10; i++) parts.push(spoke((i / 10) * Math.PI * 2, 0.035, 0.04, hub * 0.8, rr * 0.97));
  } else if (style === 'deep') {
    for (let i = 0; i < 6; i++) parts.push(spoke((i / 6) * Math.PI * 2, 0.07, 0.04, hub * 0.8, rr * 0.9));
  } else if (style === 'turbine') {
    for (let i = 0; i < 14; i++) parts.push(spoke((i / 14) * Math.PI * 2, 0.05, 0.03, hub * 0.9, rr * 0.95, 0.5));
  } else if (style === 'yspoke') {
    // five Y-shaped spokes: a stem that forks near the rim
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      parts.push(spoke(a, 0.05, 0.042, hub * 0.8, rr * 0.55, 0, 0.9));
      for (const s2 of [-1, 1]) parts.push(spoke(a + s2 * 0.2, 0.026, 0.036, rr * 0.5, rr * 0.97, 0, 0.85));
    }
  } else if (style === 'center') {
    // centre-lock forged: ten slim twisted spokes and a big hex nut
    for (let i = 0; i < 10; i++) parts.push(spoke((i / 10) * Math.PI * 2, 0.026, 0.034, hub * 0.9, rr * 0.97, 0.35, 0.7));
    parts.push(new THREE.CylinderGeometry(hub * 0.75, hub * 0.75, 0.05, 6).rotateZ(Math.PI / 2).translate(face + 0.03, 0, 0));
  } else if (style === 'split') {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      parts.push(spoke(a + 0.09, 0.03, 0.045, hub * 0.8, rr * 0.97));
      parts.push(spoke(a - 0.09, 0.03, 0.045, hub * 0.8, rr * 0.97));
    }
  } else {
    // five spoke
    for (let i = 0; i < 5; i++) parts.push(spoke((i / 5) * Math.PI * 2, 0.075, 0.045, hub * 0.8, rr * 0.97));
  }
  if (hi && style !== 'center') {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      parts.push(new THREE.CylinderGeometry(0.0105, 0.0105, 0.024, 6).rotateZ(Math.PI / 2).translate(face + 0.03, Math.cos(a) * hub * 0.62, Math.sin(a) * hub * 0.62));
    }
    parts.push(new THREE.CylinderGeometry(hub * 0.42, hub * 0.46, 0.012, 16).rotateZ(Math.PI / 2).translate(face + 0.034, 0, 0));
  }
  const rim = merge(parts);
  // ventilated disc: two friction faces with a vane gap; caliper is a rounded block with a bridge
  const disc = merge([
    new THREE.CylinderGeometry(rr * 0.82, rr * 0.82, 0.01, 32).rotateZ(Math.PI / 2).translate(0.002, 0, 0),
    new THREE.CylinderGeometry(rr * 0.82, rr * 0.82, 0.01, 32).rotateZ(Math.PI / 2).translate(-0.022, 0, 0),
    new THREE.CylinderGeometry(rr * 0.78, rr * 0.78, 0.016, 32, 1, true).rotateZ(Math.PI / 2).translate(-0.01, 0, 0),
  ]);
  const caliper = hi
    ? merge([
      // (the caliper sits 6 cm inboard of its mount; pads straddle the disc faces)
      new RoundedBoxGeometry(0.026, rr * 0.48, 0.17, 2, 0.011).translate(0.078, rr * 0.6, 0),
      new RoundedBoxGeometry(0.026, rr * 0.48, 0.17, 2, 0.011).translate(0.022, rr * 0.6, 0),
      new RoundedBoxGeometry(0.082, rr * 0.14, 0.13, 2, 0.01).translate(0.05, rr * 0.83, 0),
    ])
    : new THREE.BoxGeometry(0.07, rr * 0.55, 0.16).translate(0.035, rr * 0.55, 0);
  return { tire, rim, disc, caliper, rimR: rr };
}

/* ------------------------------------------------------------ details */
// All lights, grilles and trim are built as thin patches that follow the body surface,
// so nothing pokes out of (or sinks into) the bodywork.

/** Outward normal of the front (or rear) surface at (x, y). */
function faceNormal(ctx, front, x, y) {
  const e = 0.02;
  const z0 = surfZ(ctx, x, y, front), zx = surfZ(ctx, x + e, y, front), zy = surfZ(ctx, x, y + e, front);
  if (z0 === null || zx === null || zy === null) return new THREE.Vector3(0, 0, front ? -1 : 1);
  const fx = (zx - z0) / e, fy = (zy - z0) / e;
  return (front ? new THREE.Vector3(fx, fy, -1) : new THREE.Vector3(-fx, -fy, 1)).normalize();
}

/** Surface-conforming patch on the front/rear face. quad = [TL, TR, BR, BL] as [x, y] with x increasing TL->TR. */
function faceDecal(ctx, front, quad, off = 0.004, nu = 8, nv = 3) {
  const pos = [], uv = [], idx = [];
  const cols = nu + 1;
  let lastZ = null;
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      const xT = lerp(quad[0][0], quad[1][0], u), yT = lerp(quad[0][1], quad[1][1], u);
      const xB = lerp(quad[3][0], quad[2][0], u), yB = lerp(quad[3][1], quad[2][1], u);
      const x = lerp(xT, xB, v), y = lerp(yT, yB, v);
      let z = surfZ(ctx, x, y, front);
      if (z === null) z = lastZ ?? ctx.z(front ? 0.05 : 0.95);
      lastZ = z;
      pos.push(x, y - ctx.lower, z + (front ? -off : off));
      uv.push(u, 1 - v);
    }
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
    if (front) idx.push(a, b, c, b, d, c);
    else idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const mirrorQuad = (q) => [[-q[1][0], q[1][1]], [-q[0][0], q[0][1]], [-q[3][0], q[3][1]], [-q[2][0], q[2][1]]];
const rectQuad = (x0, x1, y0, y1) => [[x0, y1], [x1, y1], [x1, y0], [x0, y0]];

/** Disc lying on the front/rear surface. */
function faceDisc(ctx, front, x, y, r, off, seg = 18) {
  const z = surfZ(ctx, x, y, front);
  const n = faceNormal(ctx, front, x, y);
  const g = new THREE.CircleGeometry(r, seg);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n));
  g.translate(x + n.x * off, y - ctx.lower + n.y * off, (z ?? ctx.z(front ? 0.05 : 0.95)) + n.z * off);
  return g;
}

/** Height where the body side surface reaches half-width x at station t (unlowered). */
function bodyYAtX(ctx, t, x) {
  const b0 = ctx.botA(t), t0 = ctx.top(t);
  for (let yn = 1; yn >= 0; yn -= 0.01) {
    if (ctx.hw(t) * templateX(ctx.tpl, yn) >= x) return b0 + yn * (t0 - b0) - (yn > ctx.sect.s ? ctx.dip(t, x / Math.max(1e-3, ctx.hw(t))) : 0);
  }
  return b0 + 0.5 * (t0 - b0);
}

/** Thin vertical strip on the body side (door shut line etc). */
function sideStrip(ctx, t, y0, y1, side, width = 0.007, off = 0.003, n = 8) {
  const pos = [], idx = [];
  const z = ctx.z(t);
  for (let j = 0; j <= n; j++) {
    const y = lerp(y0, y1, j / n);
    const x = Math.max(ctx.halfWAt(t, y), 0.05) + off;
    pos.push(side * x, y - ctx.lower, z - width / 2, side * x, y - ctx.lower, z + width / 2);
  }
  for (let j = 0; j < n; j++) {
    const a = j * 2, b = a + 1, c = a + 2, d = a + 3;
    if (side > 0) idx.push(a, c, b, b, c, d);
    else idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Patch on the body side. quad = [TL, TR, BR, BL] as [t, y] (t along the car, y unlowered). Samples the flank at every point. */
function sidePatch(ctx, quad, side, off = 0.004, nu = 6, nv = 4) {
  const pos = [], uv = [], idx = [];
  const cols = nu + 1;
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      const tT = lerp(quad[0][0], quad[1][0], u), yT = lerp(quad[0][1], quad[1][1], u);
      const tB = lerp(quad[3][0], quad[2][0], u), yB = lerp(quad[3][1], quad[2][1], u);
      const t = lerp(tT, tB, v), y = lerp(yT, yB, v);
      const x = Math.max(ctx.halfWAt(t, y), 0.05) + off;
      pos.push(side * x, y - ctx.lower, ctx.z(t));
      uv.push(u, 1 - v);
    }
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
    if (side > 0) idx.push(a, b, c, b, d, c);
    else idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Strip running along the car's length at fixed height above the body side (belt trim). */
function beltStrip(ctx, t0, t1, side, h = 0.014, n = 24) {
  const c = ctx.b.cabin;
  const pos = [], idx = [];
  for (let j = 0; j <= n; j++) {
    const t = lerp(t0, t1, j / n);
    const wb = ctx.hw(t) * (c.wBot ?? 0.86);
    const y = bodyYAtX(ctx, t, wb * 0.985) + 0.006;
    const x = side * (wb * 0.985 + 0.004);
    pos.push(x, y - ctx.lower, ctx.z(t), x, y + h - ctx.lower, ctx.z(t));
  }
  for (let j = 0; j < n; j++) {
    const a = j * 2, b = a + 1, cc = a + 2, d = a + 3;
    if (side > 0) idx.push(a, b, cc, b, d, cc);
    else idx.push(a, cc, b, b, cc, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Panel gap drawn on the upper body surface along a polyline of [t, x] points. */
function topLine(ctx, pts, width = 0.007, n = 6) {
  const pos = [], idx = [];
  const P = [];
  for (let i = 0; i < pts.length - 1; i++) {
    for (let k = 0; k < n; k++) {
      const f = k / n;
      P.push([lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]);
    }
  }
  P.push(pts[pts.length - 1]);
  const xyz = P.map(([t, x]) => [x, bodyYAtX(ctx, t, Math.abs(x)) - ctx.lower + 0.0035, ctx.z(t)]);
  for (let i = 0; i < xyz.length; i++) {
    const a = xyz[Math.max(0, i - 1)], b = xyz[Math.min(xyz.length - 1, i + 1)];
    let dx = b[0] - a[0], dz = b[2] - a[2];
    const l = Math.hypot(dx, dz) || 1;
    dx /= l; dz /= l;
    const [x, y, z] = xyz[i];
    pos.push(x - dz * width / 2, y, z + dx * width / 2, x + dz * width / 2, y, z - dx * width / 2);
  }
  for (let i = 0; i < xyz.length - 1; i++) {
    const a = i * 2;
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  // make sure it faces up
  const nrm = g.attributes.normal;
  let up = 0;
  for (let i = 0; i < nrm.count; i++) up += nrm.getY(i);
  if (up < 0) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } g.computeVertexNormals(); }
  return g;
}

/** Re-map a decal's UVs to world units (for tiling textures such as grille mesh). */
function worldUV(g, scale = 1) {
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) * scale, p.getY(i) * scale);
  return g;
}

/** Thin horizontal plate following the nose/tail outline (splitter, diffuser). */
function outlinePlate(ctx, front, y, halfW, overhang, depth, thick = 0.02, n = 14) {
  const pos = [], idx = [];
  for (let i = 0; i <= n; i++) {
    const x = lerp(-halfW, halfW, i / n);
    let z = surfZ(ctx, x, y + 0.03, front);
    if (z === null) z = ctx.z(front ? 0.04 : 0.96);
    const zo = front ? z - overhang : z + overhang;
    const zi = front ? zo + depth : zo - depth;
    const yy = y - ctx.lower;
    pos.push(x, yy, zo, x, yy, zi, x, yy - thick, zo, x, yy - thick, zi);
  }
  for (let i = 0; i < n; i++) {
    const a = i * 4, b = a + 4;
    // top, bottom, outer edge
    if (front) {
      idx.push(a, a + 1, b, a + 1, b + 1, b);
      idx.push(a + 2, b + 2, a + 3, a + 3, b + 2, b + 3);
      idx.push(a, b, a + 2, b, b + 2, a + 2);
    } else {
      idx.push(a, b, a + 1, a + 1, b, b + 1);
      idx.push(a + 2, a + 3, b + 2, a + 3, b + 3, b + 2);
      idx.push(a, a + 2, b, b, a + 2, b + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function placeBox(ctx, front, x, y, w, h, depth, protrude = 0.01, extraYaw = 0) {
  const zs = surfZ(ctx, x, y, front) ?? ctx.z(front ? 0.05 : 0.95);
  const za = surfZ(ctx, x - 0.04, y, front) ?? zs;
  const zb = surfZ(ctx, x + 0.04, y, front) ?? zs;
  const slope = (zb - za) / 0.08;
  const yaw = -Math.atan(slope) + extraYaw;
  const g = new THREE.BoxGeometry(w, h, depth);
  const zc = front ? zs - protrude + depth / 2 : zs + protrude - depth / 2;
  g.rotateY(yaw);
  g.translate(x, y - ctx.lower, zc);
  return g;
}

/** Shared mirror placement (used by the body and the cockpit's live mirror overlays). */
export function mirrorPose(ctx) {
  const c = ctx.b.cabin;
  const tm = c.t0 + 0.04;
  const wb = ctx.hw(tm) * (c.wBot ?? 0.86);
  const y = ctx.top(tm) - ctx.lower + 0.075;
  return { tm, z: ctx.z(tm) + 0.03, y, xIn: wb - 0.03, x: wb + 0.14, rx: 0.1, ry: 0.058, rz: 0.07 };
}

/**
 * Build all parts of a car as geometries keyed by material slot.
 * slots: paint, glass, trim, decal, chrome, head, tail, plate, interior, kit, body2, cabinTop
 */
export function carParts(def, custom = {}, hi = true) {
  const b = def.body;
  const ctx = bodyContext(b, custom, hi);
  const S = { paint: [], glass: [], trim: [], decal: [], mesh: [], amber: [], amberL: [], amberR: [], chrome: [], head: [], drl: [], lens: [], tail: [], rev: [], plate: [], interior: [], kit: [], body2: [], cabinTop: [] };
  const lamps = { head: [], tail: [], ind: [], rev: [], exhaust: [] };
  const L = ctx.L, W = ctx.W, low = ctx.lower;
  const nu = hi ? 8 : 4, nv = hi ? 3 : 2;

  const [bp, bt, bc] = loftBody(ctx, b.trimH ?? 0.115, hi);
  S.paint.push(bp);
  S.trim.push(bt);
  if (hi) S.cabinTop.push(bc);
  else S.paint.push(bc);
  if (b.cabin) {
    const cab = loftCabin(ctx, hi);
    S.glass.push(cab.glass);
    S.paint.push(cab.paint);
    S.decal.push(cab.pillar); // B-pillar and window surrounds in gloss black
    if (hi) {
      // working details every road car carries: windscreen wipers parked on the glass, roof antenna
      const c = b.cabin;
      const gm = new THREE.Mesh(cab.glass, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
      const rc = new THREE.Raycaster();
      const onGlass = (x, z) => {
        rc.set(new THREE.Vector3(x, 4, z), new THREE.Vector3(0, -1, 0));
        // only the windscreen counts (side windows face sideways)
        const h = rc.intersectObject(gm).find((q) => Math.abs(q.face.normal.y) > 0.3);
        if (!h) return null;
        const n = h.face.normal.clone();
        if (n.y < 0) n.negate();
        return { p: h.point, n };
      };
      const zw = ctx.z(c.t0) + 0.07;
      const half = ctx.hw(c.t0) * (c.wBot ?? 0.86) * 0.72;
      // driver blade parks low across the screen, passenger blade overlaps it slightly higher
      for (const [x0, x1, dz] of [[-half + 0.06, 0.08, 0], [0.02, half - 0.08, 0.035]]) {
        const a = onGlass(x0, zw + dz), e = onGlass(x1, zw + dz + 0.02);
        if (!a || !e) continue;
        const pa = a.p.clone().addScaledVector(a.n, 0.014), pe = e.p.clone().addScaledVector(e.n, 0.014);
        const len = pa.distanceTo(pe);
        const blade = new THREE.BoxGeometry(len, 0.011, 0.016);
        const arm = new THREE.BoxGeometry(len * 0.62, 0.007, 0.01).translate(-len * 0.12, 0.009, 0.008);
        const w = merge([blade, arm]);
        const dir = pe.clone().sub(pa).normalize();
        const nAvg = a.n.clone().add(e.n).normalize();
        const zAx = new THREE.Vector3().crossVectors(dir, nAvg).normalize();
        const yAx = new THREE.Vector3().crossVectors(zAx, dir).normalize();
        w.applyMatrix4(new THREE.Matrix4().makeBasis(dir, yAx, zAx));
        const mid = pa.clone().lerp(pe, 0.5);
        S.trim.push(w.translate(mid.x, mid.y, mid.z));
      }
      if (def.seats !== 2 && c.t3 < 0.995) {
        // shark-fin antenna (radio / GPS) at the back of the roof, sitting on the roof skin
        const tf = c.t2 - 0.02;
        const top = c.roof + (c.roofArc ?? 0.02) * Math.sin(((tf - c.t1) / (c.t2 - c.t1)) * Math.PI) - low;
        const fin = new THREE.Shape();
        fin.moveTo(-0.07, 0); fin.quadraticCurveTo(0.02, 0.012, 0.075, 0.065); fin.lineTo(0.09, 0.06); fin.quadraticCurveTo(0.08, 0.01, 0.07, 0); fin.lineTo(-0.07, 0);
        const fg = new THREE.ExtrudeGeometry(fin, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.006, bevelSegments: 2, curveSegments: 6 });
        fg.translate(0, 0, -0.02).rotateY(-Math.PI / 2);
        S.paint.push(fg.translate(0, top - 0.008, ctx.z(tf)));
      }
    }
  }
  // underbody pan
  S.trim.push(new THREE.BoxGeometry(W * 0.84, 0.03, L * 0.78).translate(0, (b.bottom[2]?.[1] ?? 0.2) - low + 0.03, 0));

  // ---- Headlights
  const ls = b.lights || {};
  const hy = ls.headY ?? (ctx.top(0.03) - 0.06);
  const ty = ls.tailY ?? (ctx.top(0.97) - 0.07);
  const hx = ls.headX ?? W / 2 - 0.3;
  const headStyle = ls.head || 'slim';
  const both = (fn) => { for (const sx of [-1, 1]) fn(sx); };
  if (headStyle === 'round' || headStyle === 'quad') {
    const offs = headStyle === 'quad' ? [-0.085, 0.085] : [0];
    const r = headStyle === 'quad' ? 0.058 : 0.085;
    both((sx) => {
      for (const dx of offs) {
        const x = sx * (hx + dx);
        S.decal.push(faceDisc(ctx, true, x, hy, r + 0.018, 0.003));
        S.head.push(faceDisc(ctx, true, x, hy, r, 0.006));
        if (hi) {
          // LED ring around a projector lens, as on modern round-lamp sports cars
          S.drl.push(faceDisc(ctx, true, x, hy, r * 0.88, 0.008, 24));
          S.head.push(faceDisc(ctx, true, x, hy, r * 0.83, 0.009, 24));
          S.chrome.push(faceDisc(ctx, true, x, hy, r * 0.42, 0.01, 16));
          S.lens.push(faceDisc(ctx, true, x, hy, r * 0.32, 0.011, 16));
        }
        lamps.head.push([x, hy - low, (surfZ(ctx, x, hy, true) ?? ctx.z(0.04)) - 0.02]);
      }
    });
  } else {
    const hw = ls.headW ?? (headStyle === 'wide' ? 0.36 : headStyle === 'popup' ? 0.3 : 0.4);
    const hh = ls.headH ?? (headStyle === 'wide' ? 0.06 : headStyle === 'popup' ? 0.05 : 0.1);
    const slant = headStyle === 'wide' ? 0.05 : 0.025;
    // right-side shape: inner end taller, outer end swept up and tapered
    const q = [[hx - hw / 2, hy + hh / 2], [hx + hw / 2, hy + hh / 2 + slant * 0.4], [hx + hw / 2, hy - hh / 2 + hh * 0.45 + slant * 0.4], [hx - hw / 2, hy - hh / 2]];
    const bez = [[q[0][0] - 0.018, q[0][1] + 0.016], [q[1][0] + 0.014, q[1][1] + 0.016], [q[2][0] + 0.014, q[2][1] - 0.016], [q[3][0] - 0.018, q[3][1] - 0.016]];
    both((sx) => {
      const L1 = sx > 0 ? q : mirrorQuad(q), B1 = sx > 0 ? bez : mirrorQuad(bez);
      S.decal.push(faceDecal(ctx, true, B1, 0.003, nu, nv));
      S.head.push(faceDecal(ctx, true, L1, 0.006, nu, nv));
      if (hi) {
        // projector lenses and a DRL strip for detail
        for (const f of [0.28, 0.6]) {
          const px = sx * (hx - hw / 2 + hw * f);
          S.chrome.push(faceDisc(ctx, true, px, hy + 0.005, hh * 0.3, 0.009, 14));
          S.lens.push(faceDisc(ctx, true, px, hy + 0.005, hh * 0.22, 0.011, 14));
        }
        const drl = [[hx - hw / 2 + 0.02, hy - hh / 2 + 0.022], [hx + hw / 2 - 0.02, hy - hh / 2 + hh * 0.45 + slant * 0.4 + 0.012], [hx + hw / 2 - 0.02, hy - hh / 2 + hh * 0.45 + slant * 0.4 + 0.002], [hx - hw / 2 + 0.02, hy - hh / 2 + 0.01]];
        S.drl.push(faceDecal(ctx, true, sx > 0 ? drl : mirrorQuad(drl), 0.009, 6, 1));
      }
      lamps.head.push([sx * hx, hy - low, (surfZ(ctx, sx * hx, hy, true) ?? ctx.z(0.04)) - 0.03]);
    });
  }
  // ---- Grille / intakes
  const gy = ls.grilleY ?? (b.bottom[0][1] + 0.18);
  const grille = b.grille || 'wide';
  const slats = (x0, x1, y0, y1, n, vertical) => {
    if (!hi) return;
    for (let i = 1; i < n; i++) {
      const f = i / n;
      if (vertical) { const x = lerp(x0, x1, f); S.chrome.push(faceDecal(ctx, true, rectQuad(x - 0.006, x + 0.006, y0 + 0.01, y1 - 0.01), 0.007, 1, 2)); }
      else { const y = lerp(y0, y1, f); S.chrome.push(faceDecal(ctx, true, rectQuad(x0 + 0.01, x1 - 0.01, y - 0.005, y + 0.005), 0.007, 4, 1)); }
    }
  };
  // an opening = gloss-black surround + dark mesh, both following the bumper surface
  const opening = (q, frame = 0.014, scale = 9) => {
    const f = [[q[0][0] - frame, q[0][1] + frame], [q[1][0] + frame, q[1][1] + frame], [q[2][0] + frame, q[2][1] - frame], [q[3][0] - frame, q[3][1] - frame]];
    S.decal.push(faceDecal(ctx, true, f, 0.003, nu, nv));
    S.mesh.push(worldUV(faceDecal(ctx, true, q, 0.005, nu, nv), scale));
  };
  const yb0 = b.bottom[0][1];
  // keep openings on the forward-facing part of the bumper (never smeared round the corners)
  const faceX = (y) => Math.max(0.25, ctx.halfWAt(0.03, y) - 0.1);
  let lowerIntake = true;
  if (grille === 'kidney') {
    both((sx) => {
      const x0 = sx > 0 ? 0.035 : -0.235, x1 = x0 + 0.2;
      S.chrome.push(faceDecal(ctx, true, rectQuad(x0 - 0.012, x1 + 0.012, gy - 0.02, gy + 0.19), 0.003, 4, 2));
      S.mesh.push(worldUV(faceDecal(ctx, true, rectQuad(x0, x1, gy - 0.008, gy + 0.178), 0.005, 4, 2), 9));
      slats(x0, x1, gy - 0.008, gy + 0.178, 7, true);
    });
  } else if (grille === 'hex') {
    // hexagonal grille split by a single chrome bar carrying the badge
    const gw = W * 0.21, ym = gy + 0.07;
    opening([[-gw * 0.8, gy + 0.15], [gw * 0.8, gy + 0.15], [gw, ym], [-gw, ym]]);
    opening([[-gw, ym], [gw, ym], [gw * 0.82, gy - 0.03], [-gw * 0.82, gy - 0.03]]);
    if (hi) S.chrome.push(faceDecal(ctx, true, rectQuad(-gw + 0.02, gw - 0.02, ym - 0.008, ym + 0.008), 0.007, 6, 1));
  } else if (grille === 'trap') {
    // big trapezoid muscle-car grille: mesh only, no fake chrome bars
    const gw = Math.min(W * 0.24, faceX(gy + 0.07) - 0.04);
    opening([[-gw, gy + 0.14], [gw, gy + 0.14], [gw * 0.88, gy], [-gw * 0.88, gy]], 0.016);
    const xo = Math.min(W * 0.25, faceX(yb0 + 0.05));
    opening([[-xo, yb0 + 0.075], [xo, yb0 + 0.075], [xo * 0.94, yb0 + 0.02], [-xo * 0.94, yb0 + 0.02]], 0.01);
    lowerIntake = false;
  } else if (grille === 'slot') {
    // thin slot between the headlights, the real breathing done by a big lower intake
    const gw = W * 0.17;
    opening([[-gw, hy + 0.01], [gw, hy + 0.01], [gw * 0.94, hy - 0.035], [-gw * 0.94, hy - 0.035]], 0.01);
    const xo = Math.min(W * 0.3, faceX(yb0 + 0.12));
    opening([[-xo, yb0 + 0.2], [xo, yb0 + 0.2], [xo * 0.88, yb0 + 0.045], [-xo * 0.88, yb0 + 0.045]], 0.016);
    lowerIntake = false;
  } else if (grille === 'mouth') {
    // no grille up top (pop-up lamps, low nose): one wide mouth below the bumper line
    const xo = Math.min(W * 0.3, faceX(yb0 + 0.1));
    opening([[-xo, yb0 + 0.16], [xo, yb0 + 0.16], [xo * 0.9, yb0 + 0.045], [-xo * 0.9, yb0 + 0.045]], 0.016);
    lowerIntake = false;
  } else if (grille === 'lower3') {
    // rear-engined: radiators sit behind three low openings, nothing on the nose
    opening([[-0.28, yb0 + 0.15], [0.28, yb0 + 0.15], [0.25, yb0 + 0.045], [-0.25, yb0 + 0.045]], 0.014);
    both((sx) => {
      const xo = faceX(yb0 + 0.12), xi = xo - 0.24;
      const q = [[xi, yb0 + 0.19], [xo, yb0 + 0.205], [xo, yb0 + 0.055], [xi + 0.02, yb0 + 0.055]];
      opening(sx > 0 ? q : mirrorQuad(q), 0.014);
    });
    lowerIntake = false;
  } else if (grille === 'super') {
    // radiator intakes either side of the nose, inside the bumper face
    both((sx) => {
      const xo = Math.min(W / 2 - 0.2, faceX(gy)), xi = xo - 0.34;
      const q2 = [[xi, gy + 0.08], [xo - 0.02, gy + 0.1], [xo, gy - 0.06], [xi + 0.03, gy - 0.07]];
      opening(sx > 0 ? q2 : mirrorQuad(q2), 0.014);
    });
  } else if (grille === 'wide') {
    const gw = W * 0.21;
    S.decal.push(faceDecal(ctx, true, [[-gw - 0.014, gy + 0.154], [gw + 0.014, gy + 0.154], [gw * 0.92 + 0.012, gy - 0.034], [-gw * 0.92 - 0.012, gy - 0.034]], 0.003, nu, nv));
    S.mesh.push(worldUV(faceDecal(ctx, true, [[-gw, gy + 0.14], [gw, gy + 0.14], [gw * 0.92, gy - 0.02], [-gw * 0.92, gy - 0.02]], 0.005, nu, nv), 9));
    slats(-gw, gw, gy - 0.02, gy + 0.14, 4, false);
  }
  if (grille !== 'none' && lowerIntake) {
    const xo = Math.min(W * 0.27, faceX(yb0 + 0.07));
    opening([[-xo, yb0 + 0.11], [xo, yb0 + 0.11], [xo * 0.93, yb0 + 0.03], [-xo * 0.93, yb0 + 0.03]], 0.01);
  }
  // fog lamps only where the real car would carry them: a chrome reflector behind a clear lens in a black pocket
  if (hi && b.fog) both((sx) => {
    const fx = sx * W * 0.335, fy = yb0 + 0.085;
    if (Math.abs(fx) + 0.06 < ctx.halfWAt(0.03, fy)) {
      S.decal.push(faceDisc(ctx, true, fx, fy, 0.056, 0.004, 20));
      S.chrome.push(faceDisc(ctx, true, fx, fy, 0.04, 0.006, 20));
      S.lens.push(faceDisc(ctx, true, fx, fy, 0.022, 0.008, 16));
    }
  });

  // ---- Taillights
  const tailStyle = ls.tail || 'split';
  const tx = ls.tailX ?? W / 2 - 0.26;
  // lamps stay on the rear face (wrapping a little round the corner, never smeared down the flank)
  const rearMaxX = (y) => Math.max(0.3, ctx.halfWAt(1 - 0.15 / L, y) - 0.012);
  if (tailStyle === 'bar') {
    const th = ls.tailH ?? 0.055;
    const bx = Math.min(W * 0.42, rearMaxX(ty));
    S.decal.push(faceDecal(ctx, false, rectQuad(-bx, bx, ty - th / 2 - 0.015, ty + th / 2 + 0.015), 0.003, hi ? 16 : 6, 2));
    S.tail.push(faceDecal(ctx, false, rectQuad(-bx + 0.012, bx - 0.012, ty - th / 2, ty + th / 2), 0.006, hi ? 16 : 6, 2));
    if (hi) S.decal.push(faceDecal(ctx, false, rectQuad(-bx + 0.03, bx - 0.03, ty - 0.004, ty + 0.004), 0.009, 16, 1));
    both((sx) => lamps.tail.push([sx * tx, ty - low, (surfZ(ctx, sx * tx, ty, false) ?? ctx.z(0.97)) + 0.03]));
  } else if (tailStyle === 'round') {
    S.decal.push(faceDecal(ctx, false, rectQuad(-W * 0.43, W * 0.43, ty - 0.09, ty + 0.09), 0.003, hi ? 12 : 6, 2));
    both((sx) => {
      for (const dx of [-0.09, 0.09]) {
        const x = sx * (tx + dx);
        S.tail.push(faceDisc(ctx, false, x, ty, 0.068, 0.006));
        if (hi) S.chrome.push(faceDisc(ctx, false, x, ty, 0.022, 0.008, 10));
        lamps.tail.push([x, ty - low, (surfZ(ctx, x, ty, false) ?? ctx.z(0.97)) + 0.03]);
      }
    });
  } else if (tailStyle === 'vertical') {
    both((sx) => {
      const x0 = W / 2 - 0.17, x1 = W / 2 - 0.05;
      const qq = rectQuad(x0, x1, ty - 0.17, ty + 0.17);
      S.decal.push(faceDecal(ctx, false, sx > 0 ? rectQuad(x0 - 0.012, x1 + 0.01, ty - 0.185, ty + 0.185) : mirrorQuad(rectQuad(x0 - 0.012, x1 + 0.01, ty - 0.185, ty + 0.185)), 0.003, 3, 4));
      S.tail.push(faceDecal(ctx, false, sx > 0 ? qq : mirrorQuad(qq), 0.006, 3, 4));
      lamps.tail.push([sx * (x0 + x1) / 2, ty - low, (surfZ(ctx, sx * (x0 + x1) / 2, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  } else if (tailStyle === 'tri') {
    both((sx) => {
      const bz = rectQuad(tx - 0.18, tx + 0.18, ty - 0.1, ty + 0.1);
      S.decal.push(faceDecal(ctx, false, sx > 0 ? bz : mirrorQuad(bz), 0.003, 6, 2));
      for (let k = 0; k < 3; k++) {
        const xx = tx - 0.11 + k * 0.11;
        const qq = rectQuad(xx - 0.035, xx + 0.035, ty - 0.075, ty + 0.075);
        S.tail.push(faceDecal(ctx, false, sx > 0 ? qq : mirrorQuad(qq), 0.006, 2, 3));
      }
      lamps.tail.push([sx * tx, ty - low, (surfZ(ctx, sx * tx, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  } else {
    const tw = ls.tailW ?? 0.42, th = ls.tailH ?? 0.11;
    const xOut = Math.min(tx + tw / 2, rearMaxX(ty + th / 2), rearMaxX(ty - th / 2));
    const xIn = xOut - tw;
    // swept lens: tall at the outer corner, tapering toward the boot lid
    const qq = [[xIn, ty + th * 0.5 - 0.022], [xOut, ty + th * 0.5], [xOut, ty - th * 0.5 + 0.012], [xIn + 0.05, ty - th * 0.5 + 0.03]];
    const bz = [[qq[0][0] - 0.012, qq[0][1] + 0.012], [qq[1][0] + 0.008, qq[1][1] + 0.012], [qq[2][0] + 0.008, qq[2][1] - 0.012], [qq[3][0] - 0.012, qq[3][1] - 0.012]];
    both((sx) => {
      const m = (q) => (sx > 0 ? q : mirrorQuad(q));
      S.decal.push(faceDecal(ctx, false, m(bz), 0.003, nu, nv));
      S.tail.push(faceDecal(ctx, false, m(qq), 0.006, nu, nv));
      if (hi) {
        // smoked lower half, reversing lamp and an LED light-guide line
        const lo = [[xIn + 0.06, ty - 0.004], [xOut - 0.02, ty - 0.004], [xOut - 0.02, ty - th * 0.5 + 0.024], [xIn + 0.09, ty - th * 0.5 + 0.036]];
        S.decal.push(faceDecal(ctx, false, m(lo), 0.008, 6, 1));
        const rv = rectQuad(xIn + 0.018, xIn + 0.075, ty - 0.012, ty + 0.012);
        S.rev.push(faceDecal(ctx, false, m(rv), 0.009, 2, 1));
        lamps.rev.push([sx * (xIn + 0.046), ty - low, (surfZ(ctx, sx * (xIn + 0.046), ty, false) ?? ctx.z(0.97)) + 0.03]);
        const led = [[xIn + 0.09, ty + th * 0.5 - 0.034], [xOut - 0.018, ty + th * 0.5 - 0.016], [xOut - 0.018, ty + th * 0.5 - 0.026], [xIn + 0.09, ty + th * 0.5 - 0.042]];
        S.tail.push(faceDecal(ctx, false, m(led), 0.009, 6, 1));
      }
      lamps.tail.push([sx * (xIn + xOut) / 2, ty - low, (surfZ(ctx, sx * (xIn + xOut) / 2, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  }
  both((sx) => {
    lamps.ind.push([sx * (W / 2 - 0.12), ty - low, (surfZ(ctx, sx * (W / 2 - 0.15), ty, false) ?? ctx.z(0.97)) + 0.04]);
    lamps.ind.push([sx * (W / 2 - 0.12), hy - low, (surfZ(ctx, sx * (W / 2 - 0.15), hy, true) ?? ctx.z(0.03)) - 0.04]);
  });
  // ---- Rear plate & lower bumper
  const ybr = b.bottom[b.bottom.length - 1][1];
  const py = ls.plateY ?? (ybr + 0.16);
  if (hi && tailStyle !== 'split') both((sx) => {
    // reversing lamps low in the bumper either side of the plate
    const ax = Math.min(W * 0.3, rearMaxX(py) - 0.08), ry = py - 0.02;
    const q = rectQuad(ax - 0.04, ax + 0.04, ry - 0.014, ry + 0.014), f = rectQuad(ax - 0.048, ax + 0.048, ry - 0.022, ry + 0.022);
    S.decal.push(faceDecal(ctx, false, sx > 0 ? f : mirrorQuad(f), 0.004, 2, 1));
    S.rev.push(faceDecal(ctx, false, sx > 0 ? q : mirrorQuad(q), 0.007, 2, 1));
    lamps.rev.push([sx * ax, ry - low, (surfZ(ctx, sx * ax, ry, false) ?? ctx.z(0.97)) + 0.03]);
  });
  S.plate.push(faceDecal(ctx, false, rectQuad(-0.155, 0.155, py - 0.0775, py + 0.0775), 0.008, 2, 1));
  S.decal.push(faceDecal(ctx, false, rectQuad(-0.17, 0.17, py - 0.09, py + 0.09), 0.004, 2, 1));
  S.decal.push(faceDecal(ctx, false, [[-W * 0.33, ybr + 0.1], [W * 0.33, ybr + 0.1], [W * 0.3, ybr + 0.02], [-W * 0.3, ybr + 0.02]], 0.005, nu, 2));

  // ---- Badges, side markers, third brake light
  if (hi) {
    // front badge: ray-cast onto the real body surface (accounts for the bonnet dip)
    const by = grille === 'kidney' ? gy + 0.215 : grille === 'wide' || grille === 'hex' ? gy + 0.07 : grille === 'trap' ? gy + 0.07 : grille === 'slot' ? hy - 0.012 : hy - 0.03;
    const ray = new THREE.Raycaster(new THREE.Vector3(0, by - low, -L), new THREE.Vector3(0, 0, 1), 0, L * 2);
    const hit = ray.intersectObject(new THREE.Mesh(bp, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })))[0];
    if (hit && hit.face) {
      const n = hit.face.normal.clone();
      if (n.z > 0) n.negate();
      const e = new THREE.CircleGeometry(1, 20).scale(0.05, 0.03, 1);
      e.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n));
      S.chrome.push(e.translate(hit.point.x + n.x * 0.006, hit.point.y + n.y * 0.006, hit.point.z + n.z * 0.006));
    }
    const rbY = ty + (tailStyle === 'bar' ? 0.07 : 0.0);
    S.chrome.push(faceDecal(ctx, false, rectQuad(-0.06, 0.06, rbY - 0.012, rbY + 0.012), 0.009, 2, 1));
    // amber side markers at the front corners, red at the rear
    for (const t of [0.045, 0.955]) {
      const y0 = (t < 0.5 ? hy : ty) - 0.07;
      both((sx) => { if (ctx.halfWAt(t, y0 + 0.012) > 0.3) (t < 0.5 ? (sx < 0 ? S.amberL : S.amberR) : S.tail).push(sideStrip(ctx, t, y0, y0 + 0.024, sx, 0.075, 0.004, 2)); });
    }
    if (b.cabin && b.cabin.t3 < 0.995) {
      const c = b.cabin;
      // high-mount stop lamp on the trailing edge of the roof
      const rTop = c.roof + (c.crown ?? 0.03) - low;
      S.decal.push(new THREE.BoxGeometry(0.3, 0.022, 0.05).translate(0, rTop + 0.004, ctx.z(c.t2) + 0.012));
      S.tail.push(new THREE.BoxGeometry(0.26, 0.012, 0.004).translate(0, rTop + 0.004, ctx.z(c.t2) + 0.038));
    }
  }

  // ---- Exhaust
  const ex = b.exhaust || 'dual';
  const ey = ybr + 0.04;
  const big = custom.exhaust === 'straight' || custom.exhaust === 'sport' ? 1.25 : 1;
  const exX = ex === 'single' ? [-W * 0.3] : ex === 'quad' ? [-W * 0.32, -W * 0.24, W * 0.24, W * 0.32] : ex === 'center' ? [-0.07, 0.07] : [-W * 0.3, W * 0.3];
  const er = 0.045 * big;
  for (const x of exX) {
    // tip pokes ~6 cm out of the bumper, only a short stub sits inside the body
    const z = Math.max(surfZ(ctx, x, ey + er, false) ?? ctx.z(0.97), surfZ(ctx, x, ey - er, false) ?? ctx.z(0.97)) + 0.06;
    S.chrome.push(new THREE.CylinderGeometry(er, er * 0.94, 0.12, 16, 1, true).rotateX(Math.PI / 2).translate(x, ey - low, z - 0.06));
    S.chrome.push(new THREE.TorusGeometry(er * 0.97, 0.006, 6, 16).translate(x, ey - low, z));
    S.trim.push(new THREE.CircleGeometry(er * 0.9, 14).translate(x, ey - low, z - 0.035));
    lamps.exhaust.push([x, ey - low, z + 0.02]);
  }

  // under the car: silencer box hung from the floor pan and pipes from it to each tip
  if (hi) {
    const panY = (b.bottom[2]?.[1] ?? 0.2) - low + 0.03 - 0.015;
    const zm = Math.min(ctx.zr + 0.32, L / 2 - 0.42);
    const mh = 0.11;
    S.trim.push(new RoundedBoxGeometry(W * 0.5, mh, 0.34, 2, 0.03).translate(0, panY - mh / 2 + 0.002, zm));
    for (const x of exX) {
      const zt = Math.max(surfZ(ctx, x, ey + er, false) ?? ctx.z(0.97), surfZ(ctx, x, ey - er, false) ?? ctx.z(0.97)) + 0.06 - 0.12;
      const a = new THREE.Vector3(Math.sign(x || 1) * Math.min(Math.abs(x), W * 0.22), panY - mh / 2, zm + 0.16);
      const bb = new THREE.Vector3(x, ey - low, zt + 0.01);
      const len = a.distanceTo(bb);
      const pg = new THREE.CylinderGeometry(er * 0.7, er * 0.7, len, 10);
      pg.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), bb.clone().sub(a).normalize()));
      S.trim.push(pg.translate((a.x + bb.x) / 2, (a.y + bb.y) / 2, (a.z + bb.z) / 2));
    }
    // front pipe from the engine bay to the silencer, tucked against the pan
    const zf0 = ctx.zf + 0.3;
    S.trim.push(new THREE.CylinderGeometry(0.03, 0.03, zm - 0.17 - zf0, 10).rotateX(Math.PI / 2).translate(-0.12, panY - 0.03, (zf0 + zm - 0.17) / 2));
  }

  // ---- Mirrors, belt trim, door lines, handles
  if (b.cabin) {
    const c = b.cabin;
    const mp = mirrorPose(ctx);
    both((sx) => {
      // rounded-box housing: squash a sphere toward a box, taper the inner end
      const hous = new THREE.SphereGeometry(1, hi ? 16 : 8, hi ? 12 : 6);
      const hp = hous.attributes.position;
      for (let i = 0; i < hp.count; i++) {
        let x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
        x = Math.sign(x) * Math.pow(Math.abs(x), 0.55); y = Math.sign(y) * Math.pow(Math.abs(y), 0.6); z = Math.sign(z) * Math.pow(Math.abs(z), 0.7);
        const taper = 1 - 0.22 * (1 - x * sx) / 2;
        hp.setXYZ(i, x * mp.rx, y * mp.ry * taper, z < 0 ? z * mp.rz * 1.15 : z * mp.rz * 0.7);
      }
      hous.computeVertexNormals();
      hous.translate(sx * mp.x, mp.y, mp.z);
      S.paint.push(hous);
      const stalkLen = mp.x - mp.rx * 0.6 - mp.xIn;
      S.trim.push(new THREE.BoxGeometry(stalkLen, 0.026, 0.05).translate(sx * (mp.xIn + stalkLen / 2), mp.y - 0.025, mp.z));
      S.glass.push(new THREE.CircleGeometry(1, hi ? 20 : 10).scale(mp.rx * 0.86, mp.ry * 0.8, 1).translate(sx * mp.x, mp.y, mp.z + mp.rz * 0.7 + 0.002));
    });
    if (hi) {
      both((sx) => S.trim.push(beltStrip(ctx, c.t0 + 0.015, Math.min(c.t3, c.quarter ?? c.t3) - 0.01, sx)));
      // door shut lines & handles
      const tFront = Math.max(c.t0 + 0.005, ctx.tFA + ctx.archR / L + 0.02);
      const doors = c.tB ? [c.tB, Math.min(c.t2 + 0.02, ctx.tRA - ctx.archR / L - 0.025)] : [Math.min((c.quarter ?? c.t2) - 0.015, ctx.tRA - ctx.archR / L - 0.03)];
      both((sx) => {
        for (const t of [tFront, ...doors]) {
          const wb = ctx.hw(t) * (c.wBot ?? 0.86);
          const y1 = bodyYAtX(ctx, t, wb) - 0.02;
          const y0 = Math.max(ctx.botA(t) + 0.1, ctx.bot(t) + 0.1);
          if (y1 > y0 + 0.1) S.decal.push(sideStrip(ctx, t, y0, y1, sx));
        }
        for (const t of doors) {
          const th = t - 0.045;
          const wb = ctx.hw(th) * (c.wBot ?? 0.86);
          const yh = bodyYAtX(ctx, th, wb) - 0.085;
          const xh = ctx.halfWAt(th, yh) + 0.006;
          if (xh > 0.2) S.chrome.push(new THREE.BoxGeometry(0.018, 0.024, 0.13).translate(sx * xh, yh - low, ctx.z(th)));
        }
      });
    }
    if (hi) {
      // panel gaps: bonnet, cowl, boot lid, bumper-to-wing seams
      const tCowl = c.t0 - 0.01;
      const hood = [];
      for (let i = 0; i <= 8; i++) { const t = lerp(0.035, tCowl, i / 8); hood.push([t, ctx.hw(t) * 0.64]); }
      both((sx) => S.decal.push(topLine(ctx, hood.map(([t, x]) => [t, sx * x]))));
      const across = (t, f) => { const pts = []; for (let i = 0; i <= 10; i++) pts.push([t, lerp(-1, 1, i / 10) * ctx.hw(t) * f]); return pts; };
      S.decal.push(topLine(ctx, across(0.035, 0.64)));
      S.decal.push(topLine(ctx, across(tCowl, 0.82)));
      if (c.t3 < 0.93) {
        const tb0 = c.t3 + 0.012, tb1 = 0.972;
        const boot = [];
        for (let i = 0; i <= 6; i++) { const t = lerp(tb0, tb1, i / 6); boot.push([t, ctx.hw(t) * 0.7]); }
        both((sx) => S.decal.push(topLine(ctx, boot.map(([t, x]) => [t, sx * x]))));
        S.decal.push(topLine(ctx, across(tb0, 0.7)));
        S.decal.push(topLine(ctx, across(tb1, 0.7)));
      }
      const tFs = ctx.tFA - (ctx.archR * 0.72) / L;
      const tRs = ctx.tRA + (ctx.archR * 0.72) / L;
      both((sx) => {
        for (const [ts, ya] of [[tFs, hy - 0.05], [tRs, ty - 0.08]]) {
          const dz = (ts - (ts < 0.5 ? ctx.tFA : ctx.tRA)) * L;
          const y0 = ctx.wr - low + Math.sqrt(Math.max(0, ctx.archR * ctx.archR - dz * dz)) + 0.03 + low;
          if (ya > y0 + 0.08) S.decal.push(sideStrip(ctx, ts, y0, ya, sx, 0.006, 0.003, 6));
        }
      });
    }
    if (hi && b.sideIntake) {
      const t1 = ctx.tRA - (ctx.archR + 0.06) / L, t0 = t1 - 0.36 / L;
      const yTop = (t) => bodyYAtX(ctx, t, ctx.hw(t) * (c.wBot ?? 0.86)) - 0.1;
      const yB = ctx.wr + 0.04;
      both((sx) => {
        // swept leading edge, opening tallest at the back where the air turns inward
        const q = [[t0 + 0.06 / L, Math.min(yTop(t0), yB + 0.2)], [t1, Math.min(yTop(t1), yB + 0.27)], [t1, yB], [t0, yB + 0.04]];
        const f = [[q[0][0] - 0.015 / L, q[0][1] + 0.014], [q[1][0] + 0.012 / L, q[1][1] + 0.014], [q[2][0] + 0.012 / L, q[2][1] - 0.014], [q[3][0] - 0.015 / L, q[3][1] - 0.014]];
        S.decal.push(sidePatch(ctx, f, sx, 0.003, 6, 4));
        S.mesh.push(worldUV(sidePatch(ctx, q, sx, 0.005, 6, 4), 9));
      });
    }
    // interior visible through the glass: seats, dash and wheel (kept below the roof)
    const tc = (c.t1 + c.t2) / 2;
    const seatZ = ctx.z(tc);
    let sy = ctx.top(tc) - low;
    const roomTop = c.roof - low - 0.09;
    sy += Math.min(0, roomTop - (sy + 0.44));
    const ix = ctx.hw(tc) * 0.42;
    both((sx) => {
      S.interior.push(roundBox(0.48, 0.6, 0.13, 0.05).rotateX(0.2).translate(sx * ix, sy - 0.07, seatZ + 0.12));
      S.interior.push(roundBox(0.25, 0.16, 0.1, 0.04).translate(sx * ix, sy + 0.3, seatZ + 0.19));
      for (const px of [-0.06, 0.06]) S.interior.push(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6).translate(sx * ix + px, sy + 0.2, seatZ + 0.18));
      S.interior.push(roundBox(0.48, 0.14, 0.5, 0.04).translate(sx * ix, sy - 0.35, seatZ - 0.14));
      S.interior.push(new THREE.BoxGeometry(0.36, Math.max(0.05, sy - 0.42 - (ctx.bot((c.t1 + c.t2) / 2) - low)), 0.36).translate(sx * ix, (sy - 0.42 + ctx.bot((c.t1 + c.t2) / 2) - low) / 2, seatZ - 0.14));
    });
    if (def.seats !== 2 && c.t2 - c.t1 > 0.16) {
      S.interior.push(roundBox(W * 0.62, 0.48, 0.14, 0.05).rotateX(0.22).translate(0, sy - 0.12, seatZ + 0.78));
      S.interior.push(roundBox(W * 0.62, 0.14, 0.42, 0.04).translate(0, sy - 0.38, seatZ + 0.56));
      const yFloor = ctx.bot((c.t1 + c.t2) / 2) - low;
      S.interior.push(new THREE.BoxGeometry(W * 0.5, Math.max(0.05, sy - 0.45 - yFloor), 0.36).translate(0, (sy - 0.45 + yFloor) / 2, seatZ + 0.56));
    }
    // dashboard and steering wheel silhouettes
    const tDash = c.t0 + 0.035;
    const dashTop = ctx.top(tDash) - low - 0.015;
    const dashW = ctx.hw(tDash) * 0.8;
    S.interior.push(roundBox(dashW * 2, 0.22, 0.42, 0.06).translate(0, dashTop - 0.11, ctx.z(tDash) + 0.2));
    if (hi) {
      const sw = new THREE.TorusGeometry(0.18, 0.02, 6, 20).rotateX(-0.32);
      S.interior.push(sw.translate(-ix, sy + 0.06, seatZ - 0.44));
    }
  }

  // ---- Body kit
  const kit = custom.kit || 'stock';
  const yb = b.bottom[2]?.[1] ?? 0.18;
  const yfb = b.bottom[0][1];
  if (kit !== 'stock') {
    const agg = kit === 'aggressive' || kit === 'wide';
    // splitter hangs under the lowest edge of the front bumper and reaches just past its face
    let yLow = Infinity;
    for (let t = 0.0; t <= 0.09; t += 0.005) yLow = Math.min(yLow, ctx.bot(t));
    const ySp = Math.max(yLow + 0.012, Math.min(yfb - 0.004, yLow + 0.06));
    S.kit.push(outlinePlate(ctx, true, ySp, W * (agg ? 0.44 : 0.42), agg ? 0.04 : 0.025, 0.32, 0.018));
    const skirtLen = ctx.zr - ctx.zf - ctx.archR * 2 - 0.08;
    both((sx) => {
      const t = (ctx.tFA + ctx.tRA) / 2;
      const xs = ctx.halfWAt(t, yb + 0.06);
      S.kit.push(new THREE.BoxGeometry(0.05, 0.07, skirtLen).translate(sx * (Math.max(xs, ctx.hw(t) * 0.9) - 0.005), yb + 0.02 - low, (ctx.zf + ctx.zr) / 2));
    });
    S.kit.push(outlinePlate(ctx, false, ybr - 0.006, W * 0.32, 0.03, 0.34, 0.025));
    if (hi) for (let i = -2; i <= 2; i++) {
      const zR = (surfZ(ctx, i * 0.16, ybr + 0.03, false) ?? ctx.z(0.97));
      S.kit.push(new THREE.BoxGeometry(0.012, 0.09, 0.26).translate(i * 0.16, ybr - 0.05 - low, zR - 0.1));
    }
    if (agg) {
      both((sx) => S.kit.push(placeBox(ctx, true, sx * (W / 2 - 0.13), yfb + 0.11, 0.16, 0.012, 0.12, 0.035, sx * 0.25)));
    }
    if (kit === 'wide') {
      for (const za of [ctx.zf, ctx.zr]) {
        both((sx) => {
          const tq = (za + L / 2) / L;
          const tor = new THREE.TorusGeometry(ctx.archR + 0.02, 0.05, 6, 16, Math.PI).rotateY(Math.PI / 2);
          tor.translate(sx * (ctx.hw(tq) - 0.01), ctx.wr - low, za);
          S.kit.push(tor);
        });
      }
    }
  }
  // Hood scoop
  if (b.scoop) {
    const t = b.scoop;
    S.paint.push(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2).scale(0.26, 0.06, 0.2).translate(0, ctx.top(t) - low - ctx.dip(t, 0) - 0.005, ctx.z(t)));
    S.decal.push(new THREE.CircleGeometry(1, 20, 0, Math.PI).scale(0.17, 0.042, 1).rotateY(Math.PI).translate(0, ctx.top(t) - low - ctx.dip(t, 0) - 0.004, ctx.z(t) - 0.15));
  }
  // ---- Spoilers
  const sp = custom.spoiler ?? b.spoiler ?? 'none';
  const tDeck = b.deckT ?? 0.94;
  const deckY = ctx.top(tDeck) - low - ctx.dip(tDeck, 0);
  const deckZ = ctx.z(tDeck);
  const spW = ctx.hw(tDeck) * 2 * 0.92;
  if (sp === 'lip') {
    S.paint.push(new THREE.BoxGeometry(spW, 0.03, 0.12).translate(0, deckY + 0.012, deckZ + 0.02));
  } else if (sp === 'duck') {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); shape.lineTo(0.3, 0); shape.lineTo(0.3, 0.09); shape.lineTo(0, 0.01); shape.lineTo(0, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: spW, bevelEnabled: false });
    g.translate(0, 0, -spW / 2).rotateY(-Math.PI / 2);
    g.translate(0, deckY - 0.015, deckZ - 0.18);
    S.paint.push(g);
  } else if (sp === 'wing' || sp === 'gt') {
    const hgt = sp === 'gt' ? 0.38 : 0.24;
    const chord = sp === 'gt' ? 0.34 : 0.26;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(chord * 0.2, 0.045, chord * 0.7, 0.03, chord, 0.0);
    shape.bezierCurveTo(chord * 0.7, 0.008, chord * 0.2, -0.012, 0, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: spW * 1.02, bevelEnabled: false, curveSegments: 8 });
    g.translate(0, 0, -spW * 0.51).rotateY(-Math.PI / 2).rotateX(0.12);
    g.translate(0, deckY + hgt, deckZ - chord * 0.3);
    (sp === 'gt' ? S.kit : S.paint).push(g);
    both((sx) => {
      // uprights start just under the deck surface so they never float
      S.kit.push(new THREE.BoxGeometry(0.02, hgt + 0.04, 0.1).translate(sx * spW * 0.33, deckY + hgt / 2 - 0.02, deckZ));
      const eh = sp === 'gt' ? 0.15 : 0.1;
      const ep = new THREE.Shape();
      ep.moveTo(-0.04 * chord, -0.035); ep.lineTo(chord * 1.06, -0.05); ep.lineTo(chord * 1.06, eh);
      ep.quadraticCurveTo(chord * 0.55, eh * 0.95, chord * 0.12, eh * 0.45); ep.lineTo(-0.04 * chord, 0.02); ep.lineTo(-0.04 * chord, -0.035);
      const eg = new THREE.ExtrudeGeometry(ep, { depth: 0.01, bevelEnabled: false, curveSegments: 6 }).rotateY(-Math.PI / 2);
      S.kit.push(eg.translate(sx * spW * 0.51 + 0.005, deckY + hgt, deckZ - chord * 0.3));
    });
  }
  if (b.roofRails) {
    both((sx) => S.trim.push(new THREE.BoxGeometry(0.04, 0.05, L * 0.4).translate(sx * W * 0.32, b.cabin.roof + 0.03 - low, ctx.z((b.cabin.t1 + b.cabin.t2) / 2))));
  }
  if (b.bed) {
    const t0 = b.bed;
    const z0 = ctx.z(t0), z1 = ctx.z(0.985);
    S.trim.push(new THREE.BoxGeometry(W * 0.84, 0.03, z1 - z0).translate(0, ctx.top(0.8) - low + 0.012, (z0 + z1) / 2));
  }
  return { S, ctx, lamps };
}

/* ------------------------------------------------------------ trucks */
export function truckParts(def) {
  const b = def.body;
  const S = { paint: [], glass: [], trim: [], chrome: [], head: [], tail: [], plate: [], interior: [], kit: [], body2: [] };
  const lamps = { head: [], tail: [], ind: [], exhaust: [] };
  const L = b.L, W = b.W;
  const cabL = b.cabL, cabH = b.cabH;
  const zFront = -L / 2;
  const box = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z);
  // chassis
  S.trim.push(box(1.0, 0.25, L - 0.6, 0, 0.75, 0.1));
  // cab
  const hoodL = b.hoodL ?? 0;
  const wr = b.wr;
  const hb = 2 * wr + 0.05; // hood bottom sits above the front tyres
  const track = W - 0.32;
  if (hoodL > 0) {
    S.paint.push(box(W * 0.88, 1.6 - hb, hoodL, 0, (1.6 + hb) / 2, zFront + hoodL / 2 + 0.25));
    S.trim.push(box(W * 0.6, 1.55 - 0.74, 0.06, 0, (1.55 + 0.74) / 2, zFront + 0.24));
    S.chrome.push(box(W * 0.95, 0.25, 0.25, 0, 0.6, zFront + 0.12));
    // engine block / frame visible between the front wheels
    S.trim.push(box(W * 0.5, hb - 0.5, hoodL, 0, (hb + 0.5) / 2, zFront + hoodL / 2 + 0.25));
  } else {
    S.trim.push(box(W * 0.98, 0.3, 0.3, 0, 0.6, zFront + 0.15));
  }
  // fenders over the steer axle
  for (const a of b.axles || []) {
    if (!a.steer) continue;
    for (const sx of [-1, 1]) {
      const f = new THREE.CylinderGeometry(wr + 0.1, wr + 0.1, 0.42, 14, 1, true, 0, Math.PI).rotateZ(Math.PI / 2);
      S.paint.push(f.translate(sx * track / 2, wr, a.z));
    }
  }
  const cz0 = zFront + 0.25 + hoodL;
  const frameTop = 0.875;
  S.paint.push(box(W, cabH - 1.0, cabL, 0, 1.0 + (cabH - 1.0) / 2, cz0 + cabL / 2));
  // cab floor / steps down to the frame so the cab doesn't hover
  S.trim.push(box(W * 0.94, 1.0 - frameTop + 0.02, cabL * 0.96, 0, (1.0 + frameTop) / 2, cz0 + cabL / 2));
  for (const sx of [-1, 1]) S.chrome.push(box(0.12, 0.03, cabL * 0.35, sx * (W * 0.47 + 0.04), 0.85, cz0 + cabL * 0.35));
  S.glass.push(box(W * 0.9, 0.85, 0.04, 0, cabH - 0.65, cz0 - 0.005));
  for (const sx of [-1, 1]) S.glass.push(box(0.04, 0.6, cabL * 0.45, sx * (W / 2 + 0.001), cabH - 0.62, cz0 + cabL * 0.3));
  if (b.fairing) S.paint.push(box(W * 0.95, b.fairing, cabL * 0.7, 0, cabH + b.fairing / 2, cz0 + cabL * 0.55));
  for (const sx of [-1, 1]) {
    // headlamps set into the front face (hood or cab), never wider than it
    const faceHalf = hoodL > 0 ? W * 0.44 : W / 2;
    const ly = hoodL > 0 ? (1.6 + hb) / 2 - 0.12 : 1.18;
    const lx = faceHalf - 0.2;
    S.head.push(box(0.28, 0.15, 0.05, sx * lx, ly, zFront + 0.245));
    lamps.head.push([sx * lx, ly, zFront + 0.18]);
    // mirror on an arm
    S.trim.push(box(0.125, 0.03, 0.03, sx * (W / 2 + 0.0525), cabH - 0.415, cz0 + 0.1)); // arm meets the top of the head's inner face
    S.trim.push(box(0.06, 0.4, 0.22, sx * (W / 2 + 0.145), cabH - 0.6, cz0 + 0.1));
  }
  // cargo
  const cargoZ0 = b.cargoZ0 ?? (cz0 + cabL + 0.15);
  const cargoL = L / 2 - cargoZ0;
  const floor = b.cargoFloor ?? 1.05;
  S.body2.push(box(W, b.H - floor, cargoL, 0, floor + (b.H - floor) / 2, cargoZ0 + cargoL / 2));
  // subframe rails and cross-members between the frame and the cargo floor
  for (const sx of [-1, 1]) S.trim.push(box(0.14, floor - frameTop + 0.02, cargoL - 0.2, sx * 0.42, (floor + frameTop) / 2, cargoZ0 + cargoL / 2));
  for (let z = cargoZ0 + 0.4; z < L / 2 - 0.3; z += 0.9) S.trim.push(box(W * 0.9, 0.08, 0.08, 0, floor - 0.05, z));
  // axles join each wheel set to the frame
  for (const a of b.axles || []) {
    S.trim.push(new THREE.CylinderGeometry(0.07, 0.07, W - 0.3, 10, 22).rotateZ(Math.PI / 2).translate(0, b.wr, a.z));
    // leaf-spring packs sit on the axle and carry the chassis rails
    const yb = 0.625, y0 = b.wr + 0.06;
    for (const sx of [-1, 1]) S.trim.push(box(0.1, yb - y0 + 0.02, 0.9, sx * 0.42, (yb + y0) / 2, a.z));
  }
  S.trim.push(box(W * 0.98, 0.12, 0.05, 0, floor - 0.05, L / 2 - 0.01));
  for (const sx of [-1, 1]) {
    S.tail.push(box(0.2, 0.1, 0.04, sx * (W / 2 - 0.2), floor - 0.12, L / 2 + 0.01));
    lamps.tail.push([sx * (W / 2 - 0.2), floor - 0.12, L / 2 + 0.05]);
    lamps.ind.push([sx * (W / 2 - 0.05), floor - 0.12, L / 2 + 0.05]);
    lamps.ind.push([sx * (W / 2 - 0.05), 1.0, zFront + 0.1]);
    // side under-run guard: two rails hung from the cargo floor on brackets
    const gL = cargoL * 0.45, gz = cargoZ0 + cargoL * 0.35, gx = sx * (W / 2 - 0.05);
    for (const gy of [0.62, 0.84]) S.trim.push(box(0.04, 0.08, gL, gx, gy, gz));
    for (const f of [-0.45, 0, 0.45]) S.trim.push(box(0.04, floor - 0.58 + 0.01, 0.06, gx, (floor + 0.58) / 2, gz + f * gL));
  }
  // rear under-run bar on brackets, plate mounted on it
  S.trim.push(box(W * 0.9, 0.12, 0.1, 0, 0.62, L / 2 - 0.12));
  for (const sx of [-1, 1]) S.trim.push(box(0.08, floor - 0.62, 0.08, sx * 0.5, (floor + 0.62) / 2, L / 2 - 0.14));
  S.plate.push(new THREE.PlaneGeometry(0.31, 0.155).translate(0, 0.62, L / 2 - 0.065));
  if (b.stacks) for (const sx of [-1, 1]) S.chrome.push(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 10).translate(sx * (W / 2 - 0.1), cabH - 0.2, cz0 + cabL + 0.08));
  return { S, lamps, ctx: { L, W, H: b.H, wr: b.wr, tw: 0.3, track: W - 0.32 } };
}

/* ------------------------------------------------------------ public */
export function wheelLayout(def, ctx) {
  const b = def.body;
  if (b.axles) return b.axles.map((a) => ({ z: a.z, dual: a.dual, r: b.wr, steer: !!a.steer }));
  return [{ z: ctx.zf, r: b.wr, steer: true }, { z: ctx.zr, r: b.wr, steer: false }];
}

/** Merged geometry groups for instanced traffic. */
export function buildTrafficGeometry(def) {
  const isTruck = def.kind === 'truck';
  const { S, lamps, ctx } = isTruck ? truckParts(def) : carParts(def, def.custom || {}, false);
  const wg = wheelGeometries(def.body.wr, isTruck ? 0.3 : ctx.tw, 'five', false);
  const axles = wheelLayout(def, ctx);
  const dark = [...S.trim, ...S.interior, ...S.kit];
  const metal = [...S.chrome];
  for (const a of axles) {
    for (const sx of [-1, 1]) {
      const xs = a.dual ? [ctx.track / 2 - 0.16, ctx.track / 2 + 0.16] : [ctx.track / 2];
      for (const x of xs) {
        const t = wg.tire.clone(), r = wg.rim.clone();
        if (sx < 0) { t.rotateY(Math.PI); r.rotateY(Math.PI); }
        t.translate(sx * x, a.r - (ctx.lower || 0) * 0, a.z);
        r.translate(sx * x, a.r, a.z);
        dark.push(t);
        metal.push(r);
      }
    }
  }
  const out = {};
  // soft contact shadow under the car (keeps cars grounded even where shadow maps can't resolve)
  const shadow = [new THREE.PlaneGeometry(ctx.W * 1.28, ctx.L * 1.1).rotateX(-Math.PI / 2).translate(0, 0.03, 0)];
  const groups = { shadow, paint: S.paint, glass: [...S.glass, ...(S.decal || []), ...(S.mesh || []), ...(S.amber || []), ...(S.amberL || []), ...(S.amberR || []), ...(S.lens || []), ...(S.rev || [])], dark, metal, head: [...S.head, ...(S.drl || [])], tail: S.tail, plate: S.plate, body2: S.body2 };
  for (const [k, list] of Object.entries(groups)) if (list.length) out[k] = merge(list);
  return { groups: out, lamps, dims: { L: ctx.L, W: ctx.W, H: def.body.H } };
}

export const PAINT_FINISHES = {
  gloss: { metalness: 0.05, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.04 },
  metallic: { metalness: 0.62, roughness: 0.36, clearcoat: 1, clearcoatRoughness: 0.05 },
  pearl: { metalness: 0.35, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 0.7, iridescenceIOR: 1.6 },
  matte: { metalness: 0.08, roughness: 0.72, clearcoat: 0, clearcoatRoughness: 0.5 },
  chrome: { metalness: 1.0, roughness: 0.07, clearcoat: 0.6, clearcoatRoughness: 0.02 },
};

const TINTS = [
  { color: 0x1f262c, opacity: 0.66 },
  { color: 0x11151a, opacity: 0.8 },
  { color: 0x08090b, opacity: 0.9 },
  { color: 0x020203, opacity: 0.96 },
];

/** Full-detail player/garage car: returns a structured object. */
export function buildPlayerCar(def, custom, plateText = 'NO HESI') {
  const { S, ctx, lamps } = carParts(def, custom, true);
  const fin = PAINT_FINISHES[custom.finish] || PAINT_FINISHES.metallic;
  const mats = {
    // clear coat with a faint orange-peel ripple, so reflections waver slightly like real paint
    paint: new THREE.MeshPhysicalMaterial({ color: custom.color, envMapIntensity: 1.55, ...fin, clearcoatNormalMap: orangePeelNormal(), clearcoatNormalScale: new THREE.Vector2(0.035, 0.035) }),
    glass: new THREE.MeshPhysicalMaterial({ color: TINTS[custom.tint ?? 1].color, metalness: 0.25, roughness: 0.03, transparent: true, opacity: TINTS[custom.tint ?? 1].opacity, envMapIntensity: 2.4, clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: true }),
    trim: new THREE.MeshStandardMaterial({ color: 0x0d0e10, roughness: 0.55, metalness: 0.2 }),
    interior: new THREE.MeshStandardMaterial({ color: new THREE.Color(interiorFor(def).palette.seat).multiplyScalar(0.7), roughness: 0.8 }),
    chrome: new THREE.MeshStandardMaterial({ color: custom.exhaust === 'straight' ? 0x6b5fa0 : 0xd8dadc, metalness: 1, roughness: 0.18 }),
    // lamp internals: polished reflector behind clear glass by day, glowing at night
    head: new THREE.MeshStandardMaterial({ color: 0xc4ccd4, emissive: 0xf2f6ff, emissiveIntensity: 0.02, roughness: 0.08, metalness: 0.92 }),
    drl: new THREE.MeshStandardMaterial({ color: 0xf4f8ff, emissive: 0xeaf2ff, emissiveIntensity: 1.1, roughness: 0.2 }),
    lens: new THREE.MeshStandardMaterial({ color: 0x0c0f13, roughness: 0.04, metalness: 0.7 }),
    tail: new THREE.MeshStandardMaterial({ color: 0x4a0606, emissive: 0xff1a12, emissiveIntensity: 0.35, roughness: 0.15 }),
    plate: new THREE.MeshStandardMaterial({ map: plateTexture(plateText, def.plate || 'ca'), roughness: 0.4 }),
    decal: new THREE.MeshPhysicalMaterial({ color: 0x07080a, roughness: 0.18, metalness: 0.35, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.2 }),
    mesh: new THREE.MeshStandardMaterial({ map: grilleMeshTexture(), roughness: 0.62, metalness: 0.15 }),
    amber: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    amberL: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    amberR: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    rev: new THREE.MeshStandardMaterial({ color: 0xd8dde3, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.1, metalness: 0.5 }),
    kit: new THREE.MeshStandardMaterial({ color: custom.kitColor === 'body' ? custom.color : 0x15161a, roughness: custom.kitColor === 'body' ? 0.3 : 0.45, metalness: 0.25 }),
    body2: new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.6 }),
    rim: new THREE.MeshStandardMaterial({ color: custom.rimColor ?? 0xc9ccd0, metalness: 0.85, roughness: 0.28 }),
    tire: new THREE.MeshStandardMaterial({ map: tireTexture(), color: 0xb8b8b8, roughness: 0.9 }),
    disc: new THREE.MeshStandardMaterial({ map: brakeDiscTexture(), color: 0xc8ccd2, metalness: 0.85, roughness: 0.45 }),
    caliper: new THREE.MeshStandardMaterial({ color: custom.caliper ?? 0xc8102e, roughness: 0.35, metalness: 0.2 }),
  };
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const meshes = {};
  mats.cabinTop = mats.paint;
  // surface patches sit a few mm off the body: bias them so they never z-fight at distance
  for (const k of ['decal', 'mesh', 'amber', 'amberL', 'amberR', 'rev', 'head', 'drl', 'lens', 'tail', 'plate', 'chrome']) Object.assign(mats[k], { polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
  for (const [k, list] of Object.entries(S)) {
    if (!list.length) continue;
    const geo = merge(list);
    if (k === 'paint' || k === 'cabinTop') {
      // projected UVs for the clear-coat ripple (isotropic, so the projection's stretch doesn't show)
      const p = geo.attributes.position, uv = geo.attributes.uv;
      for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getZ(i) + p.getX(i) * 0.7) * 9, (p.getY(i) + p.getX(i) * 0.7) * 9);
      uv.needsUpdate = true;
    }
    const m = new THREE.Mesh(geo, mats[k]);
    m.castShadow = !['glass', 'head', 'drl', 'lens', 'tail', 'rev', 'plate', 'interior', 'decal', 'mesh', 'amber', 'amberL', 'amberR'].includes(k);
    m.receiveShadow = ['paint', 'trim', 'kit', 'cabinTop', 'decal', 'mesh', 'interior'].includes(k);
    if (k === 'glass') m.renderOrder = 2;
    body.add(m);
    meshes[k] = m;
  }
  // Wheels
  const wg = wheelGeometries(def.body.wr, ctx.tw, custom.wheels || 'five', true);
  const wheels = [];
  const axles = wheelLayout(def, ctx);
  for (const a of axles) {
    for (const sx of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(sx * ctx.track / 2, a.r, a.z);
      const flip = new THREE.Group();
      if (sx < 0) flip.rotation.y = Math.PI;
      pivot.add(flip);
      const spin = new THREE.Group();
      flip.add(spin);
      const tire = new THREE.Mesh(wg.tire, mats.tire);
      const rim = new THREE.Mesh(wg.rim, mats.rim);
      tire.castShadow = true;
      rim.castShadow = true;
      spin.add(tire, rim);
      const disc = new THREE.Mesh(wg.disc, mats.disc);
      spin.add(disc);
      const cal = new THREE.Mesh(wg.caliper, mats.caliper);
      cal.position.x = -0.06;
      cal.rotation.x = (a.steer ? 0.6 : -0.6) * sx;
      flip.add(cal);
      root.add(pivot);
      wheels.push({ pivot, spin, side: sx, front: a.steer, r: a.r, baseY: a.r });
    }
  }
  // contact shadow on the ground (root stays level with the road; the body rolls above it)
  mats.blob = new THREE.MeshBasicMaterial({ map: blobShadowTexture(), color: 0x000000, transparent: true, opacity: 0.62, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(ctx.W * 1.3, ctx.L * 1.12).rotateX(-Math.PI / 2).translate(0, 0.025, 0), mats.blob);
  blob.renderOrder = -1;
  root.add(blob);
  meshes.blob = blob;
  // plate faces backwards
  const top = ctx.top;
  const c = def.body.cabin;
  const dims = {
    L: ctx.L, W: ctx.W, H: def.body.H, wb: def.body.wb, wr: def.body.wr, track: ctx.track,
    zf: ctx.zf, zr: ctx.zr, lower: ctx.lower,
    hoodY: top(Math.max(0.05, c ? c.t0 - 0.06 : 0.25)) - ctx.lower,
    hoodZ: ctx.z(Math.max(0.05, c ? c.t0 - 0.08 : 0.25)),
    // driver's eye: under the roof, mid-cabin, then moved by the car's own seating position
    eyeY: (c ? c.roof : def.body.H) - 0.178 - ctx.lower + (interiorFor(def).eyeDY ?? 0),
    eyeZ: (c ? ctx.z(c.t1 + (c.t2 - c.t1) * 0.5) : 0) + (interiorFor(def).eyeDZ ?? 0),
    dashZ: c ? ctx.z(c.t0 + 0.03) : -0.5,
    beltY: c ? top((c.t1 + c.t2) / 2) - ctx.lower : 0.9,
    wsBaseY: c ? top(c.t0) - ctx.lower : 0.9,
    wsTopZ: c ? ctx.z(c.t1) : -0.2,
    roofY: (c ? c.roof : def.body.H) - ctx.lower,
    frontZ: -ctx.L / 2,
    rearZ: ctx.L / 2,
    cabinW: c ? ctx.hw((c.t1 + c.t2) / 2) * (c.wBot ?? 0.86) : ctx.W / 2,
  };
  return { root, body, meshes, mats, wheels, lamps, dims, ctx };
}

export function disposeCar(car) {
  car.root.traverse((o) => {
    if (o.isMesh) o.geometry.dispose();
  });
  for (const m of new Set(Object.values(car.mats))) {
    if (m.map && m.map !== blobShadowTexture() && m.map !== grilleMeshTexture() && m.map !== tireTexture()) m.map.dispose();
    m.dispose();
  }
}
