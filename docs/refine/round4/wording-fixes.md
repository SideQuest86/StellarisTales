# Round 4 wording fixes (effects, guide review, map labels)

Game text, tooltips (gameText) and names untouched. Output regenerated with `python scripts/compile-effects.py`.

## Changes
- #1 Resource name: the empty-name lines came from parser debris (key `""`, from an inline `@\[...]` expression in scripted effects such as add_resource_astral_threads); `h_add_resource` now skips non-identifier keys (the real resource line is already emitted). SCALED is now `（随存档而定）` / ` (depends on the save)`.
- #2 `if_label` / `not_label` (effects.py): no doubled "If: if"; STORY phrase `满足前置条件时` / `if an earlier condition holds`; short negations `未满足前置条件` / `unless an earlier condition holds` (long ones keep `不满足（…）` / `not (…)`).
- #3 Random options: `约 33.3%` / `About 33.3%`, plus `（受条件调整）` / ` (adjusted by conditions)`; unknown `一种可能` / `One possible outcome`.
- #4 effects-panel.js: "On:" hidden for the owning empire always; capital planet / explorer only when every line of the panel has that target.
- #12 Panel note only when the panel has a random item: `概率为基础值。` / `Chances are base values.`
- #13 No "Other" chip for generic effects (the "Game text" chip stays, it carries provenance).
- #14 Monthly-income lines: `社会学研究 +12 个月产出（250 至 100000）` / `Society Research +12 months of income (250 to 100000)`; ship builder no longer prints `"last created design"`.
- #7 markdown.js: the Review notes section (`审阅记录` / `Review notes`) is removed from the flow and rendered last in `<details class="md-review">` labelled in the UI language (source Markdown unchanged). Mixed zh+en lines (list items, paragraphs, `## 如何开始 How it starts` headings) are split into `data-lang` spans so the existing language toggle works (`splitMixed`, exported). CSS in reader-extras.css.
- #11 / #19 i18n.js: `map.entry` 起点 / Start (was 独立触发 / Starts on its own); `map.stats` en `{n} chapters · {r} read`.

## Before / after
- `某种资源 +40` / ` +40` -> line removed (duplicate debris); `…（数值由游戏按存档情况计算）` -> `星界丝缕（随存档而定）`
- `如果：满足此前剧情设定的条件时` / `If: if an earlier story condition holds` -> `满足前置条件时` / `If an earlier condition holds`
- `约 30% 的概率（基础权重 3/10，概率会被条件调整）` -> `约 30%（受条件调整）`
- `获得社会学研究：相当于每月产出的 12 倍，至少 250，至多 100000` -> `社会学研究 +12 个月产出（250 至 100000）`

## Counts after regeneration (labels in public/effects, 91,938 labels)
- empty-name resource lines: 4,646 -> 0 (one legitimate "multiplier" line); "scaled" lines now `随存档而定`: 1,814
- "If: if" doubled prefix: 4,069 -> 0; STORY phrase labels 7,558; short negations 930 (`未…`/`unless`); long `不满足（` kept for long clauses
- old base-weight labels: 6,653 labels now `约 N%`; 57 remaining `…权重` hits are game text (diplomatic weight)
- monthly-income lines in new form: 2,947; `last created design` ship leaks: 0 (66 unrelated `Species becomes "last created species"` remain, out of scope)
- targets: owning empire 15,929 (hidden always); capital 11,120 / explorer 2,536 (hidden only panel-wide)
- generic 3,765 (no chip); tooltip 6,520 (chip kept)
- coverage: 0 unhandled, 0 raw key words, 0 Latin zh labels.

## Tests
`python -m unittest discover -s tests` 45 OK (STORY phrase and income wording updated); `node --test tests/*.test.mjs` 91 pass (new: note/target/chip tests in effects-panel, review/split test in markdown). `effects_coverage.py` clean. Browser screenshots were not obtained: the preview page never finished loading under the shared machine load (Playwright timed out); instead rendered real data through renderEffects/renderMarkdown in node (zh+en) and checked the HTML.

## Patches for files I do not own
- None required. Optional (app.js, #11): hide the `map.entry` caption on single-root stories. The Review `<details>` summary is localised inside markdown.js from the `lang` argument guideElement already receives.
