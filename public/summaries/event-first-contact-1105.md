# 外星研究完成 / Alien Study Complete
- 分类 Category：文明纪事 Society (C7) · 首次接触：对方完成接触后的通知 reverse-contact notice

## 如何开始 How it starts

当被攻击/被俘者的帝国先完成与我方的首次接触时，finish_first_contact_effect 检查我方这边仍在进行的“反向首次接触”：若其当前阶段为 default_end_stage_hostile_with_vivisection，则 30（+0–5）天后向我方发出本事件（`first_contact_effects.txt:167–215`）。/ When the victim’s empire finishes its own first contact first, finish_first_contact_effect checks our still-running reverse site; if its stage is default_end_stage_hostile_with_vivisection, this event reaches us 30 (+0–5) days later.

## 剧情脉络 Story outline

**外星研究完成（1105）**：解剖研究结束；对方通话后可更好地理解解剖结果。 / Alien study complete: vivisection results interpreted once they open communications.

## 分支与结局 Branches and outcomes

单选项。效果：设置成就标记 they_come_in_pieces；机械对手 → 复制其计算机科技 50% 进度（否则工程研究加成）；有机对手 → 复制生物科技 50% 进度（否则社会研究加成）。 / Single option. Effect: sets the they_come_in_pieces flag; machine contact → copies a computing tech to 50% (else an engineering-research bonus); organic → copies a biology tech to 50% (else a society-research bonus).

## 条件与文明差异 Conditions and variants

三个文本变体取决于对方是否为普通、蜂巢、机械帝国。/ Text varies with the contact’s type.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:8096-8193` · `common/scripted_effects/first_contact_effects.txt:167-215` · `common/first_contact/00_first_contact.txt:1325-1425`
- 已核对 Checked：脚本、finish_first_contact_effect 的反向分支、对应的敌对收尾阶段。/ Script, the reverse branch of finish_first_contact_effect and the matching hostile end stage.
- 审阅改动 Changes：无结构改动；此事件是 event-first-contact-250 篇中 290 外星研究完成（活体解剖） 的“对方先通话”版本。/ It is the “other side talked first” version of 290 外星研究完成（活体解剖） in the event-first-contact-250 story.
