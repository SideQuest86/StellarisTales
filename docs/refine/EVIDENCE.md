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
