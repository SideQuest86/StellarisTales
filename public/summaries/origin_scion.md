# 后裔 / Scion

- 分类 Category：起源 Origins · DLC：Federations · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/origin_events_1.txt:18-1436`、`common/solar_system_initializers/federations_initializers.txt`、`common/war_goals/00_war_goals.txt`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

开局隐藏事件 origin.5 决定宗主先辈（必要时生成小型先辈帝国），3 天后出现 10“来自先辈的问候”，并启动馈赠循环（隐藏 20）。
At game start hidden origin.5 fixes the fallen-empire overlord (spawning a small one if needed); 3 days later 10 *Incoming Transmission* appears and the gift loop (hidden 20) starts.

## 剧情脉络 Story outline

1. **馈赠循环**：隐藏 20 每隔固定天数重复，各 50% 给科技（21）或资源（24）。 Gift loop: hidden 20 repeats; 50/50 technology (21) or resources (24).
2. **每年干预**：隐藏 200 抽取 205（任务：交出领袖）/ 210（奖赏：领袖）/ 215（奖赏：舰船）/ 220（推进科技）/ 225（殖民补给，拒绝进 226）。 Yearly interventions drawn by hidden 200.
3. **圣世界**：勘察圣世界 → 12（宗主的）或 13（其他先辈的）。 Holy World survey -> 12 or 13.
4. **战争干预**：附庸陷入劣势时 51 借来舰队；战争结束后 54 收回，或独立战争开始时 29 收回。 War help: 51 lends a fleet; 54 takes it back after the war, 29 if the subject starts an independence war.
5. **远征舰队被毁**：52 → 53。 Expeditionary fleet destroyed: 52 -> 53.

## 分支与结局 Branches and outcomes

- 干预五选一（各 10/300）；圣世界两选一。 Five interventions (10/300 each); two Holy World versions.

## 条件与文明差异 Conditions and variants

宗主的类型（灵性派/唯物派/其他）改变 origin.5 的分支。 The overlord type changes origin.5's branch.

## 审阅记录 Review notes

- 已核对 Checked：origin.5–54、200–226 全部事件及钩子。 All events 5-54 and 200-226 and hooks.
- 更正 Corrections：入口加标签；战争干预→收回舰队连接；干预与圣世界互斥组。 Entries labelled; war-help links; exclusive groups.
- 不确定 Uncertain：origin.24 因 `base = origin.21` 没有窗口文本。 origin.24 has no window text (`base = origin.21`).
