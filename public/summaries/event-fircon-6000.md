# 那里有生命存在吗？ / Is There Life In There?

- 分类 Category：文明纪事 Society (C7) · 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/first_contact_dlc_events.txt:7595-8171`；`common/special_projects/00_projects_first_contact_dlc.txt:353-410`；`common/on_actions/00_on_actions.txt:468, 538-560`（on_five_year_random_pulse_pre_ftl）；`events/on_action_events_2.txt:3146-3179`（action.620/621）

## 如何开始 How it starts

- 每五年的国家检查运行 action.620：拥有“首次接触”DLC、且与某个前超光速文明有生效协议的普通帝国，会在 0–360 天后抽取“前超光速外交事件池”（无事 200，本事件 10，条件不满足的事件被跳过）。
  The five-year country pulse runs action.620: a regular empire with the First Contact DLC and an active agreement with a pre-FTL civilization draws from the pre-FTL diplomacy pool 0-360 days later (nothing 200, this event 10; events whose conditions fail are skipped).
- 条件：境内有被观测的前超光速文明，且它不是地底文明、没有“地平说”国民理念、也不是本国“挣脱桎梏”的母族；全银河只发生一次。
  Conditions: an observed pre-FTL civilization within our borders that is not subterranean, lacks the Flat World Theory civic and is not our Broken Shackles parent; once per galaxy.
- 发生后设置“近期前超光速外交事件”冷却，其他此类事件暂不出现。
  Afterwards a "recent pre-FTL diplomatic event" cooldown blocks the other events of this pool for a while.

## 剧情脉络 Story outline

- 6000「那里有生命存在吗？」：他们拒绝相信外星生命，认为我们是从空心星球内部钻出来的地底居民。
  6000 "Is There Life In There?": they refuse to believe in aliens and think we are dwellers from inside their hollow planet.
- 三种尝试（15–30 天后）：带怀疑论者上太空 → 6005（他们认为天空是镜子穹顶）；展示计算 → 6015（他们转而认为世界是平的）；承认是地底入侵者 → 6020（他们感谢我们的坦诚）。三者都在 30–60 天后进入 6025「地底入侵防御部队」。
  Three attempts (15-30 days later): take skeptics to space → 6005 (they think the sky is a mirrored dome); show the calculations → 6015 (now they think the world is flat); admit we are subterranean invaders → 6020 (they thank us for our honesty). All lead 30-60 days later to 6025 "Subterranean Invasion Defense Force".
- 6025：配合演出，派运输舰执行 80 天项目（期限 1080 天）支援防御；或“荒唐”→ 360–1080 天后随机结果。项目完成（或超时失败）同样随机：20% 6030「突然袭击！」、30% 6032「突然爆发！」、50% 6033「异常气候」（不选项目时为 35/35/30）。
  6025: play along and send a transport on an 80-day project (1080-day limit) to support their defenses; or "this is ludicrous" → a random result 360-1080 days later. Finishing (or failing) the project rolls the same way: 20% 6030 "Sudden Attack!", 30% 6032 "Sudden Eruption!", 50% 6033 "Anticlimactic" (35/35/30 without the project).

## 分支与结局 Branches and outcomes

- 6032 与 6033 在 15 天后接 6035「观点的变动」：他们道歉，但仍对宇宙学一知半解（认为我们来自海洋、恒星中心等）。
  6032 and 6033 lead 15 days later to 6035 "A Change Of Perspective": they apologize, still misunderstanding cosmology (we come from the ocean, the center of their star, ...).
- 6030：真有地底文明涌出，发动全面入侵（生成地底国家与 3 支军队）。若守军获胜（on_colony_defenders_win → 隐藏 6034）→ 6038「滚回地下！」→ 15 天后 6035；若守军失败（on_colony_defenders_lose → 隐藏 6036）→ 6037「曾为天人，今为尘土」：原文明被消灭，星球上生成新的地底前超光速文明并已知晓我们。
  6030: a real subterranean civilization pours out and invades (a subterranean nation with 3 armies). If the defenders win (on_colony_defenders_win → hidden 6034) → 6038 "Go Back Underground!" → 15 days later 6035; if they lose (on_colony_defenders_lose → hidden 6036) → 6037 "As Above, So Below": the old civilization is annihilated and a new subterranean pre-FTL civilization, aware of us, takes the planet.
- 三种随机结果互斥；入侵战争的胜负互斥。
  The three random results are exclusive; the invasion war has exclusive win/lose outcomes.

## 条件与文明差异 Conditions and variants

- 6032 若我们派过防御部队（项目完成）则正文改为“多数人员被安全撤离”。6000 有两种正文。
  6032 uses a "most were evacuated" text if our defense force was sent (project completed). 6000 has two text versions.

## 审阅记录 Review notes

- 已核对：6000–6038 全部事件、项目定义（80天、期限1080、成功/失败权重）、守军胜负回调与延迟。
  Checked: all events 6000-6038, the project (80 days, 1080 limit, success/failure weights), the defender win/lose callbacks and delays.
- 更正：原“滚回地下！”（6034）与“曾为天人，今为尘土”（6036）为独立卡片，实为 6030 入侵战争的两种结局，已并入并接在 6030 之后。
  Correction: "Go Back Underground!" (6034) and "As Above, So Below" (6036) were separate cards; they are the two outcomes of 6030's invasion war and now follow 6030.
