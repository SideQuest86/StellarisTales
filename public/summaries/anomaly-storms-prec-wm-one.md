# 远古庇护所：因内特贸易体（开场）/ Ancient Shelter: the Inetian Traders (opening)

- 分类 Category：先驱者 Precursors（审阅改定；编译默认为深空异闻）
- 来源 Sources：`common/anomalies/102_anomaly_categories_cosmic_storms.txt:10-27` · `events/precursor_events_cosmic_storms.txt:18-462` · `common/archaeological_site_types/10_cosmic_storms_arc_sites.txt:72-122` · `common/special_projects/03_projects_cosmic_storms.txt:10-44` · `common/solar_system_initializers/cosmic_storm_initializers.txt:3-60` · `common/on_actions/00_on_actions.txt:1180-1192`
- DLC：宇宙风暴 Cosmic Storms（`01_precursor_civilizations_cosmic_storms.txt:1-8`）；远古遗物与典范 DLC 会改变部分奖励
- 审阅 Reviewed：2026-10-12（c3b-exploration）· 状态：部分 Partial（后续在其他故事中）

## 如何开始 How it starts

本异常不会自然生成。银河生成时选中因内特贸易体先驱者后，玩家（非 AI、尚无先驱者开场）勘察带有该标记、尚未用作先驱者星系中的贫瘠或寒冷贫瘠行星时，`on_survey_planet` 的随机事件（权重25，“无事”100）可能触发隐藏事件 cstorms.100：生成本异常，并在30天后发出通用联络报告（另一枢纽故事）。研究成功即 cstorms.105。

The anomaly never spawns on its own. With the Inetian precursor in the galaxy, surveying a barren or cold barren planet in a flagged system can roll hidden event cstorms.100 (weight 25 against 100 for nothing) for a player empire without a precursor intro; it adds this anomaly and sends a generic contact report after 30 days. Success fires cstorms.105.

## 剧情脉络 Story outline

1. 105“远古庇护所”开启事件链“先驱者——因内特贸易体”并建立考古遗址。/ 105 starts the chain and creates the dig site.
2. 五个阶段（110–130）：双塔之下的庇护所、旧终端与语言、堆满商品的仓库——这个文明以贸易网络 INET 命名自己；最后找到能“操纵宇宙风暴”的装置的加密坐标。/ Five stages reveal a commodities warehouse of the "Inetian Traders" and scrambled coordinates of a storm-manipulating device.
3. 130 开启500点研究项目“解析坐标”；完成后生成新星系（初始化器 `weathermanipulators_home_system`，内含坐标A/B/C三处遗址），135“富饶星系”标出三个地点。/ The project spawns a system with three dig sites; 135 names them.

## 分支与结局 Branches and outcomes

- 120、125 有付费选项：花费能量换取额外线索或换取研究/矿物；它们不改变剧情走向。/ Paid options in 120 and 125 trade energy for clues or resources; they do not change the plot.
- **本故事没有结局**：坐标A/B/C的调查、“机器的意义”与“追寻贸易体”项目、风暴成因与最后的庇护所，目前归档于另一个故事“坐标A：殖民星球”（C2）；“因内特秘密”研究（INETIAN_PROJECTS_04）又是另一故事。/ No ending here: the continuation is archived in the story "Coordinates A: Colonized Planet" (C2) and the Inetian secrets research in yet another story.

## 条件与文明差异 Conditions and variants

- 120 的科技奖励按是否拥有典范 DLC、是否格式塔选择不同科技。/ 120's tech reward depends on Paragon DLC and gestalt status.
- 遗址掷骰失败会触发宇宙风暴先驱者通用意外（ancrel.8040/8045/8055/8070，共享枢纽故事）。/ Failed rolls fire shared dig incidents.

## 审阅记录 Review notes

- 已核对 Checked：异常定义、cstorms.100–135、遗址与项目定义、星系初始化器、on_survey_planet 权重。/ All listed definitions.
- 本轮更正 Corrections：分类改为先驱者；在 135 处注明后续故事。/ Category set to precursors; continuation noted at 135.
- 不确定/未完成 Open：因内特链条被拆成三个故事（本故事、C2 的坐标遗址故事、C3a 的秘密研究），应合并为一个先驱者故事，已在审阅台账中提出请求。/ The chain is split across three stories; a merge is requested in the ledger.
- 覆盖 Coverage：本故事11个文档全部审阅。/ All 11 docs of this story reviewed.
