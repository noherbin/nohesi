// Showroom scene: rotating turntable, studio lighting and reflections for the garage/customisation screens.
import * as THREE from 'three';
import { buildPlayerCar, disposeCar, applyPaint, PAINT_FINISHES, RIM_FINISHES, tintFor, rideLower, rideRake } from '../vehicles/carBuilder.js';
import { damp, dampAngle, clamp, lerp } from '../core/utils.js';
import { Cockpit } from '../camera/cockpit.js';
import { tagsOf } from '../config/parts.js';
import { Particles, Shockwave } from './showFx.js';

// camera azimuth of the orbit camera; the turntable turns the car to present the side being worked on
const AZ = 0.9;
const FRONT = Math.atan2(-Math.cos(AZ), -Math.sin(AZ));
/** Camera presets per customisation view: table angle, camera pitch, distance and the point looked at. */
const VIEWS = {
  three: { angle: 3.35, pitch: 0.17, zoom: 1, focus: [0, 0.55, 0], spin: true },
  paint: { angle: 3.0, pitch: 0.2, zoom: 0.95, focus: [0, 0.55, 0], spin: true },
  front: { angle: FRONT + 0.32, pitch: 0.12, zoom: 0.72, focus: [0, 0.45, -0.38], fz: -1 },
  rear: { angle: FRONT + Math.PI - 0.35, pitch: 0.15, zoom: 0.72, focus: [0, 0.55, 0.38], fz: 1 },
  side: { angle: FRONT + Math.PI / 2, pitch: 0.08, zoom: 0.92, focus: [0, 0.48, 0] },
  wheel: { angle: FRONT + Math.PI / 2 - 0.5, pitch: 0.1, zoom: 0.5, focus: 'wheel' },
  top: { angle: FRONT + 0.6, pitch: 0.62, zoom: 0.82, focus: [0, 0.6, -0.15] },
  under: { angle: FRONT + Math.PI / 2 + 0.35, pitch: 0.16, zoom: 1.0, focus: [0, 0.3, 0] },
  stance: { angle: FRONT + 0.25, pitch: 0.035, zoom: 0.78, focus: [0, 0.42, 0] },
  plate: { angle: FRONT + Math.PI - 0.12, pitch: 0.1, zoom: 0.55, focus: [0, 0.45, 0.45], fz: 1 },
  // inside the cabin: where the eye sits (driver / passenger seat) and where it looks
  interior: { angle: FRONT + 0.6, pitch: 0.17, zoom: 1, focus: [0, 0.55, 0], inside: { seat: 'driver', yaw: 0.22, pitch: -0.1 } },
  seats: { angle: FRONT + 0.6, pitch: 0.17, zoom: 1, focus: [0, 0.55, 0], inside: { seat: 'dash', yaw: 2.72, pitch: -0.3, fov: 74 } },
  console: { angle: FRONT + 0.6, pitch: 0.17, zoom: 1, focus: [0, 0.55, 0], inside: { seat: 'driver', yaw: -0.55, pitch: -0.62, fov: 66 } },
  floor: { angle: FRONT + 0.6, pitch: 0.17, zoom: 1, focus: [0, 0.55, 0], inside: { seat: 'passenger', yaw: 0.9, pitch: -0.95, fov: 72 } },
};
/**
 * Close-ups for individual parts: the camera flies to the part being changed. `at(car, side)` gives the
 * point to look at in the car's own coordinates (side = +1 / -1, the side of the car facing the camera).
 */
const deckY = (c) => c.ctx.top(0.94) - c.ctx.lower;
const lampOf = (list, side) => (list.filter((p) => Math.sign(p[0]) === side).sort((a, b) => Math.abs(b[0]) - Math.abs(a[0]))[0] || list[0]);
const engineAt = (c, def) => (tagsOf(def).some((t) => t === 'mid' || t === 'rear') ? [0, deckY(c) + 0.02, c.dims.rearZ * 0.62] : [0, c.dims.hoodY + 0.02, c.dims.hoodZ]);
const engineShot = (def) => (tagsOf(def).some((t) => t === 'mid' || t === 'rear') ? { angle: FRONT + Math.PI - 0.7, pitch: 0.42, zoom: 0.5 } : { angle: FRONT + 0.5, pitch: 0.42, zoom: 0.48 });
const PART_SHOTS = {
  fBumper: { angle: FRONT + 0.32, pitch: 0.07, zoom: 0.42, at: (c) => [0, 0.34, c.dims.frontZ + 0.1] },
  splitter: { angle: FRONT + 0.5, pitch: 0.02, zoom: 0.35, at: (c, s) => [s * c.dims.W * 0.2, 0.16, c.dims.frontZ + 0.12] },
  rBumper: { angle: FRONT + Math.PI - 0.32, pitch: 0.08, zoom: 0.42, at: (c) => [0, 0.36, c.dims.rearZ - 0.1] },
  diffuser: { angle: FRONT + Math.PI - 0.45, pitch: 0.01, zoom: 0.35, at: (c) => [0, 0.17, c.dims.rearZ - 0.12] },
  skirts: { angle: FRONT + Math.PI / 2 - 0.22, pitch: 0.03, zoom: 0.45, at: (c, s) => [s * c.dims.W * 0.5, 0.24, 0] },
  fenders: { angle: FRONT + Math.PI / 2 - 0.62, pitch: 0.12, zoom: 0.4, at: 'wheelF' },
  hoodType: { angle: FRONT + 0.42, pitch: 0.44, zoom: 0.4, at: (c) => [0, c.dims.hoodY + 0.03, c.dims.hoodZ] },
  spoiler: { angle: FRONT + Math.PI - 0.62, pitch: 0.3, zoom: 0.4, at: (c) => [0, deckY(c) + 0.06, c.dims.rearZ - 0.28] },
  wing: { angle: FRONT + Math.PI - 0.6, pitch: 0.24, zoom: 0.48, at: (c) => [0, deckY(c) + 0.2, c.dims.rearZ - 0.32] },
  mirrors: { angle: FRONT + 0.62, pitch: 0.14, zoom: 0.27, at: (c, s) => { const m = c.paintU.uMir.value; return [s * Math.abs(m.x), m.y, m.z]; } },
  roofMod: { angle: FRONT + 0.75, pitch: 0.56, zoom: 0.5, at: (c) => [0, c.dims.roofY + 0.06, 0] },
  tips: { angle: FRONT + Math.PI - 0.5, pitch: 0.05, zoom: 0.27, at: 'exhaust' },
  exhaust: { angle: FRONT + Math.PI - 0.5, pitch: 0.06, zoom: 0.32, at: 'exhaust' },
  wheels: { angle: FRONT + Math.PI / 2 - 0.42, pitch: 0.08, zoom: 0.32, at: 'wheelF' },
  wheelSize: { angle: FRONT + Math.PI / 2 - 0.3, pitch: 0.06, zoom: 0.35, at: 'wheelF' },
  rimFinish: { angle: FRONT + Math.PI / 2 - 0.5, pitch: 0.1, zoom: 0.29, at: 'wheelF' },
  rimColor: { angle: FRONT + Math.PI / 2 - 0.5, pitch: 0.1, zoom: 0.29, at: 'wheelF' },
  caliper: { angle: FRONT + Math.PI / 2 - 0.2, pitch: 0.04, zoom: 0.24, at: 'wheelF' },
  brakes: { angle: FRONT + Math.PI / 2 - 0.2, pitch: 0.04, zoom: 0.26, at: 'wheelF' },
  tire: { angle: FRONT + Math.PI / 2 - 0.75, pitch: 0.06, zoom: 0.29, at: 'wheelF' },
  tireLetter: { angle: FRONT + Math.PI / 2 - 0.35, pitch: 0.05, zoom: 0.26, at: 'wheelF' },
  springs: { angle: FRONT + Math.PI / 2 - 0.1, pitch: 0.02, zoom: 0.64, at: (c) => [0, 0.42, 0] },
  headlights: { angle: FRONT + 0.55, pitch: 0.1, zoom: 0.29, at: 'head' },
  taillights: { angle: FRONT + Math.PI - 0.5, pitch: 0.12, zoom: 0.3, at: 'tail' },
  tint: { angle: FRONT + Math.PI / 2 - 0.15, pitch: 0.1, zoom: 0.48, at: (c, s) => [s * c.dims.W * 0.42, c.dims.beltY + 0.18, c.dims.eyeZ] },
  intake: { engine: true },
  ecu: { engine: true },
  boost: { engine: true },
  motor: { engine: true },
  battery: { angle: FRONT + Math.PI / 2 - 0.1, pitch: 0.02, zoom: 0.58, at: (c) => [0, 0.3, 0] },
};
// how each part shows itself off when it is previewed or installed
const KIND = {
  fBumper: 'kit', splitter: 'kit', rBumper: 'kit', diffuser: 'kit', skirts: 'kit', fenders: 'kit', hoodType: 'kit', spoiler: 'kit', wing: 'kit', mirrors: 'kit', roofMod: 'kit', tips: 'kit',
  wheels: 'wheel', wheelSize: 'wheel', rimFinish: 'wheel', rimColor: 'wheel', caliper: 'wheel', brakes: 'wheel', tire: 'wheel', tireLetter: 'wheel',
  springs: 'bounce', stance: 'bounce', weight: 'bounce',
  intake: 'engine', exhaust: 'engine', ecu: 'engine', boost: 'engine', trans: 'engine', diff: 'engine', motor: 'engine', battery: 'engine',
  headlights: 'lights', taillights: 'tails', underglow: 'glow', paint: 'paint', tint: 'glass', plate: 'plate', plateStyle: 'plate',
};
const ease3 = (t) => 1 - Math.pow(1 - t, 3);

// customisation keys that are previewed by changing materials / transforms rather than rebuilding the car
export const LIVE_KEYS = new Set(['color', 'color2', 'wrapColor', 'roofPaint', 'hoodPaint', 'mirrorPaint', 'kitColor', 'wrap', 'finish', 'tintPct', 'rimColor', 'rimFinish', 'caliper', 'camberF', 'camberR', 'trackF', 'trackR', 'stiff', 'rideF', 'rideR',
  'seats', 'seatMat', 'intColor', 'stitch', 'trim', 'steering', 'knob', 'floorMats', 'ambient', '_n']);
const INTERIOR_KEYS = ['seats', 'seatMat', 'intColor', 'stitch', 'trim', 'steering', 'knob', 'floorMats', 'ambient'];

/**
 * Photo-studio reflection environment: a black room with one long overhead softbox, tall strip lights down
 * each side and a faint horizon band. Car paint then carries the long, crisp highlight lines of a studio
 * shoot, which trace the shoulders, arches and roof the way real cars are photographed.
 */
function studioEnvironment() {
  const sc = new THREE.Scene();
  const basic = (hex, k = 1) => new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k), side: THREE.DoubleSide });
  sc.add(new THREE.Mesh(new THREE.SphereGeometry(40, 32, 16), new THREE.MeshBasicMaterial({ color: 0x050506, side: THREE.BackSide })));
  const floor = new THREE.Mesh(new THREE.CircleGeometry(40, 32).rotateX(-Math.PI / 2), basic(0x121316));
  floor.position.y = -0.05;
  sc.add(floor);
  // overhead softbox, long axis along the car's default heading, with a dimmer surround
  const top = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 10).rotateX(Math.PI / 2), basic(0xffffff, 6));
  top.position.set(0, 7.5, 0);
  sc.add(top);
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(6, 13).rotateX(Math.PI / 2), basic(0xdfe6f0, 0.7));
  halo.position.set(0, 7.6, 0);
  sc.add(halo);
  // tall side strips: the bright line that runs along the doors and shoulders
  for (const [x, z, ry, k] of [[11, 0, Math.PI / 2, 3.2], [-11, 0, Math.PI / 2, 2.4], [0, 12, 0, 2.2], [0, -12, 0, 2.6]]) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(ry ? 12 : 9, 0.7).rotateY(ry), basic(0xffffff, k));
    strip.position.set(x, 2.4, z);
    sc.add(strip);
  }
  // a soft cool panel low on one side and a faint horizon band for the lower body
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.2).rotateY(Math.PI / 4), basic(0x9fb8ff, 0.5));
  panel.position.set(-8, 1.4, -8);
  sc.add(panel);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 0.9, 64, 1, true), new THREE.MeshBasicMaterial({ color: 0x2a2d33, side: THREE.BackSide }));
  band.position.y = 0.9;
  sc.add(band);
  return sc;
}

export class GarageScene {
  constructor(renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07080a);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    const pm = new THREE.PMREMGenerator(renderer);
    this.env = pm.fromScene(studioEnvironment(), 0.01, 0.1, 100).texture;
    this.scene.environment = this.env;
    this.scene.environmentIntensity = 0.9;
    this.scene.fog = new THREE.Fog(0x07080a, 14, 34);
    // floor with soft reflective finish and a subtle radial gradient
    const c = document.createElement('canvas');
    c.width = c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
    g.addColorStop(0, '#2a2d32');
    g.addColorStop(0.5, '#15171a');
    g.addColorStop(1, '#07080a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i <= 512; i += 32) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 64), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, metalness: 0.0, envMapIntensity: 0.08 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    // turntable
    this.table = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.7, 0.08, 64), new THREE.MeshStandardMaterial({ color: 0x1a1c20, roughness: 0.3, metalness: 0.6 }));
    disc.position.y = 0.04;
    disc.receiveShadow = true;
    this.table.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.62, 0.015, 8, 128), new THREE.MeshBasicMaterial({ color: 0xff2e4d, toneMapped: false }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.085;
    this.table.add(ring);
    this.ring = ring;
    this.scene.add(this.table);
    // lights
    const key = new THREE.SpotLight(0xffffff, 120, 40, 0.5, 0.6, 1.2);
    key.position.set(4, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0003;
    this.scene.add(key, key.target);
    const rim = new THREE.SpotLight(0x9fc4ff, 140, 40, 0.6, 0.7, 1.2);
    rim.position.set(-6, 5, -6);
    this.scene.add(rim, rim.target);
    const fill = new THREE.HemisphereLight(0xbfc8d6, 0x101010, 0.3);
    this.scene.add(fill);
    // light bars on the ceiling for reflections
    this.bars = [];
    for (let i = -2; i <= 2; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 9), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
      bar.position.set(i * 1.6, 7, 0);
      this.scene.add(bar);
      this.bars.push(bar);
    }
    this.car = null;
    this.angle = 3.35; // front three-quarter view
    this.spin = 0.18;
    this.dragging = false;
    this.zoom = 1;
    this.pitch = 0.17;
    // view targets the camera eases toward, and the current (damped) values
    this.viewName = 'three';
    this.userZoom = 1;
    this.focus = new THREE.Vector3(0, 0.55, 0);
    this.focusT = new THREE.Vector3(0, 0.55, 0);
    this.angleT = null;
    this.pitchT = 0.17;
    this.zoomT = 1;
    // inside the car (interior customisation)
    this.inside = 0;
    this.insideT = 0;
    this.look = { yaw: 0.25, pitch: -0.12 };
    this.fovIn = 62;
    this._q0 = new THREE.Quaternion();
    this._q1 = new THREE.Quaternion();
    this._p0 = new THREE.Vector3();
    this._p1 = new THREE.Vector3();
    this.cockpit = null;
    this.paintTween = null;
    // show effects for previews and installs (see pulse / install)
    this.fx = { t: 0, punch: 0, fov: 0, shake: 0, expo: 0, swing: 0, swingT: -1, dolly: 1, sway: 0, swayK: 0, by: 0, bv: 0, ry: 0, rv: 0, wa: 0, ww: 0, flash: 0, lightsT: -1, lightsAmp: 0, tailT: -1, tailAmp: 0, glowT: -1, sweepT: -1, sweepDur: 1.1, vibe: 0, roll: 0, rollT: 0, lift: 0, liftT: -1, swingFrom: 0, wipeT: -1 };
    this.exposureBoost = 0;
    this.sparks = new Particles(this.table, 520, 0.07);
    this.flames = new Particles(this.table, 220, 0.21);
    this.wave = new Shockwave(this.table);
    this.flashLight = new THREE.PointLight(0xffffff, 0, 3.2, 2);
    this.sweepLight = new THREE.PointLight(0xffffff, 0, 6, 2);
    this.beam = new THREE.SpotLight(0xeef4ff, 0, 10, 0.55, 0.65, 1.4);
    this.table.add(this.flashLight, this.sweepLight, this.beam, this.beam.target);
    this._v = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
  }

  /** Move the camera to a customisation view ('three', 'front', 'rear', 'side', 'wheel', 'top', 'under', 'stance', 'plate', 'interior'). */
  setView(name) {
    const v = VIEWS[name] || VIEWS.three;
    this.shot = null;
    this.viewName = VIEWS[name] ? name : 'three';
    this.angleT = v.angle;
    this.pitchT = v.pitch;
    this.zoomT = v.zoom;
    this.userZoom = 1;
    this.spin = 0;
    clearTimeout(this._resume);
    if (v.spin) this._resume = setTimeout(() => (this.spin = 0.12), 4000);
    this.insideT = v.inside ? 1 : 0;
    if (v.inside) { this.seat = v.inside.seat; this.look.yaw = v.inside.yaw; this.look.pitch = v.inside.pitch; this.fovIn = v.inside.fov ?? 62; this._ensureCockpit(); }
    this._viewFocus();
  }

  /** Fly the camera to a close-up of the part a customisation key changes (or to `fallback` view). */
  focusPart(key, fallback = 'three') {
    let sh = PART_SHOTS[key];
    if (!sh || !this.def) return this.setView(fallback);
    if (sh.engine) sh = { ...engineShot(this.def), at: (c) => engineAt(c, this.def) };
    this.setView(fallback === 'interior' || VIEWS[fallback]?.inside ? 'three' : fallback);
    this.shot = sh;
    this.viewName = 'part';
    this.angleT = sh.angle;
    this.pitchT = sh.pitch;
    this.zoomT = sh.zoom;
    this.spin = 0;
    clearTimeout(this._resume);
    this._viewFocus();
  }

  /** A point on the car (body coordinates, or a named spot) in turntable coordinates. */
  partPoint(at, side = 1, out = new THREE.Vector3()) {
    const c = this.car;
    c.root.updateMatrix();
    c.body.updateMatrix();
    if (at === 'wheelF') {
      const w = c.wheels.find((x) => x.front && x.side === side) || c.wheels[0];
      return out.copy(w.pivot.position).applyMatrix4(c.root.matrix);
    }
    const p = at === 'exhaust' ? (c.lamps.exhaust.length ? lampOf(c.lamps.exhaust, side) : [0, 0.3, c.dims.rearZ])
      : at === 'head' ? lampOf(c.lamps.head, side) : at === 'tail' ? lampOf(c.lamps.tail, side) : at(c, side);
    return out.set(p[0], p[1], p[2]).applyMatrix4(c.body.matrix).applyMatrix4(c.root.matrix);
  }

  /** Where an effect for this key should happen. */
  _fxPoint(key) {
    if (!this.car) return new THREE.Vector3(0, 0.6, 0);
    let sh = PART_SHOTS[key];
    if (sh?.engine) sh = { at: (c) => engineAt(c, this.def) };
    const side = this._facingSide(this.angle);
    if (sh) return this.partPoint(sh.at, side);
    return this.partPoint((c) => [0, c.dims.beltY, 0], side);
  }

  _viewFocus() {
    const v = VIEWS[this.viewName] || VIEWS.three;
    if (!this.car) return;
    if (this.shot) { this.partPoint(this.shot.at, this._facingSide(this.angleT ?? this.angle), this.focusT); return; }
    const d = this.car.dims;
    if (v.focus === 'wheel') {
      // the front wheel on the side facing the camera
      const w = this.car.wheels.find((x) => x.front && x.side === this._facingSide(v.angle)) || this.car.wheels[0];
      this.focusT.set(w.pivot.position.x, w.pivot.position.y, w.pivot.position.z);
    } else {
      this.focusT.set(v.focus[0], v.focus[1], v.focus[2] * (v.fz ? d.L : 1) + (v.fz ? 0 : 0));
      if (v.fz) this.focusT.z = v.focus[2] * d.L;
    }
  }

  /** Which side of the car (+1 / -1 in x) faces the camera at a table angle. */
  _facingSide(angle) {
    const sx = Math.cos(angle), sz = -Math.sin(angle); // car +x in the world
    return sx * Math.cos(AZ) + sz * Math.sin(AZ) > 0 ? 1 : -1;
  }

  wheelZoom(dy) {
    if (this.insideT > 0.5) this.fovIn = clamp(this.fovIn + dy * 0.03, 40, 80);
    else this.userZoom = clamp(this.userZoom + dy * 0.0008, 0.55, 1.6);
  }

  show(def, custom, plate) {
    if (this.car) {
      if (this.cockpit?.group) { this.cockpit.group.parent?.remove(this.cockpit.group); this.cockpitKey = null; }
      this.table.remove(this.car.root);
      disposeCar(this.car);
    }
    this.car = buildPlayerCar(def, custom, plate);
    this.car.builtLower = rideLower(this.car.custom);
    this.paintTween = null;
    this.car.root.position.y = 0.08;
    this.car.bodyBaseY = this.car.body.position.y;
    this.car.mats.head.emissiveIntensity = 0.15;
    this.car.mats.head2.emissiveIntensity = 0.15;
    this.car.mats.drl.emissiveIntensity = 1.6;
    this.car.mats.tail.emissiveIntensity = 1.4;
    this.car.mats.tailLed.emissiveIntensity = 2.6;
    this.car.mats.proj.emissiveIntensity = 0.35;
    this.table.add(this.car.root);
    this.def = def;
    this.dist = Math.max(9.6, def.body.L * 2.05);
    this._viewFocus();
    if (this.insideT > 0) this._ensureCockpit();
  }

  /**
   * Preview changes that need no rebuild: paint colours, finish, sections and livery (colours ease over),
   * tint, rim colour/finish, calipers, stance (ride height, camber, track) and the cabin.
   */
  live(cu) {
    const car = this.car;
    if (!car) return;
    const m = car.mats;
    const target = new THREE.Color(cu.color);
    if (!m.paint.color.equals(target)) {
      // the new colour washes over the body behind a bright edge
      const U = car.paintU;
      U.uWipeFrom.value.copy(m.paint.color);
      U.uWipeGlow.value.copy(target).lerp(new THREE.Color(1, 1, 1), 0.55);
      U.uWipeOn.value = 1;
      U.uWipeZ.value = car.dims.frontZ - 0.2;
      this.fx.wipeT = 0;
      m.paint.color.copy(target);
    }
    const fin = PAINT_FINISHES[cu.finish] || PAINT_FINISHES.metallic;
    const irid = (fin.iridescence ?? 0) > 0;
    if (irid !== (m.paint.iridescence > 0)) m.paint.needsUpdate = true;
    Object.assign(m.paint, { metalness: fin.metalness, roughness: fin.roughness, clearcoat: fin.clearcoat, clearcoatRoughness: fin.clearcoatRoughness, iridescence: fin.iridescence ?? 0, iridescenceIOR: fin.iridescenceIOR ?? 1.3 });
    applyPaint(car, cu);
    const tint = tintFor(cu.tintPct);
    m.glass.color.copy(tint.color);
    m.glass.opacity = tint.opacity;
    const rf = RIM_FINISHES[cu.rimFinish] || RIM_FINISHES.gloss;
    m.rim.color.set(cu.rimColor).lerp(new THREE.Color(0xffffff), rf.whiten ?? 0);
    m.rim.metalness = rf.metalness;
    m.rim.roughness = rf.roughness;
    m.caliper.color.set(cu.caliper);
    // stance: wheels move and lean, the body drops / rakes relative to the height it was built at
    for (const w of car.wheels) {
      const tD = (w.front ? cu.trackF : cu.trackR) / 1000 || 0;
      const cam = (w.front ? cu.camberF : cu.camberR) || 0;
      w.pivot.position.x = w.side * (w.axleTrack + tD);
      w.pivot.rotation.z = w.side * -cam * Math.PI / 180;
    }
    car.body.position.y = car.bodyBaseY = -(rideLower(cu) - car.builtLower);
    car.dims.rake = rideRake(this.def, cu);
    car.body.rotation.x = car.dims.rake;
    // interior choices rebuild only the cabin
    const ik = INTERIOR_KEYS.map((k) => cu[k]).join('|');
    if (ik !== this.interiorKey) {
      this.interiorKey = ik;
      car.custom = { ...car.custom, ...Object.fromEntries(INTERIOR_KEYS.map((k) => [k, cu[k]])) };
      if (this.cockpit?.group && this.insideT > 0) this._buildCockpit();
      else this.cockpitKey = null;
    }
  }

  _ensureCockpit() {
    if (!this.car) return;
    if (!this.cockpit) this.cockpit = new Cockpit(this.renderer);
    if (this.cockpitKey !== this.car) this._buildCockpit();
  }

  _buildCockpit() {
    const car = this.car;
    const shim = { dims: car.dims, model: car, custom: car.custom };
    this.cockpit.build(shim, this.def);
    this.cockpit.setDriver(false);
    this.cockpit.navT = 1e9; // no route to draw in the garage
    this.cockpitKey = car;
  }

  setAspect(a) {
    this.aspect = a;
    this.camera.aspect = a;
    this.camera.updateProjectionMatrix();
  }

  /** Camera distance multiplier so the car fits a free area `freeW` x `freeH` px on a screen `h` px tall. */
  fitFor(freeW, freeH, h) {
    if (!this.def) return 1;
    const size = this.def.body.L * 1.12; // projected length from the 3/4 view, plus a margin
    const k = h / 2 / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)); // px per metre at 1 m
    const dW = (size * k) / (0.88 * freeW); // no wider than 88% of the free area
    const dH = (size * 0.62 * k) / Math.min(0.7 * h, 0.85 * freeH); // and no taller than it
    return Math.min(3, Math.max(1, Math.max(dW, dH) / this.dist));
  }

  /* ------------------------------------------------------------ show effects */
  /** A part was picked in the list: punch the camera in, flash a light on it and let it show itself. */
  pulse(key) {
    if (!this.car) return;
    const fx = this.fx, kind = KIND[key] || 'generic';
    fx.punch = 1;
    const at = this._fxPoint(key);
    this._flash(at, 26);
    if (this.insideT < 0.5) this.sparks.emit(at, 18, { speed: 1.4, color: [1, 1, 1], color2: [1, 0.85, 0.55], life: [0.25, 0.55], grav: 1.5, drag: 2.5, jitter: 0.12 });
    if (kind === 'kit' && fx.ry <= 0.001) { fx.lift = 0.035; fx.liftT = 0; }
    if (kind === 'wheel') fx.ww = Math.max(fx.ww, 12);
    if (kind === 'bounce') fx.bv -= 0.32;
    if (kind === 'lights') { fx.lightsT = 0; fx.lightsAmp = 0.55; }
    if (kind === 'tails') { fx.tailT = 0; fx.tailAmp = 0.6; }
    if (kind === 'glow') fx.glowT = 0;
    if (kind === 'paint') { fx.sweepT = 0; fx.sweepDur = 0.75; }
  }

  /** Switching category: a quick widening of the lens as the camera flies off. */
  whoosh() { this.fx.fov = Math.max(this.fx.fov, 5); }

  /**
   * A part was bought or fitted: the camera swoops round onto it, the studio flashes, sparks fly off the
   * part, a ring races across the turntable, and the part shows off (the car drops onto its new kit, wheels
   * spin up, the suspension bounces, the lamps flash). Returns the effect kind ('engine' asks for a rev).
   */
  install(key, opts = {}) {
    if (!this.car) return 'generic';
    const fx = this.fx, kind = KIND[key] || 'generic';
    const inside = this.insideT > 0.5;
    fx.expo = 1;
    fx.shake = 0.7;
    if (!inside) {
      fx.fov = 7;
      fx.swingT = 0;
      fx.swingFrom = (fx.t % 2 < 1 ? -1 : 1) * 0.6;
    }
    const at = this._fxPoint(key);
    this._flash(at, 70);
    const cc = opts.color ? new THREE.Color(opts.color) : null;
    const col = cc ? [cc.r, cc.g, cc.b] : null;
    if (!inside) {
      this.wave.fire(kind === 'glow' && this.car.underglow ? this.car.underglow.color : 0xff2e4d);
      this.sparks.emit(at, 220, { speed: 3.8, color: col || [1, 0.78, 0.32], color2: col ? [1, 1, 1] : [1, 0.96, 0.82], life: [0.5, 1.35], grav: 5.5 });
    }
    if (kind === 'kit') { fx.lift = 0.17; fx.liftT = 0; }
    if (kind === 'wheel') fx.ww = 36;
    if (kind === 'bounce') { fx.by = -0.05; fx.bv = -0.45; }
    if (kind === 'lights') { fx.lightsT = 0; fx.lightsAmp = 1; }
    if (kind === 'tails') { fx.tailT = 0; fx.tailAmp = 1; }
    if (kind === 'glow') fx.glowT = 0;
    if (kind === 'paint') { fx.sweepT = 0; fx.sweepDur = 1.4; }
    return kind;
  }

  /** Engine rev in progress (0..1 throttle): the body shakes and torque-rolls on its springs. */
  revFx(load) {
    this.fx.vibe = Math.max(this.fx.vibe, 0.25 + load * 0.75);
    this.fx.rollT = -0.012 * load;
  }

  /** Backfire: flames out of each exhaust (blue sparks under an electric car). */
  flameBurst(n = 1) {
    const c = this.car;
    if (!c) return;
    c.root.updateMatrix();
    c.body.updateMatrix();
    const dir = this._v2.set(0, 0.08, 1).transformDirection(c.body.matrix).transformDirection(c.root.matrix);
    if (!c.lamps.exhaust.length) {
      this.sparks.emit(this.partPoint((cc) => [0, 0.2, 0], 1), 40 * n, { speed: 2.2, color: [0.4, 0.75, 1], color2: [0.9, 0.95, 1], life: [0.2, 0.6], grav: 1 });
      return;
    }
    for (const e of c.lamps.exhaust) {
      const o = this.partPoint(() => e, 1, new THREE.Vector3());
      this.flames.emit(o, 16 * n, { speed: 3.8, dir, spread: 0.2, color: [0.95, 0.36, 0.06], color2: [0.22, 0.32, 0.95], life: [0.09, 0.26], grav: -1.5, drag: 5, jitter: 0.02 });
      this.sparks.emit(o, 6 * n, { speed: 3, dir, spread: 0.5, color: [1, 0.7, 0.3], life: [0.2, 0.5], grav: 3 });
    }
    this._flash(this.partPoint(() => c.lamps.exhaust[0], 1), 30, 0xff8a3a);
    this.fx.shake = Math.max(this.fx.shake, 0.35);
  }

  _flash(at, power, color = 0xffffff) {
    this.flashLight.position.copy(at).add(this._v2.set(0, 0.35, 0));
    this.flashLight.color.set(color);
    this.fx.flash = Math.max(this.fx.flash, power);
  }

  /** Advance the show effects (called from update). */
  _updateFx(dt) {
    const fx = this.fx, car = this.car;
    fx.t += dt;
    fx.punch = damp(fx.punch, 0, 6, dt);
    fx.fov = damp(fx.fov, 0, 4.2, dt);
    fx.shake = damp(fx.shake, 0, 5, dt);
    fx.expo = damp(fx.expo, 0, 3.6, dt);
    fx.flash = damp(fx.flash, 0, 5.5, dt);
    fx.vibe = damp(fx.vibe, 0, 3, dt);
    fx.roll = damp(fx.roll, fx.rollT, 6, dt);
    fx.rollT = damp(fx.rollT, 0, 2.5, dt);
    // install swoop: the camera swings round onto the part and pushes in
    fx.swing = 0; fx.dolly = 1;
    if (fx.swingT >= 0) {
      fx.swingT += dt / 1.9;
      const t = fx.swingT;
      fx.swing = fx.swingFrom * (1 - ease3(Math.min(1, t * 1.5)));
      // wide, then slam in tight on the part, hold, and settle back
      fx.dolly = t < 0.28 ? lerp(1.32, 0.8, ease3(t / 0.28)) : t < 0.62 ? 0.8 : lerp(0.8, 1, (x => x * x * (3 - 2 * x))((t - 0.62) / 0.38));
      if (t >= 1) { fx.swingT = -1; fx.dolly = 1; }
    }
    // a slow drift in close-ups, so the shot never sits dead still
    fx.swayK = damp(fx.swayK, this.shot && !this.dragging ? 1 : 0, 1.2, dt);
    fx.sway = Math.sin(fx.t * 0.42) * 0.075 * fx.swayK;
    // the car lifts and drops onto the turntable; the suspension takes the landing
    if (fx.liftT >= 0) {
      fx.liftT += dt / 0.26;
      fx.ry = fx.lift * ease3(Math.min(1, fx.liftT));
      if (fx.liftT >= 1) { fx.liftT = -1; fx.rv = 0; }
    } else if (fx.ry > 0) {
      fx.rv -= 9.8 * dt;
      fx.ry += fx.rv * dt;
      if (fx.ry <= 0) {
        const hit = -fx.rv;
        fx.ry = 0; fx.rv = 0;
        fx.bv -= hit * 0.42;
        fx.shake = Math.max(fx.shake, hit * 0.35);
        if (hit > 1 && car) {
          this.wave.fire(0xffffff, 1.4, 3.6);
          for (const w of car.wheels) this.sparks.emit(this._v.copy(w.pivot.position).setY(0.12), 10, { speed: 1.2, color: [0.75, 0.75, 0.78], life: [0.3, 0.7], grav: 1.2, drag: 3 });
        }
      }
    }
    const a = -170 * fx.by - 8.5 * fx.bv;
    fx.bv += a * dt;
    fx.by += fx.bv * dt;
    // wheels spin up and coast down
    fx.wa += fx.ww * dt;
    fx.ww *= Math.exp(-1.1 * dt);
    if (fx.ww < 0.05) fx.ww = 0;
    // lamp flashes
    const pulse = (t, c) => Math.exp(-(((t - c) / 0.07) ** 2));
    let lm = 0, tm = 0, gm = 0;
    if (fx.lightsT >= 0) { fx.lightsT += dt; lm = fx.lightsAmp * (pulse(fx.lightsT, 0.09) + pulse(fx.lightsT, 0.36)); if (fx.lightsT > 0.8) fx.lightsT = -1; }
    if (fx.tailT >= 0) { fx.tailT += dt; tm = fx.tailAmp * (pulse(fx.tailT, 0.09) + pulse(fx.tailT, 0.36) + pulse(fx.tailT, 0.63)); if (fx.tailT > 1) fx.tailT = -1; }
    if (fx.glowT >= 0) { fx.glowT += dt; gm = Math.exp(-fx.glowT * 3) * Math.min(1, fx.glowT * 12); if (fx.glowT > 1.5) fx.glowT = -1; }
    if (car && fx.wipeT >= 0) {
      fx.wipeT += dt / 0.8;
      const U = car.paintU;
      U.uWipeZ.value = lerp(car.dims.frontZ - 0.2, car.dims.rearZ + 0.2, Math.min(1, fx.wipeT) ** 1.15);
      if (fx.wipeT >= 1) { fx.wipeT = -1; U.uWipeOn.value = 0; }
    }
    if (car) {
      const m = car.mats;
      m.head.emissiveIntensity = 0.15 + lm * 7;
      m.head2.emissiveIntensity = 0.15 + lm * 7;
      m.proj.emissiveIntensity = 0.35 + lm * 9;
      m.drl.emissiveIntensity = 1.6 + lm * 3;
      m.refl.emissiveIntensity = lm * 1.2;
      m.tailLed.emissiveIntensity = 2.6 + tm * 9;
      m.tail.emissiveIntensity = 1.4 + tm * 4;
      if (car.underglow) {
        car.underglow.light.intensity = 28 * (1 + gm * 3);
        car.underglow.plane.material.color.copy(car.underglow.color).multiplyScalar(1.6 * (1 + gm * 1.6));
      }
      // headlight beams on the floor during a flash
      this.beam.intensity = lm * 95;
      if (lm > 0.001) {
        this.partPoint((c) => [0, c.lamps.head[0]?.[1] ?? 0.6, c.dims.frontZ - 0.1], 1, this.beam.position);
        this.partPoint((c) => [0, 0, c.dims.frontZ - 4], 1, this.beam.target.position);
      }
      // a light swept along the car after a respray
      this.sweepLight.intensity = 0;
      if (fx.sweepT >= 0) {
        fx.sweepT += dt;
        const p = fx.sweepT / fx.sweepDur;
        if (p >= 1) fx.sweepT = -1;
        else {
          const side = this._facingSide(this.angle);
          this.partPoint((c) => [side * c.dims.W * 0.95, c.dims.roofY + 0.45, lerp(c.dims.frontZ - 0.5, c.dims.rearZ + 0.5, p)], side, this.sweepLight.position);
          this.sweepLight.intensity = 140 * Math.sin(Math.PI * p);
        }
      }
      // the car on its springs: drop, bounce, engine shake and torque roll
      car.root.position.y = 0.08 + fx.ry;
      car.body.position.y = (car.bodyBaseY ?? car.body.position.y) + fx.by;
      car.body.position.x = Math.sin(fx.t * 83) * 0.0014 * fx.vibe;
      car.body.rotation.z = fx.roll + Math.sin(fx.t * 57) * 0.0022 * fx.vibe;
    }
    this.flashLight.intensity = fx.flash;
    this.exposureBoost = fx.expo * 0.5 + lm * 0.12;
    this.ring.material.color.setHex(0xff2e4d).multiplyScalar(1 + fx.expo * 3.5);
    this.sparks.update(dt);
    this.flames.update(dt);
    this.wave.update(dt);
  }

  drag(dx, dy) {
    if (this.insideT > 0.5) {
      // inside: look around the cabin
      this.look.yaw = clamp(this.look.yaw - dx * 0.004, -2.4, 2.4);
      this.look.pitch = clamp(this.look.pitch - dy * 0.003, -0.8, 0.5);
      return;
    }
    this.angleT = null;
    this.angle += dx * 0.008;
    this.pitch = Math.max(0.02, Math.min(0.7, this.pitch + dy * 0.003));
    this.pitchT = this.pitch;
    this.spin = 0;
    clearTimeout(this._resume);
    if ((VIEWS[this.viewName] || VIEWS.three).spin) this._resume = setTimeout(() => (this.spin = 0.12), 3500);
  }

  update(dt, offsetX = 0, fit = 1, offsetY = 0) {
    this._updateFx(dt);
    const fx = this.fx;
    // ease toward the view's angle / pitch / distance / focus point, then any spin on top
    if (this.angleT !== null) {
      this.angle = dampAngle(this.angle, this.angleT, 5, dt);
      if (Math.abs(((this.angleT - this.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI) < 0.002) this.angleT = null;
    }
    this.angle += this.spin * dt;
    this.pitch = damp(this.pitch, this.pitchT, 5, dt);
    this.zoom = damp(this.zoom, this.zoomT * this.userZoom, 5, dt);
    this.focus.lerp(this.focusT, 1 - Math.exp(-6 * dt));
    this.inside = damp(this.inside, this.insideT, 4.2, dt);
    if (Math.abs(this.inside - this.insideT) < 0.002) this.inside = this.insideT;
    const rot = this.angle + fx.swing + fx.sway;
    this.table.rotation.y = rot;
    // close-ups frame the part, so they only partly back off to fit the whole car beside the panels
    const fitK = this.shot ? 1 + (fit - 1) * 0.3 : fit;
    let d = this.dist * this.zoom * fitK * (1 - fx.punch * 0.11) * fx.dolly;
    // on a big swing between close-ups the camera pulls out and orbits the whole car, then pushes in on the
    // new part, instead of cutting through the bodywork
    const left = this.angleT === null ? 0 : Math.abs(((this.angleT - this.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    const away = Math.min(1, left / 0.9);
    const focus = this._p1.copy(this.focus).lerp(this._v2.set(0, 0.5, 0), away * 0.85);
    d = lerp(d, Math.max(d, this.dist * fitK * 0.92), away);
    const cam = this.camera;
    const f = this._p0.copy(focus).applyAxisAngle(THREE.Object3D.DEFAULT_UP, rot);
    f.y += 0.08;
    const lift = 0.25 * Math.min(1, this.zoom * 1.2);
    const pitch = this.pitch + Math.sin(fx.t * 0.31 + 1) * 0.02 * fx.swayK;
    cam.position.set(f.x + Math.cos(AZ) * d * Math.cos(pitch), f.y + lift + Math.sin(pitch) * d, f.z + Math.sin(AZ) * d * Math.cos(pitch));
    cam.lookAt(f);
    if (fx.shake > 0.002) {
      const k = fx.shake * 0.028 * Math.min(1.5, d / 6);
      cam.position.x += (Math.sin(fx.t * 41) + Math.sin(fx.t * 67) * 0.6) * k;
      cam.position.y += (Math.sin(fx.t * 53 + 1) + Math.sin(fx.t * 29) * 0.5) * k;
    }
    cam.fov = 32 + fx.fov;
    // inside the car: blend toward the driver's eye, looking along the car
    const ins = this.inside;
    const ck = this.cockpit;
    if (ck?.group) ck.setVisible(ins > 0.02);
    // from inside, the simple stand-in seats and the roof skin give way to the full cabin
    if (this.car?.meshes.interior) this.car.meshes.interior.visible = ins < 0.5;
    if (this.car?.meshes.cabinTop) this.car.meshes.cabinTop.visible = ins < 0.5;
    if (ins > 0.001 && this.car) {
      const e = ins * ins * (3 - 2 * ins);
      const body = this.car.body;
      body.updateWorldMatrix(true, false);
      const D = this.car.dims;
      // eye points: the driver's seat, the passenger's, or under the mirror looking back at the front seats
      const st = this.seat;
      const eye = (st === 'dash' ? this._p1.set(0.1, D.eyeY - 0.08, D.eyeZ - 0.45)
        : st === 'passenger' ? this._p1.set(D.cabinW * 0.44, D.eyeY + 0.06, D.eyeZ + 0.02)
          : this._p1.set(-(D.cabinW * 0.46) + 0.06, D.eyeY + 0.02, D.eyeZ + 0.12)).applyMatrix4(body.matrixWorld);
      const bq = body.getWorldQuaternion(this._q1);
      const lookQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(this.look.pitch, this.look.yaw, 0, 'YXZ'));
      bq.multiply(lookQ);
      // ease the eye and look direction, so moving between cabin views pans instead of jumping
      const k = 1 - Math.exp(-9 * dt);
      if (!this._lookQ || ins < 0.999) { this._lookQ = bq.clone(); this._eyeP = eye.clone(); }
      else { this._lookQ.slerp(bq, k); this._eyeP.lerp(eye, k); }
      this._q0.copy(cam.quaternion);
      cam.position.lerp(this._eyeP, e);
      cam.quaternion.copy(this._q0).slerp(this._lookQ, e);
      cam.fov = lerp(32 + fx.fov, this.fovIn, e);
      if (ck?.group && ck.visible) {
        const idle = this.def.phys.idle;
        ck.update(1 / 60, { phys: { steerAngle: 0, rpm: idle, speed: 0, gear: 0, boost: 0, isTurbo: !!this.def.engine.turbo, throttleEff: 0, axS: 0, ayS: 0 }, steer: 0, proj: { s: 0 } },
          { night: 0.85, units: 'mph', hours: 21, rain: 0, manual: false, indicator: 0, blink: false, handbrake: false, dome: false });
      }
    }
    cam.updateProjectionMatrix();
    // shift the car sideways on screen to make room for side panels
    // (setViewOffset also sets the camera aspect, so it must be given the real screen proportions)
    const a = this.aspect || 1;
    cam.setViewOffset(1000 * a, 1000, offsetX * 1000 * a, offsetY * 1000, 1000 * a, 1000);
    // the ceiling bars only work as a backdrop on wide screens; framed low on a tall screen they cut across the header
    const showBars = offsetY === 0 && a > 1.1;
    for (const b of this.bars) b.visible = showBars;
    if (this.car) {
      for (const w of this.car.wheels) w.spin.rotation.x = -fx.wa;
    }
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }
}
