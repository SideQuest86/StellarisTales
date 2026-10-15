# Brief: reader agent (Markdown guides, story-map dragging, substitution tooltips)

Read docs/refine/RULES.md first. Project: D:/Saving/Living/CodexProjects/StellarisTales.

Ownership: `src/app.js` EXCEPT the catalogue-bar block in `renderChrome()` (the `$("#categories").innerHTML = …`
statement) and the `$("#museum-open")` handler (owned by the chrome agent); `src/flow-surface.js`, `src/flow-tree.js`,
`src/story-map.js`, `src/reading.js`; new files `src/markdown.js`, `src/reader-extras.css` (the coordinator links it
in index.html — for your own testing add `<link rel="stylesheet" href="./src/reader-extras.css" />` to dist/index.html
after dev-sync, or import it from JS); new tests `tests/markdown.test.mjs`, new browser check
`scripts/verify-refine-reader.mjs`. You may add new keys to `src/i18n.js` (append in one block marked
`// reader-refine`); do not edit other keys.

## 1. Story guides as formatted Markdown
Guides (`dossier.summary.text`, see app.js "story-summary" block ~line 615, currently a pre-wrap text node) are
bilingual Markdown (headings, paragraphs, `-` lists, emphasis, quotes, links, inline code like `distar.1030`). Write a
small dependency-free renderer `src/markdown.js` (headings h3–h5 inside the details box, paragraphs, ul/ol, blockquote,
em/strong, inline code, links). Escape everything first; build HTML only from parsed tokens; allow only http(s) and
relative/hash links (`rel="noopener noreferrer"`, external `target="_blank"`); drop raw HTML, `javascript:`/`data:`
URLs, images. Bilingual: guides interleave a Chinese paragraph and its English twin; tag blocks with `lang` (detect CJK)
and show the current reading language first-class while keeping the other available (e.g. a small "显示英文 / Show
Chinese" toggle, default: current language only; mixed-language lines such as list items/headings always shown). Keep
the "下载 Markdown" link. Unit tests: rendering of each construct, XSS cases (`<script>`, `[x](javascript:…)`,
`<img onerror>`, attribute injection), CJK detection.

## 2. Story-map dragging selects page content
`src/flow-surface.js` (~line 549, pointerdown / setPointerCapture). Fix: a drag threshold (≈5 px) distinguishes drag
from click; on drag start capture the pointer and suppress selection (`user-select:none` on the surface while
dragging, `preventDefault` on pointerdown for mouse only when not on a text/button target, or a `selectstart`
listener active only during the gesture); clean up on pointerup / pointercancel / lostpointercapture; a click without
movement still activates nodes; wheel/pinch zoom, keyboard and touch keep working; reader text stays selectable.
Browser check (`scripts/verify-refine-reader.mjs`, Playwright, `page.mouse` real gestures + touch emulation on a 390 px
context): open a story with a map (e.g. `#story=cetana`), drag across the map and assert
`getSelection().toString()===""` and the view moved; click a node and assert it activated; select reader text by
dragging over a paragraph and assert the selection is non-empty; zoom works.

## 3. Substitution tooltips (placeholders)
The compiler (coordinator) will emit, per chapter, `chapter.names[key] = {zh, en, note:{zh,en}}`; `note` explains the
substitution naturally. Today `fill()`/`paragraph()` (app.js ~line 80–124) wrap substitutions in private-use markers
and render `<span class="game-name" title=…>`. Replace the title-only hint with an accessible, discreet tooltip:
`<span class="game-name" tabindex="0" role="note"? aria-describedby>`-style element that shows the note on hover,
keyboard focus and tap (touch: tap toggles, tap elsewhere closes; Esc closes), one tooltip element reused, positioned
within the viewport, no layout shift, reduced-motion respected. Use the key's `note` when present; otherwise a generic
natural note (zh "这里是游戏按存档填入的名称。" / en "The game fills in this name from your save."). Scripted names
from names.json (game's own wording chosen by the reading profile) get the note zh "按你的档案设定选用的游戏原文。" /
en "The game's own wording, chosen for your reading profile.". Also handle English article clean-up at render time:
`the the`, `the our`, `the this` → drop the first article; capitalise a substitution that starts a sentence. Chinese:
collapse an immediately repeated noun (`我们的帝国帝国` → `我们的帝国`). Unit-test these helpers.
Keep the museum (src/museum.js) untouched — the coordinator wires it to the same helpers later; export the tooltip
helper from a module (e.g. `src/name-tooltip.js`, yours) so it can be reused.

Report back: files changed, tests run with results, screenshots paths, anything unresolved. Keep the report short.
