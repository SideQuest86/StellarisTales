# 发现主矿体 / Unearthed Mother Lode

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`common/on_actions/00_on_actions.txt:5749-5789`; `events/shroud_events.txt:645-760,961-1221`; `common/scripted_variables/09_scripted_variables_shroud.txt:43`; `events/shroud_events.txt:1257-1369`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

迷信者（Superstitious Beliefs）文明的周期事件触发：每个13年周期开始（首个周期除外）掷出吉或凶（shroud.210/220/230 → 410/415，events/shroud_events.txt:961-1221），再从 on_action 的16个等权事件中抽取一个（common/on_actions/00_on_actions.txt:5749-5789）；本事件每个帝国至多一次（国家旗标 shroud_505_triggered）。吉兆事件。需要有采矿区划的行星；游牧民则需要位于可有矿物矿藏恒星系的驿站舰船。隐藏分流事件 shroud.505 随后展示 507（非游牧）或 508（游牧）。

Triggered by the cycles of a Superstitious Beliefs empire: each 13-year cycle (except the first) rolls good or bad luck (shroud.210/220/230 → 410/415, events/shroud_events.txt:961-1221) and one of the 16 equally weighted events of that on_action is drawn (common/on_actions/00_on_actions.txt:5749-5789); this event happens at most once per empire (country flag shroud_505_triggered). A good luck event. Needs a planet with a mining district; a nomad empire instead needs a waystation ship in a system that can hold mineral deposits. Hidden router shroud.505 then shows 507 (settled) or 508 (nomad).

## 剧情脉络 Story outline

单窗口通知，无后续剧情；唯一的选项直接生效。唯一选项：在该行星加上矿藏——非游牧加“富矿洞穴”(d_ore_rich_caverns)，游牧加 d_minerals_3。

A single notification window with no continuation; its only option applies directly. Only option: adds a deposit to that planet — d_ore_rich_caverns (settled) or d_minerals_3 (nomad).

## 分支与结局 Branches and outcomes

无分支；与同一抽取池中另外15个事件互不相关，各自独立成卡。

No branching; independent of the other 15 events of the same draw pool, each shown as its own card.

## 条件与文明差异 Conditions and variants

507 与 508 是同一事件的两个互斥版本，标题与正文相同，仅奖励不同（1317 / 1328 的 if/else）。

507 and 508 are two mutually exclusive versions of the same card (same title and text), differing only in reward (if/else at 1317 / 1328).

## 审阅记录 Review notes

对照脚本核实了触发条件、旗标、选项效果和本地化；触发链（周期→吉凶掷骰→on_action）已核对。

Trigger, flag, option effects and localisation were checked against the script; the trigger chain (cycle → luck roll → on_action) was verified.
