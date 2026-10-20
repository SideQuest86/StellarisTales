# 水晶帝国 / Crystalline Empire

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

游戏开始时 on_game_start（common/on_actions/00_on_actions.txt:18）触发隐藏事件 central.1（events/central_crystal_events.txt:9-28）：如果有玩家使用“虚空居民”起源，则 1% 几率设置全局标记 central_crystal_flag；之后 central.2（只触发一次，:30-97）在银河中心生成水晶帝国与两端虫洞（或使用已存在的出生点），并让所有玩家国家收到 central.5。
At game start a 1% roll (only when a human has a void-dweller origin) sets central_crystal_flag; central.2 then spawns the empire at the galactic centre and fires central.5 for every player.

## 剧情脉络 Story outline

1. central.5 “银河中心的信号”：中心传来强信号，随后收到来自同处的通讯；确认后与水晶帝国建立通讯并触发 central.10。 The signal; communications are established.
2. central.10 “来电”：水晶帝国的司令向“年轻的”你问候。灭绝者政体（净化者 / 吞噬虫群 / 机械灭绝者）只有敌意选项；其余选项“你好，……”→ central.15（对方切断了视频）。 Friendly empires reach 15 ("did they just cut the feed?"); exterminator civics get hostile options only.
3. 以后每次打开外交对话（on_custom_diplomacy，common/on_actions/00_on_actions.txt:739）→ central.19：对方对你不敌对时 central.20 “水晶帝国”（可问三类问题：他们的故乡、为何现在出现、是否需要帮助），否则 central.21 “滚开，恐怖分子”。 Later, the diplomacy action shows the base menu 20, or 21 when hostile.
4. 在 20 中选“有什么我们能帮上的吗？”（没有任务时）：设 7200 天任务标记并触发 on_crystalline_empire_task（common/on_actions/00_on_actions.txt:4774-4780）：三选一（10/10/10）：
   - central.50 “难民”（需要至少一个太空栖息地）：接受 → 10 年内可对栖息地使用“安置水晶难民”决定（central.51）；拒绝 → 52。 Refugees: accept (decision on a Habitat for 10 years, 51) or refuse (52).
   - central.60 “秘密技术/重建”：提供材料 → 10 年内可对栖息地使用“水晶建设”决定（61）；拒绝 → 62。 Reconstruction help.
   - central.70 “好奇的科学家”：接受 → 一名 Zer-Ayaki 科学家搬到你的国家（71）；拒绝 → 72。 A scholar wants to move to you.
   每个结果页都问“还有别的吗？”：是 → 回到 20；否 → 结束。 Every result page offers to return to menu 20.

## 分支与结局 Branches and outcomes

- 三种委托互斥（权重各10）；每个委托自身的接受/拒绝互斥。 The three requests are exclusive; each has accept/refuse.

## 条件与文明差异 Conditions and variants

- 难民委托要求拥有太空栖息地；水晶帝国对你敌对时只会给 21。 The refugee request needs a Habitat; hostile contact gets only 21.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/central_crystal_events.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：central.1-72 的触发、on_action 与委托事件。
- 更正 Corrections：五个独立故事（2、19、50、60、70）并为一个，菜单 20 作为共享枢纽。 Five stories merged around the shared menu 20.
