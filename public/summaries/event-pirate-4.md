# 太空海盗的诞生 / The Birth of Space Piracy

> 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · 来源 Sources：`common/on_actions/00_on_actions.txt:86-111`、`events/pirate_events.txt:439-552`、`events/pirate_events.txt:9-130`、`common/on_actions/00_on_actions.txt:481` · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

每月（on_monthly_pulse，common/on_actions/00_on_actions.txt:111）隐藏事件 pirate.4 检查所有尚无 birth_of_piracy 旗标、贸易收入>100的玩家国家，向其发出隐藏的 pirate.5；pirate.5 按帝国类型在1–31天后发出对应窗口（pirate_events.txt:464-551）。五年脉冲（on_five_year_pulse_country，common/on_actions/00_on_actions.txt:481）也会直接发出 pirate.1。窗口自身触发（pirate_events.txt:93-113）才是真正的门槛：非格式塔意识、已满10年、有首都、贸易收入>300，且边境上有与无主星系相邻的系统。

Every month (on_monthly_pulse, common/on_actions/00_on_actions.txt:111) hidden pirate.4 tests all playable empires without the birth_of_piracy flag and with trade income above 100 and sends them hidden pirate.5; 1-31 days later pirate.5 sends the window matching the empire type (pirate_events.txt:464-551). The five-year pulse (on_five_year_pulse_country, common/on_actions/00_on_actions.txt:481) also fires pirate.1 directly. The window's own trigger (pirate_events.txt:93-113) is the real gate: not gestalt consciousness, more than 10 years in, a capital, trade income above 300 and a border system next to an unowned system.

## 剧情脉络 Story outline

立即效果：设置3600天的 pirates_spawned、永久的 birth_of_piracy 与 pirate_encountered 旗标，保存首都与目标，并在边境外一个无主、非守卫者的相邻系统（pirate_system）创建一个普通海盗国家和一支海盗舰队。窗口的选项按政体给出不同口吻（灵性/军国/唯物/和平/独裁/寡头/民主等），无后续链接。

Immediate effect: sets pirates_spawned (3600 days), permanent birth_of_piracy and pirate_encountered flags, saves the capital and target, and creates a normal pirate country and pirate fleet in a neighbouring unowned, non-guardian system (pirate_system). The options differ by government flavour (spiritualist, militarist, materialist, pacifist, autocracy, oligarchy, democracy...); none leads on.

## 分支与结局 Branches and outcomes

五类窗口互斥（按帝国类型），宝藏猎人起源（已遇见霍船长）改用各自仅标题不同的变体 2/12/8/16/9；之后“海盗出现”的重复事件见 event-pirate-48。

The windows are exclusive by empire type; Treasure Hunters that met Captain Hoo get title-only variants 2/12/8/16/9; the later recurring "pirates sighted" events are in event-pirate-48.

## 条件与文明差异 Conditions and variants

蜂巢（非荒野）、机器、游牧各有专用变体；宝藏猎人起源有标题变体。

Hive (non-wilderness), machine and nomadic empires have their own variants; Treasure Hunters have title variants.

## 审阅记录 Review notes

- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 已解决 Resolved: pirate.2/8/9/12/16 (pirate_events.txt:317, 702, 709, 949, 1038) are title-only base variants for Treasure Hunters empires that met Captain Hoo; after the inheritance fix they are compiled and grouped with their base windows. / 宝藏猎人起源且已遇见霍船长时改用这五个窗口（仅标题不同），现已编入并与基础窗口互斥分组。
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
- 2026-10-13 r3-inherit：事件继承修复后 pirate.2/8/9/12/16 已编译为文档；核对 base 与标题覆盖，加入互斥分组，清除未决项。
  2026-10-13 r3-inherit: after the inheritance fix pirate.2/8/9/12/16 are compiled docs; base and title override checked, grouped as exclusive variants, open item cleared.
