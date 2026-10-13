import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const errors=[];
  for(const [event,choice] of [['8075',0],['8075',1],['8076',0]]){
    const page=await browser.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.${event}`,{waitUntil:'networkidle'});
    await page.locator('.choice-button').nth(choice).click();
    const target='special_projects:TREASURE_HUNTERS_EXHIBITION_PROJECT';
    // 8075's after hook is shared by both choices;8076 enables it in the choice.
    const link=event==='8075'?page.locator(`.continuation [data-chapter="${target}"]`):page.locator(`.choice-response:not([hidden]) [data-chapter="${target}"]`);
    await link.click();
    await page.waitForURL(/TREASURE_HUNTERS_EXHIBITION_PROJECT/);
    await page.locator('.chapter-end [data-chapter="grand_archive.8080"]').click();
    await page.waitForURL(/grand_archive.8080/);
    assert.ok((await page.locator('.narrative').innerText()).includes('乙特'));
    await page.close();
  }
  assert.deepEqual(errors,[]);
  await writeFile('verification/v3-exhibition.json',JSON.stringify({paidRoute:true,refusedPaymentRoute:true,previousProposalRoute:true,errors},null,2));
  console.log('Exhibition paid, unpaid and prior-proposal routes passed.');
}finally{await browser.close();}
