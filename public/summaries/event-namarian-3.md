# 银河游牧民 / Galactic Nomads

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧舰队由 namarian.1 创建（events/namarian_events.txt:11-212；触发条件 has_megacorp = no 且 nomad01_country 尚不存在，即只创建一次），在银河边缘选出中点和终点；隐藏的舰队事件 namarian.2/3 控制航行：进入有主星系时停留约100天与其主人联络（若对方不敌对、未联络过），否则继续赶路或停在无主星系。
The fleet is created by namarian.1, travels rim -> midpoint -> end point (namarian.2/3/7/8) and stops in owned systems to make contact.

## 剧情脉络 Story outline

1. namarian.10 “银河游牧民”：舰队代言人与你首次联络（经首次接触机制，common/scripted_effects/first_contact_effects.txt 的 finish_first_contact_effect）；你选择友好 / 疏远 / 威胁（按伦理的多种措辞；影响间谍网络增长 ±33%）；设标记 nomads_contacted。
   Contact: friendly, distant or hostile replies; sets nomads_contacted.
2. 停留期间，隐藏的舰队事件 namarian.4 随机（30 / 30 / 30 / 10 忽略；按宗教平等/亲异加成、已有的次数衰减）选出一项请求：
   While in your space, hidden namarian.4 picks (30/30/30/10 ignore) one request:
   - namarian.20 → 21 “银河游牧民”：请你收留一部分游牧人口（+300 游牧人口到指定行星；两个可追问的问题）。 Take in nomad pops (+300).
   - namarian.40 → 41：请你让出一颗未殖民的行星，创建一个纳马里安帝国（约1500人口），你交出整个恒星系，关系变化。 Cede a system to found a Namarian empire.
   - namarian.499 → 500 “游牧民的贸易提议”：用 2000 能量或矿物买 5 艘新舰（可讨价到 1500）；买下后 514 → 30天内交付（530）；还可能收到加密通讯 520-522：邻国也被卖了同样的船，请你出价（1000 能量）让他们的船不交到邻国手中（523/524/526）；拒绝则 525。 Sell ships, with an optional encrypted-message intrigue.
3. namarian.30 “游牧舰队”：任何时候通过外交菜单（on_custom_diplomacy，common/on_actions/00_on_actions.txt:714）与舰队交谈：了解他们的族群、目的地；回答按关系而不同。
   The diplomacy menu (30) answers questions about their people and destination.
4. 被攻击：on_entering_battle（common/on_actions/00_on_actions.txt:1370）→ 隐藏 namarian.99：舰队被不曾联络过的势力或已联络的势力攻击后，向攻击者发 100 “急迫通讯”（再也不与你交易）或 105 “宣战声明”（50/50）。 Attacked -> 100 or 105.
5. 到达终点：namarian.8 删除舰队，并向所有联络过的玩家国发 namarian.9 “告别”。 End point -> 9 farewell.

## 分支与结局 Branches and outcomes

- namarian.4 的请求互斥（收留 / 让出行星 / 卖船 / 忽略）。 The requests are exclusive.
- 交易线内的分叉：购买（能量 / 矿物 / 讨价）、拒绝；密报线：出价或不出价。 Inner choices in the trade chain.
- 被攻击后 100 与 105 互斥（各约50%，另有修正）。 100 and 105 are exclusive.

## 条件与文明差异 Conditions and variants

- 请求按联络国的伦理（亲异、平等、唯灵加成；允许奴隶制则减少）与是否有合适的行星而变；创建事件要求 has_megacorp = no（注释：游牧民无法与商队竞争）。 Requests depend on ethics and available planets; the creation event requires has_megacorp = no.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/namarian_events.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：namarian.1-10、20/21、30、40/41、499-530、95-105 的触发与分派；20/40/15（战争任务）等隐藏事件未全部展开。
- 更正 Corrections：五个独立故事（3、8、10、30、99）并为一个“银河游牧民”；首次接触之前的“经由 finish_first_contact_effect 的广泛外链”只是编译器的展开，实际上只有 namarian.10。
  Five separate stories merged; the many first_contact.* callers shown for namarian.10 are an artefact of finish_first_contact_effect.
- 不确定 Uncertain：namarian.15（战争任务）等未列入本故事的分支未审阅。
