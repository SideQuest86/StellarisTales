// Full-text search over story prose, chapter titles, choices, gameplay-effect labels and museum specimens.
// The index (public/search/, built by scripts/build-search-index.mjs) is loaded lazily: `meta.json` and the chapter
// titles when the search dialog first opens, then one hash shard (`s<k>.bin`) per query term, on demand.
// This module is DOM-free (the generator, the tests and the browser share the tokenizer). Rendering helpers return
// strings in which every dynamic piece goes through esc() first; <mark> is added only around escaped matches.

export const FIELD = { name: 1, text: 2, choice: 4, effect: 8 };
export const WEIGHT = { name: 10, choice: 3.2, text: 3, effect: 1.5 };
export const SHARDS = 32;
export const FORMAT = 2;

const STOP = new Set(
  "a an and are as at be but by for from had has have he her his i if in into is it its me my no not of on or our she so that the their them then there these they this to us was we were what when which who will with you your".split(" "),
);
const LATIN = /[\p{Script=Latin}0-9]+/gu;
const CJK = /[㐀-鿿]+/g;

// Display markup that is never prose: [placeholder] tokens (filled from a save at display time), §x colour codes,
// £icon£ glyphs, $REF$ references and tags.
export function clean(s) {
  let t = String(s ?? "").replace(/§./g, "").replace(/£[^£\s]*£/g, " ").replace(/\$[A-Za-z0-9_|.:-]+\$/g, " ");
  for (let i = 0; i < 3 && t.includes("["); i++) t = t.replace(/\[[^\[\]]*\]/g, " ");
  return t.replace(/[\[\]]/g, " ").replace(/<[^>]*>/g, " ").replace(/\\n/g, "\n");
}

export function stem(w) {
  if (w.length < 4) return w;
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  if (/(ss|us|is)$/.test(w)) return w;
  if (/(sh|ch|x|z|ss)es$/.test(w)) return w.slice(0, -2);
  return w.endsWith("s") ? w.slice(0, -1) : w;
}

// Index terms of a (cleaned) text: stemmed Latin words (stop words dropped) and CJK character bigrams.
export function terms(text) {
  const out = [];
  const s = String(text ?? "").toLowerCase();
  for (const m of s.matchAll(LATIN)) {
    const w = m[0].replace(/'s$/, "");
    if (w.length < 2 && !/\d/.test(w)) continue;
    if (STOP.has(w)) continue;
    out.push(stem(w));
  }
  for (const m of s.matchAll(CJK)) {
    const run = m[0];
    for (let i = 0; i + 1 < run.length; i++) out.push(run.slice(i, i + 2));
  }
  return out;
}

// A query is a list of required groups. A Latin word is one group; a CJK run is one group whose bigrams must all
// occur (and whose literal text is verified against the chapter when its snippet is built).
// A lone CJK character is a unigram term (the index stores unigrams as well as bigrams). With `partial`, the last
// word is still being typed: when it is a Latin word of 3+ letters it becomes a prefix group (see SearchIndex).
export function parseQuery(q, { partial = false } = {}) {
  const s = String(q ?? "").toLowerCase();
  const groups = [];
  const all = [...s.matchAll(new RegExp(`${LATIN.source}|${CJK.source}`, "gu"))];
  all.forEach((m, mi) => {
    const w = m[0];
    if (/^[㐀-鿿]+$/.test(w)) {
      groups.push({ kind: "cjk", literal: w, terms: w.length > 1 ? [...new Set(terms(w))] : [w] });
    } else {
      const plain = w.replace(/'s$/, "");
      if (STOP.has(plain) || (plain.length < 2 && !/\d/.test(plain))) return;
      const g = { kind: "latin", literal: plain, terms: [stem(plain)] };
      if (partial && mi === all.length - 1 && plain.length >= 3) g.prefix = true;
      groups.push(g);
    }
  });
  return groups;
}

// Index terms of a document string: terms() plus a unigram per CJK character (single-character queries).
export function indexTerms(text) {
  const out = terms(text);
  for (const m of String(text ?? "").matchAll(CJK)) for (const ch of m[0]) out.push(ch);
  return out;
}

export function hashTerm(term) {
  let h = 0x811c9dc5;
  for (let i = 0; i < term.length; i++) {
    h ^= term.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h % SHARDS;
}
// Latin terms are sharded by their first two characters, so every term sharing a 2+ letter prefix lives in ONE shard
// (prefix search = scan that shard's sorted term list; no extra structure, no duplicated postings). CJK terms hash whole.
export function shardOf(term) {
  return hashTerm(/^[\p{Script=Latin}0-9]/u.test(term) ? term.slice(0, 2) : term);
}

// One edit (substitute / insert / delete / adjacent transposition) apart.
export function withinOne(a, b) {
  if (a === b) return true;
  const d = a.length - b.length;
  if (d > 1 || d < -1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (d === 0) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true;
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
  }
  const [l, s] = d > 0 ? [a, b] : [b, a];
  return l.slice(i + 1) === s.slice(i);
}

// ---- varint helpers (shared by generator and reader) ----
export function writeVarint(out, n) {
  while (n >= 128) { out.push((n % 128) | 128); n = Math.floor(n / 128); }
  out.push(n);
}
function readVarint(buf, pos) {
  let n = 0, mul = 1, b;
  do { b = buf[pos.i++]; n += (b & 127) * mul; mul *= 128; } while (b & 128);
  return n;
}
const decoder = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

export function parseShard(buffer) {
  const buf = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const pos = { i: 0 };
  const map = new Map();
  const n = readVarint(buf, pos);
  for (let k = 0; k < n; k++) {
    const len = readVarint(buf, pos);
    const term = decoder.decode(buf.subarray(pos.i, pos.i + len));
    pos.i += len;
    const size = readVarint(buf, pos);
    map.set(term, buf.subarray(pos.i, pos.i + size));
    pos.i += size;
  }
  return map;
}

// Posting bytes -> { docs: Int32Array, masks: Uint8Array }
export function decodePostings(bytes) {
  const docs = [], masks = [];
  const pos = { i: 0 };
  let doc = 0;
  while (pos.i < bytes.length) {
    const v = readVarint(bytes, pos);
    doc += Math.floor(v / 16);
    docs.push(doc);
    masks.push(v % 16);
  }
  return { docs, masks };
}

// ---- search engine ----
export class SearchIndex {
  constructor({ base = "", fetchBytes, fetchJson, lang = "zh" }) {
    this.base = base;
    this.lang = lang;
    this.fetchJson = fetchJson;
    this.fetchBytes = fetchBytes;
    this.shards = new Map();
    this.meta = null;
    this.titles = new Map();
    this.loading = null;
  }
  load(lang = this.lang) {
    this.lang = lang;
    this.loading ||= this.fetchJson(`${this.base}search/meta.json`).then((m) => { this.meta = m; this.storyOf = null; });
    return this.loading.then(() => this.loadTitles(lang));
  }
  loadTitles(lang) {
    if (!this.titles.has(lang)) this.titles.set(lang, this.fetchJson(`${this.base}search/titles-${lang}.json`).catch(() => []));
    return this.titles.get(lang);
  }
  shard(k) {
    if (!this.shards.has(k)) this.shards.set(k, this.fetchBytes(`${this.base}search/s${k}.bin`).then(parseShard));
    return this.shards.get(k);
  }
  // doc id -> story index (binary search over meta.first)
  storyIndex(doc) {
    const first = this.meta.first;
    let lo = 0, hi = first.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (first[mid] <= doc) lo = mid; else hi = mid - 1;
    }
    return lo;
  }
  // Documents containing every group. A prefix group (last word being typed) matches any indexed term starting with
  // it; with `approx` a Latin word of 5+ letters that matches nothing is replaced by terms one edit away (same first
  // two letters, or those two swapped). The result array carries `.groups` (the groups actually matched, for snippet
  // needles) and `.approx` (true when a typo correction was used).
  async lookup(groups, { approx = false } = {}) {
    if (!this.meta) await this.load();
    const empty = (eff = groups) => Object.assign([], { groups: eff, approx: false });
    const swap = (w) => (w.length > 1 ? w[1] + w[0] + w.slice(2) : w);
    const ids = new Set();
    for (const g of groups) {
      if (g.kind === "latin") {
        ids.add(shardOf(g.terms[0]));
        if (approx) ids.add(shardOf(swap(g.terms[0])));
      } else for (const t of g.terms) ids.add(shardOf(t));
    }
    if (!ids.size) return empty();
    const byShard = new Map(await Promise.all([...ids].map((k) => this.shard(k).then((m) => [k, m]))));
    const bySize = (m) => (a, b) => m.get(b).length - m.get(a).length || (a < b ? -1 : 1);
    const eff = [];
    let fixed = false;
    for (const g of groups) {
      if (g.kind !== "latin") { eff.push(g); continue; }
      const s = g.terms[0], sh = byShard.get(shardOf(s));
      let terms = [];
      if (g.prefix) {
        for (const t of sh.keys()) if (t.startsWith(s)) terms.push(t);
        terms = terms.sort(bySize(sh)).slice(0, PREFIX_MAX);
      } else if (sh.has(s)) terms = [s];
      if (terms.length) { eff.push(g.prefix ? { ...g, terms, any: true, needles: [g.literal, s] } : g); continue; }
      if (approx && g.literal.length >= 5) {
        const near = [];
        for (const k of new Set([shardOf(s), shardOf(swap(s))])) {
          for (const t of byShard.get(k).keys()) if (t !== s && Math.abs(t.length - s.length) <= 1 && withinOne(s, t)) near.push([t, byShard.get(k)]);
        }
        near.sort((a, b) => b[1].get(b[0]).length - a[1].get(a[0]).length || (a[0] < b[0] ? -1 : 1));
        const cands = near.slice(0, 8).map((x) => x[0]);
        if (cands.length) { eff.push({ ...g, terms: cands, any: true, approx: true, needles: cands }); fixed = true; continue; }
      }
      eff.push(g);
    }
    if (approx && !fixed) return empty(eff);
    const lists = new Map();
    for (const t of new Set(eff.flatMap((g) => g.terms))) {
      const bytes = byShard.get(shardOf(t))?.get(t);
      lists.set(t, bytes ? decodePostings(bytes) : null);
    }
    return Object.assign(intersect(eff, lists), { groups: eff, approx: fixed });
  }
}
const PREFIX_MAX = 16;

// Intersect per-term postings. A group with several bigrams needs all of them in the same document. Per document
// the result keeps the fields where *every* group matched at once (proximity proxy) and the best-weighted field.
export function intersect(groups, lists) {
  const per = groups.filter((g) => g.terms.length);
  if (!per.length) return [];
  const docMasks = [];
  for (const g of per) {
    let acc = null;
    if (g.any) { // any of the terms (prefix expansion / typo candidates)
      acc = new Map();
      for (const t of g.terms) {
        const l = lists.get(t);
        if (l) for (let i = 0; i < l.docs.length; i++) acc.set(l.docs[i], (acc.get(l.docs[i]) || 0) | l.masks[i]);
      }
      if (!acc.size) return [];
      docMasks.push(acc);
      continue;
    }
    for (const t of g.terms) {
      const l = lists.get(t);
      if (!l) return [];
      if (!acc) { acc = new Map(); for (let i = 0; i < l.docs.length; i++) acc.set(l.docs[i], l.masks[i]); continue; }
      const next = new Map();
      for (let i = 0; i < l.docs.length; i++) {
        const prev = acc.get(l.docs[i]);
        if (prev !== undefined) next.set(l.docs[i], prev & l.masks[i] ? prev & l.masks[i] : prev | l.masks[i]);
      }
      acc = next;
      if (!acc.size) return [];
    }
    docMasks.push(acc);
  }
  docMasks.sort((a, b) => a.size - b.size);
  const out = [];
  for (const [doc, m0] of docMasks[0]) {
    let all = m0, any = m0, ok = true, sum = bestWeight(m0);
    for (let i = 1; i < docMasks.length; i++) {
      const m = docMasks[i].get(doc);
      if (m === undefined) { ok = false; break; }
      all &= m; any |= m; sum += bestWeight(m);
    }
    if (!ok) continue;
    const together = all ? bestWeight(all) * 1.5 : 0;
    const fieldKey = all || any;
    out.push({ doc, score: sum + together, fields: any, type: bestField(fieldKey) });
  }
  return out;
}

function bestWeight(mask) {
  let w = 0;
  for (const [k, bit] of Object.entries(FIELD)) if (mask & bit) w = Math.max(w, WEIGHT[k]);
  return w;
}
export function bestField(mask) {
  let best = null, w = -1;
  for (const [k, bit] of Object.entries(FIELD)) if (mask & bit && WEIGHT[k] > w) { best = k; w = WEIGHT[k]; }
  return best;
}

// Group document hits by story; one row per story (its best chapter) plus the count of other matching chapters.
export function groupByStory(hits, storyIndex) {
  const by = new Map();
  for (const h of hits) {
    const s = storyIndex(h.doc);
    const g = by.get(s);
    if (!g) by.set(s, { story: s, best: h, count: 1 });
    else { g.count++; if (h.score > g.best.score || (h.score === g.best.score && h.doc < g.best.doc)) g.best = h; }
  }
  const rows = [...by.values()];
  for (const r of rows) r.score = r.best.score + Math.min(2, Math.log2(r.count));
  rows.sort((a, b) => b.score - a.score || a.best.doc - b.best.doc);
  return rows;
}

// ---- snippets ----
// Plain-text snippet around the first match; the HTML form escapes everything first, then marks.
export function makeSnippet(text, needles, width = 70) {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  const low = s.toLowerCase();
  let at = -1, len = 0;
  for (const n of needles) {
    const i = low.indexOf(n);
    if (i >= 0 && (at < 0 || i < at)) { at = i; len = n.length; }
  }
  if (at < 0) return null;
  const start = Math.max(0, at - Math.floor(width / 3));
  const end = Math.min(s.length, start + width * 2);
  return { text: (start > 0 ? "…" : "") + s.slice(start, end) + (end < s.length ? "…" : ""), needles };
}

export function highlight(text, needles, esc) {
  const list = [...new Set(needles.map((n) => n.toLowerCase()).filter(Boolean))].sort((a, b) => b.length - a.length);
  const src = String(text ?? "");
  if (!list.length) return esc(src);
  const low = src.toLowerCase();
  const ranges = [];
  for (const n of list) {
    for (let i = low.indexOf(n); i >= 0; i = low.indexOf(n, i + n.length)) ranges.push([i, i + n.length]);
  }
  ranges.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let html = "", pos = 0;
  for (const [a, b] of ranges) {
    if (a < pos) continue;
    html += esc(src.slice(pos, a)) + "<mark>" + esc(src.slice(a, b)) + "</mark>";
    pos = b;
  }
  return html + esc(src.slice(pos));
}

// Literal strings to highlight / verify for a parsed query (a Latin word also matches its inflections by prefix of
// the stem, e.g. "tempest" marks "tempests").
export function needlesOf(groups) {
  return [...new Set(groups.flatMap((g) => (g.needles ? g.needles : g.kind === "latin" ? [g.literal, g.terms[0]] : [g.literal])))];
}

// The chapter's searchable fields as plain (cleaned) strings, per language, in display priority.
export function chapterFields(chapter, effectsDoc, prose) {
  const f = [];
  const add = (type, v) => {
    for (const lang of ["zh", "en"]) {
      const x = v && (typeof v === "string" ? v : v[lang]);
      if (!x) continue;
      const shown = prose(x), plain = clean(x).replace(/\s+/g, " ").trim();
      f.push({ type, lang, text: shown });
      if (plain !== shown.replace(/\s+/g, " ").trim()) f.push({ type, lang, text: plain, alt: true });
    }
  };
  add("name", chapter.title);
  for (const t of chapter.texts || []) add("text", t);
  for (const t of chapter.sections || []) add("text", t);
  for (const c of chapter.choices || []) {
    add("choice", c.label);
    for (const v of c.labelVariants || []) add("choice", v.label);
    for (const r of c.responses || []) add("text", r);
  }
  if (chapter.ending) { add("text", chapter.ending.label); add("text", chapter.ending.note); }
  for (const s of effectLabels(effectsDoc)) add("effect", s);
  return f;
}

// Labels shown by the effects panel: label / note / bullets / stats, never conditions or sources.
export function effectLabels(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) { for (const x of node) effectLabels(x, out); return out; }
  if (node.kind === "more" || node.unhandled) return out;
  for (const k of ["label", "note"]) if (node[k] && typeof node[k] === "object" && (node[k].zh || node[k].en)) out.push(node[k]);
  for (const s of node.stats || []) if (s?.label) out.push(s.label);
  for (const k of ["bullets", "negativeBullets"]) {
    const b = node[k];
    if (!b) continue;
    const n = Math.max((b.zh || []).length, (b.en || []).length);
    for (let i = 0; i < n; i++) out.push({ zh: b.zh?.[i]?.text, en: b.en?.[i]?.text });
  }
  for (const k of ["effects", "choices", "immediate", "after", "sections", "variants", "doc", "origin"]) if (node[k]) effectLabels(node[k], out);
  return out;
}

// Find the best snippet for a hit in already-fetched chapter data. Returns { type, text } or null when the literal
// CJK phrase is absent (a bigram false positive).
export function bestSnippet(fields, groups, lang) {
  const needles = needlesOf(groups);
  const cjk = groups.filter((g) => g.kind === "cjk").map((g) => g.literal);
  // (callers pass the lookup's effective groups, so prefix / approximate groups carry their own needles)
  const hay = fields.map((f) => ({ ...f, low: f.text.toLowerCase() }));
  if (cjk.length && !cjk.every((c) => hay.some((f) => f.low.includes(c)))) return null;
  const order = { name: 0, choice: 1, text: 2, effect: 3 };
  const cand = hay
    .map((f) => ({ f, hits: needles.filter((n) => f.low.includes(n)).length }))
    .filter((x) => x.hits)
    .sort((a, b) => b.hits - a.hits || (a.f.alt ? 1 : 0) - (b.f.alt ? 1 : 0) || (a.f.lang === lang ? 0 : 1) - (b.f.lang === lang ? 0 : 1) || order[a.f.type] - order[b.f.type]);
  if (!cand.length) return { type: null, snippet: null, needles };
  const top = cand[0].f;
  return { type: top.type, snippet: makeSnippet(top.text, needles.filter((n) => top.low.includes(n))), needles };
}

export const TYPE_LABEL = {
  title: ["标题", "Title"], text: ["正文", "Text"], choice: ["选项", "Choice"], name: ["名称", "Name"],
  effect: ["效果", "Effect"], specimen: ["标本", "Specimen"],
};
export const typeLabel = (type, lang) => TYPE_LABEL[type]?.[lang === "en" ? 1 : 0] || "";

export const hashFor = (storyId, chapterId) =>
  `#story=${encodeURIComponent(storyId)}${chapterId ? `&chapter=${encodeURIComponent(chapterId)}` : ""}`;
export const museumHash = (key) => `#museum=${encodeURIComponent(key)}`;

// ---- controller used by the page ----
// env: { base, getLang(), T(zh,en), esc(s), prose(s), fetchJson(path), fetchBytes(path), getStories(), storyRow(story, extra) }
// search(query, page) -> { total, pages, page, html, enrich(container) }.  Story-title matches keep the dialog's
// original behaviour (title/excerpt words); everything else comes from the lazily loaded index.
export function createSearch(env) {
  const index = new SearchIndex({ base: env.base, fetchJson: env.fetchJson, fetchBytes: env.fetchBytes, lang: env.getLang() });
  const storyCache = new Map(), effectCache = new Map();
  const once = (cache, key, make) => {
    if (!cache.has(key)) {
      cache.set(key, make().catch(() => null));
      if (cache.size > 24) cache.delete(cache.keys().next().value);
    }
    return cache.get(key);
  };
  const PAGE = 20;
  return {
    index,
    preload: () => index.load(env.getLang()).catch(() => {}),
    async search(query, page = 0) {
      const lang = env.getLang();
      await index.load(lang);
      const titles = await index.loadTitles(lang);
      const raw = String(query);
      let groups = parseQuery(query, { partial: !/\s$/.test(raw) });
      const stories = env.getStories();
      const byId = new Map(stories.map((s) => [s.id, s]));
      const norm = raw.toLowerCase().trim().replace(/\s+/g, " ");
      const words = norm.split(" ").filter(Boolean);
      const titleHit = (s) =>
        s.visible && words.every((w) => `${s.title.zh} ${s.title.en} ${s.excerpt?.zh || ""} ${s.excerpt?.en || ""}`.toLowerCase().includes(w));
      // Title ranking: exact title > title prefix > any other match.
      const titleRank = (t) => { t = String(t || "").toLowerCase().replace(/\s+/g, " ").trim(); return t === norm ? 2 : t && t.startsWith(norm) ? 1 : 0; };
      const meta = index.meta;
      const build = (docHits) => {
        const rows = [];
        const chapterHits = docHits.filter((h) => h.doc < meta.spStart);
        const grouped = groupByStory(chapterHits, (d) => index.storyIndex(d));
        const seen = new Set();
        for (const s of stories) {
          if (!titleHit(s)) continue;
          seen.add(s.id);
          const rank = Math.max(titleRank(s.title.zh), titleRank(s.title.en));
          rows.push({ kind: "story", story: s, score: [50, 90, 130][rank], count: 0 });
        }
        for (const g of grouped) {
          const id = meta.stories[g.story], story = byId.get(id);
          if (!story || !story.visible) continue;
          if (seen.has(id)) { rows.find((r) => r.story === story).count = g.count; continue; }
          const nameHit = g.best.fields & FIELD.name ? [0, 30, 80][titleRank(titles[g.best.doc])] : 0;
          rows.push({ kind: "doc", story, doc: g.best.doc, hit: g.best, score: g.score + nameHit, count: g.count });
        }
        for (const h of docHits) {
          if (h.doc < meta.spStart) continue;
          const nameHit = h.fields & FIELD.name ? [0, 30, 80][titleRank(titles[h.doc])] : 0;
          rows.push({ kind: "specimen", doc: h.doc, key: meta.spKeys[h.doc - meta.spStart], score: h.score + (h.type === "name" ? 4 : 0) + nameHit, hit: h });
        }
        rows.sort((a, b) => b.score - a.score);
        return rows;
      };
      let docHits = [];
      if (groups.some((g) => g.terms.length)) docHits = await index.lookup(groups);
      if (!docHits.length && groups.length && groups.every((g) => g.kind === "cjk" && g.literal.length === 1)) {
        // A very common character has no unigram postings (see build-search-index.mjs): scan chapter titles instead.
        const lit = groups.map((g) => g.literal);
        titles.forEach((tt, doc) => { if (lit.every((l) => tt.toLowerCase().includes(l))) docHits.push({ doc, score: WEIGHT.name * 2, type: "name", fields: FIELD.name }); });
      }
      // A single CJK character matches a very large share of the text: keep the best-scoring documents (titles first).
      const CAP = 400;
      const capped = (h) => (groups.some((g) => g.kind === "cjk" && g.literal.length === 1) && h.length > CAP ? h.sort((a, b) => b.score - a.score || a.doc - b.doc).slice(0, CAP) : h);
      let eff = docHits.groups || groups;      docHits = capped(docHits);
      let rows = build(docHits), approx = false;
      // Typo tolerance only when nothing matched at all (including story titles).
      if (!rows.length && groups.some((g) => g.kind === "latin" && g.literal.length >= 5)) {
        const near = await index.lookup(groups, { approx: true });
        if (near.length) { docHits = near; eff = near.groups; groups = near.groups; approx = true; rows = build(docHits); }
      }
      groups = eff;
      const pages = Math.max(1, Math.ceil(rows.length / PAGE));
      const p = Math.min(Math.max(0, page), pages - 1);
      const visible = rows.slice(p * PAGE, p * PAGE + PAGE);
      const { esc, T } = env;
      const html = visible.map((r, i) => {
        if (r.kind === "story") {
          // A story row is a title match already; only other hit types carry a chip.
          const more = r.count ? ` · ${esc(T(`${r.count} 篇相关`, `${r.count} ${r.count === 1 ? "chapter matches" : "chapters match"}`))}` : "";
          return env.storyRow(r.story, "", more);
        }
        const title = (titles[r.doc] || "").trim();
        const type = r.kind === "specimen" ? "specimen" : r.hit.type;
        const go = r.kind === "specimen" ? museumHash(r.key) : hashFor(r.story.id, meta.ids[r.doc]);
        const head = r.kind === "specimen" ? esc(title || r.key) : `${esc(title)} · <span>${esc(env.prose(env.storyTitle(r.story)))}</span>`;
        const more = r.count > 1 ? `<small class="hit-more">${esc(T(`另有 ${r.count - 1} 篇`, `+${r.count - 1} more`))}</small>` : "";
        return `<button class="search-story search-hit" data-hash="${esc(go)}" data-row="${i}"><em class="hit-type" data-type="${esc(type)}">${esc(typeLabel(type, lang))}</em><span><b>${head}</b><small class="hit-snip"></small>${more}</span><i>↗</i></button>`;
      }).join("");
      const enrich = async (container) => {
        const jobs = [];
        const EAGER = 8; // rows enriched at once; the rest wait until they scroll near the viewport (avoids ~30 story JSON fetches)
        const lazy = [];
        const run = (i) => {
          const r = visible[i];
          const el = container.querySelector(`[data-row="${i}"]`);
          if (!el) return;
          // Snippets use the hit's own reviewed names (a chapter's names, a specimen's placeholders), not the open chapter's.
          const own = (t, names) => (env.proseWith ? env.proseWith(t, names) : env.prose(t));
          jobs.push((async () => {
            let found;
            if (r.kind === "specimen") {
              const sp = await once(storyCache, "specimens", () => env.fetchJson("museum/specimens.json"));
              const s = sp?.specimens?.find((x) => x.key === r.key);
              if (!s) return;
              const f = [];
              for (const [type, v] of [["name", s.name], ["text", s.short], ["text", s.details]]) for (const l of ["zh", "en"]) if (v?.[l]) f.push({ type, lang: l, text: own(v[l], s.placeholders) });
              found = bestSnippet(f, groups, lang);
              // A name match would only repeat the title: show the specimen's short description instead.
              if (found?.type === "name") {
                const short = own(s.short?.[lang] || s.short?.zh || s.short?.en || "", s.placeholders);
                if (short) found = { ...found, snippet: { text: short.length > 140 ? short.slice(0, 140) + "…" : short, needles: found.needles } };
              }
            } else {
              const data = await once(storyCache, r.story.id, () => env.fetchJson(`stories/${r.story.id}.json`));
              const chapter = data?.chapters?.find((c) => c.id === meta.ids[r.doc]);
              if (!chapter) return;
              const eff = await once(effectCache, r.story.id, () => env.fetchJson(`effects/${r.story.id}.json`));
              const edoc = eff?.docs?.[chapter.id];
              const fx = chapter.id === r.story.start ? { ...edoc, origin: eff?.origin } : edoc;
              found = bestSnippet(chapterFields(chapter, fx, (t) => own(t, chapter.names)), groups, lang);
            }
            if (found === null) { el.remove(); return; } // bigram false positive: the phrase is not in the text
            if (found.snippet) {
              el.querySelector(".hit-snip").innerHTML = highlight(found.snippet.text, found.needles, env.esc);
              if (found.type && r.kind !== "specimen") {
                const chip = el.querySelector(".hit-type");
                chip.textContent = typeLabel(found.type, lang);
                chip.dataset.type = found.type;
              }
            }
          })().catch(() => {}));
        };
        for (let i = 0; i < visible.length; i++) {
          if (visible[i].kind === "story") continue;
          if (jobs.length < EAGER || typeof IntersectionObserver === "undefined") run(i);
          else lazy.push(i);
        }
        if (lazy.length) {
          const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              io.unobserve(e.target);
              if (e.target.isConnected) run(Number(e.target.dataset.row));
            }
          }, { rootMargin: "300px 0px" });
          for (const i of lazy) { const el = container.querySelector(`[data-row="${i}"]`); if (el) io.observe(el); }
        }
        await Promise.all(jobs);
      };
      // `countText(n)` is the result-count line; approximate (typo-corrected) results say so.
      const countText = (n) => T(`${n} 条结果`, `${n} ${n === 1 ? "result" : "results"}`) + (approx ? T(" · 相近结果", " · Close matches") : "");
      return { total: rows.length, pages, page: p, html, enrich, approx, countText };
    },
  };
}
