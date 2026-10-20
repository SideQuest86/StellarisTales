# 直面风暴 / Face the Tempest

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Cosmic Storms

## 如何开始 How it starts

风暴离开某个系统时，隐藏事件 cstorms.500 检查：该系统有所有者、所有者没有“工业风暴防护”科技，且这是该国遇到的第一场风暴，风暴范围内没有该国的其他系统（on_storm_left_system，00_on_actions.txt:5429）。

When a storm leaves a system, hidden cstorms.500 checks: the system has an owner without tech_industrial_storm_protection, it is the first storm met by that country, and no other system of the owner lies inside the storm (on_storm_left_system, 00_on_actions.txt:5429).

## 剧情脉络 Story outline

随后 cstorms.505“直面风暴”弹出，设置 triggered_storm_protection_boost 标记。

cstorms.505 "Face the Tempest" then appears and the triggered_storm_protection_boost flag is set.

## 分支与结局 Branches and outcomes

唯一选项“令人着迷”：为“工业风暴防护”科技提供10%进度或研究选项。

The single option "Fascinating" grants 10% progress or a research option for Industrial Storm Protection.

## 条件与文明差异 Conditions and variants

每国一次；需要 Cosmic Storms DLC。

Once per country; needs the Cosmic Storms DLC.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/cosmic_storms_events_1.txt:486-553; common/on_actions/00_on_actions.txt:5429
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
