# 老旧的收纳箱 / An Old Container

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件：隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期检查，游戏前5年不会发生，每次约三分之一几率（中期前×1.5；近期参战或所有方舟都在战斗时为0）调用 generate_arkship_event 从 mobile_arkship_random_events 池（00_on_actions.txt:3979-4006，24项，总权重460）中抽取一件，否则3–5年后再试。多数事件设置一次性标记（个别如“出发！”可发生两次）；结束后约10–15年再重新开始检查。（池中权重 20/460，00_on_actions.txt:3981）
Nomad arkship random event: hidden arkship.1 (nomads_arkship_events.txt:7-49) checks periodically — never in the first 5 years, about one in three (×1.5 before mid game, 0 during recent war or when every arkship is fighting) — and draws one episode from mobile_arkship_random_events (00_on_actions.txt:3979-4006, 24 entries, total weight 460); otherwise it retries in 3–5 years. Most episodes set a once-only flag (Start Your Engines can happen twice); after it ends the loop resumes roughly 10–15 years later. (pool weight 20/460, 00_on_actions.txt:3981)

条件：非格式塔帝国；只发生一次（arkship_flag_container）。
Conditions: non-gestalt; once (arkship_flag_container).

## 剧情脉络 Story outline

- 打开下层甲板一只带辐射信号的焊死集装箱（开启事件链“老旧的收纳箱”），约半年后随机得到三种内容之一：
  An old welded container emitting radiation is opened (event chain An Old Container); about six months later one of three finds:
- “不寻常的发现”（10）：花500能量破开第二层外壳 → “迷雾重重的水晶”（15）：陈列（公共区或大档案馆）→“宝贵的财产”，追查来源 →“水晶交响乐”，或研究其能量 →“前进的道路”；也可丢出气闸结束。
  An Unusual Finding: pay 500 energy to open the inner casing → A Veiled Crystal: display it → A Valuable Possession, trace its origin → A Crystallized Symphony, or study its energy → A Way Forward; or jettison it.
- “有价值的发现”（35）：晶体合金与暗物质。
  A Valuable Find: crystalline alloys and dark matter.
- “色彩斑斓的雕像”（45）：打开 →“内在的秘密”（套娃般的雕像），或陈列 →“年轻一代的喜好”。
  A Colorful Figure: open it → A Secret Within (nested figures), or display it → Love of the Young.

## 分支与结局 Branches and outcomes

- 三种内容等权互斥；水晶的四个处理方式互斥（陈列有两种地点，需满足条件）。
  The three finds are exclusive at equal weight; the crystal's options are exclusive.

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
