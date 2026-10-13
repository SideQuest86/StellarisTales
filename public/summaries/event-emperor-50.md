# 帝国议会的法案与干预 / Imperial laws and interventions

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/nemesis_emperor_events.txt, common/resolutions/01_resolutions_nemesis.txt, common/on_actions/00_on_actions.txt · DLC：Nemesis · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

这些事件各自挂在一个帝国决议通过时（common/resolutions/01_resolutions_nemesis.txt）：帝国舰队 resolution_emperor_imperial_armada（:3529，事件在 3559）、帝国军团 resolution_emperor_imperial_legions（:3861，3889）、帝国安全局 resolution_emperor_isd（:4324，4353）、帝国特许状（:4450-4465）、帝国远征 resolution_galactic_empire_imperial_crusade（:3214，3314）、帝国和平 resolution_emperor_pax_galactica（:5797，5836）；皇帝保护成员事件由 on_war_beginning（common/on_actions/00_on_actions.txt:2602-2608）触发。
Each event is attached to its resolution being passed; the defence event runs when a war begins.

## 剧情脉络 Story outline

- emperor.50 “帝国舰队”：新舰队从各成员国征召船员，军官主要来自皇帝的物种；三种回应取决于是否皇帝、同种族等。 Armada founded.
- emperor.55 “军团成立”：帝国军团可以向所有成员征兵。 Legions founded.
- emperor.70 “帝国安全局”：特工部署到各成员国。 ISD founded.
- emperor.60 “帝国特许状”：某公司获得特许状，可在全帝国开办分公司（emperor.61-65 为特许港口的隐藏计数）。 Charter granted.
- emperor.350 / 351 “帝国向我们进军”/“帝国远征开始”：被选为远征目标者（350）与其他国家（351，三种回应）。 Crusade declared.
- emperor.360 “帝国和平”：成员国之间的战争被立即终止。 Pax Galactica.
- emperor.370（隐藏，on_war_beginning）：非成员国攻击成员国的战争领袖时，10 天后问皇帝 → emperor.371：a 保卫成员（帝国权威 +20，皇帝加入防御方，受害方得 372 “皇帝提供支持”，攻击方得 373 “皇帝介入！”）/ b 抛弃成员（权威 −20，受害方得 374 “皇帝宣布中立”）。
  The emperor is asked to defend a member (371): defend (372 / 373) or abandon (374).

## 分支与结局 Branches and outcomes

- 371 的 a、b 互斥；各法案事件互相独立。 371's options are exclusive; laws are independent.

## 条件与文明差异 Conditions and variants

- 每个法案需要对应决议通过；皇帝保护成员事件要求攻击方不是共同体成员、且战争中没有皇帝参战。 Each needs its resolution; 370 needs a non-member attacker.

## 审阅记录 Review notes

- 已核对 Checked：emperor.50-70、350-374 的触发与调用点（决议与 on_war_beginning）。
- 更正 Corrections：emperor.495（测试事件，trigger = always = no）曾是“特许状”的根，真实触发是帝国特许状决议；十一个单页故事并为一个。
  The test event 495 was the old root of the charter story; the real trigger is the charter resolution.
