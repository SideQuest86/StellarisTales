# 失去博物天枢 / Grand Archive Lost

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt, common/megastructures/20_grand_archive.txt · DLC：Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

大档案馆（megastructure grand_archive_0）被毁或失去时由一组隐藏事件按原因分派：
The Grand Archive megastructure is lost through one of several hidden dispatchers:

## 剧情脉络 Story outline

- 4500（on_starbase_destroyed，common/on_actions/00_on_actions.txt:1513）：承载星港被毁；摧毁者为另一个帝国时经 4505 偷取展品（有展品且摧毁者没有时偷 1 件，“野蛮掠夺者”偷 2 件），受害者收到 4515，摧毁者收到 4510（有远古遗产时再得 100 稀有文物）；摧毁者就是自己或无来源时只给 4520。
  4500: starbase destroyed; another empire loots it via 4505 (victim 4515, destroyer 4510), otherwise 4520.
- 4501（星系被毁：危机、世界毁灭者等，00_scripted_effects.txt:248 set_ruined_megastructure）：4520。 4501: system destroyed -> 4520.
- 4530 / 4540（星港被击瘫；方舟上的“大档案馆”模块在战争中被击瘫）：标记并经 4505 通知双方。 4530/4540: disabled starbase or arkship module -> loot notices.
- 4545（游牧的二级驿站丢失，on_waystation_lost）：不再受敌人影响，4520。 4545: waystation lost -> 4520.
- 4550（星系控制权变更，on_system_controller_changed common/on_actions/00_on_actions.txt:4641）：拆除；新控制者收到 4555，原主收到 4560（得到 500 合金，生态园内生物被释放或宰杀）；若该星港在 5 天内曾被击瘫则按掠夺处理（4505）。
  4550: system changes hands -> dismantled: new controller 4555, old owner 4560 (500 alloys).
- 4570（附庸被整合）：拆除并通知宗主 4555。 4570: subject integration -> 4555.
- 4580：重建时（on_build_complete，若有 grand_archive_destroyed 标记）：可选择花费能量用 DNA 重新放入生态园。
  4580: on rebuilding, optionally spend energy to repopulate the vivarium from stored DNA.

## 分支与结局 Branches and outcomes

- 各原因互斥地决定通知；同一次摧毁里受害方与摧毁方的通知并行。
  The cause decides the notices; victim and destroyer notices of one event are parallel.

## 条件与文明差异 Conditions and variants

- 文本按是否有展品被偷、有无生态园生物被释放、摧毁者是否有远古遗产而变化。 Text varies with stolen specimens, released fauna and the destroyer's ancient relics (ancrel).

## 审阅记录 Review notes

- 已核对 Checked：4500-4580 的触发、on_action 调用点和 20_grand_archive.txt:195。
- 更正 Corrections：七个只含隐藏路由的单页故事（4500、4501、4540、4545、4550、4570、4580）并为一个“失去博物天枢”。
  Seven router-only stories are merged into one.
