# 热脉冲 / Heat Spikes

- 分类 Category：深空异闻 Exploration · DLC：Shadows of the Shroud（has_shroud_dlc）

## 如何开始 How it starts

无矿藏、不是冰冻地形改造候选且无研究站矿藏的冰冻星球可能生成（3级，权重3，全局一次 max_once；需要 has_shroud_dlc）。

Can spawn on a frozen planet with no deposit, that is not a frozen terraforming candidate and has no research-station deposit (level 3, weight 3, once per game via max_once; needs has_shroud_dlc).

## 剧情脉络 Story outline

单一结果 extreme_frontiers.130“冰封炼狱”：星球获得 d_volatile_motes_1 与 d_exotic_gases_1 矿藏，并在1天后触发通用事件 action.941。

Single result extreme_frontiers.130 "Frozen Inferno": the planet gains d_volatile_motes_1 and d_exotic_gases_1 deposits and the generic event action.941 fires 1 day later.

## 分支与结局 Branches and outcomes

唯一结果，无随机分支，无后续章节。

Single outcome; no random branch and no further chapter.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/103_anomaly_categories_extreme_frontiers.txt:75; events/extreme_frontiers_events.txt:147 (extreme_frontiers.130)
已核对异常定义与结果事件；编译树正确，无需改动。action.941 是共享的通用事件，不属于本故事。生成需要 has_shroud_dlc；本机 dlc 目录中未见对应 DLC，能否生成取决于主机的 DLC。

Checked the anomaly definition and the result event; the compiled tree is correct, no change needed. action.941 is a shared generic event, not part of this story. Spawning needs has_shroud_dlc; no matching DLC folder exists in the local dlc directory, so spawning depends on the host's DLC.
