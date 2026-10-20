# 族母 / The Matriarch

- 分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

拥有《遥远繁星》时，银河生成一个“年迈缇扬奇系统”（elderly_tiyanki_system，标志 guardian / hostile_system，最多1个），守卫国家 guardian_elderly_tiyanki 与舰队 elderly_tiyanki_fleet 在其气态巨行星之间游弋（隐藏事件 distar.210 在抵达时让它换到另一颗行星）。普通国家的舰队首次进入该星系时，on_entering_system_fleet 触发 distar.211。

With Distant Stars the galaxy spawns an Elderly Tiyanki system (elderly_tiyanki_system, flags guardian / hostile_system, at most one) where the guardian country guardian_elderly_tiyanki and its fleet elderly_tiyanki_fleet roam among the gas giants (the hidden event distar.210 moves it to another planet on arrival). The first time a fleet of an ordinary country enters, on_entering_system_fleet fires distar.211.

## 剧情脉络 Story outline

1. distar.211“族母”：设置国家标志 encountered_elderly_tiyanki，建立与守卫国家的通讯（首次遇到缇扬奇时一并建立缇扬奇联系），15天后触发通用接触报告 story.8。
2. 击杀族母舰队 → distar.212“族母之死”：设置 tiyanki_killed 成就标志，生成族母尸体，终止策展人链 curator_poi_tiyanki；四个选项（普通、纪念者公民的“明白”、死灵师“送去死灵师”、可收集 DNA 的“收集遗传物质”）都会立即触发 distar.213，并在60天后对银河共同体成员触发 galcom.110。结束时开始“利维坦庆典”情境。
3. distar.213“族母之死”→ 214“破腹而出”→ 215“瑞斯·昂多”：族母腹中冲出舰长瑞斯·昂多的 AH4B；可招募他、遣散他（非杀戮帝国放他乘逃生舱走 → 217；杀戮帝国 → 216，多种处决选项换取每月团结），或与之对话。
4. 死灵师可启用项目 REANIMATE_TIYANKI_MATRIARCH“复活缇扬奇族母”（费用10000，限时1080天，需科学船与科学家）→ distar.218“逝者复生”，族母作为你的战舰回归。

1. distar.211 "The Matriarch": sets country flag encountered_elderly_tiyanki, establishes communications with the guardian country (and with the Tiyanki on first encounter) and fires the generic contact report story.8 15 days later.
2. Killing the Matriarch's fleet → distar.212 "Death of the Matriarch": sets the tiyanki_killed achievement flag, spawns her corpse and ends the Curator chain curator_poi_tiyanki; the four options (standard; "Understood" for the Memorialist civic; "Send in the Necromancers"; "Harvest genetic material" where DNA can be harvested) all fire distar.213 at once and galcom.110 60 days later for Galactic Community members. It ends by starting a Leviathan celebration situation.
3. distar.213 "Death of the Matriarch" → 214 "From the Belly of the Beast" → 215 "Reth Unddol": Captain Reth Unddol's AH4B bursts out of her belly; you can recruit him, dismiss him (non-homicidal empires let him leave in an escape pod → 217; homicidal empires → 216, several execution options for monthly unity) or talk to him.
4. Necromancers can start the project REANIMATE_TIYANKI_MATRIARCH (cost 10000, 1080-day limit, science ship and scientist) → distar.218 "Rise Again": the Matriarch returns as your warship.

## 分支与结局 Branches and outcomes

线性相遇 → （可选）击杀；击杀后的四个选项互斥（由公民与能力决定），都进入 213 链；galcom.110 只对共同体成员且 resolution_tiyanki_conservation_act 生效时出现（三个选项按排外/亲外星状态，均扣5000能量）。

Linear encounter → (optionally) kill; the four kill options are mutually exclusive (decided by civic and ability) and all lead into the 213 chain; galcom.110 appears only for Galactic Community members while resolution_tiyanki_conservation_act is active (three options by xenophobe/xenophile status, each costing 5000 energy).

## 条件与文明差异 Conditions and variants

212 的选项由纪念者公民、死灵师（is_reanimator）与 DNA 收集能力决定；215 的遣散结果取决于是否为杀戮帝国。

212's options depend on the Memorialist civic, being a reanimator and DNA harvesting; 215's dismissal result depends on whether the empire is homicidal.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:2702 (elderly_tiyanki_system); events/distant_stars_events_1.txt:6536 (distar.211); common/on_actions/00_on_actions.txt:1005; events/distant_stars_events_1.txt:6600 (distar.212); common/on_actions/00_on_actions.txt:1461; common/special_projects/00_projects_distant_stars.txt:1500 (REANIMATE_TIYANKI_MATRIARCH); events/galactic_community_events.txt:1161 (galcom.110)
已核对初始化器、on_action（1005 进入、1461 击毁）、distar.210–218、复活项目与 galcom.110。草稿把进入事件 distar.211 与击杀事件 distar.212 作为两个独立故事；现合为以 distar.211 为起点的一个故事，用审阅连接表示击杀。distar.210 是隐藏的巡逻事件，不属于叙事。

Checked the initializer, the on_action hooks (1005 entering, 1461 destroyed), distar.210–218, the reanimation project and galcom.110. The draft treated the entry event distar.211 and the kill event distar.212 as separate stories; they are now one story starting at distar.211 with a reviewed link for the kill. distar.210 is a hidden patrol event, not part of the narrative.
