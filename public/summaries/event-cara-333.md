# 行商联盟 / Caravansary Caravan Coalition

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/caravaneer_events.txt:12-330`; `events/caravaneer_events.txt:465-1290`; `events/caravaneer_events.txt:5639-5672`; `common/scripted_effects/caravaneer_scripted_effects.txt:1-8`; `common/on_actions/00_on_actions.txt:731-732`
- 审阅 Reviewed：2026-10-13（已审阅 reviewed）

## 如何开始 How it starts

点击“行商联盟”贸易站（楚尔罗盘）或车队的盾徽即打开主菜单 cara.100（on_custom_diplomacy）；在敌对时改为 cara.101。AI 由每月检查 cara.333 引入。

Clicking the Caravansary Caravan Coalition tradestation (Chor's Compass) or a fleet shield opens the main menu cara.100 (on_custom_diplomacy); while hostile, cara.101 shows instead. The AI is brought in by the monthly check cara.333.

## 剧情脉络 Story outline

cara.100 是一个可反复回来的菜单：老虎机（cara.200/210，用行商币抽奖，每次回到老虎机窗口）、圣物箱（cara.300 → 购买 cara.310 → 若抽到迦拉特隆则 cara.320）、行商币（cara.150，购买虚拟货币 8k/12k/26k 或查账）；以及“关于”三支车队的对话选项和结束通话。

cara.100 is a menu one returns to repeatedly: slots (cara.200/210, gamble CaravanCoinz, each result returns to the slots window), Reliquaries (cara.300 → purchase cara.310 → cara.320 if the Galatron is drawn) and CaravanCoinz (cara.150, buy 8k/12k/26k or check the account); plus dialog options "about" the three fleets and an end-communication option.

## 分支与结局 Branches and outcomes

老虎机结果与圣物箱内容均为随机（权重见评注）；迦拉特隆全银河只有一件。其他选项互相独立、可重复。

Slot results and Reliquary contents are random (weights in the notes); there is a single Galatron in the galaxy. The other options are independent and repeatable.

## 条件与文明差异 Conditions and variants

主菜单正文有三种问候，另有“从舰队盾徽进入”“从子菜单返回”的变体；嗜杀帝国只有“去死”式的退出选项。

The main menu has three greeting texts plus variants for "entered from a fleet shield" and "returned from a submenu"; homicidal empires get only the "Die..." exit.

## 审阅记录 Review notes

核对了菜单脚本、价格、权重和 AI 访问条件；cara.101 并入本故事；行商币是内部变量 owned_cc_var。

Menu script, prices, weights and the AI visit condition were checked; cara.101 is merged here; CaravanCoinz is the internal variable owned_cc_var.
