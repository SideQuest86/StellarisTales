# 相变星球 / Phased Planet

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:3947 (distar_phaseshift_system); common/on_actions/00_on_actions.txt:11 (distar.252); events/distant_stars_events_1.txt:9485 (distar.252); common/on_actions/00_on_actions.txt:1152; events/distant_stars_events_1.txt:9655-9686 (distar.256); common/anomalies/95_anomaly_categories_distant_stars.txt:801-862; events/distant_stars_events_1.txt:9268 (distar.250); events/distant_stars_events_1.txt:9318 (distar.251); events/distant_stars_events_1.txt:9387 (distar.302); events/distant_stars_events_1.txt:9451 (distar.303); common/on_actions/00_on_actions.txt:1934, 4189; events/distant_stars_events_1.txt:9568-9603 (distar.254); events/distant_stars_events_1.txt:9606 (distar.255); common/special_projects/00_projects_distant_stars.txt:617 (PHASESHIFT_PROJECT); events/distant_stars_events_1.txt:9505 (distar.253); events/distant_stars_events_1.txt:9689 (distar.258)

## 如何开始 How it starts

《遥远繁星》专属星系 distar_phaseshift_system 中有一颗每三个月在“遮蔽世界”与盖亚世界之间相变的星球（开局 distar.252 启动循环）。第一个勘察它的帝国通过隐藏事件 distar.256（on_survey_planet）得到10级异常“相变星球”；之后再勘察的帝国只收到通知 distar.258。

The Distant Stars system distar_phaseshift_system has a planet that phase-shifts between a Shrouded World and a Gaia World every three months (the cycle starts with distar.252 at game start). The first empire to survey it gets the level-10 anomaly "Phased Planet" through the hidden distar.256 (on_survey_planet); later surveyors only get the notice distar.258.

## 剧情脉络 Story outline

1. 异常结果按调查时的状态三选一（各基础权重0，满足条件+1）：不拥有该星系且仍在相变 → distar.250，报告中途中断，1天后 distar.251 目睹星球相变；本帝国已拥有该星系且仍在相变 → distar.302；已被任何帝国锁定 → distar.303。三者都把星球命名为“面纱”(The Veil) 并给予物理学研究。
2. 任一帝国在该星系建成前哨或获得星系（on_building_starbase_outpost / on_starbase_transfer），隐藏 distar.254 在1天后给它 distar.255，并中止其他帝国的同名项目。
3. distar.255 选择锁定 → PHASESHIFT_PROJECT（180天，科研船+科学家）→ distar.253“相位锁定”：星球永久成为盖亚世界并获得一组矿藏；或放弃（获得影响力）。

1. The anomaly result depends on the state when researched (each base weight 0, +1 when its condition holds): system not ours and still shifting → distar.250, whose report breaks off, then distar.251 a day later witnesses the shift; system ours and still shifting → distar.302; already locked by anyone → distar.303. All three name the planet "The Veil" and give physics research.
2. When any empire builds an outpost in or acquires the system (on_building_starbase_outpost / on_starbase_transfer), the hidden distar.254 gives it distar.255 a day later and aborts other empires' identical projects.
3. distar.255: lock it → PHASESHIFT_PROJECT (180 days, science ship + scientist) → distar.253 "Phase Lock": the planet becomes a Gaia World permanently with a set of deposits; or decline (influence).

## 分支与结局 Branches and outcomes

异常的三个结果互斥（由星球与星系归属决定，不是随机）；distar.255 的两个选项互斥。锁定只能由一个帝国完成。

The three anomaly results are mutually exclusive (decided by planet/system state, not chance); distar.255's two options are exclusive. Only one empire can complete the lock.

## 条件与文明差异 Conditions and variants

distar.251 正文按相变方向（变为盖亚或变为遮蔽）二选一；distar.302 按是否已有锁定项目二选一；distar.255 按是否已勘察过该星球二选一；事件图片随星球当前类型变化。

distar.251 has two texts by shift direction; distar.302 two texts by whether the lock project is already active; distar.255 two texts by whether the planet was surveyed; pictures follow the planet's current class.

## 审阅记录 Review notes

已核对初始化、distar.250–258、302、303、项目、on_survey_planet、on_building_starbase_outpost 与 on_starbase_transfer。修正：草稿把异常、星系占领后的项目链（event-distar-254）和后到者通知（event-distar-256）拆成三个故事；现合并，异常结果标为条件互斥，并以审阅连接表示“占领星系后”。

Checked the initializer, distar.250–258, 302, 303, the project and the on_survey_planet / on_building_starbase_outpost / on_starbase_transfer hooks. Correction: the draft split the anomaly, the system-claim project chain (event-distar-254) and the late-surveyor notice (event-distar-256) into three stories; merged, with the anomaly results marked as condition-exclusive and reviewed links for "after claiming the system".
