import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {readFile,writeFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base=process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/';
  await page.goto(`${base}#story=origin_treasure_hunters&chapter=grand_archive.8580`,{waitUntil:'networkidle'});
  // Choose by the actual source destination, independent of localized labels.
  async function choose(target){
    const response=page.locator(`.choice-response:has([data-chapter="${target}"])`);
    await response.locator('..').locator('.choice-button').click();
    await response.locator(`[data-chapter="${target}"]`).click();
    await page.waitForURL(new RegExp(target));
  }
  await choose('grand_archive.8590');
  assert.equal(await page.locator('.chapter-document [data-chapter="grand_archive.8595"]').count(),0);
  await page.locator('.chapter-end [data-chapter="grand_archive.8600"]').click();
  await page.locator('.chapter-end [data-chapter="grand_archive.8595"]').waitFor();
  await page.locator('#reading-back').click();
  await page.locator('#reading-back').click();
  await choose('grand_archive.8585');
  await page.locator('.chapter-end [data-chapter="grand_archive.8600"]').click();
  await page.waitForURL(/grand_archive.8600/);
  assert.equal(await page.locator('.chapter-document [data-chapter="grand_archive.8595"]').count(),0,'abandoned judgment branch must not unlock the epilogue');
  assert.deepEqual(errors,[]);
  await writeFile('verification/v3-ness-route.json',JSON.stringify({judgmentFinaleBeforeEpilogue:true,backtrackingRemovesJudgmentPrerequisite:true,errors},null,2));
  console.log('Ness route and backtracking passed.');
}finally{await browser.close();}
