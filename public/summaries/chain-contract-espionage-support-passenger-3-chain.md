# 突发线索 / Dead Drop
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card

## 如何开始 How it starts

“永恒巡游”（Forever Cruise）船上的内部合同：由巡游船的 乘客 发布（potential_issuer = no），目标星系须可到达；接受时开始本事件链，并在目标星系一颗殖民地上启用特殊项目 CONTRACT_ESPIONAGE_SUPPORT_passenger_3_PROJECT（`EspionageSupportCruise.txt`，接受期 1800 天）。 / An internal contract of the Forever Cruise: issued by the cruise’s passenger, target system reachable; accepting starts this chain and enables the project CONTRACT_ESPIONAGE_SUPPORT_passenger_3_PROJECT at a colony in the target system (EspionageSupportCruise.txt, 1800 days to accept). / 

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 成功奖励：按巡游合同缩放的贸易 2500，提高乘客满意度，并触发 nomads.3003。 取消合同会触发 aborted_passenger_contract_effect 并终止项目。 / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. Success: scaled cruise trade reward 2500, higher passenger satisfaction, nomads.3003. Cancelling runs aborted_passenger_contract_effect and aborts the project.

## 分支与结局 Branches and outcomes

单线任务。 / A single task.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`common/missions/missions/02_contracts.txt:4620-4658` · `common/inline_scripts/contracts/EspionageSupportCruise.txt` · `common/event_chains/00_event_chains_nomads.txt:346-375`
- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
- 不确定 Uncertain：项目 CONTRACT_ESPIONAGE_SUPPORT_passenger_3_PROJECT 由内联脚本生成，其具体目标（卫星/代表团等）未逐项展开。 / The generated project’s specific task was not expanded.
