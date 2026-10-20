# 怪异空间站 / Strange Station

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1；若银河中已存在镜像帝国，或帝国为“裂隙世界”起源，则为 0（`00_astral_rifts.txt:202–220`）。开始探索时，隐藏事件 astral_rift.1699 复制探索帝国的物种与政体，创建一个“镜像帝国”，并把一种思潮反转（优先反转狂热思潮；格式塔帝国的镜像变为狂热平等），同时记下反转的是哪一种。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 进入下一章；第一章 1600 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1, or 0 if a mirrored empire already exists or for the Riftworld origin (`00_astral_rifts.txt:202–220`). When exploration starts, hidden event astral_rift.1699 copies the explorer's species and government into a “mirrored empire” with one ethic inverted (fanatic ethics first; a gestalt explorer's mirror becomes fanatic egalitarian) and records which one. Each phase ends with a d10 plus skill and clues minus difficulty; 14+ opens the next chapter. Chapter 1600 has difficulty 0.

## 剧情脉络 Story outline

1. 穿过镜面（1600）：裂隙彼端是一座像本帝国恒星基地的空间站，对方说着本帝国的语言——一个与本帝国几乎相同、只在一种理念上截然相反的文明。研究他们的人民（→ 1605 历史课：社会学研究）或舰队（→ 1610：工程研究）；格式塔帝国只有一个选项（→ 1611 破碎心智：凝聚力）。
2. 外交机会（1615）：对方希望建立友谊。接受（→ 1620）或拒绝（→ 1625）。灭绝主义帝国则进入 1616“够了”，只能拒绝（→ 1625）。

1. Through the Mirror (1600): beyond the rift is a station like one of the empire's own starbases, hailing in the empire's own language — a civilisation almost identical to the explorer, opposite in one ideal. Study their people (→ 1605 History Lesson: society research) or their fleets (→ 1610: engineering research); gestalt empires have a single option (→ 1611 Fractured Mind: unity).
2. Diplomatic Opportunity (1615): the mirror offers friendship. Accept (→ 1620) or spurn it (→ 1625). Exterminator empires reach 1616 “Enough” instead and can only spurn (→ 1625).

## 分支与结局 Branches and outcomes

- 1620 新友谊：与镜像帝国建立友好关系与通讯，此后可跨裂隙贸易；10 年“新友谊”与社会学研究；格式塔帝国另得“破碎大使”。随后隐藏事件 astral_planes.1690 让镜像帝国复制本帝国的资源与收入。
- 1625 敌意：获得凝聚力与星界丝缕。
- 两者都结束探索；探索结束时 1698 清除镜像帝国的全局引用。

- 1620 New Friendship: friendly relations and communications with the mirrored empire, making trade across the rift possible; 10 years of New Friendship and society research; gestalt empires also gain Fractured Ambassadors. Hidden event astral_planes.1690 then copies the explorer's resources and incomes to the mirror.
- 1625 Enmity: unity and astral threads.
- Both end the exploration; at exploration end 1698 clears the mirrored empire's global reference.

## 条件与文明差异 Conditions and variants

- 1600、1605、1610 的正文按被反转的思潮（唯物/唯心、军国/和平、亲外/排外、威权/平等）或格式塔分九个版本；1615、1620 另有排外、格式塔版本；1625 按格式塔与灭绝主义分四个版本。这些版本取决于 1699 记下的裂隙标记 explorer_is_*，网站目前把它们显示为未解析条件。

- 1600, 1605 and 1610 have nine texts, one per inverted ethic pair (materialist/spiritualist, militarist/pacifist, xenophile/xenophobe, authoritarian/egalitarian) plus gestalt; 1615 and 1620 have xenophobe and gestalt versions; 1625 has four versions by gestalt and exterminator. These follow the rift flags explorer_is_* written by 1699, which the site currently shows as unresolved conditions.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-12（全篇 whole story）
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:202`；`events/astral_rifts_1_events.txt:3285–3985`（1600–1625、1690、1698、1699）；`common/on_actions/00_on_actions.txt:4984–4992`
- 已核对：裂隙定义与权重修正；on_astral_rift_exploration_start 的 1699（创建镜像帝国）与 on_astral_rift_exploration_complete 的 1698；1600–1625 全部事件；1620 对 astral_planes.1690 的调用。没有失败分支；编译结构正确，补充互斥组、结局与说明。

- Checked: the rift definition and its weight modifiers; 1699 on on_astral_rift_exploration_start (creating the mirror) and 1698 on on_astral_rift_exploration_complete; every event 1600–1625; the call to astral_planes.1690 from 1620. No failure branch; the compiled structure was correct; exclusive group, endings and a note added.
