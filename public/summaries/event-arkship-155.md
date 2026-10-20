# 外交使节 / A Diplomatic Overture

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件池 mobile_arkship_random_events（00_on_actions.txt:3979-4006，总权重460）；由隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期调用：游戏前5年不会触发，之后每次约三分之一概率（无事则3–5年后再试；近期参战、或所有方舟都在战斗时概率为0），再从方舟殖民地中抽取一个触发该事件池（nomads_effects.txt:96-117）。
The nomad arkship random pool mobile_arkship_random_events (00_on_actions.txt:3979-4006, total weight 460) is drawn by hidden arkship.1 (nomads_arkship_events.txt:7-49): never in the first 5 years, afterwards about one try in three (retry in 3-5 years otherwise; zero during a recent war or while every arkship is fighting), then a random arkship colony fires the pool (nomads_effects.txt:96-117).
arkship.155（lines 2231-2361，池中权重 20/460）：非格式塔、非灭绝、本国未发生过、拥有一名非统治者官员，且存在一个有联系、非灭绝、非游牧、非交战的目标国。事件选出官员（防止被其他事件杀死）和目标国的首都星系，并签发合同 contract_arkship_diplomatic_envoy。
arkship.155 needs a non-gestalt, non-homicidal owner with an official, and a contacted, peaceful, non-nomad target empire; it picks the envoy and the target capital system and issues the contract.

## 剧情脉络 Story outline

1. arkship.155：接受合同（唯一选项）。 Accept the contract.
2. 合同接受后（02_contracts.txt:5437-5463），方舟位于目标系统时触发 arkship.160 “门槛前”（也在 on_entering_system 时检查，00_on_actions.txt:966）。选项 a 开始会面，约半年后目标国（FROM）向你发来三种事件之一：
   After accepting, arriving in the target system fires arkship.160 At the Threshold. Option a starts the meeting; about six months later one of three events arrives from the target empire:
   - 165 “艰难的告别”（外交官留任为常驻大使，获稀有水晶，合同进度）。 permanent ambassador, rare crystals.
   - 170 “不速之客”（外交官被驱逐；道歉或强硬，后者取消合同）。 persona non grata: apologise or stand firm (cancels the contract).
   - 175 “意外的请求”（对方官员请求加入：欢迎或婉拒）。 a foreign official asks to join.
   选项 b 放弃，获得团结加成并结束事件链。 Option b gives up for a unity bonus.

## 分支与结局 Branches and outcomes

- 三种会面结果互斥，权重各 1，经修正：165 ×2（亲异）、×1.5（外交使团、外交传统、外交官技能≥3、好感≥25）；170 ×2（排外）、×1.5（内向完美、外交官技能<3、好感<0）；175 ×1.5（政治传统、外交传统完成）。
  The three results are exclusive (base weight 1 each, modified by ethics, civics, traditions, envoy skill and opinion; arkship.160 lines 2507-2576).
- arkship.156 “代表变更”：外交官被解雇或死亡时改派他人，没有可用官员则结束事件链（00_on_actions.txt:2404、2431）。
  A Change in Representation: if the envoy is fired or dies the chain moves to another official or ends.

## 条件与文明差异 Conditions and variants

- 正文按亲异、排外与中立有三种版本（155、160）。 Texts vary for xenophile, xenophobe and neutral empires.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nomads_arkship_events.txt, common/missions/missions/02_contracts.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：arkship.155-175、合同 contract_arkship_diplomatic_envoy（02_contracts.txt:5413-5499）、on_action 调用与权重修正。
- 更正 Corrections：155、156、160 原是三个独立单页故事，且 165/170/175 通过合同参数传递被漏掉；现合并为一个故事。
  155, 156 and 160 were separate one-card stories; they are merged with 165/170/175.
- 备注 Note：事件链概览页 arkship_diplomatic_envoy_chain 属于另一审阅者的故事。 The chain overview page is in another reviewer's story.
