# 岩居兽残骸 / Cutholoid Remains

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Grand Archive · 来源 Sources：`events/grand_archive_events.txt:3573-3650`、`common/on_actions/00_on_actions.txt:1432`、`common/special_projects/04_projects_grand_archive.txt:153-185` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

击毁岩居兽（Cutholoid）舰船时（on_ship_destroyed_victim，common/on_actions/00_on_actions.txt:1432）隐藏事件 grand_archive.3025：受害者是岩居兽国家，把其存活计数-1；若击杀者是普通或失落帝国，则在残骸处创建岩居兽残骸环境物体并为击杀者启用 CUTHOLOID_DEBRIS_PROJECT。

When a Cutholoid ship is destroyed (on_ship_destroyed_victim, common/on_actions/00_on_actions.txt:1432) hidden grand_archive.3025 fires on the Cutholoid country: it lowers the alive-Cutholoid count by 1 and, if the killer is a default or fallen empire, creates a Cutholoid debris ambient object and enables CUTHOLOID_DEBRIS_PROJECT for the killer.

## 剧情脉络 Story outline

项目“岩居兽残骸”（90天，限时1800天，需科学家与科学舰）成功后，隐藏事件 grand_archive.3026 销毁残骸，并二选一（1:1）：1000矿物或200稀有水晶，放在该星系的碎片资源中。失败则残骸消失。

The project "Cutholoid Remains" (90 days, 1800-day limit, scientist and science ship) on success fires hidden grand_archive.3026, which removes the debris and rolls 1:1 between 1000 minerals or 200 rare crystals placed as system debris. On failure the debris vanishes.

## 分支与结局 Branches and outcomes

无可读后续窗口，故本故事只有项目卡。

There is no readable follow-up window, so the story is only the project card.

## 条件与文明差异 Conditions and variants

仅限普通或失落帝国的击杀者。

Only default or fallen empire killers.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 未确定 Open: Part of the Cutholoid storyline owned by event-grand-archive-3010 (another reviewer).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
