# 迅速荒漠化 / Rapid Desertification

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:766-790` · `events/anomaly_events_4.txt:4513-4865 (7135-7155)` · `common/special_projects/00_projects_3.txt:1937-1989` · `events/colony_events_3.txt:10194-10458 (colony.7160-7180)`
- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 1级异常，全局仅生成一次；在沙漠或干旱行星上权重1，仅限非机械、非蜂巢帝国；null_spawn_chance 0.7（选中后仍只有30%真正生成）。  
  Level-1 anomaly, once per galaxy; weight 1 on desert or arid planets for non-mechanical, non-hive empires; null_spawn_chance 0.7 (only 30% actually spawn when picked).

## 剧情脉络 Story outline

- 7135：行星被繁殖失控的“沙漠鼠”占据（行星获外星侵扰修正）。调查 → 80天项目“生态系统被蚕食”（限时1080天）；不干预 → 480–510天后 7145 灭绝事件。  
  7135: "desertlings" overrun the planet (alien infestation modifier). Investigate → 80-day project (1,080-day limit); stay out → 7145 extinction after 480–510 days.
- 项目完成 → 7140“入侵物种”；超时失败 → 7146 灭绝事件（行星变为贫瘠，若有殖民地则被摧毁）。  
  Project success → 7140 "Invasive Species"; timeout → 7146 extinction (the planet turns barren, any colony is destroyed).
- 7140 四个选项：收养（非排外；人口超100的星球获“收养外星生物”修正）、人口控制（180天项目 → 7150“自然的新生”：行星获丰饶修正与新资源点）、灭绝（非和平、非亲外；180天后 7155“红色沙漠”）、作为牲畜（允许奴隶制的排外帝国；获得非智慧物种人口）。  
  7140 offers: adopt them (non-xenophobe; colonies over 100 pops get a modifier), population control (180-day project → 7150 "Nature's Rebirth": lush planet and new deposits), extermination (non-pacifist, non-xenophile; 7155 "Red Desert" after 180 days), or livestock (xenophobes allowing slavery; non-sapient pops).

## 分支与结局 Branches and outcomes

- 收养后约3620天：60% colony.7160“国家宝藏”（全国宠物修正，若无失控星球），40% colony.7166“麻烦的小动物”。牲畜选项后3620天：30% colony.7166，70% 无事。  
  After adoption, ~3620 days later: 60% colony.7160 "National Treasures" (if no planet is overrun), 40% colony.7166 "Troublesome Critters". After livestock: 30% colony.7166, 70% nothing.
- colony.7166：猎杀 → 180–240天后 50% colony.7170 稳定（获食物）/ 50% colony.7175 失控；或花能源建围栏保护区（资源点）。7175 可接受（侵扰修正5年）或发动“鼠战”（360天后隐藏事件移除侵扰资源点）。  
  colony.7166: hunt them → after 180–240 days 50% colony.7170 stabilised (food) / 50% colony.7175 out of control; or build a walled reserve. 7175: accept the infestation (5 years) or wage the "rodent war" (a hidden event removes the deposit after 360 days).
- 相关故事：已收养沙漠鼠的帝国此后也可能在殖民地满十年时触发 colony.7165（另一故事，C7），共用7170/7175。  
  Related: empires that adopted desertlings may later get colony.7165 when a colony turns ten (another story, C7), which shares 7170/7175.

## 条件与文明差异 Conditions and variants

- 7145/7146 的文本和选项按行星是否有人口区分；无人口时按“重视他者”与否措辞不同。  
  7145/7146 text and options differ by whether the planet is populated; unpopulated wording depends on values_others.

## 审阅记录 Review notes

- 已核对 Checked：类别、7135–7155、两个项目、colony.7160–7180（含隐藏7180）。  
  Category, 7135–7155, both projects and colony.7160–7180 including hidden 7180.
- 覆盖 Coverage：13 个文档全部核对 / all 13 docs checked.
