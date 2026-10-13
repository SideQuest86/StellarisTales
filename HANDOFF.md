# Stellaris Tales — start here

Handoff prepared 2026-10-12 for Opus 5.5. This document takes precedence over historical progress claims in CodexDoc.md, README.md and verification/README.md. Source files and new observations remain authoritative. This handoff does not declare V3 complete and does not publish it.

## Read in this order

1. This file: scope, status and next work.
2. [Resource map](docs/RESOURCE-MAP.md): code, content, assets and references.
3. [Runbook](docs/RUNBOOK.md): build, verification, preservation and release.
4. [Manual review ledger](content/chronology/REVIEW.md): C1–C8 acceptance and source findings.
5. [Last development checkpoint](content/chronology/CHECKPOINT-2026-09-11.md): detailed unfinished Cetana work.
6. [CodexDoc](CodexDoc.md) and [verification history](verification/README.md): historical decisions/evidence; later entries supersede earlier claims.

## Product contract

Build an immersive, bilingual archive of all stories in the local Stellaris installation, including installed DLC files. Preserve choices, alternatives, prerequisites, delays, repeatable encounters and actual game chronology. Complete record assignment is not proof of correct chronology. Do not substitute numeric ID order, DFS visitation or arbitrary links for the story's real sequence. Read relevant game scripts and both localizations manually; inspect projects, effects, on_actions, situations, archaeology and system initializers where needed. Separate random/parallel investigations from sequential events and mutually exclusive endings.

Visual target: the supplied RhineLabUI example, using Stellaris art/content. Archive rows extend beyond both screen edges; cards move continuously rather than appearing from nowhere. Catalogue information belongs at the top. Each closed card uses its corresponding original game image (the later user request supersedes uniform black covers). Opening extracts the card into a large left-side close-up; right-side typography prioritizes story text. Frosted geometric image transitions should remain continuous on opening and chapter changes. Use the left card for an elegant Detroit-inspired branching map with actual visited choices and clear alternatives. Optimize fonts, transitions and rendering; preserve reduced-motion behavior. No generative replacement art. Keep engine code/IDs out of the normal reader.

Maintain an honest, source-grounded Markdown guide for every fully reviewed story; partial guides must say what is missing. Guides help both readers and future implementation. Preserve original text separately from commentary; do not invent unavailable Wiki material.

## Current state, verified locally on 2026-10-12

- HEAD: `3309ebad9452ba88f69038e57c88dc040ea00c42` (original game artwork covers).
- The working tree contains extensive **uncommitted V3 source, configuration, generated-data and test changes**, including untracked chronology modules, guides and verification scripts. A clean Git clone alone will lose this work. Do not reset/clean it or discard generated deletions indiscriminately.
- Current story coverage file reports 11,347 source/assigned records, 2,271 dossiers, 2,178 readable dossiers, 8,534 chapters and 58 origin overviews. These are coverage statistics, not narrative correctness.
- Six Markdown guides exist: Cybrex, Vultaum, Yuht, Cetana, Treasure Hunters and the Jabbardeeni cache. This is far short of all stories.
- All eight C1–C8 boxes remain unchecked. Older L1–L8/V2 completed boxes must not be used as V3 acceptance.
- Node v24.19.0, the bundled Python executable, the game events folder and local RhineLabUI reference are present. This handoff inventory did not re-extract the game or rerun application/browser tests.
- Historical development evidence: 56 Node and 10 Python tests passed, plus several targeted browser checks. Inspect each script's coverage and rerun after relevant changes. Not every browser script writes a JSON result; some only print success and save screenshots.
- Last recorded deployment is the old version at https://sidequest86.github.io/StellarisTales/. Remote HEAD, Actions status and current live content were not rechecked during handoff. Local V3 changes have not been committed/published by this handoff.

## Progress and priorities

| Area | Reusable work | Still required |
| --- | --- | --- |
| Chronology engine | Explicit bridges, endings, dialogue states, reading profiles, precursor stages, named map nodes; no default DFS next chapter | Consistent cross-chapter prerequisites/history and all-category manual acceptance |
| Precursors | Cybrex/Vultaum/Yuht parallel investigations, six-clue gate, optional secrets; Yuht cache cross-dossier route | Remaining discovery/extra-clue conditions and full category review; other reviewed examples are not whole-category completion |
| Origins | Classification fixes, selected opening anchors, Treasure Hunters dialogue/endings | All origins and shared content associations; maintain exclusive outcomes |
| Cetana | Opening timing, second speech, repeated communications, storm research, databank dialogue, random demands and relic request | Remaining history, encounters, convoys, war, victory/failure and full-chain consistency |
| Other categories | Selected fixes for archaeology, rifts, Horizon Signal, crises, pre-FTL situations and repeatable menus documented in REVIEW | Inspect every category/story; automated coverage is insufficient |
| Map and animation | Choice-aware parallel edges, graph reuse, theme labels, reduced-motion handling, hidden mobile scene stops rendering | Dense graph crossings/layout; open/close and reversal quality; font/render efficiency and real device checks |

Resume from the ledger rather than repeating already-reviewed branches. Prioritize Cetana's remaining chain and shared state correctness, then systematically finish C1–C8. Specifically unresolved: event 8295 requires `gifted_system` before its immediate block chooses that target; its upstream source remains unknown. Databank project 1800 research days versus 900/540 deadlines needs engine-semantic verification. Do not silently infer either is impossible or correct.

Dialogue profiles are explicit reading assumptions, not a save-state simulator. Currently users can select inconsistent contexts across chapters; labels alone do not satisfy natural gameplay order. Existing headless performance samples show transition frame spikes; rAF intervals are not GPU timings and narrow desktop viewports are not physical mobile hardware.

## Workflow and completion

For each story: inspect authoritative sources → record a concrete chronological/branch model and unresolved questions → implement only supported edges/state → update its guide → test actual reading choices, backtracking and alternative outcomes → record evidence in REVIEW/CodexDoc. Mark a category complete only when its full scope has evidence. Keep original bilingual text and source provenance intact.

Final website delivery requires all C1–C8, visual and performance acceptance, maintained documentation, successful build/tests and verified GitHub Pages deployment with a working link. This handoff task only organizes the repository and supplies the successor prompt; it is not website completion.

The September run stopped at 4% remaining quota under a no-reset rule. That figure is historical, not current account state. Do not reset quota, launch other agents or resume an old automation based on stale logs. Follow the user's current authorization and budget. The requested successor goal supplies continuation scope; this handoff itself makes no further application changes.
