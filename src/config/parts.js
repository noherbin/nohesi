// Customisation catalogue: every category, slot and item the Customize screen offers, with prices, tiers,
// stat effects and which vehicles each item fits. Everything here is data: the car builder, physics and UI
// read it, so adding a car or a part means adding entries here (plus geometry for a genuinely new shape).
//
// custom (per car, saved in save.customs[carId]) holds one value per slot key below. normalizeCustom() fills
// in factory values and upgrades saves written by older versions of the game.

import { INTERIORS } from './interiors.js';

const interiorSpec = (def) => INTERIORS[def.id] || INTERIORS.kaze;

/* ---------------------------------------------------------------- vehicles */
// tags describe a car for compatibility rules: body style, origin, era, engine position
export const CAR_TAGS = {
  kaze: ['jdm', 'sedan', 'modern', 'rally', 'front'],
  sakura: ['jdm', 'hatch', 'modern', 'front'],
  tsubame: ['jdm', 'hatch', 'classic', 'front'],
  raiden: ['jdm', 'coupe', 'classic', 'front'],
  shinden: ['jdm', 'coupe', 'front'],
  kessler: ['euro', 'sedan', 'luxury', 'front'],
  strada: ['euro', 'coupe', 'rear'],
  vogt: ['euro', 'wagon', 'front'],
  volta: ['ev', 'sedan', 'modern', 'front'],
  ironhorse: ['muscle', 'coupe', 'american', 'classic', 'front'],
  ashcombe: ['gt', 'coupe', 'luxury', 'front'],
  veloce: ['super', 'mid'],
  furia: ['super', 'mid'],
  aether: ['hyper', 'mid'],
};
export const tagsOf = (def) => CAR_TAGS[def.id] || ['modern', 'front'];
const any = (...t) => (def) => tagsOf(def).some((x) => t.includes(x));
const none = (...t) => (def) => !tagsOf(def).some((x) => t.includes(x));
const and = (...fs) => (def) => fs.every((f) => f(def));
const notEV = (def) => !def.engine.electric;
const isEV = (def) => !!def.engine.electric;
const hasCabin = (def) => !!def.body.cabin;

/* ---------------------------------------------------------------- tiers */
export const TIERS = {
  stock: { name: 'STOCK', color: '#9aa0a8' },
  street: { name: 'STREET', color: '#4fb3ff' },
  sport: { name: 'SPORT', color: '#ffb020' },
  track: { name: 'TRACK', color: '#ff3b55' },
  custom: { name: 'CUSTOM', color: '#b07cff' },
};

/* ---------------------------------------------------------------- colours */
export const PAINT_COLORS = ['#f2f2f0', '#c9cfd4', '#7d848b', '#2b2f33', '#0c0d0f', '#b3121c', '#e05a12', '#f2c230', '#7cc42d', '#0f7a4a', '#1d4fbf', '#38b6e0', '#5b2d8f', '#e04f9a', '#8a6a3c', '#c9a34a', '#d8d2c4', '#3c2a63', '#124f37', '#8fb3cf', '#6b0f1a', '#ff6a00', '#00a19a', '#a3a8ad'];
// every maker's signature colours, shown first as "factory" colours
export const FACTORY_COLORS = {
  kaze: ['#1d4fbf', '#f2f2f0', '#c9cfd4', '#0c0d0f', '#5a6d2a'], sakura: ['#f2f2f0', '#b3121c', '#1d2a6b', '#0c0d0f', '#ffb020'],
  tsubame: ['#f2f2f0', '#0c0d0f', '#b3121c', '#3a3f45', '#c9cfd4'], raiden: ['#b3121c', '#f2c230', '#1e7fc2', '#f2f2f0', '#0c0d0f'],
  shinden: ['#3c2a63', '#1d4fbf', '#c9cfd4', '#f2f2f0', '#0c0d0f'], kessler: ['#2b2f33', '#1c69d4', '#0f3b2a', '#c9cfd4', '#f2f2f0'],
  strada: ['#c9cfd4', '#e8c21c', '#0f7a4a', '#b3121c', '#f2f2f0'], vogt: ['#7d848b', '#2f6b2f', '#0c0d0f', '#c9cfd4', '#1d4fbf'],
  volta: ['#8fb3cf', '#f2f2f0', '#0c0d0f', '#b3121c', '#5c6066'], ironhorse: ['#e05a12', '#0c0d0f', '#1d4fbf', '#f2c230', '#f2f2f0'],
  ashcombe: ['#124f37', '#c9cfd4', '#0c0d0f', '#6b0f1a', '#d8d2c4'], veloce: ['#7cc42d', '#f2c230', '#e05a12', '#0c0d0f', '#f2f2f0'],
  furia: ['#f2c230', '#b3121c', '#0c0d0f', '#e05a12', '#f2f2f0'], aether: ['#14161a', '#f2f2f0', '#c9a34a', '#1d4fbf', '#b3121c'],
};
export const RIM_COLORS = ['#c9ccd0', '#e9ecef', '#5c6066', '#2a2c30', '#1a1a1c', '#c9a34a', '#8a5a2c', '#f2f2f0', '#b3121c', '#1d4fbf', '#f2c230', '#7cc42d'];
export const CALIPER_COLORS = ['#c8102e', '#e8c21c', '#1f4ea3', '#1a1a1c', '#c9a34a', '#7cc42d', '#e05a12', '#f2f2f0', '#5b2d8f'];
export const STITCH_COLORS = ['#c8102e', '#e8222e', '#e8c21c', '#f2f2f0', '#3a3a3e', '#1c69d4', '#e05a12', '#7cc42d', '#c9a34a', '#e04f9a'];

/* ---------------------------------------------------------------- helpers */
// item: { id, name, tier, price, desc, fits?(def), fx?: stat effects (see vehicles/upgrades.js) }
const I = (id, name, tier, price, desc, extra = {}) => ({ id, name, tier, price, desc, ...extra });

/* ---------------------------------------------------------------- catalogue */
// group types: part (pick one item), color (pick a colour, priced per respray), slider (adjust values, free
// once the parts that allow it are fitted), text (type it in), paint (the paint shop's own panel)
// view: where the garage camera goes while the group is open
export const CATEGORIES = [
  {
    id: 'paint', name: 'Paint & Wraps', icon: 'paint',
    groups: [
      { id: 'paint', name: 'Paint Shop', type: 'paint', view: 'three', desc: 'Body colour, finish, two-tone sections, liveries and saved paints.' },
    ],
  },
  {
    id: 'body', name: 'Body Kits', icon: 'body',
    groups: [
      {
        id: 'fBumper', key: 'fBumper', name: 'Front Bumper', type: 'part', view: 'front', items: [
          I('stock', 'Factory Bumper', 'stock', 0, 'The bumper the car left the factory with.'),
          I('sport', 'Sport Bumper', 'sport', 3800, 'Larger brake-cooling intakes and a pair of corner canards.', { fx: { aero: 0.04 } }),
          I('track', 'Track Bumper', 'track', 7600, 'Twin dive planes each side, open intakes and a tow strap.', { fx: { aero: 0.08, drag: 0.01 } }),
        ],
      },
      {
        id: 'splitter', key: 'splitter', name: 'Front Splitter', type: 'part', view: 'front', items: [
          I('none', 'None', 'stock', 0, 'No splitter.'),
          I('street', 'Street Lip', 'street', 1600, 'A slim lip under the bumper.', { fx: { aero: 0.03 } }),
          I('sport', 'Sport Splitter', 'sport', 3400, 'A deeper splitter that reaches past the bumper face.', { fx: { aero: 0.06 } }),
          I('track', 'Track Splitter', 'track', 6800, 'Wide carbon splitter with endplates and support rods.', { fx: { aero: 0.11, drag: 0.01 } }),
        ],
      },
      {
        id: 'rBumper', key: 'rBumper', name: 'Rear Bumper', type: 'part', view: 'rear', items: [
          I('stock', 'Factory Bumper', 'stock', 0, 'The original rear bumper.'),
          I('sport', 'Sport Valance', 'sport', 2900, 'A black lower valance with vertical fins.'),
          I('track', 'Track Valance', 'track', 5600, 'Open valance, a centre rain light and a tow strap.', { fx: { mass: -0.004 } }),
        ],
      },
      {
        id: 'diffuser', key: 'diffuser', name: 'Rear Diffuser', type: 'part', view: 'rear', items: [
          I('none', 'None', 'stock', 0, 'No diffuser.'),
          I('street', 'Street Diffuser', 'street', 1800, 'Three short fins under the bumper.', { fx: { aero: 0.02 } }),
          I('sport', 'Sport Diffuser', 'sport', 3900, 'Five deeper fins.', { fx: { aero: 0.05 } }),
          I('track', 'Track Diffuser', 'track', 7900, 'Tall carbon fins across the full width.', { fx: { aero: 0.09 } }),
        ],
      },
      {
        id: 'skirts', key: 'skirts', name: 'Side Skirts', type: 'part', view: 'side', items: [
          I('none', 'Factory Sills', 'stock', 0, 'The original sills.'),
          I('street', 'Street Skirts', 'street', 1500, 'Slim extensions along the sills.'),
          I('sport', 'Sport Skirts', 'sport', 3200, 'Deeper skirts with a sharper edge.', { fx: { aero: 0.01 } }),
          I('track', 'Track Skirts', 'track', 5800, 'Carbon skirts with winglets ahead of the rear wheels.', { fx: { aero: 0.025 } }),
        ],
      },
      {
        id: 'fenders', key: 'fenders', name: 'Fenders & Widebody', type: 'part', view: 'side', items: [
          I('stock', 'Factory Fenders', 'stock', 0, 'The original wings and quarters.'),
          I('vented', 'Vented Fenders', 'street', 2600, 'Louvred vents behind the front wheels let hot air out of the arches.'),
          I('wide', 'Moulded Widebody', 'sport', 20000, 'Smooth moulded arches, wider tracks and tyres.', { fx: { grip: 0.02, drag: 0.01 }, fits: none('hyper') }),
          I('rivet', 'Tokyo Rivet Widebody', 'custom', 32000, 'Angular bolt-on riveted over-fenders, wider tracks and fatter tyres. Comes with a ducktail unless a spoiler or wing is fitted.', { fx: { grip: 0.03, drag: 0.02 }, fits: none('hyper', 'ev') }),
          I('outlaw', 'Outlaw Works Widebody', 'custom', 48000, 'Huge boxy riveted flares, the widest tracks and tyres. Comes with a GT wing unless another wing is fitted.', { fx: { grip: 0.04, drag: 0.03 }, fits: none('hyper', 'ev') }),
        ],
      },
      {
        id: 'hoodType', key: 'hoodType', name: 'Hood', type: 'part', view: 'top', items: [
          I('stock', 'Factory Hood', 'stock', 0, 'The original bonnet.'),
          I('vented', 'Vented Hood', 'street', 2400, 'Twin heat-extractor vents.', { fits: any('front') }),
          I('scoop', 'Scoop Hood', 'sport', 3900, 'A raised ram-air scoop.', { fits: (d) => any('front')(d) && !d.body.scoop && notEV(d) }),
          I('carbon', 'Carbon Hood', 'sport', 5200, 'Lightweight exposed-carbon bonnet.', { fx: { mass: -0.008 } }),
          I('carbonVented', 'Carbon Vented Hood', 'track', 7400, 'Exposed carbon with large heat extractors.', { fx: { mass: -0.009 }, fits: any('front') }),
        ],
      },
      {
        id: 'spoiler', key: 'spoiler', name: 'Spoiler', type: 'part', view: 'rear', items: [
          I('none', 'None', 'stock', 0, 'A clean boot lid.'),
          I('lip', 'Lip Spoiler', 'street', 2000, 'A raised lip moulded onto the trailing edge.', { fx: { aero: 0.03 }, fits: none('wagon') }),
          I('duck', 'Ducktail', 'sport', 4500, 'The deck sweeps up into a ducktail.', { fx: { aero: 0.06 }, fits: none('wagon') }),
        ],
      },
      {
        id: 'wing', key: 'wing', name: 'Wing', type: 'part', view: 'rear', items: [
          I('none', 'None', 'stock', 0, 'No wing.'),
          I('wing', 'Street Wing', 'street', 6000, 'A body-colour wing on twin uprights.', { fx: { aero: 0.15, drag: 0.02 } }),
          I('gt', 'GT Wing', 'track', 12000, 'Tall carbon GT wing with big endplates.', { fx: { aero: 0.35, drag: 0.04 } }),
          I('swan', 'Swan-Neck Wing', 'track', 16000, 'Race wing hung from above on swan-neck mounts, leaving the underside clean.', { fx: { aero: 0.42, drag: 0.04 }, fits: none('wagon') }),
        ],
      },
      {
        id: 'mirrors', key: 'mirrors', name: 'Mirrors', type: 'part', view: 'front', items: [
          I('stock', 'Factory Mirrors', 'stock', 0, 'The original door mirrors.'),
          I('aero', 'Aero Mirrors', 'sport', 1800, 'Small race mirrors on slim twin stalks.', { fx: { drag: -0.004 } }),
        ],
      },
      {
        id: 'roofMod', key: 'roofMod', name: 'Roof', type: 'part', view: 'top', items: [
          I('none', 'Clean Roof', 'stock', 0, 'Nothing on the roof.'),
          I('vortex', 'Vortex Generators', 'street', 1200, 'A row of shark-fin vortex generators at the roof edge.', { fx: { aero: 0.01 }, fits: and(hasCabin, any('sedan', 'hatch', 'coupe'), none('luxury', 'classic')) }),
          I('spoiler', 'Roof Spoiler', 'sport', 3000, 'A spoiler off the trailing edge of the roof.', { fx: { aero: 0.04 }, fits: (d) => any('hatch', 'wagon')(d) && !d.body.roofSpoiler }),
          I('rack', 'Roof Rack', 'street', 1500, 'Two aluminium crossbars on low feet.', { fx: { drag: 0.02 }, fits: any('sedan', 'wagon', 'hatch') }),
          I('box', 'Roof Box', 'street', 2500, 'A sleek cargo box on crossbars.', { fx: { drag: 0.05, mass: 0.01 }, fits: any('wagon', 'sedan') }),
          I('lightbar', 'Rally Light Pod', 'sport', 1800, 'Four round spotlamps on a roof-front pod.', { fx: { drag: 0.01 }, fits: any('rally', 'wagon') }),
          I('scoop', 'Roof Scoop', 'track', 6000, 'An engine air scoop on the roof.', { fx: { drag: 0.01 }, fits: (d) => any('mid')(d) && !d.body.roofScoop }),
        ],
      },
      {
        id: 'tips', key: 'tips', name: 'Exhaust Tips', type: 'part', view: 'rear', items: [
          I('stock', 'Factory Tips', 'stock', 0, 'The original tips.', { fits: notEV }),
          I('polished', 'Polished Big-Bore', 'street', 900, 'Large polished stainless tips.', { fits: notEV }),
          I('titanium', 'Burnt Titanium', 'sport', 2200, 'Heat-blued titanium tips.', { fits: notEV }),
          I('black', 'Black Ceramic', 'sport', 1600, 'Black ceramic-coated tips.', { fits: notEV }),
          I('dualwall', 'Dual-Wall Rolled', 'custom', 2600, 'Double-wall tips with rolled edges.', { fits: notEV }),
        ],
      },
    ],
  },
  {
    id: 'wheels', name: 'Wheels', icon: 'wheel',
    groups: [
      {
        id: 'wheels', key: 'wheels', name: 'Rim Style', type: 'part', view: 'wheel', items: [
          I('five', '5-Spoke', 'stock', 1500, 'A clean five-spoke cast wheel.'),
          I('split', 'Split Spoke', 'street', 2500, 'Five split spokes.'),
          I('multi', 'Multi-Spoke', 'street', 2500, 'Ten slim spokes.'),
          I('mesh', 'Mesh', 'sport', 3500, 'A fine cross-laced mesh.'),
          I('turbine', 'Turbine', 'street', 3000, 'Fourteen twisted vanes.'),
          I('yspoke', 'Y-Spoke', 'sport', 3000, 'Five forked spokes.'),
          I('vspoke', 'V-Spoke', 'street', 3500, 'Five V-pairs opening toward the rim.'),
          I('six', '6-Spoke Forged', 'sport', 5000, 'Thin forged six-spoke from the 90s GT racers.'),
          I('gt', 'GT 20-Spoke', 'sport', 4500, 'Twenty fine spokes in pairs.'),
          I('blade', 'Blade', 'track', 6500, 'Seven swept blades.', { fits: any('super', 'hyper', 'coupe', 'ev') }),
          I('center', 'Centre-Lock Forged', 'track', 7500, 'Ten twisted spokes and a big centre nut.', { fits: any('super', 'hyper', 'euro', 'coupe') }),
          I('aero', 'Aero Disc', 'custom', 3000, 'A closed aero face with narrow slots.', { fits: any('ev', 'hyper') }),
          I('deep', 'Deep Dish 6', 'custom', 6000, 'Six broad spokes set deep behind a polished lip.'),
          I('dish3', '3-Piece Deep Mesh', 'custom', 9500, 'A three-piece mesh with a ring of bolts and a deep polished barrel.'),
          I('dish5', 'Deep Dish 5-Star', 'custom', 8500, 'Five wide spokes behind a stepped lip.'),
          I('sdish', 'Super Deep 12', 'custom', 12000, 'Twelve spokes set extremely deep behind a stepped lip.'),
          I('rs8', 'Classic 8-Spoke', 'street', 4500, 'An 80s eight-spoke behind a stepped lip.', { fits: any('classic', 'jdm', 'euro', 'muscle') }),
          I('fan', 'Turbofan', 'custom', 5500, 'A closed face with sixteen angled vanes.', { fits: any('jdm', 'classic', 'euro') }),
          I('slot5', 'Classic 5-Slot Mag', 'street', 3800, 'A polished five-slot mag.', { fits: any('classic', 'muscle', 'american') }),
          I('steelie', 'Banded Steelie', 'street', 1200, 'A pressed steel wheel with a chrome cap and beauty ring.', { fits: any('classic', 'muscle', 'jdm', 'american') }),
        ],
      },
      {
        id: 'wheelSize', key: 'wheelSize', name: 'Rim Size', type: 'part', view: 'wheel', items: [
          I('-1', 'One Inch Smaller', 'street', 600, 'Taller sidewalls for a softer ride.', { fx: { grip: -0.01 } }),
          I('0', 'Factory Size', 'stock', 0, 'The original rim diameter.'),
          I('1', 'Plus One', 'street', 1200, 'One inch bigger rims, lower-profile tyres.', { fx: { grip: 0.005 } }),
          I('2', 'Plus Two', 'sport', 2400, 'Two inches bigger.', { fx: { grip: 0.008, mass: 0.002 } }),
          I('3', 'Plus Three', 'custom', 3800, 'Three inches bigger, rubber-band tyres.', { fx: { grip: 0.006, mass: 0.004 }, fits: none('classic') }),
        ],
      },
      {
        id: 'rimFinish', key: 'rimFinish', name: 'Rim Finish', type: 'part', view: 'wheel', items: [
          I('gloss', 'Gloss Paint', 'stock', 0, 'Painted and clear-coated.'),
          I('matte', 'Matte Paint', 'street', 800, 'Flat, satin-free paint.'),
          I('brushed', 'Brushed Alloy', 'sport', 1500, 'Machined with a brushed grain.'),
          I('polished', 'Polished', 'sport', 1800, 'Polished to a mirror shine.'),
          I('chrome', 'Chrome', 'custom', 2600, 'Triple-plated chrome.'),
        ],
      },
      { id: 'rimColor', key: 'rimColor', name: 'Rim Colour', type: 'color', view: 'wheel', price: 400, colors: RIM_COLORS, desc: 'Respray the rims. $400 per colour change.' },
      { id: 'caliper', key: 'caliper', name: 'Brake Calipers', type: 'color', view: 'wheel', price: 300, colors: CALIPER_COLORS, desc: 'Paint the brake calipers. $300 per colour change.' },
    ],
  },
  {
    id: 'tires', name: 'Tires', icon: 'tire',
    groups: [
      {
        id: 'tire', key: 'tire', name: 'Tire Compound', type: 'part', view: 'wheel', items: [
          I('street', 'Street', 'stock', 0, 'All-round road tyres with a deep tread.', { fx: { grip: 0 } }),
          I('sport', 'Sport', 'street', 1800, 'Summer performance tyres.', { fx: { grip: 0.04 } }),
          I('semi', 'Semi-Slick', 'sport', 4200, 'Track-day tyres with a shallow tread.', { fx: { grip: 0.08 } }),
          I('track', 'Race Slick', 'track', 7200, 'Treadless race compound.', { fx: { grip: 0.12 } }),
          I('drift', 'Drift', 'sport', 2600, 'Hard compound that lets go progressively at the rear.', { fx: { grip: -0.02, rearGrip: -0.1 } }),
          I('drag', 'Drag Radial', 'sport', 3200, 'Soft, wrinkle-wall drag tyres: huge launch traction.', { fx: { grip: -0.02, launch: 0.25 }, fits: none('ev') }),
        ],
      },
      {
        id: 'tireLetter', key: 'tireLetter', name: 'Sidewall Lettering', type: 'part', view: 'wheel', items: [
          I('grey', 'Factory Moulded', 'stock', 0, 'Grey moulded lettering.'),
          I('none', 'Blank Sidewall', 'street', 150, 'No lettering.'),
          I('white', 'White Letters', 'custom', 450, 'Raised white letters.'),
          I('yellow', 'Yellow Letters', 'custom', 450, 'Race-style yellow letters.'),
          I('red', 'Red Letters', 'custom', 450, 'Red letters.'),
        ],
      },
    ],
  },
  {
    id: 'suspension', name: 'Suspension', icon: 'spring',
    groups: [
      {
        id: 'springs', key: 'springs', name: 'Suspension Kit', type: 'part', view: 'side', items: [
          I('stock', 'Factory', 'stock', 0, 'Fixed ride height and alignment.'),
          I('street', 'Lowering Springs', 'street', 3500, 'Lower the car up to 40 mm, mild camber and wheel spacers.', { fx: { grip: 0.01 } }),
          I('sport', 'Sport Coilovers', 'sport', 7500, 'Adjustable height, camber and track, stiffer damping.', { fx: { grip: 0.025, roll: -0.2 } }),
          I('track', 'Race Coilovers', 'track', 14000, 'Full adjustment range and race damping.', { fx: { grip: 0.04, roll: -0.35 } }),
        ],
      },
      { id: 'stance', name: 'Stance & Alignment', type: 'slider', view: 'stance', desc: 'Free to adjust within what your suspension kit allows.' },
    ],
  },
  {
    id: 'performance', name: 'Performance', icon: 'gauge',
    groups: [
      {
        id: 'brakes', key: 'brakes', name: 'Brakes', type: 'part', view: 'wheel', items: [
          I('stock', 'Factory Brakes', 'stock', 0, 'The original brakes.'),
          I('street', 'Street Pads & Lines', 'street', 2500, 'Better pads and braided lines.', { fx: { brake: 0.06 } }),
          I('sport', 'Big Brake Kit', 'sport', 6200, 'Bigger discs and six-piston calipers.', { fx: { brake: 0.13 } }),
          I('track', 'Carbon-Ceramic', 'track', 14500, 'Huge carbon-ceramic discs that never fade.', { fx: { brake: 0.22, mass: -0.006 } }),
        ],
      },
      {
        id: 'weight', key: 'weight', name: 'Weight Reduction', type: 'part', view: 'three', items: [
          I('stock', 'Factory', 'stock', 0, 'No weight removed.'),
          I('street', 'Street', 'street', 4000, 'Lighter battery and spare-wheel delete.', { fx: { mass: -0.03 } }),
          I('sport', 'Sport', 'sport', 10000, 'Rear seats, sound deadening and trim removed.', { fx: { mass: -0.07 } }),
          I('track', 'Track', 'track', 24000, 'Carbon panels, polycarbonate windows and a stripped cabin.', { fx: { mass: -0.12 } }),
        ],
      },
      {
        id: 'trans', key: 'trans', name: 'Transmission', type: 'part', view: 'three', items: [
          I('stock', 'Factory', 'stock', 0, 'The original gearbox.'),
          I('street', 'Short Shifter', 'street', 2800, 'Faster gear changes.', { fx: { shift: -0.25 } }),
          I('sport', 'Sport Gearbox', 'sport', 7800, 'Closer ratios and quick shifts.', { fx: { shift: -0.45, accel: 0.04 } }),
          I('track', 'Sequential Race Box', 'track', 18000, 'Dog-engagement sequential, near-instant shifts.', { fx: { shift: -0.7, accel: 0.07 } }),
        ],
      },
      {
        id: 'diff', key: 'diff', name: 'Differential', type: 'part', view: 'three', items: [
          I('stock', 'Factory', 'stock', 0, 'The original differential.'),
          I('sport', 'Limited-Slip', 'sport', 4800, 'Puts power down out of corners.', { fx: { grip: 0.015, launch: 0.05 } }),
          I('track', 'Race Diff', 'track', 9500, 'Adjustable race differential.', { fx: { grip: 0.025, launch: 0.08 } }),
        ],
      },
    ],
  },
  {
    id: 'engine', name: 'Engine', icon: 'engine',
    groups: [
      {
        id: 'intake', key: 'intake', name: 'Intake', type: 'part', view: 'top', items: [
          I('stock', 'Factory Airbox', 'stock', 0, 'The original intake.', { fits: notEV }),
          I('street', 'Panel Filter', 'street', 1500, 'A free-flowing filter.', { fx: { power: 0.02 }, fits: notEV }),
          I('sport', 'Cold-Air Intake', 'sport', 4200, 'A cold-air induction kit.', { fx: { power: 0.045 }, fits: notEV }),
          I('track', 'Carbon Airbox', 'track', 8200, 'Carbon plenum and velocity stacks.', { fx: { power: 0.075 }, fits: notEV }),
        ],
      },
      {
        id: 'exhaust', key: 'exhaust', name: 'Exhaust System', type: 'part', view: 'rear', items: [
          I('stock', 'Factory', 'stock', 0, 'The original exhaust.', { fits: notEV }),
          I('sport', 'Sport Cat-Back', 'sport', 4000, 'Louder, pops on lift-off, a little more power.', { fx: { power: 0.03 }, fits: notEV }),
          I('straight', 'Straight Pipe', 'track', 8000, 'No silencers. Very loud, lots of crackle.', { fx: { power: 0.06 }, fits: notEV }),
        ],
      },
      {
        id: 'ecu', key: 'ecu', name: 'ECU Tune', type: 'part', view: 'three', items: [
          I('stock', 'Factory Map', 'stock', 0, 'The original engine map.', { fits: notEV }),
          I('street', 'Stage 1 Map', 'street', 2000, 'A safe remap.', { fx: { power: 0.04 }, fits: notEV }),
          I('sport', 'Stage 2 Map', 'sport', 5200, 'More timing and boost.', { fx: { power: 0.08 }, fits: notEV }),
          I('track', 'Race Map', 'track', 10500, 'Race fuel map, launch control.', { fx: { power: 0.12, launch: 0.05 }, fits: notEV }),
        ],
      },
      {
        id: 'boost', key: 'boost', name: 'Forced Induction', type: 'part', view: 'three', items: [
          I('stock', 'Factory', 'stock', 0, 'The original induction.', { fits: notEV }),
          I('street', 'Boost Upgrade', 'street', 7800, 'A bigger turbo (or supercharger pulley on non-turbo cars).', { fx: { power: 0.09 }, fits: notEV }),
          I('sport', 'Big Turbo Kit', 'sport', 17500, 'Larger turbo, intercooler and fuelling.', { fx: { power: 0.17 }, fits: notEV }),
          I('track', 'Race Turbo Kit', 'track', 34000, 'The biggest turbo the engine can take.', { fx: { power: 0.27, lag: 0.25 }, fits: notEV }),
        ],
      },
      {
        id: 'motor', key: 'motor', name: 'Motor & Inverter', type: 'part', view: 'three', items: [
          I('stock', 'Factory', 'stock', 0, 'The original drive units.', { fits: isEV }),
          I('sport', 'Sport Inverter', 'sport', 9000, 'More current to the motors.', { fx: { power: 0.1 }, fits: isEV }),
          I('track', 'Track Drive Units', 'track', 26000, 'Uprated motors and silicon-carbide inverters.', { fx: { power: 0.2 }, fits: isEV }),
        ],
      },
      {
        id: 'battery', key: 'battery', name: 'Battery', type: 'part', view: 'three', items: [
          I('stock', 'Factory Pack', 'stock', 0, 'The original battery.', { fits: isEV }),
          I('sport', 'High-Discharge Pack', 'sport', 8000, 'Sustains peak power longer.', { fx: { power: 0.05 }, fits: isEV }),
          I('track', 'Lightweight Race Pack', 'track', 22000, 'Smaller, lighter, hotter.', { fx: { power: 0.06, mass: -0.06 }, fits: isEV }),
        ],
      },
    ],
  },
  {
    id: 'interior', name: 'Interior', icon: 'seat',
    groups: [
      {
        id: 'seats', key: 'seats', name: 'Seats', type: 'part', view: 'seats', items: [
          I('stock', 'Factory Seats', 'stock', 0, 'The seats the car came with.'),
          I('sport', 'Sport Seats', 'street', 2200, 'Bolstered sport seats with separate headrests.'),
          I('bucket', 'Bucket Seats', 'sport', 3800, 'Fixed-back buckets with harness slots.'),
          I('carbonBucket', 'Carbon Buckets', 'track', 6800, 'Carbon-shell buckets.', { fx: { mass: -0.006 } }),
          I('race', 'Race Seats', 'track', 8200, 'FIA race seats with wings and harnesses.', { fx: { mass: -0.008 } }),
          I('comfort', 'Comfort Seats', 'custom', 3200, 'Wide, padded touring seats.', { fits: none('hyper') }),
        ],
      },
      {
        id: 'seatMat', key: 'seatMat', name: 'Seat Material', type: 'part', view: 'seats', items: [
          I('stock', 'Factory Material', 'stock', 0, 'The original upholstery.'),
          I('leather', 'Nappa Leather', 'street', 2400, 'Smooth leather.'),
          I('alcantara', 'Alcantara', 'sport', 2800, 'Suede-like microfibre.'),
          I('cloth', 'Sport Cloth', 'street', 1200, 'Woven sport cloth.'),
          I('quilt', 'Quilted Leather', 'custom', 4200, 'Diamond-quilted leather.'),
          I('channel', 'Channel Leather', 'custom', 3600, 'Fluted channel-stitched leather.'),
          I('perforated', 'Perforated Leather', 'sport', 3000, 'Perforated, ventilated leather.'),
        ],
      },
      {
        id: 'intColor', key: 'intColor', name: 'Interior Colour', type: 'part', view: 'seats', items: [
          I('stock', 'Factory Colours', 'stock', 0, 'The original colour scheme.'),
          I('black', 'All Black', 'street', 1500, 'Black seats and inserts.'),
          I('redBlack', 'Red & Black', 'sport', 1800, 'Black with red inserts and bolsters.'),
          I('cognac', 'Cognac', 'custom', 2200, 'Rich cognac leather.'),
          I('cream', 'Ivory', 'custom', 2200, 'Ivory leather with dark carpets.'),
          I('blue', 'Navy & Grey', 'street', 1800, 'Navy seats with grey inserts.'),
          I('tan', 'Saddle Tan', 'custom', 2200, 'Saddle tan with black.'),
        ],
      },
      { id: 'stitch', key: 'stitch', name: 'Stitching', type: 'color', view: 'seats', price: 400, colors: STITCH_COLORS, desc: 'Contrast stitching on the seats, wheel and doors. $400 per change.' },
      {
        id: 'trim', key: 'trim', name: 'Dashboard Trim', type: 'part', view: 'interior', items: [
          I('stock', 'Factory Trim', 'stock', 0, 'The original trim.'),
          I('carbon', 'Carbon Fibre', 'sport', 3200, 'Exposed twill carbon.'),
          I('redCarbon', 'Red Carbon', 'custom', 3800, 'Red-weave carbon.'),
          I('alu', 'Brushed Aluminium', 'street', 1800, 'Brushed aluminium.'),
          I('wood', 'Open-Pore Wood', 'custom', 2800, 'Open-pore walnut.'),
          I('piano', 'Piano Black', 'street', 1200, 'Gloss black.'),
          I('titanium', 'Titanium', 'track', 4200, 'Brushed titanium.'),
        ],
      },
      {
        id: 'steering', key: 'steering', name: 'Steering Wheel', type: 'part', view: 'interior', items: [
          I('stock', 'Factory Wheel', 'stock', 0, 'The original steering wheel.'),
          I('momo3', 'Classic Three-Spoke', 'street', 900, 'A dished three-spoke with drilled spokes.'),
          I('sport3', 'Sport Three-Spoke', 'street', 1200, 'Thick-rimmed sport wheel.'),
          I('gt3', 'GT Wheel', 'sport', 1900, 'GT wheel with a 12 o\'clock marker.'),
          I('rsFlat', 'Flat-Bottom Wheel', 'sport', 2100, 'Flat-bottomed sport wheel.'),
          I('race', 'Race Wheel', 'track', 3600, 'Rectangular race wheel with shift lights.', { fits: none('classic', 'luxury') }),
        ],
      },
      {
        id: 'knob', key: 'knob', name: 'Shift Knob', type: 'part', view: 'console', items: [
          I('stock', 'Factory Knob', 'stock', 0, 'The original gear knob.'),
          I('alu', 'Aluminium Ball', 'street', 250, 'A machined aluminium ball.'),
          I('cueBall', 'Cue Ball', 'custom', 300, 'A white cue-ball knob.'),
          I('leatherRound', 'Leather Round', 'street', 220, 'Leather-wrapped round knob.'),
          I('ball', 'Leather Pear', 'street', 220, 'Leather pear-shaped knob with a cap.'),
        ],
      },
      {
        id: 'floorMats', key: 'floorMats', name: 'Floor Mats', type: 'part', view: 'floor', items: [
          I('stock', 'Factory Mats', 'stock', 0, 'The original mats.'),
          I('rubber', 'All-Weather Rubber', 'street', 150, 'Black rubber mats.'),
          I('carpetRed', 'Carpet, Red Edge', 'street', 250, 'Carpet mats with red binding.'),
          I('carpetAccent', 'Carpet, Colour Edge', 'street', 250, 'Carpet mats bound in the stitching colour.'),
          I('luxury', 'Deep-Pile Luxury', 'custom', 600, 'Thick deep-pile mats.'),
          I('none', 'Mats Removed', 'track', 0, 'Bare floor.'),
        ],
      },
      {
        id: 'ambient', key: 'ambient', name: 'Interior Lighting', type: 'part', view: 'interior', items: [
          I('stock', 'Factory', 'stock', 0, 'The original ambient lighting (if any).'),
          I('off', 'Off', 'street', 0, 'No ambient light strips.'),
          I('#2fd9ff', 'Ice Blue', 'custom', 800, 'Ice-blue ambient strips.'),
          I('#ff2030', 'Red', 'custom', 800, 'Red ambient strips.'),
          I('#ff9a3c', 'Amber', 'custom', 800, 'Warm amber ambient strips.'),
          I('#a24cff', 'Purple', 'custom', 800, 'Purple ambient strips.'),
          I('#e9f0ff', 'White', 'custom', 800, 'Cool white ambient strips.'),
          I('#34e07a', 'Green', 'custom', 800, 'Green ambient strips.'),
        ],
      },
    ],
  },
  {
    id: 'windows', name: 'Windows & Lights', icon: 'light',
    groups: [
      { id: 'tint', key: 'tintPct', name: 'Window Tint', type: 'slider', view: 'side', price: 350, desc: 'Tint film darkness. $350 per change.' },
      {
        id: 'headlights', key: 'headlights', name: 'Headlights', type: 'part', view: 'front', items: [
          I('stock', 'Factory', 'stock', 0, 'The original lamps.'),
          I('white', 'Pure White LED', 'street', 600, '6,500 K white LEDs.'),
          I('xenon', 'Xenon Blue', 'street', 900, 'Blue-white xenon.'),
          I('yellow', 'Selective Yellow', 'custom', 900, 'Classic yellow lamps.'),
          I('warm', 'Warm Halogen', 'street', 400, 'Warm halogen glow.'),
        ],
      },
      {
        id: 'taillights', key: 'taillights', name: 'Taillights', type: 'part', view: 'rear', items: [
          I('stock', 'Factory', 'stock', 0, 'The original lenses.'),
          I('smoked', 'Smoked', 'street', 700, 'Lightly smoked lenses.'),
          I('dark', 'Dark Smoked', 'sport', 900, 'Heavily smoked lenses.'),
          I('clear', 'Clear Lens', 'custom', 1100, 'Clear lenses over red LEDs.'),
        ],
      },
      {
        id: 'underglow', key: 'underglow', name: 'Underglow', type: 'part', view: 'under', items: [
          I('off', 'Off', 'stock', 0, 'No underglow.'),
          I('#2fd9ff', 'Cyan', 'custom', 1200, 'Cyan neon under the car.'),
          I('#ff2030', 'Red', 'custom', 1200, 'Red neon.'),
          I('#a24cff', 'Purple', 'custom', 1200, 'Purple neon.'),
          I('#34e07a', 'Green', 'custom', 1200, 'Green neon.'),
          I('#ff4fd8', 'Pink', 'custom', 1200, 'Pink neon.'),
          I('#ffb020', 'Amber', 'custom', 1200, 'Amber neon.'),
          I('#f2f6ff', 'White', 'custom', 1200, 'White neon.'),
        ],
      },
      {
        id: 'ambient2', key: 'ambient', name: 'Interior Lighting', type: 'part', view: 'interior', items: null, ref: 'ambient',
      },
    ],
  },
  {
    id: 'plates', name: 'License Plates', icon: 'plate',
    groups: [
      {
        id: 'plateStyle', key: 'plateStyle', name: 'Plate Style', type: 'part', view: 'plate', items: [
          I('ca', 'California', 'stock', 0, 'White California plate.'),
          I('jdm', 'Japanese', 'street', 150, 'Green-framed Japanese plate.'),
          I('eu', 'European', 'street', 150, 'Long white European plate with a blue band.'),
          I('yellow', 'UK Rear', 'street', 150, 'Yellow UK rear plate.'),
          I('black', 'Classic Black', 'custom', 250, 'Black plate with silver letters.'),
          I('race', 'Race Number', 'custom', 250, 'A white race-number board.'),
        ],
      },
      { id: 'plateText', key: 'plate', name: 'Plate Text', type: 'text', view: 'plate', price: 100, maxLength: 7, desc: 'Up to 7 characters. $100 per change.' },
    ],
  },
];

// the shared interior-lighting group appears in two categories; both point at the same items
{
  const amb = CATEGORIES.find((c) => c.id === 'interior').groups.find((g) => g.id === 'ambient');
  const g2 = CATEGORIES.find((c) => c.id === 'windows').groups.find((g) => g.id === 'ambient2');
  g2.items = amb.items;
}

export const GROUP_BY_ID = {};
for (const c of CATEGORIES) for (const g of c.groups) { g.cat = c.id; GROUP_BY_ID[g.id] = g; }
// slot key -> group (first one wins for the shared interior lighting)
export const GROUP_BY_KEY = {};
for (const c of CATEGORIES) for (const g of c.groups) if (g.key && !GROUP_BY_KEY[g.key]) GROUP_BY_KEY[g.key] = g;

/* ---------------------------------------------------------------- stance */
// what each suspension kit lets you adjust (mm / degrees); stock is fixed
export const STANCE_LIMITS = {
  stock: { ride: [0, 0], camber: [0, 0], track: [0, 0], stiff: [50, 50] },
  street: { ride: [-40, 0], camber: [-2, 0], track: [-5, 20], stiff: [50, 50] },
  sport: { ride: [-70, 20], camber: [-4, 0], track: [-10, 35], stiff: [20, 80] },
  track: { ride: [-90, 30], camber: [-8, 0], track: [-15, 50], stiff: [0, 100] },
};
export const STANCE_SLIDERS = [
  { key: 'rideF', name: 'Ride Height · Front', unit: 'mm', lim: 'ride', step: 5 },
  { key: 'rideR', name: 'Ride Height · Rear', unit: 'mm', lim: 'ride', step: 5 },
  { key: 'camberF', name: 'Camber · Front', unit: '°', lim: 'camber', step: 0.25 },
  { key: 'camberR', name: 'Camber · Rear', unit: '°', lim: 'camber', step: 0.25 },
  { key: 'trackF', name: 'Track Width · Front', unit: 'mm', lim: 'track', step: 5 },
  { key: 'trackR', name: 'Track Width · Rear', unit: 'mm', lim: 'track', step: 5 },
  { key: 'stiff', name: 'Spring Stiffness', unit: '%', lim: 'stiff', step: 5 },
];
export const TINT_RANGE = [0, 95];

/* ---------------------------------------------------------------- paint */
export const PAINT_FINISH_ITEMS = [
  I('gloss', 'Gloss', 'stock', 0, 'Solid colour under a deep clear coat.'),
  I('metallic', 'Metallic', 'street', 800, 'Fine metal flake.'),
  I('pearl', 'Pearlescent', 'sport', 1500, 'Pearl that shifts colour with the light.'),
  I('matte', 'Matte', 'sport', 1800, 'Flat, no clear coat.'),
  I('satin', 'Satin', 'street', 1200, 'Between gloss and matte.'),
  I('chrome', 'Chrome', 'custom', 9000, 'Full mirror chrome.'),
];
// paintable sections and what each can be: the body colour, the contrast colour, black, or exposed carbon
export const PAINT_SECTIONS = [
  { key: 'roofPaint', name: 'Roof', fits: hasCabin },
  { key: 'hoodPaint', name: 'Hood' },
  { key: 'mirrorPaint', name: 'Mirrors', fits: hasCabin },
  { key: 'kitColor', name: 'Aero Parts', note: 'Splitters, skirts, diffusers, canards and wings' },
];
export const SECTION_MODES = [['body', 'Body'], ['contrast', 'Contrast'], ['black', 'Gloss Black'], ['carbon', 'Carbon']];
export const WRAPS = [
  I('none', 'None', 'stock', 0, 'No livery.'),
  I('twin', 'Twin Racing Stripes', 'street', 1500, 'Two stripes over the bonnet, roof and tail.'),
  I('center', 'Centre Stripe', 'street', 1200, 'One wide stripe down the middle.'),
  I('side', 'Side Stripe', 'street', 1000, 'A stripe along each flank.'),
  I('lower', 'Two-Tone Lower', 'sport', 1800, 'Contrast colour below the waist.'),
  I('fade', 'Colour Fade', 'custom', 2600, 'Body colour fading into the contrast colour toward the sills.'),
  I('hood', 'Bonnet Stripe Pair', 'street', 900, 'Two short stripes on the bonnet only.'),
];
// prices for each kind of paint change
export const PAINT_PRICES = { color: 1200, color2: 600, section: 500, sectionCarbon: 1600, wrapColor: 400, kitColor: 400 };

/* ---------------------------------------------------------------- lookup */
/** The groups of a category that apply to this car (a slot with nothing to choose between is left out). */
export function groupsFor(def, cat) {
  return cat.groups.filter((g) => {
    // only cars with a manual gearstick have a knob to change
    if (g.id === 'knob' && interiorSpec(def).console !== 'manual') return false;
    if (g.type === 'part') return itemsFor(def, g).length > 1;
    return !g.fits || g.fits(def);
  });
}

export function itemsFor(def, g) {
  return (g.items || []).filter((it) => !it.fits || it.fits(def));
}
export function itemOf(key, val) {
  const g = GROUP_BY_KEY[key];
  return g?.items?.find((it) => String(it.id) === String(val)) || null;
}
export function priceOf(key, val) { return itemOf(key, val)?.price ?? 0; }

/* ---------------------------------------------------------------- normalise */
const TINT_PCT = [20, 35, 55, 75];
const DEFAULTS = {
  fBumper: 'stock', splitter: 'none', rBumper: 'stock', diffuser: 'none', skirts: 'none', fenders: 'stock',
  hoodType: 'stock', spoiler: 'none', wing: 'none', mirrors: 'stock', roofMod: 'none', tips: 'stock',
  wheels: 'five', wheelSize: '0', rimFinish: 'gloss', tireLetter: 'grey',
  springs: 'stock', rideF: 0, rideR: 0, camberF: 0, camberR: 0, trackF: 0, trackR: 0, stiff: 50,
  brakes: 'stock', weight: 'stock', trans: 'stock', diff: 'stock',
  intake: 'stock', exhaust: 'stock', ecu: 'stock', boost: 'stock', motor: 'stock', battery: 'stock',
  seats: 'stock', seatMat: 'stock', intColor: 'stock', trim: 'stock', steering: 'stock', knob: 'stock', floorMats: 'stock', ambient: 'stock',
  headlights: 'stock', taillights: 'stock', underglow: 'off', plateStyle: 'ca',
  roofPaint: 'body', hoodPaint: 'body', mirrorPaint: 'body', kitColor: 'black', wrap: 'none',
  color2: '#0c0d0f', wrapColor: '#f2f2f0',
};

/**
 * A complete customisation for a car: factory values filled in, and older save formats (kit / spoiler /
 * suspension / tint presets) translated to the individual slots. Returns a new object.
 */
export function normalizeCustom(def, cu = {}) {
  const out = { ...DEFAULTS, ...cu };
  const T = tagsOf(def);
  if (out.tire === undefined) out.tire = T.some((t) => ['super', 'hyper'].includes(t)) ? 'sport' : 'street';
  if (out.stitch === undefined) out.stitch = interiorSpec(def).palette.stitch;
  // old body-kit presets -> individual parts
  if (cu.kit !== undefined && cu.splitter === undefined) {
    const k = cu.kit;
    const lvl = k === 'street' ? 'street' : k === 'stock' ? null : 'sport';
    if (lvl) { out.splitter = lvl; out.skirts = lvl; out.diffuser = lvl; }
    if (k !== 'stock' && k !== 'street') out.fBumper = 'sport';
    if (['wide', 'rivet', 'outlaw'].includes(k)) out.fenders = k;
  }
  delete out.kit;
  // old spoiler slot held both deck spoilers and wings
  if (cu.spoiler === 'wing' || cu.spoiler === 'gt') { if (cu.wing === undefined) out.wing = cu.spoiler; out.spoiler = 'none'; }
  // old suspension presets -> springs + ride height
  if (cu.suspension !== undefined && cu.springs === undefined) {
    if (cu.suspension === 'lowered') { out.springs = 'street'; out.rideF = out.rideR = -35; }
    if (cu.suspension === 'slammed') { out.springs = 'sport'; out.rideF = out.rideR = -70; out.camberF = out.camberR = -2; }
  }
  delete out.suspension;
  if (out.tintPct === undefined) out.tintPct = TINT_PCT[cu.tint ?? 1] ?? 35;
  delete out.tint;
  if (out.finish === undefined) out.finish = 'metallic';
  if (out.color === undefined) out.color = '#c9cfd4';
  if (out.rimColor === undefined) out.rimColor = '#c9ccd0';
  if (out.caliper === undefined) out.caliper = '#c8102e';
  // anything that does not fit this car falls back to the factory part
  for (const [key, g] of Object.entries(GROUP_BY_KEY)) {
    if (g.type !== 'part' || out[key] === undefined) continue;
    const it = itemOf(key, out[key]);
    if (it && it.fits && !it.fits(def)) out[key] = DEFAULTS[key] ?? 'stock';
  }
  // stance stays within what the fitted suspension allows
  const L = STANCE_LIMITS[out.springs] || STANCE_LIMITS.stock;
  for (const s of STANCE_SLIDERS) {
    const [a, b] = L[s.lim];
    out[s.key] = Math.min(b, Math.max(a, Number(out[s.key]) || (s.key === 'stiff' ? 50 : 0)));
  }
  out.tintPct = Math.min(TINT_RANGE[1], Math.max(TINT_RANGE[0], Number(out.tintPct) || 0));
  return out;
}

/** The factory specification of a car (what the default customisation normalises to). */
export function factoryCustom(def) { return normalizeCustom(def, def.defaults || {}); }
