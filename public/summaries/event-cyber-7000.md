# 创世计划完成 / Genesis Project Complete

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Machine Age · 来源 Sources：`events/machine_age_events.txt:9-70`、`events/machine_age_events.txt:66-95`、`events/machine_age_events.txt:100-240`、`events/machine_age_events.txt:241-275`、`common/on_actions/00_on_actions.txt:1321-1322,2079` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

“创世向导”/“创世建筑师”国民理念（civic_guided_sapience / civic_machine_guided_sapience）的专用殖民船（guided_sapience_colonizer）抵达行星时，隐藏事件 cyber.7005 设置 create_presapients_no_colonize 载体旗标并加上“创世保护区”矿藏。殖民完成时（on_colonized，common/on_actions/00_on_actions.txt:1321-1322）按情形二选一发出 cyber.7000 或 cyber.7001；提升完成时（on_uplift_completion，common/on_actions/00_on_actions.txt:2079）发出 cyber.7020。

When the Genesis Guides / Genesis Architects civic's dedicated colony ship (guided_sapience_colonizer) reaches a planet, hidden cyber.7005 sets the create_presapients_no_colonize carrier flag and adds a Genesis Preserve deposit. On colonisation (on_colonized, common/on_actions/00_on_actions.txt:1321-1322) either cyber.7000 or cyber.7001 is sent as appropriate; on uplift completion (on_uplift_completion, common/on_actions/00_on_actions.txt:2079) cyber.7020 is sent.

## 剧情脉络 Story outline

cyber.7000“创世计划完成”：方舟为该星球创造前智种族（隐藏 cyber.7010 随机生成物种并设置 pre_sapient_planet），选项给 250 团结 + 5 影响力（乘以已引导的前智种族数相关系数）并在尚未研究时推进“表观遗传触发”科技5%；cyber.7001“创世保护区落成”：星球上本就有前智种族，选项给予同样的团结与影响力。之后玩家把前智种族提升为智慧种族，完成时 cyber.7020“创世提升完成”再次给 250 团结 + 5 影响力，并把“创世保护区”矿藏换成“创世纪念碑”。

cyber.7000 "Genesis Project Complete": the Ark creates a pre-sapient species on the planet (hidden cyber.7010 randomises the species and sets pre_sapient_planet); the option gives 250 unity + 5 influence (scaled by presapients_guided_mult) and, if not yet researched, 5% progress on Epigenetic Triggers. cyber.7001 "Genesis Preserve Complete": natural pre-sapients already lived there; the option gives the same unity and influence. Later the player uplifts the species, and on completion cyber.7020 "Genesis Uplift Complete" again gives 250 unity + 5 influence and swaps the Genesis Preserve deposit for a Genesis Monument.

## 分支与结局 Branches and outcomes

7000 与 7001 互斥（见分组）；提升完成与二者都可以相继发生。

7000 and 7001 are exclusive (see group); the uplift completion can follow either.

## 条件与文明差异 Conditions and variants

三个窗口都要求 is_guided_sapience_empire；7000 还要求星球非人造。

All three need is_guided_sapience_empire; 7000 also needs a non-artificial planet.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 合并说明：event-cyber-7001 与 event-cyber-7020 是同一创世计划流程的另外两个入口，已并入。
  Merge note: event-cyber-7001 and event-cyber-7020 are the other two entry points of the same Genesis program and are merged here.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
