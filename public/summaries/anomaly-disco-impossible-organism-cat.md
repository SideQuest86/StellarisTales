# 不可能的有机体 / Impossible Organism

- 分类 Category：深空异闻 Exploration · DLC：无DLC检查（定义位于《遥远繁星》文件中，但类别与事件都不检查 has_distar）/ no DLC check (defined in the Distant Stars files, but neither category nor events test has_distar)

## 如何开始 How it starts

无战略资源的有毒星球可能生成（6级，权重2，全局一次，null_spawn_chance 0.75，即只有25%真正生成）；排外与格式塔帝国为0。

Can spawn on toxic planets without strategic resources (level 6, weight 2, once per game, null_spawn_chance 0.75 — only 25% actually spawn); 0 for xenophobes and gestalts.

## 剧情脉络 Story outline

1. distar.3010：毒性星球上有一种不需要养分也能存活的顽强小生物。采样 → impossible_organism_project_1（3000）；远观 → 星球获得“不可能的有机体”修正（社会学+3）。
2. distar.3011：它长到肉眼可见，能从几乎任何物质吸收能量。继续研究 → impossible_organism_project_2（5000）；太危险，射入深空 → 1700–1900天后 distar.3014：它落在另一颗星球繁衍成航天种族“尼瓦拉克”，并记得我们当初的冷漠。
3. distar.3012“不可能的真菌”：它是真菌类，好奇而聪明。尝试沟通 → 250–300天后 distar.3013；扔进太空 → 1300–1500天后 distar.3014。
4. distar.3013“第一个字”：它说出“nivlac”，并开始用孢子繁殖。接纳为人口 → 10天后 distar.3017（入籍或被同化）；给它们自己的家园 → 720–820天后 distar.3016：尼瓦拉克在新星球上发展出超光速技术；同化者也可直接烧掉它们。

1. distar.3010: a tiny, tenacious organism survives on the toxic world without apparent sustenance. Sample it → impossible_organism_project_1 (3000); study from afar → the planet gets the Impossible Organism modifier (+3 society).
2. distar.3011: it grows visible and absorbs energy from almost anything. Keep studying → impossible_organism_project_2 (5000); too dangerous, shoot it into space → 1700–1900 days later distar.3014: it landed on another world, grew into the spacefaring Nivlac, and remembers our disregard.
3. distar.3012 "Impossible Fungoid": it is a fungoid, curious and intelligent. Try to communicate → distar.3013 after 250–300 days; airlock it → distar.3014 after 1300–1500 days.
4. distar.3013 "First Words": it says "nivlac" and starts spreading spores. Take them in as pops → distar.3017 ten days later (integration or assimilation); give them a home of their own → distar.3016 after 720–820 days: the Nivlac develop FTL on their new world; Assimilators may simply torch them.

## 分支与结局 Branches and outcomes

三处“放弃”分支都汇入 distar.3014（敌意的尼瓦拉克）；接纳与安置分别以 3017 与 3016 结束，三者互斥。

The three "get rid of it" branches all converge on distar.3014 (hostile Nivlac); integration and relocation end in 3017 and 3016; the three endings are exclusive.

## 条件与文明差异 Conditions and variants

distar.3011 排外措辞不同；distar.3013 的接纳选项按亲外、普通、仆从、同化者分别给出；distar.3017 对同化者使用“同化”正文。

distar.3011 has a xenophobe wording; distar.3013's accept options split xenophile / normal / Servitor / Assimilator; distar.3017 uses an assimilation text for Assimilators.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1557-1584; events/distant_stars_events_2.txt:7136 (distar.3010); common/special_projects/00_projects_distant_stars.txt:728/748 (impossible_organism_project_1/2); events/distant_stars_events_2.txt:7180-7252 (distar.3011-3013); events/distant_stars_events_2.txt:7475 (distar.3014); events/distant_stars_events_2.txt:7637 (distar.3016); events/distant_stars_events_2.txt:7798 (distar.3017)
已核对异常、distar.3010–3017 与两个项目。树结构正确（3014 的汇合以 ref 节点表示）；补充结局。

Checked the anomaly, distar.3010–3017 and both projects. Tree correct (3014 convergence shown as refs); endings added.
