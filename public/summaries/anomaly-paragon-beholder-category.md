# 峰值读数 / Spiky Readings

- 分类 Category：深空异闻 Exploration · DLC：Galactic Paragons（has_paragon_dlc）

## 如何开始 How it starts

拥有 Galactic Paragons 且所有者不是集体意识帝国时，带有 pre_sapient_planet 标志的星球可能生成（2级，权重3，全局一次 max_once_global）。生成时 on_spawn 保存该星球的前智慧物种为 beholder_presapients，并给其未开化人口添加灵能特质。

With Galactic Paragons and an owner that is not a gestalt, a planet flagged pre_sapient_planet can spawn it (level 2, weight 3, once globally via max_once_global). on_spawn saves the planet's pre-sapient species as beholder_presapients and gives its non-sapient pops a psionic trait.

## 剧情脉络 Story outline

1. paragon.3“峰值读数”：选项a记录该星球为 beholder_planet，设置国家标志 beholder_chain_owner，20-40天后 paragon.4；选项b放弃。
2. paragon.4“低语金字塔”：给星球添加 the_beholder_presapients_protected 修正，四个选项取决于国家：a 友好接触（非军国主义、非排外）→ 项目 BEFRIENDING_BEHOLDER_PRESAPIENTS“建立信任”（1000社会，科学船+技能1）→ paragon.5“不言而信”（+2000社会研究）→ 20-40天后 paragon.25；b 强力研究（非灵性者 60% / 灵性者 80% 成功 → paragon.10“伪神”，否则 paragon.11“伪神”→ paragon.15“抵抗瓦解”）；c 武力压制（非和平主义且非亲外星）→ paragon.15；d 放弃（清除链）。paragon.10 / paragon.15 之后启用项目 WHISPER_TEMPLE_STUDY“研究低语的巨石”（500社会）→ paragon.20“探索低语金字塔”→ 20-40天后 paragon.25。
3. paragon.25“低语呢喃”→ paragon.26“低语呢喃”：启用项目 WHISPER_TEMPLE_ENERGY“低语的巨石：能量”（1000工程，科学船+技能2）→ paragon.30“凝望者”：a 支付1200能量 → 20-40天后 paragon.1；b 按能量收入给 the_beholder_energy_big/medium/small 修正，并分别在360/720/1440天后触发 paragon.1；c 放弃。
4. paragon.1“飞船”：可招募传奇领袖“观察者”（心灵感应的指挥官，带“低语之殿”舰船），或遣散；另有两个对话选项。

1. paragon.3 "Spiky Readings": option a records the planet as beholder_planet, sets the country flag beholder_chain_owner and fires paragon.4 20-40 days later; option b walks away.
2. paragon.4 "The Murmuring Monolith": adds the modifier the_beholder_presapients_protected to the planet; four options depending on the country: a friendly approach (non-militarist, non-xenophobe) → project BEFRIENDING_BEHOLDER_PRESAPIENTS "Building Trust" (1000 society, science ship, skill 1) → paragon.5 "Trust Within Sight" (+2000 society research) → paragon.25 20-40 days later; b forceful study (60% for non-spiritualists / 80% for spiritualists success → paragon.10 "False Gods", otherwise paragon.11 "False Gods" → paragon.15 "Resistance Discouraged"); c suppress by force (non-pacifist and non-xenophile) → paragon.15; d leave (ends the chain). After paragon.10 / paragon.15 the project WHISPER_TEMPLE_STUDY "Study the Murmuring Monolith" (500 society) is enabled → paragon.20 "Exploring the Murmuring Monolith" → paragon.25 20-40 days later.
3. paragon.25 "The Murmuring" → paragon.26 "The Murmuring": enables project WHISPER_TEMPLE_ENERGY "Murmuring Monolith: Energy" (1000 engineering, science ship, skill 2) → paragon.30 "The Beholder": a pay 1200 energy → paragon.1 20-40 days later; b take a the_beholder_energy_big/medium/small modifier depending on energy income and get paragon.1 after 360/720/1440 days; c abandon.
4. paragon.1 "A Ship": recruit the legendary leader "The Beholder" (a psionic commander with the "Temple of Whispers" ship) or dismiss him; two dialogue options.

## 分支与结局 Branches and outcomes

paragon.4 的四个选项由国家性格决定（互斥）；b 的成败是 60/40（灵性者 80/20）；之后三条路线（友好/研究/压制）汇合到 paragon.25。paragon.30 的三个选项互斥，决定 paragon.1 出现的时间。若该星球易主，隐藏事件 paragon.100–102 会移除受保护修正并终止链。

paragon.4's four options are decided by the country's traits (alternatives); b succeeds 60/40 (80/20 for spiritualists); the three routes (friendly / study / suppress) then converge on paragon.25. paragon.30's three options are alternatives and decide when paragon.1 appears. If the planet changes hands, the hidden events paragon.100-102 remove the protection modifier and end the chain.

## 条件与文明差异 Conditions and variants

paragon.4 各选项按军国主义、排外、灵性、和平主义、亲外星限制；paragon.30 选项a需要1200能量，选项b按能量收入分三档。

paragon.4's options are gated by militarist, xenophobe, spiritualist, pacifist and xenophile; paragon.30's option a needs 1200 energy and option b splits into three tiers by energy income.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/100_anomaly_categories_paragon.txt:6 (paragon_beholder_category); events/paragon_events.txt:103 (paragon.3); events/paragon_events.txt:135 (paragon.4); events/paragon_events.txt:226 (paragon.5); events/paragon_events.txt:255 (paragon.10); events/paragon_events.txt:283 (paragon.11); events/paragon_events.txt:307 (paragon.15); events/paragon_events.txt:336 (paragon.20); events/paragon_events.txt:360 (paragon.25); events/paragon_events.txt:383 (paragon.26); events/paragon_events.txt:409 (paragon.30); events/paragon_events.txt:506 (paragon.1); common/special_projects/01_projects_paragon.txt (BEFRIENDING_BEHOLDER_PRESAPIENTS, WHISPER_TEMPLE_STUDY, WHISPER_TEMPLE_ENERGY); events/paragon_events.txt:1-100 (paragon.100-102)
已核对异常定义、paragon.1–30、100–102 与三个项目；编译树（含 60/40 与 80/20 的两组随机）与源文件一致，无需改动。

Checked the anomaly definition, paragon.1-30, 100-102 and the three projects; the compiled tree (including the two random groups 60/40 and 80/20) matches the source, no change needed.
