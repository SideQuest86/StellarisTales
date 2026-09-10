// Inspired by RhineLabUI's continuous tracks, critically damped springs and waves.
export const wrap = (n, length) => ((n % length) + length) % length;
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
