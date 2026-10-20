# 令人费解的组成 / Confusing Composition

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 3级异常，全局一次，权重0；cstorms.5随机列表权重1，旗标spawned_STORMS_ANOM_STAT。  
  Level-3 anomaly, once per galaxy, weight 0; weight-1 entry in cstorms.5, flag spawned_STORMS_ANOM_STAT.
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5030“文具末日”（研究）：选项a/b为每月资源奖励，进化捕食者起源有专属选项（获得DNA/进度）；随后cstorms.320。  
  Single outcome cstorms.5030 (research): options give monthly resources, with a dedicated option for Evolutionary Predators (DNA / progress); cstorms.320 follows.

## 分支与结局 Branches and outcomes

- 选项互斥。  
  Options are exclusive.

## 条件与文明差异 Conditions and variants

- 进化捕食者起源有专属选项。  
  Evolutionary Predators have a dedicated option.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:139-151` · `events/cosmic_storms_events_1.txt:32-115` · `events/anomaly_events_cosmic_storms.txt`
- 已对照类别脚本、cstorms.5与5030。  
  Compared the category script, cstorms.5 and 5030.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
