# 维度垃圾场 / Dimensional Dump

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:282–291`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 2200 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:282–291`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 2200 has difficulty 0.

## 剧情脉络 Story outline

1. 漂浮躯体（2200）：这里是某个星际文明的垃圾场，裂缝不时倾倒新的垃圾；垃圾中漂着一个穿宇航服、处于休眠的外星人。带回来急救（非“非友好”帝国）或带回来拿走它的装备。
2. 劫持人质（2205）：外星人一苏醒就劫持了一名船员，指着控制面板反复说着同一句话。干掉他（→ 2210；救助路线下可能失败为 2220）或试着谈判（→ 2215，非“非友好”帝国）。
3. 缓和（2215）→ 迷路垃圾工（2225）：外星人名叫……（随机名），已有几百岁，是一名在倾倒垃圾时跌进时空压缩器的垃圾运输工。

1. Floating Body (2200): this is a star-faring civilisation's junkyard, with tears dumping fresh garbage; a hibernating alien in a spacesuit drifts among it. Bring it aboard to give aid (not-unfriendly empires) or to take its gear.
2. The hostage (2205): the alien wakes, seizes a crew member and keeps pointing at the controls, repeating one phrase. Dispatch it (→ 2210; on the rescue route this may fail into 2220) or negotiate (→ 2215, not-unfriendly empires).
3. De-escalation (2215) → Lost Junker (2225): the alien, several centuries old, is a garbage hauler who slipped into a space-time compressor during a dump run.

## 分支与结局 Branches and outcomes

- 2210 处决：回收废料——矿物、合金、中量星界丝缕（拿装备路线另得大量工程研究），探索结束。
- 2220 遭受伤亡（失败分支，仅救助路线，基础 1.5%/次掷骰）：外星人先开枪，科学家遇难；合金与大量星界丝缕，探索结束。
- 2225 迷路垃圾工：带回这位外星人，社会学研究与大量星界丝缕，探索结束；360 天后 2230“训练完成”：其作为技能 6、带“裂隙扭曲”的指挥官入役。

- 2210 dispatched: salvage — minerals, alloys and a medium astral thread reward (the gear route adds major engineering research); the exploration ends.
- 2220 Fatalities Sustained (failure branch, rescue route only, base 1.5% per roll): the alien shoots first and the scientist dies; alloys and a large astral thread reward; the exploration ends.
- 2225 Lost Junker: the alien comes back with the crew; society research and a large astral thread reward; the exploration ends. 360 days later 2230 “training complete”: they enter service as a skill-6 commander with Rift Warped.

## 条件与文明差异 Conditions and variants

- 2205、2210 的正文按救助或拿装备路线变化；非友好帝国只能拿装备并处决。
- 原文差异：2205 拿装备路线英文为“抓起焊枪、劫持工程人员”，中文与救助路线相同（医疗人员、靴中武器）。

- 2205 and 2210 vary by rescue or gear route; unfriendly empires can only take the gear and dispatch the alien.
- Localisation difference: on the gear route the English 2205 has the alien grab a welding torch and an engineer; the Chinese repeats the rescue-route wording (a medic, a weapon from the boot).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 2220 已并入 / former standalone failure event 2220 merged in）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:282`；`events/astral_rifts_2_events.txt:513–835`（2200–2230）
- 已核对：裂隙定义；2200–2230 全部事件；2205 中两个同名选项“干掉他”只有救助路线版本带 `on_roll_failed = astral_rift.2220`（`astral_rifts_2_events.txt:596–610`）；2225 → 2230 的 360 天延时。
- 修正：编译图漏掉失败分支，2220 曾是独立故事；已用桥接并入。由于两个选项键相同，桥接挂在文档上而非具体选项（见台账 Requests）。

- Checked: rift definition; every event 2200–2230; of the two “Dispatch the individual” options in 2205 only the rescue-route one carries `on_roll_failed = astral_rift.2220` (`astral_rifts_2_events.txt:596–610`); the 360-day delay 2225 → 2230.
- Correction: the compiled graph missed the failure branch and 2220 had been a separate story; merged with a bridge. Because both options share one key, the bridge hangs on the doc rather than the specific option (see ledger Requests).
