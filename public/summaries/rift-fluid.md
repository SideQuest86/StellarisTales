# 流体 / The Fluid

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:154`；`events/astral_rifts_1_events.txt:875–1431`（1300–1330）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 1330 已并入 / former standalone failure event 1330 merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“血浆核心”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:154–168`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1300 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award the Plasmic Core relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:154–168`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1300 has difficulty 0.

## 剧情脉络 Story outline

1. 流体（1300）：探球浸没在有节律搏动的红色黏液中，被推进一套管道系统。部署取样拖网（→ 1305 受阻，难度 5）或放心前进（→ 1310）。
2. 受阻（1305）：拖网卡住。切断（→ 1310）或有奇异气体时花 50 用推进器挣脱（→ 1311，额外生物学研究选项）。
3. 舱室（1310/1311）：一个规律收缩的巨大腔室——推测是某个超级有机体的体内。随液流出去（→ 1315，难度 2）或探索结晶孔（→ 1316，难度 5）；1311 中两选项还分别给 200 奇异气体或 200 稀有晶体。
4. 团块（1315/1316）：一个星舰大小的团块把探球吞入，腐蚀性的酶开始消化船体。立刻起锚返航（→ 1320）或泵入 100 奇异气体中和它（→ 1325 / 失败 1330）。

1. The Fluid (1300): the Sphere is submerged in a rhythmically pulsing red fluid and pushed through a network of tubes. Deploy the sample rig (→ 1305 Snagged, difficulty 5) or proceed at ease (→ 1310).
2. Snagged (1305): the rig is stuck. Cut it loose (→ 1310) or, with exotic gases, spend 50 to burn free (→ 1311, plus a biology research option).
3. The Chamber (1310/1311): a vast rhythmically contracting cavity — perhaps inside some immense organism. Follow the flow (→ 1315, difficulty 2) or explore the crystalline orifice (→ 1316, difficulty 5); in 1311 the two options also give 200 exotic gases or 200 rare crystals.
4. The Blob (1315/1316): a starship-sized blob engulfs the Sphere and its acidic enzymes start digesting the hull. Pull anchor (→ 1320) or pump 100 exotic gases to neutralise it (→ 1325 / failure 1330).

## 分支与结局 Branches and outcomes

- 1320 提取：逃回裂隙外，带回生物物质；大量星界丝缕与“裂隙流体样本”（保留拖网 10 年，否则 5 年）。“演化猎手”起源另有专属选项（局势进度与 DNA）。
- 1325 溶解：团块溶解只剩核心；遗珍“血浆核心”与大量星界丝缕。
- 1330 被溶解（失败分支，基础 1.5%/次掷骰）：科学家死亡、科研船被摧毁；残骸上的生物质带来 10 年“裂隙流体样本”与大量星界丝缕。

- 1320 Extraction: escape with biological material; a large astral thread reward and Rift Fluid Samples (10 years if the rig was kept, otherwise 5). Evolutionary Predators empires get an exclusive option (situation progress and DNA).
- 1325 Dissolution: the blob dissolves to its core; the Plasmic Core relic and a large astral thread reward.
- 1330 Dissolved (failure branch, base 1.5% per roll): the scientist dies and the science ship is destroyed; the biomass on the wreck yields 10 years of Rift Fluid Samples and a large astral thread reward.

## 条件与文明差异 Conditions and variants

- 是否拥有奇异气体（科技或库存）决定 1305、1315、1316 的正文版本以及“使用紧急燃气”“泵入异星天然气”两个选项是否出现；1315/1316 另有格式塔版本。
- 拖网标记：进入 1300 时即设置，只有 1305 切断时移除；因此选择“放心地继续前进”时后文仍按保留拖网处理（1320 给 10 年修正）。

- Having exotic gases (technology or stock) selects the texts of 1305, 1315 and 1316 and shows the “Use emergency gases” / “Pump exotic gases” options; 1315/1316 also have gestalt texts.
- Rig flag: set on entering 1300 and removed only by cutting the rig in 1305, so after “Proceed forward at ease” later texts still treat the rig as kept (1320 gives the 10-year modifier).

## 审阅记录 Review notes

- 已核对：裂隙定义与遗珍锁定；1300–1330 全部事件；1315.b/1316.b 的 `on_roll_failed = astral_rift.1330`（`astral_rifts_1_events.txt:1157–1161, 1270–1274`）；1330 的 `kill_leader` 与 `destroy_fleet`。
- 修正：编译图漏掉失败分支，1330 曾是独立故事；已用两条桥接并入，标注 1325/1330 互斥，并说明两篇“舱室”的差别。

- Checked: rift definition and relic lock; every event 1300–1330; `on_roll_failed = astral_rift.1330` of 1315.b/1316.b (`astral_rifts_1_events.txt:1157–1161, 1270–1274`); `kill_leader` and `destroy_fleet` in 1330.
- Correction: the compiled graph missed the failure branch and 1330 had been a separate story; merged with two bridges, 1325/1330 marked exclusive, and the two “Chamber” versions explained.
