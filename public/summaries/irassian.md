# 伊拉斯协约国 / The Irassian Concordat

- 分类 Category：先驱者 Precursors · 来源 Sources：events/precursor_events.txt:3397–4474；common/anomalies/96_anomaly_categories_precursors.txt:2223–2942；common/special_projects/00_projects_1.txt:1846–2174；common/artifact_actions/artifact_actions.txt:556；common/special_projects/00_projects_ancient_relics.txt:130；events/ancient_relics_arcsite_events_2.txt:6543 · DLC：遗珍、文物奖励与秘密研究需《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

非AI帝国勘察“伊拉斯星域”（precursor_4 星系）中一颗行星（非恒星、无异常）时，on_survey_planet 随机事件可能抽中开场 precursor.1500（权重6，对“无事件”100；只计算条件满足的事件），前提是尚无任何先驱者开场。开场设置 irassian_intro 并开始 irassian_chain，十一种调查异常此后才会生成。

A non-AI empire surveying a planet (not a star, no anomaly) in the Irassian region (precursor_4 systems) can draw the opening precursor.1500 from on_survey_planet random events (weight 6 vs 100 "no event"; only eligible events are weighed) if it has no other precursor opening. It sets irassian_intro and begins irassian_chain, which the eleven site anomalies require.

## 剧情脉络 Story outline

1. 开场：一百多万年前统治这片星域的六肢哺乳动物“伊拉斯协约国”；文献多次提到席卷其帝国、可能导致灭绝的瘟疫“贾沃疹”。
2. 追寻遗迹（并行、任意顺序）：十一种异常（宜居星球、非宜居星球、小行星、气态巨行星）。每处为 异常 → 发现（1505…1555）→ 考古项目（IRASSIAN_ARCHEOLOGY_1–11，180天，科研船+科学家）→ 报告（1506…1556，线索+1）。
3. 定位母星系：线索上限6；每份报告调用隐藏的 1597，计数满后 1598 生成母星系“伊拉斯”（无位置则30天后重试），2天后到 1600。补充线索同样计数。
4. 母星：1600 的回应结束遗迹事件链，开启母星事件链并启用 IRASSIAN_HOMEWORLD_PROJECT（30天）。
5. 结果二选一：1601 伊拉斯人母星报告，或 1602 他人已先到。
6. 可选后续：两种结果都设置 irassian_world_found，可另行用750稀有文物开启“探究伊拉斯人的秘密”（社会学，无期限）→ ancrel.9001。

1. Opening: the six-limbed mammalian Irassian Concordat that ruled this region a little over a million years ago; sources mention the "Javorian Pox", a plague that swept their empire and may have caused their extinction.
2. Following the traces (parallel, any order): eleven anomalies (habitable, uninhabitable, asteroid, gas giant). Each: anomaly → discovery (1505…1555) → dig project (IRASSIAN_ARCHEOLOGY_1–11, 180 days, science ship + scientist) → report (1506…1556, +1 clue).
3. Locating: clue cap 6; each report calls hidden 1597; once complete, 1598 spawns the Irass system (retry after 30 days), then 1600 after 2 days. Supplementary clues count too.
4. Homeworld: answering 1600 ends the site chain and enables IRASSIAN_HOMEWORLD_PROJECT (30 days).
5. One of two outcomes: 1601 the Irassian homeworld report, or 1602 someone else got there first.
6. Optional: both outcomes set irassian_world_found, so "Secrets of the Irassians" can be started for 750 minor artifacts (society, no limit) → ancrel.9001.

## 分支与结局 Branches and outcomes

- 十一份报告（编号仅供辨认）：1506 舰队封锁疫区殖民地，至少十几艘民船强行突围，部分成功；1511 舰队指挥官质疑“净化”殖民地的命令，记录中断但命令显然被执行；1516 被征服的丘格拉向其他附庸种族号召：贾沃疹只伤伊拉斯人、任何物种都可携带，应趁机反击；1521 伊拉斯人认定提德戈与其他附庸合谋散播瘟疫（真假不明），将其母星焚毁；1526 清理植被后发掘殖民地，找到贬低附庸种族的儿童帝国地图集；1531 一百多名矿工的遗体被同伴抛入钻井；1536 贾沃疹起源于此：本地细菌因隔离封条的制造缺陷侵入，再随来访商船扩散，伊拉斯人可能来不及得知；1541 巡洋舰在疫情后被隔离，部分船员试图逃往逃生舱时被射杀；1546 疾控总部的日志越来越绝望，最终空间站本身也失控；1551 扩张时期用来侦察和策划进攻的监听哨，瘟疫时早已废弃；1556 研究站曾关注气态巨行星深处的人造物，如今已找不到。
- 1601 率先调查：近两千年内有人对母星表面进行了地毯式轨道轰炸（可能是误以为能防止瘟疫复发）；瘟疫抵达母星时多数星球已陷落、附庸公开造反，居民大多已认命。回应给遗珍“贾沃疹样本”（远古遗物）与资源。
- 1602 他人已先到：两种措辞按事件链是否仍在择一。
- 9001：按条件链只给第一项符合的科技（基因组测绘 → 前沿卫生 → 前沿医院 → 基因裁剪研究选项 → 否则社会学研究奖励），并给生物学研究与人口增长修正。

- Eleven reports: 1506 a fleet quarantined a plague colony and at least a dozen civilian ships ran the blockade, some successfully; 1511 a commander questioned orders to "purge" a colony — the log ends, but the order was evidently carried out; 1516 the conquered Joggra urged other client species to strike, since the pox harms only Irassians and any species can carry it; 1521 the Irassians believed the Ti'Derg conspired to spread the pox (truth unknown) and incinerated their world; 1526 a cleared settlement yields a children's atlas disparaging the client species; 1531 over a hundred miners' bodies dumped into a borehole; 1536 the pox originated here — native bacteria entered through a faulty quarantine seal and spread via a visiting merchant ship; the Irassians may never have learned this; 1541 a quarantined cruiser where crew trying to reach escape pods were shot; 1546 increasingly desperate disease-control logs until the station itself was overrun; 1551 a listening post used to spy and plan attacks during the expansion, long abandoned by the plague; 1556 a research station studied an artificial object deep in the gas giant, now gone.
- 1601 first to survey: within the last 2,000 years someone systematically bombarded the whole surface (possibly a misguided attempt to keep the pox from resurfacing); by the time the plague reached the homeworld most worlds had fallen and vassals were in revolt, and the population was largely resigned. The response grants the Javorian Pox Sample relic (Ancient Relics) and resources.
- 1602 someone else got there first: one of two wordings by chain state.
- 9001: only the first matching tech in the chain (Genome Mapping → frontier health → frontier hospital → Gene Tailoring option → otherwise society research), plus a biology-research / growth modifier.

## 条件与文明差异 Conditions and variants

- 9001 正文分排外与非排外两种。
- 母星项目：无全局 irassian_homeworld_found 且目标非殖民地 → 1601，否则 1602。
- 1600 同时向观察者发送 observer.59（仅观察者模式）。
- 源码细节：1598 设置的全局标志是 irassia_discovered，而 1597 检查 irassian_system_discovered（全游戏无处设置），所以“他国已定位”分支 1599 不会进入。
- 未使用的定义：异常 IRASSIA 生成权重为0，初始化器中的引用已注释。

- 9001 text: xenophobe vs non-xenophobe.
- Homeworld project: no global irassian_homeworld_found and an uncolonised target → 1601, else 1602.
- 1600 also sends observer.59 to observers only.
- Source detail: 1598 sets irassia_discovered while 1597 checks irassian_system_discovered (never set), so the already-located branch 1599 is never taken.
- Unused definition: anomaly IRASSIA has spawn weight 0 and its initializer reference is commented out.

## 审阅记录 Review notes

- 已核对：precursor.1500（3397–3457）与 on_survey_planet 权重（00_on_actions.txt:1186）；irassian_1–11_cat；十一个项目（00_projects_1.txt:1846–2140）；1597–1600；1601–1602 与母星项目（2143）；artifact_irassian_research（556）；IRASSIAN_SECRETS（130）；9001（6543）。十一份报告、母星报告与秘密报告中英文已读。
- 结构修正：异常改为开场后的并行分支（含报告的地图标签）；删除提示性重复边；秘密研究改为母星结果后的可选分支；观察者通知、未使用异常与路由标志错配加注。
- 不确定：开场实际概率；第二个集齐线索的帝国会再生成一个伊拉斯星系（按脚本推断），未在游戏中验证；无DLC表现仅按脚本推断。

- Checked: precursor.1500 and its survey weight; irassian_1–11_cat; the eleven projects; 1597–1600; 1601–1602 and the homeworld project; artifact_irassian_research; IRASSIAN_SECRETS; 9001. All reports read in both languages.
- Structural fixes: anomalies became a parallel set under the opening (with report map labels); tooltip-only duplicate edge suppressed; secrets research is an optional branch after the outcomes; observer notice, unused anomaly and router flag mismatch annotated.
- Uncertain: real opening chance; a second empire completing the clues would spawn another Irass system (inferred from script, not verified in play); no-DLC behaviour inferred from script.
