# 特工叛逃 / Operative Defects

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 普通对普通/集体意识（目标不能是灭绝者，EF:2476、2531）；深度潜伏池。 regular -> any (not homicidal targets); deep-cover pool.
Pools containing it:
regular -> any (not homicidal targets).

## 剧情脉络 Story outline

5045：特工叛逃至目标国。a 听之任之 / b 整顿纪律（目标有间谍网络时可能被警告，若目标的破译优于我们的加密还会识别出我们）→ espionage.1070 “发现敌对渗透”或 1081/1082 “发现阴谋”；c 撇清。
5045: an operative defects; the target may be warned and may identify us (espionage.1070 / 1081 / 1082).

## 分支与结局 Branches and outcomes

- 侦测链为共享文档，结果取决于对方的间谍网络与破译/加密对比。

## 条件与文明差异 Conditions and variants

- 灭绝者目标不会触发此事件。

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：5045 与池条件；后续属“侦测”链。
