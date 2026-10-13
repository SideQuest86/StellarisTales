# 跨次元贸易 / Inter-Dimensional Trade

- 分类 Category：文明纪事 Society (C7) · 重复插曲 recurring interlude
- 来源 Sources：`events/colony_events_3.txt:2007–2420` · 前因 prior `:1825–2001` · `common/on_actions/00_on_actions.txt:282`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地事件「传送门」（colony.3005，目前位于另一个故事）的研究项目可能打开通往镜像次元的通道；与镜像帝国通商的选项给星球与国家设置 `dportal_trader`。此后每五年（`on_five_year_pulse`）隐藏事件 3029 随机挑一个这样的帝国，由 3030 按当前贸易水平决定是否发生：

The Doorway (colony.3005, in another story) can open a portal to a mirror dimension; trading with the mirror empire sets `dportal_trader`. Every five years the hidden 3029/3030 check one such empire:

| 当前贸易 Trade level | 无事 Nothing | 上升 Up（3031） | 下降 Down（3032） |
| --- | --- | --- | --- |
| 正常 normal | 60 | 10 | 10 |
| 偏低 low | 20 | 20 | 10 |
| 偏高 high | 30 | 10 | 20 |

## 剧情脉络 Story outline

- **跨次元贸易增加（3031）**：镜像帝国经济繁荣，贸易修正升一级；已最高时给一次性消费品与稀有资源。/ Trade rises one level (one-off goods at the top).
- **跨次元贸易减少（3032）**：降一级；已在低位时危机计数加一，满 5 后再下降即陷入危机，1825–3650 天后 → **传送门紧急广播（3033）**：镜像帝国首都被吞噬。可以徒劳地呼叫几次，最后承认“他们完了”。/ Trade falls; repeated falls at the bottom trigger a crisis and, years later, the *Emergency Portal Broadcast*.

## 分支与结局 Branches and outcomes

3031/3032 可反复、任意次序出现；3033 是终章，之后检查停止。/ 3031/3032 recur in any order; 3033 ends the series.

## 条件与文明差异 Conditions and variants

机械帝国有专门的选项文字与广播文本。/ Machine empires get their own wording.

## 审阅记录 Review notes

- 已核对 Checked：3029–3033 全部脚本、权重与危机计数。故事属于“传送门”镜像结果的后续；该前篇目前在 event-enclave-300（台账请求移回 C7）。
- 审阅改动 Changes：3033 登记为自由呼叫对话，标注终章与两条注释。/ 3033 registered as a free-call dialogue; finale and notes added.