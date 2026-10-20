# 被俘的领袖 / Captured leaders

- 分类 Category：银河轶事 C8 stories · DLC：Grand Archive

## 如何开始 How it starts

on_leader_captured（common/on_actions/00_on_actions.txt:5517-5519）触发隐藏事件 grand_archive.9000（events/grand_archive_events.txt:7328-7363）：领袖被流放为“被俘领袖”，俘获方得到消息，1 天后被俘方收到 9005。
on_leader_captured fires hidden 9000: the leader is exiled as captured, the captor is told, and the victim gets 9005 a day later.

## 剧情脉络 Story outline

9005 “…被俘”（被俘方）：
- a 支付 100 能量赎回（克隆该领袖，俘获方得到 100 能量）；
- b 暂缓决定（仅第一次；180 天后再来一次 9005）；
- c 放弃该领袖 → 2 天后俘获方收到 9010 “走跳板”：克隆并处决该领袖，然后三选一：a 威慑（团结加成，亲异/和平者不可）、b 外交（影响力加成，排外/军国者不可）、c 情报（对被俘方 +100 情报）。
9005: pay 100 energy, postpone once (180 days), or abandon -> the captor gets 9010 (unity, influence or intel).

## 分支与结局 Branches and outcomes

- 9005 的 a/b/c 互斥；9010 的三个奖励互斥（受伦理限制）。 Options are exclusive; 9010's rewards depend on ethics.

## 条件与文明差异 Conditions and variants

- 9010 的 a 与 b 对不同伦理开放（亲异/和平者不可选 a，排外/军国者不可选 b）。 9010 a and b are gated by ethics.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：9000-9010 的触发、赎回的资源流向与选项条件。
