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

/* ---------------------------------------------------------------- classes
 * NO HESI rates a build by PACE: one open-ended number, read like a speed, for how hard the car can run
 * through traffic. It blends three axes, TOP END (top speed), PUNCH (0-60 and launch) and GRIP (cornering and
 * braking), and has no ceiling, so a fully built hypercar keeps climbing.
 * Classes are speed limits. A car runs in the lowest LIMIT its pace fits under (pace 113 -> LIMIT 120); past
 * 200 there is NO LIMIT. Whichever axis stands out most for the car's level gives the build its STYLE.
 */
export const LIMITS = [
  { id: '80', max: 80, name: 'LIMIT 80', color: '#7cc8ff' },
  { id: '100', max: 100, name: 'LIMIT 100', color: '#42dcc0' },
  { id: '120', max: 120, name: 'LIMIT 120', color: '#9be03a' },
  { id: '140', max: 140, name: 'LIMIT 140', color: '#ffd23f' },
  { id: '160', max: 160, name: 'LIMIT 160', color: '#ff9a2e' },
  { id: '180', max: 180, name: 'LIMIT 180', color: '#ff4b5c' },
  { id: '200', max: 200, name: 'LIMIT 200', color: '#d35cff' },
  { id: 'NL', max: Infinity, name: 'NO LIMIT', color: '#f4f4f0', open: true },
];
export const limitOf = (pace) => LIMITS.find((c) => pace <= c.max);
export const nextLimit = (cls) => LIMITS[LIMITS.indexOf(cls) + 1] || null;
/** Where a pace sits inside its class, 0 at the class below's limit and 1 at this class's limit. */
export function limitProgress(pace, cls) {
  if (cls.open) return 1;
  const i = LIMITS.indexOf(cls);
  const lo = i > 0 ? LIMITS[i - 1].max : cls.max - 20;
  return clamp((pace - lo) / (cls.max - lo), 0, 1);
}

export const STYLES = {
  top: { id: 'top', name: 'MISSILE', desc: 'Strongest at the top end. Wants open lanes and long pulls.' },
  punch: { id: 'punch', name: 'SPRINTER', desc: 'Strongest off the line. Shoots gaps and recovers from slowdowns.' },
  grip: { id: 'grip', name: 'WEAVER', desc: 'Strongest in traffic. Turns in late and brakes later.' },
  bal: { id: 'bal', name: 'BALANCED', desc: 'No axis stands out. Does a bit of everything.' },
};
// typical value and spread of each axis across the stock fleet, so styles are judged against other cars
const AXIS_NORM = { top: [5.4, 1.9], punch: [6.4, 2.1], grip: [8.4, 1.6] };
const STYLE_MARGIN = 0.45;
function styleOf(axes) {
  const z = {};
  for (const k in AXIS_NORM) z[k] = (axes[k] - AXIS_NORM[k][0]) / AXIS_NORM[k][1];
  const mean = (z.top + z.punch + z.grip) / 3;
  let best = 'bal', bd = STYLE_MARGIN;
  for (const k of ['grip', 'punch', 'top']) if (z[k] - mean > bd) { bd = z[k] - mean; best = k; }
  return STYLES[best];
}

/**
 * Stats on a 0-10 scale (speed, acceleration, launch, handling, braking) for the bars, plus raw figures, the
 * three class axes, PACE, its LIMIT class and the build STYLE. zeroSixty comes from running the physics; pass
 * `sim` (a function (phys) -> seconds) to supply it.
 */
export function ratings(def, custom, sim) {
  const ep = effectivePhys(def, custom);
  const zeroSixty = sim ? sim(ep) : 5;
  const pw = ep.hp / ep.mass;
  // unclamped scores (about 0-10 for stock cars; upgrades can push past 10)
  const rs = (ep.topSpeed - 100) / 16;
  const ra = (7.5 - zeroSixty) / 0.55;
  const rl = ra * 0.6 + (ep.drive === 'AWD' ? 2.2 : ep.drive === 'FWD' ? 0.6 : 1.2) + ep.launch * 6 + pw * 3;
  const rh = ep.grip * 7.2 - (ep.mass - 1300) / 380 + ep.downforce * 1.3 + (ep.tireB - 14) * 0.22;
  const rb = ep.brakeG * 6.6 - (ep.mass - 1400) / 520;
  const axes = { top: rs, punch: ra * 0.75 + rl * 0.25, grip: rh * 0.6 + rb * 0.4 };
  const pace = Math.max(1, Math.round(19.6 * (axes.top * 0.3 + axes.punch * 0.36 + axes.grip * 0.34) - 2.5));
  const cls = limitOf(pace);
  const c10 = (v) => clamp(v, 0, 10);
  return {
    speed: c10(rs), accel: c10(ra), launch: c10(rl), handling: c10(rh), braking: c10(rb),
    axes, pace, cls, style: styleOf(axes),
    topSpeed: ep.topSpeed, zeroSixty, hp: ep.hp, mass: ep.mass,
  };
}
