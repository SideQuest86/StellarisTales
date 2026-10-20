# 舱体 / The Pod

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件：隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期检查，游戏前5年不会发生，每次约三分之一几率（中期前×1.5；近期参战或所有方舟都在战斗时为0）调用 generate_arkship_event 从 mobile_arkship_random_events 池（00_on_actions.txt:3979-4006，24项，总权重460）中抽取一件，否则3–5年后再试。多数事件设置一次性标记（个别如“出发！”可发生两次）；结束后约10–15年再重新开始检查。（池中权重 20/460，00_on_actions.txt:4004）
Nomad arkship random event: hidden arkship.1 (nomads_arkship_events.txt:7-49) checks periodically — never in the first 5 years, about one in three (×1.5 before mid game, 0 during recent war or when every arkship is fighting) — and draws one episode from mobile_arkship_random_events (00_on_actions.txt:3979-4006, 24 entries, total weight 460); otherwise it retries in 3–5 years. Most episodes set a once-only flag (Start Your Engines can happen twice); after it ends the loop resumes roughly 10–15 years later. (pool weight 20/460, 00_on_actions.txt:4004)

条件：非杀戮帝国；只发生一次。
Conditions: not homicidal; once.

## 剧情脉络 Story outline

- 星系边缘漂浮着伪装成岩石的物体：扫描（项目“扫描舱体”）→“吾之挚爱”：一名已故者与一段加密信息和坐标（事件链“亡命鸳鸯”）→ 前往坐标（项目“扫描救生舱”）→“最后幸存者”→ 约半年后讲述其身世，加权随机八选一：“大屠杀”“血腥的战争”（需有可通讯的其他帝国）“危险的发现”“野望”“害虫”“隐藏的协定”（需有可通讯的堕落帝国）“禁忌的结合”“虚空中的低语”→ 均接“最后的遗言”。
  A disguised pod: scan → Dearly Beloved (a dead occupant, a sealed message and coordinates; event chain Star-Crossed Lovers) → scan the survivor pod → Last Survivor → one of eight weighted backstories (two need contact with another empire / a Fallen Empire) → Final Words.

## 分支与结局 Branches and outcomes

- 八段身世互斥（权重3/3/2/3/2/3/3/1），都汇合到“最后的遗言”；可在前两步放弃。
  Eight exclusive backstories (3/3/2/3/2/3/3/1) converge on Final Words; you can stop at the first two steps.

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
