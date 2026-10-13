# [From.GetSpeciesAdj]社会转变 / [From.GetSpeciesAdj] Societal Shift
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:5882-5928` · `common/on_actions/00_on_actions.txt:5096-5106` · `events/first_contact_dlc_situation_events.txt:189-212`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

社会引导/间谍行动影响下的前FTL文明，当首都人口伦理分歧>0.25 时，preftl.20 触发 on_pre_ftl_pop_ethic_shift 池（500 为无事，8 个转向各 5，`00_on_actions.txt:5096–5106`）。本事件（3142）要求该国原先**不是**排外，其观察站主人**是**排外，且不在 540 天的灌输冷却期。/ preftl.20 fires the pool (500 nothing, 8 shifts at 5 each) for pre-FTL countries under societal guidance when pop ethic divergence exceeds 0.25; this one needs a non-xenophobe country watched by a xenophobe outpost owner, outside the 540-day cooldown.

## 剧情脉络 Story outline

**[From.GetSpeciesAdj]社会转变**：隐藏事件 3142 使该国伦理转向排外，并设 540 天冷却；观察站主人收到通知事件 3143。/ Hidden 3142 shifts the country to xenophobe and starts a 540-day cooldown; the owner gets notification 3143.

## 分支与结局 Branches and outcomes

单事件通知。/ A single notification.

## 条件与文明差异 Conditions and variants

触发取决于观察站主人的伦理。/ Depends on the owner’s ethic.

## 审阅记录 Review notes

- 已核对 Checked：脚本触发、权重与冷却。/ Trigger, weight and cooldown.
- 审阅改动 Changes：原为 3138 等隐藏根+通知两页；现保留通知为文档、隐藏根折叠。/ The hidden root is folded into the notification.
