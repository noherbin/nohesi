// Procedural canvas textures. Everything is generated at runtime: no external assets.
import * as THREE from 'three';
import { mulberry32 } from '../core/utils.js';

export const TEX = { anisotropy: 4 };

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function finish(c, { srgb = true, repeat = true, aniso = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (aniso) t.anisotropy = TEX.anisotropy;
  t.needsUpdate = true;
  return t;
}

/** Tileable fbm value noise -> Float32Array in ~[0,1]. */
export function tileNoise(size, cells, seed, octaves = 4, persistence = 0.5) {
  const out = new Float32Array(size * size);
  const rng = mulberry32(seed);
  let amp = 1, norm = 0;
  for (let o = 0; o < octaves; o++) {
    const c = cells << o;
    const lat = new Float32Array(c * c);
    for (let i = 0; i < lat.length; i++) lat[i] = rng();
    const scale = c / size;
    for (let y = 0; y < size; y++) {
      const fy = y * scale;
      const iy = Math.floor(fy);
      let ty = fy - iy;
      ty = ty * ty * (3 - 2 * ty);
      const y0 = (iy % c) * c, y1 = ((iy + 1) % c) * c;
      for (let x = 0; x < size; x++) {
        const fx = x * scale;
        const ix = Math.floor(fx);
        let tx = fx - ix;
        tx = tx * tx * (3 - 2 * tx);
        const x0 = ix % c, x1 = (ix + 1) % c;
        const a = lat[y0 + x0], b = lat[y0 + x1], cc = lat[y1 + x0], d = lat[y1 + x1];
        out[y * size + x] += amp * (a + (b - a) * tx + (cc - a) * ty + (a - b - cc + d) * tx * ty);
      }
    }
    norm += amp;
    amp *= persistence;
  }
  for (let i = 0; i < out.length; i++) out[i] /= norm;
  return out;
}

/** Height field -> tangent-space normal map canvas. */
function normalFromHeight(h, size, strength) {
  const c = canvas(size, size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = h[y * size + ((x - 1 + size) % size)];
      const r = h[y * size + ((x + 1) % size)];
      const u = h[((y - 1 + size) % size) * size + x];
      const d = h[((y + 1) % size) * size + x];
      let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      img.data[i] = (nx / len * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny / len * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz / len * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

/** Road surface (covers 8m x 8m). style: 'asphalt' | 'concrete'. Returns {map, normalMap, roughnessMap}. */
export function roadTextures(style, seed = 1) {
  const S = 1024;
  const rng = mulberry32(seed * 31 + 7);
  const grain = tileNoise(S, 128, seed + 1, 2, 0.6);
  const blot = tileNoise(S, 6, seed + 2, 4, 0.55);
  const c = canvas(S, S);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  const concrete = style === 'concrete';
  const hgt = new Float32Array(S * S);
  const rough = new Uint8ClampedArray(S * S);
  for (let i = 0; i < S * S; i++) {
    const g = grain[i];
    const b = blot[i];
    let v;
    if (concrete) {
      v = 0.80 + (b - 0.5) * 0.16 + (g - 0.5) * 0.10;
      // occasional aggregate specks
      if (rng() < 0.012) v -= 0.12 * rng();
    } else {
      v = 0.62 + (b - 0.5) * 0.20 + (g - 0.5) * 0.30;
      if (rng() < 0.03) v += 0.25 * rng(); // light aggregate stones
    }
    const k = v * 255;
    img.data[i * 4] = k;
    img.data[i * 4 + 1] = k;
    img.data[i * 4 + 2] = k * (concrete ? 0.985 : 1.01);
    img.data[i * 4 + 3] = 255;
    hgt[i] = g * 0.8 + b * 0.2;
    rough[i] = 210 + (g - 0.5) * 60;
  }
  ctx.putImageData(img, 0, 0);
  // Cracks / tar snakes
  ctx.lineCap = 'round';
  const snakes = concrete ? 5 : 9;
  for (let i = 0; i < snakes; i++) {
    ctx.strokeStyle = concrete ? 'rgba(60,58,55,0.35)' : 'rgba(18,18,20,0.55)';
    ctx.lineWidth = concrete ? 1.5 : 2 + rng() * 3;
    ctx.beginPath();
    let x = rng() * S, y = rng() * S;
    ctx.moveTo(x, y);
    const segs = 6 + rng() * 10;
    let ang = rng() * Math.PI * 2;
    for (let s = 0; s < segs; s++) {
      ang += (rng() - 0.5) * 1.4;
      x += Math.cos(ang) * 28;
      y += Math.sin(ang) * 28;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // Patches (asphalt repairs)
  if (!concrete) {
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(30,30,32,${0.12 + rng() * 0.12})`;
      const w = 80 + rng() * 220, h = 60 + rng() * 240;
      ctx.fillRect(rng() * S, rng() * S, w, h);
    }
  }
  // Transverse joints for concrete slabs every 4m (two per 8m tile)
  if (concrete) {
    for (const yy of [0, S / 2]) {
      ctx.fillStyle = 'rgba(45,43,40,0.75)';
      ctx.fillRect(0, yy, S, 3);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, yy + 3, S, 2);
    }
    // grooving texture (longitudinal tining)
    ctx.fillStyle = 'rgba(0,0,0,0.035)';
    for (let x = 0; x < S; x += 6) ctx.fillRect(x, 0, 2, S);
  }
  const map = finish(c);
  const nmap = finish(normalFromHeight(hgt.map ? hgt : hgt, S, concrete ? 1.5 : 3.0), { srgb: false });
  const rc = canvas(S, S);
  const rctx = rc.getContext('2d');
  const rimg = rctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    rimg.data[i * 4] = rimg.data[i * 4 + 1] = rimg.data[i * 4 + 2] = rough[i];
    rimg.data[i * 4 + 3] = 255;
  }
  rctx.putImageData(rimg, 0, 0);
  const roughnessMap = finish(rc, { srgb: false });
  return { map, normalMap: nmap, roughnessMap };
}

/** Weathered concrete for barriers, decks and piers. */
export function concreteTexture(seed = 5) {
  const S = 512;
  const n = tileNoise(S, 8, seed, 5, 0.55);
  const fine = tileNoise(S, 96, seed + 3, 2, 0.5);
  const c = canvas(S, S);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const v = 0.78 + (n[i] - 0.5) * 0.22 + (fine[i] - 0.5) * 0.08;
    img.data[i * 4] = v * 255;
    img.data[i * 4 + 1] = v * 252;
    img.data[i * 4 + 2] = v * 246;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const rng = mulberry32(seed);
  // water stains running down
  for (let i = 0; i < 40; i++) {
    const x = rng() * S, w = 2 + rng() * 10;
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, 'rgba(40,38,34,0.20)');
    g.addColorStop(1, 'rgba(40,38,34,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, w, S * (0.3 + rng() * 0.7));
  }
  // form joints
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, 2, S);
  ctx.fillRect(S / 2, 0, 1, S);
  return finish(c);
}

/** Sound-wall block pattern. */
export function blockWallTexture(seed = 9) {
  const S = 512;
  const n = tileNoise(S, 16, seed, 4, 0.5);
  const c = canvas(S, S);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const v = 0.82 + (n[i] - 0.5) * 0.18;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v * 255;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  // block courses: 8 rows, 4 blocks per row, running bond
  const rows = 8, cols = 4;
  ctx.strokeStyle = 'rgba(60,55,50,0.45)';
  ctx.lineWidth = 3;
  for (let r = 0; r < rows; r++) {
    const y = (r / rows) * S;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(S, y);
    ctx.stroke();
    for (let k = 0; k <= cols; k++) {
      const x = ((k + (r % 2) * 0.5) / cols) * S;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + S / rows);
      ctx.stroke();
    }
  }
  return finish(c);
}

/** Generic ground (grass / dirt / sand) detail texture, grayscale for tinting. */
export function groundTexture(seed = 11) {
  const S = 512;
  const n = tileNoise(S, 8, seed, 5, 0.6);
  const f = tileNoise(S, 128, seed + 1, 2, 0.6);
  const c = canvas(S, S);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const v = 0.7 + (n[i] - 0.5) * 0.45 + (f[i] - 0.5) * 0.3;
    img.data[i * 4] = v * 255;
    img.data[i * 4 + 1] = v * 255;
    img.data[i * 4 + 2] = v * 250;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return finish(c);
}

/** Building facade: returns {map, emissive} canvases tiled per floor/bay. */
/**
 * Building facade: colour map, night emissive map and a roughness/metalness map (G = roughness, B = metalness)
 * so glass reflects the sky while concrete and brick stay matte.
 * One texture tile covers `floors` storeys of 3.6 m and `bays` bays of 4 m (see buildingGeometry); 64 px per bay/storey.
 * The left 6 px of every bay is solid pier/wall: roofs and rooftop plant sample it (u ~ 0.005).
 */
export function facadeTextures(kind, seed) {
  const rng = mulberry32(seed);
  const floors = kind === 'low' ? 4 : kind === 'warehouse' ? 3 : 16;
  const bays = kind === 'warehouse' ? 6 : kind === 'low' ? 5 : 8;
  const P = 64, W = bays * P, H = floors * P;
  // colour at full resolution; light and reflectivity maps at half (same drawing coordinates, scaled)
  const c = canvas(W, H), e = canvas(W / 2, H / 2), r = canvas(W / 2, H / 2);
  const ctx = c.getContext('2d'), ex = e.getContext('2d'), rx = r.getContext('2d');
  ex.scale(0.5, 0.5);
  rx.scale(0.5, 0.5);
  const rm = (rough, metal) => `rgb(0,${Math.round(rough * 255)},${Math.round(metal * 255)})`;
  const pick = (a) => a[Math.floor(rng() * a.length)];
  const shade = (hex, k) => {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
    return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
  };
  // storey index counted from the ground (canvas row 0 is the top of the tile)
  const storey = (f) => floors - 1 - f;
  const wallCol = pick({
    low: ['#cdbf9f', '#b9a888', '#d8cfbd', '#a5917a', '#c9b49a'],
    warehouse: ['#9b9a92', '#a8a296', '#8e8a80', '#b3b0a6'],
    mid: ['#c8c3b8', '#a7a39b', '#d7d1c3', '#b39c86', '#9a8f84'],
    tower: ['#a7abae', '#8f969c', '#b8b4ab', '#7d858c'],
    tall: ['#5a646d', '#6b747b', '#4b545c'],
    glass: ['#56616b', '#646e76', '#4a545d'],
  }[kind]);
  const glassTint = pick(kind === 'glass' || kind === 'tall'
    ? [[58, 92, 120], [52, 84, 96], [70, 82, 92], [84, 74, 62], [46, 70, 88]]
    : [[40, 50, 58], [36, 44, 52], [48, 54, 60]]);
  ctx.fillStyle = wallCol; ctx.fillRect(0, 0, W, H);
  ex.fillStyle = '#000'; ex.fillRect(0, 0, W, H);
  const wallRM = kind === 'warehouse' ? rm(0.55, 0.55) : kind === 'tall' || kind === 'glass' ? rm(0.4, 0.6) : rm(0.88, 0);
  rx.fillStyle = wallRM; rx.fillRect(0, 0, W, H);

  // glass pane: sky reflection (bright at the top, darker toward the floor), a broad tile-wide reflection
  // gradient so neighbouring panes differ slightly, and a strong mirror finish in the RM map
  const pane = (x, y, w, h, glossy = 0.06) => {
    const big = 0.82 + 0.3 * Math.sin((x / W) * 6.28 * 1.3 + seed) * Math.cos((y / H) * 6.28 * 0.7 + seed * 0.3);
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    const [R, G, B] = glassTint;
    g.addColorStop(0, `rgb(${Math.round(R * 1.55 * big)},${Math.round(G * 1.5 * big)},${Math.round(B * 1.45 * big)})`);
    g.addColorStop(0.55, `rgb(${Math.round(R * big)},${Math.round(G * big)},${Math.round(B * big)})`);
    g.addColorStop(1, `rgb(${Math.round(R * 0.62 * big)},${Math.round(G * 0.62 * big)},${Math.round(B * 0.65 * big)})`);
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    rx.fillStyle = rm(glossy + rng() * 0.04, 0.88); rx.fillRect(x, y, w, h);
  };
  // interior light seen through a pane: ceiling-lit falloff, desks/partitions low down, the odd column or blind
  const office = (x, y, w, h, col, k) => {
    const g = ex.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${k})`);
    g.addColorStop(0.6, `rgba(${col[0]},${col[1]},${col[2]},${k * 0.72})`);
    g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},${k * 0.45})`);
    ex.fillStyle = g; ex.fillRect(x, y, w, h);
    ex.fillStyle = 'rgba(0,0,0,0.45)';
    ex.fillRect(x, y + h * 0.72, w, h * 0.1); // desk / partition line
    if (rng() < 0.18) ex.fillRect(x + w * (0.2 + rng() * 0.6), y + h * 0.15, Math.max(1, w * 0.12), h * 0.85); // column or person
    if (rng() < 0.22) { ex.fillStyle = 'rgba(0,0,0,0.35)'; for (let yy = y; yy < y + h * (0.3 + rng() * 0.6); yy += 3) ex.fillRect(x, yy, w, 1); } // blinds
  };
  const home = (x, y, w, h) => {
    // warm lamp light, curtains drawn part-way, a few cool TV-lit rooms
    const tv = rng() < 0.1;
    const col = tv ? [150, 175, 255] : rng() < 0.7 ? [255, 178, 104] : [255, 206, 150];
    const k = 0.55 + rng() * 0.45;
    const cx = x + w * (0.3 + rng() * 0.4), cy = y + h * 0.35;
    const g = ex.createRadialGradient(cx, cy, 1, cx, cy, Math.max(w, h) * 0.9);
    g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${k})`);
    g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},${k * 0.35})`);
    ex.fillStyle = g; ex.fillRect(x, y, w, h);
    const cur = rng();
    if (cur < 0.55) {
      // curtains: translucent fabric over the sides (or most of the window)
      const cw = w * (cur < 0.2 ? 0.45 : 0.22);
      ex.fillStyle = `rgba(${Math.round(col[0] * 0.45)},${Math.round(col[1] * 0.35)},${Math.round(col[2] * 0.3)},0.75)`;
      ex.fillRect(x, y, cw, h); ex.fillRect(x + w - cw, y, cw, h);
    }
  };
  const lightCol = () => (rng() < 0.75 ? [232, 240, 255] : [255, 236, 205]);

  if (kind === 'tall' || kind === 'glass') {
    // unitised curtain wall: 1.33 m panes, thin mullions, opaque spandrel at each slab
    const spand = 16;
    for (let f = 0; f < floors; f++) {
      const y = f * P;
      ctx.fillStyle = shade(wallCol, 0.85); ctx.fillRect(0, y + P - spand, W, spand);
      rx.fillStyle = rm(0.3, 0.7); rx.fillRect(0, y + P - spand, W, spand);
      // office occupancy comes in runs along a floor, not as a checkerboard
      const lit = new Array(bays * 3).fill(0);
      const occ = rng();
      if (occ < 0.62) {
        const runs = 1 + Math.floor(rng() * 3);
        for (let q = 0; q < runs; q++) {
          const a0 = Math.floor(rng() * lit.length), len = 3 + Math.floor(rng() * (occ < 0.25 ? lit.length : 9));
          for (let i = a0; i < Math.min(lit.length, a0 + len); i++) lit[i] = 1;
        }
      }
      const col = lightCol(), kF = 0.6 + rng() * 0.35;
      for (let bI = 0; bI < bays; bI++) {
        for (let pI = 0; pI < 3; pI++) {
          const x = bI * P + 6 + pI * 19 + (pI ? 1 : 0), w = 18 - (pI === 2 ? 1 : 0);
          pane(x, y + 2, w, P - spand - 2, kind === 'glass' ? 0.04 : 0.07);
          if (lit[bI * 3 + pI]) office(x, y + 2, w, P - spand - 2, col, kF);
        }
      }
    }
    // mullions and piers
    ctx.fillStyle = shade(wallCol, 0.7);
    rx.fillStyle = rm(0.42, 0.75);
    for (let bI = 0; bI < bays; bI++) {
      ctx.fillRect(bI * P, 0, 6, H); rx.fillRect(bI * P, 0, 6, H);
      for (const mx of [25, 44]) { ctx.fillRect(bI * P + mx, 0, 2, H); rx.fillRect(bI * P + mx, 0, 2, H); }
    }
  } else if (kind === 'tower') {
    // concrete frame with continuous ribbon windows
    for (let f = 0; f < floors; f++) {
      const y = f * P, wy = y + 20, wh = 30;
      ctx.fillStyle = 'rgba(0,0,0,0.10)'; ctx.fillRect(0, y + P - 3, W, 3); // slab shadow line
      const occ = rng(), col = lightCol(), kF = 0.55 + rng() * 0.4;
      const litRun = occ < 0.6 ? [Math.floor(rng() * bays), 2 + Math.floor(rng() * bays)] : null;
      for (let bI = 0; bI < bays; bI++) {
        const x = bI * P + 8;
        pane(x, wy, P - 8, wh, 0.1);
        ctx.fillStyle = shade(wallCol, 0.6);
        for (const mx of [18, 37]) ctx.fillRect(x + mx, wy, 2, wh);
        const on = litRun && bI >= litRun[0] && bI < litRun[0] + litRun[1];
        if (on) office(x, wy, P - 8, wh, col, kF);
        ex.fillStyle = '#000'; for (const mx of [18, 37]) ex.fillRect(x + mx, wy, 2, wh);
      }
    }
  } else if (kind === 'mid' || kind === 'low') {
    // punched windows with sills; low-rise blocks get a glazed shopfront on the ground storey
    for (let f = 0; f < floors; f++) {
      const y = f * P, st = storey(f);
      for (let bI = 0; bI < bays; bI++) {
        const bx = bI * P;
        if (kind === 'low' && st === 0) {
          const x = bx + 8, w = P - 10, wy = y + 14, wh = P - 16;
          pane(x, wy, w, wh, 0.08);
          ctx.fillStyle = shade(wallCol, 0.55); ctx.fillRect(x, wy - 6, w, 6); // fascia / sign band
          if (rng() < 0.75) office(x, wy, w, wh, rng() < 0.6 ? [255, 228, 190] : [235, 242, 255], 0.75 + rng() * 0.25);
          continue;
        }
        const ww = kind === 'low' ? 30 : 26, wh = kind === 'low' ? 30 : 34;
        const x = bx + 6 + (P - 6 - ww) / 2, wy = y + 12;
        // reveal shadow, glass, sill
        ctx.fillStyle = shade(wallCol, 0.62); ctx.fillRect(x - 2, wy - 2, ww + 4, wh + 3);
        pane(x, wy, ww, wh, 0.08);
        ctx.fillStyle = shade(wallCol, 0.55);
        ctx.fillRect(x + ww / 2 - 1, wy, 2, wh); // glazing bar
        ctx.fillStyle = shade(wallCol, 1.12); ctx.fillRect(x - 3, wy + wh, ww + 6, 4); // sill
        rx.fillStyle = wallRM; rx.fillRect(x + ww / 2 - 1, wy, 2, wh);
        if (rng() < (kind === 'low' ? 0.3 : 0.36)) { home(x, wy, ww, wh); ex.fillStyle = '#000'; ex.fillRect(x + ww / 2 - 1, wy, 2, wh); }
      }
      if (kind === 'mid' && st % 4 === 3) { ctx.fillStyle = shade(wallCol, 0.9); ctx.fillRect(0, y + P - 4, W, 4); } // string course
    }
  } else if (kind === 'warehouse') {
    // ribbed metal cladding, clerestory glazing up top, roll-up doors with a wall light over each
    ctx.fillStyle = shade(wallCol, 0.86);
    for (let x = 0; x < W; x += 5) ctx.fillRect(x, 0, 2, H);
    for (let bI = 0; bI < bays; bI++) {
      const bx = bI * P;
      pane(bx + 6, 10, P - 8, 12, 0.25);
      if (rng() < 0.45) { ex.fillStyle = 'rgba(255,214,150,0.45)'; ex.fillRect(bx + 6, 10, P - 8, 12); }
      if (bI % 2 === 1) {
        const dy = H - 50, dw = 44, dx = bx + (P - dw) / 2 + 3;
        ctx.fillStyle = '#6b6e72'; ctx.fillRect(dx, dy, dw, 50);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; for (let yy = dy; yy < H; yy += 4) ctx.fillRect(dx, yy, dw, 1);
        rx.fillStyle = rm(0.5, 0.6); rx.fillRect(dx, dy, dw, 50);
        ctx.fillStyle = '#d8d8d0'; ctx.fillRect(dx + dw / 2 - 3, dy - 8, 6, 4);
        ex.fillStyle = 'rgba(255,226,180,0.95)'; ex.fillRect(dx + dw / 2 - 3, dy - 8, 6, 4);
      }
    }
  }
  // keep the pier column (left of every bay) clean: roofs and rooftop plant sample it
  ctx.fillStyle = kind === 'tall' || kind === 'glass' ? shade(wallCol, 0.7) : wallCol;
  rx.fillStyle = kind === 'tall' || kind === 'glass' ? rm(0.42, 0.75) : wallRM;
  ex.fillStyle = '#000';
  for (let bI = 0; bI < bays; bI++) { ctx.fillRect(bI * P, 0, 5, H); rx.fillRect(bI * P, 0, 5, H); ex.fillRect(bI * P, 0, 5, H); }
  return { map: finish(c), emissive: finish(e), rm: finish(r, { srgb: false }) };
}

/** Green highway guide sign. */
export function signTexture(dest, route, dir, seed = 1) {
  const W = 512, H = 300;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const isExit = /^Exit/i.test(dest);
  ctx.fillStyle = '#0b6b3a';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#f2f2ee';
  ctx.lineWidth = 8;
  roundRect(ctx, 10, 10, W - 20, H - 20, 18);
  ctx.stroke();
  ctx.fillStyle = '#f4f4f0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (route) {
    drawShield(ctx, W / 2 - (dir ? 50 : 0), 78, route);
    if (dir) {
      ctx.font = 'bold 44px "Barlow Condensed", "Arial Narrow", Arial, sans-serif';
      ctx.fillStyle = '#f4f4f0';
      ctx.fillText(dir === 'N' ? 'NORTH' : dir === 'S' ? 'SOUTH' : dir === 'E' ? 'EAST' : 'WEST', W / 2 + 70, 80);
    }
  }
  ctx.fillStyle = '#f4f4f0';
  ctx.font = `600 ${dest.length > 14 ? 56 : 66}px "Barlow Condensed", "Arial Narrow", Arial, sans-serif`;
  ctx.fillText(dest, W / 2, route ? 185 : 130);
  // down arrows
  const rng = mulberry32(seed);
  const arrows = isExit ? 1 : 1 + Math.floor(rng() * 2);
  for (let i = 0; i < arrows; i++) {
    const ax = W / 2 + (i - (arrows - 1) / 2) * 110;
    drawArrow(ctx, ax, route ? 250 : 220);
  }
  if (isExit) {
    ctx.fillStyle = '#f2c230';
    ctx.fillRect(W / 2 - 110, H - 58, 220, 44);
    ctx.fillStyle = '#111';
    ctx.font = 'bold 34px "Barlow Condensed", Arial, sans-serif';
    ctx.fillText('EXIT ONLY', W / 2, H - 36);
  }
  return finish(c, { repeat: false });
}

function drawShield(ctx, x, y, num) {
  ctx.save();
  ctx.translate(x, y);
  // interstate style shield
  ctx.fillStyle = '#f4f4f0';
  ctx.beginPath();
  ctx.moveTo(-46, -46);
  ctx.quadraticCurveTo(0, -36, 46, -46);
  ctx.quadraticCurveTo(54, 10, 0, 50);
  ctx.quadraticCurveTo(-54, 10, -46, -46);
  ctx.fill();
  ctx.fillStyle = '#1f4ea3';
  ctx.beginPath();
  ctx.moveTo(-40, -22);
  ctx.lineTo(40, -22);
  ctx.quadraticCurveTo(44, 14, 0, 44);
  ctx.quadraticCurveTo(-44, 14, -40, -22);
  ctx.fill();
  ctx.fillStyle = '#c8262c';
  ctx.beginPath();
  ctx.moveTo(-41, -40);
  ctx.quadraticCurveTo(0, -31, 41, -40);
  ctx.lineTo(40, -26);
  ctx.lineTo(-40, -26);
  ctx.fill();
  ctx.fillStyle = '#f4f4f0';
  ctx.font = 'bold 36px "Barlow Condensed", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(num, 0, 10);
  ctx.restore();
}

function drawArrow(ctx, x, y) {
  ctx.fillStyle = '#f4f4f0';
  ctx.fillRect(x - 7, y - 26, 14, 30);
  ctx.beginPath();
  ctx.moveTo(x - 22, y);
  ctx.lineTo(x + 22, y);
  ctx.lineTo(x, y + 24);
  ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function speedSignTexture() {
  const c = canvas(128, 160);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f2f2ee';
  ctx.fillRect(0, 0, 128, 160);
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 5;
  ctx.strokeRect(6, 6, 116, 148);
  ctx.fillStyle = '#111';
  ctx.textAlign = 'center';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('SPEED', 64, 36);
  ctx.fillText('LIMIT', 64, 60);
  ctx.font = 'bold 70px Arial, sans-serif';
  ctx.fillText('65', 64, 130);
  return finish(c, { repeat: false });
}

/** License plate. style: 'ca' | 'jdm' | 'eu' */
export function plateTexture(text, style = 'ca') {
  const c = canvas(256, 128);
  const ctx = c.getContext('2d');
  if (style === 'jdm') {
    ctx.fillStyle = '#f0f0e8';
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = '#2a6b3a';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 250, 122);
    ctx.fillStyle = '#2a6b3a';
  } else if (style === 'yellow') {
    ctx.fillStyle = '#f2c230';
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = '#111';
  } else {
    ctx.fillStyle = '#f4f4f2';
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = '#b32020';
    ctx.font = 'italic bold 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('California', 128, 28);
    ctx.fillStyle = '#18306e';
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 60px "Barlow Condensed", "Arial Narrow", Arial, sans-serif';
  ctx.fillText(text, 128, style === 'ca' ? 80 : 68);
  return finish(c, { repeat: false });
}

/** Distant skyline: R = silhouette alpha, G = lit-window mask. */
export function skylineTexture(seed, density, heightScale) {
  const W = 2048, H = 256;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  if (density <= 0) return finish(c, { srgb: false });
  const rng = mulberry32(seed);
  let x = 0;
  while (x < W) {
    const cluster = rng() < 0.35 * density + 0.1;
    const w = 8 + rng() * 34;
    const hFrac = cluster ? 0.25 + rng() * 0.7 : 0.05 + rng() * 0.18;
    const h = Math.min(H - 8, hFrac * H * heightScale * (0.6 + 0.4 * density));
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x, H - h, w, h);
    if (cluster && rng() < 0.4) {
      ctx.fillRect(x + w * 0.4, H - h - 12 - rng() * 20, 2, 30); // antenna
      if (rng() < 0.5) {
        ctx.fillRect(x + w * 0.2, H - h - 8, w * 0.6, 8);
      }
    }
    // windows mask in green channel
    for (let wy = H - h + 4; wy < H - 4; wy += 5) {
      for (let wx = x + 2; wx < x + w - 2; wx += 4) {
        if (rng() < 0.28) {
          ctx.fillStyle = '#ffff00';
          ctx.fillRect(wx, wy, 2, 2);
        }
      }
    }
    x += w + (cluster ? rng() * 3 : rng() * 25);
  }
  return finish(c, { srgb: false, aniso: false });
}

/** Distant mountain silhouette (R channel alpha, G = shading). */
export function mountainTexture(seed, height) {
  const W = 2048, H = 256;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  if (height <= 0) return finish(c, { srgb: false });
  const rng = mulberry32(seed);
  const layers = 2;
  for (let l = 0; l < layers; l++) {
    const pts = [];
    const n = 128;
    const ph = [rng() * 10, rng() * 10, rng() * 10];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const a = Math.PI * 2 * t;
      let h = 0.35 + 0.25 * Math.sin(a * 2 + ph[0]) + 0.18 * Math.sin(a * 5 + ph[1]) + 0.08 * Math.sin(a * 13 + ph[2]);
      h += (rng() - 0.5) * 0.04;
      h = Math.max(0.05, h) * height * (l === 0 ? 0.8 : 0.55);
      pts.push([t * W, H - h * H * 0.9]);
    }
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    const g = l === 0 ? 120 : 220;
    grad.addColorStop(0, `rgb(255,${g},0)`);
    grad.addColorStop(1, `rgb(255,${g * 0.6},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (const p of pts) ctx.lineTo(p[0], p[1]);
    ctx.lineTo(W, H);
    ctx.fill();
  }
  return finish(c, { srgb: false, aniso: false });
}

/** Tileable cloud alpha. */
export function cloudTexture(seed = 3) {
  const S = 512;
  const n = tileNoise(S, 4, seed, 6, 0.55);
  const c = canvas(S, S);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const v = Math.max(0, Math.min(1, (n[i] - 0.42) * 3.2));
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = 255;
    img.data[i * 4 + 3] = v * 255;
  }
  ctx.putImageData(img, 0, 0);
  return finish(c, { srgb: false, aniso: false });
}

export function radialTexture(size = 64, inner = 0.0, hard = 1.6) {
  const c = canvas(size, size);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x + 0.5) / size * 2 - 1, dy = (y + 0.5) / size * 2 - 1;
      const r = Math.sqrt(dx * dx + dy * dy);
      let v = r < inner ? 1 : Math.max(0, 1 - (r - inner) / (1 - inner));
      v = Math.pow(v, hard);
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = v * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return finish(c, { srgb: false, repeat: false, aniso: false });
}

/** Headlight beam footprint on the road (length along +v). */
export function beamTexture() {
  const W = 64, H = 128;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = (x + 0.5) / W * 2 - 1;
      const v = (y + 0.5) / H; // 0 at car, 1 far
      const width = 0.35 + v * 0.65;
      const lat = Math.max(0, 1 - Math.abs(u) / width);
      const along = Math.pow(Math.sin(Math.min(1, v * 1.2) * Math.PI * 0.9), 0.8) * (1 - v * 0.6);
      const a = Math.pow(lat, 1.5) * along;
      const i = (y * W + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return finish(c, { srgb: false, repeat: false, aniso: false });
}

/** Wet-road light streak (vertical fade). */
export function streakTexture() {
  const W = 32, H = 128;
  const c = canvas(W, H);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = (x + 0.5) / W * 2 - 1;
      const v = (y + 0.5) / H;
      const a = Math.pow(Math.max(0, 1 - Math.abs(u)), 2) * Math.pow(1 - v, 1.5) * Math.min(1, v * 8);
      const i = (y * W + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
      img.data[i + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return finish(c, { srgb: false, repeat: false, aniso: false });
}

const ADS = [
  { t: "DON'T LIFT", s: 'NO HESI RADIO 104.7', bg: ['#14060a', '#3a0b18'], fg: '#ff2e4d', glow: '#ff2e4d' },
  { t: 'TURBO COFFEE', s: 'BOOST YOUR MORNING', bg: ['#081018', '#0f2a40'], fg: '#38d6ff', glow: '#38d6ff' },
  { t: 'APEX ENERGY', s: 'STAY IN THE ZONE', bg: ['#0a1406', '#1d3a0d'], fg: '#b6ff3b', glow: '#9dff2e' },
  { t: 'MIDNIGHT MOTEL', s: 'NEXT EXIT · VACANCY', bg: ['#140a18', '#341447'], fg: '#ff6bf0', glow: '#ff4fe8' },
  { t: 'SAKURA TIRES', s: 'GRIP THAT HOLDS ON', bg: ['#161208', '#3d2c0a'], fg: '#ffbf3b', glow: '#ffaa00' },
];

export function billboardTexture(i) {
  const ad = ADS[i % ADS.length];
  const W = 512, H = 256;
  const c = canvas(W, H), e = canvas(W, H);
  const ctx = c.getContext('2d'), ex = e.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, ad.bg[0]);
  g.addColorStop(1, ad.bg[1]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ex.fillStyle = '#000';
  ex.fillRect(0, 0, W, H);
  for (const [cx, col, blur] of [[ctx, ad.fg, 18], [ex, ad.glow, 14]]) {
    cx.textAlign = 'center';
    cx.textBaseline = 'middle';
    cx.shadowColor = col;
    cx.shadowBlur = blur;
    cx.fillStyle = col;
    cx.font = 'italic 800 76px "Barlow Condensed", "Arial Narrow", Arial, sans-serif';
    cx.fillText(ad.t, W / 2, H * 0.42);
    cx.shadowBlur = 0;
    cx.font = '600 30px "Barlow Condensed", Arial, sans-serif';
    cx.fillStyle = cx === ctx ? '#e9e9e9' : '#777';
    cx.fillText(ad.s, W / 2, H * 0.76);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, W - 6, H - 6);
  return { map: finish(c, { repeat: false }), emissive: finish(e, { repeat: false }) };
}

/** Soft rounded-rectangle contact shadow (alpha only), cached. */
let _blob = null;
export function blobShadowTexture() {
  if (_blob) return _blob;
  const W = 64, H = 128;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  const img = x.createImageData(W, H);
  // signed distance to a rounded rectangle in normalised coords
  const hx = 0.36, hy = 0.42, r = 0.16, soft = 0.13;
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const u = (i + 0.5) / W - 0.5, v = ((j + 0.5) / H - 0.5);
      const qx = Math.abs(u) - (hx - r), qy = Math.abs(v) - (hy - r);
      const out = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
      let a = 1 - Math.min(1, Math.max(0, (out + soft * 0.35) / soft));
      a = a * a * (3 - 2 * a);
      // darker core between the axles
      const core = Math.exp(-(u * u) / 0.03 - (v * v) / 0.09);
      a = Math.min(1, a * (0.72 + 0.28 * core));
      const o = (j * W + i) * 4;
      img.data[o] = img.data[o + 1] = img.data[o + 2] = 0;
      img.data[o + 3] = Math.round(a * 255);
    }
  }
  x.putImageData(img, 0, 0);
  _blob = finish(c, { srgb: false, repeat: false, aniso: false });
  return _blob;
}

/** Honeycomb grille mesh: dark cells with lit edges (tiles in world units via the decal UVs). */
let _grille = null;
export function grilleMeshTexture() {
  if (_grille) return _grille;
  const S = 128;
  const c = canvas(S, S);
  const x = c.getContext('2d');
  x.fillStyle = '#050506';
  x.fillRect(0, 0, S, S);
  const r = S / 4;
  const h = r * Math.sqrt(3) / 2;
  x.lineWidth = 7;
  for (let row = -1; row < 5; row++) {
    for (let col = -1; col < 4; col++) {
      const cx = col * r * 1.5 * 2 / 1.5 + (row % 2 ? r : 0), cy = row * h;
      x.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        const px = cx + Math.cos(a) * r * 0.62, py = cy + Math.sin(a) * r * 0.62;
        if (k === 0) x.moveTo(px, py); else x.lineTo(px, py);
      }
      x.closePath();
      x.strokeStyle = '#1e2023';
      x.stroke();
    }
  }
  _grille = finish(c, { srgb: true, repeat: true, aniso: true });
  return _grille;
}

/** Tyre: sidewall lettering and tread grooves laid out on the lathe UVs (u around, v across the profile). */
let _tire = null;
export function tireTexture() {
  if (_tire) return _tire;
  const W = 2048, H = 256;
  const c = canvas(W, H);
  const x = c.getContext('2d');
  x.fillStyle = '#1c1c1d';
  x.fillRect(0, 0, W, H);
  // v runs over 7 profile segments; canvas y = (1 - v) * H
  const band = (v0, v1) => [(1 - v1) * H, (1 - v0) * H];
  // tread (segments 3..4): circumferential grooves plus sipes
  const [t0, t1] = band(3 / 7, 4 / 7);
  x.fillStyle = '#121213';
  for (const f of [0.18, 0.42, 0.66, 0.86]) x.fillRect(0, t0 + (t1 - t0) * f, W, 2.5);
  x.fillStyle = '#161617';
  for (let i = 0; i < 180; i++) {
    const px = (i / 180) * W;
    x.fillRect(px, t0 + 2, 2, (t1 - t0) * 0.16);
    x.fillRect(px + 5, t1 - (t1 - t0) * 0.14, 2, (t1 - t0) * 0.12);
  }
  // outer sidewall (segment 6..7) lettering, twice around
  const [s0, s1] = band(6 / 7, 7 / 7);
  x.save();
  x.fillStyle = '#4e4f52';
  x.textBaseline = 'middle';
  x.font = 'bold 24px Arial, sans-serif';
  for (const off of [0, W / 2]) {
    x.save();
    x.translate(off + 120, (s0 + s1) / 2);
    x.scale(2.6, -1);
    x.fillText('NO HESI', 0, 0);
    x.restore();
    x.save();
    x.translate(off + 620, (s0 + s1) / 2);
    x.scale(1.6, -1);
    x.font = '600 18px Arial, sans-serif';
    x.fillText('PERFORMANCE  265/35 ZR19', 0, 0);
    x.restore();
  }
  x.restore();
  // subtle rim-protector line
  x.fillStyle = '#242426';
  x.fillRect(0, s0 + 1, W, 2);
  _tire = finish(c, { srgb: true, repeat: false, aniso: true });
  _tire.wrapS = THREE.RepeatWrapping;
  return _tire;
}
