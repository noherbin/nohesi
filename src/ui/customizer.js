// Customize screen: a garage configurator in the style of big racing games. Horizontal category tabs, a
// vertical list of slots and items with thumbnails, a large item card with stats and pricing, and the car in
// the middle, which the camera frames for whatever is being worked on (inside the cabin for the interior).
//
// Everything previews instantly on the car without being bought; leaving a slot puts back what is fitted.
// Parts are bought once per car and can be swapped back for free; resprays, tint film and plates are paid
// for each time. All choices are saved in the car's customisation (save.customs[carId]).
import { CAR_BY_ID } from '../config/cars.js';
import {
  CATEGORIES, TIERS, groupsFor, itemsFor, itemOf, STANCE_LIMITS, STANCE_SLIDERS, TINT_RANGE, PAINT_COLORS, FACTORY_COLORS,
  PAINT_FINISH_ITEMS, PAINT_SECTIONS, SECTION_MODES, WRAPS, PAINT_PRICES, factoryCustom,
} from '../config/parts.js';
import { money } from '../gameplay/economy.js';
import { thumbFor, groupThumb, paintThumb } from './thumbs.js';
import { classBadge, limitMeter } from './classBadge.js';

const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};
const txt = (tag, cls, text) => { const e = el(tag, cls); e.textContent = text; return e; };
const clampN = (v, a, b) => Math.min(b, Math.max(a, v));

// where the camera goes while browsing each category's slot list
// which part a slot changes, for the garage close-ups and show effects
const fxKey = (g) => (g.type === 'paint' ? 'paint' : g.id === 'tint' ? 'tint' : g.id === 'plateText' ? 'plate' : g.key || g.id);
const CAT_VIEW = { paint: 'paint', body: 'three', wheels: 'wheel', tires: 'wheel', suspension: 'stance', performance: 'three', engine: 'three', interior: 'interior', windows: 'three', plates: 'plate' };
const PAINT_KEYS = ['color', 'finish', 'color2', 'roofPaint', 'hoodPaint', 'mirrorPaint', 'kitColor', 'wrap', 'wrapColor'];
const STAT_ROWS = [['speed', 'SPEED'], ['handling', 'HANDLING'], ['accel', 'ACCELERATION'], ['launch', 'LAUNCH'], ['braking', 'BRAKING']];
const TINT_SLIDER = { key: 'tintPct', name: 'Tint Darkness', unit: '%', step: 5, lim: null };

/* ---------------------------------------------------------------- colour maths */
const hexToRgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgbToHex = (r, g, b) => '#' + [r, g, b].map((v) => clampN(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx];
}
function hsvToRgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

export class Customizer {
  constructor(ui) {
    this.ui = ui;
    this.game = ui.game;
    this.catId = 'paint';
    this.level = 'groups';
    this.gi = 0;
    this.ii = 0;
    this.modal = null;
    this._previewT = 0;
    this._bindKeys();
    $('cz-back').addEventListener('click', () => { this.game.audio.click(); this.back(true); });
    $('cz-rev').addEventListener('click', () => this.game.revPreview());
    $('cz-drive').addEventListener('click', () => { this.game.audio.click(); this.ui.go('setup'); });
  }

  /* ---------------------------------------------------------------- state */
  get def() { return CAR_BY_ID[this.carId]; }
  get saved() { return this.game.getCustom(this.carId); }
  get econ() { return this.game.econ; }
  get cats() { return CATEGORIES.filter((c) => groupsFor(this.def, c).length); }
  get cat() { return this.cats.find((c) => c.id === this.catId) || this.cats[0]; }
  get groups() { return groupsFor(this.def, this.cat); }
  get group() { return this.groups[clampN(this.gi, 0, this.groups.length - 1)]; }

  open(carId) {
    this.carId = carId;
    this.draft = { ...this.saved };
    this.game.previewCustom(carId, this.draft); // the car on the turntable (already there when coming from the garage)
    this.level = 'groups';
    if (!this.cats.some((c) => c.id === this.catId)) this.catId = this.cats[0].id;
    this.gi = clampN(this.gi, 0, this.groups.length - 1);
    this._dir = 0;
    if (this.groups.length === 1) return this.openGroup(0, true);
    this.render(true);
    this.game.garage.setView(CAT_VIEW[this.cat.id] || 'three');
  }

  /** A category with a single slot (the paint shop) has no slot list: it opens straight into the slot. */
  get single() { return this.groups.length === 1; }

  /** Leaving Customize: drop any unbought preview and step back out of the car. */
  close() {
    this.closeModal();
    if (this.carId) this.game.showGarageCar(this.carId);
    this.game.garage.setView('three');
    this.level = 'groups';
  }

  /* ---------------------------------------------------------------- rows */
  rows() {
    if (this.level === 'groups') return this.groups.map((g) => ({ kind: 'group', g }));
    const g = this.group, def = this.def;
    if (g.type === 'part') return itemsFor(def, g).map((it) => ({ kind: 'item', it }));
    if (g.type === 'color') return [...g.colors.map((c) => ({ kind: 'swatch', color: c })), { kind: 'custom' }];
    if (g.type === 'slider') return g.id === 'tint' ? [{ kind: 'slider', s: TINT_SLIDER }] : STANCE_SLIDERS.map((s) => ({ kind: 'slider', s }));
    if (g.type === 'text') return [{ kind: 'text' }];
    if (g.type === 'paint') {
      const r = [{ kind: 'pcolor', key: 'color', name: 'Body Colour' }, { kind: 'pfinish', name: 'Paint Finish' }, { kind: 'pcolor', key: 'color2', name: 'Contrast Colour' }];
      for (const sct of PAINT_SECTIONS) if (!sct.fits || sct.fits(def)) r.push({ kind: 'psection', key: sct.key, name: sct.name, note: sct.note });
      r.push({ kind: 'pwrap', name: 'Livery' }, { kind: 'pcolor', key: 'wrapColor', name: 'Livery Colour' }, { kind: 'psaved', name: 'Saved Paints' });
      return r;
    }
    return [];
  }

  /* ---------------------------------------------------------------- pending changes & prices */
  keysOf(g) {
    if (g.type === 'paint') return PAINT_KEYS;
    if (g.type === 'slider') return g.id === 'tint' ? ['tintPct'] : STANCE_SLIDERS.map((s) => s.key);
    return [g.key];
  }
  pending(g = this.group) { return this.keysOf(g).some((k) => String(this.draft[k]) !== String(this.saved[k])); }

  paintCost() {
    const d = this.draft, s = this.saved;
    let c = 0;
    const lines = [];
    if (d.color !== s.color || d.finish !== s.finish) {
      const f = PAINT_FINISH_ITEMS.find((x) => x.id === d.finish);
      const n = PAINT_PRICES.color + (d.finish !== s.finish ? f?.price || 0 : 0);
      c += n; lines.push(['Respray' + (d.finish !== s.finish ? ` · ${f?.name}` : ''), n]);
    }
    if (d.color2 !== s.color2) { c += PAINT_PRICES.color2; lines.push(['Contrast colour', PAINT_PRICES.color2]); }
    for (const sct of PAINT_SECTIONS) {
      if (d[sct.key] === s[sct.key]) continue;
      const n = sct.key === 'kitColor' ? PAINT_PRICES.kitColor : d[sct.key] === 'carbon' ? PAINT_PRICES.sectionCarbon : PAINT_PRICES.section;
      c += n; lines.push([`${sct.name} · ${SECTION_MODES.find((m) => m[0] === d[sct.key])?.[1] || d[sct.key]}`, n]);
    }
    if (d.wrap !== s.wrap) { const w = WRAPS.find((x) => x.id === d.wrap); c += w?.price || 0; lines.push([`Livery · ${w?.name}`, w?.price || 0]); }
    if (d.wrapColor !== s.wrapColor && d.wrap !== 'none') { c += PAINT_PRICES.wrapColor; lines.push(['Livery colour', PAINT_PRICES.wrapColor]); }
    return { cost: c, lines };
  }

  /** What the main action would do for the current selection: { label, price, enabled, kind, note }. */
  action() {
    const g = this.group, d = this.draft, s = this.saved, E = this.econ;
    if (this.level === 'groups') return { label: 'BROWSE', enabled: true, kind: 'open' };
    if (g.type === 'part') {
      const v = d[g.key];
      if (String(v) === String(s[g.key])) return { label: 'INSTALLED', enabled: false, kind: 'none', installed: true };
      if (E.ownsPart(this.carId, g.key, v)) return { label: 'INSTALL', price: 0, enabled: true, kind: 'apply', owned: true };
      const p = E.price(g.key, v);
      return { label: 'PURCHASE', price: p, enabled: E.canAfford(p), kind: 'buy', short: E.canAfford(p) ? 0 : p - E.cash };
    }
    if (!this.pending(g)) return { label: 'NO CHANGES', enabled: false, kind: 'none' };
    const p = g.type === 'paint' ? this.paintCost().cost : g.type === 'slider' && g.id !== 'tint' ? 0 : g.price || 0;
    return { label: p ? 'PURCHASE' : 'APPLY', price: p, enabled: E.canAfford(p), kind: p ? 'buy' : 'apply', short: E.canAfford(p) ? 0 : p - E.cash };
  }

  /* ---------------------------------------------------------------- preview */
  preview(now = false) {
    clearTimeout(this._pvT);
    const run = () => {
      this.game.previewCustom(this.carId, this.draft);
      // the part just put on the car shows itself off
      if (this._pulseKey) { this.game.garage.pulse(this._pulseKey); this._pulseKey = null; }
    };
    // rebuilding a car takes a moment: while the selection is still moving, wait for it to settle
    if (now) run();
    else this._pvT = setTimeout(run, 90);
  }

  revertGroup(g = this.group) {
    for (const k of this.keysOf(g)) this.draft[k] = this.saved[k];
    this.preview(true);
  }

  /* ---------------------------------------------------------------- navigation */
  move(dir) {
    const n = this.rows().length;
    if (!n) return;
    const i = clampN((this.level === 'groups' ? this.gi : this.ii) + dir, 0, n - 1);
    if (this.level === 'groups') this.gi = i; else this.ii = i;
    this.game.audio.click();
    this.onSelect();
    if (this.level === 'groups') this._lookAtGroup();
    this.render();
  }

  /** The selection moved: items preview immediately on the car. */
  onSelect() {
    if (this.level !== 'items') return;
    const r = this.rows()[this.ii];
    const g = this.group;
    if (r?.kind === 'item') { this.draft[g.key] = r.it.id; this._pulseKey = fxKey(g); this.preview(); }
    if (r?.kind === 'swatch') { this.draft[g.key] = r.color; this._pulseKey = fxKey(g); this.preview(true); }
  }

  /** Left / right: switch category at the slot list; change the value of a paint row or slider. */
  side(dir) {
    if (this.modal) return;
    if (this.level === 'groups') return this.switchCat(dir);
    const r = this.rows()[this.ii];
    const g = this.group;
    if (r?.kind === 'slider') return this.nudge(r.s, dir);
    if (g.type === 'paint') return this.paintCycle(r, dir);
    if (g.type === 'color' || g.type === 'part') { if (dir < 0) this.back(); return; }
    if (dir < 0) this.back();
  }

  /** At the slot list: the camera flies to the part the highlighted slot changes. */
  _lookAtGroup() {
    const g = this.groups[this.gi];
    if (!g) return;
    this.game.garage.focusPart(fxKey(g), g.view || CAT_VIEW[this.cat.id] || 'three');
    this.game.garage.fx.punch = 0.6;
  }

  switchCat(dir) {
    const cats = this.cats;
    const i = cats.findIndex((c) => c.id === this.cat.id);
    const j = clampN(i + dir, 0, cats.length - 1);
    if (j === i) return;
    if (this.level === 'items') this.revertGroup();
    this.catId = cats[j].id;
    this.level = 'groups';
    this.gi = 0;
    this._dir = dir;
    this.game.audio.click();
    this.game.audio.whoosh(dir, 0.55, 30);
    this.game.garage.whoosh();
    if (this.single) return this.openGroup(0, true);
    this.game.garage.setView(CAT_VIEW[this.catId] || 'three');
    this.render(true);
  }

  selectCat(id) {
    const cats = this.cats;
    const d = cats.findIndex((c) => c.id === id) - cats.findIndex((c) => c.id === this.cat.id);
    if (d) this.switchCat(d);
  }

  enter() {
    if (this.modal) return this.confirmModal();
    if (this.level === 'groups') return this.openGroup(this.gi);
    const r = this.rows()[this.ii];
    if (r?.kind === 'custom') return;
    this.act();
  }

  openGroup(i, quiet = false) {
    this.gi = i;
    const g = this.group;
    this.level = 'items';
    const rows = this.rows();
    if (g.type === 'part') this.ii = Math.max(0, rows.findIndex((r) => String(r.it.id) === String(this.saved[g.key])));
    else if (g.type === 'color') { const k = rows.findIndex((r) => r.color?.toLowerCase() === String(this.saved[g.key]).toLowerCase()); this.ii = k >= 0 ? k : rows.length - 1; }
    else this.ii = 0;
    this._dir = 1;
    if (!quiet) this.game.audio.click();
    this.game.garage.focusPart(fxKey(g), g.view || 'three');
    this.render(true);
  }

  /** Escape / B / the back button: close a dialog, leave a slot (dropping its preview), or leave Customize. */
  back(fromButton = false) {
    if (this.modal) { this.closeModal(); return true; }
    if (this.level === 'items' && !this.single) {
      this.revertGroup();
      this.level = 'groups';
      this._dir = -1;
      this.game.audio.click();
      this.game.garage.setView(CAT_VIEW[this.cat.id] || 'three');
      this.render(true);
      return true;
    }
    this.ui.go('garage');
    return false;
  }

  /* ---------------------------------------------------------------- actions */
  act() {
    const a = this.action();
    if (!a.enabled) { if (a.kind === 'buy') this._shake(); return; }
    if (a.kind === 'open') return this.openGroup(this.gi);
    const g = this.group;
    const name = this.actionName();
    if (a.kind === 'apply') return this.commit(g, 0, name);
    this.openModal({
      title: 'CONFIRM PURCHASE', name, price: a.price, after: this.econ.cash - a.price,
      lines: g.type === 'paint' ? this.paintCost().lines : null,
      ok: () => this.commit(g, a.price, name),
    });
  }

  actionName() {
    const g = this.group, d = this.draft;
    if (g.type === 'part') return itemOf(g.key, d[g.key])?.name || g.name;
    if (g.type === 'paint') return 'Paint job';
    if (g.type === 'color') return `${g.name} · ${String(d[g.key]).toUpperCase()}`;
    if (g.id === 'tint') return `Window tint · ${d.tintPct}%`;
    if (g.type === 'text') return `Plate · ${d.plate}`;
    return g.name;
  }

  commit(g, price, name) {
    const E = this.econ;
    if (g.type === 'part') {
      if (!E.buyPart(this.carId, g.key, this.draft[g.key])) return this._shake();
    } else if (price && !E.spend(price)) return this._shake();
    const s = this.saved;
    for (const k of this.keysOf(g)) s[k] = this.draft[k];
    this.game.setCustom(this.carId, s);
    this._pulseKey = null;
    this.preview(true);
    this.game.audio.bigChime();
    // the install show: camera swoop, flash, sparks, and the part shows itself off
    const key = fxKey(g);
    const color = g.type === 'paint' ? s.color : g.type === 'color' ? s[g.key] : key === 'underglow' && s.underglow !== 'off' ? s.underglow : null;
    const kind = this.game.garage.install(key, { color });
    if (kind === 'engine') setTimeout(() => this.game.revPreview(), 380);
    this.game.audio.whoosh(0, 0.8, 10);
    this._celebrate(price ? 'PURCHASED' : 'INSTALLED', name);
    this.render();
  }

  _celebrate(head, name) {
    // a big stamp over the car (it replaces the toast)
    document.querySelector('.cz-stamp')?.remove();
    const st = el('div', 'cz-stamp');
    st.append(el('i'), txt('b', '', head), txt('span', '', name));
    $('s-custom').appendChild(st);
    setTimeout(() => st.remove(), 2100);
    // white flash across the screen
    const fl = el('div', 'cz-flash');
    $('s-custom').appendChild(fl);
    setTimeout(() => fl.remove(), 700);
    const card = $('cz-card');
    card.classList.remove('cz-done');
    void card.offsetWidth;
    card.classList.add('cz-done');
    const b = el('div', 'cz-burst');
    b.innerHTML = '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="21"/><path d="M14 25 L21 32 L35 17"/></svg>';
    card.appendChild(b);
    setTimeout(() => b.remove(), 1200);
  }

  _shake() {
    const btn = document.querySelector('#cz-card .cz-act');
    if (!btn) return;
    btn.classList.remove('cz-shake');
    void btn.offsetWidth;
    btn.classList.add('cz-shake');
  }

  /* ---------------------------------------------------------------- modal */
  openModal(m) {
    this.modal = m;
    const box = $('cz-modal');
    box.innerHTML = '';
    const card = el('div', 'cz-modal-card');
    card.appendChild(txt('div', 'cz-mk', m.title));
    card.appendChild(txt('h3', '', m.name));
    if (m.lines?.length) {
      const ul = el('div', 'cz-mlines');
      for (const [n, p] of m.lines) { const r = el('div', 'cz-mline'); r.append(txt('span', '', n), txt('b', '', money(p))); ul.appendChild(r); }
      card.appendChild(ul);
    }
    const t = el('div', 'cz-mtotal');
    t.append(txt('span', '', 'PRICE'), txt('b', 'cz-mprice', money(m.price)));
    card.appendChild(t);
    const bal = el('div', 'cz-mbal');
    bal.append(txt('span', '', `Balance ${money(this.econ.cash)}`), txt('span', '', `After ${money(m.after)}`));
    card.appendChild(bal);
    const btns = el('div', 'cz-mbtns');
    const ok = txt('button', 'cz-btn primary', 'CONFIRM');
    ok.onclick = () => this.confirmModal();
    const no = txt('button', 'cz-btn', 'CANCEL');
    no.onclick = () => { this.game.audio.click(); this.closeModal(); };
    btns.append(ok, no);
    card.appendChild(btns);
    card.appendChild(txt('div', 'cz-mhint', 'Enter to confirm · Esc to cancel'));
    box.appendChild(card);
    box.classList.add('open');
    ok.focus();
  }

  confirmModal() {
    const m = this.modal;
    this.closeModal();
    m?.ok();
  }

  closeModal() {
    this.modal = null;
    $('cz-modal')?.classList.remove('open');
  }

  /* ---------------------------------------------------------------- sliders */
  limits(s) {
    if (s.key === 'tintPct') return TINT_RANGE;
    const L = STANCE_LIMITS[this.saved.springs] || STANCE_LIMITS.stock;
    return L[s.lim];
  }

  nudge(s, dir) {
    const [a, b] = this.limits(s);
    if (a === b) { this._shake(); return; }
    this.draft[s.key] = clampN(Math.round((Number(this.draft[s.key]) + dir * s.step) / s.step) * s.step, a, b);
    this.game.audio.click();
    this.preview(true);
    this.render();
  }

  /* ---------------------------------------------------------------- paint */
  paintOptions(r) {
    if (r.kind === 'pcolor') return [...new Set([...(FACTORY_COLORS[this.carId] || []), ...PAINT_COLORS])];
    if (r.kind === 'pfinish') return PAINT_FINISH_ITEMS.map((x) => x.id);
    if (r.kind === 'psection') return r.key === 'kitColor' ? ['black', 'body', 'contrast', 'carbon'] : SECTION_MODES.map((m) => m[0]);
    if (r.kind === 'pwrap') return WRAPS.map((w) => w.id);
    return [];
  }
  paintKey(r) { return r.kind === 'pfinish' ? 'finish' : r.kind === 'pwrap' ? 'wrap' : r.key; }

  paintCycle(r, dir) {
    if (r?.kind === 'psaved') {
      const list = this.game.save.paints || [];
      if (!list.length) return;
      this._savedI = clampN((this._savedI ?? -1) + dir, 0, list.length - 1);
      this.loadSaved(list[this._savedI]);
      return;
    }
    const opts = this.paintOptions(r);
    if (!opts.length) return;
    const key = this.paintKey(r);
    const i = opts.findIndex((o) => String(o).toLowerCase() === String(this.draft[key]).toLowerCase());
    this.draft[key] = opts[clampN(i + dir, 0, opts.length - 1)];
    this.game.audio.click();
    this.preview(true);
    this.render();
  }

  setPaint(key, v) {
    this.draft[key] = v;
    this.preview(true);
    this.render();
  }

  loadSaved(p) {
    for (const k of PAINT_KEYS) if (p[k] !== undefined) this.draft[k] = p[k];
    this.preview(true);
    this.render();
  }

  savePaint() {
    const list = (this.game.save.paints ||= []);
    if (list.length >= 12) list.shift();
    const p = { name: `Paint ${(this.game.save.paintN = (this.game.save.paintN || 0) + 1)}` };
    for (const k of PAINT_KEYS) p[k] = this.draft[k];
    list.push(p);
    this.game.saveNow();
    this.ui.toast(`SAVED · ${p.name.toUpperCase()}`, 'good');
    this.render();
  }

  /* ---------------------------------------------------------------- input */
  _bindKeys() {
    window.addEventListener('keydown', (e) => {
      if (this.ui.screen !== 'custom') return;
      const typing = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
      if (typing && e.code !== 'Enter') return;
      const k = e.code;
      if (k === 'ArrowUp' || k === 'KeyW') { e.preventDefault(); this.move(-1); }
      else if (k === 'ArrowDown' || k === 'KeyS') { e.preventDefault(); this.move(1); }
      else if (k === 'ArrowLeft' || k === 'KeyA') { e.preventDefault(); this.side(-1); }
      else if (k === 'ArrowRight' || k === 'KeyD') { e.preventDefault(); this.side(1); }
      else if (k === 'Enter' || k === 'NumpadEnter' || (k === 'Space' && !typing)) {
        e.preventDefault();
        // Enter in a text field just commits the field (the purchase still needs a second Enter)
        if (typing) { e.target.blur(); return; }
        this.enter();
      }
      else if (k === 'PageUp') { e.preventDefault(); this.switchCat(-1); }
      else if (k === 'PageDown' || k === 'Tab') { e.preventDefault(); this.switchCat(e.shiftKey ? -1 : 1); }
    });
  }

  /** Gamepad / queued actions routed here by the game loop while Customize is open. */
  input(I) {
    if (I.take('pause') || I.take('back')) this.back();
    if (I.take('navUp')) this.move(-1);
    if (I.take('navDown')) this.move(1);
    if (I.take('navLeft')) this.side(-1);
    if (I.take('navRight')) this.side(1);
    if (I.take('confirm')) this.enter();
    if (I.take('gearDown')) this.switchCat(-1); // LB / Q
    if (I.take('gearUp')) this.switchCat(1); // RB / E
  }

  /** Per frame: right stick turns the car (or looks around inside), triggers zoom. */
  update(dt) {
    const pad = this.game.input.pad;
    if (pad) {
      const rx = pad.axes[2] || 0, ry = pad.axes[3] || 0;
      const dz = (v) => (Math.abs(v) < 0.15 ? 0 : v);
      if (dz(rx) || dz(ry)) this.game.garage.drag(dz(rx) * 600 * dt, dz(ry) * 300 * dt);
      const zt = (pad.buttons[7]?.value ?? 0) - (pad.buttons[6]?.value ?? 0);
      if (Math.abs(zt) > 0.1) this.game.garage.wheelZoom(-zt * 900 * dt);
      if (this._padHints !== this.game.input.padActive) { this._padHints = this.game.input.padActive; this.renderHints(); }
    }
  }

  /* ================================================================ rendering */
  render(anim = false) {
    if (!this.carId) return;
    const def = this.def;
    $('cz-car').textContent = def.name.toUpperCase();
    $('cz-maker').textContent = def.maker.toUpperCase();
    $('cz-cash').textContent = money(this.econ.cash);
    const r = this.game.ratings(def, this.saved);
    $('cz-pi').replaceChildren(classBadge(r, { size: 'sm' }));
    this.renderTabs();
    this.renderList(anim);
    this.renderCard(anim);
    this.renderHints();
  }

  renderTabs() {
    const bar = $('cz-cats');
    const cats = this.cats;
    if (bar.dataset.car !== this.carId) {
      bar.dataset.car = this.carId;
      bar.querySelectorAll('.cz-tab').forEach((t) => t.remove());
      for (const c of cats) {
        const b = txt('button', 'cz-tab', c.name.toUpperCase());
        b.dataset.cat = c.id;
        b.onclick = () => this.selectCat(c.id);
        bar.appendChild(b);
      }
    }
    let sel = null;
    bar.querySelectorAll('.cz-tab').forEach((t) => { const on = t.dataset.cat === this.cat.id; t.classList.toggle('sel', on); if (on) sel = t; });
    const ind = $('cz-ind');
    if (sel) {
      ind.style.width = `${sel.offsetWidth}px`;
      ind.style.transform = `translateX(${sel.offsetLeft}px)`;
      sel.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    }
  }

  renderList(anim) {
    const g = this.group;
    const crumb = $('cz-crumb');
    crumb.innerHTML = '';
    crumb.append(txt('span', '', this.cat.name.toUpperCase()));
    if (this.level === 'items') crumb.append(txt('i', '', '/'), txt('b', '', g.name.toUpperCase()));
    const box = $('cz-rows');
    box.innerHTML = '';
    box.classList.toggle('anim', !!anim);
    box.dataset.dir = this._dir > 0 ? 'in' : this._dir < 0 ? 'out' : 'in';
    const rows = this.rows();
    const sel = this.level === 'groups' ? this.gi : this.ii;
    rows.forEach((r, i) => {
      const row = this.row(r, i === sel);
      row.style.setProperty('--i', i);
      row.addEventListener('click', (e) => {
        if (e.target.closest('input, .cz-sw, .cz-mini')) return;
        if (this.level === 'groups') { if (i === this.gi) this.openGroup(i); else { this.gi = i; this.game.audio.click(); this.render(); } }
        else if (i !== this.ii) { this.ii = i; this.game.audio.click(); this.onSelect(); this.render(); }
        else if (r.kind === 'item' || r.kind === 'swatch') this.act();
      });
      if (this.level === 'groups') row.addEventListener('dblclick', () => this.openGroup(i));
      box.appendChild(row);
    });
    const s = box.children[sel];
    if (s) requestAnimationFrame(() => s.scrollIntoView({ block: 'nearest', behavior: anim ? 'auto' : 'smooth' }));
  }

  row(r, sel) {
    const d = this.draft, s = this.saved, def = this.def, E = this.econ;
    const row = el('div', 'cz-row' + (sel ? ' sel' : ''));
    const th = el('div', 'cz-th');
    const main = el('div', 'cz-rm');
    const right = el('div', 'cz-rr');
    if (r.kind === 'group') {
      const g = r.g;
      th.innerHTML = groupThumb(g, def, s);
      main.append(txt('div', 'cz-rn', g.name));
      main.append(txt('div', 'cz-rs', this.groupSummary(g)));
      right.append(txt('span', 'cz-chev', '›'));
    } else if (r.kind === 'item') {
      const g = this.group, it = r.it;
      th.innerHTML = thumbFor(g, it, def, d);
      main.append(txt('div', 'cz-rn', it.name));
      const tr = TIERS[it.tier] || TIERS.stock;
      const tier = txt('span', 'cz-tier', tr.name);
      tier.style.setProperty('--tc', tr.color);
      main.append(tier);
      const fitted = String(s[g.key]) === String(it.id);
      const owned = E.ownsPart(this.carId, g.key, it.id);
      if (fitted) right.append(txt('span', 'cz-badge fit', 'INSTALLED'));
      else if (owned) right.append(txt('span', 'cz-badge own', 'OWNED'));
      else right.append(txt('span', 'cz-price' + (E.canAfford(it.price) ? '' : ' no'), money(it.price)));
    } else if (r.kind === 'swatch') {
      th.innerHTML = `<div class="cz-swbig" style="background:${r.color}"></div>`;
      main.append(txt('div', 'cz-rn', r.color.toUpperCase()));
      if (r.color.toLowerCase() === String(s[this.group.key]).toLowerCase()) right.append(txt('span', 'cz-badge fit', 'CURRENT'));
    } else if (r.kind === 'custom') {
      th.innerHTML = `<div class="cz-swbig cz-rainbow"></div>`;
      main.append(txt('div', 'cz-rn', 'Custom Colour'));
      main.append(txt('div', 'cz-rs', 'Pick any colour in the card'));
    } else if (r.kind === 'slider') {
      row.classList.add('cz-srow');
      const sl = r.s;
      const [a, b] = this.limits(sl);
      const v = Number(d[sl.key]);
      const head = el('div', 'cz-shead');
      head.append(txt('span', 'cz-rn', sl.name), txt('b', 'cz-sval' + (String(v) !== String(s[sl.key]) ? ' chg' : ''), `${v > 0 && sl.unit !== '%' ? '+' : ''}${sl.step < 1 ? v.toFixed(2) : v}${sl.unit}`));
      main.append(head);
      const inp = document.createElement('input');
      inp.type = 'range';
      inp.className = 'cz-range';
      inp.min = a; inp.max = b; inp.step = sl.step; inp.value = v;
      inp.disabled = a === b;
      const pct = b > a ? ((v - a) / (b - a)) * 100 : 50;
      inp.style.setProperty('--p', `${pct}%`);
      inp.oninput = () => {
        this.draft[sl.key] = Number(inp.value);
        inp.style.setProperty('--p', `${((Number(inp.value) - a) / Math.max(1e-6, b - a)) * 100}%`);
        head.querySelector('.cz-sval').textContent = `${Number(inp.value) > 0 && sl.unit !== '%' ? '+' : ''}${sl.step < 1 ? Number(inp.value).toFixed(2) : inp.value}${sl.unit}`;
        // ride height, camber and track preview live on the built car
        this.game.garage.live(this.draft);
      };
      inp.onchange = () => { this.preview(true); this.renderCard(); };
      main.append(inp);
      if (a === b) main.append(txt('div', 'cz-rs', 'Fit adjustable suspension to change this'));
    } else if (r.kind === 'text') {
      th.innerHTML = groupThumb(this.group, def, d);
      main.append(txt('div', 'cz-rn', 'Plate Text'));
      main.append(txt('div', 'cz-rs', d.plate || this.game.S.plate || 'NO HESI'));
    } else {
      // paint shop rows
      if (r.kind === 'pcolor') th.innerHTML = `<div class="cz-swbig" style="background:${d[r.key]}"></div>`;
      else if (r.kind === 'psection') th.innerHTML = paintThumb(r.key, d, d[r.key]);
      else if (r.kind === 'pwrap') th.innerHTML = paintThumb('wrap', d, d.wrap);
      else if (r.kind === 'pfinish') th.innerHTML = `<div class="cz-swbig cz-fin-${d.finish}" style="--c:${d.color}"></div>`;
      else th.innerHTML = paintThumb('', d);
      main.append(txt('div', 'cz-rn', r.name));
      main.append(txt('div', 'cz-rs', this.paintSummary(r)));
      const key = this.paintKey(r);
      if (key && String(d[key]) !== String(s[key])) right.append(txt('span', 'cz-badge chg', 'CHANGED'));
      else if (r.kind !== 'psaved') right.append(txt('span', 'cz-lr', '‹ ›'));
    }
    row.append(th, main, right);
    return row;
  }

  groupSummary(g) {
    const s = this.saved;
    if (g.type === 'part') return itemOf(g.key, s[g.key])?.name || '—';
    if (g.type === 'color') return String(s[g.key]).toUpperCase();
    if (g.type === 'paint') return `${PAINT_FINISH_ITEMS.find((f) => f.id === s.finish)?.name || ''} · ${WRAPS.find((w) => w.id === s.wrap)?.name || ''}`;
    if (g.id === 'tint') return `${s.tintPct}% darkness`;
    if (g.id === 'stance') return `${s.rideF} / ${s.rideR} mm · ${s.camberF}° / ${s.camberR}°`;
    if (g.type === 'text') return s.plate || this.game.S.plate || 'NO HESI';
    return '';
  }

  paintSummary(r) {
    const d = this.draft;
    if (r.kind === 'pcolor') return String(d[r.key]).toUpperCase();
    if (r.kind === 'pfinish') return PAINT_FINISH_ITEMS.find((f) => f.id === d.finish)?.name || '';
    if (r.kind === 'psection') return (r.key === 'kitColor' ? { black: 'Black', body: 'Body', contrast: 'Contrast', carbon: 'Carbon' }[d.kitColor] : SECTION_MODES.find((m) => m[0] === d[r.key])?.[1]) || '';
    if (r.kind === 'pwrap') return WRAPS.find((w) => w.id === d.wrap)?.name || '';
    if (r.kind === 'psaved') return `${(this.game.save.paints || []).length} saved`;
    return '';
  }

  /* ---------------------------------------------------------------- the item card */
  renderCard(anim) {
    const card = $('cz-card');
    const key = `${this.cat.id}|${this.level}|${this.gi}|${this.ii}`;
    const changed = key !== card.dataset.key;
    card.dataset.key = key;
    card.innerHTML = '';
    const inner = el('div', 'cz-card-in' + (changed || anim ? ' enter' : ''));
    card.appendChild(inner);
    const g = this.group;
    const rows = this.rows();
    if (this.level === 'groups') return this.cardGroup(inner, g);
    const r = rows[this.ii];
    if (g.type === 'part') this.cardItem(inner, g, r.it);
    else if (g.type === 'color') this.cardColor(inner, g, r);
    else if (g.type === 'slider') this.cardSlider(inner, g);
    else if (g.type === 'text') this.cardText(inner, g);
    else if (g.type === 'paint') this.cardPaint(inner, r);
  }

  cardGroup(inner, g) {
    const s = this.saved;
    const th = el('div', 'cz-hero');
    th.innerHTML = groupThumb(g, this.def, s);
    inner.append(th, txt('div', 'cz-kick', this.cat.name.toUpperCase()), txt('h3', '', g.name));
    const n = g.type === 'part' ? itemsFor(this.def, g).length : null;
    inner.append(txt('p', 'cz-desc', g.desc || (n ? `${n} options for the ${this.def.name}.` : '')));
    const cur = el('div', 'cz-cur');
    cur.append(txt('span', '', 'FITTED'), txt('b', '', this.groupSummary(g) || '—'));
    inner.append(cur);
    const btn = txt('button', 'cz-act', 'BROWSE  ›');
    btn.onclick = () => this.openGroup(this.gi);
    inner.append(btn);
  }

  cardItem(inner, g, it) {
    const def = this.def, d = this.draft;
    const th = el('div', 'cz-hero');
    th.innerHTML = thumbFor(g, it, def, d);
    const tr = TIERS[it.tier] || TIERS.stock;
    const tier = txt('div', 'cz-tier big', tr.name);
    tier.style.setProperty('--tc', tr.color);
    inner.append(th, tier, txt('h3', '', it.name), txt('p', 'cz-desc', it.desc || ''));
    if (['body', 'wheels', 'tires', 'suspension', 'performance', 'engine'].includes(g.cat) || it.fx) this.statBlock(inner);
    this.actionBlock(inner);
  }

  statBlock(inner) {
    const def = this.def;
    const a = this.game.ratings(def, this.saved), b = this.game.ratings(def, this.draft);
    const box = el('div', 'cz-stats');
    const head = el('div', 'cz-pirow');
    const changed = b.pace !== a.pace || b.style !== a.style;
    head.append(classBadge(a, { size: 'sm' }));
    if (changed) {
      head.append(txt('i', 'cz-arrow', '→'), classBadge(b, { size: 'sm' }));
      if (b.pace !== a.pace) head.append(txt('span', 'cz-dpi ' + (b.pace > a.pace ? 'up' : 'dn'), `${b.pace > a.pace ? '+' : ''}${b.pace - a.pace}`));
    }
    box.append(head, limitMeter(a, b));
    for (const [k, n] of STAT_ROWS) {
      const r = el('div', 'cz-stat');
      const va = a[k], vb = b[k];
      const bar = el('div', 'cz-bar');
      const base = el('i', 'base'); base.style.width = `${Math.min(va, vb) * 10}%`;
      const delta = el('i', vb >= va ? 'up' : 'dn');
      delta.style.left = `${Math.min(va, vb) * 10}%`; delta.style.width = `${Math.abs(vb - va) * 10}%`;
      bar.append(base, delta);
      r.append(txt('span', '', n), bar, txt('b', vb > va + 0.005 ? 'up' : vb < va - 0.005 ? 'dn' : '', vb.toFixed(1)));
      box.append(r);
    }
    const raw = el('div', 'cz-raw');
    const units = this.game.S.units === 'kmh';
    raw.append(txt('span', '', `${Math.round(b.hp)} hp`), txt('span', '', units ? `${Math.round(b.mass)} kg` : `${Math.round(b.mass * 2.2046).toLocaleString()} lb`), txt('span', '', units ? `${Math.round(b.topSpeed * 1.609)} km/h` : `${Math.round(b.topSpeed)} mph`), txt('span', '', `0-60 ${b.zeroSixty.toFixed(2)} s`));
    box.append(raw);
    inner.append(box);
  }

  actionBlock(inner) {
    const a = this.action();
    const foot = el('div', 'cz-foot');
    const price = el('div', 'cz-pricebig');
    if (a.installed) price.append(txt('span', '', 'STATUS'), txt('b', 'fit', 'INSTALLED'));
    else if (a.owned) price.append(txt('span', '', 'PRICE'), txt('b', 'own', 'OWNED'));
    else if (a.kind === 'none') price.append(txt('span', '', 'STATUS'), txt('b', '', 'NO CHANGES'));
    else price.append(txt('span', '', 'PRICE'), txt('b', a.enabled ? '' : 'no', a.price ? money(a.price) : 'FREE'));
    foot.append(price);
    const btn = txt('button', 'cz-act' + (a.kind === 'buy' ? ' buy' : ''), a.kind === 'buy' ? `PURCHASE  ${money(a.price)}` : a.label);
    btn.disabled = !a.enabled;
    btn.onclick = () => this.act();
    foot.append(btn);
    if (a.kind === 'buy' && !a.enabled) foot.append(txt('div', 'cz-short', `You need ${money(a.short)} more · earn cash driving Endless, Time Attack and Challenges`));
    else if (a.kind === 'buy' || a.kind === 'apply') foot.append(txt('div', 'cz-prevnote', 'Previewing on your car · not saved until you confirm'));
    inner.append(foot);
  }

  cardColor(inner, g, r) {
    const d = this.draft;
    const hero = el('div', 'cz-colhero');
    hero.style.background = d[g.key];
    inner.append(hero, txt('div', 'cz-kick', g.name.toUpperCase()), txt('h3', '', String(d[g.key]).toUpperCase()), txt('p', 'cz-desc', g.desc || ''));
    const grid = el('div', 'cz-swgrid');
    for (const c of g.colors) {
      const b = el('button', 'cz-sw' + (c.toLowerCase() === String(d[g.key]).toLowerCase() ? ' sel' : ''));
      b.style.background = c;
      b.title = c;
      b.onclick = () => { this.draft[g.key] = c; this.ii = g.colors.indexOf(c); this.preview(true); this.render(); };
      grid.append(b);
    }
    inner.append(grid);
    if (r?.kind === 'custom') inner.append(this.picker(g.key));
    this.actionBlock(inner);
  }

  cardSlider(inner, g) {
    const s = this.saved;
    const th = el('div', 'cz-hero');
    th.innerHTML = groupThumb(g, this.def, this.draft);
    inner.append(th, txt('div', 'cz-kick', this.cat.name.toUpperCase()), txt('h3', '', g.name), txt('p', 'cz-desc', g.desc || ''));
    if (g.id === 'stance') {
      const kit = itemOf('springs', s.springs);
      const cur = el('div', 'cz-cur');
      cur.append(txt('span', '', 'SUSPENSION KIT'), txt('b', '', kit?.name || 'Factory'));
      inner.append(cur);
      if (s.springs === 'stock') inner.append(txt('div', 'cz-short', 'Factory suspension is fixed. Fit lowering springs or coilovers (Suspension Kit) to adjust ride height, camber and track width.'));
      else this.statBlock(inner);
      const rs = txt('button', 'cz-btn small', 'RESET TO ZERO');
      rs.onclick = () => { for (const sl of STANCE_SLIDERS) { const [a, b] = this.limits(sl); this.draft[sl.key] = clampN(sl.key === 'stiff' ? 50 : 0, a, b); } this.preview(true); this.render(); };
      inner.append(rs);
    }
    this.actionBlock(inner);
  }

  cardText(inner, g) {
    const d = this.draft;
    const th = el('div', 'cz-hero');
    th.innerHTML = groupThumb(g, this.def, d);
    inner.append(th, txt('div', 'cz-kick', 'LICENSE PLATE'), txt('h3', '', g.name), txt('p', 'cz-desc', g.desc || ''));
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'cz-text';
    inp.maxLength = g.maxLength || 7;
    inp.value = d.plate || this.game.S.plate || 'NO HESI';
    inp.spellcheck = false;
    inp.oninput = () => { this.draft.plate = inp.value.toUpperCase().replace(/[^A-Z0-9 -]/g, '').slice(0, 7); };
    inp.onchange = () => { this.preview(true); this.renderList(); this._refreshFoot(); };
    inner.append(inp);
    this.actionBlock(inner);
  }

  _refreshFoot() {
    const inner = document.querySelector('#cz-card .cz-card-in');
    inner?.querySelector('.cz-foot')?.remove();
    if (inner) this.actionBlock(inner);
  }

  cardPaint(inner, r) {
    const d = this.draft;
    const hero = el('div', 'cz-hero');
    hero.innerHTML = paintThumb(r.kind === 'psection' ? r.key : r.kind === 'pwrap' ? 'wrap' : '', d, r.kind === 'psection' ? d[r.key] : d.wrap);
    inner.append(hero, txt('div', 'cz-kick', 'PAINT SHOP'), txt('h3', '', r.name));
    if (r.note) inner.append(txt('p', 'cz-desc', r.note));
    if (r.kind === 'pcolor') {
      const fac = FACTORY_COLORS[this.carId] || [];
      inner.append(txt('div', 'cz-sub', 'FACTORY COLOURS'));
      inner.append(this.swatches(fac, r.key));
      inner.append(txt('div', 'cz-sub', 'PALETTE'));
      inner.append(this.swatches(PAINT_COLORS, r.key));
      inner.append(txt('div', 'cz-sub', 'CUSTOM'));
      inner.append(this.picker(r.key));
    } else if (r.kind === 'pfinish') {
      const list = el('div', 'cz-chips');
      for (const f of PAINT_FINISH_ITEMS) {
        const b = el('button', 'cz-chip' + (d.finish === f.id ? ' sel' : ''));
        b.append(txt('span', '', f.name), txt('small', '', f.price ? `+${money(f.price)}` : 'INCLUDED'));
        b.onclick = () => this.setPaint('finish', f.id);
        list.append(b);
      }
      inner.append(list, txt('p', 'cz-desc', PAINT_FINISH_ITEMS.find((f) => f.id === d.finish)?.desc || ''));
    } else if (r.kind === 'psection') {
      const opts = this.paintOptions(r);
      const grid = el('div', 'cz-optgrid');
      for (const o of opts) {
        const b = el('button', 'cz-opt' + (d[r.key] === o ? ' sel' : ''));
        b.innerHTML = paintThumb(r.key === 'kitColor' ? '' : r.key, d, o);
        b.append(txt('span', '', r.key === 'kitColor' ? { black: 'Black', body: 'Body', contrast: 'Contrast', carbon: 'Carbon' }[o] : SECTION_MODES.find((m) => m[0] === o)[1]));
        b.onclick = () => this.setPaint(r.key, o);
        grid.append(b);
      }
      inner.append(grid);
    } else if (r.kind === 'pwrap') {
      const grid = el('div', 'cz-optgrid');
      for (const w of WRAPS) {
        const b = el('button', 'cz-opt' + (d.wrap === w.id ? ' sel' : ''));
        b.innerHTML = paintThumb('wrap', d, w.id);
        b.append(txt('span', '', w.name), txt('small', '', w.price ? money(w.price) : ''));
        b.onclick = () => this.setPaint('wrap', w.id);
        grid.append(b);
      }
      inner.append(grid);
      if (d.wrap === 'lower' || d.wrap === 'fade') inner.append(txt('p', 'cz-desc', 'Uses the contrast colour.'));
    } else if (r.kind === 'psaved') {
      const list = this.game.save.paints || [];
      const sv = txt('button', 'cz-btn', 'SAVE CURRENT PAINT');
      sv.onclick = () => this.savePaint();
      inner.append(sv);
      if (!list.length) inner.append(txt('p', 'cz-desc', 'Save combinations of colour, finish, sections and livery here to reuse them on any car.'));
      const grid = el('div', 'cz-optgrid');
      list.forEach((p, i) => {
        const b = el('div', 'cz-opt saved');
        b.innerHTML = paintThumb('', p);
        b.append(txt('span', '', p.name));
        const ld = txt('button', 'cz-mini', 'LOAD');
        ld.onclick = () => { this._savedI = i; this.loadSaved(p); };
        const del = txt('button', 'cz-mini', '✕');
        del.onclick = () => { list.splice(i, 1); this.game.saveNow(); this.render(); };
        b.append(ld, del);
        grid.append(b);
      });
      inner.append(grid);
    }
    // paint job total
    const { lines } = this.paintCost();
    if (lines.length) {
      const ul = el('div', 'cz-plines');
      for (const [n, p] of lines) { const x = el('div', ''); x.append(txt('span', '', n), txt('b', '', money(p))); ul.append(x); }
      inner.append(ul);
      const rv = txt('button', 'cz-btn small', 'REVERT PAINT');
      rv.onclick = () => { this.revertGroup(); this.render(); };
      inner.append(rv);
    }
    this.actionBlock(inner);
  }

  swatches(list, key) {
    const grid = el('div', 'cz-swgrid');
    for (const c of list) {
      const b = el('button', 'cz-sw' + (c.toLowerCase() === String(this.draft[key]).toLowerCase() ? ' sel' : ''));
      b.style.background = c;
      b.title = c;
      b.onclick = () => this.setPaint(key, c);
      grid.append(b);
    }
    return grid;
  }

  /** Colour picker: saturation/value square, hue strip, RGB sliders and a HEX field. */
  picker(key) {
    const wrap = el('div', 'cz-picker');
    const W = 260, H = 120;
    const sv = document.createElement('canvas');
    sv.width = W; sv.height = H; sv.className = 'cz-sv';
    const hue = document.createElement('canvas');
    hue.width = W; hue.height = 12; hue.className = 'cz-hue';
    const svDot = el('i', 'cz-dot'), hueDot = el('i', 'cz-hdot');
    const svBox = el('div', 'cz-svbox'); svBox.append(sv, svDot);
    const hueBox = el('div', 'cz-huebox'); hueBox.append(hue, hueDot);
    let [h, s, v] = rgbToHsv(...hexToRgb(String(this.draft[key])));
    const rgbIn = [], rgbOut = [];
    const rows = el('div', 'cz-rgb');
    ['R', 'G', 'B'].forEach((n, i) => {
      const r = el('label', '');
      const inp = document.createElement('input');
      inp.type = 'range'; inp.min = 0; inp.max = 255; inp.className = 'cz-range ' + n;
      const out = txt('b', '', '0');
      r.append(txt('span', '', n), inp, out);
      rows.append(r);
      rgbIn.push(inp); rgbOut.push(out);
      inp.oninput = () => { const rgb = rgbIn.map((x) => Number(x.value)); [h, s, v] = rgbToHsv(...rgb); apply(rgbToHex(...rgb), false); };
    });
    const hexRow = el('label', 'cz-hex');
    const hex = document.createElement('input');
    hex.type = 'text'; hex.maxLength = 7; hex.spellcheck = false;
    hexRow.append(txt('span', '', 'HEX'), hex);
    hex.onchange = () => {
      const m = hex.value.trim().match(/^#?([0-9a-f]{6})$/i);
      if (!m) { hex.value = String(this.draft[key]); return; }
      const c = '#' + m[1].toLowerCase();
      [h, s, v] = rgbToHsv(...hexToRgb(c));
      apply(c, true);
    };
    const drawSV = () => {
      const x = sv.getContext('2d');
      const [r, g, b] = hsvToRgb(h, 1, 1);
      const gw = x.createLinearGradient(0, 0, W, 0);
      gw.addColorStop(0, '#fff'); gw.addColorStop(1, `rgb(${r},${g},${b})`);
      x.fillStyle = gw; x.fillRect(0, 0, W, H);
      const gb = x.createLinearGradient(0, 0, 0, H);
      gb.addColorStop(0, 'rgba(0,0,0,0)'); gb.addColorStop(1, '#000');
      x.fillStyle = gb; x.fillRect(0, 0, W, H);
    };
    const drawHue = () => {
      const x = hue.getContext('2d');
      const gh = x.createLinearGradient(0, 0, W, 0);
      for (let i = 0; i <= 6; i++) { const [r, g, b] = hsvToRgb((i / 6) * 359.9, 1, 1); gh.addColorStop(i / 6, `rgb(${r},${g},${b})`); }
      x.fillStyle = gh; x.fillRect(0, 0, W, 12);
    };
    const sync = (c) => {
      const rgb = hexToRgb(c);
      rgbIn.forEach((inp, i) => { inp.value = rgb[i]; rgbOut[i].textContent = rgb[i]; });
      hex.value = c.toUpperCase();
      svDot.style.left = `${s * 100}%`; svDot.style.top = `${(1 - v) * 100}%`;
      hueDot.style.left = `${(h / 360) * 100}%`;
      svDot.style.background = c;
    };
    let lastRender = 0;
    const apply = (c, full) => {
      this.draft[key] = c;
      sync(c);
      drawSV();
      // the car eases to the new colour; the list and swatches refresh once the colour settles
      this.game.previewCustom(this.carId, this.draft);
      clearTimeout(this._pkT);
      this._pkT = setTimeout(() => { this.renderList(); this._refreshFoot(); }, full ? 0 : 250);
      lastRender = performance.now();
    };
    const pick = (e, box, fn) => {
      const rc = box.getBoundingClientRect();
      fn(clampN((e.clientX - rc.left) / rc.width, 0, 1), clampN((e.clientY - rc.top) / rc.height, 0, 1));
    };
    const drag = (box, fn) => {
      box.addEventListener('pointerdown', (e) => {
        box.setPointerCapture(e.pointerId);
        pick(e, box, fn);
        const mv = (ev) => pick(ev, box, fn);
        const up = () => { box.removeEventListener('pointermove', mv); box.removeEventListener('pointerup', up); };
        box.addEventListener('pointermove', mv);
        box.addEventListener('pointerup', up);
      });
    };
    drag(svBox, (x, y) => { s = x; v = 1 - y; apply(rgbToHex(...hsvToRgb(h, s, v)), false); });
    drag(hueBox, (x) => { h = x * 359.9; apply(rgbToHex(...hsvToRgb(h, s, v)), false); });
    drawSV(); drawHue(); sync(String(this.draft[key]));
    wrap.append(svBox, hueBox, rows, hexRow);
    return wrap;
  }

  /* ---------------------------------------------------------------- hints */
  renderHints() {
    const pad = this.game.input.padActive;
    const box = $('cz-hints');
    const K = (k, t) => `<span><kbd>${k}</kbd>${t}</span>`;
    const lvl = this.level;
    const g = this.group;
    const sideTxt = lvl === 'groups' ? 'Category' : this.single ? 'Adjust' : 'Back';
    const slider = lvl === 'items' && (g?.type === 'slider' || g?.type === 'paint');
    box.innerHTML = pad
      ? [K('Ⓐ', lvl === 'groups' ? 'Open' : 'Buy / Install'), K('Ⓑ', 'Back'), K('LB RB', 'Category'), K('✚', slider ? 'Select / Adjust' : 'Navigate'), K('RS', 'Rotate'), K('LT RT', 'Zoom')].join('')
      : [K('W S ↑ ↓', 'Select'), K(lvl === 'groups' ? 'A D ← →' : slider ? '← →' : '←', lvl === 'groups' ? 'Category' : slider ? 'Adjust' : sideTxt), K('Q E', 'Category'), K('Enter', lvl === 'groups' ? 'Open' : 'Buy / Install'), K('Esc', 'Back'), K('Drag', 'Rotate'), K('Scroll', 'Zoom')].join('');
  }
}
