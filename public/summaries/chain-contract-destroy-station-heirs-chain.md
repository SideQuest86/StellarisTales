# $contract_destroy_station_heirs_heirs$ / $contract_destroy_station_heirs_heirs$

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

同一起源的另一份内部契约（权重1，与拦截袭击互斥抽取）：为目标系创建兴趣点，并在 140 距离处生成一支掠夺者“前哨站舰队”；之前已击败的追猎者少于8个时生成战士前哨（NAME_Warrior_Freehold），否则生成虚空居民（NAME_Void_Dwelling）。接受期限与完成期限均为1800天。

Another internal contract of the same origin (weight 1, drawn exclusively with Intercept Raid): a point of interest is created and a marauder "station fleet" is spawned 140 units away — a warrior outpost (NAME_Warrior_Freehold) while fewer than 8 hunters have been defeated, otherwise a Void-Dwelling one (NAME_Void_Dwelling). Both the acceptance and completion windows are 1800 days.

## 剧情脉络 Story outline

摧毁该前哨舰队（heirs_raider_starbase，nomads.530，events/nomads_events_1.txt:4366-4425）后计数器 +1 完成。另有“开局版”contract_destroy_station_heirs_start（nomads.501 发布，只生成战士前哨）共用同一事件链。

Destroying that outpost fleet (heirs_raider_starbase, nomads.530, events/nomads_events_1.txt:4366-4425) raises the counter +1. A starting version, contract_destroy_station_heirs_start (issued by nomads.501, always a warrior outpost), shares the same chain.

## 分支与结局 Branches and outcomes

完成：追猎者计数 -1，并获得2200天的“已震慑追猎者”旗标（暂停后续生成）；开局版则直接得到贸易 1000。之后 nomads.500 以 1000±600 天后继续。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the spawner count -1 and a 2200-day intimidated_marauder_hunters flag (pausing further spawns); the starting version simply gives trade 1000. nomads.500 continues after 1000 (+/-600) days. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

标题为未解析的本地化引用 $contract_destroy_station_heirs_heirs$（见 Requests）。

The title is an unresolved localisation token $contract_destroy_station_heirs_heirs$ (see Requests).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:5145-5410`; `common/event_chains/00_event_chains_nomads.txt:502`; `events/nomads_events_1.txt:3696-3830,4366-4425`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
