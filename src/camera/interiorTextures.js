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
      g.addColorStop(0, '#0b0c0e');
      g.addColorStop(0.5, horiz ? '#2c3036' : '#23262b');
      g.addColorStop(1, '#0b0c0e');
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
export function badgeTexture(maker, colors) {
  const key = 'badge' + maker;
  if (cache[key]) return cache[key];
  const S = 256, c = canvas(S, S), x = c.getContext('2d');
  x.clearRect(0, 0, S, S);
  const cx = S / 2;
  x.fillStyle = '#c9ccd0';
  x.beginPath(); x.arc(cx, cx, 126, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#0b0c0e';
  x.beginPath(); x.arc(cx, cx, 116, 0, Math.PI * 2); x.fill();
  // quartered centre in the brand colours
  const q = colors || ['#1c69d4', '#e8eaec'];
  for (let k = 0; k < 4; k++) {
    x.fillStyle = q[k % 2];
    x.beginPath();
    x.moveTo(cx, cx);
    x.arc(cx, cx, 70, (k * Math.PI) / 2 - Math.PI / 2, ((k + 1) * Math.PI) / 2 - Math.PI / 2);
    x.closePath();
    x.fill();
  }
  x.strokeStyle = '#c9ccd0';
  x.lineWidth = 4;
  x.beginPath(); x.arc(cx, cx, 70, 0, Math.PI * 2); x.stroke();
  x.fillStyle = '#e9ecef';
  x.font = 'bold 30px Arial, sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const name = String(maker).toUpperCase().slice(0, 8);
  const n = name.length;
  for (let i = 0; i < n; i++) {
    const aa = -Math.PI / 2 + (i - (n - 1) / 2) * 0.27;
    x.save();
    x.translate(cx + Math.cos(aa) * 93, cx + Math.sin(aa) * 93);
    x.rotate(aa + Math.PI / 2);
    x.fillText(name[i], 0, 0);
    x.restore();
  }
  return (cache[key] = tex(c, { repeat: false }));
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
