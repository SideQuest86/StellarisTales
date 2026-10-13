# 钢之追寻 / A Feel For Steel

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:76-108` · `events/anomaly_events_3.txt:547-673 (4020)` · `events/anomaly_events_3.txt:4918-5013 (4165-4166)` · `common/special_projects/00_projects_3.txt:452-475` · `events/failures.txt:323-341` · `common/scripted_effects/00_scripted_effects.txt:3291-3312`
- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 2级异常；在苔原、墓穴（未禁用）或有毒行星上以权重3生成。  
  Level-2 anomaly; spawn weight 3 on tundra, tomb (not disabled) or toxic planets.
- 约30天后另有一份通用联络报告（story.1–8，共享枢纽故事），不属于本故事。  
  About 30 days later a generic contact report (story.1–8, a shared hub story) follows; it is not part of this story.

## 剧情脉络 Story outline

- 两个结果各基础权重1：  
  Two outcomes, base weight 1 each:
- **巨舰陨落之地**（4020）：数百万年前巨型飞船的坟场。行星获“飞船坟场”修正；不可殖民的天体得2合金资源点，可殖民行星得“金属骸骨场”。科学家有推进专长时文本与选项不同。始终可能。  
  **Leviathan Down** (4020): a graveyard of gargantuan ships. Starship Graveyard modifier; +2 alloys on uncolonisable bodies or a metal boneyard deposit on colonisable ones. Text and option differ for propulsion-expert scientists. Always possible.
- **勇士的教诲**（4165）：古战场上的文献；研究（1200社会学）或出售（能源）。格式塔或已找到此著作时权重0。  
  **Teachings of Warriors** (4165): documents on an old battlefield; research (1,200 society) or sell (energy). Weight 0 for gestalts or if found.

## 分支与结局 Branches and outcomes

- L星门线索：拥有“遥远群星”DLC、已遇见第一个L星门且L星团未开启、线索未集齐时，选择该结果有30%（3/10）几率在10天后触发共享的“L星门线索”事件 distar.9000（枢纽故事，不属于本异常）。  
  L-Gate clue: with Distant Stars, after the first L-Gate encounter and before the cluster opens or the clues are complete, the option has a 30% (3/10) chance to fire the shared clue event distar.9000 ten days later (a hub story, not a chapter of this anomaly).
- 翻译：70% 4166 解锁法令“大师的教诲：战国”（尚武帝国措辞不同）；30% anomaly_failure.4136。  
  Translation: 70% 4166 unlocks "Master's Teachings: Warring States" (militarist wording differs); 30% anomaly_failure.4136.
- “大师的著作”系列：大陆上的发现、钢之追寻、沙中迷藏、潜在发现四个异常各可找到“讲述者泰丽莎”的一部著作并解锁对应法令；四者互不依赖、没有顺序，失败结果 anomaly_failure.4136 共用。完成时若已找到其他著作，成功事件使用另一段“又一部”文本。  
  "Master's Writings": Continental Findings, A Feel For Steel, Buried in the Sand and Cold Hard Potential can each yield one work of "Telisa the Teller of Tales" and its edict; they are independent and unordered, sharing the failure outcome anomaly_failure.4136. If another writing was found before, the success event uses its "more teachings" text.

## 条件与文明差异 Conditions and variants

- 4020 共三段正文：推进专长科学家（格式塔另有一段）与普通科学家。  
  4020 has three texts: propulsion-expert scientist (gestalt variant) and ordinary scientist.

## 审阅记录 Review notes

- 已核对 Checked：类别、4020、4165/4166、项目、失败事件与 pop_lcluster_event 效果。  
  Category, 4020, 4165/4166, the project, failure event and the pop_lcluster_event effect.
- 更正 Corrections：判定 distar.9000 为共享的L星门线索通知（由15个不同结果事件调用），不属于本故事。  
  distar.9000 judged a shared L-Gate clue notification (called by 15 different outcome events), not a chapter here.
- 覆盖 Coverage：6 个文档全部核对 / all 6 docs checked.
