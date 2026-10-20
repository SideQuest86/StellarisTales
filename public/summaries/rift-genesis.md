# 创世 / Genesis

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1；若银河中已有帝国正在探索“创世”（全局标记，由 2398 在开始探索时设置、2399 在结束时清除），或帝国没有可居住的殖民地/首都，则为 0（`00_astral_rifts.txt:293–320`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 2300 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1, or 0 while any empire is exploring a Genesis rift (a global flag set by 2398 when exploration starts and cleared by 2399 when it ends) or if the empire has no habitable colony or capital (`00_astral_rifts.txt:293–320`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 2300 has difficulty 0.

## 剧情脉络 Story outline

1. 创世（2300）：整个空间是一场全息投影。一个自称“创世神”的实体用本帝国的语言说：“我们玩个游戏吧。我来当创世神。”投影中一个原始物种在荒芜行星上挣扎求生。以力量武装他们（→ 2305 力量投射：强壮）、以知识浇灌他们（→ 2310 智慧之果：天资聪颖），或拒绝游戏、启动电磁脉冲（→ 2315 销毁）。
2. 第二项赐福（2305/2310）：勤奋（→ 2320：无产者）或创新/直感（→ 2325：足智多谋）。
3. 去往繁星（2320/2325）：数千年后，这个文明即将触碰繁星。循规蹈矩（保守主义）或勇于挑战（仰望星空）→ 2330。

1. Genesis (2300): the whole space is a hologram. An entity calling itself “Genesis” speaks in the empire's language: “Let us play a game. I will be Genesis.” The projection shows a primitive species struggling on a barren world. Arm them with might (→ 2305 Power Projection: Strong), plant the seeds of knowledge (→ 2310 Fruit of Knowledge: Natural Intellectuals), or refuse and fire an EMP (→ 2315 Deactivation).
2. Second blessing (2305/2310): diligence (→ 2320: Proles) or creativity/intuition (→ 2325: Ingenious).
3. To the Stars (2320/2325): millennia later the civilisation reaches for the stars. Preserve the old ways (Conservative) or challenge every frontier (Starborn) → 2330.

## 分支与结局 Branches and outcomes

- 2315 销毁：“创世神”原来只是一台先进的中央处理器；带回其核心，获得合金与大量星界丝缕。
- 2330 新生命：模拟结束，探球被弹回本维度，而那个物种竟真实地出现在船上——按三次选择获得对应特质，被安置在离裂隙最近的己方殖民地上，以该行星为理想环境；获得大量星界丝缕（格式塔帝国另得社会学研究与永久“创世洞见”）。
- 两者都结束探索。

- 2315 Deactivation: “Genesis” was only an advanced processor; its core is brought back; alloys and a large astral thread reward.
- 2330 New Life: the simulation ends, the Sphere is ejected home — and the species is really aboard, carrying the three chosen traits; it is settled on the empire's colony nearest the rift, with that planet as its ideal class; a large astral thread reward (gestalt empires also gain society research and the permanent Genesis Insight).
- Both end the exploration.

## 条件与文明差异 Conditions and variants

- 2320、2325 的正文按第一项赐福（力量/知识）变化。没有帝国视角条件选项。

- 2320 and 2325 vary by the first blessing (might / knowledge). No empire-conditional options.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:293`；`events/astral_rifts_2_events.txt:843–1508`（2300–2330、2398、2399）
- 已核对：裂隙定义与两个权重修正；2300 中创建原始物种并选定目标行星；2305/2310/2320/2325/2330 依次叠加的特质；2398/2399 在 on_astral_rift_exploration_start/complete 中的锁定（`common/on_actions/00_on_actions.txt:4990, 5016`）。没有失败分支；编译结构正确，补充互斥组、结局与节点标签。

- Checked: the rift definition and its two weight modifiers; the primitive species and target planet created in 2300; the traits stacked by 2305/2310/2320/2325/2330; the 2398/2399 lock on on_astral_rift_exploration_start/complete (`common/on_actions/00_on_actions.txt:4990, 5016`). No failure branch; the compiled structure was correct; exclusive groups, endings and node labels added.
