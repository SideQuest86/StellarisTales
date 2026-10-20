# 改造的外勤站 / Repurposed Field Station

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc）

## 如何开始 How it starts

荒芜或寒冷荒芜星球可能生成（8级，权重3，全局一次 max_once_global；需要 has_shroud_dlc，且尚未存在 survivalist_scru 事件目标）。

Can spawn on a barren or cold barren planet (level 8, weight 3, once globally via max_once_global; needs has_shroud_dlc and no existing survivalist_scru target).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.350“孤独幸存者”：a（非杀戮帝国）把幸存者带来见面，进入 extreme_frontiers.352“斯科露”招募窗口（随机生成一名与你主物种不同类别的幸存者领袖；可对话后招募，或遣散获得每月社会研究）；b（非杀戮，需15合金与15食物）消耗这些资源换取每月团结；c（非杀戮）每月社会研究；d（仅杀戮帝国）每月团结。

Single result extreme_frontiers.350 "Lone Survivor": a (non-homicidal) brings the survivor over into extreme_frontiers.352 "Scru", a recruitment window (a survivor leader of a randomly drawn species class different from your main species; talk, then recruit, or dismiss for monthly society research); b (non-homicidal, costs 15 alloys and 15 food) trades them for monthly unity; c (non-homicidal) monthly society research; d (homicidal only) monthly unity.

## 分支与结局 Branches and outcomes

350 的四个选项互不相同，只有选项a通向 352。352 的对话选项只展示回答，最后在招募与遣散间二选一。

350's four options are alternatives and only a leads to 352. In 352 the dialogue options only show replies; the final choice is recruit or dismiss.

## 条件与文明差异 Conditions and variants

选项按杀戮帝国状态与库存限制。

Options depend on homicidal status and stockpiles.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:626; events/extreme_frontiers_events.txt:1679 (extreme_frontiers.350); events/extreme_frontiers_events.txt:1758 (extreme_frontiers.352)
已核对异常定义、项目与结果事件；编译树正确，无需改动。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition, the project and the result event; the compiled tree is correct, no change needed. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
