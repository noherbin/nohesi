// Procedural night-drive synthwave: drums, bass, arpeggio and pads scheduled with WebAudio.
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

const PROGRESSIONS = [
  [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], // Am F C G
  [[50, 53, 57], [46, 50, 53], [48, 52, 55], [45, 49, 52]], // Dm Bb C A
  [[52, 55, 59], [48, 52, 55], [55, 59, 62], [50, 54, 57]], // Em C G D
];

export class Music {
  constructor(ctx, out) {
    this.ctx = ctx;
    this.out = ctx.createGain();
    this.out.gain.value = 0.9;
    this.out.connect(out);
    this.tempo = 100;
    this.playing = false;
    // reverb
    this.verb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.2;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    this.verb.buffer = ir;
    this.verbGain = ctx.createGain();
    this.verbGain.gain.value = 0.35;
    this.verb.connect(this.verbGain).connect(this.out);
    // delay for arps
    this.delay = ctx.createDelay(1.0);
    this.delay.delayTime.value = (60 / this.tempo) * 0.75;
    this.fb = ctx.createGain();
    this.fb.gain.value = 0.32;
    this.delay.connect(this.fb).connect(this.delay);
    this.delayOut = ctx.createGain();
    this.delayOut.gain.value = 0.35;
    this.delay.connect(this.delayOut).connect(this.out);
    const n = ctx.sampleRate;
    this.noise = ctx.createBuffer(1, n, n);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    this.prog = PROGRESSIONS[0];
  }

  start() {
    if (this.playing) return;
    this.playing = true;
    this.step = 0;
    this.prog = PROGRESSIONS[Math.floor(Math.random() * PROGRESSIONS.length)];
    this.next = this.ctx.currentTime + 0.15;
    this.timer = setInterval(() => this._schedule(), 25);
    this.out.gain.cancelScheduledValues(this.ctx.currentTime);
    this.out.gain.setTargetAtTime(0.9, this.ctx.currentTime, 0.4);
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    clearInterval(this.timer);
    this.out.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
  }

  _schedule() {
    const spb = 60 / this.tempo / 4;
    while (this.next < this.ctx.currentTime + 0.15) {
      this._play(this.step, this.next);
      this.next += spb;
      this.step++;
    }
  }

  _play(step, t) {
    const s16 = step % 16;
    const bar = Math.floor(step / 16) % 4;
    const section = Math.floor(step / 64) % 4; // intro-ish variation
    const chord = this.prog[bar];
    const spb = 60 / this.tempo / 4;
    // drums
    if (s16 % 4 === 0) this._kick(t);
    if (s16 === 4 || s16 === 12) this._snare(t);
    if (s16 % 2 === 0 && section > 0) this._hat(t, s16 % 4 === 2 ? 0.07 : 0.035, s16 % 4 === 2 ? 0.09 : 0.03);
    // bass: driving 8ths
    if (s16 % 2 === 0) this._bass(midi(chord[0] - 24 + (s16 % 8 === 6 ? 12 : 0)), t, spb * 1.7);
    // arp
    if (section !== 0 || bar > 1) {
      const pat = [0, 1, 2, 1, 0, 2, 1, 2];
      const note = chord[pat[s16 % 8]] + 12 + (s16 >= 8 ? 12 : 0);
      this._pluck(midi(note), t, spb * 0.9);
    }
    // pads
    if (s16 === 0) for (const n of chord) this._pad(midi(n), t, spb * 16);
  }

  _kick(t) {
    const c = this.ctx;
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g).connect(this.out);
    o.start(t);
    o.stop(t + 0.35);
  }

  _snare(t) {
    const c = this.ctx;
    const src = c.createBufferSource();
    src.buffer = this.noise;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1900;
    f.Q.value = 0.8;
    const g = c.createGain();
    g.gain.setValueAtTime(0.45, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    src.connect(f).connect(g);
    g.connect(this.out);
    g.connect(this.verb);
    src.start(t, Math.random() * 0.5, 0.25);
    const o = c.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.08);
    const og = c.createGain();
    og.gain.setValueAtTime(0.3, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(og).connect(this.out);
    o.start(t);
    o.stop(t + 0.12);
  }

  _hat(t, vol, dur) {
    const c = this.ctx;
    const src = c.createBufferSource();
    src.buffer = this.noise;
    const f = c.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7500;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f).connect(g).connect(this.out);
    src.start(t, Math.random() * 0.5, dur + 0.02);
  }

  _bass(f, t, dur) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 4;
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(180, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(lp).connect(g).connect(this.out);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  _pluck(f, t, dur) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = 'square';
    o.frequency.value = f;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t);
    lp.frequency.exponentialRampToValueAtTime(500, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(lp).connect(g);
    g.connect(this.out);
    g.connect(this.delay);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  _pad(f, t, dur) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.6);
    g.gain.setValueAtTime(0.035, t + dur - 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.3);
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    lp.connect(g);
    g.connect(this.out);
    g.connect(this.verb);
    for (const det of [-9, 0, 8]) {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.detune.value = det;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.35);
    }
  }
}
