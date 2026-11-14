// Impulse-based collision response: player vs barriers, player vs traffic (2D oriented boxes).
import { clamp } from '../core/utils.js';

const cr = (rx, ry, nx, ny) => ry * nx - rx * ny; // clockwise-positive 2D cross product
const tmp = {};

function applyContact(P, rx, ry, nx, ny, e, mu, invOther, vOther = [0, 0]) {
  const [vx0, vy0] = P.pointVelocity(rx, ry);
  const vx = vx0 - vOther[0], vy = vy0 - vOther[1];
  const vn = vx * nx + vy * ny;
  if (vn >= 0) return { j: 0, vn: 0, vt: 0 };
  const crn = cr(rx, ry, nx, ny);
  const j = (-(1 + e) * vn) / (1 / P.m + (crn * crn) / P.Iz + invOther);
  P.applyImpulse(j * nx, j * ny, rx, ry);
  // friction along the tangent
  const tx = -ny, ty = nx;
  const vt = vx * tx + vy * ty;
  const crt = cr(rx, ry, tx, ty);
  let jt = -vt / (1 / P.m + (crt * crt) / P.Iz + invOther);
  jt = clamp(jt, -mu * j, mu * j);
  P.applyImpulse(jt * tx, jt * ty, rx, ry);
  return { j, jt, vn: -vn, vt: Math.abs(vt), tx, ty };
}

/** Barrier collisions. Returns { severity, scrape, point:[X,Y], normal } or null. */
export function wallCollision(car, road, layout) {
  const P = car.phys;
  const corners = car.corners();
  const right = layout.wallD - 0.32, left = 0.32;
  let best = null;
  for (const [cx, cy] of corners) {
    const pr = road.project(cx, cy, car.proj.s, tmp);
    const ch = Math.cos(pr.H), sh = Math.sin(pr.H);
    let pen = 0, nx = 0, ny = 0;
    if (pr.d > right) { pen = pr.d - right; nx = -ch; ny = sh; }
    else if (pr.d < left) { pen = left - pr.d; nx = ch; ny = -sh; }
    if (pen > 0 && (!best || pen > best.pen)) best = { pen, nx, ny, cx, cy };
  }
  if (!best) return null;
  P.X += best.nx * best.pen;
  P.Y += best.ny * best.pen;
  const rx = best.cx - P.X, ry = best.cy - P.Y;
  const r = applyContact(P, rx, ry, best.nx, best.ny, 0.12, 0.45, 0);
  return { severity: r.vn, scrape: P.speed > 2 ? clamp(P.speed / 30, 0, 1) : 0, point: [best.cx, best.cy], normal: [best.nx, best.ny] };
}

function obb(X, Y, H, hw, hl) {
  const fx = Math.sin(H), fy = Math.cos(H), rx = Math.cos(H), ry = -Math.sin(H);
  return {
    X, Y, fx, fy, rx, ry, hw, hl,
    corners: [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([a, b]) => [X + fx * hl * a + rx * hw * b, Y + fy * hl * a + ry * hw * b]),
  };
}

function project(box, ax, ay) {
  const c = box.X * ax + box.Y * ay;
  const r = box.hl * Math.abs(box.fx * ax + box.fy * ay) + box.hw * Math.abs(box.rx * ax + box.ry * ay);
  return [c - r, c + r];
}

function inside(box, px, py) {
  const dx = px - box.X, dy = py - box.Y;
  return Math.abs(dx * box.fx + dy * box.fy) <= box.hl && Math.abs(dx * box.rx + dy * box.ry) <= box.hw;
}

/** Player vs traffic. Returns array of { car, severity, point }. */
export function trafficCollisions(car, traffic, road) {
  const P = car.phys;
  const hits = [];
  const ps = car.proj.s, pd = car.proj.d;
  const A = obb(P.X, P.Y, P.heading, car.halfW, car.halfL);
  for (const c of traffic.cars) {
    if (Math.abs(c.s - ps) > c.len / 2 + car.halfL + 2) continue;
    if (Math.abs(c.d - pd) > c.wid / 2 + car.halfW + 1.5) continue;
    const p = road.pos(c.s, c.d, tmp);
    const H = p.H + c.yaw;
    const B = obb(p.X, p.Y, H, c.wid / 2, c.len / 2);
    let minO = Infinity, nx = 0, ny = 0;
    let sep = false;
    for (const [ax, ay] of [[A.fx, A.fy], [A.rx, A.ry], [B.fx, B.fy], [B.rx, B.ry]]) {
      const [a0, a1] = project(A, ax, ay), [b0, b1] = project(B, ax, ay);
      const o = Math.min(a1, b1) - Math.max(a0, b0);
      if (o <= 0) { sep = true; break; }
      if (o < minO) {
        minO = o;
        const dir = (A.X - B.X) * ax + (A.Y - B.Y) * ay;
        nx = dir >= 0 ? ax : -ax;
        ny = dir >= 0 ? ay : -ay;
      }
    }
    if (sep) continue;
    // contact point
    let cx = 0, cy = 0, n = 0;
    for (const q of A.corners) if (inside(B, q[0], q[1])) { cx += q[0]; cy += q[1]; n++; }
    for (const q of B.corners) if (inside(A, q[0], q[1])) { cx += q[0]; cy += q[1]; n++; }
    if (n) { cx /= n; cy /= n; } else { cx = (A.X + B.X) / 2; cy = (A.Y + B.Y) / 2; }
    // positional correction (traffic is mostly immovable)
    P.X += nx * minO * 0.95;
    P.Y += ny * minO * 0.95;
    const vT = [Math.sin(p.H) * c.speed + Math.cos(p.H) * c.vd, Math.cos(p.H) * c.speed - Math.sin(p.H) * c.vd];
    const r = applyContact(P, cx - P.X, cy - P.Y, nx, ny, 0.22, 0.3, 1 / c.mass, vT);
    if (r.j > 0) {
      // reaction on the traffic car, expressed in its road frame
      const jx = -(r.j * nx) / c.mass, jy = -(r.j * ny) / c.mass;
      const dS = jx * Math.sin(p.H) + jy * Math.cos(p.H);
      const dD = jx * Math.cos(p.H) - jy * Math.sin(p.H);
      traffic.impact(c, dS, dD);
    }
    hits.push({ car: c, severity: r.vn, point: [cx, cy] });
  }
  return hits;
}
