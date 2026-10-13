# 星罗群岛 / Dotted Archipelago

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1252；events/ancient_relics_arcsite_events_2.txt:5368 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在海洋星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on ocean worlds.

## 剧情脉络 Story outline

海洋星球上成群的圆形岛屿，内部都有相同的隧道布局；它们其实是巨型水母，结局随机三选一。

1. 岛屿隧道：岛下复杂的隧道穿过奇怪的油质岩石
2. 无处不在的隧道：每座岛的隧道布局都一模一样

Clusters of round islands with identical tunnel layouts dot an ocean world; they are giant jellyfish, and one of three random endings follows.

1. Island Tunnels: complex tunnels under an island through oily rock
2. Tunnels Everywhere: every island has the same tunnel layout

## 分支与结局 Branches and outcomes

- 冰冻凝胶 / Frozen Jelly：冰期冻死的巨型水母化石 / giant jellyfish fossilised by an ice age
- 自然休眠 / Natural Slumber：水母还活着，只是处于休眠周期 / they are alive, merely in a dormant phase
- 无法应付的大家伙 / Big Ones Couldn't Cope：人为引入的水母，大的没能适应而死 / introduced jellyfish; the big ones could not cope

## 条件与文明差异 Conditions and variants

- 每个结局都有一条“看起来很好吃”的回应（特定文明可见）。 / Each ending has a "tasty looking" response for certain empires.
- 掷骰失败时使用本遗址专属的事件池 site_fossilized_jellyfish_random_events。 / Failed rolls draw from this site's own pool site_fossilized_jellyfish_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1252）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1252) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9366 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9366 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
