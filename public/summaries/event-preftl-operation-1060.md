# [from.GetName]：节点整合 / [from.GetName]: Nodes Subsumed
- 分类 Category：文明纪事 Society (C7) · 间谍行动结局（前FTL）pre-FTL espionage operation finale
- 来源 Sources：`events/first_contact_dlc_operations_events.txt:1329-1560` · `common/espionage_operation_types/pre_ftl_operations.txt:746-897` · `common/scripted_effects/espionage_event_effects.txt:2840-2906` · `common/scripted_effects/first_contact_dlc_effects.txt:3093-3130`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

玩家对前FTL文明发动“渗透蜂巢”行动（`operation_infiltrate_hive`，`pre_ftl_operations.txt:746-897`），完成最后一章后触发本事件。行动章节：每个针对前FTL文明的间谍行动由 3–4 个章节组成，前几章触发隐藏占位事件 preftl_operation.100，最后一章触发本事件。章节检定失败时（pre_ftl_espionage_operation_on_roll_failed，`espionage_event_effects.txt:2840–2906`），有 10/400 的概率（无“外貌改造”科技时 ×1.5；同一行动 120 天内最多一次）从随机事件池抽取插曲（3000–3105）；插曲的选项会改变行动的成功度变量 pre_ftl_operation_success（±1/±2），最终事件按该变量选择结果档：>2 极佳，>0 良好，=0 标准，<0 糟糕（`first_contact_dlc_effects.txt:3093–3130`）。 / The player runs the “Infiltrate Hive” operation (operation_infiltrate_hive) against a pre-FTL country; completing its last chapter fires this event. Operation chapters: each espionage operation against a pre-FTL country has 3–4 chapters; the early ones fire the hidden placeholder preftl_operation.100 and the last one fires this event. When a chapter roll fails there is a 10-in-400 chance (×1.5 without the appearance-modding tech; at most once per 120 days per operation) to draw an interlude (3000–3105); interlude options change the success variable pre_ftl_operation_success (±1 / ±2). The finale then picks an outcome tier: >2 great, >0 good, =0 standard, <0 poor.

## 剧情脉络 Story outline

**节点被吞并（1060）**→ **1065 我们即一体**（极佳）/ **1066 受控的控制**（良好）/ **1067 勉强留存**（标准）/ **1068 失败**（糟糕，随后触发违反法案的 preftl.10150 / 10050）。成功档位使整个蜂巢被并入。 / Nodes Subsumed (1060) → 1065 (great), 1066 (good), 1067 (standard), 1068 (poor, followed by the Breach acts). The successful tiers absorb the hive.

## 分支与结局 Branches and outcomes

极佳/良好/标准/糟糕四档互斥：1065（>2）、1066（>0）、1067（=0）、1068（<0）。/ Four exclusive tiers: great 1065, good 1066, standard 1067, poor 1068.

## 条件与文明差异 Conditions and variants

结局文本因观察者类型（普通/蜂巢/机械）、目标是否前工业时代而异。/ Text varies with the owner type and the target’s era.

## 审阅记录 Review notes

- 已核对 Checked：终结事件、行动类型、成功度判定与对应章节定义。/ Finale, operation type, success rule and chapter definitions.
- 审阅改动 Changes：原编译草稿结构正确；补充了行动背景、成功度规则与各档位。/ The compiled structure was correct; operation background, the success rule and tiers added.
