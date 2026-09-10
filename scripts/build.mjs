import {
  mkdir,
  cp,
  readFile,
  writeFile,
  stat,
  rm,
  lstat,
} from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
await cp("src", "dist/src", { recursive: true });
await cp("public", "dist", { recursive: true });
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
