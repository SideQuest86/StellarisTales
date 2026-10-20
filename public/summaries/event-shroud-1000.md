# 实验测试 / Experimental Testing

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 扭曲实验者起源/政体的帝国：游戏开始或政体变更时隐藏事件 shroud.1000 启动局势（若没有该局势且不在选择中）。
  For Twisted Experimenters empires: hidden shroud.1000 starts the situation at game start or after a government change (if none is running and no choice is pending).

## 剧情脉络 Story outline

- 局势“实验测试”：单阶段（0–60），进度每月+1，受受试者数量和速度倍率影响；受试者为0、测试封锁或“保持”取向时进度为0；三种研究取向（物理/社会/工程）选择后互相锁定。
  The situation "Experimental Testing": one stage (0-60), +1 progress per month scaled by the number of test subjects and the speed multiplier; zero with no subjects, under a testing lockdown or with the Hold approach; the three research approaches (physics / society / engineering) lock each other.
- 完成 → 隐藏 shroud.1010：按取向给出该领域的科技洞察、处理受试者死亡，然后 shroud.1015「实验研究成功」让玩家选择下一轮取向（四个选项各自重新启动局势）。
  Completion -> hidden shroud.1010 gives a tech insight of the chosen field and handles test-subject deaths, then shroud.1015 "Experimental Research Success" lets the player pick the next approach (the four options each restart the situation).

## 分支与结局 Branches and outcomes

- 四个选项互斥，决定下一轮取向；故事循环。
  The four options are exclusive and set the next approach; the story loops.

## 条件与文明差异 Conditions and variants

- 仅扭曲实验者（is_twisted_experimenters_empire）。
  Twisted Experimenters only.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/situations/13_shroud_situations.txt`；`events/shroud_situation_events.txt:12-260`；`common/on_actions/00_on_actions.txt:69,4710`
- 已核对：启动条件、局势定义与取向锁定、完成后的循环。
  Checked: start condition, situation definition and approach locks, the loop after completion.
