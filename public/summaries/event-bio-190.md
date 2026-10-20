# 克隆：政府改革？ / Cloning: Government Reformation?

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

蜂巢意识完成“克隆”传统树时，tr_cloning_finish 的 on_enabled 触发 bio.190（common/traditions/01_cloning.txt:50-93）。非蜂巢帝国在同一时刻触发的是 bio.170/175/180（另一故事）。

When a hive mind finishes the Cloning tradition tree, the on_enabled of tr_cloning_finish fires bio.190 (common/traditions/01_cloning.txt:50-93). Non-hive empires get bio.170/175/180 instead (another story).

## 剧情脉络 Story outline

单页事件：完成克隆传统后，询问是否让政体随之改变。

One window: after finishing the Cloning tree, the hive is asked whether to reform its government accordingly.

## 分支与结局 Branches and outcomes

选择 a 设置 bio_cloning，改为克隆权力机构，符合条件的领袖获得“备份克隆体”特质，并替换相关传统效果；b 维持原状。传统的克隆大军版本（tr_cloning_finish_clone_army）同样触发此事件。

Option a sets bio_cloning, changes to the Cloning authority, gives eligible leaders the Backup Clone trait and swaps a tradition effect; b keeps the government. The Clone Army swap of the finisher (tr_cloning_finish_clone_army) fires the same event.

## 条件与文明差异 Conditions and variants

这些传统树通常经由“基因重塑”情势的完成事件 bio.40 采纳；本事件没有后续窗口。

These trees are normally adopted through the Biomorphosis completion event bio.40; this event has no follow-up window.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/traditions/01_cloning.txt:50-93; events/biogenesis_events.txt:3432
- 已核对传统 on_enabled 的蜂巢分支与 bio.190 的选项效果。
  Checked the hive branch of the tradition on_enabled and the option effects of bio.190.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
