# 微型宇宙 / The Microverse

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

两种来源：一是从探索帝国的裂隙池随机抽取（权重 0.5；帝国已发现“不稳定星界细缝”后为 0，`00_astral_rifts.txt:139–152`）；二是在“不稳定星界细缝”篇中选择“把它炸开”，事件 astral_planes.6008 用 `split_astral_scar = { ID = microverse }` 把细缝直接撕成本裂隙（`astral_planes_events.txt:4127–4135`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1200 难度为 0。

Two sources: a random draw from the explorer's pool (weight 0.5, or 0 once the empire has found an Astral Scar Instability, `00_astral_rifts.txt:139–152`), or choosing “Blow it open.” in the Astral Scar Instability story, where astral_planes.6008 uses `split_astral_scar = { ID = microverse }` to turn the scar into this rift (`astral_planes_events.txt:4127–4135`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1200 has difficulty 0.

## 剧情脉络 Story outline

1. 加速度（1200）：探球被巨大引力拽入一个由密集星系团构成的小宇宙；暗物质含量很高且仍在增加（获得 100 暗物质）。
2. 皱缩空间（1205）：这个宇宙正在收缩，终将坍缩；数据凭空消失，盆栽植物缩回种子——时间在倒流。
3. 时间泄露（1210）：船员开始遗忘，船外行星化为尘埃、星系反向凝结。与船外舰队同步（→ 1215 紧急情况）或花 10 星界丝缕重极化船体（→ 1220 反向诞生，难度 6）。
4. 反向诞生（1220）：船体隔绝了时间效应。靠近最近的恒星（→ 1225 星尘 → 1235）或从宇宙边缘观测（→ 1230，难度 6）。

1. Acceleration (1200): immense gravity drags the Sphere into a tiny universe made of a dense star cluster; dark matter is abundant and still increasing (100 dark matter).
2. Shrinking Space (1205): this universe is contracting toward collapse; data vanishes and a potted plant turns back into a seed — time runs backwards.
3. Temporal Leak (1210): the crew starts to forget; outside, planets disperse and systems condense in reverse. Synchronise with the fleet outside (→ 1215 Emergency) or spend 10 astral threads to repolarise the hull (→ 1220 Unbirthing, difficulty 6).
4. Unbirthing (1220): the hull is isolated from the time effects. Approach the nearest star (→ 1225 Stardust → 1235) or observe from the edge of the universe (→ 1230, difficulty 6).

## 分支与结局 Branches and outcomes

- 1215 紧急情况：保住数据但船员“返老”，紧急撤离；大量物理研究，科学家年龄 −5。
- 1230 始之终末（宇宙边缘）：目睹万物汇向一点；物理研究与星界丝缕。
- 1235 始之终末（新星诞生）：记录恒星由终至始的全过程；10 年“新星诞生”修正。
- 三者都结束探索。

- 1215 Emergency: the data is saved but the crew de-ages and retreats; major physics research, the scientist becomes 5 years younger.
- 1230 End of the Beginning (the edge): everything converges to a point; physics research and astral threads.
- 1235 End of the Beginning (a star): the star's life is recorded from end to beginning; 10 years of “A Star is Born”.
- All three end the exploration.

## 条件与文明差异 Conditions and variants

- 1210、1225 有格式塔版本文字；没有条件选项。另见“不稳定星界细缝”篇（本裂隙的另一种来源）。

- 1210 and 1225 have gestalt texts; no conditional options. See also the Astral Scar Instability story (the other source of this rift).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:139`；`events/astral_rifts_1_events.txt:629–868`（1200–1235）；`events/astral_planes_events.txt:4118–4136`（astral_planes.6008）
- 已核对：裂隙定义及权重修正、astral_planes.6008 的定向生成、1200–1235 全部事件。没有失败分支；编译结构正确。
- 结构说明：本篇定义为故事族（成员为裂隙卡），使“不稳定星界细缝”篇中 6008 → 本裂隙的审阅链接显示为跨故事链接，而不是把本篇并入那一篇。

- Checked: rift definition and weight modifiers, the directed spawn in astral_planes.6008, every event 1200–1235. No failure branch; the compiled structure was correct.
- Structure: this story is defined as a family (member: the rift card) so the reviewed link 6008 → this rift in the Astral Scar Instability story is a cross-story link rather than merging this story into that one.
