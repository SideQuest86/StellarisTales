# 失去单位 / Unit Lost

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Synthetic Dawn

## 如何开始 How it starts

on_action on_machine_leader_malfunction（注释：“约每十年由 syndaw.11 触发”）等权抽取 syndaw.21 / 25 / 26；但触发它的 syndaw.10 / 11 整个被注释掉，在全部脚本里也没有其他 fire_on_action，所以这些事件在已安装的游戏里不会发生。

The on_action on_machine_leader_malfunction (comment: "fired approximately every decade via syndaw.11") draws syndaw.21 / 25 / 26 with equal weight; but syndaw.10 / 11 that would fire it are entirely commented out and no other script fires the on_action, so the events do not occur in the installed game.

## 剧情脉络 Story outline

三个单窗口通知：科研船上的机械科学家（21）、舰队指挥官（25）或行星总督（26）因故障“失效”（被 kill_leader 清除），唯一选项“真不幸”。若被启用，由随机一个满足条件的领袖承担。

Three single-window notices: a mechanical scientist on a science ship (21), a fleet commander (25) or a planetary governor (26) "ceases functioning" (removed with kill_leader), with one option "Unfortunate". If enabled, a random qualifying leader would be the victim.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

21 需要机械物种科学家在舰队中，25 需要机械指挥官在舰队中，26 需要机械物种的非统治者行星总督。

21 needs a mechanical scientist assigned to a fleet, 25 a mechanical commander in a fleet, 26 a non-ruler mechanical planetary governor.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`events/synthetic_dawn_events.txt:12-218`; `common/on_actions/00_on_actions.txt:5153-5159`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
核对了三个事件与被注释的 syndaw.10/11；已标为无法自然到达。同类的合成人版本在 events/on_action_events_1.txt:7068 起（不在本清单）。

Checked the three events and the commented-out syndaw.10/11; marked as not naturally reachable. The synthetic-empire counterparts start at events/on_action_events_1.txt:7068 (not in this list).
