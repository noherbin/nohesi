// Interior design for every player car. Each entry drives the cockpit builder: dashboard architecture,
// instrument cluster, centre screen, vents, console and shifter, steering wheel, seats, materials and lighting.
// The designs follow the real-world class each fictional car is modelled on.
//
// palette keys
//   seat / seatSide / insert: upholstery colours; insertTex: leather | alcantara | cloth | quilt | channel
//   stitch: thread colour; dash / dashTop / door / doorInsert / headliner / carpet: panel colours
//   trim: main decorative trim (carbon | silver | alu | wood | piano | redCarbon | titanium)
//   accent: brand accent colour (needles, markers); ambient: ambient light colour or null
// eyeDY / eyeDZ: seating position relative to the body's default eye point (m); low cars sit lower.

export const INTERIORS = {
  // 2010s Japanese rally sedan (WRX STI class): upright two-tier dash, twin analog dials with a centre
  // multi-function display, small touchscreen inset in the stack, three climate knobs, 6-speed manual with
  // a leather boot and a mechanical handbrake, alcantara-centre sport seats with red stitching.
  kaze: {
    eyeDY: 0.0, eyeDZ: 0.0,
    palette: { seat: '#1b1b1e', seatSide: '#1b1b1e', insert: '#2a2b30', insertTex: 'alcantara', stitch: '#c8102e', dash: '#222326', dashTop: '#1d1e21', door: '#242528', doorInsert: '#2b2c31', headliner: '#2b2c30', carpet: '#141416', trim: 'carbon', trim2: 'silver', accent: '#e8222e', ambient: null },
    dash: 'layered', cluster: 'twinAnalog', screen: 'inset', vents: 'rect', climate: 'knobs',
    console: 'manual', knob: 'ball', handbrake: true,
    wheel: { style: 'sport3', R: 0.185, rim: 'leather', marker: null, paddles: false, buttons: true, hub: 'rounded' },
    gauge: { face: '#0b0b0d', tick: '#f4f4f4', num: '#f4f4f4', needle: '#ff2a1a', ring: '#c8102e', mfd: '#ff3b30', redline: '#e8222e' },
    seats: 'sport', rear: true, pedals: 'manual', hud: false, doorStyle: 'sport', start: 'button',
  },
  // Modern Japanese hot hatch (Type R class): low horizontal dash with a red honeycomb strip, fully digital
  // cluster with a sweeping tach bar and shift lights, floating 7" tablet, round aluminium shift ball,
  // red-and-black bucket seats with harness slots.
  sakura: {
    eyeDY: -0.01, eyeDZ: 0.0,
    palette: { seat: '#141416', seatSide: '#b01020', insert: '#9e0f1d', insertTex: 'alcantara', stitch: '#e8222e', dash: '#1e1f22', dashTop: '#19191c', door: '#1f2023', doorInsert: '#8f0e1a', headliner: '#1a1a1d', carpet: '#121214', trim: 'redCarbon', trim2: 'alu', accent: '#ff1e2d', ambient: '#ff2030' },
    dash: 'horizontal', cluster: 'digitalSport', screen: 'floating', vents: 'slim', climate: 'panel',
    console: 'manual', knob: 'alu', handbrake: true,
    wheel: { style: 'hatch3', R: 0.182, rim: 'alcantara', marker: '#e8222e', paddles: false, buttons: true, hub: 'shield' },
    gauge: { face: '#050506', tick: '#ffffff', num: '#ffffff', needle: '#ff1e2d', ring: '#ff1e2d', mfd: '#ff1e2d', redline: '#ff1e2d' },
    seats: 'bucket', rear: true, pedals: 'manual', hud: false, doorStyle: 'sport', start: 'button',
  },
  // Early-90s twin-rotor coupe (FD RX-7 class): driver-wrapped cockpit with the centre stack angled toward the
  // driver, big centre tachometer flanked by speedo and small gauges, orange needles on black faces, a
  // period head unit with green LCD, three-spoke alloy wheel, cloth sport seats, short-throw manual.
  raiden: {
    eyeDY: -0.015, eyeDZ: 0.02,
    palette: { seat: '#1e1e21', seatSide: '#1e1e21', insert: '#2e2f33', insertTex: 'cloth', stitch: '#3a3a3e', dash: '#29292c', dashTop: '#242427', door: '#28282b', doorInsert: '#333438', headliner: '#3b3b3e', carpet: '#19191a', trim: 'piano', trim2: 'silver', accent: '#ff7a1a', ambient: null },
    dash: 'wrap', cluster: 'retroAnalog', screen: 'radio', vents: 'round', climate: 'sliders',
    console: 'manual', knob: 'leatherRound', handbrake: true,
    wheel: { style: 'classic3', R: 0.18, rim: 'leather', marker: null, paddles: false, buttons: false, hub: 'small' },
    gauge: { face: '#09090a', tick: '#ffffff', num: '#ffffff', needle: '#ff7a1a', ring: '#5a5a60', mfd: '#7dff7a', redline: '#ff3b30' },
    seats: 'retro', rear: false, pedals: 'manual', hud: false, doorStyle: 'retro', start: 'key',
  },
  // German luxury super-sedan (M5 class): broad sweeping dash with an open-pore wood band, one curved glass
  // panel holding the digital cluster and the wide infotainment screen, slim full-width vents, warm ambient
  // light, thick M-style wheel with tricolour stitching, short e-shifter with rotary controller, quilted
  // cognac leather comfort seats and a rear bench.
  kessler: {
    eyeDY: 0.015, eyeDZ: 0.0,
    palette: { seat: '#7a4423', seatSide: '#5e3219', insert: '#8a5029', insertTex: 'quilt', stitch: '#e9d4bf', dash: '#232326', dashTop: '#1c1c1f', door: '#2a2a2d', doorInsert: '#7a4423', headliner: '#8d8a84', carpet: '#1d1b19', trim: 'wood', trim2: 'chrome', accent: '#1c69d4', ambient: '#ff9a3c' },
    dash: 'luxury', cluster: 'curvedPanel', screen: 'curvedPanel', vents: 'slim', climate: 'touch',
    console: 'auto', knob: 'crystal', handbrake: false,
    wheel: { style: 'mThick', R: 0.186, rim: 'leather', marker: null, tricolor: true, paddles: true, buttons: true, hub: 'wide' },
    gauge: { face: '#05070b', tick: '#d9e6ff', num: '#e8eefc', needle: '#ff3b2f', ring: '#1c69d4', mfd: '#5fb0ff', redline: '#ff3b2f' },
    seats: 'comfort', rear: true, pedals: 'auto', hud: true, doorStyle: 'luxury', start: 'button',
  },
  // Rear-engined German sports coupe (911 class): long horizontal dash, five overlapping round dials with the
  // tachometer in the middle, analog chrono clock on the dash top, integrated touchscreen, small PDK toggle,
  // GT sport wheel with a yellow 12 o'clock marker, black leather sport seats with crested headrests, 2+2.
  strada: {
    eyeDY: -0.02, eyeDZ: 0.0,
    palette: { seat: '#16161a', seatSide: '#16161a', insert: '#1f1f23', insertTex: 'channel', stitch: '#d4b30f', dash: '#1d1d20', dashTop: '#18181b', door: '#1f1f22', doorInsert: '#232327', headliner: '#1c1c1f', carpet: '#121214', trim: 'alu', trim2: 'piano', accent: '#e8c21c', ambient: '#e9f0ff' },
    dash: 'horizontal', cluster: 'fiveDial', screen: 'integrated', vents: 'slim', climate: 'buttons', clock: true,
    console: 'pdk', knob: 'pdk', handbrake: false,
    wheel: { style: 'gt3', R: 0.18, rim: 'leather', marker: '#e8c21c', paddles: true, buttons: false, hub: 'round' },
    gauge: { face: '#0a0a0b', tick: '#ffffff', num: '#ffffff', needle: '#ff4a1a', ring: '#3a3a40', mfd: '#ffffff', redline: '#ff3b30' },
    seats: 'sport2', rear: 'plus2', pedals: 'auto', hud: false, doorStyle: 'gt', start: 'key',
  },
  // American muscle car (Mustang/Camaro class): chunky twin-cowl "double brow" dash, deep twin tunnel gauges
  // with a digital centre, three big round vents and a row of aluminium toggle switches, 8" screen inset in the
  // stack, chunky flat-bottom wheel, cue-ball shifter, bolstered leather seats with stripes, bench rear.
  ironhorse: {
    eyeDY: 0.0, eyeDZ: 0.0,
    palette: { seat: '#151517', seatSide: '#151517', insert: '#1c1c1f', insertTex: 'channel', stitch: '#e05a12', dash: '#262628', dashTop: '#202022', door: '#252527', doorInsert: '#1b1b1d', headliner: '#262628', carpet: '#151516', trim: 'alu', trim2: 'chrome', accent: '#e05a12', ambient: '#2b7dff' },
    dash: 'muscle', cluster: 'twinTunnel', screen: 'inset', vents: 'roundBig', climate: 'toggles',
    console: 'manual', knob: 'cueBall', handbrake: true,
    wheel: { style: 'muscle3', R: 0.188, rim: 'leather', marker: null, paddles: false, buttons: true, hub: 'big' },
    gauge: { face: '#08080a', tick: '#f2f2f2', num: '#f2f2f2', needle: '#e05a12', ring: '#9aa0a8', mfd: '#2b7dff', redline: '#e05a12' },
    seats: 'muscle', rear: true, pedals: 'manual', hud: false, doorStyle: 'muscle', start: 'button',
  },
  // Mid-engined Italian V10 supercar (Huracán class): angular hexagonal design language, full-width TFT with a
  // big central tach, hexagonal vents, aircraft-style toggle switches under the screen, red flip-cover start
  // button, no gear lever (paddles + console buttons), carbon-shell bucket seats, very low seating.
  veloce: {
    eyeDY: -0.05, eyeDZ: 0.03,
    palette: { seat: '#121214', seatSide: '#121214', insert: '#1c1d20', insertTex: 'alcantara', stitch: '#7cc42d', dash: '#18181a', dashTop: '#141416', door: '#17171a', doorInsert: '#1d1e21', headliner: '#141416', carpet: '#101012', trim: 'carbon', trim2: 'alu', accent: '#7cc42d', ambient: null },
    dash: 'hex', cluster: 'hexTFT', screen: 'small', vents: 'hex', climate: 'toggles',
    console: 'buttons', knob: null, handbrake: false,
    wheel: { style: 'super', R: 0.176, rim: 'alcantara', marker: '#7cc42d', paddles: 'big', buttons: true, hub: 'hex', carbonTop: true },
    gauge: { face: '#030304', tick: '#ffffff', num: '#ffffff', needle: '#7cc42d', ring: '#7cc42d', mfd: '#7cc42d', redline: '#ff2a3d' },
    seats: 'carbonBucket', rear: false, pedals: 'auto', hud: false, doorStyle: 'super', start: 'flip',
  },
  // Carbon-tub hypercar: minimal floating carbon dash beam, column-mounted digital pod that moves with the
  // wheel adjustment, small floating tablet, overhead switch strip, exposed carbon tub and sills, squared
  // race wheel with shift lights, fixed-back carbon race seats with four-point harnesses, lowest seating.
  aether: {
    eyeDY: -0.065, eyeDZ: 0.04,
    palette: { seat: '#0f0f11', seatSide: '#0f0f11', insert: '#202024', insertTex: 'alcantara', stitch: '#c9a34a', dash: '#121214', dashTop: '#101012', door: '#121214', doorInsert: '#1a1a1d', headliner: '#121214', carpet: '#0e0e10', trim: 'carbon', trim2: 'titanium', accent: '#c9a34a', ambient: '#3fd8ff' },
    dash: 'tub', cluster: 'pod', screen: 'tablet', vents: 'round', climate: 'overhead',
    console: 'spine', knob: null, handbrake: false,
    wheel: { style: 'race', R: 0.165, rim: 'alcantara', marker: '#c9a34a', paddles: 'big', buttons: true, hub: 'none', lights: true },
    gauge: { face: '#020203', tick: '#e8eef5', num: '#e8eef5', needle: '#3fd8ff', ring: '#c9a34a', mfd: '#3fd8ff', redline: '#ff2a3d' },
    seats: 'race', rear: false, pedals: 'auto', hud: true, doorStyle: 'hyper', start: 'flip',
  },
  // 80s Japanese hatch coupe (AE86 class): flat two-tier fascia with a square binnacle, 80s digital dash with
  // a bar-graph tachometer and seven-segment speed, tape head unit, four-spoke wheel with a big pad,
  // grey-and-red cloth sport seats, long-throw manual and a pull-up handbrake.
  tsubame: {
    eyeDY: 0.005, eyeDZ: 0.0,
    palette: { seat: '#2b2c30', seatSide: '#2b2c30', insert: '#7a1c22', insertTex: 'cloth', stitch: '#3a3b40', dash: '#2a2b2e', dashTop: '#252629', door: '#2c2d30', doorInsert: '#3a3b40', headliner: '#8c8a86', carpet: '#1d1d1f', trim: 'silver', trim2: 'silver', accent: '#ffae2a', ambient: null },
    dash: 'eighties', cluster: 'digital80', screen: 'radio', vents: 'rect', climate: 'sliders',
    console: 'manual', knob: 'ball', handbrake: true,
    wheel: { style: 'four80', R: 0.185, rim: 'leather', marker: null, paddles: false, buttons: false, hub: 'big' },
    gauge: { face: '#050403', tick: '#ffae2a', num: '#ffae2a', needle: '#58ff6a', ring: '#ffae2a', mfd: '#58ff6a', redline: '#ff3b20' },
    seats: 'retro', rear: true, pedals: 'manual', hud: false, doorStyle: 'retro', start: 'key',
  },
  // 90s Japanese twin-turbo GT (R34 class): stack angled at the driver, multi-function display hooded on the dash
  // top, speedo / big tach / boost gauge, slim three-spoke wheel, grey-and-blue bucket seats, short shifter.
  shinden: {
    eyeDY: -0.01, eyeDZ: 0.01,
    palette: { seat: '#1c1d21', seatSide: '#1c1d21', insert: '#38414f', insertTex: 'alcantara', stitch: '#38b6e0', dash: '#24252a', dashTop: '#1f2024', door: '#25262a', doorInsert: '#30333a', headliner: '#3a3b40', carpet: '#17171a', trim: 'titanium', trim2: 'silver', accent: '#38b6e0', ambient: null },
    dash: 'binnacle', cluster: 'gtrTriple', screen: 'inset', vents: 'rect', climate: 'knobs',
    console: 'manual', knob: 'alu', handbrake: true,
    wheel: { style: 'momo3', R: 0.182, rim: 'leather', marker: '#38b6e0', paddles: false, buttons: false, hub: 'small' },
    gauge: { face: '#08090b', tick: '#ffffff', num: '#ffffff', needle: '#ff3b2f', ring: '#38b6e0', mfd: '#ffae2a', redline: '#ff3b2f' },
    seats: 'bucket', rear: true, pedals: 'manual', hud: false, doorStyle: 'sport', start: 'key',
  },
  // German super estate (RS6 class): black-glass dash with stacked touchscreens, full digital cockpit with a
  // map between two dials, flat-bottom wheel with a red RS button, honeycomb-quilted sport seats, e-shifter.
  vogt: {
    eyeDY: 0.015, eyeDZ: 0.0,
    palette: { seat: '#141416', seatSide: '#141416', insert: '#202024', insertTex: 'quilt', stitch: '#c8102e', dash: '#1e1f22', dashTop: '#18191b', door: '#202124', doorInsert: '#242528', headliner: '#1c1c1e', carpet: '#121214', trim: 'carbon', trim2: 'alu', accent: '#c8102e', ambient: '#e8f0ff' },
    dash: 'quattro', cluster: 'virtualCockpit', screen: 'integrated', vents: 'slim', climate: 'touch',
    console: 'auto', knob: 'crystal', handbrake: false,
    wheel: { style: 'rsFlat', R: 0.184, rim: 'alcantara', marker: '#c8102e', paddles: true, buttons: true, hub: 'rounded' },
    gauge: { face: '#020304', tick: '#e8eef5', num: '#e8eef5', needle: '#c8102e', ring: '#c8102e', mfd: '#ff3b30', redline: '#ff3b30' },
    seats: 'sport', rear: true, pedals: 'auto', hud: true, doorStyle: 'luxury', start: 'button',
  },
  // Electric super sedan (Taycan class): slim floating dash with a light line, curved free-standing driver display,
  // centre and passenger touchscreens, thin two-spoke wheel, light grey sustainable upholstery, cool ambient light.
  volta: {
    eyeDY: -0.005, eyeDZ: 0.0,
    palette: { seat: '#bfc3c7', seatSide: '#9da2a8', insert: '#d6d9dc', insertTex: 'channel', stitch: '#7a8088', dash: '#1b1c1f', dashTop: '#2a2c30', door: '#2a2c30', doorInsert: '#c6cacd', headliner: '#cfd2d4', carpet: '#2a2b2e', trim: 'alu', trim2: 'piano', accent: '#3fd8ff', ambient: '#3fd8ff' },
    dash: 'ev', cluster: 'evStrip', screen: 'integrated', vents: 'slim', climate: 'touch',
    console: 'buttons', knob: null, handbrake: false,
    wheel: { style: 'ev2', R: 0.18, rim: 'leather', marker: null, paddles: false, buttons: true, hub: 'rounded' },
    gauge: { face: '#05070a', tick: '#e8f2ff', num: '#e8f2ff', needle: '#3fd8ff', ring: '#3fd8ff', mfd: '#3fd8ff', redline: '#ff3b30' },
    seats: 'sport2', rear: true, pedals: 'auto', hud: true, doorStyle: 'luxury', start: 'button',
  },
  // British V12 grand tourer (DB11 class): leather-wrapped fascia with stitching and chrome, counter-rotating tach,
  // screen rising from the dash top, squared two-spoke wheel, quilted ox-blood leather, glass gear buttons.
  ashcombe: {
    eyeDY: -0.015, eyeDZ: 0.01,
    palette: { seat: '#5a1a1c', seatSide: '#3e1213', insert: '#6a2224', insertTex: 'quilt', stitch: '#e9d4bf', dash: '#1c1a19', dashTop: '#3a1415', door: '#221f1e', doorInsert: '#5a1a1c', headliner: '#2a2624', carpet: '#1d1918', trim: 'wood', trim2: 'chrome', accent: '#c9ccd0', ambient: '#ffb070' },
    dash: 'gt', cluster: 'twinCounter', screen: 'integrated', vents: 'slim', climate: 'buttons',
    console: 'pdk', knob: 'pdk', handbrake: false,
    wheel: { style: 'gtFlat', R: 0.186, rim: 'leather', marker: null, paddles: true, buttons: true, hub: 'wide' },
    gauge: { face: '#0a0a0b', tick: '#e9e9ea', num: '#e9e9ea', needle: '#ffffff', ring: '#c9ccd0', mfd: '#9fc6ff', redline: '#c8102e' },
    seats: 'comfort', rear: 'plus2', pedals: 'auto', hud: false, doorStyle: 'gt', start: 'button',
  },
  // Italian V12 supercar (Aventador class): fighter-jet centre spine, aviation strakes, a TFT with a speed tape,
  // big tach and G-meter, red flip-cover start, Y-spoke carbon wheel, hexagon-quilted carbon buckets.
  furia: {
    eyeDY: -0.055, eyeDZ: 0.035,
    palette: { seat: '#111113', seatSide: '#111113', insert: '#26221a', insertTex: 'quilt', stitch: '#f2c230', dash: '#151517', dashTop: '#121214', door: '#141416', doorInsert: '#1c1c1f', headliner: '#121214', carpet: '#0f0f11', trim: 'carbon', trim2: 'titanium', accent: '#f2c230', ambient: null },
    dash: 'jet', cluster: 'jetTFT', screen: 'small', vents: 'round', climate: 'toggles',
    console: 'buttons', knob: null, handbrake: false,
    wheel: { style: 'jetY', R: 0.176, rim: 'alcantara', marker: '#f2c230', paddles: 'big', buttons: false, hub: 'none', carbonTop: true },
    gauge: { face: '#020202', tick: '#ffffff', num: '#ffffff', needle: '#f2c230', ring: '#f2c230', mfd: '#f2c230', redline: '#ff2a3d' },
    seats: 'carbonBucket', rear: false, pedals: 'auto', hud: false, doorStyle: 'super', start: 'flip',
  },
};

/** Interior for a car definition (falls back to the sedan design for anything unlisted). */
export function interiorFor(def) {
  return INTERIORS[def.id] || INTERIORS.kaze;
}
