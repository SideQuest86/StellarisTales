# 启动引擎 / Start Your Engines

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nomads_arkship_events.txt、common/on_actions/00_on_actions.txt、common/special_projects/06_projects_nomads.txt、common/event_chains/00_event_chains_nomads.txt · 游牧帝国内容 nomad content · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

游牧帝国的方舟随机事件：隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期检查，游戏前5年不会发生，每次约三分之一几率（中期前×1.5；近期参战或所有方舟都在战斗时为0）调用 generate_arkship_event 从 mobile_arkship_random_events 池（00_on_actions.txt:3979-4006，24项，总权重460）中抽取一件，否则3–5年后再试。多数事件设置一次性标记（个别如“出发！”可发生两次）；结束后约10–15年再重新开始检查。（池中权重 20/460，00_on_actions.txt:3983）
Nomad arkship random event: hidden arkship.1 (nomads_arkship_events.txt:7-49) checks periodically — never in the first 5 years, about one in three (×1.5 before mid game, 0 during recent war or when every arkship is fighting) — and draws one episode from mobile_arkship_random_events (00_on_actions.txt:3979-4006, 24 entries, total weight 460); otherwise it retries in 3–5 years. Most episodes set a once-only flag (Start Your Engines can happen twice); after it ends the loop resumes roughly 10–15 years later. (pool weight 20/460, 00_on_actions.txt:3983)

条件：非格式塔；至少与两个常规帝国有通讯；整局最多两次（第一次之后35年内不会再发生，arkship.65 immediate）。
Conditions: non-gestalt; communications with at least two regular empires; at most twice per game (blocked for 35 years after the first).

## 剧情脉络 Story outline

- 方舟主办一场持续近一年的星际竞速。按本国领袖与特质出现不同的参赛人选（共22种选项，多数需特定领袖特质或国策），约半年后（经隐藏事件75）出现结果：
  The arkship hosts a year-long race; the pilot options depend on our leaders and traits (22 options); about six months later (via hidden 75) the result:
- “[方舟]大捷”（70，基础20）、“糟糕表现”（80，60）、“骇人听闻的意外”（85，16）、“神秘飞行员”（90，4，可招募神秘飞行员）。
  Victory (70, base 20), Terrible Performance (80, 60), Horrific Accident (85, 16), Mysterious Pilot (90, 4; the pilot can be hired).

## 分支与结局 Branches and outcomes

- 四种结果互斥；人选影响权重。
  The four results are exclusive; the chosen pilot changes the weights.

## 条件与文明差异 Conditions and variants

- 无特殊差异。
  No notable variants.

## 审阅记录 Review notes

- 已核对 Checked：方舟事件循环 arkship.1 与随机池权重、本事件的触发条件与一次性标记、各选项的后续事件/项目与随机权重、延迟（@extremely_short_arkship_event_delay_days = 180 天，10_scripted_variables_nomads.txt:457）。
  Checked the arkship loop and pool weights, this episode's trigger and once-flag, options, projects, random weights and delays (180 days base).
- 说明 Note：地图上的延迟显示为未解析的脚本变量名，实际值见上（编译器请求）。
  Map delays show unresolved script variables; values are given above.
