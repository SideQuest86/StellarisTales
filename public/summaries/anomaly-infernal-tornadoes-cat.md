# 极端温度 / Extreme Temperatures

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:649; events/extreme_frontiers_events.txt:1915 (extreme_frontiers.360); common/special_projects/05_projects_extreme_frontiers.txt (INFERNAL_CATALYSTS_PROJECT); events/extreme_frontiers_events.txt:1951 (extreme_frontiers.365)

## 如何开始 How it starts

熔岩星球可能生成（6级，权重3，全局一次 max_once；需要 has_shroud_dlc）。

Can spawn on a molten planet (level 6, weight 3, once per game via max_once; needs has_shroud_dlc).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.360“火龙卷”：d_energy_5 与 d_exotic_gases_1 矿藏，并启用项目 INFERNAL_CATALYSTS_PROJECT“炼狱催化剂”（180天）。完成后 extreme_frontiers.365“熔岩碎屑共振器”：推进 tech_pyroclastic_resonation 15%；若有机器时代 DLC 且已有轨道电弧炉科技则另推进太空采矿科技。

Single result extreme_frontiers.360 "Flaming Tornadoes": d_energy_5 and d_exotic_gases_1 deposits and enables project INFERNAL_CATALYSTS_PROJECT (180 days). Completion fires extreme_frontiers.365 "Pyroclastic Resonators": 15% progress on tech_pyroclastic_resonation, and with The Machine Age plus tech_orbital_arc_furnace additional space-mining tech progress.

## 分支与结局 Branches and outcomes

唯一路径：360 → 项目 → 365。

Single path: 360 -> project -> 365.

## 条件与文明差异 Conditions and variants

365 的描述对机器时代 DLC 与轨道电弧炉科技有变体。

365's description varies with The Machine Age and tech_orbital_arc_furnace.

## 审阅记录 Review notes

已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
