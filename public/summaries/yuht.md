# 尤特帝国 / The Yuht Empire

- 分类 Category：先驱者 Precursors · 来源 Sources：events/precursor_events.txt:1209–2118；common/anomalies/96_anomaly_categories_precursors.txt:704–1304；common/special_projects/00_projects_1.txt:1151–1425；common/artifact_actions/artifact_actions.txt:587；common/special_projects/00_projects_ancient_relics.txt:160；events/ancient_relics_arcsite_events_2.txt:6659；events/megastructure_events_1.txt:4673–4777；common/special_projects/00_projects_overlord.txt:5 · DLC：遗珍、文物奖励与秘密研究需《远古遗物》Ancient Relics；贾巴蒂尼数据缓存需《四海皆臣》Overlord · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

非AI帝国勘察“尤特星域”（precursor_2 星系）中一颗行星（非恒星、无异常）时，on_survey_planet 随机事件可能抽中开场 precursor.500（权重6，对“无事件”100；只计算条件满足的事件），前提是尚无任何先驱者开场。开场开始 yuht_chain 并设置 yuht_intro，九种调查异常此后才会生成。

A non-AI empire surveying a planet (not a star, no anomaly) in the Yuht region (precursor_2 systems) can draw the opening precursor.500 from on_survey_planet random events (weight 6 vs 100 "no event"; only eligible events are weighed) if it has no other precursor opening. It begins yuht_chain and sets yuht_intro, which the nine site anomalies require.

## 剧情脉络 Story outline

1. 开场：约六百万年前的尤特人——成年体长近百米的扁平节肢动物，一艘飞船上鲜有超过两三名尤特人。
2. 追寻遗迹（并行、任意顺序）：九种异常——宜居星球（孵化世界、博物馆、墓地、战场）、非宜居星球（监听阵列、巡洋舰、殖民船）、气态巨行星（首次接触卫星）、小行星（隐士居所）。每处为 异常 → 发现（505…545）→ 考古项目（YUHT_ARCHEOLOGY_1–9，180天，科研船+科学家）→ 报告（506…546，线索+1）。
3. 定位母星系：线索上限6；每份报告调用隐藏的 597，计数满后 598 生成母星系（无位置则30天后重试）或 599（仅触发一次），2天后到 600。补充线索同样计数。
4. 母星：600 的回应结束遗迹事件链，开启母星事件链并启用 YUHT_HOMEWORLD_PROJECT（30天）。
5. 结果二选一：601 母星报告，或 602 他人已先到。
6. 后续（均非必经）：(a) 拥有《四海皆臣》时，601 在 after 中安排720–1800天后的 over.50“异常读数”→ 项目“微弱能量信号”（YUHT_JABBARDEENI_CACHE，物理学360天，科研船+科学家，无期限）→ over.60“贾巴蒂尼数据缓存”；602 没有这条安排。(b) 两种结果都设置 yuht_world_found，可另行用750稀有文物开启“探究尤特的秘密”（社会学，无期限）→ 10050。两条后续互不依赖。

1. Opening: the Yuht, ~6 million years ago — flat arthropods nearly 100 m long as adults; ships rarely carried more than two or three.
2. Following the traces (parallel, any order): nine anomalies — habitable worlds (hatchery, museum, graveyard, battlefield), uninhabitable worlds (listening arrays, cruiser, colony ship), a gas giant (first-contact satellite) and an asteroid (hermit dwelling). Each: anomaly → discovery (505…545) → dig project (YUHT_ARCHEOLOGY_1–9, 180 days, science ship + scientist) → report (506…546, +1 clue).
3. Locating: clue cap 6; each report calls hidden 597; once complete, 598 spawns the system (retry after 30 days) or 599 (fires once), then 600 after 2 days. Supplementary clues count too.
4. Homeworld: answering 600 ends the site chain and enables YUHT_HOMEWORLD_PROJECT (30 days).
5. One of two outcomes: 601 the homeworld report, or 602 someone else got there first.
6. Follow-ups (both optional): (a) with Overlord, 601's after block schedules over.50 "Anomalous Readings" 720–1800 days later → project "Faint Energy Signature" (YUHT_JABBARDEENI_CACHE, physics 360 days, science ship + scientist, no time limit) → over.60 "Jabbardeeni Data Cache"; 602 has no such schedule. (b) Both outcomes set yuht_world_found, so "Secrets of the Yuht" can be started for 750 minor artifacts (society, no limit) → 10050. The two follow-ups are independent.

## 分支与结局 Branches and outcomes

- 九份报告（编号仅供辨认）：506 孵化世界先清除捕食者，幼体独居数世纪至接近智慧才被引入社会；511 监听阵列的数世纪日志表明当时这片星域没有智慧生命（不能扩展为整个银河）；516 博物馆的“赝品”其实是早于尤特数百万年的外星辐射测量仪；521 被盗墓地中一个成年尤特形状的玩偶（护符或纪念品只是推测）；526 带重炮的战斗挽具，推测士兵如移动堡垒；531 卫星上尤特巡洋舰与较小的贾巴蒂尼侦察船首次接触的图像；536 巡洋舰的两个冷冻舱与医疗日志，船上无遗骸；541 殖民船只有亚光速引擎，尤特靠冷冻和千年寿命扩张；546 哲学隐士雅克利尔死在气闸旁，等待一艘始终未到的补给船（原因未交代）。
- 601 率先调查：母星约四百万年前遭轨道轰炸。尤特寻找外星智慧百万年未果，遇到年轻的贾巴蒂尼后决定在其变强前先发制人；贾巴蒂尼的新技术扭转战局，不到十年终结了帝国。开场的六百万年与此处的四百万年是不同时间点。回应给遗珍“尤特冷冻核心”（远古遗物）与资源。
- 602 他人已先到：母星已被搜刮，两种措辞按事件链是否仍在择一。
- over.60：贾巴蒂尼人在尤特母星系的小行星里设监听哨，防备尤特人返回，后改为超光速实验场。奖励物理研究，再按 else_if 只给第一个符合的科技选项（超空间中继器 → 二、三级超空间引擎 → 虫洞稳定 → 实验性亚空间导航），并调用 generate_lcluster_clue（L星团线索，外部故事）。中文写“开战后不久”建造，英文写“战后”，两种原文不一致，保留不改。
- 10050：重现尤特孵化世界的净化工序，解锁殖民地决议“启动尤特净化工序”；回应按“可研究恶劣环境适应且尚未拥有”与否择一。

- Nine reports (numbers only identify them): 506 hatchery worlds sterilised of predators, hatchlings left alone for centuries until near-sapient; 511 centuries of array logs suggest this region had no sapient life then (not the whole galaxy); 516 a museum "fraud" is a radiation instrument millions of years older than the Yuht; 521 a doll shaped like an adult Yuht in a looted graveyard (charm or memento is speculation); 526 a battle harness with cannons — soldiers as mobile fortresses; 531 a satellite image of a Yuht cruiser and a smaller Jabbardeeni scout at first contact; 536 two cryo chambers and medical logs, no remains; 541 sublight engines — cryo and thousand-year lives spread the empire; 546 the hermit Yakliir died at her airlock waiting for a shuttle that never came (no cause given).
- 601 first to survey: orbital bombardment ~4 million years ago. After a million years of fruitless searching, the Yuht met the young Jabbardeeni and struck first; the Jabbardeeni's new technology turned the war, ending the empire in under a decade. The 6-million-year relics and this 4-million-year destruction are different dates. The response grants the Yuht Cryo Core relic (Ancient Relics) and resources.
- 602 someone else got there first: stripped world; one of two wordings by chain state.
- over.60: a Jabbardeeni listening post in a Yuhtaan asteroid watched for returning Yuht and later became an FTL test site. Physics reward, then only the first matching tech option (hyper relays → hyperdrive II/III → wormhole stabilisation → experimental subspace navigation), plus generate_lcluster_clue (L-Cluster clue, external story). Chinese says it was built "soon after the war began", English "after the war" — the two originals differ and are left as they are.
- 10050: recreating the Yuht hatchery cleansing, unlocking the colony decision "Initiate Yuht Cleansing Process"; one of two responses depending on Hostile Environment Adaptation eligibility.

## 条件与文明差异 Conditions and variants

- 10050 正文分排外/非排外，回应分“可研究且未拥有恶劣环境适应”/“已拥有或不可研究”，共四种组合，已用 readings 记录（同名回应按出现顺序区分）。
- 母星项目完成时：无全局 yuht_homeworld_found 且目标非殖民地 → 601，否则 602。
- 600 同时向观察者发送 observer.57（仅观察者模式）。
- 未使用的定义：异常 YUHTAAN（研究结果指向601）生成权重为0、无脚本放置，母星设置 prevent_anomaly。

- 10050 text splits xenophobe / non-xenophobe and its response splits tech-eligible / owned-or-ineligible — four combinations, recorded as readings (identically named responses are told apart by occurrence).
- Homeworld project: no global yuht_homeworld_found and an uncolonised target → 601, else 602.
- 600 also sends observer.57 to observers only.
- Unused definition: anomaly YUHTAAN (pointing to 601) has spawn weight 0, no script places it, and the homeworld has prevent_anomaly.

## 审阅记录 Review notes

- 已核对：precursor.500 与 on_survey_planet 权重（00_on_actions.txt:1184）；yuht_1–9_cat 生成条件；九个项目（均180天，skill 行已注释）；报告计数与 597/598/599（1856–1937）；600–602 与母星项目（00_projects_1.txt:1394）；artifact_yuht_research（587）、YUHT_SECRETS、10050；over.50、YUHT_JABBARDEENI_CACHE、over.60。九份报告、母星报告、秘密报告与数据缓存三页中英文已读。
- 合并：原独立导读“贾巴蒂尼数据缓存”（story-f639c6105c7b7386.md）的内容已并入本文并删除旧文件；该支线在树中位于 601 之下（after 中带 has_overlord_dlc 检查的延时调度）。
- 结构修正：异常改为开场后的并行分支；删除提示性重复边；秘密研究改为两种母星结果之后的可选分支；观察者通知与未使用异常加注。
- 不确定：开场实际概率取决于其他可用勘察事件；over.60 的L星团线索效果属于另一故事链，未在此审阅；无DLC表现仅按脚本推断。

- Checked: precursor.500 and its survey weight; yuht_1–9_cat spawn conditions; nine projects (180 days, skill lines commented out); counter and 597/598/599; 600–602 and the homeworld project; artifact_yuht_research, YUHT_SECRETS, 10050; over.50, YUHT_JABBARDEENI_CACHE, over.60. All reports and the three cache pages read in both languages.
- Merged: the former separate guide on the Jabbardeeni cache (story-f639c6105c7b7386.md) is folded in here and the old file removed; the branch sits under 601 (a delayed schedule in its after block, gated by has_overlord_dlc).
- Structural fixes: anomalies became a parallel set under the opening; tooltip-only duplicate edge suppressed; secrets research is an optional branch after either homeworld outcome; observer notice and unused anomaly annotated.
- Uncertain: real opening chance depends on other eligible survey events; the L-Cluster clue of over.60 belongs to another chain and is not reviewed here; no-DLC behaviour inferred from script.
