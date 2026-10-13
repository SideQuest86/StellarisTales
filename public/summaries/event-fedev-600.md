# 即将进行的试点：物流重构 / Upcoming Trial: Logistics Remodelling

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/federations_events_1.txt:2872-3306`；`common/on_actions/00_on_actions.txt:305`

## 如何开始 How it starts

- 每十年（on_decade_pulse，00_on_actions.txt:305）隐藏 fedev.600：游戏进行满一年，有贸易联邦成员拥有产贸易≥100的殖民地、不在交战，且联邦没有 logistic_remodel_* 标志。
  Every decade (on_decade_pulse, 00_on_actions.txt:305) hidden fedev.600: more than one year into the game, a trade federation member has a colony producing 100+ trade, is not at war, and the federation has no logistic_remodel_* flag.

## 剧情脉络 Story outline

- 605「即将到来的试验：物流重塑」→ 540+随机180天后 611（隐藏）：若为试验参与者 → 615「参与获批」（启用“物流重塑”项目，有离世贸易公司星港则启用离世版本，并获得 process_sharing / cost_of_progress 修正）；否则 620「参与被拒」。
  605 "Upcoming Trial: Logistics Remodelling" -> hidden 611 after 540 days (+ random 180): if a trial participant -> 615 "Trial Participation - Granted" (enables the "Logistical Remodelling" project, or the off-world version with an Offworld Trading Company starbase, with process_sharing / cost_of_progress modifiers); otherwise 620 "Participation - Denied".
- 项目成功 → 625「重塑完成」；失败 → 635「最顺滑的旅程」/640「成功的试验」/645「可悲的参与」之一，并按结果给 fully_streamlined / streamlined 物流修正或移除负面修正。
  Project success -> 625 "Remodelling Complete"; failure -> one of 635 "Smoothest of Rides" / 640 "Successful Trial" / 645 "Pathetic Participation", granting the fully_streamlined / streamlined logistics modifier or removing the penalties.
- fedev.630 在5400天后收尾（隐藏）。
  Hidden fedev.630 closes the trial after 5400 days.

## 分支与结局 Branches and outcomes

- 615 与 620 互斥；635/640/645 互斥。
  615 and 620 are exclusive; 635/640/645 are exclusive.

## 条件与文明差异 Conditions and variants

- 离世贸易公司星港影响项目版本。
  An Offworld Trading Company starbase changes the project variant.

## 审阅记录 Review notes

- 已核对：触发、611 衔接、项目与结果。
  Checked: trigger, the 611 link, project and outcomes.
