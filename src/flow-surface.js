import { flowProgress } from './story-flow.js';
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export class FlowSurface {
  constructor(element) {
    this.element = element;
    this.stage = null;
    this.image = false;
    this.zoom = 1;
    this.followCurrent = true;
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.focusTimer);
      if (this.followCurrent) this.focusTimer = setTimeout(() => this.focusCurrent(), 100);
    });
    this.resizeObserver.observe(element);
    element.addEventListener('wheel', () => { this.followCurrent = false; }, {passive:true});
    element.addEventListener('keydown', e => {
      if ((e.key==='Enter'||e.key===' ') && e.target.closest('[data-chapter]')) {e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
    });
    let drag;
    element.addEventListener('pointerdown', e => {
      const viewport=e.target.closest('.flow-viewport');
      if (!viewport || e.target.closest('[data-chapter]')) return;
      this.followCurrent = false;
      drag={viewport,x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};
      viewport.setPointerCapture(e.pointerId);
    });
    element.addEventListener('pointermove', e => {if(drag){drag.viewport.scrollLeft=drag.left+drag.x-e.clientX;drag.viewport.scrollTop=drag.top+drag.y-e.clientY;}});
    element.addEventListener('pointerup',()=>drag=null);
    element.addEventListener('pointercancel',()=>drag=null);
    element.addEventListener('click', e => {
      const zoom = e.target.closest('[data-flow-zoom]');
      if (zoom) this.setZoom(this.zoom + Number(zoom.dataset.flowZoom));
      if (e.target.closest('[data-flow-close]')) this.show(false);
      const stage = e.target.closest('[data-flow-stage]');
      if (stage) { this.stage = Number(stage.dataset.flowStage); this.render(); }
      if (e.target.closest('[data-flow-image]')) this.setImage(!this.image);
      if (e.target.closest('[data-flow-current]')) { this.stage = null; this.followCurrent = true; this.render(); }
    });
  }
  update(story, chapters, current, visited, language, prose, trail = []) {
    const signature=JSON.stringify([current,language,[...visited],trail.map(step=>[step.story,step.chapter,step.choice])]);
    const sameChapters=this.chapters===chapters || (this.chapters?.length===chapters.length && chapters.every((chapter,i)=>chapter===this.chapters[i]));
    const unchanged=this.story===story && sameChapters && this.prose===prose && this.updateSignature===signature;
    if (this.story?.id !== story.id || this.current !== current) { this.stage = null; this.followCurrent = true; }
    if (!sameChapters) this.lookup = new Map(chapters.map(c => [c.id, c]));
    Object.assign(this, {story, chapters, current, visited, language, prose, trail});
    this.element.hidden = !story.flow;
    this.updateSignature=signature;
    if (story.flow && !unchanged) this.render();
  }
  show(force) {
    const open = force ?? !this.element.classList.contains('mobile-open');
    if (open) this.setImage(false);
    this.element.classList.toggle('mobile-open', open);
    document.querySelector('#chapter-toggle')?.setAttribute('aria-expanded', String(open));
  }
  setImage(value) {
    this.image = value;
    this.element.classList.toggle('image-mode', value);
    const map = this.element.querySelector('.flow-surface-map');
    if (map) map.hidden = value;
    const button = this.element.querySelector('[data-flow-image]');
    if (button) button.textContent = value ? '剧情图' : '事件图';
  }
  setZoom(value) {
    const zoom = Math.max(.4, Math.min(1.6, value));
    if (zoom === this.zoom) return;
    this.followCurrent = false;
    const viewport = this.element.querySelector('.flow-viewport');
    const svg = viewport?.querySelector('svg');
    if (!svg) return;
    const ratio = zoom / this.zoom;
    const left = (viewport.scrollLeft + viewport.clientWidth / 2) * ratio - viewport.clientWidth / 2;
    const top = (viewport.scrollTop + viewport.clientHeight / 2) * ratio - viewport.clientHeight / 2;
    this.zoom = zoom;
    svg.setAttribute('width', svg.viewBox.baseVal.width * zoom);
    svg.setAttribute('height', svg.viewBox.baseVal.height * zoom);
    viewport.scrollLeft = left;
    viewport.scrollTop = top;
    this.element.querySelector('[data-flow-scale]').textContent = `${Math.round(zoom * 100)}%`;
  }
  focusCurrent() {
    if (!this.followCurrent || this.image) return;
    const viewport = this.element.querySelector('.flow-viewport');
    const current = viewport?.querySelector('.flow-node.current');
    if (!current || !viewport.clientWidth || !viewport.clientHeight) return;
    const box = current.getBoundingClientRect(), frame = viewport.getBoundingClientRect();
    // Scroll only the map. scrollIntoView also scrolls its document ancestors
    // and can use the stale width from an in-progress card transition.
    viewport.scrollLeft += box.left + box.width / 2 - frame.left - viewport.clientWidth / 2;
    viewport.scrollTop += box.top + box.height / 2 - frame.top - viewport.clientHeight / 2;
  }
  render() {
    const flow = this.story.flow;
    const t=(zh,en)=>this.language==='en'?en:zh;
    const local = value => this.prose(value?.[this.language] || value?.zh || '');
    const stageIndex = this.stage ?? flow.positions[this.current]?.stage ?? 0;
    const stage = flow.stages[stageIndex];
    const progress = flowProgress(flow, this.visited);
    const lookup = this.lookup;
    const graph=stage.mode==='graph';
    const width = graph ? Math.max(540,...stage.nodes.map(id=>flow.positions[id].step*195+200)) : Math.max(540, ...stage.lanes.map(lane => lane.length * 195 + 40));
    const height = graph ? Math.max(190,...stage.nodes.map(id=>flow.positions[id].lane*88+90)) : Math.max(190, stage.lanes.length * 88 + 32);
    const paths = [], nodes = [];
    const traversed = new Set(this.trail.slice(1).map((step,i)=>this.trail[i].chapter+'>'+step.chapter));
    const chosenRoutes = new Set(this.trail.slice(1).map((step,i)=>JSON.stringify([this.trail[i].chapter,step.chapter,this.trail[i].choice])));
    stage.lanes.forEach((lane, li) => lane.forEach((id, ni) => {
      const x = 22 + (graph?flow.positions[id].step:ni) * 195, y = 20 + (graph?flow.positions[id].lane:li) * 88;
      if (ni) paths.push(`<path class="${traversed.has(lane[ni-1]+'>'+id)?'traversed':''}" d="M${x-35} ${y+27}H${x}"/>`);
      const title = local(flow.nodeLabels?.[id] || lookup.get(id)?.title) || t('篇章','Chapter');
      let role = stage.mode === 'parallel' ? [t('发现','Discovery'),t('研究项目','Research project'),t('调查报告','Report')][ni] || '' : stage.mode === 'alternative' ? local(stage.labels?.[li]) : id.startsWith('special_projects:') ? t('研究项目','Research project') : '';
      const group=flow.parallelTasks?.find(group=>group.outcome===id);
      const missing=group?.tasks.filter(task=>!this.visited.has(task)) || [];
      let description=title;
      if(group){
        role=this.language==='en'?`${group.tasks.length-missing.length}/${group.tasks.length} measures read`:`措施已读 ${group.tasks.length-missing.length}/${group.tasks.length}`;
        description+=this.language==='en'?` — ${role}. Success requires all measures and homeworld ownership.`:` — ${role}。成功需完成全部措施且仍拥有母星。`;
        if(missing.length)description+=(this.language==='en'?' Unread: ':' 未读：')+missing.map(task=>local(lookup.get(task)?.title)).join(' / ');
      }
      const state = id === this.current ? 'current' : this.visited.has(id) ? 'visited' : 'unread';
      nodes.push(`<g class="flow-node ${state}" role="button" tabindex="0" data-chapter="${esc(id)}" aria-label="${esc(description)}" transform="translate(${x} ${y})"><title>${esc(description)}</title><rect width="160" height="55" rx="3"/><circle cx="0" cy="27" r="3"/><foreignObject x="12" y="7" width="136" height="43"><div xmlns="http://www.w3.org/1999/xhtml">${role ? `<small>${esc(role)}</small>` : ""}<span>${esc(title)}</span></div></foreignObject></g>`);
    }));
    if(graph) {
      paths.length=0;
      const parallel=new Map();
      for(const edge of flow.edges){
        const key=edge.from+'>'+edge.to;
        if(!parallel.has(key))parallel.set(key,[]);
        parallel.get(key).push(edge);
      }
      for(const edge of flow.edges){
        const a=flow.positions[edge.from],b=flow.positions[edge.to];
        if(!a||!b||a.stage!==stageIndex||b.stage!==stageIndex)continue;
        const siblings=parallel.get(edge.from+'>'+edge.to);
        const offset=(siblings.indexOf(edge)-(siblings.length-1)/2)*Math.min(12,44/Math.max(1,siblings.length-1));
        const x1=22+a.step*195+160,y1=20+a.lane*88+27+offset,x2=22+b.step*195,y2=20+b.lane*88+27+offset;
        const bend=x1+Math.max(18,(x2-x1)/2);
        const description = [local(flow.nodeLabels?.[edge.from] || lookup.get(edge.from)?.title),local(edge.label),local(flow.nodeLabels?.[edge.to] || lookup.get(edge.to)?.title)].filter(Boolean).join(' → ');
        const followed=edge.choice ? chosenRoutes.has(JSON.stringify([edge.from,edge.to,edge.choice])) : traversed.has(edge.from+'>'+edge.to);
        paths.push(`<path class="${followed?'traversed':''}" tabindex="0" data-flow-choice="${esc(edge.choice||'')}" aria-label="${esc(description)}" d="M${x1} ${y1}C${bend} ${y1},${bend} ${y2},${x2} ${y2}"><title>${esc(description)}</title></path>`);
      }
    }
    this.element.classList.toggle('image-mode', this.image);
    this.element.innerHTML = `<div class="flow-surface-toolbar"><span>${esc(local(this.story.title))}</span><button class="flow-mobile-close" data-flow-close aria-label="${t('关闭剧情图','Close story map')}">×</button><button data-flow-image>${this.image ? t('剧情图','Story map') : t('事件图','Event image')}</button></div><div class="flow-surface-map" ${this.image ? 'hidden' : ''}><nav class="flow-stages" aria-label="${t('剧情阶段','Story stages')}">${flow.stages.map((s,i) => `<button data-flow-stage="${i}" class="${i===stageIndex?'active':''} ${progress[i].completed>=progress[i].required?'complete':''}"><small>${String(i+1).padStart(2,'0')}</small>${esc(local(s.title))}</button>`).join('')}</nav><div class="flow-stage-heading"><b>${esc(local(stage.title))}</b><span>${stage.mode==='parallel'?`${progress[stageIndex].completed} / ${stage.required} ${t('线索','clues')}`:stage.mode==='alternative'?t('不同的可能','Alternative outcomes'):''}</span><button data-flow-zoom="-0.15" aria-label="${t('缩小剧情图','Zoom out')}">−</button><small data-flow-scale>${Math.round(this.zoom*100)}%</small><button data-flow-zoom="0.15" aria-label="${t('放大剧情图','Zoom in')}">＋</button><button data-flow-current aria-label="${t('定位当前篇章','Locate current chapter')}">◎</button></div>${stage.note?`<p class="flow-note">${esc(local(stage.note))}</p>`:''}<div class="flow-viewport" tabindex="0" aria-label="${t('剧情路线，可滚动浏览','Story paths, scroll to explore')}"><svg width="${width*this.zoom}" height="${height*this.zoom}" viewBox="0 0 ${width} ${height}" role="group" aria-label="${esc(local(stage.title))}"><g class="flow-connections">${paths.join('')}</g>${nodes.join('')}</svg></div><div class="flow-key"><span>● ${t('当前','Current')}</span><span>━ ${t('本次路线','This route')}</span><span>□ ${t('其他可能','Other possibilities')}</span></div></div>`;
    this.focusCurrent();
  }
}
