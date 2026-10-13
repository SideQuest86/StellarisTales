# 发大财的冒险 / Lucrative Adventures

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/overlord_subject_events.txt:13-360`；`common/on_actions/00_on_actions.txt:521-535`

## 如何开始 How it starts

- 宗主国每五年一次的随机脉冲 on_five_year_random_pulse_overlord（00_on_actions.txt:521-535）：无事200，11个事件链各10（subject.1、50、100、1001、1050、1100、2001、2050、2100、3001、3050）；每条链的隐藏派发事件检查冷却标志和条件。
  The overlord's five-year random pulse on_five_year_random_pulse_overlord (00_on_actions.txt:521-535): nothing 200, eleven chains at 10 each (subject.1, 50, 100, 1001, 1050, 1100, 2001, 2050, 2100, 3001, 3050); the hidden dispatcher of each chain checks cooldown flags and conditions.
- 派发 subject.1（本身可见）：宗主国非格式塔且冷却标志 cooldown_bulwark_event_chain_1_overlord 未设；拥有堡垒型（bulwark）专精附庸，或军国主义的专精附庸，非格式塔。
  subject.1 (itself visible): a non-gestalt overlord without the cooldown flag cooldown_bulwark_event_chain_1_overlord, with a non-gestalt Bulwark specialist subject (or a militarist specialist subject).

## 剧情脉络 Story outline

- 1「有利可图的冒险」（宗主）：老兵请求前往附庸首都。a 正式批准（获能量奖励）→ 30天后 3「来自宗主国的老兵」（附庸方），其选项a善加利用 → 15天后 10「良好关系」，b 送回 → 12「老兵归来」。b 放任（获能量奖励）→ 50%（和平主义/灵性者×1.25）同样走 3；50%（军国/唯物×1.25，且附庸需有首都系统以外的边境系统）15天后宗主国得 14「私掠冒险」，30天后附庸方得 subject.5（海盗袭扰，窗口为 pirate.50「发现海盗」）。c 拒绝 → 80% 无事；10% 16「违令——佣兵」并走 3；10% 18「违令——海盗」并触发 subject.5/pirate.50。
  1 "Lucrative Adventures" (overlord): veterans ask to travel to the capital of the subject. a formally grant leave (energy reward) -> 3 "Veterans from [overlord]" (subject side) after 30 days, whose option a uses them well -> 10 "Good Relations" after 15 days, b sends them back -> 12 "Veterans Returning". b let them do as they wish (energy reward) -> 50% (x1.25 for pacifist / spiritualist) the same 3; 50% (x1.25 for militarist / materialist, and the subject needs a border system beyond its capital) 14 "Privateering Adventures" for the overlord after 15 days and subject.5 (pirate trouble, window pirate.50 "Pirates Sighted!") for the subject after 30 days. c refuse -> 80% nothing; 10% 16 "Defying Orders - Mercenaries" plus 3; 10% 18 "Defying Orders - Pirates" plus subject.5 / pirate.50.
- 链上的事件成对发给宗主国和附庸国双方；窗口措辞随玩家扮演的一方而异。
  Events of a chain are sent in pairs to the overlord and the subject; window wording differs for the side the player is on.

## 分支与结局 Branches and outcomes

- c 的结果按权重互斥；a 的两条后续互斥。
  The outcomes of c are exclusive by weight; the two follow-ups of a are exclusive.

## 条件与文明差异 Conditions and variants

- 私掠结果的概率受修正（星号标注）。
  Privateering odds are modified (starred in the compiled weights).

## 审阅记录 Review notes

- 已核对：派发条件、选项与概率、跨故事 pirate.50（共享海盗事件）。
  Checked: dispatcher conditions, options and odds, the cross-story pirate.50 (a shared pirate event).
