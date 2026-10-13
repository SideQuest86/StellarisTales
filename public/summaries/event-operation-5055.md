# 信任危机 / Confidence Wavers

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 几乎所有行动池都含有此事件（EF:2487、2542、2563、2633、2665、2686、2813），权重1。 present in almost every pool.
Pools containing it:
present in almost every pool.

## 剧情脉络 Story outline

5055：辅助特工对任务信心动摇。a 割舍他们（有条件）/ b 听听这些“洞见”→ 5056“打破砂锅问到底”（真相使辅助特工格外卖力，奖励）或 5057“惊慌失措的特工”（惊恐破坏补给线，惩罚）。
5055: auxiliaries lose confidence; cut them loose, or listen -> 5056 (they redouble effort) or 5057 (they panic).

## 分支与结局 Branches and outcomes

- 5056 与 5057 互斥。

## 条件与文明差异 Conditions and variants

- 目标可能是国家或恒星基地（文本两种）。

## 审阅记录 Review notes

- 已核对 Checked：5055-5057。
