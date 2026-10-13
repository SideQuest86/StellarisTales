# 坚守战线 / Hold the Line

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Cosmic Storms · 来源 Sources：`common/on_actions/00_on_actions.txt:5419-5427`、`events/cosmic_storms_events_1.txt:28-140`、`events/cosmic_storms_events_1.txt:1410-1455`、`events/cosmic_storms_events_1.txt:1457-1730`、`common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:626-681` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421-5427）有5/105的几率抽到隐藏事件 cstorms.5。cstorms.5（cosmic_storms_events_1.txt:28-140）在该系统的一颗合适行星上做随机抽取，其中“坚守战线”一项的基础权重为0，只有当行星所在星系属于非格式塔国家时才加到1，然后向行星发出 cstorms.1270。cstorms.1270（1410-1455）要求系统归非 AI 国家所有、系统里没有栖息地，且只触发一次（fire_only_once），它设置 hold_the_line_habitat 旗标并创建考古遗址 site_hold_the_line 与“未识别栖息地”环境物体。

When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421-5427) there is a 5/105 chance of hidden cstorms.5. It (cosmic_storms_events_1.txt:28-140) rolls on a suitable planet in the system; the "Hold the Line" entry has base weight 0 and gets +1 only if the system belongs to a non-gestalt country, then fires cstorms.1270 on the planet. cstorms.1270 (1410-1455) needs a system owned by a non-AI country with no habitat, fires only once, sets hold_the_line_habitat, creates the archaeological site site_hold_the_line and an "unidentified habitat" ambient object.

## 剧情脉络 Story outline

遗址共6个阶段（难度均为4，需要科学家领袖，stages=6，10_cosmic_storms_arc_sites.txt:626-681）：1275 全新的困惑 → 1280 手动覆盖 → 1285 您的来电对我们很重要（联系商业实体 Skygarden 的客服）→ 1290 选项迷宫（三个互斥态度）→ 1295 遵守流程 → 1300 重启栖息地，创建“habitat_central_complex”。每阶段可有月度资源奖励；失败时按 cosmic_storm_precursor_random_events 随机出事故。

The site has 6 sequential stages (difficulty 4 each, scientist leader, stages=6, 10_cosmic_storms_arc_sites.txt:626-681): 1275 Brand New Bemusement, 1280 Manual Override, 1285 Your Call is Important To Us (the Skygarden help desk), 1290 Maze of Options (three exclusive attitudes), 1295 Following Protocol, 1300 the habitat restarts and a "habitat_central_complex" is created. Stages can give monthly resource bonuses; a failed roll draws from cosmic_storm_precursor_random_events.

## 分支与结局 Branches and outcomes

唯一分支在 1290：咒骂 / 沉默 / 乱按，三者互斥，只改变 1295 的文字与奖励。

The only branch is at 1290: swear / stay silent / mash buttons, mutually exclusive, changing only the text and reward of 1295.

## 条件与文明差异 Conditions and variants

编译器显示入口概率“0.00*”：其含义是基础权重0，仅在非格式塔所有者时+1（见上），并非不可达。

The compiler shows entry p=0.00*: that is base weight 0 raised to 1 only for a non-gestalt owner (see above), not unreachable.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 同一抽取中的其他结果（异常 STORMS_ANOM_*、望远镜 cstorms.1600、模仿者类别）属于其他故事。
  The other results of the same roll (anomalies STORMS_ANOM_*, telescope cstorms.1600, the imitator category) belong to other stories.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
