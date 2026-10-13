# 似曾相识的挖掘 / Déjà Vu Dig

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:754；events/ancient_relics_arcsite_events_2.txt:3126 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

一条通往地下密室的竖井早已有人挖过；考察队发现前人的工具，随后随机得到三种结局之一。

1. 石块滚落：竖井下段坍塌，挖掘缓慢
2. 考古之后：找到一把被压碎的外星“镐”

A shaft to a buried chamber was dug before; the team finds the previous diggers' tools, then one of three endings is drawn.

1. Tumbled Down: the lower shaft has collapsed, slowing the dig
2. Meta-Archaeology: a crushed alien pickaxe

## 分支与结局 Branches and outcomes

- 考古循环 / Archaeological Loop：前人的遗骸揭示他们其实就是……另一支在做同样考古的队伍 / the dead diggers turn out to have been on the very same kind of dig
- 掩盖真相 / Cover it Up：坍塌是人为爆破，底部空无一物 / the collapse was deliberate sabotage and the bottom is empty
- 设防之墓 / Defended Tomb：底部是一座有守卫的古墓，考察队被迫撤离 / a defended tomb forces the team to retreat

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_deja_vu_dig_random_events。 / Failed rolls draw from this site's own pool site_deja_vu_dig_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:754）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:754) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9126 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9126 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
