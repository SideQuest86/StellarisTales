// Small dependency-free Markdown renderer for story guides. Everything is escaped first; HTML is built only from
// parsed tokens. Raw HTML, images and unsafe URLs are dropped.
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const hasCJK = (s) => /[㐀-鿿豈-﫿　-〿＀-￯]/.test(s);
// A script identifier: joined by "_" or "/", or by a dot inside it (cstorms.10, 00_on_actions.txt), not a sentence's full stop.
const SCRIPT_ID = /[\w-]*(?:[_/]|\.(?=\w))[\w/:-]*(?:\.\w[\w/:-]*)*/g;
export function detectLang(s) {
  // Script identifiers (on_storm_left_system, common/on_actions/00_on_actions.txt, cstorms.10) are neither language: a Chinese
  // paragraph full of them is still Chinese.
  const text = String(s).replace(/`[^`]*`/g, "").replace(SCRIPT_ID, "");
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  if (!cjk && !latin) return "";
  return cjk * 2 >= latin ? "zh" : "en";
}

export function safeUrl(url) {
  const u = String(url).trim();
  if (/^#/.test(u)) return u;
  if (/^https?:\/\//i.test(u)) return u;
  if (/^(\.{0,2}\/)?[\w.~%@-][\w./~%@#?=&+-]*$/.test(u) && !/^[a-z][a-z0-9+.-]*:/i.test(u)) return u;
  return null;
}

export function inline(src) {
  const slots = [];
  const stash = (html) => `\u0000${slots.push(html) - 1}\u0000`;
  let s = String(src).replace(/\u0000/g, "");
  s = s.replace(/`([^`]+)`/g, (_, c) => stash(`<code>${esc(c)}</code>`));
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, ""); // images dropped
  s = s.replace(/\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)(?:\s+"[^"]*")?\)/g, (_, label, url) => {
    const safe = safeUrl(url);
    if (!safe) return label;
    const ext = /^https?:/i.test(safe);
    return stash(`<a href="${esc(safe)}" rel="noopener noreferrer"${ext ? ' target="_blank"' : ""}>${esc(label)}</a>`);
  });
  s = s.replace(/<[^>]*>/g, ""); // raw HTML dropped
  // No typeset() here: the guides are set in the CJK-first sans stack, which draws curly quotes full-width ("empire’ s").
  s = esc(s);
  s = s.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, (_, a, b) => `<strong>${a ?? b}</strong>`);
  s = s.replace(/\*([^*\s][^*]*)\*|(?<![\w])_([^_\s][^_]*)_(?![\w])/g, (_, a, b) => `<em>${a ?? b}</em>`);
  // restore stashed fragments (links' labels get emphasis-free text, already escaped)
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => slots[Number(i)]);
}

const langAttr = (text) => {
  const l = detectLang(text);
  return l ? ` lang="${l === "zh" ? "zh-CN" : "en"}" data-lang="${l}"` : "";
};

const CJK_RE = /[㐀-鿿豈-﫿]/g;

/** "中文。English." -> [zh, en] when a Chinese part is followed by an English part (the guides write both in one line); else null. */
export function splitMixed(text) {
  const s = String(text);
  if (!hasCJK(s) || !/[A-Za-z]{3}/.test(s)) return null;
  // The English half may start with bold/italic markers ("…）。 **Five chained sites**: …").
  // … or follow a slash ("…。 / The first option …"), and after a slash it may open with an event number ("…。/ 9005: the
  // science ship …"; without the slash a number belongs to the Chinese sentence: "320–360天后 9010“谜团重现”").
  const re = /(?<=[㐀-鿿豈-﫿。！？）；：*])\s*(?:\/\s*)?(?=\*{0,2}(?:[A-Za-z"“'‘(\[]|\d))/g;
  // A later boundary after a Chinese full stop beats the first one that passes when it leaves less Chinese in the English
  // half: "…；d（灵性）→2064。  2062: a agrees …" passed at "；" too (the bracket is skipped by the early check), which put the
  // last Chinese clause in English. (Only after a full stop: "来源 Sources：…（300 菜单 menu）…" keeps its split at the label.)
  let m, best = null;
  while ((m = re.exec(s))) {
    if (!m[0]) re.lastIndex++; // zero-width match: step on
    if (!m.index) continue;
    let head = s.slice(0, m.index).trim();
    let tail = s.slice(m.index + m[0].length).trim();
    // "…结束事件链 cs_inetian_chain / a new, unused device": the identifier ends the Chinese half; the slash is the boundary.
    // (also with the Chinese sentence's own stop after it: "…site_fossilized_jellyfish_random_events。 / Failed rolls …")
    const idSlash = /^(`?[\w-]*(?:[_/]|\.(?=\w))[\w/:.-]*`?[。；，]?)\s*\/\s+/.exec(tail);
    if (idSlash) { head = `${head} ${idSlash[1]}`; tail = tail.slice(idSlash[0].length); }
    // (or after a Chinese full stop and a space: "…出现。   275 only appears when …"; the checks below still require an
    // English tail, so "。9010“谜团重现”…" stays whole)
    const afterStop = "。！？".includes(s[m.index - 1]) && /\s/.test(m[0]);
    // An English half is never glued to a Chinese character ("隐藏事件cstorms.10" is one Chinese phrase with an id in it), and
    // it does not run into Chinese at once ("…本身没有 DLC 检查）/ Horizon …": the boundary is the slash).
    if (!m[0] && /[㐀-鿿豈-﫿]/.test(s[m.index - 1])) continue;
    // (a Chinese term quoted inside the English, 'The "天灾" event …', does not count)
    const early = tail.replace(/`[^`]*`/g, "").replace(/["“「（(\[][^"”」）)\]]{0,24}["”」）)\]]/g, "").replace(SCRIPT_ID, "").trim();
    if (/[㐀-鿿豈-﫿]/.test(early.slice(0, 16))) continue;
    if (/^\*{0,2}\d/.test(tail) && !/^\*{0,2}\d+'s/.test(tail) && !m[0].includes("/") && !afterStop) continue;
    // (a half that opens with a script identifier counts no identifier letters: "…需要 has_shroud_dlc）。" is one Chinese
    // sentence, while "来源 Sources：common/…" still splits at its label)
    const idLed = /^`?[\w-]*(?:[_/]|\.(?=\w))/.test(tail);
    const latin = ((idLed ? tail.replace(/`[^`]*`/g, "").replace(SCRIPT_ID, "") : tail).match(/[A-Za-z]/g) || []).length;
    const cjk = (tail.match(CJK_RE) || []).length;
    // The English half must be (nearly) free of Chinese: an English name inside the Chinese sentence ("：Ex Gravitas（1200 → …）
    // → 3 天后“静待揭晓”…") is not the boundary, and splitting there hid the rest of the Chinese line.
    // (detectLang leaves script identifiers out; so does the check for an English phrase inside the Chinese half)
    const prose = head.replace(/`[^`]*`/g, "").replace(SCRIPT_ID, "");
    if (latin >= 12 && cjk * 25 < latin && detectLang(head) === "zh" && !/[A-Za-z]{4,}\s+[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(prose)) {
      if (best && !(afterStop && cjk < best.cjk)) continue;
      if (!cjk) return [head, tail];
      best = { cjk, split: [head, tail] };
    }
  }
  return best ? best.split : null;
}

// The metadata line under a guide's title names each thing in both languages ("分类 Category：先驱者与考古 Precursors · DLC：
// 《远古遗物》Ancient Relics"): each page gets its own half ("分类：先驱者与考古 · DLC：《远古遗物》" / "Category: Precursors · DLC:
// Ancient Relics"); a value in one language only ("Shadows of the Shroud（has_shroud_dlc）") goes to both.
// Word by word: Chinese words to one side, Latin ones to the other, neutral ones ("/", "C8" beside Latin) to both; a
// bracket's content is split the same way. Returns [zh, en], either "" when that language has no words.
function pairWords(s) {
  const zh = [], en = [];
  const spaced = String(s).replace(/([㐀-鿿》」])(?=[A-Za-z(（])/g, "$1 ").replace(/([A-Za-z.)])(?=[《「（㐀-鿿])/g, "$1 ").replace(/([、，；])/g, " $1 ");
  // Tokens: Chinese (zh), English (en), or neutral (identifiers, numbers, acronyms, symbols: "distar.1055", "C8", "DLC", "&"),
  // which follow their nearest neighbours: one side when both neighbours are on it, both sides otherwise.
  const tokens = [];
  for (const m of spaced.matchAll(/（([^）]*)）|\(([^)]*)\)|\S+/g)) {
    if (m[1] != null || (m[2] != null && /[㐀-鿿]/.test(m[2]))) { tokens.push({ group: pairWords(m[1] ?? m[2]) }); continue; }
    const w = m[0];
    tokens.push({ w, side: /[㐀-鿿]/.test(w) ? "zh" : /[A-Za-z]{2,}/.test(w) && !/[\w][_.][\w]|\d/.test(w) && !/^\W*[A-Z]{2,4}\W*$/.test(w) ? "en" : "" });
  }
  const sideAt = (i, step) => { for (let j = i + step; j >= 0 && j < tokens.length; j += step) if (tokens[j].side) return tokens[j].side; return ""; };
  tokens.forEach((t, i) => {
    if (t.group) { if (t.group[0]) zh.push(`（${t.group[0]}）`); if (t.group[1]) en.push(`(${t.group[1]})`); return; }
    const before = sideAt(i, -1), after = sideAt(i, 1);
    const side = t.side || (before && before === after ? before : "");
    if (side !== "en") zh.push(t.w);
    if (side !== "zh") en.push(t.w);
  });
  const has = (list, re) => list.some((w) => re.test(w));
  return [has(zh, /[㐀-鿿]/) ? zh.join(" ").replace(/\s*（/g, "（").replace(/(?<=[㐀-鿿》）])\s+(?=[㐀-鿿《])/g, "") : "", has(en, /[A-Za-z]{2,}/) ? en.join(" ") : ""];
}
export function metaLine(text) {
  if (!/^分类\s*Category\s*[：:]/.test(text)) return null;
  const zh = [], en = [];
  for (const part of text.split(/\s+·\s+/)) {
    const m = /^([^：:（(]+)[：:]\s*(.*)$/.exec(part);
    const [lz, le] = m ? pairWords(m[1]) : ["", ""];
    // A value already written as "中文 / English" splits at its slash.
    const value = m ? m[2] : part, slash = /^(.*[㐀-鿿》）].*?)\s*\/\s*([^㐀-鿿]*[A-Za-z][^㐀-鿿]*)$/.exec(value);
    // (a value with no Chinese is a name both pages show: "DLC：Shadows of the Shroud")
    const [vz, ve] = slash ? [slash[1].trim(), slash[2].trim()] : !/[㐀-鿿]/.test(value) ? [`\u0003${value}\u0003`, value] : pairWords(value);
    const label = (l, fallback) => l || (m && !/[㐀-鿿]/.test(m[1]) ? m[1].trim() : fallback);
    if (vz) zh.push(m ? `${label(lz, "")}：${vz}` : vz);
    if (ve) en.push(m ? `${label(le, "")}: ${ve}` : ve);
  }
  const [z, e] = [zh.join(" · ").replace(/\s+([、，；])\s*/g, "$1"), en.join(" · ").replace(/\s*[、，；]\s*/g, ", ").replace(/,\s*(?=[)·]|$)/g, "")];
  // Free-form lines do not always split cleanly ("Distant" and "Stars" apart, a bracket left open): then the line stays whole.
  const balanced = (s) => (s.match(/[（(]/g) || []).length === (s.match(/[）)]/g) || []).length;
  const clean = !/[㐀-鿿、，；《》]/.test(e) && !/(?<![\w.])(?!DLC\b)[A-Za-z]{4,}(?![\w.])/.test(z.replace(/\u0003[^\u0003]*\u0003|`[^`]*`|[\w-]*[_.][\w.-]*/g, "")) && balanced(z) && balanced(e);
  return clean ? [z.replace(/\u0003/g, ""), e] : null;
}

const HEADING_PAIR = /^([^A-Za-z]*[㐀-鿿][^A-Za-z]*?)(?:\s*[/|｜·]\s*|\s+)([A-Za-z][^㐀-鿿]*)$/;
const bilingual = (text) => {
  // A bold lead that names the item in both languages ("**第一位领袖消失 The first leader is lost.** 9005：… / 9005: …")
  // belongs to both halves: it is split like a heading, the rest of the line as usual.
  let lead = "", body = text;
  const bold = /^\*\*([^*]+)\*\*\s*/.exec(text);
  const pair = bold && HEADING_PAIR.exec(bold[1].trim());
  if (pair) {
    lead = `<strong><span lang="zh-CN" data-lang="zh">${inline(pair[1])}</span> <span lang="en" data-lang="en">${inline(pair[2])}</span></strong> `;
    body = text.slice(bold[0].length);
  }
  const parts = splitMixed(body);
  // A body in one language keeps its own label, so the other language's page hides it.
  if (!parts) return lead ? lead + (body.trim() ? `<span${langAttr(body)}>${inline(body)}</span>` : "") : null;
  return `${lead}<span lang="zh-CN" data-lang="zh">${inline(parts[0])}</span> <span lang="en" data-lang="en">${inline(parts[1])}</span>`;
};

// Editor/maintenance sections of the guides (审阅记录 Review notes …): kept in the Markdown, shown collapsed at the very end.
const REVIEW_HEADING = /^(审阅记录|审阅|Review notes?)(\s|$)/i;

/** Render Markdown to HTML. Headings start at h3 (# -> h3 ... ### and deeper -> h5). opts.lang picks the language of the review summary. */
export function renderMarkdown(md, opts = {}) {
  const lines = String(md || "").replace(/\r\n?/g, "\n").split("\n");
  const main = [];
  const review = [];
  let out = main;
  let reviewDepth = 0;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line))) {
      const level = Math.min(5, 2 + m[1].length);
      if (REVIEW_HEADING.test(m[2])) { out = review; reviewDepth = m[1].length; i++; continue; }
      if (reviewDepth && m[1].length <= reviewDepth) { out = main; reviewDepth = 0; }
      // "如何开始 How it starts", "强制重置 / Forced Reset": the separator between the halves belongs to neither.
      // (No space is needed before the separator after a full-width bracket: "（第 0–1095 天）/ The storm".)
      const parts = HEADING_PAIR.exec(m[2]);
      out.push(parts
        ? `<h${level} class="md-block" data-mixed="1"><span lang="zh-CN" data-lang="zh">${inline(parts[1])}</span> <span lang="en" data-lang="en">${inline(parts[2])}</span></h${level}>`
        : `<h${level} class="md-block"${langAttr(m[2])} data-mixed="1">${inline(m[2])}</h${level}>`);
      i++;
    } else if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      out.push("<hr>"); i++;
    } else if (/^\s*>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ""));
      const text = buf.join(" ");
      out.push(`<blockquote class="md-block"${langAttr(text)}>${inline(text)}</blockquote>`);
    } else if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]/.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) {
        let item = lines[i++].replace(/^\s*([-*+]|\d+[.)])\s+/, "");
        while (i < lines.length && lines[i].trim() && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) item += " " + lines[i++].trim();
        items.push(item);
      }
      const tag = ordered ? "ol" : "ul";
      // An item in one language is labelled like a paragraph (the other language's page hides it); "无后续。" showed on both.
      out.push(`<${tag}>${items.map((t) => {
        const meta = metaLine(t);
        if (meta && meta[0] && meta[1]) return `<li data-mixed="1"><span lang="zh-CN" data-lang="zh">${inline(meta[0])}</span> <span lang="en" data-lang="en">${inline(meta[1])}</span></li>`;
        if (meta && (meta[0] || meta[1])) return `<li${langAttr(meta[0] || meta[1])}>${inline(meta[0] || meta[1])}</li>`;
        const bi = bilingual(t);
        return bi ? `<li data-mixed="1">${bi}</li>` : `<li${langAttr(t)}>${inline(t)}</li>`;
      }).join("")}</${tag}>`);
    } else {
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*>|\s*([-*+]|\d+[.)])\s+|\s*(-{3,}|\*{3,})\s*$)/.test(lines[i])) buf.push(lines[i++].trim());
      const text = buf.join(" ");
      const bi = bilingual(text);
      out.push(bi ? `<p class="md-block" data-mixed="1">${bi}</p>` : `<p class="md-block"${langAttr(text)}>${inline(text)}</p>`);
    }
  }
  if (review.length) {
    const label = opts.lang === "en" ? "Review notes" : "审阅记录";
    main.push(`<details class="md-review"><summary>${label}</summary>\n${review.join("\n")}\n</details>`);
  }
  return main.join("\n");
}

/** Wrap Chinese runs that are not already inside a zh-CN element in <span lang="zh-CN"> (English page: WCAG 3.1.2). */
export function markCJK(root) {
  const run = /[㐀-鿿豈-﫿][㐀-鿿豈-﫿　-〿＀-￯\s]*/g;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (hasCJK(n.nodeValue) && !n.parentElement.closest('[lang="zh-CN"]')) nodes.push(n);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    const text = node.nodeValue;
    let last = 0;
    for (const m of text.matchAll(run)) {
      if (m.index > last) frag.append(text.slice(last, m.index));
      const span = document.createElement("span");
      span.lang = "zh-CN";
      span.textContent = m[0].replace(/\s+$/, "");
      frag.append(span);
      last = m.index + span.textContent.length;
    }
    if (last < text.length) frag.append(text.slice(last));
    node.replaceWith(frag);
  }
}

/** Build the guide element with a language toggle: current language first-class, the other on request. */
export function guideElement(md, lang, labels) {
  const root = document.createElement("div");
  root.className = "md-guide";
  root.dataset.show = lang;
  root.innerHTML = renderMarkdown(md, { lang });
  // A section whose heading is followed by another heading of the same or a higher level (or nothing) is empty: the
  // guide audit keeps every template heading in the source, the reader does not need to see the empty ones.
  for (const h of [...root.querySelectorAll(":scope > h3, :scope > h4, :scope > h5")]) {
    const next = h.nextElementSibling;
    if (!next || next.matches("details.md-review") || (/^H[3-5]$/.test(next.tagName) && next.tagName <= h.tagName)) h.remove();
  }
  if (lang === "en") markCJK(root);
  // Body text in a language (headings and the review notes aside). A guide written only in the other language shows it on
  // this page too, instead of headings over nothing; the toggle is offered only when both languages have text.
  // (the metadata list under the title, "分类 Category：…", is not body text)
  const firstSection = root.querySelector(":scope > h4");
  const has = (l) => [...root.querySelectorAll(`[data-lang="${l}"]`)].some((e) => !e.closest("h3, h4, h5, details.md-review") && (!firstSection || firstSection.compareDocumentPosition(e) & 4));
  const other = lang === "zh" ? "en" : "zh";
  if (!has(lang) && has(other)) root.dataset.show = "all";
  // A section written only in one language: on the other page its heading steps aside with its text (the toggle shows both).
  const shows = (e, l) => (e.dataset.lang ? e.dataset.lang === l || "mixed" in e.dataset : e.querySelector(`[data-lang="${l}"]`) || !e.querySelector("[data-lang]") && e.textContent.trim());
  for (const h of root.querySelectorAll(":scope > h3, :scope > h4, :scope > h5")) {
    for (const l of ["zh", "en"]) {
      let any = false;
      for (let n = h.nextElementSibling; n && !(/^H[3-5]$/.test(n.tagName) && n.tagName <= h.tagName) && !n.matches("details.md-review"); n = n.nextElementSibling)
        if (!/^H[3-5]$/.test(n.tagName) && shows(n, l)) { any = true; break; }
      if (!any) h.dataset[`empty${l === "zh" ? "Zh" : "En"}`] = "";
    }
  }
  if (has(lang) && has(other)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "md-lang-toggle";
    btn.setAttribute("aria-pressed", "false");
    btn.textContent = labels.show;
    btn.onclick = () => {
      const on = root.dataset.show === "all";
      root.dataset.show = on ? lang : "all";
      btn.setAttribute("aria-pressed", String(!on));
      btn.textContent = on ? labels.show : labels.hide;
    };
    root.prepend(btn);
  }
  return root;
}
