# 野性过载 / Feral Overload

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain（首个事件「返祖现象 Feral Behavior」）

## 如何开始 How it starts

殖民地满三年时（`on_colony_3_years_old`），随机池以权重 10 抽中 colony.8001。要求：干旱、高山、苔原、大陆、海洋或热带星球，有人口，非母星/非首都，由原主人持有的非 AI 殖民地；所有者不是格式塔，且帝国尚未发生过本链（`feral_overload_flag`）。

At the third anniversary the pool can pick colony.8001 (weight 10) on an arid, alpine, tundra, continental, ocean or tropical colony with pops (non-homeworld, non-capital, original non-AI owner), for non-gestalt empires that have not had this chain before.

## 剧情脉络 Story outline

1. **返祖现象（8001）**：殖民者行为越来越原始（获得修正）→ 40–60 天 → **暴力在蔓延（8002）** → 40–60 天 → **疯了，都疯了！（8003）**：开启事件链，按人口规模杀死 0–10 个人口并增加 50 荒废度。/ Feral behaviour escalates over two short delays; *This is Madness!* starts the chain, kills up to 10 pops and adds 50 devastation.
2. 项目 **根除问题**（500 社会学）→ **凶猛的孢子（8004）**：原因是洞穴中的真菌。/ The project finds cave mushrooms.
3. 二选一：**令其生存** → 项目“利用洞穴蘑菇”（500 社会学）→ **冲动之云（8005）**；**或使其灭亡** → 项目“清除洞穴蘑菇”（500 工程学）→ **净化之焰（8006）**。/ Live → utilize project → *Cloud and Strife*; or let die → exterminate project → *The Cleansing Flames*.

## 分支与结局 Branches and outcomes

- 冲动之云（8005）：孢子喷口矿藏 + 永久修正。/ Spore vents deposit and a permanent modifier.
- 净化之焰（8006）：洞穴蘑菇矿脉矿藏。/ Cave shroom veins deposit.
两者互斥，都结束事件链。/ Exclusive; both end the chain.

## 条件与文明差异 Conditions and variants

无按文明身份变化的文本或选项。/ No identity variants.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:3128–3380` · `common/special_projects/00_projects_federations.txt:8–59` · `common/event_chains/00_event_chains.txt:335` · `common/on_actions/00_on_actions.txt:3808`
- 已核对 Checked：8001–8006 的触发、延时、立即效果与三个项目（`00_projects_federations.txt`，项目本身无 DLC 检查）。编译草稿结构正确。
- 审阅改动 Changes：标题改用事件链名称「野性过载」（开发者注释 "FERAL OVERLOAD"）；标注两个结局；事件链概览卡片仅作说明。
