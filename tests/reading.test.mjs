import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, resolveBody, resolveChoices, pathFlags, applyFacts, impliedFacts, atomKey, describe, namedOnly, passageTabs, partingWords } from "../src/reading.js";

const gestalt = (value) => ({ type: "identity", key: "ethic_gestalt_consciousness", value });
const flag = (name, value = true) => ({ type: "flag", name, scope: "country", value });
const other = (value) => ({ type: "other", key: "any_planet_within_border", arg: "{…}", scope: "owner", value });

test("unknown identity stays unknown; a profile resolves it everywhere", () => {
  assert.equal(evaluate([[gestalt(true)]], { profile: {} }), null);
  assert.equal(evaluate([[gestalt(true)]], { profile: { ethic_gestalt_consciousness: true } }), true);
  assert.equal(evaluate([[gestalt(false)]], { profile: { ethic_gestalt_consciousness: true } }), false);
  assert.equal(evaluate(null, { profile: {} }), true);
});

test("opposed ethics and single origin are mutually exclusive", () => {
  const profile = { ethic_fanatic_materialist: true, origin_shattered_ring: true };
  assert.equal(evaluate([[{ type: "identity", key: "ethic_spiritualist", value: true }]], { profile }), false);
  assert.equal(evaluate([[{ type: "identity", key: "origin_void_dwellers", value: true }]], { profile }), false);
  assert.equal(evaluate([[{ type: "identity", key: "ethic_materialist", value: false }]], { profile }), false);
});

test("story-local flags resolve from the chosen path", () => {
  const docs = { a: { id: "a", choices: [{ key: "a.1", sets: ["met_captain"] }, { key: "a.2" }] } };
  const storyFlags = new Set(["met_captain"]);
  const took = pathFlags([{ chapter: "a", choice: "a.1" }], (s) => docs[s.chapter]);
  const skipped = pathFlags([{ chapter: "a", choice: "a.2" }], (s) => docs[s.chapter]);
  const fromEntry = { storyFlags, pathFromEntry: true };
  assert.equal(evaluate([[flag("met_captain")]], { ...took, ...fromEntry }), true);
  assert.equal(evaluate([[flag("met_captain")]], { ...skipped, ...fromEntry }), false);
  assert.equal(evaluate([[flag("foreign_flag")]], { ...skipped, ...fromEntry }), null);
  const routed = pathFlags([{ chapter: "a", choice: "a.2", sets: ["met_captain"] }], (s) => docs[s.chapter]);
  assert.equal(evaluate([[flag("met_captain")]], { ...routed, ...fromEntry }), true, "flags set by routers on the edge count");
});

test("an unseen story flag is only known absent on a full path and for the reader's own country", () => {
  const storyFlags = new Set(["civil_war_leniency"]);
  const empty = { flags: new Set(), cleared: new Set(), storyFlags };
  const own = { type: "flag", name: "civil_war_leniency", value: true };
  const other = { ...own, path: "from" }; // set by the emperor's decision, which the rebel reader never sees
  assert.equal(evaluate([[own]], { ...empty, pathFromEntry: true }), false);
  assert.equal(evaluate([[own]], { ...empty, pathFromEntry: false }), null, "a document opened directly has no known path");
  assert.equal(evaluate([[other]], { ...empty, pathFromEntry: true }), null, "another country's flag stays unknown");
});

test("composed passages keep common text and only the matching conditional piece", () => {
  const doc = {
    texts: [{ zh: "开头" }, { zh: "非格式塔" }, { zh: "格式塔" }],
    body: [{ pieces: [{ text: 0 }, { break: true }, { text: 1, when: [[gestalt(false)]] }, { text: 2, when: [[gestalt(true)]] }] }],
  };
  const unknown = resolveBody(doc, { profile: {} });
  assert.equal(unknown.length, 1);
  assert.equal(unknown[0].paragraphs[1].parts.length, 2, "both alternatives remain visible while unknown");
  const known = resolveBody(doc, { profile: { ethic_gestalt_consciousness: true } });
  assert.deepEqual(known[0].paragraphs.map((p) => p.parts.map((x) => x.text.zh)), [["开头"], ["格式塔"]]);
});

test("docs without variant structure keep every original text, one version each", () => {
  const body = resolveBody({ texts: [{ zh: "一" }, { zh: "二" }] }, { profile: {} });
  assert.equal(body.length, 2);
  assert.deepEqual(body.map((p) => p.paragraphs[0].parts[0].text.zh), ["一", "二"]);
});

test("an assumption picked once is reused for the same condition on later docs", () => {
  const doc = { texts: [{ zh: "A" }, { zh: "B" }], body: [{ when: [[other(true)]], pieces: [{ text: 0 }] }, { when: [[other(false)]], pieces: [{ text: 1 }] }] };
  const profile = {}, assumptions = {};
  assert.equal(resolveBody(doc, { profile, assumptions }).length, 2);
  applyFacts(impliedFacts([[other(true)]]), profile, assumptions);
  assert.equal(assumptions[atomKey(other(true))], true);
  const after = resolveBody(doc, { profile, assumptions });
  assert.equal(after.length, 1);
  assert.equal(after[0].paragraphs[0].parts[0].text.zh, "A");
});

test("options: trigger hides, allow disables", () => {
  const doc = { choices: [{ key: "x", label: { zh: "x" } }, { key: "evo", label: { zh: "evo" }, when: [[{ type: "identity", key: "origin_evolutionary_predators", value: true }]] }, { key: "tech", label: { zh: "t" }, allow: [[other(true)]] }] };
  const none = resolveChoices(doc, { profile: { origin_shattered_ring: true } });
  assert.deepEqual(none.map((c) => c.key), ["x", "tech"]);
  assert.equal(none[1].allowed, null);
  const evo = resolveChoices(doc, { profile: { origin_evolutionary_predators: true } });
  assert.deepEqual(evo.map((c) => c.key), ["x", "evo", "tech"]);
});

test("a text that only repeats the title is not said twice", () => {
  const title = { zh: "失落帝国行为", en: "Fallen Empire Behavior" };
  assert.equal(resolveBody({ title, texts: [title] }, {})[0].paragraphs.length, 0);
  assert.equal(resolveBody({ title, texts: [title, { zh: "正文", en: "Text." }] }, {})[0].paragraphs.length, 1);
});

test("several texts without a body are alternatives, read one at a time", () => {
  const t = (en) => ({ zh: en, en });
  const storm = { texts: [t("Radiant storm."), t("Electric storm."), t("Radiant storm.")] };
  const passages = resolveBody(storm, {});
  assert.equal(passages.length, 2); // identical texts are one
  assert.deepEqual(passages.map((p) => p.paragraphs[0].parts[0].text.en), ["Radiant storm.", "Electric storm."]);
  assert.equal(resolveBody({ texts: [t("Only one.")] }, {}).length, 1);
  // A blank text or list lines: a composed description, read in order without the blanks.
  const composed = resolveBody({ texts: [t("The cries of the Shroud."), t(""), t("A boon."), t("A curse.")] }, {});
  assert.equal(composed.length, 1);
  assert.deepEqual(composed[0].paragraphs.map((p) => p.parts[0].text.en), ["The cries of the Shroud.", "A boon.", "A curse."]);
  assert.equal(resolveBody({ texts: [t("Factions:"), t("- Our first faction"), t("- Our second faction")] }, {}).length, 1);
});

test("the game's variants of one option are one button", () => {
  const a = { zh: "委托一件艺术品。", en: "Commission a work." };
  const doc = { choices: [{ key: "x.a", label: a, when: [[other(true)]] }, { key: "x.a", label: a, when: [[other(false)]] }, { key: "x.b", label: { zh: "别的", en: "Other" } }] };
  const shown = resolveChoices(doc, {});
  assert.deepEqual(shown.map((c) => c.key), ["x.a", "x.b"]);
  assert.equal(shown[0].index, 0);
  assert.equal(shown[0].when.length, 2, "either variant's trigger");
  // Different words under one key stay apart.
  assert.equal(resolveChoices({ choices: [{ key: "k", label: a }, { key: "k", label: { zh: "另", en: "Else" } }] }, {}).length, 2);
});

test("the row above alternative texts: its own names, one nameless among them, otherwise no words", () => {
  assert.deepEqual(passageTabs(["not Hive Mind", "Hive Mind"], "Other"), ["not Hive Mind", "Hive Mind"]);
  assert.deepEqual(passageTabs(["", "Machine Intelligence", "Hive Mind"], "Other"), ["Other", "Machine Intelligence", "Hive Mind"]);
  assert.equal(passageTabs(["not Gestalt Consciousness", "", ""], "Other"), null); // "Version 2 / Version 3" beside a name
  assert.equal(passageTabs(["", ""], "Other"), null);
  assert.equal(passageTabs(["A", "A", "B"], "Other"), null); // a shared name tells nothing
  // Unnamed flags ("earlier events") leave the label; a branch of nothing else then has no name at all.
  const hive = { type: "identity", key: "h", label: { en: "Hive Mind" }, value: true }, plain = { type: "flag", name: "f", value: false };
  assert.equal(describe(namedOnly([[plain, hive]], "en"), "en"), "Hive Mind");
  assert.equal(describe(namedOnly([[plain]], "en"), "en"), "");
  assert.equal(namedOnly(null, "en"), null);
});

test("parting words: the opening, or the sentence where two texts part", () => {
  assert.deepEqual(partingWords(["Alpha opens here.", "Beta opens there."], 44), ["Alpha opens here.", "Beta opens there."]);
  // Texts that open alike start at the sentence they part in, not mid-sentence.
  const shared = "We accepted the communication from the other empire at once. ";
  const [a, b] = partingWords([`${shared}However, they fell silent.`, `${shared}However, they spoke at length.`], 44);
  assert.equal(a, "…However, they fell silent.");
  assert.equal(b, "…However, they spoke at length.");
  const [z] = partingWords(["竞技场上人人都知道他的心思。战斗一开始，我们的统治者就向反方向跑去。", "竞技场上人人都知道他的心思。战斗一开始，敌人就倒下了。"], 24);
  assert.equal(z.startsWith("…战斗一开始"), true);
  // One long sentence: from just before the parting, at a word's start.
  const long = "The empire has decided after a very long and careful deliberation among all of its many councils to";
  const [c] = partingWords([`${long} send a fleet.`, `${long} stay at home.`], 44);
  assert.match(c, /^…[a-z]+ .*send a fleet\.$/);
  // An English cut ends at a word's end.
  const [w] = partingWords(["Thankfully, the starship graveyard on the surface is quiet tonight.", "Something else entirely."], 44);
  assert.equal(w, "Thankfully, the starship graveyard on the…");
  // The same throughout: the opening.
  assert.deepEqual(partingWords(["Same text.", "Same text."], 44), ["Same text.", "Same text."]);
});

test("describe names only what has a name and never invents a placeholder", () => {
  const named = (key, zh, en, value = true) => ({ type: "other", key, arg: "", label: { zh, en }, value });
  const bare = { type: "other", key: "has_x", arg: "", value: true };
  const eth = { type: "identity", key: "ethic_xenophobe", value: true };
  const machine = { type: "identity", key: "is_individual_machine", value: true };
  assert.equal(describe([[named("a", "探险协议", "Expedition protocol")]], "zh"), "探险协议");
  assert.equal(describe([[bare]], "zh"), ""); // nothing known: nothing shown
  assert.equal(describe([[named("a", "甲", "A"), bare]], "en"), "A"); // an unnamed part of a branch is left out
  assert.equal(describe([[named("a", "甲", "A")], [bare]], "en"), ""); // an unnamed alternative: the condition cannot be stated
  assert.equal(describe([[bare]], "zh", {}, { fallback: "其他条件" }), "其他条件");
  assert.equal(describe([[machine]], "zh"), ""); // engine keys are never shown in Chinese…
  assert.equal(describe([[eth]], "en"), "xenophobe"); // …only a readable ethic / authority / origin key in English
  assert.equal(describe([[named("a", "甲", "A", false)]], "zh"), "非甲");
  // Unnamed flags all read "earlier events": one keeps its "not"; several different ones collapse instead of contradicting.
  const flag = (name, value) => ({ type: "flag", scope: "country", name, path: "", value }); // flags carry a name, not a key
  assert.equal(describe([[flag("f1", false)]], "en"), "not earlier events");
  // A negated tooltip sentence is the game's own wording of the requirement: no "not" in front.
  assert.equal(describe([[named("t", "同一时间只能进行一项此类秘密事业。", "We can only run one such secret enterprise at a time.", false)]], "en"), "We can only run one such secret enterprise at a time.");
  // A negated statement keeps its negation (dropping it would invert the meaning), worded as a clause: "unless …" / 并非「…」.
  assert.equal(describe([[named("r", "我们已经雇佣过一位领袖。", "We have already recruited a leader from them.", false)]], "en"), "unless we have already recruited a leader from them");
  assert.equal(describe([[named("r", "我们已经雇佣过一位领袖。", "We have already recruited a leader from them.", false)]], "zh"), "并非「我们已经雇佣过一位领袖」");
  assert.equal(describe([[named("t", "同一时间只能进行一项此类秘密事业。", "We can only run one such secret enterprise at a time.", false)]], "zh"), "同一时间只能进行一项此类秘密事业。");
  // "not A or not B" is "not both A and B"
  const gt = named("g", "基因剪裁", "Gene Tailoring", false), cf = named("k", "基础隐形场", "Basic Cloaking Fields", false), x3 = named("x", "丙", "C", false);
  assert.equal(describe([[gt], [cf]], "en"), "not both Gene Tailoring and Basic Cloaking Fields");
  assert.equal(describe([[gt], [cf]], "zh"), "并非同时具备基因剪裁和基础隐形场");
  assert.equal(describe([[gt], [cf], [x3]], "en"), "not all of Gene Tailoring, Basic Cloaking Fields and C");
  assert.equal(describe([[gt], [named("a", "甲", "A")]], "en"), "A or not Gene Tailoring"); // (what holds first)
  // A label the game marks as a failed requirement, or that opens with a negation, is the requirement already: no second "not".
  assert.equal(describe([[named("e", "£trigger_no£ 不能成为银河皇帝", "£trigger_no£ Cannot be the Galactic Emperor", false)]], "en"), "Cannot be the Galactic Emperor");
  assert.equal(describe([[named("e", "£trigger_no£ 不能成为银河皇帝", "£trigger_no£ Cannot be the Galactic Emperor", false)]], "zh"), "不能成为银河皇帝");
  // A title keeps its capitals ("Your Ladder To The Sky" is an origin's name, not a sentence).
  assert.equal(describe([[named("o", "通天之梯", "Your Ladder To The Sky", false)]], "en"), "not Your Ladder To The Sky");
  assert.equal(describe([[named("u", "不朽者", "Undying", false)]], "zh"), "非不朽者");
  assert.equal(describe([[named("c", "未隐形", "Is NOT cloaked", false)]], "en"), "Is NOT cloaked");
  assert.equal(describe([[named("c", "未隐形", "Is NOT cloaked", false)]], "zh"), "未隐形");
  assert.equal(describe([[named("f", "未来世界", "Future World", false)]], "zh"), "非未来世界");
  assert.equal(describe([[flag("f1", false)], [flag("f2", true)]], "en"), "earlier events");
  assert.equal(describe([[flag("f1", true), flag("f2", false)]], "en"), "earlier events");
  assert.equal(describe([[flag("f1", false), named("a", "甲", "A", false)]], "zh"), "非此前经历 · 非甲");
  // repeated and absorbed alternatives collapse ("A · B or A" is "A"); more than `max` alternatives end with "…"
  const a = named("a", "甲", "A"), b = named("b", "乙", "B"), c = named("c", "丙", "C"), d = named("d", "丁", "D");
  assert.equal(describe([[a, b], [a], [a]], "en"), "A");
  assert.equal(describe([[a], [b], [c], [d]], "en"), "A or B or C or D"); // (single names run to five)
  assert.equal(describe([[a], [b], [c], [d]], "en", {}, { max: 2 }), "A or B …");
  assert.equal(describe([[a], [b], [c], [d]], "zh", {}, { max: 2 }), "甲 或 乙 等");
});

test("a condition and its own negation: absorbed, and an always-true one says nothing", () => {
  const atom = (key, zh, value = true) => ({ type: "other", key, label: { zh, en: key }, value });
  const W = atom("w", "宇宙天气模型"), notW = atom("w", "宇宙天气模型", false), notP = atom("p", "概率流", false);
  assert.equal(describe([[notW], [W, notP]], "zh"), "并非同时具备宇宙天气模型和概率流"); // (not W or not P)
  const T = atom("t", "节约"), notT = atom("t", "节约", false), E = atom("e", "环保主义者"), A = atom("a", "田园绽放");
  assert.equal(describe([[T], [notT, E], [notT, A]], "zh"), "节约 或 环保主义者 或 田园绽放");
  assert.equal(describe([[W], [notW]], "zh"), "");
  // (one scope written two ways: "owner.species" and, in the negation, "owner/species")
  const C = { ...T, scope: "owner.species" }, notC = { ...notT, scope: "owner/species" };
  assert.equal(describe([[C], [notC, E]], "zh"), "节约 或 环保主义者");
});