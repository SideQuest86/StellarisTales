# 勤勉的腐烂工蚁 / Diligent Decaying Drones

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Necroids · 来源 Sources：`events/necroids_events_2.txt:251-308`、`common/on_actions/00_on_actions.txt:39` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

开局时（on_game_start_country，common/on_actions/00_on_actions.txt:39）隐藏事件 necroids.255 对拥有“永身雇佣制”国民理念（civic_permanent_employment）的国家触发，并设置 necroids.260 在36000天（约98.6年）加0–7200天随机延迟后出现。

At game start (on_game_start_country, common/on_actions/00_on_actions.txt:39) hidden necroids.255 fires for empires with the Permanent Employment civic (civic_permanent_employment) and schedules necroids.260 after 36000 days (about 98.6 years) plus 0-7200 random days.

## 剧情脉络 Story outline

necroids.260“勤勉的腐烂工蚁”（265-308）：到时仍有该国民理念且拥有僵尸人口时，随机选一个僵尸人口作为“还清债务的僵尸”。选项a（仅非威权）：放他自由（该人口被移除）；选项b：再给债务加零——非威权国家得到永久修正 zombie_contract_manipulation。

necroids.260 "Diligent Decaying Drones" (265-308): if the civic is still held and the empire owns zombie pops, a random zombie pop becomes the debt-free zombie. Option a (non-authoritarian only): free him (the pop is removed). Option b: add more zeros to the debt - non-authoritarian empires gain the permanent modifier zombie_contract_manipulation.

## 分支与结局 Branches and outcomes

a 与 b 互斥。

a and b are exclusive.

## 条件与文明差异 Conditions and variants

选项a仅对非威权国家开放；b对非威权国家有额外惩罚修正。

Option a is for non-authoritarian empires only; b carries an extra modifier for non-authoritarian ones.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
