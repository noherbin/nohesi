// Offline synthesis of looping engine sound samples from simulated combustion pulse trains.
// Each car gets three loops (low / mid / high rpm) that are pitch-shifted and crossfaded at runtime.
import { mulberry32 } from '../core/utils.js';

export const ENGINE_PROFILES = {
  boxer4: { pulses: 4, amp: [1, 0.7, 0.95, 0.66], off: [0, 0.06, 0, 0.06], ring: 165, noise: 0.42, lp: 3600, res: [[92, 5, 1.3], [255, 4, 0.9], [760, 3, 0.45], [1900, 3, 0.15]], drive: 1.7, jitter: 0.1 },
  i4: { pulses: 4, amp: [1, 0.93, 0.98, 0.9], off: [0, 0, 0, 0], ring: 245, noise: 0.34, lp: 4600, res: [[128, 5, 1.0], [410, 4, 0.85], [1250, 3, 0.4], [2800, 3, 0.15]], drive: 1.9, jitter: 0.07 },
  rotary: { pulses: 4, amp: [1, 0.97, 1, 0.97], off: [0, 0.01, 0, 0.01], ring: 390, noise: 0.62, lp: 5600, res: [[170, 4, 1.0], [590, 4, 1.0], [1750, 3, 0.55], [3600, 3, 0.2]], drive: 2.6, jitter: 0.2 },
  i6: { pulses: 6, amp: [1, 0.95, 0.98, 0.96, 0.99, 0.94], off: [0, 0, 0, 0, 0, 0], ring: 300, noise: 0.26, lp: 5400, res: [[148, 5, 1.0], [510, 4, 0.9], [1500, 3, 0.5], [3200, 3, 0.15]], drive: 1.8, jitter: 0.05 },
  flat6: { pulses: 6, amp: [1, 0.84, 0.97, 0.82, 0.99, 0.86], off: [0, 0.02, 0, 0.02, 0, 0.02], ring: 335, noise: 0.42, lp: 6000, res: [[160, 5, 1.0], [560, 4, 1.05], [1700, 3, 0.65], [3400, 3, 0.25]], drive: 2.1, jitter: 0.06 },
  v8: { pulses: 8, amp: [1, 0.66, 0.92, 0.95, 0.6, 0.97, 0.7, 0.98], off: [0, 0.015, 0, 0.01, 0.02, 0, 0.01, 0], ring: 125, noise: 0.3, lp: 3800, res: [[82, 6, 1.3], [235, 4, 0.95], [680, 3, 0.45], [1700, 3, 0.15]], drive: 1.7, jitter: 0.08 },
  v8cross: { pulses: 8, amp: [1, 0.52, 0.9, 0.96, 0.48, 0.98, 0.6, 1], off: [0, 0.03, 0, 0.02, 0.035, 0, 0.02, 0], ring: 98, noise: 0.32, lp: 3000, res: [[68, 6, 1.5], [196, 4, 0.95], [600, 3, 0.4], [1500, 3, 0.12]], drive: 1.9, jitter: 0.1 },
  v8flat: { pulses: 8, amp: [1, 0.94, 0.98, 0.93, 1, 0.95, 0.97, 0.94], off: [0, 0, 0, 0, 0, 0, 0, 0], ring: 285, noise: 0.35, lp: 6200, res: [[140, 5, 1.0], [470, 4, 1.0], [1450, 3, 0.65], [3300, 3, 0.25]], drive: 2.3, jitter: 0.05 },
  // V12 grand tourer: smooth, dense, turbo-muffled
  v12: { pulses: 12, amp: [1, 0.93, 0.98, 0.94, 0.99, 0.95, 1, 0.94, 0.98, 0.93, 0.99, 0.95], off: [0, 0.006, 0, 0.006, 0, 0.006, 0, 0.006, 0, 0.006, 0, 0.006], ring: 300, noise: 0.24, lp: 5200, res: [[150, 5, 1.1], [520, 4, 1.0], [1600, 3, 0.55], [3500, 3, 0.18]], drive: 1.9, jitter: 0.04 },
  // naturally aspirated exotic V12: brighter, harder-edged, screams to 8,700
  v12ex: { pulses: 12, amp: [1, 0.9, 0.98, 0.91, 1, 0.92, 0.99, 0.9, 0.98, 0.91, 1, 0.92], off: [0, 0.008, 0, 0.008, 0, 0.008, 0, 0.008, 0, 0.008, 0, 0.008], ring: 420, noise: 0.3, lp: 8000, res: [[185, 5, 1.0], [660, 4, 1.15], [2100, 3, 0.8], [4400, 3, 0.32]], drive: 2.5, jitter: 0.04 },
  // electric motor: an almost pure tonal whine (many even pulses, little noise, high harmonics)
  ev: { pulses: 24, amp: new Array(24).fill(1), off: new Array(24).fill(0), ring: 900, noise: 0.03, lp: 9000, res: [[700, 8, 0.6], [1900, 8, 0.45], [4200, 6, 0.25], [7000, 5, 0.12]], drive: 1.1, jitter: 0.005 },
  v10: { pulses: 10, amp: [1, 0.88, 0.97, 0.87, 1, 0.91, 0.96, 0.88, 0.99, 0.9], off: [0, 0.01, 0, 0.012, 0, 0.01, 0, 0.012, 0, 0.01], ring: 365, noise: 0.32, lp: 7200, res: [[172, 5, 1.0], [620, 4, 1.1], [1950, 3, 0.7], [4000, 3, 0.28]], drive: 2.3, jitter: 0.05 },
};

class Biquad {
  constructor(type, f, Q, sr) {
    const w = (2 * Math.PI * f) / sr, cs = Math.cos(w), sn = Math.sin(w), a = sn / (2 * Q);
    let b0, b1, b2, a0, a1, a2;
    if (type === 'lp') {
      b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = (1 - cs) / 2; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a;
    } else if (type === 'hp') {
      b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = (1 + cs) / 2; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a;
    } else {
      b0 = a; b1 = 0; b2 = -a; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a;
    }
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
    this.x1 = this.x2 = this.y1 = this.y2 = 0;
  }
  run(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y;
    return y;
  }
}

/** Synthesize a seamless loop at a given rpm. Returns Float32Array. */
export function synthLoop(sr, rpm, prof, seed = 1, character = {}) {
  const cycleT = 120 / rpm; // seconds per 4-stroke cycle (two revs)
  const cycles = Math.max(6, Math.round(0.75 / cycleT));
  const loopN = Math.round(cycles * cycleT * sr);
  const per = loopN / cycles;
  const total = loopN * 3; // warm-up loop, the loop we keep, and a tail loop
  const buf = new Float32Array(total);
  const rng = mulberry32(seed);
  const P = prof.pulses;
  const jit = (prof.jitter ?? 0.06) * (character.rough ?? 1);
  const varA = new Float32Array(cycles * P), varT = new Float32Array(cycles * P);
  const phA = new Float32Array(cycles * P), nOffA = new Int32Array(cycles * P);
  for (let i = 0; i < cycles * P; i++) {
    varA[i] = 1 + (rng() - 0.5) * 2 * jit;
    varT[i] = (rng() - 0.5) * 0.012 * (character.rough ?? 1);
    phA[i] = rng() * 0.6;
    nOffA[i] = Math.floor(rng() * 4000);
  }
  const fireInt = cycleT / P;
  const tau = Math.max(0.0012, fireInt * 0.42);
  const tauN = tau * 0.45;
  const pulseLen = Math.min(Math.floor(tau * 6 * sr), Math.floor(per * 1.5));
  const ringW = (2 * Math.PI * prof.ring * (character.ringMul ?? 1)) / sr;
  const noiseAmt = prof.noise * (character.noiseMul ?? 1);
  // white noise table for pulse texture
  const ntab = new Float32Array(4096);
  for (let i = 0; i < ntab.length; i++) ntab[i] = rng() * 2 - 1;
  for (let c = 0; c < cycles * 3; c++) {
    const cc = c % cycles;
    for (let k = 0; k < P; k++) {
      const idx = cc * P + k;
      const t0 = (c + (k + (prof.off?.[k] ?? 0)) / P + varT[idx]) * per;
      const start = Math.floor(t0);
      const A = prof.amp[k] * varA[idx];
      const ph = phA[idx];
      const nOff = nOffA[idx];
      for (let i = 0; i < pulseLen; i++) {
        const j = start + i;
        if (j < 0 || j >= total) continue;
        const t = i / sr;
        const env = Math.exp(-t / tau);
        const body = env * Math.sin(ringW * i + ph);
        // initial pressure kick
        const kick = i < sr * 0.0012 ? (1 - i / (sr * 0.0012)) * 0.9 : 0;
        const nz = ntab[(nOff + i) & 4095] * Math.exp(-t / tauN) * noiseAmt;
        buf[j] += A * (body + kick + nz);
      }
    }
  }
  // filtering: DC block, resonances, lowpass, saturation
  const hp = new Biquad('hp', 28, 0.7, sr);
  const res = prof.res.map(([f, q, g]) => ({ f: new Biquad('bp', f * (character.resMul ?? 1), q, sr), g }));
  const lp1 = new Biquad('lp', prof.lp * (character.lpMul ?? 1), 0.75, sr);
  const lp2 = new Biquad('lp', prof.lp * 1.6 * (character.lpMul ?? 1), 0.6, sr);
  const drive = prof.drive * (character.driveMul ?? 1);
  const norm = Math.tanh(drive);
  for (let i = 0; i < total; i++) {
    let x = hp.run(buf[i]);
    let y = x * 0.45;
    for (const r of res) y += r.f.run(x) * r.g * 2.2;
    y = lp2.run(lp1.run(y));
    buf[i] = Math.tanh(y * drive) / norm;
  }
  const out = buf.slice(loopN, loopN * 2);
  // normalise RMS
  let sum = 0;
  for (let i = 0; i < out.length; i++) sum += out[i] * out[i];
  const rms = Math.sqrt(sum / out.length) || 1;
  const gain = 0.22 / rms;
  for (let i = 0; i < out.length; i++) out[i] = Math.max(-1, Math.min(1, out[i] * gain));
  return out;
}

/** Build the three engine loops for a car. */
export function buildEngineBank(ctx, engine, redline, character = {}) {
  const prof = ENGINE_PROFILES[engine.type] || ENGINE_PROFILES.i4;
  const rpms = [redline * 0.2, redline * 0.48, redline * 0.8];
  return rpms.map((rpm, i) => {
    const data = synthLoop(ctx.sampleRate, rpm, prof, 11 + i * 7, character);
    const b = ctx.createBuffer(1, data.length, ctx.sampleRate);
    b.copyToChannel(data, 0);
    return { rpm, buffer: b };
  });
}

/** Noise buffers. */
export function noiseBuffer(ctx, seconds = 2, color = 'white') {
  const n = Math.floor(ctx.sampleRate * seconds);
  const b = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = b.getChannelData(0);
  let last = 0;
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < n; i++) {
    const w = Math.random() * 2 - 1;
    if (color === 'brown') {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else if (color === 'pink') {
      b0 = 0.99765 * b0 + w * 0.099046;
      b1 = 0.963 * b1 + w * 0.2965164;
      b2 = 0.57 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    } else d[i] = w;
  }
  return b;
}
