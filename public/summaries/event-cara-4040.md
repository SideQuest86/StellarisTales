# 行商：热烈欢迎！ / Caravaneers: A warm welcome!

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/caravaneer_events.txt:4717-4930`; `common/on_actions/00_on_actions.txt:443-451`; `events/on_action_events_3.txt:38`
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

每年的行商随机事件（on_action on_yearly_random_pulse_country_caravaneers_list，由 action.2001 每年触发；权重 4000/4010/4020 各1，4030/4040/4050 各2，common/on_actions/00_on_actions.txt:443-451）。需要国境内有行商车队所在的殖民地系统（caravaneer_fleet_events_valid）；全局冷却：任一行商事件后720天内不再触发（flag caravan_recent_event），该事件自己还有10年冷却。 本事件条件：亲外或唯物帝国，国境内的殖民地系统里有行商车队，且10年内未发生。

Yearly random caravaneer events (on_action on_yearly_random_pulse_country_caravaneers_list, fired yearly via action.2001; weights 4000/4010/4020 = 1 each, 4030/4040/4050 = 2 each, common/on_actions/00_on_actions.txt:443-451). Needs a caravaneer fleet in a colonised system inside the borders (caravaneer_fleet_events_valid); a global cooldown of 720 days after any caravaneer event (flag caravan_recent_event) and a 10-year cooldown per event. This event needs: A xenophile or materialist empire with a caravaneer fleet in a colonised system inside the borders, not in the last 10 years.

## 剧情脉络 Story outline

唯一选项：获得每月能量加成（tier2），并有（权重10:20 的）机会在200±140天后出现派对余波 cara.4041：多出3个车队物种的人口群，选项依伦理而异。

Only option: a monthly energy bonus (tier 2) and a chance (weights 10 vs 20, modified) of the aftermath cara.4041 200±140 days later, adding three pop groups of the host species, with options by ethic.

## 分支与结局 Branches and outcomes

见上；余波为随机。

See above; the aftermath is random.

## 条件与文明差异 Conditions and variants

4041 的三个选项分亲外/排外/其他。

The three options of 4041 are for xenophiles / xenophobes / others.

## 审阅记录 Review notes

核对了脚本触发、冷却旗标与选项效果；它与同一池里的其他事件相互独立。

Trigger, cooldown flags and option effects were checked against the script; it is independent of the other events of the same pool.
