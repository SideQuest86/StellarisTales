# 高速物质 / High Velocity Mass

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc）

## 如何开始 How it starts

气态巨行星可能生成（5级，权重3，全局一次 max_once；需要 has_shroud_dlc，且没有会冲突的站点矿藏）。

Can spawn on a gas giant (level 5, weight 3, once per game via max_once; needs has_shroud_dlc and no conflicting station deposit).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.280“钻石风暴”：非集体意识帝国获得每月贸易加成，集体意识帝国改为获得 d_physics_4 矿藏；同时启用项目 ATMOSPHERIC_DIAMONDS_PROJECT“大气钻石”（180天）。完成后 extreme_frontiers.285“钻石精准”：推进下一个未完成的激光科技（tech_lasers_2…5，各25%），全部完成则获得每月物理研究。

Single result extreme_frontiers.280 "Diamond Storms": non-gestalt empires get monthly trade, gestalt empires a d_physics_4 deposit instead; it also enables project ATMOSPHERIC_DIAMONDS_PROJECT (180 days). Completion fires extreme_frontiers.285 "Diamond Precision": 25% progress on the next unfinished laser tech (tech_lasers_2 to 5), else monthly physics research.

## 分支与结局 Branches and outcomes

唯一路径：280 → 项目 → 285。

Single path: 280 -> project -> 285.

## 条件与文明差异 Conditions and variants

280 按是否集体意识给出不同奖励。

280 gives a different reward to gestalt empires.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:452; events/extreme_frontiers_events.txt:1238 (extreme_frontiers.280); common/special_projects/05_projects_extreme_frontiers.txt (ATMOSPHERIC_DIAMONDS_PROJECT); events/extreme_frontiers_events.txt:1284 (extreme_frontiers.285)
已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
