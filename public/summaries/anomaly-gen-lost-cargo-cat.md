# 古怪读数 / Odd Readings

- 分类 Category：深空异闻 Exploration (C3)
- 来源 Sources：`common/anomalies/02_anomaly_categories.txt:56-74` · `events/anomaly_events_3.txt:274-546 (4015-4018)` · `events/anomaly_events_3.txt:2643-2727 (4085-4086)` · `common/special_projects/00_projects_3.txt:217-248` · `events/failures.txt:270-295` · `common/on_actions/00_on_actions.txt:2265-2269`
- 审阅 Review：2026-10-12（c3b-exploration）· 已审阅 Reviewed

## 如何开始 How it starts

- 6级异常；在小行星上以权重3生成。  
  Level-6 anomaly; spawn weight 3 on asteroids.
- 约30天后另有一份通用联络报告（story.1–8，共享枢纽故事），不属于本故事。  
  About 30 days later a generic contact report (story.1–8, a shared hub story) follows; it is not part of this story.

## 剧情脉络 Story outline

- 两个结果各权重1：  
  Two outcomes, weight 1 each:
- **最后休憩**（4015）：小行星带中一具外星航天员的仪式棺椁。任其继续航行（社会学研究）；或打开研究（非狂热亲外、非进化掠食者）/ 带回博物馆展出（狂热亲外或纪念主义者）/ 进化掠食者打开舱体：三者都获得研究，并由隐藏事件4018在1–8跳内给一个尚未接触的帝国记下“亵渎遗体”。  
  **The Final Rest** (4015): an alien spacefarer's ritual coffin. Let it drift (society research), or open it / display it in a museum (fanatic xenophile or memorialist) / open the pod (Evolutionary Predators): these give research, and hidden 4018 marks an uncontacted empire 1–8 jumps away as having had its dead defiled.
- **漂泊**（4085）：小行星间一艘漂流外星飞船。救援 → 45天项目（需工程船或方舟舰队，限时1080天），或拆解得合金。  
  **Adrift** (4085): a drifting alien ship. Rescue it (45-day project; constructor or arkship; 1,080-day limit) or scrap it for alloys.

## 分支与结局 Branches and outcomes

- 救援完成 → 4086 船员遭谋杀的现场：改装为信使级科研船，或拆解研究引擎（陆军移动速度修正）。超时 → anomaly_failure.4086 小行星撞毁飞船。  
  Rescue → 4086 a murder scene: refit it as a Courier science ship or study its engines; on timeout anomaly_failure.4086 an asteroid destroys it.
- 若此后与被亵渎遗体的帝国建立通讯：on_post_communications_established 触发隐藏 4016，5天后 4017：对方帝国当面谴责（窗口标题为对方国名），好感下降（按思潮措辞）。4017 也出现在通用通讯故事中。  
  If communications are later established with that empire: hidden 4016 (on_post_communications_established) fires 4017 five days later: that empire confronts us (the window title is its name), lowering their opinion. 4017 also appears in the generic communications story.

## 条件与文明差异 Conditions and variants

- anomaly_failure.4086 对唯物或尚武帝国另有“货物更重要”选项。  
  anomaly_failure.4086 offers materialist or militarist empires "The cargo was more important".

## 审阅记录 Review notes

- 已核对 Checked：类别、4015–4018、4085/4086、项目、失败事件与通讯建立回调。  
  Category, 4015–4018, 4085/4086, project, failure event and the communications on_action.
- 更正 Corrections：新增4015三个“打开/展出”选项到4017的状态连接（亵渎遗体的后果），原来缺失。  
  Added the state-triggered link from the three "open/display" options of 4015 to 4017 (the consequence of defiling the corpse), previously missing.
- 覆盖 Coverage：7 个文档全部核对 / all 7 docs checked.
