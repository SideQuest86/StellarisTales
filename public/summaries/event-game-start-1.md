# 亚光速探测器 / Sublight Exploration Probes

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/country_events_1.txt:11-1328; events/game_start.txt:15; events/country_events_2.txt:10-68; common/event_chains/00_event_chains.txt:124-133; common/on_actions/00_on_actions.txt:981-986,1573,1615-1616,2042-2045 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

开局事件闸门 country.900 在游戏开始约460天后抽取一条开局故事（亚光速探测器、激进信徒、浪迹星涯、大灭绝，互斥）。探测器故事权重10（有“年轻”起源时为0）。通过 country.258 后弹出 country.1，开启“亚光速探测器”事件链，并在首都2到6跳内随机选四个无主星系作为探测点。

The starting-event gate country.900 draws one opening story about 460 days after game start (Sublight Probes, Radical Cult, Wanderlust, Mass Extinction; mutually exclusive). Probes weigh 10 (0 with a "young" origin). Once country.258 lets it through, country.1 opens the "Sublight Exploration Probes" chain and marks four unowned systems 2-6 jumps from the capital.

## 剧情脉络 Story outline

玩家用舰队进入四个标记星系中的任何一个（任意顺序）。隐藏事件 country.2 随机决定遭遇：(1) 发现探测器 country.3，启动“回收探测器”特殊项目，完成后 country.4；(2) 离子轨迹 country.5，追到终点遇到打捞舰 country.6/7，可付100能量买回（country.8）或开战（country.9，若他国击毁则 country.17）；(3) 亚空间异常 country.10，击毁异常舰队得 country.11（他国击毁为 country.19）；(4) 改造探测器 country.12/13，击毁得 country.14（他国击毁为 country.21）。每回收一个探测器计数加一，四个都回收后 country.15 结束事件链并给奖励。

Fleets entering any of the four marked systems (any order) trigger the hidden event country.2, which draws an encounter at random: (1) a probe is found, country.3, starting the "Recover the probe" special project and later country.4; (2) an ion trail, country.5, leading to salvagers (country.6/7) who can be bought off for 100 energy (country.8) or fought (country.9, or country.17 if someone else kills them); (3) a subspace anomaly, country.10, destroyed for country.11 (country.19 if someone else does it); (4) a modified probe, country.12/13, destroyed for country.14 (country.21 if someone else does it). Each recovered probe adds to the counter; when all four are back country.15 ends the chain with a reward.

## 分支与结局 Branches and outcomes

同一星系一次只抽一种遭遇；离子轨迹、亚空间异常、改造探测器各自置旗后不会再抽到，因此四个探测点最多各出现一次这三类，其余为直接发现。三类敌对遭遇都有“自己击毁/他国击毁”两种结局，最终都汇入 country.15。

One encounter is drawn per system; ion trail, anomaly and modified probe each set a flag and are not drawn again, so each of those three appears at most once. The three hostile encounters each end either by our own victory or by another empire killing the foe, and all join country.15.

## 条件与文明差异 Conditions and variants

仅限人类玩家；country.258 要求已有故事旗标或通讯对象。能否买回探测器取决于能量储备（country.7.b 需要100能量）。

Human players only; country.258 requires a story flag or an existing contact. Buying the probe back needs 100 energy (country.7.b).

## 审阅记录 Review notes

- 对照 country_events_1.txt 与 country_events_2.txt、事件链定义与 on_action 钩子核对了全部事件；把原先散落的 country.2/6/9/11/14/16/18/20 各个“故事”并入此故事，并删去了把开局闸门当成大杂烩的旧结构；其他开局故事（激进信徒、浪迹星涯、大灭绝）各自成故事。
  Checked every event against country_events_1.txt, country_events_2.txt, the chain definition and the on_action hooks; the previously scattered country.2/6/9/11/14/16/18/20 pseudo-stories are merged here and the old catch-all opening-gate structure is removed; the other opening stories (Radical Cult, Wanderlust, Mass Extinction) are separate stories.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
