# 失落帝国行为 / Fallen Empire Behavior

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

开局时 game_start.10（events/game_start.txt:1706-1722）给每个失落帝国启动一个玩家看不到的情境 fallen_empires_situation，用来处理每月的随机事件。

At game start game_start.10 (events/game_start.txt:1706-1722) starts an invisible situation, fallen_empires_situation, on each Fallen Empire to drive its monthly random events.

## 剧情脉络 Story outline

情境每月（on_monthly）在 fallen_empires.1/.3/.10/.11 四个隐藏事件中按50/50/15/50抽一个（03_AI_empire_situations.txt:632-638）：.1 补充舰队；.3 发出警告；.10 建立联系（调用 action.1，属 event-action-1）；.11 补充建设舰。只有 .3 会产生可见的窗口：当失落帝国未参战、本年未发过警告、舰队战力>100000，且有一个已建立通讯、且失落帝国对其意见<-99的普通国家时，它向该国发出 4–8 中的一个“来自失落帝国的通讯”，并设置 fe_demand_made 旗标。

Each month (on_monthly) the situation draws one of four hidden events, fallen_empires.1/.3/.10/.11 with weights 50/50/15/50 (03_AI_empire_situations.txt:632-638): .1 refills the fleet, .3 sends a warning, .10 establishes contact (calls action.1, another story) and .11 gives a construction ship. Only .3 yields a visible window: if the Fallen Empire is at peace, has not warned in the last 360 days, has fleet power over 100000 and a contacted ordinary empire is held in opinion below -99 by it, it sends that empire one of 4-8 and sets fe_demand_made.

## 分支与结局 Branches and outcomes

4–8 是顺序匹配的互斥分支（见上）。每个窗口两选项：接受（执行要求并被羞辱）或拒绝（对方意见惩罚，旗标清除）；AI接受概率90%，若对方舰队战力>300000则不会接受。

4-8 are exclusive, matched in order (see above). Each window offers accept (carry out the demand and be humiliated) or refuse (opinion penalty); the AI accepts with weight 90 vs 10, never when its fleet power exceeds 300000.

## 条件与文明差异 Conditions and variants

各警告的触发条件见“剧情脉络”。

The conditions for each warning are listed above.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/game_start.txt:1706-1722`、`common/situations/03_AI_empire_situations.txt:618-660`、`events/fallen_empire_events.txt:90-190`、`events/fallen_empire_events.txt:190-450`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 编译器曾把 4–8 显示为各30%概率的并列随机项；已更正为顺序匹配。
  The compiler showed 4-8 as parallel 30% random entries; corrected to ordered matching.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
