// LIMIT class badges. A build's class is drawn as a speed-limit sign (LIMIT 80 ... LIMIT 200, then a
// derestriction sign with a chequered strip for NO LIMIT), next to its PACE number and its STYLE.
import { limitProgress, nextLimit } from '../vehicles/upgrades.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function checker(x, y, w, h, cols) {
  const cw = w / cols, rh = h / 2;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f4f4f0"/>`;
  for (let r = 0; r < 2; r++) for (let c = 0; c < cols; c++) if ((r + c) % 2 === 0) s += `<rect x="${(x + c * cw).toFixed(2)}" y="${y + r * rh}" width="${cw.toFixed(2)}" height="${rh}" fill="#111"/>`;
  return s;
}

/** The class as a road sign (SVG markup, 40 x 50 viewBox). */
export function limitSign(cls) {
  const frame = '<rect x="0.75" y="0.75" width="38.5" height="48.5" rx="5" fill="#f4f4f0" stroke="#050505" stroke-width="1.5"/>'
    + '<rect x="3" y="3" width="34" height="44" rx="3.2" fill="none" stroke="#111" stroke-width="1.4"/>';
  if (cls.open) {
    const lines = [-7.5, -3.75, 0, 3.75, 7.5].map((d) => `<line x1="${(13 + d).toFixed(2)}" y1="38" x2="${(27 + d).toFixed(2)}" y2="16"/>`).join('');
    return `<svg class="lim-sign" viewBox="0 0 40 50" role="img" aria-label="No limit">${frame}`
      + '<text x="20" y="12.2" class="lim-k" textLength="29" lengthAdjust="spacingAndGlyphs">NO LIMIT</text>'
      + `<g stroke="#2b2b2b" stroke-width="1.7" stroke-linecap="round">${lines}</g>`
      + `${checker(4.6, 41.2, 30.8, 4.4, 10)}</svg>`;
  }
  return `<svg class="lim-sign" viewBox="0 0 40 50" role="img" aria-label="${esc(cls.name)}">${frame}`
    + '<text x="20" y="12.2" class="lim-k" textLength="23" lengthAdjust="spacingAndGlyphs">LIMIT</text>'
    + `<text x="20" y="35.5" class="lim-n" textLength="${String(cls.max).length > 2 ? 30 : 21}" lengthAdjust="spacingAndGlyphs">${esc(cls.max)}</text>`
    + `<rect x="4.6" y="41.2" width="30.8" height="4.4" rx="0.8" fill="${cls.color}"/></svg>`;
}

const ICONS = {
  top: '<path d="M2 3l5 5-5 5M8 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  punch: '<path d="M9.5 1L3 9h4.2L6 15l7-8.4H8.6z" fill="currentColor"/>',
  grip: '<path d="M1.5 8c1.6-4.2 3.4-4.2 5 0s3.4 4.2 5 0 2.2-3 3-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bal: '<path d="M8 1.5l6.5 12.5h-13z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
};
export const styleIcon = (id) => `<svg class="lim-ico" viewBox="0 0 16 16" aria-hidden="true">${ICONS[id] || ICONS.bal}</svg>`;

/**
 * Badge element: sign + pace (+ style). opts.size: 'xs' (sign only), 'sm', 'md'; opts.style: show the style.
 */
export function classBadge(r, { size = 'md', style = true } = {}) {
  const w = document.createElement('div');
  w.className = `lim lim-${size}${r.cls.open ? ' open' : ''}`;
  w.style.setProperty('--lc', r.cls.color);
  w.title = `${r.cls.name} class · pace ${r.pace} · ${r.style.name}: ${r.style.desc}`;
  let html = limitSign(r.cls);
  if (size !== 'xs') {
    html += `<div class="lim-t"><div class="lim-p"><small>PACE</small><b>${r.pace}</b></div>`;
    if (style) html += `<span class="lim-sty sty-${r.style.id}">${styleIcon(r.style.id)}${esc(r.style.name)}</span>`;
    html += '</div>';
  }
  w.innerHTML = html;
  return w;
}

/**
 * The "break the limit" meter for a draft build `b` against the fitted build `a`: how far the pace sits
 * inside its class, and what it takes to reach the next one.
 */
export function limitMeter(a, b) {
  const box = document.createElement('div');
  box.className = 'lim-meter' + (b.cls.open ? ' open' : '');
  box.style.setProperty('--lc', b.cls.color);
  const up = b.cls.max > a.cls.max, down = b.cls.max < a.cls.max;
  const nx = nextLimit(b.cls);
  let msg;
  if (up) msg = `<b class="up">LIMIT BROKEN</b> · moves up to ${esc(b.cls.name)}`;
  else if (down) msg = `<b class="dn">DROPS</b> to ${esc(b.cls.name)}`;
  else if (b.cls.open) msg = `<b>UNRESTRICTED</b> · ${b.pace - 200} over the last limit`;
  else msg = `<b>${b.cls.max + 1 - b.pace}</b> pace to break ${esc(b.cls.name)}${nx ? ` → ${esc(nx.name)}` : ''}`;
  const pa = limitProgress(a.pace, b.cls), pb = limitProgress(b.pace, b.cls);
  const same = a.cls === b.cls;
  box.innerHTML = `<div class="lim-track"><i class="fill" style="width:${(pb * 100).toFixed(1)}%"></i>`
    + (same && a.pace !== b.pace ? `<i class="mark" style="left:${(pa * 100).toFixed(1)}%"></i>` : '')
    + `</div><div class="lim-msg">${msg}</div>`;
  return box;
}
