// Upgrades -> physics. Every fitted part's stat effects (config/parts.js `fx`) and the stance settings are
// folded into an effective copy of the car's physics spec, which the physics model, the garage stats and the
// performance index all read. Effects are fractions: power +0.08 = 8% more power, mass -0.07 = 7% lighter.
import { GROUP_BY_KEY, itemOf, normalizeCustom } from '../config/parts.js';
import { clamp } from '../core/utils.js';

const ZERO = { power: 0, mass: 0, grip: 0, rearGrip: 0, brake: 0, aero: 0, drag: 0, shift: 0, accel: 0, launch: 0, roll: 0, lag: 0 };

/** Summed stat effects of everything fitted, plus stance. */
export function upgradeEffects(def, custom) {
  const cu = normalizeCustom(def, custom);
  const fx = { ...ZERO };
  for (const [key, g] of Object.entries(GROUP_BY_KEY)) {
    if (g.type !== 'part') continue;
    const it = itemOf(key, cu[key]);
    if (it?.fx) for (const [k, v] of Object.entries(it.fx)) fx[k] = (fx[k] || 0) + v;
  }
  // stance: a lower car carries its weight lower; a little negative camber and a wider track add grip,
  // too much camber costs it; stiffer springs roll less
  const ride = (cu.rideF + cu.rideR) / 2;
  fx.cg = ride / 1000;
  const cam = -(cu.camberF + cu.camberR) / 2;
  fx.grip += cam <= 2.5 ? cam * 0.006 : 0.015 - (cam - 2.5) * 0.007;
  fx.grip += ((cu.trackF + cu.trackR) / 2 / 1000) * 0.15;
  fx.roll += -((cu.stiff - 50) / 50) * 0.25;
  fx.freq = ((cu.stiff - 50) / 50) * 0.25 + (cu.springs !== 'stock' ? 0.08 : 0);
  return fx;
}

/** The car's physics spec with all upgrades applied. */
export function effectivePhys(def, custom) {
  const p = def.phys;
  const fx = upgradeEffects(def, custom);
  const power = 1 + fx.power;
  const drag = 1 + fx.drag + fx.aero * 0.06; // downforce costs a little drag
  return {
    ...p,
    hp: p.hp * power,
    mass: p.mass * (1 + fx.mass),
    grip: p.grip * (1 + fx.grip),
    rearGrip: (p.rearGrip ?? 1) * (1 + fx.rearGrip),
    brakeG: p.brakeG * (1 + fx.brake),
    downforce: (p.downforce ?? 0.2) * (1 + fx.aero),
    // top speed where power meets drag: v ~ (P / CdA)^(1/3)
    topSpeed: p.topSpeed * Math.cbrt(power / drag),
    shiftTime: (p.shiftTime ?? 0.18) * (1 + fx.shift),
    turboLag: (p.turboLag || 0.5) * (1 + fx.lag),
    cgH: p.cgH + fx.cg * 0.6,
    rollGain: p.rollGain * clamp(1 + fx.roll + fx.cg * 2, 0.4, 1.3),
    susFreq: p.susFreq * (1 + fx.freq),
    launch: fx.launch,
    accel: fx.accel,
  };
}

/* ---------------------------------------------------------------- ratings */
export const PI_CLASSES = [
  { id: 'D', max: 500, color: '#3fb5e8' }, { id: 'C', max: 600, color: '#f2c230' }, { id: 'B', max: 700, color: '#ff8a1e' },
  { id: 'A', max: 800, color: '#ff3b55' }, { id: 'S1', max: 900, color: '#b05cff' }, { id: 'S2', max: 998, color: '#3f6bff' }, { id: 'X', max: 999, color: '#3bdc7a' },
];
export const piClass = (pi) => PI_CLASSES.find((c) => pi <= c.max) || PI_CLASSES[PI_CLASSES.length - 1];

/**
 * Stats on a 0-10 scale (speed, acceleration, launch, handling, braking) plus raw figures and the performance
 * index. zeroSixty comes from running the physics; pass `sim` (a function (phys) -> seconds) to supply it.
 */
export function ratings(def, custom, sim) {
  const ep = effectivePhys(def, custom);
  const zeroSixty = sim ? sim(ep) : 5;
  const speed = clamp((ep.topSpeed - 100) / 16, 0, 10);
  const accel = clamp((7.5 - zeroSixty) / 0.55, 0, 10);
  const pw = ep.hp / ep.mass;
  const launch = clamp(accel * 0.6 + (ep.drive === 'AWD' ? 2.2 : ep.drive === 'FWD' ? 0.6 : 1.2) + ep.launch * 6 + pw * 3, 0, 10);
  const handling = clamp(ep.grip * 7.2 - (ep.mass - 1300) / 380 + ep.downforce * 1.3 + (ep.tireB - 14) * 0.22, 0, 10);
  const braking = clamp(ep.brakeG * 6.6 - (ep.mass - 1400) / 520, 0, 10);
  const score = speed * 0.22 + accel * 0.28 + launch * 0.08 + handling * 0.28 + braking * 0.14;
  const pi = Math.round(clamp(100 + score * 92, 100, 999));
  return { speed, accel, launch, handling, braking, pi, cls: piClass(pi), topSpeed: ep.topSpeed, zeroSixty, hp: ep.hp, mass: ep.mass };
}
