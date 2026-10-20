# 掠夺者帝国 / Marauder Empires

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

邻国已与掠夺者接触而我方尚未接触时，隐藏事件 marauder.2 按平均160个月的 MTTH 触发“发现[物种]战士”marauder.3（marauder_events.txt:230-329）；也可在任何首次接触结束时直接收到掠夺者的初次通讯 marauder.15（finish_first_contact_effect，first_contact_effects.txt:531）。之后每次在外交界面联络掠夺者，都经隐藏路由 marauder.1 打开对应窗口（on_custom_diplomacy）。

If a neighbour has met the Marauders and we have not, hidden marauder.2 (MTTH 160 months) shows Warriors Sighted marauder.3 (marauder_events.txt:230-329); finishing a first contact with them also gives their greeting marauder.15 directly (finish_first_contact_effect, first_contact_effects.txt:531). Afterwards every diplomatic contact with them goes through hidden router marauder.1 (on_custom_diplomacy).

## 剧情脉络 Story outline

- 这是一个可反复打开的通讯枢纽，不是一次性剧情。初次通讯之后，通常进入联络菜单 marauder.20：请他们掠袭对手（31→32，付款后目标收到来袭通知，见“掠袭”故事）、雇佣领袖（40）、雇佣佣兵舰队（34→37），或询问刺耳的尖叫声。菜单内的“算了”回到 marauder.21。
  This is a repeatable communication hub, not a one-time story. After the greeting, contact normally opens menu marauder.20: hire a raid against a rival (31 -> 32; once paid the target is warned, see the Raiding story), hire a leader (40), hire a mercenary fleet (34 -> 37), or ask about the shrieking. "Never mind" returns to marauder.21.
- 佣兵合同五年：1800天后“佣兵契约终止”marauder.50 询问是否续约；AI 雇佣时由每月检查 marauder.151 安排同一事件。佣兵指挥官死亡或被解职时，5天后“雇佣指挥官被取代”marauder.71。
  Mercenary contracts last five years: after 1800 days Mercenary Contract Ends marauder.50 asks whether to extend (for AI hirers the monthly marauder.151 schedules the same event). If a mercenary commander dies or is dismissed, Mercenary Commander Replaced marauder.71 follows 5 days later.
- 路由按情境择一打开窗口（marauder.1 L30-225）：可汗后裔起源有专门的氏族对话（750/755/760/765）；灭绝型帝国只得到拒绝（19）；正在被掠袭时转到掠袭对话（102/112，见“掠袭”）；汗国出现后转到大可汗或汗国的通讯（550/665，见“大可汗”）。
  The router opens exactly one window by situation (marauder.1 L30-225): Heirs of the Khan empires get their clan dialogues (750/755/760/765); genocidal empires only get a refusal (19); during a raid it switches to the raid dialogues (102/112, see Raiding); once the Horde exists it switches to the Great Khan or Horde contact (550/665, see The Great Khan).

## 分支与结局 Branches and outcomes

- 31 的目标选项与 34 的九支佣兵舰队（每个氏族三支）彼此互斥；32 若目标是失落帝国则改为被嘲笑的 35。
  The target options of 31 and the nine mercenary fleets of 34 (three per clan) are mutually exclusive; asking to raid a Fallen Empire gives the mocking reply 35 instead of 32.
- 没有结局：菜单可随时结束通讯，日后再打开。
  No ending: the menu can be closed at any time and reopened later.

## 条件与文明差异 Conditions and variants

三个掠夺者氏族（marauder_1/2/3）的台词与佣兵名单不同；可汗后裔视角的对话只在该起源下出现。

The three marauder clans (marauder_1/2/3) have different lines and mercenary rosters; the Heirs of the Khan dialogues only appear for that origin.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/marauder_events.txt:12-228 (contact router marauder.1); events/marauder_events.txt:230-329; events/marauder_events.txt:1066-3800; common/on_actions/00_on_actions.txt:729,96,2385,2423
- 修正：草稿把发现事件（event-marauder-2）、初次通讯（event-marauder-15）、合同到期（event-marauder-151）和指挥官替换（event-marauder-70）分成四个故事，并把大可汗与掠袭的对话混入此菜单；现合并为一个通讯枢纽，大可汗/掠袭对话归各自故事。
  Corrections: the draft split the sighting (event-marauder-2), greeting (event-marauder-15), contract end (event-marauder-151) and commander replacement (event-marauder-70) into four stories and mixed the Great Khan and raid dialogues into this menu; they are now one hub, with the Khan and raid dialogues in their own stories.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
