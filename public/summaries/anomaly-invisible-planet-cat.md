# 轨道不规则 / Orbit Irregularity

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc）

## 如何开始 How it starts

荒芜、寒冷荒芜、冰冻或熔岩星球，所在恒星系至少2颗行星时可能生成（6级，权重3；需要 has_shroud_dlc）。

Can spawn on a barren, cold barren, frozen or molten planet in a system with at least 2 planets (level 6, weight 3; needs has_shroud_dlc).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.340“不可见行星”：在恒星系中随机（各50%）生成一颗不可见的荒芜或熔岩行星（spawn_invisible_planet）；拥有“第一次接触”DLC 时推进下一个隐身科技（tech_cloaking_1…dark_matter，各10%），否则或之后获得每月物理研究加成。

Single result extreme_frontiers.340 "Invisible Planet": randomly (50% each) spawns an invisible barren or molten planet in the system (spawn_invisible_planet); with First Contact it advances the next cloaking tech (tech_cloaking_1 to dark_matter, 10% each), otherwise it gives monthly physics research.

## 分支与结局 Branches and outcomes

唯一结果，无随机分支，无后续章节。

Single outcome; no random branch and no further chapter.

## 条件与文明差异 Conditions and variants

340 的描述与科技奖励按“第一次接触”DLC变化。

340's description and tech reward depend on the First Contact DLC.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:600; events/extreme_frontiers_events.txt:1585 (extreme_frontiers.340)
已核对异常定义与结果事件；编译树正确，无需改动。随机生成的行星类型是效果而非文档，编译树不显示。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition and the result event; the compiled tree is correct, no change needed. The random planet class is an effect, not a doc, so the tree does not show it. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
