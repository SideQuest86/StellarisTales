# 环形世界建造方的请求 / Ring World builder request

- 分类 Category：银河轶事 C8 stories

## 如何开始 How it starts

随机事件（MTTH 3600 天，megastructure_events_1.txt:13-63）：你是狂热（fanatic）派系的国家、非灭绝主义，且有一个有通讯的邻国正在升级环形世界（ring_world_1/2，is_upgrading）。每国只会各发生一次（ringworld_diplomatic_event 标记）。
Random event (MTTH 3600 days, megastructure_events_1.txt:13-63): you are a fanatic empire (not homicidal) and a neighbour you can contact is upgrading a Ring World; each side is flagged so it fires once.

## 剧情脉络 Story outline

1. utopia.1：向建造方递交请求（选项a，AI权重90）或拒绝（b，获得 7200 天的“巨型结构请求被拒”修正）。
   You submit the request to the builder (a) or drop it (b, a 7200-day modifier).
2. utopia.2（5天后到达建造方）：建造方回应。
   Five days later the builder answers.
   - 接受：requester 在 5 天后收到 utopia.3 “请求被接受”、20 天后收到 utopia.5；建造方自己 20 天后收到 utopia.6；建造方的环形世界停工 20 天（set_halted = 20）。
     Accept: requester gets 3 (5 days) and 5 (20 days), builder gets 6 (20 days); the builder's upgrading Ring Worlds are halted for 20 days.
   - 拒绝：requester 5 天后收到 utopia.4 “请求被拒”，并留下“条款被拒”的观感。
     Refuse: requester gets 4 after 5 days with an opinion penalty.

## 分支与结局 Branches and outcomes

- 建造方的选项a与c互斥：由请求方是否狂热亲异/唯物/和平/平等决定（lines 152-207）；b 为 default_hide_option（AI权重90，对关系友好或弱国则为0）。
  Builder options a and c are exclusive by the requester's fanatic ethic (lines 152-207); b is a default_hide_option.
- utopia.5 / utopia.6 的奖励选项：狂热亲异、唯物、和平或平等的国家获得每月工程研究（tier2 奖励）。
  utopia.5 / 6: fanatic xenophile / materialist / pacifist / egalitarian empires get a monthly engineering-research bonus.

## 条件与文明差异 Conditions and variants

- 正文按 fanatic 伦理变体（xenophobe、authoritarian、militarist 为 v1；xenophile、materialist、egalitarian、pacifist 为 v2；spiritualist 为 v4）。
  Text varies with the fanatic ethic (v1 xenophobe/authoritarian/militarist; v2 xenophile/materialist/egalitarian/pacifist; v4 spiritualist).

## 审阅记录 Review notes

- 审阅 Reviewed 2026-10-13
- 来源 Sources：events/megastructure_events_1.txt, common/on_actions/00_on_actions.txt
- 已核对 Checked：utopia.1–6 全部触发、选项与延迟（megastructure_events_1.txt:13-414）。编译树与源码一致，无更正。
  Tree matches the source; no correction needed.
- 不确定 Uncertain：default_hide_option 在游戏界面中的具体显示规则未在文件中说明。 How default_hide_option is displayed in game is not documented in the files.
