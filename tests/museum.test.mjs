// Grand Archive museum data: specimens from the game files, generated-model manifest, reverse links to stories.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const data = read("public/museum/specimens.json");
const manifest = existsSync("public/museum/models/manifest.json") ? read("public/museum/models/manifest.json") : { models: [] };
const byDoc = read("public/museum/by-doc.json");
const records = read("public/stories/records.json");

test("every specimen has original art, bilingual names and typed, labelled effects", () => {
  assert.equal(data.specimens.length, data.counts.specimens);
  for (const s of data.specimens) {
    assert.ok(existsSync(`public/${s.icon.url}`), `${s.key}: icon file`);
    assert.ok(s.name.zh && s.name.en, `${s.key}: names`);
    assert.ok(["xeno_geology", "aesthetic_wonder", "historical_item"].includes(s.type), `${s.key}: type`);
    assert.ok(["common", "rare", "epic", "exceptional"].includes(s.rarity), `${s.key}: rarity`);
    assert.ok(s.effects.length > 0, `${s.key}: effects`);
    for (const e of s.effects) {
      assert.equal(typeof e.value, "number", `${s.key}: effect value`);
      for (const c of e.conditions) assert.ok(c.label.zh && c.label.en && !c.unparsed, `${s.key}: condition label`);
    }
    for (const t of [s.name, s.short, s.details]) assert.ok(!/\['concept/.test(t.zh + t.en), `${s.key}: raw concept link`);
  }
});

test("specimen effects are display effects, never claimed unconditional when the game conditions them", () => {
  const conditional = data.specimens.flatMap((s) => s.effects).filter((e) => e.conditions.length);
  assert.ok(conditional.length > 50, "the inventory keeps the game's potential blocks");
  assert.match(data.archive.specimenConcept.en, /exhibited in a/);
});

test("generated models are files on disk, linked to a real specimen and marked as non-canonical", () => {
  const keys = new Set(data.specimens.map((s) => s.key));
  for (const m of manifest.models) {
    assert.ok(keys.has(m.key), `${m.key}: specimen`);
    assert.ok(existsSync(`public/${m.file}`), `${m.key}: model file`);
    assert.equal(m.canonical, false, `${m.key}: canonical flag`);
    assert.ok(m.generator && m.source?.sha256 && m.settings, `${m.key}: provenance`);
  }
});

test("reverse links point from real story documents to real specimens", () => {
  const keys = new Set(data.specimens.map((s) => s.key));
  for (const [doc, entry] of Object.entries(byDoc)) {
    assert.ok(records[doc], `${doc}: story document`);
    for (const k of entry.specimens) assert.ok(keys.has(k), `${doc}: ${k}`);
  }
});
