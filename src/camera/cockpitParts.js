// Interior components for the cockpit builder. Every function takes the build context K (see Cockpit.build)
// and adds geometry for one part of the cabin in the car's own style (K.I = interior spec, K.P = palette).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { clamp, lerp } from '../core/utils.js';
import {
  leatherBump, plasticBump, carbonTexture, brushedTexture, speakerTexture, knurlTexture, climateTexture,
  spokeButtonsTexture, badgeTexture, weaveBump, alcantaraBump, quiltBump, channelBump, perforatedBump, woodTexture,
  carpetBump, redCarbonTexture, radioTexture, slidersTexture, toggleLabelTexture, windowSwitchTexture, mfdTexture } from './interiorTextures.js';

export const RB = (w, h, d, r = 0.03, seg = 2) => new RoundedBoxGeometry(w, h, d, seg, Math.max(1e-4, Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3)));
export const _up = new THREE.Vector3(0, 1, 0);

/** Shape drawn in the (z, y) side-profile plane, extruded across the car (x), centred on xc. */
export function extrudeX(shape, width, xc = 0, bevel = 0.006, curveSegments = 10) {
  const depth = Math.max(0.002, width - bevel * 2);
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments });
  geo.translate(0, 0, -depth / 2);
  geo.rotateY(-Math.PI / 2);
  geo.translate(xc, 0, 0);
  return geo;
}

/** Shape drawn in the (x, y) front-view plane, extruded along z (toward the driver), centred on z = 0. */
export function extrudeZ(shape, depth, bevel = 0.006, curveSegments = 10) {
  const d = Math.max(0.002, depth - bevel * 2);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments });
  geo.translate(0, 0, -d / 2);
  return geo;
}

/** Cylinder between two points. */
export function limb(a, b, r0, r1, seg = 12) {
  const len = Math.max(1e-3, a.distanceTo(b));
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, len, seg, 1, false));
  m.position.copy(a).lerp(b, 0.5);
  m.quaternion.setFromUnitVectors(_up, b.clone().sub(a).normalize());
  return m;
}

export const clones = [];
export function repeatTex(t, rx, ry = rx) {
  const c = t.clone();
  c.repeat.set(rx, ry);
  c.needsUpdate = true;
  clones.push(c);
  return c;
}

const roundedRect = (w, h, r) => {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2); s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
};

/* ================================================================ materials */
/** Builds the car's material set from its palette. */
export function materials(K) {
  const { M, P } = K;
  const leatherB = repeatTex(leatherBump(), 9), plasticB = repeatTex(plasticBump(), 14);
  const C = (h) => new THREE.Color(h);
  const upholstery = (type, color, rep = 6) => {
    const base = { color: C(color) };
    if (type === 'alcantara') return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.97, bumpMap: repeatTex(alcantaraBump(), rep * 2), bumpScale: 0.5 }));
    if (type === 'cloth') return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.95, bumpMap: repeatTex(weaveBump(), rep * 3), bumpScale: 1.2 }));
    if (type === 'quilt') return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.55, bumpMap: repeatTex(quiltBump(), rep * 0.8), bumpScale: 2.2 }));
    if (type === 'channel') return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.6, bumpMap: repeatTex(channelBump(), rep * 1.2, 1), bumpScale: 2 }));
    if (type === 'perforated') return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.6, bumpMap: repeatTex(perforatedBump(), rep * 2), bumpScale: 1 }));
    return M(new THREE.MeshStandardMaterial({ ...base, roughness: 0.55, bumpMap: leatherB, bumpScale: 0.9 }));
  };
  const trimOf = (t) => {
    switch (t) {
      case 'carbon': return M(new THREE.MeshPhysicalMaterial({ map: repeatTex(carbonTexture(), 6, 1.5), roughness: 0.28, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.04 }));
      case 'redCarbon': return M(new THREE.MeshPhysicalMaterial({ map: repeatTex(redCarbonTexture(), 6, 1.5), roughness: 0.3, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05 }));
      case 'wood': return M(new THREE.MeshPhysicalMaterial({ map: repeatTex(woodTexture(), 2, 1), roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.12 }));
      case 'silver': return M(new THREE.MeshStandardMaterial({ color: 0x8e9399, metalness: 0.65, roughness: 0.38 }));
      case 'titanium': return M(new THREE.MeshStandardMaterial({ map: repeatTex(brushedTexture(), 2), color: 0x9a8e7c, metalness: 1, roughness: 0.3 }));
      case 'chrome': return M(new THREE.MeshStandardMaterial({ color: 0xd9dde3, metalness: 1, roughness: 0.12 }));
      case 'piano': return M(new THREE.MeshPhysicalMaterial({ color: 0x040405, roughness: 0.1, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04 }));
      default: return M(new THREE.MeshStandardMaterial({ map: repeatTex(brushedTexture(), 2), metalness: 0.9, roughness: 0.3 }));
    }
  };
  const luxury = K.I.dash === 'luxury';
  const m = {
    dash: M(new THREE.MeshStandardMaterial({ color: C(P.dash), roughness: 0.82, bumpMap: plasticB, bumpScale: 0.35 })),
    dashTop: luxury || K.I.dash === 'horizontal'
      ? M(new THREE.MeshStandardMaterial({ color: C(P.dashTop), roughness: 0.6, bumpMap: leatherB, bumpScale: 0.8 }))
      : K.I.dash === 'hex' || K.I.dash === 'tub' ? upholstery('alcantara', P.dashTop, 8)
        : M(new THREE.MeshStandardMaterial({ color: C(P.dashTop), roughness: 0.75, bumpMap: plasticB, bumpScale: 0.45 })),
    seat: upholstery('leather', P.seat),
    seatSide: upholstery(K.I.seats === 'retro' ? 'cloth' : 'leather', P.seatSide),
    insert: upholstery(P.insertTex, P.insert),
    door: M(new THREE.MeshStandardMaterial({ color: C(P.door), roughness: 0.75, bumpMap: plasticB, bumpScale: 0.3, side: THREE.DoubleSide })),
    doorInsert: upholstery(K.I.doorStyle === 'luxury' ? 'leather' : K.I.doorStyle === 'retro' ? 'cloth' : P.insertTex === 'quilt' ? 'leather' : P.insertTex === 'channel' ? 'leather' : P.insertTex, P.doorInsert),
    trim: trimOf(P.trim),
    trim2: trimOf(P.trim2),
    piano: trimOf('piano'),
    chrome: trimOf('chrome'),
    alu: trimOf('alu'),
    carbon: trimOf('carbon'),
    rubber: M(new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: 0.95 })),
    plastic: M(new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.7 })),
    stitch: M(new THREE.MeshStandardMaterial({ color: C(P.stitch).multiplyScalar(0.7), roughness: 0.8 })),
    accent: M(new THREE.MeshStandardMaterial({ color: C(P.accent), roughness: 0.4 })),
    carpet: M(new THREE.MeshStandardMaterial({ color: C(P.carpet), roughness: 1, bumpMap: repeatTex(carpetBump(), 10), bumpScale: 1.5 })),
    headliner: upholstery(K.I.dash === 'luxury' ? 'cloth' : 'alcantara', P.headliner, 10),
    webbing: M(new THREE.MeshStandardMaterial({ color: 0x1b1c1f, roughness: 0.85, bumpMap: repeatTex(weaveBump(), 2, 30), bumpScale: 0.8 })),
    harness: M(new THREE.MeshStandardMaterial({ color: C(P.accent).multiplyScalar(0.6), roughness: 0.8, bumpMap: repeatTex(weaveBump(), 2, 30), bumpScale: 0.8 })),
    speaker: M(new THREE.MeshStandardMaterial({ map: speakerTexture(), roughness: 0.6, metalness: 0.4 })),
    knurl: M(new THREE.MeshStandardMaterial({ map: knurlTexture(), metalness: 0.9, roughness: 0.3 })),
    redGlow: M(new THREE.MeshStandardMaterial({ color: 0x5a0a10, emissive: 0xff2030, emissiveIntensity: 0.3, roughness: 0.3 })),
  };
  for (const k of ['trim', 'trim2', 'piano', 'chrome', 'alu', 'carbon', 'dash', 'dashTop', 'door', 'seat', 'seatSide', 'insert', 'doorInsert', 'plastic', 'knurl', 'accent'])
    m[k].envMapIntensity = ['chrome', 'alu', 'trim2'].includes(k) ? 0.55 : 0.32;
  m.rim = K.I.wheel.rim === 'alcantara' ? upholstery('alcantara', '#1d1d20', 4) : M(new THREE.MeshStandardMaterial({ color: 0x1f1f23, roughness: 0.55, bumpMap: repeatTex(leatherBump(), 20, 2), bumpScale: 1 }));
  m.wheelBody = M(new THREE.MeshStandardMaterial({ color: 0x1c1c1f, roughness: 0.55, bumpMap: leatherB, bumpScale: 0.6 }));
  K.m = m;
  return m;
}

/* ================================================================ dashboard */
const DASH = {
  // lip: dash height offset; slope: how far the face leans toward the driver per metre of drop;
  // faceH: face height below the lip; step: two-tier face; angular: faceted (hex) surfaces
  layered: { lip: 0.0, slope: 0.18, faceH: 0.4 },
  horizontal: { lip: -0.012, slope: 0.12, faceH: 0.36 },
  wrap: { lip: 0.008, slope: 0.22, faceH: 0.4 },
  luxury: { lip: 0.012, slope: 0.2, faceH: 0.42 },
  muscle: { lip: 0.018, slope: 0.1, faceH: 0.42 },
  hex: { lip: -0.025, slope: 0.3, faceH: 0.36, angular: true },
  tub: { lip: -0.05, slope: 0.15, faceH: 0.17, beam: true },
  eighties: { lip: 0.012, slope: 0.06, faceH: 0.4, step: 0.17 },
  binnacle: { lip: 0.006, slope: 0.2, faceH: 0.4 },
  gt: { lip: 0.012, slope: 0.22, faceH: 0.42 },
  ev: { lip: -0.012, slope: 0.1, faceH: 0.3 },
  quattro: { lip: 0.004, slope: 0.15, faceH: 0.4 },
  jet: { lip: -0.03, slope: 0.32, faceH: 0.36, angular: true },
};

export function dash(K) {
  const { add, m, eyeY, eyeZ, zWS, glassY, innerW } = K;
  const S = DASH[K.I.dash] || DASH.layered;
  const zLip = Math.max(eyeZ - 0.62, zWS + 0.17);
  const yLip = eyeY - 0.325 + S.lip;
  const zA = zWS + 0.025, yA = glassY(zA) - 0.012;
  const dashHW = Math.max(0.45, Math.min(innerW(zLip, yLip - 0.12), innerW(zLip, yLip), innerW(zA + 0.1, yA - 0.06)) - 0.014);
  const yStep = S.step ? yLip - S.step : -9;
  // dash face: leans toward the driver lower down; two-tier faces step forward below the ledge
  const faceZ = (y) => zLip + 0.014 + S.slope * (yLip - 0.04 - y) - (y < yStep ? 0.04 : 0);
  const faceTilt = -Math.atan(S.slope);
  const yBot = yLip - S.faceH;
  const sh = new THREE.Shape();
  const zc = lerp(zA, zLip, 0.5);
  const yc = Math.min(glassY(zc) - 0.03, Math.max(yA, yLip) + (K.I.dash === 'luxury' ? 0.03 : 0.012));
  // height of the dash top at a given z (quadratic from the windscreen base over (zc, yc) to the lip), plus the pad
  const dashTopAt = (z) => {
    const z1 = zLip - 0.05;
    if (z >= z1) return yLip + 0.016;
    let lo = 0, hi = 1;
    for (let i = 0; i < 24; i++) { const u = (lo + hi) / 2; const zu = (1 - u) * (1 - u) * zA + 2 * (1 - u) * u * zc + u * u * z1; if (zu < z) lo = u; else hi = u; }
    const u = (lo + hi) / 2;
    return Math.max((1 - u) * (1 - u) * yA + 2 * (1 - u) * u * yc + u * u * yLip, z > zLip - 0.16 ? yLip + 0.016 : -9) + 0.008;
  };
  Object.assign(K, { zLip, yLip, dashHW, faceZ, faceTilt, zA, yA, yStep, stackX: 0, dashTopAt });
  sh.moveTo(zA, yA);
  if (S.angular) { sh.lineTo(zc, yc - 0.005); sh.lineTo(zLip - 0.04, yLip); sh.lineTo(zLip + 0.012, yLip - 0.03); }
  else { sh.quadraticCurveTo(zc, yc, zLip - 0.05, yLip); sh.quadraticCurveTo(zLip + 0.002, yLip + 0.002, zLip + 0.006, yLip - 0.04); }
  const n = S.angular ? 3 : 10;
  for (let i = 0; i <= n; i++) {
    const y = lerp(yLip - 0.04, yBot, i / n);
    if (S.step && i > 0 && lerp(yLip - 0.04, yBot, (i - 1) / n) >= yStep && y < yStep) {
      sh.lineTo(faceZ(yStep + 0.001) - 0.014, yStep);
      sh.lineTo(faceZ(yStep - 0.001) - 0.014, yStep);
    }
    sh.lineTo(faceZ(y) - 0.014, y);
  }
  if (S.beam) {
    // thin floating beam: the face stops short, the underside runs straight back to the bulkhead
    sh.lineTo(zA + 0.15, yBot - 0.01);
    sh.lineTo(zA, yA - 0.08);
  } else {
    sh.lineTo(zA + 0.06, yBot - 0.02);
    sh.lineTo(zA, yA - 0.1);
  }
  sh.lineTo(zA, yA);
  add(extrudeX(sh, dashHW * 2, 0, 0.008, 14), m.dash);
  // upper pad (leather / soft-touch / alcantara) with stitching along the lip
  const pad = new THREE.Shape();
  pad.moveTo(zLip - 0.16, yLip + 0.004);
  pad.quadraticCurveTo(zLip - 0.06, yLip + 0.016, zLip - 0.01, yLip + 0.004);
  pad.quadraticCurveTo(zLip + 0.012, yLip - 0.012, zLip + 0.012, yLip - 0.035);
  pad.lineTo(zLip + 0.004, yLip - 0.038);
  pad.quadraticCurveTo(zLip, yLip - 0.012, zLip - 0.02, yLip - 0.004);
  pad.lineTo(zLip - 0.16, yLip - 0.008);
  add(extrudeX(pad, dashHW * 2 - 0.02, 0, 0.004, 8), m.dashTop);
  const st = add(new THREE.BoxGeometry(dashHW * 2 - 0.08, 0.0025, 0.0025), m.stitch);
  st.position.set(0, yLip - 0.022, zLip + 0.0135);
  // defroster slot and tweeters at the base of the screen
  const zd = zA + 0.05, yd = lerp(yA, yLip, 0.12) + 0.004;
  add(RB(dashHW * 1.5, 0.004, 0.025, 0.002), m.rubber).position.set(0, yd, zd);
  for (const sx of [-1, 1]) {
    const tw = add(new THREE.CircleGeometry(0.035, 24).rotateX(-Math.PI / 2 + 0.12), m.speaker);
    tw.position.set(sx * (dashHW - 0.14), yd + 0.004, zd + 0.06);
  }
  const onFace = (mesh, x, y, dz = 0.004) => { mesh.position.set(x, y, faceZ(y) + dz); mesh.rotation.x = faceTilt; return mesh; };
  K.onFace = onFace;
  // console waterfall (same curve the console is built from): point, outward normal, placement helper
  const yT = eyeY - (K.I.dash === 'tub' ? 0.7 : 0.725);
  const P0 = [zLip + 0.075, yLip - 0.21], C0 = [zLip + 0.2, yLip - 0.24], P1 = [Math.max(zLip + 0.25, eyeZ - 0.56), yT];
  K.onWaterfall = (mesh, x, u, lift = 0.004) => {
    const z = (1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * C0[0] + u * u * P1[0];
    const y = (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * C0[1] + u * u * P1[1];
    const tz = 2 * (1 - u) * (C0[0] - P0[0]) + 2 * u * (P1[0] - C0[0]), ty = 2 * (1 - u) * (C0[1] - P0[1]) + 2 * u * (P1[1] - C0[1]);
    const l = Math.hypot(tz, ty), nz = -ty / l, ny = tz / l;
    mesh.position.set(x, y + ny * (0.012 + lift), z + nz * (0.012 + lift));
    mesh.rotation.x = Math.atan2(-ny, nz);
    return mesh;
  };
  const style = K.I.dash;
  // ---- style-specific architecture
  if (style === 'layered') {
    // ledge between the two tiers with a silver trim lip, and a carbon-look band on the passenger tier
    // passenger-side upper tier standing proud of the face, with a carbon-look band and silver ledge
    const x0 = 0.17, x1 = dashHW - 0.03;
    const tier = add(RB(x1 - x0, 0.1, 0.05, 0.012), m.dash);
    onFace(tier, (x0 + x1) / 2, yLip - 0.1, 0.022);
    const band = add(RB(x1 - x0 - 0.04, 0.032, 0.01, 0.004), m.trim);
    onFace(band, (x0 + x1) / 2, yLip - 0.1, 0.05);
    const ledge = add(RB(x1 - x0, 0.01, 0.06, 0.004), m.trim2);
    onFace(ledge, (x0 + x1) / 2, yLip - 0.152, 0.024);
  } else if (style === 'horizontal') {
    // one long decorative strip across the passenger side (honeycomb red / aluminium)
    const x0 = K.stackX + 0.17, x1 = dashHW - 0.04;
    const strip = add(RB(x1 - x0, 0.034, 0.01, 0.004), m.trim);
    onFace(strip, (x0 + x1) / 2, yLip - 0.075, 0.005);
    const fine = add(RB(dashHW * 2 - 0.1, 0.006, 0.006, 0.002), m.trim2);
    onFace(fine, 0, yLip - 0.048, 0.005);
  } else if (style === 'wrap') {
    // centre stack is its own block turned toward the driver, glovebox seam on the passenger side
    const stack = add(RB(0.26, 0.3, 0.12, 0.02), m.dash);
    stack.position.set(K.stackX - 0.02, yLip - 0.2, faceZ(yLip - 0.2) + 0.04);
    stack.rotation.set(faceTilt, 0.22, 0, 'YXZ');
    K.stack = stack;
    const seam = add(RB(0.36, 0.004, 0.004, 0.001), m.rubber);
    onFace(seam, dashHW - 0.26, yLip - 0.2, 0.005);
    const seam2 = add(RB(0.004, 0.14, 0.004, 0.001), m.rubber);
    onFace(seam2, dashHW - 0.44, yLip - 0.27, 0.005);
  } else if (style === 'luxury') {
    // open-pore wood band sweeping across the whole dash, chrome pinstripe above it
    for (const [xa, xb] of [[-dashHW + 0.06, -0.14], [0.14, dashHW - 0.06]]) {
      const band = add(RB(xb - xa, 0.05, 0.012, 0.005), m.trim);
      onFace(band, (xa + xb) / 2, yLip - 0.13, 0.006);
      const pin = add(RB(xb - xa, 0.005, 0.006, 0.002), m.trim2);
      onFace(pin, (xa + xb) / 2, yLip - 0.1, 0.007);
    }
  } else if (style === 'muscle') {
    // double brow: a cowl over the driver's gauges mirrored by one over the passenger
    {
      const brow = new THREE.Shape();
      brow.moveTo(-0.22, 0); brow.quadraticCurveTo(-0.2, 0.075, 0, 0.08); brow.quadraticCurveTo(0.2, 0.075, 0.22, 0); brow.lineTo(-0.22, 0);
      const bm = add(extrudeZ(brow, 0.18, 0.01), m.dashTop);
      bm.position.set(-K.dx, dashTopAt(zLip - 0.09) - 0.02, zLip - 0.09);
    }
    const strip = add(RB(dashHW * 2 - 0.16, 0.022, 0.01, 0.004), m.trim);
    onFace(strip, 0, yLip - 0.06, 0.006);
  } else if (style === 'hex') {
    // Y-shaped centre stack in carbon running down into the console, faceted trim
    const y0 = yLip - 0.05;
    const yS = new THREE.Shape();
    yS.moveTo(-0.17, 0); yS.lineTo(0.17, 0); yS.lineTo(0.08, -0.12); yS.lineTo(0.06, -0.3); yS.lineTo(-0.06, -0.3); yS.lineTo(-0.08, -0.12); yS.lineTo(-0.17, 0);
    const ym = add(extrudeZ(yS, 0.008, 0.002), m.trim);
    onFace(ym, K.stackX, y0, 0.002);
    for (const sx of [-1, 1]) {
      const fin = add(RB(0.2, 0.012, 0.012, 0.003), m.trim2);
      onFace(fin, sx < 0 ? K.dx : dashHW - 0.2, yLip - 0.05, 0.006);
      fin.rotation.z = sx * 0.12;
    }
  } else if (style === 'eighties') {
    // flat 80s fascia: full-width silver pinstripe, a passenger grab handle and the glovebox outline
    const pin = add(RB(dashHW * 2 - 0.1, 0.006, 0.006, 0.002), m.trim2);
    onFace(pin, 0, yLip - 0.035, 0.005);
    const grab = add(RB(0.22, 0.024, 0.03, 0.01), m.dashTop);
    onFace(grab, dashHW - 0.24, yLip - 0.07, 0.02);
    for (const yy of [yLip - 0.1, yLip - 0.24]) { const gl = add(RB(0.34, 0.004, 0.004, 0.001), m.rubber); onFace(gl, dashHW - 0.25, yy, 0.005); }
  } else if (style === 'binnacle') {
    // centre stack turned toward the driver, and a multi-function display in its own hood on the dash top
    const stack = add(RB(0.25, 0.28, 0.1, 0.02), m.dash);
    stack.position.set(K.stackX, yLip - 0.2, faceZ(yLip - 0.2) + 0.035);
    stack.rotation.set(faceTilt, 0.16, 0, 'YXZ');
    K.stack = stack;
    const zP = zLip - 0.13, yP = dashTopAt(zP) + 0.028;
    const pod = add(RB(0.18, 0.065, 0.09, 0.02), m.dashTop);
    pod.position.set(K.stackX, yP, zP); pod.rotation.x = -0.28;
    const scr = add(new THREE.PlaneGeometry(0.15, 0.054), K.M(new THREE.MeshBasicMaterial({ map: mfdTexture(), toneMapped: false })));
    scr.position.set(K.stackX, yP + 0.012, zP + 0.046); scr.rotation.x = -0.28;
  } else if (style === 'gt') {
    // leather-wrapped fascia: a rolled leather band with twin stitch lines and a chrome pinstripe under it
    const band = add(RB(dashHW * 2 - 0.14, 0.045, 0.014, 0.007), m.seat);
    onFace(band, 0, yLip - 0.115, 0.007);
    for (const yy of [yLip - 0.1, yLip - 0.13]) { const st2 = add(new THREE.BoxGeometry(dashHW * 2 - 0.16, 0.0022, 0.0022), m.stitch); onFace(st2, 0, yy, 0.015); }
    const cl = add(RB(dashHW * 2 - 0.16, 0.004, 0.006, 0.002), m.chrome);
    onFace(cl, 0, yLip - 0.148, 0.01);
  } else if (style === 'ev') {
    // slim floating dash with a full-width light line
    const strip = add(RB(dashHW * 2 - 0.08, 0.005, 0.006, 0.002), K.P.ambient ? K.ambientMat : m.trim2);
    onFace(strip, 0, yLip - 0.045, 0.006);
    const shelf = add(RB(dashHW * 2 - 0.06, 0.012, 0.06, 0.005), m.trim);
    onFace(shelf, 0, yBot + 0.02, 0.02);
  } else if (style === 'quattro') {
    // black-glass band across the centre, aluminium inlay on the passenger side
    const gb = add(RB(0.46, 0.13, 0.01, 0.004), m.piano);
    onFace(gb, K.stackX, yLip - 0.1, 0.006);
    const inlay = add(RB(Math.max(0.1, dashHW - 0.3), 0.026, 0.008, 0.003), m.trim);
    onFace(inlay, (K.stackX + 0.25 + dashHW - 0.04) / 2, yLip - 0.075, 0.006);
    const fine = add(RB(dashHW * 2 - 0.1, 0.004, 0.006, 0.002), m.trim2);
    onFace(fine, 0, yLip - 0.032, 0.006);
  } else if (style === 'jet') {
    // fighter-jet centre spine: a carbon ridge from the dash top into the console, aviation strakes
    const sp = new THREE.Shape();
    sp.moveTo(-0.1, 0); sp.lineTo(0.1, 0); sp.lineTo(0.05, -0.3); sp.lineTo(-0.05, -0.3); sp.lineTo(-0.1, 0);
    const spm = add(extrudeZ(sp, 0.026, 0.004), m.carbon);
    onFace(spm, K.stackX, yLip - 0.02, 0.012);
    for (const sx of [-1, 1]) {
      const st = add(RB(0.24, 0.01, 0.014, 0.003), m.trim2);
      onFace(st, sx < 0 ? K.dx : dashHW - 0.2, yLip - 0.095, 0.008);
      st.rotation.z = sx * -0.08;
    }
    const grab = add(RB(0.2, 0.026, 0.03, 0.01), m.carbon);
    onFace(grab, dashHW - 0.22, yLip - 0.17, 0.02);
  } else if (style === 'tub') {
    // exposed carbon bulkhead below the floating beam
    const yb = yBot - 0.02;
    const bulk = add(new THREE.PlaneGeometry(dashHW * 2, Math.max(0.1, yb - (eyeY - 0.95))), m.carbon);
    bulk.position.set(0, (yb + eyeY - 0.95) / 2, zA + 0.08);
    const lip2 = add(RB(dashHW * 2 - 0.04, 0.01, 0.03, 0.004), m.trim2);
    lip2.position.set(0, yBot + 0.002, faceZ(yBot) - 0.004);
  }
}

/* ================================================================ vents */
function vent(K, type, x, y, w, h, parent = null) {
  const { m } = K;
  const v = new THREE.Group();
  if (type === 'round' || type === 'roundBig') {
    const r = type === 'roundBig' ? 0.048 : 0.034;
    v.add(new THREE.Mesh(new THREE.TorusGeometry(r, type === 'roundBig' ? 0.008 : 0.006, 8, 32), type === 'roundBig' ? m.alu : m.trim2));
    const back = new THREE.Mesh(new THREE.CircleGeometry(r, 24), m.rubber);
    back.position.z = -0.008;
    v.add(back);
    const n = type === 'roundBig' ? 8 : 4;
    for (let i = 0; i < n; i++) {
      const vane = new THREE.Mesh(new THREE.BoxGeometry(r * 1.85, 0.004, 0.012), m.plastic);
      vane.rotation.z = (i / n) * Math.PI;
      if (type !== 'roundBig') vane.rotation.z = i < 2 ? 0 : Math.PI / 2, vane.position.set(0, 0, 0);
      v.add(vane);
    }
    if (type !== 'roundBig') {
      for (const yy of [-r * 0.45, r * 0.45]) { const vv = new THREE.Mesh(new THREE.BoxGeometry(r * 1.7, 0.004, 0.012), m.plastic); vv.position.y = yy; v.add(vv); }
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.22, r * 0.22, 0.014, 16).rotateX(Math.PI / 2), m.chrome);
    hub.position.z = 0.004;
    v.add(hub);
  } else if (type === 'hex') {
    const hs = new THREE.Shape();
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; (k ? hs.lineTo.bind(hs) : hs.moveTo.bind(hs))(Math.cos(a) * w / 2, Math.sin(a) * h / 2); }
    hs.closePath();
    const inner = new THREE.Path();
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; (k ? inner.lineTo.bind(inner) : inner.moveTo.bind(inner))(Math.cos(a) * (w / 2 - 0.01), Math.sin(a) * (h / 2 - 0.01)); }
    inner.closePath();
    hs.holes.push(inner);
    v.add(new THREE.Mesh(extrudeZ(hs, 0.02, 0.003), m.trim2));
    const back = new THREE.Mesh(new THREE.CircleGeometry(Math.min(w, h) / 2 - 0.008, 6), m.rubber);
    back.scale.set(w / h, 1, 1);
    back.position.z = -0.006;
    v.add(back);
    for (let i = 0; i < 4; i++) {
      const vane = new THREE.Mesh(new THREE.BoxGeometry(w * 0.75, 0.004, 0.014), i === 1 ? m.accent : m.plastic);
      vane.position.y = -h * 0.28 + i * h * 0.19;
      v.add(vane);
    }
  } else {
    // rectangular (rect) or full-width slim slot (slim)
    const slim = type === 'slim';
    v.add(new THREE.Mesh(RB(w, h, 0.028, slim ? 0.006 : 0.012), slim ? m.trim2 : m.piano));
    const back = new THREE.Mesh(new THREE.BoxGeometry(w - 0.014, h - 0.01, 0.004), m.rubber);
    back.position.z = 0.006;
    v.add(back);
    const nb = slim ? 1 : Math.max(3, Math.round(h / 0.012));
    for (let i = 0; i < nb; i++) {
      const sl = new THREE.Mesh(new THREE.BoxGeometry(w - 0.02, slim ? 0.006 : 0.0035, 0.018), i === Math.floor(nb / 2) ? m.alu : m.dash);
      sl.position.set(0, slim ? 0 : -h / 2 + 0.01 + (i / (nb - 1)) * (h - 0.02), 0.012);
      sl.rotation.x = 0.25;
      v.add(sl);
    }
    if (!slim) { const knob = new THREE.Mesh(RB(0.012, 0.016, 0.012, 0.004), m.chrome); knob.position.set(0, 0, 0.022); v.add(knob); }
  }
  if (parent) { v.position.set(x, y, 0); parent.add(v); } else { K.onFace(v, x, y, 0.008); K.g.add(v); }
  return v;
}

/* ================================================================ centre stack: screen, vents, climate, start */
export function centreStack(K) {
  const { add, M, m, I, dashHW, yLip, dx, eyeZ } = K;
  const cx = K.stackX;
  const navMat = M(new THREE.MeshBasicMaterial({ map: K.navTex, toneMapped: false }));
  K.navMat = navMat;
  const screenOnFace = (w, h, y, bezel = 0.012) => {
    const bz = add(RB(w + bezel, h + bezel, 0.016, 0.006), m.piano);
    K.onFace(bz, cx, y, 0.008);
    const s = add(new THREE.PlaneGeometry(w, h), navMat);
    K.onFace(s, cx, y, 0.0172);
    return s;
  };
  const S = I.screen, V = I.vents, CL = I.climate;
  // ---- vents (per dash layout) and screen
  if (I.dash === 'layered') {
    vent(K, 'rect', cx - 0.075, yLip - 0.07, 0.12, 0.048); vent(K, 'rect', cx + 0.075, yLip - 0.07, 0.12, 0.048);
    vent(K, 'rect', -dashHW + 0.08, yLip - 0.07, 0.11, 0.055); vent(K, 'rect', dashHW - 0.08, yLip - 0.07, 0.11, 0.055);
    screenOnFace(0.17, 0.085, yLip - 0.155);
  } else if (I.dash === 'horizontal' && S === 'floating') {
    // floating tablet over the dash, slim vents in the face
    const scr = add(new THREE.PlaneGeometry(0.24, 0.135), navMat);
    scr.position.set(cx, yLip + 0.08, eyeZ - 0.705);
    scr.rotation.set(-0.14, -0.22, 0, 'YXZ');
    const bz = add(RB(0.256, 0.151, 0.014, 0.008), m.piano);
    bz.position.copy(scr.position).add(new THREE.Vector3(Math.sin(0.22) * 0.008, 0, -Math.cos(0.22) * 0.008));
    bz.rotation.copy(scr.rotation);
    add(RB(0.1, 0.05, 0.05, 0.012), m.piano).position.set(cx + 0.01, yLip + 0.012, eyeZ - 0.72);
    vent(K, 'slim', cx - 0.07, yLip - 0.06, 0.12, 0.028); vent(K, 'slim', cx + 0.07, yLip - 0.06, 0.12, 0.028);
    vent(K, 'slim', -dashHW + 0.1, yLip - 0.06, 0.14, 0.028); vent(K, 'slim', dashHW - 0.1, yLip - 0.06, 0.14, 0.028);
  } else if (I.dash === 'horizontal') {
    // integrated screen high in the face, slim vents beneath it and at the ends
    screenOnFace(0.25, 0.12, yLip - 0.095);
    vent(K, 'slim', cx - 0.085, yLip - 0.19, 0.15, 0.028); vent(K, 'slim', cx + 0.085, yLip - 0.19, 0.15, 0.028);
    vent(K, 'slim', -dashHW + 0.1, yLip - 0.07, 0.14, 0.03); vent(K, 'slim', dashHW - 0.1, yLip - 0.07, 0.14, 0.03);
  } else if (I.dash === 'wrap') {
    // everything on the angled stack: two round vents, head unit, sliders
    const st = K.stack;
    const host = new THREE.Group();
    host.position.copy(st.position); host.rotation.copy(st.rotation);
    host.translateZ(0.061);
    K.g.add(host);
    vent(K, 'round', -0.065, 0.1, 0, 0, host); vent(K, 'round', 0.065, 0.1, 0, 0, host);
    const radio = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.0625), M(new THREE.MeshStandardMaterial({ map: radioTexture(), roughness: 0.3, emissive: 0xffffff, emissiveMap: radioTexture(), emissiveIntensity: 0.12 })));
    radio.position.set(0, 0.015, 0.002);
    host.add(radio);
    const sl = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.05), M(new THREE.MeshStandardMaterial({ map: slidersTexture(), roughness: 0.4 })));
    sl.position.set(0, -0.06, 0.002);
    host.add(sl);
    vent(K, 'round', -dashHW + 0.07, yLip - 0.07, 0, 0); vent(K, 'round', dashHW - 0.07, yLip - 0.07, 0, 0);
  } else if (I.dash === 'luxury') {
    vent(K, 'slim', cx - 0.09, yLip - 0.065, 0.16, 0.03); vent(K, 'slim', cx + 0.09, yLip - 0.065, 0.16, 0.03);
    vent(K, 'slim', -dashHW + 0.1, yLip - 0.065, 0.15, 0.03); vent(K, 'slim', dashHW - 0.1, yLip - 0.065, 0.15, 0.03);
  } else if (I.dash === 'muscle') {
    vent(K, 'roundBig', cx - 0.062, yLip - 0.085, 0, 0); vent(K, 'roundBig', cx + 0.062, yLip - 0.085, 0, 0);
    vent(K, 'roundBig', -dashHW + 0.07, yLip - 0.08, 0, 0); vent(K, 'roundBig', dashHW - 0.07, yLip - 0.08, 0, 0);
    screenOnFace(0.17, 0.075, yLip - 0.172);
  } else if (I.dash === 'hex') {
    vent(K, 'hex', cx - 0.07, yLip - 0.085, 0.11, 0.075); vent(K, 'hex', cx + 0.07, yLip - 0.085, 0.11, 0.075);
    vent(K, 'hex', -dashHW + 0.075, yLip - 0.07, 0.1, 0.07); vent(K, 'hex', dashHW - 0.075, yLip - 0.07, 0.1, 0.07);
    screenOnFace(0.14, 0.07, yLip - 0.172, 0.01);
  } else if (I.dash === 'tub') {
    // floating tablet on a thin stalk, small round vents at the ends of the beam
    const scr = add(new THREE.PlaneGeometry(0.2, 0.12), navMat);
    scr.position.set(cx, yLip + 0.075, eyeZ - 0.69);
    scr.rotation.set(-0.2, -0.2, 0, 'YXZ');
    const bz = add(RB(0.212, 0.132, 0.01, 0.006), m.carbon);
    bz.position.copy(scr.position).add(new THREE.Vector3(Math.sin(0.2) * 0.006, 0, -Math.cos(0.2) * 0.006));
    bz.rotation.copy(scr.rotation);
    const stalk = limb(new THREE.Vector3(cx + 0.005, yLip + 0.004, eyeZ - 0.71), new THREE.Vector3(cx + 0.005, yLip + 0.03, eyeZ - 0.705), 0.008, 0.008, 8);
    stalk.material = m.trim2;
    K.g.add(stalk);
    vent(K, 'round', -dashHW + 0.07, yLip - 0.06, 0, 0); vent(K, 'round', dashHW - 0.07, yLip - 0.06, 0, 0);
  }
  else if (I.dash === 'eighties') {
    vent(K, 'rect', cx - 0.07, yLip - 0.075, 0.11, 0.045); vent(K, 'rect', cx + 0.07, yLip - 0.075, 0.11, 0.045);
    vent(K, 'rect', -dashHW + 0.08, yLip - 0.07, 0.1, 0.045); vent(K, 'rect', dashHW - 0.08, yLip - 0.07, 0.1, 0.045);
    const radio = add(new THREE.PlaneGeometry(0.18, 0.056), M(new THREE.MeshStandardMaterial({ map: radioTexture(), roughness: 0.3, emissive: 0xffffff, emissiveMap: radioTexture(), emissiveIntensity: 0.12 })));
    K.onFace(radio, cx, yLip - 0.15, 0.006);
  } else if (I.dash === 'binnacle') {
    const st = K.stack;
    const host = new THREE.Group();
    host.position.copy(st.position); host.rotation.copy(st.rotation);
    host.translateZ(0.051);
    K.g.add(host);
    vent(K, 'rect', -0.06, 0.095, 0.1, 0.045, host); vent(K, 'rect', 0.06, 0.095, 0.1, 0.045, host);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.075), navMat);
    scr.position.set(0, 0.0, 0.002);
    host.add(scr);
    vent(K, 'rect', -dashHW + 0.08, yLip - 0.07, 0.1, 0.05); vent(K, 'rect', dashHW - 0.08, yLip - 0.07, 0.1, 0.05);
  } else if (I.dash === 'gt') {
    // screen rising out of the dash top, slim centre vents, eyeball vents at the ends
    const scr = add(new THREE.PlaneGeometry(0.2, 0.085), navMat);
    scr.position.set(cx, yLip + 0.05, eyeZ - 0.71); scr.rotation.x = -0.12;
    const bz = add(RB(0.214, 0.099, 0.012, 0.006), m.piano);
    bz.position.set(cx, yLip + 0.05, eyeZ - 0.718); bz.rotation.x = -0.12;
    vent(K, 'slim', cx - 0.075, yLip - 0.065, 0.13, 0.028); vent(K, 'slim', cx + 0.075, yLip - 0.065, 0.13, 0.028);
    vent(K, 'round', -dashHW + 0.07, yLip - 0.065, 0, 0); vent(K, 'round', dashHW - 0.07, yLip - 0.065, 0, 0);
  } else if (I.dash === 'ev') {
    // centre touchscreen, passenger display, vents hidden in a full-width slot
    screenOnFace(0.26, 0.1, yLip - 0.085, 0.01);
    const ps = add(new THREE.PlaneGeometry(0.24, 0.085), navMat);
    K.onFace(ps, dashHW - 0.26, yLip - 0.08, 0.0172);
    const pb = add(RB(0.252, 0.097, 0.016, 0.006), m.piano);
    K.onFace(pb, dashHW - 0.26, yLip - 0.08, 0.008);
    vent(K, 'slim', -dashHW + 0.11, yLip - 0.03, 0.16, 0.014); vent(K, 'slim', cx, yLip - 0.025, 0.3, 0.012);
  } else if (I.dash === 'quattro') {
    // upper infotainment screen in the black-glass band; the climate screen sits below it
    screenOnFace(0.24, 0.1, yLip - 0.1, 0.008);
    vent(K, 'slim', -dashHW + 0.1, yLip - 0.07, 0.14, 0.03); vent(K, 'slim', dashHW - 0.1, yLip - 0.07, 0.14, 0.03);
    vent(K, 'slim', cx - 0.2, yLip - 0.04, 0.12, 0.022); vent(K, 'slim', cx + 0.2, yLip - 0.04, 0.12, 0.022);
  } else if (I.dash === 'jet') {
    screenOnFace(0.13, 0.065, yLip - 0.115, 0.01);
    vent(K, 'round', cx - 0.13, yLip - 0.07, 0, 0); vent(K, 'round', cx + 0.13, yLip - 0.07, 0, 0);
    vent(K, 'round', -dashHW + 0.07, yLip - 0.06, 0, 0); vent(K, 'round', dashHW - 0.07, yLip - 0.06, 0, 0);
  }
  // ---- climate controls
  const yC = yLip - 0.165;
  if (CL === 'knobs') {
    // three big climate knobs with silver rings on the console waterfall
    for (const k of [-1, 0, 1]) {
      const knob = add(new THREE.CylinderGeometry(0.022, 0.024, 0.022, 28).rotateX(Math.PI / 2), [m.knurl, m.piano, m.piano]);
      K.onWaterfall(knob, cx + k * 0.068, 0.32, 0.012);
      const ring = add(new THREE.TorusGeometry(0.026, 0.002, 6, 28), m.trim2);
      K.onWaterfall(ring, cx + k * 0.068, 0.32, 0.002);
    }
  } else if (CL === 'panel' || CL === 'touch' || CL === 'buttons') {
    const tex = climateTexture();
    const pm = M(new THREE.MeshStandardMaterial({ map: tex, roughness: CL === 'touch' ? 0.1 : 0.3, metalness: 0.2, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.15 }));
    const p = add(new THREE.PlaneGeometry(0.21, 0.0525), pm);
    if (CL === 'buttons') K.onWaterfall(p, cx, 0.3, 0.002);
    else K.onFace(p, cx, yLip - 0.172, 0.004);
  } else if (CL === 'sliders' && I.dash !== 'wrap') {
    // 80s slider climate panel under the head unit
    const sl = add(new THREE.PlaneGeometry(0.19, 0.0475), M(new THREE.MeshStandardMaterial({ map: slidersTexture(), roughness: 0.4 })));
    K.onFace(sl, cx, yLip - 0.215, 0.006);
  } else if (CL === 'toggles') {
    // aluminium toggle switches behind a guard bar, labelled
    const labels = I.dash === 'hex' ? ['ESC', 'LIFT', 'HAZ', 'A/C', 'REC', 'DEF'] : I.dash === 'jet' ? ['ESC', 'LIFT', 'AUX', 'A/C', 'DEF'] : ['TRACT', 'MODE', 'HAZ', 'LANE', 'STOP'];
    const n = labels.length, w = 0.04 * n;
    const ww = Math.min(w, 0.22);
    const lab = add(new THREE.PlaneGeometry(ww, ww * 96 / 512 * 1.1), M(new THREE.MeshStandardMaterial({ map: toggleLabelTexture(labels), roughness: 0.5 })));
    K.onWaterfall(lab, cx, 0.28, 0.002);
    for (let i = 0; i < n; i++) {
      const x = cx - ww / 2 + (i + 0.5) * (ww / n);
      const t = add(new THREE.CylinderGeometry(0.0035, 0.005, 0.03, 10).rotateX(Math.PI / 2 - 0.5), m.chrome);
      K.onWaterfall(t, x, 0.25, 0.018);
      const base = add(new THREE.CylinderGeometry(0.008, 0.008, 0.008, 12).rotateX(Math.PI / 2), m.alu);
      K.onWaterfall(base, x, 0.25, 0.006);
    }
    const guard = add(RB(ww + 0.02, 0.006, 0.03, 0.002), m.alu);
    K.onWaterfall(guard, cx, 0.34, 0.016);
  }
  // ---- start control
  if (I.start === 'button') {
    const yS = yLip - 0.13;
    const b = add(new THREE.CylinderGeometry(0.017, 0.017, 0.012, 24).rotateX(Math.PI / 2), m.piano);
    K.onFace(b, dx + 0.24, yS, 0.006);
    const f = add(new THREE.CircleGeometry(0.012, 20), m.redGlow);
    K.onFace(f, dx + 0.24, yS, 0.0125);
    const r = add(new THREE.TorusGeometry(0.018, 0.0022, 6, 24), m.chrome);
    K.onFace(r, dx + 0.24, yS, 0.007);
  }
  // ---- ambient light pipes (only cars that have them)
  if (K.P.ambient) {
    const light = (xa, xb, y) => {
      const len = Math.max(0.05, xb - xa);
      const core = add(new THREE.BoxGeometry(len, 0.005, 0.005), K.ambientMat);
      core.position.set((xa + xb) / 2, y, K.faceZ(y) + 0.005);
      const glow = add(new THREE.PlaneGeometry(len + 0.03, 0.045), K.ambientGlow);
      K.onFace(glow, (xa + xb) / 2, y, 0.008);
      glow.renderOrder = 6;
    };
    const yA = I.dash === 'luxury' ? yLip - 0.162 : yLip - 0.04;
    light(cx + 0.17, dashHW - 0.02, yA);
    light(-dashHW + 0.02, dx - 0.22, yA);
  }
  // ---- analog chrono clock on the dash top (rear-engined coupe)
  if (I.clock) {
    const cg = new THREE.Group();
    cg.add(new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.05, 28), m.dashTop));
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.03, 28), M(new THREE.MeshBasicMaterial({ map: K.clockTex, toneMapped: false })));
    face.position.set(0, 0.012, 0.0255);
    face.rotation.x = -0.25;
    cg.add(face);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.031, 0.003, 6, 28), m.chrome);
    ring.position.copy(face.position); ring.rotation.copy(face.rotation);
    cg.add(ring);
    cg.position.set(cx, yLip + 0.035, K.zLip - 0.1);
    K.g.add(cg);
  }
}

/* ================================================================ instrument cluster */
export function cluster(K) {
  const { add, M, m, I, dx, eyeY, eyeZ, yLip } = K;
  const gaugeMat = K.gaugeMat || (K.gaugeMat = M(new THREE.MeshBasicMaterial({ map: K.gaugeTex, toneMapped: false })));
  const style = I.cluster;
  const tilt = -0.22;
  // fit: just ahead of the dash lip, bottom edge above the dash top and the hub sight line, top tucked a little under the rim
  const zCl = K.zLip - 0.06;
  const aspect = { fiveDial: 0.42 / 0.1575, retroAnalog: 0.36 / 0.135 }[style] ?? 1024 / 384;
  const designH = { fiveDial: 0.1575, retroAnalog: 0.135, digitalSport: 0.12, hexTFT: 0.12 }[style] ?? 0.1275;
  const bottom = Math.max(K.hubSight(zCl) - 0.004, K.dashTopAt(zCl) + 0.004);
  const top = K.rimSight(zCl) + 0.03;
  const hFit = clamp(Math.min(designH, top - bottom), 0.085, designH);
  const scl = hFit / designH;
  const yCl = bottom + hFit / 2;
  K.clusterFit = { zCl, yCl, scl };
  // display plane (canvas is 1024x384) and dial rings that sit on it
  const plane = (w, h, x, y, z, rx, curve = 0) => {
    const pg = new THREE.PlaneGeometry(w, h, curve ? 20 : 1, 1);
    if (curve) { const p = pg.attributes.position; for (let i = 0; i < p.count; i++) p.setZ(i, p.getX(i) * p.getX(i) * curve); pg.computeVertexNormals(); }
    const d = add(pg, gaugeMat);
    d.position.set(x, y, z); d.rotation.x = rx;
    return d;
  };
  const ringsOn = (w, dials, depth = 0.012, ringMat = m.chrome, tube = 0.0035) => {
    const k = w / 1024;
    for (const [px, py, pr] of dials) {
      const x = dx + (px - 512) * k, y = yCl + (192 - py) * k;
      const grp = new THREE.Group();
      grp.position.set(x, y, zCl); grp.rotation.x = tilt;
      const r = pr * k;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r + tube, tube, 8, 40), ringMat);
      ring.position.z = 0.002 + depth;
      grp.add(ring);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(r + tube * 2, r + tube * 2, depth, 40, 1, true).rotateX(Math.PI / 2), m.piano);
      cup.position.z = depth / 2 + 0.001;
      cup.material = m.rubber;
      grp.add(cup);
      K.g.add(grp);
    }
  };
  const hood = (w, h, depth, x, archH, matTop = m.dashTop) => {
    const pod = new THREE.Shape();
    const hz0 = zCl - 0.075, hy0 = Math.min(yLip - 0.01, K.dashTopAt(zCl - 0.075) - 0.01);
    pod.moveTo(hz0, hy0);
    pod.quadraticCurveTo(hz0 - 0.005, yCl + h, zCl + 0.005, yCl + h - 0.002);
    pod.quadraticCurveTo(zCl + depth, yCl + h - 0.003, zCl + depth + 0.003, yCl + h - 0.016);
    pod.quadraticCurveTo(zCl + depth * 0.6, yCl + h - 0.022, zCl + 0.004, yCl + h - 0.026);
    pod.lineTo(zCl - 0.03, yCl + h - 0.034);
    pod.lineTo(zCl - 0.035, hy0);
    pod.lineTo(hz0, hy0);
    add(extrudeX(pod, w, x, 0.016, 12), matTop);
    if (archH) {
      // arched brow: raise the middle of the hood
      const br = add(new THREE.CylinderGeometry(w * 0.5, w * 0.5, depth + 0.07, 32, 1, false, -Math.PI * 0.35, Math.PI * 0.7).rotateX(Math.PI / 2).rotateZ(Math.PI / 2 * 0), matTop);
      br.scale.set(1, archH / (w * 0.5), 1);
      br.position.set(x, yCl + h - 0.02, zCl - 0.02);
      br.rotation.z = 0;
    }
    const st = add(new THREE.BoxGeometry(w - 0.03, 0.002, 0.002), m.stitch);
    st.position.set(x, yCl + h - 0.005, zCl + depth - 0.015);
  };
  const wS = hFit * aspect;
  if (style === 'twinAnalog') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[230, 200, 168], [794, 200, 168]], 0.014, m.trim2);
    hood(wS + 0.06, hFit * 0.82, 0.045, dx, 0);
  } else if (style === 'digitalSport') {
    plane(wS, hFit, dx, yCl, zCl, tilt, 0.5);
    const bz = add(RB(wS + 0.02, hFit + 0.015, 0.02, 0.01), m.piano); bz.position.set(dx, yCl - 0.002, zCl - 0.014); bz.rotation.x = tilt;
    hood(wS + 0.05, hFit * 0.8, 0.04, dx, 0);
  } else if (style === 'retroAnalog') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[200, 214, 140], [512, 196, 182], [846, 120, 78], [846, 290, 78]], 0.02, m.trim2, 0.003);
    // big semicircular binnacle
    const bin = new THREE.Shape();
    bin.moveTo(-0.215, 0); bin.lineTo(-0.215, 0.05); bin.quadraticCurveTo(-0.2, 0.15, 0, 0.155); bin.quadraticCurveTo(0.2, 0.15, 0.215, 0.05); bin.lineTo(0.215, 0);
    bin.lineTo(0.2, 0); bin.lineTo(0.2, 0.05); bin.quadraticCurveTo(0.185, 0.135, 0, 0.14); bin.quadraticCurveTo(-0.185, 0.135, -0.2, 0.05); bin.lineTo(-0.2, 0); bin.lineTo(-0.215, 0);
    const bm = add(extrudeZ(bin, 0.12, 0.006), m.dashTop);
    bm.scale.set(wS / 0.36, hFit / 0.135, 1);
    bm.position.set(dx, yCl - 0.072 * scl, zCl - 0.02);
    bm.rotation.x = tilt;
  } else if (style === 'curvedPanel') {
    // one curved glass panel: cluster on the left, infotainment on the right, floating on the dash top
    const grp = new THREE.Group();
    const w1 = 0.3, h = 0.11, w2 = 0.34;
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(w1, h), gaugeMat);
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(w2, h), K.navMat);
    p1.position.set(0, 0, 0);
    p2.position.set(w1 / 2 + w2 / 2 * Math.cos(0.32) + 0.005, 0, w2 / 2 * Math.sin(0.32));
    p2.rotation.y = -0.32;
    const bz1 = new THREE.Mesh(RB(w1 + 0.016, h + 0.016, 0.012, 0.006), m.piano); bz1.position.z = -0.008;
    const bz2 = new THREE.Mesh(RB(w2 + 0.016, h + 0.016, 0.012, 0.006), m.piano); bz2.position.copy(p2.position).add(new THREE.Vector3(Math.sin(0.32) * 0.008, 0, -Math.cos(0.32) * 0.008)); bz2.rotation.y = -0.32;
    grp.add(p1, p2, bz1, bz2);
    grp.position.set(dx, Math.max(K.dashTopAt(zCl - 0.03) + 0.062, yCl), zCl - 0.03);
    grp.rotation.x = -0.12;
    K.g.add(grp);
    K.curved = grp;
    // slim chrome foot the glass panel stands on
    const foot = add(RB(0.5, 0.012, 0.05, 0.005), m.trim2);
    foot.position.set(dx + 0.25, grp.position.y - 0.062, zCl - 0.02);
  } else if (style === 'fiveDial') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[96, 220, 92], [298, 210, 132], [512, 196, 178], [726, 210, 132], [928, 220, 92]], 0.016, m.trim2, 0.003);
    hood(wS + 0.05, hFit * 0.75, 0.05, dx, 0);
  } else if (style === 'twinTunnel') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[220, 196, 170], [804, 196, 170]], 0.045, m.alu, 0.004);
    hood(wS + 0.06, hFit * 0.9, 0.05, dx, 0);
  } else if (style === 'hexTFT') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    const hx = new THREE.Shape();
    hx.moveTo(-0.19, 0); hx.lineTo(-0.15, 0.1); hx.lineTo(0.15, 0.1); hx.lineTo(0.19, 0); hx.lineTo(0.175, 0); hx.lineTo(0.14, 0.085); hx.lineTo(-0.14, 0.085); hx.lineTo(-0.175, 0); hx.lineTo(-0.19, 0);
    const hm = add(extrudeZ(hx, 0.1, 0.004), m.dashTop);
    hm.scale.set(wS / 0.32, scl, 1);
    hm.position.set(dx, yCl - 0.045 * scl, zCl - 0.01);
    hm.rotation.x = tilt;
  } else if (style === 'digital80') {
    // square 80s binnacle with a smoked acrylic lens over the displays
    plane(wS, hFit, dx, yCl, zCl, tilt);
    const lens = add(new THREE.PlaneGeometry(wS + 0.01, hFit + 0.01), M(new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.05, transparent: true, opacity: 0.18, clearcoat: 1 })));
    lens.position.set(dx, yCl, zCl + 0.012); lens.rotation.x = tilt;
    const box = add(RB(wS + 0.05, hFit + 0.04, 0.03, 0.006), m.dashTop);
    box.position.set(dx, yCl, zCl - 0.02); box.rotation.x = tilt;
    hood(wS + 0.07, hFit * 0.9, 0.06, dx, 0);
  } else if (style === 'gtrTriple') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[190, 220, 150], [512, 196, 184], [836, 160, 104], [900, 318, 58]], 0.016, m.trim2, 0.003);
    hood(wS + 0.05, hFit * 0.85, 0.05, dx, 0);
  } else if (style === 'twinCounter') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    ringsOn(wS, [[222, 196, 176], [802, 196, 176]], 0.02, m.chrome, 0.004);
    hood(wS + 0.05, hFit * 0.8, 0.045, dx, 0, m.seat);
  } else if (style === 'evStrip') {
    // free-standing curved display on a slim stem, no hood
    plane(wS, hFit * 0.9, dx, yCl, zCl, tilt, 0.6);
    const bz = add(RB(wS + 0.018, hFit * 0.9 + 0.016, 0.012, 0.006), m.piano); bz.position.set(dx, yCl - 0.001, zCl - 0.012); bz.rotation.x = tilt;
  } else if (style === 'virtualCockpit') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    const bz = add(RB(wS + 0.016, hFit + 0.016, 0.014, 0.006), m.piano); bz.position.set(dx, yCl - 0.002, zCl - 0.012); bz.rotation.x = tilt;
    hood(wS + 0.05, hFit * 0.78, 0.04, dx, 0);
  } else if (style === 'jetTFT') {
    plane(wS, hFit, dx, yCl, zCl, tilt);
    // angular carbon cowl
    const cw = new THREE.Shape();
    cw.moveTo(-0.2, 0); cw.lineTo(-0.17, 0.11); cw.lineTo(-0.06, 0.125); cw.lineTo(0.06, 0.125); cw.lineTo(0.17, 0.11); cw.lineTo(0.2, 0); cw.lineTo(0.185, 0); cw.lineTo(0.157, 0.096); cw.lineTo(-0.157, 0.096); cw.lineTo(-0.185, 0); cw.lineTo(-0.2, 0);
    const cm = add(extrudeZ(cw, 0.1, 0.004), m.carbon);
    cm.scale.set(wS / 0.33, scl, 1);
    cm.position.set(dx, yCl - 0.052 * scl, zCl - 0.01);
    cm.rotation.x = tilt;
  } else if (style === 'pod') {
    // carried on the steering column (added to the wheel assembly in wheel())
    // the pod lives on the steering column (see wheel())
  }
}

/* ================================================================ steering wheel */
/** Builds the column (fixed) and the rotating wheel. Returns { wheelGroup, rotor, R }. */
export function wheel(K) {
  const { M, m, I, def, dx, eyeY, eyeZ } = K;
  const W = I.wheel;
  const wheelGroup = new THREE.Group();
  const low = I.eyeDY < -0.03;
  wheelGroup.position.set(dx, eyeY - (low ? 0.33 : 0.34), eyeZ - (low ? 0.5 : 0.53));
  wheelGroup.rotation.x = low ? -0.42 : -0.33;
  const rotor = new THREE.Group();
  wheelGroup.add(rotor);
  const R = W.R;
  const style = W.style;
  // ---- column, shroud, stalks (or column-fixed paddles on supercars)
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.3, 16).rotateX(Math.PI / 2), m.dash);
  col.position.z = -0.17;
  wheelGroup.add(col);
  const shroud = new THREE.Mesh(RB(0.13, 0.1, 0.2, 0.035), I.dash === 'tub' || I.dash === 'hex' ? m.carbon : m.dash);
  shroud.position.set(0, -0.035, -0.16);
  wheelGroup.add(shroud);
  for (const sx of [-1, 1]) {
    const stalk = limb(new THREE.Vector3(sx * 0.06, -0.02, -0.1), new THREE.Vector3(sx * 0.165, -0.045, -0.085), 0.006, 0.005, 8);
    stalk.material = I.wheel.style === 'classic3' ? m.plastic : m.piano;
    wheelGroup.add(stalk);
  }
  if (W.paddles === 'big') {
    // large column-mounted carbon paddles that stay put while the wheel turns
    for (const sx of [-1, 1]) {
      const pd = new THREE.Shape();
      pd.moveTo(0, -0.035); pd.lineTo(0.022, -0.042); pd.lineTo(0.042, 0.022); pd.lineTo(0.032, 0.058); pd.lineTo(0, 0.036); pd.lineTo(0, -0.035);
      const pg = extrudeZ(pd, 0.006, 0.002);
      if (sx < 0) pg.scale(-1, 1, 1);
      const pm = new THREE.Mesh(pg, K.I.dash === 'hex' ? m.alu : m.plastic);
      pm.position.set(sx * (R - 0.01), 0.01, -0.06);
      wheelGroup.add(pm);
    }
  }
  if (I.cluster === 'pod') {
    const podG = new THREE.Group();
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.075), K.gaugeMat || (K.gaugeMat = M(new THREE.MeshBasicMaterial({ map: K.gaugeTex, toneMapped: false }))));
    scr.position.set(0, 0, 0.012);
    const body = new THREE.Mesh(RB(0.225, 0.095, 0.05, 0.015), m.carbon);
    body.position.z = -0.014;
    podG.add(body, scr);
    podG.position.set(0, R * 0.58 + 0.045, -0.11);
    podG.rotation.x = 0.2;
    wheelGroup.add(podG);
  }
  // ---- rim
  const shape = { sport3: 'round', hatch3: 'flat', classic3: 'round', mThick: 'flat', gt3: 'round', muscle3: 'flat', super: 'flat2', race: 'squircle', four80: 'round', momo3: 'round', gtFlat: 'flat2', ev2: 'flat2', rsFlat: 'flat', jetY: 'flat2' }[style] || 'round';
  const thick = { classic3: 0.0165, mThick: 0.0245, muscle3: 0.024, race: 0.02, super: 0.021, four80: 0.019, momo3: 0.0165, gtFlat: 0.021, ev2: 0.02, rsFlat: 0.023, jetY: 0.021 }[style] ?? 0.0205;
  const pts = [];
  const N = 120;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    let x = Math.cos(a) * R, y = Math.sin(a) * R;
    if (shape === 'flat' && y < -R * 0.83) y = -R * 0.83 + (y + R * 0.83) * 0.12;
    if (shape === 'flat2') { if (y < -R * 0.8) y = -R * 0.8 + (y + R * 0.8) * 0.1; if (y > R * 0.86) y = R * 0.86 + (y - R * 0.86) * 0.15; }
    if (shape === 'squircle') {
      const p = 4, c = Math.cos(a), s = Math.sin(a);
      x = Math.sign(c) * Math.pow(Math.abs(c), 2 / p) * R * 1.12;
      y = Math.sign(s) * Math.pow(Math.abs(s), 2 / p) * R * 0.82;
    }
    pts.push(new THREE.Vector3(x, y, 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts, true);
  const rimGeo = new THREE.TubeGeometry(curve, 200, thick, 14, true);
  rimGeo.scale(1, 1, style === 'classic3' ? 1.1 : 1.32);
  rotor.add(new THREE.Mesh(rimGeo, m.rim));
  // carbon upper section (supercar) / wooden-free classic: polished
  if (W.carbonTop || style === 'race') {
    const arc = pts.filter((p) => p.y > (style === 'race' ? R * 0.55 : R * 0.6));
    if (arc.length > 3) {
      arc.sort((a, b) => b.x - a.x);
      const cg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arc), 40, thick * 1.02, 14, false);
      cg.scale(1, 1, 1.32);
      rotor.add(new THREE.Mesh(cg, m.carbon));
    }
  }
  // 12 o'clock marker / tricolour
  const markers = W.tricolor ? ['#4fb3ff', '#1b3fa0', '#e0182d'] : W.marker ? [W.marker] : [];
  markers.forEach((c, i) => {
    const sw = 0.03;
    const a0 = Math.PI / 2 + (i - (markers.length - 1) / 2) * sw;
    const arc = [];
    for (let k = 0; k <= 4; k++) { const a = a0 - sw / 2 + (k / 4) * sw; arc.push(new THREE.Vector3(Math.cos(a) * R * (shape === 'squircle' ? 0.82 / 1 : shape === 'flat2' ? 0.86 : 1), Math.sin(a) * R * (shape === 'squircle' ? 0.82 : shape === 'flat2' ? 0.86 : 1), 0)); }
    const sg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arc), 4, thick * 1.04, 14, false);
    sg.scale(1, 1, 1.32);
    rotor.add(new THREE.Mesh(sg, M(new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.5 }))));
  });
  // stitching on the inside of the rim
  if (shape !== 'squircle') { const st = new THREE.Mesh(new THREE.TorusGeometry(R - thick * 0.95, 0.0006, 3, 96), m.stitch); st.position.z = thick * 0.6; rotor.add(st); }
  // shift lights across the top (race / supercar)
  if (W.lights) {
    for (let i = 0; i < 9; i++) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.006, 0.004), M(new THREE.MeshBasicMaterial({ color: i < 3 ? 0x2bff6a : i < 6 ? 0xffd21e : 0xff2030, toneMapped: false })));
      led.position.set(-0.064 + i * 0.016, R * 0.82 - 0.022, 0.016);
      led.userData.led = i;
      rotor.add(led);
      (K.leds = K.leds || []).push(led);
    }
  }
  // ---- spokes and hub per design
  const spoke = (x, y, w, h, d, mat, rz = 0) => { const s = new THREE.Mesh(RB(w, h, d, Math.min(w, h) * 0.3), mat); s.position.set(x, y, 0.004); s.rotation.z = rz; rotor.add(s); return s; };
  const buttons = (sx, len, y = -0.012) => {
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(len * 0.82, 0.042), M(new THREE.MeshStandardMaterial({ map: spokeButtonsTexture(sx), roughness: 0.35, metalness: 0.2 })));
    pad.position.set(sx * (0.06 + len / 2), y, 0.0165);
    rotor.add(pad);
  };
  const len = R - 0.065;
  if (style === 'classic3') {
    // three slim polished alloy spokes with lightening holes, small horn button
    for (const [a, w] of [[0, 0.03], [Math.PI, 0.03], [-Math.PI / 2, 0.034]]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(R - 0.03, w, 0.006), m.alu);
      sp.position.set(Math.cos(a) * (R / 2 + 0.01), Math.sin(a) * (R / 2 + 0.01), 0.006);
      sp.rotation.z = a;
      rotor.add(sp);
      for (const f of [0.45, 0.7]) {
        const hole = new THREE.Mesh(new THREE.CircleGeometry(w * 0.28, 12), m.rubber);
        hole.position.set(Math.cos(a) * R * f, Math.sin(a) * R * f, 0.0095);
        rotor.add(hole);
      }
    }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.04, 0.03, 24).rotateX(Math.PI / 2), m.rubber);
    hub.position.z = 0.012;
    rotor.add(hub);
  } else if (style === 'race') {
    // squared race wheel: carbon plate with grips, rotary switches and a central display strip
    const body = new THREE.Shape();
    const bw = R * 0.46, bh = R * 0.3;
    body.moveTo(-bw, bh); body.lineTo(bw, bh); body.quadraticCurveTo(bw * 1.2, 0, bw * 0.75, -bh); body.lineTo(-bw * 0.75, -bh); body.quadraticCurveTo(-bw * 1.2, 0, -bw, bh);
    const plate = new THREE.Mesh(extrudeZ(body, 0.026, 0.006), m.wheelBody);
    plate.position.set(0, 0.0, 0.006);
    rotor.add(plate);
    for (const sx of [-1, 1]) { const arm = new THREE.Mesh(RB(R * 0.5, 0.03, 0.02, 0.008), m.carbon); arm.position.set(sx * R * 0.82, 0.0, 0.004); rotor.add(arm); }
    for (const sx of [-1, 1]) {
      for (const k of [0, 1]) {
        const rot = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.011, 0.012, 16).rotateX(Math.PI / 2), m.knurl);
        rot.position.set(sx * 0.052, -0.018 + k * 0.03, 0.022);
        rotor.add(rot);
      }
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.008, 12).rotateX(Math.PI / 2), M(new THREE.MeshStandardMaterial({ color: sx < 0 ? 0xc9a34a : 0x3fd8ff, roughness: 0.4 })));
      btn.position.set(sx * 0.03, -0.03, 0.022);
      rotor.add(btn);
    }
  } else if (style === 'mThick') {
    // two horizontal spokes with switch pods and red M buttons, twin lower spokes
    for (const sx of [-1, 1]) {
      spoke(sx * (0.06 + len / 2), -0.012, len, 0.062, 0.026, m.wheelBody);
      buttons(sx, len);
      const mb = new THREE.Mesh(RB(0.022, 0.012, 0.008, 0.004), M(new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.4 })));
      mb.position.set(sx * (0.06 + len * 0.82), 0.026, 0.016);
      rotor.add(mb);
      spoke(sx * 0.024, -0.06 - R * 0.3, 0.016, R * 0.6, 0.018, m.trim2);
    }
  } else if (style === 'muscle3') {
    for (const sx of [-1, 1]) { spoke(sx * (0.065 + len / 2), -0.01, len, 0.07, 0.03, m.wheelBody); buttons(sx, len); spoke(sx * (0.065 + len / 2), -0.047, len * 0.9, 0.008, 0.032, m.alu); }
    spoke(0, -0.06 - R * 0.28, 0.07, R * 0.56, 0.026, m.wheelBody);
  } else if (style === 'gt3') {
    for (const sx of [-1, 1]) spoke(sx * (0.06 + len / 2), -0.01, len, 0.04, 0.022, m.wheelBody);
    spoke(0, -0.06 - R * 0.3, 0.05, R * 0.6, 0.02, m.wheelBody);
    for (const sx of [-1, 1]) spoke(sx * (0.06 + len / 2), -0.031, len, 0.006, 0.024, m.alu);
  } else if (style === 'four80') {
    // 80s four-spoke: spokes in a shallow X around a big padded horn pad
    for (const [a, w] of [[0.32, 0.03], [Math.PI - 0.32, 0.03], [-0.5, 0.034], [Math.PI + 0.5, 0.034]]) spoke(Math.cos(a) * R * 0.55, Math.sin(a) * R * 0.55, R * 0.62, w, 0.016, m.wheelBody, a);
    const pad = new THREE.Mesh(RB(0.11, 0.08, 0.04, 0.025), m.wheelBody); pad.position.set(0, 0, 0.012); rotor.add(pad);
  } else if (style === 'momo3') {
    // aftermarket-style three slim satin-black spokes with slots and a small round horn button
    for (const [a, w] of [[0, 0.028], [Math.PI, 0.028], [-Math.PI / 2, 0.03]]) {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(R - 0.03, w, 0.006), m.piano);
      sp.position.set(Math.cos(a) * (R / 2 + 0.01), Math.sin(a) * (R / 2 + 0.01), 0.006); sp.rotation.z = a; rotor.add(sp);
      const slot = new THREE.Mesh(RB(R * 0.32, w * 0.3, 0.002, 0.003), m.rubber);
      slot.position.set(Math.cos(a) * R * 0.58, Math.sin(a) * R * 0.58, 0.0095); slot.rotation.z = a; rotor.add(slot);
    }
    const hb = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.036, 0.026, 28).rotateX(Math.PI / 2), m.rubber); hb.position.z = 0.012; rotor.add(hb);
  } else if (style === 'gtFlat') {
    // grand tourer: two broad leather spokes with chrome inlays, squared top and bottom
    for (const sx of [-1, 1]) { spoke(sx * (0.06 + len / 2), -0.01, len, 0.06, 0.026, m.wheelBody); buttons(sx, len); spoke(sx * (0.06 + len / 2), -0.045, len, 0.006, 0.028, m.chrome); }
    spoke(0, -0.06 - R * 0.3, 0.05, R * 0.55, 0.02, m.chrome);
  } else if (style === 'ev2') {
    // electric: thin two-spoke with capacitive pads and a drive-mode dial
    for (const sx of [-1, 1]) { spoke(sx * (0.06 + len / 2), -0.006, len, 0.05, 0.02, m.wheelBody); buttons(sx, len, -0.006); }
    const dial2 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.01, 20).rotateX(Math.PI / 2), m.knurl); dial2.position.set(0.075, -0.05, 0.016); rotor.add(dial2);
  } else if (style === 'rsFlat') {
    // flat-bottomed sport wheel: switch-pod spokes, a single wide lower spoke with a red drive-select button
    for (const sx of [-1, 1]) { spoke(sx * (0.06 + len / 2), -0.012, len, 0.06, 0.025, m.wheelBody); buttons(sx, len); }
    spoke(0, -0.06 - R * 0.3, 0.08, R * 0.58, 0.022, m.wheelBody);
    const rs = new THREE.Mesh(RB(0.03, 0.016, 0.008, 0.005), M(new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.4 }))); rs.position.set(0.05, -0.065, 0.018); rotor.add(rs);
  } else if (style === 'jetY') {
    // Y-spoke carbon wheel, flat top and bottom, red start button and a drive-mode rocker on the spokes
    for (const sx of [-1, 1]) spoke(sx * (0.05 + len / 2) * 0.95, 0.03, len, 0.05, 0.024, m.carbon, sx * 0.38);
    spoke(0, -0.06 - R * 0.28, 0.04, R * 0.5, 0.022, m.carbon);
    const red = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 18).rotateX(Math.PI / 2), m.redGlow); red.position.set(-0.052, -0.055, 0.018); rotor.add(red);
    const mode = new THREE.Mesh(RB(0.026, 0.014, 0.01, 0.004), m.alu); mode.position.set(0.052, -0.055, 0.018); rotor.add(mode);
  } else if (style === 'super') {
    for (const sx of [-1, 1]) { spoke(sx * (0.058 + len / 2), -0.014, len, 0.058, 0.026, m.carbon); buttons(sx, len, -0.014); }
    spoke(0, -0.06 - R * 0.28, 0.04, R * 0.5, 0.022, m.carbon);
    const red = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.01, 18).rotateX(Math.PI / 2), m.redGlow);
    red.position.set(-0.05, -0.06, 0.018);
    rotor.add(red);
  } else {
    // sport3 / hatch3: two switch-pod spokes and a wide lower spoke
    for (const sx of [-1, 1]) {
      spoke(sx * (0.06 + len / 2), -0.012, len, 0.058, 0.024, m.wheelBody);
      if (W.buttons) buttons(sx, len);
      spoke(sx * (0.06 + len / 2), -0.044, len, 0.007, 0.026, style === 'hatch3' ? m.accent : m.trim2);
    }
    spoke(0, -0.06 - R * 0.3, style === 'hatch3' ? 0.06 : 0.07, R * 0.58, 0.022, m.wheelBody);
  }
  // paddles on the rim (rotate with it) for cars that have small paddles
  if (W.paddles === true) for (const sx of [-1, 1]) {
    const pdl = new THREE.Mesh(RB(0.05, 0.085, 0.006, 0.003), m.alu);
    pdl.position.set(sx * (R + 0.006), 0.03, -0.04);
    pdl.rotation.z = sx * 0.18;
    rotor.add(pdl);
  }
  // hub / airbag with the maker emblem
  const hubShape = W.hub;
  if (hubShape !== 'none' && style !== 'classic3' && style !== 'momo3' && style !== 'four80') {
    const hw = hubShape === 'wide' ? 0.15 : hubShape === 'big' ? 0.15 : hubShape === 'hex' ? 0.12 : hubShape === 'shield' ? 0.12 : 0.13;
    const hh = hubShape === 'big' ? 0.125 : 0.11;
    let hub;
    if (hubShape === 'hex' || hubShape === 'shield') {
      const s = new THREE.Shape();
      if (hubShape === 'hex') { s.moveTo(-hw / 2, hh / 2); s.lineTo(hw / 2, hh / 2); s.lineTo(hw / 2 + 0.01, 0); s.lineTo(hw / 3, -hh / 2); s.lineTo(-hw / 3, -hh / 2); s.lineTo(-hw / 2 - 0.01, 0); s.lineTo(-hw / 2, hh / 2); }
      else { s.moveTo(-hw / 2, hh / 2); s.lineTo(hw / 2, hh / 2); s.lineTo(hw / 2, -hh * 0.1); s.quadraticCurveTo(hw / 2, -hh / 2, 0, -hh * 0.6); s.quadraticCurveTo(-hw / 2, -hh / 2, -hw / 2, -hh * 0.1); s.lineTo(-hw / 2, hh / 2); }
      hub = new THREE.Mesh(extrudeZ(s, 0.05, 0.012), m.wheelBody);
    } else hub = new THREE.Mesh(RB(hw, hh, 0.05, hubShape === 'rounded' ? 0.04 : 0.03, 3), m.wheelBody);
    hub.position.set(0, -0.004, 0.012);
    rotor.add(hub);
  }
  const badgeColors = { KESSLER: ['#1c69d4', '#e8eaec'], KAZE: ['#1d4fbf', '#d4d7db'], SAKURA: ['#e8222e', '#fff'], RAIDEN: ['#d8d8dc', '#111'], STRADA: ['#c9a34a', '#111'], IRONHORSE: ['#e05a12', '#111'], VELOCE: ['#7cc42d', '#111'], AETHER: ['#c9a34a', '#222'], TSUBAME: ['#c8102e', '#fff'], SHINDEN: ['#38b6e0', '#111'], VOGT: ['#c8102e', '#ddd'], VOLTA: ['#3fd8ff', '#0b0d10'], ASHCOMBE: ['#124f37', '#ddd'], FURIA: ['#f2c230', '#111'] };
  const logo = new THREE.Mesh(new THREE.CircleGeometry(hubShape === 'none' ? 0.02 : style === 'classic3' ? 0.022 : 0.024, 32), M(new THREE.MeshStandardMaterial({ map: badgeTexture(def.maker, badgeColors[def.maker] || [K.P.accent, '#eee']), transparent: true, roughness: 0.3, metalness: 0.4 })));
  logo.position.set(0, style === 'race' ? 0.018 : 0.004, style === 'classic3' || style === 'momo3' ? 0.028 : style === 'four80' ? 0.0335 : style === 'race' ? 0.0205 : 0.0385);
  if (style === 'race') logo.scale.setScalar(0.6);
  rotor.add(logo);
  // sight lines from the eye over the rim top and the hub top, used to fit the cluster into the gap between them
  const tilt = wheelGroup.rotation.x, wy = wheelGroup.position.y, wz = wheelGroup.position.z;
  const rTop = shape === 'squircle' ? R * 0.82 : shape === 'flat2' ? R * 0.86 : R;
  const hubTop = hubShape === 'none' ? 0.03 : style === 'classic3' || style === 'momo3' ? 0.04 : style === 'four80' ? 0.045 : hubShape === 'big' ? 0.065 : 0.058;
  const sight = (py, pz) => (z) => eyeY + (py - eyeY) * (z - eyeZ) / (pz - eyeZ);
  K.rimSight = sight(wy + (rTop + thick) * Math.cos(tilt), wz + (rTop + thick) * Math.sin(tilt));
  K.hubSight = sight(wy + hubTop * Math.cos(tilt), wz + hubTop * Math.sin(tilt) + 0.03);
  return { wheelGroup, rotor, R, rimRX: shape === 'squircle' ? R * 1.12 : R };
}

/* ================================================================ console & shifter */
export function console_(K) {
  const { add, M, m, I, eyeY, eyeZ, zLip, yLip } = K;
  const yT = eyeY - (I.dash === 'tub' ? 0.7 : 0.725);
  const zB = eyeZ + 0.4;
  const C = I.console;
  const w = C === 'spine' ? 0.16 : C === 'auto' ? 0.27 : 0.25;
  const sh = new THREE.Shape();
  sh.moveTo(zLip + 0.045, yLip - 0.21);
  sh.lineTo(zLip + 0.075, yLip - 0.21);
  sh.quadraticCurveTo(zLip + 0.2, yLip - 0.24, Math.max(zLip + 0.25, eyeZ - 0.56), yT);
  sh.lineTo(zB, yT);
  sh.lineTo(zB, eyeY - 1.02);
  sh.lineTo(zLip + 0.045, eyeY - 1.02);
  sh.lineTo(zLip + 0.045, yLip - 0.21);
  add(extrudeX(sh, w, 0, 0.012, 10), C === 'spine' || C === 'buttons' ? m.carbon : m.dash);
  const zTop0 = Math.max(zLip + 0.25, eyeZ - 0.56);
  const top = add(RB(w - 0.07, 0.006, Math.max(0.1, eyeZ + 0.02 - zTop0), 0.003), C === 'auto' ? m.trim : C === 'manual' ? m.trim2 : m.piano);
  top.position.set(0, yT + 0.004, (zTop0 + eyeZ + 0.02) / 2);
  const armrest = (len = 0.34) => {
    const arm = add(RB(0.2, 0.07, len, 0.03), m.seat);
    arm.position.set(0, yT + 0.05, eyeZ + 0.2);
    const ast = add(new THREE.BoxGeometry(0.002, 0.002, len - 0.04), m.stitch);
    ast.position.set(0, yT + 0.0855, eyeZ + 0.2);
  };
  const cups = (z) => { for (const cx of [-0.045, 0.045]) { const cup = add(new THREE.CircleGeometry(0.036, 24).rotateX(-Math.PI / 2), m.rubber); cup.position.set(cx, yT + 0.0075, z); } };
  if (C === 'manual') {
    // H-pattern shifter in a leather boot, mechanical handbrake beside it
    const zS = eyeZ - 0.42;
    const boot = add(new THREE.LatheGeometry([new THREE.Vector2(0.07, 0), new THREE.Vector2(0.06, 0.02), new THREE.Vector2(0.035, 0.07), new THREE.Vector2(0.018, 0.12)], 20), m.seat);
    boot.position.set(0, yT + 0.006, zS);
    const ring = add(RB(0.15, 0.01, 0.15, 0.03), m.trim2);
    ring.position.set(0, yT + 0.008, zS);
    const stick = add(new THREE.CylinderGeometry(0.009, 0.011, 0.07, 10), m.rubber);
    stick.position.set(0, yT + 0.15, zS + 0.004);
    const ky = yT + 0.2;
    const kn = I.knob;
    if (kn === 'alu') {
      const k = add(new THREE.SphereGeometry(0.03, 24, 18), M(new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 1, roughness: 0.15 })));
      k.position.set(0, ky, zS);
    } else if (kn === 'cueBall') {
      const k = add(new THREE.SphereGeometry(0.031, 24, 18), M(new THREE.MeshPhysicalMaterial({ color: 0xf2f0ea, roughness: 0.15, clearcoat: 1 })));
      k.position.set(0, ky, zS);
    } else if (kn === 'leatherRound') {
      const k = add(new THREE.SphereGeometry(0.03, 20, 14), m.seat);
      k.scale.set(1, 0.85, 1.1);
      k.position.set(0, ky - 0.004, zS);
    } else {
      const k = add(new THREE.SphereGeometry(0.03, 20, 14), m.seat);
      k.scale.set(1, 0.9, 1.15);
      k.position.set(0, ky - 0.003, zS);
      const cap = add(new THREE.CircleGeometry(0.02, 20).rotateX(-Math.PI / 2), m.trim2);
      cap.position.set(0, ky + 0.024, zS);
    }
    if (I.handbrake) {
      const hb = new THREE.Group();
      const lever = new THREE.Mesh(RB(0.035, 0.035, 0.22, 0.014), m.seat);
      lever.position.z = -0.08;
      const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.02, 12).rotateX(Math.PI / 2), m.chrome);
      btn.position.set(0, 0.004, -0.195);
      const base = new THREE.Mesh(RB(0.05, 0.03, 0.06, 0.01), m.plastic);
      hb.add(lever, btn, base);
      hb.position.set(0.045, yT + 0.03, eyeZ - 0.12);
      hb.rotation.x = 0.28;
      K.g.add(hb);
    }
    cups(eyeZ - 0.56);
    if (I.dash !== 'wrap') armrest(0.3);
  } else if (C === 'auto') {
    // e-shifter, rotary controller with shortcut keys, wood surround
    const lever = new THREE.Group();
    const lb = new THREE.Mesh(RB(0.052, 0.09, 0.1, 0.022), m.seat); lb.position.y = 0.045;
    const band = new THREE.Mesh(RB(0.054, 0.012, 0.102, 0.005), m.chrome); band.position.y = 0.075;
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.018, 0), M(new THREE.MeshPhysicalMaterial({ color: 0xdfe8f5, roughness: 0.02, metalness: 0, transmission: 0.6, thickness: 0.02, clearcoat: 1 })));
    crystal.position.set(0, 0.098, 0.01); crystal.scale.set(1, 0.5, 1.4);
    const ring = new THREE.Mesh(RB(0.085, 0.012, 0.14, 0.01), m.chrome);
    lever.add(lb, band, crystal, ring);
    lever.position.set(0, yT + 0.006, eyeZ - 0.42);
    lever.rotation.x = -0.18;
    K.g.add(lever);
    const knob = add(new THREE.CylinderGeometry(0.032, 0.033, 0.026, 32), [m.knurl, m.piano, m.piano]);
    knob.position.set(0, yT + 0.019, eyeZ - 0.26);
    for (const [bx, bz] of [[-0.055, -0.03], [0.055, -0.03], [-0.055, 0.03], [0.055, 0.03]]) add(RB(0.03, 0.008, 0.022, 0.004), m.piano).position.set(bx, yT + 0.009, eyeZ - 0.26 + bz);
    cups(eyeZ - 0.53);
    armrest();
  } else if (C === 'pdk') {
    // small toggle selector with a row of sport buttons
    const sel = add(RB(0.022, 0.05, 0.05, 0.008), m.seat);
    sel.position.set(0, yT + 0.03, eyeZ - 0.4);
    sel.rotation.x = -0.25;
    const surround = add(RB(0.12, 0.008, 0.16, 0.012), m.alu);
    surround.position.set(0, yT + 0.008, eyeZ - 0.4);
    for (let i = 0; i < 5; i++) add(RB(0.024, 0.008, 0.016, 0.003), m.piano).position.set(-0.06 + i * 0.03, yT + 0.01, eyeZ - 0.5);
    cups(eyeZ - 0.28);
    armrest(0.3);
  } else if (C === 'buttons') {
    // no lever: reverse / neutral / launch buttons in a carbon hex panel, flip-cover start in front
    const hexS = new THREE.Shape();
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2 + Math.PI / 6; (k ? hexS.lineTo.bind(hexS) : hexS.moveTo.bind(hexS))(Math.cos(a) * 0.075, Math.sin(a) * 0.06); }
    hexS.closePath();
    const panel = add(extrudeZ(hexS, 0.012, 0.003).rotateX(-Math.PI / 2), m.trim2);
    panel.position.set(0, yT + 0.008, eyeZ - 0.38);
    const labels = [['R', 0xd8d8dc], ['N', 0xd8d8dc], ['LC', 0x7cc42d]];
    labels.forEach(([, col], i) => { const b = add(RB(0.03, 0.01, 0.024, 0.004), M(new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 }))); b.position.set(-0.036 + i * 0.036, yT + 0.018, eyeZ - 0.38); });
  } else if (C === 'spine') {
    // floating carbon spine with gear buttons on top
    for (let i = 0; i < 3; i++) add(RB(0.03, 0.01, 0.022, 0.004), M(new THREE.MeshStandardMaterial({ color: i === 1 ? 0x3fd8ff : 0xc9a34a, roughness: 0.4 }))).position.set(0, yT + 0.012, eyeZ - 0.48 + i * 0.035);
  }
  // red flip-cover start switch (supercars)
  if (I.start === 'flip') {
    const zs = C === 'buttons' ? eyeZ - 0.48 : eyeZ - 0.36;
    const base = add(RB(0.04, 0.012, 0.05, 0.004), m.trim2);
    base.position.set(0, yT + 0.012, zs);
    const btn = add(new THREE.CylinderGeometry(0.011, 0.011, 0.01, 16), m.redGlow);
    btn.position.set(0, yT + 0.022, zs);
    const cover = add(RB(0.036, 0.004, 0.044, 0.003), M(new THREE.MeshStandardMaterial({ color: 0xc8102e, roughness: 0.35, transparent: true, opacity: 0.85 })));
    cover.position.set(0, yT + 0.045, zs + 0.03);
    cover.rotation.x = 1.0;
  } else if (I.start === 'key') {
    // key barrel on the dash left of the column (sports-car tradition) with the key in it
    const kx = K.dx - 0.2, ky = K.eyeY - 0.43, kz = K.faceZ(ky);
    const barrel = add(new THREE.CylinderGeometry(0.014, 0.016, 0.02, 18).rotateX(Math.PI / 2), m.chrome);
    barrel.position.set(kx, ky, kz + 0.01);
    const key = add(RB(0.012, 0.03, 0.006, 0.003), m.plastic);
    key.position.set(kx, ky, kz + 0.026);
  }
  K.yT = yT;
}

/* ================================================================ seats & belts */
/** Front outline of a seat back for each seat type (x across, y up, 0 = cushion level). */
function backOutline(type, w, h) {
  const s = new THREE.Shape();
  const hw = w / 2;
  if (type === 'bucket' || type === 'carbonBucket' || type === 'race' || type === 'retro' || type === 'sport2') {
    // integrated headrest: shoulders taper into a narrower head section
    const neck = type === 'sport2' ? hw * 0.6 : hw * 0.55;
    const sh = h * (type === 'retro' ? 0.72 : 0.68);
    s.moveTo(-hw * 0.92, 0);
    s.lineTo(hw * 0.92, 0);
    s.quadraticCurveTo(hw * 1.06, h * 0.35, hw, sh);
    s.quadraticCurveTo(hw * 0.9, sh + 0.05, neck, sh + 0.07);
    s.lineTo(neck, h - 0.04);
    s.quadraticCurveTo(neck, h, neck - 0.04, h);
    s.lineTo(-neck + 0.04, h);
    s.quadraticCurveTo(-neck, h, -neck, h - 0.04);
    s.lineTo(-neck, sh + 0.07);
    s.quadraticCurveTo(-hw * 0.9, sh + 0.05, -hw, sh);
    s.quadraticCurveTo(-hw * 1.06, h * 0.35, -hw * 0.92, 0);
    if (type !== 'sport2') {
      // harness slots / lightening holes
      for (const sx of [-1, 1]) {
        const hole = new THREE.Path();
        const cx = sx * hw * 0.32, cy = sh + 0.02;
        hole.absellipse(cx, cy, 0.022, type === 'retro' ? 0.03 : 0.045, 0, Math.PI * 2, false);
        s.holes.push(hole);
      }
    }
  } else {
    // separate headrest seats: a squarer back
    s.moveTo(-hw * 0.94, 0);
    s.lineTo(hw * 0.94, 0);
    s.quadraticCurveTo(hw * 1.02, h * 0.4, hw * 0.96, h - 0.05);
    s.quadraticCurveTo(hw * 0.92, h, hw * 0.75, h);
    s.lineTo(-hw * 0.75, h);
    s.quadraticCurveTo(-hw * 0.92, h, -hw * 0.96, h - 0.05);
    s.quadraticCurveTo(-hw * 1.02, h * 0.4, -hw * 0.94, 0);
  }
  return s;
}

function seat(K, x, z, opts) {
  const { M, m, I } = K;
  const type = opts.type || I.seats;
  const floorY = K.floorY;
  const w = opts.w ?? (type === 'comfort' ? 0.56 : type === 'race' || type === 'carbonBucket' ? 0.5 : 0.52);
  const cushY = floorY + (opts.rear ? 0.2 : type === 'race' ? 0.12 : type === 'carbonBucket' ? 0.15 : 0.2);
  const topY = opts.topY;
  const h = Math.max(0.4, topY - cushY);
  const sg = new THREE.Group();
  const recline = opts.rear ? 0.22 : type === 'race' ? 0.26 : 0.17;
  const shellType = type === 'carbonBucket' || type === 'race';
  const separateHead = type === 'sport' || type === 'comfort' || type === 'muscle' || opts.rear;
  const backH = separateHead ? h - 0.19 : h;
  const outline = backOutline(opts.rear ? 'comfort' : type, w, opts.rear ? backH * 0.95 : backH);
  // back: shell + upholstered face
  const bg = extrudeZ(outline, shellType ? 0.06 : 0.11, shellType ? 0.008 : 0.03, 14);
  {
    const p = bg.attributes.position, hh = backH;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const wrap = (opts.rear ? 0.35 : shellType || type === 'bucket' ? 1.5 : type === 'retro' || type === 'sport2' ? 1.25 : 0.9) * x * x;
      const lumbar = z < 0 ? 0.025 * Math.exp(-Math.pow((y - hh * 0.3) / (hh * 0.15), 2)) : 0;
      p.setZ(i, z - wrap - lumbar);
    }
    bg.computeVertexNormals();
  }
  const back = new THREE.Mesh(bg, shellType ? m.carbon : m.seatSide);
  back.position.set(0, cushY + 0.02, 0.05);
  back.rotation.x = recline;
  sg.add(back);
  // centre insert panel (alcantara / quilted / channel / cloth) on the face of the back
  const ins = new THREE.Mesh(RB(w * (shellType ? 0.62 : 0.5), backH * (separateHead ? 0.72 : 0.56), shellType ? 0.04 : 0.02, 0.01), m.insert);
  ins.position.set(0, cushY + 0.02 + backH * (separateHead ? 0.42 : 0.33), 0.05);
  ins.rotation.x = recline;
  ins.translateZ(shellType ? -0.03 : -0.062);
  ins.translateY(0);
  sg.add(ins);
  // bolsters on the back
  const bolH = h * (shellType ? 0.62 : 0.58);
  const bolSize = { bucket: 0.1, carbonBucket: 0.06, race: 0.06, retro: 0.07, sport: 0.085, sport2: 0.08, muscle: 0.09, comfort: 0.05 }[type] ?? 0.08;
  const integrated = type === 'bucket' || type === 'retro' || type === 'sport2' || shellType;
  if (!opts.rear && !integrated) for (const bx of [-1, 1]) {
    const bol = new THREE.Mesh(RB(bolSize, bolH, 0.17, 0.035), shellType ? m.insert : m.seatSide);
    bol.position.set(bx * (w / 2 - bolSize * 0.35), cushY + 0.04 + bolH * 0.5, -0.0);
    bol.rotation.set(recline, bx * 0.3, 0, 'YXZ');
    sg.add(bol);
  }
  // separate headrest on chrome posts
  if (separateHead) {
    const hw = type === 'comfort' ? 0.3 : 0.26;
    const headTop = topY - 0.01;
    const head = new THREE.Mesh(RB(hw, type === 'comfort' ? 0.17 : 0.15, 0.1, 0.045), m.seatSide);
    head.position.set(0, headTop - 0.08, 0.06 + Math.sin(recline) * h * 0.95);
    sg.add(head);
    for (const px of [-0.06, 0.06]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.12, 8), m.chrome);
      post.position.set(px, headTop - 0.17, 0.07 + Math.sin(recline) * h * 0.88);
      sg.add(post);
    }
  }
  // cushion with its own bolsters
  const cg = RB(w * 0.92, 0.12, 0.5, 0.05, 3);
  { const p = cg.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); if (y > 0) p.setY(i, y + 0.6 * x * x - 0.01); } cg.computeVertexNormals(); }
  const cush = new THREE.Mesh(cg, m.seatSide);
  cush.position.set(0, cushY, -0.25);
  sg.add(cush);
  const ci = new THREE.Mesh(RB(w * 0.5, 0.02, 0.4, 0.008), m.insert);
  ci.position.set(0, cushY + 0.061, -0.25);
  sg.add(ci);
  if (!opts.rear && type !== 'comfort') for (const bx of [-1, 1]) {
    const cb = new THREE.Mesh(RB(0.08, 0.06, 0.46, 0.03), shellType ? m.insert : m.seatSide);
    cb.position.set(bx * (w / 2 - 0.05), cushY + 0.07, -0.25);
    cb.rotation.z = -bx * 0.25;
    sg.add(cb);
  }
  // stitching along the insert edges
  for (const lx of [-w * 0.26, w * 0.26]) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.003, h * 0.55, 0.003), m.stitch);
    line.position.copy(ins.position).add(new THREE.Vector3(lx, 0, 0));
    line.rotation.x = recline;
    line.translateZ(-0.012);
    sg.add(line);
  }
  // muscle seats: twin racing stripes; comfort: contrast piping
  if (type === 'muscle') for (const lx of [-0.035, 0.035]) {
    const stripe = new THREE.Mesh(RB(0.022, h * 0.55, 0.004, 0.002), m.accent);
    stripe.position.copy(ins.position).add(new THREE.Vector3(lx, 0, 0)); stripe.rotation.x = recline; stripe.translateZ(-0.012);
    sg.add(stripe);
  }
  // base frame down to the floor (rails)
  const base = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, Math.max(0.04, cushY - 0.06 - floorY), 0.4), m.plastic);
  base.position.set(0, (cushY - 0.06 + floorY) / 2, -0.24);
  sg.add(base);
  sg.position.set(x, 0, z);
  K.g.add(sg);
  return { group: sg, cushY, topY, recline, w };
}

export function seats(K) {
  const { m, I, D, dx, eyeY, eyeZ, innerW, ctx, cab, def } = K;
  K.floorY = eyeY - 0.92 + (I.eyeDY < -0.03 ? 0.04 : 0);
  const frontTop = Math.min(eyeY + 0.12, D.roofY - 0.1);
  const pass = seat(K, -dx, eyeZ + 0.22, { topY: frontTop });
  // the driver's own seat: only its side bolsters and the back of the cushion can be seen
  for (const sx of [-1, 1]) {
    const bol = new THREE.Mesh(RB(0.08, 0.5, 0.25, 0.035), I.seats === 'carbonBucket' || I.seats === 'race' ? m.carbon : m.seatSide);
    bol.position.set(dx + sx * 0.27, eyeY - 0.55, eyeZ + 0.15);
    K.g.add(bol);
  }
  // rear seats where the car has them
  const zr = eyeZ + 0.95;
  const rearRoom = innerW(zr, eyeY - 0.4) > 0.5 && D.roofY - K.floorY > 0.95 && (def.seats ?? 4) > 2;
  let shelfZ;
  if (I.rear && rearRoom) {
    const half = Math.min(D.cabinW * 0.85, innerW(zr, eyeY - 0.5) - 0.04);
    const rearTop = Math.min(eyeY + (I.rear === 'plus2' ? -0.06 : 0.02), D.roofY - 0.12);
    for (const sx of [-1, 1]) seat(K, sx * half * 0.5, zr + 0.2, { topY: rearTop, rear: true, w: half * 0.98, type: 'comfort' });
    shelfZ = zr + 0.3;
  } else {
    const zb = eyeZ + 0.55;
    const bwid = Math.max(0.6, (innerW(zb, eyeY - 0.3) - 0.04) * 2);
    const bh = new THREE.Mesh(RB(bwid, Math.max(0.3, D.beltY - K.floorY), 0.05, 0.02), I.dash === 'tub' || I.dash === 'hex' ? m.carbon : m.door);
    bh.position.set(0, (D.beltY + K.floorY) / 2, zb);
    K.g.add(bh);
    shelfZ = zb;
  }
  // parcel shelf
  const zEnd = ctx.z(Math.min(1, cab.t3 + 0.02));
  if (zEnd > shelfZ + 0.05) {
    const n = 8, pos = [], idx = [];
    for (let i = 0; i <= n; i++) {
      const z = lerp(shelfZ, zEnd, i / n);
      const t = clamp(K.tOf(z), 0, 1);
      const y = Math.min(ctx.top(t) - ctx.lower - 0.012, D.beltY + 0.06);
      const x = Math.max(0.2, innerW(z, y - 0.03) - 0.005);
      pos.push(-x, y, z, x, y, z);
    }
    for (let i = 0; i < n; i++) { const a0 = i * 2; idx.push(a0, a0 + 2, a0 + 1, a0 + 1, a0 + 2, a0 + 3); }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    sg.setIndex(idx);
    sg.computeVertexNormals();
    K.add(sg, K.M(new THREE.MeshStandardMaterial({ color: 0x151517, roughness: 0.95, side: THREE.DoubleSide })));
  }
  // seat belts: passenger belt retracted down the B-pillar with its latch plate; buckles on both seats
  const zB = eyeZ + 0.34, xB = -dx + 0.27;
  const yTopB = Math.min(eyeY + 0.02, D.roofY - 0.12), yLowB = K.floorY + 0.24;
  if (I.seats === 'race') {
    // four-point harness lying over the passenger seat
    const s = pass;
    for (const sx of [-1, 1]) {
      const a = new THREE.Vector3(-dx + sx * 0.08, s.topY - 0.2, eyeZ + 0.33);
      const b = new THREE.Vector3(-dx + sx * 0.06, s.cushY + 0.1, eyeZ + 0.12);
      const c = new THREE.Vector3(-dx + sx * 0.04, s.cushY + 0.07, eyeZ - 0.08);
      K.add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([a, b, c]), 12, 0.022, 2, false).scale(1, 1, 1), m.harness).scale.set(1, 1, 1);
    }
    const buckle = K.add(new THREE.CylinderGeometry(0.035, 0.035, 0.012, 20).rotateX(Math.PI / 2 - 0.3), m.alu);
    buckle.position.set(-dx, pass.cushY + 0.075, eyeZ - 0.07);
  } else {
    const strap = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(xB, yTopB, zB), new THREE.Vector3(xB + 0.01, (yTopB + yLowB) / 2, zB + 0.01), new THREE.Vector3(xB - 0.01, yLowB, zB - 0.02)]), 10, 0.022, 2, false);
    K.add(strap, m.webbing);
    const anchor = K.add(RB(0.03, 0.06, 0.02, 0.006), m.plastic);
    anchor.position.set(xB + 0.008, yTopB + 0.02, zB);
    const latch = K.add(RB(0.02, 0.05, 0.006, 0.003), m.chrome);
    latch.position.set(xB - 0.005, yLowB + 0.12, zB - 0.01);
  }
  for (const sxSeat of [dx, -dx]) {
    const bx = sxSeat + (sxSeat < 0 ? 0.3 : -0.3);
    const stalk = K.add(RB(0.03, 0.12, 0.03, 0.008), m.plastic);
    stalk.position.set(bx, K.floorY + 0.25, eyeZ + 0.05);
    const head = K.add(RB(0.035, 0.05, 0.025, 0.008), m.rubber);
    head.position.set(bx, K.floorY + 0.33, eyeZ + 0.04);
  }
}

/* ================================================================ floor, mats, pedals */
export function floor(K) {
  const { add, M, m, I, dx, eyeY, eyeZ, zLip, innerW } = K;
  const fy = K.floorY;
  const z0 = zLip + 0.05, z1 = eyeZ + 0.5;
  const half = Math.max(0.5, innerW((z0 + z1) / 2, fy + 0.1) - 0.02);
  const fl = add(new THREE.PlaneGeometry(half * 2, z1 - z0).rotateX(-Math.PI / 2), I.dash === 'tub' ? m.carbon : m.carpet);
  fl.position.set(0, fy - 0.005, (z0 + z1) / 2);
  // toe board rising to the bulkhead
  const tb = add(new THREE.PlaneGeometry(half * 2, 0.3), I.dash === 'tub' ? m.carbon : m.carpet);
  tb.position.set(0, fy + 0.1, z0 - 0.08);
  tb.rotation.x = -0.75;
  // floor mats with bound edges and the maker's colour on the driver's (or the player's choice of mats)
  const mt = I.mats || 'stock';
  if (mt !== 'none') {
    const red = M(new THREE.MeshStandardMaterial({ color: 0xb0101c, roughness: 0.8 }));
    const pile = mt === 'luxury' ? M(new THREE.MeshStandardMaterial({ color: new THREE.Color(K.P.carpet).lerp(new THREE.Color('#6a6258'), 0.35), roughness: 1, bumpMap: m.carpet.bumpMap, bumpScale: 3 })) : null;
    const body = mt === 'rubber' ? m.rubber : mt === 'luxury' ? pile : mt === 'stock' ? (I.dash === 'luxury' ? m.carpet : m.rubber) : m.carpet;
    for (const sx of [dx, -dx]) {
      const mat = add(RB(0.42, mt === 'luxury' ? 0.016 : 0.008, 0.5, 0.004), body);
      mat.position.set(sx, fy + (mt === 'luxury' ? 0.004 : 0), eyeZ - 0.38);
      const edgeM = mt === 'carpetRed' ? red : mt === 'carpetAccent' ? m.stitch : mt === 'rubber' || mt === 'luxury' ? m.rubber : sx === dx ? m.accent : m.stitch;
      const edge = add(RB(0.43, 0.004, 0.51, 0.003), edgeM);
      edge.position.set(sx, fy - 0.001, eyeZ - 0.38);
    }
  }
  // pedals hung from the bulkhead: drilled aluminium on sporty cars, rubber faces on the luxury saloon
  const face = I.dash === 'luxury' ? m.rubber : m.alu;
  const zP = eyeZ - 0.78, yP = fy + 0.12;
  const pedal = (x, w, h, y = yP, z = zP) => {
    const p = add(RB(w, h, 0.012, 0.006), face);
    p.position.set(x, y, z);
    p.rotation.x = -0.55;
    const arm = add(new THREE.BoxGeometry(0.014, 0.18, 0.014), m.plastic);
    arm.position.set(x, y + 0.1, z - 0.05);
    arm.rotation.x = 0.4;
  };
  pedal(dx + 0.12, 0.045, 0.13, yP + 0.01, zP - 0.02); // throttle
  pedal(dx - 0.01, I.pedals === 'auto' ? 0.11 : 0.07, 0.07);
  if (I.pedals === 'manual') pedal(dx - 0.12, 0.07, 0.07);
  const rest = add(RB(0.07, 0.16, 0.012, 0.006), face);
  rest.position.set(dx - 0.22, fy + 0.08, zP + 0.02);
  rest.rotation.x = -0.75;
}

/* ================================================================ door cards */
export function doors(K) {
  const { add, M, m, I, D, P, zLip, eyeZ, innerW, beltAt } = K;
  const z0 = zLip + 0.06, z1 = eyeZ + 0.62;
  const y0 = D.beltY - 0.46, y1 = D.beltY - 0.03;
  const nz = 12, ny = 8;
  const style = I.doorStyle;
  const carbonCard = style === 'hyper' || style === 'super';
  for (const sx of [-1, 1]) {
    const pos = [], uv = [], idx = [];
    for (let i = 0; i <= nz; i++) {
      const z = lerp(z0, z1, i / nz);
      const yTopZ = Math.max(y0 + 0.1, beltAt(z) - 0.03);
      for (let j = 0; j <= ny; j++) {
        const y = lerp(y0, yTopZ, j / ny);
        const v = j / ny;
        const relief = 0.012 * Math.exp(-Math.pow((v - 0.45) / 0.12, 2)) - 0.006 * Math.exp(-Math.pow((v - 0.75) / 0.1, 2));
        const x = Math.max(0.3, innerW(z, y) - 0.035 - relief);
        pos.push(sx * x, y, z);
        uv.push(z * 4, y * 4);
      }
    }
    for (let i = 0; i < nz; i++) for (let j = 0; j < ny; j++) {
      const a0 = i * (ny + 1) + j, b0 = a0 + 1, c0 = a0 + ny + 1, d0 = c0 + 1;
      if (sx > 0) idx.push(a0, b0, c0, b0, d0, c0); else idx.push(a0, c0, b0, b0, c0, d0);
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    dg.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    dg.setIndex(idx);
    dg.computeVertexNormals();
    add(dg, carbonCard ? m.carbon : m.door);
    // sill roll along the belt
    const rp = [];
    for (let i = 0; i <= 12; i++) {
      const z = lerp(z0 - 0.02, z1, i / 12);
      const yb = beltAt(z);
      rp.push(new THREE.Vector3(sx * (Math.max(0.3, innerW(z, yb - 0.02)) - 0.03), yb - 0.018, z));
    }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rp), 24, 0.022, 10, false), style === 'retro' ? m.door : m.seat);
    const zm = (z0 + z1) / 2 + 0.06;
    const ya = D.beltY - 0.215;
    const xa = Math.max(0.3, innerW(zm, ya) - 0.035);
    // insert panel (alcantara / leather / cloth) and a decorative band
    const insert = add(RB(0.012, style === 'retro' ? 0.12 : 0.09, z1 - z0 - 0.22, 0.006), m.doorInsert);
    insert.position.set(sx * (Math.max(0.3, innerW(zm, ya + 0.075)) - 0.042), ya + 0.075, zm - 0.04);
    if (style === 'luxury' || style === 'gt' || style === 'muscle') {
      const band = add(RB(0.01, 0.022, z1 - z0 - 0.25, 0.004), style === 'luxury' ? m.trim : m.trim2);
      band.position.set(sx * (Math.max(0.3, innerW(zm, ya + 0.14)) - 0.04), ya + 0.14, zm - 0.04);
    }
    // armrest and pull: aluminium bar, or a fabric strap on the carbon cards
    const arm = add(RB(0.085, 0.055, 0.44, 0.022), style === 'retro' ? m.door : m.seat);
    arm.position.set(sx * (xa - 0.04), ya, zm);
    if (carbonCard) {
      const strap = add(new THREE.TorusGeometry(0.06, 0.008, 4, 16, Math.PI).rotateY(Math.PI / 2), m.harness);
      strap.position.set(sx * (xa - 0.03), ya + 0.08, zm - 0.1);
    } else {
      const pull = add(RB(0.022, 0.03, 0.15, 0.008), style === 'retro' ? m.plastic : m.trim2);
      pull.position.set(sx * (xa - 0.022), ya + 0.075, zm - 0.12);
    }
    // inner release lever in a recess
    const yr = D.beltY - 0.085, zr = z0 + 0.14;
    const xr = Math.max(0.3, innerW(zr, yr) - 0.036);
    add(RB(0.01, 0.04, 0.13, 0.004), m.piano).position.set(sx * xr, yr, zr);
    add(RB(0.014, 0.018, 0.1, 0.006), style === 'retro' ? m.plastic : m.chrome).position.set(sx * (xr - 0.008), yr, zr);
    // window switches on the driver's armrest
    if (sx < 0) {
      const sw = add(new THREE.PlaneGeometry(0.1, 0.05), M(new THREE.MeshStandardMaterial({ map: windowSwitchTexture(), roughness: 0.25 })));
      sw.rotation.x = -Math.PI / 2;
      sw.position.set(sx * (xa - 0.04), ya + 0.029, zm - 0.12);
    }
    // speaker (big woofer on most; none on the stripped hypercar door)
    if (style !== 'hyper') {
      const ys = D.beltY - 0.37, zs = z0 + 0.2;
      const xs = Math.max(0.3, innerW(zs, ys) - 0.04);
      const spk = add(new THREE.CircleGeometry(0.075, 32), m.speaker);
      spk.position.set(sx * xs, ys, zs);
      spk.rotation.y = -sx * Math.PI / 2;
      const sr = add(new THREE.TorusGeometry(0.076, 0.004, 6, 32), style === 'luxury' ? m.chrome : m.trim2);
      sr.position.copy(spk.position); sr.rotation.y = -sx * Math.PI / 2;
    }
    // ambient light pipe
    if (P.ambient) {
      const lp = [];
      for (let i = 0; i <= 8; i++) {
        const z = lerp(z0 + 0.03, z1 - 0.1, i / 8);
        const y = beltAt(z) - 0.105;
        lp.push(new THREE.Vector3(sx * (Math.max(0.3, innerW(z, y)) - 0.039), y, z));
      }
      add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lp), 16, 0.003, 5, false), K.ambientMat);
      const gl = add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lp), 16, 0.012, 6, false), K.ambientGlow);
      gl.renderOrder = 6;
    }
  }
}

/* ================================================================ headliner furniture */
export function headliner(K) {
  const { add, M, m, I, D, dx } = K;
  const roofIn = D.roofY - 0.03;
  for (const vx of [dx + 0.02, -dx - 0.02]) {
    const vis = add(RB(0.34, 0.02, 0.165, 0.009), m.headliner);
    vis.position.set(vx, roofIn - 0.012, D.wsTopZ + 0.14);
    vis.rotation.x = 0.06;
    add(RB(0.03, 0.012, 0.02, 0.004), m.plastic).position.set(vx + (vx < 0 ? 0.19 : -0.19), roofIn - 0.004, D.wsTopZ + 0.08);
  }
  const oc = add(RB(0.2, 0.034, 0.13, 0.012), I.dash === 'tub' ? m.carbon : m.dash);
  oc.position.set(0, roofIn - 0.01, D.wsTopZ + 0.13);
  K.domeMat = M(new THREE.MeshStandardMaterial({ color: 0xbfc3c8, roughness: 0.3, emissive: 0xfff2dc, emissiveIntensity: 0 }));
  for (const lx of [-0.05, 0.05]) add(RB(0.04, 0.004, 0.03, 0.002), K.domeMat).position.set(lx, roofIn - 0.028, D.wsTopZ + 0.14);
  if (I.climate === 'overhead') {
    // aircraft-style overhead strip: toggles for climate and lights
    const strip = add(RB(0.3, 0.02, 0.07, 0.008), m.carbon);
    strip.position.set(0, roofIn - 0.035, D.wsTopZ + 0.27);
    for (let i = 0; i < 6; i++) {
      const t = add(new THREE.CylinderGeometry(0.003, 0.004, 0.022, 8), m.chrome);
      t.position.set(-0.11 + i * 0.044, roofIn - 0.055, D.wsTopZ + 0.27);
      t.rotation.x = 0.4;
    }
  }
  // grab handles over the doors (not on the stripped hypercar)
  if (I.doorStyle !== 'hyper') for (const sx of [-1, 1]) {
    const gh = add(new THREE.TorusGeometry(0.06, 0.009, 6, 14, Math.PI).rotateX(Math.PI).rotateY(Math.PI / 2), m.plastic);
    gh.position.set(sx * (D.cabinW + 0.02), roofIn - 0.05, K.eyeZ + 0.05);
    gh.rotation.z = sx * 0.6;
  }
}
