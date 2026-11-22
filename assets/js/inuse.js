// "What people touch": the in-use boards as two timelines, an operator's year and a resident's month.
// Reads the boards from the static galleries below it, so the page still works (and prints) without this script.
(function () {
  const host = document.getElementById('inuseView');
  const stat = document.querySelector('#prototypes .inuse-static');
  if (!host || !stat) return;

  const TRACKS = [
    { id: 'op', who: 'Operators', tab: "An operator's year", intro: 'Operators pay in data, not money. One signature a year, then software follows the terms on every flight, and a person only sees what is new.',
      steps: [
        { src: 'img/O1_Terms_Ladder.jpg', when: 'Signed yearly', title: 'The terms ladder' },
        { src: 'img/PT-TERMS_InUse_2.jpg', when: 'Once a year', title: 'Signing' },
        { src: 'img/PT-TERMS_InUse_1.jpg', when: 'Every flight', title: 'The dispatch room' },
        { src: 'img/PT-TERMS_The_Exchange.jpg', when: 'Every flight', title: 'The exchange' },
        { src: 'img/PT-TERMS_InUse_3.jpg', when: 'Rarely', title: 'On the block', other: ['res', 0, "See the resident's side: the block card"] }
      ] },
    { id: 'res', who: 'Residents', tab: "A resident's month", intro: 'Read it, question it, decide it. A card every month, readings the city has to answer, and a public vote whenever someone wants a new use.',
      steps: [
        { src: 'img/R1_Block_Card.jpg', when: 'Monthly', title: 'The block card', other: ['op', 4, "See the operator's side: the same notice"] },
        { src: 'img/R4_Crew_Receipt.jpg', when: 'Each reading', title: 'The crew receipt' },
        { src: 'img/R3_Panel_Ballot.jpg', when: 'When asked', title: 'The panel ballot' }
      ] }
  ];
  // caption and alt text come from the static figures
  const figs = new Map([...stat.querySelectorAll('figure')].map(f => {
    const a = f.querySelector('a'), cap = f.querySelector('figcaption'), b = cap && cap.querySelector('b');
    const text = cap ? [...cap.childNodes].filter(n => n !== b).map(n => n.textContent).join('').trim() : '';
    return [a.getAttribute('href'), { alt: f.querySelector('img').alt, text, label: a.dataset.title || '' }];
  }));
  TRACKS.forEach(t => t.steps.forEach(st => Object.assign(st, figs.get(st.src) || { alt: st.title, text: '' })));

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  host.innerHTML = `
    <div class="iu-head"><div class="iu-tabs" role="tablist" aria-label="Whose view">${TRACKS.map(t => `<button type="button" role="tab" class="iu-tab ${t.id}" data-t="${t.id}"><span>${t.who}</span>${t.tab}</button>`).join('')}</div>
    <p class="iu-intro"></p></div>
    <ol class="iu-rail"></ol>
    <div class="iu-stage">
      <a class="iu-shot zoomable" href="#"><img alt=""></a>
      <div class="iu-side" aria-live="polite">
        <div class="iu-k"></div><h4 class="iu-title"></h4><p class="iu-text"></p>
        <div class="iu-nav"><button type="button" class="iu-prev" aria-label="Previous">←</button><span class="iu-pos"></span><button type="button" class="iu-next" aria-label="Next">→</button></div>
        <div class="iu-links"><a class="iu-full" href="#">Open full size</a><a class="iu-other" href="#"></a></div>
      </div>
    </div>`;
  document.getElementById('prototypes').classList.add('has-inuse');
  const $ = s => host.querySelector(s);
  let t = TRACKS[0], i = 0;

  function show(tid, k, focusRail) {
    t = TRACKS.find(x => x.id === tid) || t; i = Math.max(0, Math.min(k, t.steps.length - 1));
    const st = t.steps[i];
    host.dataset.track = t.id;
    host.querySelectorAll('.iu-tab').forEach(b => { const on = b.dataset.t === t.id; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $('.iu-intro').textContent = t.intro;
    $('.iu-rail').innerHTML = t.steps.map((s, k) => `<li><button type="button" data-k="${k}"${k === i ? ' aria-current="step"' : ''}><small>${s.when}</small><span>${s.title}</span></button></li>`).join('');
    const shot = $('.iu-shot'), img = shot.querySelector('img');
    img.src = st.src; img.alt = st.alt;
    shot.href = st.src; shot.dataset.board = st.src; shot.dataset.title = st.label || st.title;
    $('.iu-full').href = st.src; $('.iu-full').dataset.board = st.src; $('.iu-full').dataset.title = st.label || st.title;
    $('.iu-k').textContent = `${t.who} · ${st.when}`;
    $('.iu-title').textContent = st.title;
    $('.iu-text').textContent = st.text;
    $('.iu-pos').textContent = `${i + 1} of ${t.steps.length}`;
    $('.iu-prev').disabled = i === 0; $('.iu-next').disabled = i === t.steps.length - 1;
    const o = $('.iu-other');
    if (st.other) { o.hidden = false; o.textContent = st.other[2] + ' →'; o.dataset.t = st.other[0]; o.dataset.k = st.other[1]; } else o.hidden = true;
    const rb = $(`.iu-rail button[data-k="${i}"]`), rail = $('.iu-rail');
    if (rb && rail.scrollWidth > rail.clientWidth) rail.scrollLeft = rb.parentNode.offsetLeft - (rail.clientWidth - rb.parentNode.offsetWidth) / 2;
    if (focusRail && rb) rb.focus();
    // warm the next board so stepping feels instant
    const nx = t.steps[i + 1]; if (nx) { const p = new Image(); p.src = nx.src; }
  }

  host.addEventListener('click', e => {
    const tab = e.target.closest('.iu-tab'); if (tab) return show(tab.dataset.t, 0);
    const r = e.target.closest('.iu-rail button'); if (r) return show(t.id, +r.dataset.k);
    if (e.target.closest('.iu-prev')) return show(t.id, i - 1);
    if (e.target.closest('.iu-next')) return show(t.id, i + 1);
    const o = e.target.closest('.iu-other'); if (o) { e.preventDefault(); return show(o.dataset.t, +o.dataset.k); }
  });
  $('.iu-rail').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); show(t.id, i + 1, true); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); show(t.id, i - 1, true); }
  });
  $('.iu-tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const k = (TRACKS.indexOf(t) + (e.key === 'ArrowRight' ? 1 : -1) + TRACKS.length) % TRACKS.length;
    show(TRACKS[k].id, 0); host.querySelector(`.iu-tab[data-t="${TRACKS[k].id}"]`).focus();
  });
  show('op', 0);
})();
