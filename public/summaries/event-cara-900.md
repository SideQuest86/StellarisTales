# 行商：堂吉被摧毁 / Caravaneers: Tungle Destroyed

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/caravaneer_events.txt:3715-4130`; `common/on_actions/00_on_actions.txt:1416`
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

贸易站舰船（标记 cara_home_tradestation）被击毁时（on_ship_destroyed_victim）触发隐藏事件 cara.900：通知毁灭者（910）和其他帝国（920），并在60天后选一个符合条件的星系所有者发出重建提议（930）。

When the tradestation ship (flag cara_home_tradestation) is destroyed (on_ship_destroyed_victim) the hidden event cara.900 notifies the destroyer (910) and the other empires (920), and 60 days later picks a suitable system owner for the re-establishment offer (930).

## 剧情脉络 Story outline

930 的选项：接受（在其系统重建贸易站 → 940 通知他国）或两种拒绝；拒绝会设 reestablishment_rejected 并在20天后把提议转给另一个符合条件的帝国，直到有人接受或无人可选。若所有行商都被消灭则设全局旗标 caravaneers_destroyed（cara.945）。

Options of 930: accept (the station is rebuilt in their system → 940 notifies others) or one of two refusals; a refusal sets reestablishment_rejected and passes the offer to another eligible empire after 20 days, until someone accepts or no one is left. If all caravaneers die the global flag caravaneers_destroyed is set (cara.945).

## 分支与结局 Branches and outcomes

接受 / 拒绝（拒绝循环转给下一位）。

Accept / refuse (refusals rotate the offer onward).

## 条件与文明差异 Conditions and variants

无文明差异。

No empire variants.

## 审阅记录 Review notes

核对了触发、收件人选择和重建循环。

Trigger, recipient selection and the re-establishment loop were checked.
