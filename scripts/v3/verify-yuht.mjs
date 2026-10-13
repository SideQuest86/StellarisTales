import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=yuht&chapter=precursor.601`,{waitUntil:'networkidle'});
 const link=page.locator('.continuation [data-chapter="over.50"]');
 assert.match(await link.innerText(),/720–1800/);
 await link.click();await page.waitForURL(/chapter=over.50/);
 await page.locator('.choice-button').first().click();
 await page.locator('.choice-response:not([hidden]) [data-chapter="special_projects:YUHT_JABBARDEENI_CACHE"]').click();
 await page.waitForURL(/YUHT_JABBARDEENI_CACHE/);
 const completion=page.locator('.continuation [data-chapter="over.60"]');
 assert.match(await completion.innerText(),/360/);await completion.click();
 await page.waitForURL(/chapter=over.60/);
 await page.locator('.story-summary summary').click();
 assert.match(await page.locator('.story-summary').innerText(),/中英文差异/);
 await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=yuht&chapter=precursor.541`,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('#flow-surface')).opacity)>.9);
 assert.match(await page.locator('.flow-note').innerText(),/180/);
 assert.match(await page.locator('.flow-node.current').textContent(),/未突破光速的殖民船/);
 assert.equal(await page.locator('.flow-node').count(),27);
 await page.screenshot({path:'verification/v3-yuht-map.png'});
 const reader=await browser.newPage();reader.on('pageerror',e=>errors.push(e.message));
 await reader.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=yuht&chapter=precursor.500`,{waitUntil:'networkidle'});
 for(const n of [9,3,7,1,5,2]){
   assert.equal(await reader.locator('.chapter-end [data-chapter="precursor.600"]').count(),0);
   await reader.locator(`.chapter-end [data-chapter="precursor.${500+n*5}"]`).click();
   await reader.locator('.chapter-end .reading-next').click();
   await reader.locator('.chapter-end .reading-next').click();
   await reader.waitForURL(new RegExp(`precursor.${501+n*5}`));
 }
 await reader.locator('.chapter-end [data-chapter="precursor.600"]').click();
 assert.match(await reader.locator('.flow-note').innerText(),/30天重试/);
 await reader.locator('.chapter-end .reading-next').click();
 assert.equal(await reader.locator('.flow-outcomes .reading-next').count(),2);
 await reader.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=yuht&chapter=ancrel.10050`,{waitUntil:'networkidle'});
 assert.equal(await reader.locator('[data-reading]').count(),4);
 for(let i=0;i<4;i++){
   await reader.locator(`[data-reading="${i}"]`).click();
   assert.equal(await reader.locator('.choice-button').count(),1);
 }
 await reader.setViewportSize({width:390,height:844});
 await reader.locator('[data-reading="0"]').click();
 assert.equal(await reader.locator('.chapter-art img').evaluate(img=>img.getAnimations().length),0);
 await reader.locator('.chapter-art img').evaluate(async img=>{
   await img.decode();
   await Promise.all(img.getAnimations().map(animation=>animation.finished.catch(()=>{})));
 });
 assert.equal(await reader.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await reader.screenshot({path:'verification/v3-yuht-mobile-reading.png'});
 await reader.locator('#chapter-toggle').click();
 assert.equal(await reader.locator('#chapter-toggle').getAttribute('aria-expanded'),'true');
 assert.equal(await reader.locator('.flow-viewport').isVisible(),true);
 await reader.screenshot({path:'verification/v3-yuht-mobile-map.png'});
 await reader.locator('[data-flow-close]').click();
 assert.equal(await reader.locator('#chapter-toggle').getAttribute('aria-expanded'),'false');
 await reader.locator('.story-summary summary').click();
 assert.match(await reader.locator('.story-summary').innerText(),/漫长的寻找/);
 assert.deepEqual(errors,[]);console.log('Yuht delayed cross-dossier cache route passed.');
}finally{await browser.close();}
