import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
const read = async (p) => JSON.parse(await readFile(p, "utf8"));
const index = await read("public/stories/index.json");
const stories = await Promise.all(
  index.stories.map((s) => read(`public/stories/${s.id}.json`)),
);
const chapterMap = new Map(
  stories.flatMap((s) => s.chapters).map((c) => [c.id, c]),
);
test("every original record is assigned to one complete dossier", async () => {
  const raw = await read("public/data/index.json");
  const overviews = [...chapterMap.keys()].filter((k) =>
    k.startsWith("origin-intro:"),
  ).length;
  assert.equal(chapterMap.size, raw.records.length + overviews);
  assert.equal(
    stories.reduce((n, s) => n + s.chapters.length, 0),
    raw.records.length + overviews,
  );
  for (const r of raw.records) assert.ok(index.recordToStory[r.id]);
  for (const d of stories)
    for (const c of d.chapters)
      assert.equal(index.recordToStory[c.id], d.story.id);
});
test("known multi-stage stories and their projects live together, crises remain distinct", () => {
  for (const id of [
    "akx.9000",
    "akx.9001",
    "akx.9005",
    "akx.9020",
    "special_projects:HORIZON_SIGNAL_PROJECT",
  ])
    assert.equal(index.recordToStory[id], "horizon-signal");
  assert.equal(
    index.recordToStory["astral_rifts:riftworld"],
    index.recordToStory["astral_rift.1"],
  );
  assert.equal(
    index.recordToStory["archaeological_site_types:site_ruins_of_shallash"],
    index.recordToStory["federations2.2"],
  );
  assert.equal(index.recordToStory["precursor.1"], "vultaum");
  assert.equal(index.recordToStory["precursor.2000"], "cybrex");
  assert.equal(index.recordToStory["crisis.11"], "prethoryn-scourge");
  assert.equal(index.recordToStory["crisis.1007"], "unbidden");
  assert.equal(index.recordToStory["crisis.2010"], "contingency");
});
test("narrative payloads contain no raw script fields, and routes resolve to readable chapters", () => {
  function inspect(x) {
    if (!x || typeof x !== "object") return;
    for (const [k, v] of Object.entries(x)) {
      assert.ok(
        ![
          "script",
          "trigger",
          "source",
          "line",
          "conditions",
          "pictureKeys",
          "inlineSources",
        ].includes(k),
        k,
      );
      inspect(v);
    }
  }
  for (const s of stories) {
    inspect(s);
    for (const c of s.chapters)
      for (const edge of [...c.next, ...c.choices.flatMap((c) => c.next)]) {
        assert.ok(chapterMap.has(edge.target));
        assert.equal(chapterMap.get(edge.target).hidden, false);
        assert.ok(index.stories.some((s) => s.id === edge.story));
      }
  }
});
test("the complete original soundtrack is available as byte-for-byte MP3s", async () => {
  const p = await read("public/music/playlist.json");
  assert.equal(p.tracks.length, 23);
  assert.equal(p.loop, "playlist");
  assert.ok(p.tracks.reduce((n, t) => n + t.duration, 0) > 9600);
  for (const t of p.tracks) {
    assert.ok(t.title);
    assert.ok(t.artist);
    assert.equal((await stat("public/" + t.url)).size, t.bytes);
    assert.equal(
      createHash("sha256")
        .update(await readFile("public/" + t.url))
        .digest("hex"),
      t.sha256,
    );
  }
});

test("origin cards use official identity and absorb full dedicated source sequences", async () => {
  const origins = await read("public/data/origins.json");
  const cards = index.stories.filter((s) => s.category === "origins");
  assert.equal(cards.length, 58);
  for (const s of cards) {
    const o = origins.find((o) => o.id === s.id);
    assert.ok(o);
    assert.equal(s.title.zh, o.title.zh.replace(/§./g, ""));
    assert.equal(s.start, "origin-intro:" + s.id);
    assert.ok(s.image);
  }
  assert.equal(cards[0].title.zh, "繁荣一统");
  for (const [id, prefix, min, max] of [
    ["origin_evolutionary_predators", "bio.", 1000, 1999],
    ["origin_primal_calling", "grand_archive.", 1000, 1999],
  ]) {
    const d = stories.find((s) => s.story.id === id);
    assert.ok(d.story.chapters > 30);
    for (const key of Object.keys(index.recordToStory))
      if (
        key.startsWith(prefix) &&
        Number(key.slice(prefix.length)) >= min &&
        Number(key.slice(prefix.length)) <= max
      )
        assert.equal(index.recordToStory[key], id, key);
  }
});
test("Cybrex perspectives switch the original passage, with prose-equivalent responses merged", () => {
  assert.equal(index.recordToStory["ancrel.10250"], "cybrex");
  const c = chapterMap.get("ancrel.10250");
  const spiritual = c.readings.find((v) => v.label.zh === "唯心主义"),
    machine = c.readings.find((v) => v.label.zh === "个体机械");
  assert.ok(c.texts[spiritual.textIndices[0]].zh.includes("取缔人工智能"));
  assert.ok(!c.texts[machine.textIndices[0]].zh.includes("取缔人工智能"));
  assert.equal(c.readings.length, 4);
});
test("conditional common paragraphs and their matching responses stay together", () => {
  const c = chapterMap.get("cstorms.5080");
  const swarm = c.readings.find((v) => v.label.zh.includes("噬杀蜂群"));
  assert.ok(swarm);
  assert.ok(swarm.textIndices.length >= 2);
  assert.ok(
    swarm.choiceIndices.some((i) => c.choices[i].label.zh === "我们饿了。"),
  );
  assert.ok(
    !swarm.choiceIndices.some(
      (i) => c.choices[i].label.zh === "就地进行尸检。",
    ),
  );
  assert.ok(
    c.readings.some(
      (v) =>
        v.choiceIndices.some(
          (i) => c.choices[i].label.zh === "就地进行尸检。",
        ) &&
        !v.choiceIndices.some((i) => c.choices[i].label.zh === "我们饿了。"),
    ),
  );
  for (const d of stories)
    for (const c of d.chapters)
      for (const v of c.readings) {
        assert.ok(v.label.zh);
        for (const i of v.textIndices) assert.ok(c.texts[i], c.id);
        for (const i of v.choiceIndices) assert.ok(c.choices[i], c.id);
      }
});
