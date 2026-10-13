# 失去联络 / Contact Lost

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 普通对普通（权重2，最高）、普通对集体意识（权重1），行动 5000。 regular->regular (weight 2) and regular->gestalt (1); recent timer x0.1 (EF:2427, 2501).
Pools containing it:
regular -> regular (weight 2), regular -> gestalt (weight 1).

## 剧情脉络 Story outline

5000 “失去联络”：间谍首脑与在目标国的行动人员失联，是否寻找。选项：a 寻找（暂停行动约一个月，成功率取决于目标的加密等级）→ 重新联系 5001 或确认失踪 5002，也可能“意外收获”espionage.1040（获得新线人）；b 弃权（静默取消行动，不消耗线人）；c 动用本地线人 → 5001。
5000 Contact Lost: (a) search (pauses the operation about a month; odds depend on the target's Encryption) -> 5001 re-established / 5002 confirmed lost, or the lucky catch espionage.1040; (b) disavow (silently cancel); (c) use the local Asset -> 5001.

## 分支与结局 Branches and outcomes

- 5001 与 5002 互斥（找回 / 确认失踪）。 5001 and 5002 are exclusive.

## 条件与文明差异 Conditions and variants

- 选项 c 需要有本地线人。 Option c needs an Asset.

## 审阅记录 Review notes

- 已核对 Checked：5000-5002、espionage.1040 的触发与事件池权重。
