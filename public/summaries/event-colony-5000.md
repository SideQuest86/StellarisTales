# 意外之友 / An Unexpected Friend（孤独的机器人 · The Lonely Bot）

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain
- 来源 Sources：`events/colony_events_3.txt:2840–3116` · `common/special_projects/00_projects_nemesis.txt:574–614` · `common/on_actions/00_on_actions.txt:3745` · 前因 prior `events/anomaly_events_2.txt:1045`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

异常“孤独的机器人”的一个结果（anomaly.2580，另一故事）会在星球上放置“孤独机器人”矿藏。在该星球建立的殖民地满两年时，`on_colony_2_years_old` 的固定事件列表（非随机池，注释称“随机性已在矿藏放置时决定”）检查此矿藏并触发 colony.5000（需非母星/非首都、原主人、非 AI、无地面战斗、未被占领）。

The anomaly outcome anomaly.2580 (another story) places the Lonely Bot deposit. When a colony on that planet turns two, `on_colony_2_years_old` (its fixed `events` list, not the random pool) fires colony.5000 if the deposit is present.

## 剧情脉络 Story outline

1. **意外之友（5000）**：小机器人热情帮助殖民者（10 年欢迎修正）→ 3600–5400 天后 **古代工厂（5005）**：它监管的工厂开始崩坏。
2. 项目 **工厂修复**（1500 工程学，1800 天期限）：成功 → **工厂复工（5010）**（矿藏升级，合金）；超时 → **工厂崩塌（5006）**，结局。
3. 修复后 3600–10800 天 → **失踪的机器人（5015）** → 项目 **遗失的机器人**（1500 工程学）→ **遗骸（5020）**：把它修好还给大家，或拆开研究。

English: the robot's ancient factory decays ~10–15 years after colonisation; repairing it in time upgrades the deposit, and 10–30 years later the robot goes missing; a second project finds its remains, which you can restore or dismantle.

## 分支与结局 Branches and outcomes

- 工厂崩塌（5006）：失去矿藏。/ Deposit lost.
- 遗骸（5020）：修复吉祥物（矿藏再升级）或拆解（人工智能科技进度与“被毁的吉祥物”标本）。/ Restore (upgraded deposit) or dismantle (AI tech progress and a specimen).

## 条件与文明差异 Conditions and variants

无文明身份差异。/ No identity variants.

## 审阅记录 Review notes

- 已核对 Checked：5000–5020 脚本、两个项目、矿藏定义、放置矿藏的 anomaly.2580。编译草稿结构正确。
- 未改结构；标注两个结局与入口注释。建议协调者在 anomaly.2580 与本篇之间加跨故事连接（台账请求）。/ Structure unchanged; a cross-story link from anomaly.2580 is requested in the ledger.
