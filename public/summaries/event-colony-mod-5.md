# 清除 / Crackdown

- 分类 Category：文明纪事 Society (C7) · 星球修正殖民地事件 planet-modifier colony event
- 来源 Sources：`events/colony_events_3.txt:533–621` · 分派器 dispatcher `:1022–1032` · `common/special_projects/00_projects_3.txt:567–586`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地满一年时，隐藏分派器 colony_mod.161 发现星球带有“致幻大气”修正、尚未处理过、所有者不是格式塔，且排在前面的其他修正事件都不适用，则 30–120 天后触发本事件。

At the first anniversary the dispatcher fires this event 30–120 days later on a world with *Atmospheric Hallucinogen* that has not been handled before, for non-gestalt owners, if no higher-priority modifier event applies.

## 剧情脉络 Story outline

**清除（5）**：保守派要求清除大气中的致幻成分。/ Conservatives demand the hallucinogen be removed.

- 把它除掉 → 特殊项目 **致幻气体移除**（1500 工程学）。/ Shut it down → project *Hallucinogen Removal* (1500 engineering).
- 保持原状 → 支付 200 凝聚力，故事结束。/ Leave it → pay 200 unity; the story ends.

## 分支与结局 Branches and outcomes

项目完成后随机：/ On completion, at random:

- **清除（10）**，75%：移除“致幻大气”。/ 75%: the modifier is removed.
- **清除：突破（11）**，25%：替换为永久“过滤的致幻大气”。/ 25%: replaced by the permanent *Filtered Atmospheric Hallucinogen*.

## 条件与文明差异 Conditions and variants

格式塔帝国不会收到。/ Gestalt empires do not get it.

## 审阅记录 Review notes

- 已核对 Checked：事件 5/10/11、项目 `on_success` 权重 75/25、分派器块。/ Events, project weights and the dispatcher block.
- 审阅改动 Changes：从合并的“磁力奇迹”故事中拆出为独立故事。/ Split out of the merged modifier-event story.
