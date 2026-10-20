# 受欢迎的岩石 / Popular Rock

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在小行星（pc_asteroid）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on asteroids (pc_asteroid).

## 剧情脉络 Story outline

一群小行星中有能量读数，其中一颗被频繁造访；它的用途随机三选一。

1. 你好/再见：飞船残留的能量轨迹指向一颗小行星

Energy readings in an asteroid cluster lead to one much-visited rock; its purpose is one of three random endings.

1. Hello/Goodbye: faint ship trails single out one asteroid

## 分支与结局 Branches and outcomes

- 阶石 / Stepping Stone：内部的圣殿是朝圣中转站 / an inner sanctum — a pilgrims' stepping stone
- 深空仓库 / Deep Space Depot：星际补给与维修站 / a deep-space refuelling depot
- 苏醒时刻 / Rise and Shine：数十万个已打开的冷冻舱 / hundreds of thousands of opened cryo-pods

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_popular_rock_random_events。 / Failed rolls draw from this site's own pool site_popular_rock_random_events.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1304；events/ancient_relics_arcsite_events_2.txt:5607
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1304）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1304) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9386 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9386 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
