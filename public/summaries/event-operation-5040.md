# 资源耗尽 / Drain on Resources

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 普通对普通（权重1，EF:2457）；低风险池。 regular -> regular.
Pools containing it:
regular -> regular.

## 剧情脉络 Story outline

5040：间谍首脑发现手下人员在贪污资源。a 严厉申斥 → 5041“特工尽了本分”或 5042“特工断绝关系”；b 处理掉这些特工；c 利用这点作优势。
5040: operatives are skimming resources; reprimand (-> 5041 toe the line / 5042 cut ties), dispose of them, or exploit it.

## 分支与结局 Branches and outcomes

- 5041 与 5042 互斥。

## 条件与文明差异 Conditions and variants

- 有犯罪类线人时的权重衰减不同（EF:2457-2475）。

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：5040-5042。
