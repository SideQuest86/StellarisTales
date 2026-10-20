# 废弃设施 / Abandoned Complex

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取，权重 1，无额外条件（`00_astral_rifts.txt:255–264`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 2000 难度为 0。

Drawn by weight from the explorer's rift pool, weight 1, no extra conditions (`00_astral_rifts.txt:255–264`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 2000 has difficulty 0.

## 剧情脉络 Story outline

1. 废弃设施（2000）：积灰的研究设施里摆满大蛋，中央池里是富含蛋白质的苍白液体。寻找看护者（→ 2015）或砸开一枚蛋（→ 2010）。
2. 看护者（2015）：看护者的尸体在原子层面被切开、半嵌进墙里。砸开剩下那枚完好的蛋（→ 2010）或带着遗骸返回（→ 2040，结束）。
3. 量子寄生虫（2010）：胚胎身上覆盖着能随机“传送”的异次元寄生虫，它们被那池液体吸引。把液体注入蛋中（→ 2020）或对剩下的生物实施安乐死（→ 2025，结束）。
4. 新陈代谢（2020）：胚胎迅速发育，但寄生虫也被激活。不要干预（→ 2030）或花 10 星界丝缕注入（→ 2035 / 失败 2030）。

1. Abandoned Facility (2000): a dusty research facility lined with large eggs, a pool of pale protein-rich liquid at its centre. Search for the caretakers (→ 2015) or open an egg (→ 2010).
2. The Caretakers (2015): their bodies were cut apart at the atomic level, some half-fused into the walls. Open the one intact egg (→ 2010) or return with the remains (→ 2040, ending).
3. Quantum Parasites (2010): the embryo is covered in randomly warping parasites from another dimension, drawn to the liquid. Inject the liquid (→ 2020) or euthanize the remaining creatures (→ 2025, ending).
4. Metabolization (2020): the embryo grows fast, but the parasites are roused too. Do not intervene (→ 2030) or inject 10 astral threads (→ 2035 / failure 2030).

## 分支与结局 Branches and outcomes

- 2040：带回遗骸，大量星界丝缕。
- 2025：安乐死，物理研究与大量星界丝缕。
- 2035 生物武器：孵出能短距跃迁的战斗生物，可建造新型进攻部队“曲跃雏”，大量星界丝缕。
- 2030 生物不稳定性：胚胎被寄生虫撕裂；物理研究与大量星界丝缕，但 30 天后 2045“致命暴露”：科学家“自爆”身亡。
- 以上都结束探索（2045 发生在探索结束后）。

- 2040: the remains are brought back; a large astral thread reward.
- 2025: euthanasia; physics research and a large astral thread reward.
- 2035 Biological Weapon: a warp-capable combat creature hatches; the Warpling assault army becomes buildable; a large astral thread reward.
- 2030 Biological Instability: the parasites tear the embryo apart; physics research and a large astral thread reward, but 30 days later 2045 “Lethal Exposure”: the scientist “spontaneously explodes”.
- All end the exploration (2045 happens after it has ended).

## 条件与文明差异 Conditions and variants

- 2030 的正文按是否注入过星界丝缕变化；2035 按和平、灭绝主义与其他帝国分三个版本。
- “演化猎手”起源在 2025、2030 看到专属选项，另得爬行类 DNA 与局势进度。

- 2030's text depends on whether astral thread was injected; 2035 has pacifist, exterminator and default versions.
- Evolutionary Predators empires see exclusive options in 2025 and 2030 with extra reptilian DNA and situation progress.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:255`；`events/astral_rifts_2_events.txt:11–341`（2000–2045）
- 已核对：裂隙定义；2000–2045 全部事件；2020.b 的 `on_roll_failed = astral_rift.2030`（`astral_rifts_2_events.txt:139–143`）；2030 的 `after` 中 30 天后的 2045。
- 修正：编译图漏掉失败桥接；已补 2020.b → 2030，标注 2035/2030 互斥，并为 2045 标注结局。

- Checked: rift definition; every event 2000–2045; `on_roll_failed = astral_rift.2030` of 2020.b (`astral_rifts_2_events.txt:139–143`); the 30-day follow-up 2045 in the `after` block of 2030.
- Correction: the compiled graph missed the failure bridge; added 2020.b → 2030, marked 2035/2030 exclusive and labelled 2045 as an ending.
