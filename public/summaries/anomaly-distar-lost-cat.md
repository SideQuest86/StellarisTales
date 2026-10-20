# 迷路的变形虫 / Lost Amoeba

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

需要《遥远繁星》。气态巨行星可能生成（2级，权重1）；提亚基或变形虫母星系中不会生成。

Requires Distant Stars. Can spawn on gas giants (level 2, weight 1); not in Tiyanki or Amoeba home systems.

## 剧情脉络 Story outline

1. distar.50“迷路的变形虫”：云中是一只失散的幼年太空变形虫，它开始跟随科研船。
2. 收养（非杀戮型帝国）：变形虫舰队归我方；360–420天后 distar.51“羽翼丰满”为成年的它命名（不满意可经 distar.55、distar.56 再选），100年后 distar.304“百岁变形虫”。
3. 拒绝：90天后 distar.52，它自行离开。
4. 解剖：DISSECTION_PROJECT（舰队战力>90，30天，限时1800天）→ distar.53 成功解剖或 distar.54 逃脱。
5. 若这是帝国首次遇到太空变形虫，收养会开启通用的“安抚变形虫”项目（story.107），拒绝开启“太空变形虫研究”（story.105），解剖获得狩猎加成。
6. 收养的变形虫若在战斗中失能（on_ship_disabled → 隐藏 distar.58）：复活者帝国且未复活过 → distar.340（可开启 REANIMATE_LOST_AMOEBA，5000社会学、限时1080天 → distar.59“逝者复生”，失败则彻底死亡），否则变形虫死亡，若发现它的科学家仍在则 distar.57“变形虫之死”。

1. distar.50 "Lost Amoeba": the movement is a lost juvenile Space Amoeba, which starts following the science ship.
2. Adopt (non-homicidal empires): its fleet becomes ours; 360–420 days later distar.51 "Fully Fledged" names the adult (distar.55 and distar.56 offer more names), and after 100 years distar.304 "Centenarian".
3. Refuse: distar.52 90 days later, it leaves.
4. Dissect: DISSECTION_PROJECT (fleet power > 90, 30 days, 1800-day limit) → distar.53 dissection or distar.54 escape.
5. If this is the empire's first Space Amoeba encounter, adopting also opens the generic "Amoeboid Pacification" project (story.107), refusing opens "Space Amoeba Study" (story.105), and dissecting grants a hunting bonus.
6. If the adopted amoeba is disabled in battle (on_ship_disabled → hidden distar.58): a Reanimator empire whose amoeba has not been raised before gets distar.340 (REANIMATE_LOST_AMOEBA, 5000 society, 1080-day limit → distar.59 "Rise Again"; failure kills it for good); otherwise the amoeba dies and, if its discovering scientist lives, distar.57 "Death of an Amoeba".

## 分支与结局 Branches and outcomes

distar.50 三个选项互斥；53/54 互斥；死亡时 340 与 57 互斥（是否为复活者帝国）。命名事件 51/55/56 的“这些名字都不好”选项只是继续选名。

distar.50's three options are exclusive; 53/54 exclusive; on death 340 and 57 are exclusive (Reanimator or not). The "these are all terrible" options of 51/55/56 only offer more names.

## 条件与文明差异 Conditions and variants

distar.50 正文按是否已遇到过变形虫分两种；distar.51 对植物/真菌物种提供“绽放”代替“布玛猫”；story.105/107 是通用变形虫项目的结果，也出现在其他变形虫遭遇中。

distar.50 has two texts by prior amoeba encounters; distar.51 offers "Bloomer" instead of "Boomer" for plantoid/fungoid species; story.105/107 are results of the generic amoeba projects and also appear in other amoeba encounters.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:148-173; events/distant_stars_events_1.txt:1290 (distar.50); events/distant_stars_events_1.txt:1483 (distar.51); events/distant_stars_events_1.txt:1746/1864 (distar.55/56); events/distant_stars_events_1.txt:1979 (distar.52); common/special_projects/00_projects_distant_stars.txt:116 (DISSECTION_PROJECT); events/distant_stars_events_1.txt:2042/2116 (distar.53/54); events/distant_stars_events_1.txt:2330 (distar.304); common/special_projects/00_projects_2.txt:498/514 (AMOEBAS_PROJECT, AMOEBAS_PACIFICATION_PROJECT); events/story_events.txt:2380/2424 (story.105/107); common/on_actions/00_on_actions.txt:2046; events/distant_stars_events_1.txt:2180 (distar.58); events/distant_stars_events_1.txt:2214 (distar.340); common/special_projects/00_projects_distant_stars.txt:1559 (REANIMATE_LOST_AMOEBA); events/distant_stars_events_1.txt:2277 (distar.59); events/distant_stars_events_1.txt:2150 (distar.57)
已核对异常、distar.50–59、304、340、345、三个项目、两个通用项目及 on_ship_disabled。修正：草稿把变形虫之死（event-distar-58）作为独立故事；现以两条条件连接接在 distar.51（成年）之后。

Checked the anomaly, distar.50–59, 304, 340, 345, the three projects, the two generic amoeba projects and on_ship_disabled. Correction: the death of the amoeba (event-distar-58) was a separate story; it now follows distar.51 (adulthood) through two conditional links.
