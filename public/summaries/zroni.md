# 泽珞族 / The Zroni

- 分类 Category：先驱者 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

非AI帝国勘察泽珞星域（precursor_zroni_1 星系）中一颗无异常、无遗址、未殖民的宜居星球时，on_survey_planet 以权重35可能抽中开场 ancrel.1“神秘废墟”。全银河只触发一次（全局 zroni_started），且该帝国不能已有其他先驱者开场。回应在该星球建立“废弃殖民地遗迹”。

A non-AI empire surveying an anomaly-free, site-free, uncolonised habitable world in a Zroni region system can draw the opening ancrel.1 "Mysterious Ruins" (weight 35) from on_survey_planet. It fires once per galaxy (global zroni_started) and needs no other precursor opening. The response creates the Abandoned Colony Ruins site.

## 剧情脉络 Story outline

六处遗址严格依次出现；每处最后阶段在3–15跳内放置下一处：
1. 废弃殖民地遗迹（3阶段）：空城→会“想被找到”的水晶→灵能档案：泽珞族在集体梦境中接触“虚境”并能投射其中。
2. 泽珞信标（2阶段）：借虚境跳跃散布银河。
3. 泽珞神殿（2阶段）：神力的能量来自银河中心黑洞的膨胀；“神圣者”与“拯救者”两派内战。
4. 泽珞研究站（2阶段）：被嘲笑的研究者发现虚境中由集体恐惧与欲望凝成的实体。
5. 泽珞核心世界（3阶段）：战争进程；一名研究者以自身化为“泽珞尘”，水晶最终指向母星。
6. 若为首个完成者，隐藏的 ancrel.14 生成母星系（无位置则30天后重试），其中的“泽珞”遗址（5阶段）揭示：拯救者用泽珞尘扭转战局，神圣者陷入疯狂并计划加速黑洞吞噬银河；拯救者牺牲全族只留一人，用全族的灵能残余消灭了所有泽珞族。最后一个有感知的水晶请求被带走（遗珍“灵能档案”）。
7. 可选：ancrel.14 设置 last_zroni_system，可另行花750稀有文物开启“探究泽珞族的秘密”（社会学）→ 10350；遗珍可反复激活 → 7006“灵能指引”。

Six sites appear strictly in order; each last stage places the next one 3–15 jumps away:
1. Abandoned Colony Ruins (3 stages): an empty city → a crystal that "wanted to be found" → a Psionic Archive: the Zroni reached the Shroud through mass dreaming and learned to project into it.
2. Zroni Beacon (2): psionic jumps spread them across the galaxy.
3. Zroni Shrine (2): their godhood fed on the growth of the galactic core's black hole; civil war between the Divine and the Saviors.
4. Zroni Research Station (2): a ridiculed researcher found entities formed in the Shroud from collective fears and desires.
5. Zroni Core World (3): the course of the war; a researcher turned himself into Zro dust; the crystal points to the homeworld.
6. If first to finish, hidden ancrel.14 spawns the home system (retry after 30 days); its Zron site (5 stages) reveals that the Saviors turned the war with Zro dust, the Divine planned to accelerate the black hole, and the Saviors sacrificed all but one of their kind, whose blast of psionic residue destroyed every Zroni. A last sapient crystal asks to be taken (relic: Psionic Archive).
7. Optional: ancrel.14 sets last_zroni_system → "Secrets of the Zroni" for 750 minor artifacts (society) → 10350; the relic can be activated repeatedly → 7006 "Psionic Guidance".

## 分支与结局 Branches and outcomes

- 主线没有分支；每处遗址的掷骰失败可能引发通用发掘意外（见故事“考古遗址：发掘意外”）。
- 终章 19 给予遗珍；18 设置 zroni_completed。
- 7006：每次激活三选一——统治者提升1级（技能未满10）、1800天军事修正、1800天治国修正。

- No branches in the main line; failed rolls at any site can trigger generic excavation incidents (see "Archaeological Sites: excavation incidents").
- Finale 19 grants the relic; 18 sets zroni_completed.
- 7006: each activation offers one of three — the ruler gains a level (below skill 10), a 1800-day martial or a 1800-day state modifier.

## 条件与文明差异 Conditions and variants

- 4 若尚未拥有灵能理论则开放其研究与进度，否则给社会学研究；10350 同理。
- 第2处遗址的两个阶段事件在游戏中的标题沿用本地化键 zroni_digsite_5/6（“泽珞核心世界”“泽珞”），属原文现象。

- Stage 4 grants Psionic Theory as an option with progress if unknown, else society research; 10350 likewise.
- Site 2's two stage events use the keys zroni_digsite_5/6 as titles ("Zroni Core World", "Zron") — an original-text quirk.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：events/ancient_relics_arcsite_events_1.txt:14–580、6917；common/archaeological_site_types/01_precursor_arc_sites.txt:4–261；common/scripted_effects/00_scripted_effects.txt:7758；common/solar_system_initializers/ancient_relics_initializers.txt:179；common/artifact_actions/artifact_actions.txt:812；common/relics/relics.txt:1024
- 已核对：ancrel.1–19、六处遗址的阶段定义、zroni_digsite_spawn_effect、Zrocursor_system 初始化器、artifact_zroni_research、ZRONI_SECRETS 与 10350、r_zro_crystal 与 7006；中英文正文已读。
- 结构修正：前往泽珞与秘密研究的桥改为挂在 ancrel.13 的回应上并附证据；原为独立单页故事的遗珍激活 7006 并入本故事；补充阶段标签与说明。

- Checked: ancrel.1–19, stage definitions of the six sites, the spawn effect, the Zrocursor_system initializer, artifact_zroni_research, ZRONI_SECRETS and 10350, r_zro_crystal and 7006; both languages read.
- Structural fixes: the bridges to Zron and to the secrets research now hang on ancrel.13's response with evidence; relic activation 7006 (previously a separate one-card story) joined as an optional follow-up; stage labels and notes added.
