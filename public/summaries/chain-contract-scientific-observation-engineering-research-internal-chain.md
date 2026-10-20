# $contract_scientific_observation_internal$ / $contract_scientific_observation_internal$
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card

## 如何开始 How it starts

内部合同（potential_issuer = no）：游牧船队在某星系发现可进行工程研究观测的目标时由内部事件创建；接受后在带有 contract_planet_scientific_observation_engineering_research_internal 标志的行星上启用特殊项目 CONTRACT_SCIENTIFIC_OBSERVATION_ENGINEERING_RESEARCH_INTERNAL_PROJECT。 / An internal contract (potential_issuer = no) created by nomad events when a scientific-observation target exists; accepting enables the matching special project on the flagged planet.

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 成功奖励：工程研究 300。（卡片标题的本地化键 $contract_scientific_observation_internal$ 在中英文中都没有被解析，游戏内显示为原始键，审阅注。） / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. Success: 300 engineering research. (The card title uses the unresolved localisation key $contract_scientific_observation_internal$ in both languages — a game text bug, noted.)

## 分支与结局 Branches and outcomes

单线任务。 / A single task.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`common/inline_scripts/contracts/ScientificObservationInternal.txt` · `common/missions/missions/02_contracts.txt:3730-3745` · `common/event_chains/00_event_chains_nomads.txt:184-200`
- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
