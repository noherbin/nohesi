// Post-processing chain:
//   scene (HDR) -> bloom -> anamorphic light streaks -> radial speed blur / chromatic fringe / speed lines
//   -> tone mapping -> colour grade (contrast, saturation, split toning, sun flare, vignette, grain) in display space.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';

const QUAD_VS = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

/**
 * Anamorphic light streaks: the brightest lights (lamps, head and tail lights, neon) smear into long
 * horizontal lines, the way they do through a widescreen cine lens. Worked at quarter resolution:
 * bright pass -> three widening horizontal blurs -> added over the frame.
 */
class StreakPass extends Pass {
  constructor() {
    super();
    this.needsSwap = false;
    this.threshold = 2.0;
    this.strength = 0.4;
    this.tint = new THREE.Color(0.55, 0.7, 1.0);
    const rt = () => new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false });
    this.rtA = rt();
    this.rtB = rt();
    this.bright = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, texel: { value: new THREE.Vector2() }, threshold: { value: 2 } },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform vec2 texel; uniform float threshold;
        varying vec2 vUv;
        void main(){
          // 4 bilinear taps cover the 4x4 source pixels under each quarter-res pixel
          vec3 c = texture2D(tDiffuse, vUv + texel * vec2(-1.0, -1.0)).rgb + texture2D(tDiffuse, vUv + texel * vec2(1.0, -1.0)).rgb
                 + texture2D(tDiffuse, vUv + texel * vec2(-1.0, 1.0)).rgb + texture2D(tDiffuse, vUv + texel * vec2(1.0, 1.0)).rgb;
          c *= 0.25;
          float l = max(c.r, max(c.g, c.b));
          float k = max(0.0, l - threshold) / max(l, 1e-4);
          gl_FragColor = vec4(min(c * k, vec3(6.0)), 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.blur = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, stepX: { value: 0 }, atten: { value: 0.86 } },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform float stepX; uniform float atten;
        varying vec2 vUv;
        void main(){
          vec3 acc = texture2D(tDiffuse, vUv).rgb; float ws = 1.0; float w = 1.0;
          for (int i = 1; i <= 6; i++) {
            w *= atten;
            float o = stepX * float(i);
            acc += (texture2D(tDiffuse, vUv + vec2(o, 0.0)).rgb + texture2D(tDiffuse, vUv - vec2(o, 0.0)).rgb) * w;
            ws += 2.0 * w;
          }
          gl_FragColor = vec4(acc / ws, 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.comp = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, strength: { value: 0.4 }, tint: { value: this.tint } },
      vertexShader: QUAD_VS,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse; uniform float strength; uniform vec3 tint;
        varying vec2 vUv;
        void main(){
          vec3 s = texture2D(tDiffuse, vUv).rgb;
          float l = dot(s, vec3(0.3, 0.5, 0.2));
          // keep some of the light's own colour (red tail lights streak red), cool the rest like a cine lens
          gl_FragColor = vec4(mix(s, l * tint * 1.6, 0.5) * strength, 1.0);
        }`,
      blending: THREE.AdditiveBlending, transparent: true, depthTest: false, depthWrite: false,
    });
    this.quad = new FullScreenQuad(null);
  }

  setSize(w, h) {
    const qw = Math.max(1, Math.round(w / 4)), qh = Math.max(1, Math.round(h / 4));
    this.rtA.setSize(qw, qh);
    this.rtB.setSize(qw, qh);
    this.bright.uniforms.texel.value.set(1 / w, 1 / h);
    this.qw = qw;
  }

  render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    if (this.strength < 0.005) return;
    const oldAuto = renderer.autoClear;
    renderer.autoClear = false;
    if (maskActive) renderer.state.buffers.stencil.setTest(false);
    this.bright.uniforms.tDiffuse.value = readBuffer.texture;
    this.bright.uniforms.threshold.value = this.threshold;
    this.quad.material = this.bright;
    renderer.setRenderTarget(this.rtA);
    this.quad.render(renderer);
    // widening passes: 1, 5, 25 texels per tap -> about +-190 quarter-res texels of streak
    let src = this.rtA, dst = this.rtB;
    this.quad.material = this.blur;
    for (const k of [1, 5, 25]) {
      this.blur.uniforms.tDiffuse.value = src.texture;
      this.blur.uniforms.stepX.value = k / this.qw;
      this.blur.uniforms.atten.value = k === 1 ? 0.9 : 0.84;
      renderer.setRenderTarget(dst);
      this.quad.render(renderer);
      [src, dst] = [dst, src];
    }
    this.comp.uniforms.tDiffuse.value = src.texture;
    this.comp.uniforms.strength.value = this.strength;
    this.quad.material = this.comp;
    if (maskActive) renderer.state.buffers.stencil.setTest(true);
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    this.quad.render(renderer);
    renderer.autoClear = oldAuto;
  }

  dispose() {
    this.rtA.dispose(); this.rtB.dispose();
    this.bright.dispose(); this.blur.dispose(); this.comp.dispose();
    this.quad.dispose();
  }
}

const SpeedShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0 },
    center: { value: new THREE.Vector2(0.5, 0.56) },
    fringe: { value: 0 },
    aspect: { value: 1.7 },
    lines: { value: 0 },
    time: { value: 0 },
    lineTint: { value: new THREE.Color(0.85, 0.93, 1.0) },
  },
  vertexShader: QUAD_VS,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float strength; uniform vec2 center; uniform float fringe; uniform float aspect;
    uniform float lines; uniform float time; uniform vec3 lineTint;
    varying vec2 vUv;
    float h1(float n){ return fract(sin(n * 91.345) * 47453.5453); }
    void main(){
      vec2 dir = vUv - center;
      vec2 dA = dir * vec2(aspect, 1.0);
      float d = length(dA) / aspect * 1.6;
      float k = strength * smoothstep(0.18, 0.85, d);
      // chromatic split rides inside the blur: each tap is weighted from red (outer) to blue (inner),
      // so blurred edges spread into a spectrum instead of leaving sharp red/blue copies beside a blurred green
      float fr = fringe * d * 5.0;
      float spread = k + fr;
      vec4 col = texture2D(tDiffuse, vUv);
      if (spread > 0.0005) {
        float chroma = fr / (spread + 1e-5);
        vec3 acc = vec3(0.0), ws = vec3(0.0);
        for (int i = 0; i < 9; i++) {
          float t = float(i) / 8.0;
          vec3 spec = vec3(clamp(1.0 - t * 1.6, 0.0, 1.0), 1.0 - abs(t - 0.5) * 2.0, clamp(t * 1.6 - 0.6, 0.0, 1.0));
          vec3 w = mix(vec3(1.0), spec + 0.02, chroma);
          acc += texture2D(tDiffuse, vUv - dir * (k * t + fr * (t - 0.5))).rgb * w;
          ws += w;
        }
        col.rgb = acc / ws;
      }
      // speed lines: thin dashes rushing out from the vanishing point toward the screen edges
      if (lines > 0.001) {
        float ang = (atan(dA.y, dA.x) + 3.14159265) * 34.0;
        float cell = floor(ang);
        float r1 = h1(cell), r2 = h1(cell + 37.0);
        if (r1 > 0.8) {
          float thin = 1.0 - smoothstep(0.02, 0.08 + 0.08 * r2, abs(fract(ang) - 0.5));
          float seg = fract(d * (0.7 + r2 * 0.8) - time * (1.2 + r1 * 1.6) + r2 * 9.0);
          float dash = smoothstep(0.0, 0.06, seg) * (1.0 - smoothstep(0.18 + r2 * 0.2, 0.42 + r2 * 0.25, seg));
          float m = smoothstep(0.42 + r2 * 0.15, 0.98, d);
          col.rgb += lineTint * (thin * dash * m * lines * (0.12 + 0.28 * r2));
        }
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
  vertexShader: QUAD_VS,
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
    this.pulseA = 0; // event punch: chromatic split, extra blur and saturation, decays in look()
    this._blur = 0; this._fringe = 0;
    this._build();
  }

  _build() {
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: this.samples });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(Math.max(2, size.x / 2), Math.max(2, size.y / 2)), 0.35, 0.55, 0.92);
    this.bloomPass.enabled = this.bloomOn;
    // cap how much any one pixel feeds the bloom, so a few blazing highlights (studio spots on clearcoat)
    // glow like lamps instead of flooding the frame
    const hp = this.bloomPass.materialHighPassFilter;
    hp.uniforms.bloomMax = { value: 5 };
    hp.fragmentShader = hp.fragmentShader
      .replace('uniform float smoothWidth;', 'uniform float smoothWidth;\nuniform float bloomMax;')
      .replace('gl_FragColor = mix( outputColor, texel, alpha );', 'gl_FragColor = mix( outputColor, vec4( texel.rgb * min( 1.0, bloomMax / max( v, 1e-4 ) ), texel.a ), alpha );');
    hp.needsUpdate = true;
    this.streakPass = new StreakPass();
    this.streakPass.enabled = this.bloomOn;
    this.speedPass = new ShaderPass(SpeedShader);
    this.outPass = new OutputPass();
    this.gradePass = new ShaderPass(GradeShader);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.streakPass);
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
    this.streakPass.dispose();
    this._build();
  }

  setBloom(on) {
    this.bloomOn = on;
    this.bloomPass.enabled = on;
    this.streakPass.enabled = on;
  }

  /** A short punch for big moments (near misses, chains): 0..1 */
  pulse(a) { this.pulseA = Math.min(1.2, Math.max(this.pulseA, a)); }

  setSize(w, h, pr) {
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.speedPass.uniforms.aspect.value = w / h;
    this.gradePass.uniforms.aspect.value = w / h;
  }

  /** blur 0..1 based on speed, vignette 0..1, lines 0..1 speed lines */
  set(blur, vignette, fringe, lines = 0) {
    this._blur = blur * 0.075;
    this._fringe = fringe;
    this.speedPass.uniforms.lines.value = lines;
    this.gradePass.uniforms.vignette.value = vignette;
  }

  /**
   * Per-frame look: g = { night 0..1, golden 0..1, wet 0..1, sunNdc: Vector3|null, sunColor, flare 0..1, time }
   */
  look(g) {
    const u = this.gradePass.uniforms;
    const n = g.night, gold = g.golden, wet = g.wet;
    const dt = g.dt ?? 0.016;
    const p = this.pulseA;
    this.pulseA = Math.max(0, p - dt * (1.6 + p * 2.5));
    const su = this.speedPass.uniforms;
    su.strength.value = this._blur + p * 0.018;
    su.fringe.value = this._fringe + p * 0.0065;
    su.time.value = g.time;
    u.contrast.value = 1.11 + gold * 0.05 - wet * 0.03 + n * 0.02;
    u.saturation.value = 1.2 + gold * 0.1 - n * 0.02 - wet * 0.12 + p * 0.25;
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
      // a soft glow on every light, much stronger after dark; wet nights glow most
      const b = g.bloom ?? 1;
      this.bloomPass.strength = (g.bloomStrength ?? (0.24 + n * 0.38 + wet * 0.08)) * b + p * 0.12;
      this.bloomPass.threshold = g.bloomThreshold ?? (1.0 - n * 0.22);
      this.bloomPass.materialHighPassFilter.uniforms.bloomMax.value = g.bloomMax ?? 5;
      this.bloomPass.radius = g.bloomRadius ?? (0.5 + n * 0.12);
      const st = this.streakPass;
      st.threshold = g.streakThreshold ?? (2.4 - n * 0.7);
      st.strength = (g.streaks ?? (0.05 + n * 0.3 + wet * 0.15)) * b;
    }
  }

  render() {
    this.composer.render();
  }
}
