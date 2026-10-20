# Round 5 design spec (no src/ edits). Base: v4.7.3

Read: round4/design-ideas.md (3-8), app.js, progress.js, museum.js, index.html selection panel. Live-site walk was NOT repeated;
everything below is from code and data (by-doc.json: 244 docs, 163 stories carry specimens). Round-4 idea 1 (specimen round trip)
is already in the code (`museumReturn`, `&chapter=` in `acquisitionHtml`), so it is not respecified.

## Ranking (value / risk)
1. Shared "seen" store + #4 reading marks (archive panel)  - S, low risk, unlocks #1 and #5
2. #1 "Met in your reading" (museum)                        - S, low risk
3. #2 number keys                                           - S, low-medium risk (key conflicts)
4. #5 (own) "Specimens in this story" row on the panel      - S/M, low risk, pure existing data
5. #3 cross-story breadcrumb chip                           - M, medium risk (trail corners)

## 0. Prerequisite: a persistent "seen" store (src/seen.js, ~45 lines)
Problem found: `visitedChapters` is cleared on `openStory` (app.js 252, 323, 463) and `st-progress` holds only ONE trail and is
cleared on restart / vanished steps (298, 338). It cannot answer "has the reader ever read story X". Use a second key.
- Key `st-seen` = `{"v":1,"s":{"<storyId>":["<docId>",...]}}`. Cap 40 chapters ids per story is too small, so cap per story at
  the story's chapter count (ids are validated against nothing; bound id length 200 as progress.js `isId`), total <= 3000 ids,
  oldest story evicted (insertion order). Typical size < 60 KB worst case.
- API (pure + try/catch exactly like progress.js): `loadSeen()`, `markSeen(storyId, docId)` (in-memory Map of Sets, debounced
  write 600 ms via `setTimeout`, flush on `pagehide`), `seenCount(storyId)`, `seenDocs()` -> Set, `clearSeen()`.
- Hook: one line in renderChapter beside `visitedChapters.add(chapter.id)` (app.js 739): `seen.mark(dossier.story.id, chapter.id)`.
  Only for real renders (not the prewarm/“Opening” stage 402-410). Direct links count (they render a chapter).
- Not cleared by "Start over" nor by progress.clear(); a quiet "Forget what I have read" link in the settings/about area calls
  clearSeen() (i18n below). No migration needed; first-time users start empty (a one-off best-effort seed from an existing
  `st-progress.visited` is optional and cheap: `seen.mark` for each trail step's story + visited ids found in that story).
- Tests: node unit (new scripts/verify-seen.mjs, no browser): normalize rejects bad shapes, caps hold, throwing storage -> no throw,
  markSeen idempotent, save/load round trip.

## 1. Reading marks on the archive  (idea 4)
UX: after the story count in the selection eyebrow, a quiet third item "已读 3/12 · Read 3 of 12" (only when seenCount>0; for
fully read: "已读完 · Finished"). The WebGL atlas is untouched. Optional second phase (skip first): none.
- Markup: index.html `#chapter-count` gets sibling `<i aria-hidden="true"></i><span id="read-mark" hidden></span>` inside
  `.selection-eyebrow`. In `showSelection(story,...)` (app.js 164) after chapter-count:
  `const n = seen.count(story.id); rm.hidden = !n; rm.textContent = n >= story.chapters ? T("已读完","Finished") : T(`已读 ${n}/${story.chapters}`, `Read ${n} of ${story.chapters}`);`
  n is clamped `Math.min(n, story.chapters)`. `story.chapters` is the archive-index count (already used for #chapter-count).
- Refresh: call `showSelection(selected, selectedColumn, idx)` re-run on `closeReader()` (so a just-read story updates) and on
  `st-language` (existing language handler already re-calls showSelection; verify at line ~1013).
- CSS (style.css next to `.selection-eyebrow span:last-child`): `#read-mark{color:var(--accent-soft,#9fb6c8);font-size:inherit;letter-spacing:.04em;opacity:.8}`
  with `#read-mark[hidden]{display:none}`; same size as neighbours so no wrap on phones; `@media (max-width:480px){#read-mark{white-space:nowrap}}`
  (eyebrow already flex-wraps; check at 390 px that it breaks to a second line, not overflow).
- A11y: it is real text in the panel, read with the title; no aria-live (selection changes are already announced via title).
- Reduced motion: no animation. Perf: O(1) Map lookup per selection.
- i18n keys: `archive.read` zh "已读 {n}/{total}" en "Read {n} of {total}"; `archive.finished` zh "已读完" en "Finished";
  (use T() inline as in the file if i18n.js dictionary is only for data-i18n attributes).
- Edges: storage cleared -> hidden. Direct link to a chapter -> story marked on render. Story chapters renumbered after a content
  update -> clamp. Profile change: marks are per story, independent of profile. Private mode: in-memory only, mark persists in session.
- Tests (smoke.mjs): fresh context -> `#read-mark` hidden; open a story, read 2 chapters, close -> panel text matches /3|2/ and
  EN/ZH variants after language toggle; seed `localStorage st-seen` with garbage -> page loads, mark hidden; 390 px no horizontal scroll.
Effort 0.5 day. Risk low.

## 2. "Met in your reading" in the Grand Archive  (idea 1)
UX: tiles whose awarding document the reader has read get a tiny dot (6 px, accent, `::after` on `.museum-pedestal`), tooltip/label
"Found in a document you have read"; header gets a quiet line under the title only when n>0: "在你读过的文档中遇见 7 件 · 7 met in your reading".
No percentage, no denominator, no greying of others, no filter (keep v1 minimal).
- Data: `by-doc.json` {docId:{specimens:[key,...]}}. Build once in museum.js `build()` (fetch alongside specimens.json, 1 request, already
  cached by the reader's own lazy load): `met = new Set(); for (const d of seen.docs()) for (k of byDoc[d]?.specimens||[]) met.add(k)`.
  Iterate over byDoc (244 keys) checking `seenDocs.has(id)` rather than over seen ids. Rebuild on every `render()` (cheap, <1 ms).
  Needs asset path: reuse `data.asset("museum/by-doc.json")`.
- Honesty: a doc can offer a specimen only on one route and the reader may not have chosen it; wording says "found in documents you
  have read", never "collected/owned". Same wording as showSpecimenLinks.
- Markup in render(): button class `museum-exhibit rarity-x${met.has(s.key)?" met":""}`; aria-label gains ` · ${T("读过的文档中有","in a document you read")}`.
  Header: `<p class="museum-met" ${n?"":"hidden"}>${T(`在你读过的文档中遇见 ${n} 件`,`${n} met in your reading`)}</p>` after `.museum-concept`.
- CSS (museum.css): `.museum-exhibit.met .museum-pedestal::after{content:"";position:absolute;top:6px;right:6px;width:6px;height:6px;border-radius:50%;background:var(--rarity-color,#8fd3c8);opacity:.85}`
  (`.museum-pedestal{position:relative}` if missing); `.museum-met{margin:.4rem 0 0;font-size:.85rem;opacity:.7}`. Colour is not the only cue:
  the aria-label and the header count carry the meaning (WCAG 1.4.1). High-contrast: add `@media (forced-colors:active){...border:2px solid CanvasText}`.
- Reduced motion/perf: static; <= 244 tile checks.
- Edges: no st-seen -> no dots, no header line, identical to today. Museum opened by `#museum=key` direct link: works (reads storage).
  Language switch: render() already re-runs on `st-language`. Profile: unaffected. Seen store cleared while museum open: next render() updates.
- Tests (verify-museum.mjs addition): no storage -> 0 `.met`, no `.museum-met`; seed st-seen with doc `ancrel.103` -> exactly the
  `alien_dining_set` tile has `.met`, header shows 1; zh/en text; screenshot 390 px.
Effort 0.5 day (after #0). Risk low. Note: museum.js must import seen.js (it has no app.js dependency; keep it a leaf module).

## 3. Number keys for choices  (idea 2)
UX: with the reader open and focus not in a form control, `1`-`9` activates the n-th VISIBLE actionable item: first choice buttons
(`.choice-button`, in DOM order, skipping `[aria-disabled=true]` and `[hidden]`), then continue cards (`.next-chapter` in
`.continuation`, then `.chapter-end .next-chapter`), counted as one list so the number shown matches what is pressed.
- Handler (app.js, inside the existing keydown at 1234, new branch after `/`):
  ```js
  if (/^[1-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && !e.repeat) {
    const r = $("#reader"); if (r.hidden || r.classList.contains("prewarm") || $("#search-dialog").open || document.body.classList.contains("museum-open")) return;
    if (e.target.closest?.("input,textarea,select,[contenteditable],#flow-surface,#story-map,#effects-panel,#playlist,audio,.reading-tabs")) return;
    const items = [...r.querySelectorAll(".choice-button:not([aria-disabled=true]),.next-chapter")].filter(el => el.offsetParent);
    const el = items[Number(e.key) - 1]; if (el) { e.preventDefault(); el.click(); el.focus({preventScroll:false}); }
  }
  ```
  `offsetParent` filters hidden panels. Use `e.key` (not code) so AZERTY users are consistent; `1-9` on the numpad also match.
- Conflict audit (grep `keydown` in src/): flow-surface.js and story-map.js own 0/+/-/arrows when the map has focus: the
  `closest("#flow-surface,...")` guard makes number keys inert there; `0` is never handled by this branch. Escape and `/` untouched.
  Selects (reading pickers), search input and museum root are guarded. Single digit keys inside the reader title (`tabindex=-1`) work.
  Verify with `grep -n "key ===\|e.key" src/*.js` before merging; if story-map uses digits, narrow the guard.
- Discoverability: desktop only. `@media (hover:hover) and (pointer:fine)`: `.choice-button::before, .next-chapter::before{content:attr(data-k);...}`
  is NOT needed on all cards: set `data-k` in renderChapter after render (loop over `items`, `el.dataset.k = i+1`, and
  `el.setAttribute("aria-keyshortcuts", String(i+1))`) and show it only on `:hover` and `:focus-visible` as a 1.1rem rounded key chip,
  `opacity:0 -> .75`, transition 0.15 s (none under `prefers-reduced-motion`). Phone/touch: no chip (media query), aria attr is harmless.
  Re-run the numbering after each choice expands or edges re-render (function `numberItems()` called at the end of renderChapter and in the
  choice click handler).
- Safety: choices already two-step (expand response, then continue), so a stray press only expands; continue cards navigate and can
  be undone by Back. Ignore when a modal `<dialog>` is open (search) and when `e.isComposing` (IME, important for zh users: add `|| e.isComposing`).
- i18n: one optional title on chip is not needed; add to the existing "keyboard help"/about text if present: zh "数字键 1-9 选择选项" / en "Number keys 1-9 pick an option".
- Tests (smoke.mjs): open a story with choices at 1440, press `1` -> `.choice-response` of first choice visible; press `2` on continue list ->
  chapter changes; focus an input -> `1` types and does nothing; with search dialog open nothing happens; with `(pointer:coarse)` emulation no `[data-k]::before`
  content (computed style `content` = none); `Escape` still closes the reader; `/` still opens search.
Effort 0.5 day. Risk low-medium (conflicts; mitigated by guard + test).

## 4. (own) "Specimens in this story" row on the archive selection panel  (idea 5)
Why: uses the real story->specimen relation that the museum shows only one way (specimen -> "Given by"). From the story side the reader
learns before opening it that the story carries a Grand Archive piece, and can jump to it. Factual, not decorative.
- Data: `specimens.json` `acquisition[].story` (+ `kind`); `icon.url` (100 px). Build once, lazily at idle after first selection
  (or when the museum JSON is already fetched): `byStory = Map(storyId -> [specimen,...])`, de-duplicated, sorted by rarity then name, cap 4.
  specimens.json size is already fetched by the museum; to avoid a fetch on the archive path, emit a tiny `museum/by-story.json`
  ({storyId:[key,...]}, ~163 entries, ~12 KB) from scripts/extract-specimens.py and keep icons from `museum/img/<key>.webp` (existing). Preferred.
- Markup: in index.html under `#selected-excerpt`: `<div id="story-specimens" class="story-specimens" hidden></div>`.
  `showSelection` fills `<button class="story-specimen" data-specimen="key" title="name" aria-label="${T("标本：","Specimen: ")}name"><img width=28 height=28 alt="" loading="lazy" src=...></button>` plus a text label
  `<span>${T("藏有标本","Holds specimens")}</span>` (zh/en); click -> `showMuseum(key)` (existing; opens museum on that exhibit, return handled by closeTo).
- CSS: flex row, gap .4rem, 28 px circular thumbs with 1 px rarity-coloured ring (reuse `.rarity-*` tokens), `:focus-visible` outline, hidden when empty.
  Phone: single row, no wrap beyond 4 items. No animation (reduced motion n/a).
- Perf: <= 4 images of ~2 KB, lazy; one 12 KB JSON, cached. Never touches WebGL.
- Edges: json fetch fails -> row stays hidden. Language switch: re-run showSelection (names via `name.zh|en`). Profile independent.
  Stories without specimens (1,225 of 1,388): nothing shown. Optionally combine with #2: ring the thumb if `met` (no: keep separate).
- Tests: select story `site-asteroid-vault-1` (see round4) -> one `.story-specimen`; click opens museum with `[data-key]` detail open; select a story
  with none -> `#story-specimens[hidden]`; fetch blocked -> no error in console; i18n_test passes for new strings.
Effort 1 day (incl. extractor change). Risk low.

## 5. Cross-story breadcrumb chip  (idea 3)
UX: when `trail` contains more than one story id and the CURRENT step's story differs from the previous step's story, show a chip in
`.chapter-eyebrow` after the caption: "← 来自《X》 / ← From "X"". Click = trail-aware Back (same code path as `#reading-back`, lines 1220-1224:
`trail.pop()` etc.), landing on the previous story's last step. Chip persists while the reader stays in the new story only until the next
same-story step? Decision: show it while `trail.at(-1).story !== trail.at(-2).story` (first chapter after the jump) - after that, Back
already works and the eyebrow stays clean. Keeping it for the whole new-story segment is the alternative; prefer the first-chapter-only version (less noise).
- Code: in renderChapter before building the eyebrow:
  `const prev = trail.length > 1 && trail.at(-2).story !== trail.at(-1).story ? storyById.get(trail.at(-2).story) : null;`
  chip: `${prev ? `<button class="from-chip" id="from-story" type="button">${esc(T(`← 来自《${t}》`,`← From “${t}”`))}</button>` : ""}` where `t = prose(local(prev.title))`
  (truncate with CSS ellipsis, max-width 14rem, `title` attr full). Handler: add `|| e.target.closest("#from-story")` to the `#reading-back` condition (line 1220).
- Crossfade: add class `story-changed` on `.chapter-art` and `.chapter-document` when `data !== previousDossier` (goChapter 519 already knows story id change):
  `@keyframes st-fade{from{opacity:.0}to{opacity:1}} .story-changed{animation:st-fade .2s ease-out}`; `@media (prefers-reduced-motion:reduce){.story-changed{animation:none}}`.
  Budget: opacity-only, 200 ms, no layout change (round-4 progress-polish limit <= 0.2 s).
- Edges: direct link `#story=B&chapter=..` has trail length 1 -> no chip. Restored progress that spans stories -> chip shown on that last step (correct: truthful).
  Language switch -> re-render rebuilds chip text. Cleared storage -> trail empty. Missing storyById entry (story removed) -> no chip.
  Profile change re-render keeps trail -> chip stays consistent. `Start over` clears the chip (trail resets).
- i18n: zh "← 来自《{title}》" en "← From “{title}”" (`T()` inline).
- Tests: use a chapter with cross-story edge (353 exist; find via `docMap`/e.story in compiled data) -> after clicking, `#from-story` exists with previous
  title; click returns to previous chapter id (`.chapter-document[data-doc]`); direct-link load: absent; `emulateMedia reducedMotion` -> computed animationName none; 390 px: chip wraps under caption, no overflow.
Effort 1 day. Risk medium (trail pop across stories needs `data` reload; Back across stories already works per round-4 note, so reuse, do not reimplement).

## Shared test/verify plan
- New scripts/verify-round5.mjs (Playwright chrome headless, 1440x900 and 390x844): groups #0-#5 above; add it to the pre-release list in HANDOFF.
- Reuse smoke.mjs `open(viewport)`; clear storage per test via `context.addInitScript(() => localStorage.clear())` for the "nothing shown" cases.
- Run existing verify-a11y.mjs, verify-museum.mjs, verify-progress.mjs, node i18n key parity test after changes.
- Perf gate: verify-ui-perf.mjs frame times must stay inside HANDOFF table (17-33 ms); no new WebGL work in any item.

## Implementation order
#0 seen.js -> #1 marks -> #2 museum dots -> #3 keys -> #4 specimens row (+extractor) -> #5 chip. Commit each separately; version bump per item as per round-4 practice.
