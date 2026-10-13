# 波涛之下 / Beneath the Waves

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1148；events/ancient_relics_arcsite_events_2.txt:4835 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在海洋星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on ocean worlds.

## 剧情脉络 Story outline

平静的海洋却有永不停息的洋流；刺出海面的有机尖塔与海底构造属于同一片珊瑚，结局随机三选一。

1. 刺穿水面：刺出海面的巨大有机尖刺
2. 水流发生器：海底整齐的生物构造在推动洋流

Placid seas with relentless currents; organic spires and seabed formations belong to one reef, and one of three random endings explains it.

1. Surface Piercers: giant organic spikes piercing the sea surface
2. Current Makers: even bio-formations on the seabed drive the currents

## 分支与结局 Branches and outcomes

- 珊瑚虫巢 / The Hive Coral：全球连成一体的蜂巢珊瑚 / a single planet-wide hive coral
- 生物救星 / Bio-Savior：珊瑚是外来的生物工程造物 / the coral is an introduced bio-engineered construct
- 欢迎委员会 / Welcoming Committee：整片珊瑚是为死寂海洋造氧的生物机器 / the reef is a bio-machine built to oxygenate dead oceans

## 条件与文明差异 Conditions and variants

- 三个结局都有一条“适应”回应（特定文明可见）。 / Each ending has an extra "adapting" response for certain empires.
- 掷骰失败时使用本遗址专属的事件池 site_hive_coral_random_events。 / Failed rolls draw from this site's own pool site_hive_coral_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1148）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1148) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9316 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9316 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
