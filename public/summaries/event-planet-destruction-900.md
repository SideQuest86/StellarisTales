# 行星被退化 / Planet Devolved

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany

## 如何开始 How it starts

玩家用巨像的“降智光束”武器毁掉/改造一颗行星时（common/on_actions/01_planet_destruction.txt:165-167），隐藏事件触发；若星球有所有者且不是自己，所有者的对手即玩家获得叙事窗口 planet_destruction.901。

When the player's Colossus fires "Devolving Beam" at a planet (common/on_actions/01_planet_destruction.txt:165-167) the hidden dispatcher fires; if the planet has an owner that is not the firing country, a narrative window planet_destruction.901 is shown to the firing player. 

## 剧情脉络 Story outline

单窗口 planet_destruction.901，每个国家只显示一次（国家旗标 fired_devolving_beam）。若星球上有观测前哨，一天后另有 planet_destruction.1000 通知；若是机械意识（Contingency）的世界则触发 crisis.2040/2046（属危机故事）。

A single window planet_destruction.901, shown once per country (country flag fired_devolving_beam). If the planet had an observation outpost, planet_destruction.1000 follows one day later; Contingency machine worlds trigger crisis.2040/2046 (crisis stories).

## 条件与文明差异 Conditions and variants

无条件差异。

No variants.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/planet_destruction_events.txt:2580-2965; common/on_actions/01_planet_destruction.txt:165-167
- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
