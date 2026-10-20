# 矿石精炼 / Minerals Refining

- 分类 Category：C8 银河轶事 / Galactic miscellany

## 如何开始 How it starts

这是一份选举“承诺”（mandate）事件链的定义：文本写着统治者因某项竞选纲领当选，并在任期内/任期末完成它即可获得奖励。但整个游戏脚本中没有任何地方启动该事件链（无 begin_event_chain、任务、决议或事件引用），因此在已安装的游戏中无法自然出现。

This is the definition of an election "mandate" event chain: the text says the ruler was elected on a platform and is rewarded for fulfilling it during or by the end of the term. No script in the whole game starts the chain (no begin_event_chain, mission, decision or event references it), so it cannot appear naturally in the installed game.

## 剧情脉络 Story outline

事件链只有一个计数器，要求：每月矿物盈余达到 +30（counter generic_mandate_fulfilled，max 1）。（common/event_chains/00_mandate_chains.txt:129）

The chain has a single counter and asks: Reach a monthly mineral surplus of +30 (counter generic_mandate_fulfilled, max 1). (common/event_chains/00_mandate_chains.txt:129)

## 分支与结局 Branches and outcomes

奖励：相当于 6 个月产出的凝聚力（上限 1000）。 没有分支；也没有任何脚本推进计数器。

Reward text: 6 months' worth of unity (max 1000). There are no branches, and no script advances the counter.

## 条件与文明差异 Conditions and variants

同组共有20条承诺事件链（矿业、研究、净化、造船、财政、解放、分离、和平、奴役、归还、五种月度盈余、四种区划），结构相同，仅计数器与描述不同。

There are 20 sibling mandate chains (mining, research, purge, shipwright, fiscal, emancipation, separatist, peacemaker, slaver, repatriator, five monthly-surplus kinds, four district kinds) with identical structure; only counter and description differ.

## 审阅记录 Review notes

- 审阅 Reviewed：2026-10-13（已审阅 reviewed）
- 来源 Sources：`common/event_chains/00_mandate_chains.txt:129`; `localisation/english/mandates_l_english.yml`; `common/static_modifiers/01_static_modifiers.txt:237`
- 本文为人工审阅导读（评注），不是游戏原文；原文见阅读器。 / Reviewer guide (commentary), not original game text; the original text is in the reader.
检索了安装目录下全部脚本与本地化，未发现启动者或计数器推进者；标记为 unreachable（遗留内容）。引擎代码是否仍在启动承诺无法从脚本判断。

All scripts and localisation in the install were searched; no starter or counter-advancer exists, so the card is flagged unreachable (legacy content). Whether engine code still starts mandates cannot be seen in script.
