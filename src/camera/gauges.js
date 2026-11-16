// Instrument cluster artwork, one layout per cluster style. Everything is drawn onto a 1024x384 canvas
// that is mapped onto the cluster display in the cockpit. Shared pieces: analog dials with real ticks and
// needles, digital readouts, turn-signal telltales and the start-up needle sweep.
import { clamp } from '../core/utils.js';

const FONT = '"Barlow Condensed", "Arial Narrow", Arial, sans-serif';

/** Angle of a dial value: 0..1 across [a0, a1] (radians, canvas convention, clockwise). */
const ang = (f, a0, a1) => a0 + (a1 - a0) * clamp(f, 0, 1);

/**
 * Analog dial. o: { max, step, minor, labelDiv, red (value), a0, a1, face, tick, num, needle, ring, label, unit,
 *   digital (string shown in the hub), small }
 */
export function dial(c, x, y, r, value, o) {
  const a0 = o.a0 ?? Math.PI * 0.75, a1 = o.a1 ?? Math.PI * 2.25;
  const f = value / o.max;
  // face with a soft vignette
  const g = c.createRadialGradient(x, y - r * 0.2, r * 0.1, x, y, r);
  g.addColorStop(0, o.faceHi || '#18181b');
  g.addColorStop(1, o.face || '#09090a');
  c.fillStyle = g;
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
  // red zone arc
  if (o.red) {
    c.strokeStyle = o.redColor || '#e8222e';
    c.lineWidth = r * 0.07;
    c.beginPath(); c.arc(x, y, r * 0.86, ang(o.red / o.max, a0, a1), a1, a1 < a0); c.stroke();
  }
  // ticks
  const nMaj = Math.round(o.max / o.step);
  const minor = o.minor ?? 4;
  for (let i = 0; i <= nMaj * minor; i++) {
    const v = (i / minor) * o.step;
    if (v > o.max + 1e-6) break;
    const a = ang(v / o.max, a0, a1);
    const maj = i % minor === 0;
    const r0 = maj ? r * 0.78 : r * 0.84, r1 = r * 0.93;
    c.strokeStyle = o.red && v >= o.red ? (o.redColor || '#e8222e') : (o.tick || '#f2f2f2');
    c.lineWidth = maj ? Math.max(2, r * 0.025) : Math.max(1, r * 0.01);
    c.beginPath(); c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); c.stroke();
    if (maj && (o.labelEvery ? (i / minor) % o.labelEvery === 0 : true)) {
      c.fillStyle = o.num || '#f2f2f2';
      c.font = `600 ${Math.round(r * (o.small ? 0.2 : 0.16))}px ${FONT}`;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(String(Math.round(v / (o.labelDiv || 1))), x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62);
    }
  }
  if (o.label) {
    c.fillStyle = o.labelColor || 'rgba(230,230,235,0.7)';
    c.font = `600 ${Math.round(r * 0.11)}px ${FONT}`;
    c.textAlign = 'center';
    c.fillText(o.label, x, y + r * 0.34);
  }
  if (o.digital !== undefined) {
    c.fillStyle = o.digitalColor || '#ffffff';
    c.font = `700 ${Math.round(r * 0.24)}px ${FONT}`;
    c.textAlign = 'center';
    c.fillText(o.digital, x, y + r * 0.58);
  }
  // needle with glow and a centre cap
  const a = ang(f, a0, a1);
  c.save();
  c.shadowColor = o.needle || '#ff3b2f';
  c.shadowBlur = r * 0.08;
  c.strokeStyle = o.needle || '#ff3b2f';
  c.lineWidth = Math.max(3, r * 0.035);
  c.lineCap = 'round';
  c.beginPath(); c.moveTo(x - Math.cos(a) * r * 0.14, y - Math.sin(a) * r * 0.14); c.lineTo(x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9); c.stroke();
  c.restore();
  c.fillStyle = '#121214';
  c.beginPath(); c.arc(x, y, r * 0.1, 0, Math.PI * 2); c.fill();
  c.strokeStyle = o.ring || '#555';
  c.lineWidth = 2;
  c.stroke();
}

/** Green turn arrows, high-beam blue and a few warning lamps that every car carries. */
function telltales(c, W, H, s, y = 30, spread = 0.36) {
  const on = s.blink;
  for (const side of [-1, 1]) {
    const active = s.ind === side && on;
    const x = W / 2 + side * W * spread;
    c.fillStyle = active ? '#2bff6a' : 'rgba(43,255,106,0.08)';
    c.beginPath();
    c.moveTo(x + side * 22, y); c.lineTo(x, y - 16); c.lineTo(x, y - 7); c.lineTo(x - side * 18, y - 7);
    c.lineTo(x - side * 18, y + 7); c.lineTo(x, y + 7); c.lineTo(x, y + 16); c.closePath();
    c.fill();
  }
  if (s.lights) {
    c.fillStyle = '#3a7bff';
    c.font = `700 22px ${FONT}`;
    c.textAlign = 'center';
    c.fillText('≣D', W / 2 - W * spread * 0.55, y + 2);
  }
  if (s.handbrake) {
    c.strokeStyle = '#ff3b30'; c.lineWidth = 3;
    const x = W / 2 + W * spread * 0.55;
    c.beginPath(); c.arc(x, y, 13, 0, Math.PI * 2); c.stroke();
    c.fillStyle = '#ff3b30'; c.font = `700 16px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('P', x, y + 1);
  }
}

/** Start-up: needles sweep to the stops and back, screens fade up from black. */
export function bootState(t) {
  if (t === null || t > 1.6) return { sweep: -1, alpha: 1, splash: false };
  const sweep = t < 0.65 ? Math.sin((t / 0.65) * Math.PI / 2) : t < 1.3 ? Math.cos(((t - 0.65) / 0.65) * Math.PI / 2) : -1;
  return { sweep, alpha: clamp(t / 0.45, 0, 1), splash: t < 0.95 };
}

function splash(c, W, H, s, color) {
  c.fillStyle = '#000';
  c.fillRect(0, 0, W, H);
  c.fillStyle = color;
  c.font = `italic 700 74px ${FONT}`;
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(s.maker, W / 2, H / 2 - 10);
  c.fillStyle = 'rgba(255,255,255,0.5)';
  c.font = `600 22px ${FONT}`;
  c.fillText(s.model.toUpperCase(), W / 2, H / 2 + 48);
}

function gearText(s) { return s.gear === -1 ? 'R' : s.gear === 0 ? 'N' : String(s.gear); }
function clock(s) { const h = Math.floor(s.hours), m = Math.floor((s.hours - h) * 60); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; }

/** Values the needles show (start-up sweep overrides them). */
function needles(s) {
  if (s.boot.sweep >= 0) return { rpm: s.maxR * s.boot.sweep, spd: s.maxS * s.boot.sweep, f: s.boot.sweep };
  return { rpm: s.rpm, spd: s.speed, f: null };
}

/* -------------------------------------------------------------- layouts */

// Twin analog dials with a centre multi-function display (rally sedan)
function twinAnalog(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  dial(c, 230, 200, 168, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, label: 'x1000 r/min' });
  dial(c, 794, 200, 168, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'MPH' });
  // MFD
  c.fillStyle = '#060607'; c.fillRect(420, 70, 184, 250);
  c.strokeStyle = '#2a2a2e'; c.lineWidth = 3; c.strokeRect(420, 70, 184, 250);
  c.fillStyle = G.mfd; c.font = `700 110px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(gearText(s), 512, 170);
  c.font = `600 22px ${FONT}`; c.fillStyle = '#d8d8dc';
  c.fillText(s.isTurbo ? 'BOOST' : 'OIL', 512, 244);
  c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillRect(442, 260, 140, 10);
  c.fillStyle = G.mfd; c.fillRect(442, 260, 140 * clamp(s.isTurbo ? s.boost : 0.6, 0, 1), 10);
  c.fillStyle = '#d8d8dc'; c.fillText(clock(s), 512, 298);
  telltales(c, W, H, s, 32, 0.08);
}

// Digital hot-hatch cluster: tach bar sweeping over the top, shift lights, big speed
function digitalSport(c, W, H, s, G) {
  c.fillStyle = '#030304'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const f = n.rpm / s.maxR;
  // shift lights
  const sl = clamp((s.rpm - s.red * 0.78) / (s.red * 0.2), 0, 1);
  for (let i = 0; i < 10; i++) {
    const on = n.f !== null ? i / 10 < n.f : i / 10 < sl;
    const col = i < 4 ? '#2bff6a' : i < 7 ? '#ffd21e' : '#ff1e2d';
    c.fillStyle = on ? (sl >= 1 && performance.now() % 160 < 80 ? '#ffffff' : col) : 'rgba(255,255,255,0.06)';
    c.beginPath(); c.arc(W / 2 - 225 + i * 50, 26, 11, 0, Math.PI * 2); c.fill();
  }
  // arc tach
  const cx = W / 2, cy = 470, r = 400;
  const a0 = Math.PI * 1.2, a1 = Math.PI * 1.8;
  c.lineWidth = 34;
  c.strokeStyle = 'rgba(255,255,255,0.07)';
  c.beginPath(); c.arc(cx, cy, r, a0, a1); c.stroke();
  const grad = c.createLinearGradient(cx - r, 0, cx + r, 0);
  grad.addColorStop(0, '#ffffff'); grad.addColorStop(0.65, '#ffd21e'); grad.addColorStop(1, G.redline);
  c.strokeStyle = grad;
  c.beginPath(); c.arc(cx, cy, r, a0, a0 + (a1 - a0) * clamp(f, 0, 1)); c.stroke();
  c.strokeStyle = G.redline; c.lineWidth = 6;
  c.beginPath(); c.arc(cx, cy, r + 26, a0 + (a1 - a0) * (s.red / s.maxR), a1); c.stroke();
  c.fillStyle = '#d8d8dc'; c.font = `600 20px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  for (let k = 0; k <= s.maxR / 1000; k++) { const a = a0 + (a1 - a0) * (k * 1000 / s.maxR); c.fillText(String(k), cx + Math.cos(a) * (r - 38), cy + Math.sin(a) * (r - 38)); }
  // speed / gear / boost
  c.fillStyle = '#ffffff'; c.font = `700 118px ${FONT}`;
  c.fillText(String(Math.round(n.spd)), cx, 210);
  c.font = `600 24px ${FONT}`; c.fillStyle = '#9a9aa0'; c.fillText(s.units === 'kmh' ? 'km/h' : 'mph', cx, 275);
  c.fillStyle = G.redline; c.font = `700 92px ${FONT}`; c.fillText(gearText(s), cx + 250, 220);
  c.strokeStyle = G.redline; c.lineWidth = 3; c.strokeRect(cx + 205, 160, 90, 112);
  c.fillStyle = '#9a9aa0'; c.font = `600 20px ${FONT}`; c.textAlign = 'left';
  c.fillText('BOOST', cx - 330, 175);
  c.fillStyle = 'rgba(255,255,255,0.1)'; c.fillRect(cx - 330, 192, 150, 12);
  c.fillStyle = G.redline; c.fillRect(cx - 330, 192, 150 * clamp(s.boost, 0, 1), 12);
  c.fillStyle = '#9a9aa0'; c.fillText(clock(s), cx - 330, 250);
  telltales(c, W, H, s, 330, 0.4);
}

// Early-90s: big centre tach, speedo on the left, fuel and water on the right, orange needles
function retroAnalog(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  dial(c, 200, 214, 140, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'MPH', a0: Math.PI * 0.8, a1: Math.PI * 2.2 });
  dial(c, 512, 196, 182, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, label: 'x1000 RPM', digital: gearText(s), digitalColor: '#ffb27a' });
  const sm = { max: 1, step: 0.5, minor: 2, labelDiv: 1, ...G, small: true, a0: Math.PI * 1.15, a1: Math.PI * 1.85 };
  dial(c, 846, 120, 78, n.f ?? 0.72, { ...sm, label: 'FUEL' });
  dial(c, 846, 290, 78, n.f ?? 0.55, { ...sm, label: 'WATER' });
  c.fillStyle = '#ffb27a'; c.font = `600 18px ${FONT}`; c.textAlign = 'center';
  c.fillText(`${Math.floor(s.units === 'kmh' ? s.odo : s.odo * 0.6214).toString().padStart(6, '0')}`, 200, 330);
  telltales(c, W, H, s, 30, 0.3);
}

// Wide digital cluster (luxury super-sedan): speed arc on the left, tach arc on the right, info in the middle
function curvedPanel(c, W, H, s, G) {
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#04070c'); bg.addColorStop(1, '#0a1220');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const arc = (cx, f, flip, col, max, label, val) => {
    const r = 150, cy = 210;
    const a0 = flip ? Math.PI * 0.15 : Math.PI * 0.85, a1 = flip ? -Math.PI * 0.75 : Math.PI * 1.75;
    c.lineWidth = 10; c.strokeStyle = 'rgba(160,190,255,0.12)';
    c.beginPath(); c.arc(cx, cy, r, Math.min(a0, a1), Math.max(a0, a1)); c.stroke();
    c.strokeStyle = col; c.lineWidth = 10;
    const ae = a0 + (a1 - a0) * clamp(f, 0, 1);
    c.beginPath(); c.arc(cx, cy, r, Math.min(a0, ae), Math.max(a0, ae)); c.stroke();
    // pointer
    c.strokeStyle = '#ffffff'; c.lineWidth = 4;
    c.beginPath(); c.moveTo(cx + Math.cos(ae) * (r - 26), cy + Math.sin(ae) * (r - 26)); c.lineTo(cx + Math.cos(ae) * (r + 14), cy + Math.sin(ae) * (r + 14)); c.stroke();
    c.fillStyle = '#e8eefc'; c.font = `700 70px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(val, cx, cy);
    c.fillStyle = 'rgba(200,215,255,0.6)'; c.font = `600 20px ${FONT}`; c.fillText(label, cx, cy + 48);
  };
  arc(230, n.spd / s.maxS, false, G.ring, s.maxS, s.units === 'kmh' ? 'km/h' : 'mph', String(Math.round(n.spd)));
  arc(794, n.rpm / s.maxR, true, n.rpm > s.red ? G.redline : '#e8eefc', s.maxR, 'x1000 rpm', (n.rpm / 1000).toFixed(1));
  c.fillStyle = '#ffffff'; c.font = `700 92px ${FONT}`; c.fillText(gearText(s), 512, 170);
  c.fillStyle = 'rgba(200,215,255,0.6)'; c.font = `600 20px ${FONT}`;
  c.fillText(s.manual ? 'M  DRIVE' : 'D  SPORT', 512, 232);
  c.fillText(clock(s) + '    21°C', 512, 300);
  telltales(c, W, H, s, 40, 0.16);
}

// Five round dials, tach in the middle (rear-engined coupe)
function fiveDial(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const sm = { ...G, small: true, a0: Math.PI * 0.75, a1: Math.PI * 2.25 };
  dial(c, 96, 220, 92, n.f ?? 0.62, { max: 1, step: 0.25, minor: 2, ...sm, labelEvery: 2, label: 'OIL' });
  dial(c, 298, 210, 132, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'mph' });
  dial(c, 512, 196, 178, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, label: '1/min x1000', digital: gearText(s), digitalColor: '#ffffff' });
  // right-centre: digital "dial" with speed and a little map arrow
  c.fillStyle = '#060607'; c.beginPath(); c.arc(726, 210, 132, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#ffffff'; c.font = `700 74px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(String(Math.round(n.spd)), 726, 190);
  c.fillStyle = 'rgba(255,255,255,0.55)'; c.font = `600 20px ${FONT}`; c.fillText(s.units === 'kmh' ? 'km/h' : 'mph', 726, 240);
  c.fillText(clock(s), 726, 280);
  dial(c, 928, 220, 92, n.f ?? 0.78, { max: 1, step: 0.25, minor: 2, ...sm, labelEvery: 2, label: 'FUEL' });
  telltales(c, W, H, s, 30, 0.2);
}

// Deep twin tunnels with a digital centre (muscle car)
function twinTunnel(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  dial(c, 220, 196, 170, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, label: 'RPM x1000' });
  dial(c, 804, 196, 170, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'MPH' });
  c.fillStyle = '#05060a'; c.fillRect(412, 64, 200, 260);
  c.strokeStyle = G.mfd; c.lineWidth = 2; c.strokeRect(412, 64, 200, 260);
  c.fillStyle = '#ffffff'; c.font = `700 104px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(gearText(s), 512, 160);
  c.fillStyle = G.mfd; c.font = `700 26px ${FONT}`; c.fillText('TRACK', 512, 232);
  c.fillStyle = '#c8c8cc'; c.font = `600 20px ${FONT}`; c.fillText(`OIL 92  ·  ${clock(s)}`, 512, 282);
  telltales(c, W, H, s, 34, 0.1);
}

// Hexagonal full-width TFT (V10 supercar)
function hexTFT(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const fx0 = 60, fx1 = W - 60, fy0 = 24, fy1 = H - 30, cut = 66;
  const hex = () => { c.beginPath(); c.moveTo(fx0 + cut, fy0); c.lineTo(fx1 - cut, fy0); c.lineTo(fx1, (fy0 + fy1) / 2); c.lineTo(fx1 - cut, fy1); c.lineTo(fx0 + cut, fy1); c.lineTo(fx0, (fy0 + fy1) / 2); c.closePath(); };
  hex(); c.fillStyle = '#040505'; c.fill();
  c.lineWidth = 4; c.strokeStyle = G.ring; hex(); c.stroke();
  // big centre tach ring
  const cx = W / 2, cy = H / 2 + 8, r = 150;
  const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25;
  c.lineWidth = 22; c.strokeStyle = 'rgba(255,255,255,0.07)'; c.beginPath(); c.arc(cx, cy, r, a0, a1); c.stroke();
  const f = n.rpm / s.maxR;
  c.strokeStyle = n.rpm > s.red ? G.redline : G.ring;
  c.beginPath(); c.arc(cx, cy, r, a0, a0 + (a1 - a0) * clamp(f, 0, 1)); c.stroke();
  for (let k = 0; k <= s.maxR / 1000; k++) {
    const a = a0 + (a1 - a0) * (k * 1000 / s.maxR);
    c.fillStyle = k * 1000 >= s.red ? G.redline : '#e8e8e8'; c.font = `600 20px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(String(k), cx + Math.cos(a) * (r - 34), cy + Math.sin(a) * (r - 34));
  }
  c.fillStyle = '#ffffff'; c.font = `700 104px ${FONT}`; c.fillText(gearText(s), cx, cy - 10);
  c.fillStyle = G.ring; c.font = `700 30px ${FONT}`; c.fillText(String(Math.round(n.spd)), cx, cy + 66);
  c.fillStyle = 'rgba(255,255,255,0.6)'; c.font = `600 18px ${FONT}`; c.fillText(s.units === 'kmh' ? 'km/h' : 'mph', cx, cy + 92);
  // side panels
  c.textAlign = 'left'; c.fillStyle = 'rgba(255,255,255,0.65)'; c.font = `600 22px ${FONT}`;
  c.fillText('CORSA', fx0 + cut, 110);
  c.fillText(`OIL  105°`, fx0 + cut, 160); c.fillText(`WATER  88°`, fx0 + cut, 196);
  c.textAlign = 'right';
  c.fillText(clock(s), fx1 - cut, 110);
  c.fillText(`${Math.floor(s.units === 'kmh' ? s.odo : s.odo * 0.6214).toLocaleString()} ${s.units === 'kmh' ? 'km' : 'mi'}`, fx1 - cut, 160);
  c.fillText(`FUEL  71%`, fx1 - cut, 196);
  telltales(c, W, H, s, 58, 0.32);
}

// Column-mounted pod (hypercar): shift-light bar, big speed, gear
function pod(c, W, H, s, G) {
  c.fillStyle = '#010102'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const f = n.rpm / s.maxR;
  const N = 30;
  for (let i = 0; i < N; i++) {
    const on = i / N < f;
    const red = i / N > s.red / s.maxR;
    c.fillStyle = on ? (red ? G.redline : i / N > 0.7 ? '#ffd21e' : G.mfd) : 'rgba(255,255,255,0.05)';
    c.fillRect(70 + i * 29, 34, 22, 46);
  }
  c.fillStyle = '#ffffff'; c.font = `700 150px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(String(Math.round(n.spd)), 420, 220);
  c.fillStyle = 'rgba(255,255,255,0.5)'; c.font = `600 24px ${FONT}`; c.fillText(s.units === 'kmh' ? 'KM/H' : 'MPH', 420, 314);
  c.fillStyle = G.ring; c.font = `700 170px ${FONT}`; c.fillText(gearText(s), 780, 220);
  c.fillStyle = 'rgba(255,255,255,0.55)'; c.font = `600 22px ${FONT}`; c.textAlign = 'left';
  c.fillText(clock(s), 70, 340);
  c.textAlign = 'right'; c.fillText(`ERS ${Math.round(60 + 40 * Math.sin(s.odo))}%`, W - 70, 340);
  telltales(c, W, H, s, 108, 0.42);
}

// 80s digital dash: segmented bar-graph tachometer, seven-segment speed, bar-graph fuel and temperature
function seg7(c, txt, x, y, h, col) {
  // simple seven-segment digits (right aligned at x)
  const SEG = { 0: 'abcfed', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g' };
  const w = h * 0.52, t = h * 0.11, gap = h * 0.18;
  let cx = x;
  for (const ch of String(txt).split('').reverse()) {
    const on = SEG[ch] || '';
    const x0 = cx - w;
    const segs = { a: [x0 + t, y, w - 2 * t, t], d: [x0 + t, y + h - t, w - 2 * t, t], g: [x0 + t, y + h / 2 - t / 2, w - 2 * t, t],
      f: [x0, y + t, t, h / 2 - t], b: [cx - t, y + t, t, h / 2 - t], e: [x0, y + h / 2, t, h / 2 - t], c: [cx - t, y + h / 2, t, h / 2 - t] };
    for (const [k, r] of Object.entries(segs)) { c.fillStyle = on.includes(k) ? col : 'rgba(255,170,40,0.06)'; c.fillRect(...r); }
    cx -= w + gap;
  }
}
function digital80(c, W, H, s, G) {
  c.fillStyle = '#050403'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const N = 40, f = n.rpm / s.maxR;
  for (let i = 0; i < N; i++) {
    const on = i / N < f, red = (i / N) * s.maxR >= s.red;
    const h = 30 + i * 2.2;
    c.fillStyle = on ? (red ? '#ff3b20' : i > N * 0.6 ? '#ffd21e' : '#58ff6a') : 'rgba(90,255,110,0.06)';
    c.fillRect(70 + i * 22, 150 - h, 16, h);
  }
  c.fillStyle = '#ffae2a'; c.font = `600 18px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  for (let k = 0; k <= s.maxR / 1000; k++) c.fillText(String(k), 70 + (k * 1000 / s.maxR) * N * 22, 170);
  c.fillText('x1000 RPM', 950, 30);
  seg7(c, String(Math.round(n.spd)), 640, 196, 120, '#ffae2a');
  c.fillStyle = '#ffae2a'; c.font = `700 26px ${FONT}`; c.textAlign = 'left'; c.fillText(s.units === 'kmh' ? 'km/h' : 'MPH', 652, 300);
  // bar-graph fuel / temp
  for (const [x0, lab, v] of [[80, 'FUEL', n.f ?? 0.7], [190, 'TEMP', n.f ?? 0.5]]) {
    for (let i = 0; i < 10; i++) { c.fillStyle = i / 10 < v ? '#58ff6a' : 'rgba(90,255,110,0.07)'; c.fillRect(x0, 310 - i * 13, 70, 9); }
    c.fillStyle = '#ffae2a'; c.font = `600 18px ${FONT}`; c.textAlign = 'center'; c.fillText(lab, x0 + 35, 340);
  }
  c.fillStyle = '#58ff6a'; c.font = `700 70px ${FONT}`; c.textAlign = 'center'; c.fillText(gearText(s), 860, 260);
  c.fillStyle = '#ffae2a'; c.font = `600 18px ${FONT}`; c.fillText(clock(s), 860, 330);
  telltales(c, W, H, s, 352, 0.18);
}

// 90s Japanese GT: speedo left, big tach in the middle, boost gauge right with its own small oil dial
function gtrTriple(c, W, H, s, G) {
  c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  dial(c, 190, 220, 150, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'MPH' });
  dial(c, 512, 196, 184, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, label: 'x1000 r/min', digital: gearText(s), digitalColor: G.mfd });
  const bv = n.f !== null ? n.f * 2.5 : 1 + s.boost * 1.2 * (s.thr > 0.5 ? 1 : 0.2);
  dial(c, 836, 160, 104, bv, { max: 2.5, step: 0.5, minor: 2, labelDiv: 1, ...G, small: true, red: 2.1, label: 'BOOST x100kPa' });
  dial(c, 900, 318, 58, n.f ?? 0.6, { max: 1, step: 0.5, minor: 2, ...G, small: true, a0: Math.PI * 1.15, a1: Math.PI * 1.85, label: 'OIL' });
  c.fillStyle = G.mfd; c.font = `600 18px ${FONT}`; c.textAlign = 'center';
  c.fillText(`${Math.floor(s.units === 'kmh' ? s.odo : s.odo * 0.6214).toString().padStart(6, '0')}`, 190, 338);
  telltales(c, W, H, s, 30, 0.3);
}

// British GT: chrome-ringed speedo and a counter-rotating tachometer with a TFT strip between them
function twinCounter(c, W, H, s, G) {
  const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0b0c0d'); bg.addColorStop(1, '#030303');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  const n = needles(s);
  for (const x of [222, 802]) { c.strokeStyle = '#c9ccd0'; c.lineWidth = 7; c.beginPath(); c.arc(x, 196, 176, 0, Math.PI * 2); c.stroke(); }
  dial(c, 222, 196, 170, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, ...G, label: s.units === 'kmh' ? 'km/h' : 'MPH' });
  // tachometer sweeps the other way, as on the real thing
  dial(c, 802, 196, 170, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...G, a0: Math.PI * 2.25, a1: Math.PI * 0.75, label: 'RPM x1000' });
  c.fillStyle = '#060708'; c.fillRect(424, 92, 176, 210);
  c.strokeStyle = 'rgba(201,204,208,0.5)'; c.lineWidth = 2; c.strokeRect(424, 92, 176, 210);
  c.fillStyle = '#ffffff'; c.font = `700 92px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(gearText(s), 512, 168);
  c.fillStyle = G.mfd; c.font = `600 20px ${FONT}`; c.fillText(s.manual ? 'MANUAL' : 'GT  SPORT', 512, 234);
  c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillText(clock(s), 512, 272);
  telltales(c, W, H, s, 40, 0.11);
}

// Electric: slim wide display, power / regen meter on the left, speed in the middle, battery and range right
function evStrip(c, W, H, s, G) {
  const bg = c.createLinearGradient(0, 0, W, 0); bg.addColorStop(0, '#05070a'); bg.addColorStop(0.5, '#0a0f16'); bg.addColorStop(1, '#05070a');
  c.fillStyle = bg; c.fillRect(0, 0, W, H);
  const n = needles(s);
  const pw = n.f !== null ? n.f : clamp(s.thr * (0.35 + 0.65 * Math.min(1, s.speed / 60)), 0, 1);
  const regen = n.f !== null ? 0 : clamp(-s.ax / 6, 0, 1) * (s.thr < 0.05 ? 1 : 0);
  const cx = 240, cy = 214, r = 150, a0 = Math.PI * 0.8, a1 = Math.PI * 2.2, am = a0 + (a1 - a0) * 0.25;
  c.lineWidth = 16; c.strokeStyle = 'rgba(160,200,255,0.1)'; c.beginPath(); c.arc(cx, cy, r, a0, a1); c.stroke();
  c.strokeStyle = G.ring; c.beginPath(); c.arc(cx, cy, r, am, am + (a1 - am) * pw); c.stroke();
  c.strokeStyle = '#2bff8a'; c.beginPath(); c.arc(cx, cy, r, am - (am - a0) * regen, am); c.stroke();
  c.fillStyle = '#e8f2ff'; c.font = `700 64px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(`${Math.round(pw * 100)}`, cx, cy - 6);
  c.fillStyle = 'rgba(200,220,255,0.6)'; c.font = `600 20px ${FONT}`; c.fillText('% POWER', cx, cy + 40);
  c.fillStyle = '#ffffff'; c.font = `300 150px ${FONT}`; c.fillText(String(Math.round(n.spd)), 540, 190);
  c.fillStyle = 'rgba(200,220,255,0.6)'; c.font = `600 24px ${FONT}`; c.fillText(s.units === 'kmh' ? 'km/h' : 'mph', 540, 282);
  c.fillStyle = G.ring; c.font = `700 30px ${FONT}`; c.fillText(s.gear === -1 ? 'R' : 'D', 540, 330);
  // battery
  const soc = 0.78 - (s.odo % 400) / 4000;
  c.strokeStyle = 'rgba(220,235,255,0.7)'; c.lineWidth = 3; c.strokeRect(790, 120, 150, 54); c.fillRect(940, 136, 8, 22);
  c.fillStyle = '#2bff8a'; c.fillRect(796, 126, 138 * soc, 42);
  c.fillStyle = '#e8f2ff'; c.font = `600 26px ${FONT}`; c.fillText(`${Math.round(soc * 100)}%   ${Math.round(soc * (s.units === 'kmh' ? 450 : 280))} ${s.units === 'kmh' ? 'km' : 'mi'}`, 865, 216);
  c.fillStyle = 'rgba(200,220,255,0.6)'; c.font = `600 20px ${FONT}`; c.fillText(clock(s), 865, 270);
  telltales(c, W, H, s, 40, 0.2);
}

// Full digital cockpit: two small dials and a wide navigation map between them
function virtualCockpit(c, W, H, s, G) {
  c.fillStyle = '#020304'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  // map
  const mx0 = 300, mx1 = 724;
  const mg = c.createLinearGradient(0, 0, 0, H); mg.addColorStop(0, '#0c1410'); mg.addColorStop(1, '#16221a');
  c.fillStyle = mg; c.fillRect(mx0, 40, mx1 - mx0, 300);
  c.strokeStyle = 'rgba(160,200,170,0.18)'; c.lineWidth = 3;
  for (let k = 0; k < 7; k++) { c.beginPath(); c.moveTo(mx0, 60 + k * 45 + (s.odo * 40) % 45); c.lineTo(mx1, 30 + k * 45 + (s.odo * 40) % 45); c.stroke(); }
  c.strokeStyle = '#e6e9ee'; c.lineWidth = 16; c.beginPath(); c.moveTo(512, 340); c.quadraticCurveTo(512, 200, 560, 40); c.stroke();
  c.strokeStyle = '#3d8bff'; c.lineWidth = 7; c.beginPath(); c.moveTo(512, 340); c.quadraticCurveTo(512, 200, 560, 40); c.stroke();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(512, 262); c.lineTo(530, 300); c.lineTo(512, 290); c.lineTo(494, 300); c.closePath(); c.fill();
  // dials either side
  const small = { ...G, a0: Math.PI * 0.75, a1: Math.PI * 2.25 };
  dial(c, 160, 200, 140, n.spd, { max: s.maxS, step: s.maxS > 200 ? 40 : 20, minor: 2, labelEvery: 2, ...small, label: s.units === 'kmh' ? 'km/h' : 'mph', digital: String(Math.round(n.spd)) });
  dial(c, 864, 200, 140, n.rpm, { max: s.maxR, step: 1000, labelDiv: 1000, red: s.red, ...small, label: 'x1000 rpm', digital: gearText(s), digitalColor: G.mfd });
  c.fillStyle = 'rgba(255,255,255,0.7)'; c.font = `600 20px ${FONT}`; c.textAlign = 'center'; c.fillText(`${clock(s)}   ·   A9 Exit 14`, 512, 362);
  telltales(c, W, H, s, 24, 0.12);
}

// Fighter-jet style (V12 supercar): speed tape on the left, central tach with a big gear, G-meter right
function jetTFT(c, W, H, s, G) {
  c.fillStyle = '#020202'; c.fillRect(0, 0, W, H);
  const n = needles(s);
  // speed tape
  c.fillStyle = '#0b0c0c'; c.fillRect(70, 30, 150, 320);
  c.strokeStyle = G.ring; c.lineWidth = 2; c.strokeRect(70, 30, 150, 320);
  c.save(); c.beginPath(); c.rect(70, 30, 150, 320); c.clip();
  const sp = n.spd;
  c.fillStyle = 'rgba(255,255,255,0.75)'; c.font = `600 20px ${FONT}`; c.textAlign = 'right'; c.textBaseline = 'middle';
  for (let v = Math.floor(sp / 10) * 10 - 60; v <= sp + 60; v += 10) {
    if (v < 0) continue;
    const y = 190 - (v - sp) * 2.6;
    c.fillRect(180, y - 1, v % 20 === 0 ? 30 : 16, 2);
    if (v % 20 === 0) c.fillText(String(v), 172, y);
  }
  c.restore();
  c.fillStyle = '#000'; c.fillRect(74, 168, 112, 44); c.strokeStyle = G.ring; c.strokeRect(74, 168, 112, 44);
  c.fillStyle = '#ffffff'; c.font = `700 34px ${FONT}`; c.textAlign = 'center'; c.fillText(String(Math.round(sp)), 130, 191);
  // central tach: angular bars
  const cx = 512, cy = 230, r = 170;
  const a0 = Math.PI * 0.85, a1 = Math.PI * 2.15, f = n.rpm / s.maxR;
  for (let i = 0; i < 52; i++) {
    const u = i / 52, a = a0 + (a1 - a0) * u;
    const on = u < f, red = u * s.maxR >= s.red;
    c.strokeStyle = on ? (red ? G.redline : G.ring) : 'rgba(255,255,255,0.08)';
    c.lineWidth = 9;
    c.beginPath(); c.moveTo(cx + Math.cos(a) * (r - 30), cy + Math.sin(a) * (r - 30)); c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); c.stroke();
  }
  c.fillStyle = '#ffffff'; c.font = `700 130px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(gearText(s), cx, cy - 10);
  c.fillStyle = G.ring; c.font = `700 24px ${FONT}`; c.fillText('CORSA', cx, cy + 82);
  // G-meter
  const gx = 860, gy = 190;
  c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 2;
  for (const rr of [40, 80, 120]) { c.beginPath(); c.arc(gx, gy, rr, 0, Math.PI * 2); c.stroke(); }
  c.beginPath(); c.moveTo(gx - 130, gy); c.lineTo(gx + 130, gy); c.moveTo(gx, gy - 130); c.lineTo(gx, gy + 130); c.stroke();
  c.fillStyle = G.ring; c.beginPath(); c.arc(gx + clamp(s.ay / 9.81, -1.5, 1.5) * 80, gy - clamp(s.ax / 9.81, -1.5, 1.5) * 80, 11, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(255,255,255,0.6)'; c.font = `600 18px ${FONT}`; c.fillText(clock(s), gx, 350);
  telltales(c, W, H, s, 30, 0.16);
}

const LAYOUTS = { twinAnalog, digitalSport, retroAnalog, curvedPanel, fiveDial, twinTunnel, hexTFT, pod, digital80, gtrTriple, twinCounter, evStrip, virtualCockpit, jetTFT };

/** Draw the cluster for a style. s: live state, G: gauge palette. */
export function drawCluster(style, c, s, G) {
  const W = c.canvas.width, H = c.canvas.height;
  const digital = ['digitalSport', 'curvedPanel', 'hexTFT', 'pod', 'evStrip', 'virtualCockpit', 'jetTFT'].includes(style);
  if (digital && s.boot.splash) { splash(c, W, H, s, G.ring); return; }
  (LAYOUTS[style] || twinAnalog)(c, W, H, s, G);
  if (s.boot.alpha < 1) { c.fillStyle = `rgba(0,0,0,${1 - s.boot.alpha})`; c.fillRect(0, 0, W, H); }
}
