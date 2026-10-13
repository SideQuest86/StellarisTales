# 穿梭机坠毁在[pre_ftl_planet.GetName] / Shuttle Crash on [pre_ftl_planet.GetName]
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:1388-2250` · `events/observation_events.txt:1709-1751` · `common/special_projects/00_projects_1.txt:695-735` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：前FTL文明处于现代时代（核/原子时代以上）；观察站在首都，任务为被动观察；观察站主人非AI且尚未发生过本链（shuttle_intercepted）；未被禁用毁灭性随机事件。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Modern-era pre-FTL country, passive-observation outpost on its capital, non-AI owner without an earlier shuttle chain, devastating random events not blocked.

## 剧情脉络 Story outline

1. **穿梭机坠毁（201）**：我方的一架穿梭机被对方战机拦截击落；选项启用特殊项目“营救穿梭机幸存者”（需科学船+科学家，限时 1080 天）。/ A shuttle is shot down; the option starts the Rescue Shuttle Survivors project.
2. 项目成功 → **202 营救成功**（获得社会研究加成，观察站解锁）；失败 → **203 行动人员被俘**：隐藏随机三选一，延时 900–2700 天：**3210 灾难逼近**（对方文明处于原子/太空时代时才可能）、**208**（→ 209 新武器：被俘科学家为对方设计武器，对方获得科技）、**210**（→ 211 人质交易；亲异族者不会抽到）。/ Success → 202; failure → 203 and one of three late consequences.
3. **3210**：A 启用自毁 → 觉醒度100并破坏不干涉；B 听之任之 → 100 天后 **204**（隐藏）→ **205/206/207 核战争**三选一（约各 33%）。**211**：A/B 用 75 影响力换取人质（对方得到科技）；C 拒绝 → 20–30 天后 **212 人质被处决**（1800 天团结度减益）。/ 3210: self-destruct or let it happen (→ nuclear war variants); 211: pay 75 influence for the hostages or refuse (→ 212 executed).

## 分支与结局 Branches and outcomes

203 之后的三个结局互斥；205/206/207 为同一核战争的三个文本变体。/ Exclusive outcomes after 203; 205/206/207 are text variants of the nuclear war.

## 条件与文明差异 Conditions and variants

文本随观察站主人/前FTL类型变化；211 的付费选项分普通/格式塔两种。/ Text by owner and pre-FTL type; 211 has regular and gestalt paid options.

## 审阅记录 Review notes

- 已核对 Checked：根 observation.200，201–212、3210 脚本，项目 SHUTTLE_INTERCEPTED，池权重。/ Root, scripts, project and pool weight.
- 审阅改动 Changes：结构与草稿一致；补充了触发条件、权重与项目要求。/ Structure matched the draft; conditions, weights and project requirements added.
