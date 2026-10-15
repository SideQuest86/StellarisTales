# Stellaris Tales — start here

Updated 2026-10-13 (Opus 5.5). This file takes precedence over older progress claims in CodexDoc.md, README.md and
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

## Current state (2026-10-13)

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

## 博物天枢 · Grand Archive museum (added 2026-10-14)

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
  would fix that.

## Refinement 2026-10 (Markdown guides, placeholders, typography, navigation, audio)

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

## Refinement round 2 (2026-10-15: images, placeholders, effects, polish)

- **Live: v4.5.3 (`cb76673c`)**, verified live 2026-10-15 (verify-images, verify-a11y, verify-layout-sweep, verify-effects, verify-refine-chrome, verify-reader-v4). Evidence index: docs/refine/EVIDENCE.md.
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

1. Optional improvements: render the first chapter before the reader animation to hide the open-click frame;
   collapse "thank-you" windows that only return to an enclave menu (r3-inherit request); merge
   event-anomaly-4036 into anomaly-sun-rays-cat (r3-integrate request); larger close-up on tall viewports.

## Working rules

- Reviewers are subagents in private copies or own output files; only the coordinator merges and commits. Story-detail
  refinement runs on Haiku (low effort) in parallel; other subagents on Sonnet (low effort).
- Never hand-edit generated JSON; edit `content/` or scripts and recompile.
- Never reset/clean the working tree; keep small commits on `main`.
