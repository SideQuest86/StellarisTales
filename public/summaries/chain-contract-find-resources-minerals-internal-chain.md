# 矿物贮藏 / Mineral Cache

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Nomads

## 如何开始 How it starts

内部契约（费用 0，potential_issuer always = no）：游牧国家本应在每年脉冲中给自己发布（nomads.3010），但该事件的触发条件写着 always = no（“DISABLED FOR NOW”），所以正常游戏中不会出现。

Internal contract (cost 0, potential_issuer always = no): nomads would issue it to themselves in the yearly pulse (nomads.3010), but that event carries trigger always = no ("DISABLED FOR NOW"), so it does not occur in normal play.

## 剧情脉络 Story outline

若启用：在方舟邻近系标记一颗含minerals的行星，接受后启用专项 CONTRACT_FIND_RESOURCES_MINERALS_INTERNAL_PROJECT（30天，需 carries_colony=1），完成使计数器 +1。

If it were enabled: a planet with minerals in a neighbouring system is flagged, the special project CONTRACT_FIND_RESOURCES_MINERALS_INTERNAL_PROJECT (30 days, needs carries_colony = 1) is enabled and completing it raises the counter +1.

## 分支与结局 Branches and outcomes

完成：承包者直接获得 300 minerals（无声望或好感变化）。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: the operator receives 300 minerals directly (no opinion or trust effects). If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

同模板还有物理/工程“科学观测”内部契约，不在本清单。

The physics/engineering "scientific observation" internal contracts share the template but are not in this list.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/missions/missions/02_contracts.txt:3714-3721`; `common/event_chains/00_event_chains_nomads.txt:172`; `common/inline_scripts/contracts/FindResourceInternal.txt`; `common/inline_scripts/events/nomads_find_resource_internal_event.txt`; `events/nomads_events_1.txt:11375-11440`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。 该契约在正常游戏中不会出现（发布事件被禁用）。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure. This contract does not occur in normal play (its issuing event is disabled).
