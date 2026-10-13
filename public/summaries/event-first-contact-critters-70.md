# 未知舰船 / Unknown Vessels
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（caravaneers_stage_1/2）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:890-1069` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:332-370`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

与商队（caravaneer_fleet / caravaneer_home）首次相遇，启动 caravaneers_stage_1（难度3）；同时按是哪一支商队安排 cara.1020 / 2020 / 3020 在 720（+0–360）天后触发。 / Meeting a caravaneer fleet or home starts caravaneers_stage_1 (difficulty 3); depending on the fleet, cara.1020 / 2020 / 3020 is also scheduled 720 (+0–360) days later.

## 剧情脉络 Story outline

1. **不明舰船（70）：看似远征队，反复广播；游牧与非游牧选项不同。→ 第二阶段（难度5）。 / Unknown Vessels.**
2. **商队（75）：解码出的信息竟是商业广告；若该国为商队母星则选项为“明白了”。 / The Caravaneers.**

## 分支与结局 Branches and outcomes

线性，无分叉。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 阶段检定失败时：每次失败有 1/20 的概率触发该阶段指定的随机事件池（同一站点 125 天内最多一次）。 / Linear. The ending options call finish_first_contact_effect (first contact ends). When a stage roll fails there is a 1-in-20 chance to draw from the stage’s random-event pool (at most once per 125 days per site). (pool: early_fc_random_events / late_fc_random_events)

## 条件与文明差异 Conditions and variants

70、75 的描述与选项随本方是否游牧、是否敌对而变。 / Text and options of 70 and 75 vary with nomadic status and attitude.

## 审阅记录 Review notes

- 已核对 Checked：70、75与两个阶段定义。/ Both events and stage definitions.
- 审阅改动 Changes：并 75 入本篇。/ 75 merged into this story.
