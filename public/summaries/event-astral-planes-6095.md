# 最后的逃亡者 / Final Escapee

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:5208–5393`（6095–6105）；`common/on_actions/00_on_actions.txt:5023–5026`
- 审阅 Reviewed：2026-10-13（全篇 whole story）

## 如何开始 How it starts

每次裂隙探索完成（`on_astral_rift_exploration_complete`），其 `random_events` 有 1/50 的机会触发隐藏事件 `astral_planes.6095`。条件：本国物种不是 Blorg 肖像（`fun12`），没有预设的 Blorg 国家（`prescripted_blorg`），全局标记 `mercedes_spawned` 未设。玩家必定得到后续事件；AI 要再过 1/21 的随机。全局只会发生一次。

Each completed rift exploration (`on_astral_rift_exploration_complete`) has a 1-in-50 chance in its `random_events` to fire hidden event `astral_planes.6095`. Conditions: the species is not the Blorg portrait (`fun12`), no prescripted Blorg country (`prescripted_blorg`) exists, and global flag `mercedes_spawned` is not set. A player always gets the follow-up; an AI must pass a further 1-in-21 roll. It happens once per game.

## 剧情脉络 Story outline

1. 最后的逃亡者（6100）：探球出来时，一个休眠的逃生舱跟在后面，发出简单的求救信号和实时视频。
2. 选择接通屏幕（→ 6105），或“这与我们无关”，或（狂暴灭绝者）拿来练靶。
3. 梅赛德斯·罗梅罗（6105）：Blorg 共同体的探险家与外交官，失去了与“朋友们”在天狼星附近交战之后的记忆；对人类的文化着迷（人类帝国看到另一段文字）。三次提问只是对话；最后可聘用或遣散。

1. Final Escapee (6100): coming out of the rift, a dormant escape pod trails the Sphere, sending a simple distress signal and a live video feed.
2. Take the call (→ 6105), or “This does not concern us”, or (homicidal empires) use it for target practice.
3. Mercedes Romero (6105): an explorer and diplomat of the Blorg Commonality who lost her memory after a fleet action near Antares; fascinated by human culture (human empires see another text). The three questions are dialogue only; in the end she can be hired or dismissed.

## 分支与结局 Branches and outcomes

- 无视 / 练靶：没有后续（练靶给小额凝聚力收入）。
- 聘用：一位不朽的 206 岁杰出级外交官员（Blorg 洞察、外交委员等特质），可与派系和选举有关（`event_leader = no`）。

- Ignore / target practice: nothing follows (target practice gives a small unity income).
- Hire: an immortal 206-year-old renowned diplomat official (Blorg Insight, diplomacy councillor traits) who may lead factions and win elections (`event_leader = no`).

## 条件与文明差异 Conditions and variants

- 6100 的“练靶”仅狂暴灭绝者可见；6105 的正文对人类物种有专属版本。
- 聘用会增加玩家的 `paragon_memory_vault` 变量（若已设置）。

- “Target practice” in 6100 is only shown to homicidal empires; 6105 has a dedicated text for human species.
- Hiring raises the player's `paragon_memory_vault` variable (if set).

## 审阅记录 Review notes

- 已核对：6095 / 6100 / 6105 与 `on_actions` 随机事件项；编译结构正确（图上的 p=0.05 与脚本不符：玩家为 1/50，AI 为 1/50 再乘 1/21）。

- Checked: 6095 / 6100 / 6105 and the `on_actions` random-event entry; the compiled structure is correct (the p=0.05 shown on the graph does not match the script: 1/50 for a player, 1/50 times 1/21 for an AI).
