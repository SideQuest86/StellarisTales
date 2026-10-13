# 灵能压制已被拆解 / Psionic Suppression Dismantled

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/shroud_events.txt:313-563 (shroud.60/65/70/75 → 80)`; `common/on_actions/00_on_actions.txt (on_system_gained, on_system_controller_changed, on_becoming_subject, on_subject_integrated)`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

拥有灵能光环科技、且未启用（或已设为“拆除”）灵能压制政策的帝国，在下列情况下取得含灵能压制建筑/封印的星系时：获得星系（shroud.60）、成为星系控制者（65）、终末者起源宗主得到含此类建筑的附庸（70）、整合附庸（75）。

An empire with the Psionic Aura technology whose psionic-suppression policy is not enabled (or set to dismantle) takes over systems with suppression buildings/seals: gaining a system (shroud.60), becoming its controller (65), an Endbringers overlord gaining such a subject (70), or integrating a subject (75).

## 剧情脉络 Story outline

隐藏事件拆除这些压制装置，并调用 shroud.80“灵能压制已被拆解”（仅一次，设置 psionic_suppression_policy_enabled）。

The hidden events remove the suppressors and call shroud.80 "Psionic Suppression Dismantled" (once; sets psionic_suppression_policy_enabled).

## 分支与结局 Branches and outcomes

80 的唯一选项把“灵能压制”政策设为“拆除”，并尝试开启“灵能光环阻碍”事件链（该链文本针对轮回之终末光环，按条件开启）。

80's only option sets the Psionic Suppression policy to "dismantle" and tries to start the "Psionic Aura Impedance" event chain (whose text concerns the Aura of the End; it starts conditionally).

## 条件与文明差异 Conditions and variants

无文本变体。

No text variants.

## 审阅记录 Review notes

修正：原草稿把同一窗口拆成四张卡（event-shroud-60/65/70/75）；现合并为一个故事，四个入口作为互不相同的触发方式。

Correction: the draft split the same window into four cards (event-shroud-60/65/70/75); now one story whose four entries are different triggers.
