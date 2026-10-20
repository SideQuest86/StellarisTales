# 研究提议 / Research Proposal
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：观察站在首都，任务为“标本采集”；观察站主人是常规帝国、非AI，且还未发生过研究提议。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Outpost with the specimen-collection mission owned by a regular non-AI empire that has not had a research proposal.

## 剧情脉络 Story outline

1. **研究提议（1501）**（0–25 天后弹出）：观察站请求一艘科学船来采集标本。A 同意 → 启用项目“探测外星人”；B 拒绝 → 观察站恢复被动观察，并记下“拒绝探测”标志。/ The outpost asks for a science ship: accept (project) or decline (back to passive observation).
2. 项目完成 → **1502 特殊项目完成**。/ The project completes → 1502.

## 分支与结局 Branches and outcomes

线性。/ Linear.

## 条件与文明差异 Conditions and variants

无文明差异。/ No variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/observation_events.txt:4108-4253` · `common/on_actions/00_on_actions.txt:140-200`
- 已核对 Checked：根 1500、1501、1502。/ Root and both events.
- 审阅改动 Changes：结构与草稿一致。/ Matches.
