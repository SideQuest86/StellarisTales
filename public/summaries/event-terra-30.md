# 以错为鉴 / Learning From Mistakes

- 分类 Category：银河轶事 C8 stories · 来源 Sources：events/terraforming_events.txt:688–797、common/on_actions/00_on_actions.txt:2507（on_blocker_cleared）· 审阅 Reviewed 2026-10-12

## 如何开始 How it starts

清除一个障碍矿藏时（on_blocker_cleared），若该星球带有 terraform_blocker_flag 且已没有其他“环境改造障碍”矿藏，就出现本事件，并移除该标记。
Fires when a blocker is cleared on a planet flagged terraform_blocker_flag that has no other terraforming-blocker deposit left.

## 剧情脉络 Story outline

单篇事件：图片随星球类别变化。唯一选项按已有科技推进下一项改造科技：已有生态适应 → 气候修复20%；已有地表塑形 → 生态适应40%；否则地表塑形80%。
A single event; the reward advances the next terraforming tech (20% / 40% / 80%).

## 分支与结局 Branches and outcomes

- 无分支，无后续。No branches or follow-ups.

## 条件与文明差异 Conditions and variants

- 只有图片随星球类别不同。Only the picture varies by planet class.

## 审阅记录 Review notes

- 已核对 Checked：触发条件、选项效果、调用它的 on_action。与“环境改造”完成随机池（terra.10）无调用关系，保持独立。
