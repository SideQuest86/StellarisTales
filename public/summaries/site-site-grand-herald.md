# 伟大先驱 / The Grand Herald

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1072；events/ancient_relics_arcsite_events_2.txt:4597 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重100，出现在核爆、沙漠、干旱或草原星球上（排除部分标记的星球）。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 100 on nuked, desert, arid or savannah worlds (some flagged planets excluded).

## 剧情脉络 Story outline

一个笃信预言的文明在毁灭前集体吟唱、踏上朝圣；“伟大先驱”的真身随机三选一，三者都让玩家获得一艘泰坦级飞船。

1. 热情高昂：技术发达的人形物种与深厚的宗教
2. 圣约预兆：“预兆之书”预言灾难
3. 奴役信条：最后建造的是工业设施
4. 追随者的颂歌：全球同时吟唱的“追随之歌”
5. 末日朝圣：“末日朝圣”的文献

A deeply religious civilisation chanted and went on pilgrimage before vanishing; what the Grand Herald really is varies at random, but all three endings give a Titan-class ship.

1. In High Spirits: an advanced humanoid species with a deep religion
2. The Testament of Omen: the Testament of Omen foretells catastrophe
3. The Creed of Servitude: the last buildings were industrial
4. The Hymn of Following: the planet-wide Hymn of Following
5. The Pilgrimage of Last Days: the Pilgrimage of Last Days

## 分支与结局 Branches and outcomes

- 传承之舟 / The Ark of Legacy：“遗产方舟”：伪装隐藏的泰坦级飞船 / the Ark of Legacy: a camouflaged Titan-class ship
- 整体守护者 / The Guardian of Entirety：“万物守护者”：半埋沙中的泰坦 / the Guardian of Entirety: a Titan half-buried in sand
- 救赎之许诺 / The Promise of Deliverance：“解脱之诺”：自动船坞与它唯一的产品 / the Promise of Deliverance: an automated yard and its only product
- 飞船获得时随机带有损伤（有一定机会完好）；受损时可开启修复项目“全面翻修”。 / The ship comes with random damage (sometimes none); if damaged, the repair project "Grand Overhaul" becomes available.

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用本遗址专属的事件池 site_grand_herald_random_events。 / Failed rolls draw from this site's own pool site_grand_herald_random_events.

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1072）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1072) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.9291 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.9291 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
