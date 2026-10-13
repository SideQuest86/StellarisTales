# 邓德鲁斯的历代志 / Chronicles of Dendrus

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:237；events/extreme_frontiers_events.txt:3966；common/special_projects/05_projects_extreme_frontiers.txt:233 · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求 has_shroud_dlc，权重+50，出现在贫瘠、寒冷贫瘠、有毒或冰冻星球，且恒星系中有黑洞上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs has_shroud_dlc and has weight +50 on barren, cold barren, toxic or frozen planets in a system with a black hole.

## 剧情脉络 Story outline

黑洞系统里坠毁着一艘邓德里（Dendritian）方舟“邓德鲁斯一号”：船上的乘员冷冻而死，航行日志里的“历代志”是一套数学证明，指向一条被黑洞破坏的超空间航道，航道另一端是他们寻找的“新布拉图拉”。

1. 大型运输船：一艘坠毁约百年的大型运输船
2. 死亡殖民船：殖民船内的水培舱与“新布拉图拉”殖民计划；选择尊重遗体或“吃掉它们”继续（取决于文明）
3. 母星神庙：母星“布拉图拉”的神庙和乘员留言
4. 指令面板：指挥甲板的紧急日志；取出“历代志”并开始事件链 chronicles_of_dendrus_chain

In a black-hole system lies the wrecked Dendritian arkship Dendrus I: its sleepers died in cryosleep, and its "Chronicles" — mathematical proofs — point to a hyperlane degraded by the black hole that leads to their paradise planet New Bratulla.

1. Massive Transport Vessel: a huge transport wrecked about a century ago
2. Doomed Colony Ship: hydroponic bays and plans for "New Bratulla"; choose to respect the dead or consume their remains (by empire)
3. Homeworld Shrine: a shrine to the homeworld Bratulla and crew recordings
4. Command Deck: the emergency log; the "Chronicles" are extracted and the chain chronicles_of_dendrus_chain begins

## 分支与结局 Branches and outcomes

- 研究邓德里历代志 / Study the Dendritian Chronicles：研究历代志（项目，主种族为机器人时使用） / study the Chronicles (project; used when the main species is robotic)
- 研究邓德里历代志 / Study the Dendritian Chronicles：研究历代志（项目，其他帝国） / study the Chronicles (project; all other empires)
- 发现退化的超空间航道 / Degraded Hyperlane Discovered：发现一条退化的超空间航道（物理学研究）→ 项目“修复退化的超空间航道”→ extreme_frontiers.1425 / a degraded hyperlane is found (physics research) → project Restore Degraded Hyperlane → extreme_frontiers.1425
- 航道修复后，勘察另一端的“新布拉图拉”星球会触发 extreme_frontiers.1430（on_survey_planet）；那一段属于另一个故事“event-extreme-frontiers-1430”。 / Surveying the planet at the far end (New Bratulla) fires extreme_frontiers.1430 from on_survey_planet; that part is the separate story "event-extreme-frontiers-1430".

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:237）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:237) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
