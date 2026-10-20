// Chapters the reader has ever opened, per story ("st-seen"): unlike the reading progress (one trail, cleared by Start
// over) it only grows, so the archive can say "Read 3 of 12" and the Grand Archive can mark specimens met while reading.
// Pure helpers (normalize, serialize) have no storage dependency; storage access is wrapped so blocked, throwing or full
// storage degrades to an in-memory record for the session.
export const KEY = "st-seen";
export const VERSION = 1;
export const LIMITS = { perStory: 600, total: 4000, id: 200 };

const isId = (v) => typeof v === "string" && v.length > 0 && v.length <= LIMITS.id;
const isPlain = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/** Parsed storage value -> Map(storyId -> Set(docId)); anything malformed is dropped (the whole value or one story). */
export function normalize(raw) {
  const map = new Map();
  if (!isPlain(raw) || raw.v !== VERSION || !isPlain(raw.s)) return map;
  let total = 0;
  for (const [story, docs] of Object.entries(raw.s)) {
    if (!isId(story) || !Array.isArray(docs)) continue;
    const set = new Set(docs.filter(isId).slice(0, LIMITS.perStory));
    if (!set.size) continue;
    if (total + set.size > LIMITS.total) break;
    total += set.size;
    map.set(story, set);
  }
  return map;
}

export const serialize = (map) => ({ v: VERSION, s: Object.fromEntries([...map].map(([k, set]) => [k, [...set]])) });

/** A seen-record bound to a storage object (localStorage by default; tests pass a stub). */
export function createSeen(storage = (() => { try { return globalThis.localStorage; } catch { return null; } })()) {
  let map;
  try { map = normalize(JSON.parse(storage?.getItem(KEY) || "null")); } catch { map = new Map(); }
  let timer = 0;
  const total = () => { let n = 0; for (const s of map.values()) n += s.size; return n; };
  const flush = () => {
    clearTimeout(timer);
    timer = 0;
    try { storage?.setItem(KEY, JSON.stringify(serialize(map))); } catch {}
  };
  return {
    /** Records a chapter; returns true if it was new. Oldest stories are dropped once the total cap is reached. */
    mark(story, doc) {
      if (!isId(story) || !isId(doc)) return false;
      let set = map.get(story);
      if (set?.has(doc)) return false;
      if (!set) { set = new Set(); map.set(story, set); }
      else { map.delete(story); map.set(story, set); } // most recently read story last
      if (set.size >= LIMITS.perStory) return false;
      set.add(doc);
      while (total() > LIMITS.total && map.size > 1) map.delete(map.keys().next().value);
      clearTimeout(timer);
      timer = setTimeout(flush, 600);
      return true;
    },
    count: (story) => map.get(story)?.size || 0,
    has: (story, doc) => !!map.get(story)?.has(doc),
    /** Every seen document id, across stories. */
    docs() { const all = new Set(); for (const s of map.values()) for (const d of s) all.add(d); return all; },
    clear() { map = new Map(); clearTimeout(timer); timer = 0; try { storage?.removeItem(KEY); } catch {} },
    flush,
  };
}
