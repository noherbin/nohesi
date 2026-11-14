// Simple AI driver for the player car: used for the menu attract mode (and handy for testing).
import { clamp, MPH_TO_MS } from '../core/utils.js';

export class Autopilot {
  constructor() {
    this.targetLane = 2;
    this.timer = 0;
    this.cruise = 92 * MPH_TO_MS;
  }

  reset(lane, cruiseMph = 92) {
    this.targetLane = lane;
    this.timer = 1;
    this.cruise = cruiseMph * MPH_TO_MS;
  }

  _gapAhead(traffic, layout, lane, s, d) {
    const cd = layout.laneCenter(lane);
    let gap = 1e9, v = 0;
    for (const c of traffic.cars) {
      if (Math.abs(c.d - cd) > 2.3) continue;
      const g = c.s - c.len / 2 - s - 2.4;
      if (g > -1 && g < gap) { gap = g; v = c.speed; }
    }
    return { gap, v };
  }

  _sideClear(traffic, layout, lane, s, v) {
    const cd = layout.laneCenter(lane);
    for (const c of traffic.cars) {
      if (Math.abs(c.d - cd) > 2.6) continue;
      const rel = c.s - s;
      // need room alongside, plus time to close on slower cars ahead in that lane
      if (rel > -9 && rel < 9 + Math.max(0, v - c.speed) * 1.2) return false;
    }
    return true;
  }

  update(dt, car, traffic, road, layout) {
    const P = car.phys;
    const s = car.proj.s, d = car.proj.d;
    const curLane = layout.laneOf(d);
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = 0.35;
      const here = this._gapAhead(traffic, layout, this.targetLane, s, d);
      const want = P.speed * 2.6 + 25;
      if (here.gap < want && Math.abs(d - layout.laneCenter(this.targetLane)) < 1.2) {
        let best = this.targetLane, bestGap = here.gap;
        for (const dl of Math.random() < 0.5 ? [-1, 1] : [1, -1]) {
          const l = curLane + dl;
          if (l < 0 || l >= layout.n) continue;
          const g = this._gapAhead(traffic, layout, l, s, d).gap;
          if (g > bestGap + 15 && this._sideClear(traffic, layout, l, s, P.speed)) { best = l; bestGap = g; }
        }
        this.targetLane = best;
      }
    }
    // steering: pure pursuit toward the target lane
    const look = Math.max(14, P.speed * 0.95);
    const tp = road.pos(s + look, layout.laneCenter(this.targetLane), {});
    const dx = tp.X - P.X, dy = tp.Y - P.Y;
    const sh = Math.sin(P.heading), ch = Math.cos(P.heading);
    const fwd = dx * sh + dy * ch, lat = dx * ch - dy * sh;
    const kappa = (2 * lat) / Math.max(1, fwd * fwd + lat * lat);
    const delta = Math.atan(kappa * P.L);
    const steer = clamp(delta / Math.max(0.002, P.steerLimit()), -1, 1);
    // speed control: watch both the target lane and whatever is directly in our path
    const ahead = this._gapAhead(traffic, layout, this.targetLane, s, d);
    for (const c of traffic.cars) {
      if (Math.abs(c.d - d) > c.wid / 2 + 1.25) continue;
      const g = c.s - c.len / 2 - s - 2.4;
      if (g > -1 && g < ahead.gap) { ahead.gap = g; ahead.v = c.speed; }
    }
    let vT = this.cruise;
    if (ahead.gap < P.speed * 1.6 + 10) vT = Math.min(vT, ahead.v - 1 + (ahead.gap - 10) * 0.35);
    const err = vT - P.u;
    return {
      throttle: clamp(err * 0.35, 0, 1),
      brake: clamp(-err * 0.25 - 0.1, 0, 1),
      steer,
      analog: true,
      handbrake: false,
    };
  }
}
