# 荒芜的沙漠 / Deserted Desert

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 6级异常，不会随机生成：只由特殊星系“帕尔乌斯”的初始化器放在帕尔乌斯III上（spawn_chance 为0）。  
  Level-6 anomaly that never spawns randomly: only the special "Parvus" system initializer places it on Parvus III (spawn_chance 0).

## 剧情脉络 Story outline

- 6700“死里逃生”：沙漠由纳米虫群构成，科研船勉强逃离；行星获纳米虫群修正，开始事件链“帕尔乌斯III的居民”，开启300天项目“研究纳米虫群”（科研船+科学家）。  
  6700 "Narrow Escape": the dunes are nanite swarms; the planet gets the nanite modifier, the chain "The Inhabitants of Parvus III" begins and a 300-day study project opens.
- 6705“纳米机器人的起源”：远古坠毁飞船的机器人内战，胜者是适应生物圈的纳米虫群（若已遇见L星门，文本提到星门建造者）。三选一：驯服（需自觉逻辑科技；300天项目）、继续研究（按科技给予研究/科技，设studied标志并结束事件链）、摧毁（300天项目，舰队战力≥2000）。三个选项都会增加一条L星门线索（遥远群星）。  
  6705 "On the Origin of Nanites": a crashed ship's robots fought until a hyper-adaptive nanite swarm won (with the L-Gate text if one was encountered). Tame (needs Self-Aware Logic; 300-day project), study further (research/tech; sets the studied flag and ends the chain), or destroy (300-day project, fleet power ≥2000). Each option adds an L-Gate clue (Distant Stars).
- 仅“继续研究”后：80–1080天后 6710“人造免疫系统”（需自觉逻辑，全局一次）：再次选择驯服、摧毁或承认它们是生命（物理研究与200影响力，结束事件链）。  
  Only after "study further": 80–1080 days later 6710 "Artificial Immune System" (needs Self-Aware Logic, once): tame, destroy, or recognise them as living beings (physics research and 200 influence, chain ends).

## 分支与结局 Branches and outcomes

- 驯服完成 → 6715：行星改为主物种偏好的星球类型（机械、栖息地等偏好者为盖亚星球），获驯服虫群修正与标本。  
  Taming → 6715: the planet becomes the main species' preferred class (Gaia for mechanical/habitat-type preferences), with the tamed-swarm modifier.
- 摧毁完成 → 6720：轨道轰炸消灭虫群，留下“纳米残骸”资源点。  
  Destruction → 6720: orbital bombardment leaves a nanite-remains deposit.
- L星门线索：generate_lcluster_clue 在线索集齐时触发共享事件 distar.10904（另一故事）。  
  L-Gate clue: generate_lcluster_clue fires the shared distar.10904 when the clues are complete (another story).

## 条件与文明差异 Conditions and variants

- “驯服虫群”项目描述按首都是否人造星球改变。  
  The Tame the Swarm description changes if the capital is artificial.

## 审阅记录 Review notes

- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:513-525` · `common/solar_system_initializers/special_system_initializers.txt:1139-1200 (parvus_system)` · `events/anomaly_events_4.txt:1258-1542 (6700-6720)` · `common/special_projects/00_projects_3.txt:1173-1238` · `common/event_chains/00_event_chains.txt:396-400` · `common/scripted_effects/00_scripted_effects.txt:3243-3290`
- 已核对 Checked：类别、帕尔乌斯初始化器、6700–6720、三个项目、事件链与L星门线索效果。  
  Category, Parvus initializer, 6700–6720, three projects, chain and the L-Gate clue effect.
- 更正 Corrections：6710 原挂在6705之后对所有选项生效；其触发条件要求 studied_nanite_swarm（仅6705.b设置），改为只从“继续研究”连接。  
  6710 was attached to 6705 for every choice; its trigger needs studied_nanite_swarm, set only by 6705.b, so it now links from that choice only.
- 覆盖 Coverage：10 个文档全部核对 / all 10 docs checked.
