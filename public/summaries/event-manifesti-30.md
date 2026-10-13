# 噤声消散 / A Hush Descends
- 分类 Category：文明纪事 Society (C7) · 派系事件 faction event
- 来源 Sources：`events/faction_events.txt:1859-1925` · `common/pop_faction_types/00_manifesti.txt:409-421`
- 审阅 Reviewed：2026-10-13（c7b-society）

## 如何开始 How it starts

马尼斐斯蒂派系创立（on_create）时安排 940 天后触发；派系消失（on_destroy）也会触发。条件：当前没有马尼斯蒂派系，或其支持度<0.35，且尚未发生过衰落（manifesti_decline）。/ Scheduled 940 days after the Manifesti faction is created (or when it is destroyed); needs no Manifesti faction or approval below 0.35, and no earlier decline.

## 剧情脉络 Story outline

**一片寂静降临（30）**：给平等/亲异族/和平的人口群打上“厌倦”标志；A 获得 2880 天“马尼斐斯蒂美梦”修正与 1800 社会研究，结束事件链；B（仅威权/军国/排外）获得 1440 天修正与同样的研究，结束事件链。/ A: 2880-day Sweet Dreams modifier + 1800 society research, chain ends; B (authoritarian / militarist / xenophobe only): 1440 days + the same research.

## 分支与结局 Branches and outcomes

A / B 互斥。/ A and B are exclusive.

## 条件与文明差异 Conditions and variants

选项B只对威权、军国或排外开放。/ B needs authoritarian, militarist or xenophobe ethics.

## 审阅记录 Review notes

- 已核对 Checked：脚本与调用。/ Script and callers.
- 审阅改动 Changes：结构无改动。/ No structural change.
