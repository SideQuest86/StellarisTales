# 发现资源 / Resource Discovery
- 分类 Category：文明纪事 Society (C7) · 专业型附庸（勘探者）specialist subject (Prospectorium)

## 如何开始 How it starts

每年一次的国家脉冲（on_yearly_pulse_country，`00_on_actions.txt:408`）调用隐藏事件 specialist.1100：本方有“勘探者”(prospectorium) 专业附庸，且境内有合适的星球（valid_for_prospectorium_discovery）；20% 概率选定一颗星球，1–181 天后触发 **1150**。/ Yearly country pulse: with a Prospectorium specialist subject and a valid planet in the borders, 20% to pick a planet and fire 1150 after 1–181 days.

## 剧情脉络 Story outline

**资源发现（1150）**：附庸报告发现可勘探的资源；九个选项各对应一种资源（能量 / 矿物 / 合金 / 稀有水晶 / 挥发性气体 / 奇异气体 / 佐罗 / 暗物质 / 活体金属），选一个就启用对应的特殊项目“PROSPECTORIUM_RESOURCE_DISCOVERY_*”，项目完成触发 **1200–1280** 之一（能量信号 / 矿脉 / 合金生产 / 稀有水晶生长 / 挥发性气体生产 / 奇异气体生产 / 佐罗残骸 / 暗物质迹象 / 活体金属生长）。/ Nine options, one per resource, each enabling its project and ending in the matching result event (1200–1280).

## 分支与结局 Branches and outcomes

九个选项互斥；每个项目只有一个成功事件。/ The nine options are exclusive; each project has one success event.

## 条件与文明差异 Conditions and variants

选项可能受已知科技/资源限制。/ Options may be limited by known technologies.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（c7b-society）
- 来源 Sources：`events/overlord_specialist_events.txt:329-700` · `common/special_projects (PROSPECTORIUM_RESOURCE_DISCOVERY_*)` · `common/on_actions/00_on_actions.txt:408`
- 已核对 Checked：根 1100、1150、各项目与结果事件。/ Root 1100, 1150, the projects and results.
- 审阅改动 Changes：结构与草稿一致。/ Matches the draft.
- 不确定 Uncertain：各项目的成本与产出细节未逐项展开。 / Project costs and yields were not expanded.
