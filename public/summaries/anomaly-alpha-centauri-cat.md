# 稳态 / Stasis

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:550-578` · `common/solar_system_initializers/sol_initializers.txt:386-440, 495-545, 1694-1745, 2407-2460, 4396-4460` · `events/anomaly_events_4.txt:1694-1758 (6745, 6750)`
- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 1级异常，只由“太阳系邻居”类初始化器（地球开局的半人马座α等邻近星系）放置，不会随机生成。  
  Level-1 anomaly placed only by the Sol-neighbour initializers (e.g. Alpha Centauri next to an Earth start); it never spawns randomly.

## 剧情脉络 Story outline

- 两个结果按首都是否为地球互斥（各权重1，另一方为0）：  
  Two outcomes, mutually exclusive by whether the capital is Earth (weight 1 each, the other 0):
- 6745：以地球为首都的帝国——曾被寄予厚望的“新家园”原来是潮汐锁定的冰冷地狱，但具备改造为宜居星球的条件（凝聚力奖励，行星获“地形改造候选”修正）。  
  6745: for an Earth capital — the long-dreamed new home is a tidally locked frozen hell, yet terraformable (unity, Terraforming Candidate).
- 6750：其他帝国——一颗潮汐锁定、可改造的行星（地形改造候选）。  
  6750: for other empires — a tidally locked, terraformable planet (Terraforming Candidate).

## 分支与结局 Branches and outcomes

- 窗口标题就是该行星的名字（[From.GetName]）。  
  The window title is the planet's own name ([From.GetName]).

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 已核对 Checked：类别、五处初始化器调用、6745/6750。  
  Category, the five initializer calls, 6745/6750.
- 覆盖 Coverage：3 个文档全部核对 / all 3 docs checked.
