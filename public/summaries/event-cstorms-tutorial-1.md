# 教程：风暴操控 / Tutorial: Storm Manipulation

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Cosmic Storms · 来源 Sources：`events/cosmic_storms_tutorial_events.txt:1-35`、`common/on_actions/00_on_actions.txt:2731` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

任一科技提升时（on_tech_increased，common/on_actions/00_on_actions.txt:2731）检查 cstorms_tutorial.1。

Checked on every technology increase (on_tech_increased, common/on_actions/00_on_actions.txt:2731).

## 剧情脉络 Story outline

提示窗口“教程：风暴操控”：触发条件为非游牧国家、拥有宇宙风暴 DLC、教程等级为2（is_tutorial_level = 2）、非 AI（pre_triggers）、已研究 tech_storm_manipulation，且没有 storm_tech_influence_tutorial 旗标。出现一次后设置该旗标，不再重复。唯一选项“明白了”。

An advisor tutorial "Storm Manipulation": non-nomadic, non-AI (pre_triggers) empire with the Cosmic Storms DLC, tutorial level 2, having researched tech_storm_manipulation and not yet having the storm_tech_influence_tutorial flag. It sets that flag, so it shows once. One option, Understood.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

仅教程等级2的玩家会看到。

Only seen with tutorial level 2.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
