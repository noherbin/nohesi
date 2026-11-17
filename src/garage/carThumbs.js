// Car portraits for the garage list: each car is built with its own paint and parts, rendered once from a
// front three-quarter angle and kept as a transparent PNG.
//
// The portrait is drawn with the game's own renderer into a corner of the main canvas (so it gets the same
// tone mapping and colour output as the garage), copied out straight away, and then the frame is drawn over it
// as usual. It is drawn twice, on black and on white: the difference between the two gives each pixel's
// coverage, so the result has real transparency, with soft edges, glass and the shadow under the car.
// One car is done per frame, and only while the garage is open.
import * as THREE from 'three';
import { buildPlayerCar, disposeCar } from '../vehicles/carBuilder.js';

const TW = 440, TH = 200; // output size in pixels
const RW = 600, RH = 272; // render size (the car is cropped out of it and scaled to fill the output)
const ANGLE = 2.55; // car yaw: nose to the right, front three-quarter
const FOV = 20;

export class CarThumbs {
  constructor(renderer, env) {
    this.renderer = renderer;
    this.cache = new Map(); // key -> data URL
    this.queue = [];
    this.waiting = new Map(); // key -> [callbacks]
    const sc = (this.scene = new THREE.Scene());
    sc.environment = env;
    sc.environmentIntensity = 1.0;
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-3, 6, 5);
    const rim = new THREE.DirectionalLight(0xa9c8ff, 2.2);
    rim.position.set(4, 3, -6);
    const fill = new THREE.HemisphereLight(0xc9d2e0, 0x0c0d10, 0.5);
    sc.add(key, rim, fill);
    this.camera = new THREE.PerspectiveCamera(FOV, RW / RH, 0.1, 200);
    const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c.getContext('2d', { willReadFrequently: true }); };
    this.onBlack = mk(RW, RH);
    this.onWhite = mk(RW, RH);
    this.cut = mk(RW, RH);
    this.out = mk(TW, TH);
    this._size = new THREE.Vector2();
    this._clear = new THREE.Color();
    this._box = new THREE.Box3();
    this._v = new THREE.Vector3();
  }

  static key(def, custom, plate) { return def.id + '|' + JSON.stringify(custom || null) + '|' + (plate || ''); }

  /** The portrait if it's ready (a data URL); otherwise queue it and call `cb(url)` when it is. */
  request(def, custom, plate, cb, urgent = false) {
    const k = CarThumbs.key(def, custom, plate);
    if (this.cache.has(k)) return this.cache.get(k);
    if (cb) { const w = this.waiting.get(k) || []; w.push(cb); this.waiting.set(k, w); }
    const i = this.queue.findIndex((q) => q.k === k);
    if (i >= 0) { if (urgent && i > 0) this.queue.unshift(...this.queue.splice(i, 1)); }
    else this.queue[urgent ? 'unshift' : 'push']({ k, def, custom, plate });
    return null;
  }

  /** Forget queued work (e.g. the garage closed); finished portraits stay cached. */
  cancel() { this.queue.length = 0; this.waiting.clear(); }

  get busy() { return this.queue.length > 0; }

  /** Render at most one queued portrait. Call before the frame's own render. */
  pump() {
    const job = this.queue.shift();
    if (!job) return;
    const r = this.renderer;
    const car = buildPlayerCar(job.def, job.custom, job.plate);
    car.mats.head.emissiveIntensity = 0.15;
    car.mats.head2.emissiveIntensity = 0.15;
    car.mats.drl.emissiveIntensity = 1.6;
    car.mats.tail.emissiveIntensity = 1.4;
    car.mats.tailLed.emissiveIntensity = 2.6;
    car.mats.proj.emissiveIntensity = 0.35;
    car.root.rotation.y = ANGLE;
    this.scene.add(car.root);
    car.root.updateMatrixWorld(true);
    this._frame(car);
    try {
      r.getSize(this._size);
      const pr = r.getPixelRatio();
      const vw = Math.min(Math.floor(RW / pr), this._size.x), vh = Math.min(Math.floor(RH / pr), this._size.y);
      const pw = Math.floor(vw * pr), ph = Math.floor(vh * pr);
      const canvas = r.domElement;
      r.getClearColor(this._clear);
      const ca = r.getClearAlpha();
      r.setRenderTarget(null);
      r.setViewport(0, 0, vw, vh);
      r.setScissor(0, 0, vw, vh);
      r.setScissorTest(true);
      for (const [bg, ctx] of [[0x000000, this.onBlack], [0xffffff, this.onWhite]]) {
        r.setClearColor(bg, 1);
        r.render(this.scene, this.camera);
        ctx.clearRect(0, 0, RW, RH);
        ctx.drawImage(canvas, 0, canvas.height - ph, pw, ph, 0, 0, RW, RH);
      }
      r.setScissorTest(false);
      r.setViewport(0, 0, this._size.x, this._size.y);
      r.setClearColor(this._clear, ca);
      const url = this._compose();
      this.cache.set(job.k, url);
      if (this.cache.size > 40) this.cache.delete(this.cache.keys().next().value); // old paint jobs
      for (const cb of this.waiting.get(job.k) || []) cb(url);
      this.waiting.delete(job.k);
    } finally {
      this.scene.remove(car.root);
      disposeCar(car);
    }
  }

  /** Aim the camera so the car fills the frame from the portrait angle. */
  _frame(car) {
    const box = this._box.setFromObject(car.root, true);
    const c = box.getCenter(new THREE.Vector3());
    const cam = this.camera;
    const dir = new THREE.Vector3(0.1, 0.21, 1).normalize(); // slightly above, a touch off-axis
    const pts = [];
    for (let i = 0; i < 8; i++) pts.push(new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z));
    // place, measure the projected extent, then scale the distance so the car fills ~92% of the width
    let d = 12;
    for (let it = 0; it < 3; it++) {
      cam.position.copy(c).addScaledVector(dir, d);
      cam.lookAt(c);
      cam.updateMatrixWorld(true);
      let x0 = 1, x1 = -1, y0 = 1, y1 = -1;
      for (const p of pts) { const v = this._v.copy(p).project(cam); x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); }
      const k = Math.max((x1 - x0) / 1.84, (y1 - y0) / 1.7);
      d *= k;
    }
    cam.position.copy(c).addScaledVector(dir, d);
    cam.lookAt(c);
    cam.updateProjectionMatrix();
  }

  /** Black and white renders -> one transparent image, cropped to the car and scaled to fill the output. */
  _compose() {
    const b = this.onBlack.getImageData(0, 0, RW, RH), w = this.onWhite.getImageData(0, 0, RW, RH);
    const o = this.cut.createImageData(RW, RH);
    const B = b.data, Wd = w.data, O = o.data;
    let x0 = RW, x1 = -1, y0 = RH, y1 = -1;
    for (let i = 0, p = 0; i < B.length; i += 4, p++) {
      const diff = (Wd[i] - B[i]) + (Wd[i + 1] - B[i + 1]) + (Wd[i + 2] - B[i + 2]);
      const a = Math.min(1, Math.max(0, 1 - diff / 765));
      if (a < 0.004) continue;
      O[i] = Math.min(255, B[i] / a);
      O[i + 1] = Math.min(255, B[i + 1] / a);
      O[i + 2] = Math.min(255, B[i + 2] / a);
      O[i + 3] = a * 255;
      if (a > 0.06) { const x = p % RW, y = (p / RW) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    this.cut.putImageData(o, 0, 0);
    const out = this.out;
    out.clearRect(0, 0, TW, TH);
    if (x1 < x0) { x0 = 0; y0 = 0; x1 = RW - 1; y1 = RH - 1; }
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
    const k = Math.min((TW * 0.97) / bw, (TH * 0.95) / bh);
    const dw = bw * k, dh = bh * k;
    out.imageSmoothingQuality = 'high';
    out.drawImage(this.cut.canvas, x0, y0, bw, bh, (TW - dw) / 2, TH - dh - TH * 0.02, dw, dh);
    return out.canvas.toDataURL('image/png');
  }
}
