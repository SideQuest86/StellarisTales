# 岩居兽 / Cutholoids

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/grand_archive_events.txt:3000-3562; common/special_projects/04_projects_grand_archive.txt:21-151; common/on_actions/00_on_actions.txt:1169,1431 · DLC: Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

用科学船勘测一颗藏有岩居兽的小行星（pc_cutholoid，on_survey_planet，common/on_actions/00_on_actions.txt:1169）时，隐藏事件 grand_archive.3010 检查：已有“岩居兽”国家、小行星未在进食。若玩家尚未遇过岩居兽、未与其通讯、科学船未隐身，则 grand_archive.3008：科学船被吞（失踪、船长被流放），并开启“救回…”事件链、同时启用两个互斥项目；否则 grand_archive.3009 让船逃脱并显形岩居兽，科学船收到 grand_archive.3012。

Surveying an asteroid that hides a Cutholoid (pc_cutholoid; on_survey_planet, common/on_actions/00_on_actions.txt:1169) fires hidden grand_archive.3010: the Cutholoids country exists and the asteroid is not eating. If the player has not met a Cutholoid, has no communications with them and the science ship is uncloaked, grand_archive.3008 happens: the ship is eaten (missing, leader exiled), the "Recover ..." chain starts and two exclusive projects are enabled; otherwise grand_archive.3009 lets the ship escape and reveals the Cutholoid, and a science ship gets grand_archive.3012.

## 剧情脉络 Story outline

grand_archive.3011“科研船失踪”通知后，玩家可在互斥的两个项目中选一个：“摧毁小行星”（需要战力≥600的军舰，10天）——成功则孵出被伏击的岩居兽，击毁后经 grand_archive.3014/3015 到 grand_archive.3016“令人不快的意外”（回收科研船，可能领袖死于消化）；失败则 grand_archive.3020“失去科研船”；取消时若小行星已不在，则经 3017 到 grand_archive.3018“兽口脱险”。“捕获小行星”（需科学船、科学家与引力井科技，180天）——成功则捕获岩居兽放入生态展馆，经 3015 直接到 grand_archive.3016，5天后 grand_archive.2900“岩居兽”（a 研究：启动“岩居兽研究”项目，成功得 grand_archive.2905“岩居兽外壳”，二选一强化太空生物或升级飞船；b 把它们全部消灭）。

After the notice grand_archive.3011 "Science Ship Missing" the player picks one of two exclusive projects: "Destroy the Asteroid" (needs a warship with fleet power >= 600, 10 days) - on success an ambushing Cutholoid hatches and when killed grand_archive.3014/3015 lead to grand_archive.3016 "An Unpleasant Surprise" (the science ship is recovered, the leader may have been digested); on failure grand_archive.3020 "Science Ship Lost"; if cancelled after the asteroid is gone, 3017 leads to grand_archive.3018 "From the Belly of the Beast". "Capture the Asteroid" (needs a science ship, a scientist and gravity-well tech, 180 days) - on success the Cutholoid goes into the vivarium and 3015 leads straight to grand_archive.3016, then 5 days later grand_archive.2900 "Cutholoids" (a study them: starts "Cutholoid Research" whose success gives grand_archive.2905 "Cutholoid Shells" - enhance space fauna or upgrade ships; b destroy them all).

## 分支与结局 Branches and outcomes

两个项目互斥（same_option_group）；岩居兽国家与首次遭遇的条件见触发。

The two projects are exclusive (same_option_group); the Cutholoids country and first-encounter conditions are in the trigger.

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
