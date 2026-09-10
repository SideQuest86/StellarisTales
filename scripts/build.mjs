import { mkdir, cp, readFile, writeFile, stat } from "node:fs/promises";
await mkdir("dist", { recursive: true });
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
