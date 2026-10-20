# 指派星海监管人 / Galactic Custodian Appointed

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC：Nemesis

## 如何开始 How it starts

银河共同体“监管人”在理事会通过提名决议（resolution_galacticreforms_nominate_custodian，common/resolutions/01_resolutions_nemesis.txt:683-722）时指派：该决议设置监管人，发出隐藏的 custodian.1，后者给监管人加上 gal_custodian 修正，并向每个共同体成员发出 custodian.2“指派星海监管人”（events/nemesis_custodian_events.txt:52-72）。

The Galactic Community custodian is appointed when the council passes the nomination resolution (resolution_galacticreforms_nominate_custodian, common/resolutions/01_resolutions_nemesis.txt:683-722): it sets the custodian and fires hidden custodian.1, which adds the gal_custodian modifier and sends every community member custodian.2 "Galactic Custodian Appointed" (events/nemesis_custodian_events.txt:52-72).

## 剧情脉络 Story outline

这是一个循环：任命（custodian.2，对监管人与其他成员文字与选项不同，events/nemesis_custodian_events.txt:76-120）→ 任期到期 / 提前终止 / 除名 / 被毁灭，四种结束方式互斥。另有“泛星系防卫军”（GDF）支线：监管人通过决议建立防卫军（custodian.30，对监管人、成员、非成员、杀戮型国家各有选项）；监管人结束时若防卫军已启用，隐藏的 custodian.31 创建独立的 GDF 国家，10天后向玩家发出 custodian.32；新监管人上任时（防卫军仍启用）10天后 custodian.35 让独立 GDF 并入新监管人并注销该国家；决议解散防卫军则发出 custodian.40。

A cycle: appointment (custodian.2, with different text and options for the custodian and other members, events/nemesis_custodian_events.txt:76-120) -> the term expires, is ended early, is unseated, or the custodian is destroyed; the four endings are exclusive. A side branch is the Galactic Defense Force (GDF): the custodian passes the resolution (custodian.30, with options for the custodian, members, non-members and homicidal empires); if the GDF is active when the custodianship ends hidden custodian.31 creates an independent GDF country and 10 days later sends custodian.32 to players; when a new custodian takes office (GDF still active) custodian.35 follows 10 days later, merging the independent GDF into the new custodian and destroying that country; the disband resolution sends custodian.40.

## 分支与结局 Branches and outcomes

四种结束方式：到期（custodian.11，on_custodian_term_ends）；提前终止（custodian.15，仅 Nemesis 或银河捍卫者飞升天赋的监管人可提案，同时取消提名决议）；被除名（custodian.17）；国家被毁（custodian.101，非 AI 玩家看到）。15 会隐藏给“确实完成了使命的银河捍卫者”。

Four endings: expiry (custodian.11, on_custodian_term_ends); early end (custodian.15, proposable only with Nemesis or the Defender of the Galaxy perk, and cancels the nomination resolution); unseating (custodian.17); the country is destroyed (custodian.101, shown to non-AI players). 15 is hidden when the ex-custodian is a Defender of the Galaxy who did the job.

## 条件与文明差异 Conditions and variants

各窗口按“是否是本人”（is_same_value = from）给出不同正文与选项。防卫军支线需要 Nemesis 或银河捍卫者（游牧）飞升天赋。

Windows differ by whether the viewer is the custodian himself (is_same_value = from). The Defense Force branch needs Nemesis or the nomadic Defender of the Galaxy perk.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/nemesis_custodian_events.txt:12-130`、`events/nemesis_custodian_events.txt:157-340`、`events/nemesis_custodian_events.txt:405-456`、`events/nemesis_custodian_events.txt:459-471`、`events/nemesis_custodian_events.txt:615-651`、`events/nemesis_custodian_events.txt:739-776`、`common/resolutions/01_resolutions_nemesis.txt:683-722,866-893,2149-2235,2570-2612`、`common/on_actions/00_on_actions.txt:3603-3606,4727-4731`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
- 已对照游戏文件核对入口、触发、选项与结果；行号均为游戏文件的真实行号。
  Entry, trigger, options and outcomes were checked against the game files; line numbers are real game-file lines.
- 合并说明：event-custodian-14/16/100/30/40 原为同一循环的碎片（各自只有结束事件或 GDF 通知），已并入本故事；custodian.499 是永不触发的测试事件。
  Merge note: event-custodian-14/16/100/30/40 were fragments of the same cycle (a single ending event or GDF notice each) and are now part of this story; custodian.499 is a test event that never fires.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
