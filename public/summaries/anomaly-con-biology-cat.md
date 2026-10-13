# 大陆上的发现 / Continental Findings

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:353-389` · `events/anomaly_events_3.txt:2730-3272 (4095-4104)` · `events/anomaly_events_3.txt:3539-3718 (4115-4117)` · `events/anomaly_events_3.txt:4185-4274 (4150-4151)` · `common/special_projects/00_projects_3.txt:251-298, 322-348, 426-449` · `events/failures.txt:298-341`
- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 1级异常；在大陆型行星上以基础权重3生成（与其他有效类别相对比较）。  
  Level-1 anomaly; spawn weight 3 on continental planets (relative to other valid categories).
- 约30天后另有一份通用联络报告（story.3/story.5，共享枢纽故事），不属于本故事。  
  About 30 days later a generic contact report (story.3/story.5, a shared hub story) follows; it is not part of this story.

## 剧情脉络 Story outline

- 研究完成时在四个结果中按权重随机其一（各为1）：  
  On completion one of four outcomes is drawn (base weight 1 each):
- **庇护所**（4095）：行星获得“丰饶星球”修正并留下标本。机械帝国权重为0。  
  **Sanctuary** (4095): the planet gains Lush Planet and a specimen. Weight 0 for machine empires.
- **水中王者**（4100）：发现似有灵能的四足兽群。可研究（30天项目“平原之主”）、立即驯化（14天后结果）或在禁止干涉政策下放任。机械帝国权重为0。  
  **The Rulers of the Water Plains** (4100): psionic-seeming herd beasts. Study them (30-day project), domesticate at once (result after 14 days) or, under the interference_not_allowed policy, leave them. Weight 0 for machine empires.
- **暗中蛰伏**（4115）：外星野兽登上科研船，船只瘫痪。可组织救援（需2艘军舰、7天、限时1080天）或放弃（船与科学家损失）。无修正，始终可能。  
  **Lurking in the Dark** (4115): a beast boards the science ship and disables it. Mount a rescue (2 military ships, 7 days, 1080-day limit) or abandon it (ship and scientist lost). No modifiers.
- **贸易商的教诲**（4150）：一处贸易枢纽废墟中的文献；送回研究（1200社会学项目）或卖给收藏家（能源与矿物）。已找到这部著作的帝国权重为0。  
  **Teachings of Traders** (4150): documents in the ruins of a trading hub; research them (1,200 society project) or sell them (energy and minerals). Weight 0 once this writing was found.

## 分支与结局 Branches and outcomes

- 研究兽群：排外、尚武或狂热平等主义帝国得到4101（兽群抗拒，行星获敌对动物修正）；其他帝国得到4102（灵能交流，获高级“兽力工厂”修正）。  
  Studying the herd: xenophobe, militarist or fanatic egalitarian empires get 4101 (the beasts resist; hostile animal life); others get 4102 (psionic contact; high "horse-powered factories").
- 立即驯化：同样按上述思潮分为4103（低级修正）与4104（中级修正并带来负面舆论）。  
  Domesticating at once splits the same way into 4103 (low modifier) and 4104 (medium modifier, negative press).
- 救援：70% 4116 成功，30% 4117 成功但科学家牺牲；超时则 anomaly_failure.4116 全员罹难、船只被毁。  
  Rescue: 70% 4116 success, 30% 4117 success but the scientist dies; on timeout anomaly_failure.4116 destroys the ship.
- 翻译文献：70% 4151 解锁法令“大师的教诲：外交信任”，30% anomaly_failure.4136 仅部分译出（影响力）。  
  Translation: 70% 4151 unlocks the edict "Master's Teachings: Diplomatic Trust"; 30% anomaly_failure.4136 gives a partial translation (influence).
- “大师的著作”系列：四个互不相干的异常（大陆上的发现、钢之追寻、沙中迷藏、潜在发现）各可找到“泰丽莎讲述者”的一部著作，并解锁对应的法令；彼此没有先后顺序，失败结果 anomaly_failure.4136 为四者共用。  
  "Master's Writings" series: four unrelated anomalies (Continental Findings, A Feel For Steel, Buried in the Sand, Cold Hard Potential) can each find one work of "Telisa the Teller of Tales" and unlock its edict; there is no order between them, and the failure outcome anomaly_failure.4136 is shared by all four.

## 条件与文明差异 Conditions and variants

- 4100 的正文在科学家有国务或生物专长时更换为“专家”版本；4115–4117 对机械帝国有专门文本与奖励。  
  4100 uses an "expert" text for scientists with statecraft or biology expertise; 4115–4117 have machine-empire texts and rewards.
- 4100.a 对个体机械、进化掠食者起源或持禁止干涉政策的帝国不可用。  
  4100.a is unavailable to individual machines, the Evolutionary Predators origin, or empires with the interference_not_allowed policy.

## 审阅记录 Review notes

- 已核对 Checked：类别定义与全部结果事件、三个特殊项目、失败事件。  
  Category, all outcome events, three special projects and failure events.
- 更正 Corrections：标注四选一的权重与修正，以及项目成功/失败的互斥结果。  
  Annotated the four weighted outcomes with modifiers and the exclusive project results.
- 不确定 Uncertain：“平原之主”项目完成时检查的是项目地点（FROM，即该行星）拥有者的思潮；若行星无人拥有，两条分支的实际触发情况未经引擎验证。  
  PSIONIC_HORSES_PROJECT on_success tests the ethics of FROM's owner (the location planet); if the planet is unowned, which branch fires is not verified against the engine.
- 覆盖 Coverage：17 个文档全部核对 / all 17 docs checked.
