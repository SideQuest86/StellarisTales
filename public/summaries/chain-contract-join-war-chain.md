# 加入战争 / Join Wars

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:3101-3317`; `common/event_chains/00_event_chains_nomads.txt:382`; `events/nomads_events_1.txt:12495-12860`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

发布者正处于战争中（is_at_war）；承包者不得与发布者交战、有防御条约、附庸关系或同联邦，亦不得是联邦成员或附庸，且不会因此对盟友/停战对象开战。费用 10000，接受期限1800天，属“瞬时契约”。

The issuer is at war (is_at_war); the operator must not be at war with, in a defensive pact, subject/overlord or federation with the issuer, must not be in a federation or a subject, and must not thereby fight an ally or truce partner. Cost 10000, window 1800 days; it is an "instant" contract.

## 剧情脉络 Story outline

接受时若无通讯则建立通讯，承包者立即以 join_war_on_side 加入发布者的所有战争，并同时把计数器 +1，契约即刻成功；事件链随战争结束而结束（nomads.3075/3076 等清理）。

On acceptance communications are established if needed, the operator joins all of the issuer's wars at once with join_war_on_side and raises the counter +1 in the same step; the chain ends with the war (cleanup by nomads.3075/3076 etc.).

## 分支与结局 Branches and outcomes

完成：承包者贸易 16750 + 合金 3350（放大）；Hired Guns 为 25000 + 5000；影响力 150，发布者好感 +150、信任 +15；参战战争被标记 nomad_mercs。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 16750 + alloys 3350 (scaled), 25000 + 5000 for Hired Guns; influence 150, issuer opinion +150, trust +15; the wars are flagged nomad_mercs. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

Hired Guns 报酬更高。

Higher payout for Hired Guns.

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
