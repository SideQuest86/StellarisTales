# 审讯完毕 / Interrogations Complete
- 分类 Category：文明纪事 Society (C7) · 首次接触：对方完成接触后的通知 reverse-contact notice
- 来源 Sources：`events/first_contact_events.txt:8194-8286` · `common/scripted_effects/first_contact_effects.txt:167-215` · `common/first_contact/00_first_contact.txt:1325-1425`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

当被攻击/被俘者的帝国先完成与我方的首次接触时，finish_first_contact_effect 检查我方这边仍在进行的“反向首次接触”：若其当前阶段为 default_end_stage_hostile_with_crew（含 easy / hard），则 30（+0–5）天后向我方发出本事件（`first_contact_effects.txt:167–215`）。/ When the victim’s empire finishes its own first contact first, finish_first_contact_effect checks our still-running reverse site; if its stage is default_end_stage_hostile_with_crew (also easy / hard), this event reaches us 30 (+0–5) days later.

## 剧情脉络 Story outline

**审讯完成（1110）**：俘虏在通话建立后配合度提升。 / Interrogations complete: captives cooperate better once communications exist.

## 分支与结局 Branches and outcomes

单选项。效果：对其情报 +25（格式塔）/ +35（虚弱）/ +25（强壮）/ +30，并按强弱给 30%/10%/20% 科技进度。 / Single option. Effect: intel +25 (gestalt) / +35 (weak) / +25 (strong) / +30 and 30% / 10% / 20% tech progress.

## 条件与文明差异 Conditions and variants

文本取决于对方是否格式塔及俘虏强弱标记。/ Text depends on gestalt status and the interrogee-strength flags.

## 审阅记录 Review notes

- 已核对 Checked：脚本、finish_first_contact_effect 的反向分支、对应的敌对收尾阶段。/ Script, the reverse branch of finish_first_contact_effect and the matching hostile end stage.
- 审阅改动 Changes：无结构改动；此事件是 event-first-contact-250 篇中 285 审讯完成 的“对方先通话”版本。/ It is the “other side talked first” version of 285 审讯完成 in the event-first-contact-250 story.
