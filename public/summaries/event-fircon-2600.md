# 行星际飞行 / Interplanetary Flight

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/first_contact_dlc_events.txt:5972-6489`；common/on_actions/00_on_actions.txt:140-201（每月观测事件池）；`events/first_contact_dlc_situation_events.txt:316-376`（preftl.50）；`common/on_actions/00_on_actions.txt`（on_fleet_enter_orbit → fircon.2610）

## 如何开始 How it starts

- 被观测的前超光速文明的“科技进步”局势每月有 5/100 的机会运行 preftl.50（之后 1800 天冷却），从每月观测事件池中按权重抽取一个条件满足的事件；本事件权重 20。
  The observed pre-FTL civilization's tech-progress situation has a 5/100 monthly chance to run preftl.50 (then an 1800-day cooldown), which draws one valid event from the monthly observation pool by weight; this event has weight 20.
- 条件：早期太空时代，以被动观察、样本采集或游牧中继站观测；母星系中有可作为目标的无人行星；全银河同时只有一次飞行；每个前超光速文明一次（并设置“推进力学支持者宣言”的标记，两者互斥）。延迟 5–30 天。
  Conditions: Early Space Age, observed with Passive Observation, Specimen Collection or a nomad waystation; an uninhabited planet in their home system to fly to; only one flight in the galaxy at a time; once per pre-FTL civilization (it also sets the "Propulsion Proponent Proclamation" flag, so the two are exclusive). 5-30-day delay.
- 隐藏分派事件设置一次性标记，然后在 0–25 天后向观测哨站拥有者（及游牧中继站观察者）发出可见事件。
  The hidden dispatcher sets a once-only flag and sends the visible event to the observation post owner (and nomad waystation observers) after 0-25 days.

## 剧情脉络 Story outline

- 2605「行星际飞行」：他们发射第一艘载人行星际飞船，飞向本星系另一颗行星。
  2605 "Interplanetary Flight": they launch their first crewed interplanetary ship toward another planet of their system.
- 60 天后 2620「（首都），我们遇到麻烦了」：飞船机械故障失去动力。选项：（非敌视）把船员救走 → 5 天后 2625「救回船员」（留下他们，或冒险送回）；（对其有≥20间谍力量的间谍网络）派特工植入方案，或（无此网络，花费100影响力、+15觉察度）在航天中心留下方案 → 5 天后 75% 2635 / 25% 2630；（灵能物种）修好飞船并抹除记忆；或任其自救 → 5 天后 25% 2635 / 75% 2630。
  60 days later 2620 "(capital), We Have a Problem.": a mechanical failure leaves the ship dead in space. Options: (not unfriendly) take the crew off → 5 days later 2625 "Crew Retrieved" (keep them, or risk sending them home); (spy network on them with ≥20 spy power) have agents plant a solution, or (without one; 100 influence, +15 awareness) leave a message near their space center → 5 days later 75% 2635 / 25% 2630; (psionic species) repair the ship and wipe their memories; or let them figure it out → 5 days later 25% 2635 / 75% 2630.
- 2630「任务重大失败」：无人生还，他们的科技进步 -20%。2635「奇迹般的修复」：船员修好推进器继续航行；抵达目标行星轨道后（on_fleet_enter_orbit → 隐藏 2610）星系所有者收到 2615「达阵」：科技进步 +20%。
  2630 "Critical Mission Failure": no survivors; their tech progression -20%. 2635 "Miraculous Repair": the crew fixes the thrusters and flies on; on reaching orbit of the target (on_fleet_enter_orbit → hidden 2610) the system owner gets 2615 "Touchdown": tech progression +20%.

## 分支与结局 Branches and outcomes

- 救回（2625）、失败（2630）、修复后着陆（2635→2615）、灵能修复后着陆（2620.d→2615）互斥。
  Rescue (2625), failure (2630), repair then touchdown (2635→2615) and psionic repair then touchdown (2620.d→2615) are exclusive.
- 这是随机观测插曲：只在满足条件时可能出现，彼此之间没有固定顺序。
  This is a random observation interlude: it may appear only when its conditions hold, with no fixed order relative to other interludes.

## 条件与文明差异 Conditions and variants

- 2605、2625 正文按被观测者是否为格式塔分两种；2605 的确认措辞按是否敌视。
  2605 and 2625 have regular and gestalt texts; 2605's closing line depends on whether the empire is unfriendly.

## 审阅记录 Review notes

- 已核对：2600–2635 全部事件、飞船行动队列与入轨回调。
  Checked: all events 2600-2635, the ship's action queue and the orbit callback.
- 更正：原“达阵”2610/2615 为独立卡片，现并入本故事，接在 2635 与 2620 的灵能选项之后。
  Correction: "Touchdown" 2610/2615 was a separate card; it is merged here after 2635 and 2620's psionic option.
- 不确定：若飞船在 60 天内已入轨，2615 可能先于 2620 出现；本地无法验证引擎中飞船的实际航行时间。
  Uncertain: if the ship reaches orbit within 60 days, 2615 could precede 2620; the actual in-system travel time could not be verified from scripts.
