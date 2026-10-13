# 有人在吗？ / Anyone Home?

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1014；events/ancient_relics_arcsite_events_2.txt:4306 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

完好却空无一人的城市属于一种周期性集体死亡与重生的真菌物种；人口去向随机三选一。

1. 幽灵之城：多座完好的空城，规划高度规整
2. 老生常谈，老幢常修：所有建筑几乎同时建成，问题多于答案
3. 死而复生：真菌物种集体孵化、集体死亡的周期

Intact but empty cities belong to a fungal species with a collective cycle of death and rebirth; where the population went is one of three random endings.

1. City of Ghosts: several intact, orderly cities, all empty
2. Same Old, Same Old: all built at about the same time — more questions than answers
3. Death/Rebirth: the fungal species' cycle of mass hatching and mass death

## 分支与结局 Branches and outcomes

- 循环中止 / A Cycle Disturbed：孕育期的种群被自然灾害毁灭 / the gestating population was destroyed by a natural disaster
- 超然物外 / Rise Above：物种质疑循环的意义，集体选择“升华” / the species questioned the cycle and chose to rise above it
- 卷土重来 / Will Rise Once More：他们还在地下孕育，终将再次出现 / they are still gestating underground and will rise again

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_phoenix_collective_random_events。 / Failed rolls draw from this site's own pool site_phoenix_collective_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1014）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1014) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9251 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9251 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
