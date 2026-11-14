// Persistent progress & settings (localStorage, with an in-memory fallback).
const KEY = 'nohesi.save.v1';

export const DEFAULT_SETTINGS = {
  quality: 'high',
  autoQuality: true,
  motionBlur: true,
  shake: 1,
  fov: 62,
  cockpitFov: 68,
  units: 'mph',
  transmission: 'auto',
  tc: true,
  assist: true,
  steerSpeed: 1,
  steerSens: 1,
  master: 0.8,
  engine: 0.9,
  sfx: 0.8,
  music: 0.5,
  musicOn: false,
  showHud: true,
  unlockAll: false,
  camera: 'chase',
  plate: 'NO HESI',
};

export function defaultSave() {
  return {
    v: 1,
    career: 0,
    best: { endless: 0, timeattack: 0 },
    selectedCar: 'kaze',
    customs: {},
    challenges: {},
    settings: { ...DEFAULT_SETTINGS },
    stats: { distance: 0, nearMisses: 0, runs: 0, topSpeed: 0, crashes: 0 },
    last: { mode: 'endless', env: 'la', time: 'default', weather: 'clear', density: 'normal' },
  };
}

let memory = null;

export function loadSave() {
  const base = defaultSave();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return {
        ...base, ...d,
        best: { ...base.best, ...(d.best || {}) },
        settings: { ...base.settings, ...(d.settings || {}) },
        stats: { ...base.stats, ...(d.stats || {}) },
        last: { ...base.last, ...(d.last || {}) },
        customs: d.customs || {},
        challenges: d.challenges || {},
      };
    }
  } catch (e) { /* storage unavailable */ }
  return memory || base;
}

export function writeSave(data) {
  memory = data;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) { /* storage unavailable: keep in memory */ }
}
