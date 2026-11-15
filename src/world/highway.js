// Endless highway: chunked road meshes, barriers, terrain and pooled roadside props.
import * as THREE from 'three';
import { DS } from './road.js';
import * as T from './textures.js';
import {
  PropPool, ObjectPool, streetlightGeometry, palmGeometry, treeGeometry, bushGeometry,
  cactusGeometry, rockGeometry, buildingGeometry, billboardGeometry, speedSignGeometry, merge,
} from './props.js';
import { mulberry32, hash3, fbm2, noise2, clamp, lerp, smoothstep } from '../core/utils.js';
import * as DT from './details.js';

export const CL = 64; // chunk length (m)
const ROWS = CL / DS;
const PYLON_SP = 280; // transmission tower spacing (m)

const JERSEY = [[-0.3, 0], [-0.29, 0.08], [-0.17, 0.33], [-0.08, 0.95], [0.08, 0.95], [0.17, 0.33], [0.29, 0.08], [0.3, 0]];

export class Highway {
  constructor(scene, road) {
    this.scene = scene;
    this.road = road;
    this.group = new THREE.Group();
    this.group.name = 'highway';
    scene.add(this.group);
    this.chunks = new Map();
    this.origin = { x: 0, y: 0 };
    this.viewDist = 900;
    this.behind = 140;
    this.propDensity = 1;
    this.night = 0;
    this.wet = 0;
    this.pools = {};
    this.env = null;
    this._tmp = {};
    this._tmp2 = {};
    // real spot lights hung under the nearest lamp heads, so cars and the road catch streetlight highlights;
    // kept for the life of the game (adding/removing lights recompiles every material)
    this.lampLights = [];
    for (let i = 0; i < 4; i++) {
      const L = new THREE.SpotLight(0xffffff, 0, 50, 1.2, 0.85, 1.3);
      L.castShadow = false;
      scene.add(L, L.target);
      this.lampLights.push(L);
    }
    this._lampPick = [];
  }

  /** How many overhead lamp lights to use (0 on low quality). Changing it recompiles materials, so only on quality change. */
  setLampLights(n) {
    this.lampLights.forEach((L, i) => (L.visible = i < n));
  }

  /** Hang the lamp lights under the lamp heads nearest the player (absolute X, Y). */
  updateLampLights(X, Y) {
    const lit = smoothstep(0.25, 0.75, this.night);
    const lights = this.lampLights.filter((L) => L.visible);
    if (!lights.length) return;
    const pick = this._lampPick;
    pick.length = 0;
    if (lit > 0 && this.env?.lights.spacing > 0) {
      for (const ch of this.chunks.values()) {
        for (const l of ch.lamps) {
          const d2 = (l[0] - X) ** 2 + (l[1] - Y) ** 2;
          if (d2 > 70 * 70) continue;
          pick.push([d2, l]);
        }
      }
      pick.sort((a, b) => a[0] - b[0]);
    }
    const ox = this.origin.x, oy = this.origin.y;
    for (let i = 0; i < lights.length; i++) {
      const L = lights[i];
      const p = pick[i];
      if (!p) { L.intensity = 0; continue; }
      const l = p[1];
      // fade with distance so a light swapping to a new lamp happens where it is already dark
      const d = Math.sqrt(p[0]);
      L.intensity = 75 * lit * (1 - smoothstep(30, 52, d)) * (1 + this.wet * 0.15);
      L.color.copy(this.lampColor);
      L.position.set(l[0] - ox, l[2] - 0.35, -(l[1] - oy));
      L.target.position.set(L.position.x, l[2] - 10, L.position.z);
      L.target.updateMatrixWorld();
    }
  }

  /* ---------------------------------------------------------------- setup */
  setEnvironment(env, layout, quality) {
    this.clear();
    this._disposeEnv();
    this.env = env;
    this.layout = layout;
    this.viewDist = quality.viewDist;
    this.propDensity = quality.propDensity;
    this.castPropShadows = quality.shadows;
    this._buildColumns();
    this._buildMaterials();
    this._buildPools();
    this.features = [];
    const rng = mulberry32(env.seed * 97 + 5);
    this._featRng = rng;
    this._nextGantry = 260 + rng() * 200;
    this._nextOverpass = 520 + rng() * 300;
  }

  _buildColumns() {
    const L = this.layout;
    const laneOffsets = [0, 0.55, 0.88, 1.3, 1.85, 2.4, 2.82, 3.15];
    const laneShades = [1.0, 1.0, 0.82, 0.99, 0.9, 0.99, 0.82, 1.0];
    const cols = [];
    const add = (d, sh) => cols.push([d, sh]);
    // opposite carriageway (negative d), outer -> inner
    add(-L.roadEdge, 1.06);
    const oppEnd = L.laneStart + L.oppLanes * L.LW;
    add(-oppEnd - 0.01, 1.06);
    for (let i = L.oppLanes - 1; i >= 0; i--) {
      const start = L.laneStart + i * L.LW;
      for (let k = laneOffsets.length - 1; k >= 0; k--) add(-(start + L.LW - laneOffsets[k]), laneShades[k]);
    }
    add(-L.laneStart + 0.01, 1.05);
    add(-L.medianHalf, 1.06);
    add(L.medianHalf, 1.06);
    add(L.laneStart - 0.01, 1.05);
    for (let i = 0; i < L.n; i++) {
      const start = L.laneStart + i * L.LW;
      for (let k = 0; k < laneOffsets.length; k++) add(start + laneOffsets[k], laneShades[k]);
    }
    add(L.lanesEnd + 0.01, 1.06);
    add(L.roadEdge, 1.06);
    // de-duplicate / sort
    cols.sort((a, b) => a[0] - b[0]);
    this.cols = cols.filter((c, i) => i === 0 || c[0] - cols[i - 1][0] > 0.005);
  }

  _buildMaterials() {
    const env = this.env;
    const rt = T.roadTextures(env.surface, env.seed);
    this.textures = [rt.map, rt.normalMap, rt.roughnessMap];
    const conc = T.concreteTexture(env.seed + 1);
    const block = T.blockWallTexture(env.seed + 2);
    const ground = T.groundTexture(env.seed + 3);
    this.textures.push(conc, block, ground);
    this.roadColor = new THREE.Color(env.roadColor);
    this.mat = {
      road: new THREE.MeshStandardMaterial({
        map: rt.map, normalMap: rt.normalMap, roughnessMap: rt.roughnessMap,
        color: this.roadColor.clone(), vertexColors: true, roughness: 1, metalness: 0,
        normalScale: new THREE.Vector2(0.6, 0.6),
      }),
      marking: new THREE.MeshStandardMaterial({
        vertexColors: true, roughness: 0.55, metalness: 0,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
        emissive: 0xffffff, emissiveIntensity: 0,
      }),
      concrete: new THREE.MeshStandardMaterial({ map: conc, color: 0xd9d6cf, roughness: 0.92 }),
      wall: new THREE.MeshStandardMaterial({ map: block, color: env.wallColor, roughness: 0.95 }),
      metal: new THREE.MeshStandardMaterial({ color: 0xaeb3b8, metalness: 0.75, roughness: 0.38, side: THREE.DoubleSide }),
      terrain: new THREE.MeshStandardMaterial({ map: ground, vertexColors: true, roughness: 1 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x8d9298, metalness: 0.6, roughness: 0.5 }),
      signBack: new THREE.MeshStandardMaterial({ color: 0x6e7378, metalness: 0.5, roughness: 0.6 }),
      rpm: new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
    };
    this.mat.marking.emissive.set(0x000000);
    // Gantry sign faces
    this.signMats = env.signs.map(([d, r, dir], i) =>
      new THREE.MeshStandardMaterial({ map: T.signTexture(d, r, dir, i + env.seed), roughness: 0.45, metalness: 0.0, emissive: 0xffffff, emissiveIntensity: 0 }));
    for (const m of this.signMats) { m.emissiveMap = m.map; }
    this.speedSignMat = new THREE.MeshStandardMaterial({ map: T.speedSignTexture(), roughness: 0.5 });
  }

  _buildPools() {
    const env = this.env, scene = this.group;
    const P = this.pools;
    const shadows = this.castPropShadows;
    const lampColor = new THREE.Color(env.lights.color);
    this.lampColor = lampColor;
    // Streetlights
    const sl = streetlightGeometry(env.lights.style);
    this.lampLocal = sl.lampPos;
    this.lampMat = new THREE.MeshBasicMaterial({ color: lampColor.clone().multiplyScalar(0.25), toneMapped: false });
    const lightParts = [
      { geometry: sl.metal, material: this.mat.steel, castShadow: shadows },
      { geometry: sl.lamp, material: this.lampMat },
    ];
    if (sl.base) lightParts.push({ geometry: sl.base, material: this.mat.concrete, castShadow: shadows, receiveShadow: true });
    P.light = new PropPool(scene, lightParts, 64);
    // Light pools on road surface
    this.poolTex = T.radialTexture(128, 0.0, 1.3);
    this.textures.push(this.poolTex);
    this.poolMat = new THREE.MeshBasicMaterial({
      map: this.poolTex, color: lampColor, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -8,
    });
    const poolGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    P.lightPool = new PropPool(scene, [{ geometry: poolGeo, material: this.poolMat }], 140);
    // Vegetation
    const palm = palmGeometry(env.seed);
    this.mat.palmTrunk = new THREE.MeshStandardMaterial({ color: 0x7a6650, roughness: 1 });
    this.mat.palmLeaf = new THREE.MeshStandardMaterial({ color: 0x4f6b2c, roughness: 0.9, side: THREE.DoubleSide });
    P.palm = new PropPool(scene, [
      { geometry: palm.trunk, material: this.mat.palmTrunk, castShadow: shadows },
      { geometry: palm.crown, material: this.mat.palmLeaf, castShadow: shadows },
    ], 320);
    const tree = treeGeometry(env.seed + 1);
    this.mat.trunk = new THREE.MeshStandardMaterial({ color: 0x5a4636, roughness: 1 });
    this.mat.leaves = new THREE.MeshStandardMaterial({ color: env.id === 'desert' ? 0x7c8450 : 0x3d5a2c, roughness: 0.95 });
    P.tree = new PropPool(scene, [
      { geometry: tree.trunk, material: this.mat.trunk, castShadow: shadows },
      { geometry: tree.leaves, material: this.mat.leaves, castShadow: shadows },
    ], 320, { colors: true });
    this.mat.bush = new THREE.MeshStandardMaterial({ color: env.id === 'desert' ? 0x8a8a5a : 0x4b6136, roughness: 1 });
    P.bush = new PropPool(scene, [{ geometry: bushGeometry(env.seed), material: this.mat.bush }], 420, { colors: true });
    this.mat.cactus = new THREE.MeshStandardMaterial({ color: 0x55703f, roughness: 0.85 });
    P.cactus = new PropPool(scene, [{ geometry: cactusGeometry(), material: this.mat.cactus, castShadow: shadows }], 260);
    this.mat.rock = new THREE.MeshStandardMaterial({ color: 0x9c7a5e, roughness: 1, flatShading: true });
    P.rock = new PropPool(scene, [{ geometry: rockGeometry(env.seed), material: this.mat.rock }], 260, { colors: true });
    // Buildings: prototypes per kind
    // [width, height, depth, floors drawn per texture tile, bays drawn per texture tile]
    const protos = {
      low: [26, 9, 18, 4, 5], warehouse: [44, 11, 30, 3, 6], mid: [22, 34, 22, 16, 8],
      tower: [28, 80, 28, 16, 8], tall: [32, 150, 32, 16, 8], glass: [30, 110, 26, 16, 8],
    };
    this.buildingPools = {};
    this.buildingVariants = {};
    let bseed = env.seed * 3;
    for (const kind of new Set(env.props.buildingKinds)) {
      const [w, h, d, fpt, bpt] = protos[kind];
      const ft = T.facadeTextures(kind, bseed++);
      this.textures.push(ft.map, ft.emissive, ft.rm);
      // glass reflects the sky, walls stay matte: roughness/metalness come from the facade's RM map
      const mat = new THREE.MeshStandardMaterial({
        map: ft.map, emissiveMap: ft.emissive, emissive: 0xffffff, emissiveIntensity: 0,
        roughnessMap: ft.rm, metalnessMap: ft.rm, roughness: 1, metalness: 1, envMapIntensity: 1.1,
      });
      // a few silhouettes per kind: setbacks, cornices, rooftop plant, masts
      const variants = [];
      for (let v = 0; v < 3; v++) {
        const bv = DT.buildingVariant(kind, w, h, d, fpt, bpt, bseed * 31 + v * 7);
        const pool = new PropPool(scene, [{ geometry: bv.geo, material: mat, receiveShadow: false }], 40, { colors: true });
        pool.dims = [w, h, d];
        pool.mat = mat;
        pool.lights = bv.lights;
        variants.push(pool);
      }
      this.buildingVariants[kind] = variants;
      this.buildingPools[kind] = variants[0];
    }
    // aircraft warning lights on tall buildings (blink at night)
    this.warnMat = new THREE.MeshBasicMaterial({ color: 0xff2a1a, toneMapped: false });
    P.warn = new PropPool(scene, [{ geometry: new THREE.SphereGeometry(0.45, 8, 6), material: this.warnMat }], 600);
    // grass tufts
    const dryGrass = env.id === 'desert' || env.id === 'la';
    this.grassTex = DT.grassTexture(dryGrass);
    this.textures.push(this.grassTex);
    this.mat.grass = new THREE.MeshStandardMaterial({ map: this.grassTex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 1 });
    P.grass = new PropPool(scene, [{ geometry: DT.grassGeometry(), material: this.mat.grass }], 2400, { colors: true });
    // roadside furniture
    this.reflMat = new THREE.MeshBasicMaterial({ color: 0xffb340, toneMapped: false });
    const dl = DT.delineatorGeometry();
    P.delineator = new PropPool(scene, [
      { geometry: dl.post, material: new THREE.MeshStandardMaterial({ color: 0xe8e8e4, roughness: 0.6 }) },
      { geometry: dl.refl, material: this.reflMat },
    ], 700);
    const cb = DT.callBoxGeometry();
    P.callBox = new PropPool(scene, [
      { geometry: cb.post, material: this.mat.steel },
      { geometry: cb.body, material: new THREE.MeshStandardMaterial({ color: 0xe8b820, roughness: 0.5 }), castShadow: shadows },
    ], 20);
    const mm = DT.mileMarkerGeometry();
    this.mileTex = DT.mileMarkerTexture();
    this.textures.push(this.mileTex);
    P.mile = new PropPool(scene, [
      { geometry: mm.post, material: this.mat.steel },
      { geometry: mm.plate, material: new THREE.MeshStandardMaterial({ map: this.mileTex, roughness: 0.5, side: THREE.DoubleSide }) },
    ], 20);
    // transmission line towers
    this.pylon = DT.pylonGeometry();
    P.pylon = new PropPool(scene, [{ geometry: this.pylon.geo, material: this.mat.steel, castShadow: shadows }], 40);
    this.wireMat = new THREE.LineBasicMaterial({ color: 0x2c2f33, transparent: true, opacity: 0.85 });
    // wall graffiti / ivy and road-surface marks
    this.wallArtTex = DT.wallArtTexture(env.seed);
    this.marksTex = DT.roadMarksTexture(env.seed + 1);
    this.textures.push(this.wallArtTex, this.marksTex);
    this.mat.wallArt = new THREE.MeshStandardMaterial({ map: this.wallArtTex, transparent: true, alphaTest: 0.08, depthWrite: false, roughness: 0.9, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    this.mat.marks = new THREE.MeshStandardMaterial({ map: this.marksTex, color: 0x000000, transparent: true, depthWrite: false, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    // glare screen blades on the median barrier (city highways)
    {
      const c = document.createElement('canvas');
      c.width = 16; c.height = 512;
      const x = c.getContext('2d');
      x.clearRect(0, 0, 16, 512);
      x.fillStyle = '#5d636a';
      for (let y = 0; y < 512; y += 32) x.fillRect(0, y, 16, 11);
      this.glareTex = new THREE.CanvasTexture(c);
      this.glareTex.wrapS = this.glareTex.wrapT = THREE.RepeatWrapping;
      this.textures.push(this.glareTex);
      this.mat.glare = new THREE.MeshStandardMaterial({ map: this.glareTex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.7, metalness: 0.3 });
    }
    // Billboards
    const bb = billboardGeometry();
    this.billboardPools = [];
    for (let i = 0; i < 3; i++) {
      const tex = T.billboardTexture(env.seed + i);
      this.textures.push(tex.map, tex.emissive);
      const panelMat = new THREE.MeshStandardMaterial({ map: tex.map, emissiveMap: tex.emissive, emissive: 0xffffff, emissiveIntensity: 0.4, roughness: 0.6 });
      this.billboardPools.push(new PropPool(scene, [
        { geometry: bb.frame, material: this.mat.steel, castShadow: shadows },
        { geometry: bb.panel, material: panelMat },
      ], 16));
      this.billboardPools[i].panelMat = panelMat;
    }
    const ss = speedSignGeometry();
    P.speedSign = new PropPool(scene, [
      { geometry: ss.post, material: this.mat.steel },
      { geometry: ss.plate, material: this.speedSignMat },
    ], 12);
    // Viaduct piers (elevated)
    P.pier = new PropPool(scene, [{ geometry: new THREE.BoxGeometry(2.2, 1, 1.6).translate(0, -0.5, 0), material: this.mat.concrete }], 120);
    // Large unique objects
    this.gantryPool = new ObjectPool(() => this._makeGantry());
    this.overpassPool = new ObjectPool(() => this._makeOverpass());
  }

  _makeGantry() {
    const L = this.layout;
    const g = new THREE.Group();
    const steel = this.mat.steel;
    const H = 7.6;
    const x0 = 0.6, x1 = L.roadEdge + 1.4;
    const span = x1 - x0;
    const parts = [];
    for (const x of [x0, x1]) parts.push(new THREE.BoxGeometry(0.45, H, 0.45).translate(x, H / 2, 0));
    parts.push(new THREE.BoxGeometry(span, 0.18, 0.18).translate((x0 + x1) / 2, H - 0.2, -0.45));
    parts.push(new THREE.BoxGeometry(span, 0.18, 0.18).translate((x0 + x1) / 2, H - 0.2, 0.45));
    parts.push(new THREE.BoxGeometry(span, 0.18, 0.18).translate((x0 + x1) / 2, H - 1.4, -0.45));
    parts.push(new THREE.BoxGeometry(span, 0.18, 0.18).translate((x0 + x1) / 2, H - 1.4, 0.45));
    for (let x = x0; x < x1; x += 1.2) {
      parts.push(new THREE.BoxGeometry(0.08, 1.3, 0.08).translate(x, H - 0.8, -0.45));
      parts.push(new THREE.BoxGeometry(0.08, 1.3, 0.08).translate(x, H - 0.8, 0.45));
    }
    const frame = new THREE.Mesh(merge(parts), steel);
    frame.castShadow = this.castPropShadows;
    g.add(frame);
    // three sign slots
    g.userData.signs = [];
    for (let i = 0; i < 3; i++) {
      const face = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 3.05), this.signMats[0]);
      const back = new THREE.Mesh(new THREE.BoxGeometry(5.3, 3.15, 0.12), this.mat.signBack);
      back.position.z = -0.1;
      const holder = new THREE.Group();
      holder.add(face, back);
      holder.position.set(0, H - 0.8, 0.75);
      face.castShadow = false;
      back.castShadow = this.castPropShadows;
      g.add(holder);
      g.userData.signs.push({ holder, face });
    }
    this.group.add(g);
    return g;
  }

  _makeOverpass() {
    const L = this.layout;
    const g = new THREE.Group();
    const conc = this.mat.concrete;
    const half = L.wallD + 140;
    const deckY = 7.4;
    const parts = [];
    parts.push(new THREE.BoxGeometry(half * 2, 1.6, 15).translate(0, deckY + 0.8, 0));
    // parapets
    parts.push(new THREE.BoxGeometry(half * 2, 1.1, 0.4).translate(0, deckY + 2.15, 7.3));
    parts.push(new THREE.BoxGeometry(half * 2, 1.1, 0.4).translate(0, deckY + 2.15, -7.3));
    // girder lip
    parts.push(new THREE.BoxGeometry(half * 2, 0.5, 13).translate(0, deckY - 0.2, 0));
    // piers: median + both outer sides, plus further columns
    const pierXs = [0, L.wallD + 3, -(L.wallD + 3), L.wallD + 40, -(L.wallD + 40)];
    for (const x of pierXs) {
      parts.push(new THREE.BoxGeometry(x === 0 ? 0.7 : 1.2, deckY + 12, 9).translate(x, (deckY - 12) / 2, 0));
      parts.push(new THREE.BoxGeometry(x === 0 ? 1.4 : 2.2, 0.8, 12).translate(x, deckY - 0.5, 0));
    }
    const mesh = new THREE.Mesh(merge(parts), conc);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
    this.group.add(g);
    return g;
  }

  /* --------------------------------------------------------------- terrain */
  /** Ground height relative to road elevation at outward distance dOut beyond the barrier. */
  groundOffset(s, dOut, side) {
    const env = this.env;
    if (env.elevated) return -env.elevated - 0.2 + (dOut > 30 ? noise2(s * 0.004, dOut * 0.004 + side * 50, 7) * 0.4 : 0);
    const t = env.terrain;
    const near = -0.25 - 0.55 * smoothstep(0, 10, dOut);
    const hill = t.hill * smoothstep(t.flat, t.flat + 260, dOut) * (0.6 + 0.6 * fbm2(s * 0.0035, dOut * 0.004 + side * 31, 3, 3));
    const roll = 1.4 * smoothstep(6, 60, dOut) * noise2(s * 0.012, dOut * 0.02 + side * 9, 11);
    return near + hill + roll;
  }

  /* ---------------------------------------------------------------- chunks */
  _ensureFeatures(sMax) {
    const env = this.env, rng = this._featRng;
    while (this._nextGantry < sMax || this._nextOverpass < sMax) {
      if (this._nextGantry <= this._nextOverpass) {
        this.features.push({ s: this._nextGantry, type: 'gantry', seed: Math.floor(rng() * 1e9) });
        this._nextGantry += lerp(env.gantry[0], env.gantry[1], rng());
      } else {
        // keep overpasses clear of gantries
        if (Math.abs(this._nextOverpass - this._nextGantry) < 160) this._nextOverpass = this._nextGantry + 200;
        this.features.push({ s: this._nextOverpass, type: 'overpass', seed: Math.floor(rng() * 1e9) });
        this._nextOverpass += lerp(env.overpass[0], env.overpass[1], rng());
      }
    }
    this.features.sort((a, b) => a.s - b.s);
    // drop old ones
    while (this.features.length && this.features[0].s < this._sMinKeep - 500) this.features.shift();
  }

  update(sPlayer, force = false) {
    if (!this.env) return;
    const kMin = Math.floor((sPlayer - this.behind) / CL);
    const kMax = Math.floor((sPlayer + this.viewDist) / CL);
    this._sMinKeep = kMin * CL;
    this.road.ensure((kMax + 2) * CL + 380); // power lines reach to the next pylon
    this._ensureFeatures((kMax + 2) * CL + 340); // the power line looks one tower ahead
    for (const [k, ch] of this.chunks) {
      if (k < kMin || k > kMax + 1) {
        this._freeChunk(ch);
        this.chunks.delete(k);
      }
    }
    let budget = force ? 999 : 2;
    for (let k = kMin; k <= kMax && budget > 0; k++) {
      if (!this.chunks.has(k)) {
        this.chunks.set(k, this._buildChunk(k));
        budget--;
      }
    }
    this.road.trim(sPlayer - 400);
    for (const p of this._allPools()) p.flush();
  }

  _allPools() {
    const list = Object.values(this.pools);
    for (const vs of Object.values(this.buildingVariants || {})) for (const p of vs) list.push(p);
    for (const p of this.billboardPools || []) list.push(p);
    return list;
  }

  rebase(origin) {
    this.origin.x = origin.x;
    this.origin.y = origin.y;
    for (const ch of this.chunks.values()) this._placeObj(ch.group, ch.anchor);
    for (const ch of this.chunks.values()) for (const f of ch.objs) this._placeObj(f.obj, f.anchor, f.yaw);
    for (const p of this._allPools()) {
      p.rebase(origin);
      p.flush();
    }
  }

  _placeObj(obj, a, yaw) {
    obj.position.set(a.X - this.origin.x, a.E, -(a.Y - this.origin.y));
    if (yaw !== undefined) obj.rotation.set(0, -yaw, 0);
  }

  clear() {
    for (const ch of this.chunks.values()) this._freeChunk(ch);
    this.chunks.clear();
  }

  _freeChunk(ch) {
    this.group.remove(ch.group);
    for (const m of ch.meshes) m.geometry.dispose();
    for (const [pool, idx] of ch.props) pool.remove(idx);
    for (const f of ch.objs) (f.type === 'gantry' ? this.gantryPool : this.overpassPool).release(f.obj);
  }

  _buildChunk(k) {
    const road = this.road, L = this.layout, env = this.env;
    const s0 = k * CL;
    const anchor = { ...road.sample(s0) };
    const rows = [];
    for (let r = 0; r <= ROWS; r++) rows.push({ ...road.sample(s0 + r * DS), s: s0 + r * DS });
    const ch = { k, anchor, group: new THREE.Group(), meshes: [], props: [], objs: [], lamps: [] };
    const toLocal = (row, d, h, out, o) => {
      const c = Math.cos(row.H), sn = Math.sin(row.H);
      out[o] = row.X + c * d - anchor.X;
      out[o + 1] = row.E + h - anchor.E;
      out[o + 2] = -(row.Y - sn * d - anchor.Y);
    };
    const vBase = Math.floor(s0 / 8) * 8;

    // --- road surface
    {
      const cols = this.cols, nc = cols.length;
      const pos = new Float32Array((ROWS + 1) * nc * 3);
      const uv = new Float32Array((ROWS + 1) * nc * 2);
      const col = new Float32Array((ROWS + 1) * nc * 3);
      const idx = [];
      for (let r = 0; r <= ROWS; r++) {
        const row = rows[r];
        // subtle along-road wear variation
        const wear = 1 + 0.035 * noise2(row.s * 0.02, 0, 77);
        for (let c = 0; c < nc; c++) {
          const i = r * nc + c;
          toLocal(row, cols[c][0], 0, pos, i * 3);
          uv[i * 2] = cols[c][0] / 8;
          uv[i * 2 + 1] = (row.s - vBase) / 8;
          const sh = cols[c][1] * wear;
          col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = sh;
          if (r < ROWS && c < nc - 1) {
            const a = i, b = i + 1, d = i + nc, e = i + nc + 1;
            idx.push(a, b, d, b, e, d);
          }
        }
      }
      ch.meshes.push(this._mesh(pos, uv, col, idx, this.mat.road, { receive: true }));
    }

    // --- markings
    {
      const verts = [], cols = [], idx = [];
      const W = [0.95, 0.95, 0.92], Y = [0.95, 0.72, 0.12];
      const A = {}, B = {}, tmp = [0, 0, 0];
      const quad = (sa, sb, d, w, colr) => {
        road.sample(sa, A);
        road.sample(sb, B);
        const base = verts.length / 3;
        for (const [row, dd] of [[A, d - w / 2], [A, d + w / 2], [B, d - w / 2], [B, d + w / 2]]) {
          toLocal(row, dd, 0.012, tmp, 0);
          verts.push(tmp[0], tmp[1], tmp[2]);
          cols.push(colr[0], colr[1], colr[2]);
        }
        idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      };
      const oppEnd = L.laneStart + L.oppLanes * L.LW;
      const solid = [[L.laneStart + 0.12, Y], [L.lanesEnd - 0.12, W], [-L.laneStart - 0.12, Y], [-oppEnd + 0.12, W]];
      for (const [d, c] of solid) {
        for (let r = 0; r < ROWS; r++) quad(rows[r].s, rows[r + 1].s, d, 0.15, c);
      }
      const dashD = [];
      for (let i = 1; i < L.n; i++) dashD.push(L.laneStart + i * L.LW);
      for (let i = 1; i < L.oppLanes; i++) dashD.push(-(L.laneStart + i * L.LW));
      const j0 = Math.ceil((s0 - 3) / 12), j1 = Math.floor((s0 + CL) / 12);
      for (let j = j0; j <= j1; j++) {
        const a = Math.max(s0, j * 12), b = Math.min(s0 + CL, j * 12 + 3);
        if (b - a < 0.05) continue;
        for (const d of dashD) quad(a, b, d, 0.13, W);
      }
      ch.meshes.push(this._mesh(new Float32Array(verts), null, new Float32Array(cols), idx, this.mat.marking, { receive: true }));
      // surface wear: skid marks, sealed cracks, patch repairs and oil drips
      {
        const rr = mulberry32(env.seed * 7919 + k * 104729);
        const mv = [], mu = [], mi = [];
        const P0 = [0, 0, 0];
        const Q = {};
        const decal = (sa, sb, d, w, cell) => {
          const n = Math.max(1, Math.round((sb - sa) / 2));
          const base = mv.length / 3;
          for (let i = 0; i <= n; i++) {
            const sv = lerp(sa, sb, i / n);
            road.sample(sv, Q);
            for (const [dd, u] of [[d - w / 2, 0], [d + w / 2, 1]]) {
              toLocal(Q, dd, 0.007, P0, 0);
              mv.push(P0[0], P0[1], P0[2]);
              mu.push((cell + u) / 4, i / n);
            }
            if (i < n) { const a = base + i * 2; mi.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
          }
        };
        const laneD = () => {
          const opp = rr() < 0.4;
          const lane = Math.floor(rr() * (opp ? L.oppLanes : L.n));
          return (opp ? -1 : 1) * L.laneCenter(lane);
        };
        const nMarks = Math.floor(rr() * 3.2);
        for (let m = 0; m < nMarks; m++) {
          const kind = Math.floor(rr() * 4);
          const sa = s0 + rr() * CL * 0.7;
          const d = laneD() + (rr() - 0.5) * 0.8;
          if (kind === 0) decal(sa, Math.min(s0 + CL, sa + 12 + rr() * 18), d, 1.9, 0);
          else if (kind === 1) decal(sa, Math.min(s0 + CL, sa + 4 + rr() * 8), d + (rr() - 0.5) * 1.5, 0.9, 1);
          else if (kind === 2) decal(sa, Math.min(s0 + CL, sa + 2.5 + rr() * 3), d, 2.2 + rr(), 2);
          else decal(sa, Math.min(s0 + CL, sa + 2 + rr() * 2), d + (rr() - 0.5) * 0.3, 1.2, 3);
        }
        if (mi.length) {
          const m = this._mesh(new Float32Array(mv), new Float32Array(mu), null, mi, this.mat.marks, { receive: true });
          m.renderOrder = 1;
          ch.meshes.push(m);
        }
      }
      // raised pavement markers ("Botts' dots" / cat's eyes): small retroreflective bumps that catch light at night
      const rv = [], rc = [], ri = [];
      const P0 = [0, 0, 0], P1 = [0, 0, 0];
      const marker = (sm, d, colr, dir) => {
        road.sample(sm - 0.05, A);
        road.sample(sm + 0.05, B);
        const base = rv.length / 3;
        // top face
        for (const [row, dd, h] of [[A, d - 0.05, 0.026], [A, d + 0.05, 0.026], [B, d - 0.05, 0.026], [B, d + 0.05, 0.026]]) {
          toLocal(row, dd, h, P0, 0);
          rv.push(P0[0], P0[1], P0[2]);
          rc.push(colr[0] * 0.55, colr[1] * 0.55, colr[2] * 0.55);
        }
        ri.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
        // reflective face toward approaching traffic
        const row = dir > 0 ? A : B;
        const b2 = rv.length / 3;
        for (const [dd, h] of [[d - 0.05, 0.008], [d + 0.05, 0.008], [d - 0.05, 0.026], [d + 0.05, 0.026]]) {
          toLocal(row, dd, h, P1, 0);
          rv.push(P1[0], P1[1], P1[2]);
          rc.push(colr[0], colr[1], colr[2]);
        }
        if (dir > 0) ri.push(b2, b2 + 2, b2 + 1, b2 + 1, b2 + 2, b2 + 3);
        else ri.push(b2, b2 + 1, b2 + 2, b2 + 1, b2 + 3, b2 + 2);
      };
      const WHITE = [1, 1, 1], AMBER = [1, 0.72, 0.16];
      const k0 = Math.ceil((s0 - 7.5) / 12), k1 = Math.floor((s0 + CL - 7.5) / 12);
      for (let k = k0; k <= k1; k++) {
        const sm = k * 12 + 7.5;
        if (sm < s0 || sm >= s0 + CL) continue;
        for (const d of dashD) marker(sm, d, WHITE, d > 0 ? 1 : -1);
        if (k % 2 === 0) {
          marker(sm, L.laneStart + 0.12, AMBER, 1);
          marker(sm, -L.laneStart - 0.12, AMBER, -1);
        }
      }
      if (ri.length) {
        const m = this._mesh(new Float32Array(rv), null, new Float32Array(rc), ri, this.mat.rpm, {});
        ch.meshes.push(m);
      }
    }

    // --- barriers
    const profileMesh = (profile, dCenter, flip, mat, uScale = 1, vScale = 0.5) => {
      const np = profile.length;
      const pos = new Float32Array((ROWS + 1) * np * 3);
      const uv = new Float32Array((ROWS + 1) * np * 2);
      const idx = [];
      // profile perimeter length for u
      const ulen = [0];
      for (let p = 1; p < np; p++) ulen.push(ulen[p - 1] + Math.hypot(profile[p][0] - profile[p - 1][0], profile[p][1] - profile[p - 1][1]));
      for (let r = 0; r <= ROWS; r++) {
        for (let p = 0; p < np; p++) {
          const i = r * np + p;
          const [dd, h] = profile[p];
          toLocal(rows[r], dCenter + (flip ? -dd : dd), h, pos, i * 3);
          uv[i * 2] = ulen[p] * uScale;
          uv[i * 2 + 1] = (rows[r].s - vBase) * vScale / 4;
          if (r < ROWS && p < np - 1) {
            const a = i, b = i + 1, c = i + np, d = i + np + 1;
            if (flip) idx.push(a, c, b, b, c, d);
            else idx.push(a, b, c, b, d, c);
          }
        }
      }
      ch.meshes.push(this._mesh(pos, uv, null, idx, mat, { cast: true, receive: true }));
    };
    profileMesh(JERSEY, 0, false, this.mat.concrete);
    if (env.id === 'night' || env.id === 'urban') profileMesh([[0, 0.95], [0, 1.55]], 0, false, this.mat.glare, 1 / 0.6, 0.5);
    // graffiti tags and ivy on the sound walls
    if (env.outer === 'wall') {
      const rr = mulberry32(env.seed * 31 + k * 977);
      const av = [], au = [], ai = [];
      const P0 = [0, 0, 0], Q = {};
      const H = env.wallHeight;
      const n = rr() < 0.75 ? 1 + Math.floor(rr() * 2) : 0;
      for (let m = 0; m < n; m++) {
        const side = rr() < 0.5 ? 1 : -1;
        const ivy = rr() < 0.35;
        const cell = ivy ? 6 + Math.floor(rr() * 2) : Math.floor(rr() * 6);
        const len = ivy ? 4 + rr() * 6 : 3 + rr() * 3;
        const sa = s0 + rr() * (CL - len);
        const y0 = ivy ? 0.9 : 1.0 + rr() * 0.3, y1 = Math.min(H - 0.15, y0 + (ivy ? 1.6 + rr() * 0.8 : len * 0.42));
        const d = side * (L.wallD - 0.1 - 0.012);
        const cu = cell % 4, cv = Math.floor(cell / 4);
        const segs = Math.max(1, Math.round(len / 2));
        const base = av.length / 3;
        for (let i = 0; i <= segs; i++) {
          const sv = sa + (i / segs) * len;
          road.sample(sv, Q);
          // text reads left-to-right when facing the wall from the road
          const u = side > 0 ? 1 - i / segs : i / segs;
          for (const [yy, v] of [[y0, 0], [y1, 1]]) {
            toLocal(Q, d, yy, P0, 0);
            av.push(P0[0], P0[1], P0[2]);
            au.push((cu + u) / 4, 1 - (cv + 1 - v) / 2);
          }
          if (i < segs) { const a = base + i * 2; ai.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
        }
      }
      if (ai.length) ch.meshes.push(this._mesh(new Float32Array(av), new Float32Array(au), null, ai, this.mat.wallArt, { receive: true }));
    }
    const outerProfile = () => {
      if (env.outer === 'wall') {
        const H = env.wallHeight;
        return [[-0.3, 0], [-0.29, 0.08], [-0.17, 0.33], [-0.1, 0.9], [-0.1, H], [0.12, H + 0.05], [0.25, H], [0.25, -1]];
      }
      if (env.outer === 'parapet') {
        return [[-0.3, 0], [-0.29, 0.08], [-0.17, 0.33], [-0.1, 1.1], [0.22, 1.12], [0.25, -1.9], [-3.5, -1.9]];
      }
      return null;
    };
    const op = outerProfile();
    if (op) {
      profileMesh(op, L.wallD, false, env.outer === 'wall' ? this.mat.wall : this.mat.concrete);
      profileMesh(op, -L.wallD, true, env.outer === 'wall' ? this.mat.wall : this.mat.concrete);
    } else {
      // guardrail: W-beam ribbon + posts
      const beam = [[0, 0.52], [-0.07, 0.6], [0, 0.68], [-0.07, 0.76], [0, 0.84]];
      profileMesh(beam, L.wallD - 0.1, false, this.mat.metal, 1, 0.5);
      profileMesh(beam, -L.wallD + 0.1, true, this.mat.metal, 1, 0.5);
      const posts = [];
      for (let r = 0; r < ROWS; r += 1) {
        for (const side of [1, -1]) {
          const row = rows[r];
          const v = [0, 0, 0];
          toLocal(row, side * (L.wallD + 0.05), 0, v, 0);
          posts.push(new THREE.BoxGeometry(0.12, 0.84, 0.12).translate(v[0], v[1] + 0.42, v[2]));
        }
      }
      const pm = new THREE.Mesh(merge(posts), this.mat.steel);
      ch.meshes.push(pm);
    }

    // --- terrain both sides
    {
      const outs = [0, 2.5, 7, 16, 32, 60, 105, 170, 260, 400];
      for (const side of [1, -1]) {
        const nc = outs.length;
        const pos = new Float32Array((ROWS + 1) * nc * 3);
        const uv = new Float32Array((ROWS + 1) * nc * 2);
        const col = new Float32Array((ROWS + 1) * nc * 3);
        const idx = [];
        const cNear = new THREE.Color(env.terrain.near), cFar = new THREE.Color(env.terrain.far), cc = new THREE.Color();
        const dStart = L.wallD + (env.outer === 'parapet' ? 0.25 : 0.35);
        for (let r = 0; r <= ROWS; r++) {
          for (let c = 0; c < nc; c++) {
            const i = r * nc + c;
            const dOut = outs[c] + (c === 0 ? 0 : 0);
            const h = c === 0 && !env.elevated ? -0.05 : this.groundOffset(rows[r].s, dOut, side);
            toLocal(rows[r], side * (dStart + dOut), h, pos, i * 3);
            uv[i * 2] = (side * (dStart + dOut)) / 10;
            uv[i * 2 + 1] = (rows[r].s - vBase) / 10;
            const n = noise2(rows[r].s * 0.02, dOut * 0.03 + side * 13, 5);
            cc.copy(cNear).lerp(cFar, smoothstep(10, 300, dOut));
            cc.multiplyScalar(0.88 + 0.22 * n);
            col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
            if (r < ROWS && c < nc - 1) {
              const a = i, b = i + 1, d = i + nc, e = i + nc + 1;
              if (side > 0) idx.push(a, b, d, b, e, d);
              else idx.push(a, d, b, b, d, e);
            }
          }
        }
        ch.meshes.push(this._mesh(pos, uv, col, idx, this.mat.terrain, { receive: true }));
      }
    }

    for (const m of ch.meshes) ch.group.add(m);
    this._placeObj(ch.group, anchor);
    this.group.add(ch.group);

    this._placeProps(ch, s0);
    return ch;
  }

  _mesh(pos, uv, col, idx, mat, { cast = false, receive = false } = {}) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    if (uv) g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    if (col) g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, mat);
    m.castShadow = cast;
    m.receiveShadow = receive;
    return m;
  }

  _addProp(ch, pool, s, d, h, yawOff, sx, sy, sz, color, pitch) {
    const p = this.road.pos(s, d, this._tmp2);
    const idx = pool.add(p.X, p.Y, p.E + h, p.H + yawOff, sx, sy, sz, this.origin, color, pitch);
    if (idx >= 0) ch.props.push([pool, idx]);
    return p;
  }

  /* ------------------------------------------------------- occupancy (no overlapping scenery) */
  /** Oriented footprint in road-plane coordinates. */
  _foot(X, Y, yaw, hx, hz) {
    return { X, Y, cx: Math.cos(yaw), sx: -Math.sin(yaw), hx, hz };
  }

  /** Separating-axis overlap test for two footprints (with margin). */
  _footHit(a, b, m = 0) {
    const axes = [[a.cx, a.sx], [-a.sx, a.cx], [b.cx, b.sx], [-b.sx, b.cx]];
    const dX = b.X - a.X, dY = b.Y - a.Y;
    for (const [ux, uy] of axes) {
      const ra = a.hx * Math.abs(a.cx * ux + a.sx * uy) + a.hz * Math.abs(-a.sx * ux + a.cx * uy);
      const rb = b.hx * Math.abs(b.cx * ux + b.sx * uy) + b.hz * Math.abs(-b.sx * ux + b.cx * uy);
      if (Math.abs(dX * ux + dY * uy) > ra + rb + m) return false;
    }
    return true;
  }

  /** True if footprint f is clear of overpasses, gantries, streetlights, other big props and the road itself. */
  _clear(ch, f, s, near, m = 0.5, trunk = null) {
    const L = this.layout;
    const reach = Math.max(f.hx, f.hz) + m;
    // never encroach on the carriageway, including other parts of a curving road
    const rr = L.wallD + 1 + (trunk ?? reach);
    for (let ds = -480; ds <= 480; ds += 24) {
      const q = this.road.sample(s + ds, this._tmpS || (this._tmpS = {}));
      if (Math.hypot(q.X - f.X, q.Y - f.Y) < rr) return false;
    }
    for (const ft of this.features) {
      if (Math.abs(ft.s - s) > 420) continue;
      const a = this._featAnchor(ft);
      if (ft.type === 'overpass') {
        if (this._footHit(this._foot(a.X, a.Y, a.yaw, L.wallD + 140, 9.5), f, m)) return false;
      } else if (Math.abs(ft.s - s) < 8 + reach && near < L.wallD + 6) return false;
    }
    const sp = this.env.lights.spacing;
    if (sp > 0 && this.env.lights.style !== 'double' && near < L.wallD + 7) {
      const k = Math.round(s / sp) * sp;
      if (Math.abs(s - k) < 3 + reach) return false;
    }
    for (const c of this.chunks.values()) if (c.foot && c !== ch) for (const o of c.foot) if (this._footHit(o, f, m)) return false;
    if (ch.foot) for (const o of ch.foot) if (this._footHit(o, f, m)) return false;
    return true;
  }

  _featAnchor(ft) {
    if (!ft.anchor) {
      const a = { ...this.road.sample(ft.s) };
      let yaw = a.H;
      if (ft.type === 'overpass') yaw += (hash3(ft.seed) - 0.5) * 0.35;
      ft.anchor = { X: a.X, Y: a.Y, yaw };
    }
    return ft.anchor;
  }

  _placeProps(ch, s0) {
    const env = this.env, L = this.layout, P = this.pools;
    const rng = mulberry32(env.seed * 100003 + ch.k * 7919);
    const dens = this.propDensity;
    const color = new THREE.Color();
    const s1 = s0 + CL;
    // Streetlights
    const sp = env.lights.spacing;
    if (sp > 0) {
      for (let s = Math.ceil(s0 / sp) * sp; s < s1; s += sp) {
        const style = env.lights.style;
        const d = style === 'double' ? 0 : L.wallD + 1.4;
        // no poles through overpass decks or gantry legs
        let blocked = false;
        for (const f of this.features) {
          const ds = Math.abs(f.s - s);
          if ((f.type === 'overpass' && ds < 12 + Math.abs(d) * 0.2) || (f.type === 'gantry' && ds < 3)) { blocked = true; break; }
        }
        if (blocked) continue;
        const p = this._addProp(ch, P.light, s, d, 0, 0, 1, 1, 1);
        const c = Math.cos(p.H), sn = Math.sin(p.H);
        for (const lp of this.lampLocal) {
          const lx = d + lp[0];
          const X = p.X + c * lp[0], Y = p.Y - sn * lp[0];
          ch.lamps.push([X, Y, p.E + lp[1]]);
          this._addProp(ch, P.lightPool, s, lx, 0.03, 0, 15, 1, 19);
        }
      }
    }
    // Overhead features
    for (const f of this.features) {
      if (f.s < s0 || f.s >= s1) continue;
      const pool = f.type === 'gantry' ? this.gantryPool : this.overpassPool;
      const obj = pool.get();
      obj.visible = true;
      const a = { ...this.road.sample(f.s) };
      let yaw = a.H;
      if (f.type === 'overpass') yaw += (hash3(f.seed) - 0.5) * 0.35;
      if (f.type === 'gantry') {
        const r = mulberry32(f.seed);
        const L2 = this.layout;
        const n = r() < 0.5 ? 2 : 3;
        const signs = obj.userData.signs;
        for (let i = 0; i < 3; i++) {
          const sgn = signs[i];
          sgn.holder.visible = i < n;
          if (i >= n) continue;
          const laneIdx = n === 2 ? (i === 0 ? 1 : L2.n - 2) : Math.round((i / 2) * (L2.n - 1));
          sgn.holder.position.x = L2.laneCenter(laneIdx);
          sgn.face.material = this.signMats[Math.floor(r() * this.signMats.length)];
        }
      }
      this._placeObj(obj, a, yaw);
      ch.objs.push({ obj, anchor: a, yaw, type: f.type });
    }
    // Speed limit signs (only where the outer barrier is low)
    if (env.outer !== 'wall' && rng() < 0.12) {
      this._addProp(ch, P.speedSign, s0 + rng() * CL, L.wallD + 1.2, env.elevated ? 0 : 0, 0, 1, 1, 1);
    }
    // Viaduct piers
    if (env.elevated) {
      for (let s = Math.ceil(s0 / 32) * 32; s < s1; s += 32) {
        for (const d of [0, L.roadEdge - 4, -(L.roadEdge - 4)]) {
          this._addProp(ch, P.pier, s, d, -1.9, 0, 1, env.elevated - 1.6, 1);
        }
      }
    }
    ch.foot = [];
    const dStart = L.wallD + 1.2;
    const pr = env.props;
    // high-voltage line running parallel to the road (placed before buildings so they keep clear of it)
    const pyl = env.id === 'desert' || env.id === 'la' ? (env.id === 'desert' ? L.wallD + 60 : L.wallD + 1.2 + 77) : 0;
    if (pyl) {
      const dP = pyl, dO = dP - L.wallD - 1.2;
      const pc = this.road.pos(s0 + CL / 2, dP, {});
      const corridor = this._foot(pc.X, pc.Y, pc.H, 8, CL / 2 + 1);
      corridor.soft = true; // big things stay out; shrubs and rocks may sit under the wires
      ch.foot.push(corridor);
      const an = ch.anchor;
      const pts = [];
      for (let n = Math.floor(s0 / PYLON_SP) - 1; ; n++) {
        const sp = this._pylonS(n);
        if (sp >= s1) break;
        if (sp < s0) continue;
        const a = this.road.pos(sp, dP, {});
        const eA = a.E + this.groundOffset(sp, dO, 1);
        const idx = P.pylon.add(a.X, a.Y, eA, a.H, 1, 1, 1, this.origin, null);
        if (idx >= 0) ch.props.push([P.pylon, idx]);
        const sq = this._pylonS(n + 1);
        const b = this.road.pos(sq, dP, {});
        const eB = b.E + this.groundOffset(sq, dO, 1);
        const span = Math.hypot(b.X - a.X, b.Y - a.Y);
        const sag = 6.5 * Math.min(1.4, span / 280);
        // the wires run in a straight chord, which drifts off the road-parallel corridor on curves
        const chord = this._foot((a.X + b.X) / 2, (a.Y + b.Y) / 2, Math.atan2(b.X - a.X, b.Y - a.Y), 8, span / 2 + 2);
        chord.soft = true;
        ch.foot.push(chord);
        for (const [ax, ay] of this.pylon.attach) {
          const P0 = [a.X + Math.cos(a.H) * ax, a.Y - Math.sin(a.H) * ax, eA + ay];
          const P1 = [b.X + Math.cos(b.H) * ax, b.Y - Math.sin(b.H) * ax, eB + ay];
          const nseg = 16;
          for (let q = 0; q < nseg; q++) {
            for (const f of [q / nseg, (q + 1) / nseg]) {
              const X = lerp(P0[0], P1[0], f), Y = lerp(P0[1], P1[1], f), E = lerp(P0[2], P1[2], f) - sag * 4 * f * (1 - f);
              pts.push(X - an.X, E - an.E, -(Y - an.Y));
            }
          }
        }
      }
      if (pts.length) {
        const lg = new THREE.BufferGeometry();
        lg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const lines = new THREE.LineSegments(lg, this.wireMat);
        lines.frustumCulled = false;
        ch.meshes.push(lines);
        ch.group.add(lines);
      }
    }
    // Buildings first (largest footprints), then billboards, then vegetation fills the gaps
    if (pr.buildings > 0) {
      const kinds = pr.buildingKinds;
      const bands = env.elevated ? [[18, 50], [65, 120], [140, 230], [250, 360]] : [[30, 70], [85, 150], [170, 260], [280, 380]];
      for (const side of [1, -1]) {
        for (let b = 0; b < bands.length; b++) {
          if (rng() > pr.buildings * (b === 0 && !env.elevated ? 0.55 : 0.9) * Math.min(1, dens + 0.2)) continue;
          let kind = kinds[Math.floor(rng() * kinds.length)];
          if (b === 0 && (kind === 'tall' || kind === 'tower') && env.id === 'la') kind = 'mid';
          const vars = this.buildingVariants[kind];
          if (!vars) continue;
          const pool = vars[Math.floor(rng() * vars.length)];
          const [w, , dd] = pool.dims;
          const sc = 0.8 + rng() * 0.45;
          const hs = sc * (0.7 + rng() * 0.7);
          const yawOff = (rng() - 0.5) * 0.15;
          const tint = 0.75 + rng() * 0.35;
          const band = bands[b];
          // local x of the building is lateral (w), local z runs along the road (dd)
          const latHalf = (w * sc) / 2 + 2, alongHalf = (dd * sc) / 2 + 2;
          const lo = band[0] + latHalf, hi = Math.max(lo, band[1] - latHalf);
          for (let attempt = 0; attempt < 3; attempt++) {
            const dOut = lerp(lo, hi, rng());
            const s = s0 + CL * 0.5 + (rng() - 0.5) * Math.max(0, CL - alongHalf);
            const dist = dStart + dOut;
            const p = this.road.pos(s, side * dist, this._tmp2);
            const f = this._foot(p.X, p.Y, p.H + yawOff, latHalf - 2, alongHalf - 2);
            if (!this._clear(ch, f, s, dist - latHalf, 2.5)) continue;
            const h = env.elevated ? this.groundOffset(s, dOut, side) : this.groundOffset(s, dOut, side) - 0.5;
            color.setRGB(tint, tint * (0.97 + rng() * 0.06), tint * (0.95 + rng() * 0.1));
            const bp = this._addProp(ch, pool, s, side * dist, h, yawOff, sc, hs, sc, color);
            ch.foot.push(f);
            if (pool.lights.length) {
              const yaw = bp.H + yawOff, cy = Math.cos(yaw), sy = Math.sin(yaw);
              for (const [lx, ly, lz] of pool.lights) {
                const X = bp.X + lx * sc * cy - lz * sc * sy, Y = bp.Y - lx * sc * sy - lz * sc * cy;
                const idx = P.warn.add(X, Y, bp.E + h + ly * hs, 0, 1, 1, 1, this.origin, null);
                if (idx >= 0) ch.props.push([P.warn, idx]);
              }
            }
            break;
          }
        }
      }
    }
    // Billboards
    if (rng() < pr.billboards) {
      const side = rng() < 0.65 ? 1 : -1;
      const pool = this.billboardPools[Math.floor(rng() * this.billboardPools.length)];
      const dOut = 6 + rng() * 18;
      const s = s0 + rng() * CL;
      const p = this.road.pos(s, side * (dStart + dOut), this._tmp2);
      const f = this._foot(p.X, p.Y, p.H - side * 0.35, 7.5, 2);
      if (this._clear(ch, f, s, dStart + dOut - 7.5, 1.5)) {
        const h = this.groundOffset(s, dOut, side) + (env.elevated ? env.elevated * 0.9 : 0);
        this._addProp(ch, pool, s, side * (dStart + dOut), h, -side * 0.35, 1, 1, 1);
        ch.foot.push(f);
      }
    }
    // Vegetation & scenery on both sides (each item checked against everything above)
    const place = (pool, count, dMin, dMax, scaleMin, scaleMax, opts = {}) => {
      if (!pool) return;
      let n = count * dens;
      n = Math.floor(n) + (rng() < n - Math.floor(n) ? 1 : 0);
      for (let i = 0; i < n; i++) {
        const side = rng() < 0.5 ? 1 : -1;
        const dOut = dMin + Math.pow(rng(), opts.bias ?? 1) * (dMax - dMin);
        const s = s0 + rng() * CL;
        const sc = lerp(scaleMin, scaleMax, rng());
        const yaw = rng() * Math.PI * 2;
        const stretch = opts.stretch ? lerp(0.85, 1.25, rng()) : 1;
        if (opts.color) color.setHSL(opts.color[0] + (rng() - 0.5) * 0.04, opts.color[1], opts.color[2] * (0.8 + rng() * 0.4));
        const r = (opts.r ?? 1) * sc;
        const dist = dStart + dOut;
        const p = this.road.pos(s, side * dist, this._tmp2);
        const f = this._foot(p.X, p.Y, 0, r, r);
        // tall plants keep away from overhead structures; small ones only from footprints
        if (opts.tall ? !this._clear(ch, f, s, dist - r, 0.3, 0.6) : !this._clearSmall(ch, f)) continue;
        const h = this.groundOffset(s, dOut, side);
        this._addProp(ch, pool, s, side * dist, h, yaw, sc, sc * stretch, sc, opts.color ? color : null);
        if (opts.tall) ch.foot.push(this._foot(p.X, p.Y, 0, 0.6 * sc, 0.6 * sc));
      }
    };
    if (env.elevated) {
      place(P.tree, pr.trees * 3, 4, 60, 0.8, 1.3, { color: [0.28, 0.35, 0.45], r: 3, tall: true });
    } else {
      place(P.palm, pr.palms * 4.5, 2.5, 70, 0.8, 1.25, { bias: 1.4, stretch: true, r: 4, tall: true });
      place(P.tree, pr.trees * 5, 6, 160, 0.7, 1.4, { color: [0.26, 0.38, 0.5], r: 3, tall: true });
      place(P.bush, pr.bushes * 9, 1.0, 90, 0.6, 1.5, { color: env.id === 'desert' ? [0.17, 0.25, 0.55] : [0.25, 0.32, 0.45], r: 1.2 });
      place(P.cactus, pr.cacti * 5, 4, 140, 0.6, 1.3, { r: 1 });
      place(P.rock, pr.rocks * 6, 3, 200, 0.5, 2.6, { color: [0.07, 0.3, 0.55], r: 1.5 });
      // grass tufts: dense near the road, thinning out with distance (no footprint checks: they're tiny)
      const gN = Math.round((env.id === 'desert' ? 90 : env.id === 'la' ? 55 : 40) * dens);
      const gc = env.id === 'desert' ? [0.11, 0.42, 0.55] : env.id === 'la' ? [0.16, 0.35, 0.45] : [0.24, 0.3, 0.32];
      for (let i = 0; i < gN; i++) {
        const side = rng() < 0.5 ? 1 : -1;
        const dOut = 0.4 + Math.pow(rng(), 1.9) * 45;
        const sg = s0 + rng() * CL;
        const sc = 0.7 + rng() * 0.9;
        color.setHSL(gc[0] + (rng() - 0.5) * 0.04, gc[1], gc[2] * (0.75 + rng() * 0.5));
        this._addProp(ch, P.grass, sg, side * (dStart + dOut), this.groundOffset(sg, dOut, side) - 0.04, rng() * 6.28, sc * 1.3, sc, sc * 1.3, color);
      }
    }
    // roadside furniture on open highways: delineators on the guardrail, call boxes, mile markers
    if (env.outer === 'guardrail') {
      for (let sd = Math.ceil(s0 / 32) * 32; sd < s1; sd += 32) {
        for (const side of [1, -1]) {
          if (this._nearFeature(sd, 6)) continue;
          this._addProp(ch, P.delineator, sd, side * (L.wallD + 0.12), 0, side > 0 ? 0 : Math.PI, 1, 1, 1);
        }
      }
      for (let sb = Math.ceil(s0 / 805) * 805; sb < s1; sb += 805) {
        if (!this._nearFeature(sb, 15)) this._addProp(ch, P.callBox, sb, L.wallD + 1.3, this.groundOffset(sb, 1.3 - 1.2, 1) + 0.0, 0, 1, 1, 1);
      }
      for (let sm = Math.ceil(s0 / 1609) * 1609; sm < s1; sm += 1609) {
        if (!this._nearFeature(sm, 15)) this._addProp(ch, P.mile, sm, L.wallD + 0.9, this.groundOffset(sm, 0, 1), 0, 1, 1, 1);
      }
    }
  }

  /** Road distance of the n-th transmission tower, nudged off overpass footprints. */
  _pylonS(n) {
    let s = n * PYLON_SP;
    for (const f of this.features) if (f.type === 'overpass' && Math.abs(f.s - s) < 24) s = f.s + 28;
    return s;
  }

  /** Is s within m metres of an overpass or gantry? */
  _nearFeature(s, m) {
    for (const f of this.features) if (Math.abs(f.s - s) < m + (f.type === 'overpass' ? 10 : 2)) return true;
    return false;
  }

  _clearSmall(ch, f) {
    for (const c of this.chunks.values()) if (c.foot) for (const o of c.foot) if (o.hx > 1 && !o.soft && this._footHit(o, f, 0.2)) return false;
    for (const o of ch.foot) if (o.hx > 1 && !o.soft && this._footHit(o, f, 0.2)) return false;
    return true;
  }

  /** Iterate visible lamp heads (absolute X, Y, E). */
  forEachLamp(fn) {
    for (const ch of this.chunks.values()) for (const l of ch.lamps) fn(l);
  }

  /** Lighting state from sky/weather. */
  setAmbient(night, wet) {
    this.night = night;
    this.wet = wet;
    if (!this.mat) return;
    const lit = smoothstep(0.25, 0.75, night);
    this.lampMat.color.copy(this.lampColor).multiplyScalar(0.25 + lit * 1.8);
    this.poolMat.opacity = lit * (this.lampLights.some((L) => L.visible) ? 0.3 + wet * 0.2 : 0.42 + wet * 0.25);
    for (const p of Object.values(this.buildingPools)) p.mat.emissiveIntensity = lit * 1.35;
    const blink = (performance.now() % 1600) < 900 ? 1 : 0.08;
    this.warnMat.color.setRGB(1, 0.16, 0.1).multiplyScalar(lerp(0.35, 2.4 * blink, lit));
    this.reflMat.color.setRGB(1, 0.7, 0.25).multiplyScalar(lerp(0.55, 1.15, lit));
    this.wireMat.color.setScalar(lerp(0.17, 0.05, night));
    for (const p of this.billboardPools) p.panelMat.emissiveIntensity = 0.35 + lit * 1.4;
    for (const m of this.signMats) m.emissiveIntensity = lit * 0.12;
    this.mat.marking.emissive.setScalar(lit * 0.06);
    // retroreflectors: dull plastic by day, bright points in the dark
    this.mat.rpm.color.setScalar(lerp(0.62, 1.05, lit) * (1 - this.wet * 0.15));
    // Wet surfaces: darker, glossier
    const r = this.mat.road;
    r.color.copy(this.roadColor).multiplyScalar(1 - wet * 0.42);
    r.roughness = 1 - wet * 0.72;
    r.envMapIntensity = 1 + wet * 1.6;
    r.normalScale.setScalar(0.6 + wet * 0.5);
    this.mat.marking.roughness = 0.55 - wet * 0.35;
    this.mat.concrete.color.setHex(0xd9d6cf).multiplyScalar(1 - wet * 0.25);
  }

  _disposeEnv() {
    for (const p of this._allPools()) p.dispose(this.group);
    this.pools = {};
    this.buildingPools = {};
    this.buildingVariants = {};
    this.billboardPools = [];
    for (const m of [this.warnMat, this.reflMat, this.wireMat]) m?.dispose();
    if (this.gantryPool) for (const o of this.gantryPool.free) this.group.remove(o);
    if (this.overpassPool) for (const o of this.overpassPool.free) this.group.remove(o);
    for (const t of this.textures || []) t.dispose();
    this.textures = [];
    if (this.mat) for (const m of Object.values(this.mat)) m.dispose();
    for (const m of this.signMats || []) { m.map.dispose(); m.dispose(); }
  }
}
