# 有规律的信号 / Structured Signals
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（飞地 enclave_stage_1）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:14–114` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:4–42` · `common/scripted_effects/first_contact_effects.txt:9–160`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

与飞地（enclave / mindwarden_enclave / enclave_mercenary）类国家首次相遇，setup_first_contact_path 开始 enclave_stage_1；同时安排 leviathans.97 在 720（+0–360）天后作为兜底（`first_contact_effects.txt:70–85`）。/ Meeting an enclave-type country starts enclave_stage_1 and schedules leviathans.97 in 720 (+0–360) days as a fallback.

## 剧情脉络 Story outline

1. **结构化信号（1）**：信号聚集在一个空间站（或一艘大船，视是否冠军），第一阶段（难度3）。/ Structured signals around one station; stage 1 (difficulty 3).
2. **通讯建立（5）**：第二阶段（难度5）后，与独立空间站通讯；选项随 civic（狂热净化者/吞噬蜂群/终结者）变化。/ Communications established with the independent station.

## 分支与结局 Branches and outcomes

线性，无分叉。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 / Linear. The ending options call finish_first_contact_effect (first contact ends).

## 条件与文明差异 Conditions and variants

5 的选项文字随 civic 变化。/ 5’s option text depends on civic.

## 审阅记录 Review notes

- 已核对 Checked：飞地首次接触事件 1、5，阶段定义，set_first_contact_starting_stage 中的飞地分支。/ Events 1 and 5, both stages, the enclave branch of the starting-stage effect.
- 审阅改动 Changes：把 5 并入 1（原 event-first-contact-critters-5 不再单列）。/ 5 merged into 1.
