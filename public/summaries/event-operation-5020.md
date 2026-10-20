# 误作美食 / Mistaken for Food

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 集体对集体意识（目标不能是机械帝国，权重1，EF:2588）。低风险池中该项错误地调用了 5030 而不是 5020（EF:2765-2780）——脚本疑似笔误。 gestalt -> gestalt (target not machine). The low-stakes pool calls 5030 for it instead of 5020 (EF:2765-2780): a probable script slip.
Pools containing it:
gestalt -> gestalt (not machine targets).

## 剧情脉络 Story outline

5020：目标的原始本能把无人机当成食物。选项：a 引开它（有两种版本）/ b 继续前进，适应生存 / c 猎杀猎手，部署战士无人机（耗线人，行动继续）。单页事件，没有后续事件。
5020: a primal target fixates on the drones; lure it away, keep moving, or use the Asset. No follow-up events.

## 分支与结局 Branches and outcomes

- 无后续。

## 条件与文明差异 Conditions and variants

- 目标须为有机体集体意识，且出手方为集体意识。 Hive target, gestalt owner.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：5020 与池权重；“低风险池调用 5030”记为不确定。
