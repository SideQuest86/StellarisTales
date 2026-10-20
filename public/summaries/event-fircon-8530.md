# 政府的特色 / Flavors of Government

- 分类 Category：文明纪事 Society (C7)

## 如何开始 How it starts

- 每五年的国家检查运行 action.620：拥有“首次接触”DLC、且与某个前超光速文明有生效协议的普通帝国，会在 0–360 天后抽取“前超光速外交事件池”（无事 200，本事件 10，条件不满足的事件被跳过）。
  The five-year country pulse runs action.620: a regular empire with the First Contact DLC and an active agreement with a pre-FTL civilization draws from the pre-FTL diplomacy pool 0-360 days later (nothing 200, this event 10; events whose conditions fail are skipped).
- 条件：与某前超光速文明有社会启蒙协议；我们不是巨企也不是格式塔；每个帝国一次。
  Conditions: a societal enlightenment agreement with a pre-FTL; we are neither a megacorp nor a gestalt; once per empire.
- 发生后设置“近期前超光速外交事件”冷却，其他此类事件暂不出现。
  Afterwards a "recent pre-FTL diplomatic event" cooldown blocks the other events of this pool for a while.
- 8530 的 random_list 各项基础权重为 0，仅当我们的政体为民主/帝制/独裁/寡头且对方政体不同时为 1，因此实际按我们的政体确定显示 8531/8535/8540/8545 中的哪一个。
  8530's random_list has base weight 0 for every entry and 1 only when our authority is democratic / imperial / dictatorial / oligarchic and theirs differs, so our authority decides which of 8531/8535/8540/8545 is shown.

## 剧情脉络 Story outline

- 「政府的特色」：他们惊讶地得知我们的政体与他们不同。
  "Flavors of Government": they are shocked that our government differs from theirs.
- “教他们我们的方式”→ 100 天后 80% 8550「渐行渐近」（他们会变得像我们）/ 20% 8555「外交分歧」；“尊重差异”→ 100 天后 8560「友谊长存，生生不息」。
  "Teach them our ways" → 100 days later 80% 8550 "More Like Us" (they become like us) / 20% 8555 "Diplomatic Differences"; "respect their differences" → 100 days later 8560 "Live Long And Let Live".

## 分支与结局 Branches and outcomes

- 四个开场事件按政体互斥，选项与后续相同；8550/8555 为 80/20 随机结果。
  The four openings are exclusive by authority and share options and follow-ups; 8550/8555 are an 80/20 random result.
- 这是可重复抽取的随机外交插曲之一（各事件本身每个帝国通常一次），与同池其他事件没有固定顺序。
  One of the random diplomacy interludes of this pool (each usually once per empire), with no fixed order relative to the others.

## 条件与文明差异 Conditions and variants

- 无额外的文明差异分支。
  No further empire-specific variants.

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-12
- 来源 Sources：`events/first_contact_dlc_events.txt:10144-10700`；`common/on_actions/00_on_actions.txt:468, 538-560`（on_five_year_random_pulse_pre_ftl）；`events/on_action_events_2.txt:3146-3179`（action.620/621）
- 已核对：分派权重修正、四个开场、选项与延迟。
  Checked: dispatcher weight modifiers, the four openings, options and delays.
