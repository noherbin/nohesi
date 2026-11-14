// Menus, garage, customisation, challenges, settings, pause/results modals, toasts.
import { PLAYER_CARS, CAR_BY_ID, CUSTOM_OPTIONS } from '../config/cars.js';
import { ENVIRONMENTS, ENV_ORDER, TIMES, WEATHERS, DENSITIES } from '../config/environments.js';
import { CHALLENGES, GOAL_LABEL } from '../config/challenges.js';
import { formatInt } from '../core/utils.js';

const $ = (id) => document.getElementById(id);
const h = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

export const MODES = [
  { id: 'endless', name: 'Endless Highway', desc: 'Weave through endless traffic. Crashing ends the run.' },
  { id: 'free', name: 'Free Drive', desc: 'No score, no pressure. Cruise and explore.' },
  { id: 'timeattack', name: 'Time Attack', desc: 'Cover the most distance in 2 minutes. Crashes cost 5 seconds.' },
];

const ENV_COLORS = { la: '#ff9a4a', urban: '#5aa9ff', desert: '#ffc15a', night: '#b45aff' };

export class UI {
  constructor(game) {
    this.game = game;
    this.screen = 'loading';
    this.history = [];
    this.cuTab = 'paint';
    this.garageSel = null;
    this._bind();
  }

  _bind() {
    document.querySelectorAll('[data-go]').forEach((b) => {
      b.addEventListener('click', () => {
        this.game.audio.click();
        this.go(b.dataset.go);
      });
    });
    $('btn-go').addEventListener('click', () => this._startFromSetup());
    $('btn-select').addEventListener('click', () => this._selectCar());
    $('btn-tocustom').addEventListener('click', () => { this.game.audio.click(); this.go('custom'); });
    $('btn-cu-drive').addEventListener('click', () => { this.game.audio.click(); this.go('setup'); });
    $('btn-cu-reset').addEventListener('click', () => this._resetCustom());
    $('btn-cu-rev').addEventListener('click', () => this.game.revPreview());
    $('settings-back').addEventListener('click', () => {
      this.game.audio.click();
      this.go(this.settingsReturn || 'menu');
    });
    $('p-resume').addEventListener('click', () => this.game.resume());
    $('p-restart').addEventListener('click', () => this.game.restart());
    $('p-camera').addEventListener('click', () => { this.game.cycleCamera(); this.updatePause(); });
    $('p-settings').addEventListener('click', () => { this.settingsReturn = 'pause'; this.go('settings'); });
    $('p-garage').addEventListener('click', () => this.game.exitToMenu('garage'));
    $('p-menu').addEventListener('click', () => this.game.exitToMenu('menu'));
    $('r-retry').addEventListener('click', () => this.game.restart());
    $('r-menu').addEventListener('click', () => this.game.exitToMenu('menu'));
    // garage drag-to-rotate on the canvas
    const cv = $('gl');
    let drag = null;
    const down = (x, y) => { if (this.screen === 'garage' || this.screen === 'custom') drag = [x, y]; };
    const move = (x, y) => {
      if (!drag) return;
      this.game.garage.drag(x - drag[0], y - drag[1]);
      drag = [x, y];
    };
    for (const id of ['s-garage', 's-custom']) {
      const el = $(id);
      el.addEventListener('pointerdown', (e) => { if (e.target === el || e.target.classList.contains('drag-hint')) down(e.clientX, e.clientY); });
    }
    window.addEventListener('pointermove', (e) => move(e.clientX, e.clientY));
    window.addEventListener('pointerup', () => (drag = null));
    cv.addEventListener('wheel', (e) => {
      if (this.screen === 'garage' || this.screen === 'custom') {
        this.game.garage.zoom = Math.max(0.7, Math.min(1.5, this.game.garage.zoom + e.deltaY * 0.0008));
      }
    }, { passive: true });
    for (const id of ['s-garage', 's-custom']) {
      $(id).addEventListener('wheel', (e) => {
        if (e.target === $(id)) this.game.garage.zoom = Math.max(0.7, Math.min(1.5, this.game.garage.zoom + e.deltaY * 0.0008));
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------ navigation */
  go(screen) {
    const g = this.game;
    if (screen === 'garage' || screen === 'custom') {
      if (screen === 'garage' && !this.garageSel) this.garageSel = g.save.selectedCar;
      if (screen === 'custom') this.garageSel = this.garageSel && g.isUnlocked(this.garageSel) ? this.garageSel : g.save.selectedCar;
    }
    if (screen === 'settings' && this.screen !== 'pause' && this.screen !== 'settings') this.settingsReturn = 'menu';
    this.show(screen);
    if (screen === 'menu') this.renderMenu();
    if (screen === 'setup') this.renderSetup();
    if (screen === 'garage') this.renderGarage();
    if (screen === 'custom') this.renderCustom();
    if (screen === 'challenges') this.renderChallenges();
    if (screen === 'settings') this.renderSettings();
    g.onScreen(screen);
  }

  show(screen) {
    this.screen = screen;
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const el = $('s-' + screen);
    if (el) el.classList.add('active');
    // focus first control for keyboard/gamepad users
    setTimeout(() => {
      const f = el?.querySelector('.menu-item, .btn.primary, .card.sel, .car-item.sel, button');
      if (f && this.game.input.padActive) f.focus();
    }, 30);
  }

  /** Gamepad focus navigation. */
  nav(dir) {
    const el = $('s-' + this.screen) || $('confirm');
    if (!el) return;
    const items = [...el.querySelectorAll('button, input')].filter((b) => b.offsetParent !== null);
    if (!items.length) return;
    let i = items.indexOf(document.activeElement);
    if (i < 0) { items[0].focus(); return; }
    i = (i + (dir > 0 ? 1 : -1) + items.length) % items.length;
    items[i].focus();
  }

  confirm(title, text, yes) {
    $('cf-title').textContent = title;
    $('cf-text').textContent = text;
    const el = $('confirm');
    el.classList.add('active');
    const close = () => el.classList.remove('active');
    $('cf-yes').onclick = () => { close(); yes(); };
    $('cf-no').onclick = close;
  }

  toast(text, kind = '') {
    const t = h('div', 'toast ' + kind, text);
    $('toasts').appendChild(t);
    setTimeout(() => t.remove(), 4300);
  }

  setLoading(p, text) {
    $('load-fill').style.width = `${Math.round(p * 100)}%`;
    if (text) $('load-text').textContent = text;
  }

  showStart(cb) {
    $('load-text').textContent = 'Ready';
    const b = $('btn-start');
    b.classList.remove('hidden');
    b.focus();
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.removeEventListener('keydown', key);
      cb();
    };
    const key = (e) => { if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); go(); } };
    b.onclick = go;
    window.addEventListener('keydown', key);
  }

  /* ------------------------------------------------------------ menu */
  renderMenu() {
    const g = this.game;
    $('m-career').textContent = formatInt(g.save.career);
    $('m-best').textContent = formatInt(g.save.best.endless);
    $('m-car').textContent = CAR_BY_ID[g.save.selectedCar].name;
  }

  /* ------------------------------------------------------------ setup */
  renderSetup() {
    const g = this.game, last = g.save.last;
    const mc = $('mode-cards');
    mc.innerHTML = '';
    for (const m of MODES) {
      const c = h('button', 'card' + (last.mode === m.id ? ' sel' : ''), `<div class="c-t">${m.name}</div><div class="c-d">${m.desc}</div>`);
      c.onclick = () => { last.mode = m.id; g.audio.click(); this.renderSetup(); };
      mc.appendChild(c);
    }
    const ec = $('env-cards');
    ec.innerHTML = '';
    for (const id of ENV_ORDER) {
      const e = ENVIRONMENTS[id];
      const c = h('button', 'card' + (last.env === id ? ' sel' : ''), `<div class="swatch" style="background:${ENV_COLORS[id]}"></div><div class="c-t">${e.name}</div><div class="c-d">${e.desc}</div>`);
      c.onclick = () => { last.env = id; g.audio.click(); this.renderSetup(); g.previewEnv(id); };
      ec.appendChild(c);
    }
    const chips = (el, list, key) => {
      el.innerHTML = '';
      for (const it of list) {
        const c = h('button', 'chip' + (last[key] === it.id ? ' sel' : ''), it.name);
        c.onclick = () => { last[key] = it.id; g.audio.click(); this.renderSetup(); };
        el.appendChild(c);
      }
    };
    chips($('time-chips'), TIMES, 'time');
    chips($('weather-chips'), WEATHERS, 'weather');
    chips($('density-chips'), DENSITIES, 'density');
    const car = CAR_BY_ID[g.save.selectedCar];
    $('setup-car-name').textContent = car.name;
    $('setup-car-cls').textContent = `${car.cls} · ${car.phys.hp} hp · ${car.phys.drive}`;
  }

  _startFromSetup() {
    const g = this.game;
    g.audio.click();
    g.saveNow();
    g.startDrive({ ...g.save.last });
  }

  /* ------------------------------------------------------------ garage */
  renderGarage() {
    const g = this.game;
    const list = $('car-list');
    list.innerHTML = '';
    for (const car of PLAYER_CARS) {
      const un = g.isUnlocked(car.id);
      const cur = g.save.selectedCar === car.id;
      const b = h('button', 'car-item' + (this.garageSel === car.id ? ' sel' : '') + (un ? '' : ' locked'),
        `<div><div class="n">${car.name}</div><div class="k">${car.cls}</div></div><div class="tag ${cur ? 'cur' : ''}">${cur ? 'SELECTED' : un ? '' : '🔒 ' + formatInt(car.cost)}</div>`);
      b.onclick = () => {
        g.audio.click();
        this.garageSel = car.id;
        this.renderGarage();
      };
      list.appendChild(b);
    }
    const car = CAR_BY_ID[this.garageSel];
    g.showGarageCar(car.id);
    $('ci-maker').textContent = car.maker;
    $('ci-name').textContent = car.name;
    $('ci-cls').textContent = `${car.cls} · ${car.engine.label}`;
    $('ci-blurb').textContent = car.blurb;
    const st = g.carStats(car);
    const units = g.save.settings.units;
    const rows = [
      ['TOP SPEED', st.topSpeed / 260, units === 'kmh' ? `${Math.round(st.topSpeed * 1.609)} km/h` : `${Math.round(st.topSpeed)} mph`],
      ['0-60 MPH', (6.5 - st.zeroSixty) / 4.5, `${st.zeroSixty.toFixed(1)} s`],
      ['POWER', st.hp / 1200, `${st.hp} hp`],
      ['WEIGHT', 1 - (st.mass - 1200) / 900, units === 'kmh' ? `${st.mass} kg` : `${formatInt(st.mass * 2.2046)} lb`],
      ['HANDLING', st.handling / 10, st.handling.toFixed(1)],
      ['BRAKING', st.braking / 10, st.braking.toFixed(1)],
      ['DRIVETRAIN', -1, car.phys.drive],
    ];
    const stats = $('ci-stats');
    stats.innerHTML = '';
    for (const [k, f, v] of rows) {
      stats.appendChild(h('div', 'stat-row', `<span>${k}</span>${f >= 0 ? `<div class="stat-bar"><i style="width:${Math.max(4, Math.min(100, f * 100))}%"></i></div>` : '<div></div>'}<b>${v}</b>`));
    }
    const un = g.isUnlocked(car.id);
    const sel = $('btn-select');
    sel.disabled = !un;
    sel.textContent = g.save.selectedCar === car.id ? 'SELECTED' : un ? 'SELECT' : 'LOCKED';
    $('btn-tocustom').classList.toggle('hidden', !un);
    const lock = $('ci-lock');
    lock.classList.toggle('hidden', un);
    if (!un) lock.textContent = `Unlocks at ${formatInt(car.cost)} career points (you have ${formatInt(g.save.career)}). Earn points in any mode.`;
  }

  _selectCar() {
    const g = this.game;
    if (!g.isUnlocked(this.garageSel)) return;
    g.audio.click();
    g.save.selectedCar = this.garageSel;
    g.saveNow();
    g.onCarChanged();
    this.renderGarage();
    this.toast(`${CAR_BY_ID[this.garageSel].name} selected`, 'good');
  }

  /* ------------------------------------------------------------ customise */
  renderCustom() {
    const g = this.game;
    const id = this.garageSel || g.save.selectedCar;
    const car = CAR_BY_ID[id];
    const cu = g.getCustom(id);
    $('cu-car').textContent = car.name.toUpperCase();
    g.showGarageCar(id);
    const tabs = [['paint', 'PAINT'], ['wheels', 'WHEELS'], ['body', 'AERO & KIT'], ['stance', 'STANCE & TINT'], ['exhaust', 'EXHAUST'], ['plate', 'PLATE']];
    const te = $('cu-tabs');
    te.innerHTML = '';
    for (const [k, n] of tabs) {
      const b = h('button', 'tab' + (this.cuTab === k ? ' sel' : ''), n);
      b.onclick = () => { this.cuTab = k; g.audio.click(); this.renderCustom(); };
      te.appendChild(b);
    }
    const body = $('cu-body');
    body.innerHTML = '';
    const O = CUSTOM_OPTIONS;
    const set = (k, v, rebuild = true) => {
      cu[k] = v;
      g.setCustom(id, cu, rebuild);
      this.renderCustom();
    };
    const swatches = (title, list, key, rebuild = false) => {
      body.appendChild(h('h3', '', title));
      const w = h('div', 'swatches');
      for (const c of list) {
        const b = h('button', 'sw' + (cu[key]?.toLowerCase() === c.toLowerCase() ? ' sel' : ''));
        b.style.background = c;
        b.title = c;
        b.setAttribute('aria-label', `${title} ${c}`);
        b.onclick = () => { g.audio.click(); set(key, c, rebuild); };
        w.appendChild(b);
      }
      body.appendChild(w);
    };
    const chips = (title, list, key, rebuild = true, numeric = false) => {
      body.appendChild(h('h3', '', title));
      const w = h('div', 'chips');
      for (const [v, n] of list) {
        const val = numeric ? +v : v;
        const b = h('button', 'chip' + (cu[key] === val ? ' sel' : ''), n);
        b.onclick = () => { g.audio.click(); set(key, val, rebuild); };
        w.appendChild(b);
      }
      body.appendChild(w);
    };
    if (this.cuTab === 'paint') {
      swatches('COLOR', O.colors, 'color');
      const ci = h('div', 'color-input', '<span>CUSTOM</span>');
      const inp = h('input');
      inp.type = 'color';
      inp.value = cu.color;
      inp.oninput = () => { cu.color = inp.value; g.setCustom(id, cu, false); };
      inp.onchange = () => this.renderCustom();
      ci.appendChild(inp);
      body.appendChild(ci);
      chips('FINISH', O.finishes, 'finish', true);
    } else if (this.cuTab === 'wheels') {
      chips('STYLE', O.wheels, 'wheels');
      swatches('RIM COLOR', O.rimColors, 'rimColor');
      swatches('BRAKE CALIPERS', O.calipers, 'caliper');
    } else if (this.cuTab === 'body') {
      chips('SPOILER', O.spoilers, 'spoiler');
      chips('BODY KIT', O.kits, 'kit');
      body.appendChild(h('p', 'c-d', '<span style="color:#8d949c;font-size:13px">Wings and aggressive kits add downforce: more grip at speed, slightly lower top speed feel.</span>'));
    } else if (this.cuTab === 'stance') {
      chips('SUSPENSION', O.suspension, 'suspension');
      chips('WINDOW TINT', O.tints, 'tint', true, true);
    } else if (this.cuTab === 'exhaust') {
      chips('EXHAUST', O.exhausts, 'exhaust');
      body.appendChild(h('p', '', '<span style="color:#8d949c;font-size:13px">Sport and straight-pipe exhausts are louder, pop and crackle more on lift-off, and add a little power.</span>'));
    } else {
      body.appendChild(h('h3', '', 'LICENSE PLATE'));
      const inp = h('input');
      inp.type = 'text';
      inp.maxLength = 7;
      inp.value = g.save.settings.plate || 'NO HESI';
      inp.onchange = () => {
        g.save.settings.plate = (inp.value || 'NO HESI').toUpperCase().slice(0, 7);
        g.saveNow();
        g.setCustom(id, cu, true);
      };
      body.appendChild(inp);
      body.appendChild(h('p', '', '<span style="color:#8d949c;font-size:13px">Up to 7 characters. Applies to all your cars.</span>'));
    }
  }

  _resetCustom() {
    const g = this.game;
    const id = this.garageSel || g.save.selectedCar;
    g.audio.click();
    g.setCustom(id, { ...CAR_BY_ID[id].defaults }, true);
    this.renderCustom();
  }

  /* ------------------------------------------------------------ challenges */
  renderChallenges() {
    const g = this.game;
    const list = $('ch-list');
    list.innerHTML = '';
    let done = 0;
    for (const c of CHALLENGES) {
      const st = g.save.challenges[c.id] || {};
      if (st.done) done++;
      const env = ENVIRONMENTS[c.env];
      const el = h('div', 'ch' + (st.done ? ' done' : ''),
        `${st.done ? '<div class="ch-badge">✓ COMPLETE</div>' : ''}
         <div class="ch-t">${c.title}</div>
         <div class="ch-d">${c.desc}</div>
         <div class="ch-meta"><span>GOAL <b>${GOAL_LABEL[c.goal.type](c.goal.value)}</b></span><span>REWARD <b>${formatInt(c.reward)}</b></span><span>${env.short} · ${c.weather.toUpperCase()}</span></div>
         ${st.best ? `<div class="ch-meta"><span>BEST <b>${formatInt(st.best)}</b></span></div>` : ''}`);
      const b = h('button', 'btn primary small', st.done ? 'PLAY AGAIN' : 'START');
      b.onclick = () => { g.audio.click(); g.startChallenge(c.id); };
      el.appendChild(b);
      list.appendChild(el);
    }
    $('ch-progress').textContent = `${done} / ${CHALLENGES.length} COMPLETE`;
  }

  /* ------------------------------------------------------------ settings */
  renderSettings() {
    const g = this.game;
    const S = g.save.settings;
    const body = $('settings-body');
    body.innerHTML = '';
    const group = (title) => {
      const el = h('div', 'set-group');
      el.appendChild(h('h3', '', title));
      body.appendChild(el);
      return el;
    };
    const row = (grp, label, ctrl) => {
      const r = h('div', 'set-row');
      r.appendChild(h('label', '', label));
      r.appendChild(ctrl);
      grp.appendChild(r);
    };
    const apply = () => { g.saveNow(); g.applySettings(); };
    const toggle = (key, after) => {
      const b = h('button', 'toggle' + (S[key] ? ' on' : ''));
      b.setAttribute('aria-pressed', !!S[key]);
      b.onclick = () => { S[key] = !S[key]; g.audio.click(); apply(); after?.(); this.renderSettings(); };
      return b;
    };
    const seg = (key, opts) => {
      const w = h('div', 'seg');
      for (const [v, n] of opts) {
        const b = h('button', S[key] === v ? 'sel' : '', n);
        b.onclick = () => { S[key] = v; g.audio.click(); apply(); this.renderSettings(); };
        w.appendChild(b);
      }
      return w;
    };
    const slider = (key, min, max, step, fmt = (v) => v) => {
      const w = h('div', 'set-ctrl');
      const inp = h('input');
      inp.type = 'range';
      inp.min = min; inp.max = max; inp.step = step;
      inp.value = S[key];
      const val = h('span', 'val', fmt(S[key]));
      inp.oninput = () => { S[key] = +inp.value; val.textContent = fmt(S[key]); g.applySettings(); };
      inp.onchange = () => g.saveNow();
      w.appendChild(inp);
      w.appendChild(val);
      return w;
    };
    const pct = (v) => `${Math.round(v * 100)}`;
    const gr = group('GRAPHICS');
    row(gr, 'Quality', seg('quality', [['low', 'LOW'], ['medium', 'MED'], ['high', 'HIGH'], ['ultra', 'ULTRA']]));
    row(gr, 'Auto-adjust for smooth framerate', toggle('autoQuality'));
    row(gr, 'Motion blur', toggle('motionBlur'));
    row(gr, 'Camera shake', slider('shake', 0, 1.5, 0.05, pct));
    row(gr, 'Chase camera FOV', slider('fov', 50, 80, 1));
    row(gr, 'Cockpit FOV', slider('cockpitFov', 55, 90, 1));
    const dr = group('DRIVING');
    row(dr, 'Units', seg('units', [['mph', 'MPH'], ['kmh', 'KM/H']]));
    row(dr, 'Transmission', seg('transmission', [['auto', 'AUTO'], ['manual', 'MANUAL']]));
    row(dr, 'Traction control', toggle('tc'));
    row(dr, 'Countersteer assist', toggle('assist'));
    row(dr, 'Keyboard steering speed', slider('steerSpeed', 0.5, 1.6, 0.05, pct));
    row(dr, 'Steering sensitivity at speed', slider('steerSens', 0.6, 1.5, 0.05, pct));
    const au = group('AUDIO');
    row(au, 'Master volume', slider('master', 0, 1, 0.01, pct));
    row(au, 'Engine', slider('engine', 0, 1, 0.01, pct));
    row(au, 'Effects & ambience', slider('sfx', 0, 1, 0.01, pct));
    row(au, 'Music volume', slider('music', 0, 1, 0.01, pct));
    row(au, 'Background music (M)', toggle('musicOn'));
    const ga = group('GAME');
    row(ga, 'Show HUD (H)', toggle('showHud'));
    row(ga, 'Sandbox: unlock all cars', toggle('unlockAll'));
    const rb = h('button', 'btn ghost small', 'RESET');
    rb.onclick = () => this.confirm('RESET PROGRESS?', 'Career points, best scores, unlocks, challenges and customisations will be erased.', () => { g.resetProgress(); this.renderSettings(); this.toast('Progress reset'); });
    row(ga, 'Reset all progress', rb);
    const ct = group('CONTROLS');
    const keys = [
      ['Accelerate', 'W / ↑ · RT'], ['Brake / reverse', 'S / ↓ · LT'], ['Steer', 'A D / ← → · Left stick'], ['Handbrake', 'Space · A'],
      ['Change camera', 'C · Y'], ['Look back', 'B (hold) · B'], ['Reset car', 'R · X'], ['Pause', 'Esc / P · Start'],
      ['Gear up / down', 'Shift / Ctrl (also E / Q) · RB / LB'], ['Toggle HUD', 'H · View'], ['Music on/off', 'M'], ['Fullscreen', 'F'],
    ];
    const tb = h('table', 'keys');
    for (const [a, k] of keys) tb.appendChild(h('tr', '', `<td>${a}</td><td>${k}</td>`));
    ct.appendChild(tb);
    ct.appendChild(h('p', '', '<span style="color:#8d949c;font-size:12.5px;line-height:1.5">Tip: in a browser, Ctrl+W closes the tab. Use E/Q for gears with WASD, or play fullscreen (F), where the game can capture those keys.</span>'));
  }

  /* ------------------------------------------------------------ pause & results */
  updatePause() {
    const g = this.game;
    $('p-camera').textContent = `CAMERA: ${g.cameraName().toUpperCase()}`;
    const s = g.scoring.summary();
    const ps = $('pause-stats');
    const u = g.save.settings.units;
    ps.innerHTML = g.session?.mode === 'free'
      ? `<div><span>DISTANCE</span><b>${g.fmtDist(s.distance)}</b></div><div><span>TOP SPEED</span><b>${g.fmtSpeed(s.topSpeed / 2.2369363)}</b></div>`
      : `<div><span>SCORE</span><b>${formatInt(s.score)}</b></div><div><span>MULTIPLIER</span><b>×${g.scoring.mult.toFixed(1)}</b></div>
         <div><span>NEAR MISSES</span><b>${s.nearMisses}</b></div><div><span>DISTANCE</span><b>${g.fmtDist(s.distance)}</b></div>`;
    void u;
  }

  showResults(r) {
    $('r-kicker').textContent = r.kicker || '';
    $('r-title').textContent = r.title;
    $('r-big').textContent = r.big || '';
    $('r-stats').innerHTML = (r.stats || []).map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('');
    $('r-note').textContent = r.note || '';
    $('r-retry').textContent = r.retryLabel || 'RETRY';
    this.show('results');
  }
}
