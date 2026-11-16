// Money: you earn cash by driving and spend it on cars and parts.
//
// - Payout for a run: $1 per point scored plus a little for distance covered (so clean, cautious driving still
//   pays something). Challenges pay their reward in cash.
// - Cars are bought outright (the two starter cars are free).
// - Parts are bought per car and stay owned once bought (you can swap freely between parts you own). A car's
//   factory parts come with it. Colours (paint, rims, calipers), window tint and the plate are free.
import { PLAYER_CARS, CAR_BY_ID } from '../config/cars.js';

export const START_CASH = 5000;
export const DISTANCE_PAY = 0.2; // $ per metre driven in a scoring run

/** Price tables keyed by the customisation field they apply to. */
export const PART_PRICES = {
  wheels: {
    five: 1500, split: 2500, multi: 2500, steelie: 1200, aero: 3000, turbine: 3000, yspoke: 3000, vspoke: 3500,
    mesh: 3500, rs8: 4500, gt: 4500, six: 5000, fan: 5500, deep: 6000, blade: 6500, center: 7500,
    dish5: 8500, dish3: 9500, sdish: 12000,
  },
  kit: { stock: 0, street: 5000, aggressive: 11000, wide: 20000, rivet: 32000, outlaw: 48000 },
  spoiler: { none: 0, lip: 2000, duck: 4500, wing: 6000, gt: 12000 },
  suspension: { stock: 0, lowered: 3500, slammed: 7500 },
  exhaust: { stock: 0, sport: 4000, straight: 8000 },
  finish: { gloss: 0, metallic: 1500, pearl: 3000, matte: 3500, chrome: 15000 },
};
export const PRICED = Object.keys(PART_PRICES);

export const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

export class Economy {
  constructor(game) {
    this.game = game;
    this._migrate();
  }

  get save() { return this.game.save; }
  get sandbox() { return !!this.game.S.unlockAll; }
  get cash() { return Math.floor(this.save.cash || 0); }

  /** Saves from before money existed: keep every car already unlocked and every part already fitted. */
  _migrate() {
    const s = this.save;
    if (s.econ === 1) return;
    s.econ = 1;
    s.owned = PLAYER_CARS.filter((c) => c.cost > 0 && c.cost <= (s.career || 0)).map((c) => c.id);
    s.parts = {};
    for (const [id, cu] of Object.entries(s.customs || {})) {
      if (!CAR_BY_ID[id]) continue;
      for (const k of PRICED) if (cu[k] !== undefined) this._grant(id, k, cu[k]);
    }
    s.cash = Math.max(s.cash || 0, START_CASH * 2);
    this.game.saveNow();
  }

  /* ------------------------------------------------------------ cars */
  ownsCar(id) {
    const c = CAR_BY_ID[id];
    return !!c && (this.sandbox || c.cost === 0 || (this.save.owned || []).includes(id));
  }

  canAfford(n) { return this.sandbox || this.cash >= n; }

  buyCar(id) {
    const c = CAR_BY_ID[id];
    if (!c || this.ownsCar(id) || !this.canAfford(c.cost)) return false;
    if (!this.sandbox) this.save.cash -= c.cost;
    (this.save.owned ||= []).push(id);
    this.game.saveNow();
    return true;
  }

  /* ------------------------------------------------------------ parts */
  price(key, val) { return PART_PRICES[key]?.[val] ?? 0; }

  ownsPart(id, key, val) {
    if (!PRICED.includes(key) || this.sandbox) return true;
    if (this.price(key, val) === 0) return true;
    if (CAR_BY_ID[id]?.defaults?.[key] === val) return true; // factory part
    return (this.save.parts?.[id] || []).includes(`${key}:${val}`);
  }

  _grant(id, key, val) {
    const p = ((this.save.parts ||= {})[id] ||= []);
    const k = `${key}:${val}`;
    if (!p.includes(k)) p.push(k);
  }

  buyPart(id, key, val) {
    if (this.ownsPart(id, key, val)) return true;
    const n = this.price(key, val);
    if (!this.canAfford(n)) return false;
    if (!this.sandbox) this.save.cash -= n;
    this._grant(id, key, val);
    this.game.saveNow();
    return true;
  }

  /* ------------------------------------------------------------ earning */
  /** Cash earned by a run summary (score + distance). */
  payFor(sum) { return Math.max(0, Math.round((sum.score || 0) + (sum.distance || 0) * DISTANCE_PAY)); }

  /** Add cash; tells the player when that makes a new car affordable. Returns the amount. */
  earn(amount) {
    amount = Math.max(0, Math.round(amount));
    if (!amount) return 0;
    const before = this.cash;
    this.save.cash = (this.save.cash || 0) + amount;
    this.save.career = (this.save.career || 0) + amount; // lifetime earnings
    if (!this.sandbox) {
      for (const c of PLAYER_CARS) {
        if (!this.ownsCar(c.id) && c.cost > before && c.cost <= this.cash) {
          this.game.ui.toast(`YOU CAN AFFORD THE ${c.name.toUpperCase()} · ${money(c.cost)} IN THE GARAGE`, 'gold');
          this.game.audio.bigChime();
        }
      }
    }
    return amount;
  }
}
