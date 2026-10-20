# 快速翻译 / Swift Translations
- 分类 Category：文明纪事 Society (C7) · 首次接触随机插曲 first-contact random interlude

## 如何开始 How it starts

首次接触阶段进度检定失败时（on_roll_failed → standard_first_contact_on_roll_failed）：先给线索，再有 1/20 概率从阶段指定的事件池里按权重抽一个，同一站点 125 天内最多触发一次（flag first_contact_event_fired）（`first_contact_effects.txt:1257–1294`）。本事件在以下池中：晚期事件池 late_fc_random_events（默认第二阶段及各收尾阶段） 权重1。/ When a stage progress roll fails (on_roll_failed → standard_first_contact_on_roll_failed): clues are added, then a 1-in-20 chance draws one event from the stage’s pool by weight, at most once per 125 days per site. This event sits in: late pool (default stage 2 and the end stages) weight 1。

## 剧情脉络 Story outline

**快速译码（5045）**：伦理相近使共同点易找，+2 阶段线索；选项文字随本方（普通/排外/格式塔）而变。 / Swift translations: ethical similarity helps, +2 stage clues; option text varies with the owner (regular / xenophobe / gestalt).

## 分支与结局 Branches and outcomes

三种措辞互斥。 / Three wordings, exclusive.

## 条件与文明差异 Conditions and variants

对立伦理差异超过1步或一方是格式塔而另一方不是 → 0；本方为蜂巢/机械而对方不是同类 → 0（`first_contact_effects.txt:1571–1613`）。 / Zero if the opposing-ethics divergence exceeds 1 step or exactly one side is gestalt; zero when a hive / machine owner meets a non-hive / non-machine contact. 每个站点每个事件最多一次（flag fc_event_5045 或同类标记）。/ Once per site.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_random_events.txt:513-569` · `common/scripted_effects/first_contact_effects.txt:1257-1795`
- 已核对 Checked：脚本、scripted effect 中各池的权重与零权重条件、standard_first_contact_on_roll_failed。/ Script, per-pool weights and exclusions, and the roll-failure wrapper.
- 审阅改动 Changes：无结构改动（独立插曲页）；补充了触发池与条件。/ No structural change; trigger pools and conditions added.
