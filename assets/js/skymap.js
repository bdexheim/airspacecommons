// "The sky over one block": one isometric block reused in two places.
//   #skyReaders  (How we got here)   turn readers on, see where they collide, jump to the moment that settles it
//   #skyYear     (Action situations) six pins, an index into the chapters below
(function () {
  const W = 1672, H = 941;
  const READERS = [
    { id: 'cdph', name: 'CDPH', c: 'var(--cdph)', anchor: true, text: "The first tenant. Reads air quality over burdened blocks so the inspector's morning list starts in the right place." },
    { id: 'fire', name: 'Fire and emergency', c: 'var(--fire)', text: 'Might need the same drones as CDPH during similar times of emergency.' },
    { id: 'trans', name: 'Transportation', c: 'var(--ag)', text: 'Wants cameras on drones for bridges, streets and roofs, which could heighten surveillance concerns.' },
    { id: 'avi', name: 'Aviation', c: 'var(--navy)', text: 'Wants fewer drones near airports, next to some of our most burdened blocks.' },
    { id: 'op', name: 'Operators', c: 'var(--op)', text: 'Every department asking for something wears down the same goodwill.' },
    { id: 'res', name: 'Residents', c: 'var(--res)', text: "Can say no to how data is used, but not to the flights, and can't see who flew." },
    { id: 'eco', name: 'Ecology', c: 'var(--eco)', text: 'No voice, but affected: Chicago sits on one of the largest migratory bird paths in the country.' }
  ];
  const AGENCIES = ['cdph', 'fire', 'trans'];
  const CLASHES = [
    { id: 'c1', x: 640, y: 405, short: 'Same fleet', title: 'Same fleet, same afternoon', who: ['cdph', 'fire'], moment: 4,
      text: 'A fire next to a burdened block is also a health event. Both want the drones at once, so the split has to be set before the smoke.' },
    { id: 'c2', x: 1095, y: 600, short: 'Ceiling over a burdened edge', title: 'A ceiling over a burdened edge', who: ['cdph', 'avi'], moment: null,
      text: 'The airport wants fewer flights near the runway, and the blocks at its edge are the ones CDPH most needs to read. No moment settles this yet; ground sites have to stand in where flights are blocked.' },
    { id: 'c3', x: 1255, y: 520, short: 'Launching under the ceiling', title: 'Launching under the ceiling', who: ['fire', 'avi'], moment: 4,
      text: 'The fire station sits inside the airport zone. Its emergency flights need a standing rule agreed in advance.' },
    { id: 'c4', x: 515, y: 622, short: 'Cameras over homes', title: 'Cameras over homes', who: ['trans', 'res'], moment: 5,
      text: "Bridge and roof cameras pass over people's windows. Residents can refuse how footage is used, but they can't refuse the flight." },
    { id: 'c5', x: 312, y: 330, short: 'Lanes cross the flyway', title: 'Lanes across the flyway', who: ['op', 'eco'], moment: 2,
      text: 'Delivery lanes leave the hub and cross the lakefront, right where spring and fall migration runs.' },
    { id: 'c6', x: 770, y: 690, short: 'Read, but not seen', title: 'Read, but not seen', who: ['cdph', 'res'], moment: 3,
      text: "CDPH reads the block every morning. The people who live there can't see who flew or what was taken." },
    { id: 'c7', x: 1040, y: 385, short: 'One goodwill, many asks', title: 'One goodwill, many asks', who: ['op'], needAgencies: 2, moment: 1,
      text: 'Each agency comes to the same operators with its own request. Without shared terms, every ask costs a little more.' }
  ];
  const MOMENTS = [
    { n: 1, x: 1040, y: 440, as: 'AS5', verb: 'Set terms', tm: '8:05 am', title: 'The first launch', layers: ['op'], line: 'The hub opens and the terms switch on with the first flight.' },
    { n: 2, x: 440, y: 585, as: 'AS1', verb: 'Collect', tm: '11:42 am', title: 'Two readers, one flight', layers: ['cdph', 'trans', 'eco'], line: 'One pod reads for two agencies, and the route bends around the flyway.' },
    { n: 3, x: 600, y: 478, as: 'AS3', verb: 'Act', tm: '7:58 am', title: 'The list re-sorts', layers: ['cdph', 'res'], line: "Three readings agree, and the inspector's list puts the facility first." },
    { n: 4, x: 1015, y: 672, as: 'AS2', verb: 'Allocate', tm: '2:25 pm', title: 'The handoff', layers: ['fire', 'cdph'], line: 'Fire flies first; health keeps its share of the fleet.' },
    { n: 5, x: 845, y: 598, as: 'AS4', verb: 'Govern', tm: 'Wed and Thu', title: 'No and yes', layers: ['trans', 'res'], line: 'A police request stops at the gate; bridge cameras pass a public vote.' },
    { n: 6, x: 1440, y: 528, as: 'AS6', verb: 'Continue', tm: '11:00 am', title: 'Everything goes quiet', layers: ['ground'], grounded: true, line: 'Every drone is grounded, and nobody goes dark.' }
  ];
  const T = (x, y, s, size, fill, w = 700, anchor = 'start') => `<text x="${x}" y="${y}" font-family="Public Sans,Arial" font-weight="${w}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
  const D = (x, y, color, cls) => `<g class="drone" style="color:${color}"><g transform="translate(${x},${y})"><g class="bob ${cls || ''}"><use href="#skyDrone" x="-24" y="-14" width="48" height="28"/></g></g></g>`;
  const OVERLAY = `
<defs>
  <symbol id="skyDrone" viewBox="-24 -14 48 28" overflow="visible"><g fill="currentColor" stroke="#fff" stroke-width="1.5"><path d="M-15,-6 L15,6 M15,-6 L-15,6" stroke="currentColor" stroke-width="3"/><ellipse cx="-16" cy="-7" rx="8" ry="3"/><ellipse cx="16" cy="-7" rx="8" ry="3"/><ellipse cx="-16" cy="7" rx="8" ry="3"/><ellipse cx="16" cy="7" rx="8" ry="3"/><rect x="-7" y="-5" width="14" height="10" rx="3"/></g><ellipse cx="0" cy="20" rx="12" ry="3" fill="#0B2341" opacity=".12" stroke="none"/></symbol>
  <symbol id="skyBird" viewBox="-12 -6 24 10" overflow="visible"><path d="M-11,-4 Q-5,-5 0,1 Q5,-5 11,-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>
  <pattern id="skyHatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="12" height="12" fill="#0B2341" opacity=".05"/><line x1="0" y1="0" x2="0" y2="12" stroke="#0B2341" stroke-width="2" opacity=".22"/></pattern>
</defs>
<g class="layer" data-layer="eco" style="color:#8C7A12">
  <path d="M-60,720 Q200,450 540,60" fill="none" stroke="#8C7A12" stroke-opacity=".13" stroke-width="140" stroke-linecap="round"/>
  <path d="M-60,720 Q200,450 540,60" fill="none" stroke="#8C7A12" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 9"/>
  ${[[47, 600, ''], [161, 478, 'b2'], [281, 346, 'b3'], [407, 204, '']].map(([x, y, c]) => `<g transform="translate(${x},${y})"><g class="bob ${c}"><use href="#skyBird" x="-12" y="-6" width="24" height="10"/><use href="#skyBird" x="8" y="6" width="20" height="9"/></g></g>`).join('')}
  ${T(455, 120, 'Lakefront flyway', 19, '#6E5F0A')}
</g>
<g class="layer" data-layer="avi">
  <path d="M920,590 A460,330 0 0 1 1840,590" fill="#0B2341" fill-opacity=".04" stroke="#0B2341" stroke-opacity=".55" stroke-width="2" stroke-dasharray="8 7"/>
  <ellipse cx="1380" cy="590" rx="460" ry="172" fill="url(#skyHatch)" stroke="#0B2341" stroke-opacity=".6" stroke-width="2" stroke-dasharray="8 7"/>
  ${T(1385, 305, 'Airport ceiling', 20, '#0B2341', 700, 'middle')}${T(1385, 328, 'fewer drones wanted here', 15, '#0B2341', 400, 'middle')}
</g>
<g class="layer" data-layer="op">
  <ellipse cx="1040" cy="458" rx="86" ry="32" fill="#007A65" fill-opacity=".18" stroke="#007A65" stroke-width="2.5"/>
  <g fill="none" stroke="#007A65" stroke-width="3" stroke-dasharray="10 4" class="dash"><path d="M1040,430 C1000,250 700,170 150,140"/><path d="M1040,430 C1100,250 1300,170 1700,130"/><path d="M1040,430 C950,300 600,280 -20,330"/></g>
  ${D(689, 203, '#007A65')}${D(1242, 227, '#007A65', 'b2')}${D(532, 305, '#007A65', 'b3')}
  ${T(1140, 420, 'Delivery hub', 17, '#007A65')}
</g>
<g class="layer" data-layer="trans">
  <polygon points="430,372 322,610 558,610" fill="#5B6B7A" fill-opacity=".14"/><ellipse cx="440" cy="610" rx="120" ry="45" fill="#5B6B7A" fill-opacity=".22" stroke="#5B6B7A" stroke-width="2"/>
  <polygon points="650,452 520,662 720,662" fill="#5B6B7A" fill-opacity=".14"/><ellipse cx="620" cy="662" rx="100" ry="38" fill="#5B6B7A" fill-opacity=".22" stroke="#5B6B7A" stroke-width="2"/>
  ${D(430, 360, '#5B6B7A', 'b2')}${D(650, 440, '#5B6B7A')}
</g>
<g class="layer" data-layer="cdph">
  <path d="M1040,430 C980,300 820,250 712,282" fill="none" stroke="#D86018" stroke-width="3" stroke-dasharray="10 5" class="dash"/>
  <polygon points="700,300 462,502 738,502" fill="#D86018" fill-opacity=".12"/><ellipse cx="600" cy="502" rx="140" ry="53" fill="#D86018" fill-opacity=".2" stroke="#D86018" stroke-width="2.5"/>
  ${D(700, 288, '#D86018')}${T(735, 262, 'Air quality reading', 17, '#B04A0C')}
</g>
<g class="layer" data-layer="fire">
  <ellipse cx="1200" cy="612" rx="96" ry="36" fill="#6B3FA0" fill-opacity=".14" stroke="#6B3FA0" stroke-width="2.5"/>
  <path d="M1200,545 C1150,330 800,240 612,322" fill="none" stroke="#6B3FA0" stroke-width="3" stroke-dasharray="10 5" class="dash"/>
  <ellipse cx="600" cy="500" rx="70" ry="27" fill="none" stroke="#6B3FA0" stroke-width="3" class="pulse"/>
  ${D(600, 334, '#6B3FA0', 'b3')}${T(1300, 700, 'Fire station', 17, '#6B3FA0')}
</g>
<g class="layer" data-layer="res">
  <ellipse cx="680" cy="722" rx="215" ry="82" fill="#2B5FAE" fill-opacity=".14" stroke="#2B5FAE" stroke-width="2.5" stroke-dasharray="2 6" stroke-linecap="round"/>
  ${[[800, 450, ''], [905, 500, 'b2'], [470, 470, 'b3']].map(([x, y, c]) => `<g transform="translate(${x},${y})"><g class="bob ${c}"><circle r="16" fill="#2B5FAE"/>${T(0, 7, '?', 20, '#fff', 800, 'middle')}</g></g>`).join('')}
  ${T(760, 842, 'Who flew over us?', 17, '#2B5FAE')}
</g>
<g class="layer" data-layer="ground">
  ${[[575, 628], [770, 705], [1010, 642], [905, 470], [990, 795]].map(([x, y]) => `<g transform="translate(${x},${y})" fill="#D86018"><rect x="-7" y="-7" width="14" height="14"/><circle r="9" fill="none" stroke="#D86018" stroke-width="2" class="pulse"/></g>`).join('')}
  <g transform="translate(1480,110)" stroke="#0B2341" stroke-width="2.5" fill="#fff"><rect x="-30" y="-8" width="20" height="16"/><rect x="10" y="-8" width="20" height="16"/><rect x="-9" y="-11" width="18" height="22" fill="#0B2341"/></g>
  <path d="M1470,130 L700,560" stroke="#0B2341" stroke-width="2" stroke-dasharray="4 8" opacity=".5" fill="none"/>
  ${T(1515, 150, 'Satellite feed', 16, '#0B2341', 700, 'middle')}${T(1012, 835, 'Ground sensors keep reading', 17, '#B04A0C')}
</g>`;
  const pct = (x, y) => `left:${x / W * 100}%;top:${y / H * 100}%`;
  const R = id => READERS.find(r => r.id === id);
  const el = (h) => { const t = document.createElement('template'); t.innerHTML = h.trim(); return t.content.firstChild; };

  function stage(host, alt) {
    host.insertAdjacentHTML('beforeend', `<div class="sky-stage"><img class="base" src="img/sky_block.webp" alt="${alt}" loading="lazy"><svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${OVERLAY}</svg><div class="hot"></div><div class="hint"></div></div><div class="sky-panel" aria-live="polite"></div>`);
    return { stage: host.querySelector('.sky-stage'), hot: host.querySelector('.hot'), hint: host.querySelector('.hint'), panel: host.querySelector('.sky-panel') };
  }
  const momentLink = n => n ? `<a href="#sit${n}">How the commons handles it: action situation ${n} →</a>` : `<span class="gap">Not yet settled by any action situation · see <a href="#open">What has to change</a></span>`;

  /* ---------- Readers: who reads the sky ---------- */
  const rh = document.getElementById('skyReaders');
  if (rh) {
    const state = { on: new Set(['cdph']), sel: null };
    const bar = el(`<div class="sky-bar" role="group" aria-label="Readers of the airspace"><span class="lbl">Readers</span></div>`);
    rh.append(bar);
    READERS.forEach(r => {
      const b = el(`<button type="button" class="sky-chip${r.anchor ? ' anchor' : ''}" style="--c:${r.c}" data-id="${r.id}"><i></i>${r.name}</button>`);
      b.onclick = () => { state.on.has(r.id) ? state.on.delete(r.id) : state.on.add(r.id); state.sel = null; render(); };
      bar.append(b);
    });
    const all = el(`<button type="button" class="sky-mini">Turn on all seven</button>`); all.onclick = () => { READERS.forEach(r => state.on.add(r.id)); state.sel = null; render(); };
    const clr = el(`<button type="button" class="sky-mini">Reset</button>`); clr.onclick = () => { state.on = new Set(['cdph']); state.sel = null; render(); };
    bar.append(all, clr);
    const s = stage(rh, 'Isometric illustration of one Chicago block: an industrial lot with a smokestack, rowhouses and a corner shop, a park, a clinic, a fire station, an office building with a rooftop drone pad, a bridge over a canal, the lakefront and the corner of an airport runway.');
    CLASHES.forEach(c => {
      const b = el(`<button type="button" class="clash" data-id="${c.id}" style="${pct(c.x, c.y)}" aria-label="Collision: ${c.title}"><i></i><span>${c.short}</span></button>`);
      b.onclick = () => { state.sel = c.id; render(); const x = document.getElementById('coll-' + c.id); x && x.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
      s.hot.append(b);
    });
    const active = () => CLASHES.filter(c => c.who.every(id => state.on.has(id)) && (!c.needAgencies || AGENCIES.filter(a => state.on.has(a)).length >= c.needAgencies));
    function render() {
      bar.querySelectorAll('.sky-chip').forEach(b => b.setAttribute('aria-pressed', state.on.has(b.dataset.id)));
      s.stage.querySelectorAll('.layer').forEach(g => g.classList.toggle('on', state.on.has(g.dataset.layer)));
      const ac = active();
      s.hot.querySelectorAll('.clash').forEach(b => { const on = ac.some(c => c.id === b.dataset.id); b.classList.toggle('on', on); b.classList.toggle('sel', state.sel === b.dataset.id); b.tabIndex = on ? 0 : -1; });
      s.hint.style.display = state.on.size <= 1 ? '' : 'none';
      s.hint.innerHTML = '<b>CDPH is reading the block.</b> Turn on a second reader to see where they want the same sky.';
      const rs = READERS.filter(r => state.on.has(r.id));
      s.panel.innerHTML = `<div class="cols"><div><h4>Reading the sky now</h4>${rs.length ? rs.map(r => `<div class="reader"><i style="background:${r.c}"></i><div><b>${r.name}</b><p>${r.text}</p></div></div>`).join('') : '<div class="empty">Nobody is reading the sky. Pick a reader above.</div>'}</div>
        <div><h4><span class="big">${ac.length}</span> ${ac.length === 1 ? 'collision' : 'collisions'}</h4>${ac.length ? ac.map(c => `<div class="coll${state.sel === c.id ? ' sel' : ''}" id="coll-${c.id}"><div class="who">${c.who.map(id => R(id).name).join(' + ')}${c.needAgencies ? ' + more than one agency' : ''}</div><h5>${c.title}</h5><p>${c.text}</p>${momentLink(c.moment)}</div>`).join('')
        : `<div class="empty">The parts we first called "shared" turned out to be where readers collide. ${state.on.size < 2 ? 'Add a reader to find the first one.' : "These readers don't overlap yet. Try another."}</div>`}</div></div>`;
    }
    render();
    window.__skyAll = () => { READERS.forEach(r => state.on.add(r.id)); state.sel = null; render(); };
    // print-only table: every collision and the moment that settles it
    const tb = document.getElementById('skyClashTable');
    if (tb) tb.innerHTML = CLASHES.map((c, i) => `<tr><td><b>${c.title}</b></td><td>${c.who.map(id => R(id).name).join(' + ')}${c.needAgencies ? ' + more than one agency' : ''}</td><td>${c.moment ? `<a href="#sit${c.moment}">${c.moment} · ${MOMENTS[c.moment - 1].title}</a>` : '<span class="gap">Open: no moment yet</span>'}</td></tr>`).join('');
  }

  /* ---------- Year: six moments, an index into the chapters ---------- */
  const yh = document.getElementById('skyYear');
  if (yh) {
    let cur = 1;
    const s = stage(yh, 'The same block with six numbered pins, one for each action situation in the year.');
    s.stage.classList.add('year');
    MOMENTS.forEach(m => {
      const b = el(`<button type="button" class="pin" data-n="${m.n}" style="${pct(m.x, m.y)}" aria-label="Action situation ${m.n}: ${m.title}"><b>${m.n}</b><span>${m.title}</span></button>`);
      b.onclick = () => { cur = m.n; render(); };
      s.hot.append(b);
    });
    function render() {
      const m = MOMENTS[cur - 1];
      s.stage.classList.toggle('grounded', !!m.grounded);
      s.stage.querySelectorAll('.layer').forEach(g => g.classList.toggle('on', m.layers.includes(g.dataset.layer)));
      s.hot.querySelectorAll('.pin').forEach(b => { b.classList.toggle('active', +b.dataset.n === cur); });
      s.hint.style.display = 'none';
      const settles = CLASHES.filter(c => c.moment === m.n);
      s.panel.innerHTML = `<div class="ymom"><div class="fnl">Action situation ${m.n} · ${m.verb} · ${m.tm}</div><h4 class="yt">${m.title}</h4><p>${m.line}</p>
        ${settles.length ? `<p class="small">Settles: ${settles.map(c => c.title.toLowerCase()).join('; ')}.</p>` : `<p class="small">Settles no collision; it keeps the others running when the sky closes.</p>`}
        <div class="ylinks"><a class="bbtn" href="#sit${m.n}">Read the moment ↓</a><a class="bbtn ghostb" href="#anatomy" data-as="${m.as}">See what it activates</a></div></div>`;
    }
    render();
  }

  // Print: every reader on, so the map shows all collisions.
  const prev = window.__prepPrint;
  window.__prepPrint = function () { prev && prev(); window.__skyAll && window.__skyAll(); };
  window.addEventListener('beforeprint', () => window.__skyAll && window.__skyAll());
})();
