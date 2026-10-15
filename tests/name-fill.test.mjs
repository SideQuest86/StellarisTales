import test from "node:test";
import assert from "node:assert/strict";
import { fillNames, plainNames } from "../src/name-fill.js";

const names = {
  "X.GetName": { zh: "这颗星球", en: "this planet" },
  "L.GetLeaderName": { zh: "这位科学家", en: "the scientist" },
  "E.GetName": { zh: "我们的帝国", en: "our empire" },
  "S.GetName": { zh: "", en: "", omit: ["zh", "en"] },
  "P.GetSheHe": { zh: "此人", en: "they" },
  "C.GetName": { zh: "我们的", en: "our" },
};
const fill = (s, lang = "en") => plainNames(fillNames(s, { lang, chapterNames: names }));

test("title noun before a name: a phrase ending in the noun replaces the pair", () => {
  assert.equal(fill("on the flag of planet [X.GetName]."), "on the flag of this planet.");
});
test("person title before a name carries the note instead of doubling", () => {
  assert.equal(fill("Science Officer [L.GetLeaderName] reports."), "Science Officer reports.");
});
test("doubled article and sentence-initial capital", () => {
  assert.equal(fill("The [E.GetName] grows."), "Our empire grows.");
  assert.equal(fill("We met the [X.GetName]."), "We met this planet.");
});
test("computed amount: sign and percent fold into the phrase", () => {
  const r = fillNames("+[X.GetName]% growth", { lang: "en", chapterNames: names });
  assert.equal(plainNames(r), "This planet growth");
});
test("omitted slot and Operation frame", () => {
  assert.equal(fill("the hitherto-unknown [S.GetName] species"), "the hitherto-unknown species");
  assert.equal(fill("assigned to Operation [S.GetName]."), "assigned to the operation.");
});
test("a/an agrees with the phrase", () => {
  const n = { "R.GetName": { zh: "那个帝国", en: "other empire" }, "Q.GetName": { zh: "舰队", en: "fleet" } };
  const f = (s) => plainNames(fillNames(s, { lang: "en", chapterNames: n }));
  assert.equal(f("We met a [R.GetName]."), "We met an other empire.");
  assert.equal(f("We met an [Q.GetName]."), "We met a fleet.");
});
test("they-agreement, possessive and zh repeated noun", () => {
  assert.equal(fill("[P.GetSheHe] has left."), "They have left.");
  assert.equal(fill("[C.GetName]'s guard"), "Our guard");
  assert.equal(fill("[E.GetName]帝国很强大。", "zh"), "我们的帝国很强大。");
});
