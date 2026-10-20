# 密弥库蚁活动 / Myrmeku Activity

- 分类 Category：文明纪事 Society (C7) · 殖民地事件链 colony event chain

## 如何开始 How it starts

殖民地满三年时（`on_colony_3_years_old`），随机池以权重 10 抽中 colony.9350。所有者必须是“机器人帝国”（主物种为机械/机械单位、合成人帝国或机械智能，`is_robot_empire`）；星球不是核爆、人造星球，也没有其他殖民地事件；全银河只发生一次（全局标记 `myrmeku`）。事件开启“密弥库蚁”事件链。

At the third anniversary the pool can pick colony.9350 (weight 10) for a robotic empire (mechanical/machine-unit main species, synthetic empire or machine intelligence). Not on tomb or artificial worlds; once per galaxy. It starts the *Myrmeku* event chain.

## 剧情脉络 Story outline

1. **密弥库蚁活动（9350）**：微小的磁性昆虫在殖民地周围活动（知识宝库帝国、探索协议/环保主义另有加成选项）→ 180–210 天 → **殖民者被攻击（9355）**（获得攻击修正）→ 120–150 天 → **记忆吞食者（9360）**：它们开始吞食机器人的记忆芯片。
2. **记忆吞食者（9360）**五种对策：密封殖民地、升级躯体、摧毁群落、捕获昆虫（仅催化帝国）、清空星球生命（仅终结者 → 30 天后 **核爆选项（9370）**）。
3. 前四种对策都进入 **害虫防治（9365）**（正文按对策不同），再过 90–105 天 → **分析子例程提议（9375）**：引走它们（结束）或研究它们 → 项目 **密弥库蚁研究**（2000 社会学）→ **强力结果（9380）**。

English outline: the Myrmeku attack the colony and start eating memory chips. Four counter-measures lead to *Pest Control* and then the *Analysis Subroutine Proposal* (lure them away, or study them → *Powerful Results*); Terminators may instead nuke the planet.

## 分支与结局 Branches and outcomes

- 核爆选项（9370）：星球变为核爆星球（终结者）。/ The planet becomes a tomb world (Terminators).
- 引走（9375 第一项）：合金与“被引走”修正，链结束。/ Alloys and a lured modifier; chain ends.
- 强力结果（9380）：密弥库蚁发电场矿藏。/ Myrmeku power farms deposit.

## 条件与文明差异 Conditions and variants

- 本链只对机器人类帝国出现。/ Only robotic empires.
- 9350 的两个附加选项分别需要知识宝库帝国、探索协议或环保主义；9360 的“捕获”需要催化帝国，“清空”需要终结者。/ Extra options gated by Memory Vault, Exploration Protocol/Environmentalist, catalytic empires and Terminators.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（c7b-society）
- 来源 Sources：`events/colony_events_3.txt:7078–7577` · `common/special_projects/00_projects_3.txt:1843` · `common/on_actions/00_on_actions.txt:3821`
- 已核对 Checked：9350–9380 全部脚本、延时、`is_robot_empire` 定义与研究项目（易主时项目中止）。编译草稿结构正确。
- 审阅改动 Changes：标注两个结局与两条审阅注释（引走退出、害虫防治的延时差异）；事件链概览卡片仅作说明。隐藏事件 9385（星球易主时清理修正）不在阅读树中。
