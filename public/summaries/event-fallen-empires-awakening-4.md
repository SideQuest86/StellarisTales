# 星河守护者 / Guardians of the Galaxy

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

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

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/scripted_effects/fallen_empire_scripted_effects.txt:587-623; events/fallen_empire_awakening_events.txt:331-423; events/fallen_empire_awakening_events.txt:425-578; events/observer_events.txt:1278
- 修正：fallen_empires_awakening.0 是 is_test_event 的测试事件，原草稿据此生成了虚假的故事 event-fallen-empires-awakening-0；现将其吸收为本故事的隐藏成员，使该虚假故事消失（其结果文档已在本树和“天堂之战”中）。
  Correction: fallen_empires_awakening.0 is an is_test_event debug event, from which the draft built a false story event-fallen-empires-awakening-0; it is now absorbed as a hidden member here so the false story disappears (its outcome docs are already in this tree and in War in Heaven).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- 更新（2026-10-13）：两条路径已核对——守护者不是蜂巢时 fallen_empires_awakening.4 直接让该堕落帝国觉醒（fallen_empires_awakening.3，革命复兴 + 古代科技储备），蜂巢战争碎片则走 fallen_empires_awakening.10（吸收其他碎片并向通讯国发 .11）。“合一”bio.3400 只在控制碎片觉醒时由 .10 发出（L456-475），本路径不会出现，已用 exclude 从此故事中去掉。
  Update (2026-10-13): both paths are verified - when the guardian is not a hive, fallen_empires_awakening.4 awakens that fallen empire directly (fallen_empires_awakening.3, revanchist fervor + ancient caches of technology); the hive War fragment goes through fallen_empires_awakening.10 (it absorbs the other fragments and sends .11 to empires in contact). "Unity" bio.3400 is only sent by .10 when the Control fragment awakens (L456-475), so it does not occur on this path and is removed from this story with exclude.
