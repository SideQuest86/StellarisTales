# 高规格交通事故 / High Profile Traffic Accident

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

迷信者（Superstitious Beliefs）文明的周期事件触发：每个13年周期开始（首个周期除外）掷出吉或凶（shroud.210/220/230 → 410/415，events/shroud_events.txt:961-1221），再从 on_action 的16个等权事件中抽取一个（common/on_actions/00_on_actions.txt:5749-5789）；本事件每个帝国至多一次（国家旗标 shroud_725_triggered）。凶兆事件。帝国拥有符合条件的领袖（sb_high_profile_traffic_accident_leader_trigger）；随机一名领袖（加权）。其后 50/50：727 领袖死亡，或 728 领袖致残（获得“残疾”特质；对满足某领袖类型/特质条件者权重被设为0，见 2988-2992）。

Triggered by the cycles of a Superstitious Beliefs empire: each 13-year cycle (except the first) rolls good or bad luck (shroud.210/220/230 → 410/415, events/shroud_events.txt:961-1221) and one of the 16 equally weighted events of that on_action is drawn (common/on_actions/00_on_actions.txt:5749-5789); this event happens at most once per empire (country flag shroud_725_triggered). A bad luck event. The empire has a qualifying leader (sb_high_profile_traffic_accident_leader_trigger); one is picked by weight. Then 50/50: 727 the leader is killed, or 728 the leader is maimed (leader_trait_maimed; the weight is zeroed for some leader class/trait combination, see 2988-2992).

## 剧情脉络 Story outline

单窗口通知，无后续剧情；唯一的选项直接生效。两个互斥结果：727 杀死领袖，728 使领袖致残。

A single notification window with no continuation; its only option applies directly. Two exclusive outcomes: 727 kills the leader, 728 maims the leader.

## 分支与结局 Branches and outcomes

两个互斥结果（727 / 728，各50%）。

Two exclusive outcomes (727 / 728, 50% each).

## 条件与文明差异 Conditions and variants

727 的正文分机械物种 / 有机物种 / 其他三种。

The 727 text has three versions (machine species / organic species / other).

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/on_actions/00_on_actions.txt:5749-5789`; `events/shroud_events.txt:645-760,961-1221`; `common/scripted_variables/09_scripted_variables_shroud.txt:43`; `events/shroud_events.txt:2948-3072`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照脚本核实了触发条件、旗标、选项效果和本地化；触发链（周期→吉凶掷骰→on_action）已核对。

Trigger, flag, option effects and localisation were checked against the script; the trigger chain (cycle → luck roll → on_action) was verified.
