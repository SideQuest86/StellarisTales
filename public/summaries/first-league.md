# 第一联盟 / The First League

- 分类 Category：先驱者 Precursors · DLC：文物奖励与秘密研究需《远古遗物》Ancient Relics

## 如何开始 How it starts

非AI帝国勘察“第一联盟星域”（precursor_3 星系）中一颗行星（非恒星、无异常）时，on_survey_planet 随机事件可能抽中开场 precursor.1000（权重6，对“无事件”100；只计算条件满足的事件），前提是尚无任何先驱者开场。开场开始 first_league_chain 并设置 first_league_intro，十四种调查异常此后才会生成。

A non-AI empire surveying a planet (not a star, no anomaly) in the First League region (precursor_3 systems) can draw the opening precursor.1000 from on_survey_planet random events (weight 6 vs 100 "no event"; only eligible events are weighed) if it has no other precursor opening. It begins first_league_chain and sets first_league_intro, which the fourteen site anomalies require.

## 剧情脉络 Story outline

1. 开场：约两百万年前由许多种族组成、相对和平共存的邦联“第一联盟”；残缺星图显示它在崩溃前覆盖了银河的很大部分。
2. 追寻遗迹（并行、任意顺序）：十四种异常（非宜居星球、气态巨行星、宜居星球、小行星）。每处为 异常 → 发现（1005…1070）→ 考古项目（FIRST_LEAGUE_ARCHEOLOGY_1–14，180天，科研船+科学家）→ 报告（1006…1071，线索+1）。
3. 定位母星系：线索上限6；每份报告调用隐藏的 1097，计数满后 1098 生成母星系“哈本尼斯之泽”（无位置则30天后重试），2天后到 1100。补充线索同样计数。
4. 母星：1100 的回应结束遗迹事件链，开启首都事件链并启用 FIRST_LEAGUE_HOMEWORLD_PROJECT（30天）。
5. 结果二选一：1101 第一联盟总部，或 1102 他人已先到。
6. 可选后续：结果设置 league_world_found（或拥有带“第一联盟母星”修正的星球），可另行用750稀有文物开启“探究第一联盟的秘密”（工程学，无期限）→ 10200。

1. Opening: the First League, a peaceful confederation of many races about two million years ago; a partial map suggests it spanned much of the galaxy before collapsing.
2. Following the traces (parallel, any order): fourteen anomalies (uninhabitable, gas giant, habitable, asteroid). Each: anomaly → discovery (1005…1070) → dig project (FIRST_LEAGUE_ARCHEOLOGY_1–14, 180 days, science ship + scientist) → report (1006…1071, +1 clue).
3. Locating: clue cap 6; each report calls hidden 1097; once complete, 1098 spawns Fen Habbanis (retry after 30 days), then 1100 after 2 days. Supplementary clues count too.
4. Homeworld: answering 1100 ends the site chain, opens the capital chain and enables FIRST_LEAGUE_HOMEWORLD_PROJECT (30 days).
5. One of two outcomes: 1101 the First League Headquarters, or 1102 someone else got there first.
6. Optional: the outcome sets league_world_found (owning a planet with the First League homeworld modifier also qualifies), so "Secrets of the First League" can be started for 750 minor artifacts (engineering, no limit) → 10200.

## 分支与结局 Branches and outcomes

- 十四份报告（编号仅供辨认）：1006 第28外环巡逻舰队以此为母港；1011 巡洋舰船员来自十二个物种；1016 好战的汉姆达战败后成为联盟拥护者，仪仗镰刀“magil-sha”；1021 卡萨克的贸易网络是联盟快速扩张的基础；1026 米格杨外交使团被认为推动了联盟成立；1031 维若帕曾是最出色的科学家，但废墟中已无其科技；1036 偏僻的研究基地可能进行危险研究（次元旅行或生物武器只是推测）；1041 联盟末期的样板殖民地发生内斗与屠杀后被放弃；1046 贸易星上各成员物种遗骸数量相当；1051 无敌舰队第二、第三舰队与里金人的舰队战，胜负不明；1056 囚犯越狱失败、窒息而亡，尸体无人收回；1061 联盟不干涉前太空文明，此文明在联盟崩溃后被奴隶贩子毁灭；1066 “不顺从”物种以反物质装置击毁封锁驱逐舰；1071 开放边界后犯罪与贸易一同兴盛。
- 1101 率先调查：总部星球依赖进口粮食；联盟崩溃后粮运骤停，饥荒与军阀割据使人口几个世纪内凋零。奖励在 after 中发放（凝聚力、社会学研究、影响力）；两个“很迷人”回应只按首都事件链是否仍在择一。
- 1102 他人已先到：两种措辞按事件链是否仍在择一。
- 10200：三个回应互斥（exclusive_trigger）：已有反重力工程 → 工程研究奖励；只有气候控制系统 → 开放反重力工程研究；两者皆无且非荒野帝国 → 直接给予气候控制系统并开放后续选项。都附带工业研究与建造速度修正。

- Fourteen reports: 1006 home port of the 28th Outer Rim Patrol Fleet; 1011 a crew from twelve species; 1016 the warlike Khamdai became League champions — a ceremonial "magil-sha" sickle; 1021 the Chassago trade network enabled rapid expansion; 1026 the Migir-Yan diplomatic corps likely drove the founding; 1031 the V'ropak were the best scientists, but none of their technology remains; 1036 an isolated base suggests dangerous research (dimensional travel or bio-weapons are guesses); 1041 a late propaganda colony collapsed in infighting and a massacre; 1046 remains of all member species in near-equal numbers; 1051 the 2nd and 3rd Fleets fought the Rikim — the winner is unknown; 1056 escaped prisoners suffocated and were never collected; 1061 a non-interference policy, and slavers destroyed this civilisation after the collapse; 1066 a "non-compliant" species destroyed a blockade destroyer with an antimatter device; 1071 crime flourished alongside trade once borders opened.
- 1101 first to survey: the capital depended on food imports; when shipments stopped after the collapse, famine and warlords emptied it over centuries. Rewards are given in the after block (unity, society research, influence); the two "Fascinating" responses differ only by whether the capital chain is active.
- 1102 someone else got there first: one of two wordings by chain state.
- 10200: three exclusive responses — with Anti-Gravity Engineering: research reward; with only Weather Control Systems: Anti-Gravity Engineering becomes researchable; with neither (non-wilderness): Weather Control Systems is granted. All add an industry-research / build-speed modifier.

## 条件与文明差异 Conditions and variants

- 10200 正文分排外（依赖他族是愚蠢）与非排外两种。
- 母星项目：无全局 first_league_homeworld_found 且目标非殖民地 → 1101，否则 1102。哈本尼斯之泽III是遗迹世界，带“第一联盟母星”修正；拥有它也能解锁秘密研究。
- 1100 同时向观察者发送 observer.58（仅观察者模式）。
- 源码细节：1098 设置的全局标志是 first_league_discovered，而 1097 检查 first_league_system_discovered（全游戏无处设置），所以“他国已定位”分支 1099 不会进入。
- 未使用的定义：异常 FEN_HABBANIS 生成权重为0，初始化器中的引用已注释。

- 10200 text: xenophobe (reliance on other races is folly) vs non-xenophobe.
- Homeworld project: no global first_league_homeworld_found and an uncolonised target → 1101, else 1102. Fen Habbanis III is a relic world with the First League homeworld modifier; owning it also unlocks the secrets action.
- 1100 also sends observer.58 to observers only.
- Source detail: 1098 sets first_league_discovered while 1097 checks first_league_system_discovered (never set), so the already-located branch 1099 is never taken.
- Unused definition: anomaly FEN_HABBANIS has spawn weight 0 and its initializer reference is commented out.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/precursor_events.txt:2127–3388；common/anomalies/96_anomaly_categories_precursors.txt:1305–2222；common/special_projects/00_projects_1.txt:1431–1840；common/artifact_actions/artifact_actions.txt:744；common/special_projects/00_projects_ancient_relics.txt:249；events/ancient_relics_arcsite_events_2.txt:6773；common/solar_system_initializers/prescripted_species_systems.txt:1608
- 已核对：precursor.1000（2127–2187）与 on_survey_planet 权重（00_on_actions.txt:1185）；league_1–14_cat；十四个项目（00_projects_1.txt:1431–1805）；1097–1100；1101–1102；母星项目（1809）；artifact_league_research（744）；LEAGUE_SECRETS（249）；10200（6773）；哈本尼斯之泽初始化器。十四份报告、总部报告与秘密报告中英文已逐篇读过。
- 结构修正：异常改为开场后的并行分支（含报告的地图标签）；删除提示性重复边；秘密研究改为母星结果后的可选分支；观察者通知、未使用异常与路由标志错配加注。
- 不确定：开场实际概率取决于其他可用勘察事件；第二个集齐线索的帝国会再生成一个哈本尼斯之泽（按脚本推断），未在游戏中验证；无DLC表现仅按脚本推断。

- Checked: precursor.1000 and its survey weight; league_1–14_cat; the fourteen projects; 1097–1100; 1101–1102 and the homeworld project; artifact_league_research; LEAGUE_SECRETS; 10200; the Fen Habbanis initializer. All reports read in both languages.
- Structural fixes: anomalies became a parallel set under the opening (with map labels for the reports); tooltip-only duplicate edge suppressed; secrets research is an optional branch after the outcomes; observer notice, unused anomaly and the router flag mismatch annotated.
- Uncertain: real opening chance; a second empire completing the clues would spawn another Fen Habbanis (inferred from script, not verified in play); no-DLC behaviour inferred from script.
