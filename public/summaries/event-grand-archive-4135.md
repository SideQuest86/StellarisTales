# 次等者的饰品 / Trinkets from our Lessers

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt, common/inline_scripts/grand_archive/collection/homicidal_collection_reward_event.txt · DLC：Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 grand_archive.4130（events/grand_archive_events.txt:6057-6096）挂在 on_post_communications_established_always_fire（common/on_actions/00_on_actions.txt:2287）、on_specimen_acquired（5374）与 on_exhibit_unlocked（5450）：灭绝者（homicidal）帝国满足某个收藏类别的第1/2/3阶段奖励条件，且没有待处理的奖励时，设置标记并按阶段（if / else_if）触发三个政体变体事件。
Hidden 4130 runs on contact, specimen acquisition and exhibit unlocking: a homicidal empire that qualifies for a collection reward stage gets the event for its civic.

## 剧情脉络 Story outline

- 第1阶段：4135（狂热净化者）、4136（吞噬虫群）、4137（坚决灭绝者）；第2阶段：4140 / 4141 / 4142；第3阶段：4145 / 4146 / 4147。每个变体事件只对拥有该政体的帝国触发（trigger = has_valid_civic）。
  Stage 1: 4135 Purifiers, 4136 Swarm, 4137 Exterminators; stage 2: 4140-4142; stage 3: 4145-4147. Each variant fires only for its civic.
- 每个事件按类别（异星地质 / 美学奇观 / 历史器物）选出奖励，唯一选项领取；事件结束后 1 天再运行 4130，检查下一阶段。
  The single option takes the reward for the first eligible category; 4130 runs again after one day.

## 分支与结局 Branches and outcomes

- 同一阶段的三种政体变体互斥（一个帝国只拥有其一）；阶段按 1→2→3 依次出现。
  Per stage the three civic variants are exclusive; the stages follow 1 -> 2 -> 3.

## 条件与文明差异 Conditions and variants

- 仅灭绝者帝国；其他帝国走“策展人”故事。 Homicidal empires only; others use the Curators story.

## 审阅记录 Review notes

- 已核对 Checked：4130 的阶段判断、inline_script 模板（事件在每个阶段中相同）、on_action 触发点。
- 更正 Corrections：编译器把九个事件互相连成一团（因为 after 每次再调用 4130）；现改为三列（按政体）× 三阶段的顺序。
  The compiler linked all nine events to each other because every event re-fires 4130; replaced by three civic columns of three stages.
