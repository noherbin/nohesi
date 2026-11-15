// Keyboard + gamepad input with held controls and edge-triggered actions.
import { clamp } from './utils.js';

const KEYMAP = {
  KeyW: 'throttle', ArrowUp: 'throttle',
  KeyS: 'brake', ArrowDown: 'brake',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  Space: 'handbrake',
  KeyC: 'camera', KeyR: 'reset', Escape: 'pause', KeyP: 'pause',
  ShiftLeft: 'gearUp', ShiftRight: 'gearUp', KeyE: 'gearUp',
  ControlLeft: 'gearDown', ControlRight: 'gearDown', KeyQ: 'gearDown',
  KeyB: 'lookBack', KeyH: 'hud', KeyM: 'music', KeyF: 'fullscreen',
  KeyZ: 'indLeft', KeyX: 'indRight', KeyL: 'dome',
};
const PREVENT = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ControlLeft', 'ControlRight']);

export class Input {
  constructor() {
    this.held = new Set();
    this.queue = [];
    this.enabled = true;
    this.pad = null;
    this.padPrev = [];
    this.padActive = false;
    this.lastPadUse = 0;
    window.addEventListener('keydown', (e) => {
      const a = KEYMAP[e.code];
      const typing = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA');
      if (typing && e.code !== 'Escape') return;
      if (a && this.captureKeys && (PREVENT.has(e.code) || e.ctrlKey)) e.preventDefault();
      if (!a) return;
      this.padActive = false;
      if (!e.repeat) this.queue.push(a);
      this.held.add(a);
    }, { passive: false });
    window.addEventListener('keyup', (e) => {
      const a = KEYMAP[e.code];
      if (a) this.held.delete(a);
      // releasing one of two keys bound to the same action
      if (a) for (const [code, act] of Object.entries(KEYMAP)) if (act === a && code !== e.code && this._down?.has(code)) this.held.add(a);
    });
    this._down = new Set();
    window.addEventListener('keydown', (e) => this._down.add(e.code));
    window.addEventListener('keyup', (e) => this._down.delete(e.code));
    window.addEventListener('blur', () => { this.held.clear(); this._down.clear(); });
    window.addEventListener('gamepadconnected', (e) => { this.padName = e.gamepad.id; });
    this.captureKeys = false;
  }

  /** Returns true once per press of the given action. */
  take(action) {
    const i = this.queue.indexOf(action);
    if (i >= 0) { this.queue.splice(i, 1); return true; }
    return false;
  }

  flush() { this.queue.length = 0; }

  isHeld(a) { return this.held.has(a) || (this.padHeld && this.padHeld.has(a)); }

  poll() {
    let pads = [];
    try {
      pads = navigator.getGamepads ? navigator.getGamepads() || [] : [];
    } catch (e) {
      pads = []; // gamepads can be blocked by the embedding page's permissions policy
    }
    let pad = null;
    for (const p of pads) if (p && p.connected) { pad = p; break; }
    this.pad = pad;
    this.padHeld = new Set();
    if (!pad) return;
    const b = pad.buttons.map((x) => x.pressed);
    const edge = (i) => b[i] && !this.padPrev[i];
    const map = { 0: 'handbrake', 1: 'lookBack', 2: 'reset', 3: 'camera', 4: 'gearDown', 5: 'gearUp', 9: 'pause', 8: 'hud' };
    for (const [i, a] of Object.entries(map)) {
      if (b[i]) this.padHeld.add(a);
      if (edge(+i)) { this.queue.push(a); this.padActive = true; }
    }
    // menu navigation
    if (edge(12)) this.queue.push('navUp');
    if (edge(13)) this.queue.push('navDown');
    if (edge(14)) this.queue.push('navLeft');
    if (edge(15)) this.queue.push('navRight');
    if (edge(0)) this.queue.push('confirm');
    if (edge(1)) this.queue.push('back');
    const ax = pad.axes[0] || 0;
    const ay = pad.axes[1] || 0;
    if (Math.abs(ay) > 0.6 && !(this._stickY)) { this.queue.push(ay < 0 ? 'navUp' : 'navDown'); this._stickY = true; }
    if (Math.abs(ay) < 0.3) this._stickY = false;
    if (Math.abs(ax) > 0.2 || (pad.buttons[7]?.value ?? 0) > 0.1 || (pad.buttons[6]?.value ?? 0) > 0.1) this.padActive = true;
    this.padPrev = b;
  }

  /** Continuous driving controls. */
  controls() {
    const kb = {
      throttle: this.held.has('throttle') ? 1 : 0,
      brake: this.held.has('brake') ? 1 : 0,
      steer: (this.held.has('right') ? 1 : 0) - (this.held.has('left') ? 1 : 0),
      handbrake: this.held.has('handbrake'),
      analog: false,
    };
    const pad = this.pad;
    if (pad && this.padActive) {
      let x = pad.axes[0] || 0;
      const dz = 0.07;
      x = Math.abs(x) < dz ? 0 : Math.sign(x) * (Math.abs(x) - dz) / (1 - dz);
      x = Math.sign(x) * Math.pow(Math.abs(x), 1.6);
      const thr = pad.buttons[7]?.value ?? 0;
      const brk = pad.buttons[6]?.value ?? 0;
      return {
        throttle: Math.max(kb.throttle, thr),
        brake: Math.max(kb.brake, brk),
        steer: kb.steer !== 0 ? kb.steer : clamp(x, -1, 1),
        analog: kb.steer === 0,
        handbrake: kb.handbrake || this.padHeld.has('handbrake'),
      };
    }
    return kb;
  }
}
