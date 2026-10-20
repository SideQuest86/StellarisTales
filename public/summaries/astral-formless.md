# 无形异使 / The Formless

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

“无形异使”系统位于银河核心，只能通过水晶球星系里的奇异虫洞进入。虫洞来自《晶体裂隙》：选择“打开传送门”（1020.a → 隐藏 1095，国家标记 `opened_wormhole_to_formless_system`，全局标记 `strange_wormholes_locked`）。任何国家的舰队从水晶球星系第一次穿过虫洞时（`on_entering_strange_wormhole`），触发 `astral_planes.3000`“我们在哪”（只触发一次），随即 3005 侵略者（“背道者”）的传讯。

The Formless system sits at the galactic core and can only be entered through the strange wormhole in the crystal sphere system. The wormhole comes from “The Crystal Rift”: choosing to open the doorway (1020.a → hidden 1095, country flag `opened_wormhole_to_formless_system`, global flag `strange_wormholes_locked`). The first fleet of any country passing through it from the crystal sphere system (`on_entering_strange_wormhole`) fires `astral_planes.3000` “Where Are We?” (once), then 3005, the transmission of the invaders (the “Aberrant”).

## 剧情脉络 Story outline

1. 3000 → 3005：八支侵略者侦察舰队守在系统里（初始化时生成，各 5 艘）。
2. 击毁全部八支后 2 天，3015“信使”→ 3020 无形者的传讯：启动情境“封印”（`situation_the_seal`）。
3. 封印：单阶段 100 进度；每 12 个月侵略者增援一支舰队，无形者派出防卫舰队；每击毁一支侵略者舰队进度 +5（`3025`）；方法：不做事 / 编织星界织物（10 星界丝缕）/ 注入奇异气体（50 奇异气体）。侵略者仍有舰队时进度停在 95。
4. 完成 → `astral_situation.15`：侵略者国家被消灭，系统中生成盖亚星球，奇异虫洞解锁（所有玩家 1 天后收到 `astral_planes.50`），1 天后 3099 → 3100。
5. 3100：对话（你是什么 / 为何在此 / 王座）之后：臣服（→ 成功 3101 附庸 / 失败 3102 战争）、索要王座（→ 3102 战争）或结盟（聘用领袖，→ 外交窗口 3110）。
6. 战争（3150 隐藏）：无形者获防卫舰队，每 360 天增援；盟友领袖离开（3155）。无形者的锚被摧毁时 3165 给予遗珍“永恒王座”与 1000 星界丝缕。

1. 3000 → 3005: eight invader scout fleets (5 ships each) wait in the system.
2. Two days after all eight are destroyed, 3015 “The Messengers” → 3020 the Formless transmission: the situation “The Seal” (`situation_the_seal`) starts.
3. The Seal: one stage of 100 progress; every 12 months the invaders reinforce and the Formless send a defense fleet; each invader fleet destroyed adds 5 (`3025`); methods: do nothing / weave astral fabric (10 astral threads) / pump exotic gases (50 exotic gases). Progress stalls at 95 while the invaders have fleets.
4. Completion → `astral_situation.15`: the invader country is destroyed, a Gaia planet is spawned, the wormhole is unlocked (every player gets `astral_planes.50` a day later), and a day later 3099 → 3100.
5. 3100: after the dialogue (what are you / why are you here / the Throne): submit (→ success 3101 subject / failure 3102 war), demand the Throne (→ 3102 war) or ally (hire the leader, → diplomacy window 3110).
6. War (hidden 3150): the Formless gain defense fleets with reinforcements every 360 days; the allied leader leaves (3155). When the Formless anchor is destroyed 3165 grants the relic “Eternal Throne” and 1000 astral threads.

## 分支与结局 Branches and outcomes

- 封印失败：封印期间锚被摧毁 → 情境中止，3070：无形者被侵略者毁灭，系统被摧毁，虫洞封闭。
- 3101 臣服成功（权重 75，加完成的裂隙探索次数；25 失败）：新的“无形异使”国家成为附庸，遗珍“永恒王座”。
- 结盟（3100.f）：领袖“乍狄伽”（不朽、杰出级）；3110 每 3600 天可选力量（16 艘巡洋舰）/ 知识（随机物理科技）/ 织缕（100 星界丝缕）；还可花 2000 星界丝缕换取针对破界者 / 背道者 / 暴烈者的修正（3114–3116）。领袖遇上这三类存在时各有一次叙事事件（3121–3123）。
- 战争：见上；无形者在没有敌对的玩家国家时自毁（3160，若有强制友好者则只是停战）。

- Seal fails: if the anchor is destroyed during the Seal the situation aborts and 3070: the Formless are destroyed by the invaders, the system is destroyed and the wormhole closes.
- 3101 subjugation succeeds (weight 75 plus rift explorations completed; 25 fails): a new Formless country becomes a subject, with the relic Eternal Throne.
- Alliance (3100.f): the leader “zadigal” (immortal, renowned); every 3600 days 3110 offers power (16 cruisers) / knowledge (a random physics tech) / fabric (100 astral threads); 2000 astral threads also buy a modifier against the Unbidden / Aberrant / Vehement (3114–3116). The leader meets each of the three once (3121–3123), narrative only.
- War: as above; the Formless destroy themselves when no hostile playable country remains (3160; a forced-friendly one only stops the war).

## 条件与文明差异 Conditions and variants

- 3100.d 臣服：仅限非狂暴灭绝者且无宗主。
- 3050（封印完成前，任何国家）：花 100 星界丝缕让其生成防卫舰队，至多 2 支；3170：从未打开虫洞的国家只能告别。
- 外交窗口版本由 `on_custom_diplomacy` 依次选择（3050、3100、3110、3170）。

- 3100.d submission: only non-homicidal empires without an overlord.
- 3050 (before the Seal is set, any country): 100 astral threads buy a defense fleet, at most 2; 3170: a country that never opened the wormhole can only say goodbye.
- `on_custom_diplomacy` picks the diplomacy window in turn (3050, 3100, 3110, 3170).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（全篇 whole story；原先分散的触发器故事 3000、3010、3050、3065、3110、3120、3170 已并入 / the former trigger stories merged in）
- 来源 Sources：`events/astral_planes_events.txt:1871–3496`（3000–3170）；`events/astral_planes_situation_events.txt:78–169`；`common/situations/06_astral_planes_situations.txt:357–525`；`common/solar_system_initializers/astral_planes_initializers.txt:2–260`
- 已核对：上述事件与情境、无形者系统初始化（侦察舰队、国家变量）、`on_actions`（entering_strange_wormhole、fleet_destroyed_victim、custom_diplomacy、country_attacked、leader_death、entering_battle、country_destroyed）与 `schedule_next_formless_reward`（3600 天）。更正：编译器把 3000、3010（信使）、3050、3065、3110、3120、3170 各作为独立故事；现合为一个家族，补了 7 条桥接与 3 个互斥组。
- 不确定：三种异维度存在的名称与国家类型 `extradimensional(_2/_3)` 的对应取自 3110.e/f/g 的本地化；时间线事件 `timeline.65` 与遗珍“永恒王座”的效果未核对（不属于 C4）。

- Checked: the events and situation above, the Formless system initializer (scouts, country variables), the `on_actions` (entering_strange_wormhole, fleet_destroyed_victim, custom_diplomacy, country_attacked, leader_death, entering_battle, country_destroyed) and `schedule_next_formless_reward` (3600 days). Correction: the compiler had separate stories for 3000, 3010 (the messengers), 3050, 3065, 3110, 3120 and 3170; they are now one family with seven bridges and three exclusive groups.
- Uncertain: the names of the three extradimensionals and their mapping to country types `extradimensional(_2/_3)` come from the localisation of 3110.e/f/g; the timeline event `timeline.65` and the effects of the relic Eternal Throne were not checked (outside C4).
