# 虚境住民 / A Presence in the Shroud

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Shadows of the Shroud

## 如何开始 How it starts

每月检查（on_monthly_pulse_country → 隐藏事件 shroud.11000）：尚未选过上超主，已进入游戏中期，且已完成与吞世者、灵魂摇篮、欲望之器、编织者四位主要赞助者的接触。满足时每月以 1+3×中期已过年数（%，上限100）的几率设置 greater_patron_chosen 并进入 11001（一次性）。

Monthly check (on_monthly_pulse_country → hidden shroud.11000): no great patron chosen yet, mid game reached, and first contact completed with all four major patrons (Eater of Worlds, Cradle of Souls, Instrument of Desire, Composer of Strands). Each month the chance is 1 + 3 × mid-game years passed (%, max 100); success sets greater_patron_chosen and fires 11001 (once).

## 剧情脉络 Story outline

11001 在两位上超主中随机选择其一（互斥，见分组）：4040“虚境住民”——虚空低语者的存在，选项开启其首次接触特殊项目，后续在项目故事中；或 4135“轮回之终末”——它直接把我们拖入虚境提出立约。接受：开始“轮回之终末”局势（终末者起源为专用版本），立约成功 4715，获得光环科技，所有已知赞助者领域被取代；局势各阶段依次触发 4140 孤注一掷、4145 湮灭、4150 终末将至，进度达590时向所有帝国发出 4955。拒绝：获得研究与泽珞，重置契合度，持有“终末信徒”特质的领袖一天后引发 12155（奥伏戎的愤怒）。

11001 picks one of two great patrons at random (exclusive, see group): 4040 "A Presence in the Shroud" — the Whisperers in the Void, whose option starts their first-contact special project (continued in the project story); or 4135 "The End of the Cycle", which tears us into the Shroud and offers a covenant. Accepting starts the End of the Cycle situation (a dedicated version for the Endbringers origin), forms the covenant (4715), grants the aura technologies and replaces every known patron domain; the situation stages fire 4140 All or Nothing, 4145 Annihilation and 4150 The Coming of the End in order, and at progress 590 every empire receives 4955. Refusing grants research and zro, resets attunement, and leaders with the Disciple of the End trait trigger 12155 (Ouw'ron's fury) one day later.

## 分支与结局 Branches and outcomes

立约之后（状态触发，均为条件连接）：终末光环首次触及他国疆域时对方收到 4950；覆盖星系50%与75%时其他所有帝国收到 4960/4965；光环吞没全星系时立约方收到 4970 并获胜，一天后其余人类玩家收到 4971，所有星系被摧毁。星海共同体可通过“焦点：恶毒光环”决议，立约方收到 12160。若局势进度完成，立约帝国毁灭并出现“清算”（the_reckoning_chain，及 the-shroud 的 utopia.3320）；他国人类玩家首次败于清算时得到 11240，开启研究项目，完成后 11245 获得针对它的修正。立约方日后潜入虚境可能遇到 11250（虚境死寂），并可在第一阶段后激活“创造”协约（4935，在首都星系生成盖亚星球）。

After the covenant (state-triggered, all conditional links): when the Aura of the End first reaches another empire's territory that empire sees 4950; at 50% and 75% galaxy coverage every other empire gets 4960/4965; when it consumes the galaxy the covenant empire sees 4970 and wins, other human players get 4971 a day later and all systems are destroyed. The Galactic Community can pass "Focus: Malevolent Aura", sending 12160 to the covenant empire. If the situation completes, the covenant empire is destroyed and the Reckoning appears (the_reckoning_chain, plus utopia.3320 in the-shroud); a human empire that first loses a battle to it gets 11240 and a research project whose completion (11245) grants a modifier against it. Later delves by the covenant empire can yield 11250 (the silent Shroud), and after stage 1 the Creation accord can be used (4935: a Gaia world in the capital system).

## 条件与文明差异 Conditions and variants

4715、4955、4950 等文本按机械/蜂巢/个体机械/灵能与是否已建立通讯变化；4135 拒绝选项在“自辟蹊径”时文字不同。

4715, 4955, 4950 and others vary by machine/hive/robot/psionic status and by whether communications exist; 4135's refusal option has different wording for empires forging their own path.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（已审阅 reviewed）
- 来源 Sources：`common/on_actions/00_on_actions.txt:388 (on_monthly_pulse_country → shroud.11000)`; `events/shroud_events.txt:17892-17974 (11000/11001)`; `events/shroud_events.txt:8402-8427 (4040)`; `events/shroud_events.txt:8933-9044 (4135)`; `events/shroud_events.txt:11370-11426 (4715)`; `common/scripted_effects/shroud_shadows_scripted_effects.txt:2376-2436 (accept_end_of_the_cycle)`; `common/situations/13_shroud_situations.txt:559-727`; `common/script_values/07_script_values_shroud.txt:795-801`; `common/patrons/psionic_auras/00_auras.txt:966-1193`; `events/shroud_events.txt:12682-13075 (4950-4972)`; `common/patrons/patron_types.txt:996-1050 (Creation accord → 4935)`; `common/resolutions/05_resolutions_shroud.txt (focus: malevolent aura → 12160)`; `events/shroud_events.txt:18496-18610 (11240/11245/11250)`; `events/shroud_events.txt:19919-19930 (12160)`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
阅读 11000/11001、4040、4135、4715、4950–4972、11240–11250、12160 原文与 accept_end_of_the_cycle、end_of_the_cycle 局势、end_aura 定义、创造协约与“焦点：恶毒光环”决议。修正：将原本分散的 event-shroud-4950、-4935、-11250、-12160、-11240 并入本故事，并用带证据的条件连接挂到立约之后，不再作为无前因的独立卡片；局势、阶段事件、4955 与 12155 与灵督终末者起源/奥伏戎故事共享，不独占。

Read 11000/11001, 4040, 4135, 4715, 4950–4972, 11240–11250 and 12160 together with accept_end_of_the_cycle, the end_of_the_cycle situation, the end_aura definition, the Creation accord and the "Focus: Malevolent Aura" resolution. Correction: the scattered draft stories event-shroud-4950, -4935, -11250, -12160 and -11240 are merged here and attached after the covenant with evidence-backed conditional links instead of standing as cards without a cause; the situation, its stage events, 4955 and 12155 are shared with the Endbringers origin / Ouw'ron stories, not owned.

不确定 / Uncertain:

- The chance per month (calc_greater_patron_roll_chance = 1 + 3 × mid-game years passed, max 100) is read from the script value; how the engine evaluates mid_game_years_passed before mid-game was not tested.
