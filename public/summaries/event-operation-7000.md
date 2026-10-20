# 信息收集 / Gather Information

- 分类 Category：银河轶事 C8 stories · DLC：Nemesis

## 如何开始 How it starts

行动类型 operation_gather_information（common/espionage_operation_types/operations.txt:34-87）：单阶段，目标为一个普通国家，花费 20 影响力和 4 能量/月，一次只能进行一个行动；阶段结束事件 operation.7000（events/nemesis_operations_events_1.txt:5051）。
Single-stage operation (20 influence, 4 energy upkeep, one at a time).

## 剧情脉络 Story outline

7000 “信息收集”：立即在六类情报（政府、外交、经济、军事、科技…）的各三个等级中随机抽取一项（权重1，对已达到的等级及以上权重为0；有对应线人时权重×5），设置报告标记；十八个同名选项“任务完成”分别对应一个报告（提升该类别的情报等级）。
7000: a random intel report (category x level) is drawn; the 18 identical-looking options each give one report.

## 分支与结局 Branches and outcomes

- 只会显示被抽中的那个选项。 Only the drawn option is shown.

## 条件与文明差异 Conditions and variants

- 已有的情报等级使对应报告不可选；有对应线人时×5。 Existing intel levels remove reports; a matching Asset multiplies the weight by 5.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/nemesis_operations_events_1.txt, common/espionage_operation_types/operations.txt
- 已核对 Checked：operation.7000 的抽签与标记（nemesis_operations_events_1.txt:5051-5200）；未逐一核对 18 个选项的情报效果。 The 18 options' intel effects were not audited one by one.
