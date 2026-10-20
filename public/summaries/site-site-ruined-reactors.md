# 损毁反应堆 / Ruined Reactors

- 分类 Category：先驱者与考古 Precursors · DLC：脚本条件 has_shroud_dlc（Shroud 相关内容） script condition has_shroud_dlc

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求 has_shroud_dlc，权重+50，出现在有毒、贫瘠或寒冷贫瘠星球（且没有研究站可用资源点）上。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs has_shroud_dlc and has weight +50 on toxic, barren or cold barren planets without a research-station deposit.

## 剧情脉络 Story outline

一座在一万多年前发生严重堆芯事故的核电站：设计落后、冷却不足，居民仓促撤离，地下有一座储存乏燃料的铀容器库。

1. 远古反应堆发电站：古老的反应堆发电站，系统离线、结构受损
2. 灾难性堆芯熔毁：多座反应堆熔毁，紧急停堆程序未完成
3. 设计失败：设计缺陷：几十座反应堆只配了极少的冷却
4. 撤离残迹：撤离区里空着的穿梭机泊位和一架残骸（合金）
5. 铀容器：库：泄漏的乏燃料仍蕴含巨大能量（星球获得能量资源点）

A nuclear plant that suffered a serious containment failure over 10,000 years ago: crude design, little cooling, a hasty evacuation, and a vault of spent fuel below.

1. Ancient Reactor Plant: an abandoned reactor plant, offline and damaged
2. Catastrophic Meltdown: several reactors melted down; the emergency shutdown never finished
3. Design Failures: design failures: dozens of reactors with minimal cooling
4. Evacuation Remnants: an evacuation hangar with empty berths and one wrecked shuttle (alloys)
5. Uranium Vault: the uranium vault: leaking spent fuel still holding great energy (the planet gains an energy deposit)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:114；events/extreme_frontiers_events.txt:3215
- 已核对：遗址定义（common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:114）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/12_extreme_frontiers_arc_sites.txt:114) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
