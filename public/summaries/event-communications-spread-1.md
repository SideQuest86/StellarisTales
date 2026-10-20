# 通讯截获 / Communications Intercepted

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

五年一次的“通讯扩散”脉冲（on_five_years_communication_spread_country，common/on_actions/00_on_actions.txt:514-515）从两个事件中随机抽一个：communications_spread.1“邻国引荐”（权重35/135）或 communications_spread.3“任意关系引荐”（权重25/135）。条件：默认国家，没有开局事件旗标，存在一个与我方有通讯的国家，而它又与一个我方尚未接触的默认国或堕落帝国相邻且有通讯。

The five-yearly "communications spread" pulse (on_five_years_communication_spread_country, common/on_actions/00_on_actions.txt:514-515) draws one of two events: communications_spread.1 neighbour referral (weight 35/135) or communications_spread.3 any-relation referral (25/135). Conditions: a default country without the starting-event flag, with a contact that neighbours a default country or fallen empire we have no contact with yet but that contact does.

## 剧情脉络 Story outline

截获发给“引荐国”的通讯，追查来源后与新国家建立联系：选项“有意思…”启动 action.1“第一次接触”（我方视角），并让对方收到 communications_spread.2“新的联络”，其选项同样引向 action.1。权重随游戏年数（>40/70/100/120年各×2）和解密加成增长；游牧民族×0.25，内向完善文明×0.1（仅 .1）。

Intercepting a message sent to the referring empire and tracing it, we make contact with a new country: the option "Interesting..." starts action.1 "First Contact" (our side) and sends communications_spread.2 "New Contact" to the other empire, whose option also leads to action.1. Weights double with game age (>40/70/100/120 years) and with decryption bonus; nomads x0.25, Inward Perfection x0.1 (.1 only).

## 分支与结局 Branches and outcomes

.1 与 .3 是同一事实的两种来源，互斥；之后汇入“第一次接触”（event-action-1）。

.1 and .3 are two sources of the same fact and are exclusive; both continue to "First Contact" (event-action-1).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/communications_spread.txt:11-260; common/on_actions/00_on_actions.txt:514-515 on_five_years_communication_spread_country
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
