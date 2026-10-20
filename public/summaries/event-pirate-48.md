# 发现海盗！ / Pirates Sighted!

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

每月（on_monthly_pulse，common/on_actions/00_on_actions.txt:110）隐藏事件 pirate.48 为每个已有 birth_of_piracy、当前无 pirates_spawned 旗标的玩家国家选一个邻近无主系统作为 pirate_system，并发出 pirate.49；on_pirate_spawn（common/on_actions/00_on_actions.txt:4175）也直接调用 pirate.49。pirate.49（pirate_events.txt:1779-1828）要求边境内有贸易值>1000的行星（或游牧且贸易收入>300）并存在 pirate_system。

Every month (on_monthly_pulse, common/on_actions/00_on_actions.txt:110) hidden pirate.48 picks a neighbouring unowned system as pirate_system for each empire that has birth_of_piracy and no pirates_spawned flag and fires pirate.49; on_pirate_spawn (common/on_actions/00_on_actions.txt:4175) also calls pirate.49. pirate.49 (pirate_events.txt:1779-1828) needs a planet with trade value above 1000 in the borders (or a nomad with trade income above 300) and an existing pirate_system.

## 剧情脉络 Story outline

pirate.49 做 random_list 200:10（约4.8%/月）：命中时设置3600天 pirates_spawned，并按类型发出：非格式塔 pirate.50“发现海盗！”；蜂巢 pirate.52（隐藏）；机器 pirate.55（隐藏）。52 在有已接触的非格式塔国家时50/50选 53“流氓无人机劫掠”或 54“异星海盗”，否则必为53；55 同理选 56“受损单位”或 57“有机海盗”。各窗口都在 pirate_system 创建海盗国家与舰队。

pirate.49 rolls random_list 200:10 (about 4.8% per month): on a hit it sets pirates_spawned for 3600 days and sends, by type, pirate.50 "Pirates Sighted!" (non-gestalt), hidden pirate.52 (hive) or hidden pirate.55 (machine). 52 picks 53 "Rogue Drone Raiding" or 54 "Alien Pirates" 50/50 if a non-gestalt empire is contacted, else always 53; 55 likewise picks 56 "Corrupted Units" or 57 "Organic Pirates". Each window creates the pirate country and fleet in pirate_system.

## 分支与结局 Branches and outcomes

五个窗口互斥；每个窗口只有一个确认选项“必须处理它们”，无后续。

The five windows are exclusive; each has a single acknowledging option and nothing follows.

## 条件与文明差异 Conditions and variants

编译器显示的概率（0.05 / 0.02）是 10/210 再乘以50/100，已核对正确。

The compiler probabilities (0.05 / 0.02) are 10/210 times 50/100 and were verified.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/on_actions/00_on_actions.txt:110`、`common/on_actions/00_on_actions.txt:4175-4179`、`events/pirate_events.txt:1748-1990`、`events/overlord_subject_events.txt:269`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
