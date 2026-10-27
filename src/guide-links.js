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

const CJK_EDGE = new RegExp("[\\u3400-\\u9fff\\u3000-\\u303f\\uff00-\\uffef]");
/** A document id that the source wrote with a space on a Chinese side ("路线以 origin.1199 结束局势") loses that one space: the
 *  link already reads as its own word and the space would show as a glue gap. Spaces beside Latin text stay. */
export function trimGlueSpaces(parts) {
  return parts.map((p, i) => {
    if (typeof p !== "string") return p;
    let s = p;
    if (typeof parts[i + 1] === "object" && s.length > 1 && s.endsWith(" ") && CJK_EDGE.test(s.at(-2))) s = s.slice(0, -1);
    if (typeof parts[i - 1] === "object" && s.length > 1 && s.startsWith(" ") && CJK_EDGE.test(s[1])) s = s.slice(1);
    return s;
  });
}

/** The guides name a document by its id and then its quoted title ('akx.9000 "The Horizon Signal"', 'distar.1031“灰蛊风暴”').
 *  Once the id reads as that title, the quote would repeat it: text right after a link loses a quoted name that the link's
 *  label already contains. Any other quote (a choice, a line of dialogue) stays. */
export function dropEcho(label, text) {
  // (a bracketed name too: "12155（奥伏戎的愤怒）")
  const q = /^\s?["“「『（(]([^"”」』）)]{1,80})["”」』）)]/.exec(text);
  return q && sameName(q[1], label) ? text.slice(q[0].length) : text;
}

/** In a bold "id name" ("**2006 宗教狂热**", "**1011 碰撞 / 1012 损失舰船**") the guide names the document itself: the written
 *  name becomes the link and the id goes, instead of the link's own title standing beside it ("宗教狂热宗教狂热", "军阀的崛起
 *  军阀崛起"). parts: tokenize() output with labels as `text`; only for a text node that is a bold element's whole content. */
export function foldNamed(parts) {
  const out = parts.slice();
  for (let i = 0; i < out.length; i++) {
    const p = out[i], next = out[i + 1];
    if (typeof p !== "object" || p.muted || typeof next !== "string") continue;
    // (the end of a range, "**2030–2037 伦理变化**", names the whole range, not its last document: left as it was)
    if (typeof out[i - 1] === "string" && /[–—~-]\s*$/.test(out[i - 1]) && typeof out[i - 2] === "object") continue;
    const m = /^\s+([^/（(：:\s][^/（(：:]*?)(\s*\/\s*|$)/.exec(next);
    if (!m || /^\d/.test(m[1])) continue;
    out[i] = { ...p, text: m[1].trim() };
    out[i + 1] = next.slice(m[0].length - m[2].length);
  }
  return out.filter((x) => x !== "");
}

const flat = (s) => String(s ?? "").toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
const words = (s) => ` ${(String(s ?? "").toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).join(" ")} `;
// The name is the label, or part of it: a run of whole words in Latin ("Reprise" in "The Horizon Signal: REPRISE", never
// "Other" in "Reaching Into the Rift"), any 2+ characters in Chinese ("谜团重现" in "视界信号：谜团重现").
function sameName(name, label) {
  const a = flat(name), b = flat(label);
  if (!a || !b) return false;
  if (a === b) return true;
  return /[㐀-鿿]/.test(name) ? a.length >= 2 && b.includes(a) : words(label).includes(words(name));
}
// Start of the shortest end of `text` that spells `label` (spaces and punctuation aside), or -1; never from inside a Latin word.
function suffixOf(text, label) {
  const want = flat(label);
  if (!want) return -1;
  for (let k = text.length - 1; k >= 0; k--) {
    const f = flat(text.slice(k));
    if (f === want) return /[A-Za-z0-9]/.test(text[k]) && /[A-Za-z0-9]/.test(text[k - 1] || "") ? -1 : k;
    if (f.length > want.length) return -1;
  }
  return -1;
}

/** The mirror of dropEcho: an id right after the name the guide has just written for it ('大召唤（2021）', '“抵近裂隙”（101）',
 *  '**璞玉浑金**（4055）', '“超能限制”bio.66') would show that name again as the link. The written name becomes the link (in
 *  the guide's own words) and the id goes, with its brackets when it stood alone in them ('“交织的喜悦”（336，组织者想留下）' keeps
 *  "（组织者想留下）"). Link parts carry their label as `text`; prevText() is the text of the element just before the text node
 *  (a bold name), and such a link comes back with `lead: true` (linkGuide moves it into that element). */
export function foldEchoes(parts, prevText = () => "") {
  const out = parts.slice();
  const put = (i, before, link, after) => {
    const from = typeof out[i - 1] === "string" ? i - 1 : i;
    const to = typeof out[i + 1] === "string" ? i + 1 : i;
    out.splice(from, to - from + 1, before, link, after);
    return from + 1;
  };
  for (let i = 0; i < out.length; i++) {
    const p = out[i];
    if (typeof p !== "object" || p.muted || !p.text) continue;
    const before = typeof out[i - 1] === "string" ? out[i - 1] : "";
    const after = typeof out[i + 1] === "string" ? out[i + 1] : "";
    const open = /\s?[（(]\s?$/.exec(before);
    const shut = open && (/^\s?[)）]/.exec(after) || /^\s?[，,；;]\s?/.exec(after));
    if (open && !shut) continue;
    const core = open ? before.slice(0, open.index) : before;
    // (a bracket that stays keeps the space before it: "“Reprise” (the second leader)")
    const rest = !open ? after : /[)）]/.test(shut[0]) ? after.slice(shut[0].length) : open[0].trimEnd() + after.slice(shut[0].length);
    const q = /(["“「『])([^"”」』]{1,80})(["”」』])\s?$/.exec(core);
    if (q && sameName(q[2], p.text)) {
      i = put(i, core.slice(0, q.index + 1), { ...p, text: q[2] }, q[3] + rest);
      continue;
    }
    if (!open) continue;
    if (!core.trim()) {
      if (sameName(prevText(), p.text)) i = put(i, core, { ...p, lead: true }, rest);
      continue;
    }
    const k = suffixOf(core, p.text);
    if (k >= 0) i = put(i, core.slice(0, k), { ...p, text: core.slice(k) }, rest);
  }
  return out.filter((x) => x !== "");
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
  const work = nodes.map((node) => ({ node, labelled: trimGlueSpaces(tokenize(node.nodeValue, ids, spaces, other)).map((p) =>
    typeof p === "string" || p.muted ? p : { ...p, text: (p.story ? p.label : title(byId.get(p.id))) || p.raw }) }));
  // Different chapters with one title in the same paragraph would all read alike ("The C.A.R.E Interactive Interface → The
  // C.A.R.E Interactive Interface → …", the steps of one anomaly): there the links keep the guide's own numbers, and their
  // tooltip names the title.
  const blockOf = (n) => n.parentElement?.closest("li, p, h1, h2, h3, h4, h5, h6, td, blockquote") || root;
  const byBlock = new Map();
  for (const { node, labelled } of work) {
    for (const p of labelled) {
      if (typeof p === "string" || p.muted) continue;
      const block = byBlock.get(blockOf(node)) || byBlock.set(blockOf(node), new Map()).get(blockOf(node));
      (block.get(p.text) || block.set(p.text, new Set()).get(p.text)).add(`${p.story || storyId}:${p.id}`);
    }
  }
  for (const { node, labelled } of work)
    for (const p of labelled) if (typeof p !== "string" && !p.muted && byBlock.get(blockOf(node)).get(p.text).size > 1) [p.alias, p.text] = [p.text, p.raw];
  let linked = 0;
  for (const { node, labelled } of work) {
    if (labelled.every((p) => typeof p === "string")) continue;
    // A bold or italic name right before the text ('**璞玉浑金**（4055）') can become the link itself (plain text only: a
    // bilingual lead keeps its language spans).
    const prev = node.previousSibling;
    const lead = prev?.nodeType === 1 && /^(STRONG|B|EM|I)$/.test(prev.tagName) && !prev.children.length ? prev : null;
    // A bold element made of "id name" pairs names its documents itself.
    const boldIds = /^(STRONG|B)$/.test(node.parentElement?.tagName || "") && node.parentElement.childNodes.length === 1 && typeof labelled[0] === "object";
    const parts = foldEchoes(boldIds ? foldNamed(labelled) : labelled, () => lead?.textContent || "");
    const frag = doc.createDocumentFragment();
    let glue = null; // a link and the closing punctuation right after it stay on one line (no "，" at a line start)
    for (const p of parts) {
      if (typeof p === "string") {
        const s = glue ? dropEcho(glue.textContent, p) : p;
        const m = glue && /^[，。、；：！？）」』”’》〉…,.;:!?)]+/.exec(s);
        if (m) { glue.append(m[0]); glue.classList.add("tight"); frag.append(s.slice(m[0].length)); }
        else frag.append(s);
        glue = null;
        continue;
      }
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
      b.title = p.alias ? `${p.alias} · ${p.id}` : p.id;
      b.textContent = p.text;
      if (p.lead) { b.textContent = lead.textContent; lead.replaceChildren(b); linked++; continue; }
      glue = doc.createElement("span");
      glue.className = "guide-glue";
      glue.append(b);
      frag.append(glue);
      linked++;
    }
    node.replaceWith(frag);
  }
  return linked;
}