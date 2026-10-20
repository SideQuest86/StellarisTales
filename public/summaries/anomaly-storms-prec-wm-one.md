# 因内特贸易体 / Inetian Traders

- 分类 Category：先驱者 Precursors
- DLC：宇宙风暴 Cosmic Storms（`01_precursor_civilizations_cosmic_storms.txt:1-8`）；远古遗物与典范 DLC 会改变部分奖励

## 如何开始 How it starts

本异常不会自然生成。银河生成时选中因内特贸易体先驱者后，玩家（非 AI、尚无先驱者开场）勘察带有该标记、尚未用作先驱者星系中的贫瘠或寒冷贫瘠行星时，`on_survey_planet` 的随机事件（权重25，“无事”100）可能触发隐藏事件 cstorms.100：生成本异常，并在30天后发出通用联络报告（另一枢纽故事）。研究成功即 cstorms.105。

The anomaly never spawns on its own. With the Inetian precursor in the galaxy, surveying a barren or cold barren planet in a flagged system can roll hidden event cstorms.100 (weight 25 against 100 for nothing) for a player empire without a precursor intro; it adds this anomaly and sends a generic contact report after 30 days. Success fires cstorms.105.

## 剧情脉络 Story outline

1. 105“远古庇护所”开启事件链“先驱者——因内特贸易体”并建立考古遗址。/ 105 starts the chain and creates the dig site.
2. 五个阶段（110–130）：双塔之下的庇护所、旧终端与语言、堆满商品的仓库——这个文明以贸易网络 INET 命名自己；最后找到能“操纵宇宙风暴”的装置的加密坐标。/ Five stages reveal a commodities warehouse of the "Inetian Traders" and scrambled coordinates of a storm-manipulating device.
3. 130 开启500点研究项目“解析坐标”；完成后生成新星系（初始化器 `weathermanipulators_home_system`，内含坐标A/B/C三处遗址），135“富饶星系”标出三个地点。/ The project spawns a system with three dig sites; 135 names them.

## 分支与结局 Branches and outcomes

- 120、125 有付费选项：花费能量换取额外线索或换取研究/矿物；它们不改变剧情走向。/ Paid options in 120 and 125 trade energy for clues or resources; they do not change the plot.
- 后续已并入本故事，见下方“后续”一节。/ The continuation is now part of this story; see the section below.

## 后续：坐标遗址与最后的庇护所 Continuation: Coordinates sites and the last shelter

（并入自 site-site-weathermanipulators-coordinatesa-residential-planet 与 project-inetian-projects-04。 / Merged from those two stories.）

因内特贸易体（Inetian Traders）留下三处坐标遗址，三个遗址各自三个阶段、顺序不限（并行）；每一处的最后一个阶段发出隐藏事件 cstorms.175，它只有在三个国家标志（pc_arcsite_A/B/C_completed）都已设置时才启用特别项目“机械的用途”。项目完成后激活扇区干扰抑制器，再追踪风暴的起点和“最后的庇护所”，得到遗珍“风暴操纵器”。

1. 宗教意图：坐标A（殖民星球）阶段一：被风暴摧毁的城市
2. 经济核心：阶段二：贸易中枢里有恒星系模型
3. 参考手册：阶段三：留存的用户手册；设置 pc_arcsite_A_completed 并触发 cstorms.175
4. 工业效率：坐标B（工业星球）阶段一：工厂区
5. 关键运输：阶段二：易挥发材料经传送带送往集散仓
6. 缺失一环：阶段三：板条箱里的机器部件；设置 pc_arcsite_B_completed 并触发 175
7. 无尽肆虐：坐标C（荒芜星球）阶段一：暴风雪下的灭绝层
8. 生命之根：阶段二：根状沟渠与干枯的生物遗骸
9. 往昔机械：阶段三：山顶的三台因内特机器；设置 pc_arcsite_C_completed 并触发 175

The Inetian Traders left three Coordinates sites. Each has three stages and the three sites can be dug in any order (in parallel); the last stage of each fires hidden cstorms.175, which enables the special project "The Meaning of the Machine" only once all three country flags (pc_arcsite_A/B/C_completed) are set. The project activates the Sectoral Disturbance Depressors; tracing the storm then leads to its birthplace and to the last shelter, where the relic "weather manipulator" waits.

1. Religious Intent: Coordinates A, stage 1: cities ravaged by storms
2. Economic Epicenter: stage 2: a model of the star system in the trade hub
3. Book of Reference: stage 3: user manuals; sets pc_arcsite_A_completed and fires cstorms.175
4. Industrial Efficiency: Coordinates B (industrial planet), stage 1: the factory zone
5. Conveying the Critical: stage 2: volatile materials conveyed to a depot
6. Missing Link: stage 3: a machine component in a crate; sets pc_arcsite_B_completed and fires 175
7. Endless and Relentless: Coordinates C (barren planet), stage 1: an extinction layer under blizzards
8. Roots of Life: stage 2: root-like trenches and desiccated remains
9. Machines of yore: stage 3: three Inetian machines on a plateau; sets pc_arcsite_C_completed and fires 175

- 机械的用途 / The Meaning of the Machine：三个标志齐全后由 cstorms.175 启用的特别项目 / the special project enabled by cstorms.175 once all three flags are set
- 机械的用途 / The Meaning of the Machine：项目完成：选项 a 启动机器（工程学与物理学研究、首都获得12个月的驱风暴场、在系统生成一场天体风暴）；选项 b 不按按钮（合金600、工程学研究1000，并得到风暴操纵科技或物理学研究500）。无论哪个，30天后 cstorms.179 → 180 / project done: a activate the machine (engineering and physics research, a 12-month repelling field on the capital, a celestial storm is spawned); b do not push the button (alloys 600, engineering research 1000, plus the storm-manipulation tech or 500 physics research). Either way cstorms.179 → 180 follows after 30 days
- 残骸重发现 / Rediscovered Remnants：“重新发现的残骸”：重新分析数据，发现他们追踪的存在；创建遗址“平凡起源”（storm_formation） / reanalysed data lead to a signal; the site "Origins of the Pervading" (storm_formation) is created
- 不确定开端 / Uncertain Beginnings：风暴形成点：风暴很小，尚不足以解释；→ 项目“追踪贸易体”（INETIAN_PROJECTS_03）→ 隐藏事件 cstorms.185 选定一个邻近星系 → cstorms.186 创建遗址“末日前夕”（last_shelter） / the storm formed here but was far smaller than a normal one; → project "Tracing the Traders" (INETIAN_PROJECTS_03) → hidden cstorms.185 picks a nearby system → cstorms.186 creates "Before the Fall" (last_shelter)
- 狂妄自大 / Hubris：最后的庇护所里，一台崭新未用的装置与警告。获得遗珍“风暴操纵器”（r_weather_manipulator）、标志 weather_manipulator_found 与 completed_inetian_traders_precursor，并结束事件链 cs_inetian_chain / a new, unused device and a warning. Grants the relic r_weather_manipulator, the flags weather_manipulator_found and completed_inetian_traders_precursor, and ends the chain cs_inetian_chain
- 三处遗址使用专属事件池 cosmic_storm_precursor_random_events（资源贮藏点8040、隐蔽隧道8045、争论的考古学家8055、装备故障8070）。 / The three sites use the pool cosmic_storm_precursor_random_events (resource cache 8040, hidden passage 8045, bickering archaeologists 8055, equipment malfunction 8070).
- 项目“追踪贸易体”之后还有一个项目 INETIAN_PROJECTS_04“探究因内特贸易体的秘密”，属于另一个故事（project-inetian-projects-04）。 / After the last shelter, project INETIAN_PROJECTS_04 "Delve into the Secrets of the Inetian Traders" continues in another story (project-inetian-projects-04).

### 因内特秘密 The Inetian secrets (INETIAN_PROJECTS_04)

由神器行动 artifact_inetian_research 启用（事件链 cs_inetian_chain）：研究伊涅提安商人的神器后可以启动本项目。

Enabled by the artifact action artifact_inetian_research (event chain cs_inetian_chain): researching the Inetian Traders' artifact lets you start this project.

项目 INETIAN_PROJECTS_04“探究伊涅提安商人的秘密”（180天；科学船+科学家，技能>1）→ cstorms.195：获得 tech_storm_manipulation 与 tech_advanced_storm_manipulation（已有则改为每月工程研究）、修正“伊涅提安商人的秘密”（蜂巢/机械版本不同）、领袖获得统御专精特质（已有则+200经验）、设置标志 unlocked_hyperlane_detailer。cstorms.195 只触发一次（fire_only_once）。

Project INETIAN_PROJECTS_04 "Delve into the Secrets of the Inetian Traders" (180 days; science ship and scientist, skill > 1) → cstorms.195: gives tech_storm_manipulation and tech_advanced_storm_manipulation (monthly engineering research if both are known), the modifier 'Secrets of the Inetian Traders' (a different one for hive/machine empires), the leader the statecraft expertise trait (or +200 experience) and sets flag unlocked_hyperlane_detailer. cstorms.195 can fire only once (fire_only_once).

## 条件与文明差异 Conditions and variants

- 120 的科技奖励按是否拥有典范 DLC、是否格式塔选择不同科技。/ 120's tech reward depends on Paragon DLC and gestalt status.
- 遗址掷骰失败会触发宇宙风暴先驱者通用意外（ancrel.8040/8045/8055/8070，共享枢纽故事）。/ Failed rolls fire shared dig incidents.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（r2-mixed）· 状态：已审阅 Reviewed（后续以外链连到坐标A故事）
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:10-27` · `events/precursor_events_cosmic_storms.txt:18-462` · `common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:72-122` · `common/special_projects/03_projects_cosmic_storms.txt:10-44` · `common/solar_system_initializers/cosmic_storm_initializers.txt:3-60` · `common/on_actions/00_on_actions.txt:1180-1192`
- 编辑备注 Editor note：审阅改定；编译默认为深空异闻（原位于分类行）
- 已核对 Checked：异常定义、cstorms.100–135、遗址与项目定义、星系初始化器、on_survey_planet 权重。/ All listed definitions.
- 本轮更正 Corrections：分类改为先驱者；在 135 处注明后续故事。/ Category set to precursors; continuation noted at 135.
- 补审 Completion (2026-10-13)：135 现通过带证据的外链（03_projects_cosmic_storms.txt:25-37、cosmic_storm_initializers.txt:3-60）连到 C2 的坐标A故事，不吸收其根；“因内特秘密”（INETIAN_PROJECTS_04）是独立故事。仍有的不确定：三个故事是否应合并为一个家族，由 C2 所有者决定。/ 135 now links externally (with evidence) to the C2 Coordinates A story without absorbing it; the secrets research is a separate story. Open: whether to merge the three is the C2 owner's call.
- 覆盖 Coverage：本故事11个文档全部审阅。/ All 11 docs of this story reviewed.
- r3-integrate（2026-10-13）：合并了 site-site-weathermanipulators-coordinatesa-residential-planet 与 project-inetian-projects-04 为一个家族（同一先驱者的开场、遗址、神器行动三部分，依据：cstorms.135 → 初始化器生成遗址；cstorms.193 设置 completed_inetian_traders_precursor，artifact_actions.txt:631 要求该标志）。
  r3-integrate (2026-10-13): Merged site-site-weathermanipulators-coordinatesa-residential-planet and project-inetian-projects-04 into one family (opening, sites and artifact action of the same precursor: cstorms.135 -> initializer spawns the sites; cstorms.193 sets completed_inetian_traders_precursor, required by artifact_actions.txt:631).
