# 轨道目标 / Target from Orbit

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

轨道上清晰可见一个数千公里的人造图形，中心通往地下；球形大厅里悬浮着一个谜之盒，解谜结果随机三选一。

1. 一路向下：清理被植被和碎石堵塞的仪式通道
2. 琥珀谜盒：球形大厅中央悬浮着琥珀谜之盒

A construct thousands of kilometres wide points to an entrance; a puzzle box floats in a spherical hall below, and solving it gives one of three random endings.

1. Down We Go: clearing an overgrown, collapsed processional entrance
2. The Amber Puzzle Box: the amber puzzle box in a spherical chamber

## 分支与结局 Branches and outcomes

- 智慧宝藏 / Treasure of the Wise：图案是物理学的抽象，解开后得到宝藏 / the patterns encode physics; solving it releases a treasure
- 索图无路 / Map to Nowhere：图案是从银河系外看到的星座——一张通往无处的地图 / the patterns are constellations seen from outside the galaxy — a map to nowhere
- 古老认可 / Ancient Approval：漫长的计算后，古老的装置表示认可 / after endless permutations the ancient device signals approval

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_target_from_orbit_random_events。 / Failed rolls draw from this site's own pool site_target_from_orbit_random_events.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:598；events/ancient_relics_arcsite_events_2.txt:2299
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:598）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:598) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9051 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9051 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
