// Light glows (tail/head/indicator/street lamps), tyre smoke, sparks, exhaust flames and rain.
import * as THREE from 'three';
import { radialTexture } from '../world/textures.js';
import { clamp, smoothstep } from '../core/utils.js';

const GLOW_VERT = /* glsl */ `
attribute vec3 color;
attribute float size;
varying vec3 vColor;
uniform float scale;
void main(){
  vColor = color;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(size * scale / -mv.z, 0.0, 180.0);
}`;
const GLOW_FRAG = /* glsl */ `
uniform sampler2D map;
varying vec3 vColor;
void main(){
  float a = texture2D(map, gl_PointCoord).a;
  gl_FragColor = vec4(vColor * a, a);
}`;

// Anamorphic flares: a thin horizontal line through each bright light, drawn as one screen-aligned quad per glow
// (instanced over the glow buffers). Only the strongest lights reach full length.
const STREAK_VERT = /* glsl */ `
attribute vec2 corner;
attribute vec3 iPos;
attribute vec3 iCol;
attribute float iSize;
uniform float scale; uniform vec2 viewport; uniform float strength; uniform float len;
varying vec3 vC; varying vec2 vUv;
void main(){
  vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
  vec4 clip = projectionMatrix * mv;
  float peak = max(iCol.r, max(iCol.g, iCol.b));
  float k = smoothstep(0.22, 0.9, peak) * strength;
  float px = iSize * scale / max(-mv.z, 0.1);
  float w = clamp(px * len * (0.5 + k), 0.0, viewport.x * 0.45) * step(0.004, k);
  float h = clamp(px * 0.06, 1.0, 5.0);
  gl_Position = clip + vec4(corner * vec2(w, h) / (viewport * 0.5) * clip.w, 0.0, 0.0);
  float l = dot(iCol, vec3(0.3, 0.5, 0.2));
  vC = mix(iCol, l * vec3(0.55, 0.75, 1.15), 0.4) * k;
  vUv = corner;
}`;
const STREAK_FRAG = /* glsl */ `
varying vec3 vC; varying vec2 vUv;
void main(){
  float x = 1.0 - abs(vUv.x);
  float a = x * x * x * exp(-vUv.y * vUv.y * 3.5);
  gl_FragColor = vec4(vC * a, a);
}`;

export class Glows {
  constructor(scene, max = 900) {
    this.max = max;
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.mat = new THREE.ShaderMaterial({
      vertexShader: GLOW_VERT, fragmentShader: GLOW_FRAG,
      uniforms: { map: { value: radialTexture(64, 0.05, 2.2) }, scale: { value: 600 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    scene.add(this.points);
    // flares share the glow buffers
    const sg = new THREE.InstancedBufferGeometry();
    sg.setAttribute('corner', new THREE.BufferAttribute(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), 2));
    sg.setIndex([0, 1, 2, 0, 2, 3]);
    sg.setAttribute('iPos', new THREE.InstancedBufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    sg.setAttribute('iCol', new THREE.InstancedBufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    sg.setAttribute('iSize', new THREE.InstancedBufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    sg.instanceCount = 0;
    this.streakMat = new THREE.ShaderMaterial({
      vertexShader: STREAK_VERT, fragmentShader: STREAK_FRAG,
      uniforms: { scale: { value: 600 }, viewport: { value: new THREE.Vector2(1280, 720) }, strength: { value: 0 }, len: { value: 6 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.streaks = new THREE.Mesh(sg, this.streakMat);
    this.streaks.frustumCulled = false;
    this.streaks.renderOrder = 6;
    scene.add(this.streaks);
    this.n = 0;
  }
  begin() { this.n = 0; }
  add(x, y, z, r, g, b, size) {
    if (this.n >= this.max) return;
    const i = this.n++;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.col[i * 3] = r; this.col[i * 3 + 1] = g; this.col[i * 3 + 2] = b;
    this.size[i] = size;
  }
  /** streak: 0..1 flare strength (night), width: viewport width in px */
  end(camera, height, streak = 0, width = height * 1.78) {
    const g = this.points.geometry;
    g.setDrawRange(0, this.n);
    g.attributes.position.needsUpdate = true;
    g.attributes.color.needsUpdate = true;
    g.attributes.size.needsUpdate = true;
    // projection scale so `size` is in world metres
    const sc = height / (2 * Math.tan((camera.fov * Math.PI) / 360));
    this.mat.uniforms.scale.value = sc;
    const sg = this.streaks.geometry;
    this.streaks.visible = streak > 0.01 && this.n > 0;
    sg.instanceCount = this.n;
    sg.attributes.iPos.needsUpdate = true;
    sg.attributes.iCol.needsUpdate = true;
    sg.attributes.iSize.needsUpdate = true;
    const u = this.streakMat.uniforms;
    u.scale.value = sc;
    u.strength.value = streak;
    u.viewport.value.set(width, height);
  }
}

/** Generic CPU particle system rendered as soft points. */
export class Particles {
  constructor(scene, max, { additive = false, texture, sizeMul = 1, depthBias = 0 } = {}) {
    this.max = max;
    this.p = [];
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 4);
    this.size = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('rgba', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.mat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute vec4 rgba; attribute float size; varying vec4 vC; uniform float scale; uniform float depthBias;
        void main(){ vC = rgba; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = clamp(size * scale / -mv.z, 0.0, 400.0);
          // pull the sprite toward the camera by part of its size so the ground doesn't slice it with a hard edge
          mv.z = min(mv.z + size * depthBias, -0.05);
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D map; varying vec4 vC;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vC.a; if (a < 0.003) discard; gl_FragColor = vec4(vC.rgb, a);
          #include <colorspace_fragment>
        }`,
      uniforms: { map: { value: texture || radialTexture(64, 0.0, 1.4) }, scale: { value: 600 }, depthBias: { value: depthBias } },
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 4;
    scene.add(this.points);
    for (let i = 0; i < max; i++) this.p.push({ life: 0 });
    this.next = 0;
    this.sizeMul = sizeMul;
  }
  emit(x, y, z, vx, vy, vz, life, size, grow, r, g, b, a, gravity = 0, drag = 0) {
    const q = this.p[this.next];
    this.next = (this.next + 1) % this.max;
    Object.assign(q, { x, y, z, vx, vy, vz, life, max: life, size, grow, r, g, b, a, gravity, drag });
  }
  update(dt, camera, height) {
    let n = 0;
    for (const q of this.p) {
      if (q.life <= 0) continue;
      q.life -= dt;
      if (q.life <= 0) continue;
      q.vy -= q.gravity * dt;
      const k = Math.max(0, 1 - q.drag * dt);
      q.vx *= k; q.vy *= k; q.vz *= k;
      q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
      q.size += q.grow * dt;
      const t = q.life / q.max;
      this.pos[n * 3] = q.x; this.pos[n * 3 + 1] = q.y; this.pos[n * 3 + 2] = q.z;
      this.col[n * 4] = q.r; this.col[n * 4 + 1] = q.g; this.col[n * 4 + 2] = q.b; this.col[n * 4 + 3] = q.a * Math.min(1, t * 2.5);
      this.size[n] = q.size * this.sizeMul;
      n++;
    }
    const g = this.points.geometry;
    g.setDrawRange(0, n);
    g.attributes.position.needsUpdate = true;
    g.attributes.rgba.needsUpdate = true;
    g.attributes.size.needsUpdate = true;
    this.mat.uniforms.scale.value = height / (2 * Math.tan((camera.fov * Math.PI) / 360));
  }
  clear() { for (const q of this.p) q.life = 0; }
}

/** GPU-animated rain streaks around the camera. */
export class Rain {
  constructor(scene, count = 5000) {
    const pos = new Float32Array(count * 2 * 3);
    const seed = new Float32Array(count * 2 * 4);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 60 - 30, y = Math.random() * 30, z = Math.random() * 70 - 35;
      const sp = 0.8 + Math.random() * 0.4;
      for (let k = 0; k < 2; k++) {
        const o = (i * 2 + k);
        pos[o * 3] = x; pos[o * 3 + 1] = y; pos[o * 3 + 2] = z;
        seed[o * 4] = k; seed[o * 4 + 1] = sp; seed[o * 4 + 2] = Math.random(); seed[o * 4 + 3] = 0;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(seed, 4));
    this.mat = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        attribute vec4 seed; uniform float time; uniform vec3 cam; uniform vec3 vel; uniform float amount;
        varying float vA;
        void main(){
          vec3 box = vec3(60.0, 30.0, 70.0);
          vec3 p = position;
          p.y -= time * 11.0 * seed.y;
          vec3 rel = mod(p - cam + box * 0.5, box) - box * 0.5;
          vec3 wp = cam + rel;
          // streak: tail end trails along relative wind (fall + car motion)
          vec3 wind = vec3(0.0, -11.0 * seed.y, 0.0) - vel;
          wp += seed.x * wind * 0.011;
          float dist = length(rel);
          vA = step(seed.z, amount) * (0.12 + 0.2 * seed.x) * smoothstep(1.5, 6.0, dist);
          gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 color; varying float vA;
        void main(){ if (vA < 0.01) discard; gl_FragColor = vec4(color, vA);
          #include <colorspace_fragment>
        }`,
      uniforms: { time: { value: 0 }, cam: { value: new THREE.Vector3() }, vel: { value: new THREE.Vector3() }, amount: { value: 0 }, color: { value: new THREE.Color(0.75, 0.8, 0.88) } },
      transparent: true, depthWrite: false,
    });
    this.lines = new THREE.LineSegments(g, this.mat);
    this.lines.frustumCulled = false;
    this.lines.renderOrder = 6;
    scene.add(this.lines);
    this.t = 0;
  }
  update(dt, camPos, vel, amount, brightness) {
    this.t += dt;
    const u = this.mat.uniforms;
    u.time.value = this.t;
    u.cam.value.copy(camPos);
    u.vel.value.copy(vel);
    u.amount.value = amount;
    u.color.value.setScalar(0.35 + brightness * 0.5);
    this.lines.visible = amount > 0.01;
  }
  setCount(frac) {
    this.lines.geometry.setDrawRange(0, Math.floor(this.lines.geometry.attributes.position.count * frac));
  }
}

export const LAMP_COLORS = {
  tail: [1.0, 0.07, 0.04],
  head: [1.0, 0.95, 0.85],
  ind: [1.0, 0.55, 0.05],
};
export { smoothstep, clamp };
