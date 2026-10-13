# 对接舱 / Docking Hatch

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:114; events/anomaly_events_1.txt:48 (anomaly.5); events/anomaly_events_1.txt:177 (anomaly.25)

## 如何开始 How it starts

小行星可能生成（3级，权重3）。

Can spawn on an asteroid (level 3, weight 3).

## 剧情脉络 Story outline

anomaly.5“海盗宝藏”（每月能量加成，触发 pop_lcluster_event；拥有上古遗物 DLC 时再给小型遗物奖励）与 anomaly.25“废弃船厂”（工程矿藏 d_engineering_3 + derelict_shipyard 修正；若星球有战略资源则权重为0）。

anomaly.5 "Pirate Treasure" (monthly energy, pop_lcluster_event, plus a small artifact reward with Ancient Relics) and anomaly.25 "Derelict Shipyard" (d_engineering_3 deposit plus the derelict_shipyard modifier; weight 0 if the planet has a strategic resource).

## 分支与结局 Branches and outcomes

两个结果互斥，各50%；有战略资源时只会得到 anomaly.5。

The results are exclusive, 50% each; with a strategic resource only anomaly.5.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对异常定义与全部结果事件；编译树正确，无需改动。

Checked the anomaly definition and every outcome event; the compiled tree is correct, no change needed.
