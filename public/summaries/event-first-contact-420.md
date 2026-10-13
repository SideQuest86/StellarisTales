# 频率问题 / A Problem of Frequencies
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「频率问题」first_contact.415）
- 来源 Sources：`events/first_contact_events.txt:7411–7586` · `common/special_projects/00_projects_nemesis.txt:63–75` · `common/first_contact/00_first_contact.txt:567–602, 1975–2052`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 10；本方须持有 first_contact_skill_1…4 之一的修正（“新手不得入内”），不得是格式塔，未发生过此链；对方不得是格式塔，同种族类别 ×0.5（`common/first_contact/00_first_contact.txt:568–602`）。/ Stage-2 weight 10; needs one of the first_contact_skill_1…4 modifiers, a non-gestalt owner and contact, and no earlier run of the chain; ×0.5 when both are the same species class.

## 剧情脉络 Story outline

1. **频率问题（415）**：对方的信号像白噪声。/ The signals look like white noise.
   - A 坚持 → 无行动收尾（难度8/10）→ **425 译码完成**。/ Persevere → 425.
   - B 追加经费（-1000 能量，需有存量）→ 拨款收尾（难度5/7）→ **420 译码完成**。/ Pay 1000 energy → 420.
2. 420 另外启用特殊项目“通用翻译器”（3000 社会学）→ 完成后 **422 通用翻译器**。/ 420 also enables the Universal Translator project → 422.

## 分支与结局 Branches and outcomes

- 425 与 420 是花钱与否两条路线的结果，二选一。/ 425 and 420 are the results of the two options.
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

无按文明身份变化的文本，仅选项B需要能量。/ Only option B requires energy.

## 审阅记录 Review notes

- 已核对 Checked：415–425、项目 UNIVERSAL_TRANSLATOR_PROJECT、四个嗡鸣者阶段。
- 审阅改动 Changes：并入 415 与 425（原 event-first-contact-425），连接阶段；420→项目→422。/ Merged 415 and 425 (previous event-first-contact-425 story) and linked the project.
