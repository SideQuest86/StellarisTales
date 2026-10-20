# 一个请求 / A Request

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 宗主国每五年一次的随机脉冲 on_five_year_random_pulse_overlord（00_on_actions.txt:521-535）：无事200，11个事件链各10（subject.1、50、100、1001、1050、1100、2001、2050、2100、3001、3050）；每条链的隐藏派发事件检查冷却标志和条件。
  The overlord's five-year random pulse on_five_year_random_pulse_overlord (00_on_actions.txt:521-535): nothing 200, eleven chains at 10 each (subject.1, 50, 100, 1001, 1050, 1100, 2001, 2050, 2100, 3001, 3050); the hidden dispatcher of each chain checks cooldown flags and conditions.
- 派发 subject.50（隐藏）：宗主国有堡垒型附庸，且某附庸星港等级可升级而宗主国已拥有对应科技、星港尚无该科技、合金储备足够（750/1500/4000）；设置“请求”标志后触发 55。
  Hidden dispatcher subject.50: an overlord with a Bulwark subject whose starbase could be upgraded to a size the overlord has the tech for (and the subject lacks), with enough alloys (750 / 1500 / 4000); it sets a request flag and fires 55.

## 剧情脉络 Story outline

- 55「请求」（附庸）：a 向宗主国发出请求 → 15天后 60「请求」（宗主国）：a 派出工程师 → 150天后 62「升级后的基地」；b 拒绝 → 65「请求被拒」。55.b 放弃。
  55 "A Request" (subject): a send a request -> 60 "A Request" (overlord) 15 days later: a send engineers -> 62 "The Upgraded Base" after 150 days; b refuse -> 65 "Request Denied". 55.b gives up.
- 链上的事件成对发给宗主国和附庸国双方；窗口措辞随玩家扮演的一方而异。
  Events of a chain are sent in pairs to the overlord and the subject; window wording differs for the side the player is on.

## 分支与结局 Branches and outcomes

- 62 与 65 互斥。
  62 and 65 are exclusive.

## 条件与文明差异 Conditions and variants

- 请求内容随标志 bulwark_specialist_request_citadel / star_fortress / starhold 而定。
  The request depends on the flags bulwark_specialist_request_citadel / star_fortress / starhold.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/overlord_subject_events.txt:361-700`；`common/on_actions/00_on_actions.txt:521-535`
- 已核对：派发条件、请求标志、选项分支。
  Checked: dispatcher conditions, request flags, option branches.
