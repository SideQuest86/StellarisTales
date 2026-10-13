# 见微知著 / Small Gestures

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nomads_arkship_events.txt、common/on_actions/00_on_actions.txt、common/special_projects/06_projects_nomads.txt、common/event_chains/00_event_chains_nomads.txt · 游牧帝国内容 nomad content · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

游牧帝国的方舟随机事件：隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期检查，游戏前5年不会发生，每次约三分之一几率（中期前×1.5；近期参战或所有方舟都在战斗时为0）调用 generate_arkship_event 从 mobile_arkship_random_events 池（00_on_actions.txt:3979-4006，24项，总权重460）中抽取一件，否则3–5年后再试。多数事件设置一次性标记（个别如“出发！”可发生两次）；结束后约10–15年再重新开始检查。（池中权重 20/460，00_on_actions.txt:3990）
Nomad arkship random event: hidden arkship.1 (nomads_arkship_events.txt:7-49) checks periodically — never in the first 5 years, about one in three (×1.5 before mid game, 0 during recent war or when every arkship is fighting) — and draws one episode from mobile_arkship_random_events (00_on_actions.txt:3979-4006, 24 entries, total weight 460); otherwise it retries in 3–5 years. Most episodes set a once-only flag (Start Your Engines can happen twice); after it ends the loop resumes roughly 10–15 years later. (pool weight 20/460, 00_on_actions.txt:3990)

条件：非格式塔；只发生一次。
Conditions: non-gestalt; once.

## 剧情脉络 Story outline

- 船员行为出现细微异常（事件链“神秘的疾病”）→“迷恋之态”：继续观察 →“示爱的时段”→ 放任（“爱是一管鸡血”）或整肃（“强调纪律”）；或调查来源 → 项目“奇怪的行为”→“漂浮的孢子”→ 毁掉植物（“消失的分量”）或追溯来源（“超越众星之花朵”）。
  Crew behave oddly (event chain A Mysterious Sickness) → A State of Infatuation: monitor → A Time of Affection → let love be (Efficiency Through Affection) or end it (Matters of Discipline); or investigate → project Strange Behavior → Floating Spores → destroy the plant (The Weight of Absence) or trace it (Flowers Beyond the Stars).

## 分支与结局 Branches and outcomes

- 四个结局互斥；各结局都让一名领袖成为方舟总督。
  Four exclusive endings; each makes a leader governor of the arkship.

## 条件与文明差异 Conditions and variants

- 无特殊差异。
  No notable variants.

## 审阅记录 Review notes

- 已核对 Checked：方舟事件循环 arkship.1 与随机池权重、本事件的触发条件与一次性标记、各选项的后续事件/项目与随机权重、延迟（@extremely_short_arkship_event_delay_days = 180 天，10_scripted_variables_nomads.txt:457）。
  Checked the arkship loop and pool weights, this episode's trigger and once-flag, options, projects, random weights and delays (180 days base).
- 说明 Note：地图上的延迟显示为未解析的脚本变量名，实际值见上（编译器请求）。
  Map delays show unresolved script variables; values are given above.
