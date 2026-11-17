// The archetypes in depth: renders archetypes, phases, contexts and the ledger from indepth-data.js.
// Every panel is rendered once and shown or hidden, so print can show them all.
(function () {
  function el(t, c, txt) { var e = document.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; }
  function dl(pairs, cls) { var d = el("dl", cls || ""); pairs.forEach(function (p) { d.append(el("dt", "", p[0]), el("dd", "", p[1])); }); return d; }

  /* ---------- Archetypes ---------- */
  var NET = { "−": ["spends", 8], "±": ["mixed", 50], "·": ["little effect", 50], "+": ["gains", 92] };
  var TINT = { a1: "var(--op-t)", a2: "var(--ag-t)", a3: "var(--res-t)" };
  var host = document.getElementById("archPanels");
  ["a1", "a2", "a3"].forEach(function (k, idx) {
    var a = A[k];
    var p = el("div", "tabpanel arch"); p.id = "arch-" + k; p.setAttribute("role", "tabpanel"); p.setAttribute("aria-labelledby", "tab-" + k);
    p.style.setProperty("--ac", a.color); p.style.setProperty("--at", TINT[k]);
    p.append(el("h3", "gprint", (idx + 1) + " · " + a.name));

    var head = el("div", "arch-head");
    var left = el("div");
    left.append(el("div", "rel", a.rel), el("p", "promise", a.promise));
    var chips = el("div", "chips");
    a.protos.forEach(function (x) { chips.append(el("span", "chip" + (x[1] ? " cdph" : ""), x[0])); });
    left.append(chips, el("p", "small muted", "Prototypes in this archetype. Orange marks CDPH's own use."));
    var side = dl([["What they give", a.gives], ["What they get", a.gets], ["CDPH's part", a.cdph]], "side");
    head.append(left, side);

    var narr = el("div", "narr");
    narr.append(el("div", "who", "The reading"), el("p", "", a.narr));

    var capH = el("h4", "sub", "Flow of capital");
    var capP = el("p", "small muted", "What it gains and what it spends across eight forms of capital. The marker sits left for a net spend, center for mixed, right for a net gain.");
    var wrap = el("div", "tscroll");
    var t = el("table", "captable");
    t.innerHTML = "<thead><tr><th>Capital</th><th>Net</th><th>Gains</th><th>Spends</th></tr></thead>";
    var tb = el("tbody");
    a.cap.forEach(function (c) {
      var tr = el("tr");
      var net = NET[c[1]];
      var td = el("td", "net");
      var sc = el("span", "scale"); sc.setAttribute("aria-hidden", "true");
      var mk = el("i"); mk.style.left = net[1] + "%"; if (c[1] === "·") mk.style.background = "var(--line)";
      sc.append(mk); td.append(sc, el("span", "netw", net[0]));
      tr.append(el("th", "", c[0]), td, el("td", "", c[2]), el("td", "muted", c[3]));
      tb.append(tr);
    });
    t.append(tb); wrap.append(t);

    var trH = el("h4", "sub", "Trades, said out loud");
    var trades = el("div", "grid g3 trades");
    a.trades.forEach(function (x) {
      var c = el("div", "card");
      c.append(el("h4", "", x[0]), el("div", "intent", x[1]), el("p", "", x[2]));
      trades.append(c);
    });
    var check = el("div", "grid g2 checks");
    var c1 = el("div", "card held"); c1.append(el("div", "who", "Kept in check"), el("p", "", a.checked));
    var c2 = el("div", "card breaks"); c2.append(el("div", "who", "Where it breaks"), el("p", "", a.breaks));
    check.append(c1, c2);

    p.append(head, narr, capH, capP, wrap, trH, trades, check);
    host.append(p);
  });
  var tabs = document.querySelectorAll("#archetypes .tab");
  function selectArch(k, focus) {
    tabs.forEach(function (t) { var on = t.dataset.k === k; t.setAttribute("aria-selected", on ? "true" : "false"); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
    document.querySelectorAll("#archPanels .arch").forEach(function (p) { p.hidden = p.id !== "arch-" + k; });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectArch(t.dataset.k); history.replaceState(null, "", "#" + t.dataset.k); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; selectArch(n.dataset.k, true);
    });
  });

  selectArch("a1");

  /* ---------- Phases ---------- */
  var seg = document.getElementById("phaseSeg"), ph = document.getElementById("phasePanels");
  var COLS = [["a1", "1 · Flights pay their way"], ["a2", "2 · One sky, many readers"], ["a3", "3 · The sky answers to the street"]];
  P.forEach(function (x, n) {
    var b = el("button", "", (n + 1) + " · " + x.name.replace(" commons", ""));
    b.type = "button"; b.setAttribute("role", "radio"); b.dataset.n = n;
    b.addEventListener("click", function () { selectPhase(n); });
    seg.append(b);

    var panel = el("div", "phase"); panel.dataset.n = n;
    panel.append(el("h3", "", "Phase " + (n + 1) + " · " + x.name));
    panel.append(el("p", "small muted", x.sub.charAt(0).toUpperCase() + x.sub.slice(1) + ". Readers: " + x.readers + "."));
    var cols = el("div", "grid g3 phasecols");
    COLS.forEach(function (c) {
      var col = el("div", "card col " + c[0]);
      col.append(el("div", "who", c[1]));
      var ul = el("ul");
      for (var i = 0; i <= n; i++) P[i][c[0]].forEach(function (item) {
        var li = el("li", i === n ? "new" : "old", item); ul.append(li);
      });
      col.append(ul); cols.append(col);
    });
    var gate = el("p", "gate");
    gate.append(el("b", "", n < 2 ? "Gate to the next phase: " : "Gate: "), document.createTextNode(x.gate));
    panel.append(cols, el("p", "small muted legendline", n ? "Bold items are new in this phase; the rest carry over." : ""), gate);
    ph.append(panel);
  });
  function selectPhase(n) {
    seg.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-checked", +b.dataset.n === n ? "true" : "false"); });
    ph.querySelectorAll(".phase").forEach(function (p) { p.hidden = +p.dataset.n !== n; });
  }
  selectPhase(0);

  /* ---------- Contexts ---------- */
  var VERD = { Better: ["good", "Better at scale"], Depends: ["mid", "Depends on terms"], Worse: ["bad", "Worse at scale"], Boundary: ["bad", "Boundary case"] };
  var pick = document.getElementById("ctxPick"), cp = document.getElementById("ctxPanels");
  C.forEach(function (c, i) {
    var b = el("button", "ctx"); b.type = "button"; b.setAttribute("role", "tab"); b.dataset.i = i;
    var v = VERD[c[2]];
    var d = el("span", "vd " + v[0]); d.setAttribute("aria-hidden", "true");
    b.append(d, document.createTextNode(c[0]));
    b.addEventListener("click", function () { selectCtx(i); });
    pick.append(b);

    var card = el("div", "card ctxcard"); card.dataset.i = i; card.setAttribute("role", "tabpanel");
    var top = el("div", "ctxtop");
    var tt = el("div"); tt.append(el("h3", "", c[0]), el("div", "small muted", "Tests archetype " + c[1]));
    top.append(tt, el("span", "tag " + v[0], v[1]));
    card.append(top, dl([["What carries over", c[3]], ["What breaks or has to change", c[4]], ["Holds if", c[5]]], "ctxdl"));
    cp.append(card);
  });
  function selectCtx(i) {
    pick.querySelectorAll(".ctx").forEach(function (b) { b.setAttribute("aria-selected", +b.dataset.i === i ? "true" : "false"); });
    cp.querySelectorAll(".ctxcard").forEach(function (c) { c.hidden = +c.dataset.i !== i; });
  }
  selectCtx(0);

  /* ---------- Ledger ---------- */
  var PUR = { health: "cdph", safety: "ag", emergency: "nav", denied: "red" };
  var F = [["all", "All"], ["health", "Health"], ["safety", "Safety and imagery"], ["emergency", "Emergency"], ["denied", "Refused"]];
  var feed = document.getElementById("feed"), fl = document.getElementById("filters");
  L.forEach(function (e, i) {
    var det = el("details", "entry"); det.dataset.p = e.p;
    var s = el("summary");
    var w = el("span", "what"); w.innerHTML = e.what;
    s.append(el("span", "time", e.t), w, el("span", "pur " + PUR[e.p], e.p === "denied" ? "refused" : e.label));
    det.append(s, dl(e.d));
    if (e.p === "denied") det.open = true;
    feed.append(det);
  });
  F.forEach(function (f) {
    var b = el("button", "ctx", f[1]); b.type = "button"; b.dataset.f = f[0];
    b.addEventListener("click", function () {
      fl.querySelectorAll(".ctx").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      feed.querySelectorAll(".entry").forEach(function (d) { d.hidden = !(f[0] === "all" || d.dataset.p === f[0]); });
    });
    fl.append(b);
  });
  fl.querySelector(".ctx").setAttribute("aria-pressed", "true");
  document.getElementById("lower").addEventListener("click", function () { document.getElementById("lowerMsg").hidden = false; });

  /* ---------- Deep links and print ---------- */
  function fromHash() {
    var h = location.hash.slice(1);
    if (A[h]) { selectArch(h); document.getElementById("archetypes").scrollIntoView(); }
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
  window.__prepPrint = function () { document.querySelectorAll("details").forEach(function (d) { d.open = true; }); };
  window.addEventListener("beforeprint", window.__prepPrint);

  var meta = document.querySelector('meta[name="site-url"]');
  var base = (meta && meta.content) || "";
  if (base) document.querySelectorAll("a[href]").forEach(function (a) { var h = a.getAttribute("href"); if (!/^(https?:|#|mailto:)/.test(h)) a.href = base + h; });
})();
