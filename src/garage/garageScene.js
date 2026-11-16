// Showroom scene: rotating turntable, studio lighting and reflections for the garage/customisation screens.
import * as THREE from 'three';
import { buildPlayerCar, disposeCar, applyPaint, PAINT_FINISHES, RIM_FINISHES, tintFor, rideLower, rideRake } from '../vehicles/carBuilder.js';
import { damp, dampAngle, clamp, lerp } from '../core/utils.js';
import { Cockpit } from '../camera/cockpit.js';

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
  }

  /** Move the camera to a customisation view ('three', 'front', 'rear', 'side', 'wheel', 'top', 'under', 'stance', 'plate', 'interior'). */
  setView(name) {
    const v = VIEWS[name] || VIEWS.three;
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

  _viewFocus() {
    const v = VIEWS[this.viewName] || VIEWS.three;
    if (!this.car) return;
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
    this.car.mats.head.emissiveIntensity = 0.15;
    this.car.mats.head2.emissiveIntensity = 0.15;
    this.car.mats.drl.emissiveIntensity = 1.6;
    this.car.mats.tail.emissiveIntensity = 1.4;
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
    if (!m.paint.color.equals(target)) this.paintTween = { from: m.paint.color.clone(), to: target, t: 0 };
    const fin = PAINT_FINISHES[cu.finish] || PAINT_FINISHES.metallic;
    const irid = (fin.iridescence ?? 0) > 0;
    if (irid !== (m.paint.iridescence > 0)) m.paint.needsUpdate = true;
    Object.assign(m.paint, { metalness: fin.metalness, roughness: fin.roughness, clearcoat: fin.clearcoat, clearcoatRoughness: fin.clearcoatRoughness, iridescence: fin.iridescence ?? 0, iridescenceIOR: fin.iridescenceIOR ?? 1.3 });
    applyPaint(car, { ...cu, color: this.paintTween ? this.paintTween.to.getStyle() : cu.color });
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
    car.body.position.y = -(rideLower(cu) - car.builtLower);
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
    if (this.paintTween) {
      const tw = this.paintTween;
      tw.t = Math.min(1, tw.t + dt / 0.35);
      const e = tw.t * tw.t * (3 - 2 * tw.t);
      this.car?.mats.paint.color.copy(tw.from).lerp(tw.to, e);
      if (tw.t >= 1) this.paintTween = null;
    }
    this.table.rotation.y = this.angle;
    const d = this.dist * this.zoom * fit;
    const cam = this.camera;
    const f = this._p0.copy(this.focus).applyAxisAngle(THREE.Object3D.DEFAULT_UP, this.angle);
    f.y += 0.08;
    const lift = 0.25 * Math.min(1, this.zoom * 1.2);
    cam.position.set(f.x + Math.cos(AZ) * d * Math.cos(this.pitch), f.y + lift + Math.sin(this.pitch) * d, f.z + Math.sin(AZ) * d * Math.cos(this.pitch));
    cam.lookAt(f);
    cam.fov = 32;
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
      cam.fov = lerp(32, this.fovIn, e);
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
      for (const w of this.car.wheels) w.spin.rotation.x = 0;
    }
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }
}
