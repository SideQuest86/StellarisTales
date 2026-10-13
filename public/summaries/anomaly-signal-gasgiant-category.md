# 气态巨行星信号 / Gas Giant Signal

- 分类 Category：深空异闻 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/anomalies/00_anomaly_categories.txt:710; events/anomaly_events_4.txt:10 (anomaly.5000); common/special_projects/00_projects_1.txt (GAS_GIANT_SIGNAL); events/anomaly_events_4.txt:42 (anomaly.5001); events/anomaly_events_4.txt:72 (anomaly.5002); events/anomaly_events_4.txt:93 (anomaly.5003); common/special_projects/00_projects_1.txt (GAS_GIANT_RELOCATION); events/anomaly_events_4.txt:160 (anomaly.5004); events/anomaly_events_4.txt:202 (anomaly.5005); events/anomaly_events_4.txt:223 (anomaly.5006)

## 如何开始 How it starts

气态巨行星可能生成（5级，权重1，全局一次 max_once_global）。

Can spawn on a gas giant (level 5, weight 1, once globally via max_once_global).

## 剧情脉络 Story outline

单一结果 anomaly.5000“气态巨行星信号”：给行星打上 tollok_rong 标志；选项a启用项目 GAS_GIANT_SIGNAL“分离信号”（180天，限时1080天，科学船+科学家）；选项b放弃。项目完成 → anomaly.5001（30天后 story.6 报告，行星改名“托洛克·荣”），“接入”后进入 anomaly.5003“气态巨行星传输信号”（对话：a-c 只显示回应，e 结束；d 选定最近的一颗无主或自己的气态巨行星为“巴尔达拉克”，并启用项目 GAS_GIANT_RELOCATION“转移达斯纳克”，180天，限时1080天）。转移完成 → anomaly.5004（该行星改名“巴尔达拉克”、获得 gas_giant_civ 修正与 d_society_5 矿藏）→ anomaly.5006“信号传输接入”（设置 baldarak_settled，标本 dathnak_gas，对话）。两个项目超时（1080天）分别触发 anomaly.5002 / anomaly.5005“特殊项目失败”。

Single result anomaly.5000 "Gas Giant Signal": flags the planet tollok_rong; option a enables project GAS_GIANT_SIGNAL "Isolate Signal" (180 days, 1080-day limit, science ship and scientist); option b walks away. Project complete → anomaly.5001 (a story.6 report 30 days later; the planet is renamed Tollok Rong) and, once connected, anomaly.5003 "Gas Giant Transmission" (a dialogue: a-c only show replies, e ends; d marks the nearest unowned or own gas giant as 'Baldarak' and enables project GAS_GIANT_RELOCATION "Dathnak Relocation", 180 days, 1080-day limit). Relocation complete → anomaly.5004 (the planet is renamed Baldarak, gets the gas_giant_civ modifier and a d_society_5 deposit) → anomaly.5006 "Incoming Transmission" (sets baldarak_settled, specimen dathnak_gas, a dialogue). Each project that times out (1080 days) fires anomaly.5002 / anomaly.5005 "Special Project Failed".

## 分支与结局 Branches and outcomes

5000 的a/b二选一；每个项目要么按时完成要么超时失败（失败事件只有一个“不幸”选项）。5003 的对话选项中只有 d 会推进到转移项目。

5000's options a/b are alternatives; each project either completes in time or fails on timeout (the failure events have a single 'Unfortunate' option). In 5003's dialogue only d advances to the relocation project.

## 条件与文明差异 Conditions and variants

anomaly.5006 的选项a按所有者是否为巴尔达拉克物种变化。

anomaly.5006's option a depends on whether the owner is of the Baldarak species.

## 审阅记录 Review notes

已核对异常、anomaly.5000–5006、两个项目；编译树正确，无需改动。

Checked the anomaly, anomaly.5000-5006 and both projects; the compiled tree is correct, no change needed.
