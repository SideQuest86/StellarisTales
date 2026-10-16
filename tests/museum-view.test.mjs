// Opening view of exhibit models (src/museum-view.js): flat models face the camera, manifest overrides win.
import { test } from "node:test";
import assert from "node:assert/strict";
import { openingView, cameraPosition } from "../src/museum-view.js";

const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-6);

test("a solid model opens at the usual three-quarter view", () => {
  const v = openingView([1, 0.9, 0.8]);
  assert.deepEqual(v, { azimuth: 13, elevation: 10, distance: 2.6 });
  const [x, y, z] = cameraPosition(v);
  assert.ok(x > 2.4 && y > 0.4 && z > 0.5);
});

test("a thin model faces the camera along its thinnest axis", () => {
  // Thin along Z (a map or blueprint standing sideways): the camera moves round to the +Z side, not edge-on from +X.
  const map = cameraPosition(openingView([1.3, 0.9, 0.03]));
  assert.ok(Math.abs(map[2]) > 5 * Math.abs(map[0]));
  // Thin along X (a relief facing the icon's view): face-on from +X.
  const relief = cameraPosition(openingView([0.05, 1.1, 1.1]));
  assert.ok(relief[0] > 5 * Math.abs(relief[2]));
  // Lying flat (thin along Y): from above.
  const flat = cameraPosition(openingView([1.1, 0.05, 1.1]));
  assert.ok(flat[1] > flat[0]);
});

test("a per-model view from the manifest overrides each value it gives", () => {
  assert.deepEqual(openingView([1, 1, 1], { azimuth: -40, distance: 3.2 }), { azimuth: -40, elevation: 10, distance: 3.2 });
  assert.ok(near(cameraPosition({ azimuth: 0, elevation: 0, distance: 2 }), [2, 0, 0]));
  assert.ok(near(cameraPosition({ azimuth: 90, elevation: 0, distance: 2 }), [0, 0, 2]));
});
