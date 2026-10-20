# 屏障星球 / Shielded World

- 分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）

## 如何开始 How it starts

《遥远繁星》专属B型星系 time_loop_world_system（至多一个）中的沙漠星球被不可穿透的护盾包围，由初始化带有4级、全局一次的异常。

In the Distant Stars B-class system time_loop_world_system (at most one) a desert planet sealed in an impenetrable shield receives this level-4, once-per-game anomaly.

## 剧情脉络 Story outline

distar.2030“时空循环”：护盾困住恒星辐射让星球越来越热，里面的小型蜥蜴文明被困在时间循环中一次次重演历史；护盾上出现裂缝。
- 修复护盾：MEND_SHIELD（60天）→ distar.2031：预计它们一个世纪内会被烤死；20–60年后（隐藏 distar.2034）若星系有主则 distar.2035：它们终于死于高温，循环未被打破。之后在该星系建前哨的其他帝国会收到 distar.2036（只能观看，无法干预）。
- 打断循环：STOP_TIME_LOOP（60天）→ 50% distar.2032“大爆炸”（循环解除时它们正按下核按钮，全部毁灭）/ 50% distar.2033（它们挣脱并立即敌视我们，炸开护盾，建立“普里基基-提”国家；仅当星系无主时，否则必为2032）。
- 由它们自己决定：5–15年后 distar.2038，蜥蜴自行解开循环、击碎护盾。

distar.2030 "Time Loop": the shield traps the star's heat, and the tiny reptilian civilisation inside relives its history in a time loop; the shield is cracking.
- Repair the shield: MEND_SHIELD (60 days) → distar.2031: they will probably burn within a century; 20–60 years later (hidden distar.2034), if the system is owned, distar.2035: they died of the heat without breaking the loop. Other empires building an outpost there afterwards get distar.2036 (they can only watch).
- Interrupt the loop: STOP_TIME_LOOP (60 days) → 50% distar.2032 "Big Boom" (the loop broke as they pressed the nuclear trigger) / 50% distar.2033 (they break free, turn hostile, blast the shield and found the Prikkiki-Ti; only if the system is unowned, otherwise always 2032).
- Leave them: 5–15 years later distar.2038, the lizards solve the loop and shatter the shield themselves.

## 分支与结局 Branches and outcomes

distar.2030 三个选项互斥；STOP_TIME_LOOP 的 2032/2033 互斥（2033 需星系无主）。

distar.2030's three options are exclusive; STOP_TIME_LOOP's 2032/2033 are exclusive (2033 needs an unowned system).

## 条件与文明差异 Conditions and variants

distar.2033 若玩家物种使用 rep16 头像则蜥蜴改用 rep12。

In distar.2033 the lizards use portrait rep12 if the player species already uses rep16.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：common/solar_system_initializers/distant_stars_initializers.txt:199-292 (time_loop_world_system); common/anomalies/95_anomaly_categories_distant_stars.txt:1457-1468; events/distant_stars_events_2.txt:3730 (distar.2030); common/special_projects/00_projects_distant_stars.txt:1232/1257 (MEND_SHIELD, STOP_TIME_LOOP); events/distant_stars_events_2.txt:3801-3872 (distar.2031, 2034, 2035); events/distant_stars_events_2.txt:3917/3946 (distar.2032/2033); events/distant_stars_events_2.txt:4380 (distar.2038); common/on_actions/00_on_actions.txt:1936; events/distant_stars_events_2.txt:3873 (distar.2036)
已核对初始化、异常、distar.2030–2038、两个项目与 on_building_starbase_outpost。修正：distar.2036 在草稿中是独立故事；现以审阅连接接在修复护盾之后。

Checked the initializer, anomaly, distar.2030–2038, both projects and on_building_starbase_outpost. Correction: distar.2036 was a separate story; it now follows the shield repair through a reviewed link.
