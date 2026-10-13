# 外交示好 / Diplomatic Overture
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card
- 来源 Sources：`common/missions/missions/02_contracts.txt:5413-5518` · `common/event_chains/00_event_chains_nomads.txt:97-102`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

不由其他帝国发布（potential_issuer = no）：游牧方舟抵达带有 diplomatic_envoy_target_system 标志的星系时，方舟事件 arkship.160 创建这份内部合同（`02_contracts.txt:5413–5440`）。 / Not issued by another empire (potential_issuer = no): when an arkship reaches a system flagged as a diplomatic-envoy target, arkship.160 creates this internal contract.

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 接受后创建“外交使节目标”兴趣点，并通知位于该星系的方舟。完成（前往目标帝国首都星系进行正式外交接触）后获得每月影响力（二级）与贸易（一级）加成，设置 arkship_diplomatic_envoy_completed，并使对方好感+50、信任+5。 / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. Accepting creates a point of interest and notifies arkships in the system. Completion (a formal diplomatic engagement in the target’s home system) gives monthly influence (tier 2) and trade (tier 1) bonuses, sets arkship_diplomatic_envoy_completed and raises the target’s opinion and trust.

## 分支与结局 Branches and outcomes

单线任务。 / A single task.

## 条件与文明差异 Conditions and variants

无。 / None.

## 审阅记录 Review notes

- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
