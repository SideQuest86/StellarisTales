# 灰色风暴 / The Gray Tempest

- 分类 Category: 天灾 Crisis · 来源 Sources: `events/gray_goo_events.txt:11-629, 2913-2934`, `events/distant_stars_events_3.txt:1110-1135, 1330-1425`, `events/observer_events.txt:1100-1128` · 远星（Distant Stars）DLC · 审阅 Reviewed 2026-10-13 (c5b-crisis)

> 审阅者导读（评注），不是游戏原文。 / Reviewer commentary, not game text.

## 如何开始 How it starts

- 开局时 `distar.8000` 在四种 L 星团结局中随机选一种：灰色风暴 50（关闭“破坏性玩法”规则时为 0）/ 空星团 30 / 龙季 30 / 德萨努协和国 30（`distant_stars_events_3.txt:1110-1135`）。只有选中风暴，设置 `gray_goo_crisis_set`。
- 玩家（或 AI）打开 L 星门时，隐藏事件 `distar.10950` 在该标记下触发隐藏的 `graygoo.1`（`distant_stars_events_3.txt:1367-1370`）。
- The game start rolls one of four L-Cluster outcomes; only a Tempest roll sets the flag, and opening the L-Gate then fires hidden graygoo.1.

## 剧情脉络 Story outline

- `graygoo.1`（隐藏）唤醒银河守卫，创建灰蛊国家、纳米工厂和多支风暴舰队，在每个 L 星门放置舰队，并每 3600 天增援一次（隐藏的 3 和 4）。
- 开场通知按身份分发（互斥）：`graygoo.10` 给开门者，`graygoo.11` 给有 L 星团线索链/项目的他国，`graygoo.13` 给其他国家；三者的选项都接 `graygoo.12`（截获的信号）。观察者收到 observer.64（文本相同）。
- 风暴舰队对殖民地轰炸到毁灭度 100 时 `graygoo.2`：人口死亡，星球变为灰蛊星球（可重复）。已驯服的纳米虫群星球被轰炸时 `graygoo.555`（真正的主人）。

## 分支与结局 Branches and outcomes

- **胜利**：摧毁纳米工厂（隐藏的 `graygoo.6`）→ 击破者收到 `graygoo.15`，其他玩家收到 `graygoo.16`，观察者收到 observer.65；所有风暴舰队消失，灰蛊星球变成可改造星球，国家被销毁。
- 没有主动的“失败”结局事件：本文件中没有风暴获胜的可读事件（见不确定项）。

## 条件与文明差异 Conditions and variants

- 开场事件的三个版本只因接收者与 L 星团的关系而不同，是同一通知的变体。

## 审阅记录 Review notes

- 原草稿把整个 L 星团的“星团的秘密”（风暴、德萨努协和国、小灰、空星团、龙）混为一个 59 文档的故事。现拆为：本篇（风暴）、`dessanu-consonance`、`lcluster-gray`。L 星门开启本身及龙季不属于本篇（归探索线路）。
- 不确定：风暴获胜或持续蔓延没有对应的可读事件；`timeline.64` 是时间线记录，不是故事文档。
