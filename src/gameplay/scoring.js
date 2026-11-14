// No Hesi-style scoring: proximity passes, splits, chains, speed streaks, multipliers.
import { clamp, MS_TO_MPH } from '../core/utils.js';

export const PASS_TYPES = {
  xclose: { label: 'EXTREMELY CLOSE', base: 300, mult: 0.5, combo: 7 },
  close: { label: 'CLOSE PASS', base: 100, mult: 0.25, combo: 7 },
  hsover: { label: 'HIGH-SPEED OVERTAKE', base: 75, mult: 0.1, combo: 3.5 },
  over: { label: 'OVERTAKE', base: 25, mult: 0.05, combo: 2.5 },
};

export class Scoring {
  constructor() {
    this.events = [];
    this.sounds = [];
    this.reset();
  }

  reset() {
    this.score = 0;
    this.mult = 1;
    this.combo = 0; // seconds left in combo window
    this.comboMax = 7;
    this.chain = 0;
    this.nearMisses = 0;
    this.closePasses = 0;
    this.xclose = 0;
    this.splits = 0;
    this.overtakes = 0;
    this.distance = 0;
    this.topSpeed = 0;
    this.time = 0;
    this.streak = 0;
    this.streakAwarded = 0;
    this.slowT = 0;
    this.speedPts = 0;
    this.recentPasses = [];
    this.dense = 1;
  }

  /**
   * ctx: { speed, cars, ps, pd, pw, pl, scoring (bool), dt }
   */
  update(dt, ctx) {
    const mph = ctx.speed * MS_TO_MPH;
    this.time += dt;
    if (mph > this.topSpeed) this.topSpeed = mph;
    // density around the player
    let near = 0;
    for (const c of ctx.cars) if (Math.abs(c.s - ctx.ps) < 55 && Math.abs(c.d - ctx.pd) < 8) near++;
    this.dense = 1 + Math.min(0.5, Math.max(0, near - 1) * 0.07);

    // pass detection
    const now = this.time;
    for (const c of ctx.cars) {
      if (c.hit) continue;
      const rel = c.s - ctx.ps;
      const reach = c.len / 2 + ctx.pl + 1.2;
      const gap = Math.abs(ctx.pd - c.d) - (c.wid / 2 + ctx.pw);
      if (Math.abs(rel) < reach) {
        if (!c.ov) {
          c.ov = true;
          c.minGap = gap;
          c.startAhead = rel > 0;
          c.side = Math.sign(c.d - ctx.pd) || 1;
        }
        if (gap < c.minGap) c.minGap = gap;
        // centre crossing: pass-by whoosh
        if (!c.whoosh && rel < 0 && c.startAhead && gap < 3.2) {
          c.whoosh = true;
          const relV = ctx.speed - c.speed;
          if (relV > 6) this.sounds.push({ type: 'whoosh', side: c.side, intensity: clamp((3.2 - gap) / 3, 0.15, 1) * clamp(relV / 35, 0.3, 1), rel: relV });
        }
      } else if (c.ov) {
        c.ov = false;
        if (c.startAhead && rel < 0 && !c.scored && !c.crashed) {
          c.scored = true;
          this.recentPasses.push({ t: now, side: c.side, gap: c.minGap });
          if (ctx.scoring && mph > 50) this._pass(c, mph);
        }
      }
    }
    while (this.recentPasses.length && now - this.recentPasses[0].t > 0.6) this.recentPasses.shift();

    if (!ctx.scoring) return;
    // continuous speed points
    if (mph > 80) {
      const p = (mph - 80) * 0.8 * dt * this.mult;
      this.score += p;
      this.speedPts += p;
    }
    // speed streak above 120 mph
    if (mph > 120) {
      this.streak += dt;
      const lvl = Math.floor(this.streak / 10);
      if (lvl > this.streakAwarded) {
        this.streakAwarded = lvl;
        const pts = Math.round(200 * lvl * this.mult);
        this.score += pts;
        this.mult = Math.min(10, this.mult + 0.2);
        this.combo = Math.max(this.combo, 4);
        this.events.push({ text: `SPEED STREAK ${lvl * 10}s`, pts, kind: 'streak' });
        this.sounds.push({ type: 'big' });
      }
    } else {
      this.streak = 0;
      this.streakAwarded = 0;
    }
    // combo decay
    if (this.combo > 0) this.combo -= dt;
    else if (this.mult > 1) {
      this.mult = Math.max(1, this.mult - dt * 0.6);
      if (this.chain) this.chain = 0;
    }
    // too slow
    if (mph < 40 && this.time > 3) {
      this.slowT += dt;
      if (this.slowT > 4 && this.mult > 1) {
        this.mult = 1;
        this.chain = 0;
        this.combo = 0;
        this.events.push({ text: 'TOO SLOW', pts: 0, kind: 'bad' });
      }
    } else this.slowT = 0;
  }

  _pass(c, mph) {
    const g = c.minGap;
    let type = null;
    if (g < 0.5) type = 'xclose';
    else if (g < 1.2) type = 'close';
    else if (g < 4.0) type = mph >= 130 ? 'hsover' : 'over';
    if (!type) return;
    const T = PASS_TYPES[type];
    const sf = clamp(mph / 100, 0.5, 2.5);
    const dense = type === 'xclose' || type === 'close' ? this.dense : 1;
    let pts = Math.round(T.base * sf * dense * this.mult);
    this.score += pts;
    this.mult = Math.min(10, this.mult + T.mult);
    this.combo = Math.max(this.combo, T.combo);
    this.comboMax = 7;
    if (type === 'xclose' || type === 'close') {
      this.closePasses++;
      if (type === 'xclose') this.xclose++;
      this.nearMisses++;
      this.chain++;
    } else {
      this.overtakes++;
      if (g < 2.0) this.nearMisses++;
    }
    this.events.push({ text: T.label, pts, kind: type, dense: dense > 1.15 ? dense : 0, gap: g });
    this.sounds.push({ type: 'chime', level: Math.min(12, (this.mult - 1) * 2) + (type === 'xclose' ? 4 : 0) });
    // split: passed cars on both sides within a short window
    if (g < 1.6) {
      const other = this.recentPasses.find((p) => p.side !== c.side && p.gap < 1.6 && !p.used);
      if (other) {
        other.used = true;
        this.splits++;
        const sp = Math.round(400 * sf * this.mult);
        this.score += sp;
        this.mult = Math.min(10, this.mult + 0.5);
        this.combo = 7;
        this.events.push({ text: 'THREAD THE NEEDLE', pts: sp, kind: 'split' });
        this.sounds.push({ type: 'big' });
      }
    }
    // chain milestones
    if ((type === 'xclose' || type === 'close') && this.chain > 0 && this.chain % 5 === 0) {
      const cp = Math.round(this.chain * 60 * sf * this.mult);
      this.score += cp;
      this.events.push({ text: `${this.chain}x CHAIN`, pts: cp, kind: 'chain' });
      this.sounds.push({ type: 'big' });
    }
  }

  /** Light contact: lose the multiplier. */
  contact() {
    if (this.mult > 1 || this.chain > 0) this.events.push({ text: 'CONTACT', pts: 0, kind: 'bad' });
    this.mult = 1;
    this.chain = 0;
    this.combo = 0;
  }

  addDistance(m) {
    if (m > 0) this.distance += m;
  }

  summary() {
    return {
      score: Math.floor(this.score), nearMisses: this.nearMisses, closePasses: this.closePasses, xclose: this.xclose,
      splits: this.splits, overtakes: this.overtakes, distance: this.distance, topSpeed: this.topSpeed, time: this.time, maxMult: this.mult,
    };
  }
}
