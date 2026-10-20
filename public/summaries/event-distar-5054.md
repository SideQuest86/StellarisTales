# 神秘容器 / The Enigmatic Cache

- 分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

拥有《遥远繁星》并存在玩家国家时，隐藏事件 distar.2050 在一座星门/L-星门所在的星系生成“神秘容器”国家与舰队（BALDOR 号，enigmatic_cache 国家类型），把它放在离玩家最近的、尚未被扫描的殖民地轨道上。容器到达行星时 on_fleet_auto_move_arrival 触发 distar.5054（给行星添加 enigmatic_cache_in_orbit 修正）。第一次到达国家殖民地时发出 distar.5057“发现外星个体”。

With Distant Stars and at least one human player, the hidden event distar.2050 spawns the "Enigmatic Cache" country and fleet (BALDOR, country type enigmatic_cache) in a system with a gateway or L-Gate and places it in orbit of the nearest not-yet-scanned colony of a player country. When it reaches a planet, on_fleet_auto_move_arrival fires distar.5054 (adds the enigmatic_cache_in_orbit modifier). The first time it reaches a colony of your country, distar.5057 "Alien Entity Identified" is shown.

## 剧情脉络 Story outline

1. distar.5057“发现外星个体”：选项a启用项目 ENIGMATIC_CACHE_PROJECT“神秘来客”（费用2500工程科技）；选项b获得50影响力。完成项目 → distar.5058“神秘容器”：每月工程研究加成，并有机会产生L-星团线索。排外帝国在轨期间其人口受 enigmatic_cache_in_orbit_phobe 修正。
2. 容器依次扫描各国殖民地：distar.5052 循环选择下一颗未扫描的殖民地（仅考虑未交战、不敌对的国家），3600天内持续；离开时 distar.5059“神秘容器离开了”通知该国（每国一次）。被击毁或失能时（distar.5053）会在别处重新生成；找不到位置则500天后再试（distar.5055）。
3. 扫描足够后，distar.5060（隐藏月度检查）选定一个玩家国家，容器飞向其首都 → distar.5062“神秘容器回归”：a进入 distar.5064“谜之通信”（四段对话 a-d；e 启用项目 ENIGMATIC_UPLIFTING“神秘飞升”，物种会得到其智力提升，需要科学船+科学家，720天，无法对荒野帝国使用；f 拒绝），b不理会。
4. 项目开始时：distar.5066 掷骰（50%，聪明或学习快的物种除外）决定“神秘疲劳”，60-80天后 distar.5067“谜之梦境”，再过70-90天 distar.5071“警告”：容器损坏（enigmatic_cache_broken）、部分人口陷入沉睡。a进入 distar.5072“信息传输”（对话；d中止，e启用修复），b直接启用项目 ENIGMATIC_REPAIR“修复 BALDOR XXXXIII”（180天，限时360天，需要建造舰/方舟舰队）→ distar.5073“修理完成”，c中止 → distar.5069“提升已终止”，d不处理。
5. 720天后项目完成，三种结果互斥（见下）：distar.5068“无知是福”、distar.5063“全新的我们”、distar.5074“略受提升”。
6. 意外：他国击毁容器（5053）→ 正在提升的国家收到 distar.5070“飞升已终止”；提升国首都被攻陷且容器在轨 → distar.5077 中止项目，10天后 distar.5078“神秘提升已终止”。

1. distar.5057 "Alien Entity Identified": option a enables project ENIGMATIC_CACHE_PROJECT "An Enigmatic Guest" (cost 2500, engineering); option b takes 50 influence. Finishing the project → distar.5058 "The Enigmatic Cache": monthly engineering research and a chance of an L-Cluster clue. Xenophobe empires' pops get the enigmatic_cache_in_orbit_phobe modifier while it is in orbit.
2. The cache scans colonies one after another: distar.5052 loops to pick the next unscanned colony (only non-hostile countries at peace), for up to 3600 days; when it leaves, distar.5059 "The Enigmatic Cache Departs" tells the country once. If it is destroyed or disabled (distar.5053) it respawns elsewhere; if no place is found it retries after 500 days (distar.5055).
3. After enough scanning, distar.5060 (hidden monthly check) chooses a player country and the cache flies to its capital → distar.5062 "The Enigmatic Cache Returns": a opens distar.5064 "Enigmatic Transmission" (four dialogue options a-d; e starts the project ENIGMATIC_UPLIFTING "Enigmatic Ascension", giving the species an intelligence uplift, science ship and scientist, 720 days, not available to wilderness empires; f declines), b ignores it.
4. When the project starts: distar.5066 rolls (50%, except for intelligent or quick-learning species) whether the species suffers "enigmatic fatigue"; 60-80 days later distar.5067 "Enigmatic Dreams", and 70-90 days after that distar.5071 "Alert": the cache breaks (enigmatic_cache_broken) and some pops fall into slumber. a opens distar.5072 "Transmission" (dialogue; d aborts, e starts the repair), b starts project ENIGMATIC_REPAIR "Repairing BALDOR XXXXIII" directly (180 days, 360-day limit, needs a constructor ship or ark-ship fleet) → distar.5073 "Repair Complete", c aborts → distar.5069 "Uplifting Aborted", d does nothing.
5. After 720 days the project completes with one of three exclusive results (below): distar.5068 "Ignorance is Bliss", distar.5063 "The New Us" or distar.5074 "Somewhat Uplifted".
6. Accidents: if someone else disables the cache (5053), the uplifting country gets distar.5070 "Ascension Terminated"; if the uplifting country's capital is invaded while the cache is in orbit, distar.5077 aborts the project and distar.5078 "Enigmatic Ascension Terminated" follows 10 days later.

## 分支与结局 Branches and outcomes

起始选项a/b二选一；distar.5062 的a/b二选一；项目结果 5068/5063/5074 互斥，概率取决于容器是否损坏（见互斥组说明）；修复与中止是对警报的不同回应。

The opening options a/b are alternatives; so are 5062's a/b; the project results 5068/5063/5074 are exclusive with odds depending on whether the cache broke (see the group note); repair and abort are alternative answers to the alert.

## 条件与文明差异 Conditions and variants

神秘飞升不能用于荒野帝国；排外帝国在容器轨道期间有额外修正；5067 的结果取决于是否“神秘不走运”，聪明/学习快的物种不会触发。

Enigmatic Ascension is unavailable to wilderness empires; xenophobe empires get an extra modifier while the cache is in orbit; 5067's outcome depends on being 'enigmatically unlucky', which intelligent or quick-learning species avoid.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/distant_stars_events_2.txt:4776-4960 (distar.2050, 20501 setup); events/distant_stars_events_2.txt:4960 (distar.5054); common/on_actions/00_on_actions.txt:1805 (on_fleet_auto_move_arrival → 5054, 5061); events/distant_stars_events_2.txt:4998 (distar.5057); common/special_projects/00_projects_distant_stars.txt (ENIGMATIC_CACHE_PROJECT); events/distant_stars_events_2.txt:5054 (distar.5058); events/distant_stars_events_2.txt:5083 (distar.5052); events/distant_stars_events_2.txt:5286 (distar.5056); events/distant_stars_events_2.txt:5333 (distar.5059); events/distant_stars_events_2.txt:5381 (distar.5053); events/distant_stars_events_2.txt:5726 (distar.5060); events/distant_stars_events_2.txt:5913-5942 (distar.5061, 5062); events/distant_stars_events_2.txt:5963 (distar.5064); common/special_projects/00_projects_distant_stars.txt (ENIGMATIC_UPLIFTING, ENIGMATIC_REPAIR); events/distant_stars_events_2.txt:6017-6600 (distar.5066-5074); events/distant_stars_events_2.txt:6601 (distar.5070); events/distant_stars_events_2.txt:6725 (distar.5077); events/distant_stars_events_2.txt:6764 (distar.5078)
已核对 distar.2050/20501、5052–5078、三个项目、on_action 钩子（1805、2048、838）与升格结果权重。修正：草稿把“发现实体”“归来”“被击毁”“飞升中止”拆成四个互不相连的故事，并把三种项目结果显示为 33/11/56%（这是修正前的平均值）；现合为以 distar.5057 为起点的故事，用审阅连接串起并加互斥组说明真实权重。distar.5052/5054/5055/5056/5060/5061/5066/5075/5076 是隐藏事件，不作为章节。

Checked distar.2050/20501, 5052-5078, the three projects, the on_action hooks (1805, 2048, 838) and the uplift result weights. Correction: the draft split 'Alien Entity Identified', 'Returns', 'Destroyed' and 'Ascension Terminated' into four unconnected stories and showed the three project results as 33/11/56% (an average); they are now one story from distar.5057 with reviewed links and an exclusive group stating the real weights. distar.5052/5054/5055/5056/5060/5061/5066/5075/5076 are hidden events, not chapters.
