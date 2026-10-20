# 拦截袭击 / Intercept Raid

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

“可汗后裔”起源（origin_heirs_of_the_khan）内部的契约：nomads.500 循环中，若未曾赢得可汗决斗（won_khan_duel），以权重3“生成契约”，且无同类进行中契约、未处于“已震慑追猎者”状态；在首都1–5跳内选一个有情报的系统，用 issue_contract 发布（2000天内不重复同一份）。费用 0。

Internal contract for the Heirs of the Khan origin (origin_heirs_of_the_khan): in the nomads.500 loop, if the Khan duel is not yet won, a weight-3 "spawn contract" draw (blocked by a running heirs contract or by the intimidated_marauder_hunters flag) picks an intelligence-visible system 1–5 jumps from the capital and issues the contract (the same one is not issued again for 2000 days). Cost 0.

## 剧情脉络 Story outline

接受后在目标系创建兴趣点，若方舟已在系内则直接触发 nomads.520；击败途经该系的掠夺者追猎舰队（heirs_raider_fleet，nomads.5xx 战斗钩子，events/nomads_events_1.txt:4340-4366）后计数器 +1 完成。

On acceptance a point of interest is placed and, if the arkship is already in the system, nomads.520 fires directly; destroying the passing marauder hunter fleet (heirs_raider_fleet, combat hook at events/nomads_events_1.txt:4340-4366) raises the counter +1.

## 分支与结局 Branches and outcomes

完成：贸易 500 × 已击败追猎者数，计数器“已击败追猎者”+1；之后又以 1000±600 天后的 nomads.500 继续循环。取消则 200±100 天后重试。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 500 × the number of defeated hunters, the defeated-hunters counter +1; nomads.500 then continues after 1000 (+/-600) days. On cancel it retries after 200 (+/-100) days. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

只对可汗后裔起源有意义。

Only meaningful for the Heirs of the Khan origin.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:5040-5143`; `common/event_chains/00_event_chains_nomads.txt:496`; `events/nomads_events_1.txt:3696-3830,4330-4366`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
