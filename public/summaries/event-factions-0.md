# 派系已建立 / Faction Founded
- 分类 Category：文明纪事 Society (C7) · 派系事件 faction event

## 如何开始 How it starts

任何派系成立时，隐藏事件 factions.0（pop_faction_event）触发：破碎枷锁起源除外，它先强制评估所有人口群的派系归属；如果这是本国的第一个派系（country flag first_faction）→ 弹出教学式事件 **1 派系成立**；否则只发出“派系成立”的消息（传统主义 / 帝国主义 / 至上主义 / 孤立主义 / 极权 / 进步 / 繁荣 / 技术 / 异族 / 马尼斐斯蒂）。烈焰教派创立时也直接发 factions.1。/ Any new faction fires hidden factions.0; the first faction of an empire gets the explainer event 1, later ones only a message; the fire cult sends 1 directly.

## 剧情脉络 Story outline

**派系成立（1）**：说明派系的概念，文本随起源（拔线者起源有专门版本）与派系类型（含马尼斐斯蒂、烈焰教派）变化；唯一选项“好”，并强制重新评估所有人口群。/ Explains factions; text depends on origin and faction type; the only option forces a faction re-evaluation.

## 分支与结局 Branches and outcomes

单事件。/ A single event.

## 条件与文明差异 Conditions and variants

文本因派系类型和起源而异。/ Text varies with faction type and origin.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/faction_events.txt:12-220` · `common/pop_faction_types/00_pyrolatry.txt:344`
- 已核对 Checked：0 与 1 的脚本，派系 on_create 调用。/ Scripts 0 and 1 and the on_create callers.
- 审阅改动 Changes：结构无改动。/ No structural change.
