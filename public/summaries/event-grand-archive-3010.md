# 岩居兽 / Cutholoids

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/grand_archive_events.txt:3000-3562; common/special_projects/04_projects_grand_archive.txt:21-151; common/on_actions/00_on_actions.txt:1169,1431 · DLC: Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

用科学船勘测一颗藏有岩居兽的小行星（pc_cutholoid，on_survey_planet，common/on_actions/00_on_actions.txt:1169）时，隐藏事件 grand_archive.3010 检查：已有“岩居兽”国家、小行星未在进食。若玩家尚未遇过岩居兽、未与其通讯、科学船未隐身，则 grand_archive.3008：科学船被吞（失踪、船长被流放），并开启“救回…”事件链、同时启用两个互斥项目；否则 grand_archive.3009 让船逃脱并显形岩居兽，科学船收到 grand_archive.3012。

Surveying an asteroid that hides a Cutholoid (pc_cutholoid; on_survey_planet, common/on_actions/00_on_actions.txt:1169) fires hidden grand_archive.3010: the Cutholoids country exists and the asteroid is not eating. If the player has not met a Cutholoid, has no communications with them and the science ship is uncloaked, grand_archive.3008 happens: the ship is eaten (missing, leader exiled), the "Recover ..." chain starts and two exclusive projects are enabled; otherwise grand_archive.3009 lets the ship escape and reveals the Cutholoid, and a science ship gets grand_archive.3012.

## 剧情脉络 Story outline

grand_archive.3011“科研船失踪”通知后，玩家可在互斥的两个项目中选一个：“摧毁小行星”（需要战力≥600的军舰，10天）——成功则孵出被伏击的岩居兽，击毁后经 grand_archive.3014/3015 到 grand_archive.3016“令人不快的意外”（回收科研船，可能领袖死于消化）；失败则 grand_archive.3020“失去科研船”；取消时若小行星已不在，则经 3017 到 grand_archive.3018“兽口脱险”。“捕获小行星”（需科学船、科学家与引力井科技，180天）——成功则捕获岩居兽放入生态展馆，经 3015 直接到 grand_archive.3016，5天后 grand_archive.2900“岩居兽”（a 研究：启动“岩居兽研究”项目，成功得 grand_archive.2905“岩居兽外壳”，二选一强化太空生物或升级飞船；b 把它们全部消灭）。

After the notice grand_archive.3011 "Science Ship Missing" the player picks one of two exclusive projects: "Destroy the Asteroid" (needs a warship with fleet power >= 600, 10 days) - on success an ambushing Cutholoid hatches and when killed grand_archive.3014/3015 lead to grand_archive.3016 "An Unpleasant Surprise" (the science ship is recovered, the leader may have been digested); on failure grand_archive.3020 "Science Ship Lost"; if cancelled after the asteroid is gone, 3017 leads to grand_archive.3018 "From the Belly of the Beast". "Capture the Asteroid" (needs a science ship, a scientist and gravity-well tech, 180 days) - on success the Cutholoid goes into the vivarium and 3015 leads straight to grand_archive.3016, then 5 days later grand_archive.2900 "Cutholoids" (a study them: starts "Cutholoid Research" whose success gives grand_archive.2905 "Cutholoid Shells" - enhance space fauna or upgrade ships; b destroy them all).

（并入自 event-grand-archive-3025，评注）在任一岩居兽舰船被击毁时（on_ship_destroyed_victim），隐藏事件 3025 把岩居兽存活计数-1；若击杀者是普通或失落帝国，则创建残骸并启用 CUTHOLOID_DEBRIS_PROJECT（90天，限时1800天）；成功后隐藏事件 3026 按 1:1 给 1000 矿物或 200 稀有水晶，失败则残骸消失。该分支独立于首次遭遇与项目一/二。

(Merged from event-grand-archive-3025; commentary.) Whenever a Cutholoid ship is destroyed (on_ship_destroyed_victim) hidden 3025 lowers the alive-Cutholoid count by 1; if the killer is a default or fallen empire it creates debris and enables CUTHOLOID_DEBRIS_PROJECT (90 days, 1800-day limit); on success hidden 3026 gives 1000 minerals or 200 rare crystals (1:1), on failure the debris vanishes. This branch is independent of the first encounter and projects one/two.

## 分支与结局 Branches and outcomes

两个项目互斥（same_option_group）；岩居兽国家与首次遭遇的条件见触发。

The two projects are exclusive (same_option_group); the Cutholoids country and first-encounter conditions are in the trigger.

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- r3-integrate（2026-10-13）：合并了 event-grand-archive-3025（events/grand_archive_events.txt:3573-3650；on_actions:1432；project 04_projects_grand_archive.txt:153-185）作为家族成员。
  r3-integrate (2026-10-13): Merged event-grand-archive-3025 (events/grand_archive_events.txt:3573-3650; on_actions:1432; project 04_projects_grand_archive.txt:153-185) as a family member.
- r3-integrate（2026-10-13）：并入原 event-grand-archive-2901 与 event-grand-archive-3014。2901（01_first_contact_space_fauna_and_NPCs.txt:499-511）是岩居兽首次接触阶段 cutholoids_stage_1：a（非灭绝者）启动 RESEARCH_CUTHOLOIDS_PROJECT → 2905（太空生物装甲修正或科技 tech_asteroidal_carapace），b 获得“岩居兽狩猎”增益；两对选项各自互斥；接触结束30天后触发 grand_archive.200。3014（击毁，events/grand_archive_events.txt:3315-3351）与 3035（俘获，:3687-3729）是潜伏岩居兽的两个入口，1天后触发 3015（指挥官50%被吞噬），汇入同一个 3016“令人不快的意外”；若俘获且尚未联络，5天后触发 2900。
  r3-integrate (2026-10-13): Folded in the former event-grand-archive-2901 and event-grand-archive-3014. 2901 (01_first_contact_space_fauna_and_NPCs.txt:499-511) is first-contact stage cutholoids_stage_1: a (non-exterminator) starts RESEARCH_CUTHOLOIDS_PROJECT -> 2905 (armor modifier or tech_asteroidal_carapace), b gives the Cutholoid hunting buff; each pair is exclusive; grand_archive.200 fires 30 days after the contact ends. 3014 (destroyed, events/grand_archive_events.txt:3315-3351) and 3035 (captured, :3687-3729) are two entries for the ambushing Cutholoid; a day later 3015 (50% the commander is eaten) leads to the same 3016 "An Unpleasant Surprise"; if captured and contact is missing, 2900 follows 5 days later.
