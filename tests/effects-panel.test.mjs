import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderEffects, countEffects } from "../src/effects-panel.js";

// Real structures produced by scripts/effects.py from the game files (python tests/... regenerates: see docs/EFFECTS.md).
const fx = JSON.parse(readFileSync(new URL("./fixtures/effects-samples.json", import.meta.url), "utf8"));
const opts = (lang) => ({ lang, T: (zh, en) => (lang === "en" ? en : zh) });

test("collapsed by default, one summary, note about static reading", () => {
  const h = renderEffects(fx.choice, opts("en"));
  assert.match(h, /^<details class="fx"><summary/);
  assert.doesNotMatch(h, /<details class="fx" open/);
  assert.match(h, /no save is simulated/);
  assert.match(renderEffects(fx.choice, opts("zh")), /不模拟具体存档/);
});

test("both languages come from the data labels", () => {
  assert.match(renderEffects(fx.choice, opts("en")), /Engineering Research: 12x your monthly income/);
  assert.match(renderEffects(fx.choice, opts("zh")), /每月产出的 12 倍/);
});

test("random options show chance from base weights", () => {
  const h = renderEffects(fx.random, opts("en"));
  assert.equal((h.match(/fx-chance/g) || []).length, 3);
  assert.match(h, /33\.3%/);
  assert.match(h, /One of these happens at random/);
});

test("modifier: duration chip and stats", () => {
  const h = renderEffects(fx.modifier, opts("en"));
  assert.match(h, /90 days/);
  assert.match(h, /fx-stats/);
  assert.match(renderEffects(fx.modifier, opts("zh")), /90 天/);
});

test("document: conditional groups, hidden marker, sections", () => {
  const h = renderEffects(fx.doc, opts("en"));
  assert.match(h, /is-cond/);
  assert.match(h, /fx-hidden/);
  assert.match(h, /fx-sec/);
  const s = renderEffects(fx.situation, opts("en"));
  assert.match(s, /Approach &quot;Study it&quot;/);
  assert.match(s, /When aborted/);
});

test("origin: game text bullets with levels plus the numbers behind it", () => {
  const h = renderEffects(fx.origin, opts("en"));
  assert.match(h, /Starting benefits \(game text\)/);
  assert.match(h, /fx-level-/);
  assert.match(h, /Habitat Max Districts \+2/);
  assert.match(renderEffects(fx.origin, opts("zh")), /开局效果（游戏原文）/);
});

test("escaping and empty input", () => {
  const evil = [{ kind: "resource", label: { zh: '<img src=x onerror=1>', en: '<script>alert(1)</script>' }, target: { zh: '"x"', en: '"x"' } }];
  const h = renderEffects(evil, opts("en"));
  assert.doesNotMatch(h, /<script|<img/);
  assert.equal(renderEffects([], opts("en")), "");
  assert.equal(renderEffects(null, opts("en")), "");
  assert.equal(renderEffects([{ kind: "unhandled", unhandled: true, label: { zh: "x", en: "x" } }], opts("en")).includes("<li"), false);
});

test("unhandled entries are counted, not shown", () => {
  const list = [{ kind: "resource", label: { zh: "a", en: "a" } }, { kind: "unhandled", unhandled: true, label: { zh: "b", en: "b" } }];
  const h = renderEffects(list, opts("en"));
  assert.match(h, /1 more effects are not itemised/);
  assert.equal(countEffects(list), 1);
});

test("truncated lists say how much is left out", () => {
  const h = renderEffects([{ kind: "resource", label: { zh: "a", en: "a" } }, { kind: "more", omitted: 5, label: { zh: "……另有 5 项", en: "... and 5 more" } }], opts("en"));
  assert.match(h, /fx-more/);
});
