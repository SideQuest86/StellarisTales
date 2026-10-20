// Story guides (public/summaries) name documents by their event ids ("origin.1199", or "1200 → 1205" inside one
// namespace). In the reader those ids become links titled with the document's own name, so the guide reads in titles and
// each step opens the chapter it describes; the id stays in the link's tooltip (provenance). The folded review section is
// left as written.

// A bare number counts as a document only if it has 3+ digits, is not part of a quantity (%, days, years, weights …) and
// "<namespace>.<number>" is a document of this story.
const UNIT_AFTER = /^\s*(%|％|天|日|月|年|个|次|点|倍|级|x\b|×|days?\b|months?\b|years?\b|turns?\b|times\b|of\b|\/\s*\d)/i;
const UNIT_BEFORE = /(weight|权重|基础|base|\+|-|−|×|\/|第|year|年|v)\s*$/i;
const TOKEN = /([A-Za-z_][\w-]*\.\d+)|(?<![\w.:/-])(\d{3,5})(?![\w.%-])/g;

/** Splits text into strings and {id, raw[, story, label]} pieces. ids: document ids of this story; spaces: namespaces to try
 *  for bare numbers; other(id): a full id of another story -> {story, label} or null. */
export function tokenize(text, ids, spaces, other = () => null) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    let id = null, ext = null;
    if (m[1] && ids.has(m[1])) id = m[1];
    else if (m[1] && (ext = other(m[1]))) id = m[1];
    else if (m[2]) {
      const before = text.slice(Math.max(0, m.index - 8), m.index), after = text.slice(m.index + m[0].length, m.index + m[0].length + 8);
      if (!UNIT_AFTER.test(after) && !UNIT_BEFORE.test(before)) id = spaces.map((ns) => `${ns}.${m[2]}`).find((c) => ids.has(c)) || null;
    }
    if (!id && !m[1]) continue;
    if (m.index > last) out.push(text.slice(last, m.index));
    // A full id that is no readable document (a hidden event, another mod's id …) stays as written, dimmed.
    out.push(!id ? { raw: m[0], muted: true } : ext ? { id, raw: m[0], story: ext.story, label: ext.label } : { id, raw: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Namespaces of a story's numeric document ids, most frequent first ("origin" for origin.1199 …). */
export function namespaces(ids) {
  const count = new Map();
  for (const id of ids) {
    const m = /^([A-Za-z_][\w-]*)\.\d+$/.exec(id);
    if (m) count.set(m[1], (count.get(m[1]) || 0) + 1);
  }
  return [...count].sort((a, b) => b[1] - a[1]).map(([ns]) => ns);
}

/** Replaces document ids in the guide's text (outside the review section, links and code) with chapter buttons that the
 *  reader's [data-chapter] handler opens like a story-map node. other(id) resolves a full id of another story to
 *  {story, label} (or null). */
export function linkGuide(root, { storyId, chapters, title, other = () => null }) {
  const ids = new Set(chapters.map((c) => c.id));
  const spaces = namespaces(ids);
  const byId = new Map(chapters.map((c) => [c.id, c]));
  const doc = root.ownerDocument;
  const walker = doc.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.parentElement?.closest("a, button, code, .md-review, summary")) continue;
    if (/\d/.test(n.nodeValue)) nodes.push(n);
  }
  let linked = 0;
  for (const node of nodes) {
    const parts = tokenize(node.nodeValue, ids, spaces, other);
    if (parts.every((p) => typeof p === "string")) continue;
    const frag = doc.createDocumentFragment();
    for (const p of parts) {
      if (typeof p === "string") { frag.append(p); continue; }
      if (p.muted) {
        const span = doc.createElement("span");
        span.className = "guide-id";
        span.textContent = p.raw;
        frag.append(span);
        continue;
      }
      const b = doc.createElement("button");
      b.type = "button";
      b.className = "guide-doc";
      b.dataset.chapter = p.id;
      b.dataset.story = p.story || storyId;
      b.title = p.id;
      b.textContent = (p.story ? p.label : title(byId.get(p.id))) || p.raw;
      frag.append(b);
      linked++;
    }
    node.replaceWith(frag);
  }
  return linked;
}