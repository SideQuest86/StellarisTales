# 可怖一幕 / A Terrible Sight to Behold
- 分类 Category：文明纪事 Society (C7) · 首次接触随机插曲 first-contact random interlude

## 如何开始 How it starts

首次接触阶段进度检定失败时（on_roll_failed → standard_first_contact_on_roll_failed）：先给线索，再有 1/20 概率从阶段指定的事件池里按权重抽一个，同一站点 125 天内最多触发一次（flag first_contact_event_fired）（`first_contact_effects.txt:1257–1294`）。本事件在以下池中：晚期事件池 late_fc_random_events（默认第二阶段及各收尾阶段） 权重2。/ When a stage progress roll fails (on_roll_failed → standard_first_contact_on_roll_failed): clues are added, then a 1-in-20 chance draws one event from the stage’s pool by weight, at most once per 125 days per site. This event sits in: late pool (default stage 2 and the end stages) weight 2。

## 剧情脉络 Story outline

**对外星人的负面反应（5035）**：民众被外星人的相貌所排斥，获得 3600 天“外星人厌恶”（对方为合成帝国则为“机器人厌恶”）修正与反感；第二个选项让孤立主义/至上主义派系等得到相应修正。 / Negative reaction: a 3600-day alien-revulsion (robot-revulsion) modifier and an opinion malus; the second option applies faction-specific modifiers.

## 分支与结局 Branches and outcomes

按对方是否合成帝国与本方派系分叉。 / Branches by synthetic status and local factions.

## 条件与文明差异 Conditions and variants

本方为格式塔、亲异族或狂热和平主义者 → 0；本方为唯物者或赋予 AI 全权且对方是合成帝国 → 0；同种族 → 0（`first_contact_effects.txt:1495–1527`）。 / Zero if the owner is gestalt, xenophile or fanatic pacifist; zero for a materialist / full-AI-rights owner meeting a synthetic empire; zero for the same species. 每个站点每个事件最多一次（flag fc_event_5035 或同类标记）。/ Once per site.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_random_events.txt:325-480` · `common/scripted_effects/first_contact_effects.txt:1257-1795`
- 已核对 Checked：脚本、scripted effect 中各池的权重与零权重条件、standard_first_contact_on_roll_failed。/ Script, per-pool weights and exclusions, and the roll-failure wrapper.
- 审阅改动 Changes：无结构改动（独立插曲页）；补充了触发池与条件。/ No structural change; trigger pools and conditions added.
