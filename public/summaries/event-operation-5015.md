# 多相力场 / Multi-Phasic Force Fields

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 集体对普通（权重1，EF:2556）；低风险池。 gestalt -> regular; low-stakes pool.
Pools containing it:
gestalt -> regular.

## 剧情脉络 Story outline

5015：无人机进入目标国高安全区域时受力场干扰，可能失去据点。a 适应（成败取决于相对科技等级）→ 5016“多相力场”（完全失联），或成功；b 反向利用对方硬件（耗线人，行动继续）。5016 可能给出“意外收获”espionage.1040。
5015: (a) adapt -> 5016 contact lost (or success by relative tech), (b) use the Asset to turn their hardware against them.

## 分支与结局 Branches and outcomes

- 5016 与 a 成功互斥。

## 条件与文明差异 Conditions and variants

- b 选项需要线人。

## 审阅记录 Review notes

- 已核对 Checked：5015、5016。
