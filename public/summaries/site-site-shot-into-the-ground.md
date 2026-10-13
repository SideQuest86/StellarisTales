# 大地之眼 / Hole in the Ground

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:650；events/ancient_relics_arcsite_events_2.txt:2566 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

一个深得异常的撞击坑；清理竖井危险而缓慢，坑底的真相随机三选一。

1. 开挖途中：向数百米深处吊运人员与碎石，事故频发
2. 中毒风险：越往下辐射越强，需要防护

An abnormally deep impact crater; clearing the shaft is slow and dangerous, and what lies at the bottom is one of three random endings.

1. Digging It: hoisting crews hundreds of metres down, with many accidents
2. Toxicity Risk: growing radiation the deeper they go

## 分支与结局 Branches and outcomes

- 六千尺之下 / Six (Thousand) Feet Under：坑底是一艘先进的外星飞船残骸 / an advanced alien spacecraft at the bottom
- 末日渐临 / Creeping Doom：一台带着聚变炸弹的巨型钻探机在沉睡 / a colossal drilling machine carrying a fusion bomb
- 大地为母 / This Pregnant Earth：成千上万巨大的有机蛋壳碎片 / thousands of giant calcified egg-shell shards

## 条件与文明差异 Conditions and variants

- 蛋壳结局对演化猎手起源有专属回应。 / The egg-shell ending has an extra response for Evolutionary Predators.
- 掷骰失败时使用本遗址专属的事件池 site_shot_into_the_ground_random_events。 / Failed rolls draw from this site's own pool site_shot_into_the_ground_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:650）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:650) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9076 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9076 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
