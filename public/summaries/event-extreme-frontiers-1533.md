# 科伯恩公司无人机 / Drone of CoburnCorp

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Extreme Frontiers · 来源 Sources：`events/extreme_frontiers_events.txt:5111-5446`、`common/on_actions/00_on_actions.txt:1692`、`common/special_projects/05_projects_extreme_frontiers.txt:378-400` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

这是“地热辐射改造”遗址线（site-site-georadiation-terraforming，c2-precursors 负责）的一条支线：在 extreme_frontiers.1531“科伯恩公司无人机”对话中玩家选择“偷窃/战斗”（1531.e → 1531.i）或拒绝订阅（1531.g），隐藏的 extreme_frontiers.1532 会创建一支 GeoCorp 舰队。该舰队被毁时（on_fleet_destroyed_perp，common/on_actions/00_on_actions.txt:1692）隐藏事件 1533 在击杀者国家身上触发。

This is a branch of the Georadiation Terraforming site story (site-site-georadiation-terraforming, owned by c2-precursors): in the CoburnCorp dialogue extreme_frontiers.1531 the player picks theft/battle (1531.e then 1531.i) or refuses the subscription (1531.g), and hidden extreme_frontiers.1532 creates a GeoCorp fleet. When that fleet is destroyed (on_fleet_destroyed_perp, common/on_actions/00_on_actions.txt:1692) hidden 1533 fires on the killer.

## 剧情脉络 Story outline

1533（隐藏，extreme_frontiers_events.txt:5319-5346）要求 GeoCorp 国家存在、被毁方是它、被毁舰队带 geocorp_fleet 旗标，并在为此玩家生成的舰队被击毁时，1天后向该玩家发出 1534“科伯恩公司无人机”（无人机告别）。选项“好走不送”→ 1535“条款变更”（月度合金加成，启用后续项目 GEORADIATION_ANALYSIS_PROJECT_CONTINUED，并中止原分析项目）→ 项目完成 → 1540“未引爆的装置”。

1533 (hidden, extreme_frontiers_events.txt:5319-5346) needs the GeoCorp country to exist, to be the loser, and the destroyed fleet to carry geocorp_fleet; for the player the fleet was spawned for, it sends 1534 "Drone of CoburnCorp" one day later (the drone says goodbye). Its option leads to 1535 "Terms Modified" (monthly alloy bonus, enables GEORADIATION_ANALYSIS_PROJECT_CONTINUED and aborts the original analysis project) -> project completion -> 1540 "Undetonated Device".

## 分支与结局 Branches and outcomes

同一个 1535 也可由付款结局到达（1531.h，付3000能量），那条路径在 c2 的故事中；本故事只覆盖击毁舰队的结局。

The same 1535 is also reached by the paid ending (1531.h, 3000 energy), which is in the c2 story; this story only covers the destroyed-fleet ending.

## 条件与文明差异 Conditions and variants

1540 的正文对“无情工业家”国家有单独版本。

1540 has its own text for relentless-industrialist empires.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 未确定 Open: The story is the "battle" ending of the CoburnCorp dialogue extreme_frontiers.1531, which belongs to site-site-georadiation-terraforming (c2-precursors).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
