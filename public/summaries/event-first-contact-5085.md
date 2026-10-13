# 穿梭机 / The Shuttle（审判 The Trial）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「穿梭机」first_contact.5080）
- 来源 Sources：`events/first_contact_events.txt:7370–7986` · `common/first_contact/00_first_contact.txt:739–765, 2460–2577`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 2；本方有此链标记、灭绝倾向、格式塔，或对方灭绝倾向/格式塔，则为 0（`common/first_contact/00_first_contact.txt:740–765`）。/ Stage-2 weight 2; zero if the owner had the chain, is homicidal or gestalt, or the contact is homicidal or gestalt.

## 剧情脉络 Story outline

1. **穿梭机（5080）**：对方在近处放置一艘小穿梭机，只能容一位使节登上；外观随机（武装/实用/华丽/普通）。→ 等待阶段（难度5/7）。/ A small shuttle waits; its look is randomised.
2. **等待（5085）**：使节返回，里面无人，只有会议室（冥想/泳池/威严/普通，随机）。→ 方式阶段。/ The shuttle is empty but for a meeting room.
3. **方式（5090）**：A 决斗 / B 演讲 / C 即兴说唱 → 裁决阶段。/ Choose combat, speech or song.
4. **裁决（5095）**：文本取决于所选方式和好坏；只有一个选项，结束首次接触。/ Verdict text depends on method and roll.

## 分支与结局 Branches and outcomes

没有分叉结局，只有同一事件的 6 种文本（三方式 × 好/坏）。/ Single ending event with six text variants.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

外观/房间偏好取决于对方的伦理；方式的成败偏向对方偏好的伦理。/ Outcomes lean on the contact’s ethics.

## 审阅记录 Review notes

- 已核对 Checked：5080–5095 全脚本，6 个审判阶段，第二阶段条目。
- 审阅改动 Changes：并 5080（根）、5085、5090、5095 为一篇。/ 5080 (root), 5085, 5090, 5095 merged into one tree.
