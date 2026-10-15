# Brief: polish agent (UI + typography, less is more)

Read docs/refine/RULES.md and docs/FONTS.md first (no git, no build.mjs; `node scripts/dev-sync.mjs` to test;
headless or left-monitor browser). Project: D:/Saving/Living/CodexProjects/StellarisTales.

Ownership: `index.html`, `src/style.css`, `src/museum.css`, `src/reader-extras.css`, `src/i18n.js` (any key);
in `src/museum.js` and `src/app.js` ONLY user-visible strings inside `T("…","…")` calls and class names on
existing markup (other agents and the coordinator edit their logic at the same time — small targeted Edits, re-read on
conflict). Do not touch `src/effects-panel.*` (effects agent) or image markup (image agent).

Tasks (keep the name Stellaris Tales; preserve accessibility, mobile behaviour, reduced motion):
1. Remove redundant instructions and mechanical filler: e.g. archive hint "拖动或方向键浏览 · 回车展开" if controls are
   self-evident (keep keyboard help discoverable via aria / title), "切换类别" text label next to arrows, doubled
   language toggles, "STELLARIS / <title>" overlay on chapter art, empty or repetitive eyebrows, overly long reading
   profile text ("未指定文明 · 显示所有可能"), legend items that repeat obvious things. List every removal and why.
   Keep meaningful conditions (choice conditions, "if:" passage labels) and essential controls.
2. Spacing, hierarchy, transitions: consistent vertical rhythm (a spacing scale in custom properties), headings scale,
   reader column, choice cards, review notes, guide box, museum header/filters/detail; transitions ≤ 200 ms ease-out,
   none under reduced motion. Same visual language across stories and museum.
3. Reading comfort: body size/line-height per language (docs/FONTS.md roles), paragraph spacing, contrast (WCAG AA
   for body text), focus styles visible.
4. Check with `scripts/verify-refine-chrome.mjs` (extend it, you own it now) at 1600×1000 and 390×844, both languages:
   screenshots into verification/refine/ (archive, reader, guide open, museum grid + detail, playlist), view them
   yourself, and CLS < 0.02. Run `node --test tests/*.test.mjs`.
Report (short): removals list, design changes, screenshots viewed, check results.
