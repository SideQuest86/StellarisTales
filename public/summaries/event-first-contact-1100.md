# 研究外星材料 / Alien Materials Studied
- 分类 Category：文明纪事 Society (C7) · 首次接触：对方完成接触后的通知 reverse-contact notice

## 如何开始 How it starts

当被攻击/被俘者的帝国先完成与我方的首次接触时，finish_first_contact_effect 检查我方这边仍在进行的“反向首次接触”：若其当前阶段为 default_end_stage_hostile_no_crew，则 30（+0–5）天后向我方发出本事件（`first_contact_effects.txt:167–215`）。/ When the victim’s empire finishes its own first contact first, finish_first_contact_effect checks our still-running reverse site; if its stage is default_end_stage_hostile_no_crew, this event reaches us 30 (+0–5) days later.

## 剧情脉络 Story outline

**外星材料研究完毕（1100）**：缴获的设备在对方通话后更快得出了结论。 / Alien materials studied: the captured equipment is understood faster once communications opened.

## 分支与结局 Branches and outcomes

单选项。效果：随机科技选项进度 10%，对其情报 +25。 / Single option. Effect: random tech option progress 10% and +25 intel on the contact.

## 条件与文明差异 Conditions and variants

无文明差异。/ No variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_events.txt:8070-8095` · `common/scripted_effects/first_contact_effects.txt:167-215` · `common/first_contact/00_first_contact.txt:1325-1425`
- 已核对 Checked：脚本、finish_first_contact_effect 的反向分支、对应的敌对收尾阶段。/ Script, the reverse branch of finish_first_contact_effect and the matching hostile end stage.
- 审阅改动 Changes：无结构改动；此事件是 event-first-contact-250 篇中 295 外星材料研究（无活口） 的“对方先通话”版本。/ It is the “other side talked first” version of 295 外星材料研究（无活口） in the event-first-contact-250 story.
