# 科学家失踪 / Missing Scientist
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:579-1383` · `events/observation_events.txt:3205-3215 (see 999-1069)` · `common/special_projects/00_projects_1.txt:736-760` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：前FTL文明处于前工业时代；观察站在首都上并处于“被动观察”任务；观察站主人是非AI、非格式塔且未进行过本事件链；每个国家一次（observation_100_fired）。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: The pre-FTL country is pre-industrial, our outpost on its capital runs the passive-observation mission, the outpost owner is non-AI, non-gestalt and has not had this chain; once per pre-FTL country.

## 剧情脉络 Story outline

1. **失踪的科学家（101）**：我方一名科学家在观察站失踪；创建流放领袖，观察站被锁定。唯一选项后随机：25% **102 科学家被发现死亡**（10–15 天后，结束，获得 360 天“失踪科学家”修正）；75% **103**（900–2700 天后）。/ A scientist vanishes: 25% found dead (102, ends), 75% strange reports (103).
2. **103 前FTL世界传来怪异报告**：选项使该文明跃入工业时代并削减不干涉决议（并启用“邪教被报告”标志）→ 900–2700 天 → **104 来电**（对话型事件）→ 900–2700 天 → **105 流氓科学家巩固权力**（机器时代，觉醒度90）。/ 103 advances the planet to the industrial age → 104 (dialog) → 105 (machine age).
3. **105**：A 启用特殊项目“带回失踪科学家”（需 2 艘运输舰，限时 1080 天）；B 放弃。项目成功 → **106 成功提取**；失败 → **112 导弹袭击观察站**（拆除观察站，并推动文明进入太空时代）。/ 105: enable the Extract Missing Scientist project (2 transports, 1080 days) or leave; success → 106, failure → 112.
4. **106** 之后 900–2700 天，三选一（各 33%）：**3205 迫在眉睫的末日**（内战；对方变为狂热灵性；A 立刻破局 / B 100 天后 **107 宗教冲突** → 360–720 天后三种**核战争**之一）；**108 局势平息**（倒退到蒸汽或文艺复兴时代，50/50）；**109 导弹袭击观察站**（文明继续发展，进入太空时代，观察站拆除）→ 20–30 天后 **110 来电**（对话）→ C 选项 20–30 天后 **111**（开启 preftl.1099）。/ After 106 one of three outcomes: civil war (3205 → 107 → nuclear war), regression (108), or continued development (109 → 110 → 111).

## 分支与结局 Branches and outcomes

106 之后的三个结果互斥（各 33%；终结机械主义起源时 3205 为 0；3205 的核战争三选一各约 33%，非军国使其 ×0.5）。项目失败 → 112。/ Three exclusive outcomes after 106 (3205 is 0 for Mechanists; nuclear war variants ≈33% each, ×0.5 when the pre-FTL country is not militarist). Project failure → 112.

## 条件与文明差异 Conditions and variants

103–111 文本随观察站主人（普通/蜂巢/机械）与前FTL文明类型变化；105 项目需要两艘运输舰。/ Texts vary with owner type and pre-FTL type; the project needs two transports.

## 审阅记录 Review notes

- 已核对 Checked：根事件 observation.100，101–112、3205 全部脚本，项目 EXTRACT_MISSING_SCIENTIST，观察池权重。/ Root, all scripts 101–112 and 3205, the project and pool weights.
- 审阅改动 Changes：隐藏根 100 折叠进入口；补充了各延时、随机权重和项目条件。结构与编译草稿一致，无需桥接。/ The hidden root is folded into the entry; delays, weights and project conditions documented. The compiled structure matched the source; no bridges needed.
