# 渴求之器具 / The Instrument of Desire

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

由游戏引擎通过赞助者定义中的 covenant_event = shroud.4550 发起（common/patrons/patron_types.txt 500 行），即在虚境中与渴求之器具的关系达到可立约时，以外交窗口提出契约。

Launched by the engine through covenant_event = shroud.4550 in the patron definition (common/patrons/patron_types.txt lines 500): when the relationship with the Instrument of Desire allows a covenant, it is offered in a diplomatic window.

## 剧情脉络 Story outline

接受：立约（accept_covenant），开始“渴求之器具”事件链（机器人帝国用 robot_ 版本），立即显示 4555“签订契约”，并在360天后安排 4560“坚振圣事”。确认：获得标记科技与协约能力，30–90天后经隐藏的 utopia.2679 检查（需超过一名合适领袖，否则每30天重试）进入 utopia.2681“力量碎片”，选出一位领袖成为天选者（2682“升华”）。弃约：结束事件链并重置契合度。两个窗口中都可“自寻出路”：开启“塑造虚境”社会学项目（10000），完成后 3500“开辟道路”，60–90天后 3510 同样选出一位领袖（2682）。

Accept: the covenant is formed (accept_covenant), the Instrument of Desire event chain begins (robot_ variant for robot empires), 4555 "Covenant Formed" shows at once and 4560 "A Confirmation" is scheduled 360 days later. Confirming grants the mark technology and covenant powers; 30–90 days later hidden utopia.2679 checks for more than one suitable leader (else retries every 30 days) and opens utopia.2681 "Scraps of Power" to make one leader the Chosen (2682 "Ascended"). Renouncing ends the chain and resets attunement. Both windows offer "forge our own path": the Shaping the Shroud society project (10000), then 3500 "A Path Forged" and 60–90 days later 3510, which likewise elevates a leader (2682).

## 分支与结局 Branches and outcomes

提案与立约文本按机械/个体机械/蜂巢区分（器具许诺财富、权力与声望）。 拒绝选项：拒绝立约并重置契合度，提示“永不再提”。

Proposal and formed texts vary for machine / robot / hive empires (the Instrument promises wealth, power and prestige). The refusal option rejects the covenant and resets attunement ("never again").

## 条件与文明差异 Conditions and variants

立约、确认窗口的文字按机械/个体机械/蜂巢/其他区分；立约事件选项区分格式塔与非格式塔；天选者候选取决于领袖条件 suitable_for_chosen_covenant。

Proposal/formed texts vary for machine, robot, hive and other empires; formed options differ for gestalt and non-gestalt; Chosen candidates depend on suitable_for_chosen_covenant.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`events/shroud_events.txt:11164-11173 (shroud.4550)`; `events/shroud_events.txt:11175-11191 (shroud.4555/4560)`; `common/patrons/patron_types.txt:500 (covenant_event)`; `common/inline_scripts/shroud/patron_covenant_proposition_event.txt`; `common/inline_scripts/shroud/patron_covenant_confirmation_event.txt`; `common/inline_scripts/shroud/patron_covenant_formed_event.txt`; `common/inline_scripts/shroud/accept_covenant.txt`; `common/scripted_variables/09_scripted_variables_shroud.txt:163 (@covenant_confirmation_time_days = 360)`; `events/utopia_on_action_events.txt:3320-3348 (utopia.2679), 3435 (2681), 3593 (2682)`; `common/special_projects/04_projects_shroud.txt:572-585 (SHROUD_SHAPING_PROJECT)`; `events/shroud_events.txt:8162-8305 (3500/3510)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
阅读 shroud_events.txt 11164-11173、11175-11191 处的内联调用与三份 patron_covenant_* 内联脚本、accept_covenant、utopia.2679–2682、塑造虚境项目与 3500/3510。结构确认无误：立约后两条时间线（立即的立约事件、360天后的确认）并行，确认/弃约/自寻出路互斥；“自寻出路”与天选者事件为五个契约共享的后续。

Read the inline calls at shroud_events.txt 11164-11173 and 11175-11191, the three patron_covenant_* inline scripts, accept_covenant, utopia.2679–2682, the Shaping the Shroud project and 3500/3510. The compiled structure is right: after the covenant two timelines run (immediate formed event, confirmation 360 days later); confirm / renounce / forge-own-path are exclusive; forge-own-path and the Chosen events are shared continuations of all five covenants.

不确定 / Uncertain:

- covenant_event is launched by the engine from the patron definition (patron_types.txt comment: patron covenant offer); the exact UI/attunement threshold is not in script.
