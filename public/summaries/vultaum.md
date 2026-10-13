# 沃陶姆恒星议会 / The Vultaum Star Assembly

- 分类 Category：先驱者 Precursors · 来源 Sources：events/precursor_events.txt:17–1200；common/anomalies/96_anomaly_categories_precursors.txt:5–703；common/special_projects/00_projects_1.txt:821–1145；common/artifact_actions/artifact_actions.txt:682；common/special_projects/00_projects_ancient_relics.txt:190、219；events/ancient_relics_arcsite_events_2.txt:7016–7483；common/relics/relics.txt:1206 · DLC：遗珍、文物奖励与秘密研究需《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

非AI帝国的科研船勘察“沃陶姆星域”（带 precursor_1 标志的星系）中一颗行星（非恒星、无异常）时，on_survey_planet 随机事件可能抽中开场 precursor.1（权重6，对“无事件”100；只计算条件满足的事件），前提是尚无任何先驱者开场。开场立即开始 vultaum_chain 并设置 vultaum_intro，十一种调查异常此后才会生成。

A non-AI empire surveying a planet (not a star, no anomaly) in the Vultaum region (precursor_1 systems) can draw the opening precursor.1 from on_survey_planet random events (weight 6 vs 100 "no event"; only eligible events are weighed), provided it has no other precursor opening. The opening begins vultaum_chain and sets vultaum_intro, which the eleven site anomalies require.

## 剧情脉络 Story outline

1. 开场：约1200万年前活跃的“沃陶姆恒星议会”——三四米长、以体节振动交流的环节动物。
2. 追寻遗迹（并行、任意顺序）：十一种异常（非宜居星球、宜居星球、气态巨行星、小行星）。每处为 异常 → 发现（5…55）→ 考古项目（VULTAUM_ARCHEOLOGY_1–11，180天，科研船+科学家）→ 报告（6…56，线索+1）。报告内容：时间单位“科尔加”、天文台星座壁画、商船贸易星图、约270年的平均寿命、化石、四米管状宇航服、宣扬“大谎言”与“虚拟现实桎梏”的传教手册、编程语言、反对“生命即谎言”的分离殖民地、讽刺社会的虚拟游戏、靠振动操作的矿机。
3. 定位母星系：线索上限6；每份报告调用隐藏的 97，计数满后 98 生成母星系（无位置则30天后重试）或 99，2天后到 100。补充线索同样计数。
4. 母星：100 的回应启用 VULTAUM_HOMEWORLD_PROJECT（30天）。
5. 结果二选一：101 母星报告，或 102 他人已先到。
6. 可选后续：(a) 101 若获得遗珍“沃陶姆现实透孔仪”，日后可主动激活（消耗凝聚力、有冷却）得到 105；(b) 两种结果都设置 vultaum_world_found，可另行用750稀有文物开启“探究沃陶姆的秘密”（物理学研究项目，无期限）→ 10100。

1. Opening: the Vultaum Star Assembly, active ~12 million years ago — 3–4 m annelids communicating by segment vibrations.
2. Following the traces (parallel, any order): eleven anomalies (uninhabitable, habitable, gas giant, asteroid). Each: anomaly → discovery (5…55) → dig project (VULTAUM_ARCHEOLOGY_1–11, 180 days, science ship + scientist) → report (6…56, +1 clue). Reports: the "korga" time unit, an observatory mural of constellations, a merchant star chart, a ~270-year lifespan, fossils, a 4 m tube-like space suit, missionary pamphlets about "the great lie" and "the shackles of virtual reality", their programming language, a splinter colony rejecting the idea that "life itself is a lie", a satirical VR game, vibration-driven mining machines.
3. Locating: clue cap 6; each report calls hidden 97; once complete, 98 spawns the home system (retry after 30 days) or 99, then 100 after 2 days. Supplementary clues count too.
4. Homeworld: answering 100 enables VULTAUM_HOMEWORLD_PROJECT (30 days).
5. One of two outcomes: 101 the homeworld report, or 102 someone else got there first.
6. Optional follow-ups: (a) 101 grants the Vultaum Reality Perforator relic (Ancient Relics); activating it later (unity cost, cooldown) gives 105; (b) both outcomes set vultaum_world_found, so "Secrets of the Vultaum" can be started separately for 750 minor artifacts (physics, no time limit) → 10100.

## 分支与结局 Branches and outcomes

- 101 率先调查：母星在1200万年前因反物质装置毁灭；末期沃陶姆相信宇宙是更高存在的虚拟现实，约定同时“断开连接”（集体自杀），幸存者太少，文明消散。这是沃陶姆的信念，原文并未证明宇宙确为模拟。
- 102 他人已先到：母星已被搜刮，两种措辞按事件链是否仍在择一。
- 10100 秘密报告：机械、蜂巢、狂热唯物常规帝国、其他常规帝国四种正文互斥。机械/蜂巢的回应为 exclusive_trigger；狂热唯物者可选“到此为止”或“继续深挖”，后者启用 VULTAUM_SECRETS_2（物理学，无期限）→ 10110。
- 10110：结论是“有一定可能”生活在模拟世界中。压制：5天后按 50/35/15 抽取 10111（科学家自杀）/10112（狂热+药物滥用）/10113（狂热）；公开：按 35/65 抽取 10112/10113，并获得带不满的公开修正。三者互斥，且执行时负责研究的科学家必须仍在。
- 105 现实穿透：锁定随机列表，16项各权重10（四种修正×2–5年）与1项权重5（四种修正各1年）中抽一项，可多次激活，不是母星后的必经章节。

- 101 first to survey: the homeworld was destroyed 12 million years ago by an antimatter device; late Vultaum believed the universe was a higher being's virtual reality and agreed to "disconnect" together (mass suicide); too few refused to survive. This is their belief — the text does not prove the simulation.
- 102 someone else got there first: the world is stripped; one of two wordings by chain state.
- 10100 secrets report: four exclusive texts (machine, hive, fanatic-materialist regular, other regular). Machine/hive responses are exclusive_trigger; fanatic materialists choose "enough" or "dig deeper", the latter enabling VULTAUM_SECRETS_2 (physics, no limit) → 10110.
- 10110: a "moderate chance" of living in a simulation. Suppress: after 5 days draw 10111 (scientist suicide) / 10112 (maniacal + substance abuser) / 10113 (maniacal) at 50/35/15; publish: 10112/10113 at 35/65 plus a public modifier with unhappiness. Mutually exclusive; the lead scientist must still exist.
- 105 Reality Perforated: a locked random list — sixteen entries of weight 10 (four modifiers × 2–5 years) and one of weight 5 (all four for 1 year); repeatable on activation, not a mandatory chapter.

## 条件与文明差异 Conditions and variants

- 10100 的四种正文与回应对应文明类型（已用 readings 记录）；只有狂热唯物主义者能继续深挖。
- 母星项目完成时：无全局 vultaum_homeworld_found 且目标非殖民地 → 101，否则 102。
- 100 同时向观察者发送 observer.56（仅观察者模式可见）。
- 未使用的定义：异常 VULTAUMAR（研究结果指向101）生成权重为0、无脚本放置，母星设置 prevent_anomaly，游戏中不会出现。

- 10100's four texts and responses follow empire type (recorded as readings); only fanatic materialists can dig deeper.
- Homeworld project on completion: no global vultaum_homeworld_found and an uncolonised target → 101, else 102.
- 100 also sends observer.56 to observers only.
- Unused definition: anomaly VULTAUMAR (pointing to 101) has spawn weight 0, no script places it and the homeworld has prevent_anomaly, so it never appears.

## 审阅记录 Review notes

- 已核对：precursor.1（17–77）与 on_survey_planet 权重（00_on_actions.txt:1183）；vultaum_1–11_cat 生成条件；十一个项目（00_projects_1.txt:821–1110，均180天，skill 行已注释）；报告计数与 97/98/99（805–889）；100–102、母星项目（1114）；artifact_vultaum_research（682）；VULTAUM_SECRETS/_2；10100、10110–10113；r_reality_perforator 与 105。十一份报告与秘密事件中英文已读，V3 的逐篇结论经复核成立。
- 结构修正：异常改为开场之后的并行分支；删除开场选项的提示性重复边；秘密研究与遗珍激活改为母星结果后的可选分支（带证据的桥）；V3 的公开/压制概率标注保留；观察者通知与未使用异常加注。
- 不确定：开场的实际概率取决于其他可用勘察事件；无DLC表现仅按脚本推断。

- Checked: precursor.1 and its survey weight; vultaum_1–11_cat spawn conditions; the eleven projects (all 180 days, skill lines commented out); counter and 97/98/99; 100–102 and the homeworld project; artifact_vultaum_research; VULTAUM_SECRETS/_2; 10100, 10110–10113; the relic and 105. All reports and secrets events read in both languages; the V3 per-report notes still hold.
- Structural fixes: anomalies are now a parallel set under the opening; the tooltip-only duplicate edge was suppressed; secrets research and relic activation became optional branches after the homeworld outcomes (evidence-backed bridges); V3 suppress/publish probability labels kept; observer notice and unused anomaly annotated.
- Uncertain: the real opening chance depends on other eligible survey events; no-DLC behaviour inferred from script.
