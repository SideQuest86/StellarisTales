# 外星飞船被俘获！ / Alien Ship Captured!（敌对首次接触 hostile first contact）
- 分类 Category：文明纪事 Society (C7) · 首次接触阶段链 first-contact stage chain（首个事件 first_contact.250）
- 来源 Sources：`events/first_contact_events.txt:2379–5410` · `common/first_contact/00_first_contact.txt:1134–1545`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

当“允许攻击”政策的本方在第一阶段事件（5/10/20/25）选择攻击，阶段设为 default_hostile_ship_stage（难度2）；在 15（已知有人居住的系统）选择攻击则进入 default_hostile_systems_stage（绑架）。/ With the attack-allowed policy, the attack option of the stage-1 events (5/10/20/25) enters the hostile-ship stage; in 15 (inhabited systems known) it enters the hostile-systems (abduction) stage.

## 剧情脉络 Story outline

1. **夺船**（敌对飞船阶段）按权重得到一个结果：**250 外星飞船被俘获！**（带船员）/ **260** 俘获但无幸存者 / **270 空壳**（飞船自毁）/ **280 失败**（对方逃脱）。/ One outcome of the ship capture.
2. **250** 选项：审问、活体解剖、灭口/吞食；对方分别收到 252/253/254。**260** → 无船员收尾，对方收到 262。**270**、**280** 的“再试一次”→ 绑架阶段；对方可收到 272 / 282。/ Captors choose; failures can retry via abduction.
3. **绑架**（敌对系统阶段）：**320 外星人被俘获**（成功，选项同 250）、**330 绑架失败**、**321 一次不幸的失误**；对方收到 322 / 332。/ Abduction outcomes 320 / 330 / 321.
4. 收尾：**285 审讯完成**、**290 外星研究完成**（活体解剖）、**295 外星材料研究**（无活口）。/ End events 285 / 290 / 295.

## 分支与结局 Branches and outcomes

- 夺船结果 250/260/270/280 互斥；绑架结果 320/330/321 互斥；处置俘虏 285/290/295 互斥。/ Exclusive sets.
- 285/290/295 之后调用 finish_first_contact_effect；若对方也有反向接触，30 天后会收到 1100/1105/1110（见各自单页）。/ 285/290/295 finish first contact; the victim receives 1100/1105/1110 30 days later via reverse first contact.

## 条件与文明差异 Conditions and variants

250/252–254 有多物种、机械受害者、蜂巢受害者、荒野受害者等文本；选项C仅灭绝倾向可见，吞噬蜂群有专门选项。/ Many text variants by victim type; option C needs homicidal ethics, devouring swarms get a dedicated option.

## 审阅记录 Review notes

- 已核对 Checked：250–332 脚本、敌对飞船/系统阶段、五个“敌对收尾”阶段。
- 审阅改动 Changes：原 250（夺船）与 320（绑架）两篇并为一棵树（270/280 的“再试一次”本来就通向绑架），并把共享收尾 285/290/295 收为章节；1100/1105/1110 作为反向接触单页保留。/ The separate ship-capture and abduction stories (250 and 320) are now one tree because the retry options lead from one to the other; the shared end events 285/290/295 are chapters.
