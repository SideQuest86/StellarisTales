# 远古机器人星球 / Ancient Robot World

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/00_base_game_arc_sites.txt:194；events/ancient_relics_arcsite_events_2.txt:8641；common/solar_system_initializers/special_system_initializers.txt:2024 · DLC：《远古遗物》Ancient Relics（事件在 ancrel 文件；遗址定义在基础游戏文件） Ancient Relics events; site definition in the base-game file · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

该星系在新游戏开始时有可能生成：隐藏事件 ancrel.12050（on_game_start）以 2:1:1 抽签——什么都不发生 / 向银河边缘（50–100距离）生成 surveillance_supercomputer_system（经 ancrel.12055）/ 若有《初次接触》且难度与AI设置允许则改为生成“被选中者”星系（fircon.3500，另一个故事）。系统里有“永恒守望者”势力的三支守卫舰队，遗址在行星“观测终端”上由初始化器创建（common/solar_system_initializers/special_system_initializers.txt:2024）。

The system may be spawned when a game starts: hidden ancrel.12050 (on_game_start) draws 2 : 1 : 1 between nothing, spawning surveillance_supercomputer_system at the galactic rim (distance 50-100, via ancrel.12055), and — with First Contact and permitting difficulty/AI settings — spawning the Chosen system instead (fircon.3500, another story). The system holds the faction "Eternal Watchers" with three guard fleets; the site on the planet "Observation Terminal" is created by the initializer (common/solar_system_initializers/special_system_initializers.txt:2024).

## 剧情脉络 Story outline

一颗从未有过生命、被数十亿机械无人机填满的行星，其周围一万多件圆筒状设备都指向银河各处——这是十二亿年前外来者留下的“监视银河”的观测站。先要在系统里面对“永恒守望者”的守卫舰队；挖掘的最后你可以黑进它，决定如何利用这套监控网络。

1. [From.GetName]恒星系：首次进入系统且守望者舰队在场：“战斗警报！”
2. [fromfrom.System.GetName]大捷：击毁守军后：“…大捷”，系统里几乎没有固体物质了
3. 攒动的人工生命：“观测终端”：行星从未有过生命，被机械无人机和整齐的人工结构覆盖
4. 无人机调查：无人机无视一切接触，甚至会撞伤研究者；转而分析无人机的控制程序
5. 恒星系探索：系统里一万多件圆筒设备在向银河各处发射信号
6. 钓鱼执法：在无人机附近植入间谍程序，系统庞大却毫无自卫

A lifeless planet crowded with billions of drones, ringed by over ten thousand cylinders pointed at the galaxy — an observation post left 1.2 billion years ago to spy on it. First its guard fleets must be faced; the dig ends with a hacked mainframe and a choice of how to use the surveillance network.

1. The [From.GetName] System: entering the system for the first time with the Watchers' fleets present: Battlestations!
2. Victory in [fromfrom.System.GetName]: after the defenders fall: Victory; almost no solid matter is left in the system
3. Teeming with Artificial Life: Observation Terminal: a lifeless planet covered in drones and orderly artificial structures
4. Investigating the Drones: drones ignore all contact and even injure researchers; the control programs become the focus
5. Systemic Exploration: over ten thousand cylinders beam signals to points across the galaxy
6. Time to Phish: spyware is implanted in a drone terminal; the system is vast and undefended

## 分支与结局 Branches and outcomes

- 超级监察计算机 / The Surveillance Supercomputer：（Ultima Vigilis）：十二亿年前来客建立的观测站。五个选项：A（机器帝国）整合整颗星球为机械星球（80个人口、大型首都）；B 任其运转，监听其数据（在系统里恢复一个间谍球体巨型结构）；C 把无人机分发到己方殖民地（机械或机器人人口80）；D（唯心主义者）把它当成巨型合金矿（合金资源点）；E（非唯心主义者）把网络改造成一个机器智能附庸国“重新利用的监视网络”。A、C、D、E 各有50%概率在30天后触发 ancrel.12095 / (Ultima Vigilis): an observation post set up 1.2 billion years ago. Five options: A (machine empires) integrate the planet as a machine world (80 pops, a major capital); B let it run and siphon its readings (restores a spy-orb megastructure); C distribute drones to our colonies (80 machine or robot pops); D (spiritualists) treat it as an enormous alloy mine (an alloy deposit); E (non-spiritualists) turn the network into a machine-intelligence subject, "Repurposed Surveillance Network". A, C, D and E each have a 50% chance to fire ancrel.12095 thirty days later
- 信号传输接入 / Incoming Transmission：“你们这些粗心的……”：被你切断信号的幕后观察者宣布要召来“害虫防治”。设置全局标志 endgame_crisis_early_start，所有其他玩家国家收到 ancrel.12100 / "You inconsiderate-": the watchers whose feed you cut announce "pest control". The global flag endgame_crisis_early_start is set and every other player-type empire receives ancrel.12100
- 信号传输接入 / Incoming Transmission：其他帝国收到的同一条警告 / the same warning received by every other empire
- 选项 B 不会触发危机；其他选项（A、C、D、E）的50%概率意味着约半数游戏会因此提前开启终局危机。 / Option B never triggers the crisis; for A, C, D and E the 50% roll means about half of such playthroughs start the endgame crisis early.

## 条件与文明差异 Conditions and variants

- 12090 的选项按帝国类型显示：A 仅机器帝国，C 有机器版与“允许机器人”版，D 仅唯心主义者，E 仅非唯心主义者。 / The options of 12090 are shown by empire: A for machine empires only, C in a machine and a "robots allowed" version, D for spiritualists only, E for non-spiritualists only.
- 本遗址的 on_roll_failed 使用 no_events：掷骰失败不触发随机意外。 / The site uses no_events: a failed roll triggers no incident.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/00_base_game_arc_sites.txt:194）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/00_base_game_arc_sites.txt:194) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 原先 12060、12065 是两个孤立的单事件故事；它们是进入该系统前后的战斗通知，现并入本故事作为开端。
- ancrel.12060 and 12065 were separate one-card stories; they are the battle notices before and after the dig and now open this story.
- 开局生成方式（ancrel.12050/12055）不在草稿中，现在作为说明补充。
- The game-start spawn (ancrel.12050/12055) was missing from the draft and is now documented.
