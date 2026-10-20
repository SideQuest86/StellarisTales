# 殖民地的神秘卫星 / The Mysterious Moon of a Colony
- 分类 Category：文明纪事 Society (C7) · 殖民地事件 colony event（开发者注释 "Rogue moon"）

## 如何开始 How it starts

殖民地满两年或满三年时（随机池权重均为 10）抽中 colony.3001：星球需有一颗不可居住的卫星（非栖息地），且不是栖息地/环世界；有人口、非母星/非首都、原主人的非 AI 殖民地；每个帝国一次（`roguemoon_country`），星球无其他殖民地事件。

At the second or third anniversary (weight 10 each), on a colony that has a non-habitable moon; once per empire.

## 剧情脉络 Story outline

定居后收集到关于卫星的怪异数据 → 特殊项目 **调查神秘卫星**（1500 社会学）→ 完成后 10–15 天随机：/ Strange readings → project (1500 society) → 10–15 days later, at random:

- 90% **流浪的卫星基地（3002）**：卫星上的外星基地；工程研究、暗物质开采科技进度，卫星获得暗物质矿藏。
- 10% **次元旅者（3003）**：物理研究与跃迁引擎科技进度。

## 分支与结局 Branches and outcomes

两个结果互斥（90/10）。/ Exclusive 90/10.

## 条件与文明差异 Conditions and variants

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:1036–1173` · `common/special_projects/00_projects_3.txt:786–801` · `common/on_actions/00_on_actions.txt:3765、3818`
已核对事件、项目与两个随机池。编译草稿正确；标注两个结局。注意：开发者注释称 DPORTAL_PROJECT 属于“始于 colony.3001 的流浪卫星链”，但脚本中两者没有调用关系——“传送门”是独立的殖民地事件（colony.3005，目前在另一个故事中）。/ Draft correct. A developer comment links the Doorway portal to this chain, but no script call connects them.