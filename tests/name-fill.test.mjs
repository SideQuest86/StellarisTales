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
  assert.equal(cleanRefs("within $@max_jumps$ jumps", "en"), "within a number of jumps");
  const zh = plainNames(fillNames("从轨道上将[X.GetName]彻底毁灭", { lang: "zh", chapterNames: names }));
  assert.equal(zh, "从轨道上将这颗星球彻底毁灭");
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
test("frames that only introduce a proper name are left out with the slot", () => {
  assert.equal(fill("A scientist by the name of [L.GetLeaderName] has joined us."), "A scientist has joined us.");
  assert.equal(fill("A scientist, by the name of [L.GetLeaderName], has joined us."), "A scientist has joined us.");
  assert.equal(fill("我们在那里有一位名叫[L.GetLeaderName]的间谍首脑。", "zh"), "我们在那里有一位间谍首脑。");
});
test("a/an agrees with the phrase", () => {
  const n = { "R.GetName": { zh: "那个帝国", en: "other empire" }, "Q.GetName": { zh: "舰队", en: "fleet" } };
  const f = (s) => plainNames(fillNames(s, { lang: "en", chapterNames: n }));
  assert.equal(f("We met a [R.GetName]."), "We met an other empire.");
  assert.equal(f("We met an [Q.GetName]."), "We met a fleet.");
});
test("a sentence the game inserts right after a stop gets its space", () => {
  const n = { "GetEnd": { en: "Our people have no world to offer.", zh: "我们没有可提供的星球。" } };
  assert.equal(plainNames(fillNames("All stand to benefit.[GetEnd]", { lang: "en", chapterNames: n })), "All stand to benefit. Our people have no world to offer.");
  assert.equal(plainNames(fillNames("众人皆可受益。[GetEnd]", { lang: "zh", chapterNames: n })), "众人皆可受益。我们没有可提供的星球。");
});
test("zh: a spymaster's title carries the name", () => {
  const n = { "S.GetName": { zh: "这位领袖", en: "the leader" } };
  assert.equal(plainNames(fillNames("间谍首脑[S.GetName]开始传来报告。", { lang: "zh", chapterNames: n })), "间谍首脑开始传来报告。");
});
test("zh: 其 is already possessive", () => {
  const n = { "E.GetHerHis": { zh: "其", en: "their" } };
  assert.equal(plainNames(fillNames("并未完成[E.GetHerHis]的任务。", { lang: "zh", chapterNames: n })), "并未完成其任务。");
  assert.equal(plainNames(fillNames("并未完成[E.GetHerHis]任务。", { lang: "zh", chapterNames: n })), "并未完成其任务。");
});
test("they-agreement, possessive and zh repeated noun", () => {
  assert.equal(fill("[P.GetSheHe] has left."), "They have left.");
  assert.equal(fill("[C.GetName]'s guard"), "Our guard");
  assert.equal(fill("[E.GetName]帝国很强大。", "zh"), "我们的帝国很强大。");
});
test("names the archive cannot know: worded by what the getter names and where it stands", () => {
  const f = (s, lang = "en") => plainNames(fillNames(s, { lang, names: {} }));
  // a plain name names its scope; other getters name what they say (a ruler, a star), never the scope's noun
  assert.equal(f("We landed on [pre_ftl_planet.GetName]."), "We landed on the planet.");
  assert.equal(f("You will serve the [Root.GetRulerTitle], whether you wish to or not."), "You will serve the ruler, whether you wish to or not.");
  assert.equal(f("in the [atomic_clock_planet.GetStarName] System, near [atomic_clock_planet.GetName]."), "in the System, near the planet.");
  assert.equal(f("greetings from [contact_empire.GetRulerTitle] [contact_empire.GetRulerName], the commander"), "greetings from the ruler, the commander");
  // left out after or before the noun that already says it, and as an attribute
  assert.equal(f("the existence of the star [rock_sun.GetName]."), "the existence of the star.");
  assert.equal(f("the neighboring [event_target:wandering_planet_origin.GetName] system"), "the neighboring system");
  assert.equal(f("carrying [Root.GetSpeciesName] refugees"), "carrying refugees");
  assert.equal(f("a great boon to the [Root.GetAdj] economy."), "a great boon to the economy.");
  assert.equal(f("[Root.GetSpeciesName] Refugees Arrive"), "Refugees Arrive");
  assert.equal(f("Recently, the [X.GetSpeciesAdj] have become captivated"), "Recently, the … have become captivated");
  // a name only called out to goes with its comma; the sentence after it starts with a capital
  assert.equal(f("We are delighted to meet you, [contact_speaker.GetSpeciesNamePlural]."), "We are delighted to meet you.");
  assert.equal(f("[Root.GetSpeciesName], we have decided to grace your empire."), "We have decided to grace your empire.");
  assert.equal(f("[Root.GetSpeciesName]! We greet you."), "We greet you.");
  assert.equal(f("We have selected an opponent for you, the [unfortunate_country.GetName]."), "We have selected an opponent for you, that empire.");
  // plurals: subject, object, after a determiner or quantifier
  assert.equal(f("[X.GetSpeciesNamePlural] are coming."), "They are coming.");
  assert.equal(f("To increase the productivity of [roboticist.GetNamePlural], managers"), "To increase the productivity of them, managers");
  assert.equal(f("the warring factions of the [raider_khanate.GetSpeciesNamePlural] have united"), "the warring factions of the people have united");
  assert.equal(f("These rare [Root.GetSpeciesNamePlural] could"), "These rare people could");
  assert.equal(f("a shock to many [This.Owner.GetSpeciesNamePlural], it has emerged"), "a shock to many people, it has emerged");
  // one determiner, never "our the leader"; "this name" keeps its own
  assert.equal(f("only our [X.GetTitle] [X.Leader.GetName] could"), "only our leader could");
  assert.equal(f("Our [fromfrom.GetClass] [fromfrom.GetName] has been captured"), "Our this name has been captured");
  assert.equal(f("The [offended_party.GetAdj] [offended_party.GetRulerTitle] expressed dismay"), "The ruler expressed dismay");
  assert.equal(f("what to make of [rock_fallen_empire.GetRealName]"), "what to make of that empire");
  // Chinese keeps its neutral wording
  assert.equal(f("我们见到了[contact_empire.GetRulerName]。", "zh"), "我们见到了这个名字。");
});