# 外交支持 / Diplomatic Support
- 分类 Category：文明纪事 Society (C7) · 游牧者合同的追踪卡片 Nomads contract tracking card
- 来源 Sources：`common/missions/missions/02_contracts.txt:1480-1758` · `common/event_chains/00_event_chains_nomads.txt:436-440`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

游牧帝国接受“外交支持”合同（费用 500）：发布者是与我方有通讯、不处于战争/敌对/内向、非游牧、非灭绝倾向的普通帝国；同一时间只能进行一个（country flag diplomatic_support_contract_active）。 / A nomadic empire accepts the Diplomatic Support contract (cost 500) from a regular non-nomadic empire in contact; only one at a time.

## 剧情脉络 Story outline

事件链“卡片”本身没有事件：它由合同（任务）的 on_accept 里的 begin_event_chain 创建，只用于在情境日志（合同分类）里显示图标、标题与说明，合同完成/中止时由 on_stop 里的 end_event_chain 结束。 接受后在发布者首都设置“送达”星球，在另一国首都设置“接送”星球并创建兴趣点；运送使节往返。成功奖励：按合同缩放的贸易 1750 与团结度 350，影响力，发布者好感+50、信任+5，并触发 nomads.3002。 / The event-chain card contains no events: the contract’s on_accept calls begin_event_chain, the card only shows icon, title and description in the situation log (contracts category), and on_stop calls end_event_chain. On acceptance the issuer’s capital becomes the drop-off and the other empire’s capital the pick-up (with a point of interest). Success: scaled trade 1750 + unity 350, influence, opinion +50 and trust +5, nomads.3002.

## 分支与结局 Branches and outcomes

单线任务。 / A single task.

## 条件与文明差异 Conditions and variants

无。 / None.

## 审阅记录 Review notes

- 已核对 Checked：合同定义（触发、接受时的效果、成功奖励）与事件链卡片定义。/ Contract definition (issuer, on_accept, rewards) and the chain card.
- 审阅改动 Changes：结构无改动（单卡片）；补充了合同来源与奖励。/ No structural change; contract origin and rewards added.
