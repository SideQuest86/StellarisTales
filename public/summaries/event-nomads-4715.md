# 值得观赏的景色 / A Sight to Behold

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/nomads_events_1.txt:14821-14850; common/ascension_perks/00_ascension_perks.txt:671 · DLC: Nomads · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

取得飞升天赋“浪迹星涯”（ap_wanderlust）时 on_enabled 触发 nomads.4715。

Taking the ascension perk Wanderlust (ap_wanderlust) fires nomads.4715 from its on_enabled.

## 剧情脉络 Story outline

窗口之后开启事件链“游牧浪子”，此后方舟舰造访新星系会推进该链（nomads.4720）。

Afterwards the chain Nomadic Wanderlust begins; arkship visits to new systems advance it (nomads.4720).

（并入自 event-nomads-4720，评注）链的第二个入口：拥有“浪迹星涯”的游牧国家的方舟进入系统时（on_entering_system，common/on_actions/00_on_actions.txt:967），隐藏事件 nomads.4720 检查国家尚无 nomad_exploration_complete 旗标、舰船是方舟、系统带有古迹/古老威胁/飞地/银河地标/劫掠者/自然奇观/前驱者/太空生态旗标且未访问过；通过后标记已访问，若尚未有事件链则开启 nomad_exploration_chain（保险措施，events/nomads_events_1.txt:14305），并给对应类别的 *_progress 计数器加1。计数器 categories_completed_progress 上限为8（每类一次）。

(Merged from event-nomads-4720; commentary.) The chain's second entry: when an arkship of a nomadic empire with Wanderlust enters a system (on_entering_system, common/on_actions/00_on_actions.txt:967), hidden nomads.4720 checks no nomad_exploration_complete flag, the ship is an arkship, and the system carries an ancient-wonders / antique-threat / enclave / galactic-landmark / marauder / natural-spectacle / precursor / space-ecology flag and is unvisited. It marks the system visited, begins nomad_exploration_chain if it is not running (a failsafe, events/nomads_events_1.txt:14305) and increments the matching *_progress counter. The counter categories_completed_progress caps at 8 (one per category).

## 分支与结局 Branches and outcomes

两个回答按是否排外区分，效果相同。

Two replies by xenophobia, same effect.

## 审阅记录 Review notes

- 注：本文件的行号取自游戏文件本身；编译数据中该文件记录的行号有偏移（见账本请求）。
  Note: line numbers are from the game file itself; the compiled records for this file carry shifted line numbers (see ledger requests).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- r3-integrate（2026-10-13）：合并了 event-nomads-4720；两者是同一条事件链 nomad_exploration_chain 的两个入口（天赋启用 14850 / 方舟入系 14305），现为家族。
  r3-integrate (2026-10-13): Merged event-nomads-4720: two entries into the same chain nomad_exploration_chain (perk enabled :14850 / arkship entering a system :14305); now a family.
