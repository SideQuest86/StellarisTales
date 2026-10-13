import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage({viewport:{width:1920,height:1080}});
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cybrex&chapter=precursor.2006`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.__archiveDiagnostics?.().detail>.999);
  assert.match(await page.locator('.flow-node[data-chapter="precursor.2006"]').getAttribute('aria-label'),/创造者克尔的灭亡/);
  assert.match(await page.locator('#reader-title').textContent(),/考古任务已完成/);
  const labels=await page.locator('.flow-node span').allTextContents();
  assert.ok(labels.includes('疑似自杀式撞击'));
  await page.screenshot({path:'verification/v3-cybrex-labels.png'});
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=cybrex&chapter=precursor.2101`,{waitUntil:'networkidle'});
  const optional=page.locator('.reading-next[data-chapter="special_projects:CYBREX_SECRETS"]');
  assert.match(await optional.innerText(),/可选后续/);
  await optional.click();
  assert.match(await page.locator('.flow-note').innerText(),/750/);
  console.log('Cybrex reviewed map labels and original reader title passed.');
}finally{await browser.close();}
