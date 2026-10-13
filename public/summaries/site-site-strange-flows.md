# 奇异流体 / Strange Flows

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1350；events/ancient_relics_arcsite_events_2.txt:5788 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在熔岩星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on molten worlds.

## 剧情脉络 Story outline

一颗熔岩星球让传感器失灵；熔岩呈强磁性，原因随机三选一。

1. 抵抗迹象：剧烈的磁场波动让设备失灵
2. 金属星球：熔岩海洋本身是金属的

A molten world makes sensors glitch; its lava is strongly magnetic, and the cause is one of three random endings.

1. Signs of Resistance: extreme magnetic fluctuations disable equipment
2. That's So Metal: the lava itself is metallic

## 分支与结局 Branches and outcomes

- 中子星的余波 / Wake of the Neutron Star：数百万年前一颗特殊中子星掠过 / a special neutron star passed close millions of years ago
- 轰击之后 / Zapped!：撞击坑与聚变驱动痕迹指向“外力” / a crater and fusion-drive traces point to "external forces"
- 为了科学！ / For Science!：附近卫星上的废弃研究站记录了实验 / an abandoned research station on a nearby moon recorded experiments

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_strange_flows_random_events。 / Failed rolls draw from this site's own pool site_strange_flows_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1350）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1350) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9411 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9411 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
