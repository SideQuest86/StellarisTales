# 永恒合唱 / The Eternal Chorus

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件池 mobile_arkship_random_events（00_on_actions.txt:3979-4006，总权重460）；由隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期调用：游戏前5年不会触发，之后每次约三分之一概率（无事则3–5年后再试；近期参战、或所有方舟都在战斗时概率为0），再从方舟殖民地中抽取一个触发该事件池（nomads_effects.txt:96-117）。
The nomad arkship random pool mobile_arkship_random_events (00_on_actions.txt:3979-4006, total weight 460) is drawn by hidden arkship.1 (nomads_arkship_events.txt:7-49): never in the first 5 years, afterwards about one try in three (retry in 3-5 years otherwise; zero during a recent war or while every arkship is fighting), then a random arkship colony fires the pool (nomads_effects.txt:96-117).
arkship.140（lines 1878-1972，池中权重 20/460）：全局尚无“永恒合唱”进行中（eternal_chorus_active）、非格式塔、本国未发生过、拥有科学家。它选一位科学家作为监督者（并防止其被其他事件杀死），在另一个黑洞星系设置目标，并签发自接合同 contract_eternal_chorus。
arkship.140 needs: no Eternal Chorus running anywhere, non-gestalt owner, not done before, a scientist. It picks the lead scientist, marks another black-hole system as target and issues the self-issued contract.

## 剧情脉络 Story outline

1. arkship.140 “遥远的信号”：唯一选项接受合同（同时开启事件链“永恒合唱”；若之前发生过“黑洞现象”正文不同）。
   A Distant Signal: the single option accepts the contract and opens the event chain.
2. 前往目标星系：方舟进入目标黑洞星系时触发 arkship.141 “晶体晶格”（on_entering_system，00_on_actions.txt:964）；合同接受时启用项目“永恒合唱”（02_contracts.txt:4972-4985），项目完成触发 arkship.145（在项目故事“永恒合唱”中：完成合同或取消合同）。
   Entering the target system fires arkship.141 Crystal Lattice; accepting the contract starts the project that fires arkship.145 (see the project story).
3. 合同成功后：方舟首次进入另一个黑洞星系时触发 arkship.150 “回答”，获得团结与社会研究加成并结束事件链。
   After the contract succeeds, the arkship's first entry into another black-hole system fires arkship.150 An Answer (unity and society research), ending the chain.

## 分支与结局 Branches and outcomes

- arkship.142 “条款变更”：监督科学家被解雇或死亡时（on_leader_fired / on_leader_death，00_on_actions.txt:2403、2430）改派另一名科学家；没有其他科学家则结束事件链。
  A Change in Terms: if the lead scientist is fired or dies the chain moves to another scientist or ends.
- arkship.145 的选项 a 履行合同（领袖得到经验和特质，合同进度 +1）、b 取消合同（团结加成，事件链结束）。
  arkship.145 (in the project story): fulfil the contract, or cancel it for unity.

## 条件与文明差异 Conditions and variants

- 全局同时只能进行一条“永恒合唱”（eternal_chorus_active，合同停止时清除）。
  Only one Eternal Chorus can run in the whole galaxy at a time.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nomads_arkship_events.txt, common/missions/missions/02_contracts.txt, common/special_projects/06_projects_nomads.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：arkship.140-150、合同 contract_eternal_chorus（02_contracts.txt:4938-5038）、项目 ARKSHIP_ETERNAL_CHORUS_PROJECT（06_projects_nomads.txt:1793-1819）与 on_action 调用。
- 更正 Corrections：原先 140、141、142、150 是四个互不相连的单页故事；它们是同一条合同链的四个时刻，现合并为一个故事。
  Four unconnected one-card stories were the moments of one contract chain and are merged.
- 请求 Request：中间的 arkship.145 位于另一审阅者的项目故事（project-arkship-eternal-chorus-project）中，建议协调员把它并入本故事。
  arkship.145 sits in another reviewer's project story; the coordinator may merge it here.
