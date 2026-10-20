# 遭遇圣地 / Holy World Encountered

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

用科学船勘测一颗无殖民地的“圣地”（holy_planet 修正）时（on_survey_planet，common/on_actions/00_on_actions.txt:1140），若存在灵性堕落帝国（fallen_empire_2）、玩家非AI/非 Scion 起源且未遇见过圣地，弹出 fallen_empires.100（只触发一次，encountered_holy_world）。

Surveying an uncolonised "Holy World" (holy_planet modifier) with a science ship (on_survey_planet, common/on_actions/00_on_actions.txt:1140), when a spiritualist fallen empire (fallen_empire_2) exists, the player is human and not Scion origin and has not met a holy world yet, shows fallen_empires.100 (once, encountered_holy_world).

## 剧情脉络 Story outline

一个窗口：正文分6种（是否灵性/集群/已与灵性堕落帝国通讯）；选项：好奇（团结）；a 以尊敬之心看待（灵性或合作立场）；b 此地应归我们（扩张立场或集群，需已接触）；c 可以在此繁荣；d/e 对堕落帝国的轻蔑态度，各有立场限制。圣地被毁的后果见“圣地”故事（event-planet-destruction-600）。

One window with six text variants (spiritualist, gestalt, or not; already in contact with the spiritualist fallen empire or not). Options: curious (unity); a revere it (spiritualist or cooperative stance); b ours for the taking (expansionist stance or gestalt, in contact); c we could thrive there; d/e scorn for the fallen empire, each stance-gated. What happens when a holy world is destroyed is in the "Holy World" story (event-planet-destruction-600).

## 分支与结局 Branches and outcomes

选项按立场互斥。

Options are exclusive by stance.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/fallen_empire_events.txt:694-900; common/on_actions/00_on_actions.txt:1140 on_survey_planet
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
