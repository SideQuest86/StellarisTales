import { pathToFileURL } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
const { chromium } = await import(
  process.env.STELLARIS_PLAYWRIGHT_PATH
    ? pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href
    : "playwright"
);
const category = process.argv[2],
  examples = {
    origins: "origin_primal_calling",
    precursors: "cybrex",
    exploration: "horizon-signal",
    rifts: null,
    crisis: "contingency",
    leviathans: null,
    society: null,
    stories: "the-shroud",
  };
if (!(category in examples)) throw Error("Choose an archive category");
const index = JSON.parse(await readFile("public/stories/index.json", "utf8"));
const id =
  examples[category] ||
  index.stories
    .filter((s) => s.visible && s.category === category)
    .sort((a, b) => b.chapters - a.chapters)[0].id;
const d = JSON.parse(await readFile(`public/stories/${id}.json`, "utf8"));
const url = process.env.STELLARIS_TEST_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ headless: true, channel: "chrome" }),
  p = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
await p.goto(url + "#story=" + id, { waitUntil: "networkidle" });
await p.locator("#reader-title").waitFor();
const seen = [];
for (let i = 0; i <= d.story.navigation.order.length; i++) {
  const chapter = await p.evaluate(() =>
    new URLSearchParams(location.hash.slice(1)).get("chapter"),
  );
  if (seen.includes(chapter)) throw Error("Reading loop at " + chapter);
  seen.push(chapter);
  const next = p.locator(".chapter-end .reading-next");
  if (!(await next.count())) break;
  const target = await next.getAttribute("data-chapter");
  await next.click();
  await p.waitForFunction(
    (id) => new URLSearchParams(location.hash.slice(1)).get("chapter") === id,
    target,
  );
}
if (seen.length !== d.story.navigation.order.length)
  throw Error(
    `Incomplete tour ${seen.length}/${d.story.navigation.order.length}`,
  );
await p.locator("#chapter-toggle").click();
const nodes = await p.locator(".map-chapter").count();
if (nodes !== seen.length) throw Error("Incomplete branch tree");
await p.screenshot({ path: `verification/v2-tree-${category}.png` });
const report = {
  category,
  story: id,
  url,
  chapters: seen.length,
  treeNodes: nodes,
  traversed: seen,
  errors,
};
await writeFile(
  `verification/categories/${category}-browser.json`,
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(JSON.stringify({ ...report, traversed: undefined }));
if (errors.length) throw Error("Browser errors");
