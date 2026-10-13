# 黄金比例 / Perfect Ratio

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:865; events/extreme_frontiers_events.txt:2612 (extreme_frontiers.440); common/special_projects/05_projects_extreme_frontiers.txt (GRAVITY_ASSIST_PROJECT); events/extreme_frontiers_events.txt:2651 (extreme_frontiers.445)

## 如何开始 How it starts

荒芜、寒冷荒芜、冰冻、熔岩、气态巨行星或有毒星球，且所在恒星系至少有3颗行星时可能生成（2级，权重3；需要 has_shroud_dlc）。

Can spawn on a barren, cold barren, frozen, molten, gas giant or toxic planet in a system with at least 3 planets (level 2, weight 3; needs has_shroud_dlc).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.440“轨道共振”：每月物理研究加成与 d_physics_4 矿藏，并启用项目 GRAVITY_ASSIST_PROJECT“重力辅助研究”（180天）。完成后 extreme_frontiers.445“轨道弹弓进展”：推进科技 tech_orbital_maneuvers 25%。

Single result extreme_frontiers.440 "Orbital Resonance": monthly physics research and a d_physics_4 deposit, and enables project GRAVITY_ASSIST_PROJECT (180 days). Completion fires extreme_frontiers.445 "Orbital Slingshot Advancements": 25% progress on tech_orbital_maneuvers.

## 分支与结局 Branches and outcomes

唯一路径：440 → 项目 → 445。

Single path: 440 -> project -> 445.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
