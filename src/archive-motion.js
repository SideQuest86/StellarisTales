// Inspired by RhineLabUI's continuous tracks, critically damped springs and waves.
export const wrap = (n, length) => ((n % length) + length) % length;
export const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
/** Quintic smoothstep: zero velocity and acceleration at both ends. */
export const smooth = (t) => {
  t = clamp01(t);
  return t * t * t * (10 + t * (-15 + 6 * t));
};
export const easeInOutCubic = (t) => {
  t = clamp01(t);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
/**
 * Breathing envelope: rises after input, fades after `idle` seconds so the
 * render loop can stop instead of animating an unattended page forever.
 */
export function idleEnvelope(sinceInput, idle = 9, fade = 1.6) {
  if (sinceInput < 0) return 0;
  return smooth(sinceInput / 1.2) * (1 - smooth((sinceInput - idle) / fade));
}
/**
 * Milliseconds until a frame-rate cap allows the next draw (0: draw now; fps 0 = uncapped). The gap is 0.8 of the
 * period so capped draws land on whole display refreshes (e.g. every 3rd at 170 Hz for 60 fps) instead of jittering.
 */
export function capDelay(now, lastDraw, fps) {
  if (!fps) return 0;
  return Math.max(0, lastDraw + 800 / fps - now);
}
/** Frame-time governor for adaptive resolution (all times in ms). */
export class FrameGovernor {
  constructor({ budget = 20, slowFrames = 40, fastFrames = 240 } = {}) {
    Object.assign(this, { budget, slowFrames, fastFrames, slow: 0, fast: 0, ema: 0 });
  }
  /** Returns -1 to lower resolution, +1 to raise it, 0 to keep. */
  sample(interval) {
    if (!(interval > 0) || interval > 250) return 0; // tab switches, first frames
    this.ema = this.ema ? this.ema * 0.9 + interval * 0.1 : interval;
    if (this.ema > this.budget) {
      this.fast = 0;
      if (++this.slow >= this.slowFrames) {
        this.slow = 0;
        this.ema = 0;
        return -1;
      }
    } else if (this.ema < this.budget * 0.55) {
      this.slow = 0;
      if (++this.fast >= this.fastFrames) {
        this.fast = 0;
        return 1;
      }
    } else this.slow = Math.max(0, this.slow - 1);
    return 0;
  }
}
export function damp(s, target, rate, dt) {
  const delta = s.value - target,
    impulse = s.velocity + rate * delta,
    decay = Math.exp(-rate * dt);
  s.value = target + (delta + impulse * dt) * decay;
  s.velocity = (s.velocity - rate * impulse * dt) * decay;
}
export const breath = (row, lane, time) =>
  0.09 * Math.sin(time * 0.78 + row * 0.27 - lane * 0.48) +
  0.035 * Math.sin(time * 0.47 - row * 0.19 + lane * 0.31);
export function selectionWave(distance, age) {
  if (age < 0 || age > 3) return 0;
  const phase = distance - age * 7;
  return (
    0.5 *
    (1 - Math.exp(-age * 10)) *
    Math.exp(-age * 1.3) *
    Math.cos(phase * 0.8) *
    Math.exp((-phase * phase) / 18)
  );
}
export class Momentum {
  constructor(value, velocity) {
    this.value = value;
    this.velocity = velocity;
    this.target = Math.round(value);
    this.coasting = Math.abs(velocity) > 0.65;
    this.done = false;
  }
  step(dt) {
    if (this.coasting) {
      const decay = Math.exp(-3.4 * dt);
      this.value += (this.velocity * (1 - decay)) / 3.4;
      this.velocity *= decay;
      if (Math.abs(this.velocity) < 0.6) {
        this.coasting = false;
        this.target = Math.round(this.value + this.velocity / 3.4);
      }
    } else {
      damp(this, this.target, 11, dt);
      if (
        Math.abs(this.target - this.value) < 0.001 &&
        Math.abs(this.velocity) < 0.01
      ) {
        this.value = this.target;
        this.velocity = 0;
        this.done = true;
      }
    }
  }
}
export function inverseProjection(lane, row) {
  const determinant = lane.x * row.y - row.x * lane.y;
  if (Math.abs(determinant) < 0.01) return null;
  return {
    lane: { x: row.y / determinant, y: -row.x / determinant },
    row: { x: -lane.y / determinant, y: lane.x / determinant },
  };
}
