# 看守者的任务 / Tasks of the machine Custodian

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/fallen_machine_empire_events.txt, common/event_chains/00_fallen_empire_chains.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

机械堕落帝国（看守者项目）存在且与你已通讯、对你“神秘莫测”时，隐藏事件 fallen_machine_empire.10 / 20 / 30 / 40 / 50 / 60 / 70 按各自的平均时间和条件向你下达任务（一次一个；fe_task_given 标记）。
While a machine Fallen Empire (the Custodian Project) is in contact and enigmatic to you, hidden events 10 / 20 / 30 / 40 / 50 / 60 / 70 hand out tasks on their own timers (one at a time).

## 剧情脉络 Story outline

- 任务一 接种（11；非机械的生物帝国，MTTH 100 年，events/fallen_machine_empire_events.txt:196-328）：a 接受（压抑民意修正，排外者另一版本；对方好感提升）/ b·c 拒绝（对方好感下降）。接受后约 10 年出现 12 不良变异 或 13 良性接种。
  Task 1 inoculations -> 12 or 13 ten years after accepting.
- 任务二 代码重写（21；机械/合成帝国，MTTH 100 年）：接受 → 22 严重缺陷（3600天）或 23 永久提升。
  Task 2 code rewrite -> 22 or 23.
- 任务三 提供工人单位（31；机械帝国，MTTH 50 年）：a 交出 100 个机械人口（对方好感提升）/ b 拒绝。 单页。 Task 3 worker units: hand over pops or refuse; single event.
- 任务四 攻击指定帝国（41；MTTH 100 年，机械帝国减半）：a 接受 → 事件链“任务：攻击…”，全局同时一个，7200 天期限 → 42 成功（与目标交战）/ 43 超时失败 / 隐藏 44 无效；b 拒绝。
  Task 4 attack: accept to open a chain with a 7200-day timer -> 42 success / 43 timeout.
- 任务五 殖民行星（51；MTTH 200 年）：a 接受 → 事件链“任务：殖民…”→ 52 成功（人口>400）/ 53 失败 / 隐藏 54；b 拒绝。 Task 5 colonize.
- 要求一 停止侵略战争（61；曾拒绝/失败或灭绝类政体才会被提出，MTTH 100 年）：a 接受 → 事件链“服从：不得发动侵略战争”→ 7200 天内 62 遵守 / 63 违反（激怒）。 Demand 1 no wars -> 62 / 63.
- 要求二 停止殖民（71；条件同上）：→ 事件链“服从：不得殖民”→ 3600 天内 72 遵守 / 73 违反。 Demand 2 no colonies -> 72 / 73.

## 分支与结局 Branches and outcomes

- 每个任务内的结果互斥（见分组）；任务本身是否出现由各自的标记（fe_machine_task_N、fe_task_given 等）和全局“同类任务进行中”标记控制。
  Outcomes within a task are exclusive; whether a task appears is governed by per-task flags.
- 对方好感（opinion_accepted / refused / completed / failed_fallen_empire_task）与之后的要求联动：拒绝或失败过任务、或自身是灭绝类政体，才会被提出要求一/二。
  Refusing or failing earlier tasks (or a purifier-type civic) leads to the demands.

## 条件与文明差异 Conditions and variants

- 任务一仅非机械的生物帝国；任务二机械/合成；任务三机械；任务四五与要求一二针对非机械玩家帝国（任务四五不适用于灭绝类政体）。
  Tasks differ by empire type (organic / synthetic / machine).

## 审阅记录 Review notes

- 已核对 Checked：fallen_machine_empire.10-74 的触发、选项、计时与结果；事件链定义（common/event_chains/00_fallen_empire_chains.txt）。
- 更正 Corrections：十九个单页故事（含四个只有链概览页的）并为一个“看守者的任务”，每个任务内的任务→结果按顺序连接；觉醒/关闭（fallen_machine_empire.1-4）属于“应急预案”故事。
  Nineteen one-card stories are merged; the awakening/shutdown events 1-4 belong to the Contingency story.
