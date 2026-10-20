# 试验品逃跑 / Test Subjects Escaping
- 分类 Category：文明纪事 Society (C7) · “实验测试”情境中的随机插曲 random interlude in the Experimental Testing situation

## 如何开始 How it starts

每月殖民地脉冲 on_colony_monthly_pulse 调用隐藏事件 shroud.1100（`00_on_actions.txt:3926`）。条件：“残酷实验者”(Twisted Experimenters) 帝国，正在进行“实验测试”情境，已过 3 年，近期没有逃跑、也没有处决过试验品，且本星球的试验品人口 ≥500。条件满足时每月 1% 概率触发 **shroud.1105**；触发后设 3600 天冷却。/ The monthly colony pulse calls hidden shroud.1100: a Twisted Experimenters empire running the Experimental Testing situation, ≥3 years in, no recent escape or execution, ≥500 test subjects on the planet; then a 1% monthly chance fires 1105 (10-year cooldown).

## 剧情脉络 Story outline

1. **试验品逃跑（1105）**：部分试验品通过简陋的地道逃出设施。三选一：/ Test subjects escape through a tunnel; three options:
   - A **放他们自由**（非灭绝倾向者）：团结度奖励；一半试验品人口群变为难民物种 → **难民抵达（refugees.1）**（约 65% 流向其他难民系统，35% 取决于外交关系）。
   - B **停工搜捕**：360 天“测试封锁”修正。
   - C **处决剩余者**：杀死所有试验品，设 test_subjects_executed 标志，并立刻结算当前情境（shroud.1010）→ **1015 实验研究成功**。
2. **1015**：选择下一轮实验方向——物理 / 社会 / 工程 / 暂缓，重新开始“实验测试”情境（若进度循环）。/ 1015 chooses the next round (physics / society / engineering / hold) and restarts the situation.

## 分支与结局 Branches and outcomes

A / B / C 互斥；C 之后条件 test_subjects_executed 使本事件不再出现。/ A, B and C are exclusive; after C the event cannot recur.

## 条件与文明差异 Conditions and variants

只对“残酷实验者”帝国触发；A 要求非灭绝倾向。/ Twisted Experimenters only; A needs a non-homicidal empire.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/shroud_situation_events.txt:250–484, 34–247` · `common/situations/13_shroud_situations.txt:401–570` · `common/on_actions/00_on_actions.txt:3926`
- 已核对 Checked：shroud.1100/1105/1010/1015 脚本，实验测试情境的循环，难民事件的衔接。
- 审阅改动 Changes：补充了隐藏根的触发条件和概率；1015 → 情境 → 1010 的循环以 ref 节点表示。/ Trigger and probability of the hidden root documented; the 1015 → situation → 1010 loop is shown as a return reference.
- 不确定 Uncertain：refugees.1 / 2 的分流细节（难民外交关系）来自调用图，未逐项展开。/ The refugee routing was read from the call graph.
