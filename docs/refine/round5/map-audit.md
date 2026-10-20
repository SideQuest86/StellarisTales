# Story map audit (round 5, audit only, no source edits)

Method: Playwright + Chrome headless against the live site, 1440x900 and 1920x1080, zh and en, 28 stories (small linear: automated-dreadnought,
event-grand-archive-500; branching: event-colony-9200, rift-interdimensional-circus, event-paragon-549; random: anomaly-con-biology-cat,
pre-ftl-new-world-order, event-arkship-65, artisan-troupe; parallel/project: event-specialist-1100, defenders-of-the-galaxy,
event-grand-archive-10000; cross-ref: event-federations3-2200, mercenary-enclave, curators, event-shroud-4199; conditions/failure:
situation-voidworm-country-situation, site-site-fumongus-dig, anomaly-time-loop-world; very large: the-shroud, cetana, origin_unplugged,
origin_treasure_hunters, origin_shroud_forged, event-bio-1, archaeology-incidents, event-marauder-1, galactic-nemesis).
Screenshots and raw metrics: `verification/round5/map/*.png` (`<id>_<width>-<lang>_{default,expanded,expfit}.png`) and
`verification/round5/map-{results,perf,stress,kbd,cards}-*.json`. Headless Chrome has no GPU, so frame times are a floor, not a phone measurement.

## Ranked issues

1. **The map viewport is tiny and "fit" cannot fit (high value).** On open the viewport is 666x198 px at 1440 and 888x285 at 1920: 2-10 nodes
   visible (2-3 for most sampled stories; see the-shroud_1440-zh_default.png). The art band takes 46% of the card
   (style.css:1371 `--card-band`). "Expand" (⤢) only drops the art: viewport 666x424 at 1440, still a 690 px wide card on a 1920 screen
   (event-bio-1_1920-en_expfit.png: 30 % of the card used). `fit()` clamps to ZOOM_MIN 0.3 (flow-surface.js:24, :587), so for maps wider than
   viewport/0.3 the button "Show all" shows a 4 px-text strip in a corner: about 17 of 28 stories end at 30-40 % in the expanded fit (event-colony-9200 30 %,
   curators 30 %, event-bio-1 30 % of an 8686 px wide map); the-shroud unfolded is 26123x2288 (the-shroud_unfolded_fit.png).
   The "0 = show all" key and the legend promise something the map cannot do. Fix: (a) expanded mode = real overlay/modal using
   ~90 vw x 85 vh (low risk, CSS + `setExpanded`), (b) lower ZOOM_MIN to 0.12 and render a "minimap/overview" mode below 0.4 that draws
   boxes only with no text (medium), (c) rename "Show all" to "Fit" when clamped or show "overview" badge (low).
2. **Truncation hides exactly the distinguishing text (high).** Doc nodes are 188x56 with a 1-line caption and 1-line title (flow-surface.js:392-394,
   flow-tree.js:497). Evidence: event-federations3-2200 en: every "Turn to · Ecumenical…" chip and the current node ("Federation Ecumenical…",
   "Triggered by game state · aft…") are cut to an identical prefix (event-federations3-2200_1920-en_expanded.png; 32 captions truncated in zh,
   38 in en); archaeology-incidents: 44 sibling nodes each captioned "Another way in" with titles cut at "(+3 clues…" (41 truncated titles at 1920-en,
   archaeology-incidents_1920-en_expanded.png); event-bio-1 64 of 76 captions truncated (en); cetana condition captions are 40+ char
   sentences cut at ~15 CJK chars. `title` tooltips carry the full text but touch users and keyboard users do not see them. Fix: wrap the
   caption to 2 lines and grow the node to 64-72 px when caption>1 line (medium: layout heights in flow-tree.js nodeSize); drop redundant
   captions such as the repeated "Another way in"/"另一个入口" when all siblings share it (low); show the full aria-label in a hover/focus
   popover in the toolbar band (low).
3. **Map titles differ from the reader's headings (high, comprehension).** `docTitle` prefers `tree.labels` (flow-surface.js:306-308), i.e.
   curated nodeLabels. In 161 stories 997 of 1020 labelled chapters have a map title different from the chapter title the reader shows
   (cetana crisis.8035: map "风暴初现", reader "功率骤增"; the-shroud utopia.2655 "突入虚境（传统）" vs "虚境"; event-bio-1 bio.5 "阶段一：选择路线"
   vs "本性可移"; mercenary-enclave: page "佣兵城邦" but node "佣兵联络菜单", and four sibling nodes all titled "佣兵城邦"). Also
   event-colony-9200: card "黑暗等待"/"失踪！" versus node "打开大门"/"工人失踪". Users cannot match a node to the page they are reading
   or to the "continue" card. Fix: show the reader title as the node title and the curated label as the caption/tooltip, or show both ("label · title")
   (low-medium; `docTitle` + one more caption line); at minimum put the reader heading in the node `<title>`.
4. **Legend does not explain the vocabulary actually drawn (medium-high).** Legend (flow-surface.js:287, style.css:1473-1515) lists only
   current / your route / read / untaken / returns. Not explained: ⚄ random, ◈ exclusive, ◇ player choice, ∥ any order, ↻ returns, the gold
   diamond (ending), "+412" fold badges, "≈25 %" modified chance, dashed pill vs dashed box, dotted join lines (flow-surface.js:309-327, :387, :403).
   Fix: add a "?" button that opens a one-screen key with a sample of each glyph (low risk, i18n entries); add "ending" and "folded +N" to the
   inline legend (low).
5. **Unread = dashed + opacity .56 makes every fresh map look disabled (medium).** On first open 41 of 42 nodes are `.unread`
   (style.css:1581-1591); caption #8eaaa6 at .56 opacity on #08191d is about 3:1 at 11 px (fails 4.5:1), and at default 92 % the secondary text is
   already small. For a first-time reader "unread" and "untaken alternative" are the same thing, and legend wording "未走的可能 / Untaken path"
   misdescribes chapters that are simply ahead. Fix: raise to .75 and keep dashed outline only for nodes whose sibling was taken (needs path info,
   low-medium); relabel legend "Not read yet" (low). Read/route/current are distinguishable (gold current box, gold route edges, teal read border),
   see event-colony-9200_states.png; the teal "read" border is subtle at 52 % zoom (low).
6. **Overflowing "+N more" text in link sets (medium, visual bug).** `.flow-more` is a plain `<text>` clipped to 60 chars but not to the box
   (flow-surface.js:426-428): in event-federations3-2200 it runs outside the 176 px box across the neighbouring node ("gerous Liai +5 · Ecumenical
   Council: Dangerous Liaisons / Ecumenical Council:", event-federations3-2200_1920-en_expanded.png). Fix: fitLines it into b.w-20 or drop the list
   and rely on the aria-label (low).
7. **Repeated identical outcome groups and duplicated entries (medium).** event-arkship-65 (5 chapters) draws 21 identical "⚄ Race outcome, pick one"
   link sets side by side: 4754 px wide (event-arkship-65_1440-zh_expanded.png); event-colony-9200 link sets list the same title 4 times
   ("↩ 地图 / 地图 / 地图 / 地图"); the reader's continue list is the same (event-arkship-65 100 `.next-chapter` cards for 5 chapters; pre-ftl-new-world-order 4
   identical "新世界秩序" cards; site-site-fumongus-dig repeated "真菌僵尸", "考古遗址"). Suspect `compactTree` refset items are not deduped by doc
   (flow-tree.js:403, :417) and no dedupe of identical sibling groups. Fix: dedupe items by (doc, via) and merge identical sibling link sets into one
   with a "×N" badge (medium; touches tree model and the reader cards).
8. **Random/condition captions are partly cryptic (medium).** Good: "⚄ 随机结果", "≈25 % 几率", "30–60 天后". Weak: an exclusive random child captioned
   "权重1；机械帝国为0 · ≈25% 几率" (anomaly-con-biology-cat, caption is the raw condition text via `via.label`, flow-surface.js:354); "局势 — 虚空虫疫（0→600）";
   placeholder "其他条件 / other conditions" on cards and tabs (reading.js:162; situation-voidworm: card "条件：其他条件"; event-arkship-65, mercenary-enclave
   "其他条件" tab); map "满足条件时" vs card "条件：其他条件". Chance is "base about 25 %" on cards and "≈25 %" on the map (consistent enough). Delay is "约30–60天后"
   (card) vs "30–60 天后" (map). Fix: normalize placeholders (never render "other conditions"; hide), cap raw-condition captions at a short
   summary, and use one delay formatter shared by `viaCaption` and `edgeCaption` (app.js:577) (low).
9. **Reader-to-map route continuity (low-medium).** Clicking an unread node anywhere jumps straight to it, e.g. the 山炸了！ ending from the first chapter
   in event-colony-9200 (read count 1 to 2), no spoiler warning; clicking a "↩ 转至 纪念堂" chip moved "current" to a different node
   ("真恐怖 · 纪念堂") than the chip, so the gold route no longer matches what was clicked. Fix: mark clicked ref's parent route, or keep current on
   the clicked node (medium, `treePath`); optional "ending" marker already exists but is a 5 px diamond at 30 %.
10. **Plain wheel pans, only Ctrl+wheel zooms; no visible hint (low).** flow-surface.js:695-713. Users expect wheel = zoom on a map. Fix: a one-line hint
    under the toolbar on first use, or wheel zoom when the map is in expanded mode (low).
11. **Fold toggle re-renders everything: 202 ms on the-shroud (low).** `toggleFold` -> `render` (flow-surface.js:775-783); the-shroud expands from 10 to 422 nodes,
    +412 badge. Acceptable but visible as a hitch; progressive fill (`fillNodes`) could be used here too.

## Performance (1440x900 expanded, headless, no GPU)
rAF p50 5.9 ms (170 Hz) for idle, drag (80 steps), Ctrl+wheel zoom (40 steps), wheel pan and button zoom on the-shroud, cetana, origin_unplugged,
event-bio-1, archaeology-incidents, event-colony-9200: zero frames over 33 ms and none over 100 ms in the default folded state. Fully unfolded
(the-shroud 422 nodes, cetana 154, origin_unplugged 112): max frame 29 / 18 / 41 ms, only origin_unplugged had 2 frames over 33 ms during the drag.
The single-layer transform design (flow-surface.js header comment, `markMoving`) works. Not measured: real phones.

## Keyboard (verified on event-colony-9200, rift-interdimensional-circus, cetana, the-shroud)
Works: viewport focusable with a good Chinese instruction label; `+` 92 to 110 %, `-` back, `0` fit, ArrowDown follows route child/first child,
Left/Right move geometrically, ArrowUp goes to parent, Enter/Space opens the chapter (hash changes), Home returns to the current node. Gaps:
after Enter focus goes to the reader H1 so the next Tab leaves the map (fine, but the roving position is lost; arrow keys do nothing until you
refocus the viewport); arrow-left/right across a large map hops oddly (Left twice from "山炸了！" ended on 救出工人, a different row); `0`
says "show all" but lands at 30 %, same as issue 1; fold toggles for group pills use Enter, not documented.

## What works well
- Pan/zoom smoothness, even at 400+ nodes; drag never triggers a click (suppressClick) and drag-from-node did not navigate.
- Clear route language: gold box for current, thick gold edges for your route, teal border for read (event-colony-9200_states.png).
- Default placement: small trees fit whole (4-node maps at 100 %), larger ones open centred on the current page at 92 %.
- Option text on branch nodes ("◇ 提供能量。 · 30–60 天后") is more informative than the cards, and chance/delay captions are coherent in zh and en.
- Auto-folding with "+N" badges (defaultCollapsed, budget 90) keeps the-shroud at 10 nodes initially; ref link sets show chance per outcome.
- Full `aria-label`/`<title>` text on every node; no node overlaps found in any sampled map (overlap count 0 for all 112 map/lang combinations).

## Suggested order (value/risk)
1. Real overlay for Expanded + lower ZOOM_MIN with overview mode (issue 1). 2. Two-line captions / dedupe of shared captions (2, 7).
3. Reader title shown with curated label (3). 4. Legend "?" key + clearer "not read yet" wording and contrast (4, 5). 5. Clip `.flow-more`, normalize
placeholder conditions and delay format (6, 8). 6. Route continuity and wheel hint (9, 10). Mobile (phone) map was out of scope for this pass.
