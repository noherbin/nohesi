// Global leaderboard storage.
//
// Both backends keep one document per player in the collection 'lb', keyed by the player's id, holding their
// personal bests: { tag, endless, endlessD, ta, taD, spd, spdD, at } (the *D maps carry the run details).
//
// - FirebaseBackend: the public board everyone shares (GitHub Pages, the zip, claude.ai when it can reach it).
//   Firestore over its REST API plus Firebase anonymous sign-in, so players get a private id without an
//   account. The project's security rules let anyone read and let a player write only their own document, with
//   only fields and values the game can produce. The web API key below is a public client identifier, not a
//   secret: access is decided by those rules.
// - ArtifactBackend: the claude.ai artifact's own shared database, used only when Firebase can't be reached.

const FIREBASE = {
  apiKey: 'AIzaSyBANzfk6LZO-PB9KBR8F8wZXZ7wgiIYgmk',
  projectId: 'nohesi-leaderboard',
};
const FS = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents`;
const AUTH_STORE = 'nohesi.lb.auth.v1';
const COLL = 'lb';

export const timed = (p, ms = 10000) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej({ code: 'timeout' }), ms))]);

/* ------------------------------------------------------------ Firestore value encoding */
const enc = (v) => {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'object') return { mapValue: { fields: encFields(v) } };
  return { nullValue: null };
};
const encFields = (o) => {
  const f = {};
  for (const [k, v] of Object.entries(o)) if (v !== undefined) f[k] = enc(v);
  return f;
};
const dec = (x) => {
  if (!x || typeof x !== 'object') return null;
  if ('integerValue' in x) return Number(x.integerValue);
  if ('doubleValue' in x) return Number(x.doubleValue);
  if ('stringValue' in x) return x.stringValue;
  if ('booleanValue' in x) return x.booleanValue;
  if ('mapValue' in x) return decFields(x.mapValue.fields || {});
  return null;
};
const decFields = (f) => Object.fromEntries(Object.entries(f || {}).map(([k, v]) => [k, dec(v)]));

const readJSON = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const writeJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage off */ } };

async function call(url, opts = {}, ms = 10000) {
  const res = await timed(fetch(url, opts), ms);
  let body = null;
  try { body = await res.json(); } catch (e) { /* empty */ }
  if (!res.ok) throw { code: res.status === 404 ? 'not_found' : res.status === 403 ? 'denied' : 'http', status: res.status, body };
  return body;
}

export class FirebaseBackend {
  constructor() {
    this.kind = 'firebase';
    const a = readJSON(AUTH_STORE);
    this.auth = a && a.uid && a.refresh ? a : null;
    this.idToken = null;
    this.exp = 0;
  }

  /** Players are known by their anonymous id once they have posted from this browser. */
  get uid() { return this.auth?.uid || null; }

  async probe() { await this.top('endless', 1); }

  /** Anonymous sign-in on first post; afterwards the stored refresh token keeps the same id. */
  async ensureAuth() {
    if (this.idToken && Date.now() < this.exp - 60000) return this.idToken;
    const key = encodeURIComponent(FIREBASE.apiKey);
    if (this.auth) {
      try {
        const r = await call(`https://securetoken.googleapis.com/v1/token?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(this.auth.refresh)}`,
        });
        this.auth = { uid: r.user_id, refresh: r.refresh_token };
        writeJSON(AUTH_STORE, this.auth);
        this.idToken = r.id_token;
        this.exp = Date.now() + Number(r.expires_in || 3600) * 1000;
        return this.idToken;
      } catch (e) {
        if (e.code !== 'http' && e.status !== 400) throw e; // offline: try later; a revoked token: start over
      }
    }
    const r = await call(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    });
    this.auth = { uid: r.localId, refresh: r.refreshToken };
    writeJSON(AUTH_STORE, this.auth);
    this.idToken = r.idToken;
    this.exp = Date.now() + Number(r.expiresIn || 3600) * 1000;
    return this.idToken;
  }

  async getMine() {
    await this.ensureAuth();
    try {
      const d = await call(`${FS}/${COLL}/${encodeURIComponent(this.uid)}?key=${FIREBASE.apiKey}`);
      return decFields(d.fields);
    } catch (e) {
      if (e.code === 'not_found') return null;
      throw e;
    }
  }

  async setMine(doc) {
    const token = await this.ensureAuth();
    // PATCH without an update mask replaces the whole document
    await call(`${FS}/${COLL}/${encodeURIComponent(this.uid)}?key=${FIREBASE.apiKey}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fields: encFields(doc) }),
    });
  }

  async top(field, n) {
    const rows = await call(`${FS}:runQuery?key=${FIREBASE.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structuredQuery: { from: [{ collectionId: COLL }], orderBy: [{ field: { fieldPath: field }, direction: 'DESCENDING' }], limit: n } }),
    });
    return (rows || []).filter((r) => r.document).map((r) => ({ id: r.document.name.split('/').pop(), data: decFields(r.document.fields) }));
  }

  async countAbove(field, v) {
    const r = await call(`${FS}:runAggregationQuery?key=${FIREBASE.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredAggregationQuery: {
          structuredQuery: { from: [{ collectionId: COLL }], where: { fieldFilter: { field: { fieldPath: field }, op: 'GREATER_THAN', value: enc(v) } } },
          aggregations: [{ alias: 'n', count: {} }],
        },
      }),
    });
    return Number(dec(r?.[0]?.result?.aggregateFields?.n) || 0);
  }

  async names() { return {}; }
}

export class ArtifactBackend {
  constructor(db, user, uid) {
    this.kind = 'artifact';
    this.db = db;
    this.user = user;
    this.uid = uid;
  }

  async ensureAuth() { if (!this.uid) throw { code: 'invalid_argument' }; }

  async getMine() {
    const snap = await timed(this.db.collection(COLL).doc(this.uid).get());
    return snap.exists ? { ...snap.data() } : null;
  }

  async setMine(doc) { await timed(this.db.collection(COLL).doc(this.uid).set(doc)); }

  async top(field, n) {
    const snap = await timed(this.db.collection(COLL).orderBy(field, 'desc').limit(n).get());
    return snap.docs.map((d) => ({ id: d.id, data: d.data() || {} }));
  }

  async countAbove(field, v, max) {
    const snap = await timed(this.db.collection(COLL).where(field, '>', v).limit(1000).get());
    return snap.docs.filter((d) => !(d.data()?.[field] > max)).length;
  }

  /** Players without a driver name show under their claude.ai name, resolved per viewer and never stored. */
  async names(ids) {
    if (!this.user) return {};
    const ps = await this.user.profiles(ids);
    return Object.fromEntries(ids.map((id) => [id, ps?.[id]?.name || '']));
  }
}
