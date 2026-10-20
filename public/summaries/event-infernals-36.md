# 对星球的观测终止 / Observation of the Planet Ceases
- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: Infernals

## 如何开始 How it starts

玩家用巨像的“行星熔炉”（Planet Smelter）毁掉一颗行星时（common/on_actions/01_planet_destruction.txt:194-199），隐藏事件 infernals.36 运行：若星球有观测前哨，一天后给前哨所有者 planet_destruction.1000；机械意识（Contingency）世界则触发 crisis.2040/2046。行星熔炉另外还触发“超空间捷径”彩蛋（planet_destruction.110）和圣地检查（planet_destruction.600）。

When the player's Colossus fires the Planet Smelter at a planet (common/on_actions/01_planet_destruction.txt:194-199) hidden infernals.36 runs: with an observation outpost on the planet planet_destruction.1000 is shown to the outpost owner one day later; Contingency machine worlds trigger crisis.2040/2046. The Planet Smelter also triggers the Hyperspace Bypass easter egg (planet_destruction.110) and the holy-world check (planet_destruction.600).

## 剧情脉络 Story outline

窗口 planet_destruction.1000 与其他巨像共用，见“观测终止”故事（event-planet-destruction-1005）。

The window planet_destruction.1000 is shared with the other Colossus weapons; see the "Observation Ceases" story (event-planet-destruction-1005).

## 条件与文明差异 Conditions and variants

需要 Infernals DLC 的行星熔炉巨像。

Needs the Infernals DLC Planet Smelter Colossus.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/infernals_1_events.txt:468-520; common/on_actions/01_planet_destruction.txt:194-199 on_destroy_planet_with_PLANET_KILLER_SMELTER; events/planet_destruction_events.txt:2967-3093
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
