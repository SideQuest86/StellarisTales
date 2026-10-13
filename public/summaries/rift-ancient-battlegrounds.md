# 次元冲突 / Dimensional Conflict

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:22`；`events/astral_rifts_0_events.txt:1543–1735`（200–225）；`events/astral_planes_events.txt:252–363`（遗珍锁定 relic lock）
- 审阅 Reviewed：2026-10-12（全篇 whole story）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：本裂隙权重 1，游牧帝国为 0。它能产出遗珍“代达罗斯封印”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0；若探索者没有拿到遗珍，探索结束时解锁（`astral_planes_events.txt:252–363`，`inline_scripts/astral_rift/relic_weight_modifier.txt`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 200 难度为 0。

The rift type is drawn by weight from the explorer's pool: weight 1, or 0 for nomadic empires. Because it can award the Daedalus Seal relic, its weight is 0 for everyone while any empire is exploring it; if the explorer did not get the relic, the lock is lifted when the exploration ends (`astral_planes_events.txt:252–363`, `inline_scripts/astral_rift/relic_weight_modifier.txt`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 200 has difficulty 0.

## 剧情脉络 Story outline

1. 远古之战（200）：一支古代舰队的残骸与一头比最大战舰长十倍的巨兽尸体。研究组成（→ 205 异星装甲：合金与下一级装甲科技选项）或深入内部（→ 210 不明躯体：生物学研究选项；它死于脱水，可能并非此维度原生，已死去五万多年）。
2. 一十二面（215）：残骸中的舰船似乎能自由出入裂隙；最大的残骸中藏着一个十二面体。
   - 试着激活（→ 220 激活，难度 6）：注入星界丝缕后，十二面体关闭了裂隙——推测远古帝国曾以此牺牲舰队封住巨兽。获得遗珍“代达罗斯封印”。
   - 拆了它（→ 225 拆解，难度 2）：获得暗物质与大量星界丝缕。

1. An Ancient Battle (200): an ancient fleet's wreckage and a monster's corpse ten times longer than the largest battleship. Study its composition (→ 205 Exotic Armor: alloys and the next armor technology option) or go inside (→ 210 Uncharted Body: a biology research option; it died of dehydration, perhaps not native to this dimension, over fifty thousand years ago).
2. A Dozen Faces (215): the wrecked ships seem built to enter and leave rifts freely; the largest wreck holds a dodecahedron.
   - Activate it (→ 220 Activation, difficulty 6): fed astral thread, the device sealed the rift — suggesting an ancient empire sacrificed its fleet to lock the creature away. Gain the relic Daedalus Seal.
   - Strip it for parts (→ 225 Disassembly, difficulty 2): dark matter and a large astral thread reward.

## 分支与结局 Branches and outcomes

- 220：代达罗斯封印（遗珍）。225：暗物质 + 大量星界丝缕。两者都结束探索；205/210 只影响途中奖励，两条路都汇入 215。

- 220: the Daedalus Seal relic. 225: dark matter plus a large astral thread reward. Both end the exploration; 205/210 only change the reward on the way, both lead to 215.

## 条件与文明差异 Conditions and variants

- “演化猎手”起源的帝国在 210 看到专属选项“区区五万年可藏不住你”，额外获得该起源局势进度与 DNA（`exclusive_trigger`，`astral_rifts_0_events.txt:1633–1653`）。
- 200 本身要求探索者不是游牧帝国。

- Evolutionary Predators empires see an exclusive option in 210 (“Fifty thousand years is not enough to hide from us.”) that also grants origin-situation progress and DNA (`exclusive_trigger`, `astral_rifts_0_events.txt:1633–1653`).
- Event 200 itself requires a non-nomadic explorer.

## 审阅记录 Review notes

- 已核对：裂隙定义与权重修正、遗珍锁定/解锁事件、200–225 全部事件的选项与奖励。本裂隙没有失败分支或延时后续。编译结构正确，补充两个结局与两条说明。

- Checked: the rift definition and weight modifiers, the relic lock/unlock events, and all options and rewards of 200–225. No failure branch or delayed follow-up. The compiled structure was correct; two endings and two notes added.
