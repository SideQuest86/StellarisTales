# 无尽长廊 / The Corridors

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:11`；`events/astral_rifts_0_events.txt:1244–1536`（100–140）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 120 已并入 / former standalone failure event 120 merged in）

## 如何开始 How it starts

科学家进入一道裂隙时，裂隙类型从探索帝国的裂隙池中按权重抽取；本裂隙权重 1，没有额外条件（`00_astral_rifts.txt:11–20`）。每个探索阶段结束掷 1–10 的骰子，加技能与线索、减本章难度，≥14 取得突破进入下一章；第一章 100 难度为 0。

When a scientist enters a rift, its type is drawn by weight from the explorer's rift pool; this rift has weight 1 and no extra conditions (`00_astral_rifts.txt:11–20`). Each phase ends with a d10 roll plus skill and clues minus the chapter difficulty; 14 or more opens the next chapter. The first chapter, 100, has difficulty 0.

## 剧情脉络 Story outline

1. 长廊（100）：一座无限重复的走廊网络，地面是发光的电路板。选择打穿地面（→ 105“不可能的‘玻璃’”，难度 4）或凿穿墙体（→ 110“再生”，难度 2，获得物理研究）。两条路都发现无法另辟通道，回到常规探索。
2. 核心终端（115）：找到控制走廊的终端，监控记录了刚才的破坏（按 105/110 的选择显示不同文字）。
   - 骇入（115.a）→ 突破则 125“公式”：结构是程序生成的，带回可自我复制的建材，获得“程序空间”修正；若该阶段任一次掷骰失败（基础 1.5%/次）则 120“活埋”。
   - 拆解（115.b）→ 130“星界计算机”：获得大量星界丝缕。

1. Corridors (100): an endlessly repeating network of chambers over a glowing circuit floor. Break through the floor (→ 105 “Impossible Glass”, difficulty 4) or open the walls (→ 110 “Regeneration”, difficulty 2, physics research). Both fail to cut a new path and exploration resumes normally.
2. The Terminal (115): a terminal controls the corridors and has recorded the intrusion (text varies with the 105/110 choice).
   - Hack it (115.a) → on a breakthrough, 125 “A Formula”: the place is procedurally generated; samples of self-replicating material yield the Procedural Space modifier. If any roll of the stage fails (base 1.5% per roll) the result is 120 “Entombed”.
   - Strip it for parts (115.b) → 130 “Astral Computer”: a large astral thread reward.

## 分支与结局 Branches and outcomes

- 125 公式：探索结束，“程序空间”修正。
- 130 星界计算机：探索结束，大量星界丝缕。
- 120 活埋（失败分支）：防护泡沫封住科学家，探索结束，科学家被放逐；1800 天后 140“科学家返回”：科学家归来，获得材料科学（已有则为粒子物理）专长和“裂隙扭曲”特质。若无空闲科研船，脚本会临时生成一艘在首都接回。

- 125 A Formula: the exploration ends with Procedural Space.
- 130 Astral Computer: the exploration ends with a large astral thread reward.
- 120 Entombed (failure branch): a failsafe foam encases the scientist; the exploration ends and the scientist is exiled. 1800 days later 140 “Scientist returns”: the scientist comes back with Expertise: Materials (or Particles if already present) and Rift Warped; if no idle science ship exists, a temporary one is created at the capital.

## 条件与文明差异 Conditions and variants

- 115 的正文按此前打穿地面或拆墙（裂隙标记 drill_through_floor / deconstruct_wall）二选一显示。其余事件没有文明差异。

- 115 shows one of two texts depending on whether the floor was drilled or the walls opened (rift flags drill_through_floor / deconstruct_wall). No empire-identity variants.

## 审阅记录 Review notes

- 已核对：裂隙定义；100–140 全部事件的选项、难度、奖励、`on_roll_failed = astral_rift.120`（`astral_rifts_0_events.txt:1346–1350`）、120 的放逐与 1800 天后的隐藏事件 135 → 140。
- 修正：编译图漏掉失败分支，120/140 曾被编成独立故事；已用桥接 115.a → 120 并入，并标注 125/120 互斥。

- Checked: rift definition; every event 100–140 — options, difficulties, rewards, `on_roll_failed = astral_rift.120` (`astral_rifts_0_events.txt:1346–1350`), the exile in 120 and the hidden 135 → 140 return after 1800 days.
- Correction: the compiled graph missed the failure branch, so 120/140 had become a separate story; merged with the bridge 115.a → 120 and marked 125/120 as exclusive.
