import test from "node:test";
import assert from "node:assert/strict";
import {
  wrap,
  damp,
  breath,
  selectionWave,
  Momentum,
  inverseProjection,
} from "../src/archive-motion.js";
import { nextTrack } from "../src/audio-player.js";
test("continuous tracks wrap at both ends and playlist loops", () => {
  assert.equal(wrap(-1, 8), 7);
  assert.equal(wrap(8, 8), 0);
  assert.equal(nextTrack(22, 1, 23), 0);
  assert.equal(nextTrack(0, -1, 23), 22);
});
test("faster release travels further before snapping, and springs preserve reversal velocity", () => {
  const slow = new Momentum(0, 2),
    fast = new Momentum(0, 12);
  for (let i = 0; i < 800; i++) {
    slow.step(1 / 60);
    fast.step(1 / 60);
  }
  assert.ok(slow.done && fast.done);
  assert.ok(fast.value > slow.value + 1);
  const s = { value: 3, velocity: 5 };
  damp(s, -2, 7, 1 / 60);
  assert.ok(s.value !== -2);
  assert.ok(Number.isFinite(s.velocity));
});
test("breathing persists at idle and selection generates a propagating wave", () => {
  assert.notEqual(breath(0, 0, 1), breath(0, 0, 2));
  assert.ok(Math.abs(breath(2, 1, 12)) <= 0.125);
  assert.notEqual(selectionWave(2, 0.4), selectionWave(7, 0.4));
  assert.equal(selectionWave(1, 4), 0);
});
test("free-plane drag inverts both camera-projected tracks", () => {
  const lane = { x: 80, y: 20 },
    row = { x: 12, y: -35 },
    inv = inverseProjection(lane, row);
  const point = { x: lane.x * 2 + row.x * 3, y: lane.y * 2 + row.y * 3 };
  assert.ok(Math.abs(point.x * inv.lane.x + point.y * inv.lane.y - 2) < 1e-8);
  assert.ok(Math.abs(point.x * inv.row.x + point.y * inv.row.y - 3) < 1e-8);
});
