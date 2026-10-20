# 星海天罚 / Galactic Nemesis

- 分类 Category：天灾（玩家天灾路线）Crisis (player crisis path) · DLC: 天灾降临 Nemesis

## 如何开始 How it starts

选择“星海天罚”飞升天赋（ap_become_the_crisis）后进入天灾路线，第一级解锁即收到“宇宙为之颤抖”（4140），开启“化身天灾”事件链与第一项特殊项目。天灾货币为“威胁度”。
Taking the Galactic Nemesis perk; level 1 sends *The Universe Shall Tremble* and the first special project.

## 剧情脉络 Story outline

1. **四项研究与五个等级（严格依次）**：每一级开启一项按帝国类型区分的特殊项目（灵能 / 机械 / 虚境铸就 / 蜂巢 / 一般，互斥）；完成项目并累积威胁度（1000、2000、5000、10000）才能升到下一级，升级3天后收到该级事件（4145、4150、4155）。项目报告依次为“鸿景”“力量之井”“来自异界的燃料”“终焉将临”。
2. **第五级**：离开联邦与共同体；共同体（或银河帝国）被迫通过“宣告危机”决议——你收到 4105/4106，其他玩家收到 4100/4101；若日后被废止，另有 4111/4113 与 4110/4112。5天后“以太相引擎”（6000）在首都星系（游牧帝国为锚站）奠基，再5天得到两艘吞星者（6001）。
3. **吞星**：第一次吞噬恒星时，其他玩家按情报收到三种通报之一（6180/6181/6182）；若毁灭的星系有圣地，圣地守护者震怒（planet_destruction.610，可能引发堕落帝国苏醒）。
4. **引擎建造**（每阶段基础3600天）：第一阶段完工（6005，灵能/同类玩家收到“灵能冲击”）→ 第二阶段（6006，全银河警报；180–660天后虚境生物出现 6151）→ 第三阶段（6007；180–660天后第二波 6161；60–1320天后灵能脉冲 6171）→ 最终完工。
5. **结局**：“始与终”（6050）获胜；1天后其他玩家收到“末日”（6051），所有星系被摧毁。若引擎被毁或星系被占领，建造者/摧毁者/其他玩家分别收到 6101/6102/6103；他国夺取引擎时（6200）可选择摧毁，或在自己也是第五级天灾且失去引擎时接手。

## 分支与结局 Branches and outcomes

- 胜利：6050。挫败：6101（引擎成为废墟，可再升级重建）。
- 互斥：各级项目按帝国类型；宣告者为共同体或帝国；首颗恒星通报三选一；引擎被毁的三种视角。

## 条件与文明差异 Conditions and variants

- 几乎所有正文按灵能、机械（含虚境铸就起源）、蜂巢与一般帝国区分；游牧帝国在第五级与引擎地点上另有文本与条件。
- “宣告危机”也可被投票用于任何嗜杀帝国，巨兽之怒第五级同样强制通过（见巨兽之怒档案）。

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12 (c5b-crisis)
- 来源 Sources：`events/nemesis_crisis_events.txt`, `events/nemesis_crisis_endgame.txt`, `common/crisis_levels/00_crisis_levels.txt:16-223`, `common/special_projects/00_projects_nemesis.txt`, `common/megastructures/12_crisis_sphere.txt`, `common/resolutions/01_resolutions_nemesis.txt`
- 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.
- 已核对 Checked: 两个事件文件全部可见事件、等级定义与项目旗标、引擎各阶段的 on_build_complete（12_crisis_sphere.txt:60-182）、宣告/废止决议（01_resolutions_nemesis.txt:55-91, 330-341, 455-461, 617-628）、吞星 on_action（01_planet_destruction.txt:110）。
- 更正 Corrections: 原起点误为“宣告星系危机”（4100，他国视角）；改为第一级 4140，并把 nemesis_crisis_endgame.txt 并入本族（原有8个以太相引擎小故事 event-crisis-6000/6005/6006/6007/6050/6099/6200/6205 现均归入此处）；修正 6101 原挂在夺取事件下的错误（它发给建造者）；移除最终摧毁星系误连到肃正协议的连接。
- 不确定 Uncertain: 4100/4105 亦用于对其他嗜杀帝国或大可汗的决议；引擎工期修正未建模。
- 覆盖范围 Coverage: 61 篇，全部审阅。
