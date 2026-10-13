# 战争迹象 / Signs of Battle

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:586; events/anomaly_events_2.txt:357 (anomaly.2530); common/special_projects/00_projects_1.txt (BATTLE_WRECKAGE_PROJECT); events/anomaly_events_2.txt:402 (anomaly.2531); events/anomaly_events_2.txt:439 (anomaly.2532)

## 如何开始 How it starts

没有战略资源的不宜居普通星球可能生成（4级，权重3）。

Can spawn on a regular uninhabitable planet without a strategic resource (level 4, weight 3).

## 剧情脉络 Story outline

单一结果 anomaly.2530“战争迹象”：清除矿藏，选项启用项目 BATTLE_WRECKAGE_PROJECT“考察星舰坟场”（科学船+科学家，180天）；完成后随机（各50%）：anomaly.2531（starship_graveyard 修正、d_engineering_3 矿藏、领袖+200经验、每月工程研究、pop_lcluster_event）或 anomaly.2532（同样的修正与矿藏、领袖+200经验，无研究加成）。

Single result anomaly.2530 "Signs of Battle": deposits cleared; the option enables project BATTLE_WRECKAGE_PROJECT (science ship and scientist, 180 days). On completion it picks at random (50% each) anomaly.2531 (starship_graveyard modifier, d_engineering_3 deposit, leader +200 experience, monthly engineering research, pop_lcluster_event) or anomaly.2532 (same modifier and deposit and experience, no research bonus).

## 分支与结局 Branches and outcomes

项目结果 2531/2532 互斥，项目失败无后续（on_fail 为空）。

Project results 2531/2532 are exclusive; project failure has no follow-up (empty on_fail).

## 条件与文明差异 Conditions and variants

2530 与 2532 的描述有生物舰船变体。

2530 and 2532 have bio-ship description variants.

## 审阅记录 Review notes

已核对异常定义、项目与全部结果事件；编译树正确，无需改动。

Checked the anomaly definition, the project and every outcome event; the compiled tree is correct, no change needed.
