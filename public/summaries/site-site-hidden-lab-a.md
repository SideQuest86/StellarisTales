# 冰封设施 / Frozen Complex

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1878；events/ancient_relics_arcsite_events_1.txt:6772 · DLC：《远古遗物》Ancient Relics · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

勘察天体时，隐藏事件 ancrel.9999（on_survey_planet）以 5/405 的机会生成一个随机考古遗址（AI帝国或5年内刚发现过遗址者机会×0.2），再按各遗址的权重抽取；本遗址要求拥有《远古遗物》，权重1，出现在冰冻星球（pc_frozen）上。权重只有1，是极为罕见的随机遗址。

When a body is surveyed, hidden ancrel.9999 (on_survey_planet) has a 5/405 chance to create a random dig site (×0.2 for AI empires or if a site was found in the last 5 years), then picks a site type by weight; this site needs Ancient Relics and has weight 1 on frozen planets (pc_frozen). With weight 1 it is a very rare random site.

## 剧情脉络 Story outline

冰层下隐藏着一座被烈火净化过的科研设施。两个阶段之后，隐藏事件 ancrel.7003 以50/50抽出实验室的性质：生物实验室或武器实验室。

1. 探查遗址：冰雪覆盖的遗址，有人曾想隐瞒这里发生的事
2. 清理隧道：清理坍塌或冻结的隧道，处处有火烧的痕迹

A research complex buried under ice and purged by fire. After two stages hidden ancrel.7003 draws, 50/50, whether it was a biological or a weapons lab.

1. Revealing the Site: a site buried in ice — someone wanted it hidden
2. Clearing the Tunnels: clearing collapsed and frozen tunnels scarred by fire

## 分支与结局 Branches and outcomes

- 远古生物实验室 / Ancient Biological Lab：远古生物实验室：研发生物制剂，似因泄漏被烈火焚毁（社会学研究奖励） / ancient biological lab: research on biological agents, apparently burned after a leak (society research)
- 远古武器实验室 / Ancient Weapons Lab：远古武器实验室：高能武器事故导致爆炸，数据中心尚存（等离子科技选项30%） / ancient weapons lab: an accident destroyed it but a data centre survived (plasma weapons tech option, 30%)

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1878）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/02_ancient_relics_arc_sites.txt:1878) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 结构修正：最后一个阶段事件 ancrel.7003 是隐藏的随机分派，草稿把它的几个互斥结局错排成连续阶段；现改为最后可见阶段之后的互斥分支。
- Structural fix: the last stage event ancrel.7003 is a hidden random dispatcher; the draft chained its exclusive endings as consecutive stages. They are now exclusive branches after the last visible stage.
