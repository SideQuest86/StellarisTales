# 星际绑架者 / The Ransomeers

- 分类 Category：探索 Exploration · 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：events/anomaly_events_2.txt:2395-2560 (anomaly.3094, chain start; story anomaly-uhb-buoy-cat); events/anomaly_events_2.txt:2561 (anomaly.3095); events/anomaly_events_2.txt:2592 (anomaly.3096); events/anomaly_events_2.txt:2612 (anomaly.3097); events/anomaly_events_2.txt:2679-2767 (anomaly.3098-3100); events/anomaly_events_2.txt:2768-2906 (anomaly.3101-3105); common/on_actions/00_on_actions.txt:983 (on_entering_system_fleet); common/on_actions/00_on_actions.txt:1577 (on_fleet_destroyed_victim); common/on_actions/00_on_actions.txt:1630 (on_fleet_destroyed_perp)

## 如何开始 How it starts

事件链“星际绑架者”由异常 UHB_BUOY_CAT（“多普勒效应”，另一故事 anomaly-uhb-buoy-cat）的 anomaly.3094 开启：设置 captive_rescue 标志，在6跳内选一个无主、无敌对的小行星系统作为“绑架者系统”（标志 ransomeer_system），创建绑架者国家（faction）、绑架者基地与舰队，并在基地处创建兴趣点。

The event chain "The Ransomeers" is started by anomaly.3094 of the anomaly UHB_BUOY_CAT ("Doppler Effect", another story, anomaly-uhb-buoy-cat): it sets captive_rescue, picks an unowned, non-hostile asteroid system within 6 jumps as the Ransomeer system (flag ransomeer_system), creates the Ransomeer faction country, base and fleets, and a point of interest at the base.

## 剧情脉络 Story outline

链开启之后有几种进展：
- 舰队进入绑架者系统 → anomaly.3095“星际绑架者：最佳计划”→ anomaly.3096“[Root.GetSpeciesAdj]俘虏”（与俘虏通话、说明计划，移除兴趣点；链继续）。
- 自己击毁绑架者基地 → anomaly.3101“星际绑架者：捡拾碎片”：基地国被销毁，随机（各50%）进入 anomaly.3102“已解救[Root.GetSpeciesAdj]俘虏”→ anomaly.3105“星际绑架者：一切都好？”（较大的影响力与3600天“救世主”修正），或 anomaly.3103“[Root.GetSpeciesAdj]俘虏”（对话）→ 选项b → anomaly.3104“星际绑架者：化为灰烬”（较小影响力与1800天“失败的救世主”修正）。
- 别人先击毁基地 → 隐藏的 anomaly.3097：与击毁者有接触则 50% anomaly.3098“星际绑架者：尘归尘，土归土”（俘虏死亡，对该国好感下降）/50% anomaly.3099“星际绑架者：意外的救星”（俘虏获救，好感上升）；无接触或击毁者不是普通国家则 anomaly.3100“星际绑架者：质疑”。以上结局都结束事件链。

After the chain starts there are several ways it can go:
- A fleet enters the Ransomeer system → anomaly.3095 "The Ransomeers: Best Laid Plans" → anomaly.3096 "[Root.GetSpeciesAdj] Captives" (talk to the captives and outline the plan, removes the point of interest; the chain continues).
- You destroy the Ransomeer base → anomaly.3101 "The Ransomeers: Picking Up the Pieces": the faction country is destroyed and a random 50/50 leads to anomaly.3102 "Freed [Root.GetSpeciesAdj] Captives" → anomaly.3105 "The Ransomeers: All's Well?" (larger influence and the 3600-day savior modifier) or anomaly.3103 "[Root.GetSpeciesAdj] Captives" (dialogue) → option b → anomaly.3104 "The Ransomeers: Smoke and Ashes" (smaller influence and the 1800-day failed-savior modifier).
- Someone else destroys the base first → hidden anomaly.3097: with contact to the destroyer, 50% anomaly.3098 "The Ransomeers: Dust and Echoes" (captives dead, opinion of that country drops) / 50% anomaly.3099 "The Ransomeers: Unexpected Saviors" (captives saved, opinion rises); without contact or if the destroyer is not an ordinary country, anomaly.3100 "The Ransomeers: Assailed". All these endings end the event chain.

## 分支与结局 Branches and outcomes

3101 之后的 3102 / 3103 为 50/50；3097 之后的 3098 / 3099 为 50/50（仅限有接触的普通国家）否则 3100；“进入系统”不是必经步骤，不影响后面的收束。

After 3101, 3102 / 3103 are 50/50; after 3097, 3098 / 3099 are 50/50 (only for an ordinary country you have contact with), otherwise 3100; entering the system is not required and does not affect the endings.

## 条件与文明差异 Conditions and variants

多个事件的名称含 [Root.GetSpeciesAdj]，随俘虏物种变化；3103 的对话选项a只展示回应，选项b结束。

Several event names contain [Root.GetSpeciesAdj] and follow the captives' species; in 3103 dialogue option a only shows a reply and option b ends.

## 审阅记录 Review notes

已核对 anomaly.3094–3105 与三个 on_action 钩子（983 进入、1577 他人击毁、1630 自己击毁）。修正：草稿把“进入系统”“他人击毁”“自己击毁”作为三个互不相连的故事；现合为一个以事件链“星际绑架者”为起点的故事，用审阅连接还原三种进展，并加互斥组。前半段（浮标、SOS、俘虏通话、链开启）属于 c3b 的 anomaly-uhb-buoy-cat。

Checked anomaly.3094-3105 and the three on_action hooks (983 entering, 1577 destroyed by another, 1630 destroyed by you). Correction: the draft treated 'entering the system', 'destroyed by another' and 'destroyed by you' as three unconnected stories; they are now one story starting from the chain "The Ransomeers" with reviewed links restoring the three paths, plus exclusive groups. The first half (buoy, SOS, captive talk, chain start) belongs to c3b's anomaly-uhb-buoy-cat.
