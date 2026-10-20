# 哨兵 / The Sentinels

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

与“神谕”共用入口：清除丛林、毒藻、沼泽或冰川障碍时，隐藏的 ancrel.4030 以 5/5/95 抽取。哨兵还要求该星球不是母星、人口超过500、帝国不是格式塔，全银河一次。1天后弹出 4051“有翼的雕像”，可建立遗址或不理会。

Shares the Oracle's entry: clearing a jungle, kelp, swamp or glacier blocker lets hidden ancrel.4030 draw at 5/5/95. The Sentinels also need a non-homeworld planet with more than 500 pops and a non-gestalt empire; once per galaxy. 4051 "Winged Statues" follows a day later; build the site or ignore it.

## 剧情脉络 Story outline

1. 遗址三阶段：4052 考古队迷信雕像会动（30–40天后插曲 4065：考古学家失踪）；4053 雕像材料早于星上所有文明（60–90天后插曲 4066：找到失踪者的扫描仪，可花100影响力+500能量快速搜救、牺牲3点线索搜救或放弃——前两者10–40天后 4068 找到受伤的人，放弃则60–90天后 4067 找到遗体）；4054 核心有微弱辐射，需要决定如何处置。
2. 4054 的四个选择：放任雕像（非排外，故事结束）；小心拆开（非排外）、拆解回收或彻底摧毁（非亲外）——三者都启动“哨兵”项目（1000工程学）。
3. 项目完成：摧毁 → 4055 雕像苏醒并攻击，必须开战；调查/拆解 → 4058 雕像苏醒，可“听听它们说什么”（4059 对话）或开战。4059 可接受保护（4062 获得哨兵部队，和平结局）或宣称土地（4060，再次选择接受或开战）。
4. 开战后的地面战由 on_action 回调：守军获胜 → 4057；守军失败 → 4063（居民被标记驱逐），之后可反攻夺回（4064）或在哨兵清空居民时收到幸存者消息（4075）。
5. 4057 / 4064 / 4075 都可开启“进入地底”项目（180天）：若星球未被清空 → 4056“永存者”（地下虚拟来世，可净化并改作他用、改为猎场、复制技术→项目→4061，或研究外星人）；若已被清空 → 4076（为科研或娱乐改造“永存者”→项目→4077）。

1. Three stages: 4052 superstitious archaeologists say the statues move (30–40 days later side event 4065: an archaeologist vanishes); 4053 the statues predate every civilisation on the planet (60–90 days later 4066: the missing person's scanner — rescue quickly for 100 influence + 500 energy, rescue at the cost of 3 clues, or give up; rescue leads to 4068 after 10–40 days, giving up to 4067 (found dead) after 60–90 days); 4054 their cores emit radiation and a decision is needed.
2. 4054's four choices: leave the statues (non-xenophobe, story ends); open carefully (non-xenophobe), salvage, or level them (non-xenophile) — all three start the Sentinels project (1000 engineering).
3. Project result: destroy → 4055 the statues wake and attack (war); investigate/salvage → 4058 they wake and can be heard out (4059) or fought. In 4059 accept their protection (4062, Sentinel armies, peaceful ending) or claim the land (4060: accept after all or fight).
4. Ground combat resolves through on_action callbacks: defenders win → 4057; defenders lose → 4063 (the population is marked for displacement), after which the planet can be retaken (4064) or survivors are reported once the Sentinels clear it (4075).
5. 4057 / 4064 / 4075 can open the "Into the Earth" project (180 days): if the planet was not cleared → 4056 "The Evermore" (a virtual afterlife below: purge and repurpose, a hunting ground, replicate the technology → project → 4061, or study them); if cleared → 4076 (repurpose for science or entertainment → project → 4077).

## 分支与结局 Branches and outcomes

- 互斥：项目结果 4055/4058；战斗结果 4057/4063；墓穴结果 4056/4076；失踪者结局 4067/4068。
- 结局：放任雕像；接受保护（4062）；4057/4064/4075 中选择不开启项目（只得影响力）；4056 的四种处置；4061 复制成功；4077 科研或娱乐修正。

- Exclusive: project result 4055/4058; battle 4057/4063; tomb 4056/4076; the missing archaeologist 4067/4068.
- Endings: leaving the statues; accepting protection (4062); declining the project in 4057/4064/4075 (influence only); the four uses in 4056; replication in 4061; the science or joy modifier in 4077.

## 条件与文明差异 Conditions and variants

- 4055 正文分排外与其他；4056 的猎场选项需排外或军国主义，复制选项则要求两者皆非。
- 4077 正文与修正取决于 4076 的选择（科研/娱乐标志）。

- 4055's text differs for xenophobes; in 4056 the hunting-ground option needs xenophobe or militarist and replication needs neither.
- 4077's text and modifier follow the 4076 choice (science/joy flag).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/ancient_relics_arcsite_events_1.txt:4826–4965、5706–6724；common/archaeological_site_types/02_ancient_relics_arc_sites.txt:2228；common/special_projects/00_projects_ancient_relics.txt:418–523；common/on_actions/00_on_actions.txt:840、866、882、3304
- 已核对：4030 条件、4051–4068 与 4075–4077 脚本、DESTROY_SENTINELS/SECRET_TOMB/REPLICATE/REPURPOSE 项目、四个 on_action 回调；中英文正文已读。
- 修正：保留 V3 的战斗回调桥，并补上从 4058“让它们闭嘴”开战的两条桥（V3 漏掉）；补互斥组与注释。火灾事件 4078 并入“考古遗址：发掘意外”。
- 不确定：地面战结果取决于实际战斗，图中只表示可能的回调。

- Checked: 4030 conditions, scripts 4051–4068 and 4075–4077, the four projects and the four on_action callbacks; both languages read.
- Fixes: V3's battle-callback bridges kept and the two missing bridges from 4058 "Silence them forever!" added; exclusive groups and notes added. The fire incident 4078 moved to "Archaeological Sites: excavation incidents".
- Uncertain: battle outcomes depend on actual combat; the map only shows the possible callbacks.
