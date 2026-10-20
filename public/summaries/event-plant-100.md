# 田园至臻 / Idyllic Perfection

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

盖亚播种（Gaia Seeder）建筑链的最后一级建成后（on_building_upgraded，common/on_actions/00_on_actions.txt:2988；last_building_changed = building_gaiaseeders_4，星球还不是盖亚星球），plant.100 触发：星球变为盖亚星球。另一条线：霸主的“田园绽放”领地（holding_idyllic_bloom）建成3600天后，plant.105 对霸主触发。

When the last stage of the Gaia Seeder building chain is built (on_building_upgraded, common/on_actions/00_on_actions.txt:2988; last_building_changed = building_gaiaseeders_4 on a non-Gaia planet) plant.100 fires and the planet becomes a Gaia world. A second line: 3600 days after an overlord's Idyllic Bloom holding (holding_idyllic_bloom) is built, plant.105 fires for the overlord.

## 剧情脉络 Story outline

plant.100“田园至臻”：a（非蜂巢）庆祝，星球获得180天的庆典修正；b（蜂巢）无修正。180天后隐藏事件 plant.115 令一批植物系/可绽放人口“绽放”（trait_plantoid_bloomed），每1800天重复。霸主线：plant.105 让霸主的臣属星球变为盖亚星球并移除领地，臣属收到 plant.110（海洋世界且水动力飞升者：愤怒，其他：a 愤怒/b 感谢/c 淡然，非机器可得“感谢盖亚”10年修正）。

plant.100 "Idyllic Perfection": a (non-hive) celebrates - the planet gets a 180-day celebration modifier; b (hive) has no modifier. 180 days later hidden plant.115 makes several flora (or mutation-tradition) pops "bloom" (trait_plantoid_bloomed), repeating every 1800 days. Overlord line: plant.105 turns the subject's planet into a Gaia world and removes the holding; the subject receives plant.110 (an ocean world of a Hydrocentric empire: anger; otherwise a angry / b thankful / c indifferent, non-machine empires can get a 10-year "thankful for Gaia" modifier).

## 分支与结局 Branches and outcomes

plant.100 的 a/b 按是否蜂巢互斥；plant.110 的三个选项按情形互斥。

In plant.100 a/b are exclusive by hive status; the three options of plant.110 are exclusive by situation.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/plantoid_events.txt:3-285; common/on_actions/00_on_actions.txt:2988 on_building_upgraded; common/buildings/15_overlord_holdings.txt:1315
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
