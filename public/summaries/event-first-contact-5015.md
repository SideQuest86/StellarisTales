# 接触国扫描首都 / Contact Country Scans Capital- 分类 Category：文明纪事 Society (C7) · 首次接触随机插曲 first-contact random interlude

## 如何开始 How it starts

首次接触阶段进度检定失败时（on_roll_failed → standard_first_contact_on_roll_failed）：先给线索，再有 1/20 概率从阶段指定的事件池里按权重抽一个，同一站点 125 天内最多触发一次（flag first_contact_event_fired）（`first_contact_effects.txt:1257–1294`）。本事件在以下池中：早期事件池 early_fc_random_events（默认第一阶段、掠夺者/海盗/商队/游牧民的第一阶段） 权重2；晚期事件池 late_fc_random_events（默认第二阶段及各收尾阶段） 权重2；章鱼人精简池 octopodes_fc_random_events 权重2。/ When a stage progress roll fails (on_roll_failed → standard_first_contact_on_roll_failed): clues are added, then a 1-in-20 chance draws one event from the stage’s pool by weight, at most once per 125 days per site. This event sits in: early pool (default stage 1 and the stage 1 of marauders, pirates, caravaneers, nomads) weight 2; late pool (default stage 2 and the end stages) weight 2; octopodes pool weight 2。

## 剧情脉络 Story outline

**他们扫描了首都（5015）**：对方飞船扫描了我方首都，震惊。两个选项——“我们必须做好准备”（非亲异族；5400天预防性战争经济修正）/“……为了友谊”（非排外、非灭绝倾向、非内向完美；5400天外星友谊社会修正）。 / A foreign ship scanned our capital. Option A (not for xenophiles): preventive war economy modifier for 5400 days; option B (not for xenophobes / homicidal / inward perfection): alien-friendship society modifier for 5400 days.

## 分支与结局 Branches and outcomes

两选项按伦理互斥。 / Options exclusive by ethics.

## 条件与文明差异 Conditions and variants

仅当对方已扫描过我方首都（首都已被对方勘测）才可能；对方非普通国家（如飞地）时为0；一次性标志 they_scanned_our_capital。 / Only possible after the contact has surveyed our capital; 0 for non-default countries; once via they_scanned_our_capital. 每个站点每个事件最多一次（flag fc_event_5015 或同类标记）。/ Once per site.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/first_contact_random_events.txt:79-163` · `common/scripted_effects/first_contact_effects.txt:1257-1795`
- 已核对 Checked：脚本、scripted effect 中各池的权重与零权重条件、standard_first_contact_on_roll_failed。/ Script, per-pool weights and exclusions, and the roll-failure wrapper.
- 审阅改动 Changes：无结构改动（独立插曲页）；补充了触发池与条件。/ No structural change; trigger pools and conditions added.
