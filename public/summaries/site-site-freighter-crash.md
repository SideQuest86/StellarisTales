# 陨落星舰 / Crashed Starship

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在贫瘠、寒冷贫瘠、熔岩、冰冻或有毒星球上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on barren, cold barren, molten, frozen or toxic planets.

## 剧情脉络 Story outline

一艘货船在卫星上坠毁，六份日志依次讲述船员如何在等待救援中走向荒诞的互相残杀；最后是巡逻官的记录。

1. 舰长航行日志：船长的日志：迫降，船员伤亡，期待救援
2. 大副的报告：大副把船长锁进杂物间并自行接管，工程师在造跨空间发射机
3. 食物状况：食物耗尽，船员投票决定吃掉船长
4. 骗局：工程师的发射机其实是一罐塞满杂物的燃料罐
5. 三副的报告：大副自尽、技师称帝、食人蔓延；唯一幸存者被奉为神明
6. 巡逻日志：巡逻官的日志：找到唯一幸存者，将坠毁地登记为保护墓地（装甲科技选项25%、工程学研究、大型文物）

A freighter crashed onto a moon; six logs in turn tell how the crew, waiting for rescue, descended into absurd infighting, ending with a patrol officer's record.

1. Captain's Chronicle: the captain's log: forced landing, casualties, awaiting rescue
2. First Mate's Report: the first mate stows the captain and takes command while the engineer builds a transmitter
3. Food Situation: food runs out and the crew votes to eat the captain
4. The Fraud: the engineer's transmitter is a fuel canister of junk
5. Third Mate's Report: the first mate kills himself, a technician declares herself Empress, cannibalism spreads
6. Patrol Log: the patrol log: one survivor rescued, the wreck registered as a protected grave (armor tech option 25%, engineering research, large artifact)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:424；events/ancient_relics_arcsite_events_2.txt:1718
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:424）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:424) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
