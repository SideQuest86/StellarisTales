# 怪异热源 / Weird Heat Blobs
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（提亚奇 tiyanki_stage_1 → tiyanki_stage_2）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:114–338` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:45–83` · `common/scripted_effects/first_contact_effects.txt:89–656`
- 审阅 Reviewed：2026-10-13（c7b-society 第一阶段；r2-society 第二阶段；协调合并 coordinator merge）

## 如何开始 How it starts

与提亚奇（tiyanki / tiyanki_garrison）类国家首次相遇时，setup_first_contact_path 启动 tiyanki_stage_1（难度3）。/ Meeting a Tiyanki-type country starts tiyanki_stage_1 (difficulty 3).

## 剧情脉络 Story outline

1. **怪异热源（10）**：远程扫描发现巨大“热团”，值得调查；唯一选项 A 设为第二阶段 tiyanki_stage_2（难度3，第134行）。/ Weird heat blobs; the only option sets stage 2 (line 134).
2. **提亚奇（15）**：第二阶段的阶段事件（`01_first_contact_space_fauna_and_NPCs.txt:77`）。正文随本方类型有格式塔、唯灵、其余三版，“原始呼唤”起源追加一段。/ Stage 2's event; gestalt, spiritualist and default texts, plus an extra Primal Calling passage.
3. 之后（after）：`finish_first_contact_effect` 结束首次接触，并隐藏触发 `grand_archive.200`（原始呼唤起源在此接入）。/ First contact ends and the hidden `grand_archive.200` fires (where the Primal Calling origin hooks in).

## 分支与结局 Branches and outcomes

线性两阶段；15 的选项按本方类型互斥出现（唯灵 / 唯物或无机械探索协议的格式塔 / 机械探索协议 / 其余），全部给予“太空鲸武器”科技选项或进度，并都结束首次接触。/ Two linear stages; 15's options are exclusive by empire type and all grant the space-whale weapon tech option or progress, then end first contact.

## 条件与文明差异 Conditions and variants

唯灵进度 0.2/0.6，其余 0.1/0.3（视是否已有该科技选项）；“其余”一组中排外、军国或杀戮帝国另增猎杀数，`is_homicidal` 改变措辞。/ Spiritualists get 0.2/0.6 progress, others 0.1/0.3; in the default group xenophobes, militarists and homicidal empires also raise the hunted-fauna count.

## 审阅记录 Review notes

- 已核对 Checked：事件 10 与 15、两个阶段定义、15 的四类选项、共享的 finish_first_contact_effect。/ Events 10 and 15, both stage definitions, 15's option groups, the shared finish effect.
- 更正 Corrections：编译器从共享的 finish_first_contact_effect 画出的九个外链（商队、掠夺者、纳玛里安、first_contact.11xx、galactic_features.387）不是本故事的后续，已移除。/ Nine external links drawn from the shared finish effect were suppressed.
- 合并 Merge（2026-10-13）：15 原为单独故事 event-first-contact-critters-15，现作为第二阶段并入；旧注释“15 属于原始呼唤篇”已过时（grand_archive.200 已作为共享节点处理）。/ 15 was a separate story and is now stage 2 here; the old note placing it in the Primal Calling story was stale.
