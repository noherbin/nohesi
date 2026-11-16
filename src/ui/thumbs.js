// Item thumbnails for the Customize screen: small line illustrations drawn from each part's data (SVG), so
// every item has its own picture and new parts get one without any image assets. Car parts are shown on a
// side-on car outline with the part drawn in the accent colour; wheels are drawn spoke by spoke.

const A = '#ff3b55';      // highlighted part
const L = 'rgba(255,255,255,0.55)'; // outline
const D = 'rgba(255,255,255,0.16)'; // faint detail
// every thumbnail sits inline in the page, so ids inside it (gradients, patterns, text paths) get a unique suffix
let uid = 0;
const svg = (body, vb = '0 0 160 90') => {
  const u = 't' + (++uid).toString(36);
  const b = body.replace(/id="([\w-]+)"/g, `id="$1-${u}"`).replace(/url\(#([\w-]+)\)/g, `url(#$1-${u})`).replace(/href="#([\w-]+)"/g, `href="#$1-${u}"`);
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
};

/* ---------------------------------------------------------------- car outlines */
// a generic sporty coupe, nose to the left
const CAR = 'M14 62 L14 54 Q16 47 30 45 L52 41 Q62 30 80 27 L104 27 Q118 29 128 40 L142 44 Q148 46 148 54 L148 62';
const WHEELS = '<circle cx="40" cy="63" r="11"/><circle cx="122" cy="63" r="11"/>';
const carBase = (extra = '') => `<g stroke="${L}" stroke-width="2"><path d="${CAR}"/><path d="M29 62 L51 62 M111 62 L133 62 M62 34 L76 34 Q80 31 88 30 L106 30 Q114 32 118 38 L64 38 Z" stroke="${D}"/>${WHEELS}</g>${extra}`;
const hl = (d, w = 3) => `<path d="${d}" stroke="${A}" stroke-width="${w}"/>`;
const fillA = (d, op = 0.9) => `<path d="${d}" fill="${A}" fill-opacity="${op}" stroke="${A}" stroke-width="1.5"/>`;
const k = (tier) => ({ stock: 0, none: 0, street: 1, sport: 2, track: 3, custom: 3 })[tier] ?? 1;

function bodyPart(g, it) {
  const t = k(it.tier), id = it.id;
  if (id === 'stock' || id === 'none') return svg(carBase());
  switch (g.id) {
    case 'fBumper': return svg(carBase(hl('M14 56 L24 56 L24 61') + (t >= 2 ? hl('M16 52 L24 51', 2.5) : '') + (t >= 3 ? hl('M16 57 L23 56', 2.5) : '')));
    case 'splitter': return svg(carBase(hl(`M${12 - t * 2} 63 L${34 + t * 2} 63`, 2 + t)));
    case 'rBumper': return svg(carBase(hl('M136 60 L148 60') + (t >= 3 ? '<circle cx="146" cy="56" r="2.2" fill="#ff3b55"/>' : '')));
    case 'diffuser': return svg(carBase(Array.from({ length: [0, 3, 5, 7][t] }, (_, i) => hl(`M${132 + i * 2.4} 62 L${132 + i * 2.4} ${64 + t}`, 1.6)).join('') + hl('M130 62 L149 62', 2)));
    case 'skirts': return svg(carBase(hl(`M52 ${62 + t * 0.6} L110 ${62 + t * 0.6}`, 2 + t)));
    case 'fenders':
      if (id === 'vented') return svg(carBase(hl('M55 47 L55 55 M58 47 L58 55 M61 47 L61 55', 2)));
      if (id === 'wide') return svg(carBase(hl('M27 60 Q28 47 40 46 Q53 47 54 60', 4) + hl('M108 60 Q109 47 122 46 Q134 47 136 60', 4)));
      if (id === 'rivet') return svg(carBase(hl('M26 60 L27 50 L33 46 L47 46 L53 50 L55 60', 4) + hl('M107 60 L108 50 L114 46 L129 46 L135 50 L137 60', 4) + [32, 40, 48, 113, 121, 129].map((x) => `<circle cx="${x}" cy="47.5" r="1.3" fill="#fff"/>`).join('')));
      return svg(carBase(hl('M24 61 L24 46 L56 46 L56 61', 4.5) + hl('M105 61 L105 46 L139 46 L139 61', 4.5) + [30, 40, 50, 111, 122, 133].map((x) => `<circle cx="${x}" cy="47.5" r="1.4" fill="#fff"/>`).join('')));
    case 'hoodType':
      if (id === 'scoop') return svg(carBase(fillA('M30 43 L36 38 L46 38 L46 42 Z')));
      if (id === 'carbon' || id === 'carbonVented') return svg(carBase(`<path d="M22 46 L52 41 L52 44 L24 48 Z" fill="url(#cf)" stroke="${A}" stroke-width="1.5"/>` + (id === 'carbonVented' ? hl('M34 42 L44 41', 2) : '')) + '<defs><pattern id="cf" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#222"/><path d="M0 0 L2 0 L2 2 L0 2 Z M2 2 L4 2 L4 4 L2 4 Z" fill="#444"/></pattern></defs>');
      return svg(carBase(hl('M32 43 L38 42 M40 42 L46 41', 2.5)));
    case 'spoiler': return svg(carBase(id === 'duck' ? fillA('M132 41 Q140 36 146 37 L146 42 Z') : hl('M134 40 L146 38', 3)));
    case 'wing':
      if (id === 'swan') return svg(carBase(hl('M124 24 L148 22', 4) + hl('M132 40 Q130 26 136 22 M142 40 Q140 26 146 21', 2)));
      return svg(carBase(hl(`M122 ${id === 'gt' ? 22 : 31} L148 ${id === 'gt' ? 20 : 30}`, id === 'gt' ? 4 : 3) + hl(`M134 40 L134 ${id === 'gt' ? 22 : 31} M142 40 L142 ${id === 'gt' ? 21 : 30}`, 2)));
    case 'mirrors': return svg(carBase(fillA('M62 36 Q66 32 70 34 L69 38 Z')));
    case 'roofMod':
      if (id === 'vortex') return svg(carBase([0, 1, 2, 3].map((i) => hl(`M${100 + i * 4} 27 L${103 + i * 4} 23`, 2)).join('')));
      if (id === 'rack') return svg(carBase(hl('M78 24 L108 24', 2.5) + hl('M84 27 L84 24 M102 27 L102 24', 2)));
      if (id === 'box') return svg(carBase(fillA('M76 23 Q78 16 92 16 L110 17 Q114 18 114 23 Z', 0.7)));
      if (id === 'lightbar') return svg(carBase(hl('M78 23 L100 23', 4) + [81, 87, 93, 99].map((x) => `<circle cx="${x}" cy="23" r="2.3" fill="#fff"/>`).join('')));
      if (id === 'spoiler') return svg(carBase(hl('M104 27 L118 30', 3)));
      return svg(carBase(fillA('M92 27 L98 20 L108 20 L108 27 Z')));
    case 'tips': {
      const col = { titanium: '#8a7fd0', black: '#555', polished: '#e8e8e8', dualwall: '#e8e8e8' }[id] || '#cfd2d6';
      return svg(`<g stroke="${L}" stroke-width="2"><path d="M20 30 L120 30 L140 45 L140 70 L20 70" stroke="${D}"/></g>
        <ellipse cx="62" cy="54" rx="${id === 'polished' ? 17 : 14}" ry="${id === 'polished' ? 12 : 10}" stroke="${col}" stroke-width="4"/><ellipse cx="100" cy="54" rx="${id === 'polished' ? 17 : 14}" ry="${id === 'polished' ? 12 : 10}" stroke="${col}" stroke-width="4"/>
        ${id === 'dualwall' ? '<ellipse cx="62" cy="54" rx="9" ry="6" stroke="#e8e8e8" stroke-width="2.5"/><ellipse cx="100" cy="54" rx="9" ry="6" stroke="#e8e8e8" stroke-width="2.5"/>' : ''}`);
    }
    default: return svg(carBase());
  }
}

/* ---------------------------------------------------------------- wheels */
const WHEEL_SPEC = {
  five: [5, 'spoke', 9], split: [10, 'spoke', 4], multi: [10, 'spoke', 4.5], mesh: [20, 'mesh', 2], turbine: [14, 'twist', 4],
  yspoke: [5, 'y', 6], vspoke: [10, 'spoke', 3.5], six: [6, 'spoke', 5], gt: [20, 'spoke', 2], blade: [7, 'twist', 7],
  center: [10, 'twist', 3.5], aero: [5, 'disc', 0], deep: [6, 'spoke', 9], dish3: [24, 'mesh', 1.8], dish5: [5, 'spoke', 11],
  sdish: [12, 'spoke', 3], rs8: [8, 'spoke', 6], fan: [16, 'twist', 4], slot5: [5, 'slot', 0], steelie: [8, 'steel', 0],
};
const DEEP = { deep: 0.2, dish3: 0.26, dish5: 0.24, sdish: 0.34, slot5: 0.16, steelie: 0.14, rs8: 0.14 };

function wheelSvg(style, { size = 0, finish = 'gloss', rimColor = '#c9ccd0', big = false } = {}) {
  const [n, type, w] = WHEEL_SPEC[style] || WHEEL_SPEC.five;
  const cx = 80, cy = 45, R = 40;
  const rr = Math.min(36, 25 + size * 2.6);
  const lip = (DEEP[style] || 0.06) * rr;
  const ri = rr - lip;
  const fill = finish === 'chrome' || finish === 'polished' ? 'url(#shine)' : rimColor;
  const op = finish === 'matte' ? 0.75 : 1;
  let s = `<defs><linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="${rimColor}"/><stop offset="1" stop-color="#ddd"/></linearGradient></defs>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#151517" stroke="${D}" stroke-width="1.5"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="#0b0b0d" stroke="${DEEP[style] ? '#eef0f2' : fill}" stroke-width="${DEEP[style] ? Math.max(2, lip) : 2.5}" opacity="${op}"/>`;
  const sp = [];
  const g = (a, r0, r1, wd, tw = 0) => {
    const a0 = a, a1 = a + tw;
    sp.push(`<path d="M${cx + Math.cos(a0) * r0} ${cy + Math.sin(a0) * r0} L${cx + Math.cos(a1) * r1} ${cy + Math.sin(a1) * r1}" stroke="${fill}" stroke-width="${wd}" opacity="${op}"/>`);
  };
  if (type === 'disc' || type === 'steel') {
    sp.push(`<circle cx="${cx}" cy="${cy}" r="${ri - 1}" fill="${fill}" opacity="${op}"/>`);
    const holes = type === 'steel' ? 8 : 5;
    for (let i = 0; i < holes; i++) { const a = (i / holes) * Math.PI * 2; sp.push(type === 'steel' ? `<circle cx="${cx + Math.cos(a) * ri * 0.62}" cy="${cy + Math.sin(a) * ri * 0.62}" r="${ri * 0.14}" fill="#0b0b0d"/>` : `<path d="M${cx + Math.cos(a) * ri * 0.45} ${cy + Math.sin(a) * ri * 0.45} L${cx + Math.cos(a + 0.3) * ri * 0.85} ${cy + Math.sin(a + 0.3) * ri * 0.85}" stroke="#0b0b0d" stroke-width="3"/>`); }
  } else if (type === 'slot') {
    sp.push(`<circle cx="${cx}" cy="${cy}" r="${ri - 1}" fill="${fill}" opacity="${op}"/>`);
    for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2 + 0.6; sp.push(`<path d="M${cx + Math.cos(a) * ri * 0.4} ${cy + Math.sin(a) * ri * 0.4} L${cx + Math.cos(a) * ri * 0.82} ${cy + Math.sin(a) * ri * 0.82}" stroke="#0b0b0d" stroke-width="${ri * 0.2}"/>`); }
  } else {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      if (type === 'mesh') { g(a, 6, ri, w, 0.35); g(a, 6, ri, w, -0.35); }
      else if (type === 'twist') g(a, 6, ri, w, 0.45);
      else if (type === 'y') { g(a, 6, ri * 0.5, w); g(a + 0.18, ri * 0.48, ri, w * 0.55); g(a - 0.18, ri * 0.48, ri, w * 0.55); }
      else g(a, 6, ri, w);
    }
  }
  s += sp.join('');
  if (style === 'dish3') for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; s += `<circle cx="${cx + Math.cos(a) * ri * 0.93}" cy="${cy + Math.sin(a) * ri * 0.93}" r="0.9" fill="#fff"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${style === 'steelie' ? '#eef0f2' : fill}" stroke="#0b0b0d" stroke-width="1.5"/>`;
  return svg(s);
}

function tireSvg(type, letter = 'grey') {
  const grooves = { street: [0.3, 0.5, 0.7], sport: [0.33, 0.67], semi: [0.4, 0.6], track: [], drift: [0.5], drag: [0.5] }[type] || [0.3, 0.5, 0.7];
  let s = `<rect x="24" y="12" width="112" height="66" rx="10" fill="#1a1a1c" stroke="${L}" stroke-width="2"/>`;
  for (const f of grooves) s += `<path d="M28 ${12 + 66 * f} L132 ${12 + 66 * f}" stroke="#050506" stroke-width="3"/>`;
  if (type === 'street' || type === 'sport' || type === 'semi') for (let i = 0; i < 12; i++) s += `<path d="M${30 + i * 9} 16 L${36 + i * 9} 28 M${30 + i * 9} 74 L${36 + i * 9} 62" stroke="#050506" stroke-width="2"/>`;
  if (type === 'drift') for (let i = 0; i < 10; i++) s += `<rect x="${30 + i * 10}" y="16" width="5" height="14" fill="#050506"/><rect x="${34 + i * 10}" y="60" width="5" height="14" fill="#050506"/>`;
  if (type === 'drag') s += `<path d="M24 22 Q80 10 136 22 M24 68 Q80 80 136 68" stroke="${D}" stroke-width="2"/>`;
  return svg(s);
}
function letterSvg(letter) {
  const col = { grey: '#6a6b6e', white: '#f2f2f2', yellow: '#f2c230', red: '#e0283c' }[letter];
  return svg(`<circle cx="80" cy="45" r="40" fill="#1a1a1c" stroke="${L}" stroke-width="2"/><circle cx="80" cy="45" r="24" fill="#0b0b0d" stroke="${D}" stroke-width="2"/>
    <path id="arc" d="M48 45 A32 32 0 0 1 112 45" fill="none"/>${col ? `<text font-family="Arial" font-weight="800" font-size="10" letter-spacing="1.5" fill="${col}"><textPath href="#arc" startOffset="50%" text-anchor="middle">NO HESI</textPath></text>` : ''}`);
}

/* ---------------------------------------------------------------- mechanical icons */
function icon(group, it) {
  const t = k(it.tier);
  const lvl = (s) => s.replace(/TT/g, A);
  switch (group) {
    case 'springs': {
      const h = [34, 30, 26, 22][t], y0 = 45 - h / 2;
      let p = `M80 ${y0 - 6} L80 ${y0}`;
      for (let i = 0; i < 6; i++) p += ` L${i % 2 ? 66 : 94} ${y0 + (i + 0.5) * (h / 6)}`;
      p += ` L80 ${y0 + h} L80 ${y0 + h + 6}`;
      return svg(`<path d="${p}" stroke="${t ? A : L}" stroke-width="3"/><rect x="62" y="${y0 - 10}" width="36" height="5" rx="2" fill="${L}"/><rect x="62" y="${y0 + h + 6}" width="36" height="5" rx="2" fill="${L}"/>${t >= 2 ? `<path d="M104 ${y0} L104 ${y0 + h}" stroke="${D}" stroke-width="2"/>` : ''}`);
    }
    case 'brakes': {
      const r = [26, 28, 32, 35][t];
      return svg(`<circle cx="80" cy="45" r="${r}" stroke="${t === 3 ? '#8a8d92' : L}" stroke-width="4" fill="${t === 3 ? '#2a2b2e' : '#202124'}"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${80 + Math.cos(i) * r * 0.62}" cy="${45 + Math.sin(i) * r * 0.62}" r="1.6" fill="#0b0b0d"/>`).join('')}<circle cx="80" cy="45" r="8" fill="${L}"/><rect x="${78 + r * 0.55}" y="${45 - r * 0.55}" width="${10 + t * 2}" height="${r * 1.1}" rx="4" fill="${t ? A : '#888'}"/>`);
    }
    case 'weight': return svg(`<rect x="46" y="30" width="68" height="40" rx="6" stroke="${L}" stroke-width="2.5"/><text x="80" y="57" fill="#fff" font-family="Arial" font-weight="800" font-size="16" text-anchor="middle">${['0', '-3%', '-7%', '-12%'][t]}</text>${t ? `<path d="M120 26 L120 60 M113 52 L120 61 L127 52" stroke="${A}" stroke-width="3"/>` : ''}`);
    case 'trans': {
      const g = (x, y, on) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${on ? A : L}"/>`;
      return svg(`<path d="M50 28 L50 62 M80 28 L80 62 M110 28 L110 62 M50 45 L110 45" stroke="${L}" stroke-width="2.5"/>${g(50, 28)}${g(50, 62)}${g(80, 28, t >= 1)}${g(80, 62, t >= 2)}${g(110, 28, t >= 3)}${g(110, 62)}<rect x="74" y="8" width="12" height="12" rx="6" fill="${t ? A : L}"/>`);
    }
    case 'diff': return svg(`<circle cx="66" cy="45" r="18" stroke="${L}" stroke-width="3"/><circle cx="96" cy="45" r="14" stroke="${t ? A : L}" stroke-width="3"/>${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<path d="M${66 + Math.cos(a) * 18} ${45 + Math.sin(a) * 18} L${66 + Math.cos(a) * 22} ${45 + Math.sin(a) * 22}" stroke="${L}" stroke-width="3"/>`; }).join('')}`);
    case 'intake': return svg(`<path d="M44 34 L96 30 L96 60 L44 56 Z" stroke="${t ? A : L}" stroke-width="2.5" fill="#1b1b1e"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${52 + i * 7} 34 L${52 + i * 7} 56" stroke="${D}" stroke-width="2"/>`).join('')}<path d="M96 40 L124 40 L124 50 L96 50" stroke="${L}" stroke-width="2.5"/>`);
    case 'exhaust': return svg(`<rect x="34" y="34" width="56" height="22" rx="10" stroke="${L}" stroke-width="2.5"/><path d="M90 45 L122 45" stroke="${L}" stroke-width="6"/><ellipse cx="126" cy="45" rx="5" ry="8" stroke="${t ? A : L}" stroke-width="3"/>${t >= 3 ? `<path d="M134 38 L144 34 M134 52 L144 56 M135 45 L146 45" stroke="${A}" stroke-width="2"/>` : ''}`);
    case 'ecu': return svg(`<rect x="52" y="22" width="56" height="46" rx="4" stroke="${t ? A : L}" stroke-width="2.5"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${58 + i * 9} 16 L${58 + i * 9} 22 M${58 + i * 9} 68 L${58 + i * 9} 74" stroke="${L}" stroke-width="2"/>`).join('')}<text x="80" y="50" fill="#fff" font-family="Arial" font-weight="800" font-size="13" text-anchor="middle">${['MAP', 'ST1', 'ST2', 'RACE'][t]}</text>`);
    case 'boost': {
      const r = [14, 16, 19, 22][t];
      return svg(`<path d="M80 ${45 - r} A${r} ${r} 0 1 1 ${80 - r} 45 L${80 - r - 18} 45" stroke="${t ? A : L}" stroke-width="3"/><circle cx="80" cy="45" r="${r * 0.45}" stroke="${L}" stroke-width="2"/><path d="M80 ${45 - r} L118 ${45 - r} L118 ${45 - r + 10}" stroke="${L}" stroke-width="3"/>`);
    }
    case 'motor': return svg(`<rect x="46" y="28" width="56" height="34" rx="8" stroke="${t ? A : L}" stroke-width="2.5"/><path d="M102 45 L122 45" stroke="${L}" stroke-width="5"/><path d="M70 32 L62 46 L74 46 L66 60" stroke="${t ? A : L}" stroke-width="2.5"/>`);
    case 'battery': return svg(`<rect x="44" y="28" width="68" height="34" rx="4" stroke="${L}" stroke-width="2.5"/><rect x="112" y="38" width="6" height="14" fill="${L}"/>${[0, 1, 2].map((i) => `<rect x="${50 + i * 20}" y="34" width="16" height="22" fill="${i <= t - 1 ? A : D}"/>`).join('')}`);
    default: return svg(`<circle cx="80" cy="45" r="20" stroke="${L}" stroke-width="2"/>`);
  }
}

/* ---------------------------------------------------------------- interior */
function interiorThumb(group, it, cu) {
  const id = it.id;
  if (group === 'seats') {
    const shapes = {
      stock: 'M62 74 L58 40 Q58 22 72 20 L86 20 Q98 22 98 40 L96 74 Z', sport: 'M60 74 L56 38 Q56 24 70 22 L88 22 Q102 24 102 38 L98 74 Z M70 14 L88 14 L88 22 L70 22 Z',
      bucket: 'M58 74 L54 34 Q54 14 72 12 L86 12 Q104 14 104 34 L100 74 Z', carbonBucket: 'M58 74 L54 34 Q54 14 72 12 L86 12 Q104 14 104 34 L100 74 Z',
      race: 'M56 74 L52 30 Q52 10 72 8 L86 8 Q106 10 106 30 L102 74 Z', comfort: 'M60 74 L58 44 Q58 26 74 26 L86 26 Q100 26 100 44 L98 74 Z M68 12 L90 12 L90 24 L68 24 Z',
    };
    const fill = id === 'carbonBucket' ? 'url(#cf2)' : '#2a2b30';
    return svg(`<defs><pattern id="cf2" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#1d1d1f"/><path d="M0 0 L2 0 L2 2 L0 2 Z M2 2 L4 2 L4 4 L2 4 Z" fill="#3a3a3d"/></pattern></defs><path d="${shapes[id] || shapes.stock}" fill="${fill}" stroke="${id === 'stock' ? L : A}" stroke-width="2.5"/>${id === 'bucket' || id === 'race' || id === 'carbonBucket' ? '<ellipse cx="70" cy="30" rx="3" ry="6" fill="#0b0b0d"/><ellipse cx="88" cy="30" rx="3" ry="6" fill="#0b0b0d"/>' : ''}`);
  }
  if (group === 'seatMat') {
    const pat = { leather: '', alcantara: '<path d="M30 30 L130 30 M30 50 L130 50 M30 70 L130 70" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>', cloth: Array.from({ length: 20 }, (_, i) => `<path d="M${30 + i * 5} 15 L${30 + i * 5} 75" stroke="rgba(255,255,255,0.08)"/>`).join(''), quilt: Array.from({ length: 9 }, (_, i) => `<path d="M${20 + i * 15} 15 L${40 + i * 15} 75 M${40 + i * 15} 15 L${20 + i * 15} 75" stroke="rgba(255,255,255,0.18)"/>`).join(''), channel: Array.from({ length: 7 }, (_, i) => `<path d="M${36 + i * 15} 15 L${36 + i * 15} 75" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>`).join(''), perforated: Array.from({ length: 60 }, (_, i) => `<circle cx="${34 + (i % 12) * 8}" cy="${22 + Math.floor(i / 12) * 11}" r="1.4" fill="#0b0b0d"/>`).join('') }[id] ?? '';
    return svg(`<rect x="24" y="12" width="112" height="66" rx="8" fill="#3a2b24" stroke="${id === 'stock' ? L : A}" stroke-width="2"/>${pat}`);
  }
  if (group === 'intColor') {
    const c = { black: ['#151517', '#1f1f23'], redBlack: ['#151517', '#9e0f1d'], cognac: ['#7a4423', '#8a5029'], cream: ['#d8ccb4', '#e2d7c1'], blue: ['#1c2742', '#5a5f68'], tan: ['#a8773f', '#151517'] }[id] || ['#2a2b30', '#3a3b40'];
    return svg(`<path d="M58 74 L54 34 Q54 14 72 12 L86 12 Q104 14 104 34 L100 74 Z" fill="${c[0]}" stroke="${L}" stroke-width="2"/><path d="M68 70 L66 36 Q66 26 74 26 L84 26 Q92 26 92 36 L90 70 Z" fill="${c[1]}"/>`);
  }
  if (group === 'trim') {
    const f = { carbon: 'url(#cf3)', redCarbon: 'url(#cf4)', alu: '#9aa0a6', wood: '#6b4226', piano: '#050506', titanium: '#8f8576' }[id] || '#3a3b40';
    return svg(`<defs><pattern id="cf3" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#1d1d1f"/><path d="M0 0 L3 0 L3 3 L0 3 Z M3 3 L6 3 L6 6 L3 6 Z" fill="#3c3c40"/></pattern><pattern id="cf4" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#2a0a0e"/><path d="M0 0 L3 0 L3 3 L0 3 Z M3 3 L6 3 L6 6 L3 6 Z" fill="#7a1420"/></pattern></defs><path d="M14 40 Q80 26 146 40 L146 56 Q80 44 14 56 Z" fill="${f}" stroke="${id === 'stock' ? L : A}" stroke-width="2"/>${id === 'wood' ? '<path d="M20 44 Q80 32 140 44 M20 50 Q80 38 140 50" stroke="rgba(0,0,0,0.3)"/>' : ''}`);
  }
  if (group === 'steering') {
    if (id === 'race') return svg(`<path d="M44 28 L116 28 L120 52 Q80 70 40 52 Z" stroke="${A}" stroke-width="5"/><rect x="70" y="40" width="20" height="14" rx="3" fill="${L}"/><path d="M52 28 L60 24 L100 24 L108 28" stroke="${A}" stroke-width="2"/>`);
    const flat = id === 'rsFlat' || id === 'gtFlat';
    return svg(`<path d="${flat ? 'M48 60 A34 34 0 1 1 112 60 Z' : 'M80 11 A34 34 0 1 1 79.9 11'}" stroke="${id === 'stock' ? L : A}" stroke-width="6"/><path d="M50 50 L72 48 M110 50 L88 48 M80 60 L80 ${flat ? 60 : 78}" stroke="${L}" stroke-width="${id === 'momo3' ? 5 : 7}"/><circle cx="80" cy="47" r="9" fill="${L}"/>${id === 'gt3' ? `<path d="M80 11 L80 17" stroke="#e8c21c" stroke-width="5"/>` : ''}`);
  }
  if (group === 'knob') {
    const k2 = { alu: '<circle cx="80" cy="34" r="16" fill="url(#al)"/>', cueBall: '<circle cx="80" cy="34" r="16" fill="#f2f0ea"/>', leatherRound: '<ellipse cx="80" cy="36" rx="16" ry="13" fill="#2a2b30" stroke="#666"/>', ball: '<ellipse cx="80" cy="36" rx="14" ry="17" fill="#2a2b30" stroke="#666"/><circle cx="80" cy="24" r="6" fill="#999"/>' }[id] || '<ellipse cx="80" cy="36" rx="14" ry="16" fill="#2a2b30" stroke="#888"/>';
    return svg(`<defs><radialGradient id="al" cx="0.35" cy="0.35"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#8a8f95"/></radialGradient></defs><path d="M80 50 L80 76" stroke="${L}" stroke-width="5"/><path d="M60 78 L100 78" stroke="${D}" stroke-width="6"/>${k2}`);
  }
  if (group === 'floorMats') {
    const edge = { carpetRed: '#b0101c', carpetAccent: cu?.stitch || A, rubber: '#111', luxury: '#5a524a' }[id] || L;
    const body = id === 'rubber' ? '#121214' : id === 'luxury' ? '#5a524a' : '#2a2a2d';
    if (id === 'none') return svg(`<rect x="30" y="18" width="100" height="56" rx="6" stroke="${D}" stroke-width="2" stroke-dasharray="5 5"/>`);
    return svg(`<rect x="34" y="18" width="40" height="56" rx="6" fill="${body}" stroke="${edge}" stroke-width="3"/><rect x="86" y="18" width="40" height="56" rx="6" fill="${body}" stroke="${edge}" stroke-width="3"/>`);
  }
  if (group === 'ambient' || group === 'ambient2') {
    const col = id === 'off' ? '#333' : id === 'stock' ? '#9aa0a8' : id;
    return svg(`<path d="M14 54 Q80 34 146 54" stroke="${L}" stroke-width="2"/><path d="M18 60 Q80 41 142 60" stroke="${col}" stroke-width="4"/>${id !== 'off' ? `<path d="M18 60 Q80 41 142 60" stroke="${col}" stroke-width="14" opacity="0.18"/>` : ''}`);
  }
  return svg(`<rect x="30" y="20" width="100" height="50" rx="8" stroke="${L}"/>`);
}

/* ---------------------------------------------------------------- lights / windows / plates */
function lightThumb(group, it) {
  const id = it.id;
  if (group === 'headlights') {
    const col = { stock: '#f2f6ff', white: '#ffffff', xenon: '#a9c8ff', yellow: '#ffcf3a', warm: '#ffdcaa' }[id];
    return svg(`<path d="M20 30 Q24 22 48 22 L62 24 Q66 36 60 48 L28 48 Q18 44 20 30 Z" fill="#1d1e21" stroke="${L}" stroke-width="2"/><ellipse cx="42" cy="35" rx="10" ry="8" fill="${col}"/><path d="M62 28 L150 12 L150 66 L62 44 Z" fill="${col}" opacity="0.22"/>`);
  }
  if (group === 'taillights') {
    const op = { stock: 1, smoked: 0.6, dark: 0.32, clear: 1 }[id];
    return svg(`<path d="M24 30 L120 26 L136 40 L120 56 L24 52 Z" fill="${id === 'clear' ? '#c9ccd0' : '#ff2a1a'}" fill-opacity="${op}" stroke="${L}" stroke-width="2"/>${id === 'clear' ? '<path d="M40 41 L116 41" stroke="#ff2a1a" stroke-width="5"/>' : ''}`);
  }
  if (group === 'underglow') {
    const col = id === 'off' ? null : id;
    return svg(carBase(col ? `<ellipse cx="80" cy="76" rx="70" ry="8" fill="${col}" opacity="0.55"/><path d="M30 70 L130 70" stroke="${col}" stroke-width="3"/>` : ''));
  }
  if (group === 'plateStyle') {
    const st = {
      ca: ['#f4f4f2', '#18306e', '<text x="80" y="34" fill="#b32020" font-family="Georgia" font-style="italic" font-size="10" text-anchor="middle">California</text>'],
      jdm: ['#f0f0e8', '#2a6b3a', '<rect x="34" y="20" width="92" height="50" fill="none" stroke="#2a6b3a" stroke-width="2"/>'],
      eu: ['#f4f4f2', '#111', '<rect x="30" y="20" width="12" height="50" fill="#1d3f9e"/>'],
      yellow: ['#f2c230', '#111', ''], black: ['#0c0c0e', '#d9dcdf', '<rect x="34" y="22" width="92" height="46" fill="none" stroke="#c9ccd0" stroke-width="1.5"/>'],
      race: ['#f4f4f2', '#111', '<rect x="30" y="20" width="100" height="7" fill="#d0102a"/><rect x="30" y="63" width="100" height="7" fill="#d0102a"/>'],
    }[id] || ['#f4f4f2', '#111', ''];
    return svg(`<rect x="30" y="20" width="100" height="50" rx="4" fill="${st[0]}"/>${st[2]}<text x="${id === 'eu' ? 86 : 80}" y="58" fill="${st[1]}" font-family="Arial Narrow, Arial" font-weight="800" font-size="20" text-anchor="middle">NO HESI</text>`);
  }
  return svg('');
}

/* ---------------------------------------------------------------- paint */
export function paintThumb(kind, cu, val) {
  const c1 = cu.color, c2 = cu.color2 || '#0c0d0f';
  const sec = (m) => (m === 'contrast' ? c2 : m === 'black' ? '#0a0a0b' : m === 'carbon' ? 'url(#cfp)' : c1);
  const defs = '<defs><pattern id="cfp" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#1d1d1f"/><path d="M0 0 L2 0 L2 2 L0 2 Z M2 2 L4 2 L4 4 L2 4 Z" fill="#3a3a3d"/></pattern></defs>';
  const roof = sec(kind === 'roofPaint' ? val : cu.roofPaint), hood = sec(kind === 'hoodPaint' ? val : cu.hoodPaint);
  const wrap = kind === 'wrap' ? val : cu.wrap;
  let stripes = '';
  const wc = cu.wrapColor || '#f2f2f0';
  if (wrap === 'twin' || wrap === 'center' || wrap === 'hood') stripes = `<path d="${wrap === 'hood' ? 'M24 46 L50 42' : 'M16 50 L52 42 Q62 31 80 28 L104 28 Q118 30 128 40 L146 46'}" stroke="${wc}" stroke-width="${wrap === 'center' ? 5 : 2.5}"/>`;
  if (wrap === 'side') stripes = `<path d="M18 55 L146 55" stroke="${wc}" stroke-width="3"/>`;
  const lower = wrap === 'lower' ? `<path d="M14 62 L14 56 L148 56 L148 62 Z" fill="${c2}"/>` : '';
  const fade = wrap === 'fade' ? `<defs><linearGradient id="fd" x1="0" y1="0" x2="0" y2="1"><stop offset="0.3" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>` : '';
  const bodyFill = wrap === 'fade' ? 'url(#fd)' : c1;
  return svg(`${defs}${fade}<path d="${CAR} Z" fill="${bodyFill}" stroke="${L}" stroke-width="1.5"/>${lower}
    <path d="M60 36 Q64 29 80 27 L104 27 Q116 29 124 38 Z" fill="${roof}"/>
    <path d="M16 50 L30 45 L52 41 L50 46 L18 53 Z" fill="${hood}"/>${stripes}
    <path d="M64 37 L76 33 Q80 31 88 30 L106 30 Q114 32 118 38 Z" fill="#0d0f12"/>
    <g stroke="${L}" stroke-width="2" fill="#141416">${WHEELS}</g>`);
}

/* ---------------------------------------------------------------- entry points */
export function thumbFor(g, it, def, cu = {}) {
  if (!it) return svg('');
  if (g.cat === 'body') return bodyPart(g, it);
  if (g.id === 'wheels') return wheelSvg(it.id, { size: Number(cu.wheelSize) || 0, finish: cu.rimFinish, rimColor: cu.rimColor });
  if (g.id === 'wheelSize') return wheelSvg(cu.wheels || 'five', { size: Number(it.id), finish: cu.rimFinish, rimColor: cu.rimColor });
  if (g.id === 'rimFinish') return wheelSvg(cu.wheels || 'five', { size: Number(cu.wheelSize) || 0, finish: it.id, rimColor: it.id === 'chrome' || it.id === 'polished' ? '#e6e8ea' : it.id === 'brushed' ? '#a9adb2' : cu.rimColor });
  if (g.id === 'tire') return tireSvg(it.id);
  if (g.id === 'tireLetter') return letterSvg(it.id);
  if (g.cat === 'interior' || g.id === 'ambient2') return interiorThumb(g.id, it, cu);
  if (['headlights', 'taillights', 'underglow', 'plateStyle'].includes(g.id)) return lightThumb(g.id, it);
  return icon(g.id, it);
}

/** Icon for a whole group (the group list). */
export function groupThumb(g, def, cu) {
  if (g.type === 'paint') return paintThumb('', cu);
  if (g.type === 'color') return svg(`<circle cx="80" cy="45" r="24" fill="${cu[g.key] || '#888'}" stroke="${L}" stroke-width="2"/>`);
  if (g.id === 'stance') return svg(carBase(hl('M20 72 L140 72', 2) + hl('M40 76 L40 80 M122 76 L122 80', 2)));
  if (g.id === 'tint') return svg(`<path d="M30 60 L50 26 L120 26 L136 60 Z" fill="#020203" fill-opacity="${(cu.tintPct ?? 35) / 100}" stroke="${L}" stroke-width="2"/>`);
  if (g.id === 'plateText') return lightThumb('plateStyle', { id: cu.plateStyle || 'ca' });
  const it = (g.items || []).find((x) => String(x.id) === String(cu[g.key])) || (g.items || [])[0];
  return thumbFor(g, it, def, cu);
}
