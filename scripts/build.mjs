import {
  mkdir,
  cp,
  readFile,
  writeFile,
  stat,
  rm,
  lstat,
  readdir,
} from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve("dist");
if (output !== join(root, "dist"))
  throw new Error("Build must run from project root");
const existing = await lstat(output).catch((e) => {
  if (e.code !== "ENOENT") throw e;
});
if (existing?.isSymbolicLink())
  throw new Error("Refusing linked output directory");
await rm(output, { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await mkdir("dist/vendor", { recursive: true });
for (const file of ["three.module.js", "three.core.js"])
  await cp("node_modules/three/build/" + file, "dist/vendor/" + file);
await cp("node_modules/three/LICENSE", "dist/vendor/THREE-LICENSE.txt");
// Museum viewer add-ons (loaded only when an exhibit with a 3D model opens). Their bare `three` import is
// rewritten to the vendored module so no import map is needed.
for (const file of ["loaders/GLTFLoader.js", "controls/OrbitControls.js", "utils/BufferGeometryUtils.js", "utils/SkeletonUtils.js", "libs/meshopt_decoder.module.js"]) {
  const source = await readFile("node_modules/three/examples/jsm/" + file, "utf8");
  await mkdir(dirname("dist/vendor/addons/" + file), { recursive: true });
  await writeFile("dist/vendor/addons/" + file, source.replace(/from ['"]three['"]/g, "from '../../three.module.js'"));
}
// Full-text search index (public/search/, deterministic) is regenerated before public/ is copied.
if (!process.env.SKIP_SEARCH_INDEX)
  execFileSync(process.execPath, ["scripts/build-search-index.mjs"], { stdio: "inherit" });
await cp("src", "dist/src", { recursive: true });
await cp("public", "dist", { recursive: true });
// Specimen links on the archive and in chapters (museum/by-story.json, by-doc.json, "zh|en" names) read the names the
// museum shows: a save-dependent name inside one is resolved (src/name-fill.js specimenName), never a raw [token].
{
  const { specimenName } = await import("../src/name-fill.js");
  const { specimens } = JSON.parse(await readFile("dist/museum/specimens.json", "utf8"));
  const spec = new Map(specimens.map((s) => [s.key, s]));
  const name = (key, names) => {
    const s = spec.get(key), [zh, en] = names.split("|");
    return specimenName(zh, "zh", s?.placeholders) + "|" + specimenName(en, "en", s?.placeholders);
  };
  const byStory = JSON.parse(await readFile("dist/museum/by-story.json", "utf8"));
  for (const list of Object.values(byStory)) for (const item of list) item[1] = name(item[0], item[1]);
  await writeFile("dist/museum/by-story.json", JSON.stringify(byStory));
  const byDoc = JSON.parse(await readFile("dist/museum/by-doc.json", "utf8"));
  for (const entry of Object.values(byDoc)) for (const key of Object.keys(entry.names)) entry.names[key] = name(key, entry.names[key]);
  await writeFile("dist/museum/by-doc.json", JSON.stringify(byDoc));
  // (and so do the gameplay-effects lines "Gains the “…” specimen": "this name Crystalose" was the raw name's fallback)
  for (const f of await readdir("dist/effects")) {
    const path = "dist/effects/" + f, text = await readFile(path, "utf8");
    if (!text.includes('"kind":"specimen"') || !text.includes("[")) continue;
    const data = JSON.parse(text);
    let changed = false;
    (function walk(o) {
      if (!o || typeof o !== "object") return;
      if (o.kind === "specimen" && o.specimen && o.label)
        for (const l of ["zh", "en"]) {
          const fixed = o.label[l]?.replace(/(「|")([^」"]*\[[^」"]*)(」|")/, (m, a, n, b) => a + specimenName(n, l, spec.get(o.specimen)?.placeholders) + b);
          if (fixed && fixed !== o.label[l]) { o.label[l] = fixed; changed = true; }
        }
      for (const v of Object.values(o)) walk(v);
    })(data);
    if (changed) await writeFile(path, JSON.stringify(data));
  }
}
// An origin's opening screens (sections) are alternatives the game picks by the empire: their keys (data/origins.json, in
// order) let the reader name each one (src/app.js introTellings).
{
  const data = JSON.parse(await readFile("dist/data/origins.json", "utf8"));
  const origins = new Map((Array.isArray(data) ? data : data.origins || Object.values(data)).map((o) => [o.key || o.id, o]));
  for (const f of await readdir("dist/stories")) {
    if (!f.endsWith(".json") || f === "index.json") continue;
    const path = "dist/stories/" + f, text = await readFile(path, "utf8");
    if (!text.includes('"origin-intro:')) continue;
    const story = JSON.parse(text);
    let changed = false;
    for (const c of story.chapters || []) {
      const keys = c.id?.startsWith("origin-intro:") && origins.get(c.id.slice(13))?.introductions?.map((i) => i.key);
      if (keys?.length > 1 && keys.length === c.sections?.length) { c.introKeys = keys; changed = true; }
    }
    if (changed) await writeFile(path, JSON.stringify(story));
  }
}
// A story with no gameplay effects gets an empty file, so opening it requests nothing that fails.
const { stories } = JSON.parse(await readFile("dist/stories/index.json", "utf8"));
await mkdir("dist/effects", { recursive: true });
for (const { id } of stories) {
  const file = `dist/effects/${id}.json`;
  if (!(await lstat(file).catch(() => null))) await writeFile(file, "{}\n");
}
const html = (await readFile("index.html", "utf8")).replaceAll(
  "./public/",
  "./",
);
await writeFile("dist/index.html", html);
await writeFile("dist/.nojekyll", "");
const data = JSON.parse(await readFile("dist/data/index.json", "utf8"));
if (!data.records.length) throw new Error("Empty content index");
for (const group of data.groups)
  await stat(`dist/data/groups/${group.id}.json`);
console.log(
  `Built ${data.records.length} records in ${data.groups.length} shards. GitHub Pages subpaths supported.`,
);
