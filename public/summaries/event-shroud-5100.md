# 天选 / The Chosen

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Shadows of the Shroud

## 如何开始 How it starts

游戏开局时，game_start.txt:646-651 对每个拥有“天选”类国民理念的玩家国家（is_chosen_empire：civic_chosen、civic_hive_chosen、civic_machine_chosen、civic_corporate_chosen）发出隐藏事件 shroud.5100。

At game start game_start.txt:646-651 sends hidden shroud.5100 to every playable empire with a Chosen civic (is_chosen_empire: civic_chosen, civic_hive_chosen, civic_machine_chosen, civic_corporate_chosen).

## 剧情脉络 Story outline

shroud.5100（隐藏）设置 can_access_shroud 旗标并静默授予“灵能光环”科技，2天后触发 shroud.5105“天选”：四个互斥选项选择庇护者（织线者、噬世者、魂摇者、欲望之器）。每个选项设置对应的“选定庇护者”旗标、把庇护者首次接触状态设为已完成并加上该庇护者的祝福修正。选择之后30天，shroud.5110 出现，按所选庇护者换图并给予对应的共鸣礼物。

Hidden shroud.5100 sets can_access_shroud and silently grants the Psionic Aura technology, then 2 days later fires shroud.5105 "The Chosen": four exclusive options pick the patron (Composer of Strands, Eater of Worlds, Cradle of Souls, Instrument of Desire). Each sets the matching chosen-patron flag, marks that patron's first contact as completed and adds its blessing modifier. 30 days after the choice shroud.5110 appears, with the art switched to the chosen patron and a matching attunement gift.

## 分支与结局 Branches and outcomes

四选一，之后都汇合到 5110；5110 的文字按是否为机器帝国（robot/organic）而变，图片按所选庇护者变。

One of four, all converging on 5110; its text varies by robot or organic empire and its art by the chosen patron.

## 条件与文明差异 Conditions and variants

AI权重：噬世者对杀戮型国家×2，魂摇者对杀戮型国家×0。

AI weights: the Eater of Worlds is x2 and the Cradle of Souls x0 for homicidal empires.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/shroud_events.txt:13711-13877`、`events/game_start.txt:646-651`、`common/scripted_triggers/08_scripted_triggers_shroud.txt:205`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 此前账本认为 5100/5105/5110 属于 event-game-start-1（C8b）；实际 event-game-start-1 是“亚光速探测器”，不含这些事件，它们在本故事中。事件 5115（首次深入虚境）是 event-shroud-5115（c8a）。
  The earlier ledger placed 5100/5105/5110 under event-game-start-1 (C8b); that story is actually the Sublight Exploration Probes and does not contain them, so they live here. shroud.5115 (first delve) is event-shroud-5115 (c8a).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
