# 小行星被摧毁 / Asteroid Destroyed
- 分类 Category：文明纪事 Society (C7) · 观察站（前FTL观察）事件 pre-FTL observation event
- 来源 Sources：`events/observation_events.txt:381-475` · `common/on_actions/00_on_actions.txt:1620`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

玩家舰队摧毁了逼近前FTL世界的小行星（舰队被摧毁时，on_fleet_destroyed_perp 触发隐藏事件 observation.6，条件：存在被标记为“小行星目击”的行星、被毁舰队属于 incoming_asteroid_pre_ftl 国家）（`00_on_actions.txt:1620`，`observation_events.txt:381–439`）。/ Fired by on_fleet_destroyed_perp when the incoming-asteroid fleet is destroyed before impact.

## 剧情脉络 Story outline

隐藏事件 6 解除观察站锁定、清除“观察事件链进行中”标志，然后分两条路：该国是目击小行星的观察国 → **7 小行星被摧毁**（获得矿物月加成、觉醒度+5、非干涉违规）；否则 **8**（摧毁者）与 **9**（原观察国）。/ Hidden 6 unlocks the outpost, then: the sighting country gets 7 (mineral reward, +5 awareness, non-interference breach); another destroyer gets 8 and the original observer 9.

## 分支与结局 Branches and outcomes

7 / 8 / 9 按谁摧毁小行星分开，互斥。/ 7, 8 and 9 are exclusive by who destroyed it.

## 条件与文明差异 Conditions and variants

无文明差异。/ No variants.

## 审阅记录 Review notes

- 已核对 Checked：观察 6、7，以及 8/9 的调用。/ Observation.6 and callers.
- 审阅改动 Changes：并未改动结构（三个入口事件为互斥条件）。/ No structural change; three exclusive entries.
