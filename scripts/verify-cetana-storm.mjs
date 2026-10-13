import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {readFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const c=JSON.parse(await readFile('public/stories/cetana.json','utf8')).chapters.find(c=>c.id==='crisis.9115');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage(), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const surrender of [false,true]){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8250`,{waitUntil:'networkidle'});
   await page.reload({waitUntil:'networkidle'});
   assert.equal(await page.locator('.choice-button').count(),1);
   await page.locator('.choice-button').click();
   assert.equal(await page.locator('.choice-button').count(),2);
   await page.locator('.choice-button').nth(surrender?1:0).click();
   if(surrender){assert.equal(await page.locator('.choice-button').count(),1);await page.locator('.choice-button').click();}
   assert.equal(await page.locator('[data-dialogue-status]').innerText(),'对话已结束');
 }
 for(const [demandId,reportId] of [['crisis.8280','crisis.8305'],['crisis.8285','crisis.8310'],['crisis.8290','crisis.8315'],['crisis.8295','crisis.8320'],['crisis.8300','crisis.8325']]){
 const pops=JSON.parse(await readFile('public/stories/cetana.json','utf8')).chapters.find(c=>c.id===demandId);
 for(let profile=0;profile<4;profile++){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=${demandId}`,{waitUntil:'networkidle'});
   await page.getByLabel('对话情境').selectOption(String(profile));
   const pick=s=>page.locator(`[data-choice-source="${pops.choices.findIndex(x=>x.key===demandId+'.'+s)}"]`);
   assert.equal(await page.locator('.choice-button').count(),[2,3,3,4][profile]);
   await pick(['2','1','4','3'][profile]).click();
   assert.equal(await page.locator('.choice-button').count(),1);
   await page.locator('.choice-button').click();
   assert.equal(await page.locator(`.choice-response:not([hidden]) [data-chapter="${reportId}"]`).count(),profile===1?1:0);
 }
 }
 const failure=JSON.parse(await readFile('public/stories/cetana.json','utf8')).chapters.find(c=>c.id==='crisis.8130');
 for(let profile=0;profile<6;profile++){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8130`,{waitUntil:'networkidle'});
   await page.getByLabel('对话情境').selectOption(String(profile));
   const pick=s=>page.locator(`[data-choice-source="${failure.choices.findIndex(x=>x.key==='crisis.8130.'+s)}"]`);
   assert.equal(await page.locator('.choice-button').count(),profile===0?2:1);
   await pick(profile===0?'c':profile===5?'b':'a').click();
   if(profile===0){assert.equal(await page.locator('.choice-button').count(),1);await pick('2.a').click();}
   assert.equal(await page.locator('.choice-button').count(),[1,1,2,2,3,1][profile]);
   await pick('1.a').click();
   assert.equal(await page.locator('[data-dialogue-status]').innerText(),'对话已结束');
 }
 for(let profile=0;profile<2;profile++){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8085`,{waitUntil:'networkidle'});
   await page.locator(`[data-reading="${profile}"]`).click();
   assert.equal(await page.locator('.choice-button').count(),profile?3:2);
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8090`,{waitUntil:'networkidle'});
   await page.locator(`[data-reading="${profile}"]`).click();
   assert.equal(await page.locator('.choice-button').count(),1);
   await page.locator('.choice-button').click();
   const target=profile?'crisis.8100':'crisis.8095';
   const link=page.locator(`.choice-response:not([hidden]) [data-chapter="${target}"]`);
   assert.match(await link.innerText(),/14天/);
   await link.click();await page.waitForURL(new RegExp(`chapter=${target}`));
   assert.equal(await page.locator('.choice-button').count(),1);
   await page.locator('.choice-button').click();
   assert.equal(await page.locator('.choice-button').count(),profile?4:2);
   if(!profile){
     await page.locator('.choice-button').first().click();
     assert.equal(await page.locator('.choice-button').count(),1);
   }
   await page.locator('.choice-button').first().click();
   assert.equal(await page.locator('[data-dialogue-status]').innerText(),'对话已结束');
 }
 const demand=JSON.parse(await readFile('public/stories/cetana.json','utf8')).chapters.find(c=>c.id==='crisis.8080');
 for(let profile=0;profile<4;profile++){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8080`,{waitUntil:'networkidle'});
   await page.getByLabel('对话情境').selectOption(String(profile));
   const pick=s=>page.locator(`[data-choice-source="${demand.choices.findIndex(x=>x.key==='crisis.8080.'+s)}"]`);
   assert.equal(await page.locator('.choice-button').count(),1);
   await pick(profile%2?'b':'a').click();
   assert.equal(await page.locator('.choice-button').count(),2);
   await pick(profile>=2?'1.c':'1.b').click();
   await pick(profile%2?'3.b':'3.a').click();
   assert.equal(await page.locator('.choice-button').count(),1);
   await pick(profile%2?'5.a':'4.a').click();
   const target=profile%2?'crisis.8105':'special_projects:THE_SYNTH_QUEENS_DATABANK';
   assert.equal(await page.locator(`.choice-response:not([hidden]) [data-chapter="${target}"]`).count(),1);
 }
 for(const id of ['crisis.9100','crisis.9105','crisis.9110']){
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=${id}`,{waitUntil:'networkidle'});
   assert.equal(await page.locator('[data-reading]').count(),2);
   for(let i=0;i<2;i++){
     await page.locator(`[data-reading="${i}"]`).click();
     assert.equal(await page.locator('.choice-button').count(),1);
     if(id==='crisis.9100'){
       const text=await page.locator('.narrative').innerText();
       assert.equal(text.includes('塞塔娜的力量'),i===0);
       assert.equal(text.includes('谁才是指挥家'),i===1);
     }
   }
 }
 await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.9105`,{waitUntil:'networkidle'});
 const finish=page.locator('.continuation [data-chapter="crisis.9110"]');
 assert.match(await finish.innerText(),/同一项目至100%/);await finish.click();
 const contact=page.locator('.continuation [data-chapter="crisis.9115"]');
 assert.match(await contact.innerText(),/7天/);await contact.click();
 const button=key=>page.locator(`[data-choice-source="${c.choices.findIndex(x=>x.key===key)}"]`);
 assert.equal(await page.locator('.choice-button').count(),2);
 assert.equal(await button('crisis.9115.b.nanotech').count(),0);
 await button('crisis.9115.b').click();
 assert.equal(await page.locator('.choice-button').count(),2);
 await button('crisis.9115.1.a').click();
 assert.equal(await page.locator('.choice-button').count(),1);
 await page.getByLabel('对话情境').selectOption('1');
 assert.equal(await button('crisis.9115.b').count(),0);
 await button('crisis.9115.b.nanotech').click();
 assert.equal(await button('crisis.9115.1.b').count(),1);
 const speech=JSON.parse(await readFile('public/stories/cetana.json','utf8')).chapters.find(c=>c.id==='crisis.8045');
 for (const [profile,route,decision,ending] of [
   [0,['a','1.a','2.a'],'8.a','9.a'],
   [0,['b','3.b','4.a','5.a'],'8.b','10.a'],
   [1,['c','6.a','7.a'],'8.c','11.a'],
   [1,['a','1.b'],'8.d','12.a']
 ]) {
   await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8045`,{waitUntil:'networkidle'});
   await page.getByLabel('对话情境').selectOption(String(profile));
   const pick=s=>page.locator(`[data-choice-source="${speech.choices.findIndex(x=>x.key==='crisis.8045.'+s)}"]`);
   assert.equal(await page.locator('.choice-button').count(),3);
   for(const step of route) await pick(step).click();
   assert.equal(await page.locator('.choice-button').count(),2);
   assert.equal(await pick(profile===0?'8.c':'8.a').count(),0);
   await pick(decision).click();
   assert.equal(await page.locator('.choice-button').count(),1);
   await pick(ending).click();
   assert.equal(await page.locator('.choice-response:not([hidden])').count(),1);
   assert.equal(await page.locator('[data-dialogue-status]').innerText(),'对话已结束');
   const response=page.locator('.choice-response:not([hidden])');
   assert.match(await response.locator('[data-chapter="special_projects:THE_SYNTH_QUEENS_STORM"]').innerText(),/继续原项目/);
   assert.match(await response.locator('[data-chapter="special_projects:THE_SYNTH_QUEENS_STORM_2"]').innerText(),/首项调查已完成/);
 }
 assert.deepEqual(errors,[]);
 await page.setViewportSize({width:1600,height:1000});
 await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('#flow-surface')).opacity)>.9);
 assert.match(await page.locator('.flow-node.current').textContent(),/第二次演说：前哨要求/);
 assert.equal(await page.locator('#reader-title').innerText(),'信号传输接入');
 await page.screenshot({path:'verification/v3-cetana-second-speech-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.getByLabel('对话情境').scrollIntoViewIfNeeded();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:'verification/v3-cetana-second-speech-mobile.png'});
 await page.setViewportSize({width:1600,height:1000});
 await page.locator('#reader-language').click();
 assert.match(await page.locator('.flow-node.current').textContent(),/Second address: the outpost demand/);
 assert.match(await page.locator('.flow-key').innerText(),/Other possibilities/);
 await page.getByRole('button',{name:'Zoom in',exact:true}).click();
 await page.getByRole('button',{name:'Locate current chapter',exact:true}).click();
 const current=page.locator('.flow-node.current');
 await current.focus();await current.press('Enter');
 assert.match(page.url(),/crisis.8045/);
 assert.equal(await page.locator('.choice-button').count(),1);
 const investigation=page.locator('.flow-node[data-chapter="crisis.8999"]');
 await investigation.focus();await investigation.press('Enter');
 await page.waitForURL(/chapter=crisis.8999/);
 assert.deepEqual(errors,[]);
 console.log('Storm midpoint → completion → contact and exclusive dialogue branches passed.');
} finally {await browser.close();}
