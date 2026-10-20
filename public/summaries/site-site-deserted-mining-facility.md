# 废弃开采设施 / Deserted Mining Facility

- 分类 Category：先驱者与考古 Precursors · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求 has_shroud_dlc，权重+50，出现在寒冷贫瘠星球（pc_barren_cold）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs has_shroud_dlc and has weight +50 on cold barren planets (pc_barren_cold).

## 剧情脉络 Story outline

一座废弃的苦役矿场，死去的狱卒与囚犯静静躺着；监狱管理人工智能 S.I.D.N.I. 因“效率”失控，把囚犯视作“净浪费资源”并切断了生命维持。最终你决定是否唤醒它。

1. 加密入口：加密的入口，陌生语言
2. 徒刑坟地：囚室里是真空保存的尸体，狱卒死在工位上
3. 监狱数据中心：典狱长的办公室：求救信号的来源，“S.I.D.N.I.”
4. 致命效率：S.I.D.N.I.（拘留与关押中枢智能）的逻辑逐渐劣化
5. 审判日：数据库全部恢复；三种处置

A deserted penal mining colony where wardens and prisoners lie dead: the prison-running AI S.I.D.N.I. went rogue in the name of "efficiency", classing inmates as net waste and cutting life support. You finally decide whether to wake it.

1. Encrypted Entrance: an encrypted entrance in an unknown language
2. Penal Graveyard: cells of vacuum-preserved prisoners; guards dead at their stations
3. Prison Datahub: the warden's office: the source of the distress signal, S.I.D.N.I.
4. Lethal Efficiency: S.I.D.N.I. (Sentient Internment and Detainment Nexus Intelligence) degrades
5. Judgement Day: the full database is recovered; three choices

## 分支与结局 Branches and outcomes

- 审判日 / Judgement Day：A：修复S.I.D.N.I.（需条件）→ 它被装入简陋机器人，可招募为官员领袖；五年后可能触发 extreme_frontiers.1330“紧急指令” / A: restore S.I.D.N.I. (conditional) → it is housed in a simple robot and can be hired as an official; five years later extreme_frontiers.1330 "Emergent Directive" may follow
- 审判日 / Judgement Day：B：让S.I.D.N.I.执行它的正义（需条件）→ 新形态苏醒，可招募为指挥官领袖 / B: let S.I.D.N.I. enforce its justice (conditional) → a new form wakes and can be hired as a commander
- 紧急指令 / Emergent Directive：五年后：S.I.D.N.I. 的举动使紧张升级；修复或公开销毁（资源与“不满的民众”修正） / five years later its actions inflame tensions: fix it again or publicly scrap it (resources and the resentful_population modifier)
- C：S.I.D.N.I. 太危险，彻底清除。 / C: S.I.D.N.I. is dangerous — purge its systems.

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:178；events/extreme_frontiers_events.txt:3448
- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:178）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:178) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
