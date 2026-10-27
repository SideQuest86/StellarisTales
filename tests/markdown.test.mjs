import test from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown, splitMixed, inline, detectLang, hasCJK, safeUrl, metaLine } from "../src/markdown.js";
import { cleanEnglish, cleanChinese } from "../src/name-tooltip.js";

test("block constructs", () => {
  const h = renderMarkdown("# Title\n\nPara one\nstill one.\n\n- a\n- b\n\n1. x\n2. y\n\n> quote");
  assert.match(h, /<h3[^>]*>Title<\/h3>/);
  assert.match(h, /<p[^>]*>Para one still one\.<\/p>/);
  assert.match(h, /<ul><li[^>]*>a<\/li><li[^>]*>b<\/li><\/ul>/);
  assert.match(h, /<ol>/);
  assert.match(h, /<blockquote[^>]*>quote<\/blockquote>/);
  assert.match(renderMarkdown("##### deep ####"), /<h5/);
});
test("inline constructs", () => {
  assert.equal(inline("**b** and *i* `distar.1030`"), "<strong>b</strong> and <em>i</em> <code>distar.1030</code>");
  assert.match(inline("[x](https://e.com/a)"), /<a href="https:\/\/e\.com\/a" rel="noopener noreferrer" target="_blank">x<\/a>/);
  assert.match(inline("[x](#sec)"), /href="#sec" rel="noopener noreferrer">x/);
  assert.doesNotMatch(inline("[x](./a.md)"), /target/);
});
test("a bilingual heading's separator belongs to neither half", () => {
  const h = renderMarkdown("# 强制重置 / Forced Reset");
  assert.match(h, /<span lang="zh-CN" data-lang="zh">强制重置<\/span> <span lang="en" data-lang="en">Forced Reset<\/span>/);
  assert.match(renderMarkdown("## 如何开始 How it starts"), /data-lang="zh">如何开始<\/span> <span lang="en" data-lang="en">How it starts</);
  assert.match(renderMarkdown("### 一、风暴期（第 0–1095 天）/ The storm (days 0–1,095)"), /data-lang="zh">一、风暴期（第 0–1095 天）<\/span> <span lang="en" data-lang="en">The storm \(days 0–1,095\)</);
});
test("XSS", () => {
  for (const bad of ['<script>alert(1)</script>', '[x](javascript:alert(1))', '[x](data:text/html,hi)', '<img src=x onerror=alert(1)>', '![i](http://e.com/a.png)', '[a"onmouseover="x](http://e.com)', '[x](http://e.com/"onclick="y)', '`<b>`']) {
    const h = renderMarkdown(bad);
    assert.doesNotMatch(h, /<script|<img|javascript:|data:|onerror=|<b>|"onmouseover|href="[^"]*"[^>]*onclick/i, bad);
  }
  assert.equal(inline("[x](javascript:alert(1))"), "x");
  assert.equal(safeUrl("JaVaScRiPt:alert(1)"), null);
  assert.equal(safeUrl("vbscript:x"), null);
});
test("language detection", () => {
  assert.equal(detectLang("这是一个段落"), "zh");
  assert.equal(detectLang("This is a paragraph about distar.1030"), "en");
  assert.equal(detectLang("12345"), "");
  assert.ok(hasCJK("a中"));
  const h = renderMarkdown("中文段落。\n\nEnglish twin.");
  assert.match(h, /data-lang="zh"/);
  assert.match(h, /data-lang="en"/);
});
test("name clean-up", () => {
  assert.equal(cleanEnglish("the the empire"), "The empire");
  assert.equal(cleanEnglish("the our empire"), "Our empire");
  assert.equal(cleanEnglish("Go to the this planet"), "Go to this planet");
  assert.equal(cleanEnglish("Hello. our empire"), "Hello. Our empire");
  assert.equal(cleanChinese("我们的帝国帝国"), "我们的帝国");
  assert.equal(cleanChinese("正常的文字"), "正常的文字");
});

test("review notes are collapsed at the end; mixed lines split per language", () => {
  const md = "## 如何开始 How it starts\n\n开始于第一个事件。It begins with the first event in the chain.\n\n## 审阅记录 Review notes\n\n- 已核对 / Checked：全部来源。Every source was read in full and compared.\n\n## 分支与结局 Branches\n\n结局很多。";
  const h = renderMarkdown(md, { lang: "en" });
  assert.match(h, /<details class="md-review"><summary>Review notes<\/summary>/);
  assert.ok(h.indexOf("md-review") > h.indexOf("结局很多"));
  assert.doesNotMatch(h.slice(0, h.indexOf("md-review")), /Every source/);
  assert.match(h, /data-lang="zh">开始于第一个事件。<\/span> <span[^>]*data-lang="en">It begins/);
  assert.match(h, /<h4[^>]*data-mixed="1"><span[^>]*data-lang="zh">如何开始<\/span> <span[^>]*data-lang="en">How it starts/);
  assert.match(renderMarkdown(md, { lang: "zh" }), /<summary>审阅记录<\/summary>/);
  assert.equal(splitMixed("纯中文没有英文。"), null);
  // An English name inside the Chinese half is not the boundary; bold markers may open the English half.
  const [zh, en] = splitMixed("**五处遗址依次连锁**：Ex Gravitas（1200 → 1205）→ 3 天后“静待揭晓”（1220–1235）→ “深埋”。 **Five chained sites**: Ex Gravitas -> Something Waiting -> Buried Deep.");
  assert.match(zh, /静待揭晓.*深埋/);
  assert.match(en, /^\*\*Five chained sites/);
  assert.deepEqual(splitMixed("**游戏中期之后（五年脉冲）**： **After mid-game (five-year pulse)**:"), ["**游戏中期之后（五年脉冲）**：", "**After mid-game (five-year pulse)**:"]);
});

test("an English half that opens with an event number splits after the guides' slash only", () => {
  const line = "9005：科研船与科学家在坐标处消失，获得大量物理研究。320–360天后 9010“谜团重现”：信号点名第二位领袖。/ 9005: the science ship vanishes with its scientist, leaving a large physics reward.";
  const [zh, en] = splitMixed(line);
  assert.match(zh, /谜团重现.*第二位领袖。$/);
  assert.match(en, /^9005: the science ship/);
  assert.equal(splitMixed("约320–360天后 9010“谜团重现”：信号点名第二位领袖。"), null);
  assert.deepEqual(splitMixed("275只在缺少推进器2科技时出现。   275 only appears when the empire lacks Thrusters II."), ["275只在缺少推进器2科技时出现。", "275 only appears when the empire lacks Thrusters II."]);
  assert.equal(splitMixed("信号点名第二位领袖。 9010“谜团重现”：再过 30 天出发。"), null);
  // Script identifiers do not make the Chinese half English.
  const [z2, e2] = splitMixed("风暴离开星系时（on_storm_left_system，common/on_actions/00_on_actions.txt:5421）随机事件：75%无事、5%隐藏事件cstorms.5、20%隐藏事件cstorms.10。 When a storm leaves a system (on_storm_left_system) a random event fires: 75% nothing.");
  assert.match(z2, /cstorms\.10。$/);
  assert.match(e2, /^When a storm leaves/);
  // A Latin word inside the Chinese half ("没有 DLC 检查") is not where the English starts.
  const [z3, e3] = splitMixed("DLC：“视界信号”故事包（本地安装为 `dlc013_horizon_signal`；事件脚本本身没有 DLC 检查）/ Horizon Signal story pack (the event scripts contain no DLC check)");
  assert.match(z3, /没有 DLC 检查）$/);
  assert.match(e3, /^Horizon Signal story pack/);
  // A Chinese term quoted near the start of the English half does not stop the split.
  assert.deepEqual(splitMixed("天灾事件在危机开始时触发。 The \"天灾\" event fires when the crisis begins in earnest and every empire in the galaxy feels it."), ["天灾事件在危机开始时触发。", "The \"天灾\" event fires when the crisis begins in earnest and every empire in the galaxy feels it."]);
  // A bold bilingual lead over a body in one language: the body keeps its own label.
  const lead = renderMarkdown("- **第一位领袖消失 The first leader is lost.** 科研船与科学家在坐标处消失，获得大量物理研究。");
  assert.match(lead, /<\/strong> <span lang="zh-CN" data-lang="zh">科研船/);
  // An identifier ending the Chinese half stays with it; the slash after it is the boundary.
  assert.deepEqual(splitMixed("设置 weather_manipulator_found，并结束事件链 cs_inetian_chain / a new, unused device and a warning."), ["设置 weather_manipulator_found，并结束事件链 cs_inetian_chain", "a new, unused device and a warning."]);
  // A later boundary after a full stop wins when the first one would leave Chinese in the English half; not mid-citation.
  const care = "2062：a同意→2063→项目FERROPHAGE_CURE→2066（获得奖励）；c离开→2065（对方给“碎片整理器”）；d（灵性）→2064。   2062: a agrees → 2063 → project FERROPHAGE_CURE → 2066 (reward); c leaves → 2065; d (spiritual) → 2064.";
  assert.match(splitMixed(care)[0], /d（灵性）→2064。$/);
  assert.match(splitMixed(care)[1], /^2062: a agrees/);
  assert.deepEqual(splitMixed("来源 Sources：events/leviathans_events_1.txt:3051（285）, :3152（300 菜单 menu）, :3447–4512（304–345）; events/observer_events.txt:245–261")[0], "来源");
  // The metadata line under a guide's title: each page its own half; identifiers and English-only names on both.
  assert.deepEqual(metaLine("分类 Category：先驱者与考古 Precursors · DLC：《远古遗物》Ancient Relics"), ["分类：先驱者与考古 · DLC：《远古遗物》", "Category: Precursors · DLC: Ancient Relics"]);
  assert.deepEqual(metaLine("分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）"), ["分类：深空异闻 · DLC：《遥远繁星》（has_distar）", "Category: Exploration · DLC: Distant Stars (has_distar)"]);
  // Free-form notes mixing both languages keep the whole line (it shows on both pages).
  assert.equal(metaLine("分类 Category：深空异闻 Exploration · DLC：《遥远繁星》Distant Stars（仅 distar.1055 分支 only the distar.1055 branch）"), null);
  assert.equal(metaLine("分类 Category：探索 Exploration · DLC：《遥远繁星》Distant Stars（has_distar）或 Biogenesis（has_biogenesis_dlc）"), null);
  assert.deepEqual(metaLine("分类 Category：起源 Origins · DLC：Shadows of the Shroud · 审阅 Reviewed 2026-10-13"), ["分类：起源 · DLC：Shadows of the Shroud", "Category: Origins · DLC: Shadows of the Shroud"]);
  assert.deepEqual(metaLine("分类 Category：起源 Origins · DLC：Shadows of the Shroud"), ["分类：起源 · DLC：Shadows of the Shroud", "Category: Origins · DLC: Shadows of the Shroud"]);
  assert.deepEqual(metaLine("分类 Category：巨兽与城邦 Leviathans & enclaves"), ["分类：巨兽与城邦", "Category: Leviathans & enclaves"]);
  assert.match(renderMarkdown("- 分类 Category：深空异闻 Exploration"), /<li data-mixed="1"><span lang="zh-CN" data-lang="zh">分类：深空异闻<\/span> <span lang="en" data-lang="en">Category: Exploration<\/span><\/li>/);
  // An English half may open with a single quote ("“成交”或“不成交”。'Deal' or 'No deal'.").
  assert.deepEqual(splitMixed("佣兵城邦基金会：“成交”或“不成交”。 'Deal' or 'No deal' are the two options here."), ["佣兵城邦基金会：“成交”或“不成交”。", "'Deal' or 'No deal' are the two options here."]);
  // An identifier with the Chinese sentence's stop before the guides' slash stays Chinese.
  assert.match(splitMixed("失败的掷骰从本遗址自己的池中抽取 site_fossilized_jellyfish_random_events。 / Failed rolls draw from this site's own pool.")[0], /random_events。$/);
  // A script identifier ending a Chinese sentence is not an English half.
  assert.equal(splitMixed("冰冻星球可能生成（4级，权重3，全局一次 max_once；需要 has_shroud_dlc）。"), null);
  // A list item in one language carries its label (it showed on both pages); a neutral one stays unlabelled.
  const items = renderMarkdown("- 无后续。\n- No follow-up events at all.\n- 2026-10-13");
  assert.match(items, /<li lang="zh-CN" data-lang="zh">无后续。<\/li>/);
  assert.match(items, /<li lang="en" data-lang="en">No follow-up/);
  assert.match(items, /<li>2026-10-13<\/li>/);
  // A bold lead naming the item in both languages belongs to both halves.
  const h = renderMarkdown(`1. **第一位领袖消失 The first leader is lost.** ${line}`);
  assert.match(h, /<strong><span[^>]*data-lang="zh">第一位领袖消失<\/span> <span[^>]*data-lang="en">The first leader is lost\.<\/span><\/strong>/);
  assert.match(h, /data-lang="en">9005: the science ship/);
  assert.doesNotMatch(h.slice(h.lastIndexOf('data-lang="en"')), /科研船/);
});

