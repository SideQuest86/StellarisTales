# 模仿者 / The Imitator

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 3级异常，每帝国一次，权重0；由隐藏事件cstorms.5的随机项添加（需要星系有所有者且该国未设spawned_imitator_category旗标），ST5。  
  Level-3 anomaly, once per empire, weight 0; added by an entry of hidden cstorms.5 (needs an owned system and no spawned_imitator_category flag on that owner).
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.1550“模仿者”（研究）：创建临时国家与一名科学家领袖“模仿者”。a摧毁逃生舱（合金与凝聚力月收益，销毁模仿者）；b带上舱→30天后cstorms.1555。  
  Single outcome cstorms.1550 (research): creates a temporary country and a scientist leader, the Imitator. a destroys the pod (alloy and unity income, the Imitator is removed); b brings the pod aboard → cstorms.1555 after 30 days.
- 1555：a雇佣模仿者为领袖；b送往最近的居住行星（凝聚力）；c留下他们、获得工程研究。b/c杀死模仿者；事件后清理临时国家。  
  1555: a hires the Imitator as a leader; b delivers them to a nearby inhabited planet (unity); c leaves them and takes the pod (engineering research). b/c remove the leader; the temporary country is cleaned up afterwards.

## 分支与结局 Branches and outcomes

- 结局：1555三选一，或1550.a。  
  Endings: one of the three 1555 options, or 1550.a.

## 条件与文明差异 Conditions and variants

- 无特别差异。  
  No notable variants.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:197-210` · `events/cosmic_storms_events_1.txt:96-112` · `events/cosmic_storms_events_1.txt`
- 已对照类别脚本、cstorms.5条目与1550/1555。  
  Compared the category script, the cstorms.5 entry and 1550/1555.
- 覆盖 Coverage：全部3个文档。 / All 3 docs.
