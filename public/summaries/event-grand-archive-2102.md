# 虚空虫灭绝决议 / Voidworm Eradication resolution

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/grand_archive_events.txt · DLC：Grand Archive · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

决议 resolution_voidworm_eradication（银河共同体）生效后，隐藏事件 2102（决议颁布时由共同体触发，events/grand_archive_events.txt:1042）、2101（虚空虫舰队进入系统，on_entering_system_fleet，:968）、2106（on_monthly_pulse 每月检查，:1161）向成员国发出提示；成员国境内有虚空虫时被标记为“违反虚空虫决议”（resolution_breached_*_inside_borders）。
Once the resolution resolution_voidworm_eradication is active, three hidden events notify member countries; those with Voidworm inside their borders are flagged as in breach.

## 剧情脉络 Story outline

- grand_archive.2103（决议生效）：向所有境内已有虚空虫的成员国发出通知并标记违规。 Enactment: every member with Voidworm in its space is notified and flagged.
- grand_archive.2105（舰队进入）：虚空虫舰队进入尚未违规的成员国边境时通知该国并标记。 A fleet enters a member's border.
- grand_archive.2107（每月）：仍未清除时，随机一个尚未标记的成员国收到违规通知（含被入侵星系名）。 Monthly: a member still hosting them gets the breach notice.
- 违规标记会在境内的虚空虫被清除后由每月清理事件撤销。 The flag is cleared by the monthly clean-up when they are gone.

## 分支与结局 Branches and outcomes

- 三条通知是并行的（不同触发），没有选项后果，均只有“确定”。 The notices are parallel and have only an OK option.

## 条件与文明差异 Conditions and variants

- 需要银河共同体已成立且决议生效；仅成员国。 Needs an active resolution and membership.

## 审阅记录 Review notes

- 已核对 Checked：2102–2106 与清理事件的触发条件。
- 更正 Corrections：三条只含隐藏路由的单页故事并为一个。 Three single-notice stories are merged into one.
