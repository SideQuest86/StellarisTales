# 恒星耀斑 / Solar Flare

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地满 25 年时的随机殖民地事件（权重 5/100，弱磁场星球加倍）。只针对机械帝国：非首都殖民地上过半人口为机器单位；每个帝国一生一次。
  A random colony event when a colony turns 25 (weight 5/100, doubled on planets with a weak magnetic field). Machine empires only: a non-capital colony whose pops are mostly machine units; once per empire.
- 200「恒星耀斑」：星球获得 5 年的“磁场扰乱”修正，并要求为子个体选择防护（全部、低级、复合，或无法分配预算）。15 天后 202「地磁风暴」开启局势，初始方式与初始损伤取决于刚才的选择。
  200 "Solar Flare": the planet gains "Magnetic Disruption" for 5 years and you choose which drones to shield (all, simple, complex, or none). 15 days later 202 "Geomagnetic Storm" starts the situation; its starting approach and initial damage follow that choice.

## 剧情脉络 Story outline

1. 局势进度代表辐射损伤：不保护时每月 +5（约 20 个月满），保护的子个体比例越高增长越慢；阶段 0–40 / 40–70 / 70–100 的产出与稳定度惩罚递增。
   Progress is radiation damage: +5 per month unshielded (full in about 20 months), less the larger the shielded share; stages 0–40 / 40–70 / 70–100 carry increasing output and stability penalties.
2. 65–100 天后，若星球上有生物战利品（流浪侍从的“生物战利品”人口）→ 203「看护者的看护者」：可同意它们帮忙（建立护理所矿藏）。
   65–100 days later, if bio-trophies live on the planet → 203 "Who Watches The Watchers?": you may let them help (adds the care-home deposit).
3. 风暴期间的每月随机事件（可能都不发生，顺序不定）：210「故障子个体」、213「制造缺陷」、误计算（215 损失，或有生物助手岗位时更可能 216 找回资源）、250「丢失单元」→ 15–105 天后 251「清空存储」→ 重装系统：70% 252「降级」/ 30% 253「升级」。损伤越高，事件文字越错乱。
   Monthly random events during the storm (possibly none, any order): 210 "Malfunctioning Drones", 213 "Manufacturing Defects", Miscalculations (215 loss, or more likely 216 found resources when bio-assistant jobs exist), 250 "Missing Units" → 15–105 days later 251 "Wiped Drives" → reinstall: 70% 252 "Downgrade" / 30% 253 "Upgrade". The higher the damage, the more garbled the texts.

## 分支与结局 Branches and outcomes

只发生其一 / Only one of these:

- 损伤达到 100% → 290「致命损伤」：所有选项都清除该星球全部机器人口，随后 291「重装」。
  Damage reaches 100% → 290 "CRITICAL DAMAGE": every option destroys all robot pops on the planet, then 291 "Reboot".
- 约 5 年（1785 天）后风暴平息，按当时阶段：292 低损伤（工程研究 + 永久“抗辐射组件”）、293 中损伤（工程研究）、294 高损伤（5 年“软件损伤”）。殖民地易主导致局势中止时也按阶段结算。
  After about 5 years (1785 days) the storm ends, by current stage: 292 low (engineering research + permanent radiation-hardened components), 293 mid (engineering research), 294 high (software damage for 5 years). If the colony changes hands the situation aborts and resolves the same way.
- 以上任一结局 15 天后，若护理所矿藏存在 → 299「过时助手」：拆除换合金，或保留为纪念馆。
  15 days after any of these, if the care-home deposit exists → 299 "Outdated Assistants": demolish it for alloys or keep it as a museum.

## 条件与文明差异 Conditions and variants

- 210/213/215/216/250/251/252/253 的正文与选项按损伤阶段有三种写法（越来越破碎）。
  Events 210–253 have three texts per stage of damage (increasingly broken).
- 203 与 216、299 只与拥有生物战利品/生物助手的帝国（流浪侍从）相关。
  203, 216 and 299 only matter for empires with bio-trophies / bio-assistants (Rogue Servitors).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/situation_events.txt:1575-2826`；`common/situations/01_narrative_situations.txt:840-1047`（局势「地磁风暴」）；`common/on_actions/00_on_actions.txt`（on_colony_25_years_old 随机殖民地事件池）
- 已核对：200–299 全部事件、隐藏分派 214/289、局势定义（阶段、方式、每月事件与权重、on_progress_complete、on_abort）。
  Checked: all events 200–299, hidden routers 214/289, and the situation definition (stages, approaches, monthly pool and weights, on_progress_complete, on_abort).
- 更正 Corrections：草稿把三个“风暴之后”结局挂在 202 下（经隐藏计时事件），现改挂在局势卡下并注明按损伤阶段互斥；299 的边注明需要护理所；203 注明生物战利品条件。
  The draft hung the three "After The Storm" endings under 202 (through the hidden timer); they now hang under the situation card as exclusive outcomes by damage stage; edges to 299 note the care-home condition; 203 notes its bio-trophy condition.
- 备注：源码注释与效果不一致之处以效果为准（例如注释称 292 为“蜂巢思维更强”，实际给予工程研究与修正）。
  Note: where script comments and effects differ, the effects are followed.
