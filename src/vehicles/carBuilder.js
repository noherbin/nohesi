// Procedural car models built from lofted cross-sections.
// Car-local frame: x right, y up, z backward (forward is -z). Origin at ground level, mid-length.
import * as THREE from 'three';
import { merge } from '../world/props.js';
import { makeMonotone, clamp, lerp } from '../core/utils.js';
import { plateTexture, blobShadowTexture, grilleMeshTexture, tireTexture } from '../world/textures.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { interiorFor } from '../config/interiors.js';
import { normalizeCustom } from '../config/parts.js';
import { brakeDiscTexture, orangePeelNormal, headlampTexture, taillampTexture, thinLampTexture } from '../camera/interiorTextures.js';
import { glowTexture } from '../world/textures.js';
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
    // shoulder crease (raised), and a concave lower character line whose upper edge is sharp and lower edge fades
    const sd = y - sy, sw = sect.scallopW ?? 0.09;
    const dent = sd > 0 ? Math.exp(-Math.pow(sd / (sw * 0.35), 2)) : Math.exp(-Math.pow(sd / sw, 2));
    xx += flank * (crease * Math.exp(-Math.pow((y - cy) / cw, 2)) - scallop * dent);
    return xx;
  };
  const pts = dense.map(([x, y]) => [shape(x, y), y]);
  // arc-length resample, always keeping the crease crest and its flanks
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], (pts[i][1] - pts[i - 1][1]) * 1.6));
  const total = acc[acc.length - 1];
  const keepY = [cy - cw * 1.2, cy - cw * 0.45, cy, cy + cw * 0.45, cy + cw * 1.2, s, sy - 0.05, sy - 0.02, sy, sy + 0.008, sy + 0.02];
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

// Bolt-on widebody kits: riveted over-fenders stand proud of the stock body (ext, m), the tracks widen so
// the tyres fill them, and the tyres themselves get wider. band = radial width of the flare round the arch.
export const FLARE_KITS = {
  rivet: { ext: 0.065, band: 0.075, tyre: 1.14, leg: 0.075, shape: 'angular' },
  outlaw: { ext: 0.09, band: 0.095, tyre: 1.2, leg: 0.1, shape: 'boxy' },
};

/** Body drop (m, positive = lower) for a customisation: the mean of front and rear ride height. */
export function rideLower(custom = {}) {
  if (custom.rideF !== undefined || custom.rideR !== undefined) return clamp(-((custom.rideF || 0) + (custom.rideR || 0)) / 2000, -0.03, 0.09);
  return custom.suspension === 'slammed' ? 0.07 : custom.suspension === 'lowered' ? 0.035 : 0;
}
/** Nose-down (negative) / tail-down rake of the body, radians, from the front/rear ride heights. */
export function rideRake(def, custom = {}) {
  return ((custom.rideF || 0) - (custom.rideR || 0)) / 1000 / def.body.wb;
}

/** Geometric context for a body definition. */
export function bodyContext(b, custom = {}, hi = true) {
  const L = b.L, W = b.W;
  const fend = custom.fenders ?? (['wide', 'rivet', 'outlaw'].includes(custom.kit) ? custom.kit : 'stock');
  const widen = fend === 'wide' ? 0.07 : 0;
  // ride height: the body is built at the average of front and rear (the difference is a rake angle on
  // the body); older presets map to fixed drops
  const lower = rideLower(custom);
  const top0 = makeMonotone(b.top);
  const bot0 = makeMonotone(b.bottom);
  // a real car's nose and tail are near-vertical faces (bumper lip low, bonnet / boot edge high), not a
  // tapered blade: pull the profile ends apart so the front and rear read as panels rather than a pill
  const bF = bot0(0.1), bR = bot0(0.9), tF = top0(0.045), tR = top0(0.97);
  const bot = (t) => {
    const y = bot0(t);
    if (t < 0.1) return bF + (y - bF) * 0.55;
    if (t > 0.9) return bR + (y - bR) * 0.72;
    return y;
  };
  const top = (t) => {
    const y = top0(t);
    if (t < 0.045) return y + (tF - y) * 0.4 * (1 - t / 0.045) ** 0.5;
    if (t > 0.97) return y + (tR - y) * 0.3 * ((t - 0.97) / 0.03) ** 0.5;
    return y;
  };
  const plan = { f: 0.075, r: 0.06, fp: 2.6, rp: 2.6, hips: 0, flare: 0, waist: 0, ...(b.plan || {}) };
  // production-car plan view: flat nose and tail panels with tight corners, not a rounded bar of soap
  plan.fp = Math.max(plan.fp, 3.6);
  plan.rp = Math.max(plan.rp, 3.8);
  const sect = { s: 0.45, nt: 3.0, nb: 7, ...(b.sect || {}) };
  // section like a real body side: widest near the belt line, doors almost vertical below it with a tucked
  // rocker, a crisp shoulder crease, and taut, nearly flat bonnet / roof / boot surfaces above
  sect.s = clamp(sect.s + 0.11, 0.55, 0.63);
  sect.nt = Math.max(sect.nt * 1.35, 4.6);
  sect.nb = Math.max(sect.nb, 9);
  sect.tuck = sect.tuck ?? 0.08;
  sect.crease = sect.crease ?? 0.014;
  sect.creaseY = sect.creaseY ?? 0.02;
  sect.creaseW = sect.creaseW ?? 0.016;
  // lower character line: a crisp concave step low on the doors (light above, shadow below)
  sect.scallop = sect.scallop ?? 0.014;
  sect.scallopY = sect.scallopY ?? sect.s * 0.4;
  sect.scallopW = sect.scallopW ?? 0.045;
  const tpl = sectionTemplate(sect, hi ? 30 : 12);
  const tFA = b.fa; // front axle t
  const zf = -L / 2 + tFA * L, zr = zf + b.wb;
  const tRA = (zr + L / 2) / L;
  const fk = FLARE_KITS[fend] || null;
  const tw0 = b.tw ?? 0.25;
  const wr = b.wr, tw = tw0 * (fk ? fk.tyre : 1);
  const lowerAmt = Math.max(0, lower);
  const archR = wr + 0.03 + lowerAmt * 0.85;
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
  // tyres sit flush with each fender lip (1.5 cm in), so front and rear tracks follow the body's hips and flares
  const lipTrack = (t) => {
    const yTop = wr + archR - lower, bt = bot(t), tp = top(t);
    const yn = clamp((yTop - bt) / Math.max(0.1, tp - bt), 0, 1);
    const half = hw(t) * templateX(tpl, Math.min(yn, sect.s + 0.02)) * (1 + (b.haunch ?? 0.022) * 0.85);
    return Math.max(W - tw - 0.12, Math.min(W + 0.1, 2 * (half - tw / 2 - 0.015)));
  };
  ctx.trackF = lipTrack(tFA);
  ctx.trackR = lipTrack(tRA);
  ctx.track = Math.min(ctx.trackF, ctx.trackR);
  ctx.trackAt = (zz) => (zz < (zf + zr) / 2 ? ctx.trackF : ctx.trackR);
  // exact half-width of the body side at (t, y unlowered), matching the loft (its yn mapping and the haunch
  // bulge over the wheels), so patches drawn on the flanks sit on the paint instead of sinking into it
  ctx.bodyTrack = ctx.track;
  ctx.bodyTw = tw0;
  const xcN = clamp((ctx.track / 2 - tw0 / 2 - 0.03) / (W / 2), 0.4, 0.86);
  ctx.flankX = (t, y) => {
    const bt = bot(t), tp = top(t);
    const yn = (y - bt) / Math.max(1e-3, tp - bt);
    if (yn < 0 || yn > 1) return 0;
    const xn = templateX(tpl, yn);
    let x = hw(t) * xn;
    if (xn > xcN && yn > sect.s * 0.5 && yn < 0.97) {
      let hb = 0;
      const zz = z(t);
      for (const za of [zf, zr]) { const u = (zz - za) / (archR * 1.55); if (Math.abs(u) < 1) hb = Math.max(hb, 0.5 + 0.5 * Math.cos(u * Math.PI)); }
      const vy = Math.min(1, (yn - sect.s * 0.5) / (sect.s * 0.5)) * Math.min(1, (0.97 - yn) / 0.25);
      x *= 1 + (b.haunch ?? 0.022) * hb * vy;
    }
    return x;
  };
  ctx.frontZ = (x, y) => surfZ(ctx, x, y, true) ?? z(0.04);
  ctx.rearZ = (x, y) => surfZ(ctx, x, y, false) ?? z(0.96);
  ctx.halfWAt = (t, y) => {
    const bt = botA(t), tp = top(t);
    const yn = (y - bt) / (tp - bt);
    if (yn < 0 || yn > 1) return 0;
    return hw(t) * templateX(tpl, yn);
  };
  ctx.mirrorScale = custom.mirrors === 'aero' ? 0.8 : 1;
  if (fk) {
    // over-fenders: work out where each one can sit on this body, then push the tyres out to fill them
    ctx.flare = { ...fk, axles: {} };
    for (const za of [zf, zr]) {
      const R = archR + 0.012;
      const yc = wr - lower; // arch centre (unlowered coordinates, as flankX takes)
      // the arch itself (the flare's core); its ends are trimmed to the body below
      const ts = [];
      for (let k = 0; k <= 8; k++) { const t = (za - R + (k / 8) * 2 * R + L / 2) / L; if (t > 0.01 && t < 0.99) ts.push(t); }
      let xMax = 0;
      for (const t of ts) for (let y = yc - fk.leg; y <= yc + R; y += 0.02) xMax = Math.max(xMax, ctx.flankX(t, y));
      // the flare must not climb onto the bonnet / deck: its top stays where the side is still near full width
      let yLim = yc + R + fk.band;
      for (const t of ts) {
        let y = yc;
        while (y < yc + R + fk.band && ctx.flankX(t, y + 0.01) > xMax - 0.05) y += 0.01;
        yLim = Math.min(yLim, y);
      }
      const vTop = Math.max(R + 0.035, Math.min(R + fk.band * 0.95, yLim - yc - 0.012));
      // inner face sits just inside the body everywhere the flare covers, so no seam opens up
      let xIn = xMax;
      for (const t of ts) for (let y = yc - fk.leg; y <= yc + vTop; y += 0.015) { const fx = ctx.flankX(t, y); if (fx > 0.05) xIn = Math.min(xIn, fx); }
      xIn = Math.max(xIn - 0.02, xMax - 0.16);
      const xOut = xMax + fk.ext;
      // fore and aft the flare only reaches as far as the body is still wide enough to carry it (noses and
      // tails curve in; a flare past that point would stand free as a block)
      const reach = (dir) => {
        let u = R + 0.02;
        while (u < R + fk.band) {
          const t = (za + dir * (u + 0.01) + L / 2) / L;
          if (t <= 0.005 || t >= 0.995) break;
          let ok = true;
          for (let y = yc - fk.leg; y <= yc + vTop && ok; y += 0.02) if (ctx.flankX(t, y) < xIn + 0.012) ok = false;
          if (!ok) break;
          u += 0.01;
        }
        return u;
      };
      ctx.flare.axles[za] = { R, yc, vTop, xIn, xOut, uF: reach(-1), uR: reach(1) };
    }
    const tr = (za) => 2 * (ctx.flare.axles[za].xOut - 0.01 - tw / 2);
    ctx.trackF = tr(zf);
    ctx.trackR = tr(zr);
    ctx.track = Math.min(ctx.trackF, ctx.trackR);
  }
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
  const xc = clamp(((ctx.bodyTrack ?? ctx.track) / 2 - (ctx.bodyTw ?? ctx.tw) / 2 - 0.03) / (ctx.W / 2), 0.4, 0.86);
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
  const xInnerAt = (zz) => ctx.trackAt(zz) / 2 - ctx.tw / 2 - 0.03;
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
    const xcS = clamp(xInnerAt(zz) / Math.max(0.3, w), 0.3, 0.97);
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
      const bm = ctx.b.bumpers;
      const bumper = bm && (tm < bm.f || tm > 1 - bm.r) && yn < bm.h;
      const list = yn < trimH || bumper ? trim : inCabin && yn > 0.7 && xn < 0.9 ? cabinTop : paint;
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
  // B-pillar, plus a C-pillar on estates (rear door glass | quarter glass)
  const pillars = [c.tB, c.tC].filter(Boolean);
  const atPillar = (tm) => pillars.some((tp) => Math.abs(tm - tp) < 0.016);
  const quarter = c.quarter ?? 2;
  const aPillar = c.blackPillars ? pillar : paint;
  for (let i = 0; i < ts.length - 1; i++) {
    const tm = (ts[i] + ts[i + 1]) / 2;
    for (let j = 0; j < R - 1; j++) {
      // ring segment class (mirror for left side)
      const jj = j < H - 1 ? j : R - 2 - j;
      const cls = jj < SIDE - 1 ? 'side' : jj === SIDE - 1 ? 'frame' : jj < SIDE + 3 ? 'corner' : 'roof';
      let list;
      const sideGlass = tm < c.t1 || (tm <= quarter && !atPillar(tm));
      if (cls === 'side') list = sideGlass ? glass : atPillar(tm) ? pillar : paint;
      else if (cls === 'frame') list = sideGlass || atPillar(tm) ? frame : paint;
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
// depth: how far the centre sits behind the lip (m); lip: flat lip width as a share of the rim radius
const DEEP_DISH = {
  deep: { depth: 0.1, lip: 0.14 },
  dish3: { depth: 0.115, lip: 0.17, bolts: 40 },
  dish5: { depth: 0.12, lip: 0.15, step: true },
  sdish: { depth: 0.14, lip: 0.22, step: true },
  steelie: { depth: 0.07, lip: 0.1 },
  slot5: { depth: 0.055, lip: 0.12 },
};

export function wheelGeometries(r, w, style, hi = true, size = 0) {
  const seg = hi ? 28 : 14;
  // rim radius: one inch of rim size is 12.7 mm of radius; the tyre's outer size stays the same
  const rr = Math.min(r - 0.045, r * (hi ? 0.7 : 0.66) + size * 0.0127);
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
  // deep-dish wheels: the centre sits far back inside a polished barrel, behind a wide flat lip (a separate
  // polished part, so the centre can be painted while the lip stays bright)
  const D = hi ? DEEP_DISH[style] : null;
  const lipParts = [];
  let face, ri = rr;
  if (D) {
    ri = rr * (1 - D.lip);
    face = Math.max(-w / 2 + 0.05, w / 2 - D.depth);
    const x0 = w / 2 - 0.01;
    lipParts.push(new THREE.RingGeometry(ri, rr * 1.005, seg * 2).rotateY(Math.PI / 2).translate(x0, 0, 0));
    lipParts.push(new THREE.TorusGeometry(rr * 1.0, 0.007, 6, seg * 2).rotateY(Math.PI / 2).translate(x0 - 0.004, 0, 0));
    if (D.step) {
      // stepped lip: the barrel drops in a second ring part-way down
      const xs = x0 - (x0 - face) * 0.42, r2 = ri * 0.93;
      lipParts.push(new THREE.CylinderGeometry(ri, ri, x0 - xs, seg * 2, 1, true).rotateZ(Math.PI / 2).translate((x0 + xs) / 2, 0, 0));
      lipParts.push(new THREE.RingGeometry(r2, ri, seg * 2).rotateY(Math.PI / 2).translate(xs, 0, 0));
      lipParts.push(new THREE.CylinderGeometry(r2, r2 * 0.98, xs - face, seg * 2, 1, true).rotateZ(Math.PI / 2).translate((xs + face) / 2, 0, 0));
      ri = r2 * 0.98;
    } else {
      lipParts.push(new THREE.CylinderGeometry(ri, ri * 0.97, x0 - face, seg * 2, 1, true).rotateZ(Math.PI / 2).translate((x0 + face) / 2, 0, 0));
      ri *= 0.97;
    }
    if (D.bolts) {
      // three-piece: the centre bolts to the barrel round a flange, a ring of small polished bolt heads
      parts.push(new THREE.RingGeometry(ri * 0.86, ri, seg * 2).rotateY(Math.PI / 2).translate(face + 0.006, 0, 0));
      for (let i = 0; i < D.bolts; i++) {
        const a = (i / D.bolts) * Math.PI * 2;
        lipParts.push(new THREE.CylinderGeometry(0.0052, 0.0052, 0.008, 6).rotateZ(Math.PI / 2).translate(face + 0.01, Math.cos(a) * ri * 0.93, Math.sin(a) * ri * 0.93));
      }
    }
  } else {
    const lip = style === 'rs8' ? 0.045 : 0.025;
    parts.push(new THREE.CylinderGeometry(rr, rr, 0.02, seg, 1, true).rotateZ(Math.PI / 2).translate(w / 2 - 0.02, 0, 0));
    parts.push(new THREE.RingGeometry(rr - lip, rr * 1.005, seg).rotateY(Math.PI / 2).translate(w / 2 - 0.012, 0, 0));
    face = w / 2 - (style === 'rs8' ? 0.055 : 0.035);
  }
  const spokeR = D ? ri * 0.98 : rr * 0.97;
  const hub = rr * 0.24;
  parts.push(new THREE.CylinderGeometry(hub, hub * 1.1, 0.06, 12).rotateZ(Math.PI / 2).translate(face, 0, 0));
  // spokes taper toward the rim and are dished: the outer ends sit further out toward the lip
  const dish = D || style === 'rs8' ? 0.0 : style === 'aero' ? 0.012 : 0.028;
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
    // classic deep dish: six broad spokes
    for (let i = 0; i < 6; i++) parts.push(spoke((i / 6) * Math.PI * 2, 0.07, 0.04, hub * 0.8, spokeR, 0, 0.82));
  } else if (style === 'dish3') {
    // three-piece mesh: crossed fine spokes inside the deep lip
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      parts.push(spoke(a + 0.13, 0.016, 0.026, hub * 0.8, spokeR * 0.9));
      parts.push(spoke(a - 0.13, 0.016, 0.026, hub * 0.8, spokeR * 0.9));
    }
  } else if (style === 'dish5') {
    // deep five-star: five wide, flat spokes
    for (let i = 0; i < 5; i++) parts.push(spoke((i / 5) * Math.PI * 2, 0.085, 0.036, hub * 0.8, spokeR, 0, 0.7));
  } else if (style === 'sdish') {
    // super-deep twelve-spoke
    for (let i = 0; i < 12; i++) parts.push(spoke((i / 12) * Math.PI * 2, 0.024, 0.032, hub * 0.85, spokeR, 0, 0.8));
  } else if (style === 'steelie') {
    // banded steel wheel: a pressed disc with round vents and a polished cap, behind a chrome beauty ring
    parts.push(new THREE.CylinderGeometry(spokeR, spokeR, 0.012, seg * 2).rotateZ(Math.PI / 2).translate(face, 0, 0));
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      parts.push(new THREE.TorusGeometry(spokeR * 0.16, 0.006, 6, 14).rotateY(Math.PI / 2).translate(face + 0.008, Math.cos(a) * spokeR * 0.62, Math.sin(a) * spokeR * 0.62));
    }
    parts.push(new THREE.CylinderGeometry(hub * 1.25, hub * 1.4, 0.03, 20).rotateZ(Math.PI / 2).translate(face + 0.012, 0, 0));
    lipParts.push(new THREE.SphereGeometry(hub * 1.15, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2).scale(0.45, 1, 1).rotateZ(-Math.PI / 2).translate(face + 0.026, 0, 0));
  } else if (style === 'slot5') {
    // classic five-slot mag: five broad spokes leave five long slots, polished lip
    for (let i = 0; i < 5; i++) parts.push(spoke((i / 5) * Math.PI * 2, 0.115, 0.03, hub * 0.85, spokeR, 0, 0.92));
  } else if (style === 'fan') {
    // turbofan: a closed face with sixteen angled vanes, like 80s touring cars
    parts.push(new THREE.CylinderGeometry(rr * 0.9, rr * 0.9, 0.012, seg * 2).rotateZ(Math.PI / 2).translate(face - 0.004, 0, 0));
    for (let i = 0; i < 16; i++) parts.push(spoke((i / 16) * Math.PI * 2, 0.04, 0.022, hub * 1.2, rr * 0.9, 0.55, 0.9));
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
  } else if (style === 'rs8') {
    // classic 80s eight-spoke behind a polished stepped lip
    for (let i = 0; i < 8; i++) parts.push(spoke((i / 8) * Math.PI * 2, 0.052, 0.036, hub * 0.85, rr * 0.88, 0, 0.8));
  } else if (style === 'six') {
    // thin six-spoke from the 90s Japanese GT cars
    for (let i = 0; i < 6; i++) parts.push(spoke((i / 6) * Math.PI * 2, 0.04, 0.042, hub * 0.8, rr * 0.97, 0, 0.78));
  } else if (style === 'vspoke') {
    // five V-spokes: pairs that meet at the hub and open toward the rim
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      for (const s2 of [-1, 1]) parts.push(spoke(a + s2 * 0.13, 0.03, 0.042, hub * 0.9, rr * 0.97, s2 * 0.12, 0.8));
    }
  } else if (style === 'aero') {
    // EV aero wheel: nearly closed face with five narrow slots
    parts.push(new THREE.CylinderGeometry(rr * 0.94, rr * 0.94, 0.012, seg * 2).rotateZ(Math.PI / 2).translate(face + 0.012, 0, 0));
    for (let i = 0; i < 5; i++) parts.push(spoke((i / 5) * Math.PI * 2 + 0.3, 0.07, 0.03, hub * 0.9, rr * 0.93, 0.25, 0.9));
  } else if (style === 'gt') {
    // twenty fine spokes in ten pairs (grand tourer)
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      for (const s2 of [-1, 1]) parts.push(spoke(a + s2 * 0.07, 0.016, 0.03, hub * 0.85, rr * 0.97, 0, 0.75));
    }
  } else if (style === 'blade') {
    // seven swept blades (supercar)
    for (let i = 0; i < 7; i++) parts.push(spoke((i / 7) * Math.PI * 2, 0.06, 0.03, hub * 0.85, rr * 0.97, 0.75, 0.55));
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
  if (hi && style !== 'center' && style !== 'steelie') {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      parts.push(new THREE.CylinderGeometry(0.0105, 0.0105, 0.024, 6).rotateZ(Math.PI / 2).translate(face + 0.03, Math.cos(a) * hub * 0.62, Math.sin(a) * hub * 0.62));
    }
    parts.push(new THREE.CylinderGeometry(hub * 0.42, hub * 0.46, 0.012, 16).rotateZ(Math.PI / 2).translate(face + 0.034, 0, 0));
  }
  const rim = merge(parts);
  // a deep-set centre means a low-offset wheel: the brakes sit further inboard, behind the recessed face
  const bx = Math.min(0, face - 0.052);
  // ventilated disc: two friction faces with a vane gap; caliper is a rounded block with a bridge
  const disc = merge([
    new THREE.CylinderGeometry(rr * 0.82, rr * 0.82, 0.01, 32).rotateZ(Math.PI / 2).translate(0.002, 0, 0),
    new THREE.CylinderGeometry(rr * 0.82, rr * 0.82, 0.01, 32).rotateZ(Math.PI / 2).translate(-0.022, 0, 0),
    new THREE.CylinderGeometry(rr * 0.78, rr * 0.78, 0.016, 32, 1, true).rotateZ(Math.PI / 2).translate(-0.01, 0, 0),
  ]).translate(bx, 0, 0);
  const caliper = hi
    ? merge([
      // (the caliper sits 6 cm inboard of its mount; pads straddle the disc faces)
      new RoundedBoxGeometry(0.026, rr * 0.48, 0.17, 2, 0.011).translate(0.078, rr * 0.6, 0),
      new RoundedBoxGeometry(0.026, rr * 0.48, 0.17, 2, 0.011).translate(0.022, rr * 0.6, 0),
      new RoundedBoxGeometry(0.082, rr * 0.14, 0.13, 2, 0.01).translate(0.05, rr * 0.83, 0),
    ])
    : new THREE.BoxGeometry(0.07, rr * 0.55, 0.16).translate(0.035, rr * 0.55, 0);
  caliper.translate(bx, 0, 0);
  return { tire, rim, disc, caliper, rimR: rr, lip: lipParts.length ? merge(lipParts) : null };
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
      const onSurf = z !== null;
      if (z === null) z = lastZ ?? ctx.z(front ? 0.05 : 0.95);
      lastZ = z;
      // stand off along the surface normal, so layered patches (bezel, lamp, lens) stay stacked in order even
      // where the face turns round the corner (a z-only offset would let them cut through each other there)
      const n = onSurf ? faceNormal(ctx, front, x, y) : null;
      if (n) pos.push(x + n.x * off, y - ctx.lower + n.y * off, z + n.z * off);
      else pos.push(x, y - ctx.lower, z + (front ? -off : off));
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

/** Remap a geometry's uv through f(u, v) -> [u', v'] (texture atlases). */
function atlasUV(g, f) {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) { const [a, b] = f(uv.getX(i), uv.getY(i)); uv.setXY(i, a, b); }
  uv.needsUpdate = true;
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
export function bodyYAtX(ctx, t, x) {
  const b0 = ctx.botA(t), t0 = ctx.top(t), w = ctx.hw(t);
  for (let yn = 1; yn >= 0; yn -= 0.01) {
    if (w * templateX(ctx.tpl, yn) >= x) {
      // refine between this step and the one above it, so patches on gently curved panels don't stair-step
      let lo = yn, hi = Math.min(1, yn + 0.01);
      for (let k = 0; k < 8; k++) { const m = (lo + hi) / 2; if (w * templateX(ctx.tpl, m) >= x) lo = m; else hi = m; }
      const s = ctx.sect.s;
      return b0 + lo * (t0 - b0) - (lo > s ? ctx.dip(t, x / Math.max(1e-3, w)) * Math.min(1, ((lo - s) / (1 - s)) * 2.5) : 0);
    }
  }
  return b0 + 0.5 * (t0 - b0);
}

/** Thin vertical strip on the body side (door shut line etc). */
function sideStrip(ctx, t, y0, y1, side, width = 0.007, off = 0.003, n = 8) {
  const pos = [], idx = [];
  const z = ctx.z(t), dt = width / 2 / ctx.L;
  n = Math.max(n, Math.ceil((y1 - y0) / 0.02));
  const fx = (tt, y) => Math.max(ctx.flankX(tt, y) || ctx.halfWAt(tt, y), 0.05) + off;
  for (let j = 0; j <= n; j++) {
    const y = lerp(y0, y1, j / n);
    pos.push(side * fx(t - dt, y), y - ctx.lower, z - width / 2, side * fx(t + dt, y), y - ctx.lower, z + width / 2);
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
      const x = Math.max(ctx.flankX(t, y) || ctx.halfWAt(t, y), 0.05) + off;
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
    const [x, , z] = xyz[i];
    const onTop = (xx, zz) => bodyYAtX(ctx, (zz + ctx.L / 2) / ctx.L, Math.abs(xx)) - ctx.lower + 0.0035;
    const xa = x - dz * width / 2, za = z + dx * width / 2, xb = x + dz * width / 2, zb = z - dx * width / 2;
    pos.push(xa, onTop(xa, za), za, xb, onTop(xb, zb), zb);
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

/** Patch lying on the upper body surface (bonnet, engine cover). quad = [TL, TR, BR, BL] as [t, x]. */
function topPatch(ctx, quad, off = 0.004, nu = 4, nv = 4) {
  const pos = [], uv = [], idx = [];
  const cols = nu + 1;
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i <= nu; i++) {
      const u = i / nu;
      const tT = lerp(quad[0][0], quad[1][0], u), xT = lerp(quad[0][1], quad[1][1], u);
      const tB = lerp(quad[3][0], quad[2][0], u), xB = lerp(quad[3][1], quad[2][1], u);
      const t = lerp(tT, tB, v), x = lerp(xT, xB, v);
      pos.push(x, bodyYAtX(ctx, t, Math.abs(x)) - ctx.lower + off, ctx.z(t));
      uv.push(u, 1 - v);
    }
  }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const nrm = g.attributes.normal;
  let up = 0;
  for (let i = 0; i < nrm.count; i++) up += nrm.getY(i);
  if (up < 0) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const k = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = k; } g.computeVertexNormals(); }
  return g;
}

/**
 * Air scoop: a ramp that rises from the panel to an open front face. yF / yR are the panel heights at the
 * front and rear ends (lowered space), so the scoop follows the panel's slope.
 */
function scoopGeo(S, zF, zR, yF, yR, w, h) {
  const len = zR - zF;
  const sh = new THREE.Shape();
  sh.moveTo(0, -0.02); sh.lineTo(0, h); sh.quadraticCurveTo(len * 0.35, h * 1.02, len, -0.004); sh.lineTo(len, -0.02); sh.lineTo(0, -0.02);
  const g = new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2, curveSegments: 10 });
  g.translate(0, 0, -w / 2).rotateY(-Math.PI / 2);
  const tilt = Math.atan2(yR - yF, len);
  g.rotateX(-tilt);
  S.paint.push(g.translate(0, yF, zF));
  // dark intake opening on the front face, with a mesh behind it
  const op = new THREE.PlaneGeometry(w * 0.86, h * 0.72).rotateY(Math.PI).rotateX(-tilt);
  S.decal.push(op.translate(0, yF + h * 0.46, zF - 0.0105));
}

/** Louvred vent on the upper surface: black opening with body-colour slats running across it. */
function louvrePatch(ctx, S, t0, t1, x0, x1, n, slatMat = 'paint') {
  S.decal.push(topPatch(ctx, [[t0, x0], [t0, x1], [t1, x1], [t1, x0]], 0.005, 8, 6));
  for (let i = 1; i < n; i++) {
    const t = lerp(t0, t1, i / n), dt = ((t1 - t0) / n) * 0.28;
    S[slatMat].push(topPatch(ctx, [[t - dt, x0 + 0.006], [t - dt, x1 - 0.006], [t + dt, x1 - 0.006], [t + dt, x0 + 0.006]], 0.009, 4, 1));
  }
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
  const k = ctx.mirrorScale ?? 1; // aero mirrors are smaller and sleeker
  return { tm, z: ctx.z(tm) + 0.03, y, xIn: wb - 0.03, x: wb + 0.14 - (1 - k) * 0.03, rx: 0.1 * k, ry: 0.058 * k * (k < 1 ? 0.85 : 1), rz: 0.07 * (k < 1 ? 0.9 : 1) };
}

/**
 * Build all parts of a car as geometries keyed by material slot.
 * slots: paint, glass, trim, decal, chrome, head, tail, plate, interior, kit, body2, cabinTop
 */
/**
 * Bolt-on over-fenders for the widebody kits: a band round each wheel arch standing out from the stock body,
 * angular (rivet kit) or boxy (outlaw kit), with exposed rivets, plus skirt extensions bridging the flares.
 */
function overFenders(S, ctx, hi) {
  const F = ctx.flare, low = ctx.lower;
  // outward-extent factor: full over the tyre, easing toward the body at the ends and along the top edge
  const ss = (x) => { const q = clamp(x, 0, 1); return q * q * (3 - 2 * q); };
  const taper = (A, R, e, za, y, zz) => {
    const u = zz - za, v = y - (A.yc - low);
    const uEnd = u < 0 ? A.uF : A.uR, au = Math.abs(u);
    const fu = au <= R * 0.62 ? 1 : 1 - 0.68 * ss((au - R * 0.62) / Math.max(0.02, uEnd - R * 0.62));
    const v0 = A.vTop - e * 0.75;
    const fv = v <= v0 ? 1 : 1 - 0.5 * ss((v - v0) / (A.vTop + 0.01 - v0));
    return fu * fv;
  };
  const outline = (R, e, vTop, uF, uR) => {
    const Re = R + e;
    const top = vTop;
    const pts = F.shape === 'boxy'
      ? [[-Re, -F.leg], [-Re, Re * 0.32], [-Re * 0.8, top * 0.9], [-Re * 0.58, top], [Re * 0.58, top], [Re * 0.8, top * 0.9], [Re, Re * 0.32], [Re, -F.leg]]
      : [[-Re, -F.leg], [-Re, 0.0], [-Re * 0.9, top * 0.52], [-Re * 0.48, top], [Re * 0.48, top], [Re * 0.9, top * 0.52], [Re, 0.0], [Re, -F.leg]];
    // trimmed fore and aft to where the body can carry the flare
    return pts.map(([u, v]) => [Math.max(-uF, Math.min(uR, u)), v]);
  };
  const rivets = [];
  for (const za of [ctx.zf, ctx.zr]) {
    const A = F.axles[za];
    const R = A.R, e = Math.max(0.04, Math.min(F.band, A.vTop - R + 0.02));
    const depth = A.xOut - 0.01 - A.xIn;
    for (const sx of [-1, 1]) {
      // shape in (u, v) = (along the car, up from the arch centre); u is mirrored per side so the extrusion
      // (shape z) always runs outward from the body
      const sg = sx > 0 ? -1 : 1;
      const sh = new THREE.Shape();
      const out = outline(R, e, A.vTop, A.uF, A.uR);
      sh.moveTo(sg * out[0][0], out[0][1]);
      for (const [u, v] of out.slice(1)) sh.lineTo(sg * u, v);
      sh.lineTo(sg * R, -F.leg);
      sh.lineTo(sg * R, 0);
      const n = hi ? 20 : 8;
      for (let i = 1; i <= n; i++) { const a = (i / n) * Math.PI; sh.lineTo(sg * R * Math.cos(a), R * Math.sin(a)); }
      sh.lineTo(-sg * R, -F.leg);
      const g = new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.007, bevelSegments: hi ? 2 : 1, curveSegments: 4 });
      g.rotateY(sx > 0 ? Math.PI / 2 : -Math.PI / 2);
      g.translate(sx * A.xIn, A.yc - low, za);
      // taper: the flare blends into the body at its ends (into the bumper / sill) and rolls over at the top,
      // instead of ending in flat slabs
      const p = g.attributes.position;
      // never higher than the body side it is bolted to (noses and tails drop away ahead of / behind the arch)
      const yBodyCache = new Map();
      const yBody = (zz) => {
        const key = Math.round(zz * 200);
        if (yBodyCache.has(key)) return yBodyCache.get(key);
        const t = clamp((zz + ctx.L / 2) / ctx.L, 0, 1);
        let y = A.yc;
        while (y < A.yc + A.vTop + 0.03 && ctx.flankX(t, y + 0.005) >= A.xIn + 0.01) y += 0.005;
        yBodyCache.set(key, y - low);
        return y - low;
      };
      for (let i = 0; i < p.count; i++) {
        const y0 = p.getY(i), zz = p.getZ(i);
        const u = zz - za;
        if (y0 - (A.yc - low) > 0.0) {
          const yArch = A.yc - low + Math.sqrt(Math.max(0, R * R - u * u));
          // keeps a real band over the tyre even where the body is lower than the arch (low-nosed supercars)
          const lim = Math.max(yArch + Math.min(e * 0.7, 0.055), yBody(zz) - 0.004);
          if (y0 > lim) p.setY(i, lim);
        }
      }
      for (let i = 0; i < p.count; i++) {
        const x = Math.abs(p.getX(i)), y = p.getY(i), zz = p.getZ(i);
        const f = taper(A, R, e, za, y, zz);
        if (f >= 0.999) continue;
        const fl = ctx.flankX(clamp((zz + ctx.L / 2) / ctx.L, 0, 1), y + low) || A.xIn;
        if (x <= fl) continue;
        p.setX(i, sx * (fl + (x - fl) * f));
      }
      g.computeVertexNormals();
      S.paint.push(g);
      if (!hi) continue;
      // rivets round the band, and down the legs, seated on the finished (tapered) outer face
      const fm = new THREE.Mesh(g);
      const rc = new THREE.Raycaster();
      const rivet = (y, zz) => {
        rc.set(new THREE.Vector3(sx * (A.xOut + 0.3), y, zz), new THREE.Vector3(-sx, 0, 0));
        const hit = rc.intersectObject(fm)[0];
        if (!hit || hit.face.normal.x * sx < 0.6) return;
        const n = hit.face.normal;
        const rv = new THREE.CylinderGeometry(0.0068, 0.0078, 0.008, 8).rotateZ(-sx * Math.PI / 2);
        rv.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(sx, 0, 0), n.clone().normalize()));
        rivets.push(rv.translate(hit.point.x + n.x * 0.002, hit.point.y + n.y * 0.002, hit.point.z + n.z * 0.002));
      };
      const rm = R + e * 0.5;
      const k = F.shape === 'boxy' ? 11 : 9;
      // rivets sit mid-band; where a trimmed end leaves the band narrow, they move in with it
      const uAt = (u) => Math.max(-(R + (A.uF - R) * 0.5), Math.min(R + (A.uR - R) * 0.5, u));
      for (let i = 0; i < k; i++) {
        const a = 0.12 + (i / (k - 1)) * (Math.PI - 0.24);
        const vy = Math.min(rm * Math.sin(a), A.vTop - e * 0.45);
        rivet(A.yc - low + vy, za + uAt(rm * Math.cos(a)));
      }
      for (const su of [-1, 1]) rivet(A.yc - low - F.leg * 0.5, za + uAt(su * rm));
    }
  }
  S.chrome.push(...rivets);
  // skirt extensions from the front flare to the rear one, out to the flares' faces
  const Af = F.axles[ctx.zf], Ar = F.axles[ctx.zr];
  const z0 = ctx.zf + Af.R + F.band * 0.6, z1 = ctx.zr - Ar.R - F.band * 0.6;
  if (z1 > z0 + 0.2) {
    const tm = ((z0 + z1) / 2 + ctx.L / 2) / ctx.L;
    const yS = ctx.bot(tm) + 0.045;
    const xb = ctx.flankX(tm, yS + 0.02) || ctx.hw(tm) * 0.9;
    const xo = Math.min(Af.xOut, Ar.xOut) - 0.012;
    if (xo > xb) {
      for (const sx of [-1, 1]) {
        const w = xo - xb + 0.04;
        S.kit.push(new RoundedBoxGeometry(w, 0.075, z1 - z0, 2, 0.012).translate(sx * (xb - 0.04 + w / 2), yS - low, (z0 + z1) / 2));
      }
    }
  }
}

/** The body's own feature flags plus what the fitted hood / fender / roof parts add. */
function bodyWithParts(b0, custom) {
  const b = { ...b0 };
  const front = !b0.louvres || b0.louvres < 0.5; // mid / rear-engined cars carry engine louvres behind the cabin
  if (custom.fenders === 'vented') b.gills = true;
  const hoodT = b0.cabin ? Math.min(0.2, b0.cabin.t0 - 0.09) : 0.2;
  if ((custom.hoodType === 'vented' || custom.hoodType === 'carbonVented') && !b0.hoodVents && !b0.hoodLouvre && !b0.hoodVent) b.hoodVents = hoodT;
  if (custom.hoodType === 'scoop' && !b0.scoop && front) b.scoop = Math.min(0.17, hoodT - 0.02);
  if (custom.roofMod === 'spoiler') b.roofSpoiler = true;
  if (custom.roofMod === 'scoop') b.roofScoop = true;
  return b;
}

export function carParts(def, custom = {}, hi = true) {
  const b = bodyWithParts(def.body, custom);
  const ctx = bodyContext(b, custom, hi);
  const S = { paint: [], glass: [], trim: [], decal: [], mesh: [], amber: [], amberL: [], amberR: [], chrome: [], head: [], drl: [], lens: [], tail: [], rev: [], plate: [], interior: [], kit: [], body2: [], cabinTop: [], cover: [], head2: [], tips: [] };
  const lamps = { head: [], tail: [], ind: [], rev: [], exhaust: [] };
  // debug builds (audit harness) tag every part with the source line that created it
  if (globalThis.__CAR_DEBUG) for (const arr of Object.values(S)) { const push = arr.push; arr.push = function (...gs) { const src = (new Error().stack.split('\n')[2] || '').trim(); for (const g of gs) if (g && g.userData) g.userData.src = src; return push.apply(this, gs); }; }
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
      if (b.roofSpoiler) {
        // rear wiper: pivot low on the centre of the tailgate glass, blade parked toward the left
        const zp = lerp(ctx.z(c.t2), ctx.z(c.t3), 0.78);
        const a = onGlass(0, zp), e = onGlass(-ctx.hw(c.t3) * 0.55, lerp(ctx.z(c.t2), ctx.z(c.t3), 0.5));
        if (a && e) {
          const pa = a.p.clone().addScaledVector(a.n, 0.014), pe = e.p.clone().addScaledVector(e.n, 0.014);
          const len = pa.distanceTo(pe);
          const w = merge([new THREE.BoxGeometry(len, 0.011, 0.016), new THREE.BoxGeometry(len * 0.9, 0.008, 0.01).translate(len * 0.02, 0.008, 0.006)]);
          const dir = pe.clone().sub(pa).normalize();
          const nAvg = a.n.clone().add(e.n).normalize();
          const zAx = new THREE.Vector3().crossVectors(dir, nAvg).normalize();
          const yAx = new THREE.Vector3().crossVectors(zAx, dir).normalize();
          w.applyMatrix4(new THREE.Matrix4().makeBasis(dir, yAx, zAx));
          const mid = pa.clone().lerp(pe, 0.5);
          S.trim.push(w.translate(mid.x, mid.y, mid.z));
          S.trim.push(new THREE.CylinderGeometry(0.018, 0.02, 0.02, 12).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), a.n)).translate(pa.x, pa.y, pa.z));
        }
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
  if (headStyle === 'quad4') {
    // teardrop housing, taller at the outer corner, with the four-point LED signature inside
    const hw = ls.headW ?? 0.22, hh = ls.headH ?? 0.12;
    const q = [[hx - hw / 2, hy + hh * 0.3], [hx + hw / 2, hy + hh / 2], [hx + hw / 2 - 0.01, hy - hh / 2], [hx - hw / 2 + 0.02, hy - hh * 0.32]];
    const bez = [[q[0][0] - 0.009, q[0][1] + 0.008], [q[1][0] + 0.008, q[1][1] + 0.008], [q[2][0] + 0.008, q[2][1] - 0.008], [q[3][0] - 0.009, q[3][1] - 0.008]];
    both((sx) => {
      const m = (qq) => (sx > 0 ? qq : mirrorQuad(qq));
      S.decal.push(faceDecal(ctx, true, m(bez), 0.003, nu, nv + 1));
      S.head.push(atlasUV(faceDecal(ctx, true, m(q), 0.006, nu, nv + 1), (u, v) => [0.12 + (sx > 0 ? u : 1 - u) * 0.5, 0.15 + v * 0.7]));
      if (hi) {
        S.cover.push(faceDecal(ctx, true, m(bez), 0.014, nu * 2, nv * 2));
        for (const [fu, fv] of [[0.33, 0.36], [0.67, 0.4], [0.33, 0.68], [0.67, 0.72]]) {
          const px = sx * (hx - hw / 2 + hw * fu), py = hy - hh / 2 + hh * fv;
          S.drl.push(faceDisc(ctx, true, px, py, 0.019, 0.009, 16));
          S.lens.push(faceDisc(ctx, true, px, py, 0.009, 0.011, 12));
        }
      }
      lamps.head.push([sx * hx, hy - low, (surfZ(ctx, sx * hx, hy, true) ?? ctx.z(0.04)) - 0.03]);
    });
  } else if (headStyle === 'round' || headStyle === 'quad') {
    const offs = headStyle === 'quad' ? [-0.085, 0.085] : [0];
    const r = headStyle === 'quad' ? 0.058 : 0.085;
    both((sx) => {
      for (const dx of offs) {
        const x = sx * (hx + dx);
        S.decal.push(faceDisc(ctx, true, x, hy, r + 0.018, 0.003));
        S.head.push(atlasUV(faceDisc(ctx, true, x, hy, r, 0.006), (u, v) => [0.75 + u * 0.25, v]));
        if (hi) S.cover.push(faceDisc(ctx, true, x, hy, r + 0.014, 0.014, 28));
        if (hi) {
          // LED ring around a projector lens, as on modern round-lamp sports cars
          S.drl.push(faceDisc(ctx, true, x, hy, r * 0.88, 0.008, 24));
          S.head.push(atlasUV(faceDisc(ctx, true, x, hy, r * 0.83, 0.009, 24), (u, v) => [0.75 + u * 0.25, v]));
          S.chrome.push(faceDisc(ctx, true, x, hy, r * 0.42, 0.01, 16));
          S.lens.push(faceDisc(ctx, true, x, hy, r * 0.32, 0.011, 16));
        }
        lamps.head.push([x, hy - low, (surfZ(ctx, x, hy, true) ?? ctx.z(0.04)) - 0.02]);
      }
    });
  } else {
    const thin = headStyle === 'wide' || headStyle === 'arrow';
    const hw = ls.headW ?? (thin ? 0.36 : headStyle === 'popup' ? 0.3 : 0.4);
    let hh = ls.headH ?? (thin ? 0.06 : headStyle === 'popup' ? 0.05 : 0.1);
    // on a shallow nose a front-projected lamp would smear back along the bonnet: keep its true length real
    {
      const maxLen = thin ? 0.13 : 0.17;
      for (let k = 0; k < 2; k++) {
        const zt = surfZ(ctx, hx, hy + hh / 2, true), zb = surfZ(ctx, hx, hy - hh / 2, true);
        if (zt === null || zb === null) break;
        const len = Math.hypot(zt - zb, hh);
        if (len > maxLen) hh *= maxLen / len;
      }
    }
    const slant = headStyle === 'arrow' ? 0.07 : headStyle === 'wide' ? 0.05 : 0.025;
    // right-side shape: inner end taller, outer end swept up and tapered
    const q = [[hx - hw / 2, hy + hh / 2], [hx + hw / 2, hy + hh / 2 + slant * 0.4], [hx + hw / 2, hy - hh / 2 + hh * 0.45 + slant * 0.4], [hx - hw / 2, hy - hh / 2]];
    const bez = [[q[0][0] - 0.018, q[0][1] + 0.016], [q[1][0] + 0.014, q[1][1] + 0.016], [q[2][0] + 0.014, q[2][1] - 0.016], [q[3][0] - 0.018, q[3][1] - 0.016]];
    both((sx) => {
      const L1 = sx > 0 ? q : mirrorQuad(q), B1 = sx > 0 ? bez : mirrorQuad(bez);
      S.decal.push(faceDecal(ctx, true, B1, 0.003, nu, nv));
      // internals texture runs inner -> outer on both sides (the mirrored quad starts at the outer end)
      if (thin) S.head2.push(atlasUV(faceDecal(ctx, true, L1, 0.006, nu, nv), (u, v) => [sx > 0 ? u : 1 - u, v]));
      else S.head.push(atlasUV(faceDecal(ctx, true, L1, 0.006, nu, nv), (u, v) => [(sx > 0 ? u : 1 - u) * 0.75, v]));
      if (hi) S.cover.push(faceDecal(ctx, true, B1, 0.014, nu * 2, nv * 2));
      if (hi) {
        // projector lenses and a DRL strip for detail
        for (const f of [0.28, 0.6]) {
          const px = sx * (hx - hw / 2 + hw * f);
          S.chrome.push(faceDisc(ctx, true, px, hy + 0.005, hh * 0.3, 0.009, 14));
          S.lens.push(faceDisc(ctx, true, px, hy + 0.005, hh * 0.22, 0.011, 14));
        }
        const drl = [[hx - hw / 2 + 0.02, hy - hh / 2 + 0.022], [hx + hw / 2 - 0.02, hy - hh / 2 + hh * 0.45 + slant * 0.4 + 0.012], [hx + hw / 2 - 0.02, hy - hh / 2 + hh * 0.45 + slant * 0.4 + 0.002], [hx - hw / 2 + 0.02, hy - hh / 2 + 0.01]];
        S.drl.push(faceDecal(ctx, true, sx > 0 ? drl : mirrorQuad(drl), 0.009, 6, 1));
        if (headStyle === 'arrow') {
          // Y signature: an upper stroke along the top edge that forks down to meet the lower one
          const yTop = (f) => hy + hh / 2 + slant * 0.4 * f - 0.012;
          const up = [[hx - hw / 2 + 0.05, yTop(0.12)], [hx + hw / 2 - 0.03, yTop(0.95)], [hx + hw / 2 - 0.03, yTop(0.95) - 0.012], [hx - hw / 2 + 0.05, yTop(0.12) - 0.012]];
          const xm = hx - hw * 0.02;
          const fork = [[xm - 0.008, yTop(0.45) - 0.004], [xm + 0.008, yTop(0.45) - 0.004], [xm + 0.046, hy - hh / 2 + 0.016], [xm + 0.03, hy - hh / 2 + 0.016]];
          S.drl.push(faceDecal(ctx, true, sx > 0 ? up : mirrorQuad(up), 0.0095, 6, 1));
          S.drl.push(faceDecal(ctx, true, sx > 0 ? fork : mirrorQuad(fork), 0.0095, 2, 2));
        }
      }
      lamps.head.push([sx * hx, hy - low, (surfZ(ctx, sx * hx, hy, true) ?? ctx.z(0.04)) - 0.03]);
    });
  }
  // ---- Grille / intakes
  // the bumper's real lower edge (the body loft squares up the nose, so the raw profile point is too high)
  const yLip = ctx.bot(0.004), yLipR = ctx.bot(0.996);
  const gy = ls.grilleY ?? b.grilleY ?? (yLip + 0.18);
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
    // dense enough that the patch follows the bumper's curvature instead of cutting under it between vertices
    const du = hi ? nu + 6 : nu, dv = hi ? nv + 3 : nv;
    S.decal.push(faceDecal(ctx, true, f, 0.004, du, dv));
    S.mesh.push(worldUV(faceDecal(ctx, true, q, 0.006, du, dv), scale));
  };
  const yb0 = yLip;
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
  } else if (grille === 'gt') {
    // big grand-tourer grille: wide trapezoid with horizontal chrome vanes, flanked by small corner intakes
    const gw = Math.min(W * 0.25, faceX(gy + 0.06) - 0.06), gh = 0.2;
    const q = [[-gw * 0.86, gy + gh], [gw * 0.86, gy + gh], [gw, gy + 0.03], [-gw, gy + 0.03]];
    opening(q, 0.012);
    if (hi) {
      const surround = (k) => [[-gw * 0.86 - k, gy + gh + k], [gw * 0.86 + k, gy + gh + k], [gw + k, gy + 0.03 - k], [-gw - k, gy + 0.03 - k]];
      S.chrome.push(faceDecal(ctx, true, surround(0.012), 0.0025, nu, nv));
      for (let i = 1; i < 6; i++) {
        const y = gy + 0.03 + ((gh - 0.03) * i) / 6, wy = lerp(gw, gw * 0.86, i / 6) - 0.012;
        S.chrome.push(faceDecal(ctx, true, rectQuad(-wy, wy, y - 0.0045, y + 0.0045), 0.008, 8, 1));
      }
    }
    both((sx) => {
      const xo = faceX(yb0 + 0.08), xi = xo - 0.15;
      if (xi > gw + 0.05) opening(sx > 0 ? [[xi, yb0 + 0.13], [xo, yb0 + 0.14], [xo, yb0 + 0.05], [xi + 0.02, yb0 + 0.05]] : mirrorQuad([[xi, yb0 + 0.13], [xo, yb0 + 0.14], [xo, yb0 + 0.05], [xi + 0.02, yb0 + 0.05]]), 0.01);
    });
    lowerIntake = false;
  } else if (grille === 'ev') {
    // electric: closed nose, a slim lower intake for the battery coolers and vertical air curtains at the corners
    const xo = Math.min(W * 0.26, faceX(yb0 + 0.06));
    opening([[-xo, yb0 + 0.1], [xo, yb0 + 0.1], [xo * 0.94, yb0 + 0.04], [-xo * 0.94, yb0 + 0.04]], 0.01);
    both((sx) => {
      const xc = faceX(yb0 + 0.16) - 0.02;
      const q = [[xc - 0.05, yb0 + 0.25], [xc, yb0 + 0.25], [xc + 0.01, yb0 + 0.08], [xc - 0.035, yb0 + 0.08]];
      opening(sx > 0 ? q : mirrorQuad(q), 0.008);
    });
    lowerIntake = false;
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
    if (hi) S.cover.push(faceDecal(ctx, false, rectQuad(-bx, bx, ty - th / 2 - 0.015, ty + th / 2 + 0.015), 0.013, 24, 3));
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
      if (hi) S.cover.push(faceDecal(ctx, false, sx > 0 ? rectQuad(x0 - 0.012, x1 + 0.01, ty - 0.185, ty + 0.185) : mirrorQuad(rectQuad(x0 - 0.012, x1 + 0.01, ty - 0.185, ty + 0.185)), 0.013, 4, 6));
      lamps.tail.push([sx * (x0 + x1) / 2, ty - low, (surfZ(ctx, sx * (x0 + x1) / 2, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  } else if (tailStyle === 'band') {
    // 80s full-width band: black garnish across the tail, wide red lamps at the ends, amber and reversing
    // sections inboard of them
    const th = ls.tailH ?? 0.1;
    const bx = Math.min(W * 0.46, rearMaxX(ty) + 0.004);
    S.decal.push(faceDecal(ctx, false, rectQuad(-bx, bx, ty - th / 2 - 0.012, ty + th / 2 + 0.012), 0.003, hi ? 16 : 6, 2));
    both((sx) => {
      const m = (q) => (sx > 0 ? q : mirrorQuad(q));
      const xo = bx - 0.01, xr = xo - 0.3;
      S.tail.push(faceDecal(ctx, false, m(rectQuad(xr, xo, ty - th / 2, ty + th / 2)), 0.006, 6, 2));
      if (hi) {
        S[sx < 0 ? 'amberL' : 'amberR'].push(faceDecal(ctx, false, m(rectQuad(xr - 0.11, xr - 0.008, ty - th / 2, ty + th / 2)), 0.006, 3, 2));
        S.cover.push(faceDecal(ctx, false, m(rectQuad(xr - 0.12, xo + 0.008, ty - th / 2 - 0.008, ty + th / 2 + 0.008)), 0.013, 8, 2));
        for (let k = 1; k < 4; k++) S.decal.push(faceDecal(ctx, false, m(rectQuad(xr, xo, ty - th / 2 + (th * k) / 4 - 0.002, ty - th / 2 + (th * k) / 4 + 0.002)), 0.008, 6, 1));
      }
      lamps.tail.push([sx * (xr + xo) / 2, ty - low, (surfZ(ctx, sx * (xr + xo) / 2, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  } else if (tailStyle === 'yTail') {
    // Y-shaped light signature in a black hexagonal pocket (Italian V12 supercar)
    const cx = Math.min(tx, rearMaxX(ty) - 0.17);
    both((sx) => {
      const m = (q) => (sx > 0 ? q : mirrorQuad(q));
      const pocket = [[cx - 0.2, ty + 0.06], [cx + 0.16, ty + 0.075], [cx + 0.2, ty - 0.055], [cx - 0.16, ty - 0.07]];
      S.decal.push(faceDecal(ctx, false, m(pocket), 0.003, 8, 3));
      const arm = (x0, y0, x1, y1, w = 0.02) => [[x0, y0 + w / 2], [x1, y1 + w / 2], [x1, y1 - w / 2], [x0, y0 - w / 2]];
      for (const q of [arm(cx - 0.17, ty + 0.035, cx, ty), arm(cx - 0.15, ty - 0.045, cx, ty), arm(cx, ty, cx + 0.17, ty + 0.01)]) S.tail.push(faceDecal(ctx, false, m(q), 0.007, 6, 1));
      if (hi) S.cover.push(faceDecal(ctx, false, m(pocket), 0.013, 10, 4));
      lamps.tail.push([sx * cx, ty - low, (surfZ(ctx, sx * cx, ty, false) ?? ctx.z(0.97)) + 0.03]);
    });
  } else if (tailStyle === 'blade') {
    // slim blade lamps that sweep across the tail and turn down at the outer corner
    const th = ls.tailH ?? 0.05;
    const xo = rearMaxX(ty) - 0.01, xi = Math.max(0.16, xo - 0.5);
    both((sx) => {
      const m = (q) => (sx > 0 ? q : mirrorQuad(q));
      const top = [[xi, ty + th * 0.2], [xo, ty + th / 2], [xo - 0.01, ty - th / 2], [xi + 0.02, ty - th * 0.2]];
      const drop = [[xo - 0.065, ty - th / 2 + 0.008], [xo - 0.012, ty - th / 2 + 0.008], [xo - 0.024, ty - th / 2 - 0.09], [xo - 0.052, ty - th / 2 - 0.075]];
      S.decal.push(faceDecal(ctx, false, m([[xi - 0.012, ty + th * 0.2 + 0.012], [xo + 0.008, ty + th / 2 + 0.012], [xo - 0.004, ty - th / 2 - 0.012], [xi + 0.01, ty - th * 0.2 - 0.012]]), 0.003, nu, nv));
      S.tail.push(faceDecal(ctx, false, m(top), 0.006, nu, nv));
      S.tail.push(faceDecal(ctx, false, m(drop), 0.006, 2, 3));
      if (hi) S.cover.push(faceDecal(ctx, false, m([[xi - 0.012, ty + th * 0.2 + 0.012], [xo + 0.008, ty + th / 2 + 0.012], [xo - 0.004, ty - th / 2 - 0.012], [xi + 0.01, ty - th * 0.2 - 0.012]]), 0.013, nu * 2, nv));
      lamps.tail.push([sx * (xi + xo) / 2, ty - low, (surfZ(ctx, sx * (xi + xo) / 2, ty, false) ?? ctx.z(0.97)) + 0.03]);
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
      if (hi) S.cover.push(faceDecal(ctx, false, m(bz), 0.013, nu * 2, nv * 2));
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
  const ybr = yLipR;
  // centre-exit exhausts sit under the plate, so the plate moves up to clear them
  const py = ls.plateY ?? (ybr + (b.exhaust === 'center' || b.exhaust === 'triple' ? 0.215 : 0.16));
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
    // the badge must land on the nose itself: on a low nose the first try can skim onto the bonnet, so step down
    const bodyMesh = new THREE.Mesh(bp, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    let hit = null;
    for (let k = 0, yb = by; k < 6 && !hit; k++, yb -= 0.03) {
      const h = new THREE.Raycaster(new THREE.Vector3(0, yb - low, -L), new THREE.Vector3(0, 0, 1), 0, L * 2).intersectObject(bodyMesh)[0];
      if (h && h.face && h.point.z < ctx.z(0.06) && Math.abs(h.face.normal.y) < 0.75) hit = h;
    }
    if (hit && hit.face) {
      const n = hit.face.normal.clone();
      if (n.z > 0) n.negate();
      const e = new THREE.CircleGeometry(1, 20).scale(0.05, 0.03, 1);
      e.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), n));
      S.chrome.push(e.translate(hit.point.x + n.x * 0.006, hit.point.y + n.y * 0.006, hit.point.z + n.z * 0.006));
    }
    // rear badge above a full-width light bar, or below it when the bar already sits at the top of the tail
    let rbY = ty + (tailStyle === 'bar' ? 0.07 : 0.0);
    if (rbY + 0.02 > ctx.top(0.985) - low * 0) rbY = ty - 0.065;
    S.chrome.push(faceDecal(ctx, false, rectQuad(-0.06, 0.06, rbY - 0.012, rbY + 0.012), 0.009, 2, 1));
    // amber side markers at the front corners, red at the rear
    for (const t of [0.045, 0.955]) {
      const y0 = (t < 0.5 ? hy : ty) - 0.07;
      both((sx) => { if (ctx.halfWAt(t, y0 + 0.012) > 0.3) (t < 0.5 ? (sx < 0 ? S.amberL : S.amberR) : S.tail).push(sideStrip(ctx, t, y0, y0 + 0.024, sx, 0.075, 0.004, 2)); });
    }
    if (b.cabin && b.cabin.t3 < 0.995 && !b.roofScoop) {
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
  const tipStyle = custom.tips || 'stock';
  const big = (custom.exhaust === 'straight' || custom.exhaust === 'sport' ? 1.25 : 1) * (tipStyle === 'polished' ? 1.2 : tipStyle === 'dualwall' ? 1.12 : 1);
  // 'none' = electric (no tips, no silencer); 'oval' = big flattened oval tips in the diffuser
  const exX = ex === 'none' ? [] : ex === 'triple' ? [-0.11, 0, 0.11] : ex === 'single' ? [-W * 0.3] : ex === 'quad' ? [-W * 0.32, -W * 0.24, W * 0.24, W * 0.32] : ex === 'center' ? [-0.07, 0.07] : ex === 'oval' ? [-W * 0.31, W * 0.31] : [-W * 0.3, W * 0.3];
  const er = 0.045 * big;
  const ovalX = ex === 'oval' ? 1.75 : 1;
  for (const x of exX) {
    // tip pokes ~6 cm out of the bumper, only a short stub sits inside the body
    const z = Math.max(surfZ(ctx, x, ey + er, false) ?? ctx.z(0.97), surfZ(ctx, x, ey - er, false) ?? ctx.z(0.97)) + 0.06;
    // exhaust tips get their own material (burnt titanium on straight pipes) so other chrome keeps its colour
    S.tips.push(new THREE.CylinderGeometry(er, er * 0.94, 0.12, 16, 1, true).rotateX(Math.PI / 2).scale(ovalX, 1, 1).translate(x, ey - low, z - 0.06));
    S.tips.push(new THREE.TorusGeometry(er * 0.97, 0.006, 6, 16).scale(ovalX, 1, 1).translate(x, ey - low, z));
    if (tipStyle === 'dualwall') {
      // inner wall of a double-wall tip, set back slightly
      S.tips.push(new THREE.CylinderGeometry(er * 0.74, er * 0.74, 0.06, 16, 1, true).rotateX(Math.PI / 2).scale(ovalX, 1, 1).translate(x, ey - low, z - 0.03));
      S.tips.push(new THREE.TorusGeometry(er * 0.75, 0.005, 6, 16).scale(ovalX, 1, 1).translate(x, ey - low, z - 0.003));
    }
    S.trim.push(new THREE.CircleGeometry(er * 0.9, 14).scale(ovalX, 1, 1).translate(x, ey - low, z - 0.035));
    lamps.exhaust.push([x, ey - low, z + 0.02]);
  }

  // under the car: silencer box hung from the floor pan and pipes from it to each tip
  if (hi && exX.length) {
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
    const aero = custom.mirrors === 'aero';
    both((sx) => {
      // rounded-box housing: squash a sphere toward a box, taper the inner end
      const hous = new THREE.SphereGeometry(1, hi ? 16 : 8, hi ? 12 : 6);
      const hp = hous.attributes.position;
      for (let i = 0; i < hp.count; i++) {
        let x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
        x = Math.sign(x) * Math.pow(Math.abs(x), 0.55); y = Math.sign(y) * Math.pow(Math.abs(y), 0.6); z = Math.sign(z) * Math.pow(Math.abs(z), 0.7);
        const taper = 1 - 0.22 * (1 - x * sx) / 2;
        hp.setXYZ(i, x * mp.rx, y * mp.ry * taper, z < 0 ? z * mp.rz * (aero ? 1.5 : 1.15) : z * mp.rz * 0.7);
      }
      hous.computeVertexNormals();
      hous.translate(sx * mp.x, mp.y, mp.z);
      S.paint.push(hous);
      const stalkLen = mp.x - mp.rx * 0.6 - mp.xIn;
      if (aero) {
        // race mirror: two slim blades instead of a stalk
        for (const dz of [-0.022, 0.022]) S.trim.push(new THREE.BoxGeometry(stalkLen + 0.03, 0.008, 0.012).rotateZ(sx * 0.18).translate(sx * (mp.xIn + stalkLen / 2), mp.y - 0.03, mp.z + dz));
      } else S.trim.push(new THREE.BoxGeometry(stalkLen, 0.026, 0.05).translate(sx * (mp.xIn + stalkLen / 2), mp.y - 0.025, mp.z));
      S.glass.push(new THREE.CircleGeometry(1, hi ? 20 : 10).scale(mp.rx * 0.86, mp.ry * 0.8, 1).translate(sx * mp.x, mp.y, mp.z + mp.rz * 0.7 + 0.002));
    });
    if (hi) {
      // window line: chrome on grand tourers, black elsewhere
      both((sx) => (b.dlo === 'chrome' ? S.chrome : S.trim).push(beltStrip(ctx, c.t0 + 0.015, Math.min(c.t3, c.quarter ?? c.t3) - 0.01, sx)));
      // door shut lines & handles
      const tFront = Math.max(c.t0 + 0.005, ctx.tFA + ctx.archR / L + 0.02);
      const doors = c.tB ? ((b.doors ?? 4) === 2 ? [c.tB] : [c.tB, Math.min(c.t2 + 0.02, ctx.tRA - ctx.archR / L - 0.025)]) : [Math.min((c.quarter ?? c.t2) - 0.015, ctx.tRA - ctx.archR / L - 0.03)];
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
      S.decal.push(topLine(ctx, across(tCowl, Math.min(0.82, (c.wBot ?? 0.86) - 0.05))));
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
          if (ya > y0 + 0.08) S.decal.push(sideStrip(ctx, ts, y0, ya, sx, 0.006, 0.0045, 6));
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

  // ---- Model-specific bodywork details
  if (hi) {
    // bonnet duct (NACA-style intake down the centre line)
    if (b.hoodVent) {
      const t = b.hoodVent;
      S.decal.push(topPatch(ctx, [[t - 0.045, -0.07], [t - 0.045, 0.07], [t + 0.035, 0.13], [t + 0.035, -0.13]], 0.004, 4, 4));
      S.mesh.push(worldUV(topPatch(ctx, [[t - 0.03, -0.055], [t - 0.03, 0.055], [t + 0.027, 0.105], [t + 0.027, -0.105]], 0.007, 4, 3), 9));
    }
    // twin louvred heat extractors either side of the bonnet bulge
    if (b.hoodVents) {
      const t = b.hoodVents;
      both((sx) => louvrePatch(ctx, S, t - 0.035, t + 0.035, sx * 0.2, sx * 0.42, 6));
    }
    // louvred bonnet vent on the centre line (heat extractor)
    if (b.hoodLouvre) {
      const t = b.hoodLouvre, xw = Math.min(0.24, ctx.hw(t) * 0.28);
      louvrePatch(ctx, S, t - 0.045, t + 0.045, -xw, xw, 7);
    }
    // roof-mounted engine air scoop (hypercar)
    if (b.roofScoop && b.cabin) {
      // engine air intake on the roof centre line, opening forward above the driver's head
      const c = b.cabin;
      const roofAt = (t) => c.roof + (c.roofArc ?? 0.02) * Math.sin(clamp((t - c.t1) / (c.t2 - c.t1), 0, 1) * Math.PI) + (c.crown ?? 0.03) - low;
      const tF = lerp(c.t1, c.t2, 0.45), tR = c.t2 - 0.005;
      scoopGeo(S, ctx.z(tF), ctx.z(tR), roofAt(tF), roofAt(tR), 0.2, 0.075);
    }
    // engine-cover louvres behind the cabin
    if (b.louvres) {
      const t = b.louvres, xw = Math.min(0.38, ctx.hw(t) * 0.45), hl = b.louvreHalf ?? 0.05;
      louvrePatch(ctx, S, t - hl, t + hl, -xw, xw, Math.max(5, Math.round(hl * 160)));
    }
    // side gills behind the front wheels with a chrome strake
    if (b.gills) {
      const t0 = ctx.tFA + (ctx.archR + 0.05) / L, t1 = t0 + 0.24 / L;
      const y0 = ctx.wr + 0.13, y1 = ctx.wr + 0.27;
      both((sx) => {
        S.decal.push(sidePatch(ctx, [[t0, y1], [t1, y1 - 0.025], [t1, y0 + 0.02], [t0, y0]], sx, 0.004, 6, 3));
        S.chrome.push(sidePatch(ctx, [[t0 - 0.01 / L, (y0 + y1) / 2 + 0.008], [t1 + 0.05 / L, (y0 + y1) / 2 - 0.004], [t1 + 0.05 / L, (y0 + y1) / 2 - 0.016], [t0 - 0.01 / L, (y0 + y1) / 2 - 0.004]], sx, 0.008, 8, 1));
      });
    }
    // 80s black rubbing strip along the doors
    if (b.rubStrip) {
      const y = b.rubStrip, t0 = ctx.tFA + (ctx.archR + 0.03) / L, t1 = ctx.tRA - (ctx.archR + 0.03) / L;
      both((sx) => S.trim.push(sidePatch(ctx, [[t0, y + 0.016], [t1, y + 0.016], [t1, y - 0.016], [t0, y - 0.016]], sx, 0.008, 16, 2)));
    }
    // chrome strip linking the tail lamps across the tailgate
    if (b.tailStrip) {
      const hx2 = Math.max(0.2, rearMaxX(ty) - (ls.tailW ?? 0.42) + 0.03);
      S.chrome.push(faceDecal(ctx, false, rectQuad(-hx2, hx2, ty - 0.008, ty + 0.008), 0.008, 16, 1));
    }
    // hatch / estate: roof spoiler over the tailgate glass and a rear wiper parked on it
    if (b.roofSpoiler && b.cabin) {
      const c = b.cabin;
      const yR = c.roof + (c.crown ?? 0.03) * 0.3 - low - 0.022;
      const sw = 2 * (ctx.hw(c.t2) * (c.wBot ?? 0.86) * (1 - (c.tumble ?? 0.2)) - 0.03);
      const sh = new THREE.Shape();
      sh.moveTo(0, 0); sh.lineTo(0.12, -0.03); sh.lineTo(0.125, -0.045); sh.lineTo(0.0, -0.035); sh.lineTo(0, 0);
      const g = new THREE.ExtrudeGeometry(sh, { depth: sw, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
      g.translate(0, 0, -sw / 2).rotateY(-Math.PI / 2);
      S.paint.push(g.translate(0, yR + 0.008, ctx.z(c.t2) - 0.04));
    }
  }

  // ---- Body kit: each slot is its own part
  const fend = custom.fenders ?? (['wide', 'rivet', 'outlaw'].includes(custom.kit) ? custom.kit : 'stock');
  // older single-preset kits (still used by traffic definitions) map onto the slots
  const kit = custom.kit;
  const lvl = (k) => custom[k] ?? (kit === 'street' ? 'street' : kit && kit !== 'stock' ? 'sport' : 'none');
  const splitter = lvl('splitter'), skirts = lvl('skirts'), diffuser = lvl('diffuser');
  const fBumper = custom.fBumper ?? (kit && kit !== 'stock' && kit !== 'street' ? 'sport' : 'stock');
  const rBumper = custom.rBumper ?? 'stock';
  const yb = b.bottom[2]?.[1] ?? 0.18;
  const yfb = yLip;
  const TIER = { none: 0, stock: 0, street: 1, sport: 2, track: 3 };
  if (TIER[splitter]) {
    // splitter hangs under the lowest edge of the front bumper and reaches past its face
    const k = TIER[splitter];
    let yLow = Infinity;
    for (let t = 0.0; t <= 0.09; t += 0.005) yLow = Math.min(yLow, ctx.bot(t));
    const ySp = Math.max(yLow + 0.012, Math.min(yfb - 0.004, yLow + 0.06));
    const hwS = W * [0, 0.42, 0.44, 0.47][k], over = [0, 0.025, 0.04, 0.07][k];
    S.kit.push(outlinePlate(ctx, true, ySp, hwS, over, 0.32, [0, 0.018, 0.018, 0.022][k]));
    if (k === 3) {
      // endplates at the splitter's corners and a pair of support rods up to the bumper
      const zEdge = (x) => (surfZ(ctx, x, ySp + 0.02, true) ?? ctx.z(0.03)) - over;
      both((sx) => {
        const x = sx * (hwS - 0.015);
        S.kit.push(new THREE.BoxGeometry(0.012, 0.075, 0.2).translate(x, ySp - low + 0.03, zEdge(x) + 0.1));
        const xr = sx * hwS * 0.55, zr = zEdge(xr) + 0.04;
        const zTop = (surfZ(ctx, xr, ySp + 0.12, true) ?? zr) + 0.01;
        const a = new THREE.Vector3(xr, ySp - low + 0.012, zr), c = new THREE.Vector3(xr, ySp - low + 0.12, zTop);
        const rod = new THREE.CylinderGeometry(0.005, 0.005, a.distanceTo(c), 6);
        rod.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), c.clone().sub(a).normalize()));
        S.chrome.push(rod.translate((a.x + c.x) / 2, (a.y + c.y) / 2, (a.z + c.z) / 2));
      });
    }
  }
  if (TIER[skirts]) {
    const k = TIER[skirts];
    const skirtLen = ctx.zr - ctx.zf - ctx.archR * 2 - 0.08;
    const t = (ctx.tFA + ctx.tRA) / 2;
    const xs = ctx.halfWAt(t, yb + 0.06);
    both((sx) => {
      const w = [0, 0.05, 0.06, 0.075][k], hgt = [0, 0.07, 0.085, 0.09][k];
      S.kit.push(new THREE.BoxGeometry(w, hgt, skirtLen).translate(sx * (Math.max(xs, ctx.hw(t) * 0.9) - 0.005 + (w - 0.05) / 2), yb + 0.02 - low - (hgt - 0.07) / 2, (ctx.zf + ctx.zr) / 2));
      if (k === 3 && hi) {
        // small winglets ahead of the rear wheels
        const zW = ctx.zr - ctx.archR - 0.1;
        S.kit.push(new THREE.BoxGeometry(0.11, 0.008, 0.16).translate(sx * (Math.max(xs, ctx.hw(t) * 0.9) + 0.06), yb + 0.05 - low, zW));
      }
    });
  }
  if (TIER[diffuser]) {
    const k = TIER[diffuser];
    S.kit.push(outlinePlate(ctx, false, ybr - 0.006, W * [0, 0.3, 0.32, 0.36][k], [0, 0.02, 0.03, 0.05][k], 0.34, 0.025));
    if (hi) {
      const n = [0, 3, 5, 7][k], gap = [0, 0.2, 0.16, 0.13][k], fh = [0, 0.07, 0.09, 0.13][k];
      for (let i = 0; i < n; i++) {
        const x = (i - (n - 1) / 2) * gap;
        const zR = (surfZ(ctx, x, ybr + 0.03, false) ?? ctx.z(0.97));
        S.kit.push(new THREE.BoxGeometry(0.012, fh, 0.26 + (k === 3 ? 0.06 : 0)).translate(x, ybr - 0.005 - fh / 2 - low, zR - 0.1 + (k === 3 ? 0.03 : 0)));
      }
    }
  }
  if (fBumper !== 'stock') {
    const track = fBumper === 'track';
    // canards on the bumper corners (two pairs on the track bumper)
    for (const dy of track ? [0.11, 0.045] : [0.11]) both((sx) => S.kit.push(placeBox(ctx, true, sx * (W / 2 - 0.13), yfb + dy, 0.16, 0.012, 0.12, 0.035, sx * 0.25)));
    if (hi) {
      // brake-cooling intakes at the bumper corners
      both((sx) => {
        const x0 = sx * (W / 2 - 0.3), x1 = sx * (W / 2 - (track ? 0.12 : 0.16));
        const q = rectQuad(Math.min(x0, x1), Math.max(x0, x1), yfb + 0.03, yfb + (track ? 0.12 : 0.1));
        S.mesh.push(worldUV(faceDecal(ctx, true, sx > 0 ? q : mirrorQuad(q), 0.006, 4, 2), 9));
      });
      if (track) {
        // red tow strap on the driver's side of the bumper
        const x = -W * 0.22, y = yfb + 0.06;
        const z = (surfZ(ctx, x, y, true) ?? ctx.z(0.02)) - 0.01;
        S.tail.push(new THREE.BoxGeometry(0.03, 0.09, 0.012).translate(x, y - low, z));
      }
    }
  }
  if (rBumper !== 'stock') {
    // black lower valance across the rear
    S.kit.push(outlinePlate(ctx, false, ybr + 0.02, W * 0.4, 0.012, 0.18, 0.05));
    if (rBumper === 'track' && hi) {
      // centre rain light and a tow strap
      const zr = (surfZ(ctx, 0, ybr + 0.06, false) ?? ctx.z(0.98)) + 0.012;
      S.kit.push(new THREE.BoxGeometry(0.12, 0.05, 0.03).translate(0, ybr + 0.06 - low, zr));
      S.tail.push(new THREE.BoxGeometry(0.1, 0.03, 0.004).translate(0, ybr + 0.06 - low, zr + 0.016));
      const xs = W * 0.24, zs = (surfZ(ctx, xs, ybr + 0.05, false) ?? ctx.z(0.98)) + 0.008;
      S.tail.push(new THREE.BoxGeometry(0.03, 0.08, 0.012).translate(xs, ybr + 0.05 - low, zs));
    }
  }
  if (ctx.flare) overFenders(S, ctx, hi);
  if (fend === 'wide') {
    for (const za of [ctx.zf, ctx.zr]) {
      both((sx) => {
        const tq = (za + L / 2) / L;
        const tor = new THREE.TorusGeometry(ctx.archR + 0.02, 0.05, 6, 16, Math.PI).rotateY(Math.PI / 2);
        tor.translate(sx * (ctx.hw(tq) - 0.01), ctx.wr - low, za);
        S.kit.push(tor);
      });
    }
  }
  // Hood scoop
  if (b.scoop) {
    const tF = b.scoop - 0.05, tR = b.scoop + 0.045;
    scoopGeo(S, ctx.z(tF), ctx.z(tR), bodyYAtX(ctx, tF, 0) - low, bodyYAtX(ctx, tR, 0) - low, 0.44, 0.065);
  }
  // ---- Spoilers
  let sp = custom.spoiler ?? b.spoiler ?? 'none';
  let wingT = custom.wing ?? 'none';
  // older saves and traffic definitions kept wings in the spoiler slot
  if (sp === 'wing' || sp === 'gt') { if (wingT === 'none') wingT = sp; sp = 'none'; }
  // the widebody kits come with their signature rear aero unless a spoiler or wing is fitted
  if (sp === 'none' && wingT === 'none' && fend === 'rivet') sp = 'duck';
  if (wingT === 'none' && fend === 'outlaw') wingT = 'gt';
  const tDeck = b.deckT ?? 0.94;
  const deckY0 = ctx.top(tDeck) - low - ctx.dip(tDeck, 0);
  const deckZ0 = ctx.z(tDeck);
  const spW0 = ctx.hw(tDeck) * 2 * 0.92;
  const deckZ = deckZ0, spW = spW0;
  // deck height along the car (centre line), used to seat lip and ducktail spoilers on the panel
  const deckAt = (zz) => bodyYAtX(ctx, clamp((zz + L / 2) / L, 0, 1), 0) - low;
  // fade a deck spoiler's height to nothing at its ends, so it blends into the panel instead of ending as a slab
  const taperEnds = (g, w, len, drop) => {
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), zz = p.getZ(i);
      const u = Math.min(1, Math.abs(zz - w / 2) / (w / 2));
      const k = 1 - 0.92 * Math.pow(clamp((u - 0.62) / 0.38, 0, 1), 1.6);
      const bottom = -0.015 + (drop * clamp(x, 0, len)) / len;
      p.setY(i, bottom + (y - bottom) * k);
    }
    g.computeVertexNormals();
    return g;
  };
  // usable width of the deck's top surface (where it is still within 3 cm of the centre-line height)
  const tailW = (zz) => {
    const t = clamp((zz + L / 2) / L, 0, 1), yc = bodyYAtX(ctx, t, 0);
    let x = 0.05;
    while (x < ctx.hw(t) && bodyYAtX(ctx, t, x) > yc - 0.03) x += 0.01;
    return x * 2;
  };
  if (sp === 'lip') {
    // a raised lip moulded onto the trailing edge of the boot lid
    const z0 = deckZ - 0.04;
    let z1 = Math.min(deckZ + 0.1, L / 2 - 0.05);
    // stop before the tail falls away to the lamps, so the lip never hangs over the light bar
    while (z1 > deckZ && deckAt(z1) < ty + 0.07) z1 -= 0.01;
    const y0 = deckAt(z0), y1 = deckAt(z1), w = Math.min(spW, tailW(z0), tailW(z1));
    const sh = new THREE.Shape();
    sh.moveTo(0, -0.012); sh.lineTo(z1 - z0, y1 - y0 - 0.012); sh.lineTo(z1 - z0, y1 - y0 + 0.032); sh.quadraticCurveTo((z1 - z0) * 0.45, 0.02, 0, 0.004); sh.lineTo(0, -0.012);
    const g = taperEnds(new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2, curveSegments: 6, steps: 16 }), w, z1 - z0, y1 - y0);
    g.translate(0, 0, -w / 2).rotateY(-Math.PI / 2);
    S.paint.push(g.translate(0, y0, z0));
  } else if (sp === 'duck') {
    // ducktail: the engine / boot lid sweeps up into a lip, sitting on the deck and inside the tail's width
    const z0 = deckZ - 0.13;
    let z1 = Math.min(deckZ + 0.1, L / 2 - 0.04);
    while (z1 > deckZ - 0.05 && deckAt(z1) < ty + 0.07) z1 -= 0.01;
    const y0 = deckAt(z0), y1 = deckAt(z1), w = Math.min(spW, tailW(z0), tailW(z1), W * 0.78);
    const sh = new THREE.Shape();
    sh.moveTo(0, -0.015); sh.lineTo(z1 - z0, y1 - y0 - 0.015); sh.lineTo(z1 - z0, y1 - y0 + 0.075); sh.quadraticCurveTo((z1 - z0) * 0.55, (y1 - y0) * 0.5 + 0.03, 0, 0.006); sh.lineTo(0, -0.015);
    const g = taperEnds(new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2, curveSegments: 8, steps: 20 }), w, z1 - z0, y1 - y0);
    g.translate(0, 0, -w / 2).rotateY(-Math.PI / 2);
    S.paint.push(g.translate(0, y0, z0));
  }
  if (wingT === 'wing' || wingT === 'gt' || wingT === 'swan') {
    const race = wingT !== 'wing';
    let hgt = wingT === 'gt' ? 0.38 : wingT === 'swan' ? 0.4 : 0.24;
    const chord = race ? 0.34 : 0.26;
    let deckY = deckY0, deckZ = deckZ0, spW = spW0;
    if (b.wingOnRoof && b.cabin) {
      // estates carry a wing at the trailing edge of the roof, on short stands, never across the tailgate glass
      const c = b.cabin;
      deckY = c.roof + (c.crown ?? 0.03) * 0.3 - low - 0.01;
      deckZ = ctx.z(c.t2) - 0.06;
      spW = 2 * (ctx.hw(c.t2) * (c.wBot ?? 0.86) * (1 - (c.tumble ?? 0.2)) - 0.02);
      hgt = race ? 0.13 : 0.09;
    }
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(chord * 0.2, 0.045, chord * 0.7, 0.03, chord, 0.0);
    shape.bezierCurveTo(chord * 0.7, 0.008, chord * 0.2, -0.012, 0, 0);
    const g = new THREE.ExtrudeGeometry(shape, { depth: spW * 1.02, bevelEnabled: false, curveSegments: 8 });
    g.translate(0, 0, -spW * 0.51).rotateY(-Math.PI / 2).rotateX(0.12);
    g.translate(0, deckY + hgt, deckZ - chord * 0.3);
    (race ? S.kit : S.paint).push(g);
    both((sx) => {
      if (wingT === 'swan' && !b.wingOnRoof) {
        // swan-neck mounts rise behind the wing and hook over onto its top surface, leaving the underside clean
        const x = sx * spW * 0.3;
        const yTop = deckY + hgt + 0.035, zMid = deckZ - chord * 0.3 + chord * 0.45;
        const pts = [
          new THREE.Vector3(x, deckY - 0.02, deckZ + 0.02),
          new THREE.Vector3(x, deckY + hgt * 0.55, deckZ + 0.05),
          new THREE.Vector3(x, yTop + 0.07, zMid + 0.04),
          new THREE.Vector3(x, yTop + 0.055, zMid - 0.06),
          new THREE.Vector3(x, yTop - 0.004, zMid - 0.08),
        ];
        S.kit.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.011, 8, false).scale(0.7, 1, 1));
      } else {
        // uprights start just under the deck surface so they never float
        S.kit.push(new THREE.BoxGeometry(0.02, hgt + 0.04, 0.1).translate(sx * spW * 0.33, deckY + hgt / 2 - 0.02, deckZ));
      }
      const eh = race ? 0.15 : 0.1;
      const ep = new THREE.Shape();
      ep.moveTo(-0.04 * chord, -0.035); ep.lineTo(chord * 1.06, -0.05); ep.lineTo(chord * 1.06, eh);
      ep.quadraticCurveTo(chord * 0.55, eh * 0.95, chord * 0.12, eh * 0.45); ep.lineTo(-0.04 * chord, 0.02); ep.lineTo(-0.04 * chord, -0.035);
      const eg = new THREE.ExtrudeGeometry(ep, { depth: 0.01, bevelEnabled: false, curveSegments: 6 }).rotateY(-Math.PI / 2);
      S.kit.push(eg.translate(sx * spW * 0.51 + 0.005, deckY + hgt, deckZ - chord * 0.3));
    });
  }
  if (b.roofRails) {
    // rails stand on the roof skin on short feet, just inboard of the roof's edge radius
    const c = b.cabin, tm = (c.t1 + c.t2) / 2;
    const wt = ctx.hw(tm) * (c.wBot ?? 0.86) * (1 - (c.tumble ?? 0.2));
    const xr = (wt - 0.075) * 0.86;
    const yRoof = c.roof + (c.roofArc ?? 0.02) * 0.9 + (c.crown ?? 0.03) * (1 - 0.86 * 0.86) - low;
    const len = Math.min(L * 0.38, (ctx.z(c.t2) - ctx.z(c.t1)) * 0.82);
    // low-profile rails: a slim bar on three short feet, ending well short of the roof's trailing edge
    both((sx) => {
      S.trim.push(new RoundedBoxGeometry(0.032, 0.022, len, 2, 0.009).translate(sx * xr, yRoof + 0.03, ctx.z(tm)));
      for (const f of [-0.5, 0, 0.5]) S.trim.push(new RoundedBoxGeometry(0.028, 0.04, 0.07, 2, 0.01).translate(sx * xr, yRoof + 0.006, ctx.z(tm) + f * (len - 0.08)));
    });
  }
  // ---- Roof accessories
  const roofMod = custom.roofMod || 'none';
  if (b.cabin && ['vortex', 'rack', 'box', 'lightbar'].includes(roofMod)) {
    const c = b.cabin;
    const wAt = (t) => ctx.hw(t) * (c.wBot ?? 0.86) * (1 - (c.tumble ?? 0.2));
    // roof skin height at t and a normalised half-width position (crowned across, arched along)
    const roofY = (t, xn = 0) => c.roof + (c.roofArc ?? 0.02) * Math.sin(clamp((t - c.t1) / (c.t2 - c.t1), 0, 1) * Math.PI) + (c.crown ?? 0.03) * (1 - xn * xn) - low;
    if (roofMod === 'vortex') {
      // shark-fin vortex generators across the roof's trailing edge
      const t = c.t2 - 0.012, wt = wAt(t);
      const fin = new THREE.Shape();
      fin.moveTo(0, 0); fin.lineTo(0.075, 0); fin.quadraticCurveTo(0.07, 0.03, 0.06, 0.04); fin.lineTo(0, 0);
      for (let i = 0; i < 7; i++) {
        const xn = (i / 6 - 0.5) * 1.3;
        const x = xn * wt;
        const fg = new THREE.ExtrudeGeometry(fin, { depth: 0.004, bevelEnabled: false }).translate(-0.04, 0, -0.002).rotateY(-Math.PI / 2);
        S.decal.push(fg.translate(x, roofY(t, xn) - 0.004, ctx.z(t) - 0.03));
      }
    } else {
      // two crossbars on low feet (on the rails where the car has them)
      const tA = lerp(c.t1, c.t2, 0.28), tB = lerp(c.t1, c.t2, 0.74);
      const bars = [];
      for (const t of [tA, tB]) {
        const wt = wAt(t), xf = (wt - 0.075) * 0.86, xn = xf / wt;
        const yFoot = b.roofRails ? roofY(t, xn) + 0.05 : roofY(t, xn) - 0.004;
        const yBar = yFoot + 0.055;
        S.trim.push(new RoundedBoxGeometry(xf * 2 + 0.08, 0.026, 0.05, 2, 0.008).translate(0, yBar, ctx.z(t)));
        both((sx) => S.trim.push(new RoundedBoxGeometry(0.05, yBar - yFoot + 0.01, 0.07, 2, 0.01).translate(sx * xf, (yBar + yFoot) / 2, ctx.z(t))));
        bars.push({ t, yBar, xf });
      }
      if (roofMod === 'box') {
        // a sleek cargo box on the bars
        const z0 = ctx.z(tA) - 0.25, z1 = ctx.z(tB) + 0.25, w = Math.min(0.85, bars[0].xf * 1.6);
        const y0 = Math.max(bars[0].yBar, bars[1].yBar) + 0.013;
        const bx = new RoundedBoxGeometry(w, 0.3, z1 - z0, 4, 0.1);
        const p = bx.attributes.position;
        for (let i = 0; i < p.count; i++) {
          // tapered nose, flatter tail
          const u = (p.getZ(i) - (-(z1 - z0) / 2)) / (z1 - z0);
          if (p.getY(i) > 0) p.setY(i, p.getY(i) * (0.55 + 0.45 * Math.min(1, u * 2.4)));
        }
        bx.computeVertexNormals();
        S.decal.push(bx.translate(0, y0 + 0.15, (z0 + z1) / 2));
        // clamps from each bar up into the box floor
        for (const bar of bars) both((sx) => {
          const h = y0 - (bar.yBar + 0.013) + 0.02;
          S.trim.push(new THREE.BoxGeometry(0.06, h, 0.07).translate(sx * w * 0.3, bar.yBar + 0.013 + h / 2 - 0.01, ctx.z(bar.t)));
        });
      }
      if (roofMod === 'lightbar') {
        // a pod of four round spotlamps over the windscreen, on the front bar
        const { yBar } = bars[0];
        const z = ctx.z(tA) - 0.06;
        S.trim.push(new RoundedBoxGeometry(0.98, 0.1, 0.09, 2, 0.02).translate(0, yBar + 0.065, z));
        for (let i = 0; i < 4; i++) {
          const x = (i - 1.5) * 0.235;
          S.chrome.push(new THREE.TorusGeometry(0.052, 0.009, 6, 20).translate(x, yBar + 0.065, z - 0.047));
          S.head.push(new THREE.CircleGeometry(0.048, 20).rotateY(Math.PI).translate(x, yBar + 0.065, z - 0.046));
          lamps.head.push([x, yBar + 0.065, z - 0.06]);
        }
      }
    }
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
  const metal = [...S.chrome, ...(S.tips || [])];
  for (const a of axles) {
    for (const sx of [-1, 1]) {
      const tr = ctx.trackAt ? ctx.trackAt(a.z) : ctx.track;
      const xs = a.dual ? [tr / 2 - 0.16, tr / 2 + 0.16] : [tr / 2];
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
  const groups = { shadow, paint: S.paint, glass: [...S.glass, ...(S.decal || []), ...(S.mesh || []), ...(S.amber || []), ...(S.amberL || []), ...(S.amberR || []), ...(S.lens || []), ...(S.rev || [])], dark, metal, head: [...S.head, ...(S.head2 || []), ...(S.drl || [])], tail: S.tail, plate: S.plate, body2: S.body2 };
  for (const [k, list] of Object.entries(groups)) if (list.length) out[k] = merge(list);
  if (!isTruck) for (const k of ['paint', 'dark', 'body2']) if (out[k]) bakeCarAO(out[k], ctx, { tyres: k === 'dark' });
  return { groups: out, lamps, dims: { L: ctx.L, W: ctx.W, H: def.body.H } };
}

/* ------------------------------------------------------------ ambient occlusion */
/**
 * Bake a per-vertex occlusion term ('aoDark' = 1 - visibility) into a merged car geometry. Real cars read as
 * heavy and grounded because the sills, the tucked-under body sides and the wheel wells see the dark underside
 * and the car's own shadow rather than the sky; without it the lower body glows like a toy.
 * Local space: ground at y = 0, x across, z along. `tyres` = darken the upper part of fixed tyres (traffic).
 */
export function bakeCarAO(geo, ctx, { tyres = false } = {}) {
  const p = geo.attributes.position, n = geo.attributes.normal;
  if (!p || !n) return geo;
  const out = new Float32Array(p.count);
  const W2 = ctx.W / 2, wr = ctx.wr, archR = ctx.archR ?? wr + 0.04;
  const axles = ctx.zf !== undefined ? [ctx.zf, ctx.zr] : [];
  const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), ny = n.getY(i);
    const ax = Math.abs(x);
    const h = sm(0.03, 0.75, y);
    let ao = 1;
    // sky visibility falls off toward the ground for anything not facing up
    ao *= 1 - (1 - Math.max(0, ny)) * (1 - h) * 0.45;
    // faces turned toward the road see the dark underside of the car
    if (ny < 0) ao *= 1 - -ny * (0.5 + 0.3 * (1 - h));
    for (const za of axles) {
      const dy = y - wr, dz = z - za, rd = Math.hypot(dy, dz);
      if (dy < -wr * 0.35 || rd > archR + 0.18 || ax > W2 + 0.06) continue;
      const inTyre = tyres && Math.abs(ax - (ctx.trackAt ? ctx.trackAt(za) : ctx.track) / 2) < ctx.tw / 2 + 0.01 && rd < wr + 0.01;
      if (inTyre) {
        // the part of the tyre tucked up under the arch
        ao *= 1 - 0.5 * sm(-0.05, wr * 0.9, dy);
      } else if (ny > 0.45) {
        // upward-facing panels (bonnet, wing tops) see the sky however close they are to the wheel
        continue;
      } else if (rd < archR - 0.004) {
        // inside the wheel well: liner and inner walls, darker the deeper in
        ao *= 0.36 - 0.18 * clamp((W2 - ax) / 0.35, 0, 1);
      } else {
        // the arch lip and the panel just around it
        ao *= 0.74 + 0.26 * sm(0, 1, (rd - archR) / 0.18);
      }
    }
    out[i] = 1 - clamp(ao, 0.05, 1);
  }
  geo.setAttribute('aoDark', new THREE.BufferAttribute(out, 1));
  return geo;
}

/** Make a lit material respect a baked 'aoDark' vertex attribute (absent attribute = no occlusion). */
export function withCarAO(mat) {
  if (mat.userData.carAO) return mat;
  mat.userData.carAO = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    prev?.call(mat, sh, r);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aoDark;\nvarying float vAoDark;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvAoDark = aoDark;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vAoDark;')
      .replace('#include <aomap_fragment>', `#include <aomap_fragment>
      {
        float cao = 1.0 - vAoDark;
        reflectedLight.indirectDiffuse *= cao;
        #if defined( USE_CLEARCOAT )
          clearcoatSpecularIndirect *= cao;
        #endif
        #if defined( STANDARD )
          float cdotNV = saturate( dot( geometryNormal, geometryViewDir ) );
          reflectedLight.indirectSpecular *= computeSpecularOcclusion( cdotNV, cao, material.roughness );
        #endif
        // deep cavities (wells, under the sills) also miss most of the direct light the shadow map can't resolve
        float cdir = mix(0.3, 1.0, smoothstep(0.0, 0.5, cao));
        reflectedLight.directDiffuse *= cdir;
        reflectedLight.directSpecular *= cdir;
      }`);
  };
  const key = mat.customProgramCacheKey?.bind(mat);
  mat.customProgramCacheKey = () => (key ? key() : '') + '|carAO';
  mat.needsUpdate = true;
  return mat;
}

export const PAINT_FINISHES = {
  gloss: { metalness: 0.05, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.025 },
  metallic: { metalness: 0.55, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.03 },
  pearl: { metalness: 0.35, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.03, iridescence: 0.7, iridescenceIOR: 1.6 },
  matte: { metalness: 0.08, roughness: 0.72, clearcoat: 0, clearcoatRoughness: 0.5 },
  chrome: { metalness: 1.0, roughness: 0.07, clearcoat: 0.6, clearcoatRoughness: 0.02 },
  satin: { metalness: 0.12, roughness: 0.48, clearcoat: 0.35, clearcoatRoughness: 0.32 },
};
export const RIM_FINISHES = {
  gloss: { metalness: 0.85, roughness: 0.28 },
  matte: { metalness: 0.35, roughness: 0.78 },
  brushed: { metalness: 1, roughness: 0.42 },
  polished: { metalness: 1, roughness: 0.12 },
  chrome: { metalness: 1, roughness: 0.04, whiten: 0.65 },
};
export const HEADLIGHT_COLORS = { stock: 0xf2f6ff, white: 0xffffff, xenon: 0xb8d0ff, yellow: 0xffcf3a, warm: 0xffdcaa };
export const SECTION_INDEX = { body: 0, contrast: 1, black: 2, carbon: 3 };
export const WRAP_INDEX = { none: 0, twin: 1, center: 2, side: 3, lower: 4, fade: 5, hood: 6 };

/** Window film: 0 % (clear) .. 95 % (limo). */
export function tintFor(pct) {
  const t = clamp((pct ?? 35) / 95, 0, 1);
  return { color: new THREE.Color(0x2a323a).lerp(new THREE.Color(0x020203), Math.pow(t, 0.7)), opacity: 0.5 + 0.47 * t };
}

// procedural twill carbon weave in object space, shared by the paint and kit shaders
const CARBON_GLSL = `
vec3 carbonWeave(vec3 P, vec3 N) {
  vec3 a = abs(N);
  vec2 uv = a.y > 0.55 ? P.xz : (a.x > a.z ? P.zy : P.xy);
  uv *= 95.0;
  vec2 c = floor(uv), f = fract(uv);
  float tw = mod(c.x + floor(c.y * 0.5), 2.0);
  float s = tw > 0.5 ? f.x : f.y;
  return vec3(0.018 + 0.03 * pow(sin(s * 3.14159), 2.0));
}`;

/**
 * Paint regions: contrast roof / bonnet / mirrors (or black, or exposed carbon) and livery stripes, decided in
 * the shader from the body-space position, so changing them never rebuilds the car. U holds the uniforms.
 */
function paintRegions(mat, U) {
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    prev?.call(mat, sh, r);
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjP;\nvarying vec3 vObjN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjP = position;\nvObjN = normal;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vObjP; varying vec3 vObjN;
uniform int uRoof; uniform int uHood; uniform int uMirror; uniform int uWrap;
uniform vec3 uColor2; uniform vec3 uWrapColor;
uniform float uBelt; uniform float uSill; uniform float uSide; uniform float uHoodZ; uniform float uHalfW;
uniform vec2 uCab; uniform vec3 uMir; uniform vec3 uMirR;
${CARBON_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 P = vObjP; vec3 N = normalize(vObjN);
  vec3 c = diffuseColor.rgb;
  float ax = abs(P.x);
  float topFace = clamp(step(0.3, N.y) + step(0.6, abs(N.z)) * step(uSill + 0.1, P.y), 0.0, 1.0);
  if (uWrap == 1) c = mix(c, uWrapColor, step(0.06, ax) * step(ax, 0.18) * topFace);
  else if (uWrap == 2) c = mix(c, uWrapColor, step(ax, 0.17) * topFace);
  else if (uWrap == 3) c = mix(c, uWrapColor, step(0.55, abs(N.x)) * step(uSide, P.y) * step(P.y, uSide + 0.065));
  else if (uWrap == 4) c = mix(c, uColor2, step(P.y, uSide));
  else if (uWrap == 5) c = mix(c, uColor2, smoothstep(uBelt - 0.05, uSill + 0.05, P.y));
  else if (uWrap == 6) c = mix(c, uWrapColor, step(0.05, ax) * step(ax, 0.13) * step(P.z, uHoodZ) * step(0.35, N.y));
  vec3 dm = (vec3(ax, P.y, P.z) - uMir) / uMirR;
  bool mirror = dot(dm, dm) < 1.0;
  bool roof = !mirror && P.y > uBelt + 0.03 && P.z > uCab.x && P.z < uCab.y;
  bool hood = !mirror && !roof && P.z < uHoodZ && N.y > 0.35 && ax < uHalfW * 0.8 && P.y > uBelt - 0.3;
  int mode = mirror ? uMirror : roof ? uRoof : hood ? uHood : 0;
  if (mode == 1) c = uColor2;
  else if (mode == 2) c = vec3(0.012);
  else if (mode == 3) c = carbonWeave(P, N);
  diffuseColor.rgb = c;
}`);
  };
  const key = mat.customProgramCacheKey?.bind(mat);
  mat.customProgramCacheKey = () => (key ? key() : '') + '|paintRegions';
  mat.needsUpdate = true;
  return mat;
}

/** Aero parts in exposed carbon (object-space weave), switchable by uniform. */
function kitCarbon(mat, U) {
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    prev?.call(mat, sh, r);
    sh.uniforms.uKitCarbon = U.uKitCarbon;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vObjP;\nvarying vec3 vObjN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjP = position;\nvObjN = normal;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vObjP; varying vec3 vObjN; uniform int uKitCarbon;\n${CARBON_GLSL}`)
      .replace('#include <color_fragment>', '#include <color_fragment>\nif (uKitCarbon == 1) diffuseColor.rgb = carbonWeave(vObjP, normalize(vObjN));');
  };
  const key = mat.customProgramCacheKey?.bind(mat);
  mat.customProgramCacheKey = () => (key ? key() : '') + '|kitCarbon';
  mat.needsUpdate = true;
  return mat;
}

/** Apply the paint-related settings of a customisation to a built car's materials (no rebuild needed). */
export function applyPaint(car, cu) {
  const U = car.paintU;
  U.uRoof.value = SECTION_INDEX[cu.roofPaint] ?? 0;
  U.uHood.value = SECTION_INDEX[cu.hoodPaint] ?? 0;
  U.uMirror.value = SECTION_INDEX[cu.mirrorPaint] ?? 0;
  U.uWrap.value = WRAP_INDEX[cu.wrap] ?? 0;
  U.uColor2.value.set(cu.color2 || '#0c0d0f');
  U.uWrapColor.value.set(cu.wrapColor || '#f2f2f0');
  const km = cu.kitColor || 'black';
  U.uKitCarbon.value = km === 'carbon' ? 1 : 0;
  car.mats.kit.color.set(km === 'body' ? cu.color : km === 'contrast' ? (cu.color2 || '#0c0d0f') : km === 'carbon' ? '#ffffff' : '#15161a');
  car.mats.kit.roughness = km === 'carbon' ? 0.25 : km === 'body' || km === 'contrast' ? 0.3 : 0.45;
}

const TINTS = [
  { color: 0x1f262c, opacity: 0.66 },
  { color: 0x11151a, opacity: 0.8 },
  { color: 0x08090b, opacity: 0.9 },
  { color: 0x020203, opacity: 0.96 },
];

/** Full-detail player/garage car: returns a structured object. */
export function buildPlayerCar(def, custom0, plateText = 'NO HESI') {
  const custom = normalizeCustom(def, custom0);
  const { S, ctx, lamps } = carParts(def, custom, true);
  const fin = PAINT_FINISHES[custom.finish] || PAINT_FINISHES.metallic;
  const tint = tintFor(custom.tintPct);
  const rimF = RIM_FINISHES[custom.rimFinish] || RIM_FINISHES.gloss;
  const headC = HEADLIGHT_COLORS[custom.headlights] ?? HEADLIGHT_COLORS.stock;
  const tipC = { titanium: [0x6b5fa0, 0.26, 1], black: [0x18181a, 0.42, 0.3], polished: [0xe4e6e8, 0.1, 1], dualwall: [0xe4e6e8, 0.12, 1] }[custom.tips]
    || (custom.exhaust === 'straight' ? [0x6b5fa0, 0.26, 1] : [0xd8dadc, 0.18, 1]);
  const mats = {
    // clear coat with a faint orange-peel ripple, so reflections waver slightly like real paint
    paint: new THREE.MeshPhysicalMaterial({ color: custom.color, envMapIntensity: 1.55, ...fin, clearcoatNormalMap: orangePeelNormal(), clearcoatNormalScale: new THREE.Vector2(0.035, 0.035) }),
    glass: new THREE.MeshPhysicalMaterial({ color: tint.color, metalness: 0.0, roughness: 0.02, transparent: true, opacity: tint.opacity, envMapIntensity: 2.8, clearcoat: 1, clearcoatRoughness: 0.01, ior: 1.52, reflectivity: 0.6, specularIntensity: 1, depthWrite: true }),
    trim: new THREE.MeshStandardMaterial({ color: 0x0d0e10, roughness: 0.55, metalness: 0.2 }),
    interior: new THREE.MeshStandardMaterial({ color: new THREE.Color(interiorFor(def, custom).palette.seat).multiplyScalar(0.7), roughness: 0.8 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xd8dadc, metalness: 1, roughness: 0.18 }),
    tips: new THREE.MeshStandardMaterial({ color: tipC[0], metalness: tipC[2], roughness: tipC[1] }),
    // lamp internals: polished reflector behind clear glass by day, glowing at night
    head: new THREE.MeshStandardMaterial({ map: headlampTexture(), emissiveMap: headlampTexture(), color: 0xffffff, emissive: headC, emissiveIntensity: 0.02, roughness: 0.16, metalness: 0.9 }),
    head2: new THREE.MeshStandardMaterial({ map: thinLampTexture(), emissiveMap: thinLampTexture(), color: 0xffffff, emissive: headC, emissiveIntensity: 0.02, roughness: 0.2, metalness: 0.85 }),
    // clear polycarbonate lamp cover: adds only its reflection (black base, additive), like real lamp glass
    cover: new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.03, metalness: 0, envMapIntensity: 1.4, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    drl: new THREE.MeshStandardMaterial({ color: 0xf4f8ff, emissive: custom.headlights === 'yellow' ? 0xffd860 : custom.headlights === 'xenon' ? 0xcfe0ff : 0xeaf2ff, emissiveIntensity: 1.1, roughness: 0.2 }),
    lens: new THREE.MeshStandardMaterial({ color: 0x0c0f13, roughness: 0.04, metalness: 0.7 }),
    tail: custom.taillights === 'clear'
      ? new THREE.MeshStandardMaterial({ emissiveMap: taillampTexture(), color: 0xd4d7db, metalness: 0.7, emissive: 0xff2a1a, emissiveIntensity: 0.35, roughness: 0.12 })
      : new THREE.MeshStandardMaterial({ map: taillampTexture(), emissiveMap: taillampTexture(), color: custom.taillights === 'smoked' ? 0x6a6a6a : custom.taillights === 'dark' ? 0x303030 : 0xffffff, emissive: 0xff2a1a, emissiveIntensity: 0.35, roughness: 0.15 }),
    plate: new THREE.MeshStandardMaterial({ map: plateTexture(custom.plate || plateText, custom.plateStyle || def.plate || 'ca'), roughness: 0.4 }),
    decal: new THREE.MeshPhysicalMaterial({ color: 0x07080a, roughness: 0.18, metalness: 0.35, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.2 }),
    mesh: new THREE.MeshStandardMaterial({ map: grilleMeshTexture(), roughness: 0.62, metalness: 0.15 }),
    amber: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    amberL: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    amberR: new THREE.MeshStandardMaterial({ color: 0x8a4a06, emissive: 0xff8a10, emissiveIntensity: 0.25, roughness: 0.15 }),
    rev: new THREE.MeshStandardMaterial({ color: 0xd8dde3, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.1, metalness: 0.5 }),
    kit: new THREE.MeshStandardMaterial({ color: custom.kitColor === 'body' ? custom.color : 0x15161a, roughness: custom.kitColor === 'body' ? 0.3 : 0.45, metalness: 0.25 }),
    body2: new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.6 }),
    rim: new THREE.MeshStandardMaterial({ color: new THREE.Color(custom.rimColor ?? 0xc9ccd0).lerp(new THREE.Color(0xffffff), rimF.whiten ?? 0), metalness: rimF.metalness, roughness: rimF.roughness }),
    // polished deep-dish lips and barrels (seen from both sides inside the dish)
    lip: new THREE.MeshStandardMaterial({ color: 0xf4f6f8, metalness: 1, roughness: 0.2, envMapIntensity: 1.8, side: THREE.DoubleSide }),
    tire: new THREE.MeshStandardMaterial({ map: tireTexture(custom.tire, custom.tireLetter), color: 0xb8b8b8, roughness: custom.tire === 'track' ? 0.72 : 0.9 }),
    disc: new THREE.MeshStandardMaterial({ map: brakeDiscTexture(), color: custom.brakes === 'track' ? 0x5a5c60 : 0xc8ccd2, metalness: 0.85, roughness: 0.45 }),
    caliper: new THREE.MeshStandardMaterial({ color: custom.caliper ?? 0xc8102e, roughness: 0.35, metalness: 0.2 }),
  };
  // paint regions (two-tone sections, liveries) and carbon aero parts work from body-space positions
  const cab = def.body.cabin;
  const mpz = cab ? mirrorPose(ctx) : null;
  const beltY = cab ? ctx.top((cab.t1 + cab.t2) / 2) - ctx.lower : 0.9;
  const sillY = (def.body.bottom[2]?.[1] ?? 0.2) - ctx.lower + 0.04;
  const paintU = {
    uRoof: { value: 0 }, uHood: { value: 0 }, uMirror: { value: 0 }, uWrap: { value: 0 },
    uColor2: { value: new THREE.Color() }, uWrapColor: { value: new THREE.Color() },
    uBelt: { value: beltY }, uSill: { value: sillY }, uSide: { value: sillY + (beltY - sillY) * 0.42 },
    uHoodZ: { value: cab ? ctx.z(cab.t0) - 0.02 : -ctx.L * 0.2 }, uHalfW: { value: ctx.W / 2 },
    uCab: { value: new THREE.Vector2(cab ? ctx.z(cab.t0) : 0, cab ? ctx.z(Math.min(cab.t3, (cab.quarter ?? cab.t3) + 0.02)) : 0) },
    uMir: { value: mpz ? new THREE.Vector3(mpz.x, mpz.y, mpz.z) : new THREE.Vector3(99, 0, 0) },
    uMirR: { value: mpz ? new THREE.Vector3(mpz.rx * 1.35, mpz.ry * 1.15, mpz.rz * 1.6) : new THREE.Vector3(0.01, 0.01, 0.01) },
    uKitCarbon: { value: 0 },
  };
  paintRegions(mats.paint, paintU);
  kitCarbon(mats.kit, paintU);
  const carObj = { mats, paintU };
  applyPaint(carObj, custom);
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const meshes = {};
  mats.cabinTop = mats.paint;
  // surface patches sit a few mm off the body: bias them so they never z-fight at distance
  for (const k of ['decal', 'mesh', 'amber', 'amberL', 'amberR', 'rev', 'head', 'head2', 'drl', 'lens', 'tail', 'plate', 'chrome', 'cover']) Object.assign(mats[k], { polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
  for (const [k, list] of Object.entries(S)) {
    if (!list.length) continue;
    const geo = merge(list);
    if (k === 'paint' || k === 'cabinTop') {
      // projected UVs for the clear-coat ripple (isotropic, so the projection's stretch doesn't show)
      const p = geo.attributes.position, uv = geo.attributes.uv;
      for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getZ(i) + p.getX(i) * 0.7) * 9, (p.getY(i) + p.getX(i) * 0.7) * 9);
      uv.needsUpdate = true;
    }
    if (['paint', 'cabinTop', 'trim', 'kit', 'body2'].includes(k)) { bakeCarAO(geo, ctx); withCarAO(mats[k]); }
    const m = new THREE.Mesh(geo, mats[k]);
    m.castShadow = !['glass', 'head', 'head2', 'drl', 'lens', 'tail', 'rev', 'plate', 'interior', 'decal', 'mesh', 'amber', 'amberL', 'amberR', 'cover'].includes(k);
    m.receiveShadow = ['paint', 'trim', 'kit', 'cabinTop', 'decal', 'mesh', 'interior'].includes(k);
    if (k === 'glass') m.renderOrder = 2;
    if (k === 'cover') m.renderOrder = 3;
    body.add(m);
    meshes[k] = m;
  }
  // Wheels
  const wg = wheelGeometries(def.body.wr, ctx.tw, custom.wheels || 'five', true, Number(custom.wheelSize) || 0);
  const brakeK = { sport: 1.15, track: 1.25 }[custom.brakes] ?? 1;
  if (brakeK !== 1) { wg.caliper.scale(1, brakeK, brakeK); }
  const wheels = [];
  const axles = wheelLayout(def, ctx);
  const DEG = Math.PI / 180;
  for (const a of axles) {
    for (const sx of [-1, 1]) {
      const pivot = new THREE.Group();
      // stance: wheel spacers push the wheel out, camber leans its top in
      const tDelta = (a.steer ? custom.trackF : custom.trackR) / 1000 || 0;
      const camber = (a.steer ? custom.camberF : custom.camberR) || 0;
      pivot.position.set(sx * ((ctx.trackAt ? ctx.trackAt(a.z) : ctx.track) / 2 + tDelta), a.r, a.z);
      pivot.rotation.z = sx * -camber * DEG;
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
      if (wg.lip) spin.add(new THREE.Mesh(wg.lip, mats.lip));
      const disc = new THREE.Mesh(wg.disc, mats.disc);
      spin.add(disc);
      const cal = new THREE.Mesh(wg.caliper, mats.caliper);
      cal.position.x = -0.06;
      cal.rotation.x = (a.steer ? 0.6 : -0.6) * sx;
      flip.add(cal);
      root.add(pivot);
      wheels.push({ pivot, spin, side: sx, front: a.steer, r: a.r, baseY: a.r, baseX: pivot.position.x, axleTrack: (ctx.trackAt ? ctx.trackAt(a.z) : ctx.track) / 2 });
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
  // ride height difference front to rear = rake on the body
  dims.rake = rideRake(def, custom);
  body.rotation.x = dims.rake;
  // underglow: a coloured glow on the ground and a light under the floor
  let underglow = null;
  if (custom.underglow && custom.underglow !== 'off') {
    const col = new THREE.Color(custom.underglow);
    mats.glow = new THREE.MeshBasicMaterial({ map: glowTexture(), color: col.clone().multiplyScalar(1.6), transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -6 });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(ctx.W * 2.1, ctx.L * 1.35).rotateX(-Math.PI / 2).translate(0, 0.03, 0), mats.glow);
    plane.renderOrder = 0;
    const light = new THREE.PointLight(col, 28, 5, 1.5);
    light.position.set(0, 0.14, 0);
    root.add(plane, light);
    underglow = { plane, light, color: col };
  }
  return { root, body, meshes, mats, wheels, lamps, dims, ctx, paintU, custom, underglow, lightColor: new THREE.Color(headC) };
}

export function disposeCar(car) {
  car.root.traverse((o) => {
    if (o.isMesh) o.geometry.dispose();
  });
  for (const m of new Set(Object.values(car.mats))) {
    if (m.map && !m.map.userData?.shared && m.map !== blobShadowTexture() && m.map !== grilleMeshTexture() && m.map !== headlampTexture() && m.map !== taillampTexture() && m.map !== thinLampTexture()) m.map.dispose();
    m.dispose();
  }
}
