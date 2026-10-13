# 特工受惊 / Operative Spooked

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/scripted_effects/espionage_event_effects.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

行动失手随机事件：间谍行动某一阶段的检定失败时，on_roll_failed 调用 standard_espionage_operation_on_roll_failed（common/scripted_effects/espionage_event_effects.txt:2331-2386）：每次失败有 1/40 的几率（39:1）从该行动类型指定的事件池中抽一件，且同一行动 90 天内只触发一次。事件池按双方帝国类型（普通/集体意识）选择（:2390-2821）。
Mishap: when an operation stage roll fails, on_roll_failed calls standard_espionage_operation_on_roll_failed, which has a 1-in-40 chance to draw one event from the pool named by the operation type (at most one per 90 days per operation); pools are chosen by empire kinds.
本事件进入的事件池：
- 普通对普通（权重1），行动 5005。 regular -> regular (weight 1; EF:2434).
Pools containing it:
regular -> regular.

## 剧情脉络 Story outline

5005 “特工受惊”：特工担心暴露，间谍首脑请求更多资源。选项：a 驳回 / b 追加资源 → 两者都可能进入 5035“扼杀”（特工失联，选择“照办”或“撇清”；之后 5036 潜伏成功 / 5037 行动暴露，或被目标发现 espionage.1070…）；c 贿赂（按条件三种）；d 使用线人（行动继续）。
5005: the spymaster asks for more resources. (a) deny / (b) pay -> both can lead to 5035 Snuffed Out (-> 5036 cover-up, 5037 exposed, or the target's detection chain espionage.1070 ...); (c) bribery; (d) use the Asset.

## 分支与结局 Branches and outcomes

- 5035 之后的结果取决于加密/破译对比，见该事件。 After 5035 the result depends on Encryption vs Codebreaking.

## 条件与文明差异 Conditions and variants

- c 选项有三种版本（按资源/条件）。 Option c has three conditional versions.

## 审阅记录 Review notes

- 已核对 Checked：5005 的选项与 5035-5037 的衔接；5035 及 espionage.1070-1073 是共享文档（属于侦测链）。 5035-5037 and espionage.1070-1073 are shared docs of the detection chain.
