# 不稳地质 / Unstable Geography

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc）

## 如何开始 How it starts

熔岩星球可能生成（4级，权重3，全局一次 max_once；需要 has_shroud_dlc，且控制者已拥有科技 tech_volatile_motes）。

Can spawn on a molten planet (level 4, weight 3, once per game via max_once; needs has_shroud_dlc and a controller with tech_volatile_motes).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.370“熔融大型动物群”：d_minerals_6 与 d_volatile_motes_3 矿藏，并启用项目 LAVA_DIVERS_PROJECT“潜熔兽”（180天）。完成后 extreme_frontiers.375“熔岩锻造装甲”：每月工程研究，并推进下一个舰船装甲科技（tech_ship_armor_2…5，各25%），全部完成则改为更高档的工程研究。

Single result extreme_frontiers.370 "Molten Megafauna": d_minerals_6 and d_volatile_motes_3 deposits and enables project LAVA_DIVERS_PROJECT (180 days). Completion fires extreme_frontiers.375 "Magma-forged Armor": monthly engineering research plus 25% progress on the next ship-armor tech (tech_ship_armor_2 to 5), else a higher engineering-research bonus.

## 分支与结局 Branches and outcomes

唯一路径：370 → 项目 → 375。

Single path: 370 -> project -> 375.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:672; events/extreme_frontiers_events.txt:2059 (extreme_frontiers.370); common/special_projects/05_projects_extreme_frontiers.txt (LAVA_DIVERS_PROJECT); events/extreme_frontiers_events.txt:2094 (extreme_frontiers.375)
已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
