# 神秘构造 / Mysterious Construct

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

需要《遥远繁星》。有毒星球可能生成（5级，权重1，全局一次）。

Requires Distant Stars. Can spawn on toxic planets (level 5, weight 1, once per game).

## 剧情脉络 Story outline

1. distar.155“腐蚀战舰”：山中躺着一台远古巨型机器人战舰，正被酸雨腐蚀。允许人工智能的非机械帝国可“拉出来”，机械帝国可“救助同伴”，两者都开启 RECOVER_WARFORM_PROJECT（需要工程船或方舟，60天，限时1800天）；其余选项任其腐蚀。
2. 项目成功 → distar.156“战舰被修复了”：战舰重启并显露人工智能；超时失败 → distar.157“战舰被毁”。
3. distar.158–163 是与战舰AI的对话：诊断、询问造主等问题只显示回答；“谁制造了你”推进到“造主”循环（159、160），再到“你是造主吗”（161）。回答“不是”经硬件询问（162、163）到达 distar.164；非机械帝国回答“从某种程度上来说是”直接到 distar.164。
4. distar.164“S875.1战体”：欢迎它（作为传奇舰队指挥官连同战舰加入；狂热净化者与吞噬虫群不可）或取代AI → distar.165 再次劝阻；坚持取代 → distar.166 → distar.167“战舰被毁”（拆解或研究残骸）。

1. distar.155 "Corroding Warship": an ancient colossal robot warship lies in the mountains, eaten by acid rain. Non-machine empires that allow AI can "pull it out", machine empires can "recover a fellow machine"; both start RECOVER_WARFORM_PROJECT (constructor or arkship, 60 days, 1800-day limit); the other options leave it to corrode.
2. Success → distar.156 "Warship Restored": it reboots and reveals an AI; time-out → distar.157 "Warship Destroyed".
3. distar.158–163 are the conversation: diagnostics and questions about its makers only show replies; "Who made you?" leads into the "MAKERS" loop (159, 160) and "Are you makers?" (161). Answering "no" goes through the hardware questions (162, 163) to distar.164; non-machine empires answering "in a manner of speaking" go straight to distar.164.
4. distar.164 "S875.1 Warform": welcome it (it joins as a renowned commander with its ship; not for Fanatic Purifiers or Devouring Swarm) or replace the AI → distar.165 pleads; insisting → distar.166 → distar.167 "Warship Destroyed" (strip it for parts or study the wreck).

## 分支与结局 Branches and outcomes

项目结果 156/157 互斥。对话中多数提问为 is_dialog_only，只给回答不推进。最终结局二选一：招募 S875.1（164 或 165 的接纳选项）或强行替换导致战舰自毁（166→167）。

Project results 156/157 are exclusive. Most questions in the conversation are dialog-only. Final outcome is either recruiting S875.1 (accept option of 164 or 165) or forcing the replacement, which makes the ship self-destruct (166→167).

## 条件与文明差异 Conditions and variants

禁止人工智能的帝国只能任其腐蚀；机械智能使用 .machi 措辞并跳过“从某种程度上来说”的捷径。格式塔帝国接纳时，一名军团议员获得 Warform 节点特质。distar.156 有机械智能版本正文。

AI-outlawing empires can only let it corrode; machine intelligences get .machi wordings and lack the "in a manner of speaking" shortcut. Gestalts accepting it give a legion councillor the Warform node trait. distar.156 has a machine text.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/anomalies/95_anomaly_categories_distant_stars.txt:589-609; events/distant_stars_events_1.txt:4551 (distar.155); common/special_projects/00_projects_distant_stars.txt:174 (RECOVER_WARFORM_PROJECT); events/distant_stars_events_1.txt:4610 (distar.156); events/distant_stars_events_1.txt:4766 (distar.157); events/distant_stars_events_1.txt:4782-5208 (distar.158-166); events/distant_stars_events_1.txt:5211 (distar.167)
已核对异常、distar.155–167 与 RECOVER_WARFORM_PROJECT。草稿树结构正确（对话循环以 ref 节点表示）；补充重复标题的地图标签、项目互斥与两种结局。

Checked the anomaly, distar.155–167 and RECOVER_WARFORM_PROJECT. The draft tree was structurally correct (the conversation convergence uses ref nodes); added map labels for repeated titles, the project exclusivity and the two endings.
