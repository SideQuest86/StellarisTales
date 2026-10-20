# 基因重塑 / Biomorphosis

- 分类 Category：C7 文明纪事 / C7 Society · DLC: BioGenesis

## 如何开始 How it starts

取得飞升天赋“工程进化”（需 BioGenesis DLC）时，隐藏事件 bio.1 立即开启“基因重塑”情势：蜂巢意识开启蜂巢版本，其余帝国开启普通版本（00_ascension_paths.txt:11-35；biogenesis_events.txt:8-35）。

Taking the Engineered Evolution ascension perk with BioGenesis fires hidden bio.1, which starts the Biomorphosis situation at once: the hive version for hive minds, the regular version otherwise (00_ascension_paths.txt:11-35; biogenesis_events.txt:8-35).

## 剧情脉络 Story outline

- 主线是情势的三个阶段与完成：阶段一开始一天后 bio.5（蜂巢 bio.25）要求选择纯净、克隆或变异路线；进入阶段二时 bio.10（bio.30）、阶段三时 bio.15（bio.35）可以改换路线；第三阶段进度完成后 bio.20（bio.40）选择采纳的传统树（12_biogenesis_situations.txt:16-51）。
  The spine is the three stages and completion: one day into stage 1, bio.5 (hive bio.25) asks for the Purity, Cloning or Mutation approach; entering stage 2 (bio.10 / bio.30) and stage 3 (bio.15 / bio.35) lets the approach change; when stage 3 completes, bio.20 (bio.40) adopts a tradition tree (12_biogenesis_situations.txt:16-51).
- 进度每月基础 +5，按基因研究人员修正；没有基因组研究设施时为0，第二阶段未研究“基因裁剪”时为0；阶段事件和随机插曲打开期间情势暂停（L53-101；各事件 immediate 设置 situation_biogenesis_pause）。
  Progress is +5 per month scaled by genomic researchers; it is zero without a Genomic Research Facility, zero in stage 2 without Gene Tailoring, and paused while a stage event or interlude is open (L53-101; each event sets situation_biogenesis_pause).
- 随机插曲：情势每月调用 bio.2 和 bio.3（L316-321）。bio.2 在每阶段进度的1/3到1/2之间、bio.3 在2/3到5/6之间各触发一次，从当前路线的插曲池抽取一个事件（biogenesis_events.txt:39-147；00_on_actions.txt:5544-5716）。因此每阶段最多两次、全程最多六次插曲；每个插曲有自己的 biogenesis_*_fire 标记，只会发生一次。以下插曲彼此独立，没有先后顺序。
  Random interludes: each month the situation runs bio.2 and bio.3 (L316-321). bio.2 fires once between 1/3 and 1/2 of each stage, bio.3 once between 2/3 and 5/6, each drawing one event from the pool of the current approach (biogenesis_events.txt:39-147; 00_on_actions.txt:5544-5716). So at most two interludes per stage and six in total; each has its own biogenesis_*_fire flag and happens only once. The interludes are independent and unordered.
- 普通帝国插曲池（各10权重，通用项5）：
  Regular-empire interlude pool (weight 10 each, any-approach events 5):
- 纯净：有些比其他的更平等（进度≥20起）；社会有丝分裂（第二或第三阶段）；基因鸿沟（第二或第三阶段）；英雄与反派（仅第三阶段）；拥抱我们的传承（任意阶段）；我们不会被纯化！（任意阶段）；过往的秘密（任意阶段，需有母星，非游牧、非失落殖民地）；怪诞科学（任意阶段，需有非统治者科学家）；纯净丑闻！（任意阶段）
  Purity: Some More Equal (from progress 20); Societal Mitosis (stage 2 or 3); Acidic Disparity (stage 2 or 3); Heroes and Villains (stage 3 only); Embracing our Legacy (any stage); We will not be purified! (any stage); Secrets of the Past (any stage, needs a homeworld; not nomadic or Lost Colony); Weird Science (any stage, needs a non-ruler scientist); Pure Scandal! (any stage)
- 克隆：一气二清（进度≥20起，非传奇领袖/克隆大军起源）；克隆体起义（第二或第三阶段，非克隆大军起源）；举证之困（第二或第三阶段）；惊天克隆案（第二或第三阶段）；克隆困境（任意阶段，非克隆大军起源）；克隆工厂遭到破坏！（任意阶段）；身份危机（任意阶段，非克隆大军起源）；克隆人无处不在！（任意阶段，非克隆大军起源、非游牧）
  Cloning: Two for One (from progress 20, not Legendary Leader or Clone Army origin); Clones in Revolt (stage 2 or 3, not Clone Army origin); The Burden of Proof (stage 2 or 3); Striking Resemblance (stage 2 or 3); The Clone Dilemma (any stage, not Clone Army origin); Sabotage at the Clone Plant! (any stage); Identity Crisis (any stage, not Clone Army origin); Clones Everywhere! (any stage, not Clone Army origin, not nomadic)
- 变异：变种群落（第二或第三阶段）；转基因叛逆（第二或第三阶段）；意外后果（第二或第三阶段，需有≥800有机智慧人口的星球；非进化掠食者起源）；无定形细胞团（仅第三阶段）；失控的变异（任意阶段）；变异者的卓越（任意阶段）；都市传说成真（任意阶段）；变异传染（任意阶段）
  Mutation: Muto Commune (stage 2 or 3); Transgenic Rebellion (stage 2 or 3); Unexpected Drawbacks (stage 2 or 3, needs a planet with 800+ sapient organic pops; not Evolutionary Predators); Cellular Amorphousness (stage 3 only); Unruly Mutations (any stage); Mutant Excellence (any stage); Urban Legends Come Alive (any stage); Mutant Contagion (any stage)
- 任意路线：叛逆细胞（进度≥5起）；天才基因学家（进度≥5起，需有无“天才火花”特质的科学家）
  any approach: Rebellious Cell (from progress 5); Genius Geneticist (from progress 5, needs a scientist without Spark of Genius)
- 蜂巢意识插曲池（各10权重）：
  Hive-mind interlude pool (weight 10 each):
- 纯净：分工优化（进度≥20起）；世代冗余（第二或第三阶段，非荒野起源）；速度或耐力（第二或第三阶段）；突触过载（仅第三阶段）；纯净性破坏（任意阶段，需有规模>100的同种人口组）；献身于事业（任意阶段）；超越当下（任意阶段）；巧智飞升（任意阶段）；清除不完美（任意阶段）
  Purity: Division of Labor (from progress 20); Generational Redundancy (stage 2 or 3, not a Wilderness empire); Speed or Stamina (stage 2 or 3); Synaptic Overload (stage 3 only); Purity Breach (any stage, needs a pop group larger than 100); Committed to the Cause (any stage); Beyond Today (any stage); Resourceful Ascension (any stage); Purging Imperfections (any stage)
- 克隆：频率现象（进度≥20起）；同步行动之谜（第二或第三阶段）；不兼容克隆（第二或第三阶段）；制造担忧（仅第三阶段）；克隆人太多了！（任意阶段）；徒具形骸（任意阶段）；蜂巢形而上学（任意阶段）
  Cloning: Frequency Phenomena (from progress 20); A Moving Problem (stage 2 or 3); Incompatible Clones (stage 2 or 3); Creation Concerns (stage 3 only); Too Many Clones! (any stage); Empty Shells (any stage); Hive Metaphysics (any stage)
- 变异：蜂巢熔断（进度≥20起）；专用通用之辩（第二或第三阶段）；表型漂移（第二或第三阶段）；怀念往昔（仅第三阶段）；深化联系（任意阶段）；情绪失控（任意阶段）；环境不适（任意阶段）；力量或智慧（任意阶段）
  Mutation: Hive Burnout (from progress 20); Specialize or Generalize (stage 2 or 3); Phenotypical Drift (stage 2 or 3); Longing for Yesteryear (stage 3 only); Deepened Connection (any stage); Emotional Overwhelm (any stage); Environmental Intolerance (any stage); Gains or Brains (any stage)
- 任意路线：病态基因组（任意阶段）；腐坏细胞（任意阶段）
  any approach: Diseased Genome (any stage); Decaying Cells (any stage)

## 分支与结局 Branches and outcomes

- 三种路线互斥：每个阶段只能有一个当前路线，插曲由当前路线决定；之前阶段的选择决定完成时可采纳哪棵传统树（bio.20/bio.40 的 allow 要求对应路线的一级解锁）。
  The approaches are exclusive: each stage has one current approach and it decides which interludes can appear; earlier choices decide which tree can be adopted at completion (bio.20/bio.40 options require that approach's level-1 unlock).
- 有后续的插曲：英雄与反派 bio.65 → 80–140天后 a 选项接“超能限制”bio.66、b 选项接“超能依赖”bio.67；惊天克隆案 bio.85.a → 80–140天后“汹涌民意”bio.86；蜂巢熔断 bio.150.a → 360天后“焕然一新”bio.151。其余插曲只有效果，没有后续窗口。
  Interludes with sequels: Heroes and Villains bio.65 -> 80-140 days later Super Restrictions bio.66 (option a) or Super Dependence bio.67 (option b); Striking Resemblance bio.85.a -> Unexpected Backlash bio.86 after 80-140 days; Hive Burnout bio.150.a -> Refreshed and Renewed bio.151 after 360 days. The other interludes only apply effects.
- 结局：完成事件选择纯净、克隆或变异传统树（若传统槽已满则只得到标记），随后情势销毁。完成该传统树后，蜂巢意识另有“政府改革？”事件（见独立故事 bio.185/190/195）。
  Ending: the completion event adopts the Purity, Cloning or Mutation tree (only if a tradition slot is free), then the situation is destroyed. Finishing that tree later gives hive minds a separate "Government Reformation?" event (stories bio.185/190/195).

## 条件与文明差异 Conditions and variants

- 进化掠食者起源不能选纯净与克隆；拥有 clone_army_full_potential 标记的克隆大军只能选克隆；蜂巢版荒野起源只能选纯净（bio.5/25 选项 trigger）。
  Evolutionary Predators cannot pick Purity or Cloning; Clone Army empires with clone_army_full_potential can only pick Cloning; Wilderness hives can only pick Purity (bio.5/25 option triggers).
- 阶段事件正文分为“只有一种选择”和“有多种选择”两版；完成事件对进化掠食者另有正文。若存在黑暗之惧分离主义星球，bio.5 结束后还会触发起源事件 origin.6115（外部链接）。
  Stage texts have a single-choice and a multi-choice version; completion text differs for Evolutionary Predators. If Fear of the Dark separatist planets exist, bio.5 also fires origin event origin.6115 (external link).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/ascension_perks/00_ascension_paths.txt:11-35; events/biogenesis_events.txt:8-958; common/situations/12_biogenesis_situations.txt:8-322 (hive version from L326); common/on_actions/00_on_actions.txt:5544-5716; events/biogenesis_events.txt:960-5430 (random events)
- 已核对：飞升天赋入口、bio.1–bio.40、两种情势定义（阶段、进度修正、路线、on_monthly）、八个插曲 on_action 列表及53个插曲的触发条件与后续调用。
  Checked: the perk entry, bio.1-bio.40, both situation definitions (stages, progress modifiers, approaches, on_monthly), the eight interlude on_action lists, and the triggers and follow-up calls of all 53 interludes.
- 修正：原草稿把53个插曲各自列为“银河轶事”中的独立单页故事；它们是该情势的情势事件（situation = this，只由情势的 on_monthly 调用），现并入本故事，作为按路线分组的并行随机插曲。完成事件 bio.20/bio.40 原挂在情势下，与阶段一并列；现改为第三阶段之后。类别由 C8 改为 C7（情势）。
  Corrections: the draft listed the 53 interludes as separate one-page C8 stories; they are situation events of this situation (situation = this, fired only from its on_monthly) and are now part of this story as parallel random interludes grouped by approach. The completion events bio.20/bio.40 were siblings of stage 1; they now follow stage 3. Category changed from C8 to C7 (situation).
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
