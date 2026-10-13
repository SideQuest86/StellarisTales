# 天顶 / The Vortex

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:102`；`events/astral_rifts_0_events.txt:3488–3806`（900–940）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 915 已并入 / former standalone failure event 915 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“永旋陀螺”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:102–116`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 900 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award the Ever Spinning Top relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:102–116`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 900 has difficulty 0.

## 剧情脉络 Story outline

1. 天顶（900）：探球落入一场狂暴的旋风，采集到富含星界物质、对温度极敏感的气体样本（获得奇异气体）。继续前进（→ 905，难度 2）或用明火点燃样本（→ 910，难度 6）。
2. 明火实验是冒险的一步：突破则 910，获得工程研究与 10 年“天顶燃料”修正；若该阶段任一次掷骰失败（基础 1.5%/次）则 915“灾难”。
3. 更深入（920）：穿过风暴进入绝对平静的风暴眼；外面的“墙”是一整个正在互相碰撞的星系。
4. 遭遇（925）：风暴中心有一台难以理解的装置，和一个正在操纵它的存在。闪灯引起它注意（→ 930，难度 6：它停下，风暴减弱）或静静观测（→ 935，难度 2：它可能只有一部分处在这个维度）。
5. 倏然离去（940）：那个存在消失，只留下装置；取下一个永远旋转的部件。

1. The Vortex (900): the Sphere lands in a violent whirlwind and samples a gas rich in astral material and wildly sensitive to temperature (exotic gases). Proceed further (→ 905, difficulty 2) or expose the sample to flame (→ 910, difficulty 6).
2. The flame test is the risky step: a breakthrough gives 910 with engineering research and 10 years of Vortex Fuel; if any roll of that stage fails (base 1.5% per roll) the result is 915 “Catastrophe”.
3. Further Inside (920): through the storm into the perfectly calm eye; the storm's “wall” is an entire galaxy colliding with itself.
4. Encounter (925): at the centre stands an incomprehensible device and a being manipulating it. Flash lights to get its attention (→ 930, difficulty 6: it stops and the storm weakens) or observe quietly (→ 935, difficulty 2: it may exist only partly in this dimension).
5. It Leaves (940): the being vanishes, leaving the device; one part, spinning forever, is taken back.

## 分支与结局 Branches and outcomes

- 940：遗珍“永旋陀螺”，探索结束（两条观察路线都到这里）。
- 915（失败分支）：探球取回时只剩焦黑遗骸，科学家死亡；获得奇异气体与大量星界丝缕，探索结束。

- 940: the relic Ever Spinning Top; the exploration ends (both approaches lead here).
- 915 (failure branch): the recovered Sphere holds only charred remains and the scientist is killed; exotic gases and a large astral thread reward; the exploration ends.

## 条件与文明差异 Conditions and variants

- 900、910、915、920、925、935 有格式塔版本文字；940 对唯心主义帝国多一句祈愿。

- 900, 910, 915, 920, 925 and 935 have gestalt texts; 940 adds a prayer line for spiritualist empires.

## 审阅记录 Review notes

- 已核对：裂隙定义与遗珍锁定；900–940 全部事件；900.b 的 `on_roll_failed = astral_rift.915`（`astral_rifts_0_events.txt:3517–3521`）。
- 修正：编译图漏掉失败分支，915 曾是独立故事；已用桥接 900.b → 915 并入，并标注 910/915 互斥。

- Checked: rift definition and relic lock; every event 900–940; `on_roll_failed = astral_rift.915` of 900.b (`astral_rifts_0_events.txt:3517–3521`).
- Correction: the compiled graph missed the failure branch and 915 had been a separate story; merged with the bridge 900.b → 915 and marked 910/915 as exclusive.
