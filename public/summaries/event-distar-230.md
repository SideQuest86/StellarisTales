# 鼠人族起源 / Ketling Origins

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:2938-3590 (ratling_1_1/1_2/1_3); common/on_actions/00_on_actions.txt:1008; events/distant_stars_events_1.txt:7297 (distar.230); common/anomalies/95_anomaly_categories_distant_stars.txt:741-765; events/distant_stars_events_1.txt:7380 (distar.231); events/distant_stars_events_1.txt:7425 (distar.232); events/distant_stars_events_1.txt:7560 (distar.233); common/special_projects/00_projects_distant_stars.txt:240-610 (KETLING_PROJECT_1-6); events/distant_stars_events_1.txt:7838 (distar.234); events/distant_stars_events_1.txt:7917 (distar.235); common/on_actions/00_on_actions.txt:837; events/distant_stars_events_1.txt:8074-8165 (distar.325, 236); events/distant_stars_events_1.txt:8543 (distar.237); common/event_chains/00_event_chains_distant_stars.txt:19

## 如何开始 How it starts

《遥远繁星》生成三个相连的“鼠人”星系（ratling_1_1/1_2/1_3，若有人类玩家使用鼠人头像则不生成）。普通帝国的舰队首次进入其中之一时触发 distar.230。

Distant Stars creates three linked Ketling systems (ratling_1_1/1_2/1_3; not generated if a human player uses the rat portrait). The first time a default empire's fleet enters one of them, distar.230 fires.

## 剧情脉络 Story outline

1. distar.230“毁灭的世界”：废弃空间站和多颗墓星，表明一个星际国家早已崩溃。事件后在本帝国视野中于“残毁首都”放置异常 DISTAR_RAT_CAT，并为全局排定25–35年（9000+3600天）后的隐藏事件 distar.232。
2. 异常 → distar.231“残毁首都”：这里是那个文明的首都，毁于与某个外部威胁的星际战争，原因无法确定。
3. 25–35年后 distar.232 让鼠人从废品堆中出现（成为前航天国家），1天后发现过鼠人的帝国收到 distar.233“不速之客”：开启“鼠人族起源”事件链与 KETLING_PROJECT_1–6（同组项目，任选一颗有自治鼠人的星球研究，180天）。
4. 项目完成 → distar.234“鼠人的起源”：鼠人是心灵感应的灵能者，原是殖民者的宠物，在辐射中快速变异而发展出技术文化。
5. distar.233 再排定25–35年后的 distar.325/236：鼠人建立“鼠人群落”正式帝国，发现过他们的帝国收到 distar.237。
6. 在此之前若地面入侵前航天鼠人的星球并获胜，distar.235“鼠人已割让行星”把星球交给入侵者，并中止该星球的研究项目。

1. distar.230 "Ruined Worlds": derelict stations and tomb worlds of a long-collapsed interstellar nation. Afterwards the anomaly DISTAR_RAT_CAT is placed on the ruined capital for this empire, and the hidden distar.232 is scheduled 9000+3600 days (25–35 years) later.
2. Anomaly → distar.231 "Ruined Capital": the planet was the fallen capital, destroyed in a war against some external threat; the cause cannot be settled.
3. After 25–35 years distar.232 brings the Ketlings out of the junk heaps as a pre-space country, and one day later empires that discovered them get distar.233 "Unexpected Arrivals": it starts the "Ketling Origins" chain and KETLING_PROJECT_1–6 (one option group: study any one planet with autonomous Ketlings, 180 days).
4. Project → distar.234 "The Origin of the Ketlings": they are telepathic psions descended from the colonists' pets, mutated by radiation into a technological culture.
5. distar.233 schedules distar.325/236 another 25–35 years later: the Ketlings become the full "Ketling Multitude" empire and empires that know them get distar.237.
6. Before that, winning a ground invasion of a pre-space Ketling planet triggers distar.235 "Ketling Planet Subdued", transferring the planet and aborting its study project.

## 分支与结局 Branches and outcomes

KETLING_PROJECT_1–6 属同一选项组，只需完成其一。distar.235 是可选的军事分支，取决于玩家是否入侵。distar.237 只在仍有可用鼠人星球时出现。

KETLING_PROJECT_1–6 form one option group; only one is needed. distar.235 is an optional military branch. distar.237 only happens while a valid Ketling planet remains.

## 条件与文明差异 Conditions and variants

distar.230 与 distar.233/234/237 都有排外/终结者等专属措辞；distar.237 的部分选项在已研究鼠人时自动建立通讯。distar.234 有鼠人已成为正式帝国时的另一文本。distar.235 正文按是否还有其他鼠人星球及是否为同化者而不同。

distar.230/233/234/237 have xenophobe/Terminator (etc.) wordings; some distar.237 options open communications if the empire researched the Ketlings. distar.234 has a text for when the Ketlings are already a full empire. distar.235's text depends on whether other Ketling planets remain and on the Assimilator civic.

## 审阅记录 Review notes

已核对三个初始化、on_entering_system_fleet、distar.230–237（含隐藏 232/325/236）、六个项目、事件链和 on_colony_attackers_win。修正：草稿把“残毁首都”异常和 distar.235 拆成独立故事；现并入本故事，并加审阅连接“首都异常”和“入侵鼠人星球”；六个研究项目标为同组互斥。

Checked the three initializers, on_entering_system_fleet, distar.230–237 (incl. hidden 232/325/236), the six projects, the event chain and on_colony_attackers_win. Correction: the draft kept the Ruined Capital anomaly and distar.235 as separate stories; both are now part of this story with reviewed links, and the six projects are an exclusive option group.
