# 行商：幽幽青草 / Caravaneers: Greener Grass

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/caravaneer_events.txt:4361-4445`; `common/on_actions/00_on_actions.txt:443-451`; `events/on_action_events_3.txt:38`
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

每年的行商随机事件（on_action on_yearly_random_pulse_country_caravaneers_list，由 action.2001 每年触发；权重 4000/4010/4020 各1，4030/4040/4050 各2，common/on_actions/00_on_actions.txt:443-451）。需要国境内有行商车队所在的殖民地系统（caravaneer_fleet_events_valid）；全局冷却：任一行商事件后720天内不再触发（flag caravan_recent_event），该事件自己还有10年冷却。 本事件条件：殖民地有600+人口、同系有行商车队、且有幸福度<60%的非奴隶人口；非集群。

Yearly random caravaneer events (on_action on_yearly_random_pulse_country_caravaneers_list, fired yearly via action.2001; weights 4000/4010/4020 = 1 each, 4030/4040/4050 = 2 each, common/on_actions/00_on_actions.txt:443-451). Needs a caravaneer fleet in a colonised system inside the borders (caravaneer_fleet_events_valid); a global cooldown of 720 days after any caravaneer event (flag caravan_recent_event) and a 10-year cooldown per event. This event needs: A colony with 600+ pops, a caravaneer fleet in the system and unhappy (<60%) non-enslaved pops; non-gestalt.

## 剧情脉络 Story outline

一名不满的人口离开去加入车队；威权帝国的选项“愤怒”额外损失10影响力。

One unhappy pop leaves to join the fleet; for authoritarian empires the option "Outrage" also costs 10 influence.

## 分支与结局 Branches and outcomes

见上；没有进一步的分支。

See above; no further branches.

## 条件与文明差异 Conditions and variants

选项按是否威权互斥。

Options are exclusive by authoritarian ethic.

## 审阅记录 Review notes

核对了脚本触发、冷却旗标与选项效果；它与同一池里的其他事件相互独立。

Trigger, cooldown flags and option effects were checked against the script; it is independent of the other events of the same pool.
