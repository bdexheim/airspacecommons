// Runs inside the page, in print media, before the PDF is made.
// It previews pagination by flowing the body into page-sized columns (columns follow the same
// break rules as pages), then starts a section on a fresh page when it would begin low on a page
// and run onto the next. (Experimental figure-scaling rules are kept behind SCALE.) Returns a log.
(({ PW, PH, SCALE = false }) => {
  const log = [];
  const IMGISH = 'figure,.figure,.zoomable,.shot,.sky,.scrolly,.commons2,.gallery,.hero-shot,svg';
  const ATOM = 'figure,.figure,.card,.gcard,.stand,.conds,.cases,.gallery,.commons2,.sky,.scrolly,table,.tabpanel,.sheet,.capr,.lrow,.phase,.ctxcard,.entry,.pcard';
  const forced = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).breakBefore === 'page');
  forced.forEach(e => (e.dataset.pb = 1));
  const st = document.createElement('style');
  st.textContent = `#__cols{column-width:${PW}px;column-gap:0;column-fill:auto;height:${PH}px;width:${PW}px}#__cols [data-pb],#__cols .pbreak{break-before:column!important}`;
  document.head.append(st);
  const wrap = document.createElement('div'); wrap.id = '__cols';
  [...document.body.childNodes].forEach(n => wrap.append(n)); document.body.append(wrap);
  const W = wrap.getBoundingClientRect();
  const pos = el => { const r = el.getClientRects()[0]; if (!r) return null; return { p: Math.floor((r.left - W.left + 1) / PW), y: r.top - W.top }; };
  const lastPos = el => { const rs = el.getClientRects(); const r = rs[rs.length - 1]; if (!r) return null; return { p: Math.floor((r.left - W.left + 1) / PW), y: r.bottom - W.top }; };
  function fills() {
    const f = [];
    wrap.querySelectorAll('p,li,h1,h2,h3,h4,h5,img,svg,tr,dd,dt,figcaption,.card,.btn,.big,span,b,a,td').forEach(e => {
      for (const r of e.getClientRects()) { if (!r.height || r.width > PW + 2) continue; const p = Math.floor((r.left - W.left + 1) / PW); f[p] = Math.max(f[p] || 0, r.bottom - W.top); }
    });
    return f;
  }
  const startsForced = p => [...wrap.querySelectorAll('[data-pb],.pbreak')].some(e => { const q = pos(e); return q && q.p === p && q.y < 30; });
  const outermost = els => els.filter(e => !els.some(o => o !== e && o.contains(e)));
  for (let it = 0; it < 30; it++) {
    let changed = false;
    // 1. a section that begins low on a page and runs onto the next starts on a fresh page
    for (const s of wrap.querySelectorAll('main section:not(.noprint), main > .sheet')) {
      if (s.classList.contains('pbreak') || s.dataset.pb) continue;
      const prev = s.previousElementSibling; if (prev && prev.classList.contains('chap-open')) continue;
      const a = pos(s), b = lastPos(s); if (!a || !b) continue;
      if (a.y > PH * 0.6 && b.p > a.p) { s.classList.add('pbreak'); log.push('break before #' + (s.id || s.className)); changed = true; break; }
    }
    if (changed) continue;
    const f = fills(), n = f.length;
    // Scaling rules below are off: the column preview drifts from Chromium's real pagination by a page or so,
    // so only the section-start rule (above) is reliable enough to act on.
    if (!SCALE) break;
    for (let p = 0; p < n - 1 && !changed; p++) {
      const fill = f[p] || 0;
      // 2. a figure pushed to the next page leaves a big gap: scale it to fit the gap
      if (fill < PH * 0.62 && !startsForced(p + 1)) {
        const first = outermost([...wrap.querySelectorAll(ATOM)].filter(e => { const q = pos(e); return q && q.p === p + 1 && q.y < 40; }))[0];
        if (first && !first.style.zoom) {
          const h = first.getBoundingClientRect().height, room = PH - fill - 14;
          const media = [...first.querySelectorAll('img,svg')].filter(m => !m.parentElement.closest('svg')).reduce((t, m) => t + m.getBoundingClientRect().height, 0);
          const imgish = (first.matches(IMGISH) && !first.matches('.card')) || media > h * 0.55;
          const k = room / h;
          if (h < PH && k < 1 && k >= (imgish ? 0.6 : 0.86)) { first.style.zoom = (k * 0.97).toFixed(3); log.push(`scale ${first.className || first.tagName} to ${(k * 0.97).toFixed(2)}`); changed = true; }
        }
      }
      // 3. a few lines spilling onto a page before a new chapter: shrink the largest figure on the page before
      const nextFill = f[p + 1] || 0;
      if (!changed && nextFill < PH * 0.22 && (p + 2 >= n || startsForced(p + 2)) && !startsForced(p + 1)) {
        const figs = outermost([...wrap.querySelectorAll(IMGISH)].filter(e => { const q = pos(e); return q && q.p === p && !e.style.zoom; }))
          .map(e => [e, e.getBoundingClientRect().height]).sort((x, y) => y[1] - x[1]);
        if (figs[0]) { const [e, h] = figs[0]; const k = (h - nextFill - 24) / h; if (k >= 0.62) { e.style.zoom = k.toFixed(3); log.push(`shrink ${e.className || e.tagName} to ${k.toFixed(2)} to pull a spill back`); changed = true; } }
        if (!changed) {
          // no figure to shrink: tighten the section that spills, slightly
          const spill = outermost([...wrap.querySelectorAll('main section, main .sheet, footer')].filter(e => { const a = pos(e), b = lastPos(e); return a && b && a.p <= p && b.p === p + 1 && !e.style.zoom; }))[0];
          if (spill) { const H = spill.getBoundingClientRect().height || (lastPos(spill).p - pos(spill).p + 1) * PH; const span = (p + 1 - pos(spill).p) * PH + nextFill - pos(spill).y; const k = (span - nextFill - 30) / span; if (k >= 0.88) { spill.style.zoom = k.toFixed(3); log.push(`tighten #${spill.id || spill.tagName} to ${k.toFixed(2)}`); changed = true; } }
        }
      }
    }
    if (!changed) break;
  }
  [...wrap.childNodes].forEach(n => document.body.append(n)); wrap.remove(); st.remove();
  forced.forEach(e => delete e.dataset.pb);
  return log;
})
