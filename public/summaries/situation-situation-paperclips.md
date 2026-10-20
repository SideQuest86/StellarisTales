# 商品统合 / Commodities Consolidation

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 机器政体“强迫指令”（civic_machine_obsessional_directive）的帝国：游戏开始（on_game_start_country）时隐藏事件 cyber.5000 开启本局势；之后每次结算后30天重新开启。
  Empires with the Machine "Obsessional Directive" civic: hidden event cyber.5000 starts the situation at game start (on_game_start_country) and again 30 days after every settlement.

## 剧情脉络 Story outline

- 局势“商品整合”：初始进度119，每月-1，阶段上限120；两种取向：履行指令（默认，较小加成）或超驱动（更大加成，每月消耗1影响力）。每月更新消费品库存变量（cyber.5016）。
  The situation "Commodities Consolidation": initial progress 119, -1 per month, stage cap 120; two approaches: fulfil the drive (default, smaller bonus) or overdrive (larger bonus, 1 influence upkeep per month). The consumer-goods stockpile variable is updated monthly (cyber.5016).
- 局势失败（进度耗尽，约10年计时器）→ 隐藏 cyber.5004 比较消费品库存与配额：超额 → 5005「生产目标完成」，选奖励之一（资源、新的强迫指令矿藏、以数量换胜利点等），并提高下一轮配额（5010）；不足 → 5006「生产目标失败」，获得 paperclip_failure 修正并降低下次配额。
  When the situation fails (progress runs out, a ~10-year timer) hidden cyber.5004 compares the stockpile with the quota: above -> 5005 "Production Target Complete" with a choice of rewards (resources, a new Obsessional Directive deposit, victory points for quantity…) and a higher next quota (5010); below -> 5006 "Production Target Failure", a paperclip_failure modifier and a lowered next quota.
- 目标国家变更导致中止时（on_abort）30天后重新开启。
  If the target changes owner the situation aborts (on_abort) and restarts after 30 days.

## 分支与结局 Branches and outcomes

- 5005 与 5006 互斥；故事循环，无终结。
  5005 and 5006 are exclusive; the story loops with no end.

## 条件与文明差异 Conditions and variants

- 配额随难度（平民到大元帅）而定。
  The quota scales with difficulty (Civilian to Grand Admiral).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/situations/08_machine_age_situations.txt:1459-1542`；`events/machine_age_events_2.txt:224-700`；`common/on_actions/00_on_actions.txt:57`
- 已核对：开启条件、取向、失败回调、配额循环与两个结果。
  Checked: start condition, approaches, failure callback, quota loop and both results.
