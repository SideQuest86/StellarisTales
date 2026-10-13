# L-星门线索 / L-Gate Insight

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/99_anomaly_categories_ai.txt:112; events/anomaly_events_AI.txt:425 (aianom.11); common/scripted_effects/00_scripted_effects.txt:3243 (generate_lcluster_clue)

## 如何开始 How it starts

AI 向的异常类别 AIANOM_CLUE_CAT“L-星门线索”（5级，一半概率不生成 null_spawn_chance 0.5）：所有者拥有事件链 l_cluster_chain 且线索未满时，荒芜星球+1、游戏进入中期+1、进入后期+1。

AI-oriented anomaly category AIANOM_CLUE_CAT "L-Gate Insight" (level 5, null_spawn_chance 0.5): while the owner has the chain l_cluster_chain and its clues are not complete, +1 on barren planets, +1 from mid game, +1 from late game.

## 剧情脉络 Story outline

单一结果 aianom.11“L-星门线索”：唯一选项调用 generate_lcluster_clue，给事件链“L-星团”增加一条线索（集齐7条后触发 distar.10904，见 event-distar-13080）。

Single result aianom.11 "L-Gate Insights": its only option calls generate_lcluster_clue, adding one clue to the event chain "The L-Cluster" (all 7 clues fire distar.10904, see event-distar-13080).

## 分支与结局 Branches and outcomes

唯一结果。

Single outcome.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常与 aianom.11；编译树正确，外链 distar.10904 属 L-星团故事 event-distar-13080。

Checked the anomaly and aianom.11; the compiled tree is correct and the external link distar.10904 belongs to the L-Cluster story event-distar-13080.
