# 赛博勒克斯 / The Cybrex

- 分类 Category：先驱者 Precursors · 来源 Sources：events/precursor_events.txt:4483–5683；common/anomalies/96_anomaly_categories_precursors.txt:2943–3661；common/special_projects/00_projects_1.txt:2180–2508；common/artifact_actions/artifact_actions.txt:713；common/special_projects/00_projects_ancient_relics.txt:279；events/ancient_relics_arcsite_events_2.txt:6915 · DLC：遗珍、文物奖励与秘密研究需《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

非AI帝国的科研船勘察一颗位于“赛博勒克斯星域”（引擎分配、带 precursor_5 标志的星系）的行星时，on_survey_planet 的随机事件可能抽中开场 precursor.2000（权重6，对“无事件”100；只计算条件满足的事件）。要求目标不是恒星、没有异常，且该帝国尚无任何先驱者开场。开场立即开始事件链 cybrex_chain 并设置 cybrex_intro；此后在该星域勘察时才会生成十一种调查异常。

A non-AI empire's science ship surveying a planet in the Cybrex region (systems flagged precursor_5 by the engine) can draw the opening precursor.2000 from the on_survey_planet random events (weight 6 against 100 "no event"; only eligible events are weighed). The body must not be a star or already hold an anomaly, and the empire must have no other precursor opening. The opening begins cybrex_chain and sets cybrex_intro, which the eleven site anomalies require.

## 剧情脉络 Story outline

1. 开场：发现约六十万年前的机器集体意识“赛博勒克斯”的遗物，碎片记录提到它们曾发动消灭智慧有机生命的远征。事件链卡片说明集齐遗物可定位母星系。
2. 追寻遗迹（并行、任意顺序）：十一种“先驱者的活动迹象”异常分别出现在宜居星球、非宜居星球、小行星或气态巨行星上（96_anomaly_categories_precursors.txt:2943–3661）。每处依次为 异常 → 发现事件（2005…2055）→ 考古项目（CYBREX_ARCHEOLOGY_1–11，180天，需科研船与科学家）→ 报告（2006…2056，线索+1）。不必做完全部十一处。
3. 定位母星系：线索计数上限为6（00_event_chains.txt:107）。每份报告调用隐藏路由 2103；计数满后，首个定位者由 2098 生成母星系（无可用位置则每30天重试），否则 2099；两者都在2天后进入 2100。补充线索（见“先驱者：遗失的线索”）同样计数。
4. 母星：2100 的回应结束遗迹事件链、开启母星事件链，并启用 CYBREX_HOMEWORLD_PROJECT（30天）。
5. 结果（二选一）：2101 中枢节点报告，或 2102 环形世界已被他人搜刮。
6. 可选后续：两种结果都设置 cybrex_world_found；之后可另行用750稀有文物开启“探究赛博勒克斯的秘密”（工程学研究项目，无期限），完成后得到 ancrel.10250。

1. Opening: relics of the Cybrex, a linked machine consciousness active about 600,000 years ago; a fragment says they waged a crusade against all sapient organic life. The chain card says enough relics could locate their home system.
2. Following the traces (parallel, any order): eleven "Signs of Precursor Activity" anomalies on habitable, uninhabitable, asteroid or gas-giant bodies. Each runs anomaly → discovery (2005…2055) → dig project (CYBREX_ARCHEOLOGY_1–11, 180 days, science ship with scientist) → report (2006…2056, +1 clue). Not all eleven are needed.
3. Locating the system: the clue counter caps at 6. Every report calls hidden router 2103; once complete, the first empire spawns the home system via 2098 (retrying every 30 days without a usable spot), otherwise 2099; both lead to 2100 after 2 days. Supplementary clues (story "Precursors: Lost Clues") count too.
4. Homeworld: answering 2100 ends the site chain, opens the homeworld chain and enables CYBREX_HOMEWORLD_PROJECT (30 days).
5. Outcome (one of two): 2101 the Central Nexus report, or 2102 the ring world already stripped by others.
6. Optional follow-up: both outcomes set cybrex_world_found; the "Secrets of the Cybrex" project can then be started separately for 750 minor artifacts (engineering, no time limit), ending in ancrel.10250.

## 分支与结局 Branches and outcomes

- 2101 率先调查：环形世界报告揭示赛博勒克斯在远征第十七年前后重新评估行动，用近一个世纪撤离，在环形世界隐居数千年，直到位置泄露、邻近势力联军将其轰毁——原文说它们似乎没有抵抗。报告并未确定停战原因（战场损失或集体意识的观念转变都只是可能）。三个“很迷人”选项文本相同，按 cybrex_end1/end2 标志择一，均给遗珍“赛博勒克斯兵工厂”（远古遗物）和资源。
- 2102 他人已先到：环形世界已被他人彻底搜刮；正文按事件链是否仍在显示两种措辞之一。
- 秘密研究 10250：两个回应按是否已有“巨型结构工程”科技择一（exclusive_trigger）：已有则得工程研究奖励，否则开放该科技研究选项；两者都有秘密科技进度和巨构建造速度修正。

- 2101 first to arrive: the ring-world report says the Cybrex re-evaluated the crusade around its seventeenth year, withdrew over nearly a century, isolated themselves for millennia until their location leaked and a coalition bombarded the ring world — apparently without resistance. The cause of the halt stays open (battle losses or an ideological shift are only possibilities). Three identical "Fascinating" options are selected by the cybrex_end1/end2 flags; all grant the Cybrex War Forge relic (Ancient Relics) and resources.
- 2102 someone else got there first: the ring world has been thoroughly stripped by others; the text shows one of two wordings depending on whether the chain is still active.
- Secrets report 10250: two exclusive responses depending on whether Mega-Engineering is known (research reward vs. research option); both add secret-tech progress and a megastructure build-speed modifier.

## 条件与文明差异 Conditions and variants

- 10250 正文：非个体机械且（取缔人工智能或唯心主义）时显示“反机械”评价，否则显示融入研究的版本。
- 母星项目完成时只检查全局 cybrex_homeworld_found（检查殖民地的条件在源码中被注释）。
- 观察者模式下 2100 同时给观察者发送 observer.60，这不是玩家帝国的窗口。
- 十一份报告的阅读顺序是玩家的发现顺序，不等于远古历史的时间顺序。

- 10250 text: non-individual-machine empires that outlaw AI or are spiritualist read the "anti-machine" version; others read the integration version.
- The homeworld project checks only the global cybrex_homeworld_found flag (the colony check is commented out).
- In observer mode 2100 also sends observer.60 to observers; it is not a window for the player's empire.
- The eleven reports are read in discovery order, which is not the historical order of events.

## 审阅记录 Review notes

- 已核对：开场 trigger/immediate（precursor_events.txt:4483–4543）、on_survey_planet 权重（00_on_actions.txt:1187）、十一种异常的生成条件与 on_success、十一个项目（00_projects_1.txt:2180–2473）、报告的计数与路由 2103/2098/2099（5282–5365）、2100–2102、母星项目（2477）、artifact_cybrex_research（artifact_actions.txt:713）、CYBREX_SECRETS 与 10250；十一份报告的中英文已逐篇读过（V3 逐篇摘要经复核仍成立：例如2031英文为“至少”五万年、2056英文为俘虏）。
- 结构修正：异常卡片改为开场之后的并行子节点（依据其生成条件）；删除开场选项中仅为提示的事件链重复边；秘密研究不再是无序入口，而是两种母星结果之后的可选分支；观察者通知加注。
- 不确定：开场的实际触发概率取决于同时满足条件的其他勘察事件；无DLC时的界面表现仅按脚本推断。

- Checked: opening trigger/immediate, survey weight, all eleven anomaly spawn conditions and outcomes, the eleven projects, report counter and routers 2103/2098/2099, 2100–2102, the homeworld project, artifact_cybrex_research, CYBREX_SECRETS and 10250; all eleven reports read in both languages (V3 per-report notes re-confirmed, e.g. English 2031 says "at least" 50,000 years; 2056 calls them captives).
- Structural fixes: site anomalies now hang under the opening as a parallel set (per their spawn conditions); the tooltip-only duplicate chain edge was suppressed; the secrets research is no longer an unordered entry but an optional branch after either homeworld outcome; the observer notice is labelled.
- Uncertain: the real per-survey chance of the opening depends on other eligible survey events; behaviour without the DLC is inferred from script only.
