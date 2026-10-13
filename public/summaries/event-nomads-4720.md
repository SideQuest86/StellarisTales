# 游牧浪子 / Nomadic Wanderlust

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Nomads · 来源 Sources：`events/nomads_events_1.txt:14250-14820`、`common/on_actions/00_on_actions.txt:967`、`common/event_chains/00_event_chains_nomads.txt:534-543`、`events/leviathans_events_1.txt:5325-5350` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

“浪迹星涯”天赋（ap_wanderlust）的游牧国家，其方舟进入系统时（on_entering_system，common/on_actions/00_on_actions.txt:967）隐藏事件 nomads.4720 检查：国家尚无 nomad_exploration_complete 旗标；舰船是方舟；系统带有古迹、古老威胁、飞地、银河地标、劫掠者、自然奇观、前驱者或太空生态之一的旗标且未被该国访问过。

When an arkship of a nomadic empire with the Wanderlust perk (ap_wanderlust) enters a system (on_entering_system, common/on_actions/00_on_actions.txt:967) hidden nomads.4720 checks: no nomad_exploration_complete flag yet; the ship is an arkship; the system has an ancient-wonders, antique-threat, enclave, galactic-landmark, marauder, natural-spectacle, precursor or space-ecology flag and has not been visited by this empire.

## 剧情脉络 Story outline

通过检查后给系统打上访问标记；若尚未有事件链则开启 nomad_exploration_chain“游牧浪子”（保险措施）；按该系统所属类别给对应的 *_progress 任务计数器和 *_seen 变量加1并给出修正与消息。事件链计数器 categories_completed_progress 上限为8（八个类别各完成一次）。可读文档只有链概览卡；链的另一个起点是天赋启用时的 nomads.4715（event-nomads-4715，c8b）。

On a pass it marks the system visited, begins nomad_exploration_chain "Nomadic Wanderlust" if it is not running (a failsafe), and for the system's category increments the matching *_progress mission counter and *_seen variable with a modifier and a message. The chain counter categories_completed_progress has a maximum of 8 (each category once). The only readable doc is the chain overview card; the chain is also started by nomads.4715 when the perk is enabled (event-nomads-4715, c8b).

## 分支与结局 Branches and outcomes

无可读分支。

No readable branches.

## 条件与文明差异 Conditions and variants

仅游牧国家并拥有“浪迹星涯”天赋。

Only nomadic empires with the Wanderlust perk.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 未确定 Open: The same chain card is also shown by event-nomads-4715 (c8b); the two stories describe two ways into one chain.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
