# 无边无垠 / The Endless Expanse

- 分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在冰冻星球（pc_frozen）上。全银河最多一处。第二个遗址“伊克斯·柏楞”只能由第一个遗址的结局创建（权重0）。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on frozen planets (pc_frozen). At most one per galaxy. The second site, Ix Belen, can only be created by the first site's ending (weight 0).

## 剧情脉络 Story outline

冰封星球上有一座仍由全息牧师主持的教堂，教众在机械忏悔椅里被抽走记忆，装进蓝色记忆球。牧师其实是创始人萨阿里亚的虚拟复本；她的日志指向太空栖息地“伊克斯·柏楞”，那里发生过更可怕的事。

1. 教堂现身无垠之地：教堂现身：仍在运转的全息牧师与机械忏悔椅
2. 忘却堂：遗忘堂：藏在地板下的记忆球密室；三种做法（a 实用、b 偷看忏悔、c 唯心者认为无知是福）
3. 累累罪行：琐碎的罪，唯有牧师本人的罪行突出
4. 遗忘之事无从释怀：被遗忘但未被宽恕：a 前往伊克斯·柏楞（创建第二个遗址、大型文物）；b（唯心者）让雪掩埋此地，或 c（其他）不管死去外星人的小事——二者皆得影响力+500与大型文物，不再有第二个遗址

On an icy world a church is still run by a holographic priest; penitents had memories extracted in confessional chairs and stored in blue orbs. The priest is a virtual copy of the founder Saariah, whose journal points to the habitat Ix Belen where something worse happened.

1. Church of the Endless Expanse: the church uncovered: a working holographic priest and mechanical confessional chairs
2. Oblivion: a crypt of memory orbs; three attitudes (a practical, b read the confessions, c a spiritualist condemns it)
3. Sin: trivial transgressions — except the priest's own
4. Forgotten But Not Forgiven: a set course for Ix Belen (creates the second site, large artifact); b (spiritualists) let the snow bury it, or c (others) ignore dead aliens' crimes — both give influence +500 and a large artifact and no second site

## 分支与结局 Branches and outcomes

- 眠梦仪 / The Memorex：第二个遗址“伊克斯·柏楞”阶段一：孟梦仪（Memorex）——夜间运行的记忆增强程序被滥用 / Ix Belen stage 1: the Memorex, an overnight learning program that was abused
- 我者何为？ / Who am I?：阶段二：谁在停电几十年后重新启动了系统？ / stage 2: who reactivated the control system decades after the life support died?
- 萨阿里亚最后的记忆球体 / Saariah's Last Memory Orb：阶段三：萨阿里亚的最后记忆球：她抹除数据并试图恢复居民记忆却失败 / stage 3: Saariah's last memory orb — she wiped data and failed to restore the residents
- 灵光透进浊镜台 / The Temporary Sunshine of the Spotless Mind：阶段四：萨阿里亚发现被抽走的记忆会回来。a（非排外）带走孟梦仪（修正“孟梦仪”）；b 孟梦仪最好被遗忘（合金+3500与团结奖励）；c（排外）自己的物种将完善它（同样得修正） / stage 4: Saariah realises extracted memories can return. a (non-xenophobes) take the Memorex (modifier the_memorex); b it is best forgotten (alloys +3500 and a unity reward); c (xenophobes) their own species will perfect it (the same modifier)

## 条件与文明差异 Conditions and variants

- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1925；events/ancient_relics_arcsite_events_1.txt:5378
- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1925）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1925) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
