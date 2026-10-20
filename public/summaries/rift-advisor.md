# 顾问 / The Advisor

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:91–100`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 800 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:91–100`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 800 has difficulty 0.

## 剧情脉络 Story outline

1. 熟悉的地方（800）：裂隙另一侧几乎是入口星系的复制品，一台机械装置自称“顾问 RIV”，问要不要帮忙写报告。寻求帮助（→ 805）或把它关了（→ 810）。
2. 帮助助手（805）：RIV 的知识平淡无奇（“每个星系中央都有一颗恒星，它们可太亮了！”）。寻求进一步帮助（→ 815）或关掉它（→ 810）。
3. 无法关闭（810，难度 5）：RIV 转为红光、发出威胁。安抚它（→ 815）或释放电磁脉冲（→ 820，难度 6）。
4. 电磁脉冲（820）：机器停机，留下珍贵合金与加固的电脑核心。尝试修复核心（→ 825 拆开机器）或彻底摧毁（→ 830 谢天谢地）。

1. A Familiar Place (800): beyond the rift lies an almost exact copy of the entry system; a machine calling itself “the Advisor, RIV” offers to help write the report. Ask for assistance (→ 805) or disable it (→ 810).
2. Assisting the Assistant (805): RIV's knowledge is banal (“At the center of each system is a star. They are very bright!”). Ask for further assistance (→ 815) or disable it (→ 810).
3. Unable to Disable (810, difficulty 5): RIV turns red and threatening. Placate it (→ 815) or fire an electromagnetic pulse (→ 820, difficulty 6).
4. Electromagnetic Pulse (820): the machine shuts down, leaving valuable alloys and a hardened computer core. Try to recover the core (→ 825 Scrapping the Machine) or destroy it (→ 830 Good Riddance).

## 分支与结局 Branches and outcomes

- 815 进一步“帮助”：科学家沉迷于 RIV 的建议而留下，探索结束，科学家被放逐；1800 天后（隐藏事件 835）科学家归来（840），带“裂隙扭曲”及天才、严谨或漫游者之一。
- 825：大量星界丝缕、合金和一项计算机方向研究选项。830：大量星界丝缕与工程研究。两者都结束探索。
- 825、830、840 之后都会弹出 845“VIR”：本帝国自己的顾问询问是否重新开启或关闭新手指引，选项会真正改变教程等级。

- 815 Further 'Assistance': the scientist stays to learn from RIV; the exploration ends and the scientist is exiled. 1800 days later (hidden event 835) they return (840) with Rift Warped and one of Spark of Genius, Meticulous or Roamer.
- 825: a large astral thread reward, alloys and a computing research option. 830: a large astral thread reward and engineering research. Both end the exploration.
- After 825, 830 or 840, event 845 “VIR” appears: the empire's own advisor asks whether to re-enable or shut down guidance, and the options really change the tutorial level.

## 条件与文明差异 Conditions and variants

- 820 对人类科学家有加长台词（裂隙描述标记 description_human）；840 有格式塔版本；845 按当前是否关闭新手指引显示不同台词与选项。

- 820 has an extra line for human scientists (rift description flag description_human); 840 has a gestalt text; 845 shows different lines and options depending on whether guidance is currently off.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:91`；`events/astral_rifts_0_events.txt:3033–3481`（800–845）
- 已核对：裂隙定义；800–845 全部事件的选项与奖励；815 的放逐与 1800 天后 835 → 840；825/830/840 对 845 的调用。没有失败分支；编译结构正确，补充结局、节点标签和说明。
- 评注：845 是游戏 UI 顾问的玩笑式收尾，原文保留在本篇中。

- Checked: rift definition; options and rewards of every event 800–845; the exile in 815 and 835 → 840 after 1800 days; the calls to 845 from 825/830/840. No failure branch; the compiled structure was correct; ending, node label and note added.
- Commentary: 845 is a joke coda using the game's UI advisor; its original text stays in this story.
