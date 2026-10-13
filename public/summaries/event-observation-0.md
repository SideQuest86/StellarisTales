# 小行星正在接近[pre_ftl_planet.GetName] / Asteroid Approaching [pre_ftl_planet.GetName]
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:19-380` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：前FTL文明首都不是人造天体、没有异常或陨石坑；全球在过去 50 年内没有目击小行星事件，或本方有观察站/游牧哨站；有观察站时任务须为被动观察；未被禁用毁灭性事件。每国一次。没有任何观察者时，根事件改发隐藏事件 observation.1（75%无事、25%撞击、5%成功拦截），不出现可见事件。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Capital not artificial, no anomaly or impact crater; no asteroid sighting in the last 50 years globally unless we have an outpost or a nomad waystation; passive-observation mission if an outpost exists; once per country. Without any observer the root fires the hidden observation.1 instead (75% nothing / 25% impact / 5% interception).

## 剧情脉络 Story outline

1. **小行星逼近（2）**：观察站（或游牧哨站）发现一颗 4 级小行星正飞向前FTL世界；观察站被锁定。小行星抵达时隐藏随机：75% 进入隐藏事件 3；25% **5 观察站被摧毁**（科学家驾驶观察站撞向小行星，觉醒度+5、拆除观察站、违反不干涉；无观察站时为0，排外者×0.1）；5% **10 小行星被转移**（对方向小行星发射核导弹，需原子/太空时代；洞察+10、觉醒+10）。/ An asteroid heads for the planet; when it arrives a hidden roll gives 75% hidden 3, 25% the outpost sacrifices itself (5), 5% the natives deflect it with missiles (10).
2. 隐藏事件 3：若该星球仍由原始文明拥有 → **4 小行星撞击**（毁灭性撞击；解锁观察站）；否则（已成为殖民地）→ **colony.183**。/ Hidden 3: still a primitive world → 4 (impact), otherwise the colony version colony.183.

## 分支与结局 Branches and outcomes

2 之后三个结局互斥：撞击（4 或 colony.183，总概率约 71%）/ 观察站撞毁（5）/ 核导弹转移（10）。若玩家舰队在抵达前击毁小行星，则触发 observation.6（见 event-observation-6）。/ Impact (4 or colony.183), outpost sacrifice (5) and missile diversion (10) are exclusive; destroying the asteroid in time fires observation.6.

## 条件与文明差异 Conditions and variants

撞击地点变体 colony.183 属于殖民地版本；观察者可以是游牧哨站。/ colony.183 is the colony-side version; the observer may be a nomad waystation.

## 审阅记录 Review notes

- 已核对 Checked：根 observation.0、1、2、3、4、5、10 的脚本及舰队创建逻辑。/ Roots 0–5 and 10.
- 审阅改动 Changes：编译草稿结构已核对；补充触发条件与隐藏分发事件。/ Structure confirmed; trigger conditions and hidden dispatchers documented.
