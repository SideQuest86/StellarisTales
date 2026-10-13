# 囚犯处置 / Prisoner Disposal

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/missions/missions/02_contracts.txt:2591-2782`; `common/event_chains/00_event_chains_nomads.txt:442`; `events/nomads_events_1.txt:11757-12210`
- DLC：Nomads
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

仅非集群发布者；其自有星系里有从事罪犯职业的行星。承包者接受后在该星球创建“接人”兴趣点；方舟抵达后触发 nomads.3050 “囚犯登船”。费用 500，接受期限1800天。

Non-gestalt issuers only, in an owned system with a planet working criminal jobs. After acceptance a pickup point of interest is placed on that planet; when the arkship arrives nomads.3050 "Prisoners Embarked" fires. Cost 500, window 1800 days.

## 剧情脉络 Story outline

nomads.3050 提供四个选项：之后在别处放下（需此时无其他契约动作，AI 不选）、直接留在船上（承包者须非奴隶主）、当作奴隶（需发布者即接人星球的所有者是奴隶主）、释放（随机得到较轻或较重的船上犯罪修正）；后三者立即使计数器 +1。选“放下”则运送后经 3051–3053 报告，若被发布者发现（detected_by_issuer）则契约被取消且好感大跌，否则计数器 +1。

nomads.3050 offers four options: drop them elsewhere later (only if no other contract action is running; the AI never picks it), keep them aboard (the operator must not be a slaver), treat them as slaves (the issuer, owner of the pickup planet, must be a slaver) or set them free (a random lighter or worse crime modifier on the arkship); the last three raise the counter +1 at once. With "drop them elsewhere" the disembarkation is reported by 3051–3053; if the issuer detects it (detected_by_issuer) the contract is cancelled with a large opinion loss, otherwise the counter +1.

## 分支与结局 Branches and outcomes

完成：贸易 750 + 凝聚力 150（放大），影响力 50；发布者好感 +50、信任 +5。被发现则无报酬并失败。 契约被取消、超时或中止时（on_cancel / on_stop），发布者对承包者的好感下降（opinion_failed_contract_*），事件链与全部兴趣点标记被清除。

Completion: trade 750 + unity 150 (scaled), influence 50; issuer opinion +50, trust +5. If detected, no payment and the contract fails. If the contract is cancelled, times out or is aborted (on_cancel / on_stop), the issuer's opinion of the operator drops (opinion_failed_contract_*), and the chain and all points of interest are cleared.

## 条件与文明差异 Conditions and variants

选项受奴隶主身份影响（3050.b 要求承包者非奴隶主，3050.c 要求发布者是奴隶主）。

Options depend on slaver status (3050.b needs a non-slaver operator, 3050.c needs a slaver issuer).

## 审阅记录 Review notes

对照契约定义、内联脚本、专项与事件钩子核实了发布/接受条件、完成方式、奖励与失败处理；事件链卡片是模型中唯一的可读文档（任务、专项与钩子事件不是文档），因此本导读承载结构。

The issue/accept conditions, completion mechanism, rewards and failure handling were checked against the mission, inline scripts, special projects and hook events; the chain card is the only readable doc in the model (missions, projects and hook events are not docs), so this guide carries the structure.
