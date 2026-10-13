# 发现冰封环境改造候选 / Frozen Terraforming Candidate Discovered

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Aquatics Species Pack · 来源 Sources：`events/aquatics_events.txt:26-107`、`events/game_start.txt:845-870`、`common/on_actions/00_on_actions.txt:1135` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

开局生成银河时（game_start.txt:845-870，需要水生物种包），尺寸10–30、无异常、无纳米沉积的冰封行星有约1/101的几率获得 frozen_terraforming_candidate 修正。勘测行星时（on_survey_planet，common/on_actions/00_on_actions.txt:1135）隐藏的 aquatics.4 触发：行星带该修正且勘测国有水生特质。

At galaxy creation (game_start.txt:845-870, needs the Aquatics Species Pack) a frozen planet of size 10-30 with no anomaly or nanite deposit has about a 1/101 chance of the frozen_terraforming_candidate modifier. Surveying a planet (on_survey_planet, common/on_actions/00_on_actions.txt:1135) fires hidden aquatics.4 if it has that modifier and the survey owner has an aquatic trait.

## 剧情脉络 Story outline

只有首次发现时（国家旗标 found_frozen_terraform 尚未设置）才发出可见窗口 aquatics.5“发现冰封环境改造候选”；以后再发现只发一条消息。aquatics.5 要求非游牧；正文依是否同时拥有“水之心”天赋和气候修复科技而变；选项“有意思”，荒野帝国另有一个带图标的版本，均只提示“冰封改造候选”的效果。

Only the first discovery (country flag found_frozen_terraform unset) opens the visible window aquatics.5 "Frozen Terraforming Candidate Discovered"; later finds only send a message. aquatics.5 needs a non-nomad empire; its text varies by having both the Hydrocentric perk and Climate Restoration; the option Fascinating (and a wilderness-empire version with an icon) only shows the frozen-terraforming-candidate tooltip.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

水生特质、非游牧；荒野帝国有专用选项。

Aquatic trait, non-nomadic; wilderness empires get a dedicated option.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
