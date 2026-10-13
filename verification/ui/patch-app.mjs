// Order matters: the start-up catalogue edit runs before renderChrome is replaced.
// Re-apply the UI hooks onto the coordinator's src/app.js. Fails loudly if a target moved.
import { readFile, writeFile } from 'node:fs/promises';
const file = process.argv[2] || 'src/app.js'; // run from the project root
let c = await readFile(file, 'utf8');
const edits = [
  ['import { SoundtrackPlayer } from "./audio-player.js";',
   'import { SoundtrackPlayer } from "./audio-player.js";\n// [UI] chrome dictionary + reader enter/exit (src/i18n.js, src/reader-motion.js)\nimport { t, setLanguage, applyStaticText } from "./i18n.js";\nimport { revealReader } from "./reader-motion.js";'],
  [/  \$\("#reader"\)\.hidden = !open;\n  if \(!open\) \{\n    \$\("#flow-surface"\)\.hidden = true;\n/,
   '  // [UI] animated enter/exit; the map fades out with the card instead of vanishing.\n  revealReader($("#reader"), open, reduced());\n  if (!open) {\n'],
  ['  document.title = "群星 · 银河记忆 | Stellaris Tales";', '  document.title = t("site.title"); // [UI]'],
  [/<h1 id="reader-title" tabindex="-1">\$\{esc\(prose\(local\(r\.title\)\) \|\| T\("故事的间奏", "Interlude"\)\)\}<\/h1>/,
   (m) => m + '${/* [UI] other-language title as a quiet subtitle */ r.title?.[lang === "zh" ? "en" : "zh"] && r.title[lang === "zh" ? "en" : "zh"] !== r.title[lang] ? `<p class="reader-subtitle" lang="${lang === "zh" ? "en" : "zh-CN"}">${esc(r.title[lang === "zh" ? "en" : "zh"].replace(/\\[[^\\]]*\\]|§.|\\$[^$]*\\$/g, ""))}</p>` : ""}'],
  [/  \$\("#categories"\)\.innerHTML = CATEGORIES\.map\(\n[\s\S]*?\.join\(""\);\n  renderChrome\(\);/,
   '  renderChrome(); // [UI] also builds the catalogue bar'],
  [/function renderChrome\(\) \{[\s\S]*?\n\}\n/,
   'function renderChrome() {\n  // [UI] Static chrome comes from src/i18n.js (data-i18n attributes in index.html).\n  setLanguage(lang);\n  applyStaticText();\n  if (!columns.length) return;\n  // Catalogue bar: index, localized category name and its story count.\n  $("#categories").innerHTML = CATEGORIES.map(\n    (_, i) =>\n      `<button type="button" data-category="${i}" class="${i === selectedColumn ? "active" : ""}" aria-pressed="${i === selectedColumn}"><small>${String(i + 1).padStart(2, "0")}</small><span>${esc(t(`cat.${CATEGORIES[i][0]}`))}<em>${esc(t("catalogue.count", { n: columns[i].stories.length }))}</em></span></button>`,\n  ).join("");\n}\n'],
];
for (const [from, to] of edits) {
  const before = c;
  c = typeof from === 'string' ? c.replace(from, () => to) : c.replace(from, to);
  if (c === before) throw new Error('patch target not found: ' + String(from).slice(0, 90));
}
await writeFile(file, c);
console.log('app.js patched with', edits.length, 'UI hooks');
