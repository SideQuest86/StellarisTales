# 奇怪的残骸 / Strange Debris

- 分类 Category：深空异闻 Exploration (C3)

## 如何开始 How it starts

- 3级异常，只由特殊星系“希洛斯”的初始化器（幽灵船星系）放置；没有随机生成。  
  Level-3 anomaly placed only by the special Hillos (ghost ship) system initializer; it never spawns randomly.

## 剧情脉络 Story outline

- 6791“幽灵船”：残骸带与一艘无人巡逻的科研船（设置 met_ubume；若主物种有灵能特质再设 ubume_psionic）。开启360天项目“研究‘幽灵船’”。  
  6791 "Ghost Ship": a debris field and an empty science vessel on patrol (sets met_ubume, plus ubume_psionic if the main species is psionic). A 360-day project follows.
- 6792“乌布梅的幼体”：飞船曾在此试验创造合成生命，反物质事故中“婴儿”的灵能意识占据了飞船。  
  6792 "Ubume's Baby": the ship tried to create synthetic life; in an antimatter accident the infant's psionic consciousness took over the vessel.

## 分支与结局 Branches and outcomes

- 灵能物种帝国：“令人沮丧” → 360天后 6795“看看是谁在说话”：灵能者与它建立联系。  
  Psionic-species empires: "Frustrating" → 6795 "Look Who's Talking" 360 days later: contact is made.
- 非灵能帝国：“可悲的命运”。此后若帝国获得灵能（is_psionic），年度检查触发 6793“灵能呜咽” → 2000点物理项目“答复乌布梅的幼体” → 6794“看看是谁在说话”（幼体陪伴我们的科研船）。  
  Non-psionic empires: "A sad fate". If the empire later becomes psionic, a yearly check fires 6793 "Psionic Chatter" → a 2,000-point physics project → 6794 "Look Who's Talking" (the child glides alongside our ship).

## 条件与文明差异 Conditions and variants

- 6792–6795 对格式塔与机器人帝国有不同文本。  
  6792–6795 have gestalt/robot texts.

## 审阅记录 Review notes

- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:634-642` · `common/solar_system_initializers/special_system_initializers.txt:1670-1760 (ghost_ship_system_initializer_01)` · `events/anomaly_events_4.txt:2103-2367 (6791-6795)` · `common/special_projects/00_projects_3.txt:1632-1662` · `common/on_actions/00_on_actions.txt:403-406`
- 已核对 Checked：类别、初始化器、6791–6795、两个项目与年度回调。  
  Category, initializer, 6791–6795, both projects and the yearly on_action.
- 更正 Corrections：把原先独立的故事 event-anomaly-6793（年度检查触发的灵能后续）并入本故事：6793 只对遇见过乌布梅、当时不是灵能、后来成为灵能的帝国触发，是本异常的直接后续。  
  Merged the former separate story event-anomaly-6793 (yearly psionic follow-up) into this one: 6793 fires only for empires that met Ubume while non-psionic and later became psionic.
- 覆盖 Coverage：8 个文档全部核对 / all 8 docs checked.
