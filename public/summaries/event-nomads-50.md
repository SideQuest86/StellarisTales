# [GetStartingDrivePluralCap]启用 / [GetStartingDrivePluralCap] Engaged

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Nomads · 来源 Sources：`events/nomads_events_1.txt:1704-1812`、`common/event_chains/00_event_chains_nomads.txt:5-17`、`common/scripted_effects/01_start_of_game_effects.txt:188`、`common/scripted_effects/nomads_effects.txt:6170-6310`、`common/on_actions/00_on_actions.txt:779,1177,1259,1497` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

游牧帝国开局时，nomad_country_initial_setup_effect（01_start_of_game_effects.txt:188；由 game_start.1 或 une_vela 星系初始化器调用）向非 AI 的游牧国家发出 nomads.50。

At game start nomad_country_initial_setup_effect (01_start_of_game_effects.txt:188, called from game_start.1 or the une_vela system initializer) sends nomads.50 to non-AI nomadic empires.

## 剧情脉络 Story outline

立即效果（nomads_events_1.txt:1752-1800）：为旗舰方舟开启事件链“方舟就绪清单”（nomad_checklist_chain，计数器 checklist_items 上限 3），固定开启“收获资源”一项，再用两次随机（五选一，已开启的权重为0）开启：盾牌校准、解密信号、传感器校准、冷却液冲洗、清理机库。窗口正文按已开启的任务（国家旗标）逐项追加说明；唯一选项“知悉”仅关闭窗口。

Immediate effect (nomads_events_1.txt:1752-1800): starts the event chain "Arkship Readiness" (nomad_checklist_chain, counter checklist_items max 3) on the capital arkship, always adds the harvest-resources item, then twice picks at random among five (already active ones get weight 0): shield realignment, decipher signal, sensor calibration, flush coolant, clear hangar bays. The body text appends a line for each active item (country flags); the only option just closes the window.

## 分支与结局 Branches and outcomes

清单任务由隐藏事件完成：盾牌校准 nomads.51（OA:1497）、传感器校准 nomads.52（OA:1177）、信号源勘测 nomads.53（OA:1259）、首次接触破译信号 nomads.54（OA:779）等，各自的 complete_*_effect 把链计数器+1，达到3项即结束事件链（nomads_effects.txt:6178-6190）；若不再是游牧国家，事件链中止（event_chains 文件 abort_trigger）。

Items are completed by hidden events: shield realignment nomads.51 (OA:1497), sensor calibration nomads.52 (OA:1177), surveying the signal source nomads.53 (OA:1259), decipher-by-first-contact nomads.54 (OA:779) and so on; each complete_*_effect adds 1 to the chain counter and the chain ends at 3 (nomads_effects.txt:6178-6190). The chain aborts if the empire stops being nomadic (abort_trigger in the event chain file).

## 条件与文明差异 Conditions and variants

仅限非 AI、is_nomadic 的国家（nomads_events_1.txt:1737-1740）。

Only non-AI nomadic empires (nomads_events_1.txt:1737-1740).

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 这些隐藏的完成事件不是可读文档，故未列入树。
  The hidden completion events are not readable docs, so they are not in the tree.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
