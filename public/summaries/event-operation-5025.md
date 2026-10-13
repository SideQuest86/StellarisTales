# 有毒的现场作业 / Toxic Field Work

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 集体对集体且双方都是蜂巢（权重1，EF:2599）；低风险池（蜂巢对蜂巢）。 hive -> hive.
Pools containing it:
hive -> hive.

## 剧情脉络 Story outline

5025：目标栖息地对无人机轻度有毒。a 研究解决办法 → 特殊项目 TOXIC_OPERATION_PROJECT：成功 5026“缓解”（行动继续）或超时失败 5027“有毒的现场作业继续”（该国行动更困难一段时间）；b 加速前进（风险：对该国的所有行动一段时间更难）。
5025: research a remedy (project -> 5026 remedy / 5027 persists) or press on (operations against that empire harder for a while).

## 分支与结局 Branches and outcomes

- 5026 与 5027 互斥（项目成功 / 失败）。

## 条件与文明差异 Conditions and variants

- 仅蜂巢对蜂巢。

## 审阅记录 Review notes

- 已核对 Checked：5025-5027、项目 TOXIC_OPERATION_PROJECT（00_projects_nemesis.txt:4-30）。
