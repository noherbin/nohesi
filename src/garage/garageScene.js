// Showroom scene: rotating turntable, studio lighting and reflections for the garage/customisation screens.
import * as THREE from 'three';
import { buildPlayerCar, disposeCar } from '../vehicles/carBuilder.js';
import { damp } from '../core/utils.js';

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
  }

  show(def, custom, plate) {
    if (this.car) {
      this.table.remove(this.car.root);
      disposeCar(this.car);
    }
    this.car = buildPlayerCar(def, custom, plate);
    this.car.root.position.y = 0.08;
    this.car.mats.head.emissiveIntensity = 0.15;
    this.car.mats.drl.emissiveIntensity = 1.6;
    this.car.mats.tail.emissiveIntensity = 1.4;
    this.table.add(this.car.root);
    this.def = def;
    this.dist = Math.max(9.6, def.body.L * 2.05);
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
    this.angle += dx * 0.008;
    this.pitch = Math.max(0.02, Math.min(0.6, this.pitch + dy * 0.003));
    this.spin = 0;
    clearTimeout(this._resume);
    this._resume = setTimeout(() => (this.spin = 0.18), 2500);
  }

  update(dt, offsetX = 0, fit = 1, offsetY = 0) {
    this.angle += this.spin * dt;
    this.table.rotation.y = this.angle;
    const d = this.dist * this.zoom * fit;
    const cam = this.camera;
    const tx = Math.cos(0.9) * d, tz = Math.sin(0.9) * d;
    cam.position.set(tx * Math.cos(this.pitch), 0.8 + Math.sin(this.pitch) * d, tz * Math.cos(this.pitch));
    cam.lookAt(0, 0.55, 0);
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
