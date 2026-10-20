# 这里发生了什么事？ / What Happened Here?

- 分类 Category：文明纪事 Society (C7) · 星球修正殖民地事件 planet-modifier colony event

## 如何开始 How it starts

殖民地满一年时，隐藏分派器 colony_mod.161 检查星球修正；若星球是“辐照天地”且尚未调查过（`irradiated_colony_flag`），而且没有排在更前面的强力磁场事件，就在 30–120 天后触发本事件。事件要求非方舟、有人口、非母星/非首都、原主人持有的非 AI 殖民地。

At the colony's first anniversary the hidden dispatcher colony_mod.161 fires this event 30–120 days later if the planet is *Irradiated*, has not been investigated before and no higher-priority (magnetic) event applies. It needs a populated, non-ark, non-homeworld, non-capital colony held by its original non-AI owner.

## 剧情脉络 Story outline

**这里发生了什么事？（1）** 殖民者想知道星球为何遭受辐射（机械帝国有单独的描述）。“让我们来弄清真相吧！”之后 40–60 天，随机揭晓一种答案。/ The colonists want to know why the world is irradiated (machine empires get their own description). After 40–60 days one answer is revealed at random.

## 分支与结局 Branches and outcomes

| 结果 Result | 权重 Weight | 效果 Effect |
| --- | --- | --- |
| 轰炸 Bombardment（6） | 20 | “远古轰炸弹坑”矿藏 / *Ancient Bombardment Craters* deposit |
| 星际战争 Interstellar War（7） | 20 | “古战场”矿藏 / *Ancient Battlefield* deposit |
| 种族自灭 Racial Suicide（8） | 20 | “辐射废墟”矿藏 / *Irradiated Ruins* deposit |
| 我们不知道 We just don't know（9） | 40 | 永久“模糊的过往”修正 / permanent *Uncertain History* |

四者互斥。/ The four results are mutually exclusive.

## 条件与文明差异 Conditions and variants

- 开场描述分机械帝国与非机械帝国两版。/ Opening text differs for machine empires.
- 种族自灭的描述对终结者与狂热净化者另有一版。/ *Racial Suicide* has its own text for Determined Exterminators and Fanatic Purifiers.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:9–148` · 分派器 dispatcher `:971–978` · `common/on_actions/00_on_actions.txt:3721`
- 已核对 Checked：事件 1/6/7/8/9 的触发、描述条件、`random_list` 权重与延时；分派器中的辐照块。/ Triggers, text conditions, weights, delays and the dispatcher block.
- 审阅改动 Changes：从编译器合并的“磁力奇迹”故事中拆出为独立故事（入口仍为分派器 colony_mod.161）。/ Split out of the merged modifier-event story; still entered through colony_mod.161.
- 注释 Commentary：概述为审阅者撰写。/ Summaries are reviewer commentary.
