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
  assert.equal(fill("We met Scientist [L.GetLeaderName] today."), "We met the scientist today.");
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
test("leftover $KEY$ references: progress counters read naturally, undefined keys are left out", async () => {
  const { cleanRefs } = await import("../src/name-fill.js");
  assert.equal(cleanRefs("Has $COUNT$/$REQUIRED$ ships in orbit.", "en"), "Has the required number of ships in orbit.");
  assert.equal(cleanRefs("轨道上有$COUNT$/$REQUIRED$舰船。", "zh"), "轨道上有所需数量的舰船。");
  assert.equal(cleanRefs("Reward:\n$mandate_influence_reward_t3$", "en"), "Reward:\n");
  assert.equal(cleanRefs("request one $building_upload_center$ to act", "en"), "request one to act");
});
test("determiner + adjective before a phrase that brings its own determiner", () => {
  assert.equal(fill("on the tropical [X.GetName] we landed"), "on the tropical planet we landed");
  assert.equal(fill("We left their native [X.GetName]."), "We left their native planet.");
});
test("adjacent pronoun + verb slots both stay ('are' is not the article 'a')", () => {
  const n = { "A.GetHeShe": { zh: "此人", en: "they" }, "A.GetIsAre": { zh: "是", en: "are" } };
  assert.equal(plainNames(fillNames("or if [A.GetHeShe] [A.GetIsAre] still here", { lang: "en", chapterNames: n })), "or if they are still here");
});
test("context variants: one key, different positions in one document", () => {
  const n = { "W.GetName": { zh: "这颗星球", en: "this world", variants: [{ lang: "en", before: "the wind of ", text: "the planet" }, { lang: "en", after: " crew", text: "our ship's" }] } };
  const f = (s) => plainNames(fillNames(s, { lang: "en", chapterNames: n }));
  assert.equal(f("We felt the wind of [W.GetName]."), "We felt the wind of the planet.");
  assert.equal(f("The [W.GetName] crew cheered."), "Our ship's crew cheered.");
  assert.equal(f("We reached [W.GetName]."), "We reached this world.");
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
