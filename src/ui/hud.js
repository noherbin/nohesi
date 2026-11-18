// In-game HUD: speed/RPM/gear cluster, score & multiplier, popups, banners, objective tracker.
import { formatInt, formatTime, clamp, MS_TO_MPH, MS_TO_KMH } from '../core/utils.js';

const $ = (id) => document.getElementById(id);
const R = 86, CX = 100, CY = 100, A0 = Math.PI * 0.75, SWEEP = Math.PI * 1.5;
const LEN = R * SWEEP;

function arcPath(f0, f1) {
  const a = A0 + SWEEP * f0, b = A0 + SWEEP * f1;
  const x0 = CX + Math.cos(a) * R, y0 = CY + Math.sin(a) * R;
  const x1 = CX + Math.cos(b) * R, y1 = CY + Math.sin(b) * R;
  const large = (b - a) > Math.PI ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

export class HUD {
  constructor() {
    this.el = $('hud');
    this.e = {};
    for (const id of ['h-score', 'h-mult', 'h-combo', 'h-best', 'h-dist', 'h-dist-l', 'h-near', 'h-gear', 'h-speed', 'h-unit', 'h-boost', 'h-mode', 'h-timer', 'h-obj', 'h-obj-t', 'h-obj-fill', 'h-pops', 'h-banner', 'h-cam', 'h-hint', 'h-scorebox', 'g-rpm', 'g-red', 'g-track', 'h-edge', 'h-combo-w', 'h-cluster']) this.e[id] = $(id);
    this.e['g-track'].setAttribute('d', arcPath(0, 1));
    this.e['g-rpm'].setAttribute('d', arcPath(0, 1));
    this.e['g-rpm'].style.strokeDasharray = `${LEN} ${LEN}`;
    this.last = {};
    this.bannerT = 0;
    this.camT = 0;
    this.hintT = 0;
  }

  show(v) { this.el.classList.toggle('hidden', !v); }
  setMinimal(m) { this.el.classList.toggle('minimal', m); }

  setup({ mode, modeLabel, scoring, timer, objective, redFrac, units, best }) {
    this.e['h-mode'].textContent = modeLabel;
    this.e['h-scorebox'].style.display = scoring || timer ? '' : 'none';
    this.e['h-score'].style.display = scoring ? '' : 'none';
    this.e['h-mult'].parentElement.style.display = scoring ? '' : 'none';
    this.e['h-timer'].classList.toggle('hidden', !timer);
    this.e['h-obj'].classList.toggle('hidden', !objective);
    this.e['h-best'].parentElement.style.display = best !== undefined ? '' : 'none';
    this.e['h-near'].parentElement.style.display = scoring ? '' : 'none';
    this.e['g-red'].setAttribute('d', arcPath(clamp(redFrac, 0, 1), 1));
    this.e['h-unit'].textContent = units === 'kmh' ? 'KM/H' : 'MPH';
    this.units = units;
    this.e['h-pops'].innerHTML = '';
    this.last = {};
    this.mode = mode;
  }

  _set(id, text) {
    if (this.last[id] !== text) {
      this.last[id] = text;
      this.e[id].textContent = text;
    }
  }

  update(dt, d) {
    const sp = this.units === 'kmh' ? d.speed * MS_TO_KMH : d.speed * MS_TO_MPH;
    this._set('h-speed', String(Math.round(sp)));
    this._set('h-gear', d.gear === -1 ? 'R' : d.gear === 0 ? 'N' : String(d.gear));
    const f = clamp(d.rpm / d.rpmMax, 0, 1);
    this.e['g-rpm'].style.strokeDashoffset = (LEN * (1 - f)).toFixed(1);
    const hot = d.rpm > d.redline * 0.96;
    if (this.last.hot !== hot) { this.last.hot = hot; this.e['g-rpm'].classList.toggle('hot', hot); }
    this.e['h-boost'].style.width = `${Math.round(clamp(d.boost, 0, 1) * 100)}%`;
    // gear changes flash the cluster; the speed readout heats up with speed
    const gear = d.gear;
    if (this.last.gearN !== undefined && this.last.gearN !== gear) this._kick(this.e['h-cluster'], gear > this.last.gearN ? 'shift-up' : 'shift-dn');
    this.last.gearN = gear;
    const heat = Math.round(clamp((d.speed * MS_TO_MPH - 80) / 90, 0, 1) * 10) / 10;
    if (this.last.heat !== heat) { this.last.heat = heat; this.e['h-cluster'].style.setProperty('--heat', heat); }
    if (d.scoring) {
      const sc = formatInt(d.score);
      if (this.last['h-score'] !== sc) {
        this._set('h-score', sc);
      }
      this._set('h-mult', `×${d.mult.toFixed(1)}`);
      // multiplier heat tiers: gold -> orange -> red -> white-hot
      const tier = d.mult >= 8 ? 4 : d.mult >= 5 ? 3 : d.mult >= 3 ? 2 : d.mult >= 2 ? 1 : 0;
      if (this.last.tier !== tier) {
        const up = this.last.tier !== undefined && tier > this.last.tier;
        this.last.tier = tier;
        const m = this.e['h-mult'];
        m.className = 'mult t' + tier;
        this.e['h-scorebox'].dataset.tier = tier;
        if (up) this._kick(m, 'up');
      }
      const cf = clamp(d.combo / 7, 0, 1);
      this.e['h-combo'].style.width = `${Math.round(cf * 100)}%`;
      const low = cf > 0 && cf < 0.28 && d.mult > 1;
      if (this.last.comboLow !== low) { this.last.comboLow = low; this.e['h-combo-w'].classList.toggle('low', low); }
      this._set('h-near', String(d.nearMisses));
    }
    if (d.best !== undefined) this._set('h-best', formatInt(d.best));
    this._set('h-dist', d.distText);
    this._set('h-dist-l', d.distLabel || 'DIST');
    if (d.timer !== undefined) {
      this._set('h-timer', formatTime(d.timer));
      const low = d.timer < 10;
      if (this.last.low !== low) { this.last.low = low; this.e['h-timer'].classList.toggle('low', low); }
    }
    if (d.objective) {
      this._set('h-obj-t', d.objective.text);
      this.e['h-obj-fill'].style.width = `${Math.round(clamp(d.objective.frac, 0, 1) * 100)}%`;
    }
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      if (this.bannerT <= 0) this.e['h-banner'].classList.remove('show');
    }
    if (this.camT > 0) {
      this.camT -= dt;
      if (this.camT <= 0) this.e['h-cam'].classList.remove('show');
    }
    if (this.hintT > 0) {
      this.hintT -= dt;
      if (this.hintT <= 0) this.e['h-hint'].classList.add('fade');
    }
  }

  bumpScore(kind) {
    const el = this.e['h-score'];
    el.classList.remove('bump', 'big');
    void el.offsetWidth;
    el.classList.add('bump');
    if (kind === 'xclose' || kind === 'split' || kind === 'chain' || kind === 'streak') el.classList.add('big');
  }

  /** restart a one-shot CSS animation class on an element */
  _kick(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    clearTimeout(el['_k' + cls]);
    el['_k' + cls] = setTimeout(() => el.classList.remove(cls), 900);
  }

  pop(ev) {
    const box = this.e['h-pops'];
    const p = document.createElement('div');
    p.className = 'pop ' + ev.kind;
    let html = `<span class="p-t" data-t="${ev.text}">${ev.text}</span>`;
    if (ev.pts) html += `<span class="p-pts">+${formatInt(ev.pts)}</span>`;
    if (ev.dense) html += `<span class="p-tag">DENSE ×${ev.dense.toFixed(1)}</span>`;
    p.innerHTML = html;
    box.prepend(p);
    while (box.children.length > 4) box.lastChild.remove();
    setTimeout(() => p.remove(), 1650);
    if (ev.pts) this.bumpScore(ev.kind);
    if (ev.kind !== 'over') this.edge(ev.kind, ev.side);
  }

  /** coloured light at the screen edges, from the side the car passed on */
  edge(kind, side) {
    const el = this.e['h-edge'];
    el.className = 'h-edge';
    void el.offsetWidth;
    el.className = `h-edge on ${kind} ${side < 0 ? 'l' : side > 0 ? 'r' : ''}`;
  }

  banner(kicker, title, sub, dur = 3) {
    const b = this.e['h-banner'];
    b.innerHTML = `<div class="b-k">${kicker}</div><div class="b-t">${title}</div>${sub ? `<div class="b-s">${sub}</div>` : ''}`;
    b.classList.remove('show');
    void b.offsetWidth;
    b.classList.add('show');
    this.bannerT = dur;
  }

  hideBanner() {
    this.e['h-banner'].classList.remove('show');
    this.bannerT = 0;
  }

  camLabel(name) {
    const el = this.e['h-cam'];
    el.textContent = name.toUpperCase() + ' CAM';
    el.classList.add('show');
    this.camT = 1.6;
  }

  hint(html, dur = 9) {
    const el = this.e['h-hint'];
    el.innerHTML = html;
    el.classList.remove('fade');
    this.hintT = dur;
  }
}
