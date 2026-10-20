# 敌对舰船 / Hostile Vessels
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（pirates_stage_1/2）

## 如何开始 How it starts

与海盗（pirate）国家首次相遇，启动 pirates_stage_1（难度3）。 / Meeting a pirate country starts pirates_stage_1 (difficulty 3).

## 剧情脉络 Story outline

1. **敌对舰船（60）：过时但武装到牙齿的舰船；→ 第二阶段（难度5）。 / Hostile Vessels.**
2. **遇到海盗（65）：无法通讯，但可识别为海盗；唯一选项 pirate.5.a 并结束首次接触。 / Pirates identified; pirate.5.a.**

## 分支与结局 Branches and outcomes

线性，无分叉。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 阶段检定失败时：每次失败有 1/20 的概率触发该阶段指定的随机事件池（同一站点 125 天内最多一次）。 / Linear. The ending options call finish_first_contact_effect (first contact ends). When a stage roll fails there is a 1-in-20 chance to draw from the stage’s random-event pool (at most once per 125 days per site). (pool: early_fc_random_events / late_fc_random_events)

## 条件与文明差异 Conditions and variants

无文明差异。 / No variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:840-889` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:250-288`
- 已核对 Checked：60、65与两个阶段定义。/ Both events and stage definitions.
- 审阅改动 Changes：并 65 入本篇。/ 65 merged into this story.
