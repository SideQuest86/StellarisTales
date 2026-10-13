# 部署间谍卫星 / Deploy Spy Satellite

- 分类 Category：项目 Project · DLC：游牧民内容 Nomad content（06_projects_nomads.txt） · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/special_projects/06_projects_nomads.txt:1047 (CONTRACT_ESPIONAGE_SUPPORT_PROJECT_01); common/missions/missions/02_contracts.txt:313, 470, 630 (contract_espionage_support missions); common/scripted_effects/nomads_effects.txt:5826 (generate_additional_espionage_support_project); common/event_chains/00_event_chains_nomads.txt:376 (contract_espionage_support_chain)

## 如何开始 How it starts

由“间谍支援”契约任务启动：契约任务（contract_espionage_support 及其 _2…_4 变体）或隐藏效果 generate_additional_espionage_support_project 以三选一（各1/3）随机启用 PROJECT_01 / 02 / 03，并给目标星球（01、02）或目标舰船（03）打上 spy_support_target 标志。

Started by the "Espionage Support" contract: the contract missions (contract_espionage_support and its _2 to _4 variants) or the effect generate_additional_espionage_support_project enable PROJECT_01 / 02 / 03 at random (1/3 each) and flag the target planet (01, 02) or ship (03) with spy_support_target.

## 剧情脉络 Story outline

项目“部署间谍卫星”（30天，契约类项目 project_type_contract；需要一艘携带殖民者的船 carries_colony = 1）：要求在目标行星所在系统部署一颗间谍卫星。成功时增加玩家的间谍支援计数（espionage_support_counter）并移除目标标志；成功时若国家拥有该事件链还会触发 nomads.6000（“永恒巡航”变体不触发）；失败则结束事件链 contract_espionage_support_chain；若国家已不再拥有该事件链则项目中止。

Project "Deploy Spy Satellite" (30 days, contract project type project_type_contract; needs a ship carrying a colony, carries_colony = 1): it asks for a spy satellite to be deployed in the target planet's system. On success it raises the espionage_support_counter and removes the target flag; on success, if the country has the chain, nomads.6000 also fires (not for the Forever Cruise variants); failure ends the event chain contract_espionage_support_chain; the project aborts if the country no longer has the chain.

## 分支与结局 Branches and outcomes

单一项目，无随机分支；成败只取决于项目是否按时完成。

A single project without random branches; success or failure depends only on whether the project is completed.

## 条件与文明差异 Conditions and variants

无文明差异。

No empire differences.

## 审阅记录 Review notes

已核对项目定义与启用来源。故事只有一个项目文档；所属的契约事件链是另一个故事 chain-contract-espionage-support-chain（c7b），见请求。

Checked the project definition and where it is enabled. The story is one project doc; the contract chain it belongs to is another story, chain-contract-espionage-support-chain (c7b), see the requests.
