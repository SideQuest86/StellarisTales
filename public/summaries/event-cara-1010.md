# 行商舰队：范格利集团 / Caravan Fleet: The Vengralian Trium

- 分类 Category：C8 银河轶事 / Galactic miscellany

## 如何开始 How it starts

这支车队（The Vengralian Trium）在银河中依次访问若干个国家的首都（视银河国家数量定1–10个，cara.1000）；穿越他国国境时触发交易菜单 cara.1100；初次接触（first_contact 的结束阶段）时弹出自我介绍 cara.1020。

The caravan fleet (The Vengralian Trium) tours the capitals of a number of empires (1–10 depending on the number of empires, cara.1000); crossing a border triggers the trade menu cara.1100; at the end of first contact the introduction cara.1020 shows.

## 剧情脉络 Story outline

cara.1020（初次接触）或 cara.1100（穿越国境）→ cara.1200 交易：每次现生成一份交易（cara_generate_deal1），可以成交、选“以后再说”或拒绝。选“以后再说”→ 这支车队下次穿越国境时发出 cara.1251“最后一次机会”。

cara.1020 (first contact) or cara.1100 (border crossing) -> cara.1200 the deal: a fresh deal is generated each time (cara_generate_deal1) and can be taken, postponed or refused. Postponing -> the next time this fleet crosses a border it offers cara.1251 "last call".

## 分支与结局 Branches and outcomes

成交 / 以后再说 / 拒绝或退出；本国歼灭车队则走 cara.1002 / cara.1003（通知）。

Take the deal / later / refuse or leave; destroying the fleet leads to cara.1002 / cara.1003 (notices).

## 条件与文明差异 Conditions and variants

交易内容和价格由脚本本地化 GetFleet1DealProduct / Cost 现场决定；嗜杀帝国只有“去死”式退出。

Deal product and cost are produced by the scripted localisation GetFleet1DealProduct / Cost; homicidal empires only get the "Die..." exit.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`events/caravaneer_events.txt:1294-1960`; `common/on_actions/00_on_actions.txt:1114-1117,1656`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
核对了行程、国境触发、首次接触入口、最后一次报价与被歼灭处理；三支车队的脚本逐行相同，仅数字不同。原先分开的3张卡（1002、1020、1250）并入本故事。

Route, border trigger, first-contact entry, last offer and destruction handling were checked; the three fleets use identical scripts with different numbers. The former three cards (1002, 1020, 1250) are merged here.
