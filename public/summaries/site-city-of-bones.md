# 白骨之城 / City of Bones

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在沙漠、干旱、稀树草原或盖亚星球上。全银河最多一处。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on desert, arid, savannah or gaia planets. At most one per galaxy.

## 剧情脉络 Story outline

沙暴后露出的由骨头筑成的远古城市；三个阶段追问骨头的来源，最后得知它们来自一种因疾病而骨化的爬行动物，被城邦居民有意饲养。

1. 白骨之城：沙漠中由骨头建造的远古城市
2. 白骨之城：没有找到完整骨架，推测是共生或家畜物种

A primeval city built of bones uncovered by a sandstorm; three stages ask where the bones came from, ending with a reptile whose disease caused ossification and was exploited by the city's builders.

1. City of Bones: a bone city in the desert
2. City of Bones: no complete skeleton found; perhaps a symbiotic or livestock species

## 分支与结局 Branches and outcomes

- 白骨之城 / City of Bones：骨头来自一种罹患骨化疾病的灭绝爬行动物，被有意选育（社会学研究、中型文物；设置 city_of_bones_completed） / the bones came from an extinct reptile with an ossifying disease that was selectively bred (society research, medium artifact; sets city_of_bones_completed)
- 前两阶段各直接给予50稀有文物。 / The first two stages each give 50 minor artifacts directly.

## 条件与文明差异 Conditions and variants

- 终章对演化猎手有额外的“敲开骨头喝骨髓”选项；开头描述按是否沙暴暴露有两种版本。 / The finale has an extra Evolutionary-Predator option (crack the bones and drink the marrow); the site description has two wordings depending on whether the planet is colonised.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1758；events/ancient_relics_arcsite_events_1.txt:2411
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1758）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1758) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
