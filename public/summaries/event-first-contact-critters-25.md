# 太空变形虫 / Space Amoebas
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（变形虫 amoeba_stage_1/2）
- 来源 Sources：`events/first_contact_NPC_country_types_events.txt:344–415` · `common/first_contact/01_first_contact_space_fauna_and_NPCs.txt:86–124` · `common/special_projects/00_projects_2.txt:498–528`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

与变形虫类国家（amoeba / amoeba_borderless / amoeba_garrison / amoeba_faction）首次相遇，启动 amoeba_stage_1（难度3）。/ Meeting an amoeba-type country starts amoeba_stage_1.

## 剧情脉络 Story outline

1. **又大又暴躁（20）**：附近实体对运动做出攻击性反应，继续观察；→ 第二阶段（难度3）。/ Large, testy entities; keep observing.
2. **太空变形虫（25）**：四类选项——A 易猎物（永久狩猎加成并计入猎杀数）；B 有趣的生物 → 研究项目（1500 社会学）→ **105**；C 共存 → 安抚项目（3000 物理学）→ **107**。所有选项都结束首次接触。/ Four option kinds: hunt, study (→ project → 105), or pacify (→ project → 107); all finish first contact.

## 分支与结局 Branches and outcomes

A、B、C 互斥（按本方伦理出现）；项目无时限（timelimit −1）。结尾选项调用 finish_first_contact_effect（建立通讯/结束首次接触）。 / Mutually exclusive by ethics; projects have no time limit. The ending options call finish_first_contact_effect (first contact ends).

## 条件与文明差异 Conditions and variants

25 的描述随本方类型（格式塔/灵性/等）变化；选项A、C有伦理限制，终结者有单独的 B 文本。/ 25’s text and option availability vary with ethics and the terminator civic.

## 审阅记录 Review notes

- 已核对 Checked：20、25、story.105/107、两个项目与阶段定义。/ Events, projects and stages.
- 审阅改动 Changes：并 20 入 25 篇，用阶段桥连接。/ 20 joined 25 with a stage bridge.
