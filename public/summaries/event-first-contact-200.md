# 数据挖掘成功 / Data Delve Successful（入侵路线 hacking route）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件 first_contact.200）
- 来源 Sources：`events/first_contact_events.txt:1984–2378` · `common/first_contact/00_first_contact.txt:771–935`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

在“难以捉摸的外星人”(first_contact.50) 选项C“侵入他们的网络”，把阶段设为 default_hacking_stage_main（难度7）；该选项只在本方不是主动政策时出现（`events/first_contact_events.txt:1266–1308`）。/ Option C of first_contact.50 sets the hacking stage (difficulty 7); it is offered only when the owner is not on the proactive policy.

## 剧情脉络 Story outline

1. 入侵阶段按权重抽取一个结果：/ The stage draws one outcome:
   - **200 数据挖掘成功**（未被发现）→ 入侵收尾阶段（难度1）→ **220**。
   - **205 代价高昂的成功**（被发现）→ 同样收尾 → **220**；同时对方收到 **206 入侵被发现**。
   - **210 入侵中止**（失败，未被发现）→ 回到通用收尾阶段。
   - **215 蹩脚的黑客行动**（失败，被发现）→ 回到通用谨慎收尾；对方收到 **216 入侵被挫败**。
2. **220 通讯建立**：通过窃取的数据译出对方语言；按所设标记复制对方一项科技（进度10%），结束首次接触。/ 220: language decoded from stolen data; copies a technology; first contact ends.

## 分支与结局 Branches and outcomes

四个结果互斥；成功 → 220；失败 → 通用收尾。/ Four exclusive outcomes; success → 220; failure → generic end.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

206/216 对非格式塔、蜂巢、机械有三套文本。/ 206/216 have regular, hive and machine text.

## 审阅记录 Review notes

- 已核对 Checked：200–220 与入侵主/收尾阶段。
- 审阅改动 Changes：并 205、206、210、215、216、220 到本篇（原 event-first-contact-200 仅含 200–216）。/ 220 (formerly its own story) joins this tree.
- 不确定 Uncertain：220 里按标记（steal_physics/society/engineering）偷科技的标记来源未在此展开。/ Where the steal_* flags are set was not traced.
