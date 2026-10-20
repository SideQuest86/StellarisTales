# 原始星球：反外星人特遣队 / Pre-FTL Planet: Anti-Alien Task Force- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：前FTL文明已进入现代时代，觉醒度不低于“中”；观察站在首都且任务为“标本采集”（激进观察）；观察站主人非AI；每国一次。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Modern-era pre-FTL country with awareness at least medium, outpost on its capital running the specimen-collection mission, non-AI owner; once per country.

## 剧情脉络 Story outline

1. **反外星特遣队（1101）**：对方各国联合成立反外星特遣队 → 900–2700 天 → **1102 特遣队活动**：新建军事基地和雷达，削弱激进观察。/ A task force forms, then expands (1102).
2. 900–2700 天后三选一（各约 33%）：**1103 观察站被击毁**；**1104 特遣队解散**；**1105 外科打击**：A 启用项目“摧毁本土防卫部队”（需 1 艘运输舰）→ 成功 70% **1106**、失败 30% **1107**；B 不予理会 → 50% 1103 / 50% 1104（900–2700 天后）。/ Then the outpost is lost (1103), the task force disbands (1104) or a strike is offered (1105 → project → success 1106 70% / failure 1107 30%; declining → 1103 or 1104 at 50:50).

## 分支与结局 Branches and outcomes

1103 / 1104 / 1105 互斥；1106 / 1107 为项目的两种结果（70/30）。/ Exclusive; 1106/1107 are the 70/30 project results.

## 条件与文明差异 Conditions and variants

文本随观察站主人类型变化。/ Texts vary with the owner type.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/observation_events.txt:2728-3135` · `common/special_projects/00_projects_1.txt:3151-3175` · `common/on_actions/00_on_actions.txt:140-200`
- 已核对 Checked：根 observation.1100，1101–1107 脚本，项目 DEFENSE_FORCE_STRIKE_PROJECT，池权重。/ Root, scripts 1101–1107, project, pool weight.
- 审阅改动 Changes：结构与草稿一致；补充条件与权重。/ Structure matches; conditions and weights added.
