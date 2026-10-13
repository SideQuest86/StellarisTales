# 考古遗址：发掘意外 / Archaeological Sites: excavation incidents

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：events/ancient_relics_random_site_events.txt:15–1153、1584；common/scripted_effects/archaeology_event_effects.txt:59–112、332–504；events/ancient_relics_arcsite_events_1.txt:3612、4548、6727 · DLC：考古遗址机制属《远古遗物》Ancient Relics（稀有文物奖励需该DLC）· 审阅 Reviewed 2026-10-12

> 说明（审阅注释）：游戏没有为这组事件命名，标题借用界面原文“考古遗址 / Archaeological Sites”。这些事件不是任何一处遗址的剧情章节，而是所有使用通用事件池的遗址共享的随机插曲。

## 如何开始 How it starts

每个考古遗址阶段由科学家掷骰推进。若一次结果得分≤5（不得线索）且当前阶段已有线索，则有10/130的机会从遗址的随机事件池抽一个事件（archaeology_event_effects.txt:87–105）。大多数遗址使用通用池 all_random_events（332–439）；少数遗址有专属池（如海洋遗址、轨道遗址、部分DLC遗址），在相应遗址导读中说明。

Each dig stage advances by the scientist's rolls. When a roll scores 5 or less (no clue) and the stage already has clues, there is a 10/130 chance to draw one incident from the site's pool (archaeology_event_effects.txt:87–105). Most sites use the generic pool all_random_events (332–439); a few have their own pools (ocean, orbital and some DLC sites), noted in their guides.

## 剧情脉络 Story outline

事件之间没有顺序，每次只出现一个，出现时暂时锁定遗址进度：
- 陷阱与险情（六组，每组按 5/25/25/25 抽一种结果）：激光网、哨戒炮、碾压机器人、哨兵机器人、敌对野生动物（仅宜居星球）、不稳定的遗迹。结果分别是科学家与队员身亡（-2线索，科学家死亡）、队员身亡（-1）、化险为夷（+3）、花100能量排除障碍（+3）或绕路（-2）。
- 收获：资源贮藏点（随机一种资源）、隐蔽隧道（+3线索）、迷途的探险队（文物）、藏宝室（800–1800能量）、稀有文物（需远古遗物）、远古记录（三类研究之一）。
- 挫折：争论的考古学家（-3）、传播疾病（-3，非机械帝国）、装备故障（-3；科学家有“敲打维修”特质时可“踢一脚”，各半机会+1或-4）、无影无踪（权重2，科学家失踪）、令人不安的景象（-2，非格式塔；对药物滥用者会移除该特质）、火灾（每帝国一次，非格式塔且使用食物：500食物或-5线索）。
- 专属事件：甲烷爆炸（石中低语）与垃圾山大滑坡（誊录仪）在各自遗址权重20，在其他遗址只要尚未触发过也可能出现。
- 轨道与飞船类遗址的池（space_station_random_events、site_spaceship_random_events）还含：爆炸性减压（四种结果，同样按 5/25/25/25，机械领袖不抽8200、机械所有者种族不抽8201）和系统锁定8215（-3线索；有“敲打维修”特质的领袖可“踢一脚”，各半机会+1或-4）；稀有文物8210也在此池中。

Incidents are unordered; only one appears at a time and it pauses the site:
- Traps and hazards (six sets, each drawn 5/25/25/25): laser grid, sentry guns, crusher-droid, sentinel droids, hostile wildlife (habitable worlds only), unstable ruins. Outcomes: scientist and team killed (-2 clues, scientist dies), team killed (-1), averted (+3), pay 100 energy to clear it (+3) or detour (-2).
- Gains: resource cache (one random resource), hidden passage (+3), lost expedition (artifacts), treasure chamber (800–1800 energy), minor artifacts (Ancient Relics), ancient records (one research field).
- Setbacks: bickering archaeologists (-3), spreading illness (-3, non-machine), equipment malfunction (-3; a Percussive Maintainer may "kick it" for +1 or -4 at even odds), without a trace (weight 2, scientist lost), disturbing vision (-2, non-gestalt; removes Substance Abuser), fire (once per empire, non-gestalt food users: 500 food or -5 clues).
- Specials: Methane Gas Explosion (Whispers in the Stone) and The Great Junkslide (Rubricator) have weight 20 at their own sites and can also appear elsewhere until they have fired once.
- The orbital and spaceship pools (space_station_random_events, site_spaceship_random_events) also hold explosive decompression (four results at 5/25/25/25 again; no 8200 for a robotic leader, no 8201 for a robotic owner species) and system lockout 8215 (-3 clues; a Percussive Maintainer may "kick it" for +1 or -4 at even odds); the minor-artifact find 8210 is in the same pools.

## 分支与结局 Branches and outcomes

- 每组陷阱的四个结果互斥；“付费通过”结果本身还有两个选项。
- 线索增减作用于当前阶段，不改变遗址的阶段顺序。

- The four results of each trap set are exclusive; the pay-to-pass result itself offers two options.
- Clue changes apply to the current stage and never change a site's stage order.

## 条件与文明差异 Conditions and variants

- 文本中“考古学家”按帝国类型使用不同称谓（GetArchaeologistPlural）；8080 有两种等效正文。
- 事件条件见上；机械帝国不会出现传播疾病，格式塔不会出现令人不安的景象与火灾。

- "Archaeologists" are named per empire type (GetArchaeologistPlural); 8080 has two equivalent texts.
- Conditions as above: machines never get spreading illness; gestalts never get disturbing vision or fire.

## 审阅记录 Review notes

- 已核对：standard_archaeological_site_on_roll_failed（59–112）、all_random_events 与六个子池、space_station_random_events；ancient_relics_random_site_events.txt 中 8000–8110、8210、13030 的脚本；4006、4021、4078 的脚本与一次性标志；中英文正文已读。
- 结构修正：原草稿把每个意外事件编成一个孤立故事（event-ancrel-8000 等），现合并为一个故事族，按陷阱组标为互斥，整体标为无序事件池；遗址故事不再把它们当作章节。
- 2026-10-13 补充：轨道事件池的 8200–8203、8215 现并入本故事（此前在三处轨道遗址故事里各自出现）；真菌僵尸 8300–8315 与面具事件 15006–15008 属各自遗址的专属池，留在对应遗址故事中。

- Checked: the roll-failure effect, all_random_events and its six sub-pools, space_station_random_events; scripts of 8000–8110, 8210, 13030; 4006, 4021, 4078 and their once-only flags; both languages read.
- Structural fix: the draft made each incident a separate one-card story (event-ancrel-8000 etc.); they are now one curated family with each trap set marked exclusive and the whole marked as an unordered pool; site stories no longer treat them as chapters.
- Added 2026-10-13: the orbital-pool events 8200-8203 and 8215 are now part of this story (before, they appeared separately inside three orbital site stories); fungal zombies 8300-8315 and the jungle failure events 15006-15008 belong to their sites' own pools and stay in those site stories.
