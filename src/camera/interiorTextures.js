// Procedural interior textures: leather grain, soft-touch plastic, carbon weave, brushed aluminium,
// speaker mesh, switchgear panels and glove detail. All canvas generated and cached.
import * as THREE from 'three';

const cache = {};

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function tex(c, { srgb = true, repeat = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** Pebbled leather grain, used as a bump map. */
export function leatherBump() {
  if (cache.leather) return cache.leather;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const r = rng(7);
  x.fillStyle = '#808080';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 2600; i++) {
    const px = r() * S, py = r() * S, rad = 1.2 + r() * 2.6;
    const v = 110 + Math.floor(r() * 60);
    x.fillStyle = `rgb(${v},${v},${v})`;
    for (const [ox, oy] of [[0, 0], [S, 0], [-S, 0], [0, S], [0, -S]]) {
      x.beginPath();
      x.arc(px + ox, py + oy, rad, 0, Math.PI * 2);
      x.fill();
    }
  }
  return (cache.leather = tex(c, { srgb: false }));
}

/** Fine stipple for soft-touch dashboard plastics (bump). */
export function plasticBump() {
  if (cache.plastic) return cache.plastic;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const img = x.createImageData(S, S);
  const r = rng(13);
  for (let i = 0; i < S * S; i++) {
    const v = 120 + Math.floor(r() * 30);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  return (cache.plastic = tex(c, { srgb: false }));
}

/** 2x2 twill carbon weave. */
export function carbonTexture() {
  if (cache.carbon) return cache.carbon;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  const n = 8, cell = S / n;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const horiz = ((i + j) >> 1) % 2 === 0;
      const g = horiz ? x.createLinearGradient(0, j * cell, 0, (j + 1) * cell) : x.createLinearGradient(i * cell, 0, (i + 1) * cell, 0);
      g.addColorStop(0, '#111317');
      g.addColorStop(0.5, horiz ? '#3a3f47' : '#2d3138');
      g.addColorStop(1, '#111317');
      x.fillStyle = g;
      x.fillRect(i * cell, j * cell, cell, cell);
    }
  }
  return (cache.carbon = tex(c));
}

/** Brushed aluminium. */
export function brushedTexture() {
  if (cache.brushed) return cache.brushed;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const r = rng(21);
  x.fillStyle = '#9a9ea4';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    const y = r() * S, v = 130 + Math.floor(r() * 90);
    x.fillStyle = `rgba(${v},${v + 2},${v + 5},0.35)`;
    x.fillRect(0, y, S, 1);
  }
  return (cache.brushed = tex(c));
}

/** Perforated speaker / grille mesh. */
export function speakerTexture() {
  if (cache.speaker) return cache.speaker;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#1c1d20';
  x.fillRect(0, 0, S, S);
  x.fillStyle = '#060607';
  for (let j = 0; j < 16; j++) for (let i = 0; i < 16; i++) {
    x.beginPath();
    x.arc(i * 8 + 4 + (j % 2) * 4, j * 8 + 4, 2.2, 0, Math.PI * 2);
    x.fill();
  }
  return (cache.speaker = tex(c));
}

/** Knurled ring for rotary controllers. */
export function knurlTexture() {
  if (cache.knurl) return cache.knurl;
  const c = canvas(256, 32), x = c.getContext('2d');
  x.fillStyle = '#b8bcc2';
  x.fillRect(0, 0, 256, 32);
  x.strokeStyle = '#55595f';
  x.lineWidth = 1.5;
  for (let i = 0; i < 256; i += 4) {
    x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 8, 32); x.stroke();
    x.beginPath(); x.moveTo(i + 8, 0); x.lineTo(i, 32); x.stroke();
  }
  return (cache.knurl = tex(c));
}

function roundRect(x, X, Y, W, H, r) {
  x.beginPath();
  x.moveTo(X + r, Y);
  x.arcTo(X + W, Y, X + W, Y + H, r);
  x.arcTo(X + W, Y + H, X, Y + H, r);
  x.arcTo(X, Y + H, X, Y, r);
  x.arcTo(X, Y, X + W, Y, r);
  x.closePath();
}

/** Climate control strip: piano-black panel with soft-key icons and temperature readouts. */
export function climateTexture() {
  if (cache.climate) return cache.climate;
  const W = 512, H = 128, c = canvas(W, H), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#16181b');
  g.addColorStop(1, '#060708');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  x.fillStyle = '#e8edf2';
  x.font = '600 30px Arial, sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText('21.5°', 60, 64);
  x.fillText('21.5°', W - 60, 64);
  const icons = ['A/C', 'AUTO', '❄', '♨', '⟳', 'MAX'];
  x.font = '600 20px Arial, sans-serif';
  for (let i = 0; i < icons.length; i++) {
    const cx = 140 + i * 47;
    x.strokeStyle = '#3a3e44';
    x.lineWidth = 2;
    roundRect(x, cx - 20, 40, 40, 48, 8);
    x.stroke();
    x.fillStyle = i === 1 ? '#5cc8ff' : '#cfd5dc';
    x.fillText(icons[i], cx, 64);
  }
  return (cache.climate = tex(c, { repeat: false }));
}

/** Steering-wheel spoke switch pods (left: cruise / right: media). */
export function spokeButtonsTexture(side) {
  const key = 'spoke' + side;
  if (cache[key]) return cache[key];
  const W = 256, H = 128, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#121315';
  x.fillRect(0, 0, W, H);
  const labels = side < 0 ? ['SET', 'RES', '+', '−', '⏻', 'LIM'] : ['♪', '☎', '▲', '▼', '◀', '▶'];
  x.font = 'bold 22px Arial, sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  for (let i = 0; i < 6; i++) {
    const cx = 50 + (i % 3) * 78, cy = 36 + Math.floor(i / 3) * 56;
    const gg = x.createLinearGradient(0, cy - 22, 0, cy + 22);
    gg.addColorStop(0, '#2c2f34');
    gg.addColorStop(1, '#16181b');
    x.fillStyle = gg;
    roundRect(x, cx - 32, cy - 22, 64, 44, 10);
    x.fill();
    x.fillStyle = '#d6dbe1';
    x.fillText(labels[i], cx, cy + 1);
  }
  return (cache[key] = tex(c, { repeat: false }));
}

/** Window switch block for the driver's armrest. */
export function windowSwitchTexture() {
  if (cache.winsw) return cache.winsw;
  const W = 256, H = 128, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#0b0c0d';
  x.fillRect(0, 0, W, H);
  for (let i = 0; i < 4; i++) {
    const cx = 32 + i * 64;
    const gg = x.createLinearGradient(0, 30, 0, 98);
    gg.addColorStop(0, '#3a3d42');
    gg.addColorStop(1, '#17191c');
    x.fillStyle = gg;
    roundRect(x, cx - 22, 30, 44, 68, 10);
    x.fill();
    x.fillStyle = '#c9ced4';
    x.beginPath(); x.moveTo(cx, 46); x.lineTo(cx - 7, 56); x.lineTo(cx + 7, 56); x.fill();
  }
  return (cache.winsw = tex(c, { repeat: false }));
}

/** Roundel logo for the steering wheel boss. */
/** Steering-wheel emblem: each fictional maker gets its own mark (no real-brand roundels). */
export function badgeTexture(maker, colors) {
  const key = 'badge' + maker;
  if (cache[key]) return cache[key];
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  x.clearRect(0, 0, S, S);
  const cx = S / 2;
  const [c1, c2] = colors || ['#c9ccd0', '#111'];
  const silver = '#d4d7db';
  x.lineJoin = 'round';
  const shape = {
    // stylised wind swirl in a blue oval
    KAZE: () => {
      x.fillStyle = c1; x.beginPath(); x.ellipse(cx, cx, 120, 78, 0, 0, Math.PI * 2); x.fill();
      x.strokeStyle = silver; x.lineWidth = 8; x.stroke();
      x.strokeStyle = c2; x.lineWidth = 12; x.lineCap = 'round';
      for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(cx - 10 + k * 22, cx + 10, 40 - k * 9, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); }
    },
    // cherry blossom: five petals in red
    SAKURA: () => {
      x.fillStyle = c1;
      for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2 - Math.PI / 2; x.beginPath(); x.ellipse(cx + Math.cos(a) * 52, cx + Math.sin(a) * 52, 40, 54, a + Math.PI / 2, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = silver; x.beginPath(); x.arc(cx, cx, 26, 0, Math.PI * 2); x.fill();
    },
    // lightning bolt in a silver shield-less ring
    RAIDEN: () => {
      x.strokeStyle = silver; x.lineWidth = 14; x.beginPath(); x.arc(cx, cx, 108, 0, Math.PI * 2); x.stroke();
      x.fillStyle = c1; x.beginPath(); x.moveTo(cx + 18, cx - 92); x.lineTo(cx - 46, cx + 12); x.lineTo(cx - 2, cx + 12); x.lineTo(cx - 22, cx + 94); x.lineTo(cx + 48, cx - 18); x.lineTo(cx + 4, cx - 18); x.closePath(); x.fill();
    },
    // hexagon with a K monogram
    KESSLER: () => {
      x.fillStyle = '#0d0f12'; x.beginPath();
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; x.lineTo(cx + Math.cos(a) * 118, cx + Math.sin(a) * 118); }
      x.closePath(); x.fill(); x.strokeStyle = silver; x.lineWidth = 9; x.stroke();
      x.fillStyle = c1; x.font = 'bold 150px Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('K', cx, cx + 8);
    },
    // crest: shield with a horizontal band
    STRADA: () => {
      x.fillStyle = c1; x.beginPath(); x.moveTo(cx - 92, cx - 104); x.lineTo(cx + 92, cx - 104); x.lineTo(cx + 92, cx + 10); x.quadraticCurveTo(cx + 88, cx + 92, cx, cx + 120); x.quadraticCurveTo(cx - 88, cx + 92, cx - 92, cx + 10); x.closePath(); x.fill();
      x.strokeStyle = silver; x.lineWidth = 8; x.stroke();
      x.fillStyle = c2; x.fillRect(cx - 92, cx - 30, 184, 34);
      x.fillStyle = silver; x.font = 'bold 40px Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STRADA', cx, cx - 13);
    },
    // galloping-horse-free mark: a horseshoe
    IRONHORSE: () => {
      x.strokeStyle = silver; x.lineWidth = 30; x.lineCap = 'butt'; x.beginPath(); x.arc(cx, cx + 6, 78, Math.PI * 0.82, Math.PI * 2.18); x.stroke();
      x.fillStyle = c1; for (let k = 0; k < 6; k++) { const a = Math.PI * (0.9 + k * 0.24); x.beginPath(); x.arc(cx + Math.cos(a) * 78, cx + 6 + Math.sin(a) * 78, 6, 0, Math.PI * 2); x.fill(); }
    },
    // angular V in a hexagonal shield
    VELOCE: () => {
      x.fillStyle = '#0b0b0c'; x.beginPath(); x.moveTo(cx - 100, cx - 110); x.lineTo(cx + 100, cx - 110); x.lineTo(cx + 100, cx + 30); x.lineTo(cx, cx + 120); x.lineTo(cx - 100, cx + 30); x.closePath(); x.fill();
      x.strokeStyle = c1; x.lineWidth = 9; x.stroke();
      x.fillStyle = c1; x.beginPath(); x.moveTo(cx - 62, cx - 70); x.lineTo(cx - 30, cx - 70); x.lineTo(cx, cx + 26); x.lineTo(cx + 30, cx - 70); x.lineTo(cx + 62, cx - 70); x.lineTo(cx, cx + 80); x.closePath(); x.fill();
    },
    // stylised A as two blades
    AETHER: () => {
      x.fillStyle = c1;
      x.beginPath(); x.moveTo(cx, cx - 112); x.lineTo(cx + 22, cx - 112); x.lineTo(cx + 104, cx + 104); x.lineTo(cx + 62, cx + 104); x.closePath(); x.fill();
      x.beginPath(); x.moveTo(cx, cx - 112); x.lineTo(cx - 22, cx - 112); x.lineTo(cx - 104, cx + 104); x.lineTo(cx - 62, cx + 104); x.closePath(); x.fill();
      x.fillRect(cx - 44, cx + 22, 88, 18);
    },
  }[String(maker).toUpperCase()];
  if (shape) shape();
  else { x.fillStyle = c1; x.beginPath(); x.arc(cx, cx, 110, 0, Math.PI * 2); x.fill(); }
  return (cache[key] = tex(c, { repeat: false }));
}

/** Woven seat cloth / belt webbing (bump). */
export function weaveBump() {
  if (cache.weave) return cache.weave;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#808080'; x.fillRect(0, 0, S, S);
  for (let j = 0; j < S; j += 4) for (let i = 0; i < S; i += 4) {
    const on = ((i + j) >> 2) % 2;
    x.fillStyle = on ? '#a8a8a8' : '#5c5c5c';
    x.fillRect(i, j, on ? 4 : 2, on ? 2 : 4);
  }
  const r = rng(31);
  for (let i = 0; i < 1400; i++) { const v = 90 + r() * 80; x.fillStyle = `rgba(${v},${v},${v},0.4)`; x.fillRect(r() * S, r() * S, 1, 1); }
  return (cache.weave = tex(c, { srgb: false }));
}

/** Suede / alcantara nap (bump). */
export function alcantaraBump() {
  if (cache.alc) return cache.alc;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const img = x.createImageData(S, S);
  const r = rng(41);
  let prev = 128;
  for (let i = 0; i < S * S; i++) {
    prev = prev * 0.55 + (100 + r() * 60) * 0.45;
    const v = Math.round(prev);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  return (cache.alc = tex(c, { srgb: false }));
}

/** Diamond-quilted leather (bump): raised cushions, sunken stitched seams. */
export function quiltBump() {
  if (cache.quilt) return cache.quilt;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#9a9a9a'; x.fillRect(0, 0, S, S);
  x.strokeStyle = '#3a3a3a'; x.lineWidth = 5;
  for (let k = -S; k < S * 2; k += 64) {
    x.beginPath(); x.moveTo(k, 0); x.lineTo(k + S, S); x.stroke();
    x.beginPath(); x.moveTo(k, S); x.lineTo(k + S, 0); x.stroke();
  }
  x.strokeStyle = '#d0d0d0'; x.lineWidth = 1; x.setLineDash([3, 4]);
  for (let k = -S; k < S * 2; k += 64) {
    x.beginPath(); x.moveTo(k + 5, 0); x.lineTo(k + S + 5, S); x.stroke();
    x.beginPath(); x.moveTo(k + 5, S); x.lineTo(k + S + 5, 0); x.stroke();
  }
  return (cache.quilt = tex(c, { srgb: false }));
}

/** Vertical pleats with stitched seams (sport seat centre panels, bump). */
export function channelBump() {
  if (cache.channel) return cache.channel;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  for (let i = 0; i < S; i++) {
    const f = (i % 32) / 32;
    const v = Math.round(90 + 90 * Math.sin(f * Math.PI));
    x.fillStyle = `rgb(${v},${v},${v})`; x.fillRect(i, 0, 1, S);
  }
  x.fillStyle = '#d8d8d8';
  for (let i = 0; i < S; i += 32) for (let y = 0; y < S; y += 6) x.fillRect(i + 2, y, 1, 3);
  return (cache.channel = tex(c, { srgb: false }));
}

/** Perforated leather (bump), for comfort seat centres. */
export function perforatedBump() {
  if (cache.perf) return cache.perf;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#909090'; x.fillRect(0, 0, S, S);
  x.fillStyle = '#303030';
  for (let j = 0; j < S; j += 8) for (let i = (j / 8) % 2 ? 4 : 0; i < S; i += 8) { x.beginPath(); x.arc(i, j, 1.4, 0, Math.PI * 2); x.fill(); }
  return (cache.perf = tex(c, { srgb: false }));
}

/** Open-pore walnut veneer. */
export function woodTexture() {
  if (cache.wood) return cache.wood;
  const W = 512, H = 128, c = canvas(W, H), x = c.getContext('2d');
  const r = rng(53);
  x.fillStyle = '#4a2c18'; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) {
    const y0 = r() * H, amp = 3 + r() * 10, f = 0.004 + r() * 0.01, ph = r() * 6;
    const v = r();
    x.strokeStyle = v < 0.5 ? `rgba(28,15,7,${0.25 + r() * 0.35})` : `rgba(120,78,44,${0.15 + r() * 0.25})`;
    x.lineWidth = 0.6 + r() * 2.2;
    x.beginPath();
    for (let px = 0; px <= W; px += 8) x.lineTo(px, y0 + Math.sin(px * f + ph) * amp + Math.sin(px * f * 3.1 + ph) * amp * 0.25);
    x.stroke();
  }
  for (let i = 0; i < 3000; i++) { x.fillStyle = 'rgba(20,10,4,0.35)'; x.fillRect(r() * W, r() * H, 2, 1); }
  return (cache.wood = tex(c));
}

/** Short-pile carpet (bump). */
export function carpetBump() {
  if (cache.carpet) return cache.carpet;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  const img = x.createImageData(S, S);
  const r = rng(61);
  for (let i = 0; i < S * S; i++) { const v = 80 + Math.floor(r() * 110); img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255; }
  x.putImageData(img, 0, 0);
  return (cache.carpet = tex(c, { srgb: false }));
}

/** Red-tracer carbon weave (hot-hatch trim). */
export function redCarbonTexture() {
  if (cache.redCarbon) return cache.redCarbon;
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  const n = 8, cell = S / n;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const horiz = ((i + j) >> 1) % 2 === 0;
    const g = horiz ? x.createLinearGradient(0, j * cell, 0, (j + 1) * cell) : x.createLinearGradient(i * cell, 0, (i + 1) * cell, 0);
    g.addColorStop(0, '#1a0204'); g.addColorStop(0.5, horiz ? '#b0121f' : '#6e0a13'); g.addColorStop(1, '#1a0204');
    x.fillStyle = g; x.fillRect(i * cell, j * cell, cell, cell);
  }
  return (cache.redCarbon = tex(c));
}

/** Early-90s head unit: tape slot, buttons and a green LCD. */
export function radioTexture() {
  if (cache.radio) return cache.radio;
  const W = 512, H = 160, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#141416'; x.fillRect(0, 0, W, H);
  x.fillStyle = '#0a0a0b'; x.fillRect(20, 20, 300, 36);
  x.fillStyle = '#2a2b2e'; x.fillRect(24, 34, 292, 6); // cassette slot
  x.fillStyle = '#0d1a0d'; x.fillRect(20, 70, 210, 52);
  x.fillStyle = '#7dff7a'; x.font = 'bold 34px "Courier New", monospace'; x.textBaseline = 'middle';
  x.fillText('FM1 104.7', 30, 97);
  x.font = 'bold 14px Arial'; x.fillStyle = '#c8c8cc';
  for (let i = 0; i < 6; i++) {
    x.fillStyle = '#2c2d31'; x.fillRect(248 + (i % 3) * 52, 70 + Math.floor(i / 3) * 30, 46, 24);
    x.fillStyle = '#c8c8cc'; x.fillText(String(i + 1), 266 + (i % 3) * 52, 83 + Math.floor(i / 3) * 30);
  }
  x.fillStyle = '#2c2d31'; x.beginPath(); x.arc(420, 80, 46, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#3c3d42'; x.beginPath(); x.arc(420, 80, 34, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#c8c8cc'; x.fillText('VOL', 406, 140); x.fillText('TAPE', 340, 40);
  return (cache.radio = tex(c, { repeat: false }));
}

/** Slider climate panel for the 90s coupe. */
export function slidersTexture() {
  if (cache.sliders) return cache.sliders;
  const W = 512, H = 128, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#18181a'; x.fillRect(0, 0, W, H);
  const labels = ['TEMP', 'FAN', 'MODE', 'A/C'];
  x.font = 'bold 18px Arial'; x.textAlign = 'center';
  labels.forEach((l, i) => {
    const cxx = 64 + i * 128;
    x.fillStyle = '#0a0a0b'; x.fillRect(cxx - 46, 46, 92, 10);
    x.fillStyle = '#c9c9cc'; x.fillRect(cxx - 10 + (i - 1.5) * 12, 38, 20, 26);
    x.fillStyle = '#b8b8bc'; x.fillText(l, cxx, 26);
    if (i === 0) { x.fillStyle = '#4a86ff'; x.fillRect(cxx - 46, 80, 40, 6); x.fillStyle = '#ff4a3a'; x.fillRect(cxx + 6, 80, 40, 6); }
  });
  return (cache.sliders = tex(c, { repeat: false }));
}

/** Labelled row of toggle switches (muscle / supercar). */
export function toggleLabelTexture(labels, color = '#d8d8dc') {
  const key = 'tog' + labels.join();
  if (cache[key]) return cache[key];
  const W = 512, H = 96, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#111113'; x.fillRect(0, 0, W, H);
  x.font = 'bold 16px Arial'; x.textAlign = 'center'; x.fillStyle = color;
  labels.forEach((l, i) => x.fillText(l, (W / labels.length) * (i + 0.5), 84));
  return (cache[key] = tex(c, { repeat: false }));
}

/** Drilled and slotted brake disc face with a dark hat. */
export function brakeDiscTexture() {
  if (cache.disc) return cache.disc;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const cx = S / 2;
  x.fillStyle = '#7d8187'; x.fillRect(0, 0, S, S);
  const r = rng(71);
  for (let i = 0; i < 600; i++) { const a = r() * Math.PI * 2, rr = 70 + r() * 56; x.fillStyle = `rgba(${90 + r() * 60},${90 + r() * 60},${95 + r() * 60},0.35)`; x.beginPath(); x.arc(cx + Math.cos(a) * rr, cx + Math.sin(a) * rr, 2 + r() * 3, 0, Math.PI * 2); x.fill(); }
  x.strokeStyle = 'rgba(60,62,66,0.9)'; x.lineWidth = 2;
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; x.beginPath(); x.arc(cx, cx, 98, a, a + 0.35); x.stroke(); }
  x.fillStyle = '#2b2c2f';
  for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2; for (const rr of [86, 110]) { const aa = a + (rr > 100 ? 0.13 : 0); x.beginPath(); x.arc(cx + Math.cos(aa) * rr, cx + Math.sin(aa) * rr, 3.2, 0, Math.PI * 2); x.fill(); } }
  x.fillStyle = '#26272a'; x.beginPath(); x.arc(cx, cx, 64, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#3a3b3f'; for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; x.beginPath(); x.arc(cx + Math.cos(a) * 34, cx + Math.sin(a) * 34, 7, 0, Math.PI * 2); x.fill(); }
  return (cache.disc = tex(c, { repeat: false }));
}

/** Racing glove: light grey suede with darker knuckle panel and seam lines. */
export function gloveTexture() {
  if (cache.glove) return cache.glove;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#9a9ea6';
  x.fillRect(0, 0, S, S);
  const r = rng(5);
  for (let i = 0; i < 4000; i++) {
    const v = 140 + Math.floor(r() * 40);
    x.fillStyle = `rgba(${v},${v + 2},${v + 8},0.25)`;
    x.fillRect(r() * S, r() * S, 2, 2);
  }
  x.fillStyle = '#4a4e56';
  roundRect(x, 30, 60, 196, 70, 30);
  x.fill();
  x.strokeStyle = 'rgba(40,42,48,0.8)';
  x.lineWidth = 2;
  for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(40 + i * 55, 140); x.lineTo(40 + i * 55, 250); x.stroke(); }
  return (cache.glove = tex(c, { repeat: false }));
}

/** Soft vertical falloff used for light-pipe spill on the dash and doors. */
export function glowStripTexture() {
  if (cache.glowStrip) return cache.glowStrip;
  const c = canvas(4, 64), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.5, 'rgba(255,255,255,1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 4, 64);
  return (cache.glowStrip = tex(c, { srgb: false, repeat: false }));
}

/** Fine orange-peel ripple for clear-coated paint (tangent-space normal map, very subtle). */
export function orangePeelNormal() {
  if (cache.peel) return cache.peel;
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  const r = rng(83);
  // height field: overlapping soft bumps, tiled
  const hgt = new Float32Array(S * S);
  for (let k = 0; k < 900; k++) {
    const cx = r() * S, cy = r() * S, rad = 3 + r() * 6, a = 0.4 + r() * 0.6;
    for (let dy = -rad; dy <= rad; dy++) for (let dx = -rad; dx <= rad; dx++) {
      const d2 = (dx * dx + dy * dy) / (rad * rad);
      if (d2 > 1) continue;
      const px = (Math.floor(cx + dx) + S) % S, py = (Math.floor(cy + dy) + S) % S;
      hgt[py * S + px] += a * (1 - d2) * (1 - d2);
    }
  }
  const img = x.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let xx = 0; xx < S; xx++) {
    const h = (i, j) => hgt[((j + S) % S) * S + ((i + S) % S)];
    const nx = (h(xx - 1, y) - h(xx + 1, y)) * 0.5, ny = (h(xx, y - 1) - h(xx, y + 1)) * 0.5;
    const l = Math.hypot(nx, ny, 1);
    const o = (y * S + xx) * 4;
    img.data[o] = Math.round((nx / l * 0.5 + 0.5) * 255);
    img.data[o + 1] = Math.round((ny / l * 0.5 + 0.5) * 255);
    img.data[o + 2] = Math.round((1 / l * 0.5 + 0.5) * 255);
    img.data[o + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  return (cache.peel = tex(c, { srgb: false }));
}

/**
 * Headlamp internals atlas (512 x 128). u 0..0.75: a slim lamp (gunmetal housing, two chrome reflector bowls
 * around the projector positions, faceted reflector lines, a light-guide edge); u 0.75..1: a round lamp
 * (concentric reflector rings). Used as colour + emissive map, so at night only the reflectors glow.
 */
export function headlampTexture() {
  if (cache.headlamp) return cache.headlamp;
  const c = canvas(512, 128), x = c.getContext('2d');
  const bg = x.createLinearGradient(0, 0, 0, 128);
  bg.addColorStop(0, '#3b4148');
  bg.addColorStop(1, '#16191d');
  x.fillStyle = bg;
  x.fillRect(0, 0, 512, 128);
  // faceted reflector lines
  x.fillStyle = 'rgba(120,130,142,0.28)';
  for (let y = 4; y < 128; y += 7) x.fillRect(0, y, 384, 1);
  const bowl = (cx, cy, R, rings) => {
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, R);
    for (const [s, col] of rings) g.addColorStop(s, col);
    x.fillStyle = g;
    x.beginPath();
    x.ellipse(cx, cy, R, R, 0, 0, Math.PI * 2);
    x.fill();
  };
  const slimRings = [[0, '#0b0d10'], [0.34, '#0e1013'], [0.4, '#f4f7fa'], [0.5, '#c3cad2'], [0.72, '#5c646d'], [0.92, '#2b3036'], [1, 'rgba(43,48,54,0)']];
  for (const f of [0.28, 0.6]) bowl(f * 384, 66, 58, slimRings);
  // chrome outline ring around each bowl
  x.strokeStyle = 'rgba(235,240,246,0.7)';
  x.lineWidth = 2;
  for (const f of [0.28, 0.6]) { x.beginPath(); x.arc(f * 384, 66, 50, 0, Math.PI * 2); x.stroke(); }
  // light guide along the top edge and a chrome inner frame
  x.fillStyle = '#e4ebf2';
  x.fillRect(6, 9, 372, 3);
  x.fillStyle = 'rgba(210,218,226,0.6)';
  x.fillRect(0, 0, 384, 2);
  x.fillRect(0, 126, 384, 2);
  // round lamp
  x.fillStyle = '#16191d';
  x.fillRect(384, 0, 128, 128);
  bowl(448, 64, 64, [[0, '#0b0d10'], [0.3, '#0f1114'], [0.36, '#e9eef3'], [0.58, '#9aa3ad'], [0.84, '#4a5159'], [1, '#2a2e33']]);
  return (cache.headlamp = tex(c, { srgb: true, repeat: false }));
}

/** Tail-lamp lens (256 x 64): dark red with a grid of LED cells and a light-guide line, as colour + emissive map. */
export function taillampTexture() {
  if (cache.taillamp) return cache.taillamp;
  const c = canvas(256, 64), x = c.getContext('2d');
  const bg = x.createLinearGradient(0, 0, 0, 64);
  bg.addColorStop(0, '#5a0808');
  bg.addColorStop(0.5, '#2c0404');
  bg.addColorStop(1, '#430606');
  x.fillStyle = bg;
  x.fillRect(0, 0, 256, 64);
  // optic cells: each a small bright core in a darker pocket
  for (let j = 0; j < 4; j++) for (let i = 0; i < 24; i++) {
    const cx = 6 + i * 10.4 + (j % 2) * 5, cy = 10 + j * 14;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 6);
    g.addColorStop(0, '#ff4a3a');
    g.addColorStop(0.45, '#b01410');
    g.addColorStop(1, 'rgba(60,6,6,0)');
    x.fillStyle = g;
    x.fillRect(cx - 6, cy - 6, 12, 12);
  }
  // light guide
  x.fillStyle = '#ff3a2c';
  x.fillRect(0, 2, 256, 3);
  return (cache.taillamp = tex(c, { srgb: true, repeat: false }));
}
