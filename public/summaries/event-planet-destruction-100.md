# 炸个球助兴 / Cracking Open a Cold One

- 分类 Category: C8 银河轶事 / C8 Galactic miscellany · 来源 Sources: events/planet_destruction_events.txt:20-440; common/on_actions/01_planet_destruction.txt:14-25 · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

玩家用巨像的“世界粉碎者（World Cracker）及方舟的重塑行星/恒星点燃”武器毁掉/改造一颗行星时（common/on_actions/01_planet_destruction.txt:14-25），隐藏事件触发；若星球有所有者且不是自己，所有者的对手即玩家获得叙事窗口 planet_destruction.101 / .102。冰冻星球触发 planet_destruction.102（“炸个球助兴”），其余非机械世界触发 .101（“星球被击碎”）。

When the player's Colossus fires "World Cracker (and the arkship planet reprocess / stellar ignition)" at a planet (common/on_actions/01_planet_destruction.txt:14-25) the hidden dispatcher fires; if the planet has an owner that is not the firing country, a narrative window planet_destruction.101 / .102 is shown to the firing player. Frozen planets show planet_destruction.102 ("Cracking Open a Cold One"), other non-machine worlds planet_destruction.101 ("World Cracked").

## 剧情脉络 Story outline

单窗口 planet_destruction.101 / .102，每个国家只显示一次（国家旗标 fired_cracker）。若星球上有观测前哨，一天后另有 planet_destruction.1000 通知；若是机械意识（Contingency）的世界则触发 crisis.2040/2046（属危机故事）。

A single window planet_destruction.101 / .102, shown once per country (country flag fired_cracker). If the planet had an observation outpost, planet_destruction.1000 follows one day later; Contingency machine worlds trigger crisis.2040/2046 (crisis stories).

## 条件与文明差异 Conditions and variants

需要巨像武器；狂热净化者与终结者机械有专属选项（获得团结）。

Needs a Colossus weapon; Fanatic Purifiers and Terminator machines have their own option (unity).

## 审阅记录 Review notes

- 已核对入口、触发、选项与结果。
  Checked the entry, trigger, options and outcomes.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
