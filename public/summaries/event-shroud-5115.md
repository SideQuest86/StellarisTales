# 天选 / The Chosen

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

“天选之国”（is_chosen_empire）第一次潜入虚境时：on_shroud_delve 的高优先随机池（权重100）中的 shroud.5115，要求尚未经历首次潜入（chosen_passed_first_delve）。

The first Shroud delve of a Chosen empire (is_chosen_empire): shroud.5115 in the high-priority pool of on_shroud_delve (weight 100), requiring chosen_passed_first_delve not yet set.

## 剧情脉络 Story outline

经过多年削薄维度之间的帷幕，我们终于能有目的地探索虚境，并遇见选定我们的赞助者。

After years of wearing down the veil, we can finally explore the Shroud with purpose and meet the patron that chose us.

## 分支与结局 Branches and outcomes

唯一选项：三级团结与一级泽珞奖励。

Only option: tier-3 unity and tier-1 zro rewards.

## 条件与文明差异 Conditions and variants

正文按天选赞助者（织缕/喰煞/月窠/器具）四选一；标题为脚本本地化（赞助者名）。

The text is one of four by chosen patron (Composer/Eater/Cradle/Instrument); the title is scripted localisation (patron name).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:13879-13935`; `common/on_actions/00_on_actions.txt:5801-5817 (on_shroud_delve random 100)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
标题原为脚本本地化 [GetChosenPatron]，改用开局事件 shroud.5105 的原标题“天选”。它是天选开局链的后续（跨故事）。

The title is scripted localisation [GetChosenPatron]; the original title of the opening event shroud.5105 ("The Chosen") is used instead. It continues the Chosen opening chain (cross-story).
