# 独眼漫步者（戴森球外交事件） / The One-Eyed Wanderer (Dyson Sphere diplomacy)

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/megastructure_events_1.txt, common/on_actions/00_on_actions.txt · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

utopia.29 是隐藏事件，挂在 on_megastructure_upgrade_begin（00_on_actions.txt:3685）：FROM 为戴森球基址（dyson_sphere_0）时检查——本国未触发过、有一个邻国有通讯、双方观感 > -100、有经济或科技情报、非格式塔/灭绝等；随后有 35% 概率在 10–17 天后让该邻国收到 utopia.30，65% 无事发生（lines 645-746）。全球标记 dyson_diplo_event_global 使全局只发生一次。
Hidden utopia.29 runs from on_megastructure_upgrade_begin when a Dyson Sphere site starts upgrading; with a suitable neighbour it has a 35% chance (65% nothing) to send utopia.30 to that neighbour after 10–17 days. A global flag makes it once per game.

## 剧情脉络 Story outline

1. utopia.30（邻国）：a 要求道歉（→utopia.31 给建造方，6天）；b 要求能量（唯物主义者 1800 天团结奖励，→utopia.32，1天）；c 无视（团结减少，链条结束）。
   The neighbour demands an apology (a), energy (b) or ignores it (c).
2. 建造方回应：31 的 a→33、b（付 1000 能量）→35、c→34；32 的 a（付 1000）→35、b→36、c→34。
   The builder answers in 31 / 32.
3. 邻国再回应：33 a→38 / b→37；35 a→38 / b→37；36 a→38 / b→37；34 a→40 / b→39（侮辱）。
   Final replies; 37-40 are the closing notices.

## 分支与结局 Branches and outcomes

- 全部是玩家选择；唯一随机点是起点（35%）。 All branches are player choices; the only random point is the start (35%).

## 条件与文明差异 Conditions and variants

- 31.b、32.a 需要至少 1000 能量。 31.b and 32.a need at least 1000 energy.

## 审阅记录 Review notes

- 已核对 Checked：utopia.29-40 的全部触发与选项（lines 645-1352）。编译树与源码一致；原先的 utopia.29 只作为隐藏入口，根设为 utopia.30（带 35% 与延迟标注）。
  Tree matches the source.
- 它发生于戴森球（见该故事）刚开工时，但独立于其建造阶段事件。 It happens when the Dyson Sphere is started but is independent of its stage events.
