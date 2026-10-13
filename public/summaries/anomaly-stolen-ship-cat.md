# 武装舰船 / Armed Vessel

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar） · 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:1470-1496; events/distant_stars_events_2.txt:6783 (distar.2040); common/special_projects/00_projects_distant_stars.txt:1426 (INVISIBLE_DEATH); events/distant_stars_events_2.txt:6839 (distar.2041)

## 如何开始 How it starts

需要《遥远繁星》。小行星可能生成（3级，权重3，全局一次）；帝国正在进行L星团事件链且尚未集齐线索时权重×2。

Requires Distant Stars. Can spawn on asteroids (level 3, weight 3, once per game); ×2 while the empire runs the L-Cluster chain without completing it.

## 剧情脉络 Story outline

distar.2040“纳弗瑞的骄傲”：一艘被叛军劫持改装的隐形轰炸机，原本要袭击据说藏有决胜武器的西万实验室，途中被击落。派科研队前往 → 在可到达的小行星上开启 INVISIBLE_DEATH（140天）→ distar.2041“看不见的死亡”：监控录像显示叛军打开空无一物的保险箱后被体内涌出的灰色物质吞噬，科学家启动应急系统电死了所有人。奖励工程学研究并设置 lcluster_clue_desc_3。不需要 → 影响力。结果执行 pop_lcluster_event：若已遇到首座L星门且线索未集齐，有30%几率在10天后触发通用的 distar.9000“L星门见解”（另一故事）。

distar.2040 "Nefri's Pride": a patrol craft hijacked by rebels and refitted as a stealth bomber, shot down on its way to strike the Xvan Labs, said to hold a war-winning weapon. Send a team → INVISIBLE_DEATH (140 days) on a reachable asteroid → distar.2041 "Invisible Death": security footage shows the rebels opening an empty strongbox, then grey matter bursting out of their bodies until a scientist electrocutes the room. Engineering research; sets lcluster_clue_desc_3. Decline → influence. The result runs pop_lcluster_event: if the empire has met its first L-Gate and the clues are incomplete, there is a 30% chance of the generic distar.9000 "L-Gate Insights" 10 days later (a separate story).

## 分支与结局 Branches and outcomes

派队或放弃。

Send a team or decline.

## 条件与文明差异 Conditions and variants

无。

None.

## 审阅记录 Review notes

已核对异常、distar.2040–2041 与项目。树结构正确。30天后的通用接触报告 story.5 是共享事件，不属于本故事。

Checked the anomaly, distar.2040–2041 and the project. Tree correct. The generic contact report story.5 30 days later is a shared helper, not part of this story.
