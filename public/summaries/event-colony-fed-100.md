# 蓝荷计划 / Project Blue Lotus（不可能的凹地 Impossible Corrie）

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain

## 如何开始 How it starts

殖民地满两年（权重 3）或满三年（权重 4）时，随机池可抽中 colony_fed.100「不可能的凹地」（随机池注释归为“Federations”）。要求：非母星/非首都、非 AI、非栖息地/环世界/方舟、无地面战斗、未被占领，有人口且有矿工（或采矿子个体）岗位；星球没有其他殖民地事件；每个帝国一次（`bluelotus`）。

At the second (weight 3) or third (weight 4) anniversary the pool can pick *Impossible Corrie* on a non-capital colony with miners (or mining drones), once per empire.

## 剧情脉络 Story outline

1. **不可能的凹地（100）**：采矿设施周围出现碗状凹地（获得矿藏）→ 45 天 → **蓝荷计划（105）**：发现能嬗变光子的蓝色晶体（格式塔帝国是一台运行独立程序的离群无人机）。
2. 选择：/ Choices:
   - 非格式塔：继续研究（花费 420 能量，55 天后）或立即停止实验（40 天后 **过分拥护者 106**，结局）。/ Non-gestalt: continue (420 energy) or stop (→ 106).
   - 格式塔：让它回归系统（40 天后）或摧毁无人机（部分岗位人口死亡，50 天后 **离经叛道的炼金术士 107**，结局）。/ Gestalt: absorb it or purge it (→ 107).
3. **炼金术运转中（110）**：开启项目 **蓝荷设施**（3500 物理学，1080 天期限）。成功 → **广谱炼金术（115）**（设施升级）；超时失败 → **蓝荷崩溃（111）**。
4. 升级后有 50% 几率在 1800–2160 天后发生 **蓝荷自噬（120）**：设施失控，留下弹坑矿藏。

## 分支与结局 Branches and outcomes

| 结局 Ending | 说明 Note |
| --- | --- |
| 过分拥护者（106） | 停止实验，失去矿藏，得少量合金 / halted |
| 离经叛道的炼金术士（107） | 格式塔清除无人机 / drone purged |
| 蓝荷崩溃（111） | 项目超时：废墟矿藏、人口死亡 / project timed out |
| 广谱炼金术（115） | 升级成功；若 50% 隐患未触发则就此结束 / upgraded |
| 蓝荷自噬（120） | 升级后的 50% 灾难 / later catastrophe |

## 条件与文明差异 Conditions and variants

格式塔与非格式塔帝国看到不同的正文与选项（105、110）。/ Gestalt and non-gestalt empires get different texts and options.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:3382–3702` · `common/special_projects/00_projects_federations.txt:373–394` · `common/on_actions/00_on_actions.txt:3793、3842`
- 已核对 Checked：colony_fed.100–120 全部脚本、项目期限与 `on_fail`、两个随机池权重。编译草稿结构正确。
- 审阅改动 Changes：标题改用 105「蓝荷计划」（项目与开发者注释均称 "PROJECT BLUE LOTUS"）；标注四个结局与 115 的审阅注释。
