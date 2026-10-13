import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {writeFile,readFile} from 'node:fs/promises';

const runtime = process.env.STELLARIS_PLAYWRIGHT_PATH;
const {chromium} = await import(runtime ? pathToFileURL(runtime).href : 'playwright');
const browser = await chromium.launch({channel:'chrome', headless:true});
try {
  const page = await browser.newPage({viewport:{width:1920,height:1080}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=cybrex&chapter=precursor.2005`, {waitUntil:'networkidle'});
  await page.waitForFunction(() => window.__archiveDiagnostics?.().detail > .995);
  const svg = await page.locator('.flow-viewport svg').elementHandle();
  assert.equal(await page.locator('#chapter-list').evaluate(node=>node.childElementCount),0);
  const size = await svg.evaluate(node => node.width.baseVal.value);
  await page.locator('[data-flow-zoom="0.15"]').click();
  assert.equal(await svg.evaluate(node => node.isConnected), true, 'zoom must retain SVG nodes');
  assert.ok(Math.abs(await svg.evaluate(node => node.width.baseVal.value) - size*1.15) < 1);
  assert.equal(await page.locator('[data-flow-scale]').textContent(), '115%');
  await page.locator('.flow-viewport').evaluate(node => {node.scrollTop=180;});
  const scroll = await page.locator('.flow-viewport').evaluate(node => node.scrollTop);
  await page.locator('[data-flow-image]').click();
  assert.equal(await page.locator('.flow-surface-map').isVisible(), false);
  await page.locator('[data-flow-image]').click();
  assert.equal(await svg.evaluate(node => node.isConnected), true, 'image toggle must retain map');
  assert.equal(await page.locator('.flow-viewport').evaluate(node => node.scrollTop), scroll);
  await page.locator('.chapter-end .reading-next').click();
  await page.waitForURL(/CYBREX_ARCHEOLOGY_1/);
  assert.equal(await page.locator('.flow-connections path.traversed').count(),1);
  await page.locator('.chapter-end .reading-next').click();
  await page.waitForURL(/precursor.2006/);
  assert.equal(await page.locator('.chapter-end .flow-investigations .reading-next').count(),10);
  for(let investigation=2;investigation<=6;investigation++){
    assert.equal(await page.locator('.chapter-end [data-chapter="precursor.2100"]').count(),0);
    const discovery=`precursor.${2000+investigation*5}`;
    await page.locator(`.chapter-end [data-chapter="${discovery}"]`).click();
    await page.locator('.chapter-end .reading-next').click();
    await page.locator('.chapter-end .reading-next').click();
    await page.waitForURL(new RegExp(`precursor.${2001+investigation*5}`));
  }
  assert.equal(await page.locator('.chapter-end [data-chapter="precursor.2100"]').count(),1);
  await page.locator('.chapter-end [data-chapter="precursor.2100"]').click();
  await page.locator('.chapter-end .reading-next').click();
  assert.equal(await page.locator('.chapter-end .flow-outcomes .reading-next').count(),2);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.24115`, {waitUntil:'networkidle'});
  await page.waitForFunction(() => {
    const scene=window.__archiveDiagnostics?.();
    const box=document.querySelector('#flow-surface')?.getBoundingClientRect();
    return scene?.story==='cetana' && scene.detail>.999 && box?.right<innerWidth/2;
  });
  assert.match(await page.locator('.chapter-end .reading-next small').textContent(), /舰队进入/);
  await page.waitForFunction(() => {
    const view=document.querySelector('.flow-viewport');
    const node=view?.querySelector('.flow-node.current');
    if (!node) return false;
    const a=node.getBoundingClientRect(), b=view.getBoundingClientRect();
    return a.left>=b.left && a.right<=b.right && a.top>=b.top && a.bottom<=b.bottom;
  });
  await page.screenshot({path:'verification/v3-cetana-rescue.png'});
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8060`, {waitUntil:'networkidle'});
  await page.getByLabel('对话情境').selectOption('6');
  await page.getByRole('button',{name:/扎克兰是怎么囚禁的你/}).click();
  assert.match(await page.locator('.narrative').textContent(), /扎克兰鞭策/);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=cetana&chapter=crisis.8040`, {waitUntil:'networkidle'});
  assert.equal(await page.locator('#reading-select').count(),0);
  for(let step=0;step<3;step++){
    assert.equal(await page.locator('.choice-button').count(),1);
    assert.equal(await page.locator('.chapter-end .reading-next').count(),0);
    await page.locator('.choice-button').click();
    assert.equal(await page.locator('.chapter-document').evaluate(node=>node.getAnimations().length),0,'dialogue progression must not restart the whole document animation');
  }
  assert.equal(await page.locator('.narrative section').count(),7);
  const firstResponse=await page.locator('.choice-button').textContent();
  await page.getByRole('combobox',{name:'回应视角'}).selectOption('1');
  assert.notEqual(await page.locator('.choice-button').textContent(),firstResponse);
  await page.locator('.choice-button').click();
  assert.ok(await page.locator('.choice-response:not([hidden]) .next-chapter').count()>0);
  const giftTasks=['FOTD_DEFLECTING_FIELDS','FOTD_REVERSED_THRUSTERS','FOTD_COUNTER_SHOT','FOTD_CONTROLLED_SHATTERING'];
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8500`,{waitUntil:'networkidle'});
  await page.locator('.reading-ending').waitFor();
  assert.match(await page.locator('.reading-ending').textContent(),/交易结局/);
  assert.equal(await page.locator('.chapter-end .reading-next').count(),0);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8410`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelectorAll('.choice-button').length===2);
  const replies=[];
  for(let profile=0;profile<3;profile++){
    await page.getByRole('combobox',{name:'对话物种'}).selectOption(String(profile));
    await page.locator('.choice-button').nth(0).click();
    assert.equal(await page.locator('.choice-button').count(),3);
    await page.locator('.choice-button').nth(1).click();
    replies.push(await page.locator('.narrative section').last().textContent());
    assert.equal(await page.locator('.choice-button').count(),4);
    await page.locator('.choice-button').nth(2).click();
    assert.equal(await page.locator('.choice-button').count(),5);
    await page.locator('.choice-button').nth(0).click();
    assert.equal(await page.locator('.choice-button').count(),5,'repeated question must not relock later questions');
  }
  assert.equal(new Set(replies).size,3);
  await page.locator('.choice-button').last().click();
  assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="grand_archive.8415"]').count(),1);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8245`,{waitUntil:'networkidle'});
  await page.getByRole('combobox',{name:'对话物种'}).waitFor();
  assert.equal(await page.locator('.narrative section').count(),1);
  const ransacked=await page.locator('.narrative').textContent();
  await page.getByRole('combobox',{name:'此前的经历'}).selectOption('1');
  assert.equal(await page.locator('.narrative section').count(),1);
  assert.notEqual(await page.locator('.narrative').textContent(),ransacked);
  assert.equal(await page.locator('.choice-button').count(),5);
  await page.locator('.choice-button').nth(1).click();
  const organicAnswer=await page.locator('.narrative section').last().textContent();
  await page.getByRole('combobox',{name:'对话物种'}).selectOption('1');
  assert.equal(await page.locator('.choice-button').count(),5);
  await page.locator('.choice-button').nth(1).click();
  assert.notEqual(await page.locator('.narrative section').last().textContent(),organicAnswer);
  await page.locator('.choice-button').nth(4).click();
  assert.equal(await page.locator('.choice-button').count(),1);
  await page.locator('.choice-button').click();
  assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="grand_archive.8265"]').count(),1);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8205`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelectorAll('.choice-button').length===5);
  const sectionsBefore=await page.locator('.narrative section').count();
  await page.locator('.choice-button').nth(2).click();
  assert.equal(await page.locator('.narrative section').count(),sectionsBefore+2);
  await page.locator('.choice-button').nth(2).click();
  assert.equal(await page.locator('.narrative section').count(),sectionsBefore+2);
  await page.locator('.choice-button').nth(4).click();
  assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="grand_archive.8210"]').count(),1);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_treasure_hunters&chapter=grand_archive.8025`,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelectorAll('.choice-button').length===4);
  assert.equal(await page.locator('.choice-button').count(),4);
  assert.equal(await page.locator('#reading-select').count(),0);
  await page.locator('.choice-button').nth(1).click();
  assert.equal(await page.locator('.choice-button').count(),5);
  assert.equal(await page.locator('.chapter-end .reading-next').count(),0);
  await page.locator('.choice-button').nth(3).click();
  assert.equal(await page.locator('.choice-button').count(),5);
  await page.locator('.choice-button').nth(4).click();
  assert.equal(await page.locator('.choice-button').count(),1);
  assert.ok(await page.locator('.narrative section').count()>=7);
  await page.locator('.choice-button').click();
  assert.equal(await page.locator('.choice-response:not([hidden]) [data-chapter="grand_archive.8045"]').count(),1);
  await page.goto(`${process.env.STELLARIS_PREVIEW_URL || 'http://127.0.0.1:4173/'}#story=origin_fear_of_the_dark&chapter=special_projects%3A${giftTasks[0]}`,{waitUntil:'networkidle'});
  for(let i=0;i<giftTasks.length;i++){
    await page.waitForFunction(id=>document.querySelector('.chapter-end')&&location.hash.includes(id),giftTasks[i]);
    assert.equal(await page.locator('.chapter-end [data-chapter="origin.6180"]').count(),i===3?1:0);
    const convergence=page.locator('.flow-node[data-chapter="origin.6180"]');
    assert.match(await convergence.getAttribute('aria-label'),new RegExp(`措施已读 ${i+1}/4`));
    assert.match(await convergence.getAttribute('aria-label'),/仍拥有母星/);
    if(i<3){
      assert.equal(await page.locator('.chapter-end .flow-investigations .reading-next').count(),3-i);
      await page.locator(`.chapter-end [data-chapter="special_projects:${giftTasks[i+1]}"]`).click();
    }
  }
  await page.locator('.chapter-end [data-chapter="origin.6180"]').click();
  await page.waitForURL(/origin.6180/);
  await page.setViewportSize({width:390,height:844});
  await page.locator('#chapter-toggle').click();
  assert.equal(await page.locator('#flow-surface').isVisible(), true);
  assert.equal(await page.locator('#chapter-toggle').getAttribute('aria-expanded'),'true');
  await page.locator('[data-flow-close]').click();
  assert.equal(await page.locator('#flow-surface').isVisible(), false);
  assert.equal(await page.locator('#chapter-toggle').getAttribute('aria-expanded'),'false');
  assert.deepEqual(errors, []);
  await writeFile('verification/v3-flow-interaction.json', JSON.stringify({
    scope:'Cybrex desktop zoom/image continuity, Cetana conditional footer and mobile close; not full V3 acceptance',
    preservesSvgOnZoom:true, preservesMapOnImageToggle:true, errors,
  },null,2));
  console.log('Flow interaction continuity passed.');
} finally {
  await browser.close();
}
