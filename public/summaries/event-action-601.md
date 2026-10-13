# 从天而降的死亡 / Death From Above

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/on_action_events_2.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

on_planet_bombarded（common/on_actions/00_on_actions.txt:2169）触发隐藏 action.601（events/on_action_events_2.txt:3039-3071）：被轰炸行星的拥有者非灭绝、非集体意识、非原始，轰炸方是玩家、非集体意识、非灭绝、非危机势力，且玩家可以更改“轨道轰炸接受投降”政策、尚未选择过。
Hidden action.601 fires on the first bombardment for a suitable human player.

## 剧情脉络 Story outline

action.600 “从天而降的死亡”：议会讨论“假设投降”的处理。选项 a 禁止投降（政策 orbital_bombardment_surrender_forbidden）/ b 允许投降（orbital_bombardment_surrender_allowed）；设政策冷却。
The council asks whether to forbid or allow surrender; either choice sets the policy.

## 分支与结局 Branches and outcomes

- a / b 互斥，选择后设置标记 picked_orbital_bombardment_policy_flag，之后不再出现。 Exclusive; shown once.

## 条件与文明差异 Conditions and variants

- 灭绝者的政策被锁定为“禁止”，因此不会触发。 Homicidal empires are locked to 'forbidden'.

## 审阅记录 Review notes

- 已核对 Checked：action.601 触发条件与 action.600 的政策效果。
