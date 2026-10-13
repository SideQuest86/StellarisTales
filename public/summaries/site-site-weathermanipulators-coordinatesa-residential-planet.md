# 坐标A：殖民星球 / Coordinates A: Colonized Planet

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:124；events/precursor_events_cosmic_storms.txt:466；common/solar_system_initializers/cosmic_storm_initializers.txt:31；common/special_projects/03_projects_cosmic_storms.txt:47 · DLC：《宇宙风暴》Cosmic Storms（脚本文件 10_cosmic_storms_arc_sites） Cosmic Storms · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

三处“坐标”遗址（A 殖民星球、B 工业星球、C 荒芜星球）由星系初始化器 weathermanipulators_home_system 一次创建（common/solar_system_initializers/cosmic_storm_initializers.txt:31；该初始化器注明“由事件生成，不用于银河生成”）。前一步在另一个故事里：古老风暴庇护所（cstorms.130）的项目“解读坐标”（INETIAN_PROJECTS_01）成功后，cstorms.135 在地图上标出这个星系。

The three "Coordinates" sites (A colonised planet, B industrial planet, C barren planet) are created together by the system initializer weathermanipulators_home_system (common/solar_system_initializers/cosmic_storm_initializers.txt:31, which says it is spawned by event, not at galaxy generation). The preceding step is another story: after the ancient storm shelter (cstorms.130) project "Unscramble the Coordinates" (INETIAN_PROJECTS_01), cstorms.135 marks this system on the map.

## 剧情脉络 Story outline

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

## 分支与结局 Branches and outcomes

- 机械的用途 / The Meaning of the Machine：三个标志齐全后由 cstorms.175 启用的特别项目 / the special project enabled by cstorms.175 once all three flags are set
- 机械的用途 / The Meaning of the Machine：项目完成：选项 a 启动机器（工程学与物理学研究、首都获得12个月的驱风暴场、在系统生成一场天体风暴）；选项 b 不按按钮（合金600、工程学研究1000，并得到风暴操纵科技或物理学研究500）。无论哪个，30天后 cstorms.179 → 180 / project done: a activate the machine (engineering and physics research, a 12-month repelling field on the capital, a celestial storm is spawned); b do not push the button (alloys 600, engineering research 1000, plus the storm-manipulation tech or 500 physics research). Either way cstorms.179 → 180 follows after 30 days
- 残骸重发现 / Rediscovered Remnants：“重新发现的残骸”：重新分析数据，发现他们追踪的存在；创建遗址“平凡起源”（storm_formation） / reanalysed data lead to a signal; the site "Origins of the Pervading" (storm_formation) is created
- 不确定开端 / Uncertain Beginnings：风暴形成点：风暴很小，尚不足以解释；→ 项目“追踪贸易体”（INETIAN_PROJECTS_03）→ 隐藏事件 cstorms.185 选定一个邻近星系 → cstorms.186 创建遗址“末日前夕”（last_shelter） / the storm formed here but was far smaller than a normal one; → project "Tracing the Traders" (INETIAN_PROJECTS_03) → hidden cstorms.185 picks a nearby system → cstorms.186 creates "Before the Fall" (last_shelter)
- 狂妄自大 / Hubris：最后的庇护所里，一台崭新未用的装置与警告。获得遗珍“风暴操纵器”（r_weather_manipulator）、标志 weather_manipulator_found 与 completed_inetian_traders_precursor，并结束事件链 cs_inetian_chain / a new, unused device and a warning. Grants the relic r_weather_manipulator, the flags weather_manipulator_found and completed_inetian_traders_precursor, and ends the chain cs_inetian_chain
- 三处遗址使用专属事件池 cosmic_storm_precursor_random_events（资源贮藏点8040、隐蔽隧道8045、争论的考古学家8055、装备故障8070）。 / The three sites use the pool cosmic_storm_precursor_random_events (resource cache 8040, hidden passage 8045, bickering archaeologists 8055, equipment malfunction 8070).
- 项目“追踪贸易体”之后还有一个项目 INETIAN_PROJECTS_04“探究因内特贸易体的秘密”，属于另一个故事（project-inetian-projects-04）。 / After the last shelter, project INETIAN_PROJECTS_04 "Delve into the Secrets of the Inetian Traders" continues in another story (project-inetian-projects-04).

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 cosmic_storm_precursor_random_events。 / Failed rolls draw from this site's own pool cosmic_storm_precursor_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:124）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:124) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 原草稿把坐标B、C各自的遗址当作坐标A之下的独立入口，并把项目“机械的用途”挂在A的分支下；现标为并行三选三、由 cstorms.175 的三标志检验启用项目。
- The draft showed Coordinates B and C as unrelated entries and hung the project below A only; they are now marked as three parallel sites that all feed the three-flag check in cstorms.175.
- 不确定：三处遗址的出现时间：初始化器注释说“由事件生成”，触发事件在宇宙风暴先驱者的前序故事（cstorms.100 起）中，不属于本故事。
- Uncertain: When the system is spawned: the initializer comment says it is spawned by event; that event belongs to the earlier Inetian story (from cstorms.100), outside this one.
