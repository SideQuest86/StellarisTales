# 气态巨行星中的建筑 / Gas Giant Structure

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:315；events/ancient_relics_arcsite_events_2.txt:1484 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在气态巨行星（pc_gas_giant）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on gas giants (pc_gas_giant).

## 剧情脉络 Story outline

一座被困在气态巨行星大气中的废弃空间站，曾是供多个种族度假的豪华“星辰花瓣”。

1. 享乐之宫：老虎机、酒吧和聚集在逃生舱旁的遗体
2. 星辰花瓣：它曾每年被拖船拖到新的度假地点，最后在此遭难
3. 最后时日：陨石撞击使其坠入大气，逃生舱不够，引发恐慌
4. 脉动之心：保险箱里的“脉冲星之心”钻石项链（能量+4000、防御科技选项25%、工程学研究、中型文物）

A derelict space station trapped in a gas giant's atmosphere, once the luxurious "Star Petal" holiday resort.

1. Pleasure Palace: a pleasure palace of slot machines and bars, bodies clustered by the escape pods
2. The Star Petal: a resort towed to a new location each year; this was its last
3. The Final Days: a stray asteroid doomed it; too few escape pods, mass panic
4. The Heart of the Pulsar: in the safes, the "Heart of the Pulsar" necklace (energy +4000, rampart tech option 25%, engineering research, medium artifact)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:315）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:315) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
