/* English 9 – gemeinsamer Rahmen für Story-Spiele (nutzt tasks.js + game.js)
   Konfiguration in window.GAME:
   id, key, guide:{icon,name}, notesLabel, notesTitle, rulesHtml, startHtml, startButton,
   clueTitle, clueIcon, nextButton, finishHtml(S, rank), ranks:[[maxMistakes,label],…], resumeTitle, STATIONS
   Stationstyp "choose": Karten antippen, genau eine richtig (x.ok), sonst Hinweis x.no */
(function () {
  const G = window.GAME, STATIONS = G.STATIONS;
  const fresh = () => ({ name: "", st: -1, pos: null, mistakes: 0, start: 0, end: 0, done: false, total: 0 });
  let S = fresh();
  const $ = id => document.getElementById(id);
  const save = () => { try { sessionStorage.setItem(G.key, JSON.stringify(S)); } catch (e) { } };
  const load = () => { try { const x = JSON.parse(sessionStorage.getItem(G.key)); if (x && x.name) S = x; } catch (e) { } };
  const me = () => { const s = window.E8 && E8.getSession(); return s ? s.nr : null; };
  const esc = s => String(s).replace(/[<>&"]/g, "");
  function fb(m, g) { const f = $("fb"); if (!f) return; f.className = "feedback " + (g ? "good" : "bad"); f.innerHTML = m; }
  function mistake() { S.mistakes++; save(); }

  function hud() {
    $("hdr").style.display = S.st >= 0 ? "block" : "none";
    if (!$("me").innerHTML) $("me").innerHTML = E8.myAvatar();
    $("steps").innerHTML = STATIONS.map((_, i) => `<span class="${i < S.st || S.done ? "done" : i === S.st ? "now" : ""}">${i + 1}</span>`).join("");
  }
  window.closeOv = () => $("ov").classList.remove("show");
  window.showRules = () => { $("ovc").innerHTML = G.rulesHtml + `<button class="btn primary" onclick="closeOv()">Got it!</button>`; $("ov").classList.add("show"); };
  window.showNotes = () => {
    const c = STATIONS.slice(0, S.done ? STATIONS.length : Math.max(0, S.st)).map(s => `<div class="clue">${s.clue}</div>`).join("") || "<p>Nothing yet. – Noch nichts.</p>";
    $("ovc").innerHTML = `<span class="tag">${G.notesLabel}</span><h2>${G.notesTitle}</h2>${c}<button class="btn primary" onclick="closeOv()">Close</button>`;
    $("ov").classList.add("show");
  };
  window.resetGame = () => { S = fresh(); try { sessionStorage.removeItem(G.key); } catch (e) { } render(); window.scrollTo(0, 0); };

  function startScreen() {
    hud();
    $("app").innerHTML = `<div class="panel"><p style="margin:0 0 14px"><a class="back" href="./">← All exercises</a></p>${G.startHtml()}
      <p class="de">Du kommst nur weiter, wenn alles richtig ist. Falsch beantwortete Aufgaben kommen noch einmal.</p>
      <p class="task">Your name:</p>
      <div class="row"><input class="name" id="nm" maxlength="20" autocomplete="off" placeholder="your name" value="${me() ? "No. " + me() : ""}">
      <button class="btn primary" id="begin">${G.startButton}</button></div><div class="feedback" id="fb"></div></div>`;
    $("begin").onclick = begin;
  }
  function begin() {
    const n = $("nm").value.trim();
    if (!n) { fb("Please enter your name. – Bitte gib deinen Namen ein."); return; }
    S = fresh(); S.name = n; S.nr = me(); S.st = 0; S.start = Date.now();
    S.total = STATIONS.reduce((a, s) => a + (s.type === "choose" ? 1 : s.cards ? s.cards.length : s.pairs ? s.pairs.length : T.count(s)), 0);
    save(); render(); window.scrollTo(0, 0);
  }
  function render() {
    hud();
    if (S.done) return finish();
    if (S.st < 0) return startScreen();
    const st = STATIONS[S.st];
    $("app").innerHTML = `<div class="panel">
      <span class="tag">Step ${S.st + 1} of ${STATIONS.length}</span>
      <h2>${st.icon} ${st.title}</h2>
      <div class="say"><div class="ic">${G.guide.icon}</div><div><b>${G.guide.name}:</b> “${st.say}”</div></div>
      ${st.note ? `<div class="note">${st.note}</div><div class="de">${st.noteDe || ""}</div>` : ""}
      <div class="task">${st.task}</div><div class="de">${st.taskDe}</div>
      <div id="ex"></div><div class="feedback" id="fb"></div></div>`;
    if (st.type === "choose") return choose(st);
    T.run($("ex"), st, { mistake, fb, done: solved, save: p => { S.pos = p; save(); } }, S.pos);
  }
  window.render = render;
  function choose(st) {
    $("ex").innerHTML = `<div class="sus">${st.options.map((x, i) => `<button class="scard" data-i="${i}"><span class="em">${x.em}</span><b>${x.n}</b>${x.s || ""}</button>`).join("")}</div>
      <button class="hbtn" onclick="showNotes()">${G.notesLabelButton || G.notesLabel}</button>`;
    document.querySelectorAll(".scard").forEach(b => b.onclick = () => {
      const x = st.options[+b.dataset.i];
      if (b.classList.contains("wrong")) return;
      if (x.ok) { b.classList.add("right"); fb("✔ " + st.okText, true); document.querySelectorAll(".scard").forEach(c => c.onclick = null); setTimeout(solved, 1800); }
      else { b.classList.add("wrong"); mistake(); fb("✘ " + x.no); }
    });
  }
  function solved() {
    const st = STATIONS[S.st];
    S.st++; S.pos = null;
    if (S.st >= STATIONS.length) { S.done = true; S.end = Date.now(); save(); render(); window.scrollTo(0, 0); return; }
    save(); hud();
    $("app").innerHTML = `<div class="panel center"><div class="big">${G.clueIcon}</div><h2>${G.clueTitle}</h2>
      <div class="clue" style="text-align:left">${st.clue}</div>
      <p class="de">Alles Gefundene steht jederzeit oben unter ${G.notesLabel}.</p>
      <button class="btn primary" id="go">${G.nextButton} →</button></div>`;
    $("go").onclick = () => { render(); window.scrollTo(0, 0); };
  }
  function finish() {
    hud();
    const sec = Math.round((S.end - S.start) / 1000), m = Math.floor(sec / 60), s = sec % 60;
    const rank = (G.ranks.find(r => S.mistakes <= r[0]) || G.ranks[G.ranks.length - 1])[1];
    $("app").innerHTML = `<div class="panel center">
      <div style="width:160px;margin:0 auto 8px;border-radius:50%;overflow:hidden;border:4px solid var(--acc);box-shadow:0 0 24px var(--acc)">${E8.myAvatar()}</div>
      ${G.finishHtml(esc(S.name))}
      <p style="font-size:22px">Rank: <b>${rank}</b></p>
      <p>Mistakes: <b>${S.mistakes}</b> · Time: <b>${m} min ${s} s</b></p>
      <div id="coinbox" style="margin:14px auto;padding:12px;background:var(--deep);border:1px solid var(--acc);border-radius:12px;max-width:460px"></div>
      <p class="small">Show this screen to your teacher. – Zeig diesen Bildschirm deiner Lehrkraft.</p>
      <p class="row" style="justify-content:center"><button class="btn primary" onclick="resetGame()">New player / play again</button>
        <button class="btn" onclick="location.href='./'">← All exercises</button></p></div>`;
    if (window.E8) E8.reportInto("coinbox", G.id, S, save);
  }
  function resumeScreen() {
    hud();
    $("app").innerHTML = `<div class="panel"><span class="tag">${G.resumeTitle}</span><h2>Welcome back!</h2>
      <p>Someone has already started this game on this iPad. – Auf diesem iPad hat schon jemand angefangen.</p>
      <div class="row"><button class="btn primary" onclick="render()">Continue as ${esc(S.name)}</button>
        <button class="btn" onclick="resetGame()">I'm a new player</button></div></div>`;
  }
  Object.defineProperty(window, "S", { get: () => S });
  load();
  if (S.name && me() && S.nr !== me()) { S = fresh(); save(); }
  if (S.name && !S.done && S.st >= 0) resumeScreen(); else render();
})();
