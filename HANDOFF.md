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
  Pages deploys only for a `v*` tag; the live site https://sidequest86.github.io/StellarisTales/ still serves the old
  pre-V4 version until the release.
- Model V4: 1,401 stories, 8,670 readable documents (all assigned), 152 shared hubs; event inheritance (`base =`)
  resolved; compile deterministic and checked in CI.
- Review: every story has a fragment + guide with status `reviewed` (rounds 1–2). Round 3 is running:
  `r3-inherit` re-checks the 29 stories whose trees changed with the inheritance fix (enclaves, three origins…);
  `r3-integrate` resolves cross-story requests, 10 compiler warnings and 9 orphan fragments. Categories are accepted in
  REVIEW.md only after round 3 is merged.
- Cetana: whole chain reviewed (120 docs). 8295 / gifted_system: the only setter is 8295's own immediate while its
  trigger already requires it — not naturally reachable in the shipped script (no runtime verification). Databank
  1800-day project vs 900/540-day deadline: defines formula has undefined terms; the site claims neither outcome.
- UI/performance (RTX 5070 Laptop, ANGLE D3D11, 170 Hz): idle/scroll/drag/map/close p95 ≈ 6 ms; chapter change one
  frame ≤ 60 ms; first story open one 70–105 ms frame at the click (layout of new chapter text; CJK glyph warm-up and
  forced-layout removal cut it from ~110 ms with two layouts). Headed real-GPU runs only; no physical phone tested.
- Tests: 26 Node + 10 Python; reader checks (verify-reader-v4) 12/12; UI capture 50/50.

## Next work

1. When round 3 reports: `scripts/review-copies.py merge r3-inherit r3-integrate`, compile, tests, audit, commit; move
   the copies to `st-agents/_done/`; resolve anything they mark partial or request.
2. Category acceptance: per category record evidence in REVIEW.md (all stories reviewed, audit clean, warnings/orphans
   resolved, sampled reading paths in the browser incl. exclusive outcomes, reversals and cross-story links).
3. Final reading/visual/performance pass in the real browser (desktop + narrow), screenshots inspected.
4. Release: green Archive CI → tag `v4.0.0` → Pages run → verify the live site and report the link.

## Working rules

- Reviewers are subagents (model Sonnet, low effort) in private copies; only the coordinator merges and commits.
- Never hand-edit generated JSON; edit `content/` or scripts and recompile.
- Never reset/clean the working tree; keep small commits on `main`.
