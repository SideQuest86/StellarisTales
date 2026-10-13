# 吞噬恒星 / Consume Star

- 分类 Category：文明纪事 Society (C7) · 间谍行动 espionage operation · 审阅 Reviewed 2026-10-12
- 来源 Sources：`common/espionage_operation_types/operations.txt:1133-1222`；`events/situation_events.txt:5380-5770`；`common/situations/01_narrative_situations.txt:1135-1251`；`common/special_projects/00_projects_leviathans.txt:508-534`；`common/scripted_effects/00_scripted_effects.txt:5994-5996`（噬星者战利品）

## 如何开始 How it starts

- 由玩家（或 AI）发动间谍行动“吞噬恒星”开始（250 影响力、60 间谍力量、三个阶段）。前提：发起国拥有带“噬星者战利品”修正的星球——来自利维坦庆典中的噬星者庆典；目标首都不环绕黑洞、首都星系没有戴森球、目标尚未研究过这种侵染（另检查 `infested_star` 标记；1135 设置的是 `has_infested_star`，两者名称不同，评注）。
  It starts when an empire runs the espionage operation "Consume Star" (250 influence, 60 spy power, three stages). Requirement: the operator owns a planet with the Stellar Devourer trophy modifier — from the Stellar Devourer celebration of the leviathan celebration situation; the target's capital does not orbit a black hole, its capital system has no Dyson Sphere, and the target has not studied this infestation (the allow also checks a flag `infested_star`, while 1135 sets `has_infested_star` — commentary: the names differ).

## 剧情脉络 Story outline

1. 发起方视角 Operator's view：1125「飞梭扑火」运输船载着冷冻的幼年噬星者潜入目标首都星系（正文按单星、双星、三星不同）→ 1130「旧版密码」通过安检 → 1135 下令行动 → 1140「成功感染」：确认目标首都恒星已被感染。
   1125 "Transverse Orientation": a transport carrying frozen baby Stellar Devourers slips into the target capital system (texts for single, binary and trinary stars) → 1130 "Older Codes" passes security → 1135 launches → 1140 "Successful Infestation" confirms the target's capital star is infested.
2. 目标方视角 Target's view：60 天后 1145「恒星能量亏损」（殖民地获得低恒星输出修正；普通/格式塔/荒野三种写法）→ 180 天后 1150「凛冬已至」→ 开启局势「受侵蚀的（恒星）」。
   60 days later 1145 "Solar Energy Wanes" (colonies get a low-stellar-output modifier; regular/gestalt/wilderness texts) → 180 days later 1150 "Great Chill" → starts the situation "Infested (star)".
3. 局势初始 10%，基础每月 +3（默认方式净 +2）；20% 时修正加重（隐藏 1155），50% 时 1160「发现寄生虫」开启 450 天的特殊项目“找到噬星者寄生的解决方案”（科研船 + 科学家）。是否得知凶手取决于加密与解密的比较。
   The situation starts at 10% with base +3 per month (net +2 under the default approach); at 20% the modifiers worsen (hidden 1155); at 50% 1160 "Parasites Found" opens a 450-day special project (science ship + scientist). Whether the target learns who did it depends on encryption versus decryption.

## 分支与结局 Branches and outcomes

- 项目完成 → 隐藏 1165：方式改为“治愈恒星”（每月净 -7）；进度降到 0 时隐藏 1175 移除修正，局势静默结束（没有窗口）。
  Project done → hidden 1165 switches to "Cure the Star" (net -7 per month); at 0 hidden 1175 removes the modifiers and the situation ends silently (no window).
- 来不及治愈，进度达 100% → 1170「（恒星）熄灭」：首都恒星变为褐矮星，星系内殖民地被摧毁并冰冻。若知道凶手，可选“必将付出代价”获得 20 年的复仇宣战理由；否则只能哀叹。
  If the cure is too late and progress reaches 100% → 1170 "(star) Extinguished": the capital star becomes a brown dwarf and the system's colonies are destroyed and frozen. If the culprit is known, "shall pay" grants a 20-year revenge casus belli; otherwise only lament.
- 两种结局互斥。 The two endings are exclusive.

## 条件与文明差异 Conditions and variants

- 1125 正文按恒星数量，1145 按普通/格式塔/荒野帝国，1170 按是否知道凶手变化。
  1125 varies with the number of stars, 1145 with regular/gestalt/wilderness empires, 1170 with whether the culprit is known.

## 审阅记录 Review notes

- 已核对：行动定义（费用、前提、三阶段）、1125–1180 全部事件（含隐藏 1155/1165/1175）、局势定义（阶段、方式、进度）、治愈项目。
  Checked: the operation definition (cost, requirements, three stages), all events 1125–1180 (including hidden 1155/1165/1175), the situation definition (stages, approaches, progress) and the cure project.
- 更正 Corrections：草稿把三个行动阶段列为三个并列入口，现按行动阶段顺序串联；结局补充“治愈”分支说明（无窗口）。
  The draft listed the three operation stages as parallel entries; they are now chained in stage order; the silent "cure" ending is documented.
- 视角说明 Perspective：1125–1140 与 1145–1170 属于不同帝国，阅读时需注意。
  1125–1140 and 1145–1170 belong to different empires.
