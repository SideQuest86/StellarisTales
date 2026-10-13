# 花园 / The Garden

- 分类 Category：星界裂隙 Astral rifts (C4) · DLC：星界位面 Astral Planes
- 来源 Sources：`common/astral_rifts/00_astral_rifts.txt:170`；`events/astral_rifts_1_events.txt:1438–2488`（1400–1465）
- 审阅 Reviewed：2026-10-12（全篇 whole story；原独立的失败事件 1405、1415、1430、1435 已并入 / former standalone failure events merged in）

## 如何开始 How it starts

裂隙类型从探索帝国的裂隙池中按权重抽取：权重 1。它能产出遗珍“无限之根”，所以任一帝国正在探索它时，其他帝国抽到它的权重为 0（`00_astral_rifts.txt:170–184`）。每阶段结束掷 1–10 的骰子，加技能与线索、减难度，≥14 取得突破进入下一章；许多章节同时设有失败后备事件，每次掷骰有 1.5% 的基础概率改为失败分支。第一章 1400 难度为 0。

Drawn by weight from the explorer's rift pool: weight 1. Because it can award the Infinity Root relic, its weight is 0 for others while any empire explores it (`00_astral_rifts.txt:170–184`). Each phase ends with a d10 plus skill and clues minus difficulty; 14+ is a breakthrough. Many chapters here also carry a failure fallback: each roll has a base 1.5% chance to switch to the failure branch instead. Chapter 1400 has difficulty 0.

## 剧情脉络 Story outline

这是星界裂隙中分支最多的一篇，核心是“烧”与“不烧”：

1. 荆棘（1400）：满是带刺藤蔓的洞室，空气含氧极高。烧掉杂草（→ 1410，下一章难度 −3）或提取果实（→ 1410；失败则 1405“身陷囹圄”）。
2. 身陷囹圄（1405，失败分支）：锚链被藤蔓缠住。焚烧藤蔓继续前进（→ 1410；失败则 1415“熊熊烈焰”）或起锚逃离（→ 1420）。
3. 空谷（1410）：更深的洞穴里有一个自成一体的生态系统（烧过则得星界丝缕，否则得生物学研究）。全部烧掉（→ 1425）或研究这里（→ 1440，并获得“共生果实”标本；失败则 1430“被发现”）。
4. 未知生物：一只有数百条腿、照料果实的生物出现。
   - 1425（焚烧之后）：逃（→ 1420）、不要轻举妄动（→ 1445）、把它也烧了（→ 1450；失败则 1445）。
   - 1430 / 1435（被它发现）：逃（→ 1420）或烧（→ 1450；失败则 1445）。
   - 1440（暗中观察）：烧（→ 1451，同为“无限之根”）或继续研究（→ 1455 → 1456 → 1457；每一步失败都会变成 1435“被发现”）。

The most branching rift; the core question is to burn or not:

1. Thorns (1400): a chamber of barbed vines in oxygen-rich air. Burn the weeds (→ 1410, next difficulty −3) or extract the fruit (→ 1410; on failure 1405 “Entangled”).
2. Entangled (1405, failure branch): vines bind the anchor cable. Burn them and go on (→ 1410; on failure 1415 “Conflagration”) or pull anchor (→ 1420).
3. The Hollow (1410): a self-contained ecosystem deeper in the caves (astral threads if burned, otherwise a biology research option). Burn it all (→ 1425) or study it (→ 1440 and a “symbiotic fruit” specimen; on failure 1430 “noticed”).
4. A Creature: a many-legged being that tends the fruit appears.
   - 1425 (after the fire): escape (→ 1420), do nothing (→ 1445), burn it (→ 1450; on failure 1445).
   - 1430 / 1435 (it noticed us): escape (→ 1420) or burn it (→ 1450; on failure 1445).
   - 1440 (unseen): burn it (→ 1451, also “Infinity Root”) or keep studying (→ 1455 → 1456 → 1457; any failure turns into 1435 “Noticed”).

## 分支与结局 Branches and outcomes

- 1420 逃离：生物学研究选项与大量星界丝缕。
- 1415 熊熊烈焰（失败）：探球半熔，船员全部遇难；大量星界丝缕。
- 1450 / 1451 无限之根：生物被火吓走，留下会自行扎根、显出智慧迹象的根块 → 遗珍“无限之根”。
- 1457 无限之根（暗中取得）：趁生物离开取走它埋下的根块 → 同一遗珍（不同版本标记）。
- 1445 植物物质：探球被根系占满，科学家死亡；获得星界丝缕与生物学研究；1800 天后 1465“种下种子”：科学家的心智以植物类新身体恢复，作为年轻领袖回归。
- 以上都结束探索。

- 1420 Escape: a biology research option and a large astral thread reward.
- 1415 Conflagration (failure): half the Sphere melts and all aboard die; a large astral thread reward.
- 1450 / 1451 Infinity Root: fire drives the creature off and it drops a root mass that roots itself and shows signs of intelligence → the relic Infinity Root.
- 1457 Infinity Root (taken unseen): the crew takes the root mass the creature buried → the same relic (different version flag).
- 1445 Plant Material: roots fill the Sphere and the scientist dies; astral threads and biology research; 1800 days later 1465 “Seeds Sown”: the scientist's mind is restored in a plantoid body and they return as a young leader.
- All of these end the exploration.

## 条件与文明差异 Conditions and variants

- 是否焚烧过（裂隙标记 has_burnt_anything）决定 1410、1425 的正文和后续图片。
- “演化猎手”起源在 1420、1445、1450/1451/1457 看到专属选项，额外获得植物类 DNA 与局势进度。
- 原文差异：1445 中文标题作“行星物质”，英文为 Plant Material（植物物质）。

- Whether anything was burned (rift flag has_burnt_anything) selects the texts of 1410 and 1425 and later pictures.
- Evolutionary Predators empires see exclusive options in 1420, 1445 and 1450/1451/1457 with extra plantoid DNA and situation progress.
- Localisation difference: the Chinese title of 1445 reads “行星物质” (planet material); the English is “Plant Material”.

## 审阅记录 Review notes

- 已核对：裂隙定义与遗珍锁定；1400–1465 全部事件；九处 `on_roll_failed`（1400.b→1405、1405.a→1415、1410.b→1430、1425.c/1430.b/1435.b→1445、1440.b/1455.a/1456.a→1435，见各桥接证据行号）；1445 的科学家死亡、克隆放逐与 1800 天后的 1465。
- 修正：V3 只记录了花园的部分失败分支；V4 源图仍漏读块内 `on_roll_failed`，1405/1415/1430/1435 曾被编成四个独立故事。已用九条桥接全部并入，并以互斥组说明成功/失败配对。

- Checked: rift definition and relic lock; every event 1400–1465; all nine `on_roll_failed` fallbacks (1400.b→1405, 1405.a→1415, 1410.b→1430, 1425.c/1430.b/1435.b→1445, 1440.b/1455.a/1456.a→1435; see line numbers in the bridge evidence); the death, exiled clone and 1800-day return (1465) in 1445.
- Correction: V3 recorded only part of the garden's failure branches; the V4 source graph still misses in-block `on_roll_failed`, so 1405/1415/1430/1435 had become four separate stories. All nine bridges now merge them, with exclusive groups describing the success/failure pairs.
