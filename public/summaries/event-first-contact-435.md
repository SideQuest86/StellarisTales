# 光影展示 / Light Displays
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「光影展示」first_contact.430）
- 来源 Sources：`events/first_contact_events.txt:6587–6737` · `common/special_projects/00_projects_nemesis.txt:77–90` · `common/first_contact/00_first_contact.txt:604–642, 2054–2130`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 2（对方为水生/软体类 ×8）；要求本方持有 first_contact_skill 修正且不是荒野帝国，未发生过此链；对方不得是格式塔（`common/first_contact/00_first_contact.txt:605–642`）。/ Stage-2 weight 2 (×8 if the contact is aquatic or molluscoid); needs a first_contact_skill modifier, not a wilderness owner, no previous run; contact not gestalt.

## 剧情脉络 Story outline

1. **光影展示（430）**：对方用光线图案而非声音交流。/ They communicate with light patterns.
   - A 坚持 → 无行动收尾（8/10）→ **440 光语**。/ Persevere → 440.
   - B 追加经费（-1000 能量）→ 拨款收尾（5/7）→ **435 突破光障**。/ Fund → 435.
2. 435 启用特殊项目“章鱼人光影图案”（3000 物理学）→ 完成后 **437 超空间航道启示**。/ 435 enables the Light Patterns project → 437.

## 分支与结局 Branches and outcomes

- 440 与 435 二选一；437 是项目的后续。/ 440 or 435; 437 follows the project.
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

只有选项B要求能量储备。/ Only option B requires energy.

## 审阅记录 Review notes

- 已核对 Checked：430–440、项目、四个章鱼人阶段、第二阶段条目。
- 审阅改动 Changes：并入 430、440 与项目/437（原 event-first-contact-440 不再单独成篇）。/ 430, 440 and the project/437 merged in; the old 440 story is absorbed.
- 不确定 Uncertain：437 还有 on_post_communications_established 入口，其触发条件未在此篇展开。/ 437 has a second on_action entry not expanded here.
