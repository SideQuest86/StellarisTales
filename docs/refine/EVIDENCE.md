# Refinement round 2 — evidence (2026-10-15, release v4.5.4)

Each claim with the command that proves it (run from the project root; browser checks need a preview or
`STELLARIS_PREVIEW_URL=https://sidequest86.github.io/StellarisTales/`).

| Goal item | Claim | Evidence |
| --- | --- | --- |
| 1 Images | 618/618 event pictures ×2, 258/258 icons ×3; licences per model and asset class; exceptions justified | docs/IMAGES.md (comparison, licences, coverage); 623 art-sources entries share 618 files |
| 1 Images | Licences verified at the source | docs/IMAGES.md 'Licence files checked at the source' (Real-ESRGAN BSD-3, fonts OFL 1.1, meshoptimizer MIT) + 'Licences by asset class' |
| 1 Images | Reproducible | `python scripts/images/batch.py icons` → byte-identical output (0 git changes) |
| 1 Images | Rollback | `node scripts/verify-rollback.mjs` on a build without HD folders → originals, 0 errors |
| 1 Images | Delivery: lazy, srcset, bounded memory | `node scripts/verify-images.mjs` (desktop close-up + DPR-2 phone use art-hd, DPR-1 originals, museum img-hd, 3D atlas originals only) |
| 2 Names | Every substituted sentence reviewed as rendered, three passes; entity guesses verified | docs/refine/placeholders/LEDGER.md (1,159/1,159 confirmed), VERIFY.md (28 cases, file:line); `node scripts/refine/render-sentences.mjs` (0 empty phrases) |
| 2 Names | Shared, tested rules | `node --test tests/name-fill.test.mjs` |
| 2 Names | Remaining exceptions | 81, each quoted as a fault in the game's own words with no substitution involved (LEDGER.md; final pass brief docs/refine/briefs/exceptions-final.md) — never rewritten by design |
| 3 Effects | Complete and current | `python scripts/effects_coverage.py` (0 unhandled of 133,901 uses; 0 generic / key-word / filler labels); a fresh `python scripts/compile-effects.py` changes 0 files; `python -m unittest` (effects tests) |
| 3 Effects | Panel | `node scripts/verify-effects.mjs` |
| 4 UI | Less is more | built site contains none of the removed subtitles/hints (银河叙事档案, 群星 · 银河记忆, Galactic Memory, 拖动或方向键浏览, 切换类别, STELLARIS ORIGINAL SOUNDTRACK, 群星之间); `<title>Stellaris Tales</title>`; list of removals in docs/refine/progress-polish.md; `scripts/verify-refine-chrome.mjs` asserts they stay removed |
| 4 UI | Complete less-is-more pass over every interface string | docs/refine/UI-COPY.md (every visible string reviewed: 182 kept, 27 shortened) |
| 4 UI | Accessibility, reduced motion | `node scripts/verify-a11y.mjs` (zh + en) |
| 4 UI | Layout everywhere | `node scripts/verify-layout-full.mjs` (every story + exhibit, 1600/390: 3,292 pages, 0 failures); `verify-layout-sweep.mjs` (screenshots reviewed) |
| Release | Published and verified live | RELEASE, HANDOFF.md "Live:" line |

Not possible from here: a physical phone test (emulation only) and a native-speaker proofread of the wording.

## Round 3 (2026-10-16, release v4.6.0)

| Goal item | Claim | Evidence |
| --- | --- | --- |
| 1 Museum viewer | Normalised once; A-B-A, rotation, reset, rapid switching, slow download, bounded cache | `node scripts/verify-museum-viewer.mjs` (7 checks; `ALL=1` opens all 258 models); `tests/museum-view.test.mjs` |
| 2 Progress | Saved, validated, reconciled, restored incl. cross-story paths; direct links do not invent history; storage failures tolerated | `node scripts/verify-progress.mjs` (12 checks); `tests/progress.test.mjs` (8) |
| 3 Search | Body text, choices, effects, specimens; exact navigation; index loaded on demand; escaped snippets | `node scripts/verify-search.mjs` (16 checks, text-only and effect-only probes in zh/en); `tests/search.test.mjs` (10) |
| 4 Museum presentation | Flat models face-on; Reset; weakest models re-run, no benefit | docs/museum/MODELS.md "Viewer and re-run"; `verification/museum/opening-views.json` |
| 5 Frame spikes | Fresh baseline; one-time reader/map cost found by trace and moved to a quiet idle warm-up (v4.6.1): first opening 50 → 33 ms p50, map frame 50 → 33 ms; browsing during start-up unaffected | `node scripts/verify-frame-spikes.mjs` → `verification/ui/frame-spikes.json` vs `-baseline.json` (same session, 8 runs); HANDOFF "Frame timing" |
| 6 Release gate | Browser smoke checks block deployment; fails 5/10 against the previous release | `scripts/smoke.mjs`; `.github/workflows/pages.yml`, `ci.yml`; HANDOFF "Current status" |

Decision (user, 2026-10-15): the 81 faults in the game's own text are kept exactly as shipped (no display-time correction); they stay listed in docs/refine/placeholders/LEDGER.md as known game-text issues.

Decision (user, 2026-10-16): 60 Hz same-session frame-timing comparisons accepted (170 Hz panel not active, no rerun); item 5 stops at the v4.6.3 result with the residual first map build documented.

## Round 4 (2026-10-18, release v4.7.0)

| Goal item | Claim | Evidence |
| --- | --- | --- |
| Issue list | Ranked, evidence-backed list from four audits (wording, performance, interaction, design) | `docs/refine/round4/ISSUES.md` and the four audits beside it |
| 1 Immersion | Generated/UI wording refined, game text untouched; recurring fixes applied across the whole catalogue (effects regenerated for all 1,194 stories) | `docs/refine/round4/wording-fixes.md` (counts after regeneration); `python scripts/effects_coverage.py` (0 unhandled / generic); `node scripts/verify-effects.mjs` |
| 2 Efficiency | Cold load on an emulated slow phone: covers 50 → 27 s, 11.5 → 6.7 MB; search first query 20 → 11 requests; museum list long task 134 → ~64 ms; desktop unchanged by design | `docs/refine/round4/perf-audit.md`, `perf-fixes.md`; `node scripts/bench/bench.mjs cold|search|museum` (PROFILE=desktop/mobile) → `verification/round4/perf/` |
| 3 Robustness | D1 cancel during download, D2 landscape reach, D3 Back closes the reader, D4 audio failure visible, D5 localised network error; regressions in the release gate | `docs/refine/round4/interaction-audit.md`; `scripts/smoke.mjs` (14 checks); `scripts/probe/interaction-probe.mjs` (24 scenarios) |
| 4 Creative | Continue-card pictures; specimen round trip to the awarding chapter; deferred ideas recorded | `docs/refine/round4/design-ideas.md`; smoke "a specimen link from a chapter …" |

Not possible from here: physical phones (emulation only), a real low-end GPU, a native-speaker proofread.