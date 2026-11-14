// Scenery detail: building variants with setbacks and rooftop plant, grass tufts, roadside furniture
// (delineators, call boxes, mile markers), power pylons, wall graffiti/ivy and road-surface marks.
// All procedural; geometry is merged per prototype so it can be instanced.
import * as THREE from 'three';
import { mulberry32 } from '../core/utils.js';
import { merge } from './props.js';

const box = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z);

/** Facade-mapped box (UVs tile by floor/bay; tops sample the plain corner of the facade texture). */
function facadeBox(w, h, d, x, y0, z, fpt, bpt) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(x, y0 + h / 2, z);
  const uv = g.attributes.uv, pos = g.attributes.position, nrm = g.attributes.normal;
  const tileH = 3.6 * fpt, tileW = 4 * bpt;
  for (let i = 0; i < uv.count; i++) {
    const nx = Math.abs(nrm.getX(i)), ny = Math.abs(nrm.getY(i));
    if (ny > 0.5) uv.setXY(i, 0.02, 0.02);
    else uv.setXY(i, (nx > 0.5 ? pos.getZ(i) : pos.getX(i)) / tileW, pos.getY(i) / tileH);
  }
  return g;
}

/** Plain parts (roof plant, ledges): UVs pinned to the facade's plain corner. */
function plain(g) {
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, 0.02, 0.02);
  return g;
}

/**
 * Building variant: base volume, optional setback tiers, cornices, rooftop plant
 * (AC units, water tank, lift room) and antenna masts. Returns the merged geometry plus
 * the local positions of aircraft warning lights.
 */
export function buildingVariant(kind, w, h, d, fpt, bpt, seed) {
  const rng = mulberry32(seed);
  const parts = [];
  const lights = [];
  const tiers = [];
  const tall = kind === 'tower' || kind === 'tall' || kind === 'glass';
  if (tall && rng() < 0.8) {
    const h1 = h * (0.55 + rng() * 0.2);
    tiers.push([w, h1, d, 0]);
    const s2 = 0.68 + rng() * 0.18;
    const h2 = h - h1;
    if (kind === 'tall' && rng() < 0.6) {
      const h2a = h2 * 0.65;
      tiers.push([w * s2, h2a, d * s2, h1]);
      tiers.push([w * s2 * 0.7, h2 - h2a, d * s2 * 0.7, h1 + h2a]);
    } else tiers.push([w * s2, h2, d * s2, h1]);
  } else tiers.push([w, h, d, 0]);
  for (const [tw, th, td, ty] of tiers) {
    parts.push(facadeBox(tw, th, td, 0, ty, 0, fpt, bpt));
    // cornice / parapet ledge at the top of each tier
    parts.push(plain(box(tw + 0.5, 0.6, td + 0.5, 0, ty + th - 0.1, 0)));
    // podium band at street level on the base
    if (ty === 0 && kind !== 'warehouse') parts.push(plain(box(tw + 0.3, 1.2, td + 0.3, 0, 0.6, 0)));
  }
  const [rw, rh, rd, ry] = tiers[tiers.length - 1];
  const roofY = ry + rh + 0.5;
  // rooftop plant
  const nAC = kind === 'warehouse' ? 6 : kind === 'low' ? 3 : 2 + Math.floor(rng() * 3);
  for (let i = 0; i < nAC; i++) {
    const ax = (rng() - 0.5) * (rw - 4), az = (rng() - 0.5) * (rd - 4);
    parts.push(plain(box(1.6 + rng() * 1.6, 1.1 + rng() * 0.6, 1.4 + rng(), ax, roofY + 0.6, az)));
  }
  if (kind !== 'warehouse' && rng() < 0.75) {
    // lift / stair penthouse
    const pw = Math.min(rw * 0.35, 7), pd = Math.min(rd * 0.3, 6);
    parts.push(plain(box(pw, 3.2, pd, (rng() - 0.5) * (rw - pw) * 0.5, roofY + 1.6, (rng() - 0.5) * (rd - pd) * 0.5)));
  }
  if ((kind === 'low' || kind === 'mid') && rng() < 0.55) {
    // timber water tank on legs
    const tx = (rng() - 0.5) * (rw - 6), tz = (rng() - 0.5) * (rd - 6);
    parts.push(plain(new THREE.CylinderGeometry(1.6, 1.6, 3.2, 12).translate(tx, roofY + 3.6, tz)));
    parts.push(plain(new THREE.ConeGeometry(1.75, 1.2, 12).translate(tx, roofY + 5.8, tz)));
    for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) parts.push(plain(box(0.18, 2.1, 0.18, tx + lx * 1.1, roofY + 1.0, tz + lz * 1.1)));
  }
  if (tall) {
    const nm = rng() < 0.5 ? 1 : 2;
    for (let i = 0; i < nm; i++) {
      const mh = 8 + rng() * 18;
      const mx = (rng() - 0.5) * rw * 0.4, mz = (rng() - 0.5) * rd * 0.4;
      parts.push(plain(new THREE.CylinderGeometry(0.12, 0.3, mh, 6).translate(mx, roofY + mh / 2, mz)));
      lights.push([mx, roofY + mh + 0.2, mz]);
    }
    // corner warning lights on the roof edge
    lights.push([rw / 2, roofY + 0.2, rd / 2], [-rw / 2, roofY + 0.2, -rd / 2]);
  }
  const geo = merge(parts);
  return { geo, lights };
}

/** Grass tuft: three crossed alpha-tested cards. */
export function grassGeometry() {
  const parts = [];
  for (let i = 0; i < 3; i++) {
    const p = new THREE.PlaneGeometry(1, 0.7).translate(0, 0.35, 0).rotateY((i / 3) * Math.PI);
    parts.push(p);
  }
  return merge(parts);
}

export function grassTexture(dry) {
  const W = 128, H = 96;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.clearRect(0, 0, W, H);
  const rng = mulberry32(dry ? 9 : 5);
  for (let i = 0; i < 70; i++) {
    const bx = 6 + rng() * (W - 12), h = H * (0.35 + rng() * 0.62), lean = (rng() - 0.5) * 26;
    const k = 0.6 + rng() * 0.4;
    x.strokeStyle = dry
      ? `rgb(${Math.round(190 * k)},${Math.round(160 * k)},${Math.round(95 * k)})`
      : `rgb(${Math.round(95 * k)},${Math.round(125 * k)},${Math.round(60 * k)})`;
    x.lineWidth = 1.4 + rng() * 1.6;
    x.beginPath();
    x.moveTo(bx, H);
    x.quadraticCurveTo(bx + lean * 0.3, H - h * 0.6, bx + lean, H - h);
    x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** White delineator post with a reflector. */
export function delineatorGeometry() {
  return {
    post: merge([box(0.1, 1.15, 0.06, 0, 0.575, 0)]),
    refl: merge([box(0.08, 0.16, 0.012, 0, 1.0, -0.035)]),
  };
}

/** Freeway call box: post, yellow box and a small sign. */
export function callBoxGeometry() {
  return {
    post: merge([box(0.09, 1.5, 0.09, 0, 0.75, 0)]),
    body: merge([box(0.36, 0.5, 0.26, 0, 1.3, -0.1), box(0.5, 0.36, 0.02, 0, 1.9, -0.05), box(0.05, 0.6, 0.05, 0, 1.75, 0)]),
  };
}

/** Small green mile marker on a post. */
export function mileMarkerGeometry() {
  return {
    post: merge([box(0.07, 1.6, 0.07, 0, 0.8, 0)]),
    plate: new THREE.PlaneGeometry(0.32, 0.6).translate(0, 1.4, -0.045).rotateY(Math.PI),
  };
}

export function mileMarkerTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = '#0f6b3c';
  x.fillRect(0, 0, 64, 128);
  x.strokeStyle = '#e8efe9';
  x.lineWidth = 3;
  x.strokeRect(4, 4, 56, 120);
  x.fillStyle = '#e8efe9';
  x.font = 'bold 18px Arial';
  x.textAlign = 'center';
  x.fillText('MILE', 32, 30);
  x.font = 'bold 34px Arial';
  for (let i = 0; i < 2; i++) x.fillText(String(Math.floor(Math.random() * 9) + 1), 32, 66 + i * 38);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Lattice transmission tower (~32 m) with three cross-arms. Returns geometry and wire attachment points. */
export function pylonGeometry() {
  const parts = [];
  const H = 32;
  const legs = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  const base = 4.2, top = 1.1;
  const at = (y) => base + (top - base) * Math.min(1, y / (H * 0.8));
  const beam = (a, b, r = 0.09) => {
    const len = a.distanceTo(b);
    const g = new THREE.BoxGeometry(r, len, r);
    const m = new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()));
    g.applyMatrix4(m);
    const mid = a.clone().lerp(b, 0.5);
    g.translate(mid.x, mid.y, mid.z);
    return g;
  };
  const levels = [0, 5, 10, 15, 20, 24, 28, H];
  for (let i = 0; i < levels.length - 1; i++) {
    const y0 = levels[i], y1 = levels[i + 1];
    const w0 = at(y0) / 2, w1 = at(y1) / 2;
    for (let k = 0; k < 4; k++) {
      const [ax, az] = legs[k], [bx, bz] = legs[(k + 1) % 4];
      const p0 = new THREE.Vector3(ax * w0, y0, az * w0), p1 = new THREE.Vector3(ax * w1, y1, az * w1);
      parts.push(beam(p0, p1, 0.16));
      // X-bracing on each face
      const q0 = new THREE.Vector3(bx * w0, y0, bz * w0), q1 = new THREE.Vector3(bx * w1, y1, bz * w1);
      parts.push(beam(p0, q1, 0.06), beam(q0, p1, 0.06));
      parts.push(beam(p1, q1, 0.07));
    }
  }
  const attach = [];
  for (const [y, span] of [[22, 6.5], [26.5, 5], [31, 3.6]]) {
    parts.push(box(span * 2, 0.35, 0.35, 0, y, 0));
    for (const sx of [-1, 1]) {
      parts.push(box(0.12, 1.6, 0.12, sx * span, y - 0.8, 0));
      attach.push([sx * span, y - 1.6, 0]);
    }
  }
  return { geo: merge(parts), attach, H };
}

/** Atlas of wall graffiti tags and ivy patches (4 x 2 cells). */
export function wallArtTexture(seed = 3) {
  const W = 1024, H = 256, cw = 256, chh = 128;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.clearRect(0, 0, W, H);
  const rng = mulberry32(seed);
  const palettes = [['#e2405f', '#1d1d1f', '#f4d35e'], ['#3aa7ff', '#111', '#ffffff'], ['#7cd36b', '#222', '#f0f0f0'], ['#ff8a2a', '#1a1a1a', '#5ad1ff'], ['#c06bff', '#111', '#ffe36b'], ['#e9e9e9', '#222', '#e2405f']];
  const words = ['NOHESI', 'KAZE', 'SEND IT', 'RX', 'LA', '405', 'WRS', 'DRIFT'];
  for (let i = 0; i < 6; i++) {
    const cx = (i % 4) * cw, cy = Math.floor(i / 4) * chh;
    const [fill, outline, accent] = palettes[i];
    x.save();
    x.translate(cx + cw / 2, cy + chh / 2 + 6);
    x.rotate((rng() - 0.5) * 0.25);
    x.font = `900 ${40 + Math.floor(rng() * 16)}px Impact, Arial Black, sans-serif`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    const word = words[Math.floor(rng() * words.length)];
    x.lineJoin = 'round';
    x.lineWidth = 12;
    x.strokeStyle = outline;
    x.strokeText(word, 0, 0);
    x.lineWidth = 4;
    x.strokeStyle = accent;
    x.strokeText(word, 0, 0);
    x.fillStyle = fill;
    x.fillText(word, 0, 0);
    // drips and a spray halo
    x.fillStyle = fill;
    for (let k = 0; k < 6; k++) x.fillRect(-90 + rng() * 180, 16 + rng() * 6, 2, 6 + rng() * 18);
    x.restore();
  }
  // ivy cells (bottom row, last two)
  for (let i = 6; i < 8; i++) {
    const cx = (i % 4) * cw, cy = chh;
    for (let k = 0; k < 900; k++) {
      const px = cx + rng() * cw, py = cy + chh - Math.pow(rng(), 0.7) * chh;
      const edge = Math.min(px - cx, cx + cw - px) / (cw / 2);
      if (rng() > edge * 1.4) continue;
      const g = 70 + Math.floor(rng() * 70);
      x.fillStyle = `rgba(${30 + Math.floor(rng() * 20)},${g},${25 + Math.floor(rng() * 20)},0.95)`;
      x.beginPath();
      x.ellipse(px, py, 3 + rng() * 4, 2 + rng() * 3, rng() * Math.PI, 0, Math.PI * 2);
      x.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Road-surface marks: skid marks, sealed cracks and patch repairs (4 x 1 cells, alpha). */
export function roadMarksTexture(seed = 7) {
  const W = 1024, H = 256, cw = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.clearRect(0, 0, W, H);
  const rng = mulberry32(seed);
  // 0: twin skid marks
  for (const off of [70, 186]) {
    const g = x.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(10,10,10,0)');
    g.addColorStop(0.15, 'rgba(10,10,10,0.55)');
    g.addColorStop(0.85, 'rgba(10,10,10,0.5)');
    g.addColorStop(1, 'rgba(10,10,10,0)');
    x.fillStyle = g;
    for (let y = 0; y < H; y += 2) x.fillRect(off + Math.sin(y * 0.03) * 6 - 12, y, 24, 2);
  }
  // 1: sealed crack (tar snake)
  x.strokeStyle = 'rgba(8,8,8,0.8)';
  x.lineWidth = 5;
  x.beginPath();
  let px = 256 + 128, py = 0;
  x.moveTo(px, py);
  while (py < H) { px += (rng() - 0.5) * 30; py += 8 + rng() * 10; x.lineTo(Math.max(260, Math.min(508, px)), py); }
  x.stroke();
  // 2: rectangular patch repair
  x.fillStyle = 'rgba(25,25,26,0.55)';
  x.fillRect(512 + 30, 20, 196, 216);
  x.strokeStyle = 'rgba(5,5,5,0.7)';
  x.lineWidth = 4;
  x.strokeRect(512 + 30, 20, 196, 216);
  // 3: oil stain blotches
  for (let k = 0; k < 6; k++) {
    const ox = 768 + 40 + rng() * 176, oy = 30 + rng() * 196, r = 10 + rng() * 26;
    const g = x.createRadialGradient(ox, oy, 0, ox, oy, r);
    g.addColorStop(0, 'rgba(12,12,14,0.55)');
    g.addColorStop(1, 'rgba(12,12,14,0)');
    x.fillStyle = g;
    x.beginPath(); x.arc(ox, oy, r, 0, Math.PI * 2); x.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  return t;
}
