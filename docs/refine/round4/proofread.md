# Interface and generated wording proofread (zh / en), release v4.7.3

AI proofread, not a native-speaker review. Game text (story, choices, names, tooltips, specimen descriptions, game-localised
effect sentences) was not touched; only wording this project wrote. Style kept: less is more, brand "Stellaris Tales".

## Method and coverage
- Read all of `src/i18n.js` (about 190 dictionary entries) and every `T("zh","en")` call in app.js, museum.js, search.js,
  effects-panel.js, name-fill.js, name-tooltip.js (about 130 strings), plus index.html attributes; gpu.js, audio-player.js,
  flow-surface.js, story-map.js, markdown.js, flow-tree.js only use dictionary keys or carry no text.
- Generated wording: read `scripts/effects.py`, `effects_cond.py`, `effects_gloss.py` (glossary, about 1,100 words and 180 scope
  nouns), `effects_labels.py` (about 800 reviewed condition templates), `effects_more.py` (about 300 effect templates), then
  tallied every label/when/target pair in `public/effects/*.json`: 1,194 files, 166,119 pairs, about 5,800 distinct zh and
  5,900 distinct en patterns once names and numbers are masked. Scripted checks: ASCII punctuation in zh, CJK-space-CJK,
  digit/CJK adjacency, double punctuation, leftover placeholders, a/an, full-width in en, glued words, unfilled `{n}`.
- Looked at the reader in zh and en at 1400 px and 390 px (screenshots, page text). All gates below pass.

## Changes (count = labels in `public/effects` where recurring)
| Item | Before | After | File | Count |
| --- | --- | --- | --- | --- |
| zh condition joiner has a space | `A，且 B` | `A，且B` | effects.py | 14,500 |
| zh "or" joiner | `A 或 B` | `A或B` | effects.py | about 1,000 |
| zh scope chain: wrong order, spaces | `观测前哨 的 目标对象 的 我们的帝国` (reads as the reverse) | `我们的帝国的目标对象的观测前哨` (en unchanged) | effects.py | 3,600 |
| zh repeat | `重复 若干次：` | `重复若干次：` | effects.py | 137 |
| zh number next to CJK in condition templates | `游戏已进行超过30年`, `人口数量超过N`, `拥有超过N颗星球` | `超过 30 年`, `超过 N`, `超过 N 颗` (the "N 个月" convention) | effects_cond.py, effects_labels.py (`num_space`) | 1,500 |
| zh game trigger sentence padded around a placeholder | `与 另一方处于战争状态` | `与另一方处于战争状态` | effects_cond.py | 10 |
| zh three words for negation | `不满足：` / `并非：` / `未满足：` | `未满足：` | effects.py, effects_cond.py, effects_labels.py | 6,200 |
| zh term for Special Project | `专项` (also 研究项目 in the doc label) | `特殊项目`, as in the game text and the en label | effects*.py, i18n.js `doc.project`, effects-panel.js | 940 |
| en bug: DLC condition | `the host has DLC is installed` | `the Distant Stars DLC is installed` (names added; unknown name drops out of both languages) | effects.py | 11 |
| zh/en DLC names | `游牧` vs `游牧民族` | `游牧民族` | effects.py | few |
| en modifier duration | `Gains the "X" modifier, permanent` | `..., permanently` | effects.py | 3,143 |
| en ship label | `A new ship appears "X"` | `A new ship appears ("X")` (as for armies) | effects.py | 970 |
| en xenophile/xenophobe | `is xenophile`, `is fanatic xenophobe` | `is a xenophile`, `is a fanatic xenophobe` | effects_gloss.py | 100 |
| zh glossary: Unity, L-Gate | `团结`, `L星门` | `凝聚力` (the game's word), `L-星门` | effects_gloss.py, effects_labels.py | few |
| en/zh small | `favours`; `帝国威信` vs `帝国权威`; `...` | `favors`; `帝国权威`; `…` | effects_labels.py, effects_more.py, effects.py | few |
| en search count 1 | `1 results` | `1 result` | app.js | 1 |
| en museum count 1 | `1 specimens` | `1 specimen` | museum.js | 1 |
| en effects note 1 | `1 more effects are not itemised` | `1 more effect is not itemized` (US spelling) | effects-panel.js | 1 |
| en variant chip | `If：` (full-width colon) | `If: ` | app.js | every conditional passage |
| zh/en model line | `模型: file` | `模型：file` | museum.js | 1 |
| zh/en unify "chapter" | `Document`, `This document also appears in:`, `Returns to a page`, `N pages`, `single page`, `只有一页`, `此文档` | `Chapter`, `This chapter also appears in:`, `Returns to a chapter`, `N chapters`, `single chapter`, `只有一篇`, `此篇章` | app.js, i18n.js | 5 |
| zh quantifier for a story | `上一份故事` / `下一份故事` | `上一则故事` / `下一则故事` (as in `另一则故事`) | i18n.js, index.html | 2 |
| zh 加载 vs 载入 | `未能加载` | `未能载入` (matches `未能载入，请稍后重试。`) | i18n.js, app.js, museum.js, verify-museum.mjs | 4 |
| zh 几率 vs 概率 | `{p}% 几率` | `{p}% 概率` (as in the panel) | i18n.js | 1 |
| delay/chance captions | `约100天后`, `about 100 days later`, `（受条件修正）`, `~50%` | `约 100 天后`, `after about 100 days`, `（受条件调整）`, `about 50%` (as the effects panel) | app.js | 3 |
| Same concept, two en words | `Prior experience` vs `Earlier events`; `Speaker` vs 对话物种; `Story reading notes` | `Earlier events`; `Dialogue species`; `Reading guide · Spoilers` | i18n.js, app.js | 4 |
| zh ellipsis | `搜索中…` | `搜索中……` (as `正在载入……`) | app.js | 1 |
| zh note | `按你的档案设定选用…` | `按你的文明设定选用…` (term "Empire profile") | name-tooltip.js | 1 |
| en rarity / exhibit | `Any rarity`, `Close exhibit` | `All rarities` (as All collections), `Close specimen` / `关闭标本` | museum.js | 2 |
| effect kind chip | `Pops`, `Project` | `Pop`, `Special project` | effects-panel.js | 2 |

## Deliberately left
- Game text, including its faults: double spaces and stray spaces where the game's icons were removed (`Society Research from  Jobs`,
  `岗位产出的 贸易`, `每月 能量币`, about 280 en and 35 zh patterns), `an Commander`, `评价： N`, `Is Owned by our empire`.
- zh label dropped while en keeps a humanised key (`获得特质` / `Gains the "leader trait expertise voidcraft 2" trait`, about 90):
  by design (no raw id in zh); en is not game text but the lost name cannot be recovered.
- Terse subject-less conditions (`has researched "X"`, `unless has ...`, `If: ...`): a rewrite changes the whole condition grammar.
- `Special project` (doc label) vs `Research project` (story-map group): different things; zh now differs too.
- `reading.js` joins profile atoms with ` · ` and ` 或 `; spaces help there and it is not an effect label.
- `Grand Archive` (DLC in condition labels) vs `博物天枢` (the museum): the DLC keeps its game name.
- `cancelled`, `itemised` in docs/comments; British spellings only in comments.
- Story data captions such as `约915天后（危机开始第1095天）` are content, not UI.
- docs/refine/UI-COPY.md and docs/EFFECTS-LABELS.md still list the old strings (inventory docs, not edited).

## Tests (all after the changes; STELLARIS_PREVIEW_URL=http://127.0.0.1:4194/, server stopped afterwards)
- `compile-effects.py` ok; `effects_coverage.py` 0 unhandled, 0 Latin words in zh, 0 raw keys in en.
- `python -m unittest discover -s tests`: 45 ok (two pinned strings updated in test_effects.py).
- `node --test tests/*.test.mjs`: 95 ok (effects-panel.test.mjs pinned the plural bug; updated).
- `build.mjs` ok. smoke 15/15, verify-effects ok, verify-search 16/16 (regex `results?` for the singular), verify-refine-chrome PASS,
  verify-a11y ok; 0 page errors. Not rerun: verify-museum.mjs (string regex updated only), other verify-* scripts.
