# 异变化石 / Mutant Fossils

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1710；events/ancient_relics_arcsite_events_1.txt:2546 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在核毁星球（pc_nuked，非鼠人星球）上。全银河最多一处。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on nuked planets (pc_nuked, not a ratling planet). At most one per galaxy.

## 剧情脉络 Story outline

星球上有大量严重变异的化石，属于一个灭绝的后末日灵性社会：他们把辐射视为神圣的“源”，并用近乎致命的辐照作成年仪式。

1. 废土精神：这些变异化石属于信奉灵性的后末日社会
2. 致癌辐射：他们把辐射当作神，演化与放射性相联
3. 不断增长的痛苦：放射性化学品的储存罐证实：自愿受辐照是成年仪式（导弹科技选项25%，星球获得“变异罐”资源点）

Heavily mutated fossils of a post-apocalyptic, spiritual society that revered radiation as the "Source" and used near-lethal exposure as a coming-of-age rite.

1. Wasteland Spirits: the fossils belong to a spiritual post-apocalyptic society
2. Carcinogenic Radiance: they worshipped radiation and tied evolution to radioactivity
3. Growing Pains: a ruined vat complex confirms the rite (missile tech option 25%; the planet gains the mutation-vats deposit)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1710）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1710) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
