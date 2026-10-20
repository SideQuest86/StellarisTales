# 联邦团结暨领导力盛典 / A Celebration of Unity and Leadership
- 分类 Category：文明纪事 Society (C7) · 联邦（霸权型）事件 federation (hegemony) event

## 如何开始 How it starts

每五年国家脉冲池（on_five_year_random_pulse_country，权重 100/2335，`00_on_actions.txt:497`）。条件（`federations_events_2.txt:887–935`）：游戏已过 60 年；本方是**霸权型联邦**（hegemony_federation）的领袖，联邦等级≥2；联邦近期（18000 天）没有举行过联合行动、也没有成功的联合行动记录；至少有 2 个其他成员能让建造船或民用舰队进入我方首都星系。/ Five-year country pulse (weight 100 of 2335). Needs: >60 years, leader of a hegemony federation of level ≥2, no recent joint operation, and at least two other members able to reach our capital system.

## 剧情脉络 Story outline

1. **团结与领导的庆典（50）**：领袖按自己的狂热伦理（军国/和平/排外/亲异/唯物/灵性/平等，否则威权）设定“霸权理念”。A 提出联合行动：向每个能到达的联邦盟友发出 **51**（投票事件），90 天后触发隐藏事件 **52** 清点；B 作罢。/ The leader proposes a joint operation (A) — every reachable ally gets the vote event 51 — or drops it (B).
2. **52 清点**：赞成票≥2 且不少于反对票 → 领袖收到 **55 联合行动获批**，成员收到 **56**；否则 **53 联合行动失败**（领袖：联邦凝聚力 −100、影响力 −50）与成员的 **54**（凝聚力 −100 的通知）。/ The tally: at least two yes votes and yes ≥ no → 55 for the leader, 56 for members; else 53 / 54 (cohesion −100, leader −50 influence).
3. **55 / 56 获批**：领袖启用项目“文化调整”(hegemony_joint_project_leader，180 天、限时 3600 天，需科学船)；成员启用“对强大领导的纪念碑”(hegemony_joint_project_member，360 天，需建造船)。项目事件链 hegemony_joint_project_chain。/ The leader runs Cultural Adjustment (science ship), members raise the Monument (constructor).
4. **结果**：领袖的项目完成 → **57 / 58 代表团建立**（对成员的代表团）；成员完成 → **59–62 纪念碑完成**（按联邦标志、成败程度不同的文本）；联邦领导变更或成员退出 → **70 / 71 / 72 纪念碑取消**。/ Results: delegations (57/58), monument complete variants (59–62), or cancellations when leadership or membership changes (70/71/72).

## 分支与结局 Branches and outcomes

51 的赞成/反对决定 52 的分支；55/56 与 53/54 互斥。纪念碑完成的四种文本由 hegemony_joint_operation_* 联邦标志（完全成功/部分成功/部分失败/完全失败）决定。/ The votes decide 52; 55/56 and 53/54 are exclusive; monument texts depend on the joint-operation success flags.

## 条件与文明差异 Conditions and variants

霸权理念随领袖狂热伦理而异；AI 在领袖不是威权时倾向于不提议。/ The hegemony ethos depends on the leader’s fanatic ethic.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/federations_events_2.txt:887-2430` · `common/special_projects/00_projects_federations.txt:455-640` · `common/on_actions/00_on_actions.txt:491-500`
- 已核对 Checked：50、51、52、53、54、55、56 的脚本，两个联邦项目，纪念碑/代表团事件的触发。/ Scripts of 50–56, both federation projects, and monument/delegation triggers.
- 审阅改动 Changes：结构与草稿一致；补充了触发条件、投票规则与失败路径。/ Structure matches the draft; trigger conditions, voting rule and failure path added.
- 不确定 Uncertain：57–62 的文本变体取决于联邦标志，只读取了触发条件，没有逐条展开。 / The 57–62 text variants depend on federation flags and were not expanded line by line.
