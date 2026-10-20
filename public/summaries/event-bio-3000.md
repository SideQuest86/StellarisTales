# 深思熟虑 / Think Carefully

- 分类 Category：C8 银河轶事 / C8 Galactic miscellany · DLC: BioGenesis

## 如何开始 How it starts

舰队进入蜂巢失落帝国的“最后思绪”星系（last_thought_system）时，若战争、生长、控制三个碎片都存在且我方未与战争碎片交战，首次触发 bio.3000（on_entering_system_fleet；biogenesis_events.txt:7087-7110）。

When a fleet enters the hive Fallen Empire's Last Thought system while the War, Growth and Control fragments all exist and we are not at war with the War fragment, bio.3000 fires the first time (on_entering_system_fleet; biogenesis_events.txt:7087-7110).

## 剧情脉络 Story outline

三个碎片异口同声发出警告。选择紧急跃迁则舰队撤回本土；拒绝离开则立即接到“二次思考”bio.3005。之后每次再进入该星系（相隔至少180天，且没有未决要求）都会再次触发 bio.3005，是重复出现的警告。

The three fragments speak in unison with a warning. Emergency FTL sends the fleet home; refusing to leave brings Second Thought bio.3005 at once. Afterwards bio.3005 fires again on later entries (at least 180 days apart, with no pending demand): a repeating warning.

## 分支与结局 Branches and outcomes

bio.3005：再次紧急跃迁则无事；坚持“要得到你们的秘密”会令三个碎片对我方产生敌意修正，并使“被遗忘”的碎片舰队与我方敌对（L7193-7208）。

bio.3005: jumping away again ends it; insisting "We will have your secrets" gives all three fragments a hostile opinion and turns the forgotten fragment's fleets hostile (L7193-7208).

## 条件与文明差异 Conditions and variants

原文英文称该星系为“Final Thought”，星系名本地化为“最后思绪 / Last Thought”。

The English text calls it the "Final Thought system"; the system name is localised as Last Thought.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：common/on_actions/00_on_actions.txt:1068-1069; events/biogenesis_events.txt:7071-7210
- 已核对两事件的触发、标记与选项效果；重复出现用回到自身的连接表示。
  Checked triggers, flags and options of both events; the repetition is shown as a link back to bio.3005.
- （以上为审阅者撰写的说明，不是游戏原文；原文见阅读页。）
  (Commentary written by the reviewer, not game text; the original text is in the reader.)
