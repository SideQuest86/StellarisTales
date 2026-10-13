import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
test('reference index retains every chapter without claiming a forward reading order',async()=>{
 const index=JSON.parse(await readFile('public/stories/index.json','utf8'));
 for(const meta of index.stories.filter(s=>s.visible)){
  const d=JSON.parse(await readFile(`public/stories/${meta.id}.json`,'utf8')),nav=d.story.navigation;
  const expected=new Set([...d.chapters.filter(c=>!c.hidden).map(c=>c.id),...(d.story.related||[]).map(c=>c.id)]);
  assert.equal(nav.order.length,expected.size,meta.id);assert.deepEqual(new Set(nav.order),expected,meta.id);
  assert.ok(d.story.flow,'Forward reading must have a causal model');
  for(const c of d.chapters.filter(c=>!c.hidden))for(const edge of [...c.next,...c.choices.flatMap(o=>o.next)])if(expected.has(edge.target))assert.ok(nav.links.some(e=>e.from===c.id&&e.to===edge.target));
 }
});
