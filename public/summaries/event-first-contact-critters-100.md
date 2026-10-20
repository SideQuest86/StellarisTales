# 未知舰船 / Unknown Vessels
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（neutrals_stage_1/2）

## 如何开始 How it starts

与中立势力（neutral_faction）首次相遇，启动 neutrals_stage_1（难度2）。 / Meeting a neutral faction starts neutrals_stage_1 (difficulty 2).

## 剧情脉络 Story outline

1. **不明舰船（100）：不具攻击性的陌生舰队；→ 第二阶段（难度4）。 / Unknown Vessels.**
2. **中立舰队（105）：对方无视大部分外交示好，表明自己是超然于银河文明的中立实体；结束首次接触。 / Neutral Fleet.**

## 分支与结局 Branches and outcomes

线性，无分叉。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 阶段检定失败时：每次失败有 1/20 的概率触发该阶段指定的随机事件池（同一站点 125 天内最多一次）。 / Linear. The ending options call finish_first_contact_effect (first contact ends). When a stage roll fails there is a 1-in-20 chance to draw from the stage’s random-event pool (at most once per 125 days per site). (pool: enigmatic_fc_random_events)

## 条件与文明差异 Conditions and variants

无文明差异。 / No variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:1252-1307` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:291-329`
- 已核对 Checked：100、105与两个阶段定义。/ Both events and stage definitions.
- 审阅改动 Changes：并 105 入本篇。/ 105 merged into this story.
