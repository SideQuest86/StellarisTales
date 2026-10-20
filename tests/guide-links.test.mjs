import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize, namespaces } from "../src/guide-links.js";

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

test("text is preserved around links", () => {
  const parts = tokenize("A 1200 → B", ids, spaces);
  assert.equal(parts.map((p) => (typeof p === "string" ? p : `[${p.raw}]`)).join(""), "A [1200] → B");
});
