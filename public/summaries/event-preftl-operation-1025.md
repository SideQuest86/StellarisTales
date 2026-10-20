# 间谍网络：准备现身 / Spy Network: Ready to Reveal- 分类 Category：文明纪事 Society (C7) · 间谍行动结局（前FTL）pre-FTL espionage operation finale

## 如何开始 How it starts

玩家对前FTL文明发动“提高觉醒度”行动（`operation_increase_awareness`，`pre_ftl_operations.txt:17-156`），完成最后一章后触发本事件。行动章节：每个针对前FTL文明的间谍行动由 3–4 个章节组成，前几章触发隐藏占位事件 preftl_operation.100，最后一章触发本事件。章节检定失败时（pre_ftl_espionage_operation_on_roll_failed，`espionage_event_effects.txt:2840–2906`），有 10/400 的概率（无“外貌改造”科技时 ×1.5；同一行动 120 天内最多一次）从随机事件池抽取插曲（3000–3105）；插曲的选项会改变行动的成功度变量 pre_ftl_operation_success（±1/±2），最终事件按该变量选择结果档：>2 极佳，>0 良好，=0 标准，<0 糟糕（`first_contact_dlc_effects.txt:3093–3130`）。 / The player runs the “Increase Awareness” operation (operation_increase_awareness) against a pre-FTL country; completing its last chapter fires this event. Operation chapters: each espionage operation against a pre-FTL country has 3–4 chapters; the early ones fire the hidden placeholder preftl_operation.100 and the last one fires this event. When a chapter roll fails there is a 10-in-400 chance (×1.5 without the appearance-modding tech; at most once per 120 days per operation) to draw an interlude (3000–3105); interlude options change the success variable pre_ftl_operation_success (±1 / ±2). The finale then picks an outcome tier: >2 great, >0 good, =0 standard, <0 poor.

## 剧情脉络 Story outline

**准备揭示（1025）**→ 按成功度选择：**1027 外面有生命**（极佳/良好）、**1026 外面有生命吗？**（标准）、**1028 外面什么也没有**（糟糕）。1026 / 1028 之后会进入 action.2 的首次接触窗口（觉醒度已满时的文本不同），随后 progress.4/5/6 记录对方文明接触。 / Ready to Reveal (1025) → by tier: 1027 (great/good), 1026 (standard), 1028 (poor); 1026 and 1028 lead to the first-contact window action.2 and then progress.4/5/6.

## 分支与结局 Branches and outcomes

极佳/良好/标准/糟糕四档互斥：1027（>2）、1027（>0）、1026（=0）、1028（<0）。/ Four exclusive tiers: great 1027, good 1027, standard 1026, poor 1028.

## 条件与文明差异 Conditions and variants

结局文本因观察者类型（普通/蜂巢/机械）、目标是否前工业时代而异。/ Text varies with the owner type and the target’s era.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_dlc_operations_events.txt:768-1000` · `common/espionage_operation_types/pre_ftl_operations.txt:17-156` · `common/scripted_effects/espionage_event_effects.txt:2840-2906` · `common/scripted_effects/first_contact_dlc_effects.txt:3093-3130`
- 已核对 Checked：终结事件、行动类型、成功度判定与对应章节定义。/ Finale, operation type, success rule and chapter definitions.
- 审阅改动 Changes：原编译草稿结构正确；补充了行动背景、成功度规则与各档位。/ The compiled structure was correct; operation background, the success rule and tiers added.
- 2026-10-13 r3-inherit：事件继承修复（base = 其他事件）后复查：对照游戏文件核对了现在可见的继承标题、选项与分支，结构无需改动。
  2026-10-13 r3-inherit: re-checked after the event-inheritance fix (base = other event): the inherited titles, options and branches now visible in the tree were compared with the game files; no structural change needed.
