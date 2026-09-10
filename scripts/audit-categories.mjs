import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { nextUnread } from "../src/story-map.js";
const read = async (p) => JSON.parse(await readFile(p, "utf8"));
const index = await read("public/stories/index.json");
const categories = [
  "origins",
  "precursors",
  "exploration",
  "rifts",
  "crisis",
  "leviathans",
  "society",
  "stories",
];
const requested = process.argv[2];
if (requested && !categories.includes(requested))
  throw Error("Unknown category");
await mkdir("verification/categories", { recursive: true });
for (const category of requested ? [requested] : categories) {
  const report = {
    category,
    dossiers: 0,
    chapters: 0,
    originalLinks: 0,
    choiceLinks: 0,
    readingBridges: 0,
    sharedChapters: 0,
    traversed: 0,
    failures: [],
    stories: [],
  };
  for (const meta of index.stories.filter(
    (s) => s.visible && s.category === category,
  )) {
    const d = await read(`public/stories/${meta.id}.json`),
      nav = d.story.navigation;
    const expected = new Set([
      ...d.chapters.filter((c) => !c.hidden).map((c) => c.id),
      ...(d.story.related || []).map((c) => c.id),
    ]);
    try {
      assert.ok(nav);
      assert.equal(nav.order.length, expected.size);
      assert.deepEqual(new Set(nav.order), expected);
      assert.equal(new Set(nav.tree.map((n) => n.id)).size, expected.size);
      const visited = new Set();
      let current = nav.order[0];
      while (current) {
        assert.ok(!visited.has(current));
        visited.add(current);
        current = nextUnread(nav.order, current, visited);
      }
      assert.equal(visited.size, expected.size);
      for (const edge of nav.links) {
        assert.ok(expected.has(edge.from));
        assert.ok(expected.has(edge.to));
      }
      // Branch switching to any chapter must still reach every other unread chapter.
      for (const start of nav.order) {
        const seen = new Set([start]);
        let n = nextUnread(nav.order, start, seen);
        while (n) {
          seen.add(n);
          n = nextUnread(nav.order, n, seen);
        }
        assert.equal(seen.size, expected.size);
      }
      const original = d.chapters
        .flatMap((c) => [
          ...c.next.map((e) => ({ from: c.id, to: e.target, kind: "event" })),
          ...c.choices.flatMap((o) =>
            o.next.map((e) => ({ from: c.id, to: e.target, kind: "choice" })),
          ),
        ])
        .filter((e) => expected.has(e.from) && expected.has(e.to));
      for (const e of original)
        assert.ok(
          nav.links.some(
            (x) => x.from === e.from && x.to === e.to && x.kind === e.kind,
          ),
        );
      const choiceLinks = nav.links.filter((e) => e.kind === "choice").length,
        bridges = nav.tree.filter(
          (n) => n.parent && n.kind === "reading",
        ).length;
      report.dossiers++;
      report.chapters += expected.size;
      report.originalLinks += nav.links.length;
      report.choiceLinks += choiceLinks;
      report.readingBridges += bridges;
      report.sharedChapters += (d.story.related || []).length;
      report.traversed += visited.size;
      report.stories.push({
        id: meta.id,
        title: meta.title.zh,
        chapters: expected.size,
        links: nav.links.length,
        choiceLinks,
        readingBridges: bridges,
      });
    } catch (e) {
      report.failures.push({ id: meta.id, error: e.message });
    }
  }
  await writeFile(
    `verification/categories/${category}.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify({ ...report, stories: undefined }));
  assert.equal(report.failures.length, 0);
}
