// Showroom scene: rotating turntable, studio lighting and reflections for the garage/customisation screens.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildPlayerCar, disposeCar } from '../vehicles/carBuilder.js';
import { damp } from '../core/utils.js';

export class GarageScene {
  constructor(renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07080a);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    const pm = new THREE.PMREMGenerator(renderer);
    this.env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.env;
    this.scene.environmentIntensity = 0.38;
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
    const key = new THREE.SpotLight(0xffffff, 200, 40, 0.5, 0.6, 1.2);
    key.position.set(4, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0003;
    this.scene.add(key, key.target);
    const rim = new THREE.SpotLight(0x9fc4ff, 140, 40, 0.6, 0.7, 1.2);
    rim.position.set(-6, 5, -6);
    this.scene.add(rim, rim.target);
    const fill = new THREE.HemisphereLight(0xbfc8d6, 0x101010, 0.6);
    this.scene.add(fill);
    // light bars on the ceiling for reflections
    for (let i = -2; i <= 2; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 9), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
      bar.position.set(i * 1.6, 7, 0);
      this.scene.add(bar);
    }
    this.car = null;
    this.angle = 0.6;
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
    this.car.mats.head.emissiveIntensity = 1.2;
    this.car.mats.tail.emissiveIntensity = 1.4;
    this.table.add(this.car.root);
    this.def = def;
    this.dist = Math.max(10.8, def.body.L * 2.3);
  }

  setAspect(a) {
    this.camera.aspect = a;
    this.camera.updateProjectionMatrix();
  }

  drag(dx, dy) {
    this.angle += dx * 0.008;
    this.pitch = Math.max(0.02, Math.min(0.6, this.pitch + dy * 0.003));
    this.spin = 0;
    clearTimeout(this._resume);
    this._resume = setTimeout(() => (this.spin = 0.18), 2500);
  }

  update(dt, offsetX = 0, fit = 1) {
    this.angle += this.spin * dt;
    this.table.rotation.y = this.angle;
    const d = this.dist * this.zoom * fit;
    const cam = this.camera;
    const tx = Math.cos(0.9) * d, tz = Math.sin(0.9) * d;
    cam.position.set(tx * Math.cos(this.pitch), 0.8 + Math.sin(this.pitch) * d, tz * Math.cos(this.pitch));
    cam.lookAt(0, 0.55, 0);
    // shift the car sideways on screen to make room for side panels
    cam.setViewOffset(1000, 1000, offsetX * 1000, 0, 1000, 1000);
    if (this.car) {
      for (const w of this.car.wheels) w.spin.rotation.x = 0;
    }
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }
}
