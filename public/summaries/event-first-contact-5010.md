# 错误方向 / Mistaken Identification
- 分类 Category：文明纪事 Society (C7) · 首次接触随机插曲 first-contact random interlude

## 如何开始 How it starts

首次接触阶段进度检定失败时（on_roll_failed → standard_first_contact_on_roll_failed）：先给线索，再有 1/20 概率从阶段指定的事件池里按权重抽一个，同一站点 125 天内最多触发一次（flag first_contact_event_fired）（`first_contact_effects.txt:1257–1294`）。本事件在以下池中：早期事件池 early_fc_random_events（默认第一阶段、掠夺者/海盗/商队/游牧民的第一阶段） 权重1；神秘事件池 enigmatic_fc_random_events（中立势力） 权重1。/ When a stage progress roll fails (on_roll_failed → standard_first_contact_on_roll_failed): clues are added, then a 1-in-20 chance draws one event from the stage’s pool by weight, at most once per 125 days per site. This event sits in: early pool (default stage 1 and the stage 1 of marauders, pirates, caravaneers, nomads) weight 1; enigmatic pool (neutral factions) weight 1。

## 剧情脉络 Story outline

**错认（5010）**：以为是语言的东西其实不是（如音乐），−2 阶段线索。 / Mistaken identification: what looked like language was not; −2 stage clues.

## 分支与结局 Branches and outcomes

单选项。 / Single option.

## 条件与文明差异 Conditions and variants

对方为格式塔时权重为0。 / Weight 0 if the contact is gestalt. 每个站点每个事件最多一次（flag fc_event_5010 或同类标记）。/ Once per site.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_random_events.txt:58-78` · `common/scripted_effects/first_contact_effects.txt:1257-1795`
- 已核对 Checked：脚本、scripted effect 中各池的权重与零权重条件、standard_first_contact_on_roll_failed。/ Script, per-pool weights and exclusions, and the roll-failure wrapper.
- 审阅改动 Changes：无结构改动（独立插曲页）；补充了触发池与条件。/ No structural change; trigger pools and conditions added.
