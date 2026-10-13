# 奥伏戎 / Ouw'ron

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/on_actions/00_on_actions.txt:428 (on_yearly_pulse_country → shroud.12000)`; `events/shroud_events.txt:18696-18838 (12000)`; `events/shroud_events.txt:18840-19560 (12010-12060)`; `events/shroud_events.txt:19201-19352 (12045)`; `events/shroud_events.txt:19707-19760 (12130)`; `common/script_values/07_script_values_shroud.txt (calc_patron_paragon_roll_chance)`; `common/scripted_variables/09_scripted_variables_shroud.txt:255`; `common/traits/17_shroud_leader_traits.txt:452-500`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

每年检查（on_yearly_pulse_country → 隐藏 shroud.12000）：需拥有“虚境阴影”且已突破虚境。与轮回之终末立约者每年有3%几率遇到奥伏戎；其他帝国按赞助者领域检定对应的“虚境领袖”，几率为 1 + 该赞助者契合度÷100（%）。

Yearly check (on_yearly_pulse_country → hidden shroud.12000): requires Shadows of the Shroud and a breached Shroud. An empire in covenant with the End of the Cycle has a 3% chance per year to meet Ouw'ron; others roll the "Shroud leader" of the patron whose domain they are in, at 1 + attunement ÷ 100 (%).

## 剧情脉络 Story outline

每位领袖以招募窗口出现：可以三四个问题了解其来历（对话选项，不推进），然后“招募”成为领袖或“遣散”。甘图亚塔（月窠，非嗜杀）、科博洛可-拉（喰煞，非吞噬虫群）、莫尔（器具）、克罗南（织缕）、祖琳（低语，非格式塔）各对应一位主要赞助者，奥伏戎对应轮回之终末。遣散会清除全局标记，使其以后可能重新出现；遣散奥伏戎则一天后触发 12155“纯正的定罪”，奥伏戎转而与我们为敌（拒绝轮回之终末立约的终末信徒同样会引发它）。

Each leader arrives in a recruitment window: three or four questions reveal their background (dialogue options), then "Enlist" makes them a leader or "Dismiss" sends them away. Ganthuata (Cradle, not homicidal), Koborok'Ra (Eater, not Devouring Swarm), Morr (Instrument), Kronen (Composer) and Zulyn (Whisperers, not gestalt) belong to the major patrons; Ouw'ron belongs to the End of the Cycle. Dismissing clears the global flag so the leader can return later; dismissing Ouw'ron fires 12155 "Pure Conviction" a day later and he turns against us (refusing the End of the Cycle covenant with a Disciple of the End leader does the same).

## 分支与结局 Branches and outcomes

克罗南的后续：他带有“织缕门徒”命运特质；在他治理下的星球累计增长2500人口后，出现 12045“丝缕之苦”对话，结束时特质升级为第二级（寿命缩短，加成提高）。其余领袖没有后续事件。

Kronen's follow-up: he carries the Disciple of the Composer destiny trait; after 2,500 pops have grown under his governance the conversation 12045 "Strand Afflicted" appears, and closing it upgrades the trait to tier 2 (shorter lifespan, stronger bonuses). The other leaders have no follow-up events.

## 条件与文明差异 Conditions and variants

奥伏戎文本在本国有失明领袖时不同；科博洛可-拉开场有两种文本；12045 的问题按已问过的标记显示/隐藏。

Ouw'ron's text differs if we have a blinded leader; Koborok'Ra has two opening variants; 12045 shows or hides questions by dialogue flags already set.

## 审阅记录 Review notes

核对了 12000 的分支：它不是 if/else 链，而是五个独立的 if，每个成功后 break，因此一年至多一位；编译草稿中的条件组即为互斥组。修正：把仅由克罗南触发的 event-shroud-12130（12045）并入本故事并以条件连接接到“招募”之后。12155 与轮回之终末故事共享。

Checked the branching of 12000: not an if/else chain but five independent ifs, each with break on success, so at most one leader per year; the draft condition group is the exclusive group. Correction: event-shroud-12130 (12045), triggered only by Kronen, is merged here and linked after "Enlist". 12155 is shared with the End of the Cycle story.

不确定 / Uncertain:

- calc_patron_paragon_roll_chance = 1 + attunement points ÷ 100 (floored); the attunement scale in play is engine-side.
