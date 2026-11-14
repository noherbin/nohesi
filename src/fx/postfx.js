// Post-processing chain:
//   scene (HDR) -> bloom (high/ultra) -> radial speed blur / chromatic fringe -> tone mapping
//   -> colour grade (contrast, saturation, split toning, sun flare, vignette, grain) in display space.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const SpeedShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0 },
    center: { value: new THREE.Vector2(0.5, 0.56) },
    fringe: { value: 0 },
    aspect: { value: 1.7 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float strength; uniform vec2 center; uniform float fringe; uniform float aspect;
    varying vec2 vUv;
    void main(){
      vec2 dir = vUv - center;
      vec2 dA = dir * vec2(aspect, 1.0);
      float d = length(dA) / aspect * 1.6;
      float k = strength * smoothstep(0.18, 0.85, d);
      vec4 col;
      if (k > 0.0005) {
        vec4 acc = vec4(0.0);
        for (int i = 0; i < 9; i++) {
          float t = float(i) / 8.0;
          acc += texture2D(tDiffuse, vUv - dir * k * t);
        }
        col = acc / 9.0;
      } else {
        col = texture2D(tDiffuse, vUv);
      }
      if (fringe > 0.0) {
        float r = texture2D(tDiffuse, vUv + dir * fringe * d).r;
        float b = texture2D(tDiffuse, vUv - dir * fringe * d).b;
        col.r = mix(col.r, r, 0.6);
        col.b = mix(col.b, b, 0.6);
      }
      gl_FragColor = col;
    }`,
};

// Display-space grade. Runs after OutputPass, so values are already tone mapped and sRGB encoded.
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    contrast: { value: 1.08 },
    saturation: { value: 1.08 },
    shadowTint: { value: new THREE.Color(0.0, 0.012, 0.03) },
    highTint: { value: new THREE.Color(0.03, 0.012, -0.012) },
    vignette: { value: 0.35 },
    aspect: { value: 1.7 },
    grain: { value: 0.025 },
    time: { value: 0 },
    sunPos: { value: new THREE.Vector2(-9, -9) },
    sunColor: { value: new THREE.Color(1, 0.85, 0.6) },
    flare: { value: 0 },
  },
  vertexShader: SpeedShader.vertexShader,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float contrast; uniform float saturation;
    uniform vec3 shadowTint; uniform vec3 highTint; uniform float vignette; uniform float aspect;
    uniform float grain; uniform float time; uniform vec2 sunPos; uniform vec3 sunColor; uniform float flare;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float lum(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      // S-curve contrast around mid grey
      c = clamp((c - 0.5) * contrast + 0.5, 0.0, 1.0);
      c = mix(c, c * c * (3.0 - 2.0 * c), (contrast - 1.0) * 1.5);
      float L = lum(c);
      // split toning: cool shadows, warm highlights
      c += shadowTint * (1.0 - smoothstep(0.0, 0.5, L)) + highTint * smoothstep(0.45, 1.0, L);
      c = mix(vec3(lum(c)), c, saturation);
      // sun flare: visibility from how bright the sky is right at the sun
      if (flare > 0.001) {
        vec2 sp = sunPos;
        float vis = 0.0;
        if (sp.x > -0.1 && sp.x < 1.1 && sp.y > -0.1 && sp.y < 1.1) {
          vec2 px = vec2(0.004 / aspect, 0.004);
          for (int i = 0; i < 5; i++) {
            float a = float(i) * 1.2566;
            vec3 s = texture2D(tDiffuse, clamp(sp + vec2(cos(a), sin(a)) * px * float(i > 0 ? 1 : 0), 0.001, 0.999)).rgb;
            vis += smoothstep(0.82, 0.97, lum(s));
          }
          vis /= 5.0;
        }
        float f = flare * vis;
        if (f > 0.001) {
          vec2 toC = vec2(0.5) - sp;
          vec2 uvA = (vUv - sp) * vec2(aspect, 1.0);
          float dist = length(uvA);
          // soft halo + anamorphic streak
          vec3 add = sunColor * (exp(-dist * 9.0) * 0.55 + exp(-abs(uvA.y) * 160.0) * exp(-abs(uvA.x) * 2.4) * 0.35);
          // ghosts along the line through the screen centre
          for (int i = 1; i <= 4; i++) {
            float t = float(i) * 0.42;
            vec2 gp = sp + toC * t * 2.0;
            float r = 0.025 + 0.02 * float(i);
            float gd = length((vUv - gp) * vec2(aspect, 1.0));
            vec3 tint = i == 1 ? vec3(0.6, 0.8, 1.0) : i == 2 ? vec3(1.0, 0.7, 0.4) : i == 3 ? vec3(0.5, 1.0, 0.7) : vec3(0.9, 0.6, 1.0);
            add += tint * sunColor * smoothstep(r, r * 0.6, gd) * 0.06 * (1.0 - smoothstep(0.0, 1.2, length(toC)) * 0.5);
          }
          // ring halo
          add += sunColor * vec3(0.8, 0.9, 1.0) * smoothstep(0.012, 0.0, abs(dist - 0.32)) * 0.05;
          c += add * f;
        }
      }
      // vignette
      vec2 dA = (vUv - 0.5) * vec2(aspect, 1.0);
      float v = 1.0 - smoothstep(0.45, 1.25, length(dA) / aspect * 1.9);
      c *= mix(1.0, v, vignette);
      // film grain (subtle, luminance weighted)
      float n = hash(vUv * 1000.0 + fract(time) * 37.0) - 0.5;
      c += n * grain * (1.0 - L * 0.6);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`,
};

export class PostFX {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.enabled = true;
    this.samples = 4;
    this.bloomOn = false;
    this._build();
  }

  _build() {
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: this.samples });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(Math.max(2, size.x / 2), Math.max(2, size.y / 2)), 0.35, 0.55, 0.92);
    this.bloomPass.enabled = this.bloomOn;
    this.speedPass = new ShaderPass(SpeedShader);
    this.outPass = new OutputPass();
    this.gradePass = new ShaderPass(GradeShader);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.speedPass);
    this.composer.addPass(this.outPass);
    this.composer.addPass(this.gradePass);
  }

  setScene(scene, camera) {
    this.renderPass.scene = scene;
    this.renderPass.camera = camera;
  }

  setSamples(n) {
    if (n === this.samples) return;
    this.samples = n;
    this.composer.dispose();
    this._build();
  }

  setBloom(on) {
    this.bloomOn = on;
    this.bloomPass.enabled = on;
  }

  setSize(w, h, pr) {
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.speedPass.uniforms.aspect.value = w / h;
    this.gradePass.uniforms.aspect.value = w / h;
  }

  /** blur 0..1 based on speed, vignette 0..1 */
  set(blur, vignette, fringe) {
    const u = this.speedPass.uniforms;
    u.strength.value = blur * 0.075;
    u.fringe.value = fringe;
    this.gradePass.uniforms.vignette.value = vignette;
  }

  /**
   * Per-frame look: g = { night 0..1, golden 0..1, wet 0..1, sunNdc: Vector3|null, sunColor, flare 0..1, time }
   */
  look(g) {
    const u = this.gradePass.uniforms;
    const n = g.night, gold = g.golden, wet = g.wet;
    u.contrast.value = 1.07 + gold * 0.04 - wet * 0.03;
    u.saturation.value = 1.1 + gold * 0.08 - n * 0.06 - wet * 0.12;
    // cool blue shadows at night/rain, teal-ish by day; warm highlights at golden hour
    u.shadowTint.value.setRGB(-0.004 - n * 0.004, 0.006 + n * 0.004, 0.022 + n * 0.03 + wet * 0.01);
    u.highTint.value.setRGB(0.018 + gold * 0.05, 0.008 + gold * 0.016, -0.01 - gold * 0.03 + n * 0.02);
    u.grain.value = 0.018 + n * 0.03;
    u.time.value = g.time;
    if (g.sunNdc && g.sunNdc.z < 1) {
      u.sunPos.value.set(g.sunNdc.x * 0.5 + 0.5, g.sunNdc.y * 0.5 + 0.5);
      u.flare.value = g.flare;
      u.sunColor.value.copy(g.sunColor);
    } else {
      u.flare.value = 0;
    }
    if (this.bloomOn) {
      this.bloomPass.strength = 0.2 + n * 0.32 + wet * 0.08;
      this.bloomPass.threshold = 0.95 - n * 0.1;
      this.bloomPass.radius = 0.45 + n * 0.15;
    }
  }

  render() {
    this.composer.render();
  }
}
