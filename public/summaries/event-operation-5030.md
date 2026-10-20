# 多余的噪声 / Excess Noise

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 机械对机械（权重1，EF:2613）；低风险池。 machine -> machine.
Pools containing it:
machine -> machine.

## 剧情脉络 Story outline

5030：目标国的电磁噪声让伪装无人机数据丢失。a 研究 → 项目 NOISE_OPERATION_PROJECT：成功 5031 / 失败 5032；b 加速前进。
5030: research (project -> 5031 solved / 5032 persists) or press on.

## 分支与结局 Branches and outcomes

- 5031 与 5032 互斥。

## 条件与文明差异 Conditions and variants

- 仅机械对机械。

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：5030-5032、项目 NOISE_OPERATION_PROJECT（00_projects_nemesis.txt:34-60）。
