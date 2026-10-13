# 机器人碎片 / Robot Debris

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:371；events/ancient_relics_arcsite_events_2.txt:1617 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在小行星或冰质小行星上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on asteroids and ice asteroids.

## 剧情脉络 Story outline

小行星表面铺满战斗机器人的残骸：两个帝国曾约定把争端交给机器人军队在此打擂台。

1. 两个来源：残骸来自两种不同的文化
2. 战场：这里是真正的战场，战斗持续近两个世纪
3. 条约：二十万年前的条约规定用受管制的机器人对战解决纷争（质量加速器科技选项25%、工程学研究、中型文物）

An asteroid covered in the wreckage of combat droids: two empires agreed to settle disputes by robot armies fighting here.

1. Two Sides: the droids come from two distinct cultures
2. Battlefield: this was the battlefield itself, fought over almost two centuries
3. The Treaty: a treaty 200,000 years ago set regulated robot battles (mass-driver tech option 25%, engineering research, medium artifact)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:371）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:371) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
