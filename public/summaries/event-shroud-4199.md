# 灵督城邦 / Mindwarden Enclave

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C6 巨兽与城邦 / Leviathans & enclaves
- 来源 Sources：`events/shroud_events.txt:9235-10840 (shroud.4195-4350)`; `events/shroud_events.txt:10656-10752 (4285/4286/4295)`; `events/shroud_events.txt:10842-11062 (4400-4410)`; `events/shroud_events.txt:14897-15805 (6850-6881)`; `common/solar_system_initializers/mindwarden_initializers.txt:8-150`; `common/scripted_effects/first_contact_effects.txt:702-718`; `common/on_actions/00_on_actions.txt:744`; `common/scripted_effects/shroud_shadows_scripted_effects.txt:4482-4508`; `events/origin_events_shadows_shroud.txt:3046-3079 (6827)`
- DLC：Shadows of the Shroud（星系生成器要求 has_shroud_dlc / initializer requires has_shroud_dlc）
- 审阅 Reviewed：2026-10-12（已审阅 reviewed）

## 如何开始 How it starts

灵督城邦是一个太空城邦：拥有“虚境阴影”时，星系生成器 mindwarden_enclave_initializer 会生成它（若有帝国选择灵督起源则不生成，改由该起源建立雇佣城邦，见 origin_events_shadows_shroud.txt 的 shroud.6827）。首次接触完成时（finish_first_contact_effect、leviathans.98 或 on_action_events_1 的城邦分支）触发隐藏事件 shroud.4199，它在你建有物现引擎时额外增加信任，然后进入 4200；此后每次通过外交界面联络城邦，都由 on_custom_diplomacy 直接调用 4200。4200 → 4201 根据当前状态选择一种问候。

The Mindwarden Enclave is a space enclave. With Shadows of the Shroud the galaxy initializer mindwarden_enclave_initializer spawns it (not if any empire took the Mindwardens origin; that origin founds its own mercenary enclaves instead, see shroud.6827 in origin_events_shadows_shroud.txt). Completing first contact (finish_first_contact_effect, leviathans.98 or the enclave branch of on_action_events_1) fires hidden shroud.4199, which adds trust for each Materiality Engine and calls 4200; every later diplomatic contact calls 4200 directly via on_custom_diplomacy. 4200 → 4201 then picks one greeting from the current state.

## 剧情脉络 Story outline

这是可重复的通讯枢纽，不是一次性的剧情。4201 的问候互斥：自己创建的雇佣城邦（灵督起源的赞助方）看到 6852（首个城邦）/6853（又一城邦）/6851（回访）；城邦被毁后只剩 4350 的沉默；攻击过城邦的帝国永久只得到 4320 的拒绝；与行虚者城邦信任≥100 得到 4340；突破虚境的帝国得到 4300 的敌意（可追问 4310）；其余帝国进入主菜单 4205。主菜单可询问虚境（对话）、泽珞（4250：可出售至多100泽珞换取高价能量，冷却3600天）、灵能光环（4230：付1000能量+50影响力获得灵能压制科技25%进度）、袭击一个已接触的灵能帝国（4240：5000能量+50影响力，冷却3600天）、犯罪（4260：思想警察决议）、信任≥80时的后勤援助（4265，3600天后 4267 来信续约）、借用士兵（4270：14支灵督突击队）、督管专员（4280：5级领袖，冷却720天）；“轮回之终末”结束后可谈论它并购买对抗最终清算的战术（4290→4292→4291）。各子页的“算了”回到出发时的问候页；“再会”结束通讯。

This is a repeatable communication hub, not a one-time plot. The greetings from 4201 are exclusive: the empire that created this mercenary enclave (Mindwardens origin patron) sees 6852 (first enclave) / 6853 (another enclave) / 6851 (later visits); after the enclave is destroyed only the silence of 4350 remains; an empire that ever attacked it is refused forever (4320); Shroudwalker trust ≥ 100 gives 4340; a Shroud-breached empire gets hostility (4300, follow-up 4310); everyone else gets the menu 4205. Menu topics: the Shroud (dialogue), zro (4250: sell up to 100 zro for premium energy, 3600-day cooldown), psionic auras (4230: 1000 energy + 50 influence for 25% of Psionic Suppression), a raid on a known psionic empire (4240: 5000 energy + 50 influence, 3600-day cooldown), crime (4260: Thought Police decision), and at trust ≥ 80 logistics (4265; 4267 offers renewal after 3600 days), soldiers (4270: 14 Assault Warden armies) and a Commissioner (4280: level-5 leader, 720-day cooldown); after the End of the Cycle it can be discussed and anti-Reckoning tactics bought (4290 → 4292 → 4291). "Never mind" on a sub-page returns to the greeting the conversation started from; "Goodbye" closes it.

## 分支与结局 Branches and outcomes

袭击选项把 4246（已建立通讯）或 4247（未接触）发给被袭击的帝国，随后该帝国看到 4300 的敌意问候；付款方只看到 4245。灵督起源的赞助方另有 4205.i → 6855：升级城邦（五档，1000–13000能量）、共享科技（获得1000能量，十年一次）、雇佣舰队十年（6875→6876）、管理合约（6880：延长或终止→6881）、提升城邦容量（6865）。后果：首次与城邦交战（on_entering_battle → 4285）永久设置 attacked_mindwardens、信任-100，若雇有灵督督管专员则五天后专员离开（4286）。城邦空间站被击毁（on_ship_destroyed_victim → 4400）时，攻击方看到 4405（获得2000合金与4000物理研究），其他有通讯的帝国看到 4406；非雇佣城邦会在十年后尝试于无主星系重建一次（4410）。建造物现引擎的帝国（已与城邦通讯）获得信任+5，30天后收到一次 4295。

The raid option sends 4246 (with communications) or 4247 (no contact) to the raided empire, which then sees the hostile greeting 4300; the paying empire only sees 4245. The Mindwardens-origin patron also has 4205.i → 6855: upgrade the enclave (five tiers, 1000–13000 energy), share technology (gain 1000 energy, once per 10 years), hire a fleet for 10 years (6875 → 6876), manage the contract (6880: extend or terminate → 6881) and raise enclave capacity (6865). Consequences: the first battle against the enclave (on_entering_battle → 4285) sets attacked_mindwardens permanently and trust −100; a hired Mindwarden Commissioner leaves 5 days later (4286). When the enclave station is destroyed (on_ship_destroyed_victim → 4400) the attacker sees 4405 (2000 alloys, 4000 physics) and other empires in contact see 4406; a non-mercenary enclave tries once to respawn in an unowned system 10 years later (4410). An empire in contact that builds a Materiality Engine gains +5 trust and gets 4295 once, 30 days later.

## 条件与文明差异 Conditions and variants

4205.a“虚境是什么”只对非灵督起源开放；4205.c 需已遭遇灵能光环且未掌握灵能压制；4205.d 需有已接触的灵能帝国；ef/f/g 需信任≥80；h 需全局“轮回之终末”已完成；i 只对创建该城邦的赞助方显示。4320/4405/4406 的文本按本国是否灵能化变化。

4205.a "What is the Shroud?" is offered only to non-Mindwarden empires; 4205.c needs encountered psionic auras and no Psionic Suppression yet; 4205.d needs a psionic empire in contact; ef/f/g need trust ≥ 80; h needs the global End of the Cycle completion flag; i is shown only to the patron who created the enclave. 4320/4405/4406 vary their text for psionic empires.

## 审阅记录 Review notes

逐段阅读 shroud_events.txt 9235–10840、10842–11062、14897–15805，mindwarden_initializers.txt，first_contact_effects.txt 702–718，00_on_actions.txt 744，shroud_shadows_scripted_effects.txt 4482–4508，origin_events_shadows_shroud.txt 3046–3079。修正：把原草稿中独立的 event-shroud-4285、event-shroud-4295、event-shroud-4400 并入本城邦故事（共享 attacked_mindwardens / enclave_destroyed 状态，且 4295 本身在城邦窗口中显示）；删除“返回”选项扇出到其他问候的伪连接；6851–6853 继承主菜单选项（编译器未读取 base 继承），为 6851 补到赞助方提案的连接并为三者加注；4246/4247 标注为被袭方所见。分类改为 C6（太空城邦入口）。灵督起源（C1）的建城事件 6825/6827 链接到本故事。

Read shroud_events.txt 9235–10840, 10842–11062 and 14897–15805, mindwarden_initializers.txt, first_contact_effects.txt 702–718, 00_on_actions.txt 744, shroud_shadows_scripted_effects.txt 4482–4508 and origin_events_shadows_shroud.txt 3046–3079. Corrections: the draft stories event-shroud-4285, event-shroud-4295 and event-shroud-4400 are merged into this enclave story (shared attacked_mindwardens / enclave_destroyed state; 4295 is itself shown in the enclave window); the false fan-out of "back" options to other greetings is suppressed; 6851–6853 inherit the main-menu options (the compiler does not read base inheritance), so 6851 is linked to the patron proposals and all three carry a note; 4246/4247 are marked as seen by the raided empire. Category changed to C6 (space enclave entry). The Mindwardens origin (C1) founding events 6825/6827 link here.

不确定 / Uncertain:

- 4205 has five conditional greeting texts (first contact / return / return-to-menu / End of the Cycle variants); the reader shows them by its generic condition model, not by conversation state.
