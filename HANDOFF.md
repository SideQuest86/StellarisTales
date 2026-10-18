# Stellaris Tales — start here

Updated 2026-10-16 (Opus 5.5). This file takes precedence over older progress claims in CodexDoc.md, README.md and
verification/README.md. Source files and fresh observations remain authoritative.

## Read in this order

1. This file: scope, status and next work.
2. [Resource map](docs/RESOURCE-MAP.md) and [runbook](docs/RUNBOOK.md): code, content, build, verification, review
   copies, CI and release.
3. [Story model V4](docs/STORY-MODEL-V4.md) and [review guide](docs/REVIEW-GUIDE.md): how stories are built and reviewed.
4. [Manual review ledger](content/chronology/REVIEW.md) and the per-reviewer ledgers in `content/chronology/review/`.
5. [CodexDoc](CodexDoc.md) (latest entries at the end) and [verification history](verification/README.md).

## Product contract

An immersive bilingual (中文/English) archive of every story in the local Stellaris installation (base game and the
installed DLC files), read-only source `D:/Living/Steam/steamapps/common/Stellaris`. Original game text, options, art
and OST only; provenance preserved; commentary (reviewer notes, guides) always marked and kept apart from game text; no
invented Wiki content. Stories follow real gameplay chronology: options, delays, projects, stages, on_action
continuations, exclusive random/if-else outcomes and parallel investigations — never numeric order, DFS or bare
reachability. Each reviewed story has a source-grounded Markdown guide that states partial coverage and uncertainty.
Reading conditions use one archive-wide empire profile plus path flags; this is not a save-state simulation.

Visual target: the RhineLabUI reference with Stellaris content — rows running past both screen edges with continuous
motion, catalogue at the top, original art on closed cards, card extraction into a large left close-up, text-first right
side, frosted geometric reveals, Detroit-style flow map of actual chosen paths and alternatives on the left card;
keyboard access, responsive layout, reduced motion; smooth on Windows using the local GPU.

## Current status — authoritative (updated 2026-10-18)

This section is the single source for version, status and test counts. Everything below "History" is dated
evidence from earlier rounds and is not updated.

- **Version:** v4.7.1 on `main` (release notes in `RELEASE`). **Live:** https://sidequest86.github.io/StellarisTales/
  (verification of the live build: "Live:" line at the end of this section).
- **Content:** 1,388 stories, 8,668 readable documents; 258 Grand Archive specimens, each with an unofficial 3D model.
- **Release gate:** `.github/workflows/pages.yml` runs `npm test`, the category audit, the build and then the browser
  smoke checks `scripts/smoke.mjs` (bundled Chromium, headless); any failure stops the job before the Pages artifact
  is uploaded. The same smoke step runs in `ci.yml` on every push. Smoke (15 checks) covers: story opening, a choice +
  continuing + Back, progress restored after a reload, full-text search to an exact document and to a specimen, five
  repeated museum opens, images, a link opened during the start-up warm-up on a slow download, Escape while a story is
  still downloading + browser Back closing a story opened from the archive, a specimen link and back to its chapter,
  an ending leading on to the next story, the 844×390 landscape archive, the 390 px phone layout, and no page errors / failed requests.
  Run locally: `node scripts/serve.mjs --dist` then `STELLARIS_PLAYWRIGHT_PATH=… STELLARIS_BROWSER_CHANNEL=chrome node scripts/smoke.mjs`.
- **Tests (2026-10-18):** Node 91 (`node --test tests/*.test.mjs`), Python 45 (`python -m unittest discover -s tests`),
  all passing. Browser suites passing locally: smoke 15/15, verify-prewarm 24/24, verify-museum-viewer 7, verify-museum
  (268 checks), verify-progress 12, verify-search 16, verify-effects, verify-a11y, verify-refine-reader,
  verify-refine-chrome, verify-refine-audio, verify-reader-v4.
- **Round 4 (2026-10-18): review and improvement.** Ranked issue list with evidence: `docs/refine/round4/ISSUES.md`
  (from four audits in the same folder: wording, performance, interaction, design). Changes:
  - Correctness: Escape / leaving the address while a story is still downloading cancels that opening (it used to open
    anyway); a story opened from the archive gets a history entry, so the browser's / Android's Back closes it instead of
    leaving the site; offline / blocked requests show the localised "could not load" message instead of "Failed to
    fetch"; audio load failures show in the player; landscape phones (≈390 px tall): the open row is no longer under the
    category arrows and the graphics-adapter notice no longer covers the story; English effect lines no longer lose their
    resource name (4,646 lines of parser debris removed).
  - Efficiency (measurements: `docs/refine/round4/perf-audit.md`, `perf-fixes.md`, `verification/round4/perf/`):
    slow / metered connections and small touch screens warm only the 600 most frequent CJK glyphs after the network goes
    quiet, and the soundtrack waits for a first gesture there; elsewhere autoplay waits until the page has loaded
    (a click before that starts it at once). Emulated phone (390×844 DPR3, 4× CPU, ~1.6 Mbit/s): covers ready 50 s → 27 s,
    transfer 11.5 → 6.7 MB, requests 200 → 141. Desktop cold load unchanged on purpose (full font warm-up kept for
    opening smoothness; 16.3 MB / 237 requests raw, GitHub Pages compresses JS/JSON). Search snippets fetch only the
    stories of the first 8 rows, the rest as they scroll into view (first query 20 → 11 requests); debounce 120 → 60 ms.
    Museum list: `content-visibility` on tiles (open long task 134 → ~64 ms).
  - Wording (`docs/refine/round4/wording-audit.md`, `wording-fixes.md`): effects panels — plain condition phrases, no
    "If: if", no repeated chance labels or script weights, default targets hidden, note only where chances appear;
    guides — editor review notes collapsed at the end, mixed zh/en lines follow the language toggle; reader — no "No
    empire set" bar, no disabled Back on a first page, no stock "Continue reading" caption; search — no "Title" chip,
    one English unit ("chapters"), pager hidden on a single page; museum — no "3D" badge / filter while every specimen
    has a model, shorter exhibit note, plainer acquisition labels. Game text untouched (user decision 2026-10-15).
  - Creative: continue cards show the picture of the document they lead to (or the other story's cover); a specimen
    link remembers the chapter it came from — closing the museum (or Back) returns there, and the museum's "From the
    story" link opens the awarding document rather than the story's first; an ending offers the next story of its
    archive row (v4.7.1). Deferred ideas: `docs/refine/round4/design-ideas.md`
    (end-of-route recap, number keys for choices, "met in your reading" pips in the museum, cross-story breadcrumb).
- **Limits:** no physical phone (all mobile figures are emulation); no native-speaker proofread; real low-end GPU,
  minimised-window background state and compressed transfer sizes not measured locally; faults in the game's own text
  are kept as shipped (user decision 2026-10-15, LEDGER.md); 3D models are unofficial reconstructions. Not changed:
  first story opening of a session still 2–3 frames (round 3 decision), first archive frame after a cold load.
- **v4.7.1 follow-up (2026-10-18):** re-test of v4.7.0 (`docs/refine/round4/interaction-retest.md`, outcomes in
  `ISSUES.md` "Follow-up"): the reported per-cycle DOM growth is Playwright's retained element handles (heap snapshot),
  not a page leak; museum-failure toast localised; playlist failure retried on play; a same-session A/B against v4.6.4
  found the continue-card pictures cost 20–40 ms on opening frames — they now load after the text settles (A/B
  afterwards equal or better than v4.6.4 on every step).
- Live: v4.7.0 (`59bada4d`), published by the gated workflow (Archive CI and Publish green) and verified live
  2026-10-18 with local Chrome: smoke 14/14, verify-progress 12, verify-search 16, verify-effects, verify-museum-viewer 7.

## History: refinement round 3 (2026-10-16, v4.6.0–v4.6.4: museum viewer, progress, search, frame timing, release gate)

- **Version:** v4.6.4 on `main` (release notes in `RELEASE`). **Live:** https://sidequest86.github.io/StellarisTales/
  (verification of the live build: see "Live:" line at the end of this section).
- **Content:** 1,388 stories, 8,668 readable documents; 258 Grand Archive specimens, each with an unofficial 3D model.
- **Release gate:** `.github/workflows/pages.yml` runs `npm test`, the category audit, the build and then the browser
  smoke checks `scripts/smoke.mjs` (bundled Chromium, headless); any failure stops the job before the Pages artifact
  is uploaded, so nothing deploys. The same smoke step runs in `ci.yml` on every push. Smoke covers: story opening,
  a choice + continuing + Back, progress restored after a reload, full-text search to an exact document and to a
  specimen, five repeated museum opens (constant model size, or the image fallback without WebGL), images, the 390 px
  phone layout, a link opened during the start-up warm-up on a slow download, and no page errors / failed requests. Run locally: `node scripts/serve.mjs --dist` then
  `STELLARIS_PLAYWRIGHT_PATH=… STELLARIS_BROWSER_CHANNEL=chrome node scripts/smoke.mjs`.
- **Tests (2026-10-16):** Node 89 (`node --test tests/*.test.mjs`), Python 45 (`python -m unittest discover -s tests
  -p 'test_*.py'`), all passing. Browser suites passing locally: smoke 11/11, verify-prewarm 24/24, verify-museum-viewer 7 (+ every model with
  `ALL=1`), verify-progress 12, verify-search 16, verify-a11y, verify-refine-reader (test race fixed 2026-10-16),
  verify-refine-chrome, verify-reader-v4, verify-effects, verify-images, verify-reading-walk (48 stories / 198 documents). Frame timing: `scripts/verify-frame-spikes.mjs` (below).
- **Round 3 (2026-10-16) changes:**
  - Museum viewer: each model normalised once at load (fixes the 1.6 → 2.449 → 1.6 size alternation on reopening),
    de-duplicated downloads, last-opened exhibit always wins, cache of 3 disposed correctly; opening view per model
    (manifest `view` override; flat models face the camera — `verification/museum/opening-views.json`, 43 flat models);
    Reset button and `0` key.
  - Reading progress: `src/progress.js` (versioned `st-progress`, validated, reconciled with current stories,
    storage failures tolerated); "Continue reading" + "Start over" next to the archive's open button; direct links
    restore only the reader's own last document, otherwise open fresh without touching saved progress. Not saved:
    the dialogue step/state inside multi-step conversations (restored documents start the conversation again).
  - Search: `src/search.js` + `scripts/build-search-index.mjs` (run by the build; output `public/search/` is not
    committed): bilingual inverted index over document text, titles, choices, effect labels and specimens, 32 shards
    loaded per query after the dialog opens (first search ≈0.3 MB gzip); results typed (Title/Text/Choice/Effect/
    Specimen), snippets escaped then highlighted, open the exact document or exhibit. Limits: whole-word (stem) match
    for Latin text, no prefix search; single Chinese characters only match titles.
  - Weakest 3D matches re-generated with the existing local pipeline (`generate-models-v2.py --candidate --seed …`,
    docs/museum/MODELS.md "Viewer and re-run"): 14 candidates for the four lowest-IoU models, each compared with the
    icon and four turns (`verification/museum/rerun-2026-10-16.png`, `-16b.png`). Shipped (3 of 4, provenance and a
    `review` note in each manifest entry, previous models in git history): massive_metatarsal seed 1234 (silhouette
    IoU 0.396 → 0.442), black_needle_ceremonial_sword seed 4242 (0.38 → 0.404, hilt closer to the icon),
    crystal_nest_fragments seed 99 (0.483 → 0.503, the two fragments read as a pair). Not shipped:
    yuht_audio_console — seven attempts give the same slab-and-panel (0.436–0.447 vs 0.441); a hologram is outside
    what the shape model reconstructs from one icon.
- **Frame timing (2026-10-16; `scripts/verify-frame-spikes.mjs`, headed Chrome, RTX 5070 Laptop, 60 Hz display,
  worst frame per run, before and after measured in the same session against a local copy of the v4.6.0 code):**

  | Scenario (opening frame unless noted) | before p50 / max | after p50 / max |
  | --- | --- | --- |
  | first opening, ~4 s after load | 50 / 67 ms | 33 / 50 ms |
  | first opening after a reload | 50 / 67 ms | 33 / 33 ms |
  | first opening once the page has settled | 50 / 50 ms | 33 / 33 ms |
  | story map built ~0.6 s after a first opening | 50 / 50 ms | 33 / 50 ms |
  | slow network (120 ms, 4 MB/s): first opening ~6 s after load | 50 / 50 ms | 33 / 50 ms |
  | slow network: first opening after a reload | 33 / 50 ms | 17 / 17 ms |
  | slow network: first opening once settled | 50 / 50 ms | 33 / 33 ms |
  | long document (148 KB, The Shroud) | 33 / 33 ms | 33 / 33 ms |
  | chapter change · Back · reopening · opening another story | 17 / 17 ms | 17 / 17 ms |

  Files: `verification/ui/frame-spikes.json` / `-baseline.json` (local, 6–8 runs), `frame-spikes-slow.json` /
  `-slow-baseline.json` (slow network, 6 runs). With the historical tool (`scripts/verify-ui-perf.mjs`, which
  produced the 76 / 47 ms figures on a 170 Hz display; 3 rounds each, same session, 60 Hz): chapter change 17 ms and
  Back 17 ms on both builds (historically 47 / 18 ms — fixed before this round); "open story" after browsing the
  archive 50–67 ms on v4.6.0 and 50–67 ms on the new build in that tool, where the worst frame is no longer the
  opening but the new story's map build ~0.6 s later, once the card has settled (25 ms script + 30 ms layout;
  `perf-old-*.json`, `perf-new-*.json`).
  Diagnosis (Chrome traces, Long Animation Frame attribution): the first story opened in a page paid a one-time cost
  (first layout and paint of the reader and the story map: styles, fonts and text runs used nowhere else, ~45–55 ms);
  later openings, even of other stories, take one frame. Fixes: (1) `prewarmReader`/`prewarmSample` in src/app.js —
  in quiet moments after start-up (idle and 1.5 s without input) a built-in sample document (no download needed),
  then the selected story's opening document and its map, are rendered into the reader while it is inert and
  transparent, painted once and removed; the warm-up never touches `readerTicket` and yields to any opening in
  flight (v4.6.2 fixed a v4.6.1 race; guarded by `scripts/verify-prewarm.mjs` and a smoke check); (2) the opened
  story's map tree is computed during the opening animation (`FlowSurface.prepare`); (3) the glyph warm-up requests
  all font slices at once (slow network: done after ~5.8 s instead of ~9.3 s). Browsing the archive during start-up
  stays at one frame (4 runs, max 17 ms). Measured and reverted: focusing the title after paint, skipping the
  post-render scroll write, `content-visibility` below the fold (`frame-spikes-a.json`, `-b.json`). Remaining: a
  first opening takes 2 frames (33 ms), sometimes 3; the first map build after opening a not-yet-warmed story is
  2–3 frames. Desktop only — phones were emulated for layout, not measured.
  Also tried after v4.6.3 and reverted (same-dist A/B, 6 runs, opening frame p50: v4.6.3 33 ms vs 50 ms with the
  changes): splitting the map build over two frames (map frame 33 → 50 ms), warming the map's character widths in idle
  time (`measureText` 24 → 4 ms in a CPU profile, but the opening frame got worse), building the selected story's
  map whenever the archive pauses on it. CPU profile and traces of the button path: the remaining map frame is
  ~33 ms of SVG label text shaping for a story whose map has not been built yet.
- **User decisions (2026-10-16):** the 60 Hz same-session before/after comparisons are accepted as the frame-timing evidence (the historical 76 / 47 ms were measured on the laptop's 170 Hz panel, which was not active; no 170 Hz rerun); item 5 stops at the shipped v4.6.3 result, with the residual first-map-build frame (2–3 frames at 60 Hz, ~0.6 s after opening, card settled) documented rather than pursued further.
- **Limits:** no physical phone test; no native-speaker proofread; faults in the game's own text are kept as shipped
  (user decision 2026-10-15, LEDGER.md); 3D models are unofficial reconstructions.
- Live: v4.6.4 (`e8aae10a`), published by the gated workflow (CI green) and verified live 2026-10-16: smoke 11/11, verify-museum-viewer 7, verify-prewarm 24/24; live manifest serves the three re-generated models (sword seed 4242, crystal fragments seed 99, metatarsal seed 1234). Front-end code identical to v4.6.3, whose live verification follows.
- Live: v4.6.3 (`8f289f15`), published by the gated workflow (smoke 11/11 on bundled Chromium in CI; Archive CI green) and verified live 2026-10-16 with local Chrome: smoke 11/11, verify-prewarm 24/24, verify-museum-viewer 7, verify-progress 12, verify-search 16; live frame timing over the real network (5 runs, `verification/ui/frame-spikes-live.json`): first opening ~4 s after a cold load 33 ms p50 (max 50; v4.6.2 live: 50), after a reload 17 ms p50 (max 33), once settled 33 ms (max 50), chapter change / Back / later openings 17 ms. Earlier today: v4.6.0 (`186a3e58`), v4.6.1 (`6b1823e2`, superseded: warm-up race), v4.6.2 (`50c6931e`). Reverted frame-timing attempts: `verification/ui/frame-spikes-a.json`, `-b.json`.

## History: state on 2026-10-13 (v4.0.2)

- Git: everything is committed on `main` at https://github.com/SideQuest86/StellarisTales (Archive CI on every push).
- **Live: https://sidequest86.github.io/StellarisTales/ serves release v4.0.2 (`c0b8f203`, tag `v4.0.2`; v4.0.1 performance numbers below were re-measured live).** Verified v4.0.2 live: 1,388 stories, reader 13/13, walk 48 stories / 198 documents / 41 reversals / 0 errors, UI capture 50/50. Earlier v4.0.1 live run
  against the live URL on 2026-10-13 with local Chrome on the RTX 5070: reader checks 13/13 (incl. cross-story
  reading-context consistency), reading walk 48 stories / 212 documents / 43 reversals / 0 errors, UI capture 50/50,
  frame timing p95 6 ms for every interaction (worst frames: open 76 ms, chapter change 47 ms, back 18 ms). Publishing
  again = edit `RELEASE` on `main` (RUNBOOK "Release").
- Model V4: 1,388 stories, 8,668 readable documents (all assigned; the two unused developer test chains are excluded); event inheritance (`base =`) resolved; compile
  deterministic and checked in CI; 0 compiler warnings; only the three intentional exclusion fragments are orphans.
- Review: rounds 1–3 complete (ledgers in `content/chronology/review/`); every story `reviewed` with a guide. C1–C8
  accepted in REVIEW.md with evidence and explicit remaining uncertainties. Review records are audited per story in CI (`scripts/audit-guides.mjs --strict`), and an independent source spot-check by the coordinator (one story per category, 8/8 correct) is recorded in REVIEW.md.
- Reading evidence: content audit over all documents clean (CI, `--strict`); browser reading walk 48 stories /
  212 documents / 43 reversals / 0 errors; reader checks 12/12; UI capture 50/50.
- Cetana: whole chain reviewed (120 docs). 8295 / gifted_system: the only setter is 8295's own immediate while its
  trigger already requires it — not naturally reachable in the shipped script (no runtime verification). Databank
  1800-day project vs 900/540-day deadline: defines formula has undefined terms; the site claims neither outcome.
- UI/performance (RTX 5070 Laptop, ANGLE D3D11, 170 Hz, unthrottled headed Chrome): every interaction p95 6 ms.
  Remaining single frames: ~76 ms at the click that opens a story (layout of the new chapter text, before the
  extraction animation starts; the map is built after the card settles), ≤ 47 ms on a chapter change (map updates in
  the next idle period). No physical phone or other GPU tested; narrow layouts verified by emulation only.
- Tests: 32 Node + 10 Python.

## History: 博物天枢 · Grand Archive museum (2026-10-14, v4.1.x)

- Read `docs/museum/GRAND-ARCHIVE.md` (verified mechanics), `docs/museum/MODELS.md` (3D generation workflow, tool
  environment `D:/Saving/Living/CodexProjects/st-tools/`), `docs/museum/BUDGET.md` (task budget ledger).
- Data `public/museum/specimens.json` (regenerate: `python scripts/extract-specimens.py`), UI `src/museum*.js/.css`,
  models `public/museum/models/` + `manifest.json`. Check: `node scripts/verify-museum.mjs` (headed; set
  `STELLARIS_WINDOW_POSITION=-1900,20` to keep the window on the user's left monitor). GPU tiers: `src/gpu.js`,
  `node scripts/verify-gpu.mjs`, evidence `verification/gpu/`.
- Status (2026-10-14): all 258 specimens have v3 multi-view models (187 MB, meshopt-compressed), all inspected on
  `verification/museum/review-1..6.png` (`scripts/museum/contact-sheet.py`); `verify-museum.mjs` 268 checks, 0 page
  errors locally and on https://sidequest86.github.io/StellarisTales/#museum (v4.1.1, which fixes a double-built hall
  when the museum opened during start-up). Budget: 4 of 40 weekly points (docs/museum/BUDGET.md).
- Possible improvements: regenerate the weakest fits (lowest `silhouetteIoU`: black_needle_ceremonial_sword,
  massive_metatarsal, yuht_audio_console, crystal_nest_fragments) with another seed; flat items (maps, blueprints,
  panels such as star_mall_map, kuurian_cybrex_blueprints) open edge-on — a per-model opening angle in the manifest
  would fix that. (Both done 2026-10-16, round 3: opening views; re-runs not better.)

## History: refinement round 1 (2026-10-15, v4.2.0: Markdown guides, placeholders, typography, navigation, audio)

- **Live: v4.2.0 (`175c028c`) at https://sidequest86.github.io/StellarisTales/**; verified live 2026-10-15 with
  verify-refine-reader / -chrome / -audio and verify-reader-v4 (all passed, 0 page errors). Locally also verify-museum
  (268 checks), verify-ui-capture and verify-gpu (RTX 170 fps breathing). Budget: 2 of 40 weekly points.
- Start with [docs/refine/README.md](docs/refine/README.md): work split, files, evidence, limits. Audit per category:
  [docs/refine/AUDIT.md](docs/refine/AUDIT.md); placeholder ledger with open reviewer issues:
  [docs/refine/placeholders/LEDGER.md](docs/refine/placeholders/LEDGER.md); fonts and licences: [docs/FONTS.md](docs/FONTS.md).
- Placeholder wording lives in the story fragments (`placeholders`, `placeholderDocs`) and
  `content/museum/placeholders.json`; never in game text. To re-review: `python scripts/refine/placeholder_worksheets.py`
  (worksheets in docs/refine/placeholders/work/, not committed), reviewers write `docs/refine/placeholders/out/<group>.json`,
  then `python scripts/refine/merge_placeholders.py`, `python scripts/compile-stories.py`, `python scripts/refine/audit.py`.
  Specimens: `scripts/refine/merge_specimen_placeholders.py` then `scripts/extract-specimens.py`.
- Parallel front-end agents test with `node scripts/dev-sync.mjs` (refreshes dist/ without deleting it); only the
  coordinator runs `scripts/build.mjs`.
- Checks added: `scripts/verify-refine-reader.mjs`, `verify-refine-chrome.mjs`, `verify-refine-audio.mjs`,
  `scripts/refine/sample-render.mjs story:chapter …`; tests `tests/markdown.test.mjs`, `tests/audio.test.mjs`.

## History: refinement round 2 (2026-10-15, v4.3.0–v4.5.4: images, placeholders, effects, polish)

- **Live: v4.5.4 (`e19a281e`)**, verified live 2026-10-15 (verify-images, verify-a11y, verify-layout-sweep, verify-effects, verify-refine-chrome, verify-reader-v4). Evidence index: docs/refine/EVIDENCE.md; UI copy: docs/refine/UI-COPY.md.
- User decision 2026-10-15: faults in the game's own text (81, LEDGER.md) are kept as shipped — no display-time correction.
- Earlier: v4.5.3 (`cb76673c`), verified live 2026-10-15 (verify-images, verify-a11y, verify-layout-sweep, verify-effects, verify-refine-chrome, verify-reader-v4). Evidence index: docs/refine/EVIDENCE.md.
- Earlier: v4.5.2 (`555afe1e`), verified live 2026-10-15 with verify-images, verify-a11y, verify-layout-sweep, verify-effects, verify-refine-reader/-chrome/-audio, verify-reader-v4 (all passed).
- Earlier: v4.5.1 (`6b8ef7e1`), verified live 2026-10-15 (layout sweep, effects, refine reader/chrome/audio, reader V4; 0 page errors); full-catalogue local sweep `scripts/verify-layout-full.mjs`: 3,292 pages (every story + exhibit, 1600/390), 0 failures. Round-2 budget 8 of 40 weekly points.
- Earlier: v4.5.0 (`c0aca240`), verified live 2026-10-15 (layout sweep, effects, refine reader/chrome/audio, reader V4; 0 page errors); round-2 budget 6 of 40 weekly points.
- Earlier: v4.4.1 (`a94069b4`), verified live 2026-10-15 with verify-layout-sweep (all categories, museum, playlist, search; HD close-up), verify-effects, verify-refine-reader/-chrome/-audio, verify-reader-v4 (0 page errors). Budget round 2: 3 of 40 weekly points.
- Earlier: v4.3.0 (`578af821`), verified live with verify-effects, verify-refine-reader/-chrome/-audio and verify-reader-v4 (all passed, 0 page errors); locally also verify-museum (268), verify-ui-capture. Budget: 1 of 40 weekly points.

- Images: Real-ESRGAN x4plus (BSD-3) ×2 derivatives for all 618 event pictures (`public/art-hd/`, used for the
  close-up canvas and 2x `srcset`) and ×3 for all 258 specimen icons (`public/museum/img-hd/`, museum detail);
  originals untouched (rollback = remove the folders/markup), manifests with sources/settings/sha256, 3D atlas still on
  originals (bounded GPU memory). Comparison and licences: docs/IMAGES.md.
- Placeholders: nested scripted-text placeholders now worded (reviewed in content/chronology/scripted-names.json);
  typed concept links resolve to the game's names; 81 mechanical phrases reworded; slots may be omitted where the
  sentence reads naturally without them. Generic "这个名字/this name" occurrences: ~1,900 → 2 (static count).
- Effects: `scripts/effects.py`, `origin_effects.py`, `effects_data.py`, `compile-effects.py` → `public/effects/`;
  panel `src/effects-panel.js/.css` (collapsed `<details>` under each choice's outcome, at the document end, and the
  origin's starting effects). Coverage: 6,060 of 8,751 story documents have effects, 56 of 58 origins; 0.9 % of effect
  uses unhandled (counted in the panel). Model, limits, coverage table: docs/EFFECTS.md. Check: `scripts/verify-effects.mjs`.
- Polish: redundant hints/labels removed, spacing scale, transitions ≤ 0.2 s, AA contrast (docs/refine/progress-polish.md).
- Completion pass (after review feedback):
  - Substitution rules now live in `src/name-fill.js` (pure; used by the reader, the museum and
    `scripts/refine/render-sentences.mjs`; tests `tests/name-fill.test.mjs`). Every substituted sentence
    (27,037) was rendered as the site shows it and reviewed by 11 Haiku reviewers (`docs/refine/briefs/rendered.md`):
    1,159 / 1,159 stories and all specimens confirmed, 3,721 reviewed entries, 457 game-text exceptions in
    LEDGER.md. A case-insensitive localisation lookup fixed 14 scripted names (GetPlanetMoon …); empty phrases → 0.
  - Effects: 0 unhandled keys (≈170 new handlers, ≈90 justified bookkeeping keys, `scripts/effects_more.py`), all
    58 origins with starting effects (endbringers / doomsday via their start events), every document without
    effects classified (no effects 939 · chaining only 1,029 · bookkeeping only 678 · no record 58 · other 0);
    Chinese labels contain no English fallbacks (`scripts/effects_gloss.py`, check in effects_coverage.py).
  - Final placeholder state: after the Haiku rendered review, an independent Sonnet second review
    (`docs/refine/briefs/rendered2.md`) and a residual pass (`rendered3.md`) re-read every rendered sentence;
    1,159 / 1,159 stories confirmed by both, 4,877 reviewed entries (incl. per-document context `variants` for one key
    in several positions, and overrides of the game's scripted helpers). 92 exceptions remain, all faults in the
    game's own text (typos, agreement, truncated lines) or frames that need a real proper name — never rewritten
    (LEDGER.md). `$KEY$` refs the game never defines are omitted; `$COUNT$/$REQUIRED$` read "the required number of".
  - Entity mappings that reviewers had guessed were verified against the event scripts (28 cases, 19 corrected,
    evidence per case in docs/refine/placeholders/VERIFY.md).
  - Effects conditions: 0 generic "specific condition" labels (`scripts/effects_cond.py`, game trigger sentences,
    bilingual glossary); 0 labels from the raw key-word fallback (521 keys reviewed, docs/EFFECTS-LABELS.md) and 0 filler labels; internal story-state conditions read "if an earlier story condition holds".
  - Proper-name frames ("by the name of [X]", "名叫[X]的") are left out together with their slot (display only);
    remaining exceptions: 85, all faults in the game's own text. Effects lists are complete (no 60-item cut-off).
  - Accessibility + reduced motion: `scripts/verify-a11y.mjs` (system and site reduced motion, keyboard navigation
    incl. Grand Archive, notes/panels by keyboard, accessible names, focus ring, contrast 6.78:1). Image delivery:
    `scripts/verify-images.mjs` (desktop close-up and DPR-2 phone use art-hd, DPR-1 keeps originals, museum img-hd,
    3D atlas originals only). Coverage/licences/rollback: docs/IMAGES.md (618/618 pictures, 258/258 icons).
  - Layout sweep `scripts/verify-layout-sweep.mjs` (all 8 categories, museum, playlist, search; 1600 / 390; zh / en;
    overflow, column, page errors; desktop close-up loads `art-hd`) — screenshots reviewed as contact sheets.

## Next work

1. Optional improvements: reduce the ~50 ms first layout when a document opens (see Frame timing above; e.g. lay out
   the selected story in idle time before the click); prefix search for Latin words; save multi-step dialogue state;
   collapse "thank-you" windows that only return to an enclave menu (r3-inherit request); merge
   event-anomaly-4036 into anomaly-sun-rays-cat (r3-integrate request); larger close-up on tall viewports.

## Working rules

- Reviewers are subagents in private copies or own output files; only the coordinator merges and commits. Story-detail
  refinement runs on Haiku (low effort) in parallel; other subagents on Sonnet (low effort).
- Never hand-edit generated JSON; edit `content/` or scripts and recompile.
- Never reset/clean the working tree; keep small commits on `main`.
