# 拾荒者 / The Scavenger

- 分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

拥有《遥远繁星》时，银河生成一个“拾荒者系统”（scavenger_system，标志 scavenger_bot_system / guardian / hostile_system，最多1个），其中有守卫国家与舰队 guardian_scavenger_bot（拾荒机器人）。任何普通国家的舰队首次进入该星系时，on_entering_system_fleet 触发 distar.135。

With Distant Stars the galaxy spawns a Scavenger system (scavenger_system, flags scavenger_bot_system / guardian / hostile_system, at most one) holding the guardian country and fleet guardian_scavenger_bot. The first time a fleet of an ordinary country enters it, on_entering_system_fleet fires distar.135.

## 剧情脉络 Story outline

1. distar.135“拾荒者”：星系是满布废弃舰船残骸的机械坟场；设置国家标志 encountered_scavenger_bot，建立与守卫国家的通讯，15天后触发通用接触报告 story.8。
2. 击毁拾荒机器人舰队 → distar.137“拾荒者的末日”：设置成就标志 scrapper_killed，终止策展人兴趣点链 curator_poi_scavenger_bot；选项按国家类型与伦理给出奖励——随机两项五级科技（装甲、护盾、质量加速器、导弹、激光；全部已有则改为每月工程研究）、纳米科技，并开始“利维坦庆典”情境。

1. distar.135 "The Scavenger": the system is a mechanical graveyard of derelict wrecks; sets country flag encountered_scavenger_bot, establishes communications with the guardian country and fires the generic contact report story.8 15 days later.
2. Destroying the Scavenger Bot fleet → distar.137 "The Scavenger's End": sets achievement flag scrapper_killed and ends the Curator point-of-interest chain curator_poi_scavenger_bot; the options give rewards by country type and ethics — two random tier-5 techs (armor, shields, mass drivers, missiles, lasers; monthly engineering research if all are known), nanite techs — and start a Leviathan celebration situation.

## 分支与结局 Branches and outcomes

线性：相遇 → （可选）击毁。击毁需要打赢守卫舰队，游戏不强制。

Linear: encounter → (optionally) destroy. Destroying it means beating the guardian fleet; the game does not force it.

## 条件与文明差异 Conditions and variants

distar.137 的选项分为非普通国家、常规、和平主义/亲外星三种。

distar.137's options split into non-default country types, the standard option and a pacifist/xenophile option.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:2066 (scavenger_system); events/distant_stars_events_1.txt:4138 (distar.135); common/on_actions/00_on_actions.txt:1004; events/distant_stars_events_1.txt:4208 (distar.137); common/on_actions/00_on_actions.txt:1460
已核对初始化器、两个 on_action 触发（1004 进入、1460 击毁）与 distar.135/137。草稿把进入事件与击毁事件作为两个独立故事；现合为一个以 distar.135 为起点的故事，用一条审阅连接表示击毁。distar.136 是隐藏的巡逻事件（on_fleet_auto_move_arrival），不属于叙事。

Checked the initializer, the two on_action hooks (1004 entering, 1460 destroyed) and distar.135/137. The draft treated the entry event and the destroy event as separate stories; they are now one story starting at distar.135 with a reviewed link for the kill. distar.136 is a hidden patrol event (on_fleet_auto_move_arrival), not part of the narrative.
