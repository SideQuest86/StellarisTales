// Chinese glyph warm-up. The first layout of a CJK character in a given web-font face and size costs Chrome about
// 0.04 ms (font subset lookup, shaping, glyph metrics); later layouts of the same character are nearly free. A story's
// first chapter has hundreds of distinct characters, so opening the first story used to block one frame for 40–60 ms.
// During idle time this lays out the archive's most frequent characters (stories/glyphs.json, written by the
// compiler) in the reader's main faces, a few dozen characters per idle slice, after the matching font subsets have
// loaded. Skipped when the browser asks to save data.
const FACES = [
  { font: "400 19px var(--serif-zh)", count: 3000 }, // narrative
  { font: "400 17px var(--serif-zh)", count: 3000 }, // choices
  { font: "600 clamp(30px, 2.5vw, 40px) var(--serif-zh)", count: 900 }, // reader title
  { font: "400 14px var(--sans)", count: 900 }, // commentary notes
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
const idle = () => new Promise((resolve) => (window.requestIdleCallback ? requestIdleCallback(resolve, { timeout: 4000 }) : setTimeout(() => resolve(null), 120)));

export async function warmGlyphs(load) {
  const connection = navigator.connection;
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return;
  const slim = isConstrained();
  if (slim) await networkQuiet(2500, 30000); // let covers finish first on slow links
  let glyphs;
  try {
    glyphs = (await load("stories/glyphs.json")).zh || "";
  } catch {
    return;
  }
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:0;top:0;width:640px;visibility:hidden;pointer-events:none;contain:layout paint style;z-index:-1";
  document.body.append(host);
  const progress = (window.__glyphWarmup = { started: performance.now(), laidOut: 0, done: false });
  // Request every font slice the warm-up needs at once (the browser downloads them in parallel; on a slow connection
  // a batch-by-batch wait took ~9 s instead of ~5 s), then lay the glyphs out slice by slice in idle time.
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
  for (const { face, resolved, ready } of loads) {
    host.style.font = resolved;
    const text = glyphs.slice(0, face.count);
    await ready; // a failed slice only means the fallback face is used
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
