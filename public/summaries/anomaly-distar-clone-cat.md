# 可疑的舱体 / Murky Vats

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/utopia_initializers.txt:818-849 (ring_world_init_01); common/anomalies/95_anomaly_categories_distant_stars.txt:205-219; events/distant_stars_events_1.txt:2803 (distar.70); events/distant_stars_events_1.txt:2928 (distar.71); events/distant_stars_events_1.txt:3273 (distar.72); common/special_projects/00_projects_distant_stars.txt:146 (CRYO_CLONES_PROJECT); common/on_actions/00_on_actions.txt:1304

## 如何开始 How it starts

“毁坏的环形世界”星系初始化（utopia_initializers.txt，至多一个）在拥有《遥远繁星》时有50%机会给恒星添加此异常（6级，全局一次）。

The Ruined Ring World system initializer (utopia_initializers.txt, at most one) has a 50% chance to add this level-6, once-per-game anomaly to the star when Distant Stars is owned.

## 剧情脉络 Story outline

1. distar.70“冷仓中的克隆体”：环形世界的储存区里有成千上万个完全相同的外星克隆体，部分仍存活；恒星获得物理学矿藏。
2. 解冻（a）→ CRYO_CLONES_PROJECT（30天，科研船+科学家）→ distar.71：复苏的克隆体温顺但不擅复杂工作，按文明类型加入人口、作为奴隶、被同化、被吃掉，或在没有居住空间时乘殖民船离开。
3. 远观研究（b）或“没有空间”（no_room）：星系恒星获得 clones_in_cryo。日后修复并殖民环形世界区段时，on_colonized 触发 distar.72，再决定这些克隆体的去留。
4. 终结者或狂热净化者可直接消灭他们（获得影响力和凝聚力）。

1. distar.70 "Clones in Cryostasis": thousands of identical alien clones lie in the ring world's storage vats, some still alive; the star gains a physics deposit.
2. Thaw them (a) → CRYO_CLONES_PROJECT (30 days, science ship + scientist) → distar.71: the revived clones are docile but poor at complex tasks; by empire type they join the workforce, become slaves, are assimilated, eaten, or leave on a colony ship when there is no room.
3. Study from afar (b) or "no room" leaves clones_in_cryo on the star. Colonising a repaired ring-world segment later fires distar.72 (on_colonized) to decide their fate.
4. Terminators and Fanatic Purifiers can exterminate them outright (influence and unity).

## 分支与结局 Branches and outcomes

distar.70 五个选项按文明类型可用；a 进入项目，b/no_room 延后到殖民时的 distar.72，消灭选项直接结束。distar.72 可保留为纪念（矿藏）、解冻入籍、同化、照料（仆从）、作为食物（吞噬虫群）或抛入太空。

distar.70's five options depend on empire type; a leads to the project, b/no_room defer to distar.72 at colonisation, the extermination options end the story. distar.72 can keep them as a monument (deposit), thaw them into the workforce, assimilate, care for them (Servitors), feed them to the swarm, or eject them.

## 条件与文明差异 Conditions and variants

distar.70.a 不对普通机械智能（无终结者/同化者/仆从公民性）和非吞噬虫群的蜂巢开放。若玩家物种头像为 mam8，克隆体改用 rep15 头像。所有 distar.70 选项都会执行 pop_lcluster_event（有机会触发通用的“L星门见解”，不属于本故事）。

distar.70.a is closed to plain machine intelligences (no Terminator/Assimilator/Servitor civic) and non-swarm hive minds. If the player species uses portrait mam8 the clones use rep15. Every distar.70 option runs pop_lcluster_event (may fire the generic "L-Gate Insights", not part of this story).

## 审阅记录 Review notes

已核对初始化、异常、distar.70–72、CRYO_CLONES_PROJECT 和 on_colonized。修正：distar.72 在草稿中是独立故事；现以两条按选项限定的审阅连接接在 distar.70.b / no_room 之后。

Checked initializer, anomaly, distar.70–72, CRYO_CLONES_PROJECT and on_colonized. Correction: distar.72 was a separate story; it now follows distar.70.b / no_room through two choice-specific reviewed links.
