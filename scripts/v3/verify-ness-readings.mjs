import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {writeFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(process.env.STELLARIS_PLAYWRIGHT_PATH).href);
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8580`,{waitUntil:'networkidle'});
  assert.equal(await page.locator('#reading-select option').count(),7);
  const map=await page.locator('.flow-viewport svg').elementHandle();
  for(let i=0;i<7;i++){
    await page.locator('#reading-select').selectOption(String(i));
    assert.ok(await map.evaluate(node=>node.isConnected),'changing prose perspective must retain the unchanged map');
    const text=await page.locator('.narrative').innerText();
    const openings=['清空她的珍宝库','归还她辛苦赚来的宝藏','把她的全部积蓄都送出去'];
    openings.forEach((s,n)=>assert.equal(text.includes(s),n===(i===6?0:Math.floor(i/2))));
    const gestalt=i<6&&i%2===1;
    assert.equal(text.includes('强大的独立思想者'),gestalt);
    assert.equal(text.includes('培训下一代飞行员'),!gestalt);
    const buttons=await page.locator('.choice-button').allTextContents();
    assert.equal(buttons.some(s=>s.includes('融入我们的意识')),gestalt);
    assert.equal(buttons.some(s=>s.includes('训练新驾驶员')),!gestalt);
    assert.equal(buttons.some(s=>s.includes('牢底坐穿')),i!==6);
    assert.equal(await page.locator('.narrative section').count(),gestalt||i===6?2:3);
  }
  assert.deepEqual(errors,[]);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL||'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8575`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#reader-title')?.textContent.includes('无价之宝'));
  await page.locator('.choice-button').nth(1).click();
  await page.locator('.continuation [data-chapter="grand_archive.8580"]').click();
  await page.locator('#reading-select').waitFor();
  assert.equal(await page.locator('#reading-select').inputValue(),'2');
  await page.locator('#reading-back').click();
  assert.equal(await page.locator('.choice-button').nth(1).getAttribute('aria-expanded'),'true');
  await page.locator('.choice-button').nth(2).click();
  await page.locator('.continuation [data-chapter="grand_archive.8580"]').click();
  await page.locator('#reading-select').waitFor();
  assert.equal(await page.locator('#reading-select').inputValue(),'4');
  await page.locator('#reading-back').click();
  await page.locator('[data-reading="1"]').click();
  assert.equal(await page.locator('.choice-button[aria-expanded="true"]').count(),0);
  await page.locator('.choice-button').click();
  await page.locator('.continuation [data-chapter="grand_archive.8580"]').click();
  await page.locator('#reading-select').waitFor();
  assert.equal(await page.locator('#reading-select').inputValue(),'6');
  assert.deepEqual(errors,[]);
  await writeFile('verification/v3-ness-readings.json',JSON.stringify({profiles:7,exclusiveHistory:true,civilizationChoices:true,noDuplicatePassages:true,errors},null,2));
  console.log('Seven Ness reading profiles passed.');
}finally{await browser.close();}

