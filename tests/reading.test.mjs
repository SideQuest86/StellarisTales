import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, resolveBody, resolveChoices, pathFlags, applyFacts, impliedFacts, atomKey } from "../src/reading.js";

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
  assert.equal(evaluate([[flag("met_captain")]], { ...took, storyFlags }), true);
  assert.equal(evaluate([[flag("met_captain")]], { ...skipped, storyFlags }), false);
  assert.equal(evaluate([[flag("foreign_flag")]], { ...skipped, storyFlags }), null);
  const routed = pathFlags([{ chapter: "a", choice: "a.2", sets: ["met_captain"] }], (s) => docs[s.chapter]);
  assert.equal(evaluate([[flag("met_captain")]], { ...routed, storyFlags }), true, "flags set by routers on the edge count");
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

test("docs without variant structure keep every original paragraph", () => {
  const body = resolveBody({ texts: [{ zh: "一" }, { zh: "二" }] }, { profile: {} });
  assert.equal(body.length, 1);
  assert.deepEqual(body[0].paragraphs.map((p) => p.parts[0].text.zh), ["一", "二"]);
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
