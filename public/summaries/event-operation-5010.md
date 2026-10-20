# 被巡逻无人机拘押 / Apprehended by patrol drones
- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 普通对集体意识（权重1，行动 5010，EF:2508）；集体对集体意识（机械帝国除外，EF:2577）；低风险池中“普通对集体意识”（EF:2717）。
Pools containing it:
regular -> gestalt; gestalt -> gestalt (not for machine owners); low-stakes pool.

## 剧情脉络 Story outline

5010：特工被目标的巡逻无人机盯上。选项：a 寄望外交（友好程度越高越安全；可能引出 5035“扼杀”或 5011“外交解决”）；b 使用线人（行动恢复，直接 5011）。5035 之后同“特工受惊”。
5010: the operatives are noticed by patrol drones; (a) trust in diplomacy -> 5011 or the Snuffed Out chain, (b) use the Asset -> 5011.

## 分支与结局 Branches and outcomes

- a 选项三个版本按目标是否友好、是否有间谍网络等条件出现。

## 条件与文明差异 Conditions and variants

- 友好度越高越不容易出事。 The friendlier the target, the smaller the risk.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：5010、5011 与事件池条件。
