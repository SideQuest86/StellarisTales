# 遭遇非机器人 / Non-Robotics Encountered（机械遇有机）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件 first_contact.390）
- 来源 Sources：`events/first_contact_events.txt:5771–6136` · `common/first_contact/00_first_contact.txt:409–451, 1780–1856`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

第二阶段抽取，权重 10000：本方为机械智能，且（对方为常规帝国且本方没有 machine_encountered_default 标记、也未与常规帝国通讯）或（对方为蜂巢且本方没有 machine_encountered_hive 标记、也未与蜂巢通讯）（`common/first_contact/00_first_contact.txt:410–451`）。/ Stage-2 weight 10000: owner is a machine intelligence meeting a regular empire (first time) or a hive (first time).

## 剧情脉络 Story outline

1. **遭遇非机器人（390）**：发现对方是有机生命；选项名随机器人 civic（终结者/同化者/仆从）变化；按对方是蜂巢与否、主动/谨慎选择四个收尾阶段之一。/ Option labels vary with the machine civic; four end stages by hive-or-not and proactive/cautious.
2. 蜂巢 → **395**（社会研究加成）；常规 → **397**（团结度加成）。/ Hive → 395; regular → 397.

## 分支与结局 Branches and outcomes

395 与 397 互斥。/ Exclusive.
所有收尾选项都调用 finish_first_contact_effect（建立正式通讯，之后按帝国类型转入后续事件，如反向接触、教程、商队等），并调用 first_contact_inform_intel。 / Every ending option calls finish_first_contact_effect (opens regular communications, then routes to follow-ups such as reverse first contact, tutorial, caravaneer events) and first_contact_inform_intel.

## 条件与文明差异 Conditions and variants

395/397 的正文与选项因终结者/同化者/仆从 civic 与荒野帝国而异。/ Text varies by machine civic and wilderness empires.

## 审阅记录 Review notes

- 已核对 Checked：390、395、397 与四个收尾阶段。
- 审阅改动 Changes：并 390、397 入 395 篇。/ 390 and 397 joined the 395 story.
