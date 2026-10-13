# 最后的巴奥 / The Last Baol

- 分类 Category：先驱者 Precursors · 来源 Sources：events/ancient_relics_arcsite_events_1.txt:1187–2405；common/archaeological_site_types/01_precursor_arc_sites.txt:264–412；common/special_projects/00_projects_ancient_relics.txt:2–102、309；common/artifact_actions/artifact_actions.txt:781；common/decisions/05_ancient_relics_decisions.txt:72–290；common/relics/relics.txt:1072 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

非AI帝国勘察巴奥星域（precursor_baol_1 星系，太阳系除外）中一个非恒星、非气态巨行星、非熔岩、无异常与遗址的天体时，on_survey_planet 以权重15可能抽中开场 ancrel.2000“格鲁努尔”。全银河只触发一次（全局 baol_started），且该帝国不能已有其他先驱者开场。回应在该星球建立格鲁努尔遗址。

A non-AI empire surveying a non-star, non-gas-giant, non-molten body without anomaly or site in a Baol region system (precursor_baol_1, not Sol) can draw the opening ancrel.2000 "The Grunur" (weight 15) from on_survey_planet. It fires once per galaxy (global baol_started) and needs no other precursor opening. The response creates the Grunur dig site.

## 剧情脉络 Story outline

严格依次推进，每一处的最后阶段给出下一处的坐标：
1. 格鲁努尔遗址（2阶段：2001 战争记录提到“巴奥有机体”，2002 得到殖民地坐标、开始事件链并启用30天调查项目）。
2. 荒芜之地（项目→2003→遗址，3阶段：2004 燃烧弹造成大灭绝；2005 巴奥是植物型蜂巢思维；2006 下一处坐标）。
3. 碎裂之地（项目→2007 星球已碎成小行星→遗址，4阶段：2008 给幼苗的教学；2009 巴奥起源；2010 格鲁努尔的轻蔑；2011 作战命令与下一处坐标）。
4. 沉寂之地（项目→2012→遗址，2阶段：2013 蜂巢器官退化；2024 入侵数百年后彻底失去蜂巢意识）。
5. 2024 的回应若是全银河首个完成者，隐藏的 2014 生成“最后的巴奥”星系（无位置则30天后重试），10天后收到格鲁努尔求救信号 2015 → 项目（30天）→ 2016 研究站中仅存一个生命体 → 2017–2021 与最后的巴奥对话。
6. 可选：2014 设置 last_baol_system，之后可花750稀有文物开启“探究巴奥的秘密”（社会学）→ 10300。

Strictly sequential; each site's last stage gives the next coordinates:
1. Grunur site (2 stages: 2001 war records mention "the Baol Organism"; 2002 colony coordinates, chain start, 30-day investigation project).
2. The Barren (project → 2003 → site, 3 stages: 2004 firebombing and mass extinction; 2005 the Baol were a plantoid hive mind; 2006 next coordinates).
3. The Shattered (project → 2007 the world was blown into asteroids → site, 4 stages: 2008 lessons for saplings; 2009 Baol origins; 2010 Grunur contempt; 2011 battle orders with the next coordinates).
4. The Silenced (project → 2012 → site, 2 stages: 2013 diminished hive organs; 2024 the hive mind lost entirely centuries after the invasion).
5. If this is the first empire to finish, hidden 2014 spawns the Last Baol system (retry after 30 days) and the Grunur distress signal 2015 arrives 10 days later → project (30 days) → 2016 a single lifeform in a failing research station → dialogue 2017–2021 with the last Baol.
6. Optional: 2014 sets last_baol_system, so "Secrets of the Baol" can be started for 750 minor artifacts (society) → 10300.

## 分支与结局 Branches and outcomes

- 对话：2017 按文明类型有不同开场选项（灭绝者、种族洁癖、机械、蜂巢），都进入 2018；2018 可正常提问、亲外主义者先表示帮助（2020 再回到提问）、排外主义者命令回答，噬杀蜂群与铁心灭绝者直接跳到 2021；2019 中“说说你自己”“巴奥发生了什么”只显示回应，可反复询问。
- 2021：巴奥只求一死，并问同族是否仍在。两种结局互斥：2022 告诉它族人“某种意义上”仍在、让它安息；2023 直接拔掉插头。两者都给予遗珍“最后的巴奥”（演化猎手起源另有专属回应）。
- 遗珍激活（消耗凝聚力、有冷却）后可颁布星球决议：普通星球变为盖亚星球并生成新巴奥人口（2025）、盖亚星球强化（2026）、人造星球生命播种（2027）。

- Dialogue: 2017 offers empire-type openers (exterminator, purifier, machine, hive), all leading to 2018; in 2018 one may ask questions, xenophiles first offer help (2020, then back to questions), xenophobes demand answers, devouring swarms and exterminators jump to 2021; in 2019 "Tell us about yourself" and "What happened to the Baol?" only show replies and can be asked repeatedly.
- 2021: the Baol wants only an end and asks whether its kind lives. Two exclusive endings: 2022 tell it they live on "in a sense" and let it rest; 2023 pull the plug. Both grant the relic The Last Baol (Evolutionary Predators get an extra response).
- After activating the relic (unity cost, cooldown) a planet decision becomes available: a natural world becomes a Gaia world with new Nu-Baol pops (2025), a Gaia world is enhanced (2026), or an artificial world is life-seeded (2027).

## 条件与文明差异 Conditions and variants

- 2021 正文分排外/嗜杀与其他；10300 正文按是否已有表观遗传学触发器；三个回应按科技择一。
- 2025–2027 的回应按亲外、允许清洗、奴役/掠夺、蜂巢等条件显示不同措辞。
- 2015 同时向观察者发送 observer.85。

- 2021's text differs for xenophobes/homicidal empires; 10300's text depends on Epigenetic Triggers and its three responses are exclusive by technology.
- 2025–2027 responses vary with xenophile, purge, slavery/despoiler and hive conditions.
- 2015 also sends observer.85 to observers.

## 审阅记录 Review notes

- 已核对：2000–2027 全部脚本、四处遗址定义的阶段顺序、三个殖民地项目、2014 星系生成、artifact_baol_research、BAOL_SECRETS 与 10300、遗珍 r_the_last_baol 与三项决议；中英文正文已读。
- 结构修正：秘密研究桥改写为带证据的可选分支；原为独立单页故事的三个决议通知（2025–2027）并入本故事，作为遗珍激活后的可选后续；补充互斥组、阶段标签与对话说明。V3 关于 2024 位于 2013 与 2015 之间的结论经复核成立。
- 不确定：无。

- Checked: all scripts 2000–2027, stage order of the four sites, three colony projects, the 2014 system spawn, artifact_baol_research, BAOL_SECRETS and 10300, the relic and its three decisions; both languages read.
- Structural fixes: the secrets bridge rewritten as an evidenced optional branch; the three decision notifications (2025–2027, previously one-card stories) joined as optional follow-ups after the relic; exclusive groups, stage labels and dialogue notes added. V3's note that 2024 sits between 2013 and 2015 is confirmed.
