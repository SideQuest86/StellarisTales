# 冥界生物 / Chthonian Biomass

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:823; events/extreme_frontiers_events.txt:2537 (extreme_frontiers.430); common/special_projects/05_projects_extreme_frontiers.txt (CHTHONIAN_PETRIFICATION_PROJECT); events/extreme_frontiers_events.txt:2586 (extreme_frontiers.435)

## 如何开始 How it starts

熔岩星球可能生成（5级，权重3，全局一次 max_once）：需要 has_shroud_dlc、控制者已遇到过 tiyanki 且不是催化帝国，且无站点矿藏冲突。生成时 on_spawn 给星球添加 chthonian_planet 修正并通过 anomaly.6662 添加矿物矿藏。

Can spawn on a molten planet (level 5, weight 3, once per game via max_once): needs has_shroud_dlc, a controller that has met the Tiyanki and is not catalytic, and no conflicting station deposit. on_spawn adds the chthonian_planet modifier and a minerals deposit through anomaly.6662.

## 剧情脉络 Story outline

单一结果 extreme_frontiers.430“冥界保存”：每月社会研究与奇异气体加成，星球获得 d_exotic_gases_2 与 d_alloys_4 矿藏，并启用项目 CHTHONIAN_PETRIFICATION_PROJECT“冥界化石”（科学船+科学家，360天，无时限）。完成后 extreme_frontiers.435“生物制合金”：获得研究选项 tech_alloy_fossilization 与每月工程研究。

Single result extreme_frontiers.430 "Chthonian Preservation": monthly society research and exotic gases, d_exotic_gases_2 and d_alloys_4 deposits, and enables project CHTHONIAN_PETRIFICATION_PROJECT (science ship and scientist, 360 days, no time limit). Completion fires extreme_frontiers.435 "Bio-Produced Alloy": research option tech_alloy_fossilization and monthly engineering research.

## 分支与结局 Branches and outcomes

唯一路径：430 → 项目 → 435。

Single path: 430 -> project -> 435.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
