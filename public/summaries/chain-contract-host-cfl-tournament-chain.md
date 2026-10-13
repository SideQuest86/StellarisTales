# 提名冠铸秀锦标赛的举办恒星系 / Nominate System for CFL Tournament

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/03_enclave_contracts.txt:20-170`; `common/event_chains/00_event_chains_nomads.txt:508`; `common/missions/missions/03_enclave_contracts.txt:20-170`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

冠铸秀（Champion's Forge Live!）飞地：已购买场地权的帝国（国家旗标 cfl_hoster）可发布本契约，提名举办锦标赛的星系；游牧发布者须在自己的驿站系，其他帝国须在自有星系，且飞地当前没有进行中的比赛。接受期限仅100天，没有承包者（potential_operator always = no）。

Champion's Forge Live! enclave: an empire that bought the venue rights (country flag cfl_hoster) can issue this contract to nominate the tournament system; a nomadic issuer must use its own waystation system, others an owned system, and the enclave must not be mid-tournament. Acceptance window 100 days; there is no operator (potential_operator always = no).

## 剧情脉络 Story outline

发布（on_issue）时消耗 cfl_hoster 旗标，在目标系随机选一颗不可殖民的行星，并让飞地舰队跳到相邻合适系统、前往该行星（arrival_effect champions_forge_contract_arrival_effect）；比赛进行中则契约中止。后续比赛见 event-nomads-150 / 250 / 275 等。

On issue the cfl_hoster flag is consumed, a non-colonisable planet in the system is chosen and the enclave fleet jumps to a suitable neighbouring system and sails to it (arrival_effect champions_forge_contract_arrival_effect); the contract aborts if a tournament is ongoing. The tournament itself is in event-nomads-150 / 250 / 275 etc.

## 分支与结局 Branches and outcomes

契约本身没有 on_success 效果；奖励来自后续比赛事件。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

The contract has no on_success effect; any reward comes from the tournament events. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

无。

None.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
