# 发现环境改造候选 / Terraforming Candidate Discovered

- 分类 Category：探索 Exploration

## 如何开始 How it starts

on_survey_planet：科学船勘测到带有 terraforming_candidate 修正的行星。隐藏事件 anomaly.2574 对该国第一次发现（国家标志 found_terraform_candidate）触发 anomaly.2575；之后再发现只发送一条 MESSAGE_TERRAFORM_FOUND 通知。

on_survey_planet: a science ship surveys a planet with the terraforming_candidate modifier. The hidden event anomaly.2574 fires anomaly.2575 for the country's first such find (country flag found_terraform_candidate); later finds only send a MESSAGE_TERRAFORM_FOUND notification.

## 剧情脉络 Story outline

单一事件 anomaly.2575“发现环境改造候选”（非游牧国家）：正文按是否已有 tech_climate_restoration 与恒星是否被戴森球包围分三种；选项为“已记下”（说明可改造，属于 TERRAFORMING_CANDIDATE_EFFECT 提示）、荒野帝国版本，或在被戴森球包围的恒星系中改为“不幸”：每月社会研究加成。

Single event anomaly.2575 "Terraforming Candidate Discovered" (non-nomad countries): the text has three versions by whether tech_climate_restoration is known and whether the star is enclosed by a Dyson sphere; the options are the standard acknowledgement (the TERRAFORMING_CANDIDATE_EFFECT tooltip), a wilderness-empire version, or, in a system with a Dyson sphere, "Unfortunate": a monthly society research bonus.

## 分支与结局 Branches and outcomes

单一事件；选项由是否荒野帝国与戴森球决定。

Single event; the options are decided by wilderness-empire status and the Dyson sphere.

## 条件与文明差异 Conditions and variants

正文与选项按 tech_climate_restoration、戴森球、荒野帝国变化。

Text and options vary with tech_climate_restoration, a Dyson sphere and wilderness-empire status.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/on_actions/00_on_actions.txt:1133 (on_survey_planet → anomaly.2574); events/anomaly_events_2.txt:868 (anomaly.2574); events/anomaly_events_2.txt:905 (anomaly.2575)
已核对 on_action 与两个事件；编译树正确。

Checked the on_action and both events; the compiled tree is correct.
