# 走私贩哨站 / Smuggler Outpost
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:2255-2445` · `common/special_projects/00_projects_1.txt:2784-2810` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：常规前FTL文明，非和平主义者，中世纪或维多利亚时代；观察站在首都（被动观察），主人非AI、非格式塔；主人有一颗犯罪度≥10 的星球。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Regular non-pacifist pre-FTL country in the medieval / Victorian era; passive-observation outpost owned by a non-AI non-gestalt empire that has a planet with crime ≥ 10.

## 剧情脉络 Story outline

1. **走私者前哨（301）**：观察站发现表面有非法定居点；唯一选项启用特殊项目“突袭走私者基地”（需 1 艘运输舰，60 天，限时 1080 天），觉醒度 +30 并违反不干涉。/ The outpost finds an illegal settlement; the option starts the raid project.
2. 成功 → **302 突袭走私者**；失败 → **303 走私者武器交易**。/ Success → 302; failure → 303.

## 分支与结局 Branches and outcomes

302 / 303 为项目的成功/失败。/ Project success/failure.

## 条件与文明差异 Conditions and variants

无文明差异。/ No variants.

## 审阅记录 Review notes

- 已核对 Checked：根 300、301、302、303 与项目。/ Root, events and project.
- 审阅改动 Changes：结构与草稿一致。/ Matches.
