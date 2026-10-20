# 大翻修 / The Grand Refurbishment

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游牧帝国的方舟随机事件池 mobile_arkship_random_events（00_on_actions.txt:3979-4006，总权重460）；由隐藏事件 arkship.1（nomads_arkship_events.txt:7-49）定期调用：游戏前5年不会触发，之后每次约三分之一概率（无事则3–5年后再试；近期参战、或所有方舟都在战斗时概率为0），再从方舟殖民地中抽取一个（近期战斗/接受合同/刚发生过方舟事件的权重×0.1）触发该事件池（nomads_effects.txt:96-117）。
The nomad arkship random pool mobile_arkship_random_events (00_on_actions.txt:3979-4006, total weight 460) is drawn by hidden arkship.1 (nomads_arkship_events.txt:7-49): never in the first 5 years, afterwards about one try in three (retry in 3-5 years otherwise; zero during a recent war or while every arkship is fighting), then a random arkship colony (weights x0.1 after recent combat / contract / arkship event) fires the pool (nomads_effects.txt:96-117).
arkship.1300（lines 8335-8395，池中权重 20/460）：本方舟尚未进行大翻修、殖民地年龄 > 25、没有其他叙事情境运行。选项开始情境“大翻修”。
arkship.1300 needs an arkship colony older than 25 years, no running refurbishment and no other nomad narrative situation.

## 剧情脉络 Story outline

- 情境进度 0→200：采用“最小/标准/强化”三种方式（每月 +0.5 / +1.5 / +3，耗能量与合金）；每月事件可暂停进度。
  Progress runs 0 to 200 at +0.5 / +1.5 / +3 per month depending on the approach.
- 阶段一 发电机（0–50）→ 二 农业区（50–100，事件 1305）→ 三 防御区（100–150，事件 1310）→ 四 居住区（150–200，事件 1315）→ 完成（1380）。
  Stage 1 generators, 2 farming (1305), 3 defense (1310), 4 residential (1315), then completion (1380).
- 每月随机（50 无事，12 件各 10）：每个阶段只会发生其对应的三件之一，且进度需过阈值（15/65/115/165），每阶段至多一次：阶段一 1320 分配争执、1325 墙后之物、1330 干扰补贴；阶段二 1335 第二班、1340 导管故障、1345 重大隐患；阶段三 1350 首个区段上线、1355 维修清单、1360 回家；阶段四 1365 漫长的等待、1370 未经授权的改造、1375 最后一层甲板。
  Per-stage pools of three; each stage allows one interlude (flag), shown under its stage.

## 分支与结局 Branches and outcomes

- 各插曲的选项可“走捷径”（加进度、花资源，计入 refurbishment_corners_cut）或稳妥处理（减进度、增加士气修正）。
  Interlude options cut corners (+progress, resources, counted in refurbishment_corners_cut) or play safe (-progress, morale modifiers).
- 完工 arkship.1380 的正文随走捷径次数（0 / 1–2 / ≥3：圆满、部分、仓促）与帝国类型（普通、机械、蜂巢）变化，并提供发电机/区段等专精奖励选项。
  The completion text varies with how many corners were cut and with empire type; it offers specialisation rewards.

## 条件与文明差异 Conditions and variants

- 中途换主或所属国被消灭时情境中止并清理修正（on_abort，arkship.1450）。
  The situation aborts and cleans its modifiers if the arkship changes hands.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nomads_arkship_events.txt, common/situations/14_nomads_situations.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：arkship.1300-1380 的触发与选项（nomads_arkship_events.txt:8332-9708）、情境阶段与进度（14_nomads_situations.txt:1225-1448）。
- 更正 Corrections：阶段链 1305→1310→1315 本就正确（文件顺序即实际顺序）；原先 12 件每月随机事件全挂在情境下，现按其 current_stage 限制挂到对应阶段。
  The stage chain was correct; the 12 monthly pool events were all under the situation and are now placed under their stages.
