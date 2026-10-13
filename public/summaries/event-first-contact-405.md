# 明显的敌意 / Apparent Hostility
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件「明显的敌意」first_contact.400）
- 来源 Sources：`events/first_contact_events.txt:6137–6432` · `common/first_contact/00_first_contact.txt:529–565, 1857–1972`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 5；仅当对方是好战或“荣誉战士”AI 时才可能出现，对方对我方已敌对则为0，本方已有此链标记则为0；对方为荣誉战士/狂热净化者 ×3（`common/first_contact/00_first_contact.txt:530–565`）。/ Stage-2 weight 5; only possible with a militarist or honorbound-warriors contact, zero if the contact is already hostile to us or the owner already had the chain; ×3 for honorbound or fanatic purifiers.

## 剧情脉络 Story outline

1. **明显的敌意（400）**：对方舰船近距离掠过并打开炮门。/ Alien ships make threatening close passes with gunports open.
   - A 模仿他们的问候 → 90% 表面敌意收尾阶段（难度5）→ 405 或 406；10% 战斗（500，见“恐怖噪音”篇）。/ Mimic → usually the end stage → 405/406; rarely a fight (500).
   - B 无视 → 无行动收尾阶段（对方主动5 / 谨慎7）→ 410 或 411。/ Ignore → no-action end stage → 410/411.

## 分支与结局 Branches and outcomes

- 405 陪练伙伴 / 406 勇气的展示：互斥，权重各 1。/ exclusive.
- 410 显得懦弱 / 411 冷静的表现：互斥，权重各 1。/ exclusive.
- 所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

400 对格式塔有单独文本；各结局选项文字随本方军国、和平、排外、灭绝倾向变化。/ 400 has gestalt text; option text varies with militarist, pacifist, xenophobe and homicidal ethics.

## 审阅记录 Review notes

- 已核对 Checked：400–411 与 500 的调用、default_apparent_hostility_* 四个阶段、第二阶段条目。
- 审阅改动 Changes：原 405 篇只含 405/406；现并入 400、410、411 并连接阶段。/ The old story held only 405/406; 400, 410 and 411 are now included with stage bridges. 500/505 are kept in the Monstrous Noises story (shared helper).
