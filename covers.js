/* Cover-Grafiken für Grammatik-/Story-Spiele (Startseite) */
window.COVERS = {
  "review": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><g><path d="M60 70 L160 70 L150 128 L70 128Z" fill="#8a5a2a"/><path d="M60 70 L160 70 L150 82 L70 82Z" fill="#6b4226"/>
    <g><path d="M78 74 q-6 -40 32 -46 q38 6 32 46z" fill="#5fd068"/><circle cx="96" cy="52" r="9" fill="#fff"/><circle cx="124" cy="52" r="9" fill="#fff"/><circle cx="98" cy="54" r="4" fill="#222"/><circle cx="122" cy="54" r="4" fill="#222"/><path d="M98 66 q12 8 24 0" stroke="#1e4a24" stroke-width="3" fill="none"/><animateTransform attributeName="transform" type="translate" values="0 4;0 -4;0 4" dur="1.6s" repeatCount="indefinite"/></g>
    <path d="M56 66 L164 66 L160 78 L60 78Z" fill="#a8743a"/><text x="28" y="40" font-size="26" font-weight="800" fill="#ffd23a" font-family="Arial">?</text><text x="176" y="52" font-size="22" font-weight="800" fill="#ff6a6a" font-family="Arial">✘</text><text x="40" y="110" font-size="18" font-weight="800" fill="#fff" font-family="Arial" opacity=".8">abc</text></g></svg>`,
  "daily": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><g><path d="M110 10 C140 40 160 60 150 100 C145 120 125 132 110 132 C80 132 60 112 62 86 C64 66 80 56 86 40 C96 56 100 64 108 66 C112 50 108 30 110 10 Z" fill="#ff6a2a"/><path d="M110 50 C124 70 134 84 128 104 C124 118 116 124 110 124 C94 124 84 112 86 98 C88 86 96 80 100 70 C104 80 108 84 112 84 C114 74 112 62 110 50 Z" fill="#ffd23a"/><animateTransform attributeName="transform" type="scale" values="1 1;1.03 .97;1 1" dur=".8s" repeatCount="indefinite" additive="sum"/></g>
    <text x="110" y="112" font-family="Anton,Impact,Arial Black" font-size="26" fill="#7a1a00" text-anchor="middle">DAILY</text></svg>`,
  "rc-treasure": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-4 110 70)">
    <path d="M30 22 L190 16 Q196 70 188 124 L34 128 Q26 74 30 22 Z" fill="#f1dca4" stroke="#8a5a22" stroke-width="3"/>
    <path d="M52 40 Q70 30 86 42 Q78 58 60 56 Z" fill="#8fc46a" stroke="#5a7a3a" stroke-width="2"/><path d="M120 86 Q144 74 162 90 Q150 108 126 104 Z" fill="#8fc46a" stroke="#5a7a3a" stroke-width="2"/>
    <path d="M68 52 Q92 80 112 66 Q132 52 140 90" stroke="#a4401e" stroke-width="3" stroke-dasharray="6 6" fill="none"><animate attributeName="stroke-dashoffset" values="24;0" dur="1.2s" repeatCount="indefinite"/></path>
    <path d="M134 84 L148 98 M148 84 L134 98" stroke="#c0281e" stroke-width="5" stroke-linecap="round"/>
    <g transform="translate(150 30)"><circle r="14" fill="none" stroke="#8a5a22" stroke-width="2"/><path d="M0 -12 L3 0 L0 12 L-3 0 Z" fill="#c0281e"/></g></g>
    <g transform="translate(36 92)"><rect width="40" height="26" rx="4" fill="#8a4a1a" stroke="#4a2408" stroke-width="2"/><path d="M0 8 Q20 -12 40 8" fill="#a85a22" stroke="#4a2408" stroke-width="2"/><rect x="17" y="8" width="6" height="8" fill="#ffd23a"/>
    <circle cx="10" cy="-2" r="3" fill="#ffd23a"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></circle><circle cx="30" cy="-6" r="2.5" fill="#fff6b0"><animate attributeName="opacity" values=".2;1;.2" dur="1.1s" repeatCount="indefinite"/></circle></g></svg>`,
  "rc-carnival": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
    ${[[30,20,"#ffd23a"],[190,28,"#2ad0b0"],[60,110,"#ff4a8a"],[176,112,"#ffd23a"],[110,14,"#ff4a8a"],[20,70,"#2ad0b0"],[200,72,"#ff8a2a"]].map((c,i)=>`<rect x="${c[0]}" y="${c[1]}" width="8" height="5" fill="${c[2]}" transform="rotate(${i*40} ${c[0]} ${c[1]})"><animate attributeName="y" values="${c[1]};${c[1]+8};${c[1]}" dur="${1.2+i*.2}s" repeatCount="indefinite"/></rect>`).join("")}
    <ellipse cx="110" cy="96" rx="62" ry="20" fill="#7a7f8a"/><rect x="48" y="66" width="124" height="30" fill="#9aa0ab"/>
    <ellipse cx="110" cy="66" rx="62" ry="20" fill="#d6dbe3" stroke="#7a7f8a" stroke-width="3"/>
    <g fill="#b6bcc6" stroke="#8a909a" stroke-width="1.5"><ellipse cx="88" cy="62" rx="13" ry="6"/><ellipse cx="124" cy="60" rx="13" ry="6"/><ellipse cx="108" cy="74" rx="12" ry="5"/><ellipse cx="140" cy="72" rx="10" ry="5"/><ellipse cx="74" cy="72" rx="9" ry="4"/></g>
    <path d="M104 52 L107 58 L114 58 L109 62 L111 68 L104 64 L98 68 L100 62 L95 58 L102 58 Z" fill="#fff" stroke="#c9ced6" stroke-width="1"/>
    <g><path d="M60 20 L96 58" stroke="#6a3a1a" stroke-width="5" stroke-linecap="round"/><circle cx="96" cy="58" r="5" fill="#ff4a8a"/><animateTransform attributeName="transform" type="rotate" values="0 60 20;8 60 20;0 60 20" dur=".5s" repeatCount="indefinite"/></g>
    <g><path d="M164 18 L128 56" stroke="#6a3a1a" stroke-width="5" stroke-linecap="round"/><circle cx="128" cy="56" r="5" fill="#2ad0b0"/><animateTransform attributeName="transform" type="rotate" values="0 164 18;-8 164 18;0 164 18" dur=".5s" begin=".25s" repeatCount="indefinite"/></g></svg>`,
  "pp-blackout": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 96 L210 40 L210 136 Z" fill="#ffe9a8" opacity=".35"><animate attributeName="opacity" values=".25;.45;.25" dur="2s" repeatCount="indefinite"/></path>
    ${[[120,70,40],[166,58,50]].map(h=>`<g><rect x="${h[0]}" y="${h[1]}" width="${h[2]}" height="${136-h[1]}" fill="#2a2244"/><path d="M${h[0]-4} ${h[1]} L${h[0]+h[2]/2} ${h[1]-22} L${h[0]+h[2]+4} ${h[1]} Z" fill="#3a2f5a"/><rect x="${h[0]+8}" y="${h[1]+14}" width="10" height="12" fill="#151025"/><rect x="${h[0]+h[2]-18}" y="${h[1]+14}" width="10" height="12" fill="#151025"/></g>`).join("")}
    <rect x="176" y="76" width="12" height="14" fill="#151025"/><path d="M176 76 L170 70" stroke="#5a5080" stroke-width="2"/>
    <g transform="rotate(-22 60 100)"><rect x="22" y="92" width="44" height="16" rx="6" fill="#d84a2a"/><rect x="62" y="88" width="14" height="24" rx="3" fill="#9aa0ab"/><circle cx="34" cy="100" r="3" fill="#ffd23a"/></g>
    <text x="150" y="30" font-family="Anton,Impact,Arial Black" font-size="16" fill="#ffd23a" text-anchor="middle">8:15 PM</text></svg>`,
  "pp-lighthouse": `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
    <g><path d="M70 30 L220 6 L220 56 Z" fill="#fff6b0" opacity=".4"/><animateTransform attributeName="transform" type="rotate" values="-10 70 30;10 70 30;-10 70 30" dur="3s" repeatCount="indefinite"/></g>
    <path d="M56 132 L62 40 L78 40 L84 132 Z" fill="#f2f2f2"/><path d="M58 104 L82 104 L83 116 L57 116 Z M60 72 L80 72 L81 84 L59 84 Z" fill="#d23b3b"/>
    <rect x="58" y="26" width="24" height="16" fill="#ffd84a"/><path d="M54 26 L70 12 L86 26 Z" fill="#2a2f3a"/>
    <path d="M0 126 Q30 112 60 126 T120 126 T180 126 T240 126 L240 140 L0 140 Z" fill="#1a5f8a"><animateTransform attributeName="transform" type="translate" values="0 0;-12 2;0 0" dur="2.4s" repeatCount="indefinite"/></path>
    <g><path d="M150 110 L186 110 L180 120 L156 120 Z" fill="#c0281e"/><rect x="166" y="94" width="3" height="16" fill="#3a2a1a"/><path d="M169 94 L182 106 L169 106 Z" fill="#f2f2f2"/><animateTransform attributeName="transform" type="rotate" values="-6 168 115;6 168 115;-6 168 115" dur="1.6s" repeatCount="indefinite"/></g>
    <path d="M120 12 L112 30 L120 30 L110 50" stroke="#ffd84a" stroke-width="3" fill="none"><animate attributeName="opacity" values="0;1;0;0" dur="2.5s" repeatCount="indefinite"/></path></svg>`
};
