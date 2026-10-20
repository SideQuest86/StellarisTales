# 色彩语言学 / Colorful Linguistics
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「色彩语言学」first_contact.5070）

## 如何开始 How it starts

第二阶段抽取，权重 5；本方已有此链标记、本方灭绝倾向、本方为格式塔且已与常规帝国通讯、或对方为灭绝倾向/格式塔，则为 0（`common/first_contact/00_first_contact.txt:645–677`）。/ Stage-2 weight 5; zero for owners that already had the chain or are homicidal, for gestalt owners already in contact with a regular empire, and for homicidal or gestalt contacts.

## 剧情脉络 Story outline

1. **色彩语言学（5070）**：语言学家破译了由约一千七百万个颜色字符组成的语言；单选项进入阶段（对方主动难度5 / 谨慎7）。/ A colour alphabet is deciphered; the only option enters the proactive/cautious stage.
2. **破译色彩语言（5071）**：A 用歌曲接触 → 30 天后随机 **5072 情感共鸣**（权重66）或 **5073 灾难性的冒犯**（33）；B 不带感情 → 直接结束。/ A: contact in song → 30 days later 5072 (66) or 5073 (33); B: no emotion → finish.

## 分支与结局 Branches and outcomes

5072 与 5073 互斥；亲异族加大 5072，排外加大 5073。/ Exclusive; xenophilia favours 5072, xenophobia 5073.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

5071–5073 对格式塔有单独文本。/ 5071–5073 have gestalt text.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:7171–7369` · `common/first_contact/00_first_contact.txt:644–677, 2131–2168`
- 已核对 Checked：5070–5073 脚本与阶段。
- 审阅改动 Changes：并入 5070（根）、5072、5073 到原 5071 篇。/ 5070 (root), 5072 and 5073 joined the old 5071 story.
