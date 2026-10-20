# 未知资源使用 / Unknown Resource Usage

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件：隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期检查，游戏前5年不会发生，每次约三分之一几率（中期前×1.5；近期参战或所有方舟都在战斗时为0）调用 generate_arkship_event 从 mobile_arkship_random_events 池（00_on_actions.txt:3979-4006，24项，总权重460）中抽取一件，否则3–5年后再试。多数事件设置一次性标记（个别如“出发！”可发生两次）；结束后约10–15年再重新开始检查。（池中权重 20/460，00_on_actions.txt:4002）
Nomad arkship random event: hidden arkship.1 (nomads_arkship_events.txt:7-49) checks periodically — never in the first 5 years, about one in three (×1.5 before mid game, 0 during recent war or when every arkship is fighting) — and draws one episode from mobile_arkship_random_events (00_on_actions.txt:3979-4006, 24 entries, total weight 460); otherwise it retries in 3–5 years. Most episodes set a once-only flag (Start Your Engines can happen twice); after it ends the loop resumes roughly 10–15 years later. (pool weight 20/460, 00_on_actions.txt:4002)

条件：非格式塔；只发生一次。
Conditions: non-gestalt; once.

## 剧情脉络 Story outline

- 资源持续不明消耗（事件链“未知资源使用”）：调查 → 项目“资源调查”→ 加权随机发现其一：“造册之外的世代”“疗养场所”“应急资源贮备”“超脱体制”（各1，格式塔为0）、“全部回收”（1）、“古董处理器”（5，仅个体机械）、“未登记的集会”（5，仅岩石物种创始）；“超脱体制”可再听取 →“生活的其它之道”。
  Resources vanish (event chain Unknown Resource Usage): investigate → project Resource Investigation → one weighted find (four weight 1 for non-gestalts, Total Reclamation 1, Legacy Processes 5 only for individual machines, Unaccounted Aggregation 5 only for lithoid founders); Beyond the System can lead to A Different Way of Living.

## 分支与结局 Branches and outcomes

- 发现结果互斥；多数可选择拆除或放任。
  Exclusive finds; most offer demolish or tolerate.

## 条件与文明差异 Conditions and variants

- 无特殊差异。
  No notable variants.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nomads_arkship_events.txt、common/on_actions/00_on_actions.txt、common/special_projects/06_projects_nomads.txt、common/event_chains/00_event_chains_nomads.txt · 游牧帝国内容 nomad content
- 已核对 Checked：方舟事件循环 arkship.1 与随机池权重、本事件的触发条件与一次性标记、各选项的后续事件/项目与随机权重、延迟（@extremely_short_arkship_event_delay_days = 180 天，10_scripted_variables_nomads.txt:457）。
  Checked the arkship loop and pool weights, this episode's trigger and once-flag, options, projects, random weights and delays (180 days base).
- 说明 Note：地图上的延迟显示为未解析的脚本变量名，实际值见上（编译器请求）。
  Map delays show unresolved script variables; values are given above.
