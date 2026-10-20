# 战争狂热 / War Fever

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 宗主国每五年一次的随机脉冲 on_five_year_random_pulse_overlord（00_on_actions.txt:521-535）：无事200，11个事件链各10（subject.1、50、100、1001、1050、1100、2001、2050、2100、3001、3050）；每条链的隐藏派发事件检查冷却标志和条件。
  The overlord's five-year random pulse on_five_year_random_pulse_overlord (00_on_actions.txt:521-535): nothing 200, eleven chains at 10 each (subject.1, 50, 100, 1001, 1050, 1100, 2001, 2050, 2100, 3001, 3050); the hidden dispatcher of each chain checks cooldown flags and conditions.
- 派发 subject.1001（隐藏）：宗主国非交战，有非和平主义的堡垒型附庸（或军国主义专精附庸），双方均不在交战；冷却标志 cooldown_bulwark_event_chain_4_*。
  Hidden dispatcher subject.1001: an overlord not at war with a non-pacifist Bulwark (or militarist specialist) subject, neither at war; cooldown flags cooldown_bulwark_event_chain_4_*.

## 剧情脉络 Story outline

- 1003「战争狂热」（附庸）：一场鹰派运动：a 顺势利用 → 30天后 1005「战争的方向」（三个选项）并在45天后向宗主国发出 1010「战争狂热」；b 压制。
  1003 "War Fever" (subject): a hawkish movement: a ride it -> 1005 "A Direction for War" (three options) after 30 days, and 1010 "War Fever" is sent to the overlord after 45 days; b suppress it.
- 链上的事件成对发给宗主国和附庸国双方；窗口措辞随玩家扮演的一方而异。
  Events of a chain are sent in pairs to the overlord and the subject; window wording differs for the side the player is on.

## 分支与结局 Branches and outcomes

- 1005 与 1010 是对同一选项的两方后续（并行）。
  1005 and 1010 are the two sides' follow-ups of the same option (parallel).

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/overlord_subject_events.txt:1029-1182`；`common/on_actions/00_on_actions.txt:521-535`
- 已核对：派发条件与延迟。
  Checked: dispatcher conditions and delays.
