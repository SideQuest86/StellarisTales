# 研究智慧海洋 / Study The Living Sea

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- “海洋活着”故事的补发机制：空间站被毁(on_starbase_destroyed)时，仅当星系带living_planet_system星旗，隐藏事件distar.1999才触发distar.199；建造前哨/空间站转让时也直接触发199。  
  Re-enable mechanism of the Haunting Sea story: when a starbase is destroyed (on_starbase_destroyed) hidden distar.1999 fires distar.199 if the system has the living_planet_system flag; building an outpost / transferring a starbase triggers 199 directly.

## 剧情脉络 Story outline

- 199（关卡）：若该国持有事件链living_planet_chain且未在进行STUDY_LIVING_SEA，则启用项目STUDY_LIVING_SEA并中止他国的同项目（改为兴趣点）。项目完成→distar.191→192（180±30天）→194（360±60天）或195（90±10天）→196；191也在3600天后触发193。  
  199 (gatekeeper): if the country holds the living_planet_chain and is not already running STUDY_LIVING_SEA it enables the project and aborts rivals' copies (turning them into a point of interest). On completion → distar.191 → 192 (180+/-30 days) → 194 (360+/-60) or 195 (90+/-10) → 196; 191 also fires 193 after 3600 days.

## 分支与结局 Branches and outcomes

- 192的a/b互斥（继续研究 / 官员叛变）。  
  Options a/b of 192 are exclusive (continue / officer defects).

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`events/distant_stars_events_1.txt:6324-6380` · `common/on_actions/00_on_actions.txt:1512,1933,4188` · `common/special_projects/00_projects_distant_stars.txt:1605`
- 已对照distar.1999/199/190。同一尾段也在c3a的anomaly-distar-living-cat中（见请求）。  
  Compared distar.1999/199/190. The same tail is also part of c3a's anomaly-distar-living-cat (see Requests).
- 覆盖 Coverage：全部7个文档。 / All 7 docs.
