# 棱角分明 / Too Angled

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:702；events/ancient_relics_arcsite_events_2.txt:2846 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

星球地貌被切割成过于规整的几何形状；坠毁的飞行机器揭示原因，最后结果随机三选一（权重10/40/40）。

1. 令人不安的完美：自然与人造地形在各种尺度上交错
2. 伟大设计：找到成片的坠毁飞行机器

The planet's landscape is cut into impossibly regular shapes; crashed flying machines explain why, and one of three endings is drawn (weights 10/40/40).

1. Unnerving Perfection: natural and artificial geography intertwined at every scale
2. Grand Design: a multitude of crashed flying machines

## 分支与结局 Branches and outcomes

- 艺术无疆 / Limitless Art：轨道切割机群是一场无限延续的艺术创作 / the orbital cutters were an endless work of art
- 定制工作 / A Custom Job：这是一项为客户定制星球地貌的工程 / a custom landscaping job for a client
- 拆星计划 / Scheduled for Demolition：切割网络的任务其实是彻底拆除这颗星球 / the network was meant to dismantle the planet entirely

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_cut_to_fit_random_events。 / Failed rolls draw from this site's own pool site_cut_to_fit_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:702）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:702) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9101 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9101 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
