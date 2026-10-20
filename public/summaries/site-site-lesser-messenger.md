# 尘中之信 / Message in the Dust

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics；事件属《联邦》Federations 文件

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重50，出现在核爆、沙漠、干旱或草原星球上（排除部分标记的星球）。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 50 on nuked, desert, arid or savannah worlds (some flagged planets excluded).

## 剧情脉络 Story outline

一个早已消失的文明留下的信号指向地下研发设施；他们其实是微型物种，结局随机三选一，都让玩家获得飞船“小信使”。

1. 去此万年：文明在很久以前毁灭
2. 深空凶兽：无线电信号提到逼近的“太空巨兽”
3. 原型花园：地下的原型机园区
4. 他们到底在修建什么……：微型硬盘记载一个举族投入的项目

A long-gone civilisation's signal leads to an underground R&D site; they were a miniature species, and all three random endings give the ship "Lesser Messenger".

1. Since Long Gone: a civilisation destroyed long ago
2. Beasts of Space: a radio signal mentions approaching "beasts of space"
3. Garden of Prototypes: an underground garden of prototypes
4. What are they building...: miniature drives describe a civilisation-wide project

## 分支与结局 Branches and outcomes

- 胜者是…… / And the winner is...：“获胜者是……”一艘对他们而言巨大的飞船 / "And the winner is…" a ship huge to them
- 前进，征服 / Go forth and conquer：“前进吧，征服吧” / 
- 别破坏了信使 / Don't shoot the messenger：“别射信使” / 
- 飞船获得时随机受损；可开启项目“放大信使”。 / The ship comes with random damage; the project "Upscaling the Messenger" can follow.

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_lesser_messenger_random_events。 / Failed rolls draw from this site's own pool site_lesser_messenger_random_events.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1452；events/federations_events_1.txt:2459
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1452）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1452) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 fedev.9461 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event fedev.9461 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
