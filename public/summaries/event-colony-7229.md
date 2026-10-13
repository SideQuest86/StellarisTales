# 冰川危机 / Glacial Crisis

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain
- 来源 Sources：`events/colony_events_3.txt:9816–10190` · `common/special_projects/00_projects_3.txt:1886–1935` · `common/on_actions/00_on_actions.txt:3775`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地满两年时，随机池以权重 8 抽中隐藏事件 colony.7229（注释写作“flag only”）：要求高山、苔原或极地星球，非母星/非首都、由原主人持有；帝国尚未发生过本链（`melting_planet`），没有“驾驭自然”飞升，也不是荒野帝国。它只设置标记，并在**整整 3600 天后**弹出 **冰川危机（7230）**（届时星球仍须是寒冷类型、无地面战斗、非首都）。

At the second anniversary the pool can pick the hidden colony.7229 (weight 8) on an alpine, tundra or arctic colony (non-homeworld, non-capital, original owner; once per empire; not with *Mastery of Nature*). It only sets flags and fires **Glacial Crisis** exactly 3600 days later, if the world is still cold, without ground combat and not the capital.

## 剧情脉络 Story outline

1. **冰川危机（7230）**：星球表面迅速升温。查明原因 → 项目 **正在融化的表面**（1000 物理学，720 天期限）；或“没什么可担心的” → 360–440 天后 **巨大的洪泛区（7245）**。
2. 项目成功 → **冰中裂痕（7235）**；项目超时失败 → **巨大的洪泛区（7245）**。
3. **冰中裂痕（7235）**：修改生产指标（持续融化 + 停产修正）→ 360–420 天后 **地核融化（7240）**；或“冰川期到此为止”（加速融化 720 天）→ 720 天后 **冰川期的终结（7265）**。
4. **地核融化（7240）**：减轻损失（洪泛区障碍）→ 360–420 天后 **永冻之秘（7247）**；环保主义公民性可“宣布紧急状态” → 项目 **气候危机**（1500 物理学）→ **气候稳定（7260）**。
5. **巨大的洪泛区（7245）**：洪泛区障碍、一人死亡 → 360–420 天后 **永冻之秘（7247）**。
6. **永冻之秘（7247）**：开采（矿石洞穴矿藏）→ 240–300 天后随机：60% **解冻的病原体（7250）**（仅非机械帝国）/ 40% **极地财富（7255）**；或保护永冻土（凝聚力），结束。

English outline: the warming world can be studied (720-day project) or ignored. Success leads to *Cracks in the Ice*, where you either fight the melting (→ *Core Meltdown*, with an Environmentalist-only emergency project ending in *Climate Stabilized*) or let the ice age end (→ the planet becomes an ocean world). Ignoring the problem or failing the project floods the planet (*Vast Floodplains*). Mitigation and flooding both lead to *Secrets of the Permafrost*: drill (60% pathogen for non-machine empires / 40% riches) or leave it alone.

## 分支与结局 Branches and outcomes

- 冰川期的终结（7265）：星球变为海洋星球。/ The planet turns into an ocean world.
- 气候稳定（7260）：仅环保主义。/ Environmentalist only.
- 解冻的病原体（7250）与极地财富（7255）：钻探后的互斥随机结果（60/40）。/ Exclusive drilling results (60/40).
- 保护永冻土（7247 第二项）：只得凝聚力。/ Leaving the permafrost only grants unity.

## 条件与文明差异 Conditions and variants

- “宣布紧急状态”需要环保主义公民性。/ The emergency option needs the Environmentalist civic.
- 机械帝国在钻探后不会遇到病原体事件（其触发条件排除机械帝国）。/ Machine empires never get the pathogen event.

## 审阅记录 Review notes

- 已核对 Checked：7229–7265 全部脚本、两个项目（含 720 天期限与 `on_fail`）、`on_colony_2_years_old` 随机池。编译草稿结构与源文件一致。
- 审阅改动 Changes：标注四个结局与两条审阅注释（十年延时、保护永冻土的退出）。
- 注释 Commentary：概述为审阅者撰写。
