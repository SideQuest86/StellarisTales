# 大可汗 / The Great Khan

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/marauder_events.txt:7204-9792; events/marauder_events.txt:10239-10306; events/observer_events.txt:279-460; events/nomads_events_1.txt:6127; common/on_actions/00_on_actions.txt:824-825,1412-1414 · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

- 自然觉醒：中期开始3年后（且未到末期），休眠掠夺者按平均100年 MTTH（中期50年后×0.66，多个氏族时变慢；有玩家可汗后裔起源时×0.02）触发隐藏事件 marauder.500（L7204-7268）。
  Natural awakening: from 3 years into the mid game (before the end game) a dormant marauder clan fires hidden marauder.500 with a 100-year MTTH (×0.66 after 50 mid-game years, slower with several clans, ×0.02 if a player has Heirs of the Khan) (L7204-7268).
- 被激发：在非可汗后裔局中，有人摧毁掠夺者的虚空居所且其仍有至少3座时，marauder.525 设置 horde_triggered 并立即调用 marauder.500（on_ship_destroyed_victim；L8320-8345）。
  Provoked: without a player Heirs of the Khan, destroying a marauder void dwelling while the clan still has at least 3 makes marauder.525 set horde_triggered and call marauder.500 at once (on_ship_destroyed_victim; L8320-8345).

## 剧情脉络 Story outline

- marauder.500 立起大可汗：自然觉醒时所有帝国收到“战争之鼓”marauder.501，被激发时收到“睡狮苏醒”marauder.526；随后大可汗的宣言 marauder.502。若玩家是可汗后裔，则先出现一个“可汗竞争者”，玩家收到“宣称者”nomads.600（起源支线），十年内无人称汗才由 AI 氏族称汗（L7270-7400）。
  marauder.500 raises the Great Khan: every empire gets The Drums of War marauder.501 (natural) or The Sleeper Awakes marauder.526 (provoked), then the Khan's proclamation marauder.502. With a player Heirs of the Khan, an aspiring Khan appears first and the player gets The Claimant nomads.600 (origin branch); an AI clan only takes the title if nobody does within ten years (L7270-7400).
- 征服期：汗国攻占星球时原主收到 marauder.504；之后夺回该星球时，解放者按情况收到 516/517/518。联络大可汗（550）可谈投降——接受后成为“辖地”（551→552 公告与10天后的驻军基地 553），已是辖地者可要求独立（554）。AI 帝国被夺走足够多星球后也会按 MTTH 归顺（555）。
  Conquest: when the Horde takes a planet its former owner gets marauder.504; when it is retaken, the liberator gets 516/517/518. Contacting the Khan (550) allows surrender - accepting makes us a Satrapy (551 -> announcement 552 and a garrison base 553 ten days later); a Satrapy can demand independence (554). AI empires that lose enough planets also submit by MTTH (555).
- 大可汗之死：第一次旗舰被毁时他逃脱并在180–360天后回归（另一故事 event-marauder-505）；第二次被毁则身亡，所有帝国收到 marauder.510，击杀者两天后收到“寻回大可汗的王座”710。若他寿终或死于他因，则走另一故事 event-marauder-511 的 marauder.513。两种死亡都在200–300天后进入继承。
  Death of the Khan: the first time his flagship is destroyed he escapes and returns after 180-360 days (another story, event-marauder-505); the second time he dies, everyone gets marauder.510 and the killer gets Great Khan's Throne Recovered 710 two days later. Death by age or other causes runs through marauder.513 in event-marauder-511. Either way the succession follows after 200-300 days.
- 继承 marauder.600 随机其一：分崩离析（620，原辖地4天后收到670）、新汗国（640，10天后拆除驻军671）、新星帐汗国（660/661）、归于旧道（630，10天后670）。此后联络汗国得到 marauder.665。
  Succession marauder.600 picks one: the Horde splinters (620; former satrapies get 670 four days later), a new Khanate (640; garrisons scuttled 671 after 10 days), the New Galactic Horde (660/661), or a return to the old ways (630; 670 after 10 days). Contacting the Horde afterwards gives marauder.665.

## 分支与结局 Branches and outcomes

觉醒方式（501/526）互斥；继承四结局互斥；解放三视角互斥。550 中关于语言与信仰的提问只是对话，不改变走向。

The awakening windows (501/526) are exclusive; the four succession outcomes are exclusive; the three liberation views are exclusive. The language and faith questions in 550 are dialogue only.

## 条件与文明差异 Conditions and variants

550 正文按我方是否辖地、是否反叛、是否灭绝型帝国等分为20余段；502 对机械帝国有另一回答。observer.* 窗口是观察者模式下的同一事件。

550 has over twenty passages by whether we are a Satrapy, rebelling or genocidal; 502 has a separate reply for machines. The observer.* windows are the observer-mode versions of the same events.

## 审阅记录 Review notes

- 修正：草稿把觉醒（event-marauder-525）、战死与继承（509）、攻占（503）、归顺（555）、解放（515）分成五个故事，并把大可汗通讯混在掠夺者通讯菜单里；现合并为一条以大可汗为中心的故事，按觉醒→征服→死亡→继承排列。
  Correction: the draft split the awakening (event-marauder-525), death in battle and succession (509), conquest (503), submission (555) and liberation (515) into five stories and mixed the Khan's contact into the marauder menu; they are now one Great Khan story ordered awakening -> conquest -> death -> succession.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- 不确定之处：第一次战败（505/506/508/524）与寿终（511–514）属于他人负责的故事，本故事只以说明连接；建议并入本家族。
  Open questions: The first defeat (505/506/508/524) and death by age (511-514) belong to stories owned by another reviewer and are only referenced here; merging them into this family is suggested.
