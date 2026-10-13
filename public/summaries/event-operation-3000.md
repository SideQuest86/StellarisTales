# 诋毁运动 / Smear Campaign

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_operations_events_1.txt, common/espionage_operation_types/operations.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

玩家对一个与他国亲近的国家发起“诋毁运动”（common/espionage_operation_types/operations.txt:451-512，需要双方通讯数>3，目标不是堕落帝国），3个阶段。
Smear Campaign needs a target with more than three contacts (not a Fallen Empire); three stages.

## 剧情脉络 Story outline

1. operation.3000 “识别目标”：列出与目标最友好的国家（最多三个）供选择，作为被挑拨者。 Pick whom to turn against the target.
2. operation.3001 “黑历史”：按挑拨类型（侮辱 / 欺骗 / 间谍）起草。 The campaign type (insult / deception / espionage) is drafted.
3. operation.3002 “行动就绪”：“开始行动！”→ operation.3005：谣言传开，行动结束（奖励：间谍网络等级 −20，成就计数）。 Launch -> 3005.
4. 被挑拨国是否识破，取决于其破译对加密之比（间谍型 >1.7、侮辱型 >1.5、欺骗型 >1.6，events/nemesis_operations_events_1.txt:2105-2184）：
   - 识破：假诋毁被发现 operation.3010 / 3011 / 3012，被挑拨国可选“装作不知”（侮辱型接 envoy_events.101“离谱的侮辱”）或告知被诋毁方 → 3020 “诋毁运动被揭穿”。
   - 未识破：真正的后果——间谍型 espionage.1070“敌对渗透被发现”、侮辱型 envoy_events.100“离谱的侮辱”、欺骗型 espionage.1081/1082“阴谋被发现”（→ 1085 “牵连入阴谋”）。
   Detection depends on Encryption vs Codebreaking; if seen through, 3010/3011/3012 and possibly 3020; otherwise the real effect events.

## 分支与结局 Branches and outcomes

- 三类挑拨对应三条互斥分支（按 3000/3001 的选项设置的标记）；每条分支内“识破 / 未识破”互斥。 Three exclusive campaign types, each split into seen-through / not seen-through.

## 条件与文明差异 Conditions and variants

- espionage.1070-1085 与 envoy_events.100/101 是其他系统共用的侦测文档。 These are shared detection documents.

## 审阅记录 Review notes

- 已核对 Checked：操作类型、operation.3000-3020、3005 的分派（nemesis_operations_events_1.txt:2105-2184）。
