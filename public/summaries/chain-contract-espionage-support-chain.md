# 合约：谍报支援 / Contract: Espionage Support
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card

## 如何开始 How it starts

游牧帝国接受“间谍支援”合同（四档：`contract_espionage_support` 与 `_2/_3/_4`，费用 500/1000/1500/2000，接受期 1800 天）：发布者是非游牧帝国，目标星系属于另一个拥有不超过 3 颗行星的帝国，发布者需有以该国为目标的间谍网任务。 / A nomadic empire accepts the Espionage Support contract (four tiers: cost 500 / 1000 / 1500 / 2000) issued by a non-nomadic empire with a spy network on a small neighbour that owns the target system.

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 接受后在目标星系的一颗殖民地上启用三个特殊项目之一：间谍卫星（01）、物资走私（02）、星基渗透（03），每个项目完成使间谍计数器 +1；项目失败则合同失败。成功奖励：按档位 10/20/30/40 点对目标国情报，缩放的贸易 1750 与影响力 35，发布者好感+100、信任+10，并触发 nomads.3002。 / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. On acceptance one of three special projects is enabled — Spy Satellite (01), Supplies Smuggling (02) or Starbase Infiltration (03); each completion raises the espionage counter, a failed project fails the contract. Success: intel 10/20/30/40 by tier, scaled trade 1750 + influence 35, opinion +100, trust +10.

## 分支与结局 Branches and outcomes

单线任务（项目三选一由合同变体决定）。 / A single task; the project is chosen by the contract variant.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`common/missions/missions/02_contracts.txt:224-864` · `common/event_chains/00_event_chains_nomads.txt:376-380` · `common/special_projects/06_projects_nomads.txt:1048-1230`
- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
- 不确定 Uncertain：合同变体与三个项目的对应关系只读取了接受时的效果。 / The mapping of variants to projects was only read from the on_accept effects.
