# 海盗空间站被摧毁 / Pirate Station Raided

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

舰队击毁时（on_fleet_destroyed_perp，common/on_actions/00_on_actions.txt:1649）隐藏事件 pirate.24：被毁一方是已通讯的海盗国家，被毁舰船是 pirate_station（且不是老巢舰队）。

When a fleet is destroyed (on_fleet_destroyed_perp, common/on_actions/00_on_actions.txt:1649) hidden pirate.24 fires if the loser is a contacted pirate country and the destroyed ship is a pirate_station (not a haven fleet).

## 剧情脉络 Story outline

若击杀者有 l_cluster_chain：85% → pirate.25，15% → pirate.26；否则必为 pirate.25。pirate.25 先随机决定战利品档位（巨额5／大15／中35／小50，80年后按每20年系数调整），再给相应矿物与能量（100年后翻倍）；宝藏猎人击败黑针后还得到能量月收入加成。pirate.26 是同样的奖励，外加 L星团线索（调用 generate_lcluster_clue）。

If the killer has l_cluster_chain: 85% pirate.25, 15% pirate.26; otherwise always pirate.25. pirate.25 first rolls a loot tier (massive 5 / big 15 / medium 35 / small 50, adjusted per 20 years after year 80), then grants minerals and energy accordingly (doubled after year 100); Treasure Hunters who defeated the Black Needle also get a monthly energy bonus. pirate.26 is the same reward plus an L-Cluster clue (generate_lcluster_clue).

## 分支与结局 Branches and outcomes

25 与 26 互斥。

25 and 26 are exclusive.

## 条件与文明差异 Conditions and variants

战利品档位与年份见上；黑针加成需要宝藏猎人起源与 has_defeated_black_needle。

Loot tiers and years as above; the Black Needle bonus needs the Treasure Hunters origin and has_defeated_black_needle.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/on_actions/00_on_actions.txt:1649`、`events/pirate_events.txt:1243-1330`、`events/pirate_events.txt:1329-1522`、`events/pirate_events.txt:1524-1560`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
