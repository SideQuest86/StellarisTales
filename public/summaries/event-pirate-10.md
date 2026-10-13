# 海盗巢穴 / The Pirate Haven

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · 来源 Sources：`common/on_actions/00_on_actions.txt:997`、`events/pirate_events.txt:1043-1100`、`common/solar_system_initializers/hostile_system_initializers.txt:2834` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

舰队进入星系时（on_entering_system_fleet，common/on_actions/00_on_actions.txt:997）：该星系带有 pirate_home_system 星系旗标（海盗老巢初始化器，hostile_system_initializers.txt:2834，最多1个、生成率100），系统内有 pirate_home_system_fleet 旗标的舰队，且该舰队所有者尚无 privateers_found 旗标。

When a fleet enters a system (on_entering_system_fleet, common/on_actions/00_on_actions.txt:997): the system carries the pirate_home_system flag (the pirate haven initializer, hostile_system_initializers.txt:2834, max 1 instance, spawn chance 100), holds a fleet flagged pirate_home_system_fleet, and the fleet owner has no privateers_found flag yet.

## 剧情脉络 Story outline

只触发一次（设置 privateers_found）。两个互斥选项只在文字口吻上不同：国家尚未经历“太空海盗的诞生”且没有与海盗国家通讯时给“无出生”版（nobirth），否则给“有出生”版（birth）。没有后续链接。

Fires once per empire (sets privateers_found). The two exclusive options differ only in tone: the "nobirth" version if the empire has not had the Birth of Space Piracy and has no communications with a pirate country, otherwise the "birth" version. Nothing follows.

## 分支与结局 Branches and outcomes

摧毁老巢见 event-pirate-13。

Destroying the haven is event-pirate-13.

## 条件与文明差异 Conditions and variants

选项由 birth_of_piracy 旗标或与海盗国家的通讯决定。

The options depend on the birth_of_piracy flag or communications with a pirate country.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
