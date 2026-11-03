// Story guides (public/summaries) name documents by their event ids ("origin.1199", or "1200 → 1205" inside one
// namespace). In the reader those ids become links titled with the document's own name, so the guide reads in titles and
// each step opens the chapter it describes; the id stays in the link's tooltip (provenance). The folded review section is
// left as written.

// A bare number counts as a document only if it has 3+ digits, is not part of a quantity (%, days, years, weights …) and
// "<namespace>.<number>" is a document of this story.
const UNIT_AFTER = /^\s*(%|％|天|日|月|年|个|次|点|倍|级|x\b|×|days?\b|months?\b|years?\b|turns?\b|times\b|of\b|\/\s*\d)/i;
const UNIT_BEFORE = /(weight|权重|基础|base|\+|-|−|×|\/|第|year|年|v)\s*$/i;
// (a bare id may end a sentence: "a tree reaching devastation 50 -> 3003." showed the number)
const TOKEN = /([A-Za-z_][\w-]*\.\d+)|(?<![\w.:/-])(\d{3,5})(?![\w%-]|\.\w)/g;

/** Splits text into strings and {id, raw[, story, label]} pieces. ids: document ids of this story; spaces: namespaces to try
 *  for bare numbers; other(id): a full id of another story -> {story, label} or null (label: a string, or a function of the
 *  language). */
export function tokenize(text, ids, spaces, other = () => null) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    let id = null, ext = null;
    if (m[1] && ids.has(m[1])) id = m[1];
    // (another story's id that opens a range, "story.1–8", is the range's first number, not that story: kept as written)
    else if (m[1] && !/^[–—-]\d/.test(text.slice(m.index + m[0].length)) && (ext = other(m[1]))) id = m[1];
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
  // (a bracketed name too: "12155（奥伏戎的愤怒）"; each quote closes with its own mark, so a bracket inside one is part of the
  // name: "「天上正在下（物种名）！」" lost "「天上正在下（物种名）" and left "！」")
  const m = /^\s?(?:["“]([^"”]{1,80})["”]|「([^」]{1,80})」|『([^』]{1,80})』|[（(]([^）)]{1,80})[）)])/.exec(text);
  const q = m && [m[0], m[1] ?? m[2] ?? m[3] ?? m[4]];
  if (q && sameName(q[1], label)) return text.slice(q[0].length);
  // (a quoted title that differs from the link's, the guide's older name for the same document: 'Spore Connection "Mycelium
  // Array"', '孢子连接「菌丝阵列」'; a title is short, without sentence punctuation, in title case in English: a quoted choice
  // or line stays)
  const t = q && /^\s?["“「『]/.test(q[0]) ? q[1].trim() : "";
  // (in the link's own script only: in the other language's half a quoted name is that language's name, kept)
  const han = (s) => /[㐀-鿿]/.test(s);
  // (and only after a link that reads as a title: a link left as its id, "distar.3040", is named by the quote)
  const titled = label && !/^(?:[\w-]+[.:])?\d+$/.test(label.trim());
  // (a title may end with the mark the link's own title ends with: "天上正在下生物！")
  const end = /[！？!?]$/.exec(t)?.[0], u = end && label.trim().endsWith(end) ? t.slice(0, -1) : t;
  const title = u && titled && han(u) === han(label) && u.length <= 32 && !/[。，！？.,!?;；：:]/.test(u) && (han(u) ? u.length >= 2 && u.length <= 10 : u.split(/\s+/).length >= 2 && (u.match(/[A-Za-z]{4,}/g) || []).every((w) => /^[A-Z]/.test(w)));
  // (the stop after the quote goes with it when the title ends in its own mark: "失去遗珍！。")
  if (title) { const rest = text.slice(q[0].length); return /[！？!?]$/.test(label.trim()) && /^[。.](?![\d.])/.test(rest) ? rest.slice(1) : rest; }
  // (and the label itself written out unquoted, as a whole word or phrase: "2735 真菌通讯 → 2745 真菌之辩护")
  const s = /^\s?/.exec(text)[0].length;
  // (in any case: "3055 blackmail" after a link titled "Blackmail")
  // (apostrophes either way: "The Kha’lanka" after a link titled "The Kha'lanka")
  const same = (x) => x.toLowerCase().replace(/[’‘]/g, "'");
  return label && label.length > 1 && same(text.slice(s, s + label.length)) === same(label) && !/^[\p{L}\p{N}]/u.test(text.slice(s + label.length)) ? text.slice(s + label.length) : text;
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
    // (the space before a Chinese name is already gone, trimGlueSpaces: "**2049 情势变化**" read "局势变换情势变化")
    const m = /^\s*(\p{L}[^/（(：:]*?)(\s*\/\s*|$)/u.exec(next);
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
  // (a name the guide writes with the game's placeholder, "发现[物种]战士" / "天上正在下（物种名）！", is the title with a name filled in)
  const holes = String(name).split(/\[[^\]]{1,40}\]|（[^）]{1,8}名?）/);
  if (holes.length > 1 && holes.some((h) => flat(h).length >= 2))
    return new RegExp(`^${holes.map(flat).join(".{1,16}")}$`, "u").test(b); // (flat() leaves letters and digits only: nothing to escape)
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
    if (!open) {
      // (and an id right after its own whole title, unbracketed: "Recovered Fragment 1610." read "Recovered Fragment Recovered
      // Fragment." once the id was linked)
      // (the title ends the text, to its last mark: never "(→" taken in with the name before it)
      const bare = before.replace(/\s+$/, ""), last = p.text.trim().slice(-1).toLowerCase();
      const k = (bare.length < before.length || /[㐀-鿿]$/.test(bare)) && bare.slice(-1).toLowerCase() === last ? suffixOf(bare, p.text) : -1;
      if (k >= 0 && flat(p.text).length >= 4) { i = put(i, bare.slice(0, k), { ...p, text: bare.slice(k) }, after); continue; }
      // (or a shorter English name of two or more of the title's own words: "shows Warriors Sighted marauder.3" for "Marauder
      // Warriors Sighted")
      const tail = bare.length < before.length && /(?:[A-Z][\w'’-]*\s+){1,4}[A-Z][\w'’-]*$/.exec(bare);
      if (tail) {
        const ws = tail[0].split(/\s+/);
        for (let n = ws.length; n >= 2; n--) {
          const phrase = ws.slice(-n).join(" ");
          if (sameName(phrase, p.text)) { i = put(i, bare.slice(0, bare.length - phrase.length), { ...p, text: phrase }, after); break; }
        }
      }
      continue;
    }
    if (!core.trim()) {
      if (sameName(prevText(p), p.text)) i = put(i, core, { ...p, lead: true }, rest);
      continue;
    }
    const k = suffixOf(core, p.text);
    if (k >= 0) { i = put(i, core.slice(0, k), { ...p, text: core.slice(k) }, rest); continue; }
    // (or a shorter English name made of the title's own words, "Spymaster Exposed (3050)" for "The spymaster Exposed": two words
    // or more, so a stray word is never taken for the name)
    const tail = /(?:[A-Za-z][\w'’-]*\s+){1,5}[A-Za-z][\w'’-]*$/.exec(core);
    if (tail) {
      const ws = tail[0].split(/\s+/);
      for (let n = ws.length; n >= 2; n--) {
        const phrase = ws.slice(-n).join(" ");
        if (sameName(phrase, p.text)) { i = put(i, core.slice(0, core.length - phrase.length), { ...p, text: phrase }, rest); break; }
      }
    }
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
 *  {story, label} (or null); title(chapter, lang) and a label function name a link in the language of the half it sits in
 *  (the other-language view read "shows Warriors Sighted 发现掠夺者战士"). */
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
  const half = (node) => node.parentElement?.closest("[data-lang]")?.dataset.lang;
  const work = nodes.map((node) => ({ node, labelled: trimGlueSpaces(tokenize(node.nodeValue, ids, spaces, other)).map((p) =>
    typeof p === "string" || p.muted ? p : { ...p, text: (p.story ? (typeof p.label === "function" ? p.label(half(node)) : p.label) : title(byId.get(p.id), half(node))) || p.raw }) }));
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
    // (or, for text opening one language's half of a line, that language's half of a bold name in both languages before it:
    // "**高价合金 / Valuable Alloys**（paragon.40920）", 31 lines, read "高价合金 （高价合金）")
    const host = !prev && node.parentElement?.dataset?.lang ? node.parentElement : null;
    let before = host?.previousSibling; // (past spaces and the other language's half of the text)
    while (before && ((before.nodeType === 3 && !before.nodeValue.trim()) || (before.nodeType === 1 && before.dataset?.lang && before.dataset.lang !== host.dataset.lang))) before = before.previousSibling;
    // (the half the link's title names: the English page links "Population Control Program" though only the Chinese text
    // carries the id)
    const halves = before?.nodeType === 1 && /^(STRONG|B)$/.test(before.tagName) ? [...before.children].filter((c) => c.dataset?.lang && !c.children.length) : [];
    const plain = prev?.nodeType === 1 && /^(STRONG|B|EM|I)$/.test(prev.tagName) && !prev.children.length ? prev : null;
    const leadFor = (p) => plain || (p && halves.find((h) => sameName(h.textContent, p.text))) || null;
    // A bold element made of "id name" pairs names its documents itself.
    const boldIds = /^(STRONG|B)$/.test(node.parentElement?.tagName || "") && node.parentElement.childNodes.length === 1 && typeof labelled[0] === "object";
    const parts = foldEchoes(boldIds ? foldNamed(labelled) : labelled, (p) => leadFor(p)?.textContent || "");
    const frag = doc.createDocumentFragment();
    let glue = null; // a link and the closing punctuation right after it stay on one line (no "，" at a line start)
    for (const p of parts) {
      if (typeof p === "string") {
        let s = glue ? dropEcho(glue.textContent, p) : p;
        // (a Chinese name written right after the link, near its title but not the same, "1320 分配争执" for "部门分配争议": the
        // guide's own name is the link, said once, instead of "部门分配争议分配争执")
        // (only in a list of names, "、"/"；"-separated: words that run on into the sentence, "在修复完成后", are not a name)
        // (nor are words that open with a joining word, "的三个形态互斥", "同时展示…")
        const near = glue && s === p && /^\s?(?!的|之|与|和|或|及|在|是|为|被|把|将|对|从|向|于|后|时|同时|并|且|再|又|也|则|就|即|以|而)([㐀-鿿]{3,8})(?=[、；）)]|$)/.exec(s);
        if (near && [...near[1]].some((_, i, a) => i < a.length - 1 && glue.textContent.includes(a[i] + a[i + 1]))) {
          glue.firstChild.textContent = near[1];
          s = s.slice(near[0].length);
        }
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
      if (p.lead) {
        const lead = leadFor(p);
        b.textContent = lead.textContent;
        lead.replaceChildren(b);
        linked++;
        // (the bracket gone, the text now opens with its colon: the space between the name and it goes too, "名称 ：" -> "名称：")
        if (lead !== plain && /^[：:，,]/.test(parts.slice(parts.indexOf(p) + 1).find((x) => typeof x === "string") || ""))
          for (let s = host.previousSibling; s && s !== before; s = s.previousSibling) if (s.nodeType === 3 && !s.nodeValue.trim()) s.nodeValue = "";
        continue;
      }
      glue = doc.createElement("span");
      glue.className = "guide-glue";
      glue.append(b);
      frag.append(glue);
      linked++;
    }
    node.replaceWith(frag);
  }
  // A name in italics or bold right after its link ("6170 *The Final Gift*") repeats the link's own title: the written name
  // becomes the link, in the guide's own words, and is not said twice.
  for (const b of root.querySelectorAll("button.guide-doc")) {
    const glue = b.parentElement?.classList.contains("guide-glue") && b.parentElement.lastChild === b ? b.parentElement : null;
    const gap = glue?.nextSibling;
    const el = gap?.nodeType === 3 && !gap.nodeValue.trim() ? gap.nextSibling : gap;
    if (el?.nodeType === 1 && /^(EM|I|STRONG|B)$/.test(el.tagName) && !el.children.length && sameName(el.textContent, b.textContent)) {
      b.textContent = el.textContent;
      el.remove();
    }
  }
  return linked;
}