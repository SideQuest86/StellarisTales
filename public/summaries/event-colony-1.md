# 迁徙森林 / Migrating Forests

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 殖民地2岁（权重3/958）或3岁（2/739）时的随机殖民地事件；全局仅一次（migrating_forests_global）。要求：非AI、非首都、非机械或荒野帝国，星球为大陆/热带/干旱/苔原/稀树草原之一。
  Random colony event when a colony is 2 (3/958) or 3 (2/739) years old; once per game (migrating_forests_global). Needs a non-AI, non-capital colony of a non-machine, non-wilderness empire on a continental, tropical, arid, tundra or savannah world.

## 剧情脉络 Story outline

- 1「迁徙森林」：选项启用两个特殊项目——研究（总是）与烧毁（仅非环保主义者）；同时安排12「森林迁移」，之后每720+随机1680天重复，直到完成其一。
  1 "Migrating Forests": the option enables two projects, study (always) and burn (not for Environmentalists), and schedules 12, which repeats every 720 days (+ random 1680) until one is done.
- 研究项目 → 2：1800+随机5400天后，9「适应共存」、10「道法自然」、11「森林大火」各可发生一次，互相独立。
  Study project -> 2: after 1800 days (+ random 5400) 9, 10 and 11 can each occur once, independently.
- 烧毁项目 → 3：1800+随机5400天后可发生4「树人崛起」、6「矿床」或7「稀有金属矿」（6/7共用标记，7要求无战略资源）与8「生态破坏」。
  Burn project -> 3: after 1800 days (+ random 5400) 4 "Rise of the Trees", 6 "Mineral Deposits" or 7 "Precious Metal" (6/7 share flags, 7 needs no strategic resource) and 8 "Ecological Damage" can occur.
- 4 创建树人国家与入侵军队；击退后（on_colony_defenders_win）触发5「树人倒下」；若殖民地失守，没有专门的后续事件。
  4 creates a tree country with invading armies; if repelled (on_colony_defenders_win) colony.5 "Fall of the Trees" fires; if the colony is lost there is no dedicated follow-up.

## 分支与结局 Branches and outcomes

- 研究与烧毁互斥（玩家只完成其中之一）；烧毁路线的6与7互斥。
  Study and burn are exclusive in practice (the player completes one); on the burn route 6 and 7 exclude each other.

## 条件与文明差异 Conditions and variants

- 烧毁项目仅对不具备“环保主义”政体特质的帝国开放。
  The burn project is offered only to empires without the Environmentalist civic.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：`events/colony_events_1.txt:12-557`；`common/special_projects/00_projects_1.txt:248-266`；`common/on_actions/00_on_actions.txt:3753,3804,862`
- 已核对：入口、项目启用条件、各事件的触发标志与延迟、与 on_action 的衔接（5）。
  Checked: entry, project enabling, flag triggers and delays of every follow-up, the on_action link to 5.
- 更正：草稿把 colony.5 当作独立故事，现作为4的结尾并入。
  Correction: the draft had colony.5 as a separate one-window story; it now closes colony.4 within this story.
