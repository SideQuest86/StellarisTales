import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const index=await read('public/data/index.json');
const coverage=await read('public/data/coverage.json');
const shards=await Promise.all(index.groups.map(g=>read(`public/data/groups/${g.id}.json`)));
const records=shards.flat();const byId=new Map(records.map(r=>[r.id,r]));
test('all extracted records remain independently addressable',()=>{
  assert.equal(records.length,index.records.length);
  assert.equal(byId.size,records.length);
  assert.equal(coverage.records,records.length);
  assert.deepEqual(coverage.parseErrors,[]);
  assert.deepEqual(coverage.inlineErrors,[]);
  assert.deepEqual(coverage.duplicateIds,[]);
});
test('every static branch target resolves, including projects and archaeological stages',()=>{
  for(const r of records)for(const edge of r.links)assert.ok(byId.has(edge.target),`${r.id} -> ${edge.target}`);
  assert.ok(byId.get('akx.9000').options[0].links.some(e=>e.target==='special_projects:HORIZON_SIGNAL_PROJECT'));
  assert.ok(byId.get('special_projects:HORIZON_SIGNAL_PROJECT').links.some(e=>e.target==='akx.9001'));
  assert.ok(byId.get('archaeological_site_types:site_ruins_of_shallash').links.some(e=>e.target==='federations2.2'));
  assert.ok(byId.get('astral_rifts:riftworld').links.some(e=>e.target==='astral_rift.1'));
});
test('bilingual originals, conditions and choices remain intact',()=>{
  const r=byId.get('akx.9001');
  assert.match(r.titles[0].zh,/视界信号/);assert.match(r.titles[0].en,/Horizon Signal/);
  assert.equal(r.options.length,2);
  assert.ok(r.descriptions[0].zh.length>50);assert.ok(r.descriptions[0].en.length>50);
  assert.ok(records.some(r=>r.descriptions.length>1&&r.descriptions.some(d=>d.condition)));
  assert.ok(records.some(r=>r.options.some(o=>o.conditions)));
  assert.ok(records.some(r=>r.links.some(l=>l.condition.includes('random_list'))));
});
test('all referenced original art exists; sources remain traceable',async()=>{
  for(const url of new Set(index.records.map(r=>r.image).filter(Boolean)))assert.ok((await stat('public/'+url)).size>0);
  for(const r of records){assert.ok(r.source);assert.ok(r.line>0);assert.ok(r.script);}
  const sources=await read('public/data/sources.json');
  assert.ok(sources.every(s=>/^[a-f0-9]{64}$/.test(s.sha256)));
});
