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
/** Red chevron arrows on white, painted low along the outside wall of a bend (they point the way round it). */
export function stripeTexture() {
  const c = canvas(256, 64), x = c.getContext('2d');
  x.fillStyle = '#efefe9';
  x.fillRect(0, 0, 256, 64);
  x.fillStyle = '#c8202e';
  for (let i = 0; i < 4; i++) {
    const x0 = i * 64 + 8;
    x.beginPath();
    x.moveTo(x0, 6); x.lineTo(x0 + 22, 6); x.lineTo(x0 + 48, 32); x.lineTo(x0 + 22, 58); x.lineTo(x0, 58); x.lineTo(x0 + 26, 32);
    x.closePath(); x.fill();
  }
  const g = x.createLinearGradient(0, 0, 0, 64);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(40,30,20,0.2)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 64);
  return tex(c, { repeat: true });
}

/** Yellow and black diagonal hazard band along the top of the wall on sharp bends. */
export function hazardTexture() {
  const c = canvas(128, 32), x = c.getContext('2d');
  x.fillStyle = '#f2c21a';
  x.fillRect(0, 0, 128, 32);
  x.fillStyle = '#16140f';
  for (let i = -1; i < 5; i++) {
    x.beginPath();
    x.moveTo(i * 32, 32); x.lineTo(i * 32 + 16, 32); x.lineTo(i * 32 + 48, 0); x.lineTo(i * 32 + 32, 0);
    x.closePath(); x.fill();
  }
  const g = x.createLinearGradient(0, 0, 0, 32);
  g.addColorStop(0, 'rgba(0,0,0,0.12)'); g.addColorStop(0.3, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(30,25,15,0.25)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 32);
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

/**
 * Tunnel and cutting lining, as on the Shuto: small white tiles up to about head height, dark board-formed
 * concrete above with water stains, and a pair of service pipes and a cable tray running along the wall.
 * v = 0 is the top of the parapet, v = 1 is 5.3 m above it; u repeats every 4 m.
 */
export function tunnelTexture() {
  const W = 256, H = 512, c = canvas(W, H), x = c.getContext('2d');
  const rng = mulberry32(31);
  const tileTop = H * 0.56; // canvas y where the tiles stop (about 2.3 m up)
  // board-formed concrete
  x.fillStyle = '#7a7975'; x.fillRect(0, 0, W, tileTop);
  for (let i = 0; i < 1600; i++) {
    const v = 95 + rng() * 45;
    x.fillStyle = `rgba(${v},${v},${v - 3},${0.06 + rng() * 0.1})`;
    x.fillRect(rng() * W, rng() * tileTop, 2 + rng() * 8, 1 + rng() * 3);
  }
  x.fillStyle = 'rgba(40,40,38,0.28)';
  for (let py = 14; py < tileTop; py += 22) x.fillRect(0, py, W, 1);
  for (let i = 0; i < 26; i++) {
    const sx = rng() * W, len = 40 + rng() * 160;
    const g = x.createLinearGradient(0, 0, 0, len);
    g.addColorStop(0, `rgba(35,33,30,${0.2 + rng() * 0.25})`); g.addColorStop(1, 'rgba(35,33,30,0)');
    x.fillStyle = g; x.fillRect(sx, 0, 1 + rng() * 4, len);
  }
  // service pipes and a cable tray
  const pipe = (y, r, base) => {
    const g = x.createLinearGradient(0, y - r, 0, y + r);
    g.addColorStop(0, base); g.addColorStop(0.35, '#d9d9d4'); g.addColorStop(1, '#3d3c39');
    x.fillStyle = g; x.fillRect(0, y - r, W, r * 2);
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, y + r, W, 3);
    x.fillStyle = 'rgba(30,30,28,0.55)';
    for (let px = 20; px < W; px += 64) x.fillRect(px, y - r - 3, 6, r * 2 + 6);
  };
  pipe(tileTop * 0.42, 7, '#9a9994');
  pipe(tileTop * 0.55, 5, '#8c8b86');
  x.fillStyle = '#4a4946'; x.fillRect(0, tileTop * 0.72, W, 10);
  x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(0, tileTop * 0.72, W, 2);
  // tiles: 0.25 m squares (16 px across, 24 px down at this scale)
  x.fillStyle = '#e9e9e4'; x.fillRect(0, tileTop, W, H - tileTop);
  for (let ty = tileTop; ty < H; ty += 24) {
    for (let tx = 0; tx < W; tx += 16) {
      const v = 226 + rng() * 18;
      x.fillStyle = `rgb(${v},${v},${v - 4})`;
      x.fillRect(tx + 1, ty + 1, 14, 22);
    }
  }
  x.fillStyle = 'rgba(120,118,110,0.5)';
  for (let ty = tileTop; ty < H; ty += 24) x.fillRect(0, ty, W, 1);
  for (let tx = 0; tx < W; tx += 16) x.fillRect(tx, tileTop, 1, H - tileTop);
  // a dark edge where the tiles meet the concrete, and road grime creeping up from below
  x.fillStyle = '#55544f'; x.fillRect(0, tileTop - 3, W, 5);
  const gr = x.createLinearGradient(0, H * 0.82, 0, H);
  gr.addColorStop(0, 'rgba(60,56,48,0)'); gr.addColorStop(1, 'rgba(60,56,48,0.45)');
  x.fillStyle = gr; x.fillRect(0, H * 0.82, W, H * 0.18);
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

/* ------------------------------------------------------------ company signs & info boards */
// Fictional companies. Office districts along the Shuto carry lit company names on their roofs and up
// at the top of their facades, rather than shop neon.
const CORP = [
  { jp: '東都証券', en: 'TOHTO SECURITIES', bg: '#f4f6f8', fg: '#16306e', sub: '#c8202e' },
  { jp: '千代田生命', en: 'CHIYODA LIFE', bg: '#1b3f8f', fg: '#ffffff', sub: '#9fc4ff' },
  { jp: '中央信託銀行', en: 'CHUO TRUST BANK', bg: '#f4f6f8', fg: '#c8202e', sub: '#16306e' },
  { jp: '京浜商事', en: 'KEIHIN TRADING', bg: '#0f6b4a', fg: '#ffffff', sub: '#b9f0d6' },
  { jp: '日東電機', en: 'NITTO ELECTRIC', bg: '#f4f6f8', fg: '#1d5fc4', sub: '#1d5fc4' },
  { jp: '新橋産業', en: 'SHINBASHI SANGYO', bg: '#c8202e', fg: '#ffffff', sub: '#ffd0d0' },
  { jp: '東邦海運', en: 'TOHO KAIUN', bg: '#f4f6f8', fg: '#0d4c7a', sub: '#2a8bc9' },
  { jp: '光陽ホテル', en: 'KOYO HOTEL', bg: '#141a24', fg: '#e8eef6', sub: '#f2c230' },
];

/** Company signs: 2 columns x 4 rows of 2:1 lightboxes. */
export function neonAtlas() {
  const W = 1024, H = 1024, c = canvas(W, H), x = c.getContext('2d');
  const jp = canDrawJapanese();
  x.textAlign = 'center'; x.textBaseline = 'middle';
  CORP.forEach((co, i) => {
    const cx0 = (i % 2) * 512, cy0 = Math.floor(i / 2) * 256;
    x.fillStyle = '#0c0d10'; x.fillRect(cx0, cy0, 512, 256);
    x.fillStyle = co.bg; x.fillRect(cx0 + 6, cy0 + 6, 500, 244);
    // the glow of the tubes behind the face: brighter in the middle
    const g = x.createRadialGradient(cx0 + 256, cy0 + 128, 20, cx0 + 256, cy0 + 128, 300);
    g.addColorStop(0, 'rgba(255,255,255,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0.12)');
    x.fillStyle = g; x.fillRect(cx0 + 6, cy0 + 6, 500, 244);
    // logo mark
    x.fillStyle = co.sub;
    x.beginPath(); x.arc(cx0 + 62, cy0 + 112, 34, 0, Math.PI * 2); x.fill();
    x.fillStyle = co.bg;
    x.beginPath(); x.arc(cx0 + 62, cy0 + 112, 16, 0, Math.PI * 2); x.fill();
    x.fillStyle = co.fg;
    if (jp) {
      x.font = `bold 118px ${JP_FONT}`;
      fitText(x, co.jp, cx0 + 290, cy0 + 108, 380);
      x.font = `600 30px ${EN_FONT}`;
      fitText(x, co.en, cx0 + 290, cy0 + 205, 380);
    } else {
      x.font = `bold 92px ${EN_FONT}`;
      fitText(x, co.en, cx0 + 290, cy0 + 128, 390);
    }
  });
  return tex(c);
}

// Variable message boards: amber, red or green LED characters on black.
const VMS = [
  { jp: ['この先 渋滞 3km', '霞が関 15分'], en: ['CONGESTION AHEAD 3km', 'KASUMIGASEKI 15 min'], col: '#ffa31a' },
  { jp: ['湾岸線 順調', '空港中央 12分'], en: ['BAYSHORE ROUTE CLEAR', 'AIRPORT 12 min'], col: '#3cff6a' },
  { jp: ['速度落とせ', '事故多発'], en: ['SLOW DOWN', 'ACCIDENT ZONE'], col: '#ff3b2e' },
  { jp: ['工事中', '左車線 規制'], en: ['ROADWORKS', 'LEFT LANE CLOSED'], col: '#ffa31a' },
];

/** LED info board faces, 4 rows of 8:1 cells. */
export function vmsAtlas() {
  const W = 1024, H = 512, c = canvas(W, H), x = c.getContext('2d');
  const jp = canDrawJapanese();
  // draw the messages, then keep only a grid of round LED dots
  const t = canvas(W, H), y = t.getContext('2d');
  y.textBaseline = 'middle';
  VMS.forEach((m, i) => {
    const cy = i * 128 + 64;
    const [a, b] = jp ? m.jp : m.en;
    y.fillStyle = m.col;
    y.font = `bold ${jp ? 74 : 66}px ${jp ? JP_FONT : EN_FONT}`;
    y.textAlign = 'left'; fitText(y, a, 40, cy, 450);
    y.textAlign = 'right'; fitText(y, b, W - 40, cy, 450);
  });
  const dots = canvas(6, 6), d = dots.getContext('2d');
  d.fillStyle = '#fff'; d.beginPath(); d.arc(3, 3, 2.3, 0, Math.PI * 2); d.fill();
  y.globalCompositeOperation = 'destination-in';
  y.fillStyle = y.createPattern(dots, 'repeat');
  y.fillRect(0, 0, W, H);
  x.fillStyle = '#060607'; x.fillRect(0, 0, W, H);
  // unlit dots, faintly visible
  x.fillStyle = x.createPattern(dots, 'repeat'); x.globalAlpha = 0.05; x.fillRect(0, 0, W, H); x.globalAlpha = 1;
  x.drawImage(t, 0, 0);
  // a glow pass so the characters bloom a little even without post-processing
  x.globalCompositeOperation = 'lighter'; x.filter = 'blur(3px)'; x.globalAlpha = 0.5; x.drawImage(t, 0, 0);
  x.filter = 'none'; x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
  // frame lines between rows
  x.fillStyle = '#1a1b1e';
  for (let i = 0; i <= 4; i++) x.fillRect(0, i * 128 - 2, W, 4);
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
