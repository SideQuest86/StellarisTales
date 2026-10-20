# 奇怪的小行星 / Strange Asteroid

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在小行星上。全银河最多一处。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on asteroids. At most one per galaxy.

## 剧情脉络 Story outline

一颗伪装成天然小行星的人造保险库，一扇巨大的古门后是杂乱的“来自被遗忘帝国的物品”。

1. 奇异之门：科学船接近时露出一扇古老的巨门（小型文物）
2. 小行星保险库：开启保险库，整理后得到有用物品（质量加速器科技选项25%、三类研究、中型文物）

An artificial vault disguised as an asteroid; behind a vast ancient door is a jumble of artifacts from a forgotten empire.

1. Strange Door: a time-worn door appears as the science ship approaches (small artifact)
2. Asteroid Vault: opening it yields useful items (mass-accelerator tech option 25%, all three research types, medium artifact)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1522；events/ancient_relics_arcsite_events_1.txt:681
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1522）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1522) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
