# 自动无畏战舰 / Automated Dreadnought

- 分类 Category：巨兽与城邦 · DLC：利维坦 Leviathans

## 如何开始 How it starts
首次进入守卫星系：3100“自动无畏战舰”（每帝国一次）。
First entry into the guarded system fires 3100.

## 剧情脉络 Story outline
玩家瘫痪无畏战舰（on_ship_destroyed_victim → 隐藏 3101）：3102“无畏战舰已被瘫痪”。

The player disables the dreadnought (on_ship_destroyed_victim → hidden 3101): 3102 "Dreadnought Disabled".

- a 启用项目 DISABLED_DREADNOUGHT_PROJECT → 3103 修复完成，生成一艘（灵跃）跳跃无畏舰。  
  a Enable project DISABLED_DREADNOUGHT_PROJECT → 3103 "Dreadnought Repaired" fires, producing one (Psi Jump) jump dreadnought.
- b 拆解：1000合金、5000能量与工程研究加成。  
  b Dismantle: 1000 alloys, 5000 energy and an engineering research bonus.
- c 收割部件（需能力）：tech_leviathan_techgenesis 研究选项。  
  c Harvest parts (requires the ability): tech_leviathan_techgenesis research option.

之后开启庆典情境（见庆典故事）。

Afterwards the celebration situation opens (see the celebration story).

## 分支与结局 Branches and outcomes
三选一；只有 a 通向 3103。

Choose one of three; only a leads to 3103.

## 条件与文明差异 Conditions and variants
机器帝国使用不同描述文本；灵跃引擎决定舰型。

Machine empires use different description text; the Psi Jump drive determines the hull type.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/leviathans_events_2.txt:4221-4477; common/on_actions/00_on_actions.txt:912, :1398
合并 event-leviathans-3100 / -3101。完整。 Merged two stories; complete.
