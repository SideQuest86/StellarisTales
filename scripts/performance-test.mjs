import { pathToFileURL } from "node:url";
import { writeFile } from "node:fs/promises";
const { chromium } = await import(
  process.env.STELLARIS_PLAYWRIGHT_PATH
    ? pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href
    : "playwright"
);
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
await page.locator(".story-card").first().waitFor();
const metrics = await page.evaluate(async () => {
  const frames = [];
  let previous = performance.now(),
    running = true;
  const measure = (t) => {
    frames.push(t - previous);
    previous = t;
    if (running) requestAnimationFrame(measure);
  };
  requestAnimationFrame(measure);
  for (let i = 0; i < 20; i++) {
    document.querySelector("#next-feature").click();
    await new Promise((r) => setTimeout(r, 80));
  }
  await new Promise((r) => setTimeout(r, 1800));
  running = false;
  let idleMutations = 0;
  const observer = new MutationObserver((r) => (idleMutations += r.length));
  observer.observe(document.querySelector("#deck"), {
    attributes: true,
    subtree: true,
  });
  await new Promise((r) => setTimeout(r, 600));
  observer.disconnect();
  const sorted = frames.slice(2).sort((a, b) => a - b);
  return {
    samples: sorted.length,
    medianFrameMs: sorted[Math.floor(sorted.length * 0.5)],
    p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
    worstFrameMs: sorted.at(-1),
    idleStyleMutations: idleMutations,
    visibleCards: document.querySelectorAll(".archive-slab").length,
    catalogueCards: document.querySelectorAll(".story-card").length,
    domNodes: document.querySelectorAll("*").length,
    scope:
      "Desktop headless Chrome, local server, no CPU throttling; not a physical mobile-device benchmark.",
  };
});
await writeFile(
  "verification/performance.json",
  JSON.stringify(metrics, null, 2),
);
await browser.close();
console.log(JSON.stringify(metrics));
if (metrics.idleStyleMutations !== 0)
  throw new Error("Deck continues updating while idle");
if (metrics.catalogueCards > 24) throw new Error("Unbounded catalogue DOM");
