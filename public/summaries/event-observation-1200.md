# [pre_ftl_planet.GetName]：植入体功能失常 / [pre_ftl_planet.GetName]: Implant Malfunctions
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:3137-3430` · `common/on_actions/00_on_actions.txt:140-200`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

所有观察事件共用的入口：前FTL文明的“科技进度”情境事件 preftl.50 每次检查时（该情境 1800 天内没有观察事件、也没有正在进行的观察事件链），触发 on_monthly_pulse_pre_ftl_observation 随机池（`00_on_actions.txt:140–200`，池内总权重 2860）；“破碎枷锁”起源观察自己的原文明时改用较小的池（`:205–220`，总权重 830）。进入各事件前，各事件自身的隐藏根事件还要检验条件（观察站任务、时代、AI/格式塔等）。本事件权重 50（破碎枷锁池同样 50）。根事件条件：前FTL文明是常规文明；观察站在首都，任务为“标本采集”；观察站主人非AI，且未对该国进行过脑植入（brain_implants 关系标志）。 / Shared entry: each time the pre-FTL country’s tech-progress situation runs preftl.50 (no observation event in the last 1800 days and none ongoing), it fires the on_monthly_pulse_pre_ftl_observation pool (00_on_actions.txt:140–200, total weight 2860; Broken Shackles empires watching their old civilisation use a smaller pool, :205–220, total 830). Each hidden root event then checks its own conditions (outpost mission, era, AI / gestalt). Weight 50 (same in the Broken Shackles pool). Root conditions: Regular pre-FTL country, outpost with the specimen-collection mission, non-AI owner who has not implanted this country before.

## 剧情脉络 Story outline

1. **植入物故障（1201）**：观察站的绑架队给若干本地人植入了脑植入物，出现故障。A 清理烂摊子（启用项目“移除故障植入物”）；B 不管 → 900–2700 天后（50%）**1205 植入物被接纳**。/ Brain implants malfunction: clean up (project) or ignore.
2. 项目成功 → **1202 植入物已移除**；失败 → **1203 植入物未移除**，此后 50% **1205**（植入物被本地人研究并接纳）。/ Success → 1202; failure → 1203 and a 50% chance of 1205.

## 分支与结局 Branches and outcomes

1202 / 1203 为项目的两种结果；1205 为“无视”与“失败”两条路共有的后续。/ 1202/1203 are the project outcomes; 1205 is the shared late consequence of ignoring or failing.

## 条件与文明差异 Conditions and variants

文本随前FTL类型。/ Texts vary with the pre-FTL type.

## 审阅记录 Review notes

- 已核对 Checked：根 1200 与 1201–1205。/ Root 1200 and 1201–1205.
- 审阅改动 Changes：结构与草稿一致。/ Matches the draft.
