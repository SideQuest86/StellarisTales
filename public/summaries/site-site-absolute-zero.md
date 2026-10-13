# 绝对零度 / Absolute Zero

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:2；events/extreme_frontiers_events.txt:2680 · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求 has_shroud_dlc，权重+50，出现在冰冻星球（pc_frozen）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs has_shroud_dlc and has weight +50 on frozen planets (pc_frozen).

## 剧情脉络 Story outline

地下深处接近绝对零度的低温来源于一座古老的冷冻坟墓：一个爬行类皇室连同侍从被冷冻保存，却在一次低温失控中全体死亡。

1. 冰封：被冰岩堵塞的入口
2. 时光冻结：入口内是蜷缩冻僵的爬行类尸体
3. 冰封墓穴：中央大厅里是原始的低温舱，品级越高越靠近中心
4. 冰封君王：皇室首脑的科技石棺与古老机器相连
5. 低温灾难：国王患病后冷冻待治，循环介质泄漏引发失控的吸热反应（低温库科技选项、三类研究、稀有文物）

The near-absolute-zero cold underground comes from an ancient tomb where a reptilian royal house and retinue were cryo-preserved and died in a runaway cryogenic accident.

1. Frozen Blockage: an entrance blocked by ice and rock
2. Frozen in Time: frozen reptilian corpses clawing at the walls
3. Glacial Tomb: a central hall of primitive cryo-pods, higher ranks closer to the middle
4. Frozen Monarch: the monarch's sarcophagus wired into an ancient machine
5. Cryogenic Catastrophe: the monarch was frozen awaiting a cure; leaked coolant caused a runaway endothermic reaction (cryovault tech option, research, minor artifacts)

## 分支与结局 Branches and outcomes


## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:2）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:2) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
