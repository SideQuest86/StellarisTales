# 先进可控变异：独特变异计划 / Advanced Controlled Mutations: unique mutation projects

- 分类 Category：银河轶事 C8 stories · DLC：Grand Archive

## 如何开始 How it starts

隐藏事件 grand_archive.10000 挂在 on_ship_built（common/on_actions/00_on_actions.txt:2559）：国家拥有“先进可控变异”科技时，每建成一艘该国的太空生物船，就按船型大小累计该种类（太空变形虫/缇扬奇/虚空虫/岩居兽/晶体生物）的总产量；累计达 250（@unique_mutation_space_fauna_special_project_clone_threshold，07_scripted_variables_grand_archive.txt:179）且尚无同类项目时，设置标记并触发对应事件（10005–10009）。
Hidden grand_archive.10000 (on_ship_built) adds up built space-fauna ships per kind once the country has Advanced Controlled Mutations; at 250 it fires the matching event (10005-10009).
另有两条击杀线：on_ship_destroyed_perp（common/on_actions/00_on_actions.txt:1475）在击毁长者缇扬奇（leviathan_01_elder_tiyanki）或虚空之子（leviathan_01_voidspawn）后触发 10055 / 10075（需大档案馆DLC、同一科技，且尚未掌握该变异）。
Two kill lines: destroying an Elder Tiyanki or a Voidspawn fires 10055 / 10075 (on_ship_destroyed_perp).

## 剧情脉络 Story outline

- 每条线：触发事件（唯一选项“好极了”）→ 启动特殊项目 <种类>_UNIQUE_MUTATION_PROJECT → 项目完成后完成事件（10010 太空变形虫、10015 缇扬奇、10020 虚空虫、10025 岩居兽、10030 晶体生物）→ 授予科技 tech_unique_mutation_<种类>。
  Each line: trigger event -> special project -> completion event grants tech_unique_mutation_<kind>.
- 10055 → 项目 tiyanki_matriarch_UNIQUE_MUTATION_PROJECT → 10060 授予“恢复酶”变异；10075 → 项目 voidspawn_UNIQUE_MUTATION_PROJECT → 10080 授予“星生生物学”变异。
  10055 -> project -> 10060 gives Restorative Enzymes; 10075 -> project -> 10080 gives Starborne Biology.

## 分支与结局 Branches and outcomes

- 七条线互相独立（可全部发生），不是互斥分支。 The seven lines are independent, not alternatives.
- 每种类只会触发一次（项目进行中或已达阈值标记则不再触发）。 Each kind triggers once (project running or threshold flag set).

## 条件与文明差异 Conditions and variants

- 必须拥有大档案馆DLC与“先进可控变异”（tech_controlled_mutations_2）。 Requires the Grand Archive DLC and Advanced Controlled Mutations.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/grand_archive_events.txt, common/on_actions/00_on_actions.txt, common/inline_scripts/grand_archive/mutations/unique_mutation_trigger_check_case.txt
- 已核对 Checked：grand_archive.10000-10080 的触发、阈值与调用的 on_action；inline_script unique_mutation_trigger_check_case。
- 更正 Corrections：原先 10000、10055、10075 分成三个故事，现并为同一系列；结构（触发→项目→科技）本就正确。
  The three stories are merged into one series; the compiled trigger->project->tech structure was already right.
