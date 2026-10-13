# 机械结构 / The Mechanism

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:266`；`events/astral_rifts_2_events.txt:348–506`（2100–2125）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 2120 已并入 / former standalone failure event 2120 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“连续体”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:266–280`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 2100 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award The Continuum relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:266–280`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 2100 has difficulty 0.

## 剧情脉络 Story outline

1. 齿轮与链条（2100）：探球被无边迷雾中的巨型齿轮包围，机械每十分之一秒前进一格。
2. 次元机械（2105）：这台像钟表一样精确的机器把竖井伸进一系列星界裂隙，延伸到许多宇宙。不加干涉（→ 2110）或卡住齿轮（→ 2115，难度 6）。
3. 卡住（2115）：整台机器停转，一块网状板下露出金色核心，但张力很快会冲破阻挡。小心取出（→ 2125 / 失败 2120）。

1. Gears and Pinions (2100): the Sphere is surrounded by gigantic gears in an endless fog, the machine ticking forward every tenth of a second.
2. Dimensional Machine (2105): a clock-precise machine whose shafts reach into many Astral Rifts and universes. Leave it alone (→ 2110) or jam the gears (→ 2115, difficulty 6).
3. Jammed (2115): the machine halts and a golden core is exposed beneath a plate, but the building tension will soon break through. Extract it carefully (→ 2125 / failure 2120).

## 分支与结局 Branches and outcomes

- 2110 如果没有坏……：大量工程研究与大量星界丝缕。
- 2125 成功：遗珍“连续体”；相连的裂隙网络仿佛时间静止，后果未知。
- 2120 破碎（失败分支，基础 1.5%/次掷骰）：核心爆裂，齿轮狂转，紧急撤离；大量工程研究与星界丝缕，科学家年龄 +20。
- 三者都结束探索。

- 2110 If It Ain't Broke…: major engineering research and a large astral thread reward.
- 2125 Success: the relic The Continuum; the connected rifts fall still as if time stopped, with unknown consequences.
- 2120 Shatter (failure branch, base 1.5% per roll): the core explodes, the gears spin wildly and the Sphere escapes; major engineering research and astral threads, and the scientist ages 20 years.
- All three end the exploration.

## 条件与文明差异 Conditions and variants

- 没有文明视角差异或条件选项。

- No empire-identity variants or conditional options.

## 审阅记录 Review notes

- 已核对：裂隙定义与遗珍锁定；2100–2125 全部事件；2115.a 的 `on_roll_failed = astral_rift.2120`（`astral_rifts_2_events.txt:447–451`）。
- 修正：编译图漏掉失败分支，2120 曾是独立故事；已用桥接并入并标注互斥。

- Checked: rift definition and relic lock; every event 2100–2125; `on_roll_failed = astral_rift.2120` of 2115.a (`astral_rifts_2_events.txt:447–451`).
- Correction: the compiled graph missed the failure branch and 2120 had been a separate story; merged with a bridge and marked exclusive.
