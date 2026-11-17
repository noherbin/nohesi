// Sky, sun/moon lighting, fog, clouds, stars, distant skyline and mountains, day/night cycle.
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { lerp, clamp, smoothstep } from '../core/utils.js';
import * as T from './textures.js';
import { latticeTowerGeometry } from './tokyo.js';

// Lighting keyframes by sun elevation (degrees)
const KEYS = [
  { el: -14, light: 0x8ea3d6, lightI: 0.45, sky: 0x2b3656, gnd: 0x16140f, hemiI: 0.78, fog: 0x0c111d, exp: 0.8, envI: 0.4 },
  { el: -5, light: 0x6f7fb8, lightI: 0.26, sky: 0x41507a, gnd: 0x1e1b18, hemiI: 0.68, fog: 0x283150, exp: 0.82, envI: 0.48 },
  { el: 0, light: 0xff6a35, lightI: 0.9, sky: 0x7d7fa8, gnd: 0x3a2c22, hemiI: 0.62, fog: 0x8f746f, exp: 0.85, envI: 0.55 },
  { el: 5, light: 0xffa158, lightI: 2.4, sky: 0x9aa8c8, gnd: 0x5a4430, hemiI: 0.6, fog: 0xcf9f7c, exp: 0.7, envI: 0.6 },
  { el: 15, light: 0xffd6a6, lightI: 3.0, sky: 0xa9c3e6, gnd: 0x6a5a48, hemiI: 0.6, fog: 0xc4ccd6, exp: 0.56, envI: 0.62 },
  { el: 45, light: 0xfff3e4, lightI: 3.3, sky: 0xb7d1f0, gnd: 0x6e6458, hemiI: 0.6, fog: 0xb9cbe0, exp: 0.5, envI: 0.66 },
];

function keyAt(el) {
  if (el <= KEYS[0].el) return { ...KEYS[0], t: 0 };
  for (let i = 1; i < KEYS.length; i++) {
    if (el <= KEYS[i].el) {
      const a = KEYS[i - 1], b = KEYS[i];
      const t = (el - a.el) / (b.el - a.el);
      return { a, b, t };
    }
  }
  return { ...KEYS[KEYS.length - 1], t: 0 };
}

const _c1 = new THREE.Color(), _c2 = new THREE.Color();
function mixHex(a, b, t, out) {
  _c1.setHex(a);
  _c2.setHex(b);
  return out.copy(_c1).lerp(_c2, t);
}

const RING_VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const RING_FRAG = /* glsl */ `
uniform sampler2D map; uniform vec3 color; uniform vec3 haze; uniform float hazeAmt; uniform float night;
uniform vec3 winColor; uniform vec2 arc; uniform float opacity;
varying vec2 vUv;
void main(){
  vec4 t = texture2D(map, vUv);
  float u = fract(vUv.x);
  float m = 1.0;
  if (arc.y - arc.x < 0.999) {
    m = smoothstep(arc.x, arc.x + 0.05, u) * (1.0 - smoothstep(arc.y - 0.05, arc.y, u));
  }
  float a = t.r * m * opacity;
  if (a < 0.01) discard;
  vec3 c = mix(color * (0.7 + 0.3 * t.g), haze, hazeAmt) + winColor * step(0.5, t.g) * night * 1.6;
  gl_FragColor = vec4(c, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const CLOUD_VERT = /* glsl */ `
varying vec3 vWorld;
void main(){ vec4 w = modelMatrix * vec4(position,1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const CLOUD_FRAG = /* glsl */ `
uniform sampler2D map; uniform vec3 lit; uniform vec3 shade; uniform float coverage; uniform float overcast;
uniform vec2 offset; uniform vec3 camPos; uniform float opacity;
varying vec3 vWorld;
void main(){
  vec2 uv = (vWorld.xz + offset) / 2600.0;
  float a = texture2D(map, uv).a;
  float b = texture2D(map, uv * 2.3 + 0.37).a;
  float dens = clamp(a * 0.75 + b * 0.35 - (1.0 - coverage) * 0.6, 0.0, 1.0);
  dens = mix(dens, 0.85 + 0.15 * b, overcast);
  float dist = length(vWorld.xz - camPos.xz);
  float fade = 1.0 - smoothstep(2500.0, 5200.0, dist);
  vec3 c = mix(lit, shade, clamp(dens * 1.2 - 0.2, 0.0, 1.0));
  gl_FragColor = vec4(c, dens * fade * opacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const GLOW_VERT = RING_VERT.replace('vUv = uv;', 'vUv = uv; vDir = normalize(position);').replace('varying vec2 vUv;', 'varying vec2 vUv; varying vec3 vDir;');
const GLOW_FRAG = /* glsl */ `
uniform vec3 top; uniform vec3 horizon; uniform float amount;
varying vec2 vUv; varying vec3 vDir;
void main(){
  float h = clamp(vDir.y, -0.1, 1.0);
  vec3 c = mix(horizon, top, pow(smoothstep(-0.02, 0.5, h), 0.6));
  gl_FragColor = vec4(c * amount, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// Overcast layer: a soft grey dome that hides the clear-sky sun glare when it rains.
const OVC_FRAG = /* glsl */ `
uniform vec3 top; uniform vec3 horizon; uniform vec3 sunDir; uniform float amount;
varying vec2 vUv; varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  float h = clamp(d.y, -0.1, 1.0);
  vec3 c = mix(horizon, top, smoothstep(-0.05, 0.6, h));
  c *= 1.0 + 0.35 * pow(max(dot(d, sunDir), 0.0), 6.0);
  gl_FragColor = vec4(c, amount * smoothstep(-0.12, 0.02, d.y + 0.1));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export class SkySystem {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.hours = 12;
    this.cycle = false;
    this.weather = 'clear';
    this.wet = 0;
    this.rainAmt = 0;
    this.overcast = 0;
    this.night = 0;
    this.golden = 0;
    this.elevation = 30;
    this.env = null;
    this.sunDir = new THREE.Vector3(0, 1, 0);
    this.lightDir = new THREE.Vector3(0, 1, 0);
    this.fogColor = new THREE.Color();
    this.exposure = 0.6;

    this.sky = new Sky();
    this.sky.scale.setScalar(4500);
    this.sky.material.depthWrite = false;
    this.sky.renderOrder = -10;
    this.sky.frustumCulled = false;
    scene.add(this.sky);

    // Night glow dome (city light pollution / blue hour), added on top of the physical sky
    this.glow = new THREE.Mesh(
      new THREE.SphereGeometry(4300, 32, 16),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT, fragmentShader: GLOW_FRAG, side: THREE.BackSide,
        uniforms: { top: { value: new THREE.Color(0x060a16) }, horizon: { value: new THREE.Color(0x3a2a2c) }, amount: { value: 0 } },
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
      }),
    );
    this.glow.renderOrder = -9;
    this.glow.frustumCulled = false;
    scene.add(this.glow);
    this.ovc = new THREE.Mesh(
      new THREE.SphereGeometry(4250, 32, 16),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT, fragmentShader: OVC_FRAG, side: THREE.BackSide,
        uniforms: { top: { value: new THREE.Color(0x7d828a) }, horizon: { value: new THREE.Color(0x9aa0a8) }, sunDir: { value: new THREE.Vector3(0, 1, 0) }, amount: { value: 0 } },
        transparent: true, depthWrite: false, fog: false,
      }),
    );
    this.ovc.renderOrder = -9.5;
    this.ovc.frustumCulled = false;
    scene.add(this.ovc);

    // Stars
    const n = 1800;
    const sp = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random(), v = Math.random() * 0.95 + 0.03;
      const th = u * Math.PI * 2, y = v;
      const r = Math.sqrt(1 - y * y);
      sp[i * 3] = Math.cos(th) * r * 4000;
      sp[i * 3 + 1] = y * 4000;
      sp[i * 3 + 2] = Math.sin(th) * r * 4000;
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    this.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    this.stars.renderOrder = -8;
    this.stars.frustumCulled = false;
    scene.add(this.stars);

    // Moon
    const moonTex = T.radialTexture(64, 0.55, 1.0);
    this.moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonTex, color: 0xdfe6ff, transparent: true, depthWrite: false, fog: false, opacity: 0 }));
    this.moon.scale.setScalar(140);
    this.moon.renderOrder = -7;
    scene.add(this.moon);

    // Clouds
    this.cloudTex = T.cloudTexture(5);
    this.clouds = new THREE.Mesh(
      new THREE.PlaneGeometry(11000, 11000).rotateX(Math.PI / 2),
      new THREE.ShaderMaterial({
        vertexShader: CLOUD_VERT, fragmentShader: CLOUD_FRAG, transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide,
        uniforms: {
          map: { value: this.cloudTex }, lit: { value: new THREE.Color(1, 1, 1) }, shade: { value: new THREE.Color(0.6, 0.62, 0.66) },
          coverage: { value: 0.3 }, overcast: { value: 0 }, offset: { value: new THREE.Vector2() }, camPos: { value: new THREE.Vector3() }, opacity: { value: 1 },
        },
      }),
    );
    this.clouds.renderOrder = -6;
    this.clouds.frustumCulled = false;
    scene.add(this.clouds);
    this.cloudOffset = new THREE.Vector2(Math.random() * 5000, Math.random() * 5000);

    // Distant rings
    const ringMat = () => new THREE.ShaderMaterial({
      vertexShader: RING_VERT, fragmentShader: RING_FRAG, transparent: true, depthWrite: false, fog: false, side: THREE.BackSide,
      uniforms: {
        map: { value: null }, color: { value: new THREE.Color() }, haze: { value: new THREE.Color() }, hazeAmt: { value: 0.5 },
        night: { value: 0 }, winColor: { value: new THREE.Color(1.0, 0.78, 0.5) }, arc: { value: new THREE.Vector2(0, 1) }, opacity: { value: 1 },
      },
    });
    this.mountains = new THREE.Mesh(new THREE.CylinderGeometry(3600, 3600, 520, 64, 1, true), ringMat());
    this.mountains.renderOrder = -5;
    this.mountains.frustumCulled = false;
    this.skyline = new THREE.Mesh(new THREE.CylinderGeometry(3000, 3000, 420, 64, 1, true), ringMat());
    this.skyline.renderOrder = -4;
    this.skyline.frustumCulled = false;
    scene.add(this.mountains, this.skyline);

    // Lights
    this.hemi = new THREE.HemisphereLight(0xb7d1f0, 0x6e6458, 0.6);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const sc = this.sun.shadow.camera;
    sc.left = -42; sc.right = 42; sc.top = 42; sc.bottom = -42; sc.near = 1; sc.far = 400;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    scene.add(this.sun, this.sun.target);

    scene.fog = new THREE.Fog(0xbfd0e2, 200, 1100);

    // Environment map generation
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.envScene = new THREE.Scene();
    this.envSky = new Sky();
    this.envSky.scale.setScalar(900);
    // the environment map must not contain the (extremely bright) sun disc: the directional light handles it
    this.envSky.material = this.sky.material.clone();
    this.envSky.material.fragmentShader = this.envSky.material.fragmentShader.replace('19000.0', '0.0');
    this.envSky.material.needsUpdate = true;
    this.envScene.add(this.envSky);
    this.envGlow = new THREE.Mesh(new THREE.SphereGeometry(850, 24, 12), this.glow.material);
    this.envScene.add(this.envGlow);
    this.envGround = new THREE.Mesh(new THREE.CircleGeometry(800, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x333333 }));
    this.envGround.position.y = -8;
    this.envScene.add(this.envGround);
    this.envCloud = new THREE.Mesh(new THREE.SphereGeometry(820, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x777777, side: THREE.BackSide, transparent: true, opacity: 0 }));
    this.envScene.add(this.envCloud);
    // horizon silhouettes (buildings / trees / walls): gives car paint the dark reflected
    // horizon band and broken skyline that makes real bodywork read as glossy metal
    {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 128;
      const x = c.getContext('2d');
      x.clearRect(0, 0, 1024, 128);
      x.fillStyle = '#fff';
      let seed = 11;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      x.fillRect(0, 100, 1024, 28);
      for (let px = 0; px < 1024;) {
        const w = 8 + rnd() * 46, hh = 18 + Math.pow(rnd(), 2) * 90;
        if (rnd() < 0.35) { x.beginPath(); x.ellipse(px + w / 2, 128 - hh * 0.6, w * 0.6, hh * 0.45, 0, 0, Math.PI * 2); x.fill(); }
        else x.fillRect(px, 128 - hh, w, hh);
        px += w + rnd() * 10;
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.repeat.x = 3;
      this.envHorizon = new THREE.Mesh(new THREE.CylinderGeometry(700, 700, 70, 48, 1, true).translate(0, 27, 0),
        new THREE.MeshBasicMaterial({ color: 0x333333, alphaMap: tex, transparent: true, side: THREE.BackSide, depthWrite: false }));
      this.envScene.add(this.envHorizon);
    }
    // a few bright horizon cards so night paint shows streetlight-like highlights
    this.envLights = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(60, 14), new THREE.MeshBasicMaterial({ color: 0xe2e9f7, side: THREE.DoubleSide }));
      const a = (i / 10) * Math.PI * 2;
      m.position.set(Math.cos(a) * 600, 120 + (i % 3) * 30, Math.sin(a) * 600);
      m.lookAt(0, 0, 0);
      this.envLights.add(m);
    }
    this.envScene.add(this.envLights);
    this.envRT = null;
    this._envKey = '';
    this.shadowSize = 42;
  }

  setQuality(q) {
    this.sun.castShadow = q.shadows;
    if (q.shadows) {
      const size = q.shadowMap;
      if (this.sun.shadow.mapSize.x !== size) {
        this.sun.shadow.mapSize.set(size, size);
        if (this.sun.shadow.map) {
          this.sun.shadow.map.dispose();
          this.sun.shadow.map = null;
        }
      }
    }
    this.viewDist = q.viewDist;
    this._envKey = '';
  }

  setEnvironment(env) {
    this.env = env;
    for (const [mesh, tex] of [[this.skyline, T.skylineTexture(env.seed, env.skyline.density, env.skyline.height)], [this.mountains, T.mountainTexture(env.seed + 1, env.mountains.height)]]) {
      const u = mesh.material.uniforms;
      if (u.map.value) u.map.value.dispose();
      u.map.value = tex;
      tex.wrapS = THREE.RepeatWrapping;
    }
    this.skyline.material.uniforms.arc.value.set(env.skyline.arc[0], env.skyline.arc[1]);
    this.skyline.visible = env.skyline.density > 0;
    this.mountains.visible = env.mountains.height > 0;
    this.envGround.material.color.setHex(env.terrain.far).multiplyScalar(0.6);
    this._envKey = '';
    // Tokyo: a red-and-white lattice broadcast tower stands on the skyline (drawn far away, like the skyline)
    if (env.style === 'shutoko' && !this.landmark) {
      const tg = latticeTowerGeometry();
      const mk = (geo, hex) => { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: hex, fog: false })); m.userData.base = new THREE.Color(hex); m.frustumCulled = false; return m; };
      this.landmark = new THREE.Group();
      this.landmark.add(mk(tg.red, 0xc8362a), mk(tg.white, 0xe6e2da), mk(tg.deck, 0xd8d6d0));
      this.landmarkLights = new THREE.Mesh(new THREE.SphereGeometry(2.2, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff2a1a, fog: false }));
      this.landmarkLights.position.y = tg.height + 2;
      this.landmark.add(this.landmarkLights);
      this.landmark.renderOrder = -3;
      this.scene.add(this.landmark);
    }
    if (this.landmark) this.landmark.visible = env.style === 'shutoko';
  }

  setTime(hours, cycle) {
    this.hours = ((hours % 24) + 24) % 24;
    this.cycle = !!cycle;
    this._envKey = '';
  }

  setWeather(w) {
    this.weather = w;
    this.overcastTarget = w === 'rain' ? 1 : w === 'cloudy' ? 0.75 : 0;
    this.rainTarget = w === 'rain' ? 1 : 0;
    this._envKey = '';
  }

  snapWeather() {
    this.overcast = this.overcastTarget ?? 0;
    this.rainAmt = this.rainTarget ?? 0;
    this.wet = this.rainAmt;
  }

  sunElevation(h) {
    if (h >= 6.4 && h <= 19.1) return 64 * Math.sin(((h - 6.4) / 12.7) * Math.PI);
    let t = h < 6.4 ? h + 24 : h;
    return -38 * Math.sin(((t - 19.1) / 11.3) * Math.PI);
  }

  update(dt, camPos, refY) {
    if (this.cycle) this.hours = (this.hours + dt / 40) % 24; // 1 game-hour per 40s
    // weather transitions
    const ot = this.overcastTarget ?? 0, rt = this.rainTarget ?? 0;
    this.overcast += clamp(ot - this.overcast, -dt * 0.15, dt * 0.15);
    this.rainAmt += clamp(rt - this.rainAmt, -dt * 0.2, dt * 0.2);
    this.wet += clamp(this.rainAmt - this.wet, -dt * 0.03, dt * 0.08);

    const env = this.env;
    const el = this.sunElevation(this.hours);
    const azOff = ((env?.sunAz ?? 70) * Math.PI) / 180;
    const dayT = clamp((this.hours - 6.4) / 12.7, 0, 1);
    const az = lerp(Math.PI * 0.5, Math.PI * 1.5, dayT) + azOff;
    const elR = (el * Math.PI) / 180;
    this.sunDir.set(Math.cos(elR) * Math.sin(az), Math.sin(elR), -Math.cos(elR) * Math.cos(az)).normalize();
    this.night = smoothstep(3, -8, el);
    this.elevation = el;
    this.golden = smoothstep(22, 4, el) * smoothstep(-4, 1, el);

    // Sky shader
    const su = this.sky.material.uniforms;
    const turb = lerp(env?.sky.turbidity ?? 4, 16, this.overcast);
    su.turbidity.value = turb;
    su.rayleigh.value = lerp(env?.sky.rayleigh ?? 2, 0.6, this.overcast);
    su.mieCoefficient.value = lerp(0.005, 0.02, this.overcast);
    su.mieDirectionalG.value = 0.8;
    su.sunPosition.value.copy(this.sunDir);

    // Light keyframes
    const k = keyAt(el);
    const lc = new THREE.Color(), sky = new THREE.Color(), gnd = new THREE.Color(), fog = new THREE.Color();
    let lightI, hemiI, exp, envI;
    if (k.a) {
      mixHex(k.a.light, k.b.light, k.t, lc);
      mixHex(k.a.sky, k.b.sky, k.t, sky);
      mixHex(k.a.gnd, k.b.gnd, k.t, gnd);
      mixHex(k.a.fog, k.b.fog, k.t, fog);
      lightI = lerp(k.a.lightI, k.b.lightI, k.t);
      hemiI = lerp(k.a.hemiI, k.b.hemiI, k.t);
      exp = lerp(k.a.exp, k.b.exp, k.t);
      envI = lerp(k.a.envI, k.b.envI, k.t);
    } else {
      lc.setHex(k.light); sky.setHex(k.sky); gnd.setHex(k.gnd); fog.setHex(k.fog);
      lightI = k.lightI; hemiI = k.hemiI; exp = k.exp; envI = k.envI;
    }
    // Overcast desaturates and dims direct light
    const oc = this.overcast;
    const grey = new THREE.Color().setScalar((lc.r + lc.g + lc.b) / 3);
    lc.lerp(grey, oc * 0.7);
    lightI *= 1 - oc * 0.78;
    hemiI *= 1 + oc * 0.35;
    const fogGrey = new THREE.Color(0x8b9199).multiplyScalar(lerp(1, 0.12, this.night));
    fog.lerp(fogGrey, oc * 0.75);
    exp += oc * 0.12;
    // night city glow tint
    const cityGlow = env?.id === 'night' || env?.id === 'urban' || env?.id === 'la' ? 1 : 0.35;
    if (this.night > 0) {
      const glowC = new THREE.Color(0x26272c).multiplyScalar(cityGlow);
      fog.lerp(new THREE.Color(0x141824).add(glowC.clone().multiplyScalar(0.4)), this.night * 0.6);
    }

    // Light direction: sun by day, moon by night
    const moonDir = new THREE.Vector3(-this.sunDir.x * 0.6 + 0.2, 0.75, -this.sunDir.z * 0.6 - 0.3).normalize();
    this.lightDir.copy(el > -2 ? this.sunDir : moonDir);
    if (el > -2 && el < 2) {
      // fade through the horizon
      lightI *= smoothstep(-2, 2, el);
    }
    this.sun.color.copy(lc);
    this.sun.intensity = lightI;
    this.hemi.color.copy(sky);
    this.hemi.groundColor.copy(gnd);
    this.hemi.intensity = hemiI;
    this.fogColor.copy(fog);
    this.scene.fog.color.copy(fog);
    const vd = this.viewDist ?? 900;
    const fs = env?.fogScale ?? 1;
    const fogFar = lerp(vd * 1.08 * Math.min(1.25, fs), 380, this.rainAmt * 0.85 + oc * 0.15);
    this.scene.fog.far = fogFar;
    this.scene.fog.near = lerp(vd * 0.12 * fs, 25, this.rainAmt);
    this.exposure = exp;
    this.envIntensity = envI * (1 - oc * 0.3);

    // Night glow dome
    const gu = this.glow.material.uniforms;
    gu.amount.value = this.night * (0.3 + cityGlow * 0.3) + oc * 0.25 * (1 - this.night);
    gu.horizon.value.setHex(0x2e2d31).multiplyScalar(cityGlow).lerp(new THREE.Color(0x30343c), oc * 0.6);
    gu.top.value.setHex(0x050914).lerp(new THREE.Color(0x15171c), oc);

    this.stars.material.opacity = this.night * (1 - oc) * (cityGlow > 0.5 ? 0.55 : 1);
    this.moon.material.opacity = smoothstep(0.4, 1, this.night) * (1 - oc * 0.9);

    // Clouds
    const cu = this.clouds.material.uniforms;
    cu.coverage.value = lerp(env?.clouds ?? 0.3, 1, oc);
    cu.overcast.value = smoothstep(0.4, 1, oc);
    const sunLit = new THREE.Color().copy(lc).multiplyScalar(0.5 + 0.5 * (1 - this.night)).lerp(new THREE.Color(1, 1, 1), smoothstep(5, 30, el) * 0.6);
    cu.lit.value.copy(sunLit).multiplyScalar(lerp(1.4, 0.25, this.night)).lerp(fog, oc * 0.5);
    cu.shade.value.copy(fog).multiplyScalar(lerp(0.85, 0.6, oc));
    this.cloudOffset.x += dt * 6;
    this.cloudOffset.y += dt * 2;

    // Rings
    for (const [mesh, base, hazeAmt] of [[this.mountains, env?.mountains.color ?? 0x777777, 0.62], [this.skyline, 0x5d6672, 0.45]]) {
      const u = mesh.material.uniforms;
      u.color.value.setHex(base).multiplyScalar(lerp(1, 0.12, this.night));
      u.haze.value.copy(fog);
      u.hazeAmt.value = lerp(hazeAmt, 0.95, oc * 0.8 + this.rainAmt * 0.15);
      u.night.value = mesh === this.skyline ? this.night * (1 - this.rainAmt * 0.6) : 0;
      u.opacity.value = 1;
    }

    // Overcast dome
    const ou = this.ovc.material.uniforms;
    ou.amount.value = smoothstep(0.35, 1, oc) * 0.93;
    ou.horizon.value.copy(fog).multiplyScalar(1.08);
    ou.top.value.copy(fog).multiplyScalar(0.82);
    ou.sunDir.value.copy(this.sunDir);
    this.ovc.visible = ou.amount.value > 0.002;
    this.ovc.position.copy(camPos);

    // Follow camera
    this.sky.position.copy(camPos);
    this.glow.position.copy(camPos);
    this.stars.position.copy(camPos);
    this.moon.position.copy(camPos).addScaledVector(moonDir, 3800);
    this.clouds.position.set(camPos.x, refY + 1100, camPos.z);
    cu.camPos.value.copy(camPos);
    cu.offset.value.copy(this.cloudOffset);
    this.mountains.position.set(camPos.x, refY + 120 + 260 - 40, camPos.z);
    this.skyline.position.set(camPos.x, refY + 210 - 25, camPos.z);
    if (this.landmark?.visible) {
      // 2.6 km out, a little right of the road ahead (its bearing drifts slowly after the road, so it keeps
      // turning up at the end of the corridor); red and white by day, hazed by the air, lit orange at night
      const want = (this.roadHeading ?? 0) + 0.2;
      if (this.lmAz === undefined || dt === 0) this.lmAz = want;
      let dA = ((want - this.lmAz + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      this.lmAz += dA * Math.min(1, dt * 0.06);
      const az = this.lmAz;
      this.landmark.position.set(camPos.x + Math.sin(az) * 2600, refY - 60, camPos.z - Math.cos(az) * 2600);
      const day = 1 - this.night;
      const amb = lerp(0.15, 1, day) * (1 - oc * 0.35);
      const glow = new THREE.Color(0xff8a3a);
      for (const m of this.landmark.children) {
        if (!m.userData.base) continue;
        const c = m.material.color.copy(m.userData.base).multiplyScalar(amb);
        if (m.userData.base.r > 0.8 && m.userData.base.g < 0.4) c.lerp(glow.clone().multiplyScalar(1.15), this.night * 0.85);
        else c.lerp(new THREE.Color(0xffb070), this.night * 0.7);
        c.lerp(fog, lerp(0.42, 0.25, this.night) + oc * 0.3);
      }
      this.landmarkLights.material.color.setRGB(1, 0.16, 0.1).multiplyScalar(this.night * (performance.now() % 1500 < 800 ? 2 : 0.3) + 0.2);
    }

    // Environment map refresh when lighting changed noticeably
    const key = `${Math.round(this.hours * 4)}|${Math.round(oc * 10)}|${env?.id}`;
    if (key !== this._envKey) {
      this._envKey = key;
      this._rebuildEnv(fog);
    }
    this.scene.environmentIntensity = this.envIntensity;
  }

  /** Keep the shadow camera centred on the player, snapped to texels to avoid shimmer. */
  updateShadow(center) {
    const L = this.sun;
    const size = this.shadowSize * 2;
    const texel = size / L.shadow.mapSize.x;
    const cx = Math.round(center.x / texel) * texel;
    const cz = Math.round(center.z / texel) * texel;
    L.target.position.set(cx, center.y, cz);
    L.position.set(cx + this.lightDir.x * 150, center.y + Math.max(0.15, this.lightDir.y) * 150, cz + this.lightDir.z * 150);
    L.target.updateMatrixWorld();
  }

  _rebuildEnv(fog) {
    const su = this.sky.material.uniforms, eu = this.envSky.material.uniforms;
    for (const k of ['turbidity', 'rayleigh', 'mieCoefficient', 'mieDirectionalG']) eu[k].value = su[k].value;
    eu.sunPosition.value.copy(su.sunPosition.value);
    this.envCloud.material.opacity = this.overcast * 0.9;
    this.envCloud.material.color.copy(fog).multiplyScalar(1.1);
    this.envGround.material.color.copy(fog).multiplyScalar(0.24);
    if (this.envHorizon) this.envHorizon.material.color.copy(fog).multiplyScalar(lerp(0.42, 0.3, this.night)).lerp(fog, this.overcast * 0.35);
    this.envLights.visible = this.night > 0.4;
    for (const m of this.envLights.children) m.material.color.setHex(this.env?.lights?.color ?? 0xffc080).multiplyScalar(1.5);
    const old = this.envRT;
    this.envRT = this.pmrem.fromScene(this.envScene, 0, 0.1, 2000);
    this.scene.environment = this.envRT.texture;
    if (old) old.dispose();
  }
}
