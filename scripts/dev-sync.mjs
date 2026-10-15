// Fast, non-destructive refresh of an existing dist/ for parallel development: copies src/, index.html and the small
// public folders that front-end work touches (fonts, music playlist) without deleting dist/. Use instead of
// scripts/build.mjs while several agents test against the same preview; the coordinator runs the full build.
import { cp, readFile, writeFile, stat } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (resolve("dist") !== join(root, "dist")) throw new Error("Run from project root");
await stat("dist/index.html").catch(() => { throw new Error("No dist/ yet: run node scripts/build.mjs once"); });
await cp("src", "dist/src", { recursive: true });
for (const dir of ["public/fonts", "public/summaries"]) {
  if (await stat(dir).catch(() => null)) await cp(dir, "dist/" + dir.slice("public/".length), { recursive: true });
}
await cp("public/music/playlist.json", "dist/music/playlist.json");
await writeFile("dist/index.html", (await readFile("index.html", "utf8")).replaceAll("./public/", "./"));
console.log("dist/ refreshed (src, index.html, fonts, summaries, playlist)");
