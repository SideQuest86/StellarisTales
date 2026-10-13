import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const dossier=JSON.parse(await readFile('public/stories/cetana.json','utf8'));
const chapter=dossier.chapters.find(c=>c.id==='crisis.8060');
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8060`,{waitUntil:'networkidle'});
 const button=s=>page.locator(`[data-choice-source="${chapter.choices.findIndex(c=>c.key==='crisis.8060.'+s)}"]`);
 const context=page.getByLabel('对话情境');
 assert.equal(await page.locator('#reading-select').count(),0);
 assert.equal(await page.locator('.choice-button').count(),4);
 await button('a').click();assert.equal(await page.locator('.choice-button').count(),2);
 await button('1.b').click();assert.equal(await page.locator('.choice-button').count(),4);
 await context.selectOption('1');await button('war').click();
 assert.equal(await button('war.1.a').count(),0);
 await button('war.b').click();assert.equal(await button('war').count(),1);
 await button('war').click();await button('war.a').click();
 assert.equal(await page.locator('.choice-button').count(),1);
 await button('war.1.a').click();assert.match(await page.locator('.choice-response:not([hidden])').innerText(),/7天/);
 await context.selectOption('6');await button('h').click();assert.equal(await button('8.b').count(),0);
 await button('8.a').click();await button('8.1.a').click();assert.equal(await button('h').count(),0);
 await button('z').click();assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="shroud_forged.700"]').count(),0);
 await context.selectOption('11');await button('h').click();await button('8.b').click();await button('8.1.c').click();
 await button('z').click();assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="shroud_forged.700"]').count(),1);
 for(const [profile,topic,state,count] of [[2,'d',4,2],[3,'e',5,1],[4,'f',6,2],[5,'g',7,1],[7,'i',9,2],[8,'j',10,2],[9,'k',11,2],[10,'l',12,1]]){
   await context.selectOption(String(profile));
   assert.equal(await page.locator('.choice-button').count(),5);
   await button(topic).click();assert.equal(await page.locator('.choice-button').count(),count);
   await button(`${state}.a`).click();
   assert.equal(await button(topic).count(),0);assert.equal(await page.locator('.choice-button').count(),4);
 }
 await context.selectOption('0');
 for(const [topic,reply] of [['b','2.2'],['c','3.b']]){
   await button(topic).click();assert.equal(await page.locator('.choice-button').count(),2);
   await button(reply).click();assert.equal(await button(topic).count(),1);
 }
 await page.setViewportSize({width:390,height:844});
 await context.selectOption('11');await button('h').click();await button('8.b').click();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('select[aria-label="对话情境"]').scrollIntoViewIfNeeded();
 await page.screenshot({path:'verification/v3-cetana-dialogue-mobile.png'});
 assert.deepEqual(errors,[]);console.log('Cetana conversation loops, war confirmation and gated Animator exit passed.');
}finally{await browser.close();}
