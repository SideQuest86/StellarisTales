# 星河守护者 / Guardians of the Galaxy

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: common/scripted_effects/fallen_empire_scripted_effects.txt:587-623; events/fallen_empire_awakening_events.txt:331-423; events/fallen_empire_awakening_events.txt:425-578; events/observer_events.txt:1278 · 部分审阅 Partially reviewed 2026-10-12

## 如何开始 How it starts

任一天灾出现时（各天灾生成事件调用 awaken_guardians_of_the_galaxy），60%随机挑选一个、15%挑选全部符合条件的失落帝国（狂热唯物、狂热亲外或蜂巢的战争碎片，舰队实力>60000）成为守护者；之后按平均5年（3600天后约0.05年）的 MTTH 触发隐藏事件 fallen_empires_awakening.4（fallen_empire_scripted_effects.txt:587-623；fallen_empire_awakening_events.txt:331-389）。

When a crisis appears (each crisis spawn calls awaken_guardians_of_the_galaxy), 60% pick one and 15% pick all eligible Fallen Empires (fanatic materialist, fanatic xenophile, or the hive War fragment, fleet power > 60000) as guardians; hidden fallen_empires_awakening.4 then fires with a 5-year MTTH (nearly immediate after 3600 days) (fallen_empire_scripted_effects.txt:587-623; fallen_empire_awakening_events.txt:331-389).

## 剧情脉络 Story outline

守护者觉醒，所有玩家收到“星河守护者”fallen_empires_awakening.5，观察者模式收到相同文本的 observer.74。若守护者是蜂巢的战争碎片，它觉醒时吸收其余碎片，与其有通讯的帝国各收到一次“[碎片]的终结”fallen_empires_awakening.11。天堂之战已发生时不会出现。

The guardian awakens; every player gets Guardians of the Galaxy fallen_empires_awakening.5, observers get the same text as observer.74. If the guardian is the hive War fragment, it absorbs the other fragments as it awakens and each empire in contact receives End of the [fragment] fallen_empires_awakening.11. Does not happen if the War in Heaven already started.

## 分支与结局 Branches and outcomes

fallen_empires_awakening.5 的两个回答（“他们能拯救我们吗？”/“我们不需要他们！”）没有不同效果；所有普通国家对守护者随机获得好感修正。

The two replies of fallen_empires_awakening.5 ("Will they be able to save us?" / "We do not need them!") have no different effects; every regular empire gets a random opinion bonus towards the guardian.

## 条件与文明差异 Conditions and variants

窗口图片按守护者是否为蜂巢意识而不同。

The picture differs depending on whether the guardian is a hive mind.

## 审阅记录 Review notes

- 修正：fallen_empires_awakening.0 是 is_test_event 的测试事件，原草稿据此生成了虚假的故事 event-fallen-empires-awakening-0；现将其吸收为本故事的隐藏成员，使该虚假故事消失（其结果文档已在本树和“天堂之战”中）。
  Correction: fallen_empires_awakening.0 is an is_test_event debug event, from which the draft built a false story event-fallen-empires-awakening-0; it is now absorbed as a hidden member here so the false story disappears (its outcome docs are already in this tree and in War in Heaven).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- 不确定之处：“合一”bio.3400 只在控制碎片觉醒时发出（fallen_empire_awakening_events.txt:456-475），而本路径觉醒的是战争碎片，故不会出现；需编译器支持对隐藏入口结果的 suppress。
  Open questions: Unity bio.3400 is only sent when the Control fragment awakens (fallen_empire_awakening_events.txt:456-475), while this path awakens the War fragment, so it does not occur here; needs compiler support for suppressing hidden-entry outcomes.
