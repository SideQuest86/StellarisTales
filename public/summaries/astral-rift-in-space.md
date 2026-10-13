# 空间裂隙 / A Rift in Space

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:637–706, 1157–1515, 3825–3960`；`events/astral_planes_situation_events.txt:171–465`；`common/situations/06_astral_planes_situations.txt:1–148`
- 审阅 Reviewed：2026-10-13（全篇 whole story；原先的触发器故事 7、118、119、5055、5060 已并入 / the former trigger stories merged in）

## 如何开始 How it starts

这是玩家第一次接触星界裂隙的引导：一个裂隙出现在（或被并入）自己的星系时开始情境“空间裂隙”。隐藏事件有几条触发路径：

- 新裂隙生成：`astral_planes.7`（`on_astral_rift_spawned`，`00_on_actions.txt:4973`）；游牧帝国对应 `5055`（裂隙星系里有航站）。
- 获得含有裂隙的星系：`astral_planes.118`（`on_system_gained`，`:4256`）；游牧帝国在已有裂隙的星系建航站：`5060`。
- 在星界疤痕星球上建研究站（`on_building_research_station` → `115`）：1440 天 + 最多 720 天后（裂隙世界起源为 10080 + 1440）`116` 把一个星界疤痕撕开成裂隙；若暂时没有疤痕，则设标记等待，`117`（`on_system_gained`）在 180 天后重试。

条件：国家尚未完成过该情境，也没有、且没有在研究科技“裂隙探球”。裂隙世界起源的帝国看到“抵近裂隙”（101），其他帝国看到“空间裂隙”（100）。

This is the introduction to astral rifts: when a rift appears in (or is brought into) your territory the situation “A Rift in Space” starts. The hidden triggers: a new rift spawns (`astral_planes.7`, `on_astral_rift_spawned`; nomads: 5055 for a waystation in the system), a system containing a rift is gained (`118`, `on_system_gained`; nomads building a waystation in a system that has a rift: `5060`), or a research station on an astral scar planet (`115`) leads, 1440 days plus up to 720 later (Riftworld 10080 + 1440), to `116` splitting a scar into a rift; if no scar exists a flag waits and `117` retries after 180 days. Condition: the empire has not completed the situation and neither owns nor is researching the Rift Sphere technology. Riftworld-origin empires see “Reaching Into the Rift” (101), everyone else “A Rift in Space” (100).

## 剧情脉络 Story outline

1. 100 / 101：发现裂隙 → 开始情境“空间裂隙”（`situations:situation_a_rift_in_space`），目标是该裂隙。
2. 情境分两个阶段（进度 50 / 100），每月基础进度 1，三种方案：标准（−0.5）、投入研究（+0.2，物理研究减产，凝聚力 +10%）、派出探测器（+0.2，合金减产，物理 +10%，凝聚力 +25%）。
3. 采用非标准方案研究满一个月且进入第二阶段后，隐藏链 25 → 30 → 35 触发一次“不稳定的时空”（55 / 60 / 65，只对非游牧帝国）；未触发时每 360 天重试。
4. 完成情境：`astral_situation.20` “摩擦问题”：国家标记 `has_completed_a_rift_in_space_situation`，100 星界丝缕，科技“裂隙探球”获得 25% 进度。研究完成时 `2005` 解释探球。
5. 若裂隙所在星系丢失，`119` → `120` 锁定情境，直到再得到一个裂隙。

1. 100 / 101: the rift is discovered → the situation “A Rift in Space” starts, targeting that rift.
2. Two stages (progress 50 / 100), base progress 1 per month, three approaches: standard (−0.5), devote research (+0.2, less physics research, unity +10%), send probes (+0.2, fewer alloys, physics +10%, unity +25%).
3. After a month on a non-standard approach and in stage 2, the hidden chain 25 → 30 → 35 fires one “Unstable Spacetime” event (55 / 60 / 65, non-nomadic empires only); it retries every 360 days until one has fired.
4. Completion: `astral_situation.20` “Friction Is the Problem”: country flag `has_completed_a_rift_in_space_situation`, 100 astral threads, 25% progress on the Rift Sphere technology. `2005` explains the Sphere when it is researched.
5. If the rift's system is lost, `119` → `120` locks the situation until another rift is gained.

## 分支与结局 Branches and outcomes

“不稳定的时空”三选一（各权重 50，另有“什么都不发生”权重 max(0, 80 − 情境进度)）：55 在裂隙星系出现一颗有前FTL文明的新行星；60 在最近的己方殖民地凭空出现一个新物种；65 使最近己方殖民地时间加速 360 天。

“Unstable Spacetime” picks one of three (weight 50 each, plus a “nothing” entry with weight max(0, 80 − situation progress)): 55 a new pre-FTL planet appears in the rift's system; 60 a new species materialises on the nearest owned colony; 65 time runs fast on the nearest owned colony for 360 days.

## 条件与文明差异 Conditions and variants

- 裂隙世界起源：101 取代 100，10080 天延时，且 `astral_planes.7` 排除 `riftworld_rift`。
- 游牧帝国：使用 5055 / 5060；不会得到 55 / 60 / 65。
- 55 / 60 / 65 的正文共用一段开头（`astral_rift_discovery_event_text`）。

- Riftworld origin: 101 replaces 100, the scar delay is 10080 days, and `astral_planes.7` excludes `riftworld_rift`.
- Nomads use 5055 / 5060 and never get 55 / 60 / 65.
- 55 / 60 / 65 share an intro text (`astral_rift_discovery_event_text`).

## 审阅记录 Review notes

- 已核对：上述事件、情境定义、`on_actions` 条目、`rift_in_space_event_probability` 脚本值。更正：编译器把 7、118、119、5055、5060 当作互不相干的独立故事；现在合为一个家族，并补两条桥接（2005、120）与互斥组。
- 不确定：“什么都不发生”的权重按脚本字面解读（base 100 − 情境进度 − 20），未验证引擎对 `situation_progress` 单位的处理。

- Checked: the events above, the situation definition, the `on_actions` entries and the `rift_in_space_event_probability` script value. Correction: the compiler treated 7, 118, 119, 5055 and 5060 as unrelated stories; they are now one family with two bridges (2005, 120) and an exclusive group.
- Uncertain: the “nothing” weight follows the script literally (base 100 − situation progress − 20); the engine's unit for `situation_progress` was not verified.
