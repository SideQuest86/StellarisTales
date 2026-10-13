# 轨道残骸 / Orbital Debris

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/99_anomaly_categories_ai.txt:2; events/anomaly_events_AI.txt:12 (aianom.1); events/anomaly_events_AI.txt:70 (aianom.2); events/anomaly_events_AI.txt:128 (aianom.3); events/anomaly_events_AI.txt:186 (aianom.4); events/anomaly_events_AI.txt:244 (aianom.5)

## 如何开始 How it starts

AI 向的异常类别 AIANOM_LUMP_CAT“轨道残骸”（1级，固定权重2，无其他条件；标记 should_ai_use）。

AI-oriented anomaly category AIANOM_LUMP_CAT "Orbital Debris" (level 1, fixed weight 2, no other conditions; flagged should_ai_use).

## 剧情脉络 Story outline

五个结果各占20%（max_once = no）：aianom.1“矿物贮藏”、aianom.2“能量币”、aianom.3“物理学研究”、aianom.4“社会学研究”、aianom.5“工程学研究”。每个事件的唯一选项在隐藏效果里再按 9:6:3:1 随机给出一档每月资源加成（tier1 到 tier4），并记录对应计数变量（如 incr_minerallump1_var）。

Five results, 20% each (max_once = no): aianom.1 "Mineral Cache", aianom.2 "Energy Credits", aianom.3 "Physics Research", aianom.4 "Society Research", aianom.5 "Engineering Research". The single option of each event then rolls 9:6:3:1 in a hidden effect for a monthly resource bonus of tier 1 to 4 and records a counter variable (e.g. incr_minerallump1_var).

## 分支与结局 Branches and outcomes

五个结果互斥；档位随机在结果事件内部。

The five results are exclusive; the tier roll is inside each result event.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常定义与全部结果事件；编译树正确，无需改动。奖励等级的随机抽取发生在隐藏效果中，不是文档。

Checked the anomaly definition and every outcome event; the compiled tree is correct. The reward-tier roll happens in a hidden effect, not in a doc.
