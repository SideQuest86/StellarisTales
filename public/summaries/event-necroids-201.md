# 祭献已毕：其乐融融 / A Sacrifice Made: Harmony
- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Necroids

## 如何开始 How it starts

死亡教团（civic_death_cult / civic_death_cult_corporate）的灵性国家颁布祭献法令“祭献：其乐融融”（edict sacrifice_harmony，common/edicts/03_sacrifices.txt:148-258）后，法令的效果立即发出 necroids.201。事件要求 is_spiritualist 且拥有死亡教团国民理念。修正：人口幸福+10%，增长+5%。

A spiritualist empire with the Death Cult civic (civic_death_cult / civic_death_cult_corporate) enacts the sacrifice edict "Sacrifice: Harmony" (sacrifice_harmony, common/edicts/03_sacrifices.txt:148-258); the edict effect then fires necroids.201 at once. The event needs is_spiritualist and the Death Cult civic. Edict modifier: +10% pop happiness, +5% growth.

## 剧情脉络 Story outline

立即效果 death_cult_sacrifice_effect（00_scripted_effects.txt:5239）按祭献的初学者人数计算本次结果倍率 sacrifice_result_mult。唯一选项“赞美”：把对应的祭献修正加入国家1800天，强度乘以该倍率；若倍率≥0.05，还加上“死亡祭司”修正1800天。事件之后，在 recent_overlord_sacrifice 旗标下的附庸会得到宗主祭献修正并收到一条消息。

The immediate death_cult_sacrifice_effect (00_scripted_effects.txt:5239) computes the result multiplier sacrifice_result_mult from the number of sacrificed initiates. The only option, Praise, adds the matching sacrifice modifier for 1800 days scaled by that multiplier, and, if the multiplier is at least 0.05, also adds the Death Priest modifier for 1800 days. Afterwards subjects with recent_overlord_sacrifice get the overlord version of the modifier and a message.

## 分支与结局 Branches and outcomes

无分支。三种祭献法令互斥（togetherness / harmony / bounty），见相邻故事 event-necroids-200/201/202。

No branches. The three sacrifice edicts are mutually exclusive (togetherness / harmony / bounty); see the sibling stories event-necroids-200/201/202.

## 条件与文明差异 Conditions and variants

文本中的称呼取决于国家形容词（[root.GetAdj]）。

The wording uses the empire adjective ([root.GetAdj]).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/necroids_events_2.txt:81-146`、`common/edicts/03_sacrifices.txt:148-258`、`common/scripted_effects/00_scripted_effects.txt:5239`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
