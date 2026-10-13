# 个体化方案 / Suggestions of Individuality（蜂巢遇常规帝国）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件 first_contact.380）
- 来源 Sources：`events/first_contact_events.txt:5614–5770` · `common/first_contact/00_first_contact.txt:383–407, 1741–1779`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 10000（几乎必选）：本方为蜂巢，对方为常规帝国，本方尚无 hive_encountered_default 标记，且与任何常规帝国都还未通讯（`common/first_contact/00_first_contact.txt:384–407`）。因此只在蜂巢帝国首次接触个体帝国时出现一次。/ Stage-2 weight 10000 (practically forced): owner is a hive mind, the contact a regular empire, the owner has no hive_encountered_default flag and no communications with any regular empire yet — a once-per-empire event.

## 剧情脉络 Story outline

1. **个体化方案（380）**：译码无人机发现对方是“个体”而非集体；单选项进入收尾阶段（对方主动难度5 / 谨慎7），并设置 hive_encountered_default。/ The drones find they are individuals; one option enters the end stage.
2. **一个由个体构成的文明（385）**：突破性的译码；获得社会研究月加成。/ Translation breakthrough; society research bonus.

## 分支与结局 Branches and outcomes

线性，无分叉。/ Linear.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

文本分荒野帝国与“吞噬”群落等变体；选项名随 civic（devouring swarm）变化。/ Text variants for wilderness empires and the devouring swarm civic.

## 审阅记录 Review notes

- 已核对 Checked：380、385 与两个收尾阶段。
- 审阅改动 Changes：并 380 入 385 篇。/ 380 joins the 385 story.
