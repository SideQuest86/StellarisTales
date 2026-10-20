# 天文望远镜 / Terrestrial Telescopes

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 3级异常，权重0；cstorms.5随机项权重1，经载体事件cstorms.1600（地面望远镜）调用add_anomaly_in_owned_space (events/cosmic_storms_events_1.txt:2710-2721)。  
  Level-3 anomaly, weight 0; weight-1 entry of cstorms.5 via carrier event cstorms.1600 (Terrestrial Telescopes) which calls add_anomaly_in_owned_space (events/cosmic_storms_events_1.txt:2710-2721).
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.1605“地面望远镜”（研究）：给星球绿色天空修正(green_skies_outcome_modifier)，单一选项给出月收益。  
  Single outcome cstorms.1605 (research): adds the green_skies_outcome_modifier to the planet; one option gives monthly rewards.

## 分支与结局 Branches and outcomes

- 线性。  
  Linear.

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:181-195` · `events/cosmic_storms_events_1.txt:32-115` · `events/cosmic_storms_events_1.txt:2710-2730`
- 已对照类别脚本、cstorms.5/1600与1605。  
  Compared the category script, cstorms.5/1600 and 1605.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
