# 毒液池 / Toxic Pools

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:61；events/extreme_frontiers_events.txt:2920 · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求 has_shroud_dlc，权重+50，出现在有毒星球（pc_toxic）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs has_shroud_dlc and has weight +50 on toxic planets (pc_toxic).

## 剧情脉络 Story outline

整齐排列的毒液池是一片孵化场；最后一枚完整的胎囊在提取时破裂，但剩下的黏液可以催化出一群新的生命。

1. 破裂粘液囊：破裂的粘液囊，被从内部刺破
2. 毒孕育池：毒液含放射性生长激素，与有机孕育周期相似
3. 胚胎残余：一枚几乎成形的胚胎，神经系统复杂
4. 发现生命信号：最后一枚胎囊在提取时破裂；三种处置

The neat lattice of toxic pools is a hatchery; the last intact sac ruptures on extraction, but the slime can be catalysed into new life.

1. Ruptured Slime Sac: a ruptured slime sac pierced from the inside
2. Toxic Gestation Pools: radioactive growth hormones typical of organic gestation
3. Embryonic Remains: an almost fully developed embryo with a complex nervous system
4. Life Signs Detected: the last sac ruptures during extraction; three ways forward

## 分支与结局 Branches and outcomes

- 毒性黏液催化 / Toxic Slime Catalyzation：A：催化黏液（项目）→ extreme_frontiers.1120：孵出数十枚胎囊，成熟后得到温顺合作的“黏液生”族群（活体试验品科技进度25%、社会学研究） / A: catalyse the slime (project) → extreme_frontiers.1120: dozens of sacs hatch into docile, cooperative slimeborn pops (living-test-subjects tech progress 25%, society research)
- B：提取这些黏液的能量（能量、食物月度奖励）；C（特定帝国）：分发营养补充剂。 / B: extract the slime's energy (energy and food rewards); C (certain empires): distribute nutritional supplements.

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:61）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:61) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
