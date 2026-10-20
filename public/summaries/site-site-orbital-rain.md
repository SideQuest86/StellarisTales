# 一查到底 / Get to the Bottom

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在海洋星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on ocean worlds.

## 剧情脉络 Story outline

海底布满撞击坑；分析表明海水来自别的星球，海底遗址的性质随机三选一。

1. 海底之伤：海底像月面一样布满撞击坑
2. 超凡脱俗之水：海水的化学成分来自其他星球——被运来的

The ocean floor is covered in craters and the water came from another world; the nature of the seabed ruins is one of three random endings.

1. Wounds on the Ocean Floor: a seabed cratered like a moon
2. Otherworldly Waters: the water's chemistry is off-world — it was transported

## 分支与结局 Branches and outcomes

- 当前事件 / Current Events：数公里长的古代结构（不幸的发现） / a kilometres-long ancient structure (an unfortunate find)
- 水下存储 / Submerged Storage：海床下的通讯阵列记载了引水计划 / a buried communications array records the water-introduction project
- 气候控制 / Climate Control：海底深处的气候控制中心 / a deep-buried climate control centre

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用本遗址专属的事件池 site_orbital_rain_random_events。 / Failed rolls draw from this site's own pool site_orbital_rain_random_events.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1200；events/ancient_relics_arcsite_events_2.txt:5116
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1200）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1200) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9341 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9341 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
