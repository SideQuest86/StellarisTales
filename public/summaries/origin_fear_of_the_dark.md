# 黑暗之怖 / Fear of the Dark

- 分类 Category：起源 Origins · DLC：First Contact · 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/origin_events_3.txt:2556-6540`、`common/situations/04_first_contact_dlc_situations.txt`、`common/special_projects/00_projects_first_contact_dlc.txt`、`common/on_actions/00_on_actions.txt`

> 本导读是审阅者的说明文字，不是游戏原文。 This guide is reviewer commentary, not game text.

## 如何开始 How it starts

没有固定的开局事件：开局只生成“分离主义星球”。之后每年脉冲（隐藏事件 6000）按权重抽取一种遭遇（移交请求 6005/6006、洞察 6015、援助请求 6020、援助提议 6025），中期脉冲（6140）25 天后提供项目“确认发现”（6145）。
There is no fixed opening event: game start only builds the separatist planet. Each yearly pulse (hidden 6000) draws one encounter (transfer request 6005/6006, insight 6015, aid request 6020, aid offer 6025); the mid-game pulse (6140) offers the Confirm Findings project 25 days later (6145).

## 剧情脉络 Story outline

1. **猎手线**：6145 → 项目“确认发现” → 6150“恐怖的证据”（建立事件链与目标星系）→ 舰船首次进入 6155 → 勘察猎手行星 6160：选择毁灭（6165 + 13 天后 6170“最后的赠礼”）或宽恕（6270 每 360 天检查 → 6275）。
   **Hunters line**: 6145 -> project -> 6150 -> first ship into the system 6155 -> survey the hunters' planet 6160: destroy them (6165, then 6170 *The Final Gift* 13 days later) or show mercy (6270 checks every 360 days -> 6275).
2. **最后的礼物**：6170 启动局势（倒计时），阶段2（6185）提供四个并行应对项目；四项全部完成且仍拥有母星 → 每月检查 6180；倒计时满 → 6175“遭到猎杀”。
   **The Last Gift**: 6170 starts the countdown situation; stage 2 (6185) opens four parallel projects; with all four done and the homeworld kept the monthly check 6180 succeeds; at 100% -> 6175.
3. **分离主义线**：6005/6006 → 6010 → 6011 → 6012“回家”；其他状态事件见下。
   **Separatist line**: 6005/6006 -> 6010 -> 6011 -> 6012; other state events below.

## 分支与结局 Branches and outcomes

- 每年脉冲的五种遭遇互斥；开战反应 6085/6090/6220 互斥；危机下的猎手来袭 6125/6130/6135 互斥。 Yearly encounters, war reactions and crisis versions are each exclusive.
- 结局：6180（成功）、6175（被猎杀）、6012（回乡）。 Endings: 6180, 6175, 6012.

## 条件与文明差异 Conditions and variants

- 由其他系统触发的起源专属窗口：接触报告（6030/6040/6060）、首次接触（6045）、联邦（6055）、成为附庸（6065/6075）、传统与飞升（6095–6120）、迁徙协议（6205）、地貌改造（6230–6240）、守夜（6260）。 Origin-specific windows fired from other systems: see the labels in the tree.

## 审阅记录 Review notes

- 已核对 Checked：6000–6275 事件、两个局势、四个对策项目、on_action 与传统钩子。 Events 6000-6275, both situations, the four countermeasure projects and the hooks.
- 更正 Corrections：通用的接触报告（story.1–8）与传统/飞升父事件（bio.170/175/180、utopia.2700/2703）仍显示在树中（编译器会把只通向本起源的根并入），但已标注为通用事件；所有状态入口加标签。保留 V3 已核对的猎手线与最后的礼物连接。 The generic contact reports and tradition parents still appear in the tree (the compiler absorbs roots whose outcomes all belong to the origin) but are marked as generic; all state entries labelled; the V3-verified hunters and Last Gift bridges are kept.
- 不确定 Uncertain：6125/6130/6135 对应的危机仅按事件编号识别。 The crisis behind 6125/6130/6135 is identified by id only.
