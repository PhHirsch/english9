/* English 9 – gemeinsame Aufgabentypen für Story-Spiele
   T.run(container, station, hooks) – hooks: {mistake(), done(), fb(msg, good)}
   Typen: pick, type, order, match, spot, sort
   Falsch gelöste Aufgaben (pick/type/order) kommen am Ende der Station noch einmal. */
(function () {
  const css = `
  .t-screen{background:var(--deep);border:1px solid var(--line);border-radius:12px;padding:16px;margin:12px 0;font-size:22px;line-height:1.75}
  .t-gap{display:inline-block;min-width:80px;border-bottom:3px solid var(--acc);text-align:center;font-weight:700;padding:0 6px;color:var(--acc)}
  .t-gap.ok{color:var(--ok);border-color:var(--ok)} .t-gap.cur{background:rgba(255,255,255,.08);border-radius:6px 6px 0 0}
  .t-hint{color:var(--muted);font-size:17px}
  .t-opts{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
  .t-btn{font-size:20px;padding:12px 20px;border-radius:12px;border:2px solid var(--line);background:var(--panel);color:var(--txt);cursor:pointer;font-weight:600;min-width:100px;font-family:inherit}
  .t-btn:active{transform:translateY(2px)}
  .t-btn.primary{background:var(--acc);border-color:var(--acc);color:var(--onacc)}
  .t-btn.wrong{border-color:var(--bad);color:var(--bad);animation:tshake .35s}
  @keyframes tshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  .t-dots{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap} .t-dots i{width:12px;height:12px;border-radius:50%;background:var(--line);display:block}
  .t-dots i.done{background:var(--ok)} .t-dots i.now{background:var(--acc)} .t-dots i.rep{background:var(--warn)}
  .t-rep{display:inline-block;font-size:13px;color:var(--warn);border:1px solid var(--warn);border-radius:20px;padding:1px 9px;margin-top:6px}
  input.t-in{font-size:20px;padding:6px 10px;border-radius:8px;border:2px solid var(--acc);background:var(--deep);color:var(--txt);width:200px;font-weight:600;font-family:inherit}
  input.t-in.ok{border-color:var(--ok);color:var(--ok)} input.t-in.bad{border-color:var(--bad);animation:tshake .35s}
  .t-line{min-height:60px;background:var(--deep);border:2px solid var(--acc);border-radius:10px;padding:10px;display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
  .t-line.wrong{border-color:var(--bad);animation:tshake .35s} .t-line.right{border-color:var(--ok)}
  .t-pool{display:flex;flex-wrap:wrap;gap:8px;min-height:54px;margin:10px 0}
  .t-chip{font-size:20px;padding:9px 14px;border-radius:10px;background:var(--panel);border:2px solid var(--line);cursor:pointer;font-weight:600}
  .t-line .t-chip{border-color:var(--acc)}
  .t-match{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px} .t-col{display:flex;flex-direction:column;gap:10px}
  .t-card{background:var(--deep);border:2px solid var(--line);border-radius:12px;padding:12px 14px;font-size:19px;cursor:pointer;text-align:left;color:var(--txt);font-family:inherit}
  .t-card.sel{border-color:var(--warn)} .t-card.done{border-color:var(--ok);color:var(--ok);cursor:default;opacity:.85}
  .t-card.wrong{border-color:var(--bad);animation:tshake .35s}
  @media(max-width:620px){.t-match{grid-template-columns:1fr}}
  .t-sent{display:block;width:100%;margin:8px 0}
  .t-card .fix{display:block;color:var(--ok);font-size:17px;margin-top:4px}
  .t-cats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
  .t-cat{border:2px dashed var(--line);border-radius:12px;padding:10px;min-height:90px}
  .t-cat h4{margin:0 0 8px;font-size:18px}
  .t-cat .t-card{font-size:16px;padding:8px 10px;margin:6px 0;cursor:default}
  .t-cur{background:var(--deep);border:2px solid var(--acc);border-radius:12px;padding:14px;font-size:21px;margin:12px 0;text-align:center}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const $ = id => document.getElementById(id);
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function shake(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function norm(s) {
    s = String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.!?,]+$/g, "").replace(/\s+/g, " ").trim();
    return s.replace(/\bwasn't\b/g, "was not").replace(/\bweren't\b/g, "were not").replace(/\bdidn't\b/g, "did not").replace(/\bcouldn't\b/g, "could not");
  }
  /* Anzahl Aufgaben einer Station (für S.total) */
  function count(st) { return st.items ? st.items.length : 1; }

  /* Aufgaben-Warteschlange: q = Liste von Indizes, rep = Menge wiederholter */
  function run(box, st, h, pos) {
    pos = pos || { q: st.items ? st.items.map((_, i) => i) : [0], k: 0, rep: [] };
    const R = { pick: rPick, type: rType, order: rOrder, match: rMatch, spot: rSpot, sort: rSort }[st.type];
    function dots() {
      if (!st.items || st.type === "spot") return "";
      return `<div class="t-dots">${pos.q.map((x, i) => `<i class="${i < pos.k ? "done" : i === pos.k ? "now" : (i >= st.items.length ? "rep" : "")}"></i>`).join("")}</div>`;
    }
    function step() {
      if (h.save) h.save(pos);
      const idx = pos.q[pos.k];
      box.innerHTML = dots() + (pos.k >= st.items?.length ? `<span class="t-rep">↻ Again – Noch einmal</span>` : "") + `<div id="t-ex"></div>`;
      let wrong = false;
      const miss = () => { wrong = true; h.mistake(); };
      R(st, st.items ? st.items[idx] : null, $("t-ex"), miss, () => {
        if (wrong && st.items && pos.rep.indexOf(idx) < 0 && ["pick", "type", "order"].indexOf(st.type) >= 0) { pos.rep.push(idx); pos.q.push(idx); }
        pos.k++;
        setTimeout(() => { if (pos.k < pos.q.length) { h.fb(""); step(); } else h.done(); }, 1000);
      }, h.fb);
    }
    step();
  }

  /* pick: {t:"At 8:15 she {0} TV.", g:[["was watching","watched"]], a:["was watching"], why:["…"]} */
  function rPick(st, it, ex, miss, ok, fb) {
    let g = 0; const parts = it.t.split(/\{(\d)\}/);
    function draw() {
      const html = parts.map((p, k) => { if (k % 2 === 0) return p; const i = +p; return i < g ? `<span class="t-gap ok">${it.a[i]}</span>` : `<span class="t-gap ${i === g ? "cur" : ""}">&nbsp;?&nbsp;</span>`; }).join("");
      ex.innerHTML = `<div class="t-screen">${html}</div>${g < it.a.length ? `<div class="t-opts">${shuffle(it.g[g]).map(o => `<button class="t-btn" data-o="${o}">${o}</button>`).join("")}</div>` : ""}`;
      ex.querySelectorAll(".t-btn").forEach(b => b.onclick = () => {
        if (b.dataset.o === it.a[g]) { g++; fb("✔ Correct!", true); draw(); if (g === it.a.length) ok(); }
        else { shake(b, "wrong"); miss(); fb("✘ " + ((it.why && it.why[g]) || st.hint || "Try again. – Versuch es noch einmal.")); }
      });
    }
    draw();
  }

  /* type: {t:"…{0}…", v:["watch"], a:["was watching"], alt:[["…"]], why:"…"} */
  function rType(st, it, ex, miss, ok, fb) {
    const parts = it.t.split(/\{(\d)\}/);
    ex.innerHTML = `<div class="t-screen">${parts.map((p, k) => k % 2 === 0 ? p : `<input class="t-in" id="t-in${p}" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false"> <span class="t-hint">(${it.v[+p]})</span>`).join("")}</div><button class="t-btn primary" id="t-chk">Check</button>`;
    let locked = false;
    const go = () => {
      if (locked) return; let all = true, msg = "";
      it.a.forEach((a, i) => {
        const inp = $("t-in" + i); if (inp.readOnly) return;
        const okv = [a].concat((it.alt && it.alt[i]) || []).some(x => norm(x) === norm(inp.value));
        if (okv) { inp.classList.remove("bad"); inp.classList.add("ok"); inp.readOnly = true; }
        else { all = false; shake(inp, "bad"); if (!msg) msg = st.typeHint ? st.typeHint(a, inp.value) : "Check your spelling. – Rechtschreibung prüfen."; }
      });
      if (all) { locked = true; fb("✔ Correct!", true); ok(); } else { miss(); fb("✘ " + msg); }
    };
    $("t-chk").onclick = go;
    ex.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") go(); }));
    const first = $("t-in0"); if (first && window.innerWidth > 800) first.focus();
  }

  /* order: ["What","were","you","doing","?"] */
  function rOrder(st, target, ex, miss, ok, fb) {
    let pool = shuffle(target.map(w => ({ w }))), t = 0, ans = [], locked = false;
    while (pool.map(x => x.w).join(" ") === target.join(" ") && t++ < 10) pool = shuffle(pool);
    ex.innerHTML = `<div class="t-line" id="t-al"></div><div class="t-pool" id="t-pl"></div><div class="t-opts"><button class="t-btn primary" id="t-chk">Check</button><button class="t-btn" id="t-rs">Reset</button></div>`;
    function draw() {
      $("t-al").innerHTML = ans.map((x, k) => `<span class="t-chip" data-k="${k}">${x.w}</span>`).join("");
      $("t-pl").innerHTML = pool.map((x, k) => `<span class="t-chip" data-k="${k}">${x.w}</span>`).join("");
      ex.querySelectorAll("#t-pl .t-chip").forEach(c => c.onclick = () => { if (locked) return; ans.push(pool.splice(+c.dataset.k, 1)[0]); $("t-al").className = "t-line"; draw(); });
      ex.querySelectorAll("#t-al .t-chip").forEach(c => c.onclick = () => { if (locked) return; pool.push(ans.splice(+c.dataset.k, 1)[0]); $("t-al").className = "t-line"; draw(); });
    }
    draw();
    $("t-rs").onclick = () => { if (locked) return; pool = pool.concat(ans); ans = []; draw(); };
    $("t-chk").onclick = () => {
      if (locked) return;
      if (pool.length) { fb("Use all the words. – Benutze alle Wörter."); return; }
      const alts = [target.join(" ")].concat((st.alt && st.alt[target.join(" ")]) || []);
      if (alts.indexOf(ans.map(x => x.w).join(" ")) >= 0) { locked = true; $("t-al").className = "t-line right"; fb("✔ Correct!", true); ok(); }
      else { shake($("t-al"), "wrong"); miss(); fb("✘ " + (st.hint || "Not quite. – Noch nicht ganz.") + " <span class='de'>Tippe Wörter an, um sie zurückzulegen.</span>"); }
    };
  }

  /* match: st.pairs */
  function rMatch(st, _, ex, miss, ok, fb) {
    const L = st.pairs.map((p, i) => ({ t: p[0], i })), Rr = shuffle(st.pairs.map((p, i) => ({ t: p[1], i })));
    ex.innerHTML = `<div class="t-match"><div class="t-col">${L.map(x => `<button class="t-card" data-s="L" data-i="${x.i}">${x.t}</button>`).join("")}</div><div class="t-col">${Rr.map(x => `<button class="t-card" data-s="R" data-i="${x.i}">${x.t}</button>`).join("")}</div></div>`;
    let selL = null, found = 0;
    ex.querySelectorAll(".t-card").forEach(c => c.onclick = () => {
      if (c.classList.contains("done")) return;
      if (c.dataset.s === "L") { ex.querySelectorAll('.t-card[data-s="L"]').forEach(x => x.classList.remove("sel")); c.classList.add("sel"); selL = c; fb(""); return; }
      if (!selL) { fb("First tap a card on the left. <span class='de'>Zuerst links tippen.</span>"); return; }
      if (c.dataset.i === selL.dataset.i) { c.classList.add("done"); selL.classList.remove("sel"); selL.classList.add("done"); selL = null; found++; fb("✔ Correct!", true); if (found === st.pairs.length) ok(); }
      else { shake(c, "wrong"); miss(); fb("✘ " + (st.hint || "That doesn't fit. – Passt nicht.")); }
    });
  }

  /* spot: st.items [{s, wrong, fix}], st.n = Anzahl Fehler */
  function rSpot(st, _, ex, miss, ok, fb) {
    const sel = new Set(), n = st.items.filter(x => x.wrong).length; let locked = false;
    ex.innerHTML = st.items.map((x, i) => `<button class="t-card t-sent" data-i="${i}">${x.s}</button>`).join("") + `<div class="t-opts"><button class="t-btn primary" id="t-chk">${st.button || "Check"}</button></div>`;
    ex.querySelectorAll(".t-sent").forEach(b => b.onclick = () => { if (locked) return; const i = +b.dataset.i; if (sel.has(i)) { sel.delete(i); b.classList.remove("sel"); } else { sel.add(i); b.classList.add("sel"); } fb(""); });
    $("t-chk").onclick = () => {
      if (locked) return;
      if (sel.size !== n) { fb(`You have marked ${sel.size}. Mark exactly <b>${n}</b>. <span class='de'>Markiere genau ${n} Sätze.</span>`); return; }
      const right = [...sel].filter(i => st.items[i].wrong).length;
      if (right === n) {
        locked = true;
        ex.querySelectorAll(".t-sent").forEach(b => { const x = st.items[+b.dataset.i]; if (x.wrong) { b.classList.remove("sel"); b.classList.add("done"); b.innerHTML = `<s>${x.s}</s><span class="fix">✔ ${x.fix}</span>`; } });
        fb("✔ Perfect!", true); $("t-chk").textContent = "Continue →"; $("t-chk").onclick = ok;
      } else { miss(); fb(`✘ ${right} of ${n} correct. ${st.hint || ""}`); }
    };
  }

  /* sort: st.cats [[label, labelDe]], st.cards [[text, catIndex, why]] – eine Karte nach der anderen */
  function rSort(st, _, ex, miss, ok, fb) {
    const cards = shuffle(st.cards); let k = 0;
    function draw() {
      const placed = cards.slice(0, k);
      ex.innerHTML = (k < cards.length ? `<div class="t-cur">${cards[k][0]}</div><div class="t-opts" style="justify-content:center">${st.cats.map((c, i) => `<button class="t-btn" data-c="${i}">${c[0]}</button>`).join("")}</div>` : "") +
        `<div class="t-cats">${st.cats.map((c, i) => `<div class="t-cat"><h4>${c[0]}</h4><div class="de">${c[1]}</div>${placed.filter(x => x[1] === i).map(x => `<div class="t-card done">${x[0]}</div>`).join("")}</div>`).join("")}</div>`;
      ex.querySelectorAll(".t-btn[data-c]").forEach(b => b.onclick = () => {
        if (+b.dataset.c === cards[k][1]) { k++; fb("✔ Correct!", true); draw(); if (k === cards.length) ok(); }
        else { shake(b, "wrong"); miss(); fb("✘ " + (cards[k][2] || st.hint || "Think again. – Überleg noch einmal.")); }
      });
    }
    draw();
  }

  window.T = { run, count, norm, shuffle };
})();
