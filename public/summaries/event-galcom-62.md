# 泛星系贸易市场总部被拆除 / Galactic Market Headquarters Stripped
- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 入口一：成员退出银河社群（on_remove_community_member，00_on_actions.txt:4420）而其拥有银河市场总部星球 → galcom.62「被剥夺银河市场总部」。入口二：决议“迁移银河市场”通过 → galcom.64「寻找新总部」。
  Entry one: a member leaves the Galactic Community (on_remove_community_member, 00_on_actions.txt:4420) and owned the market headquarters planet -> galcom.62 "Stripped of Galactic Market Headquarters". Entry two: the relocation resolution passes -> galcom.64 "New Headquarters for Galactic Market Sought".

## 剧情脉络 Story outline

- 62 → 其他成员收到 63「寻找新总部」并开启 market_founding_chain；1800天后 action.98 提名：有候选 → action.104「银河市场在……建立」→ action.101；无候选 → action.1000 / 1005「市场未建立」。
  62 -> other members get 63 "New Headquarters Sought" and start the market_founding_chain; after 1800 days action.98 nominates: with a candidate -> action.104 "Galactic Market: Established in …" -> action.101; without -> action.1000 / 1005 "Market Not Established".
- 64 → 立即 65 与 market_relocation_chain；提名期后 galcom.66（隐藏）：有提名星球 → 68「银河市场在……建立」→ action.101；否则 69 / 70「银河市场留在原地」。
  64 -> at once 65 and the market_relocation_chain; after the nomination period hidden galcom.66: a nominee planet -> 68 "Galactic Market: Established in …" -> action.101; otherwise 69 / 70 "Galactic Market Remains in Place".

## 分支与结局 Branches and outcomes

- 两条入口并行；各自结果互斥。
  The two entries are parallel; each line's results are exclusive.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/galactic_community_events.txt:701-775,1213-1500`；`events/on_action_events_2.txt:131-420`；`common/on_actions/00_on_actions.txt:4419`；`common/resolutions/00_resolutions.txt:13706`
- 已核对：入口 on_action、提名期延迟、候选判定与结果事件。
  Checked: entry on_actions, the nomination delays, candidate tests and result events.
- 更正：galcom.64 原为单独故事，与 62 共用 action.101，现并入。
  Correction: galcom.64 was a separate story sharing action.101 with 62; merged.
