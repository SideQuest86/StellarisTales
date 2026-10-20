# 舰队演习 / Fleet Maneuvers
- 分类 Category：文明纪事 Society (C7) · 外交事件 diplomatic event

## 如何开始 How it starts

随机事件（平均 320 个月一次）：游戏已过中期、本方是非附庸/非意识集合的普通国家，不在战争中，舰队实力>8000，有指挥官；边境某星系与一个有通讯、非同种族、非友好/保护/忠诚的邻国相邻；每国一次（fleet_exercise 标志，邻国 exercise_neighbor）。/ A random event (mean 320 months) for a non-gestalt, non-subject empire with fleet power > 8000 and a commander; needs a neighbouring country in contact that is not friendly, protected or loyal; once per country.

## 剧情脉络 Story outline

1. **舰队演习（1000）**：A 进行演习：按舰队实力启用特殊项目 FLEET_MANEUVERS_1/2/3（实力 1600–4000 / 4000–10000 / >10000）；B 取消（1800 天“演习取消”修正）。/ Run maneuvers (project tier by fleet power) or cancel.
2. 演习期间随机出现 **1011 碰撞 / 1012 损失舰船 / 1013 有前途的军官 / 1014 公众关注**（各 25%）；约 10–15 天后 **1006 [星系]的海军活动**（邻国视角）；项目成功 → **1025 演习结束**，对方收到 **1026**；失败 → **1001 演习取消**；约 60–90 天后邻国情报 **1020 → 1021 通讯 → 1022 / 1023 / 1024**（三选一对话）。/ Random incidents, the neighbour’s view (1006), success (1025 / 1026), cancel (1001) and a later diplomatic exchange (1020 → 1021 → 1022/1023/1024).

## 分支与结局 Branches and outcomes

1011–1014 互斥（各 25%）；1022/1023/1024 对应 1021 的三个选项。/ 1011–1014 exclusive (25% each); 1022–1024 are the three options of 1021.

## 条件与文明差异 Conditions and variants

项目档位随舰队实力；AI 倾向取决于相对实力与态度。/ Project tier by fleet power; AI choice depends on relative power and attitude.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/diplomatic_events_2.txt:13-1100` · `common/special_projects (FLEET_MANEUVERS_*_PROJECT)`
- 已核对 Checked：根 1000 触发条件与项目、各结果事件。/ Trigger, projects and result events.
- 审阅改动 Changes：结构与草稿一致；补充了触发条件。/ Matches; trigger conditions added.
- 不确定 Uncertain：各项目的成本与时限、1020–1024 对话的效果未逐项展开。 / Project costs and the 1020–1024 dialog effects were not expanded.
