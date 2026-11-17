// Tokyo expressway assets: Japanese direction boards, curve-wall stripes, tunnel lining, sound walls,
// neon shop signs, painted road text, parapet lamps and a lattice broadcast tower for the skyline.
// Japanese text uses the system's Japanese fonts; where none is installed, signs fall back to romaji.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry32 } from '../core/utils.js';

export const JP_FONT = '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", YuGothic, Meiryo, "Noto Sans CJK JP", "Noto Sans JP", "Source Han Sans", "MS Gothic", sans-serif';
const EN_FONT = '"Barlow Condensed", "Arial Narrow", Arial, sans-serif';
const SIGN_GREEN = '#0b7a46';

let _jpOK = null;
/** Can this device draw Japanese characters (is a Japanese font installed)? */
export function canDrawJapanese() {
  if (_jpOK !== null) return _jpOK;
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 40;
    const x = c.getContext('2d', { willReadFrequently: true });
    const draw = (ch) => { x.clearRect(0, 0, 40, 40); x.font = `32px ${JP_FONT}`; x.fillStyle = '#000'; x.textBaseline = 'top'; x.fillText(ch, 2, 2); return x.getImageData(0, 0, 40, 40).data; };
    // a real glyph differs from the "missing glyph" box that an unassigned code point draws
    const a = draw('羽'), b = draw('\u{10FFFD}');
    let diff = 0, ink = 0;
    for (let i = 3; i < a.length; i += 4) { if (a[i] !== b[i]) diff++; if (a[i] > 128) ink++; }
    _jpOK = diff > 40 && ink > 40;
  } catch { _jpOK = false; }
  return _jpOK;
}

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, { srgb = true, repeat = false, aniso = 4 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = aniso;
  return t;
}
function roundRect(x, X, Y, w, h, r) {
  x.beginPath();
  x.moveTo(X + r, Y); x.lineTo(X + w - r, Y); x.quadraticCurveTo(X + w, Y, X + w, Y + r);
  x.lineTo(X + w, Y + h - r); x.quadraticCurveTo(X + w, Y + h, X + w - r, Y + h);
  x.lineTo(X + r, Y + h); x.quadraticCurveTo(X, Y + h, X, Y + h - r);
  x.lineTo(X, Y + r); x.quadraticCurveTo(X, Y, X + r, Y);
  x.closePath();
}
/** Fit text into a width by squeezing it horizontally (as sign makers do), never stretching. */
function fitText(x, text, cx, cy, maxW) {
  const w = x.measureText(text).width;
  const k = Math.min(1, maxW / Math.max(1, w));
  x.save(); x.translate(cx, cy); x.scale(k, 1); x.fillText(text, 0, 0); x.restore();
}

/* ------------------------------------------------------------ direction boards */
/** Route marker: a white rounded hexagon with the route code in green (blue for the Bayshore route). */
function routeMarker(x, cx, cy, code, s = 1) {
  const w = (code.length > 1 ? 74 : 60) * s, h = 50 * s, k = 13 * s;
  x.save();
  x.fillStyle = '#f4f6f2';
  x.beginPath();
  x.moveTo(cx - w / 2 + k, cy - h / 2); x.lineTo(cx + w / 2 - k, cy - h / 2); x.lineTo(cx + w / 2, cy);
  x.lineTo(cx + w / 2 - k, cy + h / 2); x.lineTo(cx - w / 2 + k, cy + h / 2); x.lineTo(cx - w / 2, cy);
  x.closePath();
  x.fill();
  x.fillStyle = code === 'B' ? '#1a4fa8' : SIGN_GREEN;
  x.font = `bold ${Math.round(40 * s)}px ${EN_FONT}`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(code, cx, cy + 2 * s);
  x.restore();
}

function arrow(x, cx, cy, dir, size = 1) {
  x.save();
  x.translate(cx, cy);
  x.rotate(dir === 'left' ? -Math.PI / 4 : dir === 'right' ? Math.PI / 4 : 0);
  x.scale(size, size);
  x.fillStyle = '#f4f6f2';
  x.beginPath();
  x.moveTo(0, -78); x.lineTo(38, -30); x.lineTo(13, -30); x.lineTo(13, 74); x.lineTo(-13, 74); x.lineTo(-13, -30); x.lineTo(-38, -30);
  x.closePath();
  x.fill();
  x.restore();
}

function plane(x, cx, cy) {
  x.save();
  x.translate(cx, cy);
  x.rotate(-Math.PI / 4);
  x.fillStyle = '#f4f6f2';
  x.beginPath();
  x.ellipse(0, 0, 6, 30, 0, 0, Math.PI * 2);
  x.moveTo(0, -4); x.lineTo(28, 8); x.lineTo(28, 14); x.lineTo(0, 8); x.lineTo(-28, 14); x.lineTo(-28, 8); x.closePath();
  x.moveTo(0, 22); x.lineTo(12, 30); x.lineTo(-12, 30); x.closePath();
  x.fill();
  x.restore();
}

/**
 * Green expressway direction board (6.4 x 3.6 m): route markers on the left, destinations in kanji with
 * romaji under each, and a lane arrow. spec: { to: [[kanji, romaji], ...], routes, arrow, exit, plane }.
 */
export function jpSignTexture(spec, seed = 1) {
  const W = 640, H = 360;
  const c = canvas(W, H), x = c.getContext('2d');
  const jp = canDrawJapanese();
  x.fillStyle = SIGN_GREEN;
  x.fillRect(0, 0, W, H);
  // weathering: faint streaks and a slightly lighter top
  const rng = mulberry32(seed);
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, 'rgba(255,255,255,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0.08)');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 14; i++) { x.fillStyle = `rgba(0,0,0,${0.03 + rng() * 0.04})`; x.fillRect(rng() * W, rng() * 40, 2 + rng() * 4, 60 + rng() * 220); }
  x.strokeStyle = '#f2f4f0';
  x.lineWidth = 7;
  roundRect(x, 9, 9, W - 18, H - 18, 16);
  x.stroke();
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  let top = 30;
  if (spec.exit) {
    // exit tag: 出口 / EXIT in a white box
    x.fillStyle = '#f4f6f2';
    roundRect(x, 26, 24, 150, 64, 8); x.fill();
    x.fillStyle = SIGN_GREEN;
    if (jp) { x.font = `bold 40px ${JP_FONT}`; x.fillText('出口', 72, 57); x.font = `bold 26px ${EN_FONT}`; x.fillText('EXIT', 140, 59); }
    else { x.font = `bold 44px ${EN_FONT}`; x.fillText('EXIT', 101, 58); }
    top = 92;
  }
  // route markers, stacked on the left
  const routes = spec.routes || [];
  routes.forEach((r, i) => routeMarker(x, 84, top + 34 + i * 62, r));
  if (spec.plane) plane(x, 84, top + 34 + routes.length * 62 + 20);
  // destinations
  const rows = spec.to.slice(0, 2);
  const x0 = 158, x1 = spec.arrow ? 500 : 600;
  const rowH = (H - top - 26) / rows.length;
  rows.forEach(([kan, rom], i) => {
    const cy = top + rowH * (i + 0.5);
    const cx = (x0 + x1) / 2;
    x.fillStyle = '#f4f6f2';
    if (jp) {
      x.font = `bold ${rows.length > 1 ? 70 : 92}px ${JP_FONT}`;
      fitText(x, kan.split('').join(kan.length <= 2 ? ' ' : ''), cx, cy - (rows.length > 1 ? 18 : 24), x1 - x0);
      x.font = `600 ${rows.length > 1 ? 28 : 36}px ${EN_FONT}`;
      fitText(x, rom, cx, cy + (rows.length > 1 ? 34 : 50), x1 - x0);
    } else {
      x.font = `600 ${rows.length > 1 ? 62 : 78}px ${EN_FONT}`;
      fitText(x, rom, cx, cy, x1 - x0);
    }
  });
  if (rows.length > 1) { x.fillStyle = 'rgba(244,246,242,0.85)'; x.fillRect(x0 + 10, top + rowH - 2, x1 - x0 - 20, 3); }
  if (spec.arrow) arrow(x, 562, H / 2 + 8, spec.arrow, 1.1);
  return tex(c);
}

/* ------------------------------------------------------------ walls */
/** Red and white diagonal stripes painted along the walls on bends. */
export function stripeTexture() {
  const c = canvas(256, 64), x = c.getContext('2d');
  x.fillStyle = '#efefe9';
  x.fillRect(0, 0, 256, 64);
  x.fillStyle = '#c8202e';
  for (let i = -2; i < 6; i++) {
    x.beginPath();
    x.moveTo(i * 64, 64); x.lineTo(i * 64 + 32, 64); x.lineTo(i * 64 + 96, 0); x.lineTo(i * 64 + 64, 0);
    x.closePath(); x.fill();
  }
  // grime along the bottom edge
  const g = x.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(40,30,20,0.18)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64);
  return tex(c, { repeat: true });
}

/** Light grey cast concrete with formwork joints and rain streaks (walls, decks, piers). */
export function shutokoConcrete(seed = 1) {
  const W = 512, H = 256, c = canvas(W, H), x = c.getContext('2d');
  const rng = mulberry32(seed);
  x.fillStyle = '#c9cac6'; x.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) {
    const v = 180 + rng() * 50;
    x.fillStyle = `rgba(${v},${v},${v - 4},${0.05 + rng() * 0.08})`;
    x.fillRect(rng() * W, rng() * H, 2 + rng() * 6, 2 + rng() * 4);
  }
  // formwork panel joints
  x.fillStyle = 'rgba(70,70,68,0.22)';
  for (let px = 0; px < W; px += 128) x.fillRect(px, 0, 2, H);
  x.fillRect(0, H * 0.5, W, 1);
  // rain streaks running down from the top
  for (let i = 0; i < 40; i++) {
    const sx = rng() * W, len = 30 + rng() * 140;
    const g = x.createLinearGradient(0, 0, 0, len);
    g.addColorStop(0, `rgba(60,58,52,${0.18 + rng() * 0.2})`); g.addColorStop(1, 'rgba(60,58,52,0)');
    x.fillStyle = g; x.fillRect(sx, 0, 1 + rng() * 3, len);
  }
  return tex(c, { repeat: true });
}

/** Tunnel lining: cream enamel panels above a darker grimy band, with a maintenance stripe. */
export function tunnelTexture() {
  const W = 256, H = 256, c = canvas(W, H), x = c.getContext('2d');
  x.fillStyle = '#d8d4c8'; x.fillRect(0, 0, W, H);
  // panel grid
  x.strokeStyle = 'rgba(80,78,70,0.35)'; x.lineWidth = 2;
  for (let px = 0; px <= W; px += 64) { x.beginPath(); x.moveTo(px, 0); x.lineTo(px, H); x.stroke(); }
  for (let py = 0; py <= H * 0.62; py += 48) { x.beginPath(); x.moveTo(0, py); x.lineTo(W, py); x.stroke(); }
  // lower band, dirtier from spray
  const g = x.createLinearGradient(0, H * 0.62, 0, H);
  g.addColorStop(0, '#9b978c'); g.addColorStop(1, '#5d5a54');
  x.fillStyle = g; x.fillRect(0, H * 0.62, W, H * 0.38);
  x.fillStyle = '#2f6b45'; x.fillRect(0, H * 0.6, W, 6);
  return tex(c, { repeat: true });
}

/** Painted road text atlas (2 x 2 cells): 速度落せ ("slow down"), 車間距離 ("keep distance"), 60, 50. */
export function roadPaintTexture() {
  const c = canvas(512, 512), x = c.getContext('2d');
  x.clearRect(0, 0, 512, 512);
  const jp = canDrawJapanese();
  const cells = jp ? ['速度落せ', '車間確認', '60', '50'] : ['SLOW', 'KEEP GAP', '60', '50'];
  x.textAlign = 'center'; x.textBaseline = 'middle';
  cells.forEach((t, i) => {
    const cx = (i % 2) * 256 + 128, cy = Math.floor(i / 2) * 256 + 128;
    x.fillStyle = t === '60' || t === '50' ? 'rgba(242,242,236,0.95)' : 'rgba(240,240,234,0.92)';
    x.font = /^[0-9]+$/.test(t) ? `bold 200px ${EN_FONT}` : `bold ${jp ? 58 : 64}px ${jp ? JP_FONT : EN_FONT}`;
    fitText(x, t, cx, cy + 6, 236);
  });
  // worn paint: knock out speckles
  const rng = mulberry32(7);
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(0,0,0,${0.3 + rng() * 0.6})`; x.fillRect(rng() * 512, rng() * 512, 1 + rng() * 3, 1 + rng() * 3); }
  x.globalCompositeOperation = 'source-over';
  const t = tex(c);
  t.premultiplyAlpha = false;
  return t;
}

/** Tunnel name plates (4 stacked cells): kanji name and romaji on a dark panel. */
export function tunnelNameTexture() {
  const c = canvas(512, 384), x = c.getContext('2d');
  const jp = canDrawJapanese();
  const names = [['山手トンネル', 'YAMATE TUNNEL'], ['羽田トンネル', 'HANEDA TUNNEL'], ['八重洲トンネル', 'YAESU TUNNEL'], ['東京港トンネル', 'TOKYO PORT TUNNEL']];
  x.textAlign = 'center'; x.textBaseline = 'middle';
  names.forEach(([k, r], i) => {
    const y = i * 96;
    x.fillStyle = '#1d2a3a'; x.fillRect(0, y, 512, 96);
    x.strokeStyle = '#e8eef4'; x.lineWidth = 4; x.strokeRect(6, y + 6, 500, 84);
    x.fillStyle = '#f2f4f6';
    if (jp) { x.font = `bold 44px ${JP_FONT}`; fitText(x, k, 256, y + 38, 470); x.font = `600 22px ${EN_FONT}`; fitText(x, r, 256, y + 74, 470); }
    else { x.font = `600 46px ${EN_FONT}`; fitText(x, r, 256, y + 50, 470); }
  });
  return tex(c);
}

/* ------------------------------------------------------------ neon & shop signs */
const NEON_JP = ['ホテル', 'カラオケ', 'ラーメン', '居酒屋', '駐車場', '焼肉', '寿司', 'ゲーム', '薬局', '24時間', '不動産', '歯科', '中古車', 'カフェ', 'ビジネスホテル', '電器', '英会話', '整骨院'];
const NEON_EN = ['HOTEL', 'KARAOKE', 'RAMEN', 'BAR', 'PARKING', 'SUSHI', 'GAMES', 'PHARMACY', '24H', 'CAFE', 'DENTAL', 'CARS'];
const NEON_COLS = ['#ff3b5c', '#29d8ff', '#ffd23a', '#ff7a1a', '#7cff6b', '#ff4fd8', '#ffffff', '#4f7dff'];

/**
 * Atlas of shop signs (4 columns x 4 rows): vertical tate-kanban (tall cells) and horizontal rooftop boards.
 * Colour and emissive share the canvas (signs are mostly light).
 */
export function neonAtlas(seed = 1) {
  const W = 1024, H = 1024, c = canvas(W, H), x = c.getContext('2d');
  const rng = mulberry32(seed);
  const jp = canDrawJapanese();
  const words = jp ? NEON_JP : NEON_EN;
  x.fillStyle = '#0a0a0c'; x.fillRect(0, 0, W, H);
  x.textAlign = 'center'; x.textBaseline = 'middle';
  for (let i = 0; i < 16; i++) {
    const cx0 = (i % 4) * 256, cy0 = Math.floor(i / 4) * 256;
    const vertical = i < 8; // first two rows: tall boards drawn top-to-bottom
    const col = NEON_COLS[Math.floor(rng() * NEON_COLS.length)];
    const word = words[Math.floor(rng() * words.length)];
    const boxed = rng() < 0.55;
    if (boxed) {
      // lightbox: coloured panel with dark lettering
      x.fillStyle = col; x.fillRect(cx0 + 8, cy0 + 8, 240, 240);
      x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(cx0 + 8, cy0 + 8, 240, 30);
      x.fillStyle = '#121214';
    } else {
      x.fillStyle = '#141418'; x.fillRect(cx0 + 8, cy0 + 8, 240, 240);
      x.shadowColor = col; x.shadowBlur = 18;
      x.fillStyle = col;
    }
    if (vertical && jp) {
      const chars = word.split('').slice(0, 5);
      const step = 232 / chars.length;
      x.font = `bold ${Math.min(150, step * 0.95)}px ${JP_FONT}`;
      chars.forEach((ch, k) => fitText(x, ch, cx0 + 128, cy0 + 12 + step * (k + 0.5), 230));
    } else {
      x.font = `bold ${jp ? 96 : 110}px ${jp ? JP_FONT : EN_FONT}`;
      fitText(x, word, cx0 + 128, cy0 + 128, 228);
    }
    x.shadowBlur = 0;
  }
  return tex(c);
}

/* ------------------------------------------------------------ geometry */
const box = (w, h, d, X, Y, Z) => new THREE.BoxGeometry(w, h, d).translate(X, Y, Z);
const prep = (g) => { const n = g.index ? g.toNonIndexed() : g; for (const k of Object.keys(n.attributes)) if (!['position', 'normal', 'uv'].includes(k)) n.deleteAttribute(k); if (!n.attributes.uv) n.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2)); return n; };
const merge = (list) => mergeGeometries(list.map(prep), false);

/**
 * Expressway lamp that stands on the parapet: a tapered pole curving over the lanes to a long flat
 * luminaire. Local origin at the wall top; the arm reaches toward -x (the road).
 */
export function jpLampGeometry() {
  const H = 8.6, reach = 2.7;
  const metal = [];
  metal.push(new THREE.CylinderGeometry(0.085, 0.13, H, 10).translate(0, H / 2, 0));
  metal.push(box(0.36, 0.3, 0.36, 0, 0.15, 0));
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, H - 0.4, 0), new THREE.Vector3(0, H + 0.45, 0), new THREE.Vector3(-reach, H + 0.5, 0));
  metal.push(new THREE.TubeGeometry(curve, 14, 0.07, 8, false));
  const hx = -reach - 0.55;
  metal.push(box(1.35, 0.16, 0.36, hx, H + 0.48, 0));
  metal.push(box(1.2, 0.06, 0.3, hx, H + 0.57, 0));
  const lamp = merge([box(1.15, 0.05, 0.26, hx, H + 0.38, 0)]);
  return { metal: merge(metal), lamp, lampPos: [[hx, H + 0.36, 0]] };
}

/**
 * Red-and-white lattice broadcast tower for the skyline (~330 m): four splayed legs, cross bracing,
 * two observation decks and an antenna mast, banded in aviation red and white.
 */
export function latticeTowerGeometry() {
  const red = [], white = [], deck = [];
  const Ht = 330;
  const halfAt = (y) => (y < 150 ? 44 * Math.pow(1 - y / 255, 1.6) + 4 : y < 250 ? 9.5 - (y - 150) * 0.06 : 3.5);
  const band = (y) => (Math.floor(y / 30) % 2 === 0 ? red : white);
  const strut = (a, b, r) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const g = new THREE.CylinderGeometry(r, r, len, 4, 1);
    g.translate(0, len / 2, 0);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()));
    return g.translate(a.x, a.y, a.z);
  };
  const corners = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
  const step = 10;
  for (let y = 0; y < 250; y += step) {
    const h0 = halfAt(y), h1 = halfAt(y + step);
    const list = band(y);
    for (let k = 0; k < 4; k++) {
      const [ax, az] = corners[k], [bx, bz] = corners[(k + 1) % 4];
      const A0 = new THREE.Vector3(ax * h0, y, az * h0), A1 = new THREE.Vector3(ax * h1, y + step, az * h1);
      const B0 = new THREE.Vector3(bx * h0, y, bz * h0), B1 = new THREE.Vector3(bx * h1, y + step, bz * h1);
      list.push(strut(A0, A1, y < 120 ? 1.4 : 0.9));
      list.push(strut(A0, B1, 0.35), strut(B0, A1, 0.35));
      list.push(strut(A1, B1, 0.4));
    }
  }
  // observation decks
  deck.push(new THREE.CylinderGeometry(15, 15, 9, 16).translate(0, 150, 0));
  deck.push(new THREE.CylinderGeometry(7, 7, 6, 12).translate(0, 250, 0));
  // mast
  for (let y = 250; y < Ht; y += 20) band(y).push(new THREE.CylinderGeometry(1.6 - (y - 250) * 0.015, 1.8 - (y - 250) * 0.015, 20, 6).translate(0, y + 10, 0));
  return { red: merge(red), white: merge(white), deck: merge(deck), height: Ht };
}
