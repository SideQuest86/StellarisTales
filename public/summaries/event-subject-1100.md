# 争吵的指挥官 / The Bickering Commanders

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/overlord_subject_events.txt:1465-2470`；`common/on_actions/00_on_actions.txt:521-535,4793-4799`；`common/scripted_effects/overlord_effects.txt:1-60`

## 如何开始 How it starts

- 宗主国每五年一次的随机脉冲 on_five_year_random_pulse_overlord（00_on_actions.txt:521-535）：无事200，11个事件链各10（subject.1、50、100、1001、1050、1100、2001、2050、2100、3001、3050）；每条链的隐藏派发事件检查冷却标志和条件。
  The overlord's five-year random pulse on_five_year_random_pulse_overlord (00_on_actions.txt:521-535): nothing 200, eleven chains at 10 each (subject.1, 50, 100, 1001, 1050, 1100, 2001, 2050, 2100, 3001, 3050); the hidden dispatcher of each chain checks cooldown flags and conditions.
- 派发 subject.1100（隐藏）：宗主国有堡垒型、非格式塔、非和平主义、民主或寡头制的附庸，且附庸至少有两名指挥官；冷却标志 cooldown_bulwark_event_chain_6_*。
  Hidden dispatcher subject.1100: an overlord with a Bulwark, non-gestalt, non-pacifist democratic or oligarchic subject that has at least two commanders; cooldown flags cooldown_bulwark_event_chain_6_*.

## 剧情脉络 Story outline

- 1102「争吵的指挥官」（附庸）：a 结束争吵 → 150天后 25%（经修正）1105「分裂的海军部」，b 放任 → 90% 1105 / 10% 1110「宗主国介入」。
  1102 "The Bickering Commanders" (subject): a end the bickering -> 150 days later 25% (modified) 1105 "A Split Admiralty", b let it be -> 90% 1105 / 10% 1110 "Overlord Intervened".
- 1105 → 150天后（宗主国）1107：a 介入 → 75% 1110（结束）/25% 1112「宗主国干扰」→ 150天后 1115；b 不介入 → 1115「杀意」。
  1105 -> 1107 (overlord) after 150 days: a step in -> 75% 1110 (the end) / 25% 1112 "Overlord Disruption" -> 1115 after 150 days; b do not -> 1115 "Murderous Intent".
- 1115 设定民主派/寡头派各50的变量，之后隐藏 1117 每150天从五个事件池抽一个（1120–1140），共三次；然后 1142「酝酿中的风暴」（选定一方）→ 15天后 1145「对立的终结」；若有分离势力的对手则 1147「分裂的附庸」。
  1115 sets 50/50 democratic / oligarchic side variables, then hidden 1117 draws one of five pool events (1120-1140) every 150 days, three times; then 1142 "The Brewing Storm" (choose a side) -> 1145 "The End of the Rivalry" 15 days later; with a separatist opposition also 1147 "A Split Vassal".

## 分支与结局 Branches and outcomes

- 1110 / 1112 互斥；五个池事件互斥地抽取（三次）。
  1110 / 1112 are exclusive; the five pool events are drawn exclusively (three times).

## 条件与文明差异 Conditions and variants

- 池事件的选项会增减民主/寡头两派的影响力。
  The pool events' options raise or lower the influence of the democratic and oligarchic sides.

## 审阅记录 Review notes

- 已核对：派发条件、1115 → 1117 → on_action → 1142 的计数循环。
  Checked: dispatcher conditions and the 1115 -> 1117 -> on_action -> 1142 counting loop.
- 更正：1120–1140 原为五个互不相连的单窗口故事，现并入。
  Correction: 1120-1140 were five disconnected stories; merged here.
