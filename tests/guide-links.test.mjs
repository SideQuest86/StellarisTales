import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize, namespaces, dropEcho, foldEchoes, foldNamed } from "../src/guide-links.js";

const ids = new Set(["origin.1199", "origin.1200", "origin.1205", "origin.1310", "story.5", "anomalies:DISTAR"]);
const spaces = namespaces(ids);
const ids_ = (parts) => parts.filter((p) => typeof p !== "string" && !p.muted).map((p) => p.id);

test("namespaces orders by frequency", () => {
  assert.deepEqual(spaces, ["origin", "story"]);
});

test("full ids and bare numbers in a chain become documents", () => {
  assert.deepEqual(ids_(tokenize("隐藏事件 origin.1199 创建遗址（1200 → 1205）", ids, spaces)), ["origin.1199", "origin.1200", "origin.1205"]);
  assert.deepEqual(ids_(tokenize("1305 continues with 1310, others with 1330", ids, spaces)), ["origin.1310"]);
  assert.deepEqual(ids_(tokenize("a generic contact report (story.5) fires", ids, spaces)), ["story.5"]);
});

test("quantities, years and unknown ids are left alone", () => {
  for (const s of ["约 1200 天后", "weight 1200 of 1500", "base 1205", "1200% more", "in 1200 years", "第 1205 篇", "1200/1500", "v1200"]) {
    assert.deepEqual(ids_(tokenize(s, ids, spaces)), [], s);
  }
});

test("full ids that are no document stay, dimmed", () => {
  const parts = tokenize("hidden origin.9999 fires", ids, spaces);
  assert.deepEqual(parts.filter((p) => typeof p !== "string"), [{ raw: "origin.9999", muted: true }]);
});

test("a quoted name that the link already shows is not repeated", () => {
  assert.equal(dropEcho("The Horizon Signal", ' "The Horizon Signal", once per game'), ", once per game");
  assert.equal(dropEcho("灰蛊风暴", "“灰蛊风暴”触发后"), "触发后");
  assert.equal(dropEcho("The Horizon Signal: REPRISE", ' "Reprise" names a second leader'), " names a second leader");
  // A choice or a line of dialogue after the link stays.
  assert.equal(dropEcho("The Horizon Signal", ' "Send the ship" begins the chain'), ' "Send the ship" begins the chain');
  assert.equal(dropEcho("The Horizon Signal", " fires"), " fires");
  assert.equal(dropEcho("Reaching Into the Rift", ' "Other" fires'), ' "Other" fires');
  assert.equal(dropEcho("奥伏戎的愤怒", "（奥伏戎的愤怒）。"), "。");
  assert.equal(dropEcho("C.A.R.E交互界面", "（获得奖励）；"), "（获得奖励）；");
  // the label written out unquoted right after the id is an echo too, but only as a whole word or phrase
  assert.equal(dropEcho("真菌通讯", " 真菌通讯 → "), " → ");
  assert.equal(dropEcho("Blackmail", " blackmail, C abort"), ", C abort");
  assert.equal(dropEcho("The Horizon Signal", " The Horizon Signal, once per game"), ", once per game");
  assert.equal(dropEcho("真菌", " 真菌通讯 → "), " 真菌通讯 → ");
  assert.equal(dropEcho("Signal", " Signals fade"), " Signals fade");
  // A quote closes with its own mark (a bracket inside is part of it), and a name written with the game's placeholder is the title.
  assert.equal(dropEcho("天上正在下生物！", "「天上正在下（物种名）！」：牵引光束"), "：牵引光束");
  assert.equal(dropEcho("战胜帝国", "（“战胜……”，败方臣服于帝国）"), "（“战胜……”，败方臣服于帝国）");
  assert.equal(dropEcho("失去遗珍！", "“于……失去遗珍！”。"), "");
});

test("a bold 'id name' names its document: the written name is the link", () => {
  const link = (text) => ({ id: "x.1", raw: "2006", text });
  const show = (parts) => parts.map((p) => (typeof p === "string" ? p : `[${p.text}]`)).join("");
  assert.equal(show(foldNamed([link("宗教狂热"), " 宗教狂热"])), "[宗教狂热]");
  assert.equal(show(foldNamed([link("军阀的崛起"), " 军阀崛起"])), "[军阀崛起]");
  // (a Chinese name whose space trimGlueSpaces has already taken)
  assert.equal(show(foldNamed([link("局势变换"), "情势变化"])), "[情势变化]");
  assert.equal(show(foldNamed([link("碰撞"), " 碰撞 / ", link("损失舰船"), " 损失舰船"])), "[碰撞] / [损失舰船]");
  assert.equal(show(foldNamed([link("A"), " / ", link("B"), " 联合演习失败"])), "[A] / [联合演习失败]");
  // A range's shared name is not the last document's: "2030–2037 伦理变化" keeps both titles.
  assert.equal(show(foldNamed([link("T2030"), "–", link("T2037"), " 伦理变化"])), "[T2030]–[T2037] 伦理变化");
});

test("an id right after the name it would show: the written name becomes the link", () => {
  const link = (text, id = "origin.1200") => ({ id, raw: "1200", text });
  const show = (parts) => parts.map((p) => (typeof p === "string" ? p : `[${p.text}${p.lead ? "^" : ""}]`)).join("");
  assert.equal(show(foldEchoes(["第1000天：大召唤（", link("大召唤"), "）。"])), "第1000天：[大召唤]。");
  assert.equal(show(foldEchoes(["empires see “Reaching Into the Rift” (", link("Reaching Into the Rift"), "),"])), "empires see “[Reaching Into the Rift]”,");
  assert.equal(show(foldEchoes(["或“交织的喜悦”（", link("交织的喜悦"), "，组织者想留下）"])), "或“[交织的喜悦]”（组织者想留下）");
  assert.equal(show(foldEchoes(["see “Reprise” (", link("The Horizon Signal: REPRISE"), ", the second leader) next"])), "see “[Reprise]” (the second leader) next");
  assert.equal(show(foldEchoes(["The Horizon Signal (", link("The Horizon Signal"), ", the first) rest"])), "[The Horizon Signal] (the first) rest");
  assert.equal(show(foldEchoes(["a 选项接“超能限制”", link("超能限制"), "、b"])), "a 选项接“[超能限制]”、b");
  assert.equal(show(foldEchoes(["（", link("璞玉浑金"), "）：行星"], () => "璞玉浑金")), "[璞玉浑金^]：行星");
  assert.equal(show(foldEchoes([" (", link("The Summons"), "): the end"], () => "The summons")), "[The Summons^]: the end");
  // A different name before the id keeps the link in its brackets; so does a Latin word that only ends like the title.
  assert.equal(show(foldEchoes(["招募、分析（", link("守护者"), "）"])), "招募、分析（[守护者]）");
  assert.equal(show(foldEchoes(["the Rearrival (", link("Arrival"), ")"])), "the Rearrival ([Arrival])");
  // A shorter English name made of the title's own words is the name too; one word alone is not.
  assert.equal(show(foldEchoes(["/ Spymaster Exposed (", link("The spymaster Exposed"), "): A carry on"])), "/ [Spymaster Exposed]: A carry on");
  assert.equal(show(foldEchoes(["the target was Exposed (", link("The spymaster Exposed"), ")"])), "the target was Exposed ([The spymaster Exposed])");
  assert.equal(show(foldEchoes(["see “Other” (", link("Reaching Into the Rift"), ")"])), "see “Other” ([Reaching Into the Rift])");
  // Unbracketed: an id right after its whole title, or two or more of the title's words; never the marks before the name.
  assert.equal(show(foldEchoes(["visits give Recovered Fragment ", link("Recovered Fragment"), ". Next"])), "visits give [Recovered Fragment]. Next");
  assert.equal(show(foldEchoes(["shows Warriors Sighted ", link("Marauder Warriors Sighted"), " (x)"])), "shows [Warriors Sighted] (x)");
  assert.equal(show(foldEchoes(["the tunnels (→ ", link("Tunnels"), ")"])), "the tunnels (→ [Tunnels])");
  assert.equal(show(foldEchoes(["触发“发现[物种]战士”", link("发现掠夺者战士"), "（x）"])), "触发“[发现[物种]战士]”（x）");
});

test("text is preserved around links", () => {
  const parts = tokenize("A 1200 → B", ids, spaces);
  assert.equal(parts.map((p) => (typeof p === "string" ? p : `[${p.raw}]`)).join(""), "A [1200] → B");
});
