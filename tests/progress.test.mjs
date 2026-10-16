import test from "node:test";
import assert from "node:assert/strict";
import { normalize, reconcile, save, load, clear, parse, KEY, LIMITS } from "../src/progress.js";
import { pathFlags } from "../src/reading.js";

const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k), m }; };
const raw = (over = {}) => ({ v: 1, savedAt: 1, trail: [{ story: "a", chapter: "a.1" }], assumptions: {}, visited: ["a.1"], ...over });
const story = (id, chapters) => ({ story: { id }, chapters: chapters.map(([cid, keys = []]) => ({ id: cid, choices: keys.map((key) => ({ key })) })) });

test("valid state round-trips through storage", () => {
  const s = mem();
  const state = { trail: [{ story: "a", chapter: "a.1", sets: ["f"] }, { story: "b", chapter: "b.1", choice: "k", choiceIndex: 1, reading: 0 }], assumptions: { x: true }, visited: ["a.1", "b.1"] };
  assert.equal(save(state, s), true);
  assert.deepEqual(load(s), state);
  assert.equal(JSON.parse(s.m.get(KEY)).v, 1);
  clear(s);
  assert.equal(load(s), null);
});

test("unknown version or bad shape is discarded", () => {
  assert.equal(normalize(raw({ v: 2 })), null);
  assert.equal(normalize(raw({ v: undefined })), null);
  for (const bad of [null, [], "x", 3, raw({ trail: [] }), raw({ trail: "a" }), raw({ trail: [{ story: 1, chapter: "x" }] }),
    raw({ trail: [{ story: "a" }] }), raw({ trail: [{ story: "a", chapter: "" }] }), raw({ trail: [{ story: "a", chapter: "b", sets: "x" }] }),
    raw({ trail: [{ story: "a", chapter: "b", choice: 5 }] }), raw({ trail: [{ story: "a", chapter: "b", choice: "k", reading: -1 }] }),
    raw({ assumptions: [] }), raw({ assumptions: { k: {} } }), raw({ visited: [1] }), raw({ visited: "x" })]) assert.equal(normalize(bad), null, JSON.stringify(bad));
  assert.equal(parse("{not json"), null);
  assert.equal(parse(JSON.stringify(raw({ v: 0 }))), null);
});

test("array lengths are capped", () => {
  const step = { story: "a", chapter: "a.1" };
  assert.ok(normalize(raw({ trail: Array(LIMITS.trail).fill(step) })));
  assert.equal(normalize(raw({ trail: Array(LIMITS.trail + 1).fill(step) })), null);
  assert.equal(normalize(raw({ visited: Array(LIMITS.visited + 1).fill("x") })), null);
  assert.equal(normalize(raw({ trail: [{ ...step, sets: Array(LIMITS.sets + 1).fill("f") }] })), null);
});

test("unknown fields are stripped", () => {
  const n = normalize(raw({ extra: 1, trail: [{ story: "a", chapter: "a.1", evil: "x" }] }));
  assert.deepEqual(n.trail, [{ story: "a", chapter: "a.1" }]);
});

test("throwing, full and absent storage never throw", () => {
  const boom = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); }, removeItem() { throw new Error("blocked"); } };
  assert.equal(load(boom), null);
  assert.equal(save({ trail: [{ story: "a", chapter: "x" }], assumptions: {}, visited: [] }, boom), false);
  assert.equal(clear(boom), false);
  assert.equal(load(), null); // no localStorage in node
  assert.equal(save({ trail: [{ story: "a", chapter: "x" }], assumptions: {}, visited: [] }), false);
  const getterThrows = Object.defineProperty({}, "getItem", { get() { throw new Error("denied"); } });
  assert.equal(load(getterThrows), null);
  assert.equal(save({ trail: [] }, mem()), false); // invalid state is not written
});

test("reconcile truncates at the first missing step and never invents steps", () => {
  const stories = new Map([["a", story("a", [["a.1"], ["a.2"]])], ["b", story("b", [["b.1"]])]]);
  const state = normalize(raw({ trail: [{ story: "a", chapter: "a.1" }, { story: "a", chapter: "a.gone" }, { story: "b", chapter: "b.1" }], visited: ["a.1", "b.1", "zzz"] }));
  const r = reconcile(state, stories);
  assert.deepEqual(r.trail, [{ story: "a", chapter: "a.1" }]);
  assert.deepEqual(r.visited, ["a.1", "b.1"].filter((id) => ["a.1", "a.2"].includes(id)));
  assert.equal(reconcile(normalize(raw({ trail: [{ story: "gone", chapter: "x" }] })), stories), null);
  assert.equal(reconcile(normalize(raw({ trail: [{ story: "a", chapter: "nope" }] })), stories), null);
  assert.equal(reconcile(null, stories), null);
});

test("reconcile drops stale choices and repairs moved indexes", () => {
  const stories = new Map([["a", story("a", [["a.1", ["x", "y"]]])]]);
  const keep = reconcile(normalize(raw({ trail: [{ story: "a", chapter: "a.1", choice: "y", choiceIndex: 0, reading: 1 }] })), stories);
  assert.deepEqual(keep.trail[0], { story: "a", chapter: "a.1", choice: "y", choiceIndex: 1, reading: 1 });
  const stale = reconcile(normalize(raw({ trail: [{ story: "a", chapter: "a.1", choice: "gone", choiceIndex: 0, reading: 1 }] })), stories);
  assert.deepEqual(stale.trail[0], { story: "a", chapter: "a.1" });
});

test("reading flags are identical after a save/load/reconcile round trip", () => {
  const chapters = [{ id: "a.1", choices: [{ key: "c", sets: ["flag_c"] }], sets: ["flag_doc"] }, { id: "a.2", choices: [] }];
  const stories = new Map([["a", { story: { id: "a" }, chapters }]]);
  const docs = new Map(chapters.map((c) => [c.id, c]));
  const trail = [{ story: "a", chapter: "a.1", choice: "c", choiceIndex: 0, reading: 0 }, { story: "a", chapter: "a.2", sets: ["flag_edge"] }];
  const s = mem();
  save({ trail, assumptions: { x: true }, visited: ["a.1"] }, s);
  const back = reconcile(load(s), stories);
  const flagsOf = (t) => { const f = pathFlags(t.slice(0, -1), (step) => docs.get(step.chapter)); return [[...f.flags].sort(), [...f.cleared].sort()]; };
  assert.deepEqual(flagsOf(back.trail), flagsOf(trail));
  assert.deepEqual(back.trail, trail);
  assert.deepEqual(back.assumptions, { x: true });
});
