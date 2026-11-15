// Cockpit interior for the first-person camera, built per car from its interior spec (config/interiors.js):
// each car gets its own dashboard architecture, instrument cluster, centre stack, vents, climate controls,
// console and shifter, steering wheel, seats, belts, pedals, door cards and materials. Shared: the body shell
// seen from inside, live mirrors, rain on the glass, gloved hands with two-bone IK arms and a head-up display
// on the cars that have one. Everything is placed relative to the driver's eye, which each car sets itself.
import * as THREE from 'three';
import { clamp, lerp, MS_TO_MPH, MS_TO_KMH } from '../core/utils.js';
import { mirrorPose } from '../vehicles/carBuilder.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { gloveTexture, glowStripTexture } from './interiorTextures.js';
import { interiorFor } from '../config/interiors.js';
import { drawCluster, bootState } from './gauges.js';
import * as Parts from './cockpitParts.js';
const { RB, limb, clones, _up } = Parts;

/** Rain drops on glass: bright lower rims and dark upper edges read as tiny lenses. */
function dropletTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const x = c.getContext('2d');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 420; i++) {
    const px = rnd() * S, py = rnd() * S;
    const r = 1.2 + Math.pow(rnd(), 3) * 7;
    const sy = 1 + rnd() * 0.35;
    for (const [dx, dy] of [[0, 0], [S, 0], [-S, 0], [0, S], [0, -S]]) {
      const cx = px + dx, cy = py + dy;
      if (cx < -10 || cx > S + 10 || cy < -10 || cy > S + 10) continue;
      const g = x.createRadialGradient(cx, cy + r * 0.35, r * 0.1, cx, cy, r * 1.05);
      g.addColorStop(0, 'rgba(255,255,255,0.10)');
      g.addColorStop(0.6, 'rgba(210,220,230,0.22)');
      g.addColorStop(0.85, 'rgba(255,255,255,0.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g;
      x.beginPath();
      x.ellipse(cx, cy, r, r * sy, 0, 0, Math.PI * 2);
      x.fill();
      x.fillStyle = 'rgba(0,0,0,0.28)';
      x.beginPath();
      x.ellipse(cx, cy - r * 0.45, r * 0.7, r * 0.32, 0, 0, Math.PI * 2);
      x.fill();
    }
  }
  x.strokeStyle = 'rgba(230,236,240,0.16)';
  for (let i = 0; i < 40; i++) {
    const px = rnd() * S, py = rnd() * S, l = 20 + rnd() * 60;
    x.lineWidth = 1 + rnd() * 1.5;
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + (rnd() - 0.5) * 8, py - l); x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}


export class Cockpit {
  constructor(renderer) {
    this.renderer = renderer;
    this.group = null;
    this.visible = false;
    this.mirrorRT = new THREE.WebGLRenderTarget(512, 160, { samples: 0 });
    this.mirrorRT.texture.colorSpace = THREE.SRGBColorSpace;
    this.mirrorCam = new THREE.PerspectiveCamera(28, 512 / 160, 0.3, 900);
    this.frame = 0;
    const mk = (w, h) => {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return [c, t];
    };
    [this.gaugeCanvas, this.gaugeTex] = mk(1024, 384);
    [this.navCanvas, this.navTex] = mk(1024, 512);
    [this.hudCanvas, this.hudTex] = mk(512, 160);
    [this.clockCanvas, this.clockTex] = mk(256, 256);
    this.gaugeT = 0;
    this.navT = 0;
    this.hudT = 0;
    this.clockT = 0;
    this.accent = '#ff2e4d';
    this.ambientColor = new THREE.Color('#2fd9ff');
    this.dropTex = dropletTexture();
    this.dropT = 0;
    this.odo = 12873;
    this.tripT = 0;
    this.mats = [];
    this.geos = [];
    this.bootT = null; // seconds since the displays were woken (null = not yet)
    this.dome = false;
  }

  /* ------------------------------------------------------------------ build */
  build(car, def) {
    if (this.group) {
      this.group.parent?.remove(this.group);
      this.group.traverse((o) => { if (o.isMesh && !this.shared?.has(o.geometry)) o.geometry.dispose(); });
      for (const m of this.mats) m.dispose();
      for (const t of clones.splice(0)) t.dispose();
    }
    this.mats = [];
    const D = car.dims, ctx = car.model.ctx, cab = def.body.cabin;
    this.def = def;
    const I = interiorFor(def), P = I.palette;
    this.I = I;
    this.accent = P.accent;
    this.ambientColor = new THREE.Color(P.ambient || '#000000');
    const g = new THREE.Group();
    g.name = 'cockpit';
    const M = (m) => { this.mats.push(m); return m; };
    const add = (geo, mat, parent = g) => { const m = new THREE.Mesh(geo, mat); parent.add(m); return m; };

    this.ambientMat = M(new THREE.MeshBasicMaterial({ color: this.ambientColor.clone(), toneMapped: false, transparent: true, opacity: 0.6 }));
    this.ambientGlow = M(new THREE.MeshBasicMaterial({ color: this.ambientColor.clone(), map: glowStripTexture(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    const gloveM = M(new THREE.MeshStandardMaterial({ map: gloveTexture(), roughness: 0.82 }));
    const gloveDark = M(new THREE.MeshStandardMaterial({ color: 0x3e4249, roughness: 0.75 }));
    const sleeveM = M(new THREE.MeshStandardMaterial({ color: 0x17181c, roughness: 0.78, metalness: 0.05 }));
    const cuffM = M(new THREE.MeshStandardMaterial({ color: new THREE.Color(this.accent), roughness: 0.6 }));

    const cw = D.cabinW;
    const dx = -cw * 0.46; // driver x (left-hand drive)
    this.driverX = dx;
    const eyeY = D.eyeY, eyeZ = D.eyeZ;
    const tOf = (z) => (z + ctx.L / 2) / ctx.L;
    // inner half-width of the body skin at a car-local z / lowered height
    // (heights above the local body top are clamped so trim never folds into the cabin)
    const innerW = (z, y) => {
      const t = clamp(tOf(z), 0, 1);
      return ctx.halfWAt(t, Math.min(y + ctx.lower, ctx.top(t) - 0.03));
    };
    // belt line at a given z (follows the body where it dips below the mid-cabin belt height)
    const beltAt = (z) => Math.min(D.beltY, ctx.top(clamp(tOf(z), 0, 1)) - ctx.lower - 0.006);
    const zWS = ctx.z(cab.t0);
    const glassY = (z) => {
      const t = clamp(tOf(z), cab.t0, cab.t1);
      const u = (t - cab.t0) / Math.max(1e-3, cab.t1 - cab.t0);
      const yb = ctx.top(t);
      return yb + (cab.roof - yb) * Math.pow(Math.sin((u * Math.PI) / 2), cab.wsCurve ?? 0.85) - ctx.lower;
    };
    // build context shared by every interior part
    const K = {
      g, add, M, D, ctx, cab, def, I, P, dx, eyeY, eyeZ, tOf, innerW, beltAt, zWS, glassY,
      gaugeTex: this.gaugeTex, navTex: this.navTex, clockTex: this.clockTex,
      ambientMat: this.ambientMat, ambientGlow: this.ambientGlow,
    };
    this.K = K;
    Parts.materials(K);

    // ---------- interior shell: body seen from inside (dark trim below the belt, fabric headliner above)
    {
      const shellM = M(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.93, side: THREE.BackSide }));
      const glassIn = M(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false }));
      const hl = new THREE.Color('#5d5e63'), dk = new THREE.Color('#25262a');
      const keys = ['paint', 'trim', 'decal', 'kit', 'cabinTop', 'body2'];
      for (const k of keys) {
        const src = car.model.meshes[k];
        if (!src) continue;
        const geo = src.geometry;
        if (!geo.attributes.color || geo.userData.shellBelt !== D.beltY) {
          const p = geo.attributes.position;
          const col = new Float32Array(p.count * 3);
          for (let i = 0; i < p.count; i++) {
            const y = p.getY(i);
            const f = clamp((y - (D.beltY + 0.02)) / 0.06, 0, 1);
            col[i * 3] = lerp(dk.r, hl.r, f); col[i * 3 + 1] = lerp(dk.g, hl.g, f); col[i * 3 + 2] = lerp(dk.b, hl.b, f);
          }
          geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
          geo.userData.shellBelt = D.beltY;
        }
        add(geo, shellM);
      }
      if (car.model.meshes.glass) {
        const gi = add(car.model.meshes.glass.geometry, glassIn);
        gi.renderOrder = 3;
      }
      this.shared = new Set(keys.concat('glass').map((k) => car.model.meshes[k]?.geometry).filter(Boolean));
    }

    // ---------- the car's own interior
    Parts.dash(K);
    Parts.centreStack(K);
    const WH = Parts.wheel(K);
    Parts.cluster(K);
    Parts.console_(K);
    Parts.seats(K);
    Parts.floor(K);
    Parts.doors(K);
    Parts.headliner(K);
    this.dash = { zLip: K.zLip, yLip: K.yLip, dashHW: K.dashHW };
    this.domeMat = K.domeMat;
    // interior light: a small warm point light under the roof console (off until switched on)
    this.light = new THREE.PointLight(0xfff1dc, 0, 2.4, 1.4);
    this.light.position.set(0, D.roofY - 0.12, eyeZ - 0.15);
    g.add(this.light);

    const mirrorMat = M(new THREE.MeshBasicMaterial({ map: this.mirrorRT.texture }));
    {
      const mz = Math.max(eyeZ - 0.58, D.wsTopZ + 0.07);
      const my = Math.min(eyeY + 0.05, D.roofY - 0.11);
      const mx = 0.02;
      const mg = new THREE.Group();
      mg.position.set(mx, my, mz);
      mg.rotation.y = -0.3;
      mg.add(new THREE.Mesh(RB(0.27, 0.075, 0.035, 0.03, 3), K.m.piano));
      const shape = new THREE.Shape();
      const w = 0.125, h = 0.031, r = 0.026;
      shape.moveTo(-w + r, -h);
      shape.lineTo(w - r, -h); shape.quadraticCurveTo(w, -h, w, -h + r);
      shape.lineTo(w, h - r); shape.quadraticCurveTo(w, h, w - r, h);
      shape.lineTo(-w + r, h); shape.quadraticCurveTo(-w, h, -w, h - r);
      shape.lineTo(-w, -h + r); shape.quadraticCurveTo(-w, -h, -w + r, -h);
      const sg = new THREE.ShapeGeometry(shape, 8);
      const uv = sg.attributes.uv, pp = sg.attributes.position;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, 1 - (pp.getX(i) + w) / (2 * w), (pp.getY(i) + h) / (2 * h));
      const gl = new THREE.Mesh(sg, mirrorMat);
      gl.position.z = 0.0185;
      mg.add(gl);
      g.add(mg);
      const top = new THREE.Vector3(mx + 0.01, D.roofY - 0.03, mz - 0.05);
      const base = new THREE.Vector3(mx, my + 0.03, mz - 0.01);
      const stem = limb(base, top, 0.009, 0.012, 10);
      stem.material = K.m.dash;
      g.add(stem);
      const foot = add(RB(0.05, 0.03, 0.06, 0.01), K.m.dash);
      foot.position.copy(top);
    }
    // door mirror glass (live) on the exterior mirrors
    {
      const mp = mirrorPose(ctx);
      for (const sx of [-1, 1]) {
        const geo = new THREE.CircleGeometry(1, 24).scale(mp.rx * 0.86, mp.ry * 0.8, 1);
        const uv = geo.attributes.uv.array;
        const u0 = sx < 0 ? 1.0 : 0.38, u1 = sx < 0 ? 0.62 : 0.0;
        for (let i = 0; i < uv.length; i += 2) uv[i] = u0 + (u1 - u0) * uv[i];
        const m = add(geo, mirrorMat);
        m.position.set(sx * mp.x, mp.y, mp.z + mp.rz * 0.7 + 0.004);
      }
    }

    // ---------- rain on the windscreen
    {
      const zb = ctx.z(cab.t0) + 0.03, yb = ctx.top(cab.t0) - ctx.lower + 0.03;
      const zt = ctx.z(cab.t1) - 0.04, yt = cab.roof - ctx.lower - 0.05;
      const wb = ctx.hw(cab.t0) * (cab.wBot ?? 0.86) * 0.86, wt = ctx.hw(cab.t1) * (cab.wBot ?? 0.86) * (1 - (cab.tumble ?? 0.2)) * 0.86;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([-wb, yb, zb, wb, yb, zb, -wt, yt, zt, wt, yt, zt], 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1.6, 0, 0.1, 0.9, 1.5, 0.9], 2));
      geo.setIndex([0, 1, 2, 1, 3, 2]);
      this.dropMat = M(new THREE.MeshBasicMaterial({ map: this.dropTex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
      const dm = add(geo, this.dropMat);
      dm.renderOrder = 5;
    }

    // ---------- head-up display (virtual image floating over the bonnet)
    if (I.hud) {
      this.hudMat = M(new THREE.MeshBasicMaterial({ map: this.hudTex, transparent: true, opacity: 0.8, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
      const hud = add(new THREE.PlaneGeometry(0.21, 0.066), this.hudMat);
      hud.position.set(dx, eyeY - 0.19, eyeZ - 1.45);
      hud.rotation.x = -0.12;
      hud.renderOrder = 20;
    }

    // ---------- steering wheel (column, shroud, stalks fixed; wheel rotates)
    const wheelGroup = WH.wheelGroup, rotor = WH.rotor, R = WH.R, rimRX = WH.rimRX;
    const wheelShapeSquare = I.wheel.style === 'race';
    this.leds = K.leds || [];

    // ---------- gloved hands gripping the rim at a quarter to three
    this.hands = [];
    for (const side of [-1, 1]) {
      const a = side < 0 ? Math.PI - 0.24 : 0.24;
      const P = new THREE.Vector3(Math.cos(a) * rimRX, Math.sin(a) * R * (wheelShapeSquare ? 0.82 : 1), 0);
      const Nn = new THREE.Vector3(Math.cos(a), Math.sin(a), 0);
      const T = new THREE.Vector3(-Math.sin(a), Math.cos(a), 0);
      const Yl = side > 0 ? T.clone() : T.clone().negate();
      const Xl = side > 0 ? Nn.clone() : Nn.clone().negate();
      const o = side > 0 ? 1 : -1; // outward sign in the hand's local frame
      const hand = new THREE.Group();
      hand.scale.setScalar(1.12);
      hand.position.copy(P);
      hand.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Xl, Yl, new THREE.Vector3(0, 0, 1)));
      // fingers wrap over the front of the rim; tips peek out on the inside edge
      const rf = 0.0355;
      for (let k = 0; k < 4; k++) {
        const yk = -0.043 + k * 0.0195;
        const arc = [];
        const th0 = -0.45, th1 = k === 3 ? 2.45 : 2.7;
        for (let i = 0; i <= 10; i++) {
          const th = lerp(th0, th1, i / 10);
          arc.push(new THREE.Vector3(o * Math.cos(th) * rf, yk + (i / 10) * 0.003, -Math.sin(th) * rf * 1.2));
        }
        const fr = k === 3 ? 0.0084 : 0.0097;
        hand.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arc), 18, fr, 8, false), gloveM));
        const tip = new THREE.Mesh(new THREE.SphereGeometry(fr, 8, 6), gloveM);
        tip.position.copy(arc[arc.length - 1]);
        hand.add(tip);
      }
      // back of the hand: a rounded pad over the outer/driver side of the rim with a knuckle ridge
      const nrm = new THREE.Vector3(o * 0.62, 0, 0.78).normalize();
      const dorsum = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), gloveM);
      dorsum.scale.set(0.024, 0.05, 0.046);
      dorsum.position.copy(nrm.clone().multiplyScalar(0.036)).add(new THREE.Vector3(0, -0.012, 0));
      dorsum.rotation.y = Math.atan2(-nrm.z, nrm.x);
      hand.add(dorsum);
      const kn = new THREE.Mesh(new THREE.CapsuleGeometry(0.0135, 0.06, 4, 10), gloveDark);
      kn.position.set(o * 0.034, -0.014, -0.004);
      hand.add(kn);
      // thumb along the driver face of the rim toward the spoke
      const tb = new THREE.Vector3(o * 0.014, 0.03, 0.036), te = new THREE.Vector3(-o * 0.046, 0.022, 0.041);
      const th = limb(tb, te, 0.0122, 0.0108, 10);
      th.material = gloveM;
      hand.add(th);
      const thTip = new THREE.Mesh(new THREE.SphereGeometry(0.0108, 10, 8), gloveM);
      thTip.position.copy(te);
      hand.add(thTip);
      // gauntlet cuff toward the forearm
      const dir = new THREE.Vector3(o * 0.32, -0.42, 0.85).normalize();
      const c0 = dorsum.position.clone().add(dir.clone().multiplyScalar(0.03));
      const c1 = dorsum.position.clone().add(dir.clone().multiplyScalar(0.105));
      const cuff = limb(c0, c1, 0.032, 0.037, 14);
      cuff.material = gloveDark;
      hand.add(cuff);
      const wrist = new THREE.Object3D();
      wrist.position.copy(c1);
      hand.add(wrist);
      rotor.add(hand);
      // arm: forearm + elbow + upper arm, solved each frame
      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.046, 1, 14), sleeveM);
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 1, 14), sleeveM);
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 8), sleeveM);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.0395, 0.0395, 0.018, 14), cuffM);
      g.add(fore, upper, elbow, band);
      this.hands.push({ hand, wrist, fore, upper, elbow, band, side });
    }
    g.add(wheelGroup);
    this.wheelGroup = wheelGroup;
    this.rotor = rotor;
    this.shoulders = [new THREE.Vector3(dx - 0.2, eyeY - 0.26, eyeZ + 0.1), new THREE.Vector3(dx + 0.2, eyeY - 0.26, eyeZ + 0.1)];

    // merge children of a container by material in its local space (rotor, each glove, column)
    const mergeIn = (container, skip = new Set()) => {
      container.updateMatrixWorld(true);
      const inv = new THREE.Matrix4().copy(container.matrixWorld).invert();
      const buckets = new Map(), victims = [];
      container.traverse((o) => {
        if (!o.isMesh || skip.has(o) || Array.isArray(o.material) || o.renderOrder !== 0) return;
        let p = o.parent, blocked = false;
        while (p && p !== container) { if (skip.has(p)) blocked = true; p = p.parent; }
        if (blocked) return;
        const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
        if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
        if (!geo.attributes.normal) geo.computeVertexNormals();
        geo.clearGroups();
        geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
        if (!buckets.has(o.material)) buckets.set(o.material, []);
        buckets.get(o.material).push(geo);
        victims.push(o);
      });
      for (const o of victims) { o.parent.remove(o); o.geometry.dispose(); }
      for (const [mat, list] of buckets) {
        const merged = mergeGeometries(list, false);
        for (const l of list) l.dispose();
        if (merged) container.add(new THREE.Mesh(merged, mat));
      }
    };
    for (const h of this.hands) mergeIn(h.hand);
    mergeIn(rotor, new Set([...this.hands.map((h) => h.hand), ...(K.leds || [])]));
    mergeIn(wheelGroup, new Set([rotor]));
    // merge static trim that shares a material into single meshes (keeps the draw-call count down)
    {
      g.updateMatrixWorld(true);
      const dynamic = new Set();
      wheelGroup.traverse((o) => dynamic.add(o));
      for (const h of this.hands) for (const o of [h.fore, h.upper, h.elbow, h.band]) dynamic.add(o);
      if (this.light) dynamic.add(this.light);
      const buckets = new Map();
      const victims = [];
      g.traverse((o) => {
        if (!o.isMesh || dynamic.has(o) || this.shared.has(o.geometry) || Array.isArray(o.material) || o.renderOrder !== 0) return;
        const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
        if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
        if (!geo.attributes.normal) geo.computeVertexNormals();
        geo.clearGroups();
        geo.applyMatrix4(o.matrixWorld);
        if (!buckets.has(o.material)) buckets.set(o.material, []);
        buckets.get(o.material).push(geo);
        victims.push(o);
      });
      for (const o of victims) { o.parent.remove(o); o.geometry.dispose(); }
      for (const [mat, list] of buckets) {
        const merged = mergeGeometries(list, false);
        for (const l of list) l.dispose();
        if (merged) add(merged, mat);
      }
    }

    // interior pieces catch the sun through the glass and the roof's shadow
    const emissiveLike = new Set([this.ambientMat, this.ambientGlow, this.hudMat, this.dropMat, mirrorMat, K.m.stitch, ...(K.leds || []).map((l) => l.material)].filter(Boolean));
    g.traverse((m) => {
      if (!m.isMesh) return;
      m.castShadow = false;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      m.receiveShadow = !this.shared.has(m.geometry) && !mats.some((x) => emissiveLike.has(x) || x.map === this.gaugeTex || x.map === this.navTex || x.map === this.clockTex);
    });
    car.model.body.add(g);
    this.group = g;
    g.visible = this.visible;
    this.maxSpeed = Math.ceil((def.phys.topSpeed * 1.08) / 20) * 20;
  }

  setVisible(v) {
    if (v && !this.visible) this.bootT = 0; // displays wake up when you get in
    this.visible = v;
    if (this.group) this.group.visible = v;
  }

  _tmp = new THREE.Vector3();
  _tmp2 = new THREE.Vector3();
  _inv = new THREE.Matrix4();

  /* ------------------------------------------------------------------ per frame */
  update(dt, car, ctx) {
    if (!this.group || !this.visible) return;
    const P = car.phys;
    if (this.bootT !== null) this.bootT += dt;
    // steering wheel: road-wheel angle x steering ratio + a little input for feel
    const rot = clamp(P.steerAngle * 14 + car.steer * 0.12, -7.8, 7.8);
    this.rotor.rotation.z = -rot;
    this._solveArms();
    const night = ctx.night ?? 0;
    this.ambientMat.opacity = this.I.palette.ambient ? 0.18 + night * 0.75 : 0;
    this.ambientGlow.opacity = this.I.palette.ambient ? 0.03 + night * 0.22 : 0;
    if (this.hudMat) this.hudMat.opacity = 0.55 + night * 0.3;
    // interior (dome) light
    this.dome = !!ctx.dome;
    // daylight bouncing around the cabin (soft fill) plus the dome lamp when it's switched on
    this.light.intensity = (1 - night) * 0.55 * (1 - (ctx.rain ?? 0) * 0.4) + (this.dome ? 0.9 : 0);
    this.light.color.setRGB(1, this.dome ? 0.94 : 0.98, this.dome ? 0.86 : 0.96);
    this.domeMat.emissiveIntensity = this.dome ? 2.2 : 0;
    // shift lights on the race wheel
    if (this.leds.length) {
      const red = this.def.phys.redline;
      const f = clamp((P.rpm - red * 0.7) / (red * 0.3), 0, 1);
      const flash = P.rpm > red * 0.98 && performance.now() % 140 < 70;
      for (const l of this.leds) l.visible = !flash && l.userData.led / this.leds.length < f;
    }
    if (this.dropMat) {
      const rain = ctx.rain ?? 0;
      this.dropMat.opacity = clamp(rain * 1.2, 0, 1) * (0.55 + 0.45 * (1 - night));
      this.dropMat.color.setScalar(lerp(1, 0.35, night));
      const v = P.speed;
      this.dropTex.offset.y -= dt * (v > 12 ? v * 0.012 : -0.02);
      this.dropTex.offset.x += dt * 0.004 * Math.sin(this.dropT += dt);
    }
    this.odo += (P.speed * dt) / 1000;
    this.tripT += dt;
    this.gaugeT -= dt;
    if (this.gaugeT <= 0) {
      this.gaugeT = 1 / 30;
      this._drawGauges(P, ctx);
    }
    if (this.hudMat) {
      this.hudT -= dt;
      if (this.hudT <= 0) { this.hudT = 1 / 20; this._drawHud(P, ctx); }
    }
    this.navT -= dt;
    if (this.navT <= 0) {
      this.navT = 0.25;
      this._drawNav(car, ctx);
    }
    if (this.I.clock) {
      this.clockT -= dt;
      if (this.clockT <= 0) { this.clockT = 1; this._drawClock(ctx); }
    }
  }

  /** Two-bone IK from each shoulder to the glove cuff, elbows dropped down and out. */
  _solveArms() {
    const g = this.group;
    g.updateMatrixWorld(true);
    this._inv.copy(g.matrixWorld).invert();
    const L1 = 0.3, L2 = 0.29;
    for (let i = 0; i < 2; i++) {
      const h = this.hands[i];
      const S = this.shoulders[i];
      const W = h.wrist.getWorldPosition(this._tmp).applyMatrix4(this._inv).clone();
      const d = Math.min(L1 + L2 - 0.002, Math.max(0.05, S.distanceTo(W)));
      const u = W.clone().sub(S).normalize();
      const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
      const hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));
      const pole = new THREE.Vector3(h.side * 0.55, -0.82, 0.12);
      pole.sub(u.clone().multiplyScalar(pole.dot(u))).normalize();
      const E = S.clone().add(u.clone().multiplyScalar(a)).add(pole.multiplyScalar(hh));
      const place = (m, A, B) => {
        const len = A.distanceTo(B);
        m.scale.set(1, len, 1);
        m.position.copy(A).lerp(B, 0.5);
        m.quaternion.setFromUnitVectors(_up, this._tmp2.copy(B).sub(A).normalize());
      };
      place(h.fore, W, E);
      place(h.upper, E, S);
      h.elbow.position.copy(E);
      const bandP = W.clone().lerp(E, 0.06);
      h.band.position.copy(bandP);
      h.band.quaternion.copy(h.fore.quaternion);
    }
  }

  renderMirror(renderer, scene, car) {
    if (!this.group || !this.visible) return;
    this.frame++;
    if (this.frame % 2) return;
    const body = car.model.body;
    body.updateMatrixWorld(true);
    const D = car.dims;
    const cam = this.mirrorCam;
    const p = new THREE.Vector3(0, D.roofY - 0.12, D.wsTopZ + 0.4).applyMatrix4(body.matrixWorld);
    const t = new THREE.Vector3(0, D.roofY - 0.5, D.wsTopZ + 30).applyMatrix4(body.matrixWorld);
    cam.position.copy(p);
    cam.lookAt(t);
    const prev = renderer.getRenderTarget();
    this.group.visible = false;
    const interior = car.model.meshes.interior;
    const iv = interior?.visible;
    if (interior) interior.visible = false;
    renderer.setRenderTarget(this.mirrorRT);
    renderer.render(scene, cam);
    renderer.setRenderTarget(prev);
    this.group.visible = true;
    if (interior) interior.visible = iv;
  }

  /* ------------------------------------------------------------------ displays */
  _drawGauges(P, ctx) {
    const c = this.gaugeCanvas.getContext('2d');
    const units = ctx.units;
    const def = this.def;
    const maxS = Math.ceil((def.phys.topSpeed * (units === 'kmh' ? 1.609 : 1) * 1.08) / 20) * 20;
    const s = {
      rpm: P.rpm, maxR: Math.ceil((def.phys.limiter + 500) / 1000) * 1000, red: def.phys.redline,
      speed: units === 'kmh' ? P.speed * MS_TO_KMH : P.speed * MS_TO_MPH, maxS, units,
      gear: P.gear, manual: ctx.manual, boost: P.boost ?? 0, isTurbo: !!P.isTurbo, hours: ctx.hours ?? 12, odo: this.odo,
      ind: ctx.indicator ?? 0, blink: !!ctx.blink, lights: (ctx.night ?? 0) > 0.4, handbrake: !!ctx.handbrake,
      boot: bootState(this.bootT), maker: def.maker, model: def.name,
    };
    drawCluster(this.I.cluster, c, s, this.I.gauge);
    this.gaugeTex.needsUpdate = true;
  }

  /** Analog dash clock (sport-chrono style), redrawn once a second. */
  _drawClock(ctx) {
    const c = this.clockCanvas.getContext('2d');
    const S = 256, cx = S / 2;
    c.fillStyle = '#0b0b0c'; c.fillRect(0, 0, S, S);
    c.strokeStyle = '#f2f2f2';
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2, maj = i % 5 === 0;
      c.lineWidth = maj ? 5 : 2;
      c.beginPath(); c.moveTo(cx + Math.cos(a) * (maj ? 96 : 106), cx + Math.sin(a) * (maj ? 96 : 106)); c.lineTo(cx + Math.cos(a) * 118, cx + Math.sin(a) * 118); c.stroke();
    }
    const hrs = ctx.hours ?? 12, h = hrs % 12, mi = (hrs - Math.floor(hrs)) * 60, se = (performance.now() / 1000) % 60;
    const hand = (a, len, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx, cx); c.lineTo(cx + Math.cos(a - Math.PI / 2) * len, cx + Math.sin(a - Math.PI / 2) * len); c.stroke(); };
    hand((h / 12) * Math.PI * 2, 60, 9, '#f2f2f2');
    hand((mi / 60) * Math.PI * 2, 92, 6, '#f2f2f2');
    hand((se / 60) * Math.PI * 2, 104, 2.5, '#ff4a1a');
    c.fillStyle = '#f2f2f2'; c.beginPath(); c.arc(cx, cx, 8, 0, Math.PI * 2); c.fill();
    this.clockTex.needsUpdate = true;
  }

  _drawHud(P, ctx) {
    const c = this.hudCanvas.getContext('2d');
    const W = c.canvas.width, H = c.canvas.height;
    c.clearRect(0, 0, W, H);
    const units = ctx.units;
    const sp = units === 'kmh' ? P.speed * MS_TO_KMH : P.speed * MS_TO_MPH;
    const red = this.def.phys.redline;
    c.fillStyle = '#d9f5ff';
    c.textAlign = 'right';
    c.textBaseline = 'middle';
    c.font = '700 92px "Barlow Condensed", Arial, sans-serif';
    c.fillText(String(Math.round(sp)), W / 2 + 30, H / 2 + 4);
    c.textAlign = 'left';
    c.font = '600 26px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = '#9fdcff';
    c.fillText(units === 'kmh' ? 'km/h' : 'mph', W / 2 + 40, H / 2 + 26);
    c.font = '700 46px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = P.rpm > red * 0.97 ? '#ff5a6a' : '#d9f5ff';
    c.fillText(P.gear === -1 ? 'R' : String(P.gear), W / 2 + 40, H / 2 - 18);
    // short rpm bar
    const f = clamp(P.rpm / (this.def.phys.limiter + 300), 0, 1);
    for (let i = 0; i < 14; i++) {
      const on = i / 14 < f;
      c.fillStyle = on ? (i > 10 ? '#ff5a6a' : '#7fe3ff') : 'rgba(127,227,255,0.12)';
      c.fillRect(70 + i * 12, H / 2 - 8, 8, 16);
    }
    this.hudTex.needsUpdate = true;
  }

  _drawNav(car, ctx) {
    const c = this.navCanvas.getContext('2d');
    const W = c.canvas.width, H = c.canvas.height;
    const MW = Math.round(W * 0.64);
    // map
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0d1520');
    g.addColorStop(1, '#070b11');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
    c.save();
    c.beginPath();
    c.rect(0, 40, MW, H - 40);
    c.clip();
    c.strokeStyle = 'rgba(90,120,150,0.12)';
    c.lineWidth = 2;
    for (let i = -10; i < 20; i++) {
      c.beginPath(); c.moveTo(i * 60, 40); c.lineTo(i * 60 + 300, H); c.stroke();
      c.beginPath(); c.moveTo(0, 60 + i * 50); c.lineTo(MW, 20 + i * 50); c.stroke();
    }
    const road = ctx.road;
    const s0 = car.proj.s;
    const base = road.sample(s0, {});
    const ch = Math.cos(base.H), sh = Math.sin(base.H);
    const tmp = {};
    const path = () => {
      c.beginPath();
      for (let i = 0; i <= 34; i++) {
        road.sample(s0 - 120 + i * 25, tmp);
        const dX = tmp.X - base.X, dY = tmp.Y - base.Y;
        const lx = dX * ch - dY * sh, ly = dX * sh + dY * ch;
        const px = MW / 2 + lx * 0.5, py = H * 0.8 - ly * 0.5;
        if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
      }
    };
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = '#2c3a4c';
    c.lineWidth = 44;
    path(); c.stroke();
    c.strokeStyle = '#3b8cff';
    c.lineWidth = 12;
    path(); c.stroke();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.moveTo(MW / 2, H * 0.8 - 22);
    c.lineTo(MW / 2 + 15, H * 0.8 + 14);
    c.lineTo(MW / 2, H * 0.8 + 5);
    c.lineTo(MW / 2 - 15, H * 0.8 + 14);
    c.fill();
    c.restore();
    // right panel: next manoeuvre, media
    c.fillStyle = '#0f151d';
    c.fillRect(MW, 40, W - MW, H - 40);
    c.fillStyle = '#e9edf1';
    c.textAlign = 'left';
    c.textBaseline = 'middle';
    c.font = '700 44px "Barlow Condensed", Arial, sans-serif';
    c.fillText('↑  12 mi', MW + 26, 104);
    c.font = '500 24px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = '#8b98a8';
    c.fillText('Continue on freeway', MW + 26, 146);
    c.fillStyle = '#18212c';
    c.fillRect(MW + 20, 190, W - MW - 40, 1);
    c.fillStyle = '#e9edf1';
    c.font = '600 26px "Barlow Condensed", Arial, sans-serif';
    c.fillText('NO HESI FM 104.7', MW + 26, 236);
    c.fillStyle = '#8b98a8';
    c.font = '500 22px "Barlow Condensed", Arial, sans-serif';
    c.fillText('Night Drive Mix', MW + 26, 268);
    const prog = (this.tripT % 214) / 214;
    c.fillStyle = '#26303c';
    c.fillRect(MW + 26, 300, W - MW - 52, 6);
    c.fillStyle = '#3b8cff';
    c.fillRect(MW + 26, 300, (W - MW - 52) * prog, 6);
    c.font = '600 34px Arial, sans-serif';
    c.fillStyle = '#d9dee4';
    c.textAlign = 'center';
    const mid = MW + (W - MW) / 2;
    c.fillText('⏮', mid - 80, 370);
    c.fillText('⏸', mid, 370);
    c.fillText('⏭', mid + 80, 370);
    // top status bar
    c.fillStyle = '#05080c';
    c.fillRect(0, 0, W, 40);
    c.fillStyle = '#e9edf1';
    c.font = '600 22px "Barlow Condensed", Arial, sans-serif';
    c.textAlign = 'left';
    const hrs = ctx.hours ?? 12;
    const hh = Math.floor(hrs), mm = Math.floor((hrs - hh) * 60);
    c.fillText(`${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`, 18, 21);
    c.textAlign = 'right';
    c.fillText('72°F   LTE ▮▮▮', W - 18, 21);
    // bottom dock
    c.fillStyle = 'rgba(5,8,12,0.85)';
    c.fillRect(0, H - 54, MW, 54);
    c.textAlign = 'center';
    c.font = '600 22px "Barlow Condensed", Arial, sans-serif';
    const items = ['NAV', 'MEDIA', 'PHONE', 'CAR', 'CLIMATE'];
    items.forEach((t, i) => {
      c.fillStyle = i === 0 ? '#3b8cff' : '#aab4c0';
      c.fillText(t, (i + 0.5) * (MW / items.length), H - 26);
    });
    this.navTex.needsUpdate = true;
  }
}
