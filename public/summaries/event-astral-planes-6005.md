# 不稳定星界细缝 / Astral Scar Instability

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

科研船勘察一处星界细缝时，隐藏事件 astral_planes.6005 检查：帝国已掌握星界采集与裂隙探球科技、境内（游牧帝国除外）有星界细缝、尚未探索过“微型宇宙”裂隙、且以前没有发现过不稳定细缝。满足时 80% 概率给该星系加上不稳定修正并开启特殊项目“不稳定星界细缝”，20% 什么也不发生（`astral_planes_events.txt:4005–4052`）。项目需科研船与科学家，60 天，限时 1080 天。

When a science ship surveys an Astral Scar, hidden event astral_planes.6005 checks that the empire has Astral Harvesting and Rift Sphere, owns a scar within its borders (not required for nomads), has not explored the Microverse rift and has not found an instability before. If so, there is an 80% chance to mark the system unstable and open the special project “Astral Scar Instability”; 20% nothing happens (`astral_planes_events.txt:4005–4052`). The project needs a science ship with a scientist, takes 60 days and expires after 1080 days.

## 剧情脉络 Story outline

1. 项目完成 → 缝补时空（6006）：细缝极不稳定，可能继续产生引力奇点。可以用喷涌的星界丝缕把它“缝死”，或投放大量弹药把它炸开、以便探索另一侧。
2. 项目超时 → 星界坍缩（6009）：细缝自行向内坍缩消失。

1. Project completed → A Stitch in Time (and Space) (6006): the scar is dangerously unstable. Stitch it shut with the escaping astral threads, or blow it open with heavy ordnance to explore the other side.
2. Project expired → Astral Collapse (6009): the scar collapses inward on its own.

## 分支与结局 Branches and outcomes

- 把它缝死 → 6007 宇宙之戕：细缝封闭并移除，获得大量星界丝缕与物理研究。
- 把它炸开 → 6008（标题同为“宇宙之戕”）：细缝被撕成一道可探索的裂隙——即“微型宇宙”裂隙（`split_astral_scar = { ID = microverse }`），其后的探索见“微型宇宙”篇。
- 6009 星界坍缩：细缝消失，获得少量星界丝缕。

- Stitch it shut → 6007 Cosmic Wound: the scar is sealed and removed; a large astral thread reward and physics research.
- Blow it open → 6008 (also titled “Cosmic Wound”): the scar is torn into an explorable rift — the Microverse rift (`split_astral_scar = { ID = microverse }`); its exploration continues in “The Microverse”.
- 6009 Astral Collapse: the scar disappears with a small astral thread reward.

## 条件与文明差异 Conditions and variants

- 没有文明视角差异。注意：发现这种不稳定后，“微型宇宙”在随机裂隙池中的权重变为 0，只能通过 6008 获得。

- No empire-identity variants. Note: once this instability has been found, the Microverse's weight in the random rift pool becomes 0; it can then only be opened through 6008.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`events/astral_planes_events.txt:4005–4165`（6005–6009）；`common/special_projects/02_projects_astral_planes.txt:25–51`；`common/on_actions/00_on_actions.txt:1167`（on_survey_planet）
- 已核对：on_survey_planet 触发、6005 的条件与 80/20 随机、项目时长与时限、6006 两个选项、6007/6008/6009 的效果，以及微型宇宙裂隙定义中的权重修正（`00_astral_rifts.txt:139–152`）。
- 修正：编译图只显示项目分支；`spawn_astral_rift`/`split_astral_scar` 的定向生成没有进入调用图，已补 6008 → “微型宇宙”裂隙的跨故事链接，并标注项目成功/超时互斥。

- Checked: the on_survey_planet trigger, the conditions and 80/20 roll of 6005, project duration and limit, both options of 6006, the effects of 6007/6008/6009, and the weight modifier in the Microverse rift definition (`00_astral_rifts.txt:139–152`).
- Correction: the compiled graph showed only the project branches; the directed spawn (`spawn_astral_rift`/`split_astral_scar`) is not in the call graph, so a cross-story link 6008 → the Microverse rift was added, and project success/expiry were marked exclusive.
