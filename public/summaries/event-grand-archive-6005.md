# 珍宝藏库 / Treasure Troves

- 分类 Category：银河轶事 C8 stories · DLC：Grand Archive

## 如何开始 How it starts

on_decade_pulse_country（common/on_actions/00_on_actions.txt:628）触发隐藏事件 grand_archive.6005（events/grand_archive_events.txt:6407-6441）：游戏进入中期后、非“寻宝者”起源的国家掷骰：已获得的展品数 + 3 大于 0–100 的随机数时，在 0–360 天后触发 6010（游牧国用 6011，选择驿站星系的行星）。寻宝者起源另有 6000（拥有遗物“星图4”，on_five_year_pulse_country common/on_actions/00_on_actions.txt:480）。
On the decade pulse a mid-game, non-Treasure-Hunters empire rolls (acquired specimen count + 3 > d100); success fires 6010 (6011 for nomads) within 360 days. Treasure Hunters get 6000 instead.

## 剧情脉络 Story outline

1. 6010 / 6011 “发现珍宝藏库”：在边境内选一颗无法殖民的行星，开启事件链“珍宝藏库”与特殊项目 TREASURE_TROVE。
   Discovery picks a non-colonizable planet within borders (or in waystation systems) and starts the project.
2. 项目完成：6015 “珍宝已寻回”，按藏库类型给出标本、海盗船、科技或普通奖励（寻宝者起源另触发 8290）。
   Project success: 6015 grants a specimen, pirate ship, technology or ordinary reward (Treasure Hunters also get 8290).
3. 海盗：科考船在藏库系统采集数据时 15% 概率（每系统只掷一次）触发 6025 “海盗伏击”，开启项目 TREASURE_TROVE_PIRATES（击败海盗）。击毁海盗舰队 → 6031“击败海盗”完成项目；项目失败 → 6035“失去藏库”：海盗舰队离开，藏库项目与事件链被中止。
   Pirates: 15% chance once per system while a science ship collects data -> 6025 -> pirate project; destroy the fleet -> 6031, fail -> 6035 (trove lost).

## 分支与结局 Branches and outcomes

- 海盗支线的两个结局互斥（成功 6031 / 失败 6035）。 The pirate outcomes are exclusive.
- 6015 的奖励类型由藏库本身决定（标本 / 海盗船 / 科技 / 默认）。 The reward kind depends on the trove.

## 条件与文明差异 Conditions and variants

- 同一星系不会同时有两个活跃藏库；国家同时只能有一个 TREASURE_TROVE 项目。 One active trove per system and per country.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：6000-6040、on_action 触发点、项目 TREASURE_TROVE_PIRATES 的成功/失败。
- 更正 Corrections：6020（海盗伏击）、6030（击败海盗）原为独立单页故事，并入同一条藏库故事。
  Pirate Ambush and Pirates Defeated were separate stories and are merged.
- 说明 Note：6010 / 6011 / 6015 也出现在“寻宝者”起源故事中（共享文档）。
