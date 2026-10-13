# 灵能光环逼近 / Psionic Aura Approaches

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / Galactic miscellany
- 来源 Sources：`events/shroud_events.txt:9122-9251 (4190/4191/4195)`; `common/scripted_effects/psionic_auras_scripted_effects.txt:250-302`; `common/patrons/psionic_auras/00_auras.txt (on_start → check_psionic_suppression_eligibility)`
- DLC：Shadows of the Shroud
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

任何非“终末”灵能光环开始（光环 on_start 调用 check_psionic_suppression_eligibility）时，光环所在或相邻星系的拥有者若尚未遭遇过灵能光环，就会收到此事件（has_encountered_psionic_auras 只设一次）。

When any non-End psionic aura starts (aura on_start → check_psionic_suppression_eligibility), owners of the aura system or neighbouring systems who have never encountered an aura get this event (has_encountered_psionic_auras, once).

## 剧情脉络 Story outline

非灵能帝国看到 4190：科学家描述跨星系蔓延的未知能量流；若已与灵督城邦通讯，追加一段说明城邦可能知道对策。灵能飞升帝国看到 4191：灵能者辨认出光环来自哪个帝国，并按双方关系判断其影响是有利还是有害。

Non-psionic empires see 4190: scientists describe spreading energy flows; if in contact with the Mindwarden Enclave an extra paragraph says it may know countermeasures. Psionic-ascended empires see 4191: telepaths identify the emitting empire and judge from relations whether its effects will be favourable or harmful.

## 分支与结局 Branches and outcomes

4190 的选项在存在未接触的灵督城邦时，15天后自动与它建立联系（隐藏 4195），把玩家引向灵督城邦的服务。4191 只有一个确认选项，文字按有机/非格式塔与是否敌对而不同。

4190's option establishes contact with an uncontacted Mindwarden Enclave 15 days later (hidden 4195), leading to the enclave's services. 4191 has one acknowledgement whose wording depends on organic/non-gestalt and hostility.

## 条件与文明差异 Conditions and variants

4191 的正文按是否已与光环来源通讯、是否知晓光环（power_of_will）以及双方关系变化。

4191 varies by communications with the emitter, knowledge of auras (power_of_will) and relations.

## 审阅记录 Review notes

修正：4190 与 4191 是同一触发的互斥版本，原草稿分为两张卡；现合并为一个故事并加互斥组。

Correction: 4190 and 4191 are exclusive variants of one trigger, split into two cards in the draft; merged with an exclusive group.
