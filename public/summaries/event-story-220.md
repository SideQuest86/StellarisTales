# 水晶球 / Crystal Ball

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

舰队进入晶态实体的“水晶母巢”系统（有 crystal_home_system 旗标、系统内有大型晶体空间站、玩家已遇到过晶体）时（on_entering_system_fleet，common/on_actions/00_on_actions.txt:988），story.220 弹出，每个国家只显示一次（found_crystal_construct）。

A fleet entering the crystalline home system (star flag crystal_home_system, a large crystal station present, the player has met crystals before; on_entering_system_fleet, common/on_actions/00_on_actions.txt:988) shows story.220 once per country (found_crystal_construct).

## 剧情脉络 Story outline

story.220“水晶球”：正文随是否集群意识、是否已有 crystal_hunting_buff（猎晶增益）而变。未猎晶的帝国只有“OK”；有猎晶增益时选项为“战斗岗位！”。击毁大型晶体空间站（on_ship_destroyed_perp，common/on_actions/00_on_actions.txt:1458）时 story.222“击碎晶体”弹出，给出 tech_crystal_armor_2 的研究选项。

story.220 "Crystal Ball": the text varies with gestalt status and the crystal_hunting_buff. Empires without the buff only have "OK"; with the buff the option is "Battlestations!". Destroying the large crystal station (on_ship_destroyed_perp, common/on_actions/00_on_actions.txt:1458) shows story.222 "Crystal Shattered", which grants a research option for tech_crystal_armor_2.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/story_events.txt:2644-2741; common/on_actions/00_on_actions.txt:988,1458
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
