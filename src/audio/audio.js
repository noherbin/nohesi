// WebAudio sound system: synthesized engine (3 crossfaded loops), turbo whistle & blow-off,
// supercharger whine, exhaust pops, shifts, tyres, wind, road, rain, pass-by whooshes, horns,
// collisions, scrapes, UI feedback and optional procedural music.
import { buildEngineBank, noiseBuffer } from './engineSynth.js';
import { Music } from './music.js';
import { clamp, lerp, smoothstep } from '../core/utils.js';

export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.vol = { master: 0.8, engine: 0.9, sfx: 0.8, music: 0.5 };
    this.interior = false;
    this.musicOn = false;
    this.engineGainMul = 1;
    this.muted = false;
  }

  /** Must be called from a user gesture. */
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC({ latencyHint: 'interactive' }));
    this.master = ctx.createGain();
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.knee.value = 10;
    this.comp.ratio.value = 4;
    this.comp.attack.value = 0.004;
    this.comp.release.value = 0.2;
    this.master.connect(this.comp).connect(ctx.destination);
    this.engineBus = ctx.createGain();
    this.sfxBus = ctx.createGain();
    this.envBus = ctx.createGain();
    this.musicBus = ctx.createGain();
    this.engineBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.envBus.connect(this.master);
    this.musicBus.connect(this.master);
    this.white = noiseBuffer(ctx, 2, 'white');
    this.pink = noiseBuffer(ctx, 3, 'pink');
    this.brown = noiseBuffer(ctx, 3, 'brown');

    // Engine chain: loops -> mix -> tone filter -> body EQ -> engine bus
    this.engTone = ctx.createBiquadFilter();
    this.engTone.type = 'lowpass';
    this.engTone.Q.value = 0.6;
    this.engLow = ctx.createBiquadFilter();
    this.engLow.type = 'lowshelf';
    this.engLow.frequency.value = 180;
    this.engMix = ctx.createGain();
    this.engMix.connect(this.engTone).connect(this.engLow).connect(this.engineBus);
    this.loops = [];

    // intake / mechanical noise
    this.intake = this._noiseLoop(this.pink, 'bandpass', 900, 0.8, this.engMix);
    // turbo whistle
    this.turboOsc = ctx.createOscillator();
    this.turboOsc.type = 'sine';
    this.turboGain = ctx.createGain();
    this.turboGain.gain.value = 0;
    this.turboOsc.connect(this.turboGain).connect(this.engineBus);
    this.turboOsc.start();
    this.turboHiss = this._noiseLoop(this.white, 'bandpass', 4000, 4, this.engineBus);
    // supercharger whine
    this.scOsc = ctx.createOscillator();
    this.scOsc.type = 'sawtooth';
    this.scF = ctx.createBiquadFilter();
    this.scF.type = 'bandpass';
    this.scF.Q.value = 6;
    this.scGain = ctx.createGain();
    this.scGain.gain.value = 0;
    this.scOsc.connect(this.scF).connect(this.scGain).connect(this.engineBus);
    this.scOsc.start();
    // tyres
    this.squealA = this._noiseLoop(this.white, 'bandpass', 900, 14, this.sfxBus);
    this.squealB = this._noiseLoop(this.white, 'bandpass', 1350, 12, this.sfxBus);
    // wind, road, rain, scrape
    this.wind = this._noiseLoop(this.pink, 'bandpass', 600, 0.5, this.envBus);
    this.road = this._noiseLoop(this.brown, 'lowpass', 380, 0.7, this.envBus);
    this.hiss = this._noiseLoop(this.white, 'highpass', 3500, 0.7, this.envBus);
    this.rain = this._noiseLoop(this.pink, 'highpass', 1500, 0.5, this.envBus);
    this.scrape = this._noiseLoop(this.white, 'bandpass', 2600, 3, this.sfxBus);

    this.music = new Music(ctx, this.musicBus);
    this.applyVolumes();
    this.ready = true;
    this.state = { rpm: 1000, load: 0, speed: 0 };
  }

  _noiseLoop(buf, type, freq, q, dest) {
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.loopStart = Math.random() * 0.5;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    src.connect(f).connect(g).connect(dest);
    src.start(0, Math.random() * 1.5);
    return { src, f, g };
  }

  applyVolumes() {
    if (!this.ctx) return;
    const v = this.vol;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : v.master, t, 0.05);
    this.engineBus.gain.setTargetAtTime(v.engine * 0.95, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(v.sfx, t, 0.05);
    this.envBus.gain.setTargetAtTime(v.sfx * 0.9, t, 0.05);
    this.musicBus.gain.setTargetAtTime(v.music * 0.55, t, 0.05);
  }

  setMusic(on) {
    this.musicOn = on;
    if (!this.ctx) return;
    if (on) this.music.start();
    else this.music.stop();
  }

  setMuted(m) {
    this.muted = m;
    this.applyVolumes();
  }

  suspend(s) {
    if (!this.ctx) return;
    if (s) this.ctx.suspend();
    else this.ctx.resume();
  }

  /** Load engine sound for a car definition and its customisation. */
  setCar(def, custom) {
    if (!this.ctx) { this._pendingCar = [def, custom]; return; }
    for (const l of this.loops) {
      try { l.src.stop(); } catch (e) { /* already stopped */ }
      l.src.disconnect();
      l.g.disconnect();
    }
    this.loops = [];
    const ex = custom?.exhaust || 'stock';
    const character = {
      lpMul: ex === 'straight' ? 1.45 : ex === 'sport' ? 1.2 : 1,
      driveMul: ex === 'straight' ? 1.35 : ex === 'sport' ? 1.15 : 1,
      noiseMul: ex === 'straight' ? 1.3 : 1,
      rough: ex === 'straight' ? 1.4 : 1,
    };
    const bank = buildEngineBank(this.ctx, def.engine, def.phys.redline, character);
    for (const b of bank) {
      const src = this.ctx.createBufferSource();
      src.buffer = b.buffer;
      src.loop = true;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      src.connect(g).connect(this.engMix);
      src.start(0, Math.random() * b.buffer.duration);
      this.loops.push({ src, g, rpm: b.rpm });
    }
    this.car = def;
    this.exhaust = ex;
    this.engLow.gain.value = def.engine.type.startsWith('v8') ? 4 : 2;
  }

  /**
   * Per-frame update.
   * s: { rpm, throttle, load, boost, speed, skid, gear, limiter, interior, rain, scrape, active, redline, shifting }
   */
  update(dt, s) {
    if (!this.ready || this.ctx.state !== 'running') return;
    if (this._pendingCar) { this.setCar(...this._pendingCar); this._pendingCar = null; }
    const t = this.ctx.currentTime;
    const tc = 0.03;
    const st = this.state;
    st.rpm = lerp(st.rpm, s.rpm, Math.min(1, dt * 30));
    st.load = lerp(st.load, s.load, Math.min(1, dt * (s.load > st.load ? 10 : 6)));
    const active = s.active ? 1 : 0;
    const interior = s.interior;
    // engine loops crossfade by rpm
    const L = this.loops;
    if (L.length === 3) {
      const r = st.rpm;
      const w = [0, 0, 0];
      if (r <= L[0].rpm) w[0] = 1;
      else if (r <= L[1].rpm) { const k = (r - L[0].rpm) / (L[1].rpm - L[0].rpm); w[0] = Math.cos(k * Math.PI / 2); w[1] = Math.sin(k * Math.PI / 2); }
      else if (r <= L[2].rpm) { const k = (r - L[1].rpm) / (L[2].rpm - L[1].rpm); w[1] = Math.cos(k * Math.PI / 2); w[2] = Math.sin(k * Math.PI / 2); }
      else w[2] = 1;
      // an electric motor is silent at rest and only sings under load / with speed
      const ev = !!this.car?.engine.electric;
      const loadGain = ev ? (0.12 + 0.6 * st.load) * clamp(st.rpm / 2200, 0, 1) : lerp(0.42, 1.0, st.load);
      const limiterDip = s.limiter ? 0.55 : 1;
      for (let i = 0; i < 3; i++) {
        L[i].src.playbackRate.setTargetAtTime(clamp(r / L[i].rpm, 0.25, 3.5), t, 0.015);
        L[i].g.gain.setTargetAtTime(w[i] * loadGain * limiterDip * active * 0.55, t, tc);
      }
    }
    const rf = st.rpm / (s.redline || 7000);
    const bright = lerp(900, 7500, Math.pow(st.load, 0.8) * 0.75 + rf * 0.25) * (this.exhaust === 'straight' ? 1.3 : 1);
    this.engTone.frequency.setTargetAtTime(interior ? bright * 0.4 : bright, t, tc);
    // intake roar
    this.intake.f.frequency.setTargetAtTime(500 + rf * 1600, t, tc);
    this.intake.g.gain.setTargetAtTime(this.car?.engine.electric ? 0 : active * st.load * rf * 0.12, t, tc);
    // turbo
    const turbo = this.car?.engine.turbo ? s.boost : 0;
    this.turboOsc.frequency.setTargetAtTime(1800 + turbo * 5200 * (0.6 + rf * 0.4), t, 0.05);
    this.turboGain.gain.setTargetAtTime(active * turbo * turbo * 0.035 * (interior ? 0.6 : 1), t, 0.05);
    this.turboHiss.f.frequency.setTargetAtTime(2500 + turbo * 4000, t, 0.05);
    this.turboHiss.g.gain.setTargetAtTime(active * turbo * turbo * 0.06, t, 0.05);
    // supercharger
    const sc = this.car?.engine.sc ? 1 : 0;
    const scF = st.rpm / 60 * 7.5;
    this.scOsc.frequency.setTargetAtTime(scF, t, 0.02);
    this.scF.frequency.setTargetAtTime(scF, t, 0.02);
    this.scGain.gain.setTargetAtTime(active * sc * (0.012 + st.load * 0.05) * rf, t, 0.03);
    // tyres
    const sq = smoothstep(0.08, 0.7, s.skid) * active;
    const wob = Math.sin(t * 7.3) * 40 + Math.sin(t * 3.1) * 60;
    this.squealA.f.frequency.setTargetAtTime(820 + s.skid * 220 + wob, t, 0.03);
    this.squealB.f.frequency.setTargetAtTime(1260 + s.skid * 300 - wob, t, 0.03);
    this.squealA.g.gain.setTargetAtTime(sq * 0.22 * (s.wet ? 0.35 : 1), t, 0.04);
    this.squealB.g.gain.setTargetAtTime(sq * 0.14 * (s.wet ? 0.35 : 1), t, 0.04);
    // wind / road
    const sp = s.speed;
    const wind = Math.pow(clamp(sp / 85, 0, 1.4), 2) * active;
    this.wind.f.frequency.setTargetAtTime(380 + sp * 14, t, 0.1);
    this.wind.g.gain.setTargetAtTime(wind * (interior ? 0.09 : 0.2), t, 0.1);
    const roadA = clamp(sp / 60, 0, 1.3) * active;
    this.road.f.frequency.setTargetAtTime(160 + sp * 4, t, 0.1);
    this.road.g.gain.setTargetAtTime(roadA * (interior ? 0.36 : 0.24) * (s.concrete ? 1.25 : 1), t, 0.1);
    this.hiss.g.gain.setTargetAtTime(roadA * (0.012 + (s.wetRoad || 0) * 0.14), t, 0.1);
    this.rain.f.frequency.setTargetAtTime(interior ? 900 : 1600, t, 0.2);
    this.rain.g.gain.setTargetAtTime((s.rain || 0) * (interior ? 0.16 : 0.1), t, 0.3);
    this.scrape.g.gain.setTargetAtTime(clamp(s.scrape || 0, 0, 1) * 0.35, t, 0.02);
  }

  /* ------------------------------------------------------------ one-shots */
  _env(node, t, a, peak, d) {
    node.gain.setValueAtTime(0.0001, t);
    node.gain.exponentialRampToValueAtTime(peak, t + a);
    node.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  _burst(buf, type, f0, f1, q, dur, peak, dest, pan = 0, when = 0) {
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    this._env(g, t, 0.004, peak, dur);
    let out = g;
    if (pan && ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = clamp(pan, -1, 1);
      g.connect(p);
      out = p;
    }
    src.connect(f).connect(g);
    out.connect(dest);
    src.start(t, Math.random() * 1.0, dur + 0.05);
  }

  _tone(type, f0, f1, dur, peak, dest, when = 0, pan = 0) {
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    this._env(g, t, 0.003, peak, dur);
    let out = g;
    if (pan && ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = clamp(pan, -1, 1);
      g.connect(p);
      out = p;
    }
    o.connect(g);
    out.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  pop(intensity = 1) {
    if (!this.ready) return;
    const big = this.exhaust === 'straight' ? 1.4 : this.exhaust === 'sport' ? 1.15 : 0.85;
    const k = intensity * big;
    this._burst(this.white, 'bandpass', 900 + Math.random() * 900, 400, 1.2, 0.05 + Math.random() * 0.04, 0.5 * k, this.engineBus);
    this._tone('sine', 110 + Math.random() * 40, 45, 0.08, 0.6 * k, this.engineBus);
  }

  blowOff(boost, flutter) {
    if (!this.ready || boost < 0.35) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    if (flutter) {
      for (let i = 0; i < 6; i++) this._burst(this.white, 'bandpass', 1800 - i * 120, 900, 2, 0.035, 0.18 * boost * (1 - i * 0.12), this.engineBus, 0, i * 0.045);
    } else {
      this._burst(this.white, 'bandpass', 3200, 800, 1.4, 0.42, 0.28 * boost, this.engineBus);
    }
    void t;
  }

  shift(up) {
    if (!this.ready) return;
    this._burst(this.white, 'bandpass', 2400, 1600, 3, 0.03, 0.12, this.sfxBus);
    this._tone('triangle', up ? 140 : 110, 70, 0.06, 0.15, this.sfxBus);
  }

  bump(amp) {
    if (!this.ready) return;
    this._tone('sine', 85, 40, 0.12, clamp(amp * 14, 0.05, 0.4), this.envBus);
    this._tone('sine', 85, 40, 0.1, clamp(amp * 10, 0.04, 0.3), this.envBus, 0.09);
  }

  whoosh(side, intensity, rel) {
    if (!this.ready) return;
    const dur = clamp(0.5 - rel * 0.006, 0.18, 0.45);
    this._burst(this.pink, 'bandpass', 1500, 380, 0.8, dur, clamp(intensity, 0, 1) * 0.55, this.sfxBus, side * 0.75);
  }

  horn(pan, vol) {
    if (!this.ready) return;
    const dur = 0.55 + Math.random() * 0.4;
    for (const f of [415, 523]) {
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f * (0.97 + Math.random() * 0.06);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1800;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.08 * vol, t + 0.02);
      g.gain.setValueAtTime(0.08 * vol, t + dur);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
      const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      o.connect(lp).connect(g);
      if (p) { p.pan.value = clamp(pan, -1, 1); g.connect(p).connect(this.sfxBus); } else g.connect(this.sfxBus);
      o.start(t);
      o.stop(t + dur + 0.1);
    }
  }

  crash(severity) {
    if (!this.ready) return;
    const k = clamp(severity, 0.2, 1.5);
    this._tone('sine', 120, 35, 0.35, 0.9 * k, this.sfxBus);
    this._burst(this.white, 'bandpass', 1200, 300, 0.9, 0.5, 0.7 * k, this.sfxBus);
    this._burst(this.brown, 'lowpass', 600, 120, 0.7, 0.6, 0.8 * k, this.sfxBus);
    for (const f of [1150, 1720, 2480, 3300]) this._tone('triangle', f, f * 0.94, 0.5 + Math.random() * 0.4, 0.06 * k, this.sfxBus, Math.random() * 0.03);
    if (k > 0.7) for (let i = 0; i < 7; i++) this._tone('sine', 3500 + Math.random() * 3000, 3000, 0.08, 0.04, this.sfxBus, 0.05 + Math.random() * 0.35);
  }

  chime(level) {
    if (!this.ready) return;
    const base = 660 * Math.pow(2, clamp(level, 0, 12) / 12);
    this._tone('sine', base, base, 0.28, 0.12, this.sfxBus);
    this._tone('triangle', base * 1.5, base * 1.5, 0.22, 0.05, this.sfxBus, 0.06);
  }

  bigChime() {
    if (!this.ready) return;
    for (const [i, f] of [523, 659, 784, 1047].entries()) this._tone('triangle', f, f, 0.32, 0.08, this.sfxBus, i * 0.07);
  }

  /** Turn-signal relay: a short tick on, a softer tock off. */
  tick(on) {
    if (!this.ready) return;
    this._tone('square', on ? 2100 : 1500, on ? 1700 : 1200, 0.014, on ? 0.035 : 0.022, this.sfxBus);
  }

  click() {
    if (!this.ready) return;
    this._tone('triangle', 1400, 900, 0.04, 0.06, this.sfxBus);
  }

  fail() {
    if (!this.ready) return;
    this._tone('sawtooth', 300, 110, 0.6, 0.08, this.sfxBus);
  }
}
