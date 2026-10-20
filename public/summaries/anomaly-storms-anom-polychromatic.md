# 多彩之星 / Polychromatic Star

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 2级异常，每帝国一次，权重0；隐藏事件cstorms.10随机项（基础0，星系中存在无异常的普通恒星+1；排除脉冲星/中子星/黑洞/T型星等；旗标spawned_STORMS_ANOM_POLYCHROMATIC）。要求星系有所有者，且不是异维度/无形态星系或正在建造巨型结构。  
  Level-2 anomaly, once per empire, weight 0; entry of hidden cstorms.10 (base 0, +1 if an anomaly-free ordinary star exists; pulsars / neutron stars / black holes / T stars excluded; flag spawned_STORMS_ANOM_POLYCHROMATIC). The system must be owned and not extradimensional / formless or building a megastructure.
- 风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。  
  When a storm leaves a system (on_storm_left_system, common/on_actions/00_on_actions.txt:5421) a random event fires: 75% nothing, 5% hidden cstorms.5, 20% hidden cstorms.10.

## 剧情脉络 Story outline

- 单一结局cstorms.5035“多彩恒星”（研究）：a“研究”放置d_physics_7（若已有采矿站则清除旧资源点并移除采矿站）；b“采集”放置d_energy_2及按风暴类型决定的资源点（异种气体/挥发性微粒/合金/晶体/活体金属）。  
  Single outcome cstorms.5035 (research): a "study" places d_physics_7 (clearing an existing mining station and deposits); b "harvest" places d_energy_2 plus a deposit chosen by storm type (exotic gases / volatile motes / alloys / crystals / living metal).

## 分支与结局 Branches and outcomes

- 两个选项互斥。  
  The two options are exclusive.

## 条件与文明差异 Conditions and variants

- 采集资源取决于造成异常的风暴类型。  
  The harvested resource depends on the storm type.

## 审阅记录 Review notes

- 审阅 Review：2026-10-13（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:213-230` · `events/cosmic_storms_events_1.txt:118-176` · `events/anomaly_events_cosmic_storms.txt`
- 已对照类别脚本、cstorms.10与5035。  
  Compared the category script, cstorms.10 and 5035.
- 覆盖 Coverage：全部2个文档。 / All 2 docs.
