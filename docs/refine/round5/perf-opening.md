# Round 5 — first story opening, first map build, first archive frame (measured 2026-10-19, Pacific time)

Patch: [perf-opening.patch](perf-opening.patch) (`src/app.js`, `src/archive-scene.js`, `src/flow-surface.js`,
`src/glyph-warmup.js`, `index.html`; nothing was committed or applied). Raw data: `verification/round5/perf/final/`
(final A/B), `verification/round5/perf/exploration/` (intermediate candidates, kept for the record).
Scripts added: `scripts/bench/opening.mjs` (same-session A/B), `trace-opening.mjs`, `symbol-cost.mjs`, `warm-state.mjs`,
`opening-summary.mjs`, `spikes-summary.mjs`.

Setup: Chrome 155.0.8059.80, headed, window at -1900,20, the same ~170 Hz display as round 4 (frames come in 5.9 ms steps,
so 11.8 = 2 refreshes, 41 = 7). Every comparison alternates the unmodified build and the candidate rep by rep in ONE
browser session (two local servers; `base` = repo `src` as of 12:00 on 2026-10-19 including the proofreading agent's
edits, `cand` = the same plus the patch). Phones, a low-end GPU and the real network were not measured.

## Result

Worst frame (ms) in the 1.8 s after the opening, p50 / max, base → candidate, 6–10 repetitions each. "after" = frames
more than 500 ms after the action (the story map's build). Link = `#story=cybrex`, never warmed; click = `#open-story` on
the story the archive selected at start-up; browse = selection moved first, so the story that opens was never rendered
ahead. "N s" = time between "covers ready" (≈0.7 s after load) and the action.

| scenario | worst frame | opening frames | after (map) |
| --- | --- | --- | --- |
| click on the selected story, 9 s | 41.1 / 111.7 → **11.8 / 12.2** | 41.1 → 11.8 | 11.9 → 6.2 |
| click on the selected story, 3.5 s | 41.1 / 129.4 → 11.9 / 41.1 | 41.1 → 11.9 | 11.7 → 6.1 |
| browse, then click (not warmed), 9 s | 105.9 / 152.8 → **41.2 / 52.9** | 70.5 → 41.2 | 105.9 → 11.9 |
| link, 7.5 s | 76.5 / 111.8 → **46.9 / 53.0** | 70.6 → 46.9 | 64.6 → 17.5 |
| link, 3.5 s (warm-ups still running) | 70.5 / 153 → 41.2 / 41.3 | 58.8 → 41.2 | 64.7 → 11.8 |
| link, after the warm-ups ("settled") | 70.5 / 117.6 → 35.3 / 41.2 | 70.4 → 35.3 | 64.7 → 11.8 |
| link to a 131 KB chapter (The Shroud), 7.5 s | 99.9 / 105.8 → 64.7 / 64.8 | 88.1 → 64.7 | 99.9 → 17.6 |
| slow network (120 ms, 4 MB/s): click 9 s | 64.8 / 123.5 → 11.7 / 11.9 | | |
| slow network: browse | 100 / 135.3 → 64.6 / 82.6 | | 100 → 47.1 |
| slow network: link 7.5 s | 82.3 / 117.6 → 41.2 / 41.4 | | 76.4 → 17.6 |
| slow network: link 3.5 s | 70.6 / 111.7 → 58.8 / 64.7 | 53.0 → 58.8 | 70.5 → 17.7 |
| cold load, first 700 ms | 70.5 / 164.7 → 47.1 / 53.1 | | |
| cold load, scene's first frame at (ms) | 250 / 455 → 240 / 350 | | |
| cold load, slow network: first scene frame at (ms) | 1493 / 1572 → 1358 / 1362 | | |

Official harness (`scripts/verify-frame-spikes.mjs`, 5 rounds × 5–6 runs per build, alternating; worst frame p50 / max;
"stalled" = one ~1 s system hang that hit unrelated scenarios in one candidate run, excluded from the max):

| scenario | base | candidate |
| --- | --- | --- |
| open cold (3.5 s) | 82.3 / 164.7 | 52.9 / 182.4 (+1 stalled) |
| open settled | 76.4 / 94.1 | **47 / 70.6** |
| open reload | 47.1 / 58.8 | 41.1 / 47.1 |
| open other (second story) | 41.1 / 53 | 35.3 / 47.2 |
| long chapter | 64.8 / 117.6 | 70.4 / 76.5 |
| chapter change · Back · reopen | 17.5 · 11.8 · 11.8 (max 23.6) | 11.8 · 11.8 · 11.8 (max 23.4) |

Unchanged on purpose (checked): chapter change, Back, map drag (6 ms), closing, archive navigation, the phone emulation's
cold load (27.0 s covers, 6.4 MB, 143 requests in both builds).

What the user sees: after the start-up warm-ups (~5 s) the first opening of the selected story is 2 refreshes instead of
7, and a story that was never warmed no longer freezes for 100 ms when its map appears (one 60–110 ms frame becomes
several ≤ 12 ms ones). The first opening *before* the warm-ups have finished and a first opening of a story whose text
needs new font slices are only partly better (see Residual).

## What was found

Chrome traces, LoAF attribution and CPU profiles of the first opening (`scripts/bench/trace-opening.mjs`,
`evidence/loaf-attribution.txt`). In the unmodified build a never-seen story costs 3–4 long frames:

1. the click frame: one forced layout in `openStory` (`#reader-title.focus()`), 40–50 ms (a LoAF of ~71 ms);
2. the map frame at 600 ms: 25–40 ms of script (canvas `measureText` per character) then 50–60 ms of SVG text layout;
3. a second full-page relayout/PrePaint of 40–75 ms ("fonts changed") when a font slice for a rare character arrives
   late: 7 of 12 stories opened by link did this at the map build (`evidence/font-load-events-base.txt`);
4. on a cold load the first scene frame waited synchronously for shader programs to link (`getProgramParameter` 31 + 72 ms
   in a trace) although `compileAsync` had been started: nothing gated the first draw on it.

Findings that explain them (each verified with a probe, none were in round 3/4's attempts):

* **The idle glyph warm-up is not reliably effective.** It starts before Google's non-blocking font stylesheet has always
  arrived; `document.fonts.load()` then resolves at once for an undeclared family and the first faces are laid out in a
  system fallback (observed: only 2 fonts loaded when the 19 px reading face was "warmed"). `scripts/bench/warm-state.mjs`
  on the unmodified build: 400 glyphs of the reading face cost 60 ms right after the warm-up finished (1 ms when the race
  goes the other way); candidate: always ~1 ms.
* **Order matters.** The warm-up of the selected story's own document and map (`prewarmReader`) ran interleaved with the
  glyph warm-up (thousands of glyphs in a dozen faces). Run that way the first click on the selected story paid 40–50 ms of
  layout in every run; with the render-ahead *after* the glyph warm-up the same click laid out in 1–3 ms (frames 12 ms).
  Probably cache capacity (the later work pushes the earlier out); the mechanism was inferred from the ablation, not read.
* **Symbols are expensive once per face.** Characters outside the Han ranges come from an OS fallback font and the first
  layout of each in each face takes 3–25 ms: `↩` (every reference node of a map) 21 ms in 13 px and 22 ms in 11 px italic,
  `·` 5–11 ms, `↻` 4 ms (`evidence/symbol-cost-base.txt`). A story map pays these on its first build; the glyph
  warm-up only laid out Han characters, so nothing ever warmed them.
* **Everything else is text.** Removing the text from the map leaves a 3 ms layout and an 8 ms PrePaint; the cost is
  first-use per character and face, not DOM structure (the same hidden DOM, rebuilt, lays out in 4 ms).
* Not the cause: CSS (`text-wrap`, `line-break`, `text-spacing-trim`, kerning, overflow-wrap), `inert`/`concealed`
  toggles, the reveal animation, `pointer-events`/opacity transition of the card, the card's `will-change`/scale.

## What the patch does, and what each part is worth

1. **`glyph-warmup.js` — warm-up that works** (ablation in an earlier session, browse p50 with the click 9 s after load: old 4 faces + symbols + ordering 17.8 ms; + map faces 23.5; all faces 11.7; all faces without the symbols 29.4; unmodified build 94–106)
   * waits until the font stylesheet is declared (`fontsDeclared`);
   * new faces: 12 px sans 400/500, 16 px serif, 18 px serif 600, and the story map's 13 px/500 and 11 px/400
     (≈ +0.4 MB of font slices, +5 requests);
   * lays out every UI symbol once in 15 faces (`SYMBOLS`, ≈110 ms of idle time; removing it: browse 11.7 → 29.4 / 64.7);
   * `before` hook: the selected story's rare font slices arrive before the glyph warm-up, not during it.
2. **`app.js` — order.** The sample document keeps its old timing; the first story's render-ahead runs after the glyph
   warm-up and again after it (`runs` 1 then 2 in `__readerWarmup`) so the early window keeps its structural warm-up.
3. **`glyph-warmup.js` + `app.js` — font slices before layout.** `loadFontsWithin()` requests the Han characters of the
   document about to render (≤ 150 ms wait, `openStory` / `goChapter`) and of the whole story map (labels cut to what fits;
   ≤ 600 ms, started at the click, awaited when the map is built). Late slices at the map build: 7/12 stories → 1/12. Skipped
   in constrained mode (`before`) and English (no Han in the map).
4. **`flow-surface.js` — the map builds in slices** (`fillNodes`): edges and joins at once, then nodes nearest the current
   page first, 8 ms of script + layout per animation frame, DOM order kept (reading order, Tab order), cancelled by any
   other `update()`. The finished DOM, transform and classes are byte-identical to the old build (7 stories × zh/en,
   also when opened 1.2 s after load); six interactions *during* the fill (language, chapter change, fold, keyboard, close
   and reopen, zoom/fit) end in the same state as the old build. Map frame: 64.7 → 11.8–17.7 ms.
   Also: CJK ideographs/kana take their width from the font size instead of canvas `measureText` (identical widths for all
   2,975 of the top glyphs in both map faces), which saves 15–25 ms of script and stops the lookahead character of the
   label fitting from requesting a font slice; the view's size is read while the shell is still empty so the view is
   placed in the same pass (an invalidation trace no longer shows "SVG changed" for every text after `applyView`).
5. **`archive-scene.js` + `app.js` — start-up.** The scene (renderer, atlas, programs: ~55 ms of script) is built while
   `stories/index.json` downloads, receives the story lists with `setColumns()` and draws only once its programs are
   linked (`compiled`, ≤ 1.2 s; the gate the v4.7.2 comment described did not exist). `scene` is assigned only when the
   lists are in, so no other code sees a half-ready scene. First 700 ms: 70.5 / 164.7 → 47.1 / 53.1 (the 100–110 ms scene
   frame is gone).
6. **`index.html`** — `<link rel="preload" … index.json>` starts that request with the page: first scene frame −135 ms on
   the slow profile (1493 → 1358; a single request, verified).

## Cost

* Cold load: ≈ +0.4 MB of fonts (239 → 244 requests), ~+0.5 s of main-thread time in the first 5 s, all in
  idle callbacks (layout 1.5 → 2.0 s; the worst frame went down). Phone emulation (constrained path): unchanged — covers
  27.0 s, 6.4 MB, 143–146 requests; only the symbol warm-up and (skipped) prefetch differ.
* The first story's render-ahead happens ~1 s later than before (it waits for the glyph warm-up); the early window
  (< 6 s) on a slow link is slightly worse in p50 when the link story needs new font slices (58.8 vs 53.0; max better).
* Map nodes appear over up to ~0.3 s instead of in one frame (nearest first); nothing changes once it has finished.

## What did not work (all measured in the same session; files in `exploration/`)

| idea | result |
| --- | --- |
| `content-visibility:auto` below the fold; manual deferral of everything after the narrative to the next frame | click frame 35–59 vs 35–59 ms, the cost reappears one frame later |
| CSS simplification of the narrative/title (`text-wrap`, `line-break`, `text-spacing-trim`, kerning, overflow-wrap) | no change |
| hiding parts of the reader (narrative, notes, choices, cards, summary, HUD) to find the heavy part | each −0…10 ms; the scaffold is ≈25 ms regardless |
| skipping `inert`/`concealed`/`setDetail`/reveal animation, `will-change`, static scale, `pointer-events`/opacity on the card | no change |
| warming the exact map labels in a hidden SVG | map layout 50 → 31 ms only; the real render-ahead gives 13–21 |
| more faces / bigger counts in the generic warm-up *without* the ordering fix | no change (state is lost to the later work) |
| rendering 3 extra chapters of the selected story in the render-ahead | no change for other stories |
| waiting vs not waiting for the document's fonts | same frames (kept the wait: fewer late relayouts) |
| `modulepreload` of all 18 static imports | no gain beyond the index preload |
| smaller counts for the added faces (kept: 400/200/600/300/1000/800) | equal to the larger counts, −0.25 s CPU |
| precompiling the atlas blit program (round 4) | not repeated; the stall was the unlinked scene programs, not the blit |

## Verification

* Visual: `#flow-surface` and `.chapter-document` outerHTML identical between builds (zh + en, 7 stories; also opened
  1.2 s after load); screenshots of the reader column are pixel-identical (0 of 562,400 pixels), the map card differs
  only as much as the first page of a browser session differs from the second in the *same* build.
* Suites against the candidate: `verify-prewarm` 24/24, `smoke` 15/15, `verify-refine-reader`, `verify-reader-v4`,
  `verify-a11y` (reduced motion included), `verify-progress`, `verify-refine-chrome`, `verify-images`, `verify-effects`,
  `verify-gpu` (all tiers; run on the same `archive-scene.js`), Node unit tests 103/103. They ran in a scratch working
  directory; nothing under `verification/` or `dist/` of the repo was overwritten.

## Residual

* A link to a story the page has never rendered, opened before ~5 s, still costs ~41–53 ms in the click frame
  (scaffold ≈ 20 ms + document ≈ 20 ms) and 50–60 ms when a rare font slice arrives at the same time.
* The first page of a browser session shows a 110–220 ms frame in both builds (GPU process warm-up).
* Not measured: physical phones, other GPUs, the compressed live site, Firefox/Safari.

## Re-run

```
node scripts/serve.mjs --port 4189        # base (a copy of the old dist) and 4188 for the candidate
STELLARIS_PLAYWRIGHT_PATH=… VARIANTS="base=http://127.0.0.1:4189/,cand=http://127.0.0.1:4188/" SCENARIO=browse REPS=8 node scripts/bench/opening.mjs
# SCENARIO = open | button | browse | settled | cold; READY_WAIT, NETWORK=slow, STORY; summarise: node scripts/bench/opening-summary.mjs <dir>
```
Apply: `git apply --ignore-whitespace docs/refine/round5/perf-opening.patch` (or `patch -p1 --binary < …`; the patch was made
against `src` of 2026-10-19 12:00, `app.js` hunk 1 needs fuzz if the import list moved).
