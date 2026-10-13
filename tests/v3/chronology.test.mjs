import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {flowTargets} from '../src/story-flow.js';
const d=JSON.parse(await readFile('public/stories/cybrex.json','utf8'));const f=d.story.flow;
test('Cybrex starts with discovery, not post-homeworld secrets',()=>{const targets=flowTargets(f,'precursor.2000',new Set(['precursor.2000']));assert.equal(targets.length,11);assert.equal(targets[0],'precursor.2005');assert.ok(!targets.includes('ancrel.10250'));});
test('every investigation remains discovery -> project -> report',()=>{for(let n=1;n<=11;n++){const e='precursor.'+(2000+n*5),p='special_projects:CYBREX_ARCHEOLOGY_'+n;assert.deepEqual(flowTargets(f,e,new Set([e])),[p]);assert.deepEqual(flowTargets(f,p,new Set([e,p])),['precursor.'+(2001+n*5)]);}});
test('homeworld is unavailable before six completed investigations',()=>{const seen=new Set();for(let n=1;n<=6;n++){const report='precursor.'+(2001+n*5);seen.add(report);const targets=flowTargets(f,report,seen);assert.equal(targets.includes('precursor.2100'),n===6);assert.ok(!targets.includes('ancrel.10250'));}});
test('first and late arrivals are alternatives, both lead forward to optional secrets',()=>{assert.deepEqual(flowTargets(f,'special_projects:CYBREX_HOMEWORLD_PROJECT',new Set()),['precursor.2101','precursor.2102']);for(const id of ['precursor.2101','precursor.2102'])assert.deepEqual(flowTargets(f,id,new Set([id])),['special_projects:CYBREX_SECRETS']);assert.deepEqual(flowTargets(f,'ancrel.10250',new Set()),[]);});

const load = async id => JSON.parse(await readFile(`public/stories/${id}.json`,'utf8'));
test('Different Black Needle base choices retain their shared hacking project edges',async()=>{
  const {story}=await load('origin_treasure_hunters');
  const edges=story.flow.edges.filter(edge=>edge.from==='grand_archive.8100'&&edge.to==='special_projects:BLACK_NEEDLE_BASE_HACK');
  assert.deepEqual(new Set(edges.map(edge=>edge.choice)),new Set(['grand_archive.8100.a','grand_archive.8100.b','grand_archive.8100.c']));
});
test('Vultaum optional research enters at its project and branches without sequencing outcomes',async()=>{
  const {story}=await load('vultaum'),flow=story.flow;
  assert.deepEqual(flowTargets(flow,'precursor.101',new Set()),['special_projects:VULTAUM_SECRETS']);
  assert.deepEqual(flowTargets(flow,'special_projects:VULTAUM_SECRETS',new Set()),['ancrel.10100']);
  assert.deepEqual(flowTargets(flow,'ancrel.10100',new Set()),['special_projects:VULTAUM_SECRETS_2']);
  assert.deepEqual(new Set(flowTargets(flow,'ancrel.10110',new Set())),new Set(['ancrel.10111','ancrel.10112','ancrel.10113']));
  for(const id of ['ancrel.10111','ancrel.10112','ancrel.10113'])assert.deepEqual(flowTargets(flow,id,new Set()),[]);
  assert.equal(flow.stages[flow.positions['precursor.105'].stage].mode,'reference');
});
test('Traitor outcomes remain alternatives and resume the unresolved sabotage situation',async()=>{
  const d=await load('origin_treasure_hunters');
  const decision=d.chapters.find(c=>c.id==='grand_archive.8520');
  assert.deepEqual(decision.choices[0].next.map(e=>e.label.en),['Machine empire: execute the traitor','Hive empire: execute the traitor','Regular empire: execute the traitor']);
  const lottery=decision.choices.find(c=>c.key==='grand_archive.8520.c');
  assert.ok(lottery.next.every(e=>/random outcome/.test(e.label.en)));
  for(const n of [8526,8527,8528,8531,8532,8533,8535,8536]){
    const id=`grand_archive.${n}`,c=d.chapters.find(c=>c.id===id);
    assert.deepEqual(new Set(flowTargets(d.story.flow,id,new Set([id]))),new Set(['grand_archive.8550','grand_archive.8545','grand_archive.8555']));
    assert.ok(c.next.every(e=>e.conditional));
  }
});
test('Ness farewell and judgment retain the earlier main finale before the distant epilogue',async()=>{
  const d=await load('origin_treasure_hunters');
  for(const id of ['grand_archive.8585','grand_archive.8590']){
    const c=d.chapters.find(c=>c.id===id);
    assert.ok(c.next.some(e=>e.target==='grand_archive.8600'));
  }
  const judgment=d.chapters.find(c=>c.id==='grand_archive.8590');
  const later=judgment.choices.find(c=>c.key==='grand_archive.8590.a').next.find(e=>e.target==='grand_archive.8595');
  assert.match(later.label.en,/1800–3600 days/);
  assert.match(later.label.en,/main finale happens first/);
  assert.deepEqual(flowTargets(d.story.flow,'grand_archive.8590',new Set(['grand_archive.8590'])),['grand_archive.8600']);
  assert.deepEqual(flowTargets(d.story.flow,'grand_archive.8600',new Set(['grand_archive.8585','grand_archive.8600'])),[]);
  assert.deepEqual(flowTargets(d.story.flow,'grand_archive.8600',new Set(['grand_archive.8590','grand_archive.8600'])),['grand_archive.8595']);
});
test('Captain Ness questions unlock in stages and replace exhausted follow-ups',async()=>{
  const d=await load('origin_treasure_hunters');
  const c=d.chapters.find(c=>c.id==='grand_archive.8570'),q=c.dialogue;
  assert.deepEqual(q.stateOrder,['start','first','second','third','fourth']);
  assert.ok(!q.states.start.includes('grand_archive.8570.d'));
  assert.ok(q.states.first.includes('grand_archive.8570.d'));
  assert.ok(q.states.second.includes('grand_archive.8570.e'));
  assert.ok(!q.states.third.includes('grand_archive.8570.e'));
  assert.ok(q.states.third.includes('grand_archive.8570.f'));
  assert.ok(!q.states.fourth.includes('grand_archive.8570.f'));
  assert.ok(q.states.fourth.includes('grand_archive.8570.g'));
  for(const keys of Object.values(q.states))assert.ok(keys.includes('CLOSE_COMMUNICATIONS'));
  assert.deepEqual(q.responseProfiles.map(p=>p.excluded),[[1],[0]]);
  assert.ok(c.choices.find(o=>o.key==='CLOSE_COMMUNICATIONS').next.some(e=>e.target==='grand_archive.8575'));
});
test('Black Needle counterattack resumes bombardment and infiltration outcomes remain alternatives',async()=>{
  const d=await load('origin_treasure_hunters'),next=id=>flowTargets(d.story.flow,id,new Set());
  assert.deepEqual(next('grand_archive.8103'),['special_projects:BLACK_NEEDLE_BASE_BOMBARD_REINFORCEMENTS_KILLED']);
  assert.deepEqual(next('special_projects:BLACK_NEEDLE_BASE_BOMBARD_REINFORCEMENTS_KILLED'),['grand_archive.8105']);
  assert.deepEqual(new Set(next('special_projects:BLACK_NEEDLE_BASE_HACK')),new Set(['grand_archive.8115','grand_archive.8120']));
  for(const id of ['grand_archive.8115','grand_archive.8120'])assert.ok(next(id).includes('special_projects:DECODE_THIRD_MAP_PIECE'));
  assert.ok(!next('grand_archive.8115').includes('grand_archive.8120'));
});
test('Treasure Hunters begins with capsule research before the hidden-system encounter',async()=>{
  const d=await load('origin_treasure_hunters'),next=id=>flowTargets(d.story.flow,id,new Set());
  assert.deepEqual(d.chapters[0].next.map(e=>e.target),['grand_archive.8000']);
  assert.ok(next('grand_archive.8000').includes('special_projects:TREASURE_HUNTERS_ANCIENT_CAPSULE_PROJECT'));
  assert.ok(next('special_projects:TREASURE_HUNTERS_ANCIENT_CAPSULE_PROJECT').includes('grand_archive.8005'));
  assert.ok(next('grand_archive.8005').includes('grand_archive.8015'));
  assert.ok(next('grand_archive.8015').includes('grand_archive.8020'));
  const conversation=d.chapters.find(c=>c.id==='grand_archive.8025');
  const close=conversation.choices.find(c=>c.key==='CLOSE_COMMUNICATIONS');
  assert.match(close.next.find(e=>e.target==='grand_archive.8045').label.en,/disabled/);
  assert.ok(conversation.choices.filter(c=>c.key!=='CLOSE_COMMUNICATIONS').every(c=>!c.next.some(e=>e.target==='grand_archive.8045')));
  assert.match(d.chapters.find(c=>c.id==='grand_archive.8045').next[0].label.en,/surveying/);
  assert.ok(next('special_projects:TREASURE_HUNTERS_CHART_PIECE_2_PROJECT').includes('grand_archive.8055'));
  assert.ok(next('special_projects:TREASURE_HUNTERS_ANCIENT_CAPSULE_2_PROJECT').includes('grand_archive.8060'));
  assert.deepEqual(next('grand_archive.8060'),['grand_archive.8100']);
  assert.ok(next('grand_archive.8130').includes('special_projects:DECODE_THIRD_MAP_PIECE'));
  assert.deepEqual(next('special_projects:DECODE_THIRD_MAP_PIECE'),['grand_archive.8135']);
  assert.deepEqual(next('grand_archive.8135'),['grand_archive.8200']);
  assert.deepEqual(next('grand_archive.8200'),['grand_archive.8205']);
  assert.deepEqual(next('archaeological_site_types:smeegibb_digsite'),['grand_archive.8220']);
  assert.deepEqual(next('grand_archive.8220'),['grand_archive.8225']);
  assert.deepEqual(next('grand_archive.8225'),['grand_archive.8230']);
  assert.deepEqual(new Set(next('grand_archive.8230')),new Set(['grand_archive.8236','grand_archive.8241']));
  assert.deepEqual(next('grand_archive.8236'),['grand_archive.8241']);
  const inax=d.chapters.find(c=>c.id==='grand_archive.8245');
  assert.ok(inax.choices.find(c=>c.key==='CLOSE_COMMUNICATIONS').next.some(e=>e.target==='grand_archive.8265'));
  assert.ok(inax.choices.filter(c=>c.key!=='CLOSE_COMMUNICATIONS').every(c=>!c.next.some(e=>e.target==='grand_archive.8265')));
  assert.ok(next('grand_archive.8265').includes('special_projects:TREASURE_HUNTERS_CHART_PIECE_3_PROJECT'));
  assert.deepEqual(next('grand_archive.8280'),['grand_archive.8285']);
  assert.deepEqual(next('grand_archive.8285'),['grand_archive.8300']);
  assert.ok(!next('grand_archive.8285').includes('grand_archive.8290'));
  assert.deepEqual(new Set(next('special_projects:GATEWAY_VOIDWORMS_KILL_PROJECT')),new Set(['grand_archive.8315','grand_archive.8325','grand_archive.8400']));
  assert.ok(d.chapters.find(c=>c.id==='special_projects:GATEWAY_VOIDWORMS_KILL_PROJECT').next.every(e=>e.conditional&&/After defeating/.test(e.label.en)));
  assert.deepEqual(next('special_projects:RESEARCH_GATEWAY_ACTIVATION_PROJECT'),['grand_archive.8325']);
  for(const project of ['ACTIVATE_GATEWAY_PROJECT','ACTIVATE_GATEWAY_PROJECT_NOMADS'])assert.deepEqual(next('special_projects:'+project),['grand_archive.8400']);
  assert.deepEqual(next('grand_archive.8400'),['grand_archive.8405']);
  assert.deepEqual(next('grand_archive.8405'),['grand_archive.8410']);
  const proposal=d.chapters.find(c=>c.id==='grand_archive.8415');
  assert.deepEqual(proposal.choices.find(c=>c.key==='grand_archive.8415.a').next.map(e=>e.target),['grand_archive.8505']);
  assert.deepEqual(proposal.choices.find(c=>c.key==='grand_archive.8415.b').next.map(e=>e.target),['grand_archive.8500']);
  assert.deepEqual(next('grand_archive.8500'),[]);
  assert.match(d.story.flow.endings['grand_archive.8500'].label.en,/Deal ending/);
  assert.ok(next('situations:situation_sabotage').includes('grand_archive.8555'));
  assert.ok(next('situations:situation_sabotage').includes('grand_archive.8550'));
  assert.match(d.chapters.find(c=>c.id==='situations:situation_sabotage').next.find(e=>e.target==='grand_archive.8520').label.en,/not a ruler, heir or gestalt node/);
  assert.ok(next('grand_archive.8520').includes('grand_archive.8550'));
  for(const id of ['grand_archive.8545','grand_archive.8550'])assert.ok(next(id).includes('special_projects:TREASURE_HUNTERS_BLACK_NEEDLE_PROJECT'));
  assert.deepEqual(next('grand_archive.8555'),['grand_archive.8560']);
  assert.ok(next('grand_archive.8560').includes('special_projects:CAPTAIN_NESS_HOARD_PROJECT'));
});
test('Last Gift requires all four independent countermeasures before success',async()=>{
  const d=await load('origin_fear_of_the_dark'),f=d.story.flow,g=f.parallelTasks[0];
  for(const order of [g.tasks,[...g.tasks].reverse()]){
    const visited=new Set();
    order.forEach((id,i)=>{
      visited.add(id);const targets=flowTargets(f,id,visited);
      assert.equal(targets.includes('origin.6180'),i===3);
      assert.deepEqual(new Set(targets),new Set(i===3?['origin.6180']:order.slice(i+1)));
    });
  }
  assert.ok(!flowTargets(f,'situations:situation_last_gift',new Set()).includes('origin.6175'));
  assert.ok(flowTargets(f,'origin.6185',new Set()).includes('origin.6175'));
  assert.equal(f.edges.filter(e=>e.to==='origin.6180'&&e.condition==='all_tasks').length,4);
  for(const task of g.tasks)assert.ok(f.positions[g.outcome].step>f.positions[task].step);
});
test('Galactic Doorstep swarm victory requires the tagged fleet encounter',async()=>{
  const d=await load('origin_galactic_doorstep');const next=id=>flowTargets(d.story.flow,id,new Set());
  assert.ok(next('origin.1025').includes('origin.1030'));
  assert.ok(!next('origin.1035').includes('origin.1030'));
  assert.ok(next('origin.1012').includes('archaeological_site_types:site_from_gateway_sent'));
  const repair=d.chapters.find(c=>c.id==='origin.1020').next.find(e=>e.target==='origin.1050');
  assert.ok(repair);
  assert.match(repair.label.en,/Galactic Paragons/);
  for(const id of ['origin.1025','origin.1035','origin.1040'])assert.ok(!next(id).includes('origin.1050'));
});
test('Fear of the Dark starts with independent annual encounters, not the midgame finale',async()=>{
  const d=await load('origin_fear_of_the_dark');
  const annual=d.chapters[0].next.filter(e=>/annual encounter/.test(e.label.en));
  assert.deepEqual(annual.map(e=>e.target),['origin.6005','origin.6006','origin.6015','origin.6020']);
  assert.match(d.chapters[0].next.find(e=>e.target==='origin.6145').label.en,/after midgame/);
});
test('Fear of the Dark investigation requires travel then survey, with the alarm after the political response',async()=>{
  const d=await load('origin_fear_of_the_dark'),next=id=>flowTargets(d.story.flow,id,new Set());
  assert.ok(next('special_projects:FOTD_CONFIRM_FINDINGS').includes('origin.6150'));
  assert.ok(next('origin.6150').includes('origin.6155'));
  assert.ok(next('origin.6155').includes('origin.6160'));
  assert.ok(!next('origin.6155').includes('origin.6165'));
  assert.ok(next('origin.6165').includes('origin.6170'));
  const spare=d.chapters.find(c=>c.id==='origin.6160').choices.find(c=>c.key==='origin.6160.b');
  assert.ok(!spare.next.some(e=>e.target==='origin.6165'));
  assert.match(spare.next.find(e=>e.target==='origin.6275').label.en,/every 360 days/);
  assert.match(spare.next.find(e=>e.target==='origin.6275').label.en,/no longer xenophobic/);
});
test('Cetana first speech follows its four dialogue states before the storm project',async()=>{
  const d=await load('cetana'), c=d.chapters.find(c=>c.id==='crisis.8040');
  assert.deepEqual(c.dialogue.steps.map(i=>c.choices[i].key),['crisis.8040.1.a','crisis.8040.2.a','crisis.8040.2.b','crisis.8040.4.a']);
  assert.deepEqual(c.readings,[]);
  for(const i of c.dialogue.steps.slice(0,-1))assert.equal(c.choices[i].responses.length,1);
  assert.ok(c.choices[c.dialogue.steps.at(-1)].next.some(e=>e.target==='special_projects:THE_SYNTH_QUEENS_STORM'));
  const variants=c.choices[c.dialogue.steps.at(-1)].labelVariants;
  assert.equal(variants.length,6);
  assert.equal(variants[1].profile.en,'Militarist');
  assert.equal(new Set(variants.map(v=>v.label.en)).size,6);
});
test('Cetana dialogue retains the original bilingual answer, not just the question',async()=>{
  const d=await load('cetana');
  const choice=d.chapters.find(c=>c.id==='crisis.8060').choices.find(c=>c.key==='crisis.8060.h');
  assert.equal(choice.responses.length,1);
  assert.match(choice.responses[0].zh,/扎克兰/);
  assert.match(choice.responses[0].en,/Zarqlan amassed/);
});
test('Broken Shackles distinguishes the early digsite and civic-specific political opening',async()=>{
  const d=await load('origin_broken_shackles'), edges=d.chapters[0].next;
  assert.deepEqual(edges.map(e=>e.target),['archaeological_site_types:broken_shackles_digsite','origin.5041']);
  assert.match(edges[0].label.en,/first science ship/);
  assert.match(edges[1].label.en,/Parliamentary System or Media Conglomerate/);
  assert.match(edges[1].label.en,/Annual political change/);
  assert.ok(!edges.some(e=>e.target==='origin.5046'));
  for(const [a,b] of [[5015,5020],[5020,5025],[5025,5030],[5030,5035]]){
    assert.ok(flowTargets(d.story.flow,`origin.${a}`,new Set()).includes(`origin.${b}`));
  }
});
test('Cetana rescue requires the Animator agreement and a fleet entering the titan system',async()=>{
  const d=await load('cetana');const chapter=id=>d.chapters.find(c=>c.id===id);
  const project='special_projects:THE_SYNTH_QUEENS_RESHAPING_RITUAL';
  assert.ok(chapter('crisis.24115').choices.find(c=>c.key==='crisis.24115.a').next.some(e=>e.target===project));
  assert.ok(!flowTargets(d.story.flow,'crisis.24120',new Set()).includes(project));
  assert.ok(flowTargets(d.story.flow,'crisis.21110',new Set()).includes('crisis.24100'));
  assert.ok(flowTargets(d.story.flow,project,new Set()).includes('crisis.24250'));
  assert.ok(flowTargets(d.story.flow,'crisis.24250',new Set()).includes('crisis.23020'));
});
test('Cetana countdown keeps warning optional and failure after the war announcement',async()=>{
  const d=await load('cetana');const outgoing=id=>flowTargets(d.story.flow,id,new Set());
  const start=outgoing('situations:situation_synth_queen_doomclock');
  assert.ok(start.includes('crisis.8525'));assert.ok(start.includes('crisis.8515'));
  assert.ok(!start.includes('crisis.8505'));
  assert.ok(outgoing('crisis.8525').includes('crisis.8515'));
  assert.ok(!outgoing('crisis.8525').includes('crisis.8505'));
  assert.ok(outgoing('crisis.8515').includes('crisis.8505'));
  assert.ok(!outgoing('situations:situation_synth_queen_player_facing').includes('crisis.9010'));
  assert.ok(outgoing('crisis.9000').includes('crisis.9010'));
  assert.ok(outgoing('crisis.9010').includes('crisis.23015'));
  assert.ok(outgoing('crisis.8516').includes('crisis.23015'));
  assert.ok(outgoing('crisis.8516').includes('crisis.8505'));
  assert.ok(!outgoing('crisis.23015').includes('crisis.8505'));
  assert.ok(!outgoing('crisis.24250').includes('crisis.8505'));
});
test('Cetana is a separate crisis from Cosmogenesis despite sharing a file',async()=>{
  const a=await load('cetana'), b=await load('cosmogenesis');
  assert.equal(a.story.start,'crisis.8035');assert.equal(b.story.start,'crisis.7100');
  assert.ok(!a.chapters.some(c=>c.id==='crisis.7100'));assert.ok(!b.chapters.some(c=>c.id==='crisis.8505'));
  const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));
  assert.equal(ix.recordToStory['crisis.10001'],'unbidden');
  assert.equal(ix.recordToStory['crisis.1007'],'unbidden');
  assert.ok(flowTargets(a.story.flow,'crisis.8035',new Set()).includes('crisis.8039'));
  for(const [from,to] of [['crisis.7100','crisis.7105'],['crisis.7105','crisis.7110'],['crisis.7110','crisis.7115'],['crisis.7115','crisis.7120']]){
    assert.ok(flowTargets(b.story.flow,from,new Set()).includes(to));
  }
});
test('synthetic bodies require the identity decision before situation completion',async()=>{
  const d=await load('origin_synthetic_fertility');
  const outgoing=id=>flowTargets(d.story.flow,id,new Set());
  assert.deepEqual(outgoing('situations:situation_synthetic_fertility_synthesization'),['machine_age.3305']);
  assert.deepEqual(outgoing('machine_age.3305'),['machine_age.3310']);
  assert.deepEqual(outgoing('machine_age.3310'),['machine_age.3315']);
});
test('reviewed clone, fertility and Sacred Path openings exclude later outcomes',async()=>{
  for(const [id,target] of [['origin_clone_army','clones.10'],['origin_synthetic_fertility','machine_age.3100'],['origin_sacred_path','nomads.2005']]){
    const d=await load(id);assert.deepEqual(d.chapters[0].next.map(e=>e.target),[target]);
  }
  const d=await load('origin_synthetic_fertility');
  for(const [from,to] of [['machine_age.3100','machine_age.3110'],['machine_age.3110','machine_age.3115'],['machine_age.3115','machine_age.3120'],['machine_age.3120','machine_age.3125']]){
    assert.ok(flowTargets(d.story.flow,from,new Set()).includes(to));
  }
});
test('Baol stage 2024 stays between 2013 and 2015',async()=>{const d=await load('baol');const outgoing=id=>flowTargets(d.story.flow,id,new Set());assert.ok(outgoing('ancrel.2013').includes('ancrel.2024'));assert.ok(outgoing('ancrel.2024').includes('ancrel.2015'));});
test('Oracle and Sentinels are independent random encounters',async()=>{const a=await load('the-oracle'),b=await load('the-sentinels');assert.equal(a.story.start,'ancrel.4031');assert.equal(b.story.start,'ancrel.4051');assert.ok(!a.chapters.some(c=>c.id==='ancrel.4051'));assert.ok(!b.chapters.some(c=>c.id==='ancrel.4031'));});
test('Sentinel battle outcomes attach only to the hostile response',async()=>{const d=await load('the-sentinels');const c=d.chapters.find(c=>c.id==='ancrel.4060');const hostile=c.choices.find(c=>c.key==='ancrel.4060.a'),peace=c.choices.find(c=>c.key==='ancrel.4060.b');for(const id of ['ancrel.4057','ancrel.4063']){assert.ok(hostile.next.some(e=>e.target===id));assert.ok(!peace.next.some(e=>e.target===id));}});
test('Tower postscript requires recruiting the scientist',async()=>{const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));const d=await load(ix.recordToStory['astral_rift.691']);const c=d.chapters.find(c=>c.id==='astral_rift.691');assert.ok(c.choices.find(c=>c.key==='astral_rift.691.b').next.some(e=>e.target==='astral_rift.696'));assert.ok(!c.choices.find(c=>c.key==='astral_rift.691.a').next.some(e=>e.target==='astral_rift.696'));});
test('astral failed rolls retain their real alternative targets',async()=>{const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));const d=await load(ix.recordToStory['astral_rift.1405']);const c=d.chapters.find(c=>c.id==='astral_rift.1405');const targets=c.choices.flatMap(c=>c.next);assert.ok(targets.some(e=>e.target==='astral_rift.1410'));assert.ok(targets.some(e=>e.target==='astral_rift.1415'&&e.sourceKind==='on_roll_failed'));});
test('an espionage target origin does not make the operation an origin story',async()=>{const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));assert.notEqual(ix.recordToStory['operation.5035'],'origin_necrophage');const d=await load('origin_necrophage');assert.ok(d.chapters.every(c=>!c.id.startsWith('operation.')));});
test('Horizon temple refusal does not unlock its parallel encounters',async()=>{const d=await load('horizon-signal');const c=d.chapters.find(c=>c.id==='akx.9101');assert.equal(c.choices.find(c=>c.key==='akx.9101.c').next.length,0);for(const key of ['akx.9101.a.notspiritual','akx.9101.a.spiritual','akx.9101.b'])assert.ok(c.choices.find(c=>c.key===key).next.some(e=>e.target==='akx.10000'));});
test('pre-FTL ages advance in order and keep enlightenment separate',async()=>{const d=await load('pre-ftl-ages'),f=d.story.flow;for(let n=200;n<1000;n+=100)assert.deepEqual(flowTargets(f,'preftl.'+n,new Set()),['preftl.'+(n+100)]);assert.deepEqual(flowTargets(f,'preftl.1000',new Set()),['preftl.1100','preftl.1105']);assert.deepEqual(flowTargets(f,'preftl.1100',new Set()),['preftl.180']);assert.deepEqual(flowTargets(f,'preftl.1105',new Set()),[]);});
test('plague follows the selected intervention and later state gates',async()=>{const d=await load('pre-ftl-plague');const choice=(id,key)=>d.chapters.find(c=>c.id===id).choices.find(c=>c.key===key).next.map(e=>e.target);assert.deepEqual(choice('preftl.2001','preftl.2001.b'),['preftl.2008','preftl.2009']);assert.deepEqual(choice('preftl.2008','preftl.2008.a'),['preftl.2020']);assert.deepEqual(choice('preftl.2006','preftl.2006.a'),['preftl.2026']);assert.equal(d.story.flow.positions['situations:situation_pre_ftl_plague'].stage,1);});
test('Prethoryn begins with echoes and excludes other crisis ascensions',async()=>{const d=await load('prethoryn-scourge');assert.equal(d.story.start,'crisis.11');for(const id of ['crisis.4130','biocrisis.15','ambition.115'])assert.ok(!d.chapters.some(c=>c.id===id));for(const [a,b] of [['crisis.11','crisis.13'],['crisis.13','crisis.15'],['crisis.16','crisis.18'],['crisis.18','crisis.20']])assert.ok(flowTargets(d.story.flow,a,new Set()).includes(b));});
test('reviving different leviathans does not merge their stories',async()=>{const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));const ids=['aquatics.105','ancrel.4024','leviathans.670','distar.212','distar.5011'];assert.equal(new Set(ids.map(id=>ix.recordToStory[id])).size,ids.length);const d=await load('origin_here_be_dragons');assert.deepEqual(d.chapters[0].next.map(e=>e.target),['aquatics.150']);assert.ok(!d.chapters.some(c=>c.id==='aquatics.1'));assert.ok(flowTargets(d.story.flow,'aquatics.255',new Set()).includes('aquatics.260'));assert.ok(flowTargets(d.story.flow,'aquatics.260',new Set()).includes('aquatics.265'));});
test('origin openings follow setup scripts, not late rootless events',async()=>{for(const [id,target] of [['origin_galactic_doorstep','origin.1000'],['origin_shoulders_of_giants','archaeological_site_types:site_ex_gravitas'],['origin_scion','origin.10'],['origin_mindwardens','shroud.6050'],['origin_legendary_leader','paragon.5004']]){const d=await load(id);assert.deepEqual(d.chapters[0].next.map(e=>e.target),[target]);}const ix=JSON.parse(await readFile('public/stories/index.json','utf8'));assert.equal(ix.recordToStory['origin.1100'],'origin_galactic_doorstep');assert.equal(ix.recordToStory['origin.1199'],'origin_shoulders_of_giants');});
test('source month/year timers are not silently treated as immediate',async()=>{const ix=JSON.parse(await readFile('public/data/index.json','utf8'));const meta=ix.records.find(r=>r.id==='shroud.6000');const group=JSON.parse(await readFile(`public/data/groups/${meta.group}.json`,'utf8'));const r=group.find(r=>r.id===meta.id);assert.equal(r.links.find(e=>e.target==='shroud.6050').months,'3');assert.equal(r.links.find(e=>e.target==='shroud.6125').years,'12');});
