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
  const re = /(?<=[㐀-鿿豈-﫿。！？）；：*])\s*(?:\/\s*)?(?=\*{0,2}(?:[A-Za-z"“(\[]|\d))/g;
  let m;
  while ((m = re.exec(s))) {
    if (!m[0]) re.lastIndex++; // zero-width match: step on
    if (!m.index) continue;
    let head = s.slice(0, m.index).trim();
    let tail = s.slice(m.index + m[0].length).trim();
    // "…结束事件链 cs_inetian_chain / a new, unused device": the identifier ends the Chinese half; the slash is the boundary.
    const idSlash = /^(`?[\w-]*(?:[_/]|\.(?=\w))[\w/:.-]*`?)\s*\/\s+/.exec(tail);
    if (idSlash) { head = `${head} ${idSlash[1]}`; tail = tail.slice(idSlash[0].length); }
    // (or after a Chinese full stop and a space: "…出现。   275 only appears when …"; the checks below still require an
    // English tail, so "。9010“谜团重现”…" stays whole)
    const afterStop = "。！？".includes(s[m.index - 1]) && /\s/.test(m[0]);
    // An English half is never glued to a Chinese character ("隐藏事件cstorms.10" is one Chinese phrase with an id in it), and
    // it does not run into Chinese at once ("…本身没有 DLC 检查）/ Horizon …": the boundary is the slash).
    if (!m[0] && /[㐀-鿿豈-﫿]/.test(s[m.index - 1])) continue;
    if (/[㐀-鿿豈-﫿]/.test(tail.replace(/`[^`]*`/g, "").replace(SCRIPT_ID, "").trim().slice(0, 16))) continue;
    if (/^\*{0,2}\d/.test(tail) && !/^\*{0,2}\d+'s/.test(tail) && !m[0].includes("/") && !afterStop) continue;
    const latin = (tail.match(/[A-Za-z]/g) || []).length;
    const cjk = (tail.match(CJK_RE) || []).length;
    // The English half must be (nearly) free of Chinese: an English name inside the Chinese sentence ("：Ex Gravitas（1200 → …）
    // → 3 天后“静待揭晓”…") is not the boundary, and splitting there hid the rest of the Chinese line.
    // (detectLang leaves script identifiers out; so does the check for an English phrase inside the Chinese half)
    const prose = head.replace(/`[^`]*`/g, "").replace(SCRIPT_ID, "");
    if (latin >= 12 && cjk * 25 < latin && detectLang(head) === "zh" && !/[A-Za-z]{4,}\s+[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(prose)) return [head, tail];
  }
  return null;
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
  if (!parts) return lead ? lead + inline(body) : null;
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
      out.push(`<${tag}>${items.map((t) => `<li data-mixed="1">${bilingual(t) ?? inline(t)}</li>`).join("")}</${tag}>`);
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
  const has = (l) => root.querySelector(`[data-lang="${l}"]`);
  const other = lang === "zh" ? "en" : "zh";
  if (has("zh") && has("en")) {
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
