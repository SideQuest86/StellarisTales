# 科学家返回 / Scientist Returns

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`events/astral_planes_events.txt:1574–1606`；`common/on_actions/00_on_actions.txt:5013`
- 审阅 Reviewed：2026-10-13（全篇 whole story）

## 如何开始 How it starts

每次裂隙探索完成（`on_astral_rift_exploration_complete`）时检查：国家带有标记 `end_of_the_cycle_reckoning`（“终结周期”危机中帝国被毁之后设置），且从未出现过本事件（`astral_planes_210_happened`）。

Checked at each completed rift exploration (`on_astral_rift_exploration_complete`): the country has the flag `end_of_the_cycle_reckoning` (set after the empire was destroyed in the End of the Cycle crisis) and has not had this event (`astral_planes_210_happened`).

## 剧情脉络 Story outline

单个事件：探索科学家走出裂隙，发现银河已被“终末”吞没，许多熟悉的地方彻底消失；他怀疑自己是否回到了正确的维度，出现认知冲击。事件一开始（immediate）就授予特质“创伤”与“裂隙扭曲”，选项“欢迎回来？”只是确认。

A single event: the scientist leaves the rift to find a galaxy lost to the End, with many known places gone; unsure of having returned to the correct dimension, the scientist suffers cognitive shock. The traits traumatized and rift-warped are granted in the immediate block; the option “Welcome back?” only acknowledges.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

- 只对在终结周期中被毁、又由探索归来的国家出现，一次。

- Only for a country destroyed in the End of the Cycle and returning from an exploration, once.

## 审阅记录 Review notes

- 已核对：事件与 `on_actions` 条目。未追查设置 `end_of_the_cycle_reckoning` 的危机事件（不属于 C4）。

- Checked: the event and its `on_actions` entry. The crisis events that set `end_of_the_cycle_reckoning` were not traced (outside C4).
