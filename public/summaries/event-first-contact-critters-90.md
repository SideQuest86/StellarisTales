# 未知舰船 / Unknown Vessels
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（nomad_stage_1/2）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:1164-1251` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:415-452`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

与游牧民（nomad）国家首次相遇，启动 nomad_stage_1（难度3）。 / Meeting a nomad country starts nomad_stage_1 (difficulty 3).

## 剧情脉络 Story outline

1. **不明舰船（90）：看似远征队，不具敌意；→ 第二阶段（难度7）。 / Unknown Vessels.**
2. **游牧民（95）：译出对方的欢迎讯息；结束首次接触。 / The Nomads.**

## 分支与结局 Branches and outcomes

线性，无分叉。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 阶段检定失败时：每次失败有 1/20 的概率触发该阶段指定的随机事件池（同一站点 125 天内最多一次）。 / Linear. The ending options call finish_first_contact_effect (first contact ends). When a stage roll fails there is a 1-in-20 chance to draw from the stage’s random-event pool (at most once per 125 days per site). (pool: early_fc_random_events / late_fc_random_events)

## 条件与文明差异 Conditions and variants

无文明差异。 / No variants.

## 审阅记录 Review notes

- 已核对 Checked：90、95与两个阶段定义。/ Both events and stage definitions.
- 审阅改动 Changes：并 95 入本篇。/ 95 merged into this story.
