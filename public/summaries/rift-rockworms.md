# 岩蠹 / Rockworms

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:233`；`events/astral_rifts_1_events.txt:4320–4881`（1800–1890）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 1830 已并入 / former standalone failure event 1830 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:233–242`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1800 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:233–242`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1800 has difficulty 0.

## 剧情脉络 Story outline

1. 无尽岩海（1800）：一片无边的碎石平原，巨大的蠕虫从地洞中跃出、在空中滑翔。继续地表观测（→ 1805 天空微生物：生物学研究）或探索隧道（→ 1810）。
2. 天空微生物（1805）：蠕虫在空中协作围食成群的微生物。取样（→ 1815）或探索隧道（→ 1810）。
3. 隧道（1810）：坍塌的隧道里有半浸在水中的矿化卵茧。拿走卵（→ 1816）或继续前进（→ 1820 育儿室）。
4. 育儿室（1820）：与探球一样大的幼虫在啃食岩壁。活捉标本（→ 1816）或立即返航（结束探索）。
5. 生吞（1815/1816）：探球被一条蠕虫整个吞下。有奇异气体时可花 100 安放炸药（→ 1835 / 失败 1830），或拉动应急锚链（→ 1825）。

1. Endless Rock (1800): an endless gravel plain where huge worms burst from burrows and glide through the sky. Keep observing the surface (→ 1805 Sky Plankton: biology research) or explore the tunnels (→ 1810).
2. Sky Plankton (1805): the worms cooperate to graze on swarms of microbes. Sample them (→ 1815) or explore the tunnels (→ 1810).
3. Tunnels (1810): mineralised egg cocoons lie half-submerged in collapsed tunnels. Harvest the eggs (→ 1816) or go on (→ 1820 The Nursery).
4. The Nursery (1820): larvae as big as the Sphere gnaw the walls. Capture a specimen (→ 1816) or return at once (the exploration ends).
5. Swallowed (1815/1816): a worm swallows the Sphere whole. With exotic gases, spend 100 on charges (→ 1835 / failure 1830), or pull the emergency anchor (→ 1825).

## 分支与结局 Branches and outcomes

- 1820.b 返航：凝聚力、生物学研究选项、少量星界丝缕。
- 1825 脱出：大量星界丝缕。
- 1835 开膛破肚：炸开蠕虫，带回卵簇或幼虫；解锁一个“岩蠹巢穴”殖民地决议，大量星界丝缕。
- 1830 被消化（失败分支，基础 1.5%/次掷骰）：只拉回半截被消化的船壳，科学家死亡；360 天后 1890“兽口脱险”：科学家以毒素类新身体、带“部分被消化”特质归来。
- 以上都结束探索。

- 1820.b return: unity, a biology research option and a few astral threads.
- 1825 Pulled Free: a large astral thread reward.
- 1835 Rupture: the worm is blasted open and eggs or larvae recovered; one Rockworm Hive colony decision unlocked and a large astral thread reward.
- 1830 Digested (failure branch, base 1.5% per roll): only half-digested metal comes back and the scientist dies; 360 days later 1890 “From the Belly of the Beast”: the scientist returns in a toxoid body with the Partially Digested trait.
- All of these end the exploration.

## 条件与文明差异 Conditions and variants

- 有奇异气体（科技或库存）时 1815/1816 多一段“可以用炸药炸开”的文字并出现“安放炸药”选项。1816 的正文按取卵或捕捉幼虫两种来路变化；1835 按取样、取卵、捕捉三种来路变化。
- “演化猎手”起源在 1820、1835 看到专属选项，另得岩石类 DNA 与局势进度。
- 原文差异：1890 英文为“一年”，中文作“许多年”。

- With exotic gases (technology or stock), 1815/1816 add a line about blasting out and show the “Set explosive charges” option. 1816 varies by egg-harvest or larva-capture route; 1835 by sampling, egg or capture route.
- Evolutionary Predators empires see exclusive options in 1820 and 1835 with extra lithoid DNA and situation progress.
- Localisation difference: 1890 says “a year” in English and “many years” in Chinese.

## 审阅记录 Review notes

- 已核对：裂隙定义；1800–1890 全部事件；1815.a/1816.a 的 `on_roll_failed = astral_rift.1830`（`astral_rifts_1_events.txt:4482–4486, 4577–4581`）；1830 的死亡、克隆放逐与 360 天后的 1890。
- 修正：编译图漏掉失败分支，1830/1890 曾是独立故事；已用两条桥接并入，并标注互斥与两篇“生吞”的区别。

- Checked: rift definition; every event 1800–1890; `on_roll_failed = astral_rift.1830` of 1815.a/1816.a (`astral_rifts_1_events.txt:4482–4486, 4577–4581`); the death, exiled clone and 360-day return (1890) in 1830.
- Correction: the compiled graph missed the failure branch and 1830/1890 had been a separate story; merged with two bridges, with exclusive groups and a note on the two “Swallowed” docs.
