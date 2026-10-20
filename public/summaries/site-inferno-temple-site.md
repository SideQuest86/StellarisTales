# 地狱神庙 / Inferno Temple

- 分类 Category：先驱者与考古 Precursors · DLC：《地狱》Infernals（需 has_infernals） Infernals (needs has_infernals)

## 如何开始 How it starts

随机遗址：权重+250，出现在火山星球（pc_volcanic）上且所有者为前FTL文明；没有 has_infernals 时权重为0；全银河最多一处（common/archaeological_site_types/14_infernals_arc_sites.txt:53）。

A random site: +250 on volcanic planets (pc_volcanic) owned by a pre-FTL species; weight 0 without has_infernals; at most one per galaxy (common/archaeological_site_types/14_infernals_arc_sites.txt:53).

## 剧情脉络 Story outline

火山山脉中被烧毁的古神庙，供奉“地狱之眼”：祭坑、活祭遗骸，最后在殿内读到预言——地狱之眼将震怒，令天色转暗、圣山喷发。

1. 古老印记：寺庙遭战火焚毁，当地人视此地为禁地
2. 幽瞳祭品：“地狱之眼”的献祭坑：灰烬与炭来自动物组织（可选自己研究或派无人机）
3. 黑暗仪式：殿内最深处通向岩浆池的祭坛（中型文物）
4. 剧变预言：预言：地狱之眼将重临并摧毁文明；三种回应（重演预言、不干预、历史已永失；大型文物）

A torched temple of the "Infernal Eye" in an active volcanic range: sacrificial pits, desiccated remains and, in the innermost chamber, prophecies of the Eye's return.

1. Ancient Signs: the temple was torched; locals avoid the area as cursed
2. Ocular Offerings: sacrificial pits mimicking the Infernal Eye (study it yourself or send drones)
3. Dark Practices: the deepest chamber over a magma pit (medium artifact)
4. Convulsing Prophecies: the prophecy of the Eye's return and the end of civilisation; three answers (re-enact it, do not intervene, the history is lost; large artifact)

## 分支与结局 Branches and outcomes

## 条件与文明差异 Conditions and variants

- 本遗址的 on_roll_failed 把事件池参数设为 no_events（不存在同名事件池），所以掷骰失败不会触发随机意外。 / The site passes RANDOM_EVENTS = no_events to its roll-failure effect (no pool of that name exists), so a failed roll triggers no incident.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：common/archaeological_site_types/14_infernals_arc_sites.txt:53；events/infernals_1_events.txt:5865
- 已核对：遗址定义（common/archaeological_site_types/14_infernals_arc_sites.txt:53）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/14_infernals_arc_sites.txt:53) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
