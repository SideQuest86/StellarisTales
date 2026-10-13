# [pre_ftl_planet.GetName]上的思潮变化 / Ethical changes on [pre_ftl_planet.GetName]
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:4671-5761` · `common/on_actions/00_on_actions.txt:563-575`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

五年一次的“前FTL科技事件”池（on_five_year_random_pulse_pre_ftl_tech_events，由 action.630 触发，`00_on_actions.txt:563–575`；池内 200 为无事件，7 个事件各 10）。其中 **observation.2029**（权重 10）是“伦理考量”的守门员：只在存在被我方“社会启蒙”或被间谍行动盯上的前FTL国家时才通过（`observation_events.txt:4671–4690`）。/ Part of the five-year pre-FTL tech pool; 2029 is a hidden gatekeeper that only passes when a pre-FTL country is under societal enlightenment or targeted by espionage.

## 剧情脉络 Story outline

守门员 2029 随机选一个目标国，然后在 14 个子事件里等概率抽一个（已有对应伦理的国家权重 ×0.5）：/ It picks a target country and draws one of 14 sub-events (×0.5 if the target already holds the relevant ethic):
- **2030–2037 伦理变化**：排外→亲异族（2030，直接转变）；绽放的亲异族 / 和平主义 / 军国主义 / 威权 / 平等 / 唯物 / 灵性（2031–2037，75% 普通 / 25% 狂热）。/ Ethic shifts.
- **2038–2043 科技发展：挫折**：对立伦理冲突（和平主义者启蒙军国主义者等），使其科技进度 −384，需要“开放科技启蒙”且情境进度>400。/ Opposing-ethics clashes setting tech progress back.

## 分支与结局 Branches and outcomes

14 个子事件互斥；每个国家每种变化一次（development 标志）。/ The 14 sub-events are mutually exclusive; each change is once per country (development flags).

## 条件与文明差异 Conditions and variants

各子事件有自己的触发条件（目标国的伦理与启蒙状态）。/ Each sub-event checks the target’s ethics and enlightenment status.

## 审阅记录 Review notes

- 已核对 Checked：守门员 2029 与 2030–2043 的触发、效果与池。/ Gatekeeper and all sub-events.
- 审阅改动 Changes：将 14 个并列入口标为互斥组，并写明守门员。/ The 14 parallel entries are annotated as one exclusive group behind the gatekeeper.
