# [pre_ftl_planet.GetName]：思潮更迭 / [pre_ftl_planet.GetName]: Ethic Changes
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:3432-3642` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 25（破碎枷锁池同样 25）。根事件条件：常规前FTL文明；观察站在首都，任务为“标本采集”（激进观察）；每个国家 20 年内一次。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 25 (same in the Broken Shackles pool). Root conditions: Regular pre-FTL country, outpost on the capital with the specimen-collection mission; once per 20 years.

## 剧情脉络 Story outline

隐藏根 1300 在 4 个方向中随机选择（各 25%；若对方已具备该伦理则该方向为 0）：排外 / 亲异族 / 灵性 / 唯物（机械主义者起源不会得到灵性）。**1301 伦理变化**按所选方向显示正文，唯一选项使该国转向该伦理，觉醒度 +10，并构成违反不干涉的行为。/ The hidden root picks one of four directions; 1301 shows the matching text and shifts the country’s ethics (+10 awareness, non-interference breach).

## 分支与结局 Branches and outcomes

单事件，四个文本方向互斥。/ One event with four exclusive text directions.

## 条件与文明差异 Conditions and variants

正文四种；机械主义者起源不会变灵性。/ Four text variants; Mechanists never turn spiritualist.

## 审阅记录 Review notes

- 已核对 Checked：根 1300 的随机、1301 的 switch。/ The root’s random list and 1301’s switch.
- 审阅改动 Changes：无结构改动。/ No change.
