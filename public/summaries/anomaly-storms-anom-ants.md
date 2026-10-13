# 有机彗星 / The Organic Comet

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:99-117` · `events/cosmic_storms_events_1.txt:32-115` · `events/anomaly_events_cosmic_storms.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 3级异常，全局一次，权重0；隐藏事件cstorms.5随机列表中权重1、全局旗标spawned_STORMS_ANOM_ANTS防重复，在有效行星上用add_anomaly_in_owned_space添加。  
  Level-3 anomaly, once per galaxy, weight 0; weight-1 entry in the random list of hidden cstorms.5, guarded by the global flag spawned_STORMS_ANOM_ANTS, added with add_anomaly_in_owned_space.
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5020“蚁小行星”（研究）：a“收获蚁巢”在星体上设置d_exotic_gases_1；b“只看不碰”设置d_society_3。随后给风暴追逐者挑战事件cstorms.320。  
  Single outcome cstorms.5020 (research): a "harvest the nest" sets d_exotic_gases_1 on the body; b "look but don't touch" sets d_society_3. cstorms.320 (storm chaser challenges) follows.

## 分支与结局 Branches and outcomes

- 两个选项互斥。  
  The two options are exclusive.

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 已对照类别脚本、cstorms.5与5020。  
  Compared the category script, cstorms.5 and 5020.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
