// Leaderboards.
//
// Three boards: Endless (best run score), Time Attack (distance in two minutes) and Top Speed (fastest speed
// reached in a scoring run).
//
// - Device board: the top 10 runs on this device, kept in the save file. Always available.
// - Global board: every player's personal bests in one shared, public database (see lbBackends.js), so
//   everyone who plays (GitHub Pages, the zip, claude.ai) sees the same rankings. Without a connection the
//   game simply shows the device board.
import { CAR_BY_ID } from '../config/cars.js';
import { FirebaseBackend, ArtifactBackend } from './lbBackends.js';

export const BOARDS = [
  { id: 'endless', name: 'ENDLESS', field: 'endless', label: 'SCORE' },
  { id: 'timeattack', name: 'TIME ATTACK', field: 'ta', label: 'DISTANCE' },
  { id: 'speed', name: 'TOP SPEED', field: 'spd', label: 'TOP SPEED' },
];
const BOARD = Object.fromEntries(BOARDS.map((b) => [b.id, b]));
const LOCAL_MAX = 10;
const GLOBAL_MAX = 50;
// shared data is untrusted: ignore anything outside what the game can actually produce
const SANE = { endless: 5e7, ta: 20000, spd: 330 };
const NAME_MAX = 16;

export const cleanName = (s) => String(s || '').replace(/[\u0000-\u001f<>]/g, '').trim().toUpperCase().slice(0, NAME_MAX);

export class Leaderboard {
  constructor(game) {
    this.game = game;
    // connecting; ready: read + post; readonly: can read, cannot post; error: no global board reachable
    this.status = 'connecting';
    this.be = null;
    this.mine = null;
    this.mineLoaded = false;
    this.cache = {};
    this.listeners = new Set();
    this._writing = Promise.resolve();
    this._seedFromBests();
    this._init();
  }

  /** Saves from before the leaderboard existed: carry the recorded personal bests over (details unknown). */
  _seedFromBests() {
    const s = this.game.save;
    if (s.lbSeeded) return;
    s.lbSeeded = true;
    const seed = [['endless', s.best?.endless], ['timeattack', s.best?.timeattack], ['speed', s.stats?.topSpeed]];
    for (const [board, v] of seed) {
      const list = this.local[board];
      if (!(v > 0) || list.length) continue;
      list.push({ name: '', car: null, v: board === 'speed' ? Math.round(v * 10) / 10 : Math.floor(v), at: null });
    }
    this.game.saveNow();
  }

  onChange(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  _emit() { for (const fn of this.listeners) { try { fn(); } catch (e) { /* ui gone */ } } }

  get local() {
    const s = this.game.save;
    if (!s.lb) s.lb = {};
    for (const b of BOARDS) if (!Array.isArray(s.lb[b.id])) s.lb[b.id] = [];
    return s.lb;
  }

  get name() { return cleanName(this.game.save.settings.playerName); }

  get globalAvailable() { return this.status === 'ready' || this.status === 'readonly'; }

  /* ------------------------------------------------------------ connection */
  get uid() { return this.be?.uid || null; }

  async _init() {
    this._emit();
    // the public board first; on claude.ai, if the page can't reach it, the artifact's own database
    try {
      const fb = new FirebaseBackend();
      await fb.probe();
      this.be = fb;
      this.status = 'ready';
    } catch (e) {
      this.be = await this._artifactBackend();
    }
    if (!this.be) { this.status = 'error'; this._emit(); return; }
    this._emit();
    // runs set before the global board existed (or while offline) count too
    if (this.status === 'ready') this._syncFromLocal();
  }

  async _artifactBackend() {
    const C = typeof window !== 'undefined' ? window.claude : null;
    if (!C || typeof C.use !== 'function') return null;
    try {
      const [db, user] = await Promise.all([C.use('db'), C.use('user')]);
      if (!db) return null;
      const uid = user ? await user.id() : null;
      const can = user ? await user.can('data.write') : null;
      this.status = uid && can !== false ? 'ready' : 'readonly';
      return new ArtifactBackend(db, user, uid);
    } catch (e) {
      return null;
    }
  }

  async _loadMine() {
    if (this.mineLoaded) return;
    this.mine = await this.be.getMine();
    this.mineLoaded = true;
  }

  /* ------------------------------------------------------------ recording a run */
  /**
   * Record a finished run. run: { mode: 'endless' | 'timeattack', score, distance (m), topSpeed (mph),
   * nearMisses, car, env }. Returns { local: {board: rank}, global: Promise<{board: rank}> }.
   */
  record(run) {
    const entries = [];
    const base = { name: this.name, car: run.car, nm: run.nearMisses | 0, dist: Math.round(run.distance || 0), score: Math.floor(run.score || 0), env: run.env, at: Date.now() };
    if (run.mode === 'endless' && run.score > 0) entries.push(['endless', Math.floor(run.score)]);
    if (run.mode === 'timeattack' && run.distance > 0) entries.push(['timeattack', Math.round(run.distance)]);
    if (run.topSpeed > 20) entries.push(['speed', Math.round(run.topSpeed * 10) / 10]);
    const local = {};
    for (const [board, v] of entries) {
      const list = this.local[board];
      const e = { ...base, v };
      list.push(e);
      list.sort((a, b) => b.v - a.v || a.at - b.at);
      const rank = list.indexOf(e) + 1;
      list.length = Math.min(list.length, LOCAL_MAX);
      if (rank <= LOCAL_MAX) local[board] = rank;
    }
    this.game.saveNow();
    const global = this.status === 'ready' ? this._submit(entries.map(([board, v]) => [board, v, base])) : Promise.resolve({});
    return { local, global };
  }

  /** Write the player's personal bests that improved, then work out their global rank on each. */
  _submit(items) {
    const job = this._writing.then(async () => {
      if (this.status !== 'ready') return {};
      await this._loadMine();
      const doc = { ...(this.mine || {}) };
      let changed = false;
      const improved = [];
      for (const [board, v, d] of items) {
        const f = BOARD[board].field;
        if (!(v > (doc[f] || 0))) continue;
        doc[f] = v;
        doc[f + 'D'] = { car: d.car, nm: d.nm, dist: d.dist, score: d.score, env: d.env, at: d.at };
        changed = true;
        improved.push(board);
      }
      if (this.name && doc.tag !== this.name) { doc.tag = this.name; changed = true; }
      if (changed) {
        doc.at = Date.now();
        await this.be.setMine(doc);
        this.mine = doc;
        for (const b of improved) delete this.cache[b];
        this._emit();
      }
      // global position, reported only for the boards this run improved
      const ranks = {};
      for (const board of improved) ranks[board] = await this.globalRank(board, this.mine[BOARD[board].field]);
      return ranks;
    }).catch((e) => {
      // signed-in posting isn't possible here (no account / sign-in refused): keep showing the board
      if (e?.code === 'invalid_argument' || (this.be?.kind === 'firebase' && !this.uid && e?.code === 'http')) { this.status = 'readonly'; this._emit(); }
      return {};
    });
    this._writing = job;
    return job;
  }

  async _syncFromLocal() {
    // only players who have runs need an id; a stored one means they may have an entry to rename
    if (this.uid) { try { await this._loadMine(); } catch (e) { return; } }
    const items = [];
    for (const b of BOARDS) {
      const top = this.local[b.id][0];
      if (top && top.v > (this.mine?.[b.field] || 0)) items.push([b.id, top.v, top]);
    }
    if (items.length || (this.name && this.mine && this.mine.tag !== this.name)) await this._submit(items);
  }

  /** The driver name changed: carry it to the player's global entry (one write, only if they have one). */
  rename() {
    clearTimeout(this._renameT);
    this._renameT = setTimeout(() => {
      if (this.status === 'ready' && this.uid && this.mineLoaded && this.mine && this.mine.tag !== this.name) this._submit([]);
    }, 900);
  }

  /* ------------------------------------------------------------ reading */
  localRows(board) {
    return this.local[board].map((e, i) => ({ rank: i + 1, name: e.name || this.name || 'You', car: e.car, v: e.v, nm: e.nm, dist: e.dist, score: e.score, env: e.env, at: e.at, me: true }));
  }

  /** Global top rows for a board (cached for 15 s). Resolves [] when unavailable. */
  async globalRows(board, force = false) {
    if (!this.globalAvailable) return [];
    const c = this.cache[board];
    if (!force && c && Date.now() - c.t < 15000) return c.rows;
    const f = BOARD[board].field;
    const docs = (await this.be.top(f, GLOBAL_MAX)).filter((d) => {
      const v = d.data?.[f];
      return typeof v === 'number' && Number.isFinite(v) && v > 0 && v <= SANE[f];
    });
    const names = await this.be.names(docs.map((d) => d.id));
    const rows = docs.map((d, i) => {
      const x = d.data, det = (x[f + 'D'] && typeof x[f + 'D'] === 'object') ? x[f + 'D'] : {};
      const name = cleanName(x.tag) || names[d.id] || `DRIVER ${String(d.id).slice(0, 4).toUpperCase()}`;
      return { rank: i + 1, name, car: det.car, v: x[f], nm: det.nm, dist: det.dist, score: det.score, env: det.env, at: det.at || x.at, me: !!this.uid && d.id === this.uid };
    });
    this.cache[board] = { rows, t: Date.now() };
    return rows;
  }

  /** 1-based global position of a value on a board. */
  async globalRank(board, v) {
    const f = BOARD[board].field;
    return (await this.be.countAbove(f, v, SANE[f])) + 1;
  }

  carName(id) { return CAR_BY_ID[id]?.name || '—'; }
}
