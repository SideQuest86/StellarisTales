# 土匪在目标星系的封锁 / Brigands' Blockade at the Target System
- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Federations / Utopia (Bemat Thalassocracy)

## 如何开始 How it starts

每十年（on_decade_pulse，common/on_actions/00_on_actions.txt:304）隐藏事件 pirate.100（要求 end_game_years_passed >= 0）随机抽取：1/7 概率让全局事件国家在550天后收到 pirate.150，其余什么也不发生。pirate.150（隐藏）要求本局尚无贝马特海洋霸权国，也无国家有 met_thalassocracy 旗标：它创建该国与舰队，优先放在无主的多行星星系，其次放在离首都2–5跳、有主的多行星星系（并立即对该星系所有者发出 pirate.155）。

Every decade (on_decade_pulse, common/on_actions/00_on_actions.txt:304) hidden pirate.100 (needs end_game_years_passed >= 0) rolls: 1/7 makes the global event country receive pirate.150 after 550 days, otherwise nothing. Hidden pirate.150 needs no existing Bemat Thalassocracy country and no country with met_thalassocracy: it creates the country and a fleet, preferably in an unowned multi-planet system, otherwise in an owned multi-planet system 2-5 jumps from the capital (and then fires pirate.155 at that system's owner at once).

## 剧情脉络 Story outline

pirate.155“土匪封锁”也会在首次接触（on_first_contact，common/on_actions/00_on_actions.txt:763）时由海洋霸权国发给对方。窗口建立通讯、设置 met_thalassocracy 旗标；选项：难以置信 / 渣滓（非和平、机器、巨型企业）/ 和平主义者 / 机器 / 企业各有一条专属回应，全部只是表态，没有后续。

pirate.155 "Brigands' Blockade" is also sent on first contact (on_first_contact, common/on_actions/00_on_actions.txt:763) by the Thalassocracy. It establishes communications, sets met_thalassocracy, and offers Disbelief, Scum! (not pacifist/machine/megacorp), a pacifist reply, a machine reply and a corporate reply; all are statements with no follow-up.

## 分支与结局 Branches and outcomes

无分支。

No branches.

## 条件与文明差异 Conditions and variants

正文有常规、机器、蜂巢三个版本。

Three body versions: regular, machine, hive.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`common/on_actions/00_on_actions.txt:293-304`、`common/on_actions/00_on_actions.txt:763`、`events/pirate_events.txt:2196-2425`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 未确定 Open: Which DLC owns the Bemat Thalassocracy was not traced.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
