// Chinese glyph warm-up. The first layout of a CJK character in a given web-font face and size costs Chrome about
// 0.04 ms (font subset lookup, shaping, glyph metrics); later layouts of the same character are nearly free. A story's
// first chapter has hundreds of distinct characters, so opening the first story used to block one frame for 40–60 ms.
// During idle time this lays out the archive's most frequent characters (stories/glyphs.json, written by the
// compiler) in the reader's main faces, a few dozen characters per idle slice, after the matching font files have
// loaded. The Chinese faces are self-hosted (public/fonts, @font-face in src/fonts.css), cut into three unicode-range tiers
// per face: tier 1 holds ASCII, the interface's characters and the first ~1,000 glyphs.json entries, tier 2 the rest of the
// 3,500 most frequent characters, tier 3 the rare ones (names, effect labels). So `document.fonts.load()` for the first
// 600–1,000 glyphs fetches one file per face and for 3,000 glyphs two. Skipped when the browser asks to save data.
const FACES = [
  { font: "400 19px var(--serif-zh)", count: 3000 }, // narrative
  { font: "400 17px var(--serif-zh)", count: 3000 }, // choices
  { font: "600 clamp(30px, 2.5vw, 40px) var(--serif-zh)", count: 900 }, // reader title
  { font: "400 14px var(--sans)", count: 900 }, // commentary notes
  { font: "400 12px var(--sans)", count: 400 }, // eyebrow, headings, continue cards (small print)
  { font: "500 12px var(--sans)", count: 200 }, // other-language subtitle
  { font: "400 16px var(--serif-zh)", count: 600 }, // continue cards: titles
  { font: "600 18px var(--serif-zh)", count: 300 }, // story title under the card
  { font: "500 13px var(--sans)", count: 1000 }, // story map: node titles (SVG text)
  { font: "400 11px var(--sans)", count: 800 }, // story map: captions
];
// ---------------------------------------------------------------------------------------------------------------
// Tier 2 of the faces the warm-up lays out in only up to 1,000 glyphs, and tier 3 of every face, are files the warm-up above
// does not fetch. A font file that arrives after the page was laid out re-lays out every text on the page ("fonts changed":
// a 40–70 ms frame), so the files a story needs are requested before its first layout; openStory / goChapter wait for
// them for at most 150 ms, the story map for at most 600 ms (a slow link falls back to the usual swap).
/** The Chinese strings of a value ({zh, en} pairs anywhere inside), each cut to `max` characters. */
export function zhStrings(value, max = 400, out = [], depth = 0) {
  if (!value || typeof value !== "object" || depth > 7) return out;
  if (Array.isArray(value)) {
    for (const item of value) zhStrings(item, max, out, depth + 1);
    return out;
  }
  if (typeof value.zh === "string") out.push(value.zh.slice(0, max));
  for (const [key, item] of Object.entries(value)) if (key !== "zh" && key !== "en") zhStrings(item, max, out, depth + 1);
  return out;
}
/** Distinct Han characters of some strings. */
export function hanChars(strings) {
  const seen = new Set();
  for (const text of strings)
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c >= 0x3400 && (c <= 0x4dbf || (c >= 0x4e00 && c <= 0x9fff) || (c >= 0xf900 && c <= 0xfaff))) seen.add(text[i]);
    }
  return [...seen].join("");
}
/** Request the font files (tiers) holding the characters of [[weight, "--serif" | "--sans", text], …]; resolves when they are loaded (never rejects). */
export function loadFonts(parts) {
  if (!document.fonts?.load) return Promise.resolve();
  const style = getComputedStyle(document.documentElement);
  return Promise.all(
    parts.filter(([, , text]) => text).map(([weight, variable, text]) => document.fonts.load(`${weight} 16px ${style.getPropertyValue(variable) || "serif"}`, text).catch(() => {})),
  );
}
/** loadFonts(), but never longer than `ms`. */
export function loadFontsWithin(parts, ms) {
  let timer;
  return Promise.race([loadFonts(parts), new Promise((resolve) => (timer = setTimeout(resolve, ms)))]).finally(() => clearTimeout(timer));
}
/** Font files for one document: reading text and choices (serif), title (serif 600), commentary (sans). English shows Han only in the subtitle. */
export function docFontParts(chapter, lang) {
  const title = chapter.title?.zh || "";
  if (lang === "en") return [[500, "--sans", hanChars([title])]];
  const { title: _title, notes, unreachable, ...rest } = chapter;
  return [
    [400, "--serif", hanChars(zhStrings(rest, Infinity))],
    [600, "--serif", hanChars([title])],
    [400, "--sans", hanChars(zhStrings([notes, unreachable]))],
  ];
}
/** Font files for a story map (labels are cut to what fits a node: titles and captions, sans 13 / 11 px). */
export function mapFontParts(story, chapters, lang) {
  if (lang === "en") return [];
  const text = hanChars([...zhStrings(story.tree, 28), ...zhStrings(story.nodeLabels, 28), ...chapters.map((c) => (c.title?.zh || "").slice(0, 28))]);
  return [[500, "--sans", text], [400, "--sans", text]];
}

// Every non-Han symbol the interface draws (reader chrome, story map, effects panels), and the faces it draws them in.
const SYMBOLS = "·×–—’“”…›←→↗↩↻−∥≈⊡▾◇◈◎⚄✓✧⤢、。《》（），：；？！";
const SYMBOL_FACES = [
  "500 13px var(--sans)", "italic 400 11px var(--sans)", "400 11px var(--sans)", "400 19px var(--serif-zh)", "400 17px var(--serif-zh)",
  "400 14px var(--sans)", "400 12px var(--sans)", "500 12px var(--sans)", "400 13px var(--sans)", "400 12.88px var(--sans)",
  "400 16px var(--serif-zh)", "400 19px var(--serif-en)", "400 17px var(--serif-en)", "400 11px var(--mono)", "400 10.5px var(--mono)",
];
const STACKS = ["var(--serif-zh)", "var(--serif-en)", "var(--sans)", "var(--mono)", "Georgia, serif"];
const CHUNK = 40;

/** Slow, metered or small touch device: warm only the most frequent glyphs, later, and keep audio/fonts behind the covers. */
export function isConstrained() {
  const c = navigator.connection;
  if (c?.saveData) return true;
  if (c?.effectiveType && c.effectiveType !== "4g") return true;
  // Not `downlink`: Chrome's estimate reads ~1.5 Mbit/s on fast desktops, which would slim the warm-up and hold back
  // autoplay there too; effectiveType already falls below "4g" on genuinely slow links.
  try {
    return matchMedia("(pointer: coarse)").matches && Math.min(screen.width, screen.height) <= 820;
  } catch {
    return false;
  }
}

/** Resolves once the page has loaded and no new resource finished for `quietMs` (or after `maxMs`). */
export function networkQuiet(quietMs = 1500, maxMs = 20000) {
  // A cold load makes ~240 requests; the default buffer (250 entries) would stop counting and look quiet too early.
  try { performance.setResourceTimingBufferSize(1500); } catch {}
  return new Promise((resolve) => {
    const started = performance.now();
    let last = -1, since = started;
    const poll = () => {
      const now = performance.now();
      const n = performance.getEntriesByType("resource").length;
      if (n !== last) { last = n; since = now; }
      if ((document.readyState === "complete" && now - since >= quietMs) || now - started >= maxMs) resolve();
      else setTimeout(poll, 400);
    };
    setTimeout(poll, 400);
  });
}
/** Resolves once the page knows the Noto web fonts (their @font-face rules are in), or after `maxMs`. The rules are in
 *  src/fonts.css, a local render-blocking stylesheet, so this returns at the first check; it stays as a guard. */
async function fontsDeclared(maxMs = 4000) {
  const started = performance.now();
  const declared = () => { for (const face of document.fonts) if (face.family.includes("Noto Serif SC")) return true; return false; };
  while (!declared() && performance.now() - started < maxMs) await new Promise((resolve) => setTimeout(resolve, 100));
}
const idle = () => new Promise((resolve) => (window.requestIdleCallback ? requestIdleCallback(resolve, { timeout: 4000 }) : setTimeout(() => resolve(null), 120)));

/** `before` (optional, async): runs before the glyphs are laid out, e.g. to fetch the font files the first story needs (a file that arrives later resets the warmed state of its face). */
export async function warmGlyphs(load, before) {
  const connection = navigator.connection;
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return;
  const slim = isConstrained();
  if (slim) await networkQuiet(2500, 30000); // let covers finish first on slow links
  // Until the @font-face rules are declared, document.fonts.load() resolves at once for the family and the glyphs would be
  // laid out in a system fallback instead of the web font (measured with the former non-blocking Google Fonts stylesheet: the
  // first two faces were warmed in SimSun, so the first real chapter still paid ~30 ms of first-use costs). The self-hosted
  // rules live in the blocking src/fonts.css, so this does not wait; only a failed stylesheet would make it wait up to 4 s.
  await fontsDeclared();
  let glyphs;
  try {
    glyphs = (await load("stories/glyphs.json")).zh || "";
  } catch {
    return;
  }
  if (!slim)
    try {
      await before?.();
    } catch {}
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:0;top:0;width:640px;visibility:hidden;pointer-events:none;contain:layout paint style;z-index:-1";
  document.body.append(host);
  const progress = (window.__glyphWarmup = { started: performance.now(), laidOut: 0, done: false });
  // Request every font file the warm-up needs at once (the browser downloads them in parallel; on a slow connection
  // a batch-by-batch wait took ~9 s instead of ~5 s), then lay the glyphs out a few dozen at a time in idle time.
  const faces = slim ? [{ ...FACES[0], count: 600 }] : FACES; // constrained: one face, most frequent 600 glyphs
  const loads = faces.map((face) => {
    host.style.font = face.font;
    const resolved = getComputedStyle(host).font;
    return { face, resolved, ready: document.fonts.load(resolved, glyphs.slice(0, face.count)).catch(() => {}) };
  });
  // Every face the reader uses at least once (local system fonts also pay a first-use cost on Windows).
  for (const family of slim ? STACKS.slice(0, 2) : STACKS) {
    for (const weight of [400, 500, 600]) {
      await idle();
      host.style.font = `${weight} 15px ${family}`;
      host.textContent = "Aa Zz 0123 —…“”《》，。中文档案";
      host.getBoundingClientRect();
    }
  }
  // Symbols and punctuation outside the Han ranges (← → ◇ ∥ ↩ ↻ ⚄ …) come from a system fallback font on most machines, and
  // the first use of each one in each face asks the OS for a font: 2–20 ms apiece (the ↩ of a reference node costs ~15 ms in
  // the story map alone). Each is laid out once in every face the reader and the map use, ahead of time.
  for (const font of slim ? SYMBOL_FACES.slice(0, 5) : SYMBOL_FACES) {
    await idle();
    host.style.font = font;
    for (const ch of SYMBOLS) {
      host.textContent = ch;
      host.getBoundingClientRect();
    }
  }
  for (const { face, resolved, ready } of loads) {
    host.style.font = resolved;
    const text = glyphs.slice(0, face.count);
    await ready; // a failed file only means the fallback face is used
    for (let i = 0; i < text.length; ) {
      const batch = text.slice(i, i + CHUNK * 4);
      const end = i + batch.length;
      while (i < end) {
        const deadline = await idle();
        do {
          host.textContent = text.slice(i, i + CHUNK);
          host.getBoundingClientRect();
          i += CHUNK;
          progress.laidOut += CHUNK;
        } while (i < end && deadline && deadline.timeRemaining() > 6);
      }
    }
  }
  host.remove();
  progress.done = true;
  progress.ms = Math.round(performance.now() - progress.started);
}
