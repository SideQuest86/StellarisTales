# 斯克兰德·夏普比克 / Skrand Sharpbeak

- 分类 Category：C8 银河轶事 / Galactic miscellany
- DLC：Galactic Paragons

## 如何开始 How it starts

玩家修复远古星门时（megastructure gateway_restored 的 on_build_complete），若有银河巨影DLC、尚无人找到他且20%的抽签成功，5天后触发 paragon.3000；也可以由另一个帝国的舰队首次进入该星门系统触发（paragon.3901 → 3902）。两条入口都在 paragon.3002 汇合。

When a player restores an ancient gateway (on_build_complete of the gateway_restored megastructure) with the Paragons DLC, nobody has found him yet and a 20% draw succeeds, paragon.3000 fires 5 days later; alternatively another empire's fleet first entering the gateway system fires hidden paragon.3901 → 3902. Both entrances meet at paragon.3002.

## 剧情脉络 Story outline

3000/3001：星门中出现一艘瘫痪的巨舰 → 3002：数月洞察，建议派陆军登船 → 专项“登船行动”→ 3003：遇到外星人指挥官，可帮他修复或夺船。帮助 → 修复专项 → 3004“被遗忘的舰队司令”→ 60–120天后 3005 斯克兰德·夏普比克：可以招募或解散。夺船则 80%/20%（有修正）二选一：3007 惨败、3006 获胜并研究（3021 得到舰载机科技）。招募后每约10–25年的“斯克兰德事件”脉冲会逐个抽出后续事件：羽腐病（3010，病情与疗法两个情势并行，先走满者决定斯克兰德生死）、感恩（3020）、指挥问题（3030→整合情势）、利爪升级（3040）、危机研究（3050）、利爪研究（3060）、利爪重建（3070/3072）、新物种（3080）、历史研究（3090）。

3000/3001: a crippled giant ship appears in the gateway → 3002: months of insight, boarding by ground troops advised → project "Boarding Action" → 3003: an alien commander; help repair the ship or seize it. Helping → repair project → 3004 "The forgotten admiral" → 3005 Skrand Sharpbeak 60–120 days later: recruit or dismiss. Seizing it is a 20%/80% (modified) draw: 3007 defeat, or 3006 victory with study (3021 strike-craft technology). After hiring, the Skrand pulse (every ~10–25 years) draws the follow-ups one at a time: Feather Rot (3010 — illness and cure situations run in parallel and the first to finish decides Skrand's fate), Show of Gratitude (3020), Command Issue (3030 → integration situation), Talon upgrades (3040), crisis study (3050), Talon study (3060), Talon rebuild (3070/3072), New Hope (3080) and History Studies (3090).

## 分支与结局 Branches and outcomes

招募 / 解散（3005）；帮助或夺船（3003，夺船有胜负）；羽腐病中疗法先完成则斯克兰德得救（3015），否则病逝（3011）；指挥问题可偏袒任何一方或让双方自行解决（3030/3035/3036）。每个后续事件各发生一次（fire_only_once），顺序由脉冲随机，部分有前置条件（见下）。

Recruit / dismiss (3005); help or seize (3003, seizing has a win/lose draw); in Feather Rot the cure finishing first saves Skrand (3015), otherwise he dies (3011); Command Issue lets you take either side or leave them to it (3030/3035/3036). Each follow-up happens once (fire_only_once), in random pulse order, some with prerequisites (below).

## 条件与文明差异 Conditions and variants

3003 的“帮助修复”不对集群和狂热排外帝国开放，“夺船”不对狂热亲外帝国开放；夺船获胜基础20%，对战士文化/战争机器人/群体军团、集群、嗜杀、排外、军国主义和耐久机器人物种等有加成；3004 的文本因是否已知斯卡拉维德（found_skravird）而异。3080 需要“基因工程”飞升天赋并禁止清洗和奴隶制；3050 只在危机出现时。3040 需要利爪研究完成（studied_talon）；3020 需要整合指挥与利爪船体两项修正；3070 需要利爪号被击毁且已研究过。

In 3003, "help repair" is closed to gestalts and fanatic xenophobes and "seize it" to fanatic xenophiles; the seizure's base win chance is 20%, raised by warrior-culture / warbot / legion civics, gestalt, homicidal, xenophobe, militarist and durable-robot species; the text of 3004 differs by whether Skravird is known (found_skravird). 3080 needs the Engineered Evolution perk and policies forbidding purging and slavery; 3050 appears only during a crisis. 3040 needs the Talon study (studied_talon); 3020 needs both the integrated-command and talon-hull modifiers; 3070 needs the Talon to be destroyed after its study.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/megastructures/05_gateways.txt:433-476`; `events/paragon_events_3.txt:28-520`; `events/paragon_events_3.txt:584-1707`; `events/paragon_events_3.txt:3305-3420`; `common/on_actions/00_on_actions.txt:637-648`; `common/static_modifiers/19_static_modifiers_paragon.txt`; `common/situations/05_paragon_situations.txt`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
核对了入口（common/megastructures/05_gateways.txt、events/paragon_events_3.txt:28-520、3305-3420）、脉冲（00_on_actions.txt:637-648；events 1691-1707）、各后续事件的触发与效果（584-1612）、静态修正（common/static_modifiers/19_static_modifiers_paragon.txt）。原先的10张卡（3901、3010、3020、3030、3040、3050、3060、3070、3080、3090）并为一条故事；星门“重新激活”通知 apoc.10/12 留在 event-apoc-10。

Checked the entrances (common/megastructures/05_gateways.txt, events/paragon_events_3.txt:28-520, 3305-3420), the pulse (00_on_actions.txt:637-648; events 1691-1707), every follow-up's trigger and effects (584-1612) and the static modifiers (common/static_modifiers/19_static_modifiers_paragon.txt). The former ten cards (3901, 3010, 3020, 3030, 3040, 3050, 3060, 3070, 3080, 3090) are merged into one story; the gateway "Reactivated" notices apoc.10/12 stay in event-apoc-10.
