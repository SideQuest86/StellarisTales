# 发现先驱 / Precursor Discovery

- 分类 Category：先驱者 Precursors · 来源 Sources：events/precursor_events.txt:5685–7190；common/on_actions/00_on_actions.txt:485–491；common/special_projects/00_projects_1.txt:3448–3577；common/artifact_actions/artifact_actions.txt:843；common/scripted_effects/00_scripted_effects.txt:768；common/scripted_effects/nomads_effects.txt:6753 · DLC：稀有文物行动需《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

这是五个经典先驱者（沃陶姆、尤特、第一联盟、伊拉斯、赛博勒克斯）共用的“补足线索”机制（源码注释 PRECURSOR ARTIFACT CATCH-UP），不属于任何一族。每五年一次的国家脉冲 on_five_year_pulse_country 以随机事件抽取 301、310、311、314（各权重25，对“无事件”75，只计算条件满足者）；320 则来自稀有文物行动“寻找先驱线索”（500稀有文物，冷却1800天）。共同条件：非AI，开局超过50年，拥有一个尚未集齐六份线索的经典先驱者事件链。

A shared "catch-up" mechanism for the five classic precursors (source comment: PRECURSOR ARTIFACT CATCH-UP), not owned by any of them. The five-year country pulse draws 301, 310, 311 or 314 from random events (weight 25 each vs 75 "nothing", eligible events only); 320 comes from the minor-artifact action that seeks a precursor clue (500 minor artifacts, 1800-day cooldown). Common requirements: non-AI, more than 50 years elapsed, an active classic precursor chain still short of six clues.

## 剧情脉络 Story outline

- 301 / 320“发现先驱”：在已勘察、无主、无异常的该先驱星域行星上生成一个“××活动迹象”项目（按正在进行的事件链五选一，180天，科研船+科学家）→ 完成后“××文物已回收”（302–306），线索+1，并调用该族的母星定位检查。
- 310 私人收藏家（每帝国一次，非格式塔）：500能量收购、100影响力征收或任其保留；前两者直接线索+1。
- 311 邻国出售（每帝国一次）：1000能量购买；企业统治可500能量还价；尚武文化可威逼 → 312 拒绝（对方敌视）或 313 屈服交出；或拒绝交易。
- 314 友邦赠送（每帝国一次）：接受即线索+1。

- 301 / 320 "Precursor Discovery": spawns a "Signs of … Activity" project on a surveyed, unowned, anomaly-free planet in that precursor's region (one of five, by the active chain; 180 days, science ship + scientist) → "… Artifact Recovered" (302–306), +1 clue, then that chain's home-system check.
- 310 Private Collector (once, non-gestalt): buy for 500 energy, seize for 100 influence, or let them keep it; the first two add a clue directly.
- 311 a neighbour sells (once): 1000 energy; Corporate Dominion can pay 500; Warrior Culture can threaten → 312 refuses (hostile) or 313 folds; or decline.
- 314 a friendly neighbour's gift (once): accepting adds a clue.

## 分支与结局 Branches and outcomes

- 五种途径相互独立，可在不同脉冲中先后出现；每次脉冲最多抽中一个。所得线索与正常调查报告一样计入六份门槛，第六份时会跳到对应先驱者故事的“母星系位置确认”（外部链接）。
- 312/313 由 random_list 决定（基础10/10，按双方舰队实力或对方是否尚武×50）。
- 拒绝、保留或谈判失败都不会提供线索。

- The five routes are independent and may happen in different pulses; each pulse draws at most one. Their clues count toward the six-clue threshold like ordinary reports; the sixth leads to the precursor's "Home System Located" event (external link).
- 312/313 come from a random_list (base 10/10, ×50 by relative fleet power or the seller's Warrior Culture).
- Declining, letting the collector keep it or a refused threat yields no clue.

## 条件与文明差异 Conditions and variants

- 301 常规帝国有四种同条件正文（引擎任选其一），机械智能与蜂巢思维各一种；302–306 也按常规/机械/蜂巢分三种正文。
- 311 的还价与威逼选项分别要求企业统治与尚武文化公民性。
- 游牧帝国（nomads_effects.txt）改为在驿站所在或相邻的先驱星系中寻找地点。

- 301 has four equally valid regular-empire texts (the engine shows one) plus machine and hive versions; 302–306 have regular/machine/hive texts.
- 311's counter-offer and threat need Corporate Dominion and Warrior Culture.
- Nomadic empires (nomads_effects.txt) look for a site in or next to a waystation system instead.

## 审阅记录 Review notes

- 已核对：301–320 全部脚本、五年脉冲随机表、五个 ARTIFACT_FOUND 项目、collector_surrenders_artifact 与 spawn_precursor_anomaly_effect、artifact_precursor_clue；中英文正文已读。
- 修正：V3 的标题“先驱者：遗失的线索”是自拟的，现改用入口事件 precursor.301 的原标题；补充并行组（五种途径）与两个互斥组；明确这些事件不属于沃陶姆或任何单一先驱者（V3 曾把 1–499 误归沃陶姆）。
- 不确定：301 常规正文的选择方式不可从脚本预测。

- Checked: all scripts 301–320, the five-year pulse table, the five ARTIFACT_FOUND projects, collector_surrenders_artifact and spawn_precursor_anomaly_effect, artifact_precursor_clue; both languages read.
- Fixes: V3's invented title "Precursors: Lost Clues" replaced by the original title of entry event precursor.301; parallel set and two exclusive groups added; these events belong to no single precursor (V3 once lumped 1–499 into the Vultaum).
- Uncertain: which of 301's regular texts is shown cannot be predicted from script.
