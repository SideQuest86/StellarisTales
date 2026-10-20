# 地表读数 / Surface Pings

- 分类 Category：深空异闻 Exploration

## 如何开始 How it starts

AI 向的异常类别 AIANOM_RESEARCHDEPO_CAT“地表读数”（2级）：权重1（所在星球已有研究站矿藏时）加2（不可殖民且既无采矿站也无研究站矿藏时）。

AI-oriented anomaly category AIANOM_RESEARCHDEPO_CAT "Surface Pings" (level 2): weight 1 (if the planet already has a research-station deposit) plus 2 (if it is not colonisable and has neither a mining- nor a research-station deposit).

## 剧情脉络 Story outline

三个结果各占约1/3：aianom.8“物理学研究储备”、aianom.9“社会学研究储备”、aianom.10“工程学研究储备”。每个事件在隐藏效果里按 6:3:1 随机给星球添加二级、三级或四级对应研究矿藏（物理 d_physics_2-4，社会 d_society_2-4，工程 d_engineering_2-4）。

Three results of about 1/3 each: aianom.8 "Physics Research Deposit", aianom.9 "Society Research Deposit", aianom.10 "Engineering Research Deposit". Each event rolls 6:3:1 in a hidden effect to add a tier 2, 3 or 4 research deposit of that kind to the planet (d_physics_2-4, d_society_2-4, d_engineering_2-4).

## 分支与结局 Branches and outcomes

三个结果互斥；矿藏档位随机在事件内部。

The three results are exclusive; the deposit tier is rolled inside the event.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/99_anomaly_categories_ai.txt:74; events/anomaly_events_AI.txt:351 (aianom.8); events/anomaly_events_AI.txt:376 (aianom.9); events/anomaly_events_AI.txt:401 (aianom.10)
已核对异常定义与全部结果事件；编译树正确，无需改动。奖励等级的随机抽取发生在隐藏效果中，不是文档。

Checked the anomaly definition and every outcome event; the compiled tree is correct. The reward-tier roll happens in a hidden effect, not in a doc.
