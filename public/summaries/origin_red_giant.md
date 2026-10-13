# 红巨星 / Red Giant

- 分类 Category：起源 Origins · DLC：Infernals Species Pack · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/infernals_1_events.txt:5-143, 750-2075, 4409-5756`、`events/origin_events_infernal.txt`、`common/situations/13_infernal_situations.txt:1-499`、`common/special_projects/00_projects_infernals.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

开局事件 infernals.10 把母星所在恒星设为“不稳定红巨星”，并在 45 天后触发 infernals.45“令人担忧的趋势”，开始局势“红巨星膨胀”与事件链。
At game start infernals.10 makes the home star an unstable red giant and fires infernals.45 *Concerning Trends* 45 days later, starting the *Red Giant Expansion* situation and the event chain.

## 剧情脉络 Story outline

1. **膨胀局势**：进度 0–1500 分五个阶段；阶段2 → 65（选择项目“保护母星”或“热能利用”），阶段3 → 70，阶段4 → 75。每月检查 85 → 调查进度≥8 时 95“恒星隧穿” → 项目“三角测量”三次 → 105 / 110 / 115。
   **Expansion situation**: five stages; stage 2 -> 65 (choose a project), stage 3 -> 70, stage 4 -> 75; monthly check 85 -> 95 *Stellar Tunneling* -> three triangulations 105 / 110 / 115.
2. **结局**：进度满 → 50“恒星新星”（隐藏 9000–9002 为爆炸画面）→ 51；进度归零 → 60“恢复正常”；二者之后 12 个月出现 2160“危机的火花”。
   **Ending**: full progress -> 50 Stellar Nova; progress 0 -> 60 Return to Normal; both lead to 2160 twelve months later.
3. **露丝矿站**：第三次三角测量 115 生成矿站与守卫；击毁守卫 → 2151“神秘空间站”→ 项目“紧急异语学”（2125 外星谈判）或“登上空间站”（2115 登船队）→ 2130 / 2131 / 2135 → 24 个月后 2140“稳定的前景”→ 2145“达成稳定”。
   **The lusus station**: 115 spawns a mining station and guards; destroying them -> 2151 -> project Parlay (2125) or Board the Station (2115) -> 2130 / 2131 / 2135 -> 2140 -> 2145.

## 分支与结局 Branches and outcomes

- 局势两个结局 50 / 60 互斥；矿站线结局 2145。 Situation endings 50 / 60 are exclusive; the station line ends at 2145.

## 条件与文明差异 Conditions and variants

2115 有七个选项，随科技、道德而变。 2115 has seven options that depend on ethics and techs.

## 审阅记录 Review notes

- 已核对 Checked：infernals.9000–9002、45–160、2105–2160 及局势、项目。 Events and the situation.
- 更正 Corrections：此前树内只有起源卡——在 origin-families.json 中补上 infernals.45–160 与 2105–2160 的范围；剔除通用的熔岩漩涡异常；补充 115 → 2151 / 2121 连接、局势结果互斥组、阶段并列。
  Previously only the card was in the tree; added the missing event ranges, excluded the generic Lava Whirlpool anomaly, added the 115 -> 2151 / 2121 links, the outcome group and stage states.
- 不确定 Uncertain：2115 / 2125 的选项后续取自编译树。 Option follow-ups of 2115 / 2125 from the compiled tree.
