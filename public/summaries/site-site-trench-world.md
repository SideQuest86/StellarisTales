# 堑壕星球 / Trench World

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:806；events/ancient_relics_arcsite_events_2.txt:3336 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在贫瘠星球（pc_barren）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on barren worlds (pc_barren).

## 剧情脉络 Story outline

整个星球布满杂乱的浅沟；确认是有意挖掘后，沟渠的由来随机三选一。

1. 就那么挖！：分析数百条沟渠，确认是人为挖掘

The whole surface is scarred by haphazard shallow canals; after they prove deliberate, their origin is one of three random endings.

1. Dig Like You Mean It!: hundreds of canals analysed — they were dug deliberately

## 分支与结局 Branches and outcomes

- 堑壕战争 / Trench War：为抵御巨型蜗牛状入侵生物而挖的战壕 / trenches against a giant snail-like invader
- 生命之水 / Waters of Life：一台掘地机器人造的输水渠（可拆解回收） / water channels dug by a burrowing automaton (can be scrapped)
- 寒冰之毯 / Ice Blanket：骤然冰期中，本地类鼹鼠生物拼命挖掘求生 / mole-like natives digging frantically during a sudden ice age

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_trench_world_random_events。 / Failed rolls draw from this site's own pool site_trench_world_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:806）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:806) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9146 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9146 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
