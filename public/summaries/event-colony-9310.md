# 轨道垃圾场 / Junkyard Orbit

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain
- 来源 Sources：`events/colony_events_3.txt:6868–7076` · `common/special_projects/00_projects_3.txt:1809–1841` · `common/on_actions/00_on_actions.txt:3880`
- 审阅 Reviewed：2026-10-12（c7b-society）

## 如何开始 How it starts

殖民地满五年时（`on_colony_5_years_old`），随机池以权重 3 抽中 colony.9310：非人造星球、有人口、非母星/非首都、原主人的非 AI 殖民地；每个帝国一次（`colony_junkyard_orbit`）；星球无其他殖民地事件。

At the fifth anniversary (weight 3) on a non-artificial colony; once per empire.

## 剧情脉络 Story outline

1. **轨道垃圾场（9310）**：废弃物管理失算，随机一处矿藏被“蔓生的垃圾填埋场”阻挡 → 360–380 天 → **碎片笼罩（9315）**（仍需有该障碍）：轨道事故使碎片环绕星球。
2. 选择：/ Choose:
   - 打扫轨道 → 项目 **轨道净空**（1500 工程学，720 天期限）：成功 **轨道清理完成（9320）**，超时 **封锁之地（9325）**。
   - “太空这么大” → 180–200 天后随机：60% **封锁之地（9325）** / 40% **流星雨（9330）**。
   - 宣告紧急事态（保守特质，或环保主义、田园之花、拾荒者、热切探索者、企业拾荒者、观星蜂群、零浪费协议）→ 项目 **强力轨道净空**（3000，720 天期限）：成功 **天清空净（9335）**，超时 9325。

## 分支与结局 Branches and outcomes

四个结局互斥：9320（清理完成）、9325（封锁之地）、9330（流星雨）、9335（天清空净）。/ Four exclusive endings.

## 条件与文明差异 Conditions and variants

紧急清理选项只对上述特质/公民性显示。/ The emergency option is trait/civic gated.

## 审阅记录 Review notes

已核对 9310–9335 全部脚本、两个项目（期限与 `on_fail`）与随机池；编译草稿正确，仅标注结局。/ Draft correct; endings labelled.
