# 废弃观测站 / Abandoned Observation Post

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

《遥远繁星》专属F型星系 big_rip_system（至多一个）由初始化放置此4级、全局一次的异常。

The Distant Stars F-class system big_rip_system (at most one) receives this level-4, once-per-game anomaly from the initializer.

## 剧情脉络 Story outline

distar.1030：观测站数据被清空，星球上只有半途而废的巨城废墟和一座全息神殿。调查 → BIG_RIP（60天）→ distar.1031“灰蛊风暴”：一个心灵相连的植物文明在宗教觉醒期间被名为“守门者”的外星种族干预，从此痴迷于名为“灰蛊风暴”的末日，宗教堕落为自杀邪教，最终枯萎消亡。奖励社会学研究并设置 lcluster_clue_desc_2。结果执行 pop_lcluster_event：若已遇到首座L星门且线索未集齐，有30%几率在10天后触发通用的 distar.9000“L星门见解”（另一故事）。

distar.1030: the post's data has been wiped; the planet holds half-built megacities and a holotemple. Investigate → BIG_RIP (60 days) → distar.1031 "The Gray Tempest": a psionically linked plantoid civilisation, meddled with by aliens called the gatekeepers during a religious awakening, became obsessed with an apocalypse called "the Gray Tempest" and wilted away as a suicide cult. Society research; sets lcluster_clue_desc_2. The result runs pop_lcluster_event: if the empire has met its first L-Gate and the clues are incomplete, there is a 30% chance of the generic distar.9000 "L-Gate Insights" 10 days later (a separate story).

## 分支与结局 Branches and outcomes

调查或离开。

Investigate or leave.

## 条件与文明差异 Conditions and variants

distar.1031 排外帝国有专属选项，效果相同。

distar.1031 has a xenophobe-only option with the same effects.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:141-198 (big_rip_system); common/anomalies/95_anomaly_categories_distant_stars.txt:1101-1113; events/distant_stars_events_2.txt:1992 (distar.1030); common/special_projects/00_projects_distant_stars.txt:1073 (BIG_RIP); events/distant_stars_events_2.txt:2026 (distar.1031)
已核对初始化、异常、distar.1030–1031 与项目。树结构正确。lcluster_clue_desc_2 只影响 distar.9000 的文本。

Checked initializer, anomaly, distar.1030–1031 and the project. Tree correct. lcluster_clue_desc_2 only affects distar.9000's text.
