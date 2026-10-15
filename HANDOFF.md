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

## Next work

1. Optional improvements: render the first chapter before the reader animation to hide the open-click frame;
   collapse "thank-you" windows that only return to an enclave menu (r3-inherit request); merge
   event-anomaly-4036 into anomaly-sun-rays-cat (r3-integrate request); larger close-up on tall viewports.

## Working rules

- Reviewers are subagents in private copies or own output files; only the coordinator merges and commits. Story-detail
  refinement runs on Haiku (low effort) in parallel; other subagents on Sonnet (low effort).
- Never hand-edit generated JSON; edit `content/` or scripts and recompile.
- Never reset/clean the working tree; keep small commits on `main`.
