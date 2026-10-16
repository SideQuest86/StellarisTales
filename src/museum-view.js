// Opening view of an exhibit model (pure: used by src/museum-viewer.js, tested in tests/museum.test.mjs).

const DISTANCE = 2.6; // default camera distance (inside OrbitControls' 1.1..6)

/**
 * Opening view for a model: { azimuth, elevation, distance } in degrees / scene units. Azimuth 0 looks from +X (the
 * side the icon shows: generate-models-v2.py rotates the icon's view to +X), positive turns towards +Z. A per-model
 * `view` in the manifest wins; otherwise a thin, flat model (a map, a plaque, a blueprint) is viewed face-on along its
 * thinnest axis, and anything else gets the usual three-quarter view.
 */
export function openingView(extents, view) {
  const [x, y, z] = extents;
  const longest = Math.max(x, y, z) || 1;
  let azimuth = 13, elevation = 10;
  if (Math.min(x, y, z) / longest < 0.3) {
    if (y <= x && y <= z) { azimuth = 0; elevation = 62; } // lying flat: from above, front edge nearest
    else if (z < x) { azimuth = 90 - 8; elevation = 8; } // thin along Z: face the +Z side
    else { azimuth = 6; elevation = 8; } // thin along X: face-on, barely turned
  }
  return {
    azimuth: Number.isFinite(view?.azimuth) ? view.azimuth : azimuth,
    elevation: Number.isFinite(view?.elevation) ? view.elevation : elevation,
    distance: Number.isFinite(view?.distance) ? view.distance : DISTANCE,
  };
}

/** Camera position for an opening view (target at the origin). */
export function cameraPosition({ azimuth, elevation, distance }) {
  const a = (azimuth * Math.PI) / 180, e = (elevation * Math.PI) / 180;
  return [distance * Math.cos(e) * Math.cos(a), distance * Math.sin(e), distance * Math.cos(e) * Math.sin(a)];
}
