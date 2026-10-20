# 内部回响 / The Echoes Inside

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在贫瘠星球（pc_barren）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on barren planets (pc_barren).

## 剧情脉络 Story outline

一颗曾经绿意盎然、如今干涸的星球，地震仪显示地下有庞然大物在移动：原来是一条以植被为食的巨型蠕虫，附近有一座废弃前哨站记录了生物恐怖武器。

1. 死亡之地：干枯的平原，坍塌后露出洞穴系统
2. 隧道影像：遍布全球的人工隧道，仍有东西在地下掘进
3. 异形魔怪：隧道是一条外来巨型蠕虫挖出的；它因饥饿而渐渐放缓
4. 废弃站所：废弃的外星科研前哨：休眠于土壤中、会吞噬整个生态的生物恐怖武器（社会学研究）

A once-lush, now desiccated world whose seismic readings show something huge moving underground: a gigantic worm that fed on vegetation, and a nearby outpost whose logs mention a biological terror weapon.

1. Dead Lands: desiccated plains crumbling into cave systems
2. Tunnel Vision: a planet-wide web of tunnels with something still burrowing
3. Tremors: the tunnels were eaten by a gigantic worm that is now starving
4. Abandoned Outpost: an abandoned alien science outpost: a bio-terror weapon that lies dormant in the soil and devours an ecosystem (society research)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_echoes_inside_random_events：争论的考古学家8055、迷途的探险队8050、无影无踪8075。 / Failed rolls draw from this site's own pool site_echoes_inside_random_events: bickering archaeologists 8055, lost expedition 8050, without a trace 8075.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:542；events/ancient_relics_arcsite_events_2.txt:2186
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:542）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:542) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
