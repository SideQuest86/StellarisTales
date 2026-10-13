# 原始机器人 / Rudimentary Robots

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:1651-1738 (primitive_robot_system); common/anomalies/95_anomaly_categories_distant_stars.txt:82-96; events/distant_stars_events_1.txt:465-497 (distar.25); events/distant_stars_events_1.txt:499-1167 (distar.2599, 26-37); common/special_projects/00_projects_distant_stars.txt:35-83 (PRIMITIVE_ROBOT_PROJECT, RETROVIRUS_PROJECT); common/on_actions/00_on_actions.txt:835, 865, 1302

## 如何开始 How it starts

《遥远繁星》专属星系 primitive_robot_system（每局至多一个）在一颗凉爽湿润的宜居星球上放置“对称结构”异常（1级），并标记 primitive_robot_planet。科研船调查该异常后得到 distar.25；而无论异常是否已调查，只要这颗星球被殖民，殖民回调都会开启后续机器人与病毒故事。

The Distant Stars system primitive_robot_system (at most one per game) places the level-1 anomaly "Symmetrical Structures" on a cool, moist habitable planet flagged primitive_robot_planet. Investigating it gives distar.25; colonising the planet starts the robot and virus chain whether or not the anomaly was investigated.

## 剧情脉络 Story outline

1. 异常结果 distar.25：发现早期太空时代文明的废墟和仍在维修设施的原始机器人；星球获得 primitive_robots 修正，30天后有通用接触报告（story.5，不属于本故事）。
2. 殖民后：隐藏事件 distar.2599 生成“原始机器人”物种的4个人口组；若殖民者是普通帝国且尚未治愈狂怒病毒，1天后 distar.26。
3. distar.26 的选项决定机器人去留：投入工作（无人工智能禁令且非格式塔）或机械帝国“整合”会在90–100天后引出 distar.27 研究项目；拆解则获得100矿物并移除机器人。无论如何选择，distar.26 都会排定5–7年（1800+720天）后的 distar.31。
4. 研究线：PRIMITIVE_ROBOT_PROJECT（30天，科研船+科学家）完成时，机械帝国得到 distar.28，其他帝国得到 distar.29，并可在 distar.30 中逐条阅读损坏的日志（对话式选项）。
5. 病毒线：distar.31 中数个有机人口出现古怪行为，选项开启 RETROVIRUS_PROJECT（1000社会学），并排定60天后的 distar.32（只要仍有未感染的有机人口且未治愈，每60天重复）和120天后的 distar.33。项目进度50%时 distar.35（研究员遇害），完成时 distar.36（疫苗）。
6. 若120天时仍未治愈，distar.33 生成“暴怒殖民者”阵营和三支军队，随后的地面战斗以 distar.34 或 distar.37 收尾。

1. Anomaly result distar.25: ruins of an early space-age civilisation and the rudimentary robots that still maintain it; the planet gets the primitive_robots modifier and a generic contact report (story.5, not part of this story) follows after 30 days.
2. On colonisation the hidden distar.2599 creates four pop groups of the "Primitive Robot" species and, for a default empire that has not cured the rage virus, fires distar.26 one day later.
3. distar.26 decides the robots' fate: putting them to work (no AI ban, not gestalt) or a machine empire's "integrate" leads 90–100 days later to distar.27 and its project; scrapping gives 100 minerals and removes them. Whatever is chosen, distar.26 schedules distar.31 for 1800+720 days later.
4. Research thread: PRIMITIVE_ROBOT_PROJECT (30 days, science ship + scientist) yields distar.28 for machine empires or distar.29 otherwise; distar.29 opens the damaged logs of distar.30 (dialogue-only options).
5. Virus thread: in distar.31 several organic pops turn erratic; the option starts RETROVIRUS_PROJECT (1000 society) and schedules distar.32 after 60 days (repeats every 60 days while uninfected organic pops remain and no cure exists) and distar.33 after 120 days. At 50% progress distar.35 kills researchers; on completion distar.36 delivers the vaccine.
6. If no cure exists after 120 days, distar.33 creates the "Enraged Colonists" faction with three armies; the ground fight ends in distar.34 or distar.37.

## 分支与结局 Branches and outcomes

- distar.28 与 distar.29 互斥（机械/非机械帝国）。
- 疫苗先于 distar.33 完成则不会发生暴乱；否则地面战斗：守军获胜 → distar.34；星球失守后再夺回 → distar.37（两者同名“镇压地面暴力”，文本依是否开始过病毒项目而不同）。
- 拆解机器人或禁止人工智能时没有机器人研究线，但病毒线仍会在5–7年后出现。

- distar.28 and distar.29 are exclusive (machine / non-machine empire).
- If the vaccine is finished before distar.33, no violence occurs; otherwise ground combat: defenders win → distar.34; planet lost and retaken → distar.37 (both titled "Planetside Violence Suppressed", text varies with whether the virus project was started).
- Scrapping the robots or an AI ban skips the robot research thread, but the virus thread still arrives 5–7 years later.

## 条件与文明差异 Conditions and variants

distar.26.a 需无人工智能禁令且非格式塔；distar.26.c 仅限禁止人工智能；distar.26.mach 仅限机械帝国。distar.33 的军队使用随机一个受感染物种。distar.36 的科技奖励按已拥有科技依次择一（基因图谱 → 边疆卫生 → 边疆医院 → 活力增强剂 → 领袖寿命，否则社会学研究）。

distar.26.a needs no AI ban and a non-gestalt empire; distar.26.c only with outlawed AI; distar.26.mach only for machine empires. distar.33's armies use a random infected species. distar.36 grants the first technology not yet owned in the chain genome mapping → frontier health → frontier hospital → vitality boosters → leader lifespan, else society research.

## 审阅记录 Review notes

已核对星系初始化、异常定义、distar.25–37、两个项目和三个 on_action 回调。修正：编译草稿把异常（2篇）与殖民链（12篇）及 distar.34/37 拆成四个独立故事；现合并为一个以异常为根的故事，并用审阅连接表示“殖民后”和两种战斗结果。注意：殖民链不要求先调查异常，连接只表示自然的游戏顺序。distar.34/37 的 on_action 作用域按 00_on_actions.txt 注释理解。

Checked the system initializer, anomaly definition, distar.25–37, both projects and the three on_action callbacks. Correction: the draft split the anomaly (2 docs), the colony chain (12 docs) and distar.34/37 into four stories; they are now one story rooted at the anomaly, with reviewed links for "after colonisation" and the two combat results. The colony chain does not require the anomaly to be investigated; the link expresses the natural play order. Scopes of distar.34/37 follow the comments in 00_on_actions.txt.
