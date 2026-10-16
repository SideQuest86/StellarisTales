// Reading progress persistence. Pure helpers (normalize, reconcile) have no DOM or storage dependency; save/load/clear
// wrap localStorage in try/catch so blocked, throwing or full storage degrades to in-memory reading.
export const KEY = "st-progress";
export const VERSION = 1;
export const LIMITS = { trail: 200, visited: 2000, assumptions: 200, sets: 50, id: 200, reading: 1000 };

const isId = (v) => typeof v === "string" && v.length > 0 && v.length <= LIMITS.id;
const isIndex = (v) => Number.isInteger(v) && v >= 0 && v < LIMITS.reading;
const isPlain = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/** Strictly validates a parsed storage value. Returns a clean state {trail, assumptions, visited} or null. */
export function normalize(raw) {
  if (!isPlain(raw) || raw.v !== VERSION) return null;
  if (!Array.isArray(raw.trail) || !raw.trail.length || raw.trail.length > LIMITS.trail) return null;
  const trail = [];
  for (const s of raw.trail) {
    if (!isPlain(s) || !isId(s.story) || !isId(s.chapter)) return null;
    const step = { story: s.story, chapter: s.chapter };
    if (s.sets !== undefined) {
      if (!Array.isArray(s.sets) || s.sets.length > LIMITS.sets || !s.sets.every(isId)) return null;
      if (s.sets.length) step.sets = [...s.sets];
    }
    if (s.choice !== undefined) {
      if (!isId(s.choice)) return null;
      step.choice = s.choice;
      if (s.choiceIndex !== undefined) { if (!isIndex(s.choiceIndex)) return null; step.choiceIndex = s.choiceIndex; }
      if (s.reading !== undefined) { if (!isIndex(s.reading)) return null; step.reading = s.reading; }
    } else if (s.choiceIndex !== undefined || s.reading !== undefined) {
      // a reading position without a choice carries no information worth restoring
      if ((s.choiceIndex !== undefined && !isIndex(s.choiceIndex)) || (s.reading !== undefined && !isIndex(s.reading))) return null;
    }
    trail.push(step);
  }
  const assumptions = {};
  if (raw.assumptions !== undefined) {
    if (!isPlain(raw.assumptions)) return null;
    const keys = Object.keys(raw.assumptions);
    if (keys.length > LIMITS.assumptions) return null;
    for (const k of keys) {
      const v = raw.assumptions[k];
      if (!isId(k) || !(typeof v === "boolean" || typeof v === "number" || (typeof v === "string" && v.length <= LIMITS.id))) return null;
      assumptions[k] = v;
    }
  }
  const visited = [];
  if (raw.visited !== undefined) {
    if (!Array.isArray(raw.visited) || raw.visited.length > LIMITS.visited || !raw.visited.every(isId)) return null;
    visited.push(...new Set(raw.visited));
  }
  return { trail, assumptions, visited };
}

/**
 * Checks a normalized state against the loaded stories (Map id -> story JSON with chapters[]). The trail is cut at the
 * first step whose story or chapter no longer exists; selections whose choice key vanished are dropped. Never invents
 * steps. Returns the reconciled state or null when nothing valid remains.
 */
export function reconcile(state, stories) {
  if (!state) return null;
  const trail = [];
  for (const s of state.trail) {
    const chapter = stories.get(s.story)?.chapters?.find((c) => c.id === s.chapter);
    if (!chapter) break;
    const step = { story: s.story, chapter: s.chapter };
    if (s.sets) step.sets = s.sets;
    if (s.choice !== undefined) {
      const choices = chapter.choices || [];
      const at = choices[s.choiceIndex];
      const index = at?.key === s.choice ? s.choiceIndex : choices.findIndex((c) => c.key === s.choice);
      if (index >= 0) {
        step.choice = s.choice;
        step.choiceIndex = index;
        if (s.reading !== undefined) step.reading = s.reading;
      }
    }
    trail.push(step);
  }
  if (!trail.length) return null;
  const known = new Set();
  for (const s of trail) for (const c of stories.get(s.story).chapters) known.add(c.id);
  return { trail, assumptions: { ...state.assumptions }, visited: state.visited.filter((id) => known.has(id)) };
}

export function serialize(state, now = Date.now()) {
  return JSON.stringify({ v: VERSION, savedAt: now, trail: state.trail, assumptions: state.assumptions, visited: state.visited });
}

/** Parses stored text; any problem (bad JSON, wrong version/shape) yields null. */
export function parse(text) {
  try { return normalize(JSON.parse(text)); } catch { return null; }
}

export function save(state, storage) {
  try {
    const s = storage ?? globalThis.localStorage;
    const normalized = normalize({ v: VERSION, ...state });
    if (!normalized) return false;
    s.setItem(KEY, serialize(normalized));
    return true;
  } catch { return false; }
}

export function load(storage) {
  try {
    const text = (storage ?? globalThis.localStorage).getItem(KEY);
    return text ? parse(text) : null;
  } catch { return null; }
}

export function clear(storage) {
  try { (storage ?? globalThis.localStorage).removeItem(KEY); return true; } catch { return false; }
}
