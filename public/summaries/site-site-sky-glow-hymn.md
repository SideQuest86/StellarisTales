# 美丽泡沫 / Beautiful Bubble

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:910；events/ancient_relics_arcsite_events_2.txt:3789 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，只出现在不宜居的常规星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on uninhabitable regular planets.

## 剧情脉络 Story outline

几个世纪前灭绝的技术文明，天空中仍有规律闪烁的极光；极光的来源随机三选一。

1. 盎然之空与荒寂之地：荒芜的地面与绚丽的天空，文明毁于内斗
2. 天火舞动：典型的悲剧：技术发达而社会分裂

A civilisation that died out a few centuries ago; the sky still glows with rhythmic aurorae, whose source is one of three random endings.

1. Barren Grounds & Vibrant Skies: barren ground, vivid skies; a civilisation destroyed by infighting
2. Fire in the Sky: a sadly typical history of technology outpacing harmony

## 分支与结局 Branches and outcomes

- 大隐无遁 / Hidden in Plain Sight：轨道上的小型机器在操纵极光 / small orbital machines manipulate the aurora
- 问天寻道 / Look to the Heavens for Answers：仍在运转的微卫星网络在投射带电粒子（出了点小意外） / a still-active micro-satellite network projects charged particles (with a mishap)
- 孤独之歌 / Song of the Solitaire：极光其实是一种半有感知的高空生命 / the aurora is a semi-sentient life form in the upper atmosphere

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_sky_glow_hymn_random_events。 / Failed rolls draw from this site's own pool site_sky_glow_hymn_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:910）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:910) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9196 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9196 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
