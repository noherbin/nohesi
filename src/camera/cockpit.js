// Cockpit interior for the first-person camera.
// Everything is placed relative to the driver's eye so it fits every car: a sculpted dashboard with a
// hooded digital cluster and free-standing centre display, vents, climate panel, console with gear
// selector and rotary controller, a modern flat-bottomed sport wheel with switch pods and paddles,
// gloved hands that grip the rim (two-bone IK arms), trimmed door cards with ambient lighting,
// headliner, sun visors, live rear-view and door mirrors, and a head-up display.
import * as THREE from 'three';
import { clamp, lerp, MS_TO_MPH, MS_TO_KMH } from '../core/utils.js';
import { mirrorPose } from '../vehicles/carBuilder.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {
  leatherBump, plasticBump, carbonTexture, brushedTexture, speakerTexture, knurlTexture,
  climateTexture, spokeButtonsTexture, windowSwitchTexture, badgeTexture, gloveTexture, glowStripTexture,
} from './interiorTextures.js';

/** Rain drops on glass: bright lower rims and dark upper edges read as tiny lenses. */
function dropletTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const x = c.getContext('2d');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 420; i++) {
    const px = rnd() * S, py = rnd() * S;
    const r = 1.2 + Math.pow(rnd(), 3) * 7;
    const sy = 1 + rnd() * 0.35;
    for (const [dx, dy] of [[0, 0], [S, 0], [-S, 0], [0, S], [0, -S]]) {
      const cx = px + dx, cy = py + dy;
      if (cx < -10 || cx > S + 10 || cy < -10 || cy > S + 10) continue;
      const g = x.createRadialGradient(cx, cy + r * 0.35, r * 0.1, cx, cy, r * 1.05);
      g.addColorStop(0, 'rgba(255,255,255,0.10)');
      g.addColorStop(0.6, 'rgba(210,220,230,0.22)');
      g.addColorStop(0.85, 'rgba(255,255,255,0.55)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g;
      x.beginPath();
      x.ellipse(cx, cy, r, r * sy, 0, 0, Math.PI * 2);
      x.fill();
      x.fillStyle = 'rgba(0,0,0,0.28)';
      x.beginPath();
      x.ellipse(cx, cy - r * 0.45, r * 0.7, r * 0.32, 0, 0, Math.PI * 2);
      x.fill();
    }
  }
  x.strokeStyle = 'rgba(230,236,240,0.16)';
  for (let i = 0; i < 40; i++) {
    const px = rnd() * S, py = rnd() * S, l = 20 + rnd() * 60;
    x.lineWidth = 1 + rnd() * 1.5;
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + (rnd() - 0.5) * 8, py - l); x.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const RB = (w, h, d, r = 0.03, seg = 2) => new RoundedBoxGeometry(w, h, d, seg, Math.max(1e-4, Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3)));
const _up = new THREE.Vector3(0, 1, 0);

/** Shape drawn in the (z, y) side-profile plane, extruded across the car (x), centred on xc. */
function extrudeX(shape, width, xc = 0, bevel = 0.006, curveSegments = 10) {
  const depth = Math.max(0.002, width - bevel * 2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments,
  });
  geo.translate(0, 0, -depth / 2);
  geo.rotateY(-Math.PI / 2);
  geo.translate(xc, 0, 0);
  return geo;
}

/** Cylinder between two points. */
function limb(a, b, r0, r1, seg = 12) {
  const len = Math.max(1e-3, a.distanceTo(b));
  const g = new THREE.CylinderGeometry(r1, r0, len, seg, 1, false);
  const m = new THREE.Mesh(g);
  m.position.copy(a).lerp(b, 0.5);
  m.quaternion.setFromUnitVectors(_up, b.clone().sub(a).normalize());
  return m;
}

const clones = [];
function repeatTex(t, rx, ry = rx) {
  const c = t.clone();
  c.repeat.set(rx, ry);
  c.needsUpdate = true;
  clones.push(c);
  return c;
}

export class Cockpit {
  constructor(renderer) {
    this.renderer = renderer;
    this.group = null;
    this.visible = false;
    this.mirrorRT = new THREE.WebGLRenderTarget(512, 160, { samples: 0 });
    this.mirrorRT.texture.colorSpace = THREE.SRGBColorSpace;
    this.mirrorCam = new THREE.PerspectiveCamera(28, 512 / 160, 0.3, 900);
    this.frame = 0;
    const mk = (w, h) => {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return [c, t];
    };
    [this.gaugeCanvas, this.gaugeTex] = mk(1024, 384);
    [this.navCanvas, this.navTex] = mk(1024, 512);
    [this.hudCanvas, this.hudTex] = mk(512, 160);
    this.gaugeT = 0;
    this.navT = 0;
    this.hudT = 0;
    this.accent = '#ff2e4d';
    this.ambientColor = new THREE.Color('#2fd9ff');
    this.dropTex = dropletTexture();
    this.dropT = 0;
    this.odo = 12873;
    this.tripT = 0;
    this.mats = [];
    this.geos = [];
  }

  /* ------------------------------------------------------------------ build */
  build(car, def) {
    if (this.group) {
      this.group.parent?.remove(this.group);
      this.group.traverse((o) => { if (o.isMesh && !this.shared?.has(o.geometry)) o.geometry.dispose(); });
      for (const m of this.mats) m.dispose();
      for (const t of clones.splice(0)) t.dispose();
    }
    this.mats = [];
    const D = car.dims, ctx = car.model.ctx, cab = def.body.cabin;
    this.def = def;
    const g = new THREE.Group();
    g.name = 'cockpit';
    const M = (m) => { this.mats.push(m); return m; };
    const add = (geo, mat, parent = g) => { const m = new THREE.Mesh(geo, mat); parent.add(m); return m; };

    // ---------- materials
    const leatherB = repeatTex(leatherBump(), 9), plasticB = repeatTex(plasticBump(), 14);
    const dashM = M(new THREE.MeshStandardMaterial({ color: 0x313237, roughness: 0.8, bumpMap: plasticB, bumpScale: 0.35 }));
    const dashTopM = M(new THREE.MeshStandardMaterial({ color: 0x2a2b2f, roughness: 0.62, bumpMap: leatherB, bumpScale: 0.8 }));
    const leather = M(new THREE.MeshStandardMaterial({ color: 0x2c2c30, roughness: 0.6, bumpMap: leatherB, bumpScale: 0.9 }));
    const leatherLight = M(new THREE.MeshStandardMaterial({ color: 0x3b3b40, roughness: 0.62, bumpMap: leatherB, bumpScale: 0.9 }));
    const piano = M(new THREE.MeshPhysicalMaterial({ color: 0x040405, roughness: 0.1, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04 }));
    const carbon = M(new THREE.MeshPhysicalMaterial({ map: repeatTex(carbonTexture(), 5, 1), roughness: 0.3, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05 }));
    const alu = M(new THREE.MeshStandardMaterial({ map: brushedTexture(), metalness: 0.9, roughness: 0.32 }));
    const chrome = M(new THREE.MeshStandardMaterial({ color: 0xd9dde3, metalness: 1, roughness: 0.14 }));
    const rubber = M(new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: 0.95 }));
    const stitch = M(new THREE.MeshStandardMaterial({ color: new THREE.Color(this.accent).multiplyScalar(0.55), roughness: 0.8 }));
    this.ambientMat = M(new THREE.MeshBasicMaterial({ color: this.ambientColor.clone(), toneMapped: false, transparent: true, opacity: 0.6 }));
    this.ambientGlow = M(new THREE.MeshBasicMaterial({ color: this.ambientColor.clone(), map: glowStripTexture(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    const gloveM = M(new THREE.MeshStandardMaterial({ map: gloveTexture(), roughness: 0.82 }));
    const gloveDark = M(new THREE.MeshStandardMaterial({ color: 0x3e4249, roughness: 0.75 }));
    const sleeveM = M(new THREE.MeshStandardMaterial({ color: 0x17181c, roughness: 0.78, metalness: 0.05 }));
    const cuffM = M(new THREE.MeshStandardMaterial({ color: new THREE.Color(this.accent), roughness: 0.6 }));

    const cw = D.cabinW;
    const dx = -cw * 0.46; // driver x (left-hand drive)
    this.driverX = dx;
    const eyeY = D.eyeY, eyeZ = D.eyeZ;
    const tOf = (z) => (z + ctx.L / 2) / ctx.L;
    // inner half-width of the body skin at a car-local z / lowered height
    // (heights above the local body top are clamped so trim never folds into the cabin)
    const innerW = (z, y) => {
      const t = clamp(tOf(z), 0, 1);
      return ctx.halfWAt(t, Math.min(y + ctx.lower, ctx.top(t) - 0.03));
    };
    // belt line at a given z (follows the body where it dips below the mid-cabin belt height)
    const beltAt = (z) => Math.min(D.beltY, ctx.top(clamp(tOf(z), 0, 1)) - ctx.lower - 0.006);
    const zWS = ctx.z(cab.t0);
    const glassY = (z) => {
      const t = clamp(tOf(z), cab.t0, cab.t1);
      const u = (t - cab.t0) / Math.max(1e-3, cab.t1 - cab.t0);
      const yb = ctx.top(t);
      return yb + (cab.roof - yb) * Math.pow(Math.sin((u * Math.PI) / 2), cab.wsCurve ?? 0.85) - ctx.lower;
    };

    // ---------- interior shell: body seen from inside (dark trim below the belt, fabric headliner above)
    {
      const shellM = M(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.93, side: THREE.BackSide }));
      const glassIn = M(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false }));
      const hl = new THREE.Color('#5d5e63'), dk = new THREE.Color('#25262a');
      const keys = ['paint', 'trim', 'decal', 'kit', 'cabinTop', 'body2'];
      for (const k of keys) {
        const src = car.model.meshes[k];
        if (!src) continue;
        const geo = src.geometry;
        if (!geo.attributes.color || geo.userData.shellBelt !== D.beltY) {
          const p = geo.attributes.position;
          const col = new Float32Array(p.count * 3);
          for (let i = 0; i < p.count; i++) {
            const y = p.getY(i);
            const f = clamp((y - (D.beltY + 0.02)) / 0.06, 0, 1);
            col[i * 3] = lerp(dk.r, hl.r, f); col[i * 3 + 1] = lerp(dk.g, hl.g, f); col[i * 3 + 2] = lerp(dk.b, hl.b, f);
          }
          geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
          geo.userData.shellBelt = D.beltY;
        }
        add(geo, shellM);
      }
      if (car.model.meshes.glass) {
        const gi = add(car.model.meshes.glass.geometry, glassIn);
        gi.renderOrder = 3;
      }
      this.shared = new Set(keys.concat('glass').map((k) => car.model.meshes[k]?.geometry).filter(Boolean));
    }

    // ---------- dashboard
    const zLip = Math.max(eyeZ - 0.62, zWS + 0.17);
    const yLip = eyeY - 0.325;
    const zA = zWS + 0.025, yA = glassY(zA) - 0.012;
    const dashHW = Math.max(0.45, Math.min(innerW(zLip, yLip - 0.12), innerW(zLip, yLip), innerW(zA + 0.1, yA - 0.06)) - 0.014);
    this.dash = { zLip, yLip, dashHW };
    {
      const zc = lerp(zA, zLip, 0.5);
      const yc = Math.min(glassY(zc) - 0.03, Math.max(yA, yLip) + 0.012);
      const sh = new THREE.Shape();
      sh.moveTo(zA, yA);
      sh.quadraticCurveTo(zc, yc, zLip - 0.05, yLip);
      sh.quadraticCurveTo(zLip + 0.002, yLip + 0.002, zLip + 0.006, yLip - 0.04);
      sh.quadraticCurveTo(zLip + 0.03, yLip - 0.15, zLip + 0.05, yLip - 0.25);
      sh.quadraticCurveTo(zLip + 0.07, yLip - 0.33, zLip + 0.02, yLip - 0.38);
      sh.lineTo(zA + 0.06, yLip - 0.42);
      sh.lineTo(zA, yA - 0.1);
      sh.lineTo(zA, yA);
      add(extrudeX(sh, dashHW * 2, 0, 0.008, 14), dashM);
      // leather-wrapped upper pad with contrast stitching along the lip
      const pad = new THREE.Shape();
      pad.moveTo(zLip - 0.16, yLip + 0.004);
      pad.quadraticCurveTo(zLip - 0.06, yLip + 0.016, zLip - 0.01, yLip + 0.004);
      pad.quadraticCurveTo(zLip + 0.012, yLip - 0.012, zLip + 0.012, yLip - 0.035);
      pad.lineTo(zLip + 0.004, yLip - 0.038);
      pad.quadraticCurveTo(zLip, yLip - 0.012, zLip - 0.02, yLip - 0.004);
      pad.lineTo(zLip - 0.16, yLip - 0.008);
      add(extrudeX(pad, dashHW * 2 - 0.02, 0, 0.004, 8), dashTopM);
      const st = add(new THREE.BoxGeometry(dashHW * 2 - 0.08, 0.0025, 0.0025), stitch);
      st.position.set(0, yLip - 0.022, zLip + 0.0135);
      // defroster slot along the base of the windscreen and tweeter grilles in the corners
      const zd = zA + 0.05, yd = lerp(yA, yLip, 0.12) + 0.004;
      const slot = add(RB(dashHW * 1.5, 0.004, 0.025, 0.002), rubber);
      slot.position.set(0, yd, zd);
      for (const sx of [-1, 1]) {
        const tw = add(new THREE.CircleGeometry(0.035, 24).rotateX(-Math.PI / 2 + 0.12), M(new THREE.MeshStandardMaterial({ map: speakerTexture(), roughness: 0.6, metalness: 0.4 })));
        tw.position.set(sx * (dashHW - 0.14), yd + 0.004, zd + 0.06);
      }
    }
    // dash face position at height y (includes the extrusion's 8 mm bevel)
    const faceZ = (y) => zLip + 0.006 + 0.008 + ((yLip - 0.04 - y) / 0.21) * 0.044;
    const faceTilt = -0.21;

    // ---------- instrument cluster (hooded, curved display)
    const zCl = eyeZ - 0.71, yCl = eyeY - 0.275;
    {
      const pg = new THREE.PlaneGeometry(0.31, 0.112, 20, 1);
      const p = pg.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, p.getX(i) * p.getX(i) * 0.7);
      pg.computeVertexNormals();
      const disp = add(pg, M(new THREE.MeshBasicMaterial({ map: this.gaugeTex, toneMapped: false })));
      disp.position.set(dx, yCl, zCl);
      disp.rotation.x = -0.22;
      const bez = add(RB(0.335, 0.132, 0.03, 0.012), piano);
      bez.position.set(dx, yCl - 0.002, zCl - 0.018);
      bez.rotation.x = -0.22;
      const pod = new THREE.Shape();
      const hz0 = zCl - 0.075, hy0 = yLip - 0.01;
      pod.moveTo(hz0, hy0);
      pod.quadraticCurveTo(hz0 - 0.005, yCl + 0.1, zCl + 0.005, yCl + 0.098);
      pod.quadraticCurveTo(zCl + 0.045, yCl + 0.097, zCl + 0.048, yCl + 0.084);
      pod.quadraticCurveTo(zCl + 0.03, yCl + 0.078, zCl + 0.004, yCl + 0.074);
      pod.lineTo(zCl - 0.03, yCl + 0.066);
      pod.lineTo(zCl - 0.035, hy0);
      pod.lineTo(hz0, hy0);
      add(extrudeX(pod, 0.38, dx, 0.016, 12), dashTopM);
      const pst = add(new THREE.BoxGeometry(0.36, 0.002, 0.002), stitch);
      pst.position.set(dx, yCl + 0.093, zCl + 0.03);
    }

    // ---------- centre display (free-standing, angled to the driver)
    const cxs = dx + 0.43;
    {
      const scr = add(new THREE.PlaneGeometry(0.3, 0.15), M(new THREE.MeshBasicMaterial({ map: this.navTex, toneMapped: false })));
      scr.position.set(cxs, yLip + 0.088, eyeZ - 0.705);
      scr.rotation.set(-0.12, -0.3, 0, 'YXZ');
      const bz = add(RB(0.318, 0.168, 0.016, 0.01), piano);
      bz.position.copy(scr.position).add(new THREE.Vector3(Math.sin(0.3) * 0.009, 0, -Math.cos(0.3) * 0.009));
      bz.rotation.copy(scr.rotation);
      const foot = add(RB(0.12, 0.05, 0.06, 0.012), piano);
      foot.position.set(cxs + 0.01, yLip + 0.012, eyeZ - 0.72);
      foot.rotation.y = -0.3;
    }

    // ---------- air vents
    const vent = (x, y, w, h) => {
      const v = new THREE.Group();
      const bz = RB(w, h, 0.028, 0.012);
      v.add(new THREE.Mesh(bz, piano));
      const back = new THREE.Mesh(new THREE.BoxGeometry(w - 0.018, h - 0.014, 0.004), rubber);
      back.position.z = 0.006;
      v.add(back);
      const n = Math.max(3, Math.round(h / 0.012));
      for (let i = 0; i < n; i++) {
        const sl = new THREE.Mesh(new THREE.BoxGeometry(w - 0.022, 0.0035, 0.018), i === Math.floor(n / 2) ? alu : dashM);
        sl.position.set(0, -h / 2 + 0.01 + (i / (n - 1)) * (h - 0.02), 0.012);
        sl.rotation.x = 0.25;
        v.add(sl);
      }
      const knob = new THREE.Mesh(RB(0.012, 0.016, 0.012, 0.004), chrome);
      knob.position.set(0, 0, 0.022);
      v.add(knob);
      v.position.set(x, y, faceZ(y) + 0.008);
      v.rotation.x = faceTilt;
      g.add(v);
    };
    const yV = yLip - 0.085;
    vent(cxs - 0.075, yV, 0.13, 0.052);
    vent(cxs + 0.075, yV, 0.13, 0.052);
    vent(-dashHW + 0.085, yLip - 0.07, 0.11, 0.056);
    vent(dashHW - 0.085, yLip - 0.07, 0.11, 0.056);

    // ---------- climate strip, start button, passenger trim inlay and ambient lights
    {
      const yC = yLip - 0.165;
      const cl = add(new THREE.PlaneGeometry(0.25, 0.0625), M(new THREE.MeshStandardMaterial({ map: climateTexture(), roughness: 0.15, metalness: 0.2, emissive: 0xffffff, emissiveMap: climateTexture(), emissiveIntensity: 0.15 })));
      cl.position.set(cxs, yC, faceZ(yC) + 0.004);
      cl.rotation.x = faceTilt;
      const yS = yLip - 0.13;
      const sb = add(new THREE.CylinderGeometry(0.017, 0.017, 0.012, 24).rotateX(Math.PI / 2), piano);
      sb.position.set(dx + 0.24, yS, faceZ(yS) + 0.006);
      sb.rotation.x = faceTilt;
      const sr = add(new THREE.TorusGeometry(0.018, 0.0022, 6, 24), chrome);
      const sf = add(new THREE.CircleGeometry(0.012, 20), M(new THREE.MeshStandardMaterial({ color: 0x5a0a10, emissive: 0xff2030, emissiveIntensity: 0.25, roughness: 0.3 })));
      sf.position.copy(sb.position).add(new THREE.Vector3(0, 0.0013, 0.0066));
      sf.rotation.x = faceTilt;
      sr.position.copy(sb.position).add(new THREE.Vector3(0, 0, 0.007));
      sr.rotation.x = faceTilt;
      // carbon inlay across the passenger side and a light pipe beneath it
      const x0 = cxs + 0.16, x1 = dashHW - 0.16;
      if (x1 > x0 + 0.05) {
        const yI = yLip - 0.092;
        const inl = add(RB(x1 - x0, 0.042, 0.01, 0.004), carbon);
        inl.position.set((x0 + x1) / 2, yI, faceZ(yI) + 0.004);
        inl.rotation.x = faceTilt;
      }
      const yT2 = yLip - 0.052;
      const strip = add(RB(dashHW * 2 - 0.2, 0.008, 0.006, 0.002), alu);
      strip.position.set(0, yT2, faceZ(yT2) + 0.004);
      strip.rotation.x = faceTilt;
      const yA2 = yLip - 0.112;
      const light = (xa, xb, y) => {
        const len = Math.max(0.05, xb - xa);
        const core = add(new THREE.BoxGeometry(len, 0.005, 0.005), this.ambientMat);
        core.position.set((xa + xb) / 2, y, faceZ(y) + 0.005);
        const glow = add(new THREE.PlaneGeometry(len + 0.03, 0.045), this.ambientGlow);
        glow.position.set((xa + xb) / 2, y, faceZ(y) + 0.008);
        glow.rotation.x = faceTilt;
        glow.renderOrder = 6;
      };
      light(cxs + 0.16, dashHW - 0.02, yLip - 0.064);
      light(-dashHW + 0.02, dx - 0.21, yLip - 0.064);
    }

    // ---------- centre console with waterfall, selector, rotary controller and armrest
    {
      const yT = eyeY - 0.725;
      const zB = eyeZ + 0.4;
      const sh = new THREE.Shape();
      sh.moveTo(zLip + 0.045, yLip - 0.21);
      sh.lineTo(zLip + 0.075, yLip - 0.21);
      sh.quadraticCurveTo(zLip + 0.2, yLip - 0.24, Math.max(zLip + 0.25, eyeZ - 0.56), yT);
      sh.lineTo(zB, yT);
      sh.lineTo(zB, eyeY - 1.02);
      sh.lineTo(zLip + 0.045, eyeY - 1.02);
      sh.lineTo(zLip + 0.045, yLip - 0.21);
      add(extrudeX(sh, 0.25, 0, 0.012, 10), dashM);
      const top = add(RB(0.17, 0.006, Math.max(0.1, zB - 0.38 - (eyeZ - 0.56)), 0.003), piano);
      const zTop0 = Math.max(zLip + 0.25, eyeZ - 0.56);
      top.position.set(0, yT + 0.004, (zTop0 + eyeZ + 0.02) / 2);
      const lever = new THREE.Group();
      const lb = new THREE.Mesh(RB(0.052, 0.09, 0.1, 0.022), leather);
      lb.position.y = 0.045;
      const lband = new THREE.Mesh(RB(0.054, 0.012, 0.102, 0.005), chrome);
      lband.position.y = 0.075;
      const ring = new THREE.Mesh(RB(0.085, 0.012, 0.14, 0.01), alu);
      lever.add(lb, lband, ring);
      lever.position.set(0, yT + 0.006, eyeZ - 0.42);
      lever.rotation.x = -0.18;
      g.add(lever);
      const knob = add(new THREE.CylinderGeometry(0.032, 0.033, 0.026, 32), [M(new THREE.MeshStandardMaterial({ map: knurlTexture(), metalness: 0.9, roughness: 0.3 })), piano, piano]);
      knob.position.set(0, yT + 0.019, eyeZ - 0.26);
      for (const [bx, bz] of [[-0.055, -0.03], [0.055, -0.03], [-0.055, 0.03], [0.055, 0.03]]) {
        const b = add(RB(0.03, 0.008, 0.022, 0.004), piano);
        b.position.set(bx, yT + 0.009, eyeZ - 0.26 + bz);
      }
      for (const cx of [-0.045, 0.045]) {
        const cup = add(new THREE.CircleGeometry(0.036, 24).rotateX(-Math.PI / 2), rubber);
        cup.position.set(cx, yT + 0.0075, eyeZ - 0.53);
      }
      const arm = add(RB(0.2, 0.07, 0.34, 0.03), leather);
      arm.position.set(0, yT + 0.05, eyeZ + 0.2);
      const ast = add(new THREE.BoxGeometry(0.002, 0.002, 0.3), stitch);
      ast.position.set(0, yT + 0.0855, eyeZ + 0.2);
    }

    // ---------- door cards: shaped panel, sill roll, armrest, pull, release, switches, speaker, light pipe
    {
      const z0 = zLip + 0.06, z1 = eyeZ + 0.62;
      const y0 = D.beltY - 0.46, y1 = D.beltY - 0.03;
      const nz = 12, ny = 8;
      const cardM = M(new THREE.MeshStandardMaterial({ color: 0x303136, roughness: 0.72, bumpMap: plasticB, bumpScale: 0.3, side: THREE.DoubleSide }));
      for (const sx of [-1, 1]) {
        const pos = [], uv = [], idx = [];
        for (let i = 0; i <= nz; i++) {
          const z = lerp(z0, z1, i / nz);
          const yTopZ = Math.max(y0 + 0.1, beltAt(z) - 0.03);
          for (let j = 0; j <= ny; j++) {
            const y = lerp(y0, yTopZ, j / ny);
            // sculpted: bulge for the armrest band, recess above it
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
        add(dg, cardM);
        // sill roll along the belt
        const rp = [];
        for (let i = 0; i <= 12; i++) {
          const z = lerp(z0 - 0.02, z1, i / 12);
          const yb = beltAt(z);
          rp.push(new THREE.Vector3(sx * (Math.max(0.3, innerW(z, yb - 0.02)) - 0.03), yb - 0.018, z));
        }
        add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rp), 24, 0.022, 10, false), leather);
        // leather insert and armrest
        const zm = (z0 + z1) / 2 + 0.06;
        const ya = D.beltY - 0.215;
        const xa = Math.max(0.3, innerW(zm, ya) - 0.035);
        const insert = add(RB(0.012, 0.09, z1 - z0 - 0.22, 0.006), leatherLight);
        insert.position.set(sx * (Math.max(0.3, innerW(zm, ya + 0.075)) - 0.042), ya + 0.075, zm - 0.04);
        const arm = add(RB(0.085, 0.055, 0.44, 0.022), leather);
        arm.position.set(sx * (xa - 0.04), ya, zm);
        const pull = add(RB(0.022, 0.03, 0.15, 0.008), alu);
        pull.position.set(sx * (xa - 0.022), ya + 0.075, zm - 0.12);
        // inner release lever in a recess, front-upper corner
        const yr = D.beltY - 0.085, zr = z0 + 0.14;
        const xr = Math.max(0.3, innerW(zr, yr) - 0.036);
        const rec = add(RB(0.01, 0.04, 0.13, 0.004), piano);
        rec.position.set(sx * xr, yr, zr);
        const rl = add(RB(0.014, 0.018, 0.1, 0.006), chrome);
        rl.position.set(sx * (xr - 0.008), yr, zr);
        if (sx < 0) {
          const sw = add(new THREE.PlaneGeometry(0.1, 0.05), M(new THREE.MeshStandardMaterial({ map: windowSwitchTexture(), roughness: 0.25 })));
          sw.rotation.x = -Math.PI / 2;
          sw.position.set(sx * (xa - 0.04), ya + 0.029, zm - 0.12);
        }
        // speaker
        const ys = D.beltY - 0.37, zs = z0 + 0.2;
        const xs = Math.max(0.3, innerW(zs, ys) - 0.04);
        const spk = add(new THREE.CircleGeometry(0.075, 32), M(new THREE.MeshStandardMaterial({ map: speakerTexture(), roughness: 0.7, metalness: 0.4 })));
        spk.position.set(sx * xs, ys, zs);
        spk.rotation.y = -sx * Math.PI / 2;
        const sr = add(new THREE.TorusGeometry(0.076, 0.004, 6, 32), alu);
        sr.position.copy(spk.position);
        sr.rotation.y = -sx * Math.PI / 2;
        // brushed trim strip under the sill and a gloss-black mirror sail with tweeter at the front corner
        const tp = [];
        for (let i = 0; i <= 10; i++) {
          const z = lerp(z0 - 0.01, z1 - 0.05, i / 10);
          const y = beltAt(z) - 0.06;
          tp.push(new THREE.Vector3(sx * (Math.max(0.3, innerW(z, y)) - 0.042), y, z));
        }
        add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(tp), 20, 0.0045, 6, false), alu);
        {
          const zs0 = z0 - 0.02, ys0 = beltAt(zs0);
          const sail = new THREE.Shape();
          const f = -sx; // shape x must point forward on both sides
          sail.moveTo(0, 0); sail.lineTo(0.2 * f, 0); sail.lineTo(0.02 * f, 0.12); sail.lineTo(0, 0.1);
          const sg = new THREE.ShapeGeometry(sail);
          const sm = add(sg, piano);
          sm.position.set(sx * (Math.max(0.3, innerW(zs0, ys0 - 0.02)) - 0.045), ys0 - 0.04, zs0);
          sm.rotation.y = -sx * Math.PI / 2;
          sm.material = piano;
          const twt = add(new THREE.CircleGeometry(0.022, 20), M(new THREE.MeshStandardMaterial({ map: speakerTexture(), roughness: 0.5, metalness: 0.5 })));
          twt.position.copy(sm.position).add(new THREE.Vector3(-sx * 0.002, 0.035, -0.05));
          twt.rotation.y = -sx * Math.PI / 2;
        }
        // ambient light pipe along the card
        const lp = [];
        for (let i = 0; i <= 8; i++) {
          const z = lerp(z0 + 0.03, z1 - 0.1, i / 8);
          const y = beltAt(z) - 0.105;
          lp.push(new THREE.Vector3(sx * (Math.max(0.3, innerW(z, y)) - 0.039), y, z));
        }
        add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lp), 16, 0.003, 5, false), this.ambientMat);
        const gl = add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lp), 16, 0.012, 6, false), this.ambientGlow);
        gl.renderOrder = 6;
      }
    }

    // ---------- headliner furniture: sun visors, overhead console, rear-view mirror
    {
      const roofIn = D.roofY - 0.03;
      for (const vx of [dx + 0.02, -dx - 0.02]) {
        const vis = add(RB(0.34, 0.02, 0.165, 0.009), M(new THREE.MeshStandardMaterial({ color: 0x3e3f44, roughness: 0.95 })));
        vis.position.set(vx, roofIn - 0.012, D.wsTopZ + 0.14);
        vis.rotation.x = 0.06;
        const clip = add(RB(0.03, 0.012, 0.02, 0.004), dashM);
        clip.position.set(vx + (vx < 0 ? 0.19 : -0.19), roofIn - 0.004, D.wsTopZ + 0.08);
      }
      const oc = add(RB(0.2, 0.034, 0.13, 0.012), dashM);
      oc.position.set(0, roofIn - 0.01, D.wsTopZ + 0.13);
      for (const lx of [-0.05, 0.05]) {
        const lens = add(RB(0.04, 0.004, 0.03, 0.002), M(new THREE.MeshStandardMaterial({ color: 0xbfc3c8, roughness: 0.3 })));
        lens.position.set(lx, roofIn - 0.028, D.wsTopZ + 0.14);
      }
    }
    const mirrorMat = M(new THREE.MeshBasicMaterial({ map: this.mirrorRT.texture }));
    {
      const mz = Math.max(eyeZ - 0.58, D.wsTopZ + 0.07);
      const my = Math.min(eyeY + 0.05, D.roofY - 0.11);
      const mx = 0.02;
      const mg = new THREE.Group();
      mg.position.set(mx, my, mz);
      mg.rotation.y = -0.3;
      mg.add(new THREE.Mesh(RB(0.27, 0.075, 0.035, 0.03, 3), piano));
      const shape = new THREE.Shape();
      const w = 0.125, h = 0.031, r = 0.026;
      shape.moveTo(-w + r, -h);
      shape.lineTo(w - r, -h); shape.quadraticCurveTo(w, -h, w, -h + r);
      shape.lineTo(w, h - r); shape.quadraticCurveTo(w, h, w - r, h);
      shape.lineTo(-w + r, h); shape.quadraticCurveTo(-w, h, -w, h - r);
      shape.lineTo(-w, -h + r); shape.quadraticCurveTo(-w, -h, -w + r, -h);
      const sg = new THREE.ShapeGeometry(shape, 8);
      const uv = sg.attributes.uv, pp = sg.attributes.position;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, 1 - (pp.getX(i) + w) / (2 * w), (pp.getY(i) + h) / (2 * h));
      const gl = new THREE.Mesh(sg, mirrorMat);
      gl.position.z = 0.0185;
      mg.add(gl);
      g.add(mg);
      const top = new THREE.Vector3(mx + 0.01, D.roofY - 0.03, mz - 0.05);
      const base = new THREE.Vector3(mx, my + 0.03, mz - 0.01);
      const stem = limb(base, top, 0.009, 0.012, 10);
      stem.material = dashM;
      g.add(stem);
      const foot = add(RB(0.05, 0.03, 0.06, 0.01), dashM);
      foot.position.copy(top);
    }
    // door mirror glass (live) on the exterior mirrors
    {
      const mp = mirrorPose(ctx);
      for (const sx of [-1, 1]) {
        const geo = new THREE.CircleGeometry(1, 24).scale(mp.rx * 0.86, mp.ry * 0.8, 1);
        const uv = geo.attributes.uv.array;
        const u0 = sx < 0 ? 1.0 : 0.38, u1 = sx < 0 ? 0.62 : 0.0;
        for (let i = 0; i < uv.length; i += 2) uv[i] = u0 + (u1 - u0) * uv[i];
        const m = add(geo, mirrorMat);
        m.position.set(sx * mp.x, mp.y, mp.z + mp.rz * 0.7 + 0.004);
      }
    }

    // ---------- rain on the windscreen
    {
      const zb = ctx.z(cab.t0) + 0.03, yb = ctx.top(cab.t0) - ctx.lower + 0.03;
      const zt = ctx.z(cab.t1) - 0.04, yt = cab.roof - ctx.lower - 0.05;
      const wb = ctx.hw(cab.t0) * (cab.wBot ?? 0.86) * 0.86, wt = ctx.hw(cab.t1) * (cab.wBot ?? 0.86) * (1 - (cab.tumble ?? 0.2)) * 0.86;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute([-wb, yb, zb, wb, yb, zb, -wt, yt, zt, wt, yt, zt], 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1.6, 0, 0.1, 0.9, 1.5, 0.9], 2));
      geo.setIndex([0, 1, 2, 1, 3, 2]);
      this.dropMat = M(new THREE.MeshBasicMaterial({ map: this.dropTex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
      const dm = add(geo, this.dropMat);
      dm.renderOrder = 5;
    }

    // ---------- head-up display (virtual image floating over the bonnet)
    {
      this.hudMat = M(new THREE.MeshBasicMaterial({ map: this.hudTex, transparent: true, opacity: 0.8, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
      const hud = add(new THREE.PlaneGeometry(0.21, 0.066), this.hudMat);
      hud.position.set(dx, eyeY - 0.19, eyeZ - 1.45);
      hud.rotation.x = -0.12;
      hud.renderOrder = 20;
    }

    // ---------- steering wheel: column, shroud and stalks (fixed) + rotating wheel
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(dx, eyeY - 0.34, eyeZ - 0.53);
    wheelGroup.rotation.x = -0.33;
    const rotor = new THREE.Group();
    wheelGroup.add(rotor);
    const R = 0.182;
    {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.3, 16).rotateX(Math.PI / 2), dashM);
      col.position.z = -0.17;
      wheelGroup.add(col);
      const shroud = new THREE.Mesh(RB(0.13, 0.1, 0.2, 0.035), dashM);
      shroud.position.set(0, -0.035, -0.16);
      wheelGroup.add(shroud);
      for (const sx of [-1, 1]) {
        const stalk = limb(new THREE.Vector3(sx * 0.06, -0.02, -0.1), new THREE.Vector3(sx * 0.17, -0.045, -0.085), 0.006, 0.005, 8);
        stalk.material = piano;
        wheelGroup.add(stalk);
        const tip = new THREE.Mesh(RB(0.03, 0.016, 0.016, 0.006), piano);
        tip.position.set(sx * 0.175, -0.046, -0.085);
        wheelGroup.add(tip);
      }
      // rim: flat-bottomed, thick, slightly oval section
      const pts = [];
      const N = 96, flat = -R * 0.83;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const x = Math.cos(a) * R;
        let y = Math.sin(a) * R;
        if (y < flat) y = flat + (y - flat) * 0.12;
        pts.push(new THREE.Vector3(x, y, 0));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const rimGeo = new THREE.TubeGeometry(curve, 180, 0.0205, 14, true);
      rimGeo.scale(1, 1, 1.32);
      const rimM = M(new THREE.MeshStandardMaterial({ color: 0x232327, roughness: 0.58, bumpMap: repeatTex(leatherBump(), 20, 2), bumpScale: 1 }));
      rotor.add(new THREE.Mesh(rimGeo, rimM));
      // 12 o'clock marker (tricolour for the German saloon)
      const stripes = def.maker === 'KESSLER' ? ['#4fb3ff', '#1b3fa0', '#e0182d'] : [this.accent];
      const sw = 0.028;
      stripes.forEach((c, i) => {
        const a0 = Math.PI / 2 + (i - (stripes.length - 1) / 2) * sw;
        const arc = [];
        for (let k = 0; k <= 4; k++) { const a = a0 - sw / 2 + (k / 4) * sw; arc.push(new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0)); }
        const sg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arc), 4, 0.0212, 14, false);
        sg.scale(1, 1, 1.32);
        rotor.add(new THREE.Mesh(sg, M(new THREE.MeshStandardMaterial({ color: new THREE.Color(c), roughness: 0.5 }))));
      });
      // contrast stitching on the inside of the rim
      const st = new THREE.Mesh(new THREE.TorusGeometry(R - 0.0196, 0.0006, 3, 96), stitch);
      st.position.z = 0.012;
      rotor.add(st);
      // spokes with switch pods
      for (const sx of [-1, 1]) {
        const len = R - 0.065;
        const sp = new THREE.Mesh(RB(len, 0.058, 0.024, 0.01), dashM);
        sp.position.set(sx * (0.06 + len / 2), -0.012, 0.004);
        rotor.add(sp);
        const pad = new THREE.Mesh(new THREE.PlaneGeometry(len * 0.82, 0.046), M(new THREE.MeshStandardMaterial({ map: spokeButtonsTexture(sx), roughness: 0.35, metalness: 0.2 })));
        pad.position.set(sx * (0.06 + len / 2), -0.012, 0.0165);
        rotor.add(pad);
        const trim = new THREE.Mesh(RB(len, 0.007, 0.026, 0.003), alu);
        trim.position.set(sx * (0.06 + len / 2), -0.044, 0.004);
        rotor.add(trim);
        // aluminium shift paddles behind the rim
        const pdl = new THREE.Mesh(RB(0.06, 0.1, 0.006, 0.003), carbon);
        pdl.position.set(sx * (R + 0.012), 0.03, -0.042);
        pdl.rotation.z = sx * 0.18;
        rotor.add(pdl);
      }
      for (const sx of [-1, 1]) {
        const b = new THREE.Mesh(RB(0.014, R * 0.62, 0.016, 0.005), alu);
        b.position.set(sx * 0.022, -0.06 - R * 0.31, 0.0);
        rotor.add(b);
      }
      // airbag boss with roundel
      const hub = new THREE.Mesh(RB(0.135, 0.115, 0.05, 0.03, 3), leather);
      hub.position.set(0, -0.004, 0.012);
      rotor.add(hub);
      const badgeColors = { KESSLER: ['#1c69d4', '#e8eaec'], KAZE: ['#1d4fbf', '#c9a34a'], STRADA: ['#c9a34a', '#111'], VELOCE: ['#7cc42d', '#111'], AETHER: ['#c9a34a', '#222'] };
      const logo = new THREE.Mesh(new THREE.CircleGeometry(0.023, 32), M(new THREE.MeshStandardMaterial({ map: badgeTexture(def.maker, badgeColors[def.maker] || [this.accent, '#e8eaec']), transparent: true, roughness: 0.3, metalness: 0.4 })));
      logo.position.set(0, 0.004, 0.0385);
      rotor.add(logo);
    }

    // ---------- gloved hands gripping the rim at a quarter to three
    this.hands = [];
    for (const side of [-1, 1]) {
      const a = side < 0 ? Math.PI - 0.24 : 0.24;
      const P = new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0);
      const Nn = new THREE.Vector3(Math.cos(a), Math.sin(a), 0);
      const T = new THREE.Vector3(-Math.sin(a), Math.cos(a), 0);
      const Yl = side > 0 ? T.clone() : T.clone().negate();
      const Xl = side > 0 ? Nn.clone() : Nn.clone().negate();
      const o = side > 0 ? 1 : -1; // outward sign in the hand's local frame
      const hand = new THREE.Group();
      hand.scale.setScalar(1.12);
      hand.position.copy(P);
      hand.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(Xl, Yl, new THREE.Vector3(0, 0, 1)));
      // fingers wrap over the front of the rim; tips peek out on the inside edge
      const rf = 0.0355;
      for (let k = 0; k < 4; k++) {
        const yk = -0.043 + k * 0.0195;
        const arc = [];
        const th0 = -0.45, th1 = k === 3 ? 2.45 : 2.7;
        for (let i = 0; i <= 10; i++) {
          const th = lerp(th0, th1, i / 10);
          arc.push(new THREE.Vector3(o * Math.cos(th) * rf, yk + (i / 10) * 0.003, -Math.sin(th) * rf * 1.2));
        }
        const fr = k === 3 ? 0.0084 : 0.0097;
        hand.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(arc), 18, fr, 8, false), gloveM));
        const tip = new THREE.Mesh(new THREE.SphereGeometry(fr, 8, 6), gloveM);
        tip.position.copy(arc[arc.length - 1]);
        hand.add(tip);
      }
      // back of the hand: a rounded pad over the outer/driver side of the rim with a knuckle ridge
      const nrm = new THREE.Vector3(o * 0.62, 0, 0.78).normalize();
      const dorsum = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), gloveM);
      dorsum.scale.set(0.024, 0.05, 0.046);
      dorsum.position.copy(nrm.clone().multiplyScalar(0.036)).add(new THREE.Vector3(0, -0.012, 0));
      dorsum.rotation.y = Math.atan2(-nrm.z, nrm.x);
      hand.add(dorsum);
      const kn = new THREE.Mesh(new THREE.CapsuleGeometry(0.0135, 0.06, 4, 10), gloveDark);
      kn.position.set(o * 0.034, -0.014, -0.004);
      hand.add(kn);
      // thumb along the driver face of the rim toward the spoke
      const tb = new THREE.Vector3(o * 0.014, 0.03, 0.036), te = new THREE.Vector3(-o * 0.046, 0.022, 0.041);
      const th = limb(tb, te, 0.0122, 0.0108, 10);
      th.material = gloveM;
      hand.add(th);
      const thTip = new THREE.Mesh(new THREE.SphereGeometry(0.0108, 10, 8), gloveM);
      thTip.position.copy(te);
      hand.add(thTip);
      // gauntlet cuff toward the forearm
      const dir = new THREE.Vector3(o * 0.32, -0.42, 0.85).normalize();
      const c0 = dorsum.position.clone().add(dir.clone().multiplyScalar(0.03));
      const c1 = dorsum.position.clone().add(dir.clone().multiplyScalar(0.105));
      const cuff = limb(c0, c1, 0.032, 0.037, 14);
      cuff.material = gloveDark;
      hand.add(cuff);
      const wrist = new THREE.Object3D();
      wrist.position.copy(c1);
      hand.add(wrist);
      rotor.add(hand);
      // arm: forearm + elbow + upper arm, solved each frame
      const fore = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.046, 1, 14), sleeveM);
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 1, 14), sleeveM);
      const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 8), sleeveM);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.0395, 0.0395, 0.018, 14), cuffM);
      g.add(fore, upper, elbow, band);
      this.hands.push({ hand, wrist, fore, upper, elbow, band, side });
    }
    g.add(wheelGroup);
    this.wheelGroup = wheelGroup;
    this.rotor = rotor;
    this.shoulders = [new THREE.Vector3(dx - 0.2, eyeY - 0.26, eyeZ + 0.1), new THREE.Vector3(dx + 0.2, eyeY - 0.26, eyeZ + 0.1)];

    // ---------- seats
    {
      const seatM = leather, insertM = M(new THREE.MeshStandardMaterial({ color: 0x2c2c31, roughness: 0.9, bumpMap: repeatTex(carbonTexture(), 20), bumpScale: 0.6 }));
      const floorY = eyeY - 0.92;
      const seat = (x, z, w, topY, bolsters = true) => {
        const sg = new THREE.Group();
        const backH = Math.max(0.3, topY - 0.17 - (floorY + 0.24));
        const back = new THREE.Mesh(RB(w, backH, 0.13, 0.05), seatM);
        back.position.set(0, floorY + 0.24 + backH / 2, 0.02);
        back.rotation.x = -0.13;
        const ins = new THREE.Mesh(RB(w * 0.5, backH * 0.8, 0.02, 0.008), insertM);
        ins.position.set(0, back.position.y, -0.045);
        ins.rotation.x = -0.13;
        const head = new THREE.Mesh(RB(w * 0.52, 0.15, 0.1, 0.04), seatM);
        head.position.set(0, topY - 0.08, 0.06);
        const cush = new THREE.Mesh(RB(w, 0.12, 0.5, 0.05), seatM);
        cush.position.set(0, floorY + 0.2, -0.27);
        sg.add(back, ins, head, cush);
        if (bolsters) for (const bx of [-1, 1]) {
          const bol = new THREE.Mesh(RB(0.08, backH * 0.75, 0.17, 0.035), seatM);
          bol.position.set(bx * (w / 2 - 0.01), floorY + 0.24 + backH * 0.42, -0.01);
          bol.rotation.x = -0.13;
          bol.rotation.y = bx * 0.25;
          sg.add(bol);
        }
        for (const lx of [-w * 0.26, w * 0.26]) {
          const line = new THREE.Mesh(new THREE.BoxGeometry(0.004, backH * 0.75, 0.004), stitch);
          line.position.set(lx, back.position.y, -0.058);
          line.rotation.x = -0.13;
          sg.add(line);
        }
        sg.position.set(x, 0, z);
        return sg;
      };
      const frontTop = Math.min(eyeY + 0.12, D.roofY - 0.1);
      g.add(seat(-dx, eyeZ + 0.22, 0.5, frontTop));
      for (const sx of [-1, 1]) {
        const bol = add(RB(0.08, 0.5, 0.25, 0.035), seatM);
        bol.position.set(dx + sx * 0.27, eyeY - 0.55, eyeZ + 0.15);
      }
      const zr = eyeZ + 0.95;
      const rearRoom = innerW(zr, eyeY - 0.4) > 0.5 && D.roofY - floorY > 0.95 && (def.seats ?? 4) > 2;
      let shelfZ;
      if (rearRoom) {
        const half = Math.min(cw * 0.85, innerW(zr, eyeY - 0.5) - 0.04);
        const rearTop = Math.min(eyeY + 0.02, D.roofY - 0.12);
        for (const sx of [-1, 1]) g.add(seat(sx * half * 0.5, zr + 0.2, half * 0.98, rearTop, false));
        shelfZ = zr + 0.3;
      } else {
        const zb = eyeZ + 0.55;
        const bwid = Math.max(0.6, (innerW(zb, eyeY - 0.3) - 0.04) * 2);
        const bh = add(RB(bwid, Math.max(0.3, D.beltY - floorY), 0.05, 0.02), dashM);
        bh.position.set(0, (D.beltY + floorY) / 2, zb);
        shelfZ = zb;
      }
      const zEnd = ctx.z(Math.min(1, cab.t3 + 0.02));
      if (zEnd > shelfZ + 0.05) {
        const n = 8, pos = [], idx = [];
        for (let i = 0; i <= n; i++) {
          const z = lerp(shelfZ, zEnd, i / n);
          const t = clamp(tOf(z), 0, 1);
          const y = Math.min(ctx.top(t) - ctx.lower - 0.012, D.beltY + 0.06);
          const x = Math.max(0.2, innerW(z, y - 0.03) - 0.005);
          pos.push(-x, y, z, x, y, z);
        }
        for (let i = 0; i < n; i++) { const a0 = i * 2; idx.push(a0, a0 + 2, a0 + 1, a0 + 1, a0 + 2, a0 + 3); }
        const sg = new THREE.BufferGeometry();
        sg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        sg.setIndex(idx);
        sg.computeVertexNormals();
        add(sg, M(new THREE.MeshStandardMaterial({ color: 0x151517, roughness: 0.95, side: THREE.DoubleSide })));
      }
    }

    // merge children of a container by material in its local space (rotor, each glove, column)
    const mergeIn = (container, skip = new Set()) => {
      container.updateMatrixWorld(true);
      const inv = new THREE.Matrix4().copy(container.matrixWorld).invert();
      const buckets = new Map(), victims = [];
      container.traverse((o) => {
        if (!o.isMesh || skip.has(o) || Array.isArray(o.material) || o.renderOrder !== 0) return;
        let p = o.parent, blocked = false;
        while (p && p !== container) { if (skip.has(p)) blocked = true; p = p.parent; }
        if (blocked) return;
        const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
        if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
        if (!geo.attributes.normal) geo.computeVertexNormals();
        geo.clearGroups();
        geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
        if (!buckets.has(o.material)) buckets.set(o.material, []);
        buckets.get(o.material).push(geo);
        victims.push(o);
      });
      for (const o of victims) { o.parent.remove(o); o.geometry.dispose(); }
      for (const [mat, list] of buckets) {
        const merged = mergeGeometries(list, false);
        for (const l of list) l.dispose();
        if (merged) container.add(new THREE.Mesh(merged, mat));
      }
    };
    for (const h of this.hands) mergeIn(h.hand);
    mergeIn(rotor, new Set(this.hands.map((h) => h.hand)));
    mergeIn(wheelGroup, new Set([rotor]));
    // merge static trim that shares a material into single meshes (keeps the draw-call count down)
    {
      g.updateMatrixWorld(true);
      const dynamic = new Set();
      wheelGroup.traverse((o) => dynamic.add(o));
      for (const h of this.hands) for (const o of [h.fore, h.upper, h.elbow, h.band]) dynamic.add(o);
      const buckets = new Map();
      const victims = [];
      g.traverse((o) => {
        if (!o.isMesh || dynamic.has(o) || this.shared.has(o.geometry) || Array.isArray(o.material) || o.renderOrder !== 0) return;
        const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv'].includes(k)) geo.deleteAttribute(k);
        if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count * 2), 2));
        if (!geo.attributes.normal) geo.computeVertexNormals();
        geo.clearGroups();
        geo.applyMatrix4(o.matrixWorld);
        if (!buckets.has(o.material)) buckets.set(o.material, []);
        buckets.get(o.material).push(geo);
        victims.push(o);
      });
      for (const o of victims) { o.parent.remove(o); o.geometry.dispose(); }
      for (const [mat, list] of buckets) {
        const merged = mergeGeometries(list, false);
        for (const l of list) l.dispose();
        if (merged) add(merged, mat);
      }
    }

    // interior pieces catch the sun through the glass and the roof's shadow
    const emissiveLike = new Set([this.ambientMat, this.ambientGlow, this.hudMat, this.dropMat, mirrorMat, stitch]);
    g.traverse((m) => {
      if (!m.isMesh) return;
      m.castShadow = false;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      m.receiveShadow = !this.shared.has(m.geometry) && !mats.some((x) => emissiveLike.has(x) || x.map === this.gaugeTex || x.map === this.navTex);
    });
    car.model.body.add(g);
    this.group = g;
    g.visible = this.visible;
    this.maxSpeed = Math.ceil((def.phys.topSpeed * 1.08) / 20) * 20;
  }

  setVisible(v) {
    this.visible = v;
    if (this.group) this.group.visible = v;
  }

  _tmp = new THREE.Vector3();
  _tmp2 = new THREE.Vector3();
  _inv = new THREE.Matrix4();

  /* ------------------------------------------------------------------ per frame */
  update(dt, car, ctx) {
    if (!this.group || !this.visible) return;
    const P = car.phys;
    // steering wheel: road-wheel angle x steering ratio + a little input for feel
    const rot = clamp(P.steerAngle * 14 + car.steer * 0.12, -7.8, 7.8);
    this.rotor.rotation.z = -rot;
    this._solveArms();
    const night = ctx.night ?? 0;
    this.ambientMat.opacity = 0.18 + night * 0.75;
    this.ambientGlow.opacity = 0.03 + night * 0.22;
    this.hudMat.opacity = 0.55 + night * 0.3;
    if (this.dropMat) {
      const rain = ctx.rain ?? 0;
      this.dropMat.opacity = clamp(rain * 1.2, 0, 1) * (0.55 + 0.45 * (1 - night));
      this.dropMat.color.setScalar(lerp(1, 0.35, night));
      const v = P.speed;
      this.dropTex.offset.y -= dt * (v > 12 ? v * 0.012 : -0.02);
      this.dropTex.offset.x += dt * 0.004 * Math.sin(this.dropT += dt);
    }
    this.odo += (P.speed * dt) / 1000;
    this.tripT += dt;
    this.gaugeT -= dt;
    if (this.gaugeT <= 0) {
      this.gaugeT = 1 / 30;
      this._drawGauges(P, ctx);
    }
    this.hudT -= dt;
    if (this.hudT <= 0) {
      this.hudT = 1 / 20;
      this._drawHud(P, ctx);
    }
    this.navT -= dt;
    if (this.navT <= 0) {
      this.navT = 0.25;
      this._drawNav(car, ctx);
    }
  }

  /** Two-bone IK from each shoulder to the glove cuff, elbows dropped down and out. */
  _solveArms() {
    const g = this.group;
    g.updateMatrixWorld(true);
    this._inv.copy(g.matrixWorld).invert();
    const L1 = 0.3, L2 = 0.29;
    for (let i = 0; i < 2; i++) {
      const h = this.hands[i];
      const S = this.shoulders[i];
      const W = h.wrist.getWorldPosition(this._tmp).applyMatrix4(this._inv).clone();
      const d = Math.min(L1 + L2 - 0.002, Math.max(0.05, S.distanceTo(W)));
      const u = W.clone().sub(S).normalize();
      const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
      const hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));
      const pole = new THREE.Vector3(h.side * 0.55, -0.82, 0.12);
      pole.sub(u.clone().multiplyScalar(pole.dot(u))).normalize();
      const E = S.clone().add(u.clone().multiplyScalar(a)).add(pole.multiplyScalar(hh));
      const place = (m, A, B) => {
        const len = A.distanceTo(B);
        m.scale.set(1, len, 1);
        m.position.copy(A).lerp(B, 0.5);
        m.quaternion.setFromUnitVectors(_up, this._tmp2.copy(B).sub(A).normalize());
      };
      place(h.fore, W, E);
      place(h.upper, E, S);
      h.elbow.position.copy(E);
      const bandP = W.clone().lerp(E, 0.06);
      h.band.position.copy(bandP);
      h.band.quaternion.copy(h.fore.quaternion);
    }
  }

  renderMirror(renderer, scene, car) {
    if (!this.group || !this.visible) return;
    this.frame++;
    if (this.frame % 2) return;
    const body = car.model.body;
    body.updateMatrixWorld(true);
    const D = car.dims;
    const cam = this.mirrorCam;
    const p = new THREE.Vector3(0, D.roofY - 0.12, D.wsTopZ + 0.4).applyMatrix4(body.matrixWorld);
    const t = new THREE.Vector3(0, D.roofY - 0.5, D.wsTopZ + 30).applyMatrix4(body.matrixWorld);
    cam.position.copy(p);
    cam.lookAt(t);
    const prev = renderer.getRenderTarget();
    this.group.visible = false;
    const interior = car.model.meshes.interior;
    const iv = interior?.visible;
    if (interior) interior.visible = false;
    renderer.setRenderTarget(this.mirrorRT);
    renderer.render(scene, cam);
    renderer.setRenderTarget(prev);
    this.group.visible = true;
    if (interior) interior.visible = iv;
  }

  /* ------------------------------------------------------------------ displays */
  _drawGauges(P, ctx) {
    const c = this.gaugeCanvas.getContext('2d');
    const W = c.canvas.width, H = c.canvas.height;
    const units = ctx.units;
    const sp = units === 'kmh' ? P.speed * MS_TO_KMH : P.speed * MS_TO_MPH;
    const red = this.def.phys.redline;
    const maxR = Math.ceil((this.def.phys.limiter + 500) / 1000) * 1000;
    const frac = clamp(P.rpm / maxR, 0, 1);
    const shift = P.rpm > red * 0.97;
    const flash = shift && performance.now() % 140 < 70;
    // background: deep blue with a faint hex lattice
    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#071a3a');
    bg.addColorStop(0.55, '#0b2a63');
    bg.addColorStop(1, '#04102a');
    c.fillStyle = '#000';
    c.fillRect(0, 0, W, H);
    // angular frame (hexagon) — blue on the left, red on the right
    const fx0 = 70, fx1 = W - 70, fy0 = 26, fy1 = H - 34, cut = 70;
    const hex = () => {
      c.beginPath();
      c.moveTo(fx0 + cut, fy0); c.lineTo(fx1 - cut, fy0); c.lineTo(fx1, (fy0 + fy1) / 2);
      c.lineTo(fx1 - cut, fy1); c.lineTo(fx0 + cut, fy1); c.lineTo(fx0, (fy0 + fy1) / 2); c.closePath();
    };
    hex();
    c.fillStyle = bg;
    c.fill();
    c.save();
    hex();
    c.clip();
    c.strokeStyle = 'rgba(80,140,255,0.08)';
    c.lineWidth = 1;
    for (let y = fy0; y < fy1; y += 22) for (let x = fx0 + ((y / 22) % 2) * 19; x < fx1; x += 38) {
      c.beginPath();
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; c.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); }
      c.closePath();
      c.stroke();
    }
    // rpm sweep along the top of the frame
    const segs = 40;
    for (let i = 0; i < segs; i++) {
      const f = i / segs;
      const x = fx0 + cut + 10 + f * (fx1 - fx0 - 2 * cut - 20);
      const on = f < frac;
      const r = (f * maxR) >= red;
      c.fillStyle = on ? (flash ? '#ffffff' : r ? '#ff2a3d' : f > 0.7 ? '#ffb02e' : '#5fd0ff') : r ? 'rgba(255,42,61,0.22)' : 'rgba(120,170,255,0.16)';
      c.beginPath();
      c.moveTo(x, fy0 + 8); c.lineTo(x + 14, fy0 + 8); c.lineTo(x + 11, fy0 + 30); c.lineTo(x - 3, fy0 + 30);
      c.closePath();
      c.fill();
    }
    c.fillStyle = 'rgba(210,225,255,0.75)';
    c.font = '600 18px "Barlow Condensed", Arial, sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    for (let k = 0; k <= maxR / 1000; k++) {
      const x = fx0 + cut + 10 + (k * 1000 / maxR) * (fx1 - fx0 - 2 * cut - 20);
      c.fillText(String(k), x, fy0 + 46);
    }
    c.restore();
    c.lineWidth = 5;
    c.strokeStyle = '#2f7dff';
    c.beginPath(); c.moveTo(W / 2, fy0); c.lineTo(fx0 + cut, fy0); c.lineTo(fx0, (fy0 + fy1) / 2); c.lineTo(fx0 + cut, fy1); c.lineTo(W / 2, fy1); c.stroke();
    c.strokeStyle = flash ? '#ffffff' : '#ff2a3d';
    c.beginPath(); c.moveTo(W / 2, fy0); c.lineTo(fx1 - cut, fy0); c.lineTo(fx1, (fy0 + fy1) / 2); c.lineTo(fx1 - cut, fy1); c.lineTo(W / 2, fy1); c.stroke();
    // speed (left-centre) and gear (right)
    c.textAlign = 'right';
    c.fillStyle = '#f3f7ff';
    c.font = '700 120px "Barlow Condensed", Arial, sans-serif';
    c.fillText(String(Math.round(sp)), W / 2 + 40, H / 2 + 28);
    c.textAlign = 'left';
    c.fillStyle = '#8fb6ff';
    c.font = '600 26px "Barlow Condensed", Arial, sans-serif';
    c.fillText(units === 'kmh' ? 'km/h' : 'mph', W / 2 + 50, H / 2 + 58);
    const gx = fx1 - cut - 70, gy = H / 2 + 22;
    c.strokeStyle = '#ff2a3d';
    c.lineWidth = 3;
    c.strokeRect(gx - 42, gy - 58, 84, 104);
    c.fillStyle = '#ffffff';
    c.textAlign = 'center';
    c.font = '700 92px "Barlow Condensed", Arial, sans-serif';
    c.fillText(P.gear === -1 ? 'R' : P.gear === 0 ? 'N' : String(P.gear), gx, gy);
    c.fillStyle = '#8fb6ff';
    c.font = '600 20px "Barlow Condensed", Arial, sans-serif';
    c.fillText(ctx.manual ? 'MANUAL' : 'SPORT', gx, gy + 62);
    // left column: boost / drive mode
    c.textAlign = 'left';
    const lx = fx0 + cut - 10;
    c.fillStyle = '#8fb6ff';
    c.font = '600 20px "Barlow Condensed", Arial, sans-serif';
    c.fillText(P.isTurbo ? 'BOOST' : 'OIL', lx, H / 2 - 30);
    c.fillStyle = 'rgba(120,170,255,0.2)';
    c.fillRect(lx, H / 2 - 12, 150, 10);
    c.fillStyle = P.isTurbo ? '#5fd0ff' : '#7cff9a';
    c.fillRect(lx, H / 2 - 12, 150 * (P.isTurbo ? clamp(P.boost, 0, 1) : 0.62), 10);
    c.fillStyle = '#8fb6ff';
    c.fillText('FUEL', lx, H / 2 + 26);
    c.fillStyle = 'rgba(120,170,255,0.2)';
    c.fillRect(lx, H / 2 + 44, 150, 10);
    c.fillStyle = '#e9f0ff';
    c.fillRect(lx, H / 2 + 44, 150 * 0.71, 10);
    // bottom strip: time, odometer, range
    const hrs = ctx.hours ?? 12;
    const hh = Math.floor(hrs), mm = Math.floor((hrs - hh) * 60);
    c.fillStyle = '#cfdcff';
    c.font = '600 22px "Barlow Condensed", Arial, sans-serif';
    c.textAlign = 'center';
    c.fillText(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, W / 2 - 220, fy1 - 22);
    const odo = units === 'kmh' ? this.odo : this.odo * 0.6214;
    c.fillText(`${Math.floor(odo).toLocaleString()} ${units === 'kmh' ? 'km' : 'mi'}`, W / 2, fy1 - 22);
    c.fillText(`RANGE ${units === 'kmh' ? 412 : 256}`, W / 2 + 220, fy1 - 22);
    if (flash) {
      c.fillStyle = 'rgba(255,40,60,0.18)';
      hex();
      c.fill();
    }
    this.gaugeTex.needsUpdate = true;
  }

  _drawHud(P, ctx) {
    const c = this.hudCanvas.getContext('2d');
    const W = c.canvas.width, H = c.canvas.height;
    c.clearRect(0, 0, W, H);
    const units = ctx.units;
    const sp = units === 'kmh' ? P.speed * MS_TO_KMH : P.speed * MS_TO_MPH;
    const red = this.def.phys.redline;
    c.fillStyle = '#d9f5ff';
    c.textAlign = 'right';
    c.textBaseline = 'middle';
    c.font = '700 92px "Barlow Condensed", Arial, sans-serif';
    c.fillText(String(Math.round(sp)), W / 2 + 30, H / 2 + 4);
    c.textAlign = 'left';
    c.font = '600 26px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = '#9fdcff';
    c.fillText(units === 'kmh' ? 'km/h' : 'mph', W / 2 + 40, H / 2 + 26);
    c.font = '700 46px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = P.rpm > red * 0.97 ? '#ff5a6a' : '#d9f5ff';
    c.fillText(P.gear === -1 ? 'R' : String(P.gear), W / 2 + 40, H / 2 - 18);
    // short rpm bar
    const f = clamp(P.rpm / (this.def.phys.limiter + 300), 0, 1);
    for (let i = 0; i < 14; i++) {
      const on = i / 14 < f;
      c.fillStyle = on ? (i > 10 ? '#ff5a6a' : '#7fe3ff') : 'rgba(127,227,255,0.12)';
      c.fillRect(70 + i * 12, H / 2 - 8, 8, 16);
    }
    this.hudTex.needsUpdate = true;
  }

  _drawNav(car, ctx) {
    const c = this.navCanvas.getContext('2d');
    const W = c.canvas.width, H = c.canvas.height;
    const MW = Math.round(W * 0.64);
    // map
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#0d1520');
    g.addColorStop(1, '#070b11');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
    c.save();
    c.beginPath();
    c.rect(0, 40, MW, H - 40);
    c.clip();
    c.strokeStyle = 'rgba(90,120,150,0.12)';
    c.lineWidth = 2;
    for (let i = -10; i < 20; i++) {
      c.beginPath(); c.moveTo(i * 60, 40); c.lineTo(i * 60 + 300, H); c.stroke();
      c.beginPath(); c.moveTo(0, 60 + i * 50); c.lineTo(MW, 20 + i * 50); c.stroke();
    }
    const road = ctx.road;
    const s0 = car.proj.s;
    const base = road.sample(s0, {});
    const ch = Math.cos(base.H), sh = Math.sin(base.H);
    const tmp = {};
    const path = () => {
      c.beginPath();
      for (let i = 0; i <= 34; i++) {
        road.sample(s0 - 120 + i * 25, tmp);
        const dX = tmp.X - base.X, dY = tmp.Y - base.Y;
        const lx = dX * ch - dY * sh, ly = dX * sh + dY * ch;
        const px = MW / 2 + lx * 0.5, py = H * 0.8 - ly * 0.5;
        if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
      }
    };
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = '#2c3a4c';
    c.lineWidth = 44;
    path(); c.stroke();
    c.strokeStyle = '#3b8cff';
    c.lineWidth = 12;
    path(); c.stroke();
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.moveTo(MW / 2, H * 0.8 - 22);
    c.lineTo(MW / 2 + 15, H * 0.8 + 14);
    c.lineTo(MW / 2, H * 0.8 + 5);
    c.lineTo(MW / 2 - 15, H * 0.8 + 14);
    c.fill();
    c.restore();
    // right panel: next manoeuvre, media
    c.fillStyle = '#0f151d';
    c.fillRect(MW, 40, W - MW, H - 40);
    c.fillStyle = '#e9edf1';
    c.textAlign = 'left';
    c.textBaseline = 'middle';
    c.font = '700 44px "Barlow Condensed", Arial, sans-serif';
    c.fillText('↑  12 mi', MW + 26, 104);
    c.font = '500 24px "Barlow Condensed", Arial, sans-serif';
    c.fillStyle = '#8b98a8';
    c.fillText('Continue on freeway', MW + 26, 146);
    c.fillStyle = '#18212c';
    c.fillRect(MW + 20, 190, W - MW - 40, 1);
    c.fillStyle = '#e9edf1';
    c.font = '600 26px "Barlow Condensed", Arial, sans-serif';
    c.fillText('NO HESI FM 104.7', MW + 26, 236);
    c.fillStyle = '#8b98a8';
    c.font = '500 22px "Barlow Condensed", Arial, sans-serif';
    c.fillText('Night Drive Mix', MW + 26, 268);
    const prog = (this.tripT % 214) / 214;
    c.fillStyle = '#26303c';
    c.fillRect(MW + 26, 300, W - MW - 52, 6);
    c.fillStyle = '#3b8cff';
    c.fillRect(MW + 26, 300, (W - MW - 52) * prog, 6);
    c.font = '600 34px Arial, sans-serif';
    c.fillStyle = '#d9dee4';
    c.textAlign = 'center';
    const mid = MW + (W - MW) / 2;
    c.fillText('⏮', mid - 80, 370);
    c.fillText('⏸', mid, 370);
    c.fillText('⏭', mid + 80, 370);
    // top status bar
    c.fillStyle = '#05080c';
    c.fillRect(0, 0, W, 40);
    c.fillStyle = '#e9edf1';
    c.font = '600 22px "Barlow Condensed", Arial, sans-serif';
    c.textAlign = 'left';
    const hrs = ctx.hours ?? 12;
    const hh = Math.floor(hrs), mm = Math.floor((hrs - hh) * 60);
    c.fillText(`${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`, 18, 21);
    c.textAlign = 'right';
    c.fillText('72°F   LTE ▮▮▮', W - 18, 21);
    // bottom dock
    c.fillStyle = 'rgba(5,8,12,0.85)';
    c.fillRect(0, H - 54, MW, 54);
    c.textAlign = 'center';
    c.font = '600 22px "Barlow Condensed", Arial, sans-serif';
    const items = ['NAV', 'MEDIA', 'PHONE', 'CAR', 'CLIMATE'];
    items.forEach((t, i) => {
      c.fillStyle = i === 0 ? '#3b8cff' : '#aab4c0';
      c.fillText(t, (i + 0.5) * (MW / items.length), H - 26);
    });
    this.navTex.needsUpdate = true;
  }
}
