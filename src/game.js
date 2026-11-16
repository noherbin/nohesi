// Game orchestrator: renderer, state machine, session lifecycle, per-frame update of every system.
import * as THREE from 'three';
import { RoadPath, makeLayout } from './world/road.js';
import { Highway } from './world/highway.js';
import { SkySystem } from './world/sky.js';
import { TEX } from './world/textures.js';
import { Traffic } from './traffic/traffic.js';
import { PlayerCar } from './vehicles/playerCar.js';
import { VehiclePhysics } from './vehicles/physics.js';
import { CameraRig, CAM_MODES, CAM_NAMES } from './camera/cameras.js';
import { Cockpit } from './camera/cockpit.js';
import { Glows, Particles, Rain } from './fx/effects.js';
import { PostFX } from './fx/postfx.js';
import { radialTexture } from './world/textures.js';
import { AudioSystem } from './audio/audio.js';
import { Input } from './core/input.js';
import { loadSave, writeSave, defaultSave } from './core/save.js';
import { Scoring } from './gameplay/scoring.js';
import { wallCollision, trafficCollisions } from './gameplay/collisions.js';
import { Autopilot } from './gameplay/autopilot.js';
import { GarageScene } from './garage/garageScene.js';
import { UI, MODES } from './ui/ui.js';
import { HUD } from './ui/hud.js';
import { PLAYER_CARS, CAR_BY_ID } from './config/cars.js';
import { ENVIRONMENTS, TIMES, DENSITIES } from './config/environments.js';
import { CHALLENGES, GOAL_LABEL } from './config/challenges.js';
import { clamp, lerp, damp, smoothstep, MS_TO_MPH, MS_TO_KMH, M_TO_MI, formatInt } from './core/utils.js';

export const QUALITY = {
  low: { pixelRatio: 0.75, shadows: false, shadowMap: 1024, post: false, bloom: false, samples: 0, viewDist: 520, propDensity: 0.45, rain: 0.35, mirror: false, lampLights: 0 },
  medium: { pixelRatio: 1.0, shadows: true, shadowMap: 1024, post: true, bloom: true, samples: 0, viewDist: 700, propDensity: 0.7, rain: 0.6, mirror: true, lampLights: 3 },
  high: { pixelRatio: 1.25, shadows: true, shadowMap: 2048, post: true, bloom: true, samples: 4, viewDist: 900, propDensity: 1.0, rain: 1.0, mirror: true, lampLights: 4 },
  ultra: { pixelRatio: 2.0, shadows: true, shadowMap: 4096, post: true, bloom: true, samples: 4, viewDist: 1150, propDensity: 1.25, rain: 1.0, mirror: true, lampLights: 4 },
};
const QORDER = ['low', 'medium', 'high', 'ultra'];
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

export class Game {
  constructor() {
    this.state = 'loading';
    this.origin = { x: 0, y: 0 };
    this.popQueue = [];
    this.crashCD = 0;
    this.hudMode = 0;
    this.frameTimes = [];
    this.qualityDropT = 0;
    this.revT = -1;
    this.lastS = 0;
    this.stuckT = 0;
    this.hintShown = false;
    this._tmpV = new THREE.Vector3();
    this._lamps = [];
  }

  async init() {
    this.save = loadSave();
    this.input = new Input();
    this.audio = new AudioSystem();
    this.ui = new UI(this);
    this.hud = new HUD();
    const ui = this.ui;
    ui.setLoading(0.05, 'Starting renderer…');
    await nextFrame();
    const canvas = document.getElementById('gl');
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
    } catch (e) {
      ui.setLoading(0, 'WebGL is not available in this browser. Try Chrome, Edge or Firefox with hardware acceleration on.');
      throw e;
    }
    this.renderer = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    TEX.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.2, 6000);
    // fonts for canvas textures (signs, gauges)
    try {
      await Promise.race([
        Promise.all([document.fonts.load('700 40px "Barlow Condensed"'), document.fonts.load('600 40px "Barlow Condensed"'), document.fonts.load('italic 800 40px "Barlow Condensed"')]),
        new Promise((r) => setTimeout(r, 1500)),
      ]);
    } catch (e) { /* fonts optional */ }
    ui.setLoading(0.15, 'Generating highway…');
    await nextFrame();
    this.road = new RoadPath();
    this.highway = new Highway(this.scene, this.road);
    this.sky = new SkySystem(renderer, this.scene);
    ui.setLoading(0.3, 'Building traffic…');
    await nextFrame();
    this.traffic = new Traffic(this.scene, this.road);
    ui.setLoading(0.5, 'Preparing cars…');
    await nextFrame();
    this.player = new PlayerCar(this.scene);
    this.camRig = new CameraRig(this.camera);
    this.cockpit = new Cockpit(renderer);
    this.glows = new Glows(this.scene);
    this.smoke = new Particles(this.scene, 260, { texture: radialTexture(64, 0.0, 1.2), depthBias: 0.35 });
    this.sparks = new Particles(this.scene, 220, { additive: true, texture: radialTexture(32, 0.2, 1.5) });
    this.flames = new Particles(this.scene, 120, { additive: true, texture: radialTexture(32, 0.1, 1.3) });
    this.rain = new Rain(this.scene, 5000);
    this.spray = new Particles(this.scene, 520, { texture: radialTexture(64, 0.0, 1.0), depthBias: 0.5 });
    this.postfx = new PostFX(renderer, this.scene, this.camera);
    this.garage = new GarageScene(renderer);
    this.scoring = new Scoring();
    this.autopilot = new Autopilot();
    ui.setLoading(0.65, 'Lighting the sky…');
    await nextFrame();
    this.applySettings(true);
    window.addEventListener('resize', () => this.resize());
    this.resize();
    window.addEventListener('beforeunload', (e) => {
      if (this.state === 'playing' || this.state === 'paused') {
        e.preventDefault();
        e.returnValue = '';
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause();
    });
    ui.setLoading(0.8, 'Starting engines…');
    await nextFrame();
    this.startSession(this._attractCfg(), true);
    // warm up shaders
    this.renderer.compile(this.scene, this.camera);
    ui.setLoading(1, 'Ready');
    this.state = 'intro';
    this._loop = this._loop.bind(this);
    this.lastT = performance.now();
    requestAnimationFrame(this._loop);
    ui.showStart(() => {
      this.audio.init();
      this.applySettings();
      this.audio.setCar(this.carDef, this.getCustom(this.carDef.id));
      ui.go('menu');
    });
    window.NOHESI = this; // handy for debugging in the console
  }

  /* ================================================================ settings */
  get S() { return this.save.settings; }

  applySettings(first = false) {
    const S = this.S;
    const Q = QUALITY[S.quality] || QUALITY.high;
    const qChanged = this.Q && this.Q !== Q;
    this.Q = Q;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, Q.pixelRatio));
    this.renderer.shadowMap.enabled = Q.shadows;
    this.sky.setQuality(Q);
    this.highway.setLampLights(Q.lampLights ?? 0);
    this.highway.viewDist = Q.viewDist;
    this.highway.propDensity = Q.propDensity;
    this.postfx.setSamples(Q.samples);
    this.postfx.setBloom(!!Q.bloom);
    this.rain.setCount(Q.rain);
    this.resize();
    this.audio.vol = { master: S.master, engine: S.engine, sfx: S.sfx, music: S.music };
    this.audio.applyVolumes();
    if (this.audio.ready && this.audio.musicOn !== S.musicOn) this.audio.setMusic(S.musicOn);
    if (qChanged && !first && this.session && this.env) {
      // rebuild environment props at the new density/view distance
      this.highway.setEnvironment(this.env, this.layout, Q);
      this.highway.rebase(this.origin);
      this.highway.update(this.player.proj.s, true);
      this.traffic.spawnAhead = Q.viewDist * 0.75;
    }
    if (this.hud) this.hud.setup && this.session && this._setupHud();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.postfx.setSize(w, h, this.renderer.getPixelRatio());
    this.garage?.setAspect(w / h);
  }

  saveNow() { writeSave(this.save); }

  resetProgress() {
    const s = defaultSave();
    s.settings = this.save.settings;
    s.settings.unlockAll = false;
    this.save = s;
    this.saveNow();
    this.onCarChanged();
  }

  /* ================================================================ cars */
  isUnlocked(id) {
    return this.S.unlockAll || CAR_BY_ID[id].cost <= this.save.career;
  }

  getCustom(id) {
    if (!this.save.customs[id]) this.save.customs[id] = { ...CAR_BY_ID[id].defaults };
    return this.save.customs[id];
  }

  setCustom(id, cu, rebuild) {
    this.save.customs[id] = cu;
    this.saveNow();
    if (this.garage.def?.id === id) {
      if (rebuild) this.garage.show(CAR_BY_ID[id], cu, this.S.plate);
      else {
        this.garage.car.mats.paint.color.set(cu.color);
      }
    }
    if (id === this.save.selectedCar) this.carDirty = true;
    if (id === this.save.selectedCar && rebuild) this.audioDirty = true;
  }

  showGarageCar(id) {
    if (this.garage.def?.id !== id || this._garageCustomKey !== JSON.stringify(this.getCustom(id)) + this.S.plate) {
      this.garage.show(CAR_BY_ID[id], this.getCustom(id), this.S.plate);
      this._garageCustomKey = JSON.stringify(this.getCustom(id)) + this.S.plate;
    }
  }

  onCarChanged() {
    this.carDirty = true;
    this.audioDirty = true;
  }

  revPreview() {
    if (!this.audio.ready) return;
    const def = this.garage.def;
    this.audio.setCar(def, this.getCustom(def.id));
    this.audioDirty = true;
    this.revT = 0;
  }

  carStats(def) {
    this._stats = this._stats || {};
    if (this._stats[def.id]) return this._stats[def.id];
    const p = new VehiclePhysics(def, def.defaults);
    p.reset(0, 0, 0, 0);
    let t = 0;
    const inp = { throttle: 1, brake: 0, steer: 0, handbrake: 0, auto: true, tc: true, assist: false, sens: 1, gripMul: 1 };
    while (t < 15 && p.speed < 26.82) { p.step(1 / 120, inp); t += 1 / 120; }
    const ph = def.phys;
    const handling = clamp(ph.grip * 7.2 - (ph.mass - 1300) / 380 + ph.downforce * 1.3 + (ph.tireB - 14) * 0.22, 1, 10);
    const braking = clamp(ph.brakeG * 6.6 - (ph.mass - 1400) / 520, 1, 10);
    const st = { topSpeed: ph.topSpeed, zeroSixty: t, hp: ph.hp, mass: ph.mass, handling, braking };
    this._stats[def.id] = st;
    return st;
  }

  get carDef() { return CAR_BY_ID[this.save.selectedCar] || PLAYER_CARS[0]; }

  _ensurePlayerCar() {
    const def = this.carDef;
    const cu = this.getCustom(def.id);
    const key = def.id + JSON.stringify(cu) + this.S.plate;
    if (this._carKey !== key || !this.player.model) {
      this.player.build(def, cu, this.S.plate);
      this.cockpit.build(this.player, def);
      this._carKey = key;
    }
    this.carDirty = false;
    if (this.audio.ready && (this.audioDirty || this.audio.car !== def)) {
      this.audio.setCar(def, cu);
      this.audioDirty = false;
    }
  }

  /* ================================================================ sessions */
  _attractCfg() {
    const l = this.save.last;
    return { mode: 'attract', env: l.env || 'la', time: 'default', weather: 'clear', density: 'normal' };
  }

  previewEnv(id) {
    if (this.state !== 'menu') return;
    this.startSession({ ...this._attractCfg(), env: id }, true);
  }

  startDrive(cfg) {
    this.save.last = { mode: cfg.mode, env: cfg.env, time: cfg.time, weather: cfg.weather, density: cfg.density };
    this.saveNow();
    this.startSession(cfg, false);
  }

  startChallenge(id) {
    const c = CHALLENGES.find((x) => x.id === id);
    this.startSession({ mode: 'challenge', env: c.env, time: c.time, weather: c.weather, density: c.density, challenge: c }, false);
  }

  startSession(cfg, attract) {
    const env = ENVIRONMENTS[cfg.env] || ENVIRONMENTS.la;
    const Q = this.Q;
    const envChanged = this.envId !== env.id || this._envQ !== Q;
    this.env = env;
    this.envId = env.id;
    this._envQ = Q;
    this.layout = makeLayout(env);
    this.road.configure(env, env.seed * 31 + Math.floor(Math.random() * 100000));
    if (envChanged) {
      this.highway.setEnvironment(env, this.layout, Q);
      this.sky.setEnvironment(env);
    } else this.highway.clear();
    const td = TIMES.find((t) => t.id === cfg.time) || TIMES[0];
    const hours = td.id === 'default' ? env.defaultTime : td.h;
    this.sky.setTime(hours, !!td.cycle);
    this.sky.setWeather(cfg.weather || 'clear');
    this.sky.snapWeather();
    this.sky.update(0, this.camera.position, 0);
    this._ensurePlayerCar();
    const lane = Math.floor(this.layout.n / 2);
    const s0 = 80;
    const startSpeed = attract ? 36 : 22;
    this.player.place(this.road, s0, this.layout.laneCenter(lane), startSpeed);
    const P = this.player.phys;
    this.origin.x = Math.round(P.X);
    this.origin.y = Math.round(P.Y);
    this.highway.rebase(this.origin);
    this.highway.update(s0, true);
    const dens = (DENSITIES.find((d) => d.id === cfg.density) || DENSITIES[1]).v;
    this.traffic.reset(this.layout, dens, s0, lane, { spawnAhead: Q.viewDist * 0.75 });
    this.scoring.reset();
    this.autopilot.reset(lane, 88 + Math.random() * 10);
    this.smoke.clear(); this.spray?.clear();
    this.sparks.clear();
    this.flames.clear();
    this.popQueue.length = 0;
    this.lastS = s0;
    this.crashCD = 0;
    this.stuckT = 0;
    this.sessionCfg = cfg;
    this.session = {
      mode: attract ? 'attract' : cfg.mode,
      cfg,
      challenge: cfg.challenge || null,
      timeLeft: cfg.mode === 'timeattack' ? 120 : 0,
      done: false,
      runs: 0,
      t: 0,
    };
    this.camRig.setMode(attract ? 'cinematic' : this.S.camera || 'chase');
    this.cockpit.setVisible(!attract && this.camRig.mode === 'cockpit');
    this.player.setInteriorDummyVisible(this.camRig.mode !== 'cockpit');
    this.hud.hideBanner();
    if (!attract) {
      this.state = 'playing';
      this.ui.show('none');
      this.hud.show(true);
      this._setupHud();
      this.input.captureKeys = true;
      this.input.flush();
      if (!this.hintShown) {
        this.hintShown = true;
        this.hud.hint('<kbd>W</kbd><kbd>S</kbd> throttle / brake &nbsp; <kbd>A</kbd><kbd>D</kbd> steer &nbsp; <kbd>Space</kbd> handbrake<br><kbd>C</kbd> camera &nbsp; <kbd>B</kbd> look back &nbsp; <kbd>R</kbd> reset &nbsp; <kbd>Esc</kbd> pause &nbsp; <kbd>E</kbd>/<kbd>Q</kbd> gears &nbsp; <kbd>H</kbd> HUD', 10);
      }
      const md = cfg.mode === 'challenge' ? cfg.challenge.title.toUpperCase() : MODES.find((m) => m.id === cfg.mode).name.toUpperCase();
      this.hud.banner(cfg.mode === 'challenge' ? 'CHALLENGE' : env.short, md, cfg.mode === 'challenge' ? cfg.challenge.desc : this.carDef.name, 2.6);
      this.audio.bigChime();
    } else {
      this.hud.show(false);
      this.input.captureKeys = false;
    }
    this.camRig.snap = true;
  }

  _setupHud() {
    const s = this.session;
    if (!s || s.mode === 'attract') return;
    const P = this.player.phys;
    const rpmMax = Math.ceil((P.limiter + 400) / 1000) * 1000;
    this.rpmMax = rpmMax;
    const modeLabel = s.mode === 'challenge' ? `CHALLENGE · ${s.challenge.title.toUpperCase()}` : `${MODES.find((m) => m.id === s.mode).name.toUpperCase()} · ${this.env.short}`;
    this.hud.setup({
      mode: s.mode,
      modeLabel,
      scoring: s.mode !== 'free',
      timer: s.mode === 'timeattack',
      objective: s.mode === 'challenge',
      redFrac: P.redline / rpmMax,
      units: this.S.units,
      best: s.mode === 'endless' ? this.save.best.endless : s.mode === 'timeattack' ? this.save.best.timeattack : undefined,
    });
    this._applyHudMode();
  }

  _applyHudMode() {
    const show = this.S.showHud !== false;
    this.hud.show(this.state === 'playing' && show && this.hudMode < 2);
    this.hud.setMinimal(this.hudMode === 1);
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.ui.updatePause();
    this.ui.show('pause');
    this.input.captureKeys = false;
  }

  resume() {
    if (this.state !== 'paused') return;
    this.audio.click();
    this.state = 'playing';
    this.ui.show('none');
    this.input.captureKeys = true;
    this.input.flush();
    this.lastT = performance.now();
  }

  restart() {
    this.audio.click();
    if (this.session?.mode === 'endless') this._bankRun(false);
    this.startSession(this.sessionCfg, false);
  }

  exitToMenu(screen) {
    this.audio.click();
    if (this.session?.mode === 'endless' && this.state !== 'results') this._bankRun(false);
    if (this.session?.mode === 'timeattack' && this.state !== 'results') this._bankScore(this.scoring.score);
    this.hud.show(false);
    this.state = 'menu';
    this.startSession(this._attractCfg(), true);
    this.ui.go(screen);
  }

  onScreen(screen) {
    if (this.state === 'paused' || this.state === 'results') {
      if (screen === 'settings' || screen === 'pause' || screen === 'results') return;
    }
    if (screen === 'garage' || screen === 'custom') {
      this.state = 'garage';
    } else if (screen !== 'none') {
      if (this.state !== 'menu') {
        this.state = 'menu';
        if (this.carDirty) {
          this._ensurePlayerCar();
          this.startSession(this._attractCfg(), true);
        }
      }
      if (this.audioDirty && this.audio.ready) {
        this.audio.setCar(this.carDef, this.getCustom(this.carDef.id));
        this.audioDirty = false;
      }
    }
  }

  cycleCamera() {
    const m = this.camRig.next();
    if (m !== 'cinematic') this.S.camera = m;
    this.saveNow();
    this.cockpit.setVisible(m === 'cockpit');
    this.player.setInteriorDummyVisible(m !== 'cockpit');
    this.hud.camLabel(CAM_NAMES[m]);
  }

  cameraName() { return CAM_NAMES[this.camRig.mode]; }

  fmtDist(m) {
    return this.S.units === 'kmh' ? `${(m / 1000).toFixed(1)} km` : `${(m * M_TO_MI).toFixed(1)} mi`;
  }

  fmtSpeed(ms) {
    return this.S.units === 'kmh' ? `${Math.round(ms * MS_TO_KMH)} km/h` : `${Math.round(ms * MS_TO_MPH)} mph`;
  }

  /* ================================================================ progression */
  _bankScore(score) {
    const before = this.save.career;
    this.save.career += Math.floor(score);
    this._checkUnlocks(before, this.save.career);
  }

  _checkUnlocks(before, after) {
    for (const c of PLAYER_CARS) {
      if (c.cost > before && c.cost <= after) {
        this.ui.toast(`NEW CAR UNLOCKED · ${c.name.toUpperCase()}`, 'gold');
        this.audio.bigChime();
      }
    }
  }

  /** End of an endless run (crash or exit). */
  _bankRun(crashed) {
    const sum = this.scoring.summary();
    const st = this.save.stats;
    st.runs++;
    st.distance += sum.distance;
    st.nearMisses += sum.nearMisses;
    st.topSpeed = Math.max(st.topSpeed, sum.topSpeed);
    if (crashed) st.crashes++;
    const newBest = sum.score > this.save.best.endless;
    if (newBest) this.save.best.endless = sum.score;
    this._bankScore(sum.score);
    this.saveNow();
    return { sum, newBest };
  }

  /* ================================================================ loop */
  _loop(now) {
    requestAnimationFrame(this._loop);
    if (this.halt) { this.lastT = now; return; }
    let dt = (now - this.lastT) / 1000;
    this.lastT = now;
    if (!(dt > 0)) dt = 1 / 60;
    const rawDt = dt;
    dt = Math.min(dt, 1 / 20);
    this.input.poll();
    this._globalActions();
    const st = this.state;
    if (st === 'garage') {
      this._garageFrame(dt);
    } else {
      const simulate = st === 'playing' || st === 'menu' || st === 'intro';
      if (simulate) this._simulate(dt, st !== 'playing');
      this._render(simulate ? dt : 0);
    }
    if (st === 'playing') this._autoQuality(rawDt);
    this.input.flush();
  }

  _globalActions() {
    const I = this.input, st = this.state;
    if (I.take('fullscreen')) this._toggleFullscreen();
    if (I.take('music') && this.audio.ready) {
      this.S.musicOn = !this.S.musicOn;
      this.audio.setMusic(this.S.musicOn);
      this.saveNow();
      this.ui.toast(this.S.musicOn ? 'Music on' : 'Music off');
    }
    if (st === 'intro' && I.take('confirm')) document.getElementById('btn-start').click();
    if (st === 'playing') {
      if (I.take('pause')) { this.pause(); return; }
      if (I.take('camera')) this.cycleCamera();
      if (I.take('hud')) {
        this.hudMode = (this.hudMode + 1) % 3;
        this._applyHudMode();
      }
      if (I.take('reset')) this._resetCar();
      if (I.take('indLeft')) this._setIndicator(-1);
      if (I.take('indRight')) this._setIndicator(1);
      if (I.take('dome')) {
        this.dome = !this.dome;
        this.ui.toast(this.dome ? 'Interior light on' : 'Interior light off');
      }
    } else if (st === 'paused') {
      if (I.take('pause') || I.take('back')) this.resume();
      this._menuNav();
    } else if (st === 'menu' || st === 'garage' || st === 'results') {
      if (I.take('pause') || I.take('back')) {
        const sc = this.ui.screen;
        const backMap = { setup: 'menu', garage: 'menu', custom: 'garage', challenges: 'menu', settings: this.ui.settingsReturn || 'menu' };
        if (backMap[sc]) { this.audio.click(); this.ui.go(backMap[sc]); }
      }
      this._menuNav();
    }
  }

  _menuNav() {
    const I = this.input;
    if (I.take('navDown') || I.take('navRight')) this.ui.nav(1);
    if (I.take('navUp') || I.take('navLeft')) this.ui.nav(-1);
    if (I.take('confirm')) {
      const a = document.activeElement;
      if (a && a.tagName === 'BUTTON') a.click();
    }
  }

  _toggleFullscreen() {
    const d = document;
    if (!d.fullscreenElement) {
      d.documentElement.requestFullscreen?.().then(() => {
        navigator.keyboard?.lock?.(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'ControlLeft', 'ControlRight', 'Space']).catch(() => {});
      }).catch(() => this.ui.toast('Fullscreen is not available here'));
    } else d.exitFullscreen?.();
  }

  /** Turn signal: press the same side again (or the other side) to switch over / off. */
  _setIndicator(side) {
    this.indicator = side && this.indicator !== side ? side : 0;
    this.indT = 0;
    this.blinkOn = false;
    this.indD0 = this.player.proj.d;
  }

  _resetCar() {
    const P = this.player.phys, L = this.layout;
    const s = this.player.proj.s + 4;
    const lane = L.laneOf(clamp(this.player.proj.d, L.laneStart, L.lanesEnd - 0.1));
    const d = L.laneCenter(lane);
    this.traffic.clearAround(s, d, 45);
    this.player.place(this.road, s, d, Math.max(18, Math.min(P.speed, 30)));
    this.scoring.mult = 1;
    this.scoring.chain = 0;
    this.scoring.combo = 0;
    this.camRig.snap = true;
    this.audio.click();
  }

  _autoQuality(dt) {
    if (!this.S.autoQuality) return;
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 180) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    this.qualityDropT -= 3;
    if (avg > 1 / 40 && this.qualityDropT <= 0) {
      const i = QORDER.indexOf(this.S.quality);
      if (i > 0) {
        this.S.quality = QORDER[i - 1];
        this.saveNow();
        this.applySettings();
        this.qualityDropT = 20;
        this.ui.toast(`Graphics lowered to ${this.S.quality.toUpperCase()} to keep things smooth`);
      }
    }
  }

  /* ---------------------------------------------------------------- simulation */
  _simulate(dt, attract) {
    const P = this.player.phys, car = this.player, S = this.S, L = this.layout;
    const sess = this.session;
    sess.t += dt;
    // controls
    let raw;
    if (attract) raw = this.autopilot.update(dt, car, this.traffic, this.road, L);
    else raw = this.input.controls();
    const gripMul = 1 - this.sky.wet * 0.27;
    const inp = car.control(raw, dt, { ...S, gripMul });
    if (attract) { inp.auto = true; inp.tc = true; inp.assist = true; }
    if (!attract) {
      if (this.input.take('gearUp')) P.shiftUp();
      if (this.input.take('gearDown')) P.shiftDown();
    }
    car.step(dt, inp);
    // turn signals: blink at ~80/min with a relay tick; cancel once the lane change is done (or after 15 s)
    if (!attract && this.indicator) {
      this.indT += dt;
      const on = this.indT % 0.75 < 0.4;
      if (on !== this.blinkOn) { this.blinkOn = on; this.audio.tick(on); }
      if ((Math.abs(car.proj.d - this.indD0) > 2.8 && Math.abs(car.steer ?? 0) < 0.08) || this.indT > 15) this._setIndicator(0);
    } else if (!this.indicator) this.blinkOn = false;
    car.indicator = attract ? 0 : this.indicator || 0;
    car.blinkOn = !!this.blinkOn;
    // collisions
    this.crashCD -= dt;
    let scrape = 0;
    const wall = wallCollision(car, this.road, L);
    if (wall) {
      scrape = wall.scrape;
      if (wall.severity > 0.3) this._impact(wall.severity, wall.point, true, attract);
      if (wall.scrape > 0.05 && Math.random() < wall.scrape) this._sparkAt(wall.point, 2);
    }
    const hits = trafficCollisions(car, this.traffic, this.road);
    for (const h of hits) {
      h.car.hit = true;
      if (h.severity > 0.25) this._impact(h.severity, h.point, false, attract);
    }
    this.scrapeLevel = damp(this.scrapeLevel || 0, scrape, 12, dt);
    // road projection & floating origin
    const pr = this.road.project(P.X, P.Y, car.proj.s, car.proj);
    if (Math.hypot(P.X - this.origin.x, P.Y - this.origin.y) > 1500) this._rebase();
    this.highway.update(pr.s);
    const beta = P.heading - pr.H;
    const cb = Math.abs(Math.cos(beta)), sb = Math.abs(Math.sin(beta));
    const pw = car.halfW * cb + car.halfL * sb;
    const pl = car.halfL * cb + car.halfW * sb;
    const pv = P.VX * Math.sin(pr.H) + P.VY * Math.cos(pr.H);
    this.traffic.update(dt, { ps: pr.s, pd: pr.d, pv, pw, pl, runDist: this.scoring.distance });
    // scoring
    const scoringOn = !attract && sess.mode !== 'free' && !sess.done;
    this.scoring.update(dt, { speed: Math.max(0, pv), cars: this.traffic.cars, ps: pr.s, pd: pr.d, pw, pl, scoring: scoringOn });
    const ds = pr.s - this.lastS;
    if (ds > 0 && ds < 50) this.scoring.addDistance(ds);
    this.lastS = pr.s;
    // events: sounds & HUD popups
    for (const ev of this.scoring.events) if (!attract) this.hud.pop(ev);
    this.scoring.events.length = 0;
    for (const s of this.scoring.sounds) {
      if (s.type === 'whoosh') this.audio.whoosh(s.side, s.intensity * (attract ? 0.4 : 1), s.rel);
      else if (!attract && s.type === 'chime') this.audio.chime(s.level);
      else if (!attract && s.type === 'big') this.audio.bigChime();
    }
    this.scoring.sounds.length = 0;
    for (const ev of this.traffic.events) {
      if (ev.type === 'honk' && !attract) {
        const pan = clamp((ev.d - pr.d) / 6, -1, 1);
        const vol = clamp(1 - Math.abs(ev.s - pr.s) / 120, 0.2, 1);
        this.audio.horn(pan, vol);
      }
    }
    this.traffic.events.length = 0;
    this._vehicleEvents(dt, attract);
    // mode logic
    if (!attract) this._modeLogic(dt);
    // stuck hint
    if (!attract && P.speed < 2 && Math.abs(Math.sin(beta)) > 0.6) {
      this.stuckT += dt;
      if (this.stuckT > 2.5) { this.stuckT = -20; this.hud.hint('Stuck? Press <kbd>R</kbd> to reset your car onto the road.', 5); }
    } else if (this.stuckT > 0) this.stuckT = 0;
  }

  _impact(sev, point, wall, attract) {
    const sess = this.session;
    this.camRig.addImpact(clamp(sev / 12, 0.1, 1.2));
    this._sparkAt(point, Math.floor(clamp(sev * 3, 4, 30)));
    if (this.crashCD > 0) return;
    const crashT = wall ? 6.5 : 2.4;
    const isCrash = sev > crashT;
    if (isCrash || sev > 1.2) this.audio.crash(clamp(sev / 14, 0.25, 1.4) * (attract ? 0.4 : 1));
    else this.audio.bump(0.02);
    this.crashCD = 0.6;
    if (attract) return;
    if (!isCrash) {
      if (sev > 0.6 && sess.mode !== 'free') this.scoring.contact();
      return;
    }
    this.crashCD = 1.5;
    if (sess.mode === 'endless') {
      const { sum, newBest } = this._bankRun(true);
      this.hud.banner(newBest && sum.score > 0 ? 'NEW BEST' : 'CRASHED · RUN OVER', formatInt(sum.score), `${sum.nearMisses} near misses · ${this.fmtDist(sum.distance)} · top ${Math.round(this.S.units === 'kmh' ? sum.topSpeed * 1.609 : sum.topSpeed)} ${this.S.units === 'kmh' ? 'km/h' : 'mph'}`, 3.8);
      this.scoring.reset();
      this.hud.setup && this._setupHud();
      this.audio.fail();
    } else if (sess.mode === 'timeattack') {
      sess.timeLeft = Math.max(0, sess.timeLeft - 5);
      this.scoring.contact();
      this.hud.pop({ text: 'CRASH −5s', pts: 0, kind: 'bad' });
    } else if (sess.mode === 'challenge') {
      if (sess.challenge.failOnCrash && !sess.done) this._challengeEnd(false);
      else this.scoring.contact();
    }
  }

  _sparkAt(point, n) {
    const P = this.player.phys;
    const x = point[0] - this.origin.x, z = -(point[1] - this.origin.y);
    const y = this.player.proj.E + 0.3;
    for (let i = 0; i < n; i++) {
      this.sparks.emit(x, y, z, P.VX * 0.6 + (Math.random() - 0.5) * 6, Math.random() * 4 + 1, -P.VY * 0.6 + (Math.random() - 0.5) * 6, 0.25 + Math.random() * 0.35, 0.07, 0, 1, 0.6, 0.2, 1, 9.8, 0.5);
    }
  }

  _vehicleEvents(dt, attract) {
    const P = this.player.phys, def = this.carDef;
    const ex = this.getCustom(def.id).exhaust || 'stock';
    for (const ev of P.events) {
      if (ev.type === 'shift') {
        if (!attract) this.audio.shift(ev.dir > 0);
        if (ev.dir > 0 && this.player.thr > 0.85 && ex !== 'stock' && !def.engine.electric) this._queuePops(1, 0.02);
      } else if (ev.type === 'lift') {
        if (def.engine.turbo) this.audio.blowOff(ev.boost, def.engine.flutter);
        if (!def.engine.electric && ev.rpm > def.phys.redline * 0.5 && P.speed > 8) {
          const n = ex === 'straight' ? 6 + Math.floor(Math.random() * 6) : ex === 'sport' ? 3 + Math.floor(Math.random() * 4) : 1 + Math.floor(Math.random() * 2);
          this._queuePops(n, 0.06);
        }
      }
    }
    P.events.length = 0;
    for (const ev of this.player.events) if (ev.type === 'bump') { this.audio.bump(ev.amp); this.camRig.addBump(ev.amp * 0.25); }
    this.player.events.length = 0;
    // fire due pops
    const now = this.session.t;
    while (this.popQueue.length && this.popQueue[0] <= now) {
      this.popQueue.shift();
      if (this.player.thr > 0.3) continue;
      this.audio.pop(0.6 + Math.random() * 0.5);
      const tips = this.player.lampWorld(this.player.model.lamps.exhaust, this._lamps);
      const back = this._tmpV.set(-Math.sin(P.heading), 0, Math.cos(P.heading));
      for (const t of tips) {
        for (let k = 0; k < 3; k++) {
          const v = 2 + Math.random() * 3;
          this.flames.emit(t.x, t.y, t.z, back.x * v + P.VX * 0.9, 0.2, back.z * v - P.VY * 0.9, 0.06 + Math.random() * 0.05, 0.22 + Math.random() * 0.15, 1.5, 1, 0.45 + Math.random() * 0.2, 0.12, 1, 0, 0);
        }
        this.flames.emit(t.x, t.y, t.z, P.VX * 0.9, 0, -P.VY * 0.9, 0.05, 0.12, 0.5, 0.4, 0.6, 1, 0.9, 0, 0);
      }
    }
  }

  _queuePops(n, start) {
    let t = this.session.t + start;
    for (let i = 0; i < n; i++) {
      t += 0.04 + Math.random() * 0.14;
      this.popQueue.push(t);
    }
    this.popQueue.sort((a, b) => a - b);
  }

  _modeLogic(dt) {
    const sess = this.session;
    if (sess.done) return;
    if (sess.mode === 'timeattack') {
      sess.timeLeft -= dt;
      if (sess.timeLeft <= 0) {
        sess.timeLeft = 0;
        sess.done = true;
        const sum = this.scoring.summary();
        const best = this.save.best.timeattack;
        const newBest = sum.distance > best;
        if (newBest) this.save.best.timeattack = Math.floor(sum.distance);
        this._bankScore(sum.score);
        this.saveNow();
        this._showResults({
          kicker: newBest ? 'NEW PERSONAL BEST' : 'TIME ATTACK',
          title: 'TIME UP',
          big: this.fmtDist(sum.distance),
          stats: [['SCORE', formatInt(sum.score)], ['BEST', this.fmtDist(Math.max(best, sum.distance))], ['TOP SPEED', this.fmtSpeed(sum.topSpeed / MS_TO_MPH)], ['NEAR MISSES', sum.nearMisses]],
          note: `+${formatInt(sum.score)} career points`,
        });
      }
    } else if (sess.mode === 'challenge') {
      const c = sess.challenge, g = c.goal;
      const v = this._goalValue(g.type);
      if (v >= g.value) this._challengeEnd(true);
    }
  }

  _goalValue(type) {
    const s = this.scoring;
    switch (type) {
      case 'speed': return s.topSpeed;
      case 'close': return s.closePasses;
      case 'near': return s.nearMisses;
      case 'distance': return s.distance * M_TO_MI;
      case 'score': return s.score;
      case 'splits': return s.splits;
      default: return 0;
    }
  }

  _challengeEnd(success) {
    const sess = this.session;
    sess.done = true;
    const c = sess.challenge;
    const rec = this.save.challenges[c.id] || {};
    const v = this._goalValue(c.goal.type);
    rec.best = Math.max(rec.best || 0, Math.floor(v));
    let note = '';
    if (success) {
      const first = !rec.done;
      rec.done = true;
      const reward = first ? c.reward : Math.round(c.reward * 0.1);
      this._bankScore(reward);
      note = `+${formatInt(reward)} career points${first ? '' : ' (replay bonus)'}`;
      this.audio.bigChime();
    } else {
      this.audio.fail();
    }
    this.save.challenges[c.id] = rec;
    this.saveNow();
    const sum = this.scoring.summary();
    this._showResults({
      kicker: c.title.toUpperCase(),
      title: success ? 'CHALLENGE COMPLETE' : 'CHALLENGE FAILED',
      big: GOAL_LABEL[c.goal.type](c.goal.type === 'distance' ? +v.toFixed(1) : Math.floor(v)),
      stats: [['SCORE', formatInt(sum.score)], ['NEAR MISSES', sum.nearMisses], ['DISTANCE', this.fmtDist(sum.distance)], ['TOP SPEED', this.fmtSpeed(sum.topSpeed / MS_TO_MPH)]],
      note: success ? note : 'You crashed. Shake it off and go again.',
      retryLabel: success ? 'PLAY AGAIN' : 'RETRY',
    });
  }

  _showResults(r) {
    this.state = 'results';
    this.input.captureKeys = false;
    this.hud.show(false);
    this.ui.showResults(r);
  }

  _rebase() {
    const P = this.player.phys;
    const nx = Math.round(P.X), ny = Math.round(P.Y);
    const dx = -(nx - this.origin.x), dz = ny - this.origin.y;
    this.origin.x = nx;
    this.origin.y = ny;
    this.highway.rebase(this.origin);
    this.camRig.pos.x += dx; this.camRig.pos.z += dz;
    this.camera.position.x += dx; this.camera.position.z += dz;
    this.camRig.cine.pos.x += dx; this.camRig.cine.pos.z += dz;
    for (const ps of [this.smoke, this.sparks, this.flames, this.spray]) for (const q of ps.p) if (q.life > 0) { q.x += dx; q.z += dz; }
  }

  /* ---------------------------------------------------------------- render */
  _render(dt) {
    const car = this.player, P = car.phys, sky = this.sky;
    if (dt > 0) car.sync(this.road, this.origin, dt, sky.night, sky.wet);
    const playing = this.state === 'playing' || this.state === 'paused' || this.state === 'results';
    this.camRig.update(dt || 1e-4, { car, road: this.road, origin: this.origin, settings: this.S, lookBack: playing && this.input.isHeld('lookBack'), layout: this.layout, traffic: this.traffic });
    const cam = this.camera;
    sky.update(dt, cam.position, car.proj.E);
    sky.updateShadow(car.model.root.position);
    const night = sky.night, wet = sky.wet;
    if (dt > 0) this.traffic.render(this.origin, night, wet);
    this.highway.setAmbient(night, wet);
    this.highway.updateLampLights(P.X, P.Y);
    this.renderer.toneMappingExposure = sky.exposure;
    const camMode = this.camRig.mode;
    const inside = camMode === 'cockpit';
    // tyre smoke
    if (dt > 0) {
      const skid = P.skid;
      if (skid > 0.28 && P.speed > 2.5) {
        const n = Math.random() < skid ? 2 : 1;
        for (const w of car.model.wheels) {
          const rear = !w.front;
          if ((rear && (P.slipR > 0.3 || P.wheelspin > 0.1 || (P.hbSlide || 0) > 1)) || (!rear && P.slipF > 3)) {
            w.pivot.getWorldPosition(this._tmpV);
            for (let i = 0; i < n; i++) {
              const g = 0.75 + Math.random() * 0.15;
              this.smoke.emit(this._tmpV.x + (Math.random() - 0.5) * 0.3, this._tmpV.y - 0.15, this._tmpV.z + (Math.random() - 0.5) * 0.3,
                P.VX * 0.25 + (Math.random() - 0.5), 0.6 + Math.random() * 0.6, -P.VY * 0.25 + (Math.random() - 0.5),
                1.6 + Math.random(), 0.6, 2.6, g, g, g + 0.02, 0.22 * skid * (1 - wet * 0.6), -0.3, 0.9);
            }
          }
        }
      }
    }
    // road spray on wet surfaces: behind the player and nearby traffic
    if (dt > 0 && wet > 0.25) this._emitSpray(dt, wet, night);
    const H = this.renderer.getDrawingBufferSize(this._sz || (this._sz = new THREE.Vector2())).y;
    this.smoke.update(dt, cam, H);
    this.spray.update(dt, cam, H);
    this.sparks.update(dt, cam, H);
    this.flames.update(dt, cam, H);
    // glows
    this._glows(H, inside);
    // rain
    this.rain.update(dt, cam.position, this._tmpV.set(P.VX, 0, -P.VY), sky.rainAmt, 1 - night * 0.75);
    // cockpit
    this.cockpit.setVisible(inside);
    if (inside) {
      this.cockpit.update(dt, car, { night, units: this.S.units, road: this.road, hours: sky.hours, rain: sky.rainAmt, manual: this.S.transmission === 'manual', indicator: car.indicator, blink: car.blinkOn, handbrake: (car.hb ?? 0) > 0.3, dome: this.dome });
      if (this.Q.mirror) this.cockpit.renderMirror(this.renderer, this.scene, car);
    }
    // audio
    if (this.audio.ready) {
      const playingAudio = this.state === 'playing' ? 1 : this.state === 'menu' ? 0.32 : 0;
      this.audio.update(dt, {
        rpm: P.rpm, load: P.throttleEff, boost: P.boost, speed: P.speed, skid: P.skid, limiter: P.limiterT > 0,
        interior: inside, rain: sky.rainAmt * (playingAudio > 0 ? 1 : 0.3), wetRoad: wet, scrape: this.state === 'playing' ? this.scrapeLevel : 0,
        active: playingAudio, redline: P.redline, concrete: this.env.surface === 'concrete', wet: wet > 0.3,
      });
    }
    // HUD
    if (this.state === 'playing') this._updateHud(dt);
    // post & render
    const speedBlur = this.S.motionBlur ? smoothstep(28, 100, P.speed) * (inside ? 0.55 : 1) * (camMode === 'cinematic' ? 0.4 : 1) : 0;
    if (this.Q.post) {
      this.postfx.setScene(this.scene, cam);
      this.postfx.set(speedBlur, inside ? 0.3 : 0.38, speedBlur * 0.0025);
      const sunNdc = this._sunNdc || (this._sunNdc = new THREE.Vector3());
      sunNdc.copy(sky.sunDir).multiplyScalar(2000).add(cam.position).project(cam);
      // behind-camera or below-horizon suns get no flare
      const sunFront = sky.sunDir.dot(cam.getWorldDirection(this._tmpV2 || (this._tmpV2 = new THREE.Vector3()))) > 0;
      this.postfx.look({
        night, golden: sky.golden, wet, time: (this._lookT = ((this._lookT || 0) + dt) % 1000),
        sunNdc: sunFront ? sunNdc : null, sunColor: sky.sun.color,
        flare: (1 - night) * (1 - sky.overcast) * smoothstep(-1, 4, sky.elevation) * (inside ? 0.7 : 1),
      });
      this.postfx.render();
    } else {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, cam);
    }
  }

  _emitSpray(dt, wet, night) {
    const sp = this.spray, road = this.road, o = this.origin;
    const shade = lerp(0.82, 0.16, night);
    const tmp = this._sprayTmp || (this._sprayTmp = {});
    const camS = this.player.proj.s;
    const emitBehind = (s, d, dirSign, speed, len, wid, rate) => {
      if (speed < 9) return;
      let n = rate * dt * smoothstep(9, 45, speed) * wet;
      n = Math.floor(n) + (Math.random() < n - Math.floor(n) ? 1 : 0);
      if (!n) return;
      const sr = s - dirSign * len * 0.5;
      road.pos(sr, d, tmp);
      const h = tmp.H;
      const fx = Math.sin(h) * dirSign, fy = Math.cos(h) * dirSign;
      const rx = Math.cos(h), ry = -Math.sin(h);
      for (let i = 0; i < n; i++) {
        const side = (Math.random() < 0.5 ? -1 : 1) * wid * 0.36;
        const X = tmp.X + rx * side, Y = tmp.Y + ry * side;
        const v = speed * (0.45 + Math.random() * 0.2);
        const wx = fx * v + (Math.random() - 0.5) * 2.4, wy = fy * v + (Math.random() - 0.5) * 2.4;
        sp.emit(X - o.x, tmp.E + 0.25 + Math.random() * 0.3, -(Y - o.y), wx, 0.6 + Math.random() * 1.2, -wy,
          0.55 + Math.random() * 0.5, 1.1 + Math.random() * 0.7, 2.8, shade, shade * 1.02, shade * 1.06, 0.05 + 0.04 * wet, 0.8, 2.2);
      }
    };
    const P = this.player.phys;
    emitBehind(camS, this.player.proj.d, 1, P.speed, this.player.dims.L, this.player.dims.W, 70);
    // nearest traffic only
    let k = 0;
    for (const list of [this.traffic.cars, this.traffic.opp]) {
      for (const c of list) {
        if (Math.abs(c.s - camS) > 110 || c.crashed) continue;
        emitBehind(c.s, c.d, c.opp ? -1 : 1, c.speed, c.len, c.wid, c.truck ? 70 : 38);
        if (++k > 14) return;
      }
    }
  }

  _glows(H, inside) {
    const G = this.glows, sky = this.sky, cam = this.camera;
    const night = sky.night;
    const fogFar = this.scene.fog.far;
    const cx = cam.position.x, cy = cam.position.y, cz = cam.position.z;
    const fade = (x, y, z) => {
      const d = Math.hypot(x - cx, y - cy, z - cz);
      return 1 - smoothstep(fogFar * 0.4, fogFar * 1.05, d) * 0.85;
    };
    G.begin();
    const dayK = 0.35 + night * 0.65;
    this.traffic.forEachLamp((x, y, z, kind, I, facing) => {
      const f = fade(x, y, z);
      if (kind === 'tail') {
        // tail lamps read from behind and a little from the side
        const k = I * f * dayK * (0.15 + 0.85 * smoothstep(-0.2, 0.5, facing));
        G.add(x, y, z, k, k * 0.06, k * 0.035, I > 0.9 ? 0.9 : 0.5 + night * 0.15);
      } else if (kind === 'head') {
        // headlights only flare when they point at you (oncoming traffic, cars behind); nothing from the cars you follow
        const aim = smoothstep(0.1, 0.85, facing);
        if (aim <= 0.01) return;
        const k = I * f * aim * 0.75;
        G.add(x, y, z, k, k * 0.94, k * 0.84, 0.75 + 0.35 * aim);
      } else {
        const k = f;
        G.add(x, y, z, k, k * 0.5, k * 0.04, 0.75);
      }
    }, cam.position);
    if (night > 0.2) {
      const lc = this.highway.lampColor;
      const k = smoothstep(0.2, 0.8, night);
      const ox = this.origin.x, oy = this.origin.y;
      this.highway.forEachLamp((l) => {
        const x = l[0] - ox, y = l[2], z = -(l[1] - oy);
        const f = fade(x, y, z) * k;
        G.add(x, y, z, lc.r * f * 0.8, lc.g * f * 0.8, lc.b * f * 0.8, 2.4);
      });
    }
    const car = this.player;
    if (!inside && this.camRig.mode !== 'hood') {
      const brake = car.brakeLight;
      const tails = car.lampWorld(car.model.lamps.tail, this._lamps);
      for (const t of tails) {
        const k = (0.25 + night * 0.4 + brake * 0.8) * dayK;
        G.add(t.x, t.y, t.z, k, k * 0.07, k * 0.04, 0.5 + brake * 0.45);
      }
      // blinking corner lamps and reversing lamps
      if (car.indicator && car.blinkOn) for (const t of car.lampWorld(car.model.lamps.ind.filter((l) => Math.sign(l[0]) === car.indicator), [])) G.add(t.x, t.y, t.z, 1, 0.5, 0.05, 0.5);
      if (car.phys.gear === -1 && car.model.lamps.rev) for (const t of car.lampWorld(car.model.lamps.rev, [])) G.add(t.x, t.y, t.z, 0.9, 0.92, 0.95, 0.55);
      if (car.headOn > 0.1 && this.camRig.mode !== 'bumper') {
        // seen from behind (chase cams) the player's headlights only show as a faint spill
        const heads = car.lampWorld(car.model.lamps.head, []);
        const fwd = this._tmpV.set(0, 0, -1).transformDirection(car.model.body.matrixWorld);
        for (const t of heads) {
          const dx = cx - t.x, dy = cy - t.y, dz = cz - t.z, dl = Math.hypot(dx, dy, dz) || 1;
          const aim = 0.12 + 0.88 * smoothstep(0.1, 0.85, (fwd.x * dx + fwd.y * dy + fwd.z * dz) / dl);
          const k = car.headOn * aim * 0.8;
          G.add(t.x, t.y, t.z, k, k * 0.96, k * 0.9, 0.6 + 0.4 * aim);
        }
      }
    }
    G.end(cam, H);
  }

  _updateHud(dt) {
    const P = this.player.phys, s = this.scoring, sess = this.session;
    const d = {
      speed: Math.abs(P.u), gear: P.gear, rpm: P.rpm, rpmMax: this.rpmMax || 9000, redline: P.redline, boost: P.isTurbo ? P.boost : 0,
      scoring: sess.mode !== 'free', score: s.score, mult: s.mult, combo: s.combo, nearMisses: s.nearMisses,
      distText: this.fmtDist(s.distance),
    };
    if (sess.mode === 'endless') d.best = Math.max(this.save.best.endless, Math.floor(s.score));
    if (sess.mode === 'timeattack') {
      d.timer = sess.timeLeft;
      d.best = undefined;
    }
    if (sess.mode === 'challenge') {
      const g = sess.challenge.goal;
      const v = this._goalValue(g.type);
      const shown = g.type === 'distance' ? v.toFixed(1) : formatInt(Math.min(v, g.value));
      d.objective = { text: `${shown} / ${GOAL_LABEL[g.type](g.value)}`, frac: v / g.value };
    }
    this.hud.update(dt, d);
  }

  /* ---------------------------------------------------------------- garage */
  _garageFrame(dt) {
    const g = this.garage;
    // frame the car in whichever open area shows it largest: beside the panels, or below them on tall screens
    if (!this._gfit || (this._gfitT = (this._gfitT || 0) + 1) % 20 === 0 || this._gfit.screen !== this.ui.screen) {
      const W = window.innerWidth, H = window.innerHeight;
      const areas = [];
      if (this.ui.screen === 'garage') {
        const l = document.getElementById('car-list').getBoundingClientRect();
        const r = document.querySelector('#s-garage .car-info').getBoundingClientRect();
        areas.push([l.right, 0, r.left, H]); // between the list and the info panel
        areas.push([l.right, r.bottom + 20, W, H]); // under the info panel
      } else {
        const r = document.querySelector('#s-custom .custom-panel').getBoundingClientRect();
        areas.push([0, 0, r.left, H]);
        areas.push([0, r.bottom + 20, W, H]);
      }
      let best = null;
      for (const [x0, y0, x1, y1] of areas) {
        const fw = x1 - x0, fh = y1 - y0;
        if (fw < 120 || fh < 160) continue;
        const fit = g.fitFor(fw, fh, H);
        if (!best || fit < best.fit - 0.05) best = { fit, offset: (W / 2 - (x0 + x1) / 2) / W, offsetY: y0 > 0 ? (H / 2 - (y0 + y1) / 2) / H : 0 };
      }
      this._gfit = { screen: this.ui.screen, ...(best || { fit: 1, offset: 0, offsetY: 0 }) };
    }
    g.update(dt, this._gfit.offset, this._gfit.fit, this._gfit.offsetY);
    if (this.revT >= 0 && this.audio.ready) {
      this.revT += dt;
      const t = this.revT;
      const red = g.def.phys.redline;
      const rpm = t < 0.25 ? g.def.phys.idle : t < 1.0 ? lerp(g.def.phys.idle, red * 0.92, (t - 0.25) / 0.75) : t < 1.9 ? lerp(red * 0.92, g.def.phys.idle, (t - 1.0) / 0.9) : g.def.phys.idle;
      const load = t > 0.25 && t < 1.0 ? 1 : 0;
      if (t > 1.0 && t - dt <= 1.0) {
        if (g.def.engine.turbo) this.audio.blowOff(0.8, g.def.engine.flutter);
        const ex = this.getCustom(g.def.id).exhaust;
        const n = ex === 'straight' ? 8 : ex === 'sport' ? 5 : 2;
        for (let i = 0; i < n; i++) setTimeout(() => this.audio.pop(0.8), 60 + i * (70 + Math.random() * 60));
      }
      this.audio.update(dt, { rpm, load, boost: load ? clamp((t - 0.4) * 2, 0, 1) : 0, speed: 0, skid: 0, limiter: false, interior: false, rain: 0, active: 1, redline: red });
      if (t > 2.6) this.revT = -1;
    } else if (this.audio.ready) {
      this.audio.update(dt, { rpm: 900, load: 0, boost: 0, speed: 0, skid: 0, limiter: false, interior: false, rain: 0, active: 0, redline: 7000 });
    }
    this.renderer.toneMappingExposure = 0.9;
    this.renderer.setRenderTarget(null);
    g.render(this.renderer);
  }
}
