# 被毁的空间站 / Ruined Station

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重30，出现在中子星或脉冲星天体上。创建时在星球旁生成一座“废弃的武器空间站”。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 30 on neutron-star or pulsar bodies. On creation an "abandoned weapon station" ambient object is placed at the planet.

## 剧情脉络 Story outline

一座绕中子星运转的被毁空间站，原是鲁达里人孤注一掷研制的实验性武器，所有系统都在不断失灵。

1. 实验型装备：恢复部分供电：它是一座以巨炮为主体的实验武器站
2. 系统失效：故障频发（谨慎处理得“一丝不苟”特质；“踢一脚”得“敲打维修”特质）
3. 鲁达里策略：鲁达里与灭绝种族“波格-莫里”的战争，激进派决定彻底消灭敌人
4. 梦的破碎：首席科学官的日志：仓促的项目、没有时间测试；获得“鲁达里死亡激光”修正与大型文物

A ruined station orbiting a neutron star: the Rudari's desperate experimental weapon, whose systems keep failing.

1. Experimental Weaponry: power restored: an experimental weapons station dominated by one huge cannon
2. System Failures: systems fail constantly (caution: trait Meticulous; "try kicking it": trait Percussive Maintainer)
3. The Rudari Gambit: the Rudari war against the genocidal Pogg-Mory and a radical plan to annihilate them
4. The Failure of a Dream: the chief science officer's logs of a rushed, untested weapon; modifier rudari_death_laser and a large artifact

## 分支与结局 Branches and outcomes

- 军官失误引发的“爆炸性减压”8200–8203与“系统锁定”8215是轨道/空间站遗址共用的失败事件（space_station_random_events），在本故事中作为枢纽，不再算作本遗址的章节。 / Explosive decompression 8200-8203 and system lockout 8215 are failure events shared by all orbital/station sites (space_station_random_events); in this story they are hubs, not chapters of the site.
- 具有“敲打维修”特质的领袖使装备故障8070的权重翻倍，并可在其中“踢一脚”。 / A Percussive Maintainer doubles the weight of equipment malfunction 8070 and can "kick it".

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用多个遗址共用的事件池 space_station_random_events（轨道遗址）。 / Failed rolls draw from the pool space_station_random_events, shared by several sites (orbital sites).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2018；events/ancient_relics_arcsite_events_2.txt:8103
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2018）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2018) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
