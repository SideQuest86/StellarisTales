# 信号 / The Signal

- 分类 Category：先驱者与考古 Precursors · 来源 Sources：common/archaeological_site_types/06_overlord_arc_sites.txt:89；events/unique_system_events.txt:13；common/solar_system_initializers/unique_system_initializers.txt:262 · DLC：《霸主》Overlord（脚本文件 06_overlord_arc_sites） Overlord · 审阅 Reviewed 2026-10-13

## 如何开始 How it starts

遗址权重为0，由星系初始化器 unique_system_initializer_02 创建（common/solar_system_initializers/unique_system_initializers.txt:262）：拉里昂星球偏僻山谷中的坠毁飞船和地下实验室。

Weight 0: created by the system initializer unique_system_initializer_02 (common/solar_system_initializers/unique_system_initializers.txt:262): a crashed ship and an underground lab in a remote valley of Larion.

## 剧情脉络 Story outline

山谷里坠毁的飞船、遇难者与一座地下克隆实验室：成百上千个“拉里昂内斯意识”的克隆体沉睡在培养罐中。可以拆解、唤醒其中一个交谈，或按帝国类型选择处置。

1. 坠毁的飞船：、营地与被碎石堵住的实验室
2. 古怪的实验室：遇难者死于内脏早期衰竭，似染上未知细菌
3. 罕见的标本：克隆罐大厅。a 拆解培养罐（文本随帝国类型而变；工程学与社会学研究）；b 唤醒一个（非排外、非灭绝）→ unique.15；c.evopred 演化猎手专属

A crashed ship in a remote valley, dead aliens, and an underground cloning lab with hundreds of sleeping clones of the "Larionessi Consciousness". You can dismantle the vats, wake one clone and talk, or decide their fate.

1. The Crashed Ship: the crashed ship, a camp and a debris-blocked lab
2. The Weird Laboratory: the dead died of early organ failure, perhaps an unknown disease
3. The Unique Specimens: the hall of cloning vats. a dismantle them (wording varies by empire; engineering and society research); b wake one (not xenophobe or homicidal) → unique.15; c.evopred for Evolutionary Predators

## 分支与结局 Branches and outcomes

- 拉里昂内斯克隆体 / Larionessi Clone：克隆体醒来，询问能否放他们出来：a 你们是谁→16；b 谁造了你们→17；c 出去安全吗→18；d 我们知道怎么处置你们→20 / the clone wakes and asks to be released: a who are you → 16; b who made you → 17; c would you be safe outside → 18; d we know what to do with you → 20
-  / ：终选：a 拉里昂归你们（条件）→ 创建拉里昂物种与蜂群意识附庸国、母星获得修正与传统；b 我们为你们另找居所（星球修正）；c 你们没机会了 → unique.22（研究奖励） / the final choice: a Larion is yours (conditional) → a Larion species and a hive-mind vassal state, planet modifiers and traditions; b we will find a place for you (a planet modifier); c you had your chance → unique.22 (research reward)

## 条件与文明差异 Conditions and variants

- 无特殊的文明差异。 / No empire-specific variants beyond the reward wording.
- 掷骰失败时使用通用事件池 all_random_events（见“考古遗址：发掘意外”）。 / Failed rolls use the generic pool all_random_events (see "Archaeological Sites: excavation incidents").

## 审阅记录 Review notes

- 已核对：遗址定义（common/archaeological_site_types/06_overlord_arc_sites.txt:89）的阶段顺序与条件、各阶段事件脚本、出现方式；中英文正文已读。
- Checked: the site definition (common/archaeological_site_types/06_overlord_arc_sites.txt:89) with its stage order and conditions, every stage event script, and how the site appears; both languages read.
