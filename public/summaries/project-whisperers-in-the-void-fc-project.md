# 与[Root.Patron:whisperers_in_the_void.GetPreCommunicationName]通灵 / Commune with the [Root.Patron:whisperers_in_the_void.GetPreCommunicationName]

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/special_projects/04_projects_shroud.txt` · `events/shroud_events.txt` · `common/patrons/patron_types.txt` · `common/scripted_effects/shroud_shadows_scripted_effects.txt`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 伟大赞助者“虚空之低语”：事件shroud.4040由shroud.11001以95%权重触发（events/shroud_events.txt:21888，属另一故事“event-shroud-11000”），该事件在immediate中启用接触项目；patron_types.txt中该赞助者没有first_contact_event，只有covenant_event shroud.4700。  
  Great patron "Whisperers in the Void": shroud.4040 is fired by shroud.11001 with weight 95/100 (events/shroud_events.txt:21888, part of the separate story event-shroud-11000); its immediate enables the contact project. patron_types.txt gives this patron no first_contact_event, only covenant_event shroud.4700.

## 剧情脉络 Story outline

- 4040“尝试沟通”选项（及immediate）按帝国类型启用机械/蜂巢/基础接触项目，完成后触发4045“虚空之低语”。  
  4040 (immediate and option) enables the robot / hive / base contact project by empire type; on completion it fires 4045 "The Whisperers in the Void".
- 4045：若帝国已有四个主要赞助者之一的盟约，选项a→4046“虚境之变”（用虚空之低语替换该赞助者，标记broke_covenant）；否则选项a→11110“循环继续”，由玩家选择吸收哪位赞助者（a-d）。b拒绝（见审阅记录）。  
  4045: with a covenant of one of the four major patrons, option a → 4046 (the Whisperers replace that patron, broke_covenant is set); otherwise option a → 11110 "The Cycle Continues", where the player picks which patron to absorb (a-d). Option b rejects (see review notes).
- 4046与11110都经隐藏事件11111-11114汇入11120“复仇”：选择行星（优先贫瘠行星）并启用对应赞助者的复仇项目；项目成功或失败都触发11130“愤怒的复仇”（出现精神化身）。  
  Both 4046 and 11110 reach 11120 "Vengeance" through hidden events 11111-11114: a planet is chosen (barren ones preferred) and the betrayed patron's revenge project is enabled; success or failure of that project fires 11130 "Furious Vengeance" (a psionic avatar).

## 分支与结局 Branches and outcomes

- 结局：11130复仇化身；或4045.b拒绝盟约。  
  Endings: 11130 (avatar of vengeance) or 4045.b (covenant rejected).

## 条件与文明差异 Conditions and variants

- 4046/11110由是否已有主要赞助者盟约决定；若有 broke_covenant，则11120附加“盟约破裂”修正（10年）。  
  4046 vs 11110 depends on holding a major-patron covenant; with broke_covenant, 11120 adds the covenant_broken_modifier (10 years).

## 审阅记录 Review notes

- 已对照4040/4045/4046/11110/11111/11120/11130原文与复仇项目脚本。  
  Compared the originals of 4040/4045/4046/11110/11111/11120/11130 and the revenge project scripts.
- 合并：_HIVE与_ROBOT故事并入本故事。  
  Merged: the _HIVE and _ROBOT stories are part of this story.
- 盟约本身（shroud.4700…）是另一故事。  
  The covenant itself (shroud.4700 etc.) is another story.
- 覆盖 Coverage：全部13个文档（含机械/蜂巢版项目）。 / All 13 docs (including robot/hive project versions).
