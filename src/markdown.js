// Small dependency-free Markdown renderer for story guides. Everything is escaped first; HTML is built only from
// parsed tokens. Raw HTML, images and unsafe URLs are dropped.
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const hasCJK = (s) => /[㐀-鿿豈-﫿　-〿＀-￯]/.test(s);
export function detectLang(s) {
  const text = String(s).replace(/`[^`]*`/g, "");
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
  const re = /(?<=[㐀-鿿豈-﫿。！？）；：])\s*(?=[A-Za-z"“(\[]|\d+'s)/g;
  let m;
  while ((m = re.exec(s))) {
    if (!m[0]) re.lastIndex++; // zero-width match: step on
    if (!m.index) continue;
    const head = s.slice(0, m.index).trim();
    const tail = s.slice(m.index + m[0].length).trim();
    const latin = (tail.match(/[A-Za-z]/g) || []).length;
    const cjk = (tail.match(CJK_RE) || []).length;
    if (latin >= 12 && cjk * 4 < latin && detectLang(head) === "zh" && !/[A-Za-z]{4,}\s+[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(head.replace(/`[^`]*`/g, ""))) return [head, tail];
  }
  return null;
}

const bilingual = (text, lead = "") => {
  const parts = splitMixed(text);
  if (!parts) return null;
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
      const parts = /^([^A-Za-z]*[㐀-鿿][^A-Za-z]*?)\s+([A-Za-z][^㐀-鿿]*)$/.exec(m[2]);  // "如何开始 How it starts"
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

/** Build the guide element with a language toggle: current language first-class, the other on request. */
export function guideElement(md, lang, labels) {
  const root = document.createElement("div");
  root.className = "md-guide";
  root.dataset.show = lang;
  root.innerHTML = renderMarkdown(md, { lang });
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
