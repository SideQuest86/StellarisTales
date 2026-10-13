import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const mobile=Boolean(process.env.STELLARIS_MOBILE),viewport=mobile?{width:390,height:844}:{width:1600,height:1000};
 const page=await browser.newPage({viewport}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8580`,{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.__archiveDiagnostics?.().detail>.999);
 if(mobile)await page.locator('#chapter-toggle').click();
 assert.equal(await page.locator('.flow-viewport').isVisible(),true);
 const measured=await page.evaluate(async()=>{
   const tasks=[],intervals=[],zoomCosts=[];
   const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(e=>e.duration)));
   observer.observe({type:'longtask',buffered:false});
   const started=performance.now();let last;
   await new Promise(resolve=>{function frame(now){if(last!==undefined)intervals.push(now-last);last=now;if(now-started<3000)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});
   const svg=document.querySelector('.flow-viewport svg');
   for(let i=0;i<20;i++){
     const start=performance.now();document.querySelector(`[data-flow-zoom="${i%2?'-0.15':'0.15'}"]`).click();zoomCosts.push(performance.now()-start);
     await new Promise(requestAnimationFrame);
   }
   const retained=svg===document.querySelector('.flow-viewport svg');
   await new Promise(requestAnimationFrame);observer.disconnect();
   const stats=values=>{const sorted=[...values].sort((a,b)=>a-b);return {samples:sorted.length,medianMs:sorted[Math.floor(sorted.length*.5)],p95Ms:sorted[Math.floor(sorted.length*.95)],maxMs:sorted.at(-1)};};
   return {frameIntervals:stats(intervals),framesOver33ms:intervals.filter(n=>n>33.4).length,zoomHandler:stats(zoomCosts),longTasksMs:tasks,retainedSvg:retained,scene:window.__archiveDiagnostics(),userAgent:navigator.userAgent,hardwareConcurrency:navigator.hardwareConcurrency};
 });
 assert.ok(measured.retainedSvg);assert.deepEqual(errors,[]);
 if(mobile)assert.equal(measured.scene.framePending,false,'Covered mobile scene must stop its idle frame loop');
 const transitions=[];
 if(process.env.STELLARIS_TRACE)await browser.startTracing(page,{path:'verification/v3-transition-trace.json',screenshots:false,categories:['devtools.timeline','v8.execute','blink.user_timing']});
 for(const [story,chapter] of [['cybrex','precursor.2005'],['cetana','crisis.24115'],['origin_treasure_hunters','grand_archive.8580']]){
   transitions.push(await page.evaluate(async({story,chapter})=>{
     const intervals=[],tasks=[],animationFrames=[],start=performance.now();let last,settled=false;
     const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(e=>e.duration)));observer.observe({type:'longtask'});
     const loafSupported=PerformanceObserver.supportedEntryTypes.includes('long-animation-frame');
     const loaf=new PerformanceObserver(list=>animationFrames.push(...list.getEntries().map(e=>({duration:e.duration,blockingDuration:e.blockingDuration,renderStart:e.renderStart,styleAndLayoutStart:e.styleAndLayoutStart,scripts:e.scripts.map(s=>({duration:s.duration,forcedStyleAndLayoutDuration:s.forcedStyleAndLayoutDuration,sourceURL:s.sourceURL,sourceFunctionName:s.sourceFunctionName}))}))));
     if(loafSupported)loaf.observe({type:'long-animation-frame'});
     location.hash=`story=${story}&chapter=${encodeURIComponent(chapter)}`;
     await new Promise(resolve=>{function frame(now){
       if(last!==undefined)intervals.push(now-last);last=now;
       const scene=window.__archiveDiagnostics?.();
       settled=scene?.story===story&&scene.detail>.999&&scene.artTransition>.999&&scene.outgoing===0&&document.querySelector('.flow-node.current')?.dataset.chapter===chapter;
       if((settled&&now-start>500)||now-start>10000)resolve();else requestAnimationFrame(frame);
     }requestAnimationFrame(frame);});
     await new Promise(requestAnimationFrame);observer.disconnect();loaf.disconnect();
     return {story,chapter,settled,elapsedMs:performance.now()-start,maxFrameIntervalMs:Math.max(...intervals),framesOver33ms:intervals.filter(n=>n>33.4).length,longTasksMs:tasks,loafSupported,longAnimationFrames:animationFrames};
   },{story,chapter}));
 }
 assert.ok(transitions.every(item=>item.settled));assert.deepEqual(errors,[]);
 if(mobile){
   await page.locator('#close-reader').click();
   await page.waitForFunction(()=>window.__archiveDiagnostics().detail<.001&&window.__archiveDiagnostics().framePending);
 }
 if(process.env.STELLARIS_TRACE){
   const trace=JSON.parse((await browser.stopTracing()).toString());
   const durations=trace.traceEvents.filter(event=>event.ph==='X'&&event.dur>0&&['Layout','UpdateLayoutTree','Paint','FunctionCall','EvaluateScript','RunMicrotasks'].includes(event.name));
   const report=durations.sort((a,b)=>b.dur-a.dur).slice(0,25).map(event=>({name:event.name,durationMs:event.dur/1000,data:event.args?.data}));
   await writeFile('verification/v3-transition-costs.json',JSON.stringify(report,null,2));console.log('Longest traced operations:',JSON.stringify(report));
 }
 const result={scope:'Headless desktop Chrome with selected viewport (not physical mobile hardware): visible map, settled reading, twenty zoom clicks, then three cross-dossier navigations with a 500ms minimum observation window. Frame intervals are browser scheduling, not GPU timing; handler duration excludes later paint. No universal FPS claim.',viewport,...measured,transitions,errors,checkedAt:new Date().toISOString()};
 await writeFile(`verification/v3-performance${mobile?'-mobile':''}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
