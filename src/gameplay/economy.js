// Money: you earn cash by driving and spend it on cars and parts.
//
// - Payout for a run: $1 per point scored plus a little for distance covered (so clean, cautious driving still
//   pays something). Challenges pay their reward in cash.
// - Cars are bought outright (the two starter cars are free).
// - Parts are bought per car and stay owned once bought (you can swap freely between parts you own). A car's
//   factory parts come with it. Colours (paint, rims, calipers), window tint and the plate are free.
import { PLAYER_CARS, CAR_BY_ID } from '../config/cars.js';
import { GROUP_BY_KEY, itemOf, factoryCustom, normalizeCustom } from '../config/parts.js';

export const START_CASH = 5000;
export const DISTANCE_PAY = 0.2; // $ per metre driven in a scoring run

// Part prices live in the customisation catalogue (config/parts.js).
export const PRICED = Object.entries(GROUP_BY_KEY).filter(([, g]) => g.type === 'part').map(([k]) => k);

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
    if (s.econ === 1) this._migrateParts();
    if (s.econ >= 2) return;
    if (s.econ === 1) { s.econ = 2; this.game.saveNow(); return; }
    s.econ = 1;
    s.owned = PLAYER_CARS.filter((c) => c.cost > 0 && c.cost <= (s.career || 0)).map((c) => c.id);
    s.parts = {};
    for (const [id, cu] of Object.entries(s.customs || {})) {
      if (!CAR_BY_ID[id]) continue;
      const n = normalizeCustom(CAR_BY_ID[id], cu);
      for (const k of PRICED) if (n[k] !== undefined) this._grant(id, k, n[k]);
    }
    s.cash = Math.max(s.cash || 0, START_CASH * 2);
    s.econ = 2;
    this._migrateParts(true);
    this.game.saveNow();
  }

  /** Parts bought under the old single-slot kits / spoilers / suspension become the matching new parts. */
  _migrateParts(force = false) {
    const s = this.save;
    if (!force && s.econ !== 1) return;
    for (const [id, list] of Object.entries(s.parts || {})) {
      const def = CAR_BY_ID[id];
      if (!def) continue;
      const out = new Set();
      for (const e of list) {
        const [k, v] = e.split(':');
        if (k === 'kit') {
          const n = normalizeCustom(def, { kit: v });
          for (const kk of ['splitter', 'skirts', 'diffuser', 'fBumper', 'fenders']) if (n[kk] && n[kk] !== 'none' && n[kk] !== 'stock') out.add(`${kk}:${n[kk]}`);
        } else if (k === 'spoiler' && (v === 'wing' || v === 'gt')) out.add(`wing:${v}`);
        else if (k === 'suspension') out.add(`springs:${v === 'slammed' ? 'sport' : 'street'}`);
        else out.add(e);
      }
      s.parts[id] = [...out];
    }
    // customisations saved in the old format are converted to the new slots too
    for (const [id, cu] of Object.entries(s.customs || {})) if (CAR_BY_ID[id]) s.customs[id] = normalizeCustom(CAR_BY_ID[id], cu);
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
  price(key, val) { return itemOf(key, val)?.price ?? 0; }

  ownsPart(id, key, val) {
    if (!PRICED.includes(key) || this.sandbox) return true;
    if (this.price(key, val) === 0) return true;
    const def = CAR_BY_ID[id];
    if (def && String(factoryCustom(def)[key]) === String(val)) return true; // factory part
    return (this.save.parts?.[id] || []).includes(`${key}:${val}`);
  }

  /** Pay for something that is bought each time (a respray, a plate, a tint film). */
  spend(n) {
    if (!this.canAfford(n)) return false;
    if (!this.sandbox) this.save.cash -= n;
    this.game.saveNow();
    return true;
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
