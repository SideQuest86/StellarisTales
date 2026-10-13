# 深入探查 / Get Inside

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:962；events/ancient_relics_arcsite_events_2.txt:3980 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

城市完好却无人的星球；居民曾因气候骤冷迁入地下，结局随机三选一。

1. 无人还家：风蚀的空城，没有灾难迹象
2. 一路向下：密封的防护门通往深层隧道

Intact but empty cities; the people moved underground when the climate turned cold, and one of three random endings tells what followed.

1. Nobody Home: weathered, deserted cities without signs of disaster
2. Down We Go: sealed shield doors to a deep tunnel network

## 分支与结局 Branches and outcomes

- 阱中长眠 / The Deep Sleep：迁入地下后陷入长眠，再未醒来 / they went into a deep sleep underground and never woke
- 夺命热浪 / Fatal Heat Wave：冰期后的幸存者在地下热浪中死去 / survivors deep below died in a fatal heat wave
- 独处冰窖 / Cold and Alone：最后的幸存者独自在寒冷中坚持 / the last survivor endured alone in the cold

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_warmer_climates_random_events。 / Failed rolls draw from this site's own pool site_warmer_climates_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:962）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:962) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9221 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9221 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
