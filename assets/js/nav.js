// Two-level navigation: chapters on top, the sections of the current chapter below.
// A chapter with a single section lists that section's subheadings instead.
(function () {
  const toc = document.getElementById('toc'), t1 = document.getElementById('tier1'), t2 = document.getElementById('tier2');
  if (!toc || !t1 || !t2) return;
  const chapters = [...document.querySelectorAll('.chapter[data-num]')];
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function itemsFor(ch) {
    const secs = [...ch.querySelectorAll(':scope > section[data-short]')];
    if (secs.length > 1) return secs.map(s => [s.id, s.dataset.short, s]);
    const sec = secs[0]; if (!sec) return [];
    const hs = [...sec.querySelectorAll(':scope > h3, :scope > .credits > h3')];
    return hs.map(h => { if (!h.id) h.id = sec.id + '-' + slug(h.textContent); return [h.id, h.textContent.trim(), h]; });
  }
  const MAP = new Map(chapters.map(c => [c, itemsFor(c)]));
  let curCh = null, curItem = null;

  function setChapter(ch) {
    if (ch === curCh) return; curCh = ch; curItem = null;
    t1.querySelectorAll('a[href^="#ch"]').forEach(a => a.classList.toggle('on', !!ch && a.getAttribute('href') === '#' + ch.id));
    t2.innerHTML = '';
    if (!ch) { toc.classList.remove('has2'); return; }
    toc.classList.add('has2');
    const lab = document.createElement('span'); lab.className = 't2lab'; lab.textContent = ch.dataset.num + ' · ' + ch.dataset.title; t2.append(lab);
    MAP.get(ch).forEach(([id, txt]) => { const a = document.createElement('a'); a.href = '#' + id; a.textContent = txt; a.dataset.id = id; t2.append(a); });
  }
  function spy() {
    const line = toc.getBoundingClientRect().bottom + 24;
    let ch = null;
    chapters.forEach(c => { if (c.getBoundingClientRect().top <= line) ch = c; });
    if (ch && ch.getBoundingClientRect().bottom < line) ch = null; // past the last chapter (glossary)
    setChapter(ch);
    if (!ch) return;
    let it = null;
    MAP.get(ch).forEach(([id, , el]) => { if (el.getBoundingClientRect().top <= line) it = id; });
    if (it !== curItem) { curItem = it; t2.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.dataset.id === it)); }
  }
  let raf = 0;
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; spy(); }); }, { passive: true });
  window.addEventListener('resize', spy);
  spy();
  // keep anchored targets clear of the sticky nav
  document.documentElement.style.setProperty('--navh', toc.offsetHeight + 'px');
  new ResizeObserver(() => document.documentElement.style.setProperty('--navh', toc.offsetHeight + 'px')).observe(toc);
})();
