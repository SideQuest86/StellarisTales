# 共振信号 / A Resonating Signal

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 完成考古遗址时（on_arch_site_finished）10/100 抽取隐藏 federations3.2100：玩家非AI，其研究联邦未完成地脉计划（leylines_complete），不在交战，且全局没有 leylines_triggered 国家。其后 2102（隐藏）：联邦带 leylines_valid 标志；若本国有遗址标志则10天后 2103「共鸣信号」（遗址“冥府之妖”），否则 2104「附近的共鸣信号」。
  When an archaeological site is finished (on_arch_site_finished) 10/100 picks hidden federations3.2100: the player is non-AI, their research federation has not completed the leylines project, is not at war and no country has leylines_triggered. Hidden 2102 follows (federation flag leylines_valid): with the empire's own site flag 2103 "A Resonating Signal" (the "Chthonic Siren" site) after 10 days, else 2104 "A Resonating Signal Nearby".

## 剧情脉络 Story outline

- 2103：遗址分阶段——2105「共鸣之壳」→ 2111 / 2112（各50%）、2116 / 2117、2120「天穹之智」→ 2135 / 2136 / 2137「遗产」。
  2103: a staged site: 2105 "Sonorous Shells" -> 2111 / 2112 (50% each), 2116 / 2117, 2120 "Genius Caeli" -> 2135 / 2136 / 2137 "A Legacy in Motion".
- 2104：开启地脉事件链，启用“对抗共振谐波”项目 → 2125「更好的消噪」→ “共振嗡鸣分析”项目 → 2130 分析完成 / 2129 失败（→ 遗产事件）；项目失败 → 2124。
  2104: starts the leylines event chain and enables "Combatting Resonant Harmonics" -> 2125 "Improved Noise Cancellation" -> "Resonant Hum Analysis" -> 2130 analysed / 2129 failed (-> the Legacy events); project failure -> 2124.

## 分支与结局 Branches and outcomes

- 两条入口互斥；遗址阶段内的结果按随机/条件互斥。
  The two entries are exclusive; results inside the site stages are exclusive by random/condition.

## 条件与文明差异 Conditions and variants

- 仅研究联邦成员；遗产事件有多种变体。
  Research-federation members only; the Legacy events have several variants.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/federations_events_3.txt:1321-2286`；`common/on_actions/00_on_actions.txt:4324`
- 已核对：2100/2102 触发、入口分流、项目链。
  Checked: 2100/2102 triggers, the entry split, the project chain.
- 未逐阶段核对：遗址阶段的随机分布。
  Not checked stage by stage: random distribution inside the site.
