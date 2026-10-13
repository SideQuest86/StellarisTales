# 虚空虫巢穴被毁 / Voidworm homes destroyed

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/grand_archive_events.txt · DLC：Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 2050（on_fleet_destroyed_perp，common/on_actions/00_on_actions.txt:1675）与 2051（on_ship_destroyed_perp，common/on_actions/00_on_actions.txt:1474）（events/grand_archive_events.txt:554-661）：被消灭的是虚空虫（敌对国家类型）的舰队或母巢飞船（voidworm_nest）。
Hidden 2050 (on_fleet_destroyed_perp, last fleet) and 2051 (on_ship_destroyed_perp, nest ship) run when a hostile Voidworm fleet or nest is destroyed.

## 剧情脉络 Story outline

- 2051：摧毁一个母巢所在系统（母巢飞船 voidworm_nest）：移除该系统标记；若已没有任何虚空虫母巢系统，则结束虚空虫危机，若虚空虫舰船也已清空则经 2052 设全局标记“虚空虫已灭绝”并给 2053，否则也给 2053；还有母巢时给 2054。
  2051: a nest system falls; if it was the last one the crisis ends and 2053 is shown, otherwise 2054.
- 2050：摧毁虚空虫的最后一支舰队（且不是母巢）→ 2052 → 2053（灭绝，获得“虚空虫之心”标本，仅在虚空虫危机结束后）。
  2050: the last Voidworm fleet falls -> 2052 -> 2053 (extinct; Voidworm Heart specimen).
- 2053 “虚空虫被肃清”：无选项后果，可得标本；2054 “虚空虫巢穴被毁”：获得“虚空虫杀手”修正。
  2053 is a notice (specimen); 2054 grants the Voidworm Slayers modifier.

## 分支与结局 Branches and outcomes

- 2053 与 2054 互斥：最后一个母巢（或最后的舰队）→ 2053；仍有其它母巢 → 2054。 2053 and 2054 are exclusive.

## 条件与文明差异 Conditions and variants

- 危机期间摧毁最后母巢会把“虚空虫瘟疫”情境直接结束（add_situation_progress 1000）。 Destroying the last nest ends the plague crisis.

## 审阅记录 Review notes

- 已核对 Checked：grand_archive.2050-2054 的触发与效果。
- 更正 Corrections：两个只含隐藏路由的故事（2050 / 2051）并为一个。 The two router-only stories are merged.
