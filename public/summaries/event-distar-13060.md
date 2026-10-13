# 天然虫洞 / Natural Wormhole

- 分类 Category：探索 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：common/on_actions/00_on_actions.txt:1238 (on_system_survey → distar.13060); events/distant_stars_events_3.txt:2288 (distar.13060); events/apocalypse_events.txt (apoc.5, the ship-survey version)

## 如何开始 How it starts

on_system_survey：国家获得某星系的勘测状态但并非由科学船亲自勘测（fromfrom 不存在，例如该星系在外国领土内），该星系有天然虫洞（不是无形或水晶球星系），国家不是影行者学徒起源且尚无 encountered_first_wormhole 标志。

on_system_survey: a country gains surveyed status of a system without a science ship having done it (fromfrom does not exist, e.g. the system lies in foreign territory), the system has a natural wormhole (not a formless or crystal-sphere system), the country is not a Shroudwalker Apprentice and does not yet have encountered_first_wormhole.

## 剧情脉络 Story outline

单一事件 distar.13060“天然虫洞”：保存虫洞所在系统（wormhole_system），设置 encountered_first_wormhole 并记录虫洞类型为已见（add_seen_bypass_type）；沿用 apoc.5 的文字，唯一选项无其他效果。

Single event distar.13060 "Natural Wormhole": saves the wormhole system (wormhole_system), sets encountered_first_wormhole and records the wormhole bypass type as seen (add_seen_bypass_type); it reuses apoc.5's text and the only option has no further effect.

## 分支与结局 Branches and outcomes

唯一事件，无分支。

Single event, no branches.

## 条件与文明差异 Conditions and variants

仅在未亲自勘测时触发；科学船亲自勘测时由 apoc.5 触发（另一故事）。

Fires only when the system was not surveyed by a ship; when a ship surveys it, apoc.5 (another story) fires instead.

## 审阅记录 Review notes

已核对 on_action 与事件。它是 apoc.5“天然虫洞”的“外国领土内”重复版本（on_actions 注释：apoc.5 duplicate），两者互斥；本次不改动 apoc.5 所在故事（不属本人负责）。

Checked the on_action and the event. It is the 'foreign territory' duplicate of apoc.5 "Natural Wormhole" (on_actions comment: apoc.5 duplicate) and the two are mutually exclusive; the apoc.5 story was not touched (not owned by this reviewer).
