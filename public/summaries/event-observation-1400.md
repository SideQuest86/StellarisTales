# 原始星球上的核战迫在眉睫 / Nuclear Escalation on a Pre-FTL Planet- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 5（破碎枷锁池同样 5）。根事件条件：前FTL文明处于原子或早期太空时代；本方有观察站，或全球 50 年内没有核战争标志；首都不是人造天体；每国一次。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 5 (same in the Broken Shackles pool). Root conditions: Atomic or early-space-age pre-FTL country; we have an outpost on the capital or no nuclear war flag exists globally; capital not artificial; once per country.

## 剧情脉络 Story outline

隐藏根 1400：
- **没有观察站**：全球设置核战争标志 50 年；隐藏随机 500（无事，和平主义者 ×2）：5 / 5 / 200 → 1401 / 1403 / 1405（对方自行核战；1405 另可使其退回石器时代）。
- **有观察站**：观察站主人收到 **3215 核升级**：A 秘密渗透并缓和（违反不干涉）；B 无需继续间谍 → 50:50:200 抽取 **1402 / 1404 / 1406 陷入核战争**（非军国者前两项 ×0.5）。/ Without an outpost the war may break out unseen; with an outpost the owner gets 3215 and may de-escalate or let one of the three nuclear-war results (1402/1404/1406) happen.

## 分支与结局 Branches and outcomes

1402 / 1404 / 1406 是同一核战争的三种强度/文本变体（约 1:1:4）。3215.A 阻止核战争。/ 1402/1404/1406 are variants (≈1:1:4); 3215.A prevents the war.

## 条件与文明差异 Conditions and variants

正文分普通/蜂巢观察者与前FTL类型。/ Text by observer type and pre-FTL type.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/observation_events.txt:3644-4105` · `common/on_actions/00_on_actions.txt:140-200`
- 已核对 Checked：根 1400、1401、3215、1402。/ Root 1400, 1401, 3215, 1402.
- 审阅改动 Changes：结构与草稿一致；说明隐藏根的两条路。/ Structure matches; the two hidden-root paths documented.
