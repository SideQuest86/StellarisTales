# 火山喷发！ / Eruption!

- 分类 Category：文明纪事 Society (C7) · 星球修正殖民地事件 planet-modifier colony event
- 来源 Sources：`events/colony_events_3.txt:10460–10585` · `common/on_actions/00_on_actions.txt:3722`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

每个殖民地满一年时（`on_colony_1_year_old` 固定事件列表），隐藏事件 colony_mod.30 检查星球是否有“黑曜岩湖”修正且没有“近期喷发”，若是则在 0–31 天内触发 **火山喷发！（colony_mod.31）**（需非母星/非首都的非 AI 殖民地，无地面战斗）。

At the first anniversary the hidden colony_mod.30 fires *Eruption!* within 0–31 days on worlds with *Obsidian Lakes* and no *Recent Eruption*.

## 剧情脉络 Story outline

黑曜岩薄层破碎、熔岩涌出；选项给予 360 天“近期喷发”修正，10–15 天后随机送来一份 **喷发伤害汇报**（三种各约三分之一）。/ The option adds *Recent Eruption* for 360 days; a random damage report follows 10–15 days later.

## 分支与结局 Branches and outcomes

32 损失（+12 荒废度，活火山障碍）/ 33 奇迹般的收获（稀有晶体）/ 34 无损失——三者互斥。/ Three exclusive reports.

## 条件与文明差异 Conditions and variants

无。/ None.

## 审阅记录 Review notes

已核对隐藏入口、事件与随机权重；编译草稿正确。与 colony_mod.161 分派的其他修正事件同类但独立（不同入口）。/ Draft correct; independent of the colony_mod.161 dispatcher.