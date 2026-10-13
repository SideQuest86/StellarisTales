# 奇怪的图案 / Peculiar Patterns

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1293-1351; events/distant_stars_events_2.txt:3238 (distar.1090); events/distant_stars_events_2.txt:3294 (distar.1095); events/distant_stars_events_2.txt:3552 (distar.2010)

## 如何开始 How it starts

需要《遥远繁星》。盖亚、大陆、草原、热带或海洋星球可能生成（3级，权重0.1）。

Requires Distant Stars. Can spawn on Gaia, continental, savannah, tropical or ocean planets (level 3, weight 0.1).

## 剧情脉络 Story outline

结果由星球类型决定（各基础权重0，条件满足+1）：
- 盖亚/大陆/草原/热带：distar.1090“废弃的收割机”（星球获得收割场矿藏与 ancient_harvesters 修正）与 distar.1095“荒废度”（一群太空虫吃光植被，星球变为荒芜并成为地形改造候选）各50%。
- 海洋：distar.2010“湿体电脑”（藻类网络像原始湿件计算机，获得矿藏）。

The result depends on planet class (each base 0, +1 if it matches):
- Gaia/continental/savannah/tropical: distar.1090 "Abandoned Harvesters" (harvester fields deposit and ancient_harvesters) or distar.1095 "Devastation" (a space-insect swarm stripped the planet, which becomes barren and a terraforming candidate), 50% each.
- Ocean: distar.2010 "Wetware Computer" (an algae network like a primitive wetware computer; a deposit).

## 分支与结局 Branches and outcomes

三个结果互斥；海洋星球只会得到 2010。

The three results are exclusive; ocean planets always get 2010.

## 条件与文明差异 Conditions and variants

distar.1095 有演化猎手专属选项；1090 图片随星球类型变化。

distar.1095 has an Evolutionary Predators option; 1090's picture follows planet class.

## 审阅记录 Review notes

已核对异常与三个结果事件。草稿显示 p=1.00*，实为按星球类型的条件分配，已加互斥组说明。30天后的 story.1 / story.5 为共享报告，不属于本故事。

Checked the anomaly and the three results. The draft shows p=1.00*; it is a planet-class split, documented with an exclusive group. story.1 / story.5 after 30 days are shared reports.
