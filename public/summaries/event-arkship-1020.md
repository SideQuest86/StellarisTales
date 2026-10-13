# 方舟被毁的通知 / A Grievous Loss (arkship destroyed)

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nomads_arkship_events.txt, common/on_actions/00_on_actions.txt, common/special_projects/06_projects_nomads.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

隐藏事件 arkship.1020（on_ship_disabled，00_on_actions.txt:2055；nomads_arkship_events.txt:4953-5394）：方舟被击瘫时，若无来源舰船、攻击方与我交战、或攻击方是危机/守护者/太空生物/敌对者，则按攻击方类型分支。
Hidden arkship.1020 runs when an arkship is disabled (on_ship_disabled) and branches on the attacker.

## 剧情脉络 Story outline

- 攻击方是灭绝者（homicidal）：方舟被毁，生成残骸；攻击方（常规国家）得到回收项目 ARKSHIP_DEBRIS（拾取时 arkship.1025 按方舟等级给 1000/2000/4000 合金）；双方通过隐藏事件 1010 / 1000 各收到一次性通知 arkship.1015（受害方）与 arkship.1005（攻击方），之后只有简讯。
  A homicidal attacker destroys the arkship; a wreck is created, the attacker gets the salvage project (1000/2000/4000 alloys by arkship tier); both sides get a once-only notice (1015 victim, 1005 attacker), later only toasts.
- 危机势力：同样击毁并留下残骸，但没有回收项目。 Crisis attackers destroy it without a salvage project.
- 无来源（如异常消失）：残骸与受害方通知。 No source: wreck and victim notice.
- 太空生物/守护者/敌对非交战者：方舟被击瘫后被迫撤到邻近星系，随后 arkship.1021 修复（后继无可读事件）。 Critters / guardians / hostile non-war attackers: the arkship is pushed to a neighbouring system and repaired by hidden 1021.
- 其他（常规交战国）：战争疲惫；视攻击方国策，可强征 25% 人口、屠杀 25% 人口或拆除区划；方舟被俘；游牧方可开始恢复项目 RECOVER_DISABLED_NOMAD_VESSEL（arkship.1027）。
  Otherwise (regular war): war exhaustion and, by the attacker's policy, relocate 25% of pops, purge 25% or strip districts; the arkship is captured; a nomad owner is offered a recovery project (1027).

## 分支与结局 Branches and outcomes

- 通知文本按攻击方是否灭绝者、是否游牧而变（arkship.1005 / 1015 各三种）。 Notice texts vary by attacker type.

## 条件与文明差异 Conditions and variants

- 受害方通知 1015 的三个选项互斥：灭绝者 / 游牧 / 其他。 The three options of 1015 are exclusive by attacker type.

## 审阅记录 Review notes

- 已核对 Checked：1000/1005/1010/1015/1020/1021/1022/1025/1026/1027 的触发（nomads_arkship_events.txt:4708-5600）。
- 局限 Scope：被劫掠分支（国策 arkship_raid_*）与恢复项目只作概述，没有可读事件文本；故事内的三个文档并列，因为它们是同一次击毁从不同视角看到的结果。
  The three docs are parallel: the same destruction seen from the victim, the attacker and the wreck.
- 说明 Note：该故事的入口由隐藏路由决定，没有玩家可见的起点。 The entry is a hidden router.
