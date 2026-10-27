import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize, namespaces, dropEcho, foldEchoes } from "../src/guide-links.js";

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
  assert.equal(show(foldEchoes(["see “Other” (", link("Reaching Into the Rift"), ")"])), "see “Other” ([Reaching Into the Rift])");
});

test("text is preserved around links", () => {
  const parts = tokenize("A 1200 → B", ids, spaces);
  assert.equal(parts.map((p) => (typeof p === "string" ? p : `[${p.raw}]`)).join(""), "A [1200] → B");
});
