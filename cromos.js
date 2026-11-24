/* Sammelkarten (Collector Cards): jede Karte gehört fest zu einem Spiel – kein Zufall.
   Erhalten: mindestens 1 Stern · Golden: 3 Sterne · 👑: ohne Fehler (Flawless) · 💀: Hard mode geschafft */
window.CROMOS = [
  { id: "pp-blackout", f: "👮🏾‍♀️", n: "Detective Ruby Shaw", c: "#3a2a5a", t: "She solves every case in Hollow Lane – with a little help from you.", de: "aus Blackout at Hollow Lane" },
  { id: "pp-lighthouse", f: "👵🏻", n: "Martha", c: "#1a3a5a", t: "Keeper of Gull Rock Lighthouse. She never sleeps when there's a storm.", de: "aus Lighthouse Logbook" },
  { id: "rc-treasure", f: "🏴‍☠️", n: "Captain Blackheart", c: "#2a1a10", t: "The most brutal pirate of the Caribbean. His treasure was hidden for 300 years.", de: "aus The Map of Blackheart's Treasure" },
  { id: "rc-carnival", f: "🥁", n: "Marcus", c: "#5a0f4a", t: "The steelpan star of Island Sound. He never misses a show!", de: "aus Who's Who at the Carnival" },
  { id: "modals", f: "👩🏽‍🦰", n: "Ranger Kylie", c: "#6a2a0a", t: "She can find water in the desert – and you mustn't feed her dingoes!", de: "aus Outback Survival Camp" },
  { id: "comparison", f: "🏊🏿‍♂️", n: "Kofi", c: "#0a4a5a", t: "The best swimmer of all – and now the caretaker of a reef island.", de: "aus The Best Job in the World" },
  { id: "adverbs", f: "🐊", n: "Big Bruce", c: "#1e4a1e", t: "The biggest crocodile in Kakadu. He moves slowly – but he loves sandwiches.", de: "aus Croc Cam" },
  { id: "post-1", f: "👧🏼", n: "Mia Clarke", c: "#6a3a10", t: "15, lives near Bondi Beach and follows her uncle's postcards around the world.", de: "aus The Postcard Trail, Kapitel 1" },
  { id: "post-2", f: "🎶", n: "Kayla", c: "#5a1a3a", t: "Ben's cousin in Trinidad. She plays the steelpan – and she is very brave.", de: "aus The Postcard Trail, Kapitel 2" },
  { id: "irregular", f: "🕹️", n: "Irregular Rush", c: "#3a0a6a", t: "An arcade machine from the 80s. go – went – gone … or GAME OVER! ❤️❤️❤️", de: "Arcade" },
  { id: "jefe-u1", f: "🐊👑", n: "The Croc King", c: "#3a1a0a", t: "The king of all crocodiles. Only grammar heroes can beat him.", de: "Endgegner Unit 1" },
  { id: "jefe-u2", f: "🐙", n: "The Kraken", c: "#0a2a4a", t: "A sea monster with eight arms which sinks every ship. Not yours!", de: "Endgegner Unit 2" },
  { id: "adv-24", f: "🦌", n: "The Christmas Stag", c: "#0f3a2a", t: "He only comes at Christmas. Merry Christmas and a Happy New Year!", de: "Adventskalender, Türchen 24" }
];
window.cromoState = function (s, id) {
  const st = (s && s.stars) || {}, pf = (s && s.perfect) || [];
  return { got: (st[id] || 0) > 0, gold: (st[id] || 0) >= 3, crown: pf.indexOf(id) >= 0, hard: (st[id + "-hard"] || 0) > 0 };
};
window.cromoCard = function (c, s, big) {
  const k = cromoState(s, c.id), w = big ? 170 : 120;
  if (!k.got) return `<div class="cromo off" style="width:${w}px"><div class="cf">❓</div><div class="cn">???</div><div class="ct">${c.de}</div></div>`;
  return `<div class="cromo ${k.gold ? "gold" : ""}" style="width:${w}px;--c:${c.c}"><div class="cb">${k.crown ? "👑" : ""}${k.hard ? "💀" : ""}</div><div class="cf">${c.f}</div><div class="cn">${c.n}</div><div class="ct">${c.t}</div></div>`;
};
window.CROMO_CSS = `.cromo{position:relative;flex:none;border-radius:12px;padding:10px 8px 8px;text-align:center;background:linear-gradient(160deg,var(--c,#333),#111);border:3px solid #ffffff33;box-shadow:0 6px 16px #0008;color:#fff}
  .cromo.gold{border-color:#ffd23a;background:linear-gradient(160deg,#ffd23a,var(--c,#333) 45%,#111);box-shadow:0 0 18px #ffd23a88,0 6px 16px #0008}
  .cromo.gold:before{content:"";position:absolute;inset:0;border-radius:9px;background:linear-gradient(120deg,transparent 30%,#ffffff44 45%,transparent 60%);background-size:250% 100%;animation:shine 2.6s linear infinite}
  @keyframes shine{from{background-position:150% 0}to{background-position:-100% 0}}
  .cromo.off{background:#1a1a22;border-style:dashed;color:#888}
  .cromo .cf{font-size:44px;line-height:1.2}
  .cromo .cn{font-weight:800;font-size:14px;margin-top:2px}
  .cromo .ct{font-size:11.5px;line-height:1.3;opacity:.85;margin-top:4px}
  .cromo .cb{position:absolute;top:4px;right:6px;font-size:15px}`;
