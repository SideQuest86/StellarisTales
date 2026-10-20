import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, serialize, createSeen, KEY, LIMITS } from "../src/seen.js";

const memory = (init = {}) => {
  const data = { ...init };
  return { data, getItem: (k) => data[k] ?? null, setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; } };
};

test("normalize rejects bad shapes and keeps valid stories", () => {
  for (const bad of [null, 1, "x", [], { v: 2, s: {} }, { v: 1 }, { v: 1, s: [] }]) assert.equal(normalize(bad).size, 0);
  const m = normalize({ v: 1, s: { a: ["x", "y", 3, ""], b: "nope", c: [] } });
  assert.deepEqual([...m.keys()], ["a"]);
  assert.deepEqual([...m.get("a")], ["x", "y"]);
});

test("mark is idempotent, counts per story and round-trips through storage", () => {
  const st = memory();
  const s = createSeen(st);
  assert.equal(s.mark("story", "d1"), true);
  assert.equal(s.mark("story", "d1"), false);
  s.mark("story", "d2");
  s.mark("other", "d9");
  assert.equal(s.count("story"), 2);
  assert.equal(s.has("other", "d9"), true);
  assert.deepEqual([...s.docs()].sort(), ["d1", "d2", "d9"]);
  s.flush();
  const again = createSeen(st);
  assert.equal(again.count("story"), 2);
  assert.deepEqual(JSON.parse(st.data[KEY]), serialize(normalize(JSON.parse(st.data[KEY]))));
});

test("throwing or missing storage never throws", () => {
  const boom = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("full"); }, removeItem() { throw new Error("x"); } };
  for (const storage of [boom, null]) {
    const s = createSeen(storage);
    assert.equal(s.mark("a", "b"), true);
    s.flush();
    s.clear();
    assert.equal(s.count("a"), 0);
  }
});

test("caps hold: per story and in total (oldest story dropped)", () => {
  const s = createSeen(memory());
  for (let i = 0; i < LIMITS.perStory + 5; i++) s.mark("big", `d${i}`);
  assert.equal(s.count("big"), LIMITS.perStory);
  for (let k = 0; k < 20; k++) for (let i = 0; i < 300; i++) s.mark(`s${k}`, `d${i}`);
  let total = 0; for (const d of s.docs()) total += d ? 1 : 0;
  assert.ok(s.count("s19") === 300, "newest story kept");
  assert.equal(s.count("big"), 0, "oldest story dropped");
  s.flush();
});
