# 有脉搏的星球 / A Planet with a Pulse

- 分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）或 Biogenesis（has_biogenesis_dlc） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:1178 (guardians_init_hatchling; egg planet 1230-1238); common/on_actions/00_on_actions.txt:1306 (on_colonized → distar.5000); common/on_actions/00_on_actions.txt:103 (on_monthly_pulse → distar.5001); events/distant_stars_events_3.txt:15-340 (distar.5000-5006); events/distant_stars_events_3.txt:491 (distar.5007); events/distant_stars_events_3.txt:553 (distar.5013); events/distant_stars_events_3.txt:685 (distar.5014, 5015); events/distant_stars_events_3.txt:775 (distar.5011); common/on_actions/00_on_actions.txt:1006; events/distant_stars_events_3.txt:815 (distar.5009); common/on_actions/00_on_actions.txt:1655; events/distant_stars_events_3.txt:971 (distar.5016); events/distant_stars_events_3.txt:1045 (distar.5012)

## 如何开始 How it starts

拥有《遥远繁星》或 Biogenesis 时，银河生成一个“虚空孳孽系统”（guardians_init_hatchling，最多1个），其中有一颗虚空孳孽卵星球（rl_voidspawn_egg，标志 hatchling_egg，初始化时60%带 hatchling_will_trigger）。有人殖民该星球（on_colonized → distar.5000），约200-300天后触发 distar.5010；若只是占有系统而不殖民，月度检查 distar.5001 也会在约200-300天后直接启动第一阶段（distar.5002）。

With Distant Stars or Biogenesis the galaxy spawns a Voidspawn system (guardians_init_hatchling, at most one) with an egg planet (rl_voidspawn_egg, flag hatchling_egg; 60% get hatchling_will_trigger at spawn). When someone colonises it (on_colonized → distar.5000), distar.5010 fires after about 200-300 days; if they only own the system, the monthly check distar.5001 starts stage 1 (distar.5002) directly after about 200-300 days.

## 剧情脉络 Story outline

1. distar.5010“有脉搏的星球”：星球核心开始有规律地脉动。
2. 约100-150天后（distar.5002）：星球外观变化，获得三个 d_egg_cracking 矿藏和 seismological_phenomena 修正，所有者收到 distar.5003“异形魔怪”（地震）。
3. 此后二选一：约60%（hatchling_will_trigger）60-160天后进入 distar.5004/5005“大灾变”（第二阶段，毒气覆盖）；约40%则30-90天后收到 distar.5013“[hatchling_egg.GetName]上的地震活动”。
4. 大灾变之后60-150天：distar.5006 摧毁殖民地，星球变为 pc_egg_cracked 并获得 d_society_10 矿藏；所有者收到 distar.5007“起源”；70天后虚空孳孽（guardian_hatchling 国家与首领舰队）诞生并在系统中巡逻（distar.5008）。
5. 首次进入该星系 → distar.5011“虚空孳孽”（建立通讯，15天后 story.8）。击毁它 → distar.5009“虚空孳孽被击败”：三选项——a启用项目 SHATTERED_EGG（蛋壳碎片，→ distar.5012“超体进化”：科技 tech_gargantuan_evolution 30%，可收集 DNA）；b直接获得团结加成；死灵师可启用项目 REANIMATE_VOIDSPAWN → distar.5016“逝者复生”（一支复活的虚空孳孽舰队）。结束时开始“利维坦庆典”情境。
6. 另一支：蛋被打断（5013）后，清除蛋裂缝矿藏时 distar.5014 恢复星球外观并显示 distar.5015“完好如初”。

1. distar.5010 "A Planet with a Pulse": the planet's core starts pulsating at a steady pace.
2. About 100-150 days later (distar.5002): the planet's look changes, it gains three d_egg_cracking deposits and the seismological_phenomena modifier, and the owner gets distar.5003 "Tremors" (earthquakes).
3. Then one of two: about 60% (hatchling_will_trigger) go on 60-160 days later to distar.5004/5005 "Cataclysm" (stage 2, toxic gases); about 40% receive distar.5013 "Seismic Activity on [hatchling_egg.GetName]" (the quakes stop) after 30-90 days.
4. 60-150 days after the Cataclysm: distar.5006 destroys the colony, the planet becomes pc_egg_cracked with d_society_10 deposits, and the owner gets distar.5007 "Genesis"; 70 days later the Voidspawn (a guardian_hatchling country and boss fleet) is born and patrols the system (distar.5008).
5. Entering the system the first time → distar.5011 "Voidspawn" (contact established, story.8 15 days later). Destroying it → distar.5009 "Voidspawn Defeated": a starts project SHATTERED_EGG (egg shards → distar.5012 "Gargantuan Evolution": 30% of tech_gargantuan_evolution, DNA can be harvested), b takes the unity bonus directly; necromancers can start project REANIMATE_VOIDSPAWN → distar.5016 "Rise Again" (a reanimated Voidspawn fleet). It ends by starting a Leviathan celebration situation.
6. Side branch: after the egg is interrupted (5013), clearing the egg-crack deposits makes distar.5014 restore the planet's look and show distar.5015 "As Good as New".

## 分支与结局 Branches and outcomes

5003 之后“继续裂开”与“停止”互斥（约60/40，生成时决定）；击败后的 5009 选项 a/b/死灵师三选一；不是必须击败虚空孳孽——它只是巡逻的首领舰队。

After 5003 "keeps cracking" and "stops" are exclusive (about 60/40, decided at spawn); the 5009 options a / b / necromancer are alternatives; defeating the Voidspawn is optional — it is a boss fleet on patrol.

## 条件与文明差异 Conditions and variants

各通知事件（5003/5005/5007/5013）只发给蛋星球的所有者或系统所有者，正文随星球是否被殖民变化；5012/5016 的正文与选项随 DNA 收集能力、蜂巢/机械状态变化。

The notices (5003/5005/5007/5013) go only to the egg planet's or system's owner and their text depends on whether the planet is colonised; 5012/5016 vary with DNA harvesting and hive/machine status.

## 审阅记录 Review notes

已核对初始化器、on_colonized/on_monthly_pulse/on_entering_system_fleet/on_fleet_destroyed_perp 触发与 distar.5000–5016。修正：草稿把 5003/5005/5007/5013 都挂在 5010 下并归为同一互斥组，且把进入、击毁、复原各作独立故事（event-distar-5001/5009/5011/5014）；现合为一个以 distar.5010 为起点的故事，用审阅连接还原顺序（5003→5005→5007→5011→5009）并把 5013 作为与 5005 互斥的分支。distar.5000/5001/5002/5004/5006/5008/5014 是隐藏事件，不作为章节。

Checked the initializer, the on_colonized / on_monthly_pulse / on_entering_system_fleet / on_fleet_destroyed_perp hooks and distar.5000-5016. Correction: the draft hung 5003/5005/5007/5013 all under 5010 as one exclusive group and made entering, killing and restoring separate stories (event-distar-5001/5009/5011/5014); they are now one story from distar.5010 with reviewed links restoring the order (5003 → 5005 → 5007 → 5011 → 5009), with 5013 as the branch exclusive with 5005. distar.5000/5001/5002/5004/5006/5008/5014 are hidden events, not chapters.
