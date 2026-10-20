# 深海之下 / Subnautical

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“天空之泪”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:53–67`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 500 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award the Celestial Tear relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:53–67`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 500 has difficulty 0.

## 剧情脉络 Story outline

1. 下潜（500）：探球落入一片漆黑的深海。继续下潜或上浮——两个选项都通向 505。
2. 意外结果（505）：数小时航行后环境毫无变化，某种力量拉住了探球。启动引擎短距跃迁（→ 510 行星尺寸泡泡，难度 2）或穿抗压服游上去（→ 515 自游，难度 5；水生帝国 → 516，难度 2）。三条路都发现这片“海”其实是真空中一颗行星大小的水泡。
3. 泡泡行星（520）：漂浮的液态星球之间，有一个恒星般大小、由无数碎片拼成的构造体在缓慢运动。尝试沟通（→ 525 通讯，难度 6）或靠近（→ 530 靠近，难度 2 → 535）。
4. 通讯（525）：构造体在某个频段发出持续的哀嚎。说“你好”（→ 535，难度 −2）、“你是谁？”（→ 536）或“你怎么了？”（→ 537，难度 6）。

1. Submerged (500): the Sphere arrives in a lightless ocean deep. Dive deeper or head up — both lead to 505.
2. Unexpected Results (505): hours of travel and nothing changes; some force holds the Sphere. Jump with the engines (→ 510 A Planet-Sized Bubble, difficulty 2) or swim in pressure suits (→ 515 We Swim, difficulty 5; aquatic empires → 516, difficulty 2). Every route finds the “ocean” is a planet-sized bubble of water in vacuum.
3. Planetoid Bubbles (520): among floating water-worlds, a star-sized object of interlocking fragments slowly moves. Try to communicate (→ 525 Communication, difficulty 6) or approach (→ 530 The Approach, difficulty 2 → 535).
4. Communication (525): the object emits a constant wail on one frequency. Say “Greetings.” (→ 535, difficulty −2), “What are you?” (→ 536) or “Do you need help?” (→ 537, difficulty 6).

## 分支与结局 Branches and outcomes

- 535 / 536 / 537“苏醒”：构造体苏醒，像小恒星般的熔炉转向探球，电磁脉冲使船体达到极限，探球紧急撤回。三者都结束探索并给予遗珍“天空之泪”；536 中译出“悲痛。走开。”，537 中译出“绝望。我哀嚎。你们走。马上。”；社会学研究奖励依次增加（三档、四档、五档）。

- 535 / 536 / 537 “Awakening”: the object wakes, a star-like furnace turns toward the Sphere and an electromagnetic pulse pushes the hull to its limit; the Sphere is pulled back. All three end the exploration with the Celestial Tear relic; 536 translates “Grief. Go away.” and 537 “Despair. I wail. You go. Now.”; the society research reward grows from tier 3 to tier 4 to tier 5.

## 条件与文明差异 Conditions and variants

- 505 的“我们游上去”按帝国是否拥有水生特质分为两个版本；516 对非格式塔帝国显示“回归天然环境”的专属文字。
- 525 的“你好”与“你怎么了？”要求帝国不是非友好帝国（is_unfriendly = no）。
- 505、525 各有格式塔版本文字（省略“舵手”）。

- “We swim” in 505 has two versions by the aquatic trait; 516 shows a “return to our natural environment” text for non-gestalt empires.
- “Greetings.” and “Do you need help?” in 525 require the empire not to be unfriendly (is_unfriendly = no).
- 505 and 525 have gestalt texts (without the “helmsman”).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:53`；`events/astral_rifts_0_events.txt:1943–2326`（500–537）
- 已核对：裂隙定义与遗珍锁定；500–537 每个事件的选项条件、难度修正与奖励。没有失败分支或延时后续；编译结构正确，补充互斥说明（515/516）与三个结局。
- 不确定：505.b 在国家作用域检查 `has_aquatic_trait`，具体判定的物种（主物种）由引擎决定，未进一步核实。

- Checked: rift definition and relic lock; option conditions, difficulty modifiers and rewards of every event 500–537. No failure branch or delayed follow-up; the compiled structure was correct; an exclusive group (515/516) and three endings added.
- Uncertain: 505.b checks `has_aquatic_trait` at country scope; which species is evaluated (main species) is engine-defined and was not verified further.
