// Menus, garage, customisation, challenges, settings, pause/results modals, toasts.
import { PLAYER_CARS, CAR_BY_ID, CUSTOM_OPTIONS } from '../config/cars.js';
import { ENVIRONMENTS, ENV_ORDER, TIMES, WEATHERS, DENSITIES } from '../config/environments.js';
import { CHALLENGES, GOAL_LABEL } from '../config/challenges.js';
import { formatInt, M_TO_MI } from '../core/utils.js';
import { BOARDS, cleanName } from '../gameplay/leaderboard.js';
import { money, PRICED } from '../gameplay/economy.js';

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
    if (screen !== 'custom') this.cuPreview = null; // leaving the shop drops an unbought preview
    this.show(screen);
    if (screen === 'menu') this.renderMenu();
    if (screen === 'setup') this.renderSetup();
    if (screen === 'garage') this.renderGarage();
    if (screen === 'custom') this.renderCustom();
    if (screen === 'challenges') this.renderChallenges();
    if (screen === 'leaderboard') this.renderLeaderboard();
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
    $('m-career').textContent = money(g.econ.cash);
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
      const afford = g.econ.canAfford(car.cost);
      const b = h('button', 'car-item' + (this.garageSel === car.id ? ' sel' : '') + (un ? '' : ' locked'),
        `<div><div class="n">${car.name}</div><div class="k">${car.cls}</div></div><div class="tag ${cur ? 'cur' : un ? '' : afford ? 'buy' : 'price'}">${cur ? 'SELECTED' : un ? 'OWNED' : money(car.cost)}</div>`);
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
    const afford = g.econ.canAfford(car.cost);
    const sel = $('btn-select');
    sel.disabled = !un && !afford;
    sel.textContent = g.save.selectedCar === car.id ? 'SELECTED' : un ? 'SELECT' : `BUY · ${money(car.cost)}`;
    $('btn-tocustom').classList.toggle('hidden', !un);
    $('g-cash').textContent = money(g.econ.cash);
    const lock = $('ci-lock');
    lock.classList.toggle('hidden', un);
    if (!un) {
      lock.textContent = afford
        ? `You have ${money(g.econ.cash)}. Buying it leaves ${money(g.econ.cash - car.cost)}.`
        : `You need ${money(car.cost - g.econ.cash)} more. Earn cash in Endless, Time Attack and Challenges: $1 for every point you score, plus pay for distance driven.`;
    }
  }

  _selectCar() {
    const g = this.game;
    const id = this.garageSel, car = CAR_BY_ID[id];
    if (!g.isUnlocked(id)) {
      if (!g.econ.canAfford(car.cost)) return;
      g.audio.click();
      this.confirm(`BUY THE ${car.name.toUpperCase()}?`, `${money(car.cost)} · you have ${money(g.econ.cash)}, leaving ${money(g.econ.cash - car.cost)}.`, () => {
        if (!g.econ.buyCar(id)) return;
        g.audio.bigChime();
        this.toast(`PURCHASED · ${car.name.toUpperCase()}`, 'gold');
        this._selectCar();
      });
      return;
    }
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
    // an unbought part being tried on: shown on the car, not saved until bought
    const pv = this.cuPreview && this.cuPreview.id === id ? this.cuPreview : null;
    const view = pv ? { ...cu, [pv.key]: pv.val } : cu;
    $('cu-car').textContent = car.name.toUpperCase();
    $('cu-cash').textContent = money(g.econ.cash);
    if (pv) g.previewCustom(id, view);
    else g.showGarageCar(id);
    const tabs = [['paint', 'PAINT'], ['wheels', 'WHEELS'], ['body', 'AERO & KIT'], ['stance', 'STANCE & TINT'], ['exhaust', 'EXHAUST'], ['plate', 'PLATE']];
    const te = $('cu-tabs');
    te.innerHTML = '';
    for (const [k, n] of tabs) {
      const b = h('button', 'tab' + (this.cuTab === k ? ' sel' : ''), n);
      b.onclick = () => { this.cuTab = k; this.cuPreview = null; g.audio.click(); this.renderCustom(); };
      te.appendChild(b);
    }
    const body = $('cu-body');
    body.innerHTML = '';
    if (pv) {
      const price = g.econ.price(pv.key, pv.val), afford = g.econ.canAfford(price);
      const bar = h('div', 'buybar');
      const info = h('div', 'bb-info');
      const t = h('b');
      t.textContent = pv.name.toUpperCase();
      const pr = h('span', 'bb-price');
      pr.textContent = money(price);
      info.append(t, pr);
      const note = h('div', 'bb-note');
      note.textContent = afford ? `Trying it on · you have ${money(g.econ.cash)}` : `Trying it on · you need ${money(price - g.econ.cash)} more`;
      const btns = h('div', 'bb-btns');
      const buy = h('button', 'btn primary small', afford ? 'BUY &amp; FIT' : 'NOT ENOUGH CASH');
      buy.disabled = !afford;
      buy.onclick = () => {
        if (!g.econ.buyPart(id, pv.key, pv.val)) return;
        g.audio.bigChime();
        this.toast(`PURCHASED · ${pv.name.toUpperCase()}`, 'gold');
        this.cuPreview = null;
        cu[pv.key] = pv.val;
        g.setCustom(id, cu, true);
        this.renderCustom();
      };
      const cancel = h('button', 'btn ghost small', 'CANCEL');
      cancel.onclick = () => { g.audio.click(); this.cuPreview = null; this.renderCustom(); };
      btns.append(buy, cancel);
      bar.append(info, note, btns);
      body.appendChild(bar);
    }
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
      const priced = PRICED.includes(key);
      for (const [v, n] of list) {
        const val = numeric ? +v : v;
        const owned = !priced || g.econ.ownsPart(id, key, val);
        const isPv = pv && pv.key === key && pv.val === val;
        const b = h('button', 'chip' + (view[key] === val ? ' sel' : '') + (isPv ? ' preview' : '') + (owned ? '' : ' forsale'));
        b.textContent = n;
        if (priced) {
          const sm = h('small');
          sm.textContent = owned ? (cu[key] === val ? 'FITTED' : 'OWNED') : money(g.econ.price(key, val));
          b.appendChild(sm);
        }
        b.onclick = () => {
          g.audio.click();
          if (owned) { this.cuPreview = null; set(key, val, rebuild); }
          else { this.cuPreview = { id, key, val, name: n }; this.renderCustom(); }
        };
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
      body.appendChild(h('p', 'c-d', '<span style="color:#8d949c;font-size:13px">Tokyo Rivet is a bolt-on riveted widebody with a front splitter, canards and a ducktail; Outlaw Works adds huge boxy riveted over-fenders and a GT wing. Both widen the track and fit fatter tyres, and bring their own spoiler unless you fit another one. Wings and aggressive kits add downforce: more grip at speed.</span>'));
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
    this.cuPreview = null;
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
         <div class="ch-meta"><span>GOAL <b>${GOAL_LABEL[c.goal.type](c.goal.value)}</b></span><span>PRIZE <b>${money(c.reward)}</b></span><span>${env.short} · ${c.weather.toUpperCase()}</span></div>
         ${st.best ? `<div class="ch-meta"><span>BEST <b>${formatInt(st.best)}</b></span></div>` : ''}`);
      const b = h('button', 'btn primary small', st.done ? 'PLAY AGAIN' : 'START');
      b.onclick = () => { g.audio.click(); g.startChallenge(c.id); };
      el.appendChild(b);
      list.appendChild(el);
    }
    $('ch-progress').textContent = `${done} / ${CHALLENGES.length} COMPLETE`;
  }

  /* ------------------------------------------------------------ leaderboard */
  renderLeaderboard() {
    const g = this.game;
    const L = g.leaderboard;
    if (!this._lbInit) {
      this._lbInit = true;
      this.lbBoard = 'endless';
      L.onChange(() => { if (this.screen === 'leaderboard') this.renderLeaderboard(); });
      const inp = $('lb-name');
      inp.addEventListener('input', () => {
        g.save.settings.playerName = cleanName(inp.value);
        g.saveNow();
        L.rename();
      });
      inp.addEventListener('blur', () => { inp.value = L.name; });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });
    }
    // the shared board is the default wherever it exists; this device's board otherwise
    if (!this.lbScope || (this.lbScope === 'global' && !L.globalAvailable && L.status !== 'connecting')) this.lbScope = L.globalAvailable || L.status === 'connecting' ? 'global' : 'local';
    if (this.lbScope === 'local' && L.globalAvailable && !this._lbPicked) this.lbScope = 'global';
    const board = BOARDS.find((b) => b.id === this.lbBoard);
    const inp = $('lb-name');
    if (document.activeElement !== inp) inp.value = L.name;

    const tabs = $('lb-boards');
    tabs.innerHTML = '';
    for (const b of BOARDS) {
      const t = h('button', 'tab' + (b.id === this.lbBoard ? ' sel' : ''), b.name);
      t.onclick = () => { g.audio.click(); this.lbBoard = b.id; this.renderLeaderboard(); };
      tabs.appendChild(t);
    }
    const scope = $('lb-scope');
    scope.innerHTML = '';
    const scopes = L.status === 'off' || L.status === 'error' ? [['local', 'THIS DEVICE']] : [['global', 'GLOBAL'], ['local', 'THIS DEVICE']];
    for (const [v, n] of scopes) {
      const b = h('button', this.lbScope === v ? 'sel' : '', n);
      b.onclick = () => { g.audio.click(); this.lbScope = v; this._lbPicked = true; this.renderLeaderboard(); };
      scope.appendChild(b);
    }
    scope.style.display = scopes.length > 1 ? '' : 'none';

    $('lb-col').textContent = board.label;
    const statusTxt = { connecting: 'CONNECTING…', readonly: 'GLOBAL · VIEW ONLY', error: 'GLOBAL BOARD UNAVAILABLE' }[L.status] || '';
    $('lb-status').textContent = statusTxt;
    const what = { endless: 'Best Endless score', timeattack: 'Furthest distance in a two-minute Time Attack', speed: 'Fastest speed reached in an Endless or Time Attack run' }[board.id];
    let note;
    if (this.lbScope === 'global') {
      note = `${what}, one entry per driver. Your personal bests post here automatically.`;
      if (L.status === 'readonly') note = `${what}, one entry per driver. You can view the global board, but runs from this account stay on this device.`;
      if (L.status === 'ready' && !L.name) note += L.be?.kind === 'artifact' ? ' Set a driver name — until you do, your Claude name is shown.' : ' Set a driver name so everyone can see who you are.';
    } else {
      note = `${what} — the top 10 runs on this device.`;
      if (L.status === 'error') note += ' The global board can\'t be reached right now (are you offline?) — runs still count here and post when it\'s back.';
    }
    $('lb-note').textContent = note;

    const body = $('lb-rows');
    const empty = $('lb-empty');
    const units = g.S.units;
    const fmtVal = (v) => {
      if (board.id === 'endless') return formatInt(v);
      if (board.id === 'timeattack') return units === 'kmh' ? `${(v / 1000).toFixed(2)} km` : `${(v * M_TO_MI).toFixed(2)} mi`;
      return units === 'kmh' ? `${Math.round(v * 1.609344)} km/h` : `${v.toFixed(1)} mph`;
    };
    const fmtDet = (r) => {
      if (!r.at && r.car == null) return 'Personal best from before the leaderboard';
      const nm = r.nm != null ? `${r.nm} near miss${r.nm === 1 ? '' : 'es'}` : '';
      const env = ENVIRONMENTS[r.env]?.short || '';
      if (board.id === 'endless') return [nm, r.dist ? g.fmtDist(r.dist) : '', env].filter(Boolean).join(' · ');
      if (board.id === 'timeattack') return [nm, r.score ? `${formatInt(r.score)} pts` : '', env].filter(Boolean).join(' · ');
      return env;
    };
    const fmtDate = (at) => (at ? new Date(at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: new Date(at).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined }) : '');
    const fill = (rows) => {
      body.innerHTML = '';
      for (const r of rows) {
        const tr = h('tr', [r.rank <= 3 ? `top${r.rank}` : '', r.me && this.lbScope === 'global' ? 'me' : ''].filter(Boolean).join(' '));
        const cell = (cls, text) => { const td = h('td', cls); td.textContent = text; tr.appendChild(td); };
        cell('c-rank', String(r.rank));
        cell('name', r.name);
        cell('car', g.leaderboard.carName(r.car));
        cell('c-val', fmtVal(r.v));
        cell('c-det', fmtDet(r));
        cell('c-date', fmtDate(r.at));
        body.appendChild(tr);
      }
    };

    if (this.lbScope === 'local') {
      const rows = L.localRows(board.id);
      fill(rows);
      empty.textContent = rows.length ? '' : (board.id === 'timeattack' ? 'No Time Attack runs yet. Drive one from DRIVE → TIME ATTACK.' : board.id === 'speed' ? 'No runs yet. Your top speed is recorded at the end of every Endless or Time Attack run.' : 'No runs yet. Your score is recorded when an Endless run ends.');
      return;
    }
    if (L.status === 'connecting') { fill([]); empty.textContent = 'Connecting to the global board…'; return; }
    const token = (this._lbToken = (this._lbToken || 0) + 1);
    if (!body.children.length || this._lbShown !== board.id + this.lbScope) { fill([]); empty.textContent = 'Loading…'; }
    this._lbShown = board.id + this.lbScope;
    L.globalRows(board.id).then((rows) => {
      if (token !== this._lbToken || this.screen !== 'leaderboard') return;
      fill(rows);
      empty.textContent = rows.length ? '' : 'No one is on this board yet. Finish a run to take first place.';
    }).catch(() => {
      if (token !== this._lbToken) return;
      fill([]);
      empty.textContent = 'The global board could not be loaded. Try again in a moment.';
    });
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
    row(ga, 'Sandbox: all cars and parts free', toggle('unlockAll'));
    const rb = h('button', 'btn ghost small', 'RESET');
    rb.onclick = () => this.confirm('RESET PROGRESS?', 'Cash, cars, parts, best scores, challenges and customisations will be erased. You restart with $5,000 and the two starter cars.', () => { g.resetProgress(); this.renderSettings(); this.toast('Progress reset'); });
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
