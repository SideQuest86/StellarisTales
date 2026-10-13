import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const runtime=process.env.STELLARIS_PLAYWRIGHT_PATH;
const {chromium}=await import(runtime?pathToFileURL(runtime).href:'playwright');
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1920,height:1080},reducedMotion:'no-preference'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cybrex&chapter=precursor.2005`,{waitUntil:'networkidle'});
  // Extend the real application animation to make an in-flight preference change deterministic.
  await page.evaluate(()=>{
    const original=Element.prototype.animate;
    Element.prototype.animate=function(frames,options){
      return original.call(this,frames,this.matches('.chapter-document')?{...options,duration:10000}:options);
    };
  });
  await page.locator('.chapter-end .reading-next').click();
  await page.waitForFunction(()=>document.querySelector('.chapter-document')?.getAnimations().some(a=>a.playState==='running'));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('reduced-motion'),null,{timeout:5000}).catch(async error=>{console.log(await page.evaluate(()=>({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,classes:document.documentElement.className})),errors);throw error;});
  assert.equal(await page.locator('.chapter-document').evaluate(node=>node.getAnimations().length),0);
  await page.locator('.chapter-end .reading-next').click();
  assert.equal(await page.locator('.chapter-document').evaluate(node=>node.getAnimations().length),0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>!document.documentElement.classList.contains('reduced-motion'));
  await page.setViewportSize({width:390,height:844});
  await page.locator('#chapter-toggle').click();
  await page.locator('.flow-node[data-chapter="precursor.2005"]').click();
  await page.waitForURL(/precursor.2005/);
  assert.equal(await page.locator('#chapter-toggle').getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('#flow-surface').isVisible(),true);
  await page.locator('[data-flow-close]').click();
  assert.equal(await page.locator('#chapter-toggle').getAttribute('aria-expanded'),'false');
  await page.addStyleTag({content:'.chapter-art img { animation-duration:10s; }'});
  await page.locator('.chapter-end .reading-next').click();
  await page.waitForFunction(()=>document.querySelector('.chapter-art img')?.getAnimations().some(animation=>animation.playState==='running'));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.documentElement.classList.contains('reduced-motion'));
  const imageState=await page.locator('.chapter-art img').evaluate(async img=>{
    await img.decode();
    const style=getComputedStyle(img);
    return {animations:img.getAnimations().length,clip:style.clipPath,opacity:style.opacity,width:img.naturalWidth};
  });
  assert.equal(imageState.animations,0);
  assert.equal(imageState.clip,'none');
  assert.equal(imageState.opacity,'1');
  assert.ok(imageState.width>0);
  assert.deepEqual(errors,[]);
  const recovery=await browser.newPage({reducedMotion:'no-preference'});
  // Deliberately drop media change notifications to test lifecycle reconciliation.
  await recovery.addInitScript(()=>{
    const original=MediaQueryList.prototype.addEventListener;
    MediaQueryList.prototype.addEventListener=function(type,...args){if(type!=='change')return original.call(this,type,...args);};
  });
  await recovery.goto(process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await recovery.emulateMedia({reducedMotion:'reduce'});
  await recovery.evaluate(()=>window.dispatchEvent(new Event('focus')));
  await recovery.waitForFunction(()=>document.documentElement.classList.contains('reduced-motion'));
  await recovery.emulateMedia({reducedMotion:'no-preference'});
  await recovery.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
  await recovery.waitForFunction(()=>!document.documentElement.classList.contains('reduced-motion'));
  await recovery.close();
  await writeFile('verification/v3-motion.json',JSON.stringify({scope:'In-flight document WAAPI and mobile image CSS cancellation under OS reduced-motion, suppression on next chapter, mobile map state after chapter navigation',imageState,passed:true,errors},null,2));
  console.log('Motion preference and mobile navigation passed.');
} catch(error) {
  await writeFile('verification/v3-motion.json',JSON.stringify({passed:false,error:String(error),checkedAt:new Date().toISOString()},null,2));
  throw error;
} finally {await browser.close();}
