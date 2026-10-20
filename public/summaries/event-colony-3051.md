# 恶魔入侵 / Daemonic Incursion

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链的结局 colony chain ending

## 如何开始 How it starts

前因位于另一个故事（“传送门” colony.3005，目前在 event-enclave-300）：传送门研究可能通向地狱般的维度（3006）；“毒性骑士”起源可以派一位骑士进入。3600–4500 天后随机：25% 恶魔从传送门涌出（3050，开启干扰性玩法屏蔽时权重为 0），20% 骑士凯旋，40% 恶魔难民，15% 无事。若 3050 的恶魔陆军在地面战中击败守军（`on_colony_defenders_lose`），触发本事件。

Its cause is in another story (The Doorway, colony.3005): a Toxic Knights empire can send a knight into the hell dimension; years later demons may pour out (3050). If their armies win the ground battle, this event fires.

## 剧情脉络 Story outline

**恶魔入侵（3051）**：堕落的骑士率领恶魔建立“恶魔入侵”国家，夺取星球与所在星系（含殖民地与恒星基地），并获得一支舰队。/ The corrupted knight leads a new Demon Incursion country that seizes the planet and system with a fleet.

## 分支与结局 Branches and outcomes

- “我们要打败这些入侵者！”：作为敌人继续游戏。/ Fight them.
- “为了骑士的荣耀！”：玩家改为操控恶魔入侵国家。/ The player switches to the demon country.

## 条件与文明差异 Conditions and variants

只有毒性骑士起源才可能走到这里。/ Toxic Knights only.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:1319–1358、2423–2768` · `common/on_actions/00_on_actions.txt:877–890`
已核对 3006 的骑士选项权重、3050、3051 与 on_action。抑制了 3 条来自通用开局建筑效果的起源事件伪连接。前篇应与“传送门”一起移回 C7（台账请求）。/ Three false links from the generic start-of-game effect suppressed; prologue relocation requested.