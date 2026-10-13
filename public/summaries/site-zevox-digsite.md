# 坠毁的飞船 / The Crashed Ship

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/06_overlord_arc_sites.txt:131；events/unique_system_events.txt:435；common/solar_system_initializers/unique_system_initializers.txt:452 · DLC：《霸主》Overlord（脚本文件 06_overlord_arc_sites） Overlord · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

遗址权重为0，由星系初始化器 unique_system_initializer_03 创建（common/solar_system_initializers/unique_system_initializers.txt:452）：一艘坠毁在卫星上的飞船，旁边有一个与“影境”有关的裂隙。

Weight 0: created by the system initializer unique_system_initializer_03 (common/solar_system_initializers/unique_system_initializers.txt:452): a crashed ship on a moon beside a rift tied to the Shroud.

## 剧情脉络 Story outline

一艘无人坠毁的飞船里留下了零一号单元的日志：他们与“影境巫团”打交道，试验影境、结识了一个叫“抟土之塑师”的灵能实体。前四天日志依次解读；机器帝国可以选择在最后一阶段与塑师通话，并在“价值”与“被判不足”之间随机裁决。

1. 第一天：第1天：被遗弃的飞船与无人机残骸，日志开始解读（社会学研究）
2. 第17天：日志残缺，单元841对影境有感应
3. 第83天：裂隙开始活动，“灵能实体：抟土之塑师”
4. 第305天：裂隙平静，日志读完；机器帝国（非“终结者”）可以接受塑师的联系

A crashed, empty ship holds Unit-305's log of experiments with the Shroud and a psionic entity, the Animator of Clay. The four log days are deciphered in turn; a machine empire may then talk to the Animator in the last stage and is judged worthy or wanting at random.

1. Day 1: the empty ship and a data log (society research)
2. Day 17: gaps in the log; Unit-841 shows an affinity with the Shroud
3. Day 83: the rift stirs; the psionic entity Animator of Clay
4. Day 305: the rift quiets, the log is finished; a machine empire (not Terminator) may take the Animator's call

## 分支与结局 Branches and outcomes

- 抟土之塑师 / Animator of Clay：塑师通话（仅 unique.65.c）：a 自我介绍→72→(75 或挂断)、b 你想要什么→75、c 挂断→100 / the Animator call (only unique.65.c): a identify yourself → 72 → (75 or hang up), b what do you want → 75, c cut the communication → 100
- 抟土之塑师（unique.75，以 base 继承 unique.70）/ Animator of Clay (unique.75, inherits unique.70)：“你们值得追随吗？”：a 为何要这么做→80；b 挂断→100 / "Are you worth following?": a why would we → 80; b cut → 100
- 抟土之塑师（unique.80）/ Animator of Clay (unique.80)：塑师的提议：一颗被影境控制的新家园。a 接受 → 随机裁决（基础67/33，收入越高越易“值得”）：unique.85 值得——卫星变为盖亚星球并获得七种资源点；unique.90 不值得——大量人口离去、卫星上建起自由机器人国家，帝国变为“机械”种族并获得科技与资源，随后 unique.95 让你决定是否接管这个新国家；b 挂断→100 / the Animator's offer of a Shroud-held home. a accept → a random verdict (base 67/33, better with high income): unique.85 worthy — the moon becomes a Gaia world with seven deposits; unique.90 wanting — many pops leave, a free robot state is founded on the moon and your species turns mechanical with extra techs and resources, then unique.95 asks whether you take over the new state; b cut → 100
- 抟土之塑师（unique.100）/ Animator of Clay (unique.100)："Wai-..."：通话中断，日志带回首都（社会学研究） / "Wai-...": the call is cut; the log goes home (society research)

## 条件与文明差异 Conditions and variants

- 非机器帝国在 unique.65 只有“A 一个教训”的选项；有“机器终结者”公约的机器帝国得到另一种文本。 / Non-machine empires only get the plain "a tale of caution" option at unique.65; machine empires with the Terminator civic get another wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/06_overlord_arc_sites.txt:131）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/06_overlord_arc_sites.txt:131) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
- 2026-10-13 r3-inherit：事件继承修复后复查：unique.70–100 继承 unique.70 的标题（抟土之塑师）；树与导读的分支一致，导读补上缺失的标题。
  2026-10-13 r3-inherit: re-checked: unique.70-100 inherit the Animator of Clay title; the tree matches the guide's branches; missing titles in the guide filled.
