# 四象示灾 / Calamitous Quartile

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

迷信者（Superstitious Beliefs）文明的周期事件触发：每个13年周期开始（首个周期除外）掷出吉或凶（shroud.210/220/230 → 410/415，events/shroud_events.txt:961-1221），再从 on_action 的16个等权事件中抽取一个（common/on_actions/00_on_actions.txt:5749-5789）；本事件每个帝国至多一次（国家旗标 shroud_745_triggered）。凶兆事件。边境内有符合条件的“四象”恒星系（sb_calamitous_quartile_system_trigger）或至少有4颗行星的方舟所在系。分流 shroud.745 → 747 → 748。

Triggered by the cycles of a Superstitious Beliefs empire: each 13-year cycle (except the first) rolls good or bad luck (shroud.210/220/230 → 410/415, events/shroud_events.txt:961-1221) and one of the 16 equally weighted events of that on_action is drawn (common/on_actions/00_on_actions.txt:5749-5789); this event happens at most once per empire (country flag shroud_745_triggered). A bad luck event. A qualifying "quartile" system inside the borders or an arkship in a system with 4+ planets. Router shroud.745 → 747 → 748.

## 剧情脉络 Story outline

单窗口通知，无后续剧情；唯一的选项直接生效。唯一选项：该殖民地获得13年期修正“四象示灾”(calamitous_quartile)。

A single notification window with no continuation; its only option applies directly. Only option: the colony gets the 13-year modifier Calamitous Quartile (calamitous_quartile).

## 分支与结局 Branches and outcomes

无分支；与同一抽取池中另外15个事件互不相关，各自独立成卡。

No branching; independent of the other 15 events of the same draw pool, each shown as its own card.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/on_actions/00_on_actions.txt:5749-5789`; `events/shroud_events.txt:645-760,961-1221`; `common/scripted_variables/09_scripted_variables_shroud.txt:43`; `events/shroud_events.txt:3301-3483`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
对照脚本核实了触发条件、旗标、选项效果和本地化；触发链（周期→吉凶掷骰→on_action）已核对。

Trigger, flag, option effects and localisation were checked against the script; the trigger chain (cycle → luck roll → on_action) was verified.
