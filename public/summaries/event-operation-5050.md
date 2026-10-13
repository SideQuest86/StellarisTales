# 令人讨厌的反制措施 / Grisly Countermeasures

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 针对恒星基地的破坏行动（sabotage targeted，EF:2677-2694，权重1）。 sabotage targeted pool.
Pools containing it:
targeted sabotage operations.

## 剧情脉络 Story outline

5050：特工被基地内的防篡改装置重伤，但仍完成任务。a 安排撤离（有条件）/ b 没有他们也要继续 / c 撇清（取消行动，有很大几率不被发现；有破坏线人则必定不被发现；被发现时 → espionage.1070）。
5050: an operative is hurt by an anti-tampering device; extract, continue without, or disavow (-> espionage.1070).

## 分支与结局 Branches and outcomes

- c 之后进入侦测链。

## 条件与文明差异 Conditions and variants

- 仅针对恒星基地设施的破坏。

## 审阅记录 Review notes

- 已核对 Checked：5050 与池。
