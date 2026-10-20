# 火控改写 / Fire Control Overridden

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Nomads

## 如何开始 How it starts

方舟舰的戴森炮开火时（on_dyson_shoot → nomads.8000，dyson_gun_firing），若目标星系里有特殊对象，玩家收到对应窗口。

When an arkship's Dyson gun fires (on_dyson_shoot -> nomads.8000, dyson_gun_firing), a player gets a window if the target system holds a special target.

## 剧情脉络 Story outline

瞄准“AI帝国”（ai_empire）拥有的人工智能星球：火控被改写8050；射向异次元的维度传送门：力量反被对方吸收8055；射向塞塔娜的女王泰坦：首次为“失望”8060，再次则“反上一课”8065（她把耗费的资源还给我方）。

Aiming at an AI world owned by an ai_empire country: fire control is overridden (8050); at the extradimensional portal: the power is absorbed instead (8055); at Cetana's titan: A Disappointment (8060) the first time, A Lesson Returned (8065) when repeated (she returns what was spent).

## 分支与结局 Branches and outcomes

四个窗口互斥，均只有一个回答。

The four windows are exclusive, each with a single reply.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/nomads_events_1.txt:17264-17440; common/scripted_effects/nomads_effects.txt (dyson_gun_firing); common/on_actions/02_component_on_actions.txt:404
- 已核对 dyson_gun_firing 的条件分支顺序。
  Checked the order of the condition branches in dyson_gun_firing.
- 注：本文件的行号取自游戏文件本身；编译数据中该文件记录的行号有偏移（见账本请求）。
  Note: line numbers are from the game file itself; the compiled records for this file carry shifted line numbers (see ledger requests).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
