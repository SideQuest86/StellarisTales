# 散布种子 / Seed Dispersal

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Plantoids / Fruitful Partnership origin · 来源 Sources：`common/event_chains/00_event_chains_3.txt:125-129`、`common/scripted_effects/01_start_of_game_effects.txt:4180-4200`、`common/special_projects/00_projects_plantoids.txt:1-45` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

这是“结果实的伙伴关系”起源的事件链概览卡（图片 GFX_evt_fruitful_partnership，类别 empire_concerns）。开局时 fruitful_start_effect 开启此链（01_start_of_game_effects.txt:4192，由 game_start.1 调用），特殊项目 OPEN_SEED_PODS_PROJECT 也以它为 event_chain（00_projects_plantoids.txt:3）。

This is the overview card of the event chain of the Fruitful Partnership origin (art GFX_evt_fruitful_partnership, category empire_concerns). fruitful_start_effect begins it at game start (01_start_of_game_effects.txt:4192, called from game_start.1) and the special project OPEN_SEED_PODS_PROJECT carries it as its event_chain (00_projects_plantoids.txt:3).

## 剧情脉络 Story outline

链定义本身没有计数器、没有终止触发器，只是在“局势日志”里显示的名称与图片；剧情内容全部在起源故事 origin_fruitful（c1-origins 负责）中：播种项目、种子吸附生物与各教程事件。本卡不含任何可读的事件窗口。

The chain definition has no counter and no abort trigger; it only supplies a name and picture in the situation log. All narrative content lives in the origin story origin_fruitful (owned by c1-origins): the seed-pod project, seed-carrying critters and the tutorial events. This card has no readable event windows of its own.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

无。

None.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 请求：该卡应作为 origin_fruitful 的一部分（或在注册表中隐藏），见账本 Requests。
  Request: this card belongs to origin_fruitful (or should be hidden in the registry); see the ledger Requests.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
