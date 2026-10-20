# 联邦舰队 / The Federation Fleet
- 分类 Category：文明纪事 Society (C7) · 联邦（军事型）事件 federation (military) event

## 如何开始 How it starts

每五年国家脉冲池（权重 100/2335，`00_on_actions.txt:498`）。条件（`federations_events_2.txt:2429–2465`）：游戏已过 60 年；本方是**军事型联邦**的领袖，联邦等级≥2，近期（18000 天）没有联合演习，本方不在战争中且没有危机阵营存在；本方舰船>30，至少 3 个成员舰船>30，且有非游牧成员。/ Five-year country pulse. Needs a military federation leader (level ≥2) with >30 ships, ≥3 members with >30 ships, not at war, no crisis faction, no exercise in the last 18000 days.

## 剧情脉络 Story outline

1. **联邦舰队（100）**：A 提议联合军事演习 → 向每个联邦盟友发出 **101**（投票），90 天后隐藏事件 **102** 清点；B 作罢。/ Propose exercises (A) — allies vote in 101 — or not (B).
2. **清点**：通过 → **106 联合演习获批**（或 **105**，成员版），启用项目“联邦舰队演习”(military_joint_project，需 15 艘军舰，限时 2160 天)；否则 **103 / 104 联合演习失败**。/ Approved → 106 (105 for members) and the Federation Fleet Exercises project; else 103 / 104.
3. **项目**：准备完成 **108** → 全体就位 **109 联合军事演习开始**：目标（轻武装高机动）出现，30 天后 **113 训练目标被放走**；31 天后 **115 联合军事演习结束**（完全成功/部分成功/闹剧，取决于消灭目标的成员比例）。参与者击毁自己的目标时由 **112 目标成功消灭**（on_fleet_destroyed_perp）记功。联邦易主或成员退出 → **120**；战争爆发 → **121 演习取消**。/ The project then prepares (108), starts (109), targets are hunted (113/115 results) with 112 crediting kills; leaving the federation or war cancels it (120 / 121).

## 分支与结局 Branches and outcomes

103/104 与 105/106 互斥（按清点）；115 的三种结论按成功标志互斥。/ 103/104 vs 105/106 exclusive by the tally; 115 has three outcome texts.

## 条件与文明差异 Conditions and variants

条件基于联邦类型与舰队规模。/ Conditions depend on federation type and fleet size.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/federations_events_2.txt:2429-3700` · `common/special_projects/00_projects_federations.txt:860-900` · `common/on_actions/00_on_actions.txt:491-500`
- 已核对 Checked：100–121 的脚本，项目 military_joint_project，112 的 on_action 触发。/ Scripts 100–121, the project and the 112 on_action.
- 审阅改动 Changes：结构与草稿一致；补充条件与清点规则。/ Structure matches; conditions and tally added.
