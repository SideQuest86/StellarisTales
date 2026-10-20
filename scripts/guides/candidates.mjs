// Guides that need per-guide writing (docs/refine/round5/guides-audit.md M7 / R2 / R4): lists file names per problem.
//   node scripts/guides/candidates.mjs [out.json]
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const dir = "public/summaries/";
const cjk = (s) => (s.match(/[㐀-鿿]/g) || []).length, lat = (s) => (s.match(/[A-Za-z]/g) || []).length;
const out = { missingZh: [], missingEn: [], tokenHeadings: [], longParagraphs: [] };
for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const md = readFileSync(dir + f, "utf8");
  const body = md.split(/\n##\s*审阅记录/)[0];
  const lines = body.split("\n").slice(1).filter((l) => l.trim() && !/^#|^- 分类/.test(l));
  const z = lines.reduce((n, l) => n + cjk(l), 0), e = lines.reduce((n, l) => n + lat(l), 0);
  if (z < 40 && e > 300) out.missingZh.push(f);
  if (e < 120 && z > 200) out.missingEn.push(f);
  if (/^#{1,6} .*(\$[A-Z_]+\$|\[[A-Za-z_.]+\]|§|\b[a-z_]+\.\d+\b)/m.test(body)) out.tokenHeadings.push(f);
  if (body.split("\n").some((l) => l.length > 450)) out.longParagraphs.push(f);
}
const all = [...new Set(Object.values(out).flat())].sort();
console.log(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])), "distinct files", all.length);
if (process.argv[2]) writeFileSync(process.argv[2], JSON.stringify({ ...out, all }, null, 1));
