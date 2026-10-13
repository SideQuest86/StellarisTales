# 古战场遗址 / Ancient Battle Site

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1667；events/ancient_relics_arcsite_events_1.txt:1068 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在可居住星球上。全银河最多一处。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on habitable planets. At most one per galaxy.

## 剧情脉络 Story outline

星球上有精炼材料与放射性残留：来自“毁灭者”的跨维度游牧者曾入侵此地——这里原属“抗争者”联盟的秘密殖民地。

1. 古战场遗址：一方从轨道降下、被地面守军迎击的战场（社会学研究、小型文物）
2. 被遗忘的怨恨：毁灭者与抗争者的战争，战果不明（三类研究奖励、中型文物）

Refined material and radiation mark a battle site: extra-dimensional nomads, "The Destroyers", invaded a secret colony of the coalition "Those-who-resist".

1. Ancient Battle Site: one side descended from orbit and met planetary defenders (society research, small artifact)
2. Forgotten Grudge: the Destroyers against Those-who-resist; the outcome is unknown (all three research rewards, medium artifact)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1667）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1667) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
