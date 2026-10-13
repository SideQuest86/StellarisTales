# 海盗巢穴被摧毁 / Pirate Haven Destroyed

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · 来源 Sources：`common/on_actions/00_on_actions.txt:1648`、`events/pirate_events.txt:1102-1171` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

舰队击毁时（on_fleet_destroyed_perp，common/on_actions/00_on_actions.txt:1648）隐藏事件 pirate.13：全局尚无 privateers_destroyed 旗标；击杀者为普通国家；被毁一方是已通讯的海盗国家，其被毁舰队带有 pirate_home_system_fleet 旗标；且海盗老巢系统里已没有其他同旗标舰队。

When a fleet is destroyed (on_fleet_destroyed_perp, common/on_actions/00_on_actions.txt:1648) hidden pirate.13 fires if the global privateers_destroyed flag is unset; the killer is a normal empire; the loser is a contacted pirate country whose destroyed fleet carries pirate_home_system_fleet; and no other such fleet remains in the haven system.

## 剧情脉络 Story outline

pirate.15 设置全局 privateers_destroyed 旗标（整局只发生一次）。唯一选项“太棒了”：+2500矿物、+1500能量、+750合金，并调用 generate_lcluster_clue（若已有 L星团事件链，会得到一条线索并可能触发 distar.10904，属 event-distar-13080）。正文在拥有 l_cluster_chain 时有第二种文字。

pirate.15 sets the global privateers_destroyed flag (once per game). The only option, Excellent, gives +2500 minerals, +1500 energy and +750 alloys and calls generate_lcluster_clue (with the L-Cluster chain active this yields a clue and may fire distar.10904, in event-distar-13080). The body has a second text when l_cluster_chain is active.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

正文依是否拥有 l_cluster_chain 而变。

Body text depends on having l_cluster_chain.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
