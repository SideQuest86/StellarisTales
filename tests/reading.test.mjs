import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, resolveBody, resolveChoices, pathFlags, applyFacts, impliedFacts, atomKey, describe } from "../src/reading.js";

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
  // A negated statement keeps its "not" (dropping it would invert the meaning), as one clause.
  assert.equal(describe([[named("r", "我们已经雇佣过一位领袖。", "We have already recruited a leader from them.", false)]], "en"), "not we have already recruited a leader from them.");
  assert.equal(describe([[flag("f1", false)], [flag("f2", true)]], "en"), "earlier events");
  assert.equal(describe([[flag("f1", true), flag("f2", false)]], "en"), "earlier events");
  assert.equal(describe([[flag("f1", false), named("a", "甲", "A", false)]], "zh"), "非此前经历 · 非甲");
  // repeated and absorbed alternatives collapse ("A · B or A" is "A"); more than `max` alternatives end with "…"
  const a = named("a", "甲", "A"), b = named("b", "乙", "B"), c = named("c", "丙", "C"), d = named("d", "丁", "D");
  assert.equal(describe([[a, b], [a], [a]], "en"), "A");
  assert.equal(describe([[a], [b], [c], [d]], "en"), "A or B or C …");
  assert.equal(describe([[a], [b], [c], [d]], "zh"), "甲 或 乙 或 丙 等");
});
