# 奇怪的联系 / Strange Contacts

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C7 文明纪事 / Society
- 来源 Sources：`events/shroud_events.txt:13096-13290 (5000/5010-5013)`; `common/on_actions/00_on_actions.txt (on_game_start_country → 5000; on_post_communications_established → 5010)`; `common/scripted_triggers/08_scripted_triggers_shroud.txt (is_secret_societies_empire)`
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

拥有“秘密结社”国民理念（普通或企业版）的帝国：开局 shroud.5000 选定两个邻近帝国并为其预先建立接触。之后每次建立通讯（on_post_communications_established → 5010 → 5011）都会提高对该国的间谍网络等级。

Empires with the Secret Societies civic (regular or corporate): at game start shroud.5000 picks two neighbouring empires and pre-establishes contact. Every later communications establishment (on_post_communications_established → 5010 → 5011) raises the spy network level on that empire.

## 剧情脉络 Story outline

与两个开局邻国之一建立通讯后10天，5013“奇怪的联系”：我们怀疑社会中的秘密派系早已在外交幕后活动。与另一个邻国建立通讯后10天，5012“秘密结社出现”：三个秘密派系公开现身。

10 days after communications with one of the two starting neighbours, 5013 "Strange Contacts": we suspect secret factions have been working behind diplomacy. 10 days after communications with the other, 5012 "Secret Societies Emerge": three secret factions reveal themselves.

## 分支与结局 Branches and outcomes

两个事件按先后顺序发生（不是互斥）；5012 的选项生成秘密派系（roll_secret_factions）。

The two events happen in sequence (not exclusive); 5012's option rolls the secret factions (roll_secret_factions).

## 条件与文明差异 Conditions and variants

无。

None.

## 审阅记录 Review notes

修正：草稿把 5013 与 5012 作为互斥入口；脚本中 5011 先发 5013、再在下一次接触时发 5012，已加顺序连接。分类改为 C7（国民理念/派系与首次接触）。

Correction: the draft showed 5013 and 5012 as exclusive entries; 5011 sends 5013 first and 5012 on the next contact, so a sequence link was added. Category changed to C7 (civic/factions and first contact).
