# 失败 / Failure

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`events/anomaly_events_3.txt:5114-5160` · `events/failures.txt:490`
- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 带gas_rich_planet修正的星球被殖民时(on_colonized)隐藏事件4171触发，且殖民者须持有旗标limited_modifier_gas_rich_planet（common/on_actions/00_on_actions.txt:1297）。  
  Hidden event 4171 fires when a planet with the gas_rich_planet modifier is colonised (on_colonized), and the owner must have limited_modifier_gas_rich_planet (common/on_actions/00_on_actions.txt:1297).

## 剧情脉络 Story outline

- 4171移除修正，换成720天的gas_rich_planet_fo_realz，然后30%：360天后anomaly_failure.4170“煤气设施燃爆”；70%：720天后4172“挥发资源耗尽”（清除旗标）。  
  4171 removes the modifier and adds a 720-day gas_rich_planet_fo_realz, then 30%: anomaly_failure.4170 (gas facility inferno) after 360 days; 70%: 4172 (volatile resources depleted) after 720 days (flag cleared).

## 分支与结局 Branches and outcomes

- 4170与4172互斥（30/70）。  
  4170 and 4172 are exclusive (30/70).

## 条件与文明差异 Conditions and variants

- 描述随是否平等主义者/是否征服者变化。  
  Text varies with egalitarianism and whether the owner is the original colonist.

## 审阅记录 Review notes

- 已对照原文。  
  Compared the originals.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
