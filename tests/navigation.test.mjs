import test from 'node:test';import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';import {nextUnread} from '../src/story-map.js';
test('branch switching never requires a directory to reach remaining chapters',()=>{
 const order=['start','a','ending-a','b','ending-b'];const visited=new Set(['start','b']);
 let current='b';while((current=nextUnread(order,current,visited)))visited.add(current);
 assert.deepEqual(new Set(order),visited);
});
test('all dossiers have an exact spanning chapter tree with every original internal edge',async()=>{
 const index=JSON.parse(await readFile('public/stories/index.json','utf8'));
 for(const meta of index.stories.filter(s=>s.visible)){
  const d=JSON.parse(await readFile(`public/stories/${meta.id}.json`,'utf8')),nav=d.story.navigation;
  const expected=new Set([...d.chapters.filter(c=>!c.hidden).map(c=>c.id),...(d.story.related||[]).map(c=>c.id)]);
  assert.equal(nav.order.length,expected.size,meta.id);assert.deepEqual(new Set(nav.order),expected,meta.id);
  const visited=new Set();let current=nav.order[0];while(current){assert.ok(!visited.has(current));visited.add(current);current=nextUnread(nav.order,current,visited);}assert.equal(visited.size,expected.size);
  for(const c of d.chapters.filter(c=>!c.hidden))for(const edge of [...c.next,...c.choices.flatMap(o=>o.next)])if(expected.has(edge.target))assert.ok(nav.links.some(e=>e.from===c.id&&e.to===edge.target));
 }
});
