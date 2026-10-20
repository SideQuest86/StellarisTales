# 殖民地启动 / Colony Startup
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card

## 如何开始 How it starts

游牧帝国接受“殖民地起步”合同（`contract_colony_startup`，费用 500，接受期 1800 天）：发布者是拥有该星系的非游牧帝国，且星系内有一颗殖民不满 10 年、未受游牧支援的殖民地（`02_contracts.txt:3320–3410`）。 / A nomadic empire accepts the Colony Startup contract (cost 500, 1800 days to accept) issued by a non-nomadic owner of the system that has a colony younger than 10 years without nomad support.

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 接受后在目标殖民地启用特殊项目 CONTRACT_COLONY_STARTUP_PROJECT。成功奖励：按合同缩放的贸易 750 与社会研究 150，加影响力，发布者好感+50、信任+5，并触发 nomads.3002。 / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. On acceptance the special project CONTRACT_COLONY_STARTUP_PROJECT is enabled on the colony. Success: scaled trade 750 + society research 150, influence, issuer opinion +50 and trust +5, and nomads.3002.

## 分支与结局 Branches and outcomes

单线任务：项目完成即成功；中止或目标不可达则失败（abort_trigger）。 / A single task: completing the project succeeds; aborting or an unreachable target fails.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`common/missions/missions/02_contracts.txt:3320-3493` · `common/event_chains/00_event_chains_nomads.txt:490-500` · `common/special_projects/06_projects_nomads.txt:1327`
- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
