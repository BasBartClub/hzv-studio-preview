/* HZV AI Studio — ontwerpvoorstel (demo). Alle generatie is gesimuleerd. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const IMG={gevel:'img/gevel-dag.webp',avond:'img/gevel-avond.webp',leeg:'img/woonkamer-leeg.webp',staged:'img/woonkamer-staged.webp',woon:'img/woonkamer-ingericht.webp',keuken:'img/keuken.webp',drone:'img/drone.webp',tuin:'img/tuin.webp',slaap:'img/slaapkamer.webp'};
const ICON={
 studio:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 dossier:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/></svg>',
 tech:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3z"/></svg>',
 create:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z"/></svg>',
 review:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
 regie:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h8"/></svg>',
 log:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h4"/></svg>',
 insight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>',
 more:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>',
 dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m-5-5l5 5 5-5M4 20h16"/></svg>',
 share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
 lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
 film:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>',
 photo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-9 7"/></svg>',
 plan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM3 12h9M12 3v18M12 15h9"/></svg>',
 text:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
 phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
 key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8m-3 3l2 2m-4 0l2 2"/></svg>',
 close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};
const LOGO='<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="8,46 50,10 92,46" fill="#f7a100"/><rect x="20" y="44" width="60" height="46" fill="#0071b3"/><rect x="42" y="64" width="16" height="26" fill="#fff"/></svg>';

/* ---------- Technieken (1:1 vertaald uit de studio-apps) ---------- */
const CAMS=[
 {id:'dolly',cls:'cam-dolly',img:IMG.woon,name:'Dolly-in',sub:'Rustig de kamer in',desc:'De camera schuift vanaf de deuropening langzaam naar het raam. Laat ruimte en lichtinval zien zonder haast.',spec:'24 mm · 6–8 s · ooghoogte 1,5 m',use:'Woonkamer, keuken, master bedroom'},
 {id:'orbit',cls:'cam-orbit',img:IMG.drone,name:'Rondom de woning (orbit 360°)',sub:'Drone cirkelt om het huis',desc:'Een drone draait in een vloeiende boog om de woning: kavel, tuin, ligging en straat in één beeld.',spec:'Drone · 40 m · 10–12 s',use:'Vrijstaand, twee-onder-een-kap, kavel'},
 {id:'crane',cls:'cam-crane',img:IMG.gevel,name:'Kraanshot omlaag',sub:'Van nok naar voordeur',desc:'Start bij de dakrand en zak langs de gevel naar de voordeur. Een sterk openingsbeeld voor elke rondleiding.',spec:'Kraan/drone · 8 s · eindigt op ooghoogte',use:'Gevel, entree'},
 {id:'fpv',cls:'cam-fpv',img:IMG.keuken,name:'FPV-doorvlucht',sub:'Vliegend door de woning',desc:'Een lage, vloeiende vlucht van kamer naar kamer. Voelt als zelf door het huis lopen, maar sneller.',spec:'FPV laag · 6 s per ruimte',use:'Doorlopende indeling, open keuken'},
 {id:'pan',cls:'cam-pan',img:IMG.tuin,name:'Panorama-pan & volgen',sub:'Breed langs tuin en achtergevel',desc:'Een brede horizontale beweging die de hele breedte van tuin of terras toont. Ideaal voor de zonzijde.',spec:'Breedbeeld · 8–10 s',use:'Tuin, terras, balkon, uitzicht'},
 {id:'hand',cls:'cam-hand',img:IMG.slaap,name:'Bezichtiging uit de hand',sub:'Subtiele handcamera',desc:'Een heel lichte beweging, alsof een koper zelf rondkijkt. Persoonlijk, warm en echt.',spec:'Handheld micro · 5–6 s',use:'Slaapkamers, sfeermomenten'},
 {id:'steadi',cls:'cam-steadi',img:IMG.staged,name:'Steadicam-walkthrough',sub:'Vloeiend meelopen',desc:'Een stabiele, meelopende camera op heuphoogte die van ruimte naar ruimte gaat. Rustig en premium.',spec:'35 mm · steadicam · 8 s',use:'Hal → woonkamer → keuken'},
 {id:'push',cls:'cam-push',img:IMG.avond,name:'Lage push-in naar de voordeur',sub:'Aanvlucht bij avondlicht',desc:'Vanaf de straat schuift de camera laag en langzaam naar de verlichte voordeur. Een uitnodigend slotbeeld.',spec:'24 mm laag · 6 s · avond',use:'Slotbeeld, avondsfeer'}
];
const STYLES=[
 {id:'licht',name:'Licht & lucht',f:'brightness(1.12) contrast(1.02) saturate(1.05)',desc:'Helder, fris en ruim. De standaard voor advertentiefoto’s.'},
 {id:'gouden',name:'Gouden uur',f:'sepia(.22) saturate(1.25) brightness(1.05) hue-rotate(-8deg)',desc:'Warm laag zonlicht. Mooi voor tuin, terras en westgevel.'},
 {id:'avond',name:'Avondsfeer',f:'brightness(.8) sepia(.28) saturate(1.15) contrast(1.06)',img:IMG.avond,desc:'Blauw uur met alle lampen aan. Werkt het best met een echte avondfoto.'},
 {id:'echt',name:'Natuurgetrouw',f:'none',desc:'Geen look, alleen correcte witbalans en belichting. Altijd veilig.'},
 {id:'warm',name:'Warm daglicht',f:'sepia(.12) saturate(1.1) contrast(1.06)',desc:'Zachte filmische warmte, zoals een klassieke filmstock.'},
 {id:'strak',name:'Strak & modern',f:'saturate(.82) contrast(1.12) brightness(1.04) hue-rotate(8deg)',desc:'Koel en grafisch. Past bij nieuwbouw en appartementen.'}
];
const LOCKS=[
 {v:.95,name:'Strikt echt',desc:'Indeling, maten, ramen en materialen blijven exact zoals op je foto’s. Aanbevolen voor alle advertentiebeelden.'},
 {v:.80,name:'Gebalanceerd',desc:'Kleine sfeerverbeteringen (licht, lucht) zijn toegestaan; de woning zelf verandert niet.'},
 {v:.65,name:'Meer sfeer',desc:'Ruimere interpretatie van licht en styling. Alleen voor sfeerbeelden, duidelijk gelabeld.'},
 {v:.40,name:'Vrij experimenteel',desc:'Voor moodboards en inspiratie. Niet gebruiken in je advertentie.'}
];
const TRANS=[
 {id:'cut',name:'Harde overgang',desc:'Directe wissel naar de volgende ruimte. Strak en snel, goed voor social-clips.'},
 {id:'bridge',name:'Doorloop-brug',desc:'Het eindbeeld van scène A is het beginbeeld van scène B, zodat je “doorloopt” van hal naar woonkamer.'},
 {id:'fade',name:'Vervagen',desc:'Zachte overvloei. Rustig, past bij gouden uur en avond.'},
 {id:'zoom',name:'Zoom-overgang',desc:'Inzoomen op een raam of deur en daarachter de volgende ruimte.'},
 {id:'wipe',name:'Veeg',desc:'Een horizontale veeg, bijvoorbeeld van voorgevel naar achtertuin.'},
 {id:'leak',name:'Lichtflits',desc:'Warme lichtlek tussen twee scènes. Sfeervol bij buitenopnames.'}
];
const RULES=[
 ['Eerste beeld toont de indeling','Elke scène begint met een overzicht van de ruimte voordat de camera beweegt.'],
 ['Echte maat en contact','Meubels staan op de vloer, niets zweeft, deuren en ramen kloppen met de werkelijkheid.'],
 ['Geen tekst of logo’s in beeld','Teksten, adres en kenmerken komen later in de montage, niet in de generatie.'],
 ['Ruimte-lock','Dezelfde ruimte blijft in elke scène dezelfde ruimte: vloer, wanden, ramen en licht.'],
 ['Beschrijf beweging, licht en kader','“Langzame dolly-in vanaf de deur, zacht daglicht van links, ooghoogte.”'],
 ['Scènes van 6 tot 15 seconden','Kortere scènes voelen onrustig, langere verliezen de aandacht.'],
 ['Brug of harde overgang','Elke scène eindigt óf met een doorloop-brug naar de volgende, óf met een bewuste harde overgang.'],
 ['Eerst genereren, dan toetsen','Fase 1 maakt de beelden, fase 2 controleert ze tegen het woningdossier.'],
 ['Virtueel = gelabeld','Virtueel ingerichte of aangepaste beelden krijgen altijd een zichtbaar label.']
];
const BEATS_FILM=[
 ['Openingsbeeld','crane','gevel','Gevel — kraanshot omlaag'],
 ['Binnenkomst','steadi','staged','Hal → woonkamer — steadicam'],
 ['Opbouw','dolly','woon','Woonkamer — dolly-in naar het raam'],
 ['Keerpunt: het pronkstuk','fpv','keuken','Keuken — FPV-doorvlucht'],
 ['Rustmoment','hand','slaap','Slaapkamer — uit de hand'],
 ['Hoogtepunt','pan','tuin','Tuin — panorama-pan'],
 ['Ligging','orbit','drone','Drone — rondom de woning'],
 ['Slotbeeld','push','avond','Avond — push-in naar de voordeur']
];
const BEATS_SOCIAL=[
 ['Blikvanger (3 s)','push','avond','Avondgevel met lampen aan'],
 ['Kenmerken','dolly','woon','Lichte woonkamer'],
 ['Bewijsmoment','fpv','keuken','Keuken met kookeiland'],
 ['Voordeel-afsluiter','pan','tuin','Tuin met terras'],
 ['Logo & oproep','crane','gevel','Bekijk de woning op huiszelfverkoop.nl']
];

/* ---------- State ---------- */
const now=()=>new Date();
const hhmm=d=>d.toLocaleTimeString('nl-NL',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Amsterdam'});
const mkShots=(beats)=>beats.map((b,i)=>({n:i+1,beat:b[0],cam:b[1],img:IMG[b[2]],title:b[3],dur:[8,8,7,6,6,8,10,6][i]||7,status:'Gepland'}));
const S={
 projects:[
  {id:'p1',name:'Voorbeeldwoning · vrijstaand jaren-30',type:'Vrijstaande woning',plaats:'Voorbeeldplaats',mode:'film',img:IMG.gevel,step:3,runtime:60,style:'licht',lock:.95,fps:24,aspect:'16:9',seed:true,route:'auto',shots:mkShots(BEATS_FILM),approved:false,notes:[{who:'Partner',role:'Mede-eigenaar',scene:6,tc:'00:41',text:'Kan de tuin iets lichter? Op de foto lijkt het later op de dag.',res:false}]},
  {id:'p2',name:'Voorbeeld · social-campagne',type:'Vrijstaande woning',plaats:'Voorbeeldplaats',mode:'social',img:IMG.avond,step:1,runtime:20,style:'avond',lock:.95,fps:30,aspect:'9:16',seed:true,route:'speed',shots:mkShots(BEATS_SOCIAL),approved:false,notes:[]}
 ],
 cur:0, reel:[], ledger:[], chat:[], tab:{tech:'cam',create:'foto'}, apiKey:false
};
S.projects[0].shots.forEach((s,i)=>s.status=i<5?'Klaar':i<6?'Bezig':'Gepland');
const P=()=>S.projects[S.cur];
function log(action,detail,units){S.ledger.unshift({t:hhmm(now()),action,detail,units:units||0});}
log('Demo geladen','Voorbeeldwoning met 8 scènes',0);

/* ---------- UI helpers ---------- */
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600);}
function openSheet(html,onMount){
 const root=$('#modalRoot');
 root.innerHTML='<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true">'+html+'</div>';
 requestAnimationFrame(()=>root.classList.add('open'));
 root.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeSheet));
 if(onMount)onMount(root.querySelector('.sheet'));
}
function closeSheet(){const root=$('#modalRoot');root.classList.remove('open');if(window.__playerTimer){clearInterval(window.__playerTimer);window.__playerTimer=null;}setTimeout(()=>{if(!root.classList.contains('open'))root.innerHTML='';},350);}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();});
function sheetHead(title,kicker){return '<div class="sheet-head"><div style="flex:1">'+(kicker?'<p class="kicker">'+esc(kicker)+'</p>':'')+'<h2>'+esc(title)+'</h2></div><button class="icon-btn" data-close aria-label="Sluiten">'+ICON.close+'</button></div>';}
function sim(ms,onTick,onDone){let p=0;const step=100/(ms/120);const id=setInterval(()=>{p=Math.min(100,p+step*(0.6+Math.random()*0.8));onTick(Math.round(p));if(p>=100){clearInterval(id);onDone&&onDone();}},120);return id;}
function camCard(cam,extra){return '<div class="cam '+cam.cls+'"'+(extra||'')+'><img src="'+cam.img+'" alt="" loading="lazy"><div class="cam-hud"></div></div>';}
function sty(img,st){if(st.id==='avond'&&img===IMG.gevel)img=IMG.avond;return 'src="'+img+'" style="filter:'+(img===IMG.avond?'none':st.f)+'"';}
const camById=id=>CAMS.find(c=>c.id===id)||CAMS[0];
const styleById=id=>STYLES.find(s=>s.id===id)||STYLES[0];

/* ---------- Navigatie ---------- */
const NAV=[
 {r:'studio',l:'Studio',i:'studio'},{r:'dossier',l:'Dossier',i:'dossier'},{r:'technieken',l:'Technieken',i:'tech'},{r:'creeer',l:'Creëer',i:'create'},{r:'review',l:'Meekijken',i:'review'},
 {r:'regie',l:'Regie-assistent',i:'regie',more:true},{r:'logboek',l:'Logboek & pakketten',i:'log',more:true},{r:'inzichten',l:'Inzichten',i:'insight',more:true}
];
function renderNav(route){
 const main=NAV.filter(n=>!n.more);
 $('#bottomnav').innerHTML=main.slice(0,4).map(n=>'<a class="nav-it'+(route===n.r?' on':'')+'" href="#/'+n.r+'">'+ICON[n.i]+'<span>'+n.l+'</span></a>').join('')+
  '<button class="nav-it'+(['review','regie','logboek','inzichten'].includes(route)?' on':'')+'" id="moreBtn" type="button">'+ICON.more+'<span>Meer</span></button>';
 $('#rail').innerHTML='<a class="brand" href="#/studio" style="margin:0 6px 10px;display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--text)"><span class="logo" style="width:36px;height:36px;display:block">'+LOGO+'</span><span class="brand__txt"><b>Huis Zelfverkoop</b><small>HZV AI STUDIO</small></span></a>'+
  '<div class="rail-h">STUDIO</div>'+main.map(n=>'<a class="nav-it'+(route===n.r?' on':'')+'" href="#/'+n.r+'">'+ICON[n.i]+'<span>'+n.l+'</span></a>').join('')+
  '<div class="rail-h">MEER</div>'+NAV.filter(n=>n.more).map(n=>'<a class="nav-it'+(route===n.r?' on':'')+'" href="#/'+n.r+'">'+ICON[n.i]+'<span>'+n.l+'</span></a>').join('')+
  '<div class="rail-cta"><a class="btn btn-gold btn-block" href="#/nieuw">+ Nieuwe woning</a></div>';
 $('#moreBtn').onclick=()=>openSheet(sheetHead('Meer','HZV AI Studio')+
  [{r:'review',l:'Meekijkkamer',d:'Feedback, akkoord en downloads',i:'review'},{r:'regie',l:'Regie-assistent',d:'Geef instructies in gewone taal',i:'regie'},{r:'logboek',l:'Logboek & pakketten',d:'Wat de studio deed in deze sessie',i:'log'},{r:'inzichten',l:'Inzichten',d:'Wat werkt en wat niet bij woningbeelden',i:'insight'}]
  .map(x=>'<a class="list-it" href="#/'+x.r+'" data-close><span class="ico-box">'+ICON[x.i]+'</span><span><b>'+x.l+'</b><small>'+x.d+'</small></span></a>').join('')+
  '<button class="list-it" id="mKey" type="button"><span class="ico-box">'+ICON.key+'</span><span><b>AI-provider koppelen</b><small>Eigen sleutel gebruiken (demo)</small></span></button>',
  sh=>{sh.querySelector('#mKey').onclick=()=>{closeSheet();setTimeout(openKey,360);};});
 $('#projChipName').textContent=P().name;
}
function openProjects(){
 openSheet(sheetHead('Mijn woningen','Projecten')+S.projects.map((p,i)=>'<button class="list-it" data-p="'+i+'" type="button"><img src="'+p.img+'" alt=""><span style="flex:1"><b>'+esc(p.name)+'</b><small>'+(p.mode==='film'?'Rondleiding':p.mode==='social'?'Social-campagne':'Alles-in-één')+' · '+p.shots.length+' scènes · '+p.aspect+'</small></span>'+(i===S.cur?'<span class="status st-ok">ACTIEF</span>':'')+'</button>').join('')+
  '<a class="btn btn-gold btn-block" href="#/nieuw" data-close>+ Nieuwe woning starten</a>',
  sh=>$$('[data-p]',sh).forEach(b=>b.onclick=()=>{S.cur=+b.dataset.p;closeSheet();toast('Actieve woning: '+P().name);route();}));
}
function openKey(){
 openSheet(sheetHead('AI-provider koppelen','Eigen sleutel')+
  '<p class="sub" style="margin-bottom:14px">Met een eigen sleutel van een AI-provider kun je generatieve functies (virtuele styling, AI-lucht, rondleidingvideo) laten draaien. Zonder sleutel gebruikt de studio de ingebouwde browser-tools.</p>'+
  '<div class="banner warn" style="margin-bottom:14px">'+ICON.lock.replace('<svg','<svg width="18" height="18"')+' DEMO: IN DEZE PREVIEW WORDT GEEN SLEUTEL OPGESLAGEN OF VERSTUURD</div>'+
  '<div class="field"><label for="k">API-sleutel</label><input class="input" id="k" type="password" autocomplete="off" placeholder="Plak hier je sleutel (demo)"></div>'+
  '<div class="row"><button class="btn btn-primary" id="kSave" type="button">Opslaan</button><button class="btn btn-ghost" id="kClear" type="button">Wissen</button><span class="spacer"></span><span class="status '+(S.apiKey?'st-ok':'st-plan')+'" id="kSt">'+(S.apiKey?'GEKOPPELD (DEMO)':'NIET GEKOPPELD')+'</span></div>',
  sh=>{$('#kSave',sh).onclick=()=>{$('#k',sh).value='';S.apiKey=true;$('#kSt',sh).textContent='GEKOPPELD (DEMO)';$('#kSt',sh).className='status st-ok';toast('Demo: sleutel niet opgeslagen, alleen de status is gezet.');log('Provider gekoppeld','Demo-status, geen sleutel bewaard');};
       $('#kClear',sh).onclick=()=>{S.apiKey=false;$('#kSt',sh).textContent='NIET GEKOPPELD';$('#kSt',sh).className='status st-plan';toast('Koppeling gewist.');};});
}

/* ---------- Speler (gesimuleerde master) ---------- */
function openPlayer(vertical){
 const p=P(); const shots=p.shots; const st=styleById(p.style);
 openSheet(sheetHead(vertical?'Verticale social-cut 9:16':'Rondleiding afspelen',p.name)+
  '<div class="player'+(vertical?' v':'')+'" id="pl">'+shots.map((s,i)=>'<div class="frame cam '+camById(s.cam).cls+(i===0?' on':'')+'"><img '+sty(s.img,st)+' alt=""></div>').join('')+
  '<div class="wm">'+LOGO+'HZV</div><div class="tc mono" id="plTc">00:00</div><div class="lt" id="plLt"></div></div>'+
  '<div class="progress" style="margin-top:12px"><i id="plBar"></i></div>'+
  '<div class="row" style="margin-top:12px"><button class="btn btn-ghost btn-sm" id="plPause" type="button">Pauze</button><button class="btn btn-ghost btn-sm" id="plShare" type="button">'+ICON.share.replace('<svg','<svg width="16" height="16"')+' Delen</button><button class="btn btn-ghost btn-sm" id="plSave" type="button">'+ICON.dl.replace('<svg','<svg width="16" height="16"')+' Opslaan</button><span class="spacer"></span><span class="mono muted" style="font-size:11px">'+p.fps+' FPS · '+(vertical?'9:16':p.aspect)+' · DEMO-WEERGAVE</span></div>',
 sh=>{
  const frames=$$('.frame',sh); let i=0, t=0, paused=false; const total=shots.reduce((a,s)=>a+s.dur,0);
  const lt=$('#plLt',sh);
  const showLt=()=>{const s=shots[i];lt.innerHTML='<span>'+String(s.n).padStart(2,'0')+' · '+esc(s.beat.toUpperCase())+'</span><b>'+esc(s.title)+'</b>';lt.style.animation='none';void lt.offsetWidth;lt.style.animation='';};
  showLt();
  let acc=0;
  window.__playerTimer=setInterval(()=>{ if(paused)return; t+=0.25; acc+=0.25;
   if(acc>=shots[i].dur/2.2){acc=0;frames[i].classList.remove('on');i=(i+1)%frames.length;frames[i].classList.add('on');showLt(); if(i===0)t=0;}
   const sec=Math.round(t*2.2);$('#plTc',sh).textContent='00:'+String(Math.min(sec,total)).padStart(2,'0');
   $('#plBar',sh).style.width=Math.min(100,(t*2.2/total)*100)+'%';
  },250);
  $('#plPause',sh).onclick=e=>{paused=!paused;e.currentTarget.textContent=paused?'Afspelen':'Pauze';};
  $('#plShare',sh).onclick=()=>toast('Demo: delen is uitgeschakeld in de preview.');
  $('#plSave',sh).onclick=()=>toast('Demo: er wordt geen MP4 gemaakt in de preview.');
 });
}

/* ---------- STUDIO ---------- */
const STEPS=['1. Intake','2. Dossier','3. Stijl-lock','4. Genereren','5. Monteren','6. Publiceren'];
function vStudio(){
 const p=P(); const st=styleById(p.style); const done=p.shots.filter(s=>s.status==='Klaar').length;
 const lockName=(LOCKS.find(l=>l.v===p.lock)||LOCKS[0]).name;
 return '<section class="screen">'+
 '<div class="card hero glow"><div class="hero__img" style="background-image:url('+((st.id==='avond'&&p.img===IMG.gevel)?IMG.avond:p.img)+');filter:'+((p.img===IMG.avond||st.id==='avond')&&(p.img===IMG.gevel||p.img===IMG.avond)?'none':st.f)+'"></div><div class="hero__shade"></div>'+
 '<span class="card-tag">VOORBEELD</span>'+
 '<div class="hero__body"><p class="kicker">Actieve woning</p><h1>'+esc(p.name)+'</h1><p class="sub">'+esc(p.type)+' · '+esc(p.plaats)+' · '+(p.mode==='film'?'Rondleiding':p.mode==='social'?'Social-campagne':'Alles-in-één')+'</p>'+
 '<div class="metrics"><span class="pill"><b>'+p.shots.length+'</b> SCÈNES</span><span class="pill"><b>'+p.fps+'</b> FPS</span><span class="pill"><b>'+p.aspect+'</b> BEELD</span><span class="pill">STIJL <b>'+esc(st.name.toUpperCase())+'</b></span><span class="pill">LOCK <b>'+String(p.lock).replace('.',',')+'</b></span></div>'+
 '<div class="row" style="margin-top:14px"><button class="btn btn-primary" id="playMaster" type="button">'+ICON.play.replace('<svg','<svg width="16" height="16"')+' Speel rondleiding</button><button class="btn btn-ghost" id="playV" type="button">9:16-versie</button></div></div></div>'+

 '<div class="section card"><div class="sec-head"><h3 class="sec-title">Productielijn</h3><span class="mono muted" style="font-size:11px">STAP '+(p.step+1)+' / 6</span></div>'+
 '<div class="stepper">'+STEPS.map((s,i)=>'<div class="step'+(i<p.step?' done':i===p.step?' cur':'')+'" '+(i===p.step?'id="curStep"':'')+'>'+s.toUpperCase()+'<i></i></div>').join('')+'</div>'+
 '<p class="sub" id="stepMsg" style="font-size:14px">'+stepMsg(p.step)+'</p>'+
 '<div class="row" style="margin-top:10px"><button class="btn btn-blue" id="advance" type="button"'+(p.step>=5?' disabled':'')+'>'+(p.step>=5?'Klaar voor publicatie':'Volgende stap')+'</button><a class="btn btn-ghost" href="#/review">Naar meekijkkamer</a></div></div>'+

 '<div class="section"><div class="sec-head"><h3 class="sec-title">Scènes & camerabewegingen</h3><span class="mono" style="font-size:11px;color:var(--mint)">'+done+'/'+p.shots.length+' KLAAR</span></div>'+
 '<div class="hscroll">'+p.shots.map(s=>{const c=camById(s.cam);return '<article class="card shot"><div class="shot__media cam '+c.cls+'"><img '+sty(s.img,st)+' alt="" loading="lazy"><div class="cam-hud"></div><span class="shot__no">#SCÈNE '+String(s.n).padStart(2,'0')+'</span></div><div class="shot__body"><h3>'+esc(s.title)+'</h3><div class="shot__cam">'+esc(c.name)+' · '+s.dur+' s</div><div class="shot__meta"><span class="muted" style="font-size:12.5px">'+esc(s.beat)+'</span><span class="status '+(s.status==='Klaar'?'st-ok':s.status==='Bezig'?'st-busy':'st-plan')+'">'+s.status.toUpperCase()+'</span></div></div></article>';}).join('')+'</div></div>'+

 '<div class="section grid g2">'+
 '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Ruimte-locks (consistentie)</h3>'+
 [['Gevel','Rode baksteen, witte kozijnen, pannendak, haag voor.'],['Woonkamer','Eiken vloer, witte wanden, grote raampartij naar de tuin.'],['Keuken','Wit front, eiken werkblad, kookeiland, drie hanglampen.'],['Tuin','Houten terras, gazon, borders, tuinhuis achterin.']].map(r=>'<div class="check"><span class="ico ok">✓</span><span><b>'+r[0]+'</b><br><span class="muted">'+r[1]+'</span></span></div>').join('')+
 '<p class="muted" style="font-size:12.5px;margin:8px 0 0">Elke scène wordt getoetst aan deze vastgelegde kenmerken, zodat de woning in de video gelijk blijft aan de foto’s.</p></div>'+
 '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Snel starten</h3>'+
 '<a class="list-it" href="#/creeer" data-tool="foto"><span class="ico-box">'+ICON.photo+'</span><span><b>Foto’s verbeteren</b><small>Belichting, rechtzetten, lucht</small></span></a>'+
 '<a class="list-it" href="#/creeer" data-tool="staging"><span class="ico-box">'+ICON.create+'</span><span><b>Virtuele styling</b><small>Lege kamer inrichten, gelabeld</small></span></a>'+
 '<a class="list-it" href="#/creeer" data-tool="video"><span class="ico-box">'+ICON.film+'</span><span><b>Rondleidingvideo</b><small>Uit je foto’s, met camerabewegingen</small></span></a>'+
 '<a class="list-it" href="#/technieken"><span class="ico-box">'+ICON.tech+'</span><span><b>Technieken bekijken</b><small>Drone, dolly, walkthrough en stijlen</small></span></a></div>'+
 '</div></section>';
}
function stepMsg(s){return ['Foto’s en woninggegevens worden verzameld.','Het woningdossier wordt opgebouwd: ruimtes, kenmerken, stijl en volgorde.','Stijl en ruimte-locks worden vastgezet zodat elke scène klopt met je foto’s.','Scènes worden parallel gegenereerd (demo).','Scènes worden aan elkaar gezet met overgangen, titels en muziek.','Klaar: deel de rondleiding in de meekijkkamer en zet hem bij je advertentie.'][s];}
function mStudio(){
 $('#playMaster').onclick=()=>openPlayer(false);
 $('#playV').onclick=()=>openPlayer(true);
 $$('[data-tool]').forEach(a=>a.addEventListener('click',()=>{S.tab.create=a.dataset.tool;}));
 const adv=$('#advance'); if(!adv)return;
 adv.onclick=()=>{const p=P(); if(p.step>=5)return; adv.disabled=true; adv.textContent='Bezig…';
  const cs=$('#curStep'); 
  sim(1800,v=>{cs&&cs.style.setProperty('--p',v+'%');},()=>{p.step++; if(p.step===4)p.shots.forEach(s=>s.status='Klaar'); log('Productielijn',STEPS[p.step-1]+' afgerond',p.step===4?p.shots.length:1); toast(STEPS[p.step-1]+' afgerond'); route();});
 };
}

/* ---------- DOSSIER (productiebijbel → woningdossier) ---------- */
function parseDur(v){v=String(v).trim();if(/^\d+:\d{1,2}$/.test(v)){const[a,b]=v.split(':').map(Number);return a*60+b;}const n=parseInt(v,10);return isNaN(n)?NaN:n;}
function planScenes(sec){const n=Math.max(1,Math.min(12,Math.round(sec/8)));const per=sec/n;return {n,per:Math.round(per*10)/10,ok:per>=6&&per<=15};}
function dossierJSON(p){
 return JSON.stringify({schema:'hzv_woningdossier_v1',woning:{titel:p.name,type:p.type,plaats:p.plaats},productie:{modus:p.mode,duur_s:p.runtime,fps:p.fps,beeld:p.aspect,stijl:styleById(p.style).name,echtheid_lock:p.lock,seed_vast:p.seed},
  ruimte_locks:['gevel','woonkamer','keuken','slaapkamer','tuin'],scenes:p.shots.map(s=>({id:'SC'+String(s.n).padStart(2,'0'),beat:s.beat,camera:camById(s.cam).name,duur_s:s.dur,overgang:s.n===p.shots.length?'einde':'doorloop-brug'})),
  regels:RULES.map(r=>r[0]),label_virtueel:true},null,2);
}
function vDossier(){
 const p=P(); const pl=planScenes(p.runtime); const st=styleById(p.style);
 const sec=(n,t,body,open)=>'<details class="card bsec"'+(open?' open':'')+'><summary><span class="n">'+n+'</span>'+t+'</summary><div class="content">'+body+'</div></details>';
 return '<section class="screen"><p class="kicker">Woningdossier</p><h1>Eén dossier, <span class="grad">elke scène klopt</span></h1><p class="sub">Het dossier legt vast hoe je woning eruitziet, in welke volgorde de ruimtes komen en welke stijl je kiest. Alle foto’s, video’s en teksten worden hieraan getoetst.</p>'+
 '<div class="section card glow"><h3 class="sec-title" style="margin-bottom:10px">Duur van de rondleiding</h3>'+
 '<div class="field"><label for="dur">Doelduur (seconden of mm:ss)</label><input class="input" id="dur" value="'+p.runtime+'" placeholder="bijv. 45, 90, 1:30" inputmode="numeric"></div>'+
 '<p class="mono" id="durInfo" style="font-size:12px;color:var(--sky);margin:0 0 12px">'+pl.n+' SCÈNES × '+pl.per+' S · SCÈNEVENSTER 6–15 S</p>'+
 '<button class="btn btn-primary btn-block" id="genDossier" type="button">Genereer dossier voor '+p.runtime+' s</button><div class="progress" style="margin-top:10px;display:none" id="dProg"><i></i></div></div>'+
 '<div class="section">'+
 sec('1','Overzicht & kernbelofte','<dl class="kv"><dt>Woning</dt><dd>'+esc(p.name)+'</dd><dt>Type</dt><dd>'+esc(p.type)+'</dd><dt>Doel</dt><dd>Kopers in één minuut laten voelen hoe het is om hier te wonen.</dd><dt>Kernbelofte</dt><dd>Licht, ruimte en een tuin om in te leven.</dd><dt>Duur</dt><dd>'+p.runtime+' s · '+p.shots.length+' scènes</dd></dl>',true)+
 sec('2','Visuele identiteit & kleurwet','<p style="margin:0">Stijl: <b style="color:var(--text)">'+esc(st.name)+'</b>. Kleurwet 60/30/10 voor titels en overlays:</p><div class="swatches"><div class="sw" style="flex:6;background:#0b1f18"><span>60% DIEP</span></div><div class="sw" style="flex:3;background:#00e38a"><span>30% MINT</span></div><div class="sw" style="flex:1;background:#f7a100"><span>10%</span></div></div>')+
 sec('3','Ruimtes & ruimte-locks','<ul class="dodont" style="padding-left:18px;margin:0"><li><b>Gevel</b> — baksteen, witte kozijnen, pannendak.</li><li><b>Woonkamer</b> — eiken vloer, grote raampartij naar de tuin.</li><li><b>Keuken</b> — kookeiland, eiken werkblad.</li><li><b>Slaapkamer</b> — schuin dak, houten balken, dakkapel.</li><li><b>Tuin</b> — houten terras, gazon, tuinhuis.</li></ul><p class="muted" style="font-size:12.5px">Vastgelegd vanuit je eigen foto’s. Deze kenmerken mogen in geen enkele scène veranderen.</p>')+
 sec('4','Locatie & omgeving','<dl class="kv"><dt>Plaats</dt><dd>'+esc(p.plaats)+'</dd><dt>Beelden</dt><dd>Drone-overzicht van kavel en straat, geen herkenbare personen of kentekens.</dd><dt>Let op</dt><dd>Toon alleen wat bij de woning hoort; buren en hun tuinen niet uitlichten.</dd></dl>')+
 sec('5','Rondleiding-beats ('+p.shots.length+')',p.shots.map(s=>'<div class="beat"><span class="t">SC'+String(s.n).padStart(2,'0')+' · '+s.dur+'s</span><img src="'+s.img+'" alt=""><span><b style="color:var(--text)">'+esc(s.beat)+'</b><br><small>'+esc(camById(s.cam).name)+'</small></span></div>').join(''))+
 sec('6','Audio & voice-over','<dl class="kv"><dt>Muziek</dt><dd>Rechtenvrije, rustige pianomuziek, fade in/uit.</dd><dt>Geluid</dt><dd>Natuurlijke omgevingsgeluiden (vogels in de tuin), geen effecten.</dd><dt>Voice-over</dt><dd>Optioneel, korte zinnen per ruimte.</dd><dt>Niveau</dt><dd>Doel −14 LUFS (geschikt voor social en web).</dd></dl>')+
 sec('7','Techniek & richtlijnen','<dl class="kv"><dt>Beeld</dt><dd>'+p.aspect+' · '+p.fps+' fps · sluiter 180°</dd><dt>Echtheid</dt><dd>'+String(p.lock).replace('.',',')+' — '+esc((LOCKS.find(l=>l.v===p.lock)||LOCKS[0]).name)+'</dd></dl><ul class="dodont" style="padding-left:18px"><li class="do">✓ DOEN: eerste beeld toont de indeling van de ruimte.</li><li class="do">✓ DOEN: virtueel ingerichte beelden labelen.</li><li class="dont">✕ NIET: ramen, deuren of maten aanpassen.</li><li class="dont">✕ NIET: tekst of logo’s in de gegenereerde beelden.</li></ul>')+
 '</div>'+
 '<div class="section card"><div class="sec-head"><h3 class="sec-title">Dossiercheck</h3><button class="btn btn-ghost btn-sm" id="runCheck" type="button">Controle uitvoeren</button></div><div id="checkOut"><p class="muted" style="margin:0;font-size:14px">Controleert of het dossier compleet is voordat er iets gegenereerd wordt.</p></div></div>'+
 '<div class="section card"><div class="sec-head"><h3 class="sec-title">Ruwe data (JSON)</h3><div class="row"><button class="btn btn-ghost btn-sm" id="tJson" type="button">Toon</button><button class="btn btn-ghost btn-sm" id="cJson" type="button">Kopieer</button></div></div><pre class="json" id="json" hidden></pre></div>'+
 '</section>';
}
function mDossier(){
 const p=P(); const inp=$('#dur');
 inp.oninput=()=>{const s=parseDur(inp.value);const b=$('#genDossier');if(isNaN(s)||s<6){$('#durInfo').textContent='VOER EEN GELDIGE DUUR IN (MIN. 6 S)';$('#durInfo').style.color='var(--warn)';b.disabled=true;return;}
  const pl=planScenes(s);$('#durInfo').style.color='var(--sky)';$('#durInfo').textContent=pl.n+' SCÈNES × '+pl.per+' S · SCÈNEVENSTER 6–15 S'+(pl.ok?'':' · LET OP: BUITEN VENSTER');b.disabled=false;b.textContent='Genereer dossier voor '+s+' s';};
 $('#genDossier').onclick=()=>{const s=parseDur(inp.value);if(isNaN(s)||s<6)return;const pg=$('#dProg');pg.style.display='block';const bar=pg.firstChild;
  sim(1600,v=>bar.style.width=v+'%',()=>{p.runtime=s;const pl=planScenes(s);const base=p.mode==='social'?BEATS_SOCIAL:BEATS_FILM;const beats=[];for(let i=0;i<pl.n;i++)beats.push(base[i%base.length]);p.shots=mkShots(beats).map(x=>(x.dur=Math.round(pl.per),x));log('Dossier gegenereerd',pl.n+' scènes, '+s+' s',1);toast('Dossier bijgewerkt: '+pl.n+' scènes');route();});};
 $('#runCheck').onclick=()=>{const out=$('#checkOut');out.innerHTML='<p class="mono" style="font-size:12px;color:var(--sky)">CONTROLE LOOPT…</p>';
  setTimeout(()=>{const items=[['Woningtitel en type ingevuld',!!p.name&&!!p.type],['Alle ruimtes hebben een ruimte-lock',true],['Elke scène tussen 6 en 15 seconden',p.shots.every(s=>s.dur>=6&&s.dur<=15)],['Geen placeholdertekst (TODO, n.v.t., …)',true],['Elke scène heeft een camerabeweging',p.shots.every(s=>!!s.cam)],['Echtheid-lock minimaal 0,80 voor advertentiebeelden',p.lock>=.8]];
   const ok=items.every(i=>i[1]);
   out.innerHTML=items.map(i=>'<div class="check"><span class="ico '+(i[1]?'ok':'no')+'">'+(i[1]?'✓':'!')+'</span><span>'+i[0]+(i[1]?'':' <b style="color:var(--warn)">— ontbreekt</b>')+'</span></div>').join('')+
   '<div class="banner '+(ok?'ok':'warn')+'" style="margin-top:10px">'+(ok?'GOEDGEKEURD':'NIET COMPLEET')+' · '+new Date().toLocaleString('nl-NL',{timeZone:'Europe/Amsterdam',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})+'</div>';
   log('Dossiercheck',ok?'Goedgekeurd':'Niet compleet');},900);};
 $('#tJson').onclick=e=>{const pre=$('#json');pre.textContent=dossierJSON(p);pre.hidden=!pre.hidden;e.currentTarget.textContent=pre.hidden?'Toon':'Verberg';};
 $('#cJson').onclick=()=>{const t=dossierJSON(p);(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Dossier-JSON gekopieerd.'),()=>toast('Kopiëren niet beschikbaar in deze browser.'));};
}

/* ---------- TECHNIEKEN ---------- */
const TECH_TABS=[['cam','Camerabewegingen'],['stijl','Stijlen & licht'],['lock','Echtheid'],['over','Overgangen'],['regie','Regie-instellingen'],['prompt','Prompttechnieken'],['export','Render & export']];
function vTech(){
 const p=P(); const t=S.tab.tech; let body='';
 if(t==='cam') body='<div class="grid g3">'+CAMS.map(c=>'<article class="card tech">'+camCard(c,'')+'<div class="tech__body"><div class="tech__name"><h3>'+esc(c.name)+'</h3></div><p>'+esc(c.desc)+'</p><div class="spec">'+esc(c.spec)+'</div><p style="font-size:13px" class="muted">Geschikt voor: '+esc(c.use)+'</p><div class="row" style="margin-top:10px"><button class="btn btn-primary btn-sm" data-addcam="'+c.id+'" type="button">+ Voeg scène toe</button><button class="btn btn-ghost btn-sm" data-trycam="'+c.id+'" type="button">Probeer in Creëer</button></div></div></article>').join('')+'</div>';
 if(t==='stijl') body='<div class="split"><div class="filter-demo card" style="padding:0"><img id="stImg" src="'+(p.style==='avond'?IMG.avond:IMG.gevel)+'" alt="Voorbeeldgevel met gekozen stijl" style="filter:'+(p.style==='avond'?'none':styleById(p.style).f)+'"><span class="badge-virtual" id="stLbl">'+esc(styleById(p.style).name.toUpperCase())+'</span></div><div>'+
  STYLES.map(s=>'<button class="opt'+(p.style===s.id?' on':'')+'" data-style="'+s.id+'" type="button"><span class="em" style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#7fb8a0,#35584a);filter:'+s.f+';flex:none"></span><span><b>'+esc(s.name)+'</b><small>'+esc(s.desc)+'</small></span></button>').join('')+'</div></div>'+
  '<div class="card section"><h3 class="sec-title" style="margin-bottom:8px">Kleurwet 60/30/10</h3><p class="muted" style="margin:0;font-size:14px">Voor titels, ondertitels en eindkaarten: 60% rustige basis, 30% huisstijlkleur, 10% accent. Zo blijft de woning de hoofdrol spelen.</p><div class="swatches"><div class="sw" style="flex:6;background:#0b1f18"><span>60%</span></div><div class="sw" style="flex:3;background:#00e38a"><span>30%</span></div><div class="sw" style="flex:1;background:#f7a100"><span>10%</span></div></div></div>';
 if(t==='lock') body='<div class="grid g2">'+LOCKS.map(l=>'<button class="opt'+(p.lock===l.v?' on':'')+'" data-lock="'+l.v+'" type="button"><span class="em mono" style="font-size:16px;color:var(--mint);width:46px">'+String(l.v).replace('.',',')+'</span><span><b>'+esc(l.name)+'</b><small>'+esc(l.desc)+'</small></span></button>').join('')+'</div>'+
  '<div class="banner warn section">'+ICON.lock.replace('<svg','<svg width="18" height="18"')+' ADVERTENTIEBEELDEN: GEBRUIK “STRIKT ECHT”. VIRTUELE STYLING ALTIJD LABELEN.</div>';
 if(t==='over') body='<div class="grid g3">'+TRANS.map(x=>'<article class="card" style="padding:0"><div class="trans-demo t-'+x.id+'"><img src="'+(x.id==='bridge'?IMG.leeg:IMG.gevel)+'" alt=""><img class="b" src="'+(x.id==='bridge'?IMG.staged:IMG.woon)+'" alt=""></div><div class="tech__body"><h3>'+esc(x.name)+'</h3><p class="muted" style="margin:6px 0 0;font-size:14px">'+esc(x.desc)+'</p></div></article>').join('')+'</div>';
 if(t==='regie') body='<div class="card glow"><div class="row" style="justify-content:space-between;margin-bottom:12px"><h3>Regiemodus</h3><span class="status st-ok">ACTIEF</span></div>'+
  '<div class="field"><span class="lbl">Beeldsnelheid</span><div class="chips">'+[24,25,30].map(f=>'<button class="chip'+(p.fps===f?' on':'')+'" data-fps="'+f+'" type="button">'+f+' fps</button>').join('')+'</div></div>'+
  '<div class="field"><span class="lbl">Beeldverhouding</span><div class="chips">'+['16:9','9:16','1:1'].map(a=>'<button class="chip'+(p.aspect===a?' on':'')+'" data-aspect="'+a+'" type="button">'+a+(a==='16:9'?' · website':a==='9:16'?' · Reels/TikTok':' · feed')+'</button>').join('')+'</div></div>'+
  '<div class="field"><span class="lbl">Sluiterhoek</span><div class="chips"><button class="chip on" type="button">180° filmisch</button></div></div>'+
  '<div class="field"><span class="lbl">Rendermodus</span>'+[['auto','Automatisch','Kiest per scène tussen snel en hoogste kwaliteit.'],['quality','Beste kwaliteit','Alle scènes op de hoogste kwaliteit.'],['speed','Snel voorbeeld','Snelle conceptversie om de volgorde te checken.'],['manual','Handmatig','Je kiest zelf per scène.']].map(r=>'<button class="opt'+(p.route===r[0]?' on':'')+'" data-route="'+r[0]+'" type="button"><span><b>'+r[1]+'</b><small>'+r[2]+'</small></span></button>').join('')+'</div>'+
  '<div class="row" style="justify-content:space-between;margin:6px 0 14px"><span><b>Seed vastzetten</b><br><small class="muted">Zelfde instellingen geven hetzelfde resultaat</small></span><label class="switch"><input type="checkbox" id="seed"'+(p.seed?' checked':'')+'><span></span></label></div>'+
  '<pre class="json" id="regieLine" style="white-space:pre-wrap">'+regieLine(p)+'</pre></div>';
 if(t==='prompt') body='<div class="split"><div class="card"><h3 class="sec-title" style="margin-bottom:8px">Regels voor goede woningbeelden</h3>'+RULES.map((r,i)=>'<div class="check"><span class="ico ok">'+(i+1)+'</span><span><b>'+esc(r[0])+'</b><br><span class="muted">'+esc(r[1])+'</span></span></div>').join('')+'</div>'+
  '<div class="card glow"><h3 class="sec-title" style="margin-bottom:10px">Promptbouwer</h3>'+
  '<div class="field"><label for="pbR">Ruimte</label><select class="input" id="pbR">'+['Gevel','Woonkamer','Keuken','Slaapkamer','Badkamer','Tuin','Drone-overzicht'].map(x=>'<option>'+x+'</option>').join('')+'</select></div>'+
  '<div class="field"><label for="pbC">Camerabeweging</label><select class="input" id="pbC">'+CAMS.map(c=>'<option value="'+c.id+'">'+esc(c.name)+'</option>').join('')+'</select></div>'+
  '<div class="field"><label for="pbS">Stijl</label><select class="input" id="pbS">'+STYLES.map(s=>'<option value="'+s.id+'"'+(s.id===p.style?' selected':'')+'>'+esc(s.name)+'</option>').join('')+'</select></div>'+
  '<div class="field"><label for="pbD">Duur: <output id="pbDo">8</output> s</label><input type="range" id="pbD" min="6" max="15" value="8"></div>'+
  '<pre class="json" id="pbOut" style="white-space:pre-wrap"></pre><div class="row"><button class="btn btn-primary btn-sm" id="pbCopy" type="button">Kopieer prompt</button><button class="btn btn-ghost btn-sm" id="pbUse" type="button">Gebruik in Creëer</button></div></div></div>';
 if(t==='export') body='<div class="grid g2">'+[
   ['Rondleiding 16:9','Voor je advertentie en website. 720p of 1080p, H.264 MP4.',ICON.film],
   ['Verticale social-cut 9:16','Voor Reels, TikTok, Shorts en Stories.',ICON.phone],
   ['Fotoset','Advertentie (1920 px), Instagram, Stories en print. JPEG, WebP of PNG.',ICON.photo],
   ['Plattegrond','PNG voor de advertentie en PDF om te printen.',ICON.plan],
   ['Advertentietekst','Platte tekst en een korte social-versie.',ICON.text],
   ['Audio','Rechtenvrije muziek met fades, genormaliseerd op −14 LUFS.',ICON.play]
  ].map(x=>'<div class="deliv"><span class="ico-box">'+x[2]+'</span><span style="flex:1"><b>'+x[0]+'</b><br><small class="muted">'+x[1]+'</small></span></div>').join('')+'</div>';
 return '<section class="screen"><p class="kicker">Technieken</p><h1>Filmtechnieken, <span class="grad">vertaald naar je woning</span></h1><p class="sub">Camerabewegingen, stijlen, overgangen en regie-instellingen die je rondleiding en foto’s laten verkopen.</p>'+
 '<div class="section"><div class="tabs" role="tablist">'+TECH_TABS.map(x=>'<button class="tab'+(t===x[0]?' on':'')+'" data-ttab="'+x[0]+'" role="tab" type="button">'+x[1]+'</button>').join('')+'</div>'+body+'</div></section>';
}
function regieLine(p){return '[REGIE: '+p.fps+' fps | '+p.aspect+' | sluiter 180° | stijl '+styleById(p.style).name+' | echtheid '+String(p.lock).replace('.',',')+' | '+(p.seed?'seed vast':'seed willekeurig')+' | modus '+({auto:'automatisch',quality:'beste kwaliteit',speed:'snel voorbeeld',manual:'handmatig'})[p.route]+']';}
function buildPrompt(){const r=$('#pbR').value,c=camById($('#pbC').value),s=styleById($('#pbS').value),d=$('#pbD').value;
 return r+' van de woning. '+c.name+': '+c.desc.split('.')[0].toLowerCase()+'. Stijl: '+s.name.toLowerCase()+'. Eerste beeld toont de indeling; echte maat en contact, niets zweeft. Ramen, deuren en materialen exact zoals op de referentiefoto. Geen tekst of logo’s in beeld. Duur '+d+' s, '+P().aspect+', '+P().fps+' fps.';}
function mTech(){
 const p=P();
 $$('[data-ttab]').forEach(b=>b.onclick=()=>{S.tab.tech=b.dataset.ttab;route();});
 $$('[data-addcam]').forEach(b=>b.onclick=()=>{const c=camById(b.dataset.addcam);p.shots.push({n:p.shots.length+1,beat:'Extra scène',cam:c.id,img:c.img,title:c.name,dur:8,status:'Gepland'});log('Scène toegevoegd',c.name,0);toast('Scène toegevoegd: '+c.name+' (#'+p.shots.length+')');});
 $$('[data-trycam]').forEach(b=>b.onclick=()=>{S.tab.create='video';S.tryCam=b.dataset.trycam;location.hash='#/creeer';});
 $$('[data-style]').forEach(b=>b.onclick=()=>{p.style=b.dataset.style;const s=styleById(p.style);const im=$('#stImg');im.src=s.id==='avond'?IMG.avond:IMG.gevel;im.style.filter=s.id==='avond'?'none':s.f;$('#stLbl').textContent=s.name.toUpperCase();$$('[data-style]').forEach(x=>x.classList.toggle('on',x===b));log('Stijl gekozen',s.name);});
 $$('[data-lock]').forEach(b=>b.onclick=()=>{p.lock=+b.dataset.lock;$$('[data-lock]').forEach(x=>x.classList.toggle('on',x===b));log('Echtheid-lock',String(p.lock));toast('Echtheid: '+(LOCKS.find(l=>l.v===p.lock).name));});
 const upd=()=>{const el=$('#regieLine');if(el)el.textContent=regieLine(p);};
 $$('[data-fps]').forEach(b=>b.onclick=()=>{p.fps=+b.dataset.fps;$$('[data-fps]').forEach(x=>x.classList.toggle('on',x===b));upd();});
 $$('[data-aspect]').forEach(b=>b.onclick=()=>{p.aspect=b.dataset.aspect;$$('[data-aspect]').forEach(x=>x.classList.toggle('on',x===b));upd();});
 $$('[data-route]').forEach(b=>b.onclick=()=>{p.route=b.dataset.route;$$('[data-route]').forEach(x=>x.classList.toggle('on',x===b));upd();});
 const sd=$('#seed');if(sd)sd.onchange=()=>{p.seed=sd.checked;upd();};
 if($('#pbOut')){const r=()=>{$('#pbDo').textContent=$('#pbD').value;$('#pbOut').textContent=buildPrompt();};['pbR','pbC','pbS','pbD'].forEach(id=>$('#'+id).addEventListener('input',r));r();
  $('#pbCopy').onclick=()=>{(navigator.clipboard?navigator.clipboard.writeText(buildPrompt()):Promise.reject()).then(()=>toast('Prompt gekopieerd.'),()=>toast('Kopiëren niet beschikbaar.'));};
  $('#pbUse').onclick=()=>{S.tab.create='video';S.prefill=buildPrompt();S.tryCam=$('#pbC').value;location.hash='#/creeer';};}
}

/* ---------- CREËER (Imagine-studio) ---------- */
const TOOLS=[['foto','Foto verbeteren',ICON.photo],['staging','Virtuele styling',ICON.create],['lucht','Lucht & avond',ICON.photo],['video','Rondleidingvideo',ICON.film],['plan','Plattegrond',ICON.plan],['tekst','Advertentietekst',ICON.text],['social','Social-clips',ICON.phone]];
function baSlider(before,after,lb,la,id,afterFilter,badge){return '<div class="ba" id="'+id+'" style="--x:50%"><img src="'+before+'" alt="Voor" class="ba__bot"><img src="'+after+'" alt="Na" class="ba__top" style="'+(afterFilter?'filter:'+afterFilter:'')+'">'+(badge?'<span class="badge-virtual">'+badge+'</span>':'')+'<div class="ba__handle"></div><span class="ba__lbl l">'+lb+'</span><span class="ba__lbl r">'+la+'</span><input type="range" min="0" max="100" value="50" aria-label="Vergelijk voor en na"></div>';}
function bindBA(root){$$('.ba',root).forEach(b=>{const r=b.querySelector('input');r.oninput=()=>b.style.setProperty('--x',r.value+'%');});}
function vCreate(){
 const t=S.tab.create; let body='';
 if(t==='foto') body='<div class="split"><div>'+baSlider(IMG.gevel,IMG.gevel,'ORIGINEEL','VERBETERD','baFoto','')+'<p class="muted" style="font-size:12.5px;margin-top:8px">Sleep de schuif om origineel en verbeterd te vergelijken. Het “origineel” is voor de demo kunstmatig scheef en flets gemaakt.</p></div>'+
  '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Aanpassingen</h3>'+
  [['bel','Belichting',-50,50,18],['con','Contrast',-50,50,10],['warm','Warmte',-50,50,6],['sat','Levendigheid',-50,50,12],['recht','Rechtzetten',-3,3,0]].map(r=>'<div class="range-row"><span>'+r[1]+'</span><input type="range" id="r_'+r[0]+'" min="'+r[2]+'" max="'+r[3]+'" value="'+r[4]+'" step="'+(r[0]==='recht'?0.1:1)+'"><output id="o_'+r[0]+'">'+r[4]+'</output></div>').join('')+
  '<div class="row" style="margin-top:10px"><button class="btn btn-primary" id="autoFix" type="button">Automatisch verbeteren</button><button class="btn btn-ghost" id="resetFix" type="button">Reset</button></div>'+
  '<p class="mono" style="font-size:11px;color:var(--sky);margin-top:12px">HISTOGRAM + WITBALANS STELLEN DE SCHUIVEN VOOR · DEMO</p></div></div>';
 if(t==='staging') body='<div class="split"><div>'+baSlider(IMG.leeg,IMG.staged,'LEEG','INGERICHT','baStage','','VIRTUEEL INGERICHT')+'<p class="muted" style="font-size:12.5px;margin-top:8px">Architectuur, ramen en vloer blijven ongewijzigd (echtheid-lock 0,95). Het label “Virtueel ingericht” blijft altijd zichtbaar.</p></div>'+
  '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Inrichtingsstijl</h3><div class="chips" id="stageStyles">'+['Scandinavisch','Landelijk','Modern','Industrieel','Japandi'].map((s,i)=>'<button class="chip'+(i===0?' on':'')+'" type="button" data-ss="'+i+'">'+s+'</button>').join('')+'</div>'+
  '<div class="field" style="margin-top:12px"><label for="room">Ruimte</label><select class="input" id="room"><option>Woonkamer</option><option>Slaapkamer</option><option>Werkkamer</option><option>Kinderkamer</option></select></div>'+
  '<div class="row" style="justify-content:space-between;margin-bottom:12px"><span><b>Eerst leegmaken</b><br><small class="muted">Bestaande meubels digitaal weghalen</small></span><label class="switch"><input type="checkbox" checked><span></span></label></div>'+
  '<button class="btn btn-primary btn-block" id="stageGo" type="button">Richt in (demo)</button><div class="progress" id="stageProg" style="margin-top:10px;display:none"><i></i></div>'+
  '<p class="muted" style="font-size:12.5px;margin-top:10px">In de demo toont elke stijl hetzelfde voorbeeldresultaat met een andere kleurtoon.</p></div></div>';
 if(t==='lucht') body='<div class="split"><div>'+baSlider(IMG.gevel,IMG.avond,'DAG','AVOND','baLucht','')+'<p class="muted" style="font-size:12.5px;margin-top:8px">Dezelfde gevel, dezelfde camera: alleen licht en lucht veranderen.</p></div>'+
  '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Lucht & moment</h3>'+[['avond','Blauw uur, lampen aan','Laat zien hoe warm de woning ’s avonds oogt.'],['blauw','Strakblauwe lucht','Vervangt een grijze lucht door helder blauw.'],['gouden','Gouden uur','Warm, laag zonlicht op de gevel.']].map((x,i)=>'<button class="opt'+(i===0?' on':'')+'" data-sky="'+x[0]+'" type="button"><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span></button>').join('')+
  '<div class="banner warn" style="margin-top:6px">ALLEEN LUCHT EN LICHT · DE WONING ZELF BLIJFT ONGEWIJZIGD</div></div></div>';
 if(t==='video'){const sel=S.tryCam||'dolly';
  body='<div class="split"><div class="card glow"><div class="tabs" style="margin-bottom:12px"><button class="tab on" data-vmode="text" type="button">Tekst → video</button><button class="tab" data-vmode="photo" type="button">Foto → video</button></div>'+
  '<div id="vPhoto" hidden><span class="lbl">Kies een foto</span><div class="chips" style="margin:8px 0 12px">'+[['gevel','Gevel'],['woon','Woonkamer'],['keuken','Keuken'],['slaap','Slaapkamer'],['tuin','Tuin'],['drone','Drone']].map((x,i)=>'<button class="chip'+(i===0?' on':'')+'" data-vimg="'+x[0]+'" type="button">'+x[1]+'</button>').join('')+'</div></div>'+
  '<div class="field"><label for="vPrompt">Beschrijving</label><textarea class="input" id="vPrompt" placeholder="Beschrijf camerabeweging, licht en kader… bijv. langzame dolly-in vanaf de deur naar het raam, zacht daglicht van links.">'+esc(S.prefill||'')+'</textarea></div>'+
  '<div class="field"><span class="lbl">Camerabeweging</span><div class="chips">'+CAMS.map(c=>'<button class="chip'+(c.id===sel?' on':'')+'" data-vcam="'+c.id+'" type="button">'+esc(c.name.split(' (')[0])+'</button>').join('')+'</div></div>'+
  '<div class="field"><label for="vDur">Duur: <output id="vDurO">8</output> s</label><input type="range" id="vDur" min="6" max="15" value="8"></div>'+
  '<div class="field"><span class="lbl">Beeld</span><div class="chips"><button class="chip on" data-vasp="16:9" type="button">16:9</button><button class="chip" data-vasp="9:16" type="button">9:16</button></div></div>'+
  '<button class="btn btn-primary btn-block" id="vGo" type="button">Genereer scène (8 s)</button>'+
  '<div class="card" id="vProg" style="margin-top:12px;display:none;background:rgba(0,0,0,.3)"><div class="row" style="justify-content:space-between"><span class="mono" style="font-size:11px;color:var(--sky)" id="vProgT">BEZIG IN DE ENGINE…</span><span class="mono" id="vProgP" style="font-size:11px">0%</span></div><div class="progress" style="margin-top:8px"><i id="vBar"></i></div></div></div>'+
  '<div><div class="sec-head"><h3 class="sec-title">Reel-galerij ('+S.reel.length+')</h3></div>'+(S.reel.length?'<div class="reel">'+S.reel.map((r,i)=>'<article class="card reel-item'+(r.asp==='9:16'?' v':'')+'">'+camCard({cls:camById(r.cam).cls,img:r.img})+'<div class="reel-item__b"><b>'+esc(camById(r.cam).name.split(' (')[0])+'</b><div class="mono">'+r.dur+' S · '+r.asp+' · DEMO</div><div class="row" style="margin-top:8px"><button class="btn btn-ghost btn-sm" data-attach="'+i+'" type="button">Aan scène</button><button class="btn btn-ghost btn-sm" data-del="'+i+'" type="button">Wis</button></div></div></article>').join('')+'</div>':'<div class="card"><p class="muted" style="margin:0">Nog geen scènes gemaakt. Maak er een met tekst of vanuit een foto.</p></div>')+'</div></div>';
  S.prefill='';}
 if(t==='plan') body='<div class="split"><div class="card"><div class="tabs" style="margin-bottom:12px"><button class="tab on" data-floor="0" type="button">Begane grond</button><button class="tab" data-floor="1" type="button">Eerste verdieping</button></div><div id="planWrap">'+planSVG(0)+'</div><p class="muted" style="font-size:12.5px;margin:8px 0 0">Voorbeeldmaten van de demo-woning. Tik op een ruimte om de bijbehorende foto te zien.</p></div>'+
  '<div class="card"><h3 class="sec-title" style="margin-bottom:10px">Ruimte</h3><div id="planInfo"><p class="muted" style="margin:0">Kies een ruimte in de plattegrond.</p></div>'+
  '<div class="field" style="margin-top:14px"><span class="lbl">Weergave</span><div class="chips"><button class="chip on" type="button" data-pv="2d">2D lijntekening</button><button class="chip" type="button" data-pv="m2">Met m²</button></div></div>'+
  '<button class="btn btn-ghost btn-block" id="planExp" type="button">'+ICON.dl.replace('<svg','<svg width="16" height="16"')+' Exporteer PNG / PDF</button></div></div>';
 if(t==='tekst') body='<div class="split"><div class="card"><h3 class="sec-title" style="margin-bottom:10px">Gegevens</h3>'+
  '<div class="field"><label for="aType">Soort woning</label><select class="input" id="aType"><option>vrijstaande woning</option><option>twee-onder-een-kapwoning</option><option>tussenwoning</option><option>hoekwoning</option><option>appartement</option></select></div>'+
  '<div class="field"><label for="aKamers">Aantal slaapkamers</label><input class="input" id="aKamers" type="number" min="1" max="9" value="4"></div>'+
  '<div class="field"><span class="lbl">Pluspunten</span><div class="chips" id="aPlus">'+['lichte woonkamer','keuken met kookeiland','tuin met terras','slaapkamer met houten balken','rustige straat','eigen oprit'].map((x,i)=>'<button class="chip'+(i<3?' on':'')+'" type="button">'+x+'</button>').join('')+'</div></div>'+
  '<div class="field"><span class="lbl">Toon</span><div class="chips" id="aToon"><button class="chip on" type="button" data-toon="warm">Warm</button><button class="chip" type="button" data-toon="zakelijk">Zakelijk</button><button class="chip" type="button" data-toon="kort">Kort & krachtig</button></div></div>'+
  '<button class="btn btn-primary btn-block" id="aGo" type="button">Schrijf advertentietekst</button></div>'+
  '<div class="card glow"><div class="sec-head"><h3 class="sec-title">Resultaat</h3><button class="btn btn-ghost btn-sm" id="aCopy" type="button">Kopieer</button></div><div class="adtext" id="aOut"><span class="muted">Vul links de gegevens in en druk op “Schrijf advertentietekst”. Er komen geen prijzen of verzonnen feiten in de tekst.</span></div></div></div>';
 if(t==='social') body='<p class="sub" style="margin-top:0">Drie verticale clips volgens de vaste opbouw: blikvanger → kenmerken → bewijsmoment → afsluiter → oproep.</p><div class="phones">'+
  [['Reels / TikTok',BEATS_SOCIAL],['Shorts',[BEATS_SOCIAL[1],BEATS_SOCIAL[2],BEATS_SOCIAL[3],BEATS_SOCIAL[4]]],['Stories',[BEATS_SOCIAL[0],BEATS_SOCIAL[3],BEATS_SOCIAL[4]]]].map((ph,pi)=>'<div><div class="phone" data-phone="'+pi+'"><div class="bar">'+ph[1].map(()=>'<i></i>').join('')+'</div>'+ph[1].map((b,i)=>'<div class="frame'+(i===0?' on':'')+'"><img src="'+IMG[b[2]]+'" alt=""><div class="cap"><small>'+esc(b[0].toUpperCase())+'</small>'+esc(b[3])+'</div></div>').join('')+'<div class="cta">BEKIJK OP HUISZELFVERKOOP.NL</div></div><p class="mono" style="font-size:11px;text-align:center;color:var(--text2);margin:8px 0 0">'+ph[0]+'</p></div>').join('')+
  '</div><div class="row"><button class="btn btn-primary" id="socGo" type="button">Maak clips voor deze woning</button><button class="btn btn-ghost" id="socExp" type="button">Exporteer 9:16</button></div>';
 return '<section class="screen"><p class="kicker">Creëer</p><h1>Maak beelden <span class="grad">die verkopen</span></h1><p class="sub">Foto’s verbeteren, kamers virtueel inrichten, een rondleiding maken, een plattegrond, je advertentietekst en social-clips. Alles in één studio.</p>'+
 '<div class="section"><div class="tabs">'+TOOLS.map(x=>'<button class="tab'+(t===x[0]?' on':'')+'" data-ctab="'+x[0]+'" type="button">'+x[1]+'</button>').join('')+'</div>'+body+'</div></section>';
}
const PLAN=[
 [{n:'Woonkamer',m:'38,5 m²',x:20,y:20,w:250,h:190,img:IMG.woon},{n:'Keuken',m:'16,2 m²',x:270,y:20,w:150,h:130,img:IMG.keuken},{n:'Hal',m:'7,8 m²',x:270,y:150,w:80,h:110,img:IMG.staged},{n:'Toilet',m:'1,4 m²',x:350,y:150,w:70,h:50,img:null},{n:'Berging',m:'4,1 m²',x:350,y:200,w:70,h:60,img:null},{n:'Tuinkamer',m:'12,0 m²',x:20,y:210,w:250,h:50,img:IMG.tuin}],
 [{n:'Slaapkamer 1',m:'17,3 m²',x:20,y:20,w:200,h:130,img:IMG.slaap},{n:'Slaapkamer 2',m:'11,6 m²',x:220,y:20,w:200,h:110,img:null},{n:'Badkamer',m:'7,2 m²',x:220,y:130,w:110,h:80,img:null},{n:'Overloop',m:'5,0 m²',x:330,y:130,w:90,h:130,img:null},{n:'Slaapkamer 3',m:'9,8 m²',x:20,y:150,w:200,h:110,img:null},{n:'Slaapkamer 4',m:'6,1 m²',x:220,y:210,w:110,h:50,img:null}]
];
function planSVG(f,showM){return '<svg class="plan" viewBox="0 0 440 280" role="img" aria-label="Plattegrond '+(f?'eerste verdieping':'begane grond')+'"><rect class="wall" x="18" y="18" width="404" height="244"/>'+PLAN[f].map((r,i)=>'<g><rect class="room" data-room="'+i+'" x="'+r.x+'" y="'+r.y+'" width="'+r.w+'" height="'+r.h+'"/><text x="'+(r.x+r.w/2)+'" y="'+(r.y+r.h/2-(showM?2:-4))+'" text-anchor="middle">'+r.n+'</text>'+(showM?'<text class="m2" x="'+(r.x+r.w/2)+'" y="'+(r.y+r.h/2+13)+'" text-anchor="middle">'+r.m+'</text>':'')+'</g>').join('')+(f===0?'<path class="door" d="M300 262 A30 30 0 0 1 330 232"/><text class="m2" x="300" y="276">ENTREE</text>':'')+'</svg>';}
function mCreate(){
 $$('[data-ctab]').forEach(b=>b.onclick=()=>{S.tab.create=b.dataset.ctab;route();});
 bindBA(document);
 const t=S.tab.create;
 if(t==='foto'){const top=$('#baFoto .ba__top'),bot=$('#baFoto .ba__bot');bot.style.filter='brightness(.8) contrast(.82) saturate(.7) sepia(.08)';bot.style.transform='rotate(1.6deg) scale(1.06)';
  const ids=['bel','con','warm','sat','recht'];const apply=()=>{const v=Object.fromEntries(ids.map(i=>[i,+$('#r_'+i).value]));ids.forEach(i=>$('#o_'+i).textContent=v[i]);
   top.style.filter='brightness('+(1+v.bel/200)+') contrast('+(1+v.con/200)+') saturate('+(1+v.sat/150)+') sepia('+Math.max(0,v.warm/200)+') hue-rotate('+(v.warm<0?v.warm/3:0)+'deg)';top.style.transform='rotate('+(v.recht)+'deg) scale('+(1+Math.abs(v.recht)*0.03)+')';};
  ids.forEach(i=>$('#r_'+i).oninput=apply);apply();
  $('#autoFix').onclick=()=>{const tgt={bel:18,con:10,warm:6,sat:12,recht:0};ids.forEach(i=>$('#r_'+i).value=tgt[i]);apply();const b=$('#baFoto input');let x=10;const id=setInterval(()=>{x+=3;b.value=x;b.dispatchEvent(new Event('input'));if(x>=85)clearInterval(id);},16);log('Foto verbeterd','Gevel · automatisch',1);toast('Automatisch verbeterd (demo).');};
  $('#resetFix').onclick=()=>{ids.forEach(i=>$('#r_'+i).value=0);apply();};}
 if(t==='staging'){const tones=['none','sepia(.25) saturate(1.1)','contrast(1.12) saturate(.85)','sepia(.15) contrast(1.15) brightness(.92)','saturate(.75) brightness(1.04) sepia(.1)'];
  $$('[data-ss]').forEach(b=>b.onclick=()=>{$$('[data-ss]').forEach(x=>x.classList.toggle('on',x===b));$('#baStage .ba__top').style.filter=tones[+b.dataset.ss];});
  $('#stageGo').onclick=()=>{const pg=$('#stageProg');pg.style.display='block';const bar=pg.firstChild;const b=$('#baStage input');b.value=0;b.dispatchEvent(new Event('input'));
   sim(1500,v=>{bar.style.width=v+'%';b.value=v;b.dispatchEvent(new Event('input'));},()=>{log('Virtuele styling',$('#room').value+' · '+$('#stageStyles .on').textContent,1);toast('Ingericht (demo) — gelabeld als virtueel.');});};}
 if(t==='lucht'){const map={avond:[IMG.avond,'none'],blauw:[IMG.gevel,'saturate(1.25) contrast(1.05) brightness(1.05)'],gouden:[IMG.gevel,'sepia(.3) saturate(1.3) brightness(1.04) hue-rotate(-10deg)']};
  $$('[data-sky]').forEach(b=>b.onclick=()=>{$$('[data-sky]').forEach(x=>x.classList.toggle('on',x===b));const m=map[b.dataset.sky];const top=$('#baLucht .ba__top');top.src=m[0];top.style.filter=m[1];$('#baLucht .ba__lbl.r').textContent=b.querySelector('b').textContent.toUpperCase();log('Lucht & licht',b.querySelector('b').textContent,1);});}
 if(t==='video'){let mode='text',img='gevel',cam=S.tryCam||'dolly',asp='16:9';S.tryCam=null;
  $$('[data-vmode]').forEach(b=>b.onclick=()=>{mode=b.dataset.vmode;$$('[data-vmode]').forEach(x=>x.classList.toggle('on',x===b));$('#vPhoto').hidden=mode!=='photo';$('#vPrompt').placeholder=mode==='photo'?'Beschrijf de beweging vanaf deze foto… bijv. langzaam naar het raam, gordijnen bewegen licht.':'Beschrijf camerabeweging, licht en kader… bijv. langzame dolly-in vanaf de deur naar het raam, zacht daglicht van links.';});
  $$('[data-vimg]').forEach(b=>b.onclick=()=>{img=b.dataset.vimg;$$('[data-vimg]').forEach(x=>x.classList.toggle('on',x===b));});
  $$('[data-vcam]').forEach(b=>b.onclick=()=>{cam=b.dataset.vcam;$$('[data-vcam]').forEach(x=>x.classList.toggle('on',x===b));});
  $$('[data-vasp]').forEach(b=>b.onclick=()=>{asp=b.dataset.vasp;$$('[data-vasp]').forEach(x=>x.classList.toggle('on',x===b));});
  const d=$('#vDur');d.oninput=()=>{$('#vDurO').textContent=d.value;$('#vGo').textContent='Genereer scène ('+d.value+' s)';};
  $('#vGo').onclick=()=>{const go=$('#vGo');go.disabled=true;const pr=$('#vProg');pr.style.display='block';
   const src=mode==='photo'?IMG[img]:camById(cam).img;
   sim(2600,v=>{$('#vBar').style.width=v+'%';$('#vProgP').textContent=v+'%';$('#vProgT').textContent=v<40?'DOSSIER EN RUIMTE-LOCKS LADEN…':v<85?'BEZIG IN DE ENGINE… (DEMO)':'CONTROLE TEGEN HET DOSSIER…';},
    ()=>{S.reel.unshift({img:src,cam,dur:+d.value,asp});log('Scène gegenereerd',camById(cam).name+' · '+d.value+' s',+d.value);toast('Scène klaar (demo) — staat in de reel-galerij.');route();});};
  $$('[data-del]').forEach(b=>b.onclick=()=>{S.reel.splice(+b.dataset.del,1);route();});
  $$('[data-attach]').forEach(b=>b.onclick=()=>{const r=S.reel[+b.dataset.attach];const p=P();p.shots.push({n:p.shots.length+1,beat:'Extra scène',cam:r.cam,img:r.img,title:camById(r.cam).name,dur:r.dur,status:'Klaar'});log('Scène gekoppeld','#'+p.shots.length);toast('Gekoppeld als scène #'+p.shots.length+' in Studio.');});}
 if(t==='plan'){let f=0,showM=false;const bind=()=>{$$('#planWrap .room').forEach(r=>r.onclick=()=>{$$('#planWrap .room').forEach(x=>x.classList.remove('on'));r.classList.add('on');const R=PLAN[f][+r.dataset.room];$('#planInfo').innerHTML='<h3>'+R.n+'</h3><p class="mono" style="color:var(--sky);font-size:12px;margin:4px 0 10px">'+R.m+' · VOORBEELDMAAT</p>'+(R.img?'<img src="'+R.img+'" alt="" style="border-radius:12px;aspect-ratio:16/10;object-fit:cover;width:100%">':'<p class="muted" style="margin:0">Nog geen foto gekoppeld aan deze ruimte. Upload er een in de echte studio.</p>');});};
  const draw=()=>{$('#planWrap').innerHTML=planSVG(f,showM);bind();};bind();
  $$('[data-floor]').forEach(b=>b.onclick=()=>{f=+b.dataset.floor;$$('[data-floor]').forEach(x=>x.classList.toggle('on',x===b));draw();});
  $$('[data-pv]').forEach(b=>b.onclick=()=>{showM=b.dataset.pv==='m2';$$('[data-pv]').forEach(x=>x.classList.toggle('on',x===b));draw();});
  $('#planExp').onclick=()=>toast('Demo: export is uitgeschakeld in de preview.');}
 if(t==='tekst'){$$('#aPlus .chip').forEach(c=>c.onclick=()=>c.classList.toggle('on'));$$('#aToon .chip').forEach(c=>c.onclick=()=>{$$('#aToon .chip').forEach(x=>x.classList.toggle('on',x===c));});
  $('#aGo').onclick=()=>{const type=$('#aType').value,k=$('#aKamers').value,plus=$$('#aPlus .chip.on').map(c=>c.textContent),toon=$('#aToon .on').dataset.toon;
   const list=plus.length?plus:['ruime indeling'];let txt;
   if(toon==='warm')txt='Welkom thuis in deze sfeervolle '+type+'.\n\nStap binnen en voel meteen de ruimte. Met '+k+' slaapkamers is er plek voor iedereen. De '+list[0]+' is het hart van het huis'+(list[1]?', en de '+list[1]+' maakt het af':'')+'.'+(list[2]?' Buiten wacht een '+list[2]+' voor lange zomeravonden.':'')+'\n\nJe koopt rechtstreeks van de eigenaar, zonder makelaar. Plan een bezichtiging en ervaar het zelf.';
   else if(toon==='zakelijk')txt=type.charAt(0).toUpperCase()+type.slice(1)+' met '+k+' slaapkamers, te koop van eigenaar.\n\nKenmerken:\n'+list.map(x=>'• '+x).join('\n')+'\n\nVerkoop rechtstreeks door de eigenaar; contact en bezichtiging via huiszelfverkoop.nl.';
   else txt=k+' slaapkamers. '+list.slice(0,3).map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join('. ')+'.\nDirect van de eigenaar. Kom kijken!';
   const out=$('#aOut');out.textContent='';out.classList.add('caret');let i=0;const id=setInterval(()=>{out.textContent=txt.slice(0,i+=3);if(i>=txt.length){clearInterval(id);out.classList.remove('caret');S.lastAd=txt;log('Advertentietekst',toon+' · '+txt.length+' tekens',1);}},14);};
  $('#aCopy').onclick=()=>{const t=$('#aOut').textContent;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Tekst gekopieerd.'),()=>toast('Kopiëren niet beschikbaar.'));};}
 if(t==='social'){$$('[data-phone]').forEach(ph=>{const fr=$$('.frame',ph),bars=$$('.bar i',ph);let i=0;const show=()=>{fr.forEach((f,j)=>f.classList.toggle('on',j===i));bars.forEach((b,j)=>{b.className=j<i?'done':j===i?'on':'';});};show();const id=setInterval(()=>{if(!document.body.contains(ph)){clearInterval(id);return;}i=(i+1)%fr.length;show();},2200);});
  $('#socGo').onclick=()=>{log('Social-clips','3 verticale clips',3);toast('3 clips klaargezet (demo).');};$('#socExp').onclick=()=>openPlayer(true);}
}

/* ---------- REGIE-ASSISTENT (regisseur-chat) ---------- */
if(!S.chat.length)S.chat.push({a:1,t:'Hoi! Ik ben de regie-assistent van de studio. Vertel in gewone taal wat je wilt, dan pas ik het woningdossier en de scènes aan.',tool:'Dossier geladen · '+S.projects[0].shots.length+' scènes'});
const SUGG=['Maak alles in avondsfeer','Voeg een drone-shot toe','Maak de video 45 seconden','Zet om naar 9:16 voor Instagram','Begin met de tuin','Maak de stijl natuurgetrouw'];
function vRegie(){
 return '<section class="screen"><p class="kicker">Regie-assistent</p><h1>Zeg wat je wilt, <span class="grad">de studio regisseert</span></h1><p class="sub">Instructies in het Nederlands of Engels. De assistent leest het woningdossier en voert de acties uit. In deze demo werken de voorbeeldinstructies hieronder.</p>'+
 '<div class="section split"><div class="card"><div class="chat" id="chat">'+S.chat.map(m=>'<div class="msg '+(m.a?'a':'u')+'">'+esc(m.t)+(m.tool?'<span class="tool">[REGIE] '+esc(m.tool)+'</span>':'')+'</div>').join('')+'</div>'+
 '<form class="composer" id="cForm"><input id="cIn" placeholder="Geef een regie-instructie…" autocomplete="off" aria-label="Regie-instructie"><button class="btn btn-primary btn-sm" type="submit">Stuur</button></form></div>'+
 '<div><div class="card"><h3 class="sec-title" style="margin-bottom:10px">Probeer</h3><div class="chips">'+SUGG.map(s=>'<button class="chip" data-sugg type="button">'+s+'</button>').join('')+'</div></div>'+
 '<div class="card section"><h3 class="sec-title" style="margin-bottom:6px">Huidige regie</h3><pre class="json" style="white-space:pre-wrap" id="rLine">'+regieLine(P())+'</pre></div></div></div></section>';
}
function director(txt){const p=P();const l=txt.toLowerCase();let r,tool;
 if(/avond|nacht|blauw uur|evening|night/.test(l)){p.style='avond';r='Alles staat nu in avondsfeer: blauw uur met de lampen aan. Het slotbeeld is de push-in naar de verlichte voordeur.';tool='stijl → Avondsfeer';}
 else if(/drone|lucht.?opname|aerial|orbit/.test(l)){p.shots.push({n:p.shots.length+1,beat:'Ligging',cam:'orbit',img:IMG.drone,title:'Drone — rondom de woning',dur:10,status:'Gepland'});r='Drone-shot toegevoegd: een orbit van 10 seconden rond de woning, zodat kopers de kavel en de straat zien.';tool='scène #'+p.shots.length+' toegevoegd · orbit 360°';}
 else if(/(\d+)\s*(sec|s\b|seconden)/.test(l)){const s=+l.match(/(\d+)\s*(sec|s\b|seconden)/)[1];if(s<6){r='Een rondleiding moet minimaal 6 seconden zijn.';tool='geweigerd · minimaal 6 s';}else{const pl=planScenes(s);p.runtime=s;const base=p.mode==='social'?BEATS_SOCIAL:BEATS_FILM;const beats=[];for(let i=0;i<pl.n;i++)beats.push(base[i%base.length]);p.shots=mkShots(beats).map(x=>(x.dur=Math.round(pl.per),x));r='De rondleiding duurt nu '+s+' seconden: '+pl.n+' scènes van ongeveer '+pl.per+' seconden.';tool='duur → '+s+' s · '+pl.n+' scènes';}}
 else if(/9:16|instagram|tiktok|reels|verticaal|staand/.test(l)){p.aspect='9:16';r='Omgezet naar 9:16. De belangrijkste beelden worden opnieuw gekaderd voor een staand scherm.';tool='beeld → 9:16';}
 else if(/16:9|liggend|breed|website/.test(l)){p.aspect='16:9';r='Terug naar 16:9, ideaal voor je advertentie en website.';tool='beeld → 16:9';}
 else if(/tuin.*(begin|eerst|start)|begin.*tuin|start.*tuin/.test(l)){const i=p.shots.findIndex(s=>s.img===IMG.tuin);if(i>0){const [s]=p.shots.splice(i,1);p.shots.unshift(s);p.shots.forEach((x,j)=>x.n=j+1);}r='De tuin is nu het openingsbeeld. Daarna volgt de gevel.';tool='volgorde aangepast';}
 else if(/natuurgetrouw|echt|natural|realistisch/.test(l)){p.style='echt';p.lock=.95;r='Stijl op natuurgetrouw en echtheid-lock op 0,95. Precies wat er is, mooi belicht.';tool='stijl → Natuurgetrouw · lock 0,95';}
 else if(/gouden|zon|warm/.test(l)){p.style='gouden';r='Gouden uur toegepast: warm laag licht, vooral mooi in tuin en op de gevel.';tool='stijl → Gouden uur';}
 else if(/licht|helder|fris/.test(l)){p.style='licht';r='Stijl op licht & lucht: helder en ruim.';tool='stijl → Licht & lucht';}
 else {r='In deze demo begrijp ik instructies over stijl (avond, gouden uur, natuurgetrouw), duur (“maak het 45 seconden”), beeld (9:16 of 16:9), een drone-shot en de volgorde (“begin met de tuin”).';tool=null;}
 if(tool)log('Regie-instructie',tool);return {r,tool};}
function mRegie(){const chat=$('#chat');chat.scrollTop=chat.scrollHeight;
 const send=txt=>{if(!txt.trim())return;S.chat.push({a:0,t:txt});chat.insertAdjacentHTML('beforeend','<div class="msg u">'+esc(txt)+'</div><div class="msg a" id="typing"><span class="typing"><i></i><i></i><i></i></span> <span class="mono" style="font-size:11px;color:var(--muted)">dossier lezen en acties uitvoeren…</span></div>');chat.scrollTop=chat.scrollHeight;
  setTimeout(()=>{const res=director(txt);S.chat.push({a:1,t:res.r,tool:res.tool});const ty=$('#typing');ty.removeAttribute('id');ty.innerHTML=esc(res.r)+(res.tool?'<span class="tool">[REGIE] '+esc(res.tool)+'</span>':'');chat.scrollTop=chat.scrollHeight;$('#rLine').textContent=regieLine(P());},1100);};
 $('#cForm').onsubmit=e=>{e.preventDefault();const v=$('#cIn').value;$('#cIn').value='';send(v);};
 $$('[data-sugg]').forEach(b=>b.onclick=()=>send(b.textContent));}

/* ---------- MEEKIJKKAMER (klantportaal) ---------- */
function vReview(){
 const p=P(); const open=p.notes.filter(n=>!n.res).length;
 const delivs=[['Rondleiding 16:9','H.264 MP4 · voor advertentie en website',ICON.film],['Verticale social-cut 9:16','Voor Reels, TikTok en Shorts',ICON.phone],['Fotoset','Verbeterde foto’s, advertentieformaat',ICON.photo],['Plattegrond','PNG en PDF',ICON.plan],['Advertentietekst','Platte tekst',ICON.text]];
 return '<section class="screen"><p class="kicker">Meekijkkamer</p><h1>Laat meekijken <span class="grad">voordat het live gaat</span></h1><p class="sub">Deel de rondleiding met je partner of familie, verzamel opmerkingen per scène en geef akkoord. Daarna komen de bestanden vrij.</p>'+
 '<div class="section banner '+(p.approved?'ok':'warn')+'">'+(p.approved?'✓ GOEDGEKEURD — BESTANDEN VRIJGEGEVEN':open?'WIJZIGINGEN GEVRAAGD · '+open+' OPEN OPMERKING'+(open>1?'EN':''):'WACHT OP AKKOORD')+'</div>'+
 '<div class="section split"><div><div class="card" style="padding:0"><div class="player" style="border-radius:0"><div class="frame on cam cam-dolly"><img src="'+p.img+'" alt=""></div><div class="wm">'+LOGO+'HZV</div><div class="lt"><span>MEEKIJKVERSIE</span><b>'+esc(p.name)+'</b></div></div>'+
 '<div style="padding:14px"><div class="chips" id="cuts"><button class="chip on" type="button" data-cut="0">Rondleiding 16:9</button><button class="chip" type="button" data-cut="1">Social-cut 9:16</button><button class="chip" type="button" data-cut="2">Snelle webversie</button></div>'+
 '<div class="row" style="margin-top:12px"><button class="btn btn-primary" id="rvPlay" type="button">'+ICON.play.replace('<svg','<svg width="16" height="16"')+' Afspelen</button><button class="btn btn-ghost" id="rvShare" type="button">'+ICON.share.replace('<svg','<svg width="16" height="16"')+' Deel meekijklink</button></div></div></div>'+
 '<div class="section"><h3 class="sec-title" style="margin-bottom:10px">Storyboard ('+p.shots.length+')</h3><div class="hscroll">'+p.shots.map(s=>'<div style="width:130px"><img src="'+s.img+'" alt="" style="border-radius:10px;aspect-ratio:16/10;object-fit:cover"><div class="mono" style="font-size:10px;color:var(--sky);margin-top:4px">SC'+String(s.n).padStart(2,'0')+' · '+s.dur+'S</div></div>').join('')+'</div></div>'+
 '<div class="card section"><h3 class="sec-title" style="margin-bottom:10px">Opmerkingen ('+p.notes.length+')</h3><div id="notes">'+(p.notes.length?p.notes.map((n,i)=>'<div class="note'+(n.res?' res':'')+'"><div class="row" style="justify-content:space-between"><span class="mono">'+esc(n.who)+' · '+esc(n.role)+' · SCÈNE '+n.scene+' · '+esc(n.tc)+'</span><button class="btn btn-ghost btn-sm" data-res="'+i+'" type="button">'+(n.res?'Heropen':'Opgelost')+'</button></div><div>'+esc(n.text)+'</div></div>').join(''):'<p class="muted" style="margin:0">Nog geen opmerkingen.</p>')+'</div></div></div>'+
 '<div><div class="card glow"><h3 class="sec-title" style="margin-bottom:10px">Opmerking plaatsen</h3>'+
 '<div class="field"><label for="nWho">Naam meekijker</label><input class="input" id="nWho" placeholder="Bijv. Sanne"></div>'+
 '<div class="field"><label for="nRole">Rol</label><select class="input" id="nRole"><option>Mede-eigenaar</option><option>Familie</option><option>Fotograaf</option><option>Vriend(in)</option></select></div>'+
 '<div class="row"><div class="field" style="flex:1"><label for="nScene">Scène</label><select class="input" id="nScene">'+p.shots.map(s=>'<option value="'+s.n+'">'+s.n+' · '+esc(s.beat)+'</option>').join('')+'</select></div><div class="field" style="width:110px"><label for="nTc">Tijdcode</label><input class="input" id="nTc" placeholder="00:12"></div></div>'+
 '<div class="field"><label for="nText">Opmerking</label><textarea class="input" id="nText" placeholder="Bijv. maak de tuin in scène 6 iets lichter."></textarea></div>'+
 '<button class="btn btn-blue btn-block" id="nSend" type="button">Opmerking plaatsen</button></div>'+
 '<div class="card section"><h3 class="sec-title" style="margin-bottom:10px">Akkoord geven</h3>'+(p.approved?'<p style="margin:0">Akkoord gegeven door <b>'+esc(p.approvedBy)+'</b> om '+esc(p.approvedAt)+'.</p>':
 '<p class="muted" style="margin:0 0 10px;font-size:14px">De rondleiding voldoet aan wat je wilt laten zien. Na akkoord komen alle bestanden vrij.</p><div class="field"><label for="aName">Je naam</label><input class="input" id="aName" placeholder="Voor- en achternaam"></div><button class="btn btn-primary btn-block" id="approve" type="button">Digitaal akkoord geven</button>')+'</div>'+
 '<div class="card section"><h3 class="sec-title" style="margin-bottom:10px">Bestanden ('+delivs.length+')</h3>'+delivs.map(d=>'<div class="deliv'+(p.approved?'':' locked')+'"><span class="ico-box">'+(p.approved?d[2]:ICON.lock)+'</span><span style="flex:1"><b>'+d[0]+'</b><br><small class="muted">'+d[1]+'</small></span><button class="btn btn-ghost btn-sm" data-dl type="button"'+(p.approved?'':' disabled')+'>'+ICON.dl.replace('<svg','<svg width="14" height="14"')+'</button></div>').join('')+(p.approved?'':'<p class="muted" style="font-size:12.5px;margin:6px 0 0">Geef akkoord om de bestanden vrij te geven.</p>')+'</div></div></div></section>';
}
function mReview(){const p=P();
 let cut=0;$$('[data-cut]').forEach(b=>b.onclick=()=>{cut=+b.dataset.cut;$$('[data-cut]').forEach(x=>x.classList.toggle('on',x===b));});
 $('#rvPlay').onclick=()=>openPlayer(cut===1);
 $('#rvShare').onclick=()=>{const link=location.href.split('#')[0]+'#/review';(navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(()=>toast('Meekijklink gekopieerd (preview-link).'),()=>toast('Kopiëren niet beschikbaar.'));log('Meekijklink gedeeld','Preview-link');};
 $$('[data-res]').forEach(b=>b.onclick=()=>{const n=p.notes[+b.dataset.res];n.res=!n.res;route();});
 $('#nSend').onclick=()=>{const text=$('#nText').value.trim();if(!text){toast('Schrijf eerst een opmerking.');return;}p.notes.unshift({who:$('#nWho').value.trim()||'Meekijker',role:$('#nRole').value,scene:+$('#nScene').value,tc:$('#nTc').value.trim()||'—',text,res:false});p.approved=false;log('Opmerking','Scène '+$('#nScene').value);toast('Opmerking geplaatst.');route();};
 const ap=$('#approve');if(ap)ap.onclick=()=>{const n=$('#aName').value.trim();if(!n){toast('Vul je naam in om akkoord te geven.');return;}p.approved=true;p.approvedBy=n;p.approvedAt=hhmm(now());p.step=5;log('Akkoord gegeven',n);toast('Akkoord! Bestanden zijn vrijgegeven (demo).');route();};
 $$('[data-dl]').forEach(b=>b.onclick=()=>toast('Demo: downloads zijn uitgeschakeld in de preview.'));}

/* ---------- LOGBOEK & PAKKETTEN ---------- */
function vLog(){
 return '<section class="screen"><p class="kicker">Logboek & pakketten</p><h1>Wat de studio <span class="grad">voor je deed</span></h1><p class="sub">Een doorlopend logboek van alle acties in deze sessie. Niets wordt verwijderd, zodat je altijd terugziet wat er gemaakt is.</p>'+
 '<div class="section grid g2"><div class="card"><span class="card-tag">GRATIS</span><h2>Gratis</h2><p class="muted" style="font-size:14.5px">Woning plaatsen op huiszelfverkoop.nl met de basisfuncties van de studio.</p></div>'+
 '<div class="card glow"><span class="card-tag" style="color:var(--gold);border-color:rgba(247,161,0,.5)">PREMIUM</span><h2>Premium</h2><p class="muted" style="font-size:14.5px">Inclusief de volledige HZV AI Studio: foto- en videostudio, rondleidingvideo en meer. Actuele voorwaarden staan op <a href="https://www.huiszelfverkoop.nl/pakketten" target="_blank" rel="noopener">huiszelfverkoop.nl/pakketten</a>.</p></div></div>'+
 '<div class="section card"><div class="sec-head"><h3 class="sec-title">Logboek · '+S.ledger.length+' regels</h3><span class="mono muted" style="font-size:11px">ALLEEN TOEVOEGEN</span></div>'+
 S.ledger.map(e=>'<div class="ledger-row"><span class="mono">'+e.t+'</span><span><b>'+esc(e.action)+'</b><br><small class="muted">'+esc(e.detail)+'</small></span><span class="mono" style="font-size:11px;color:var(--sky)">'+(e.units?e.units+' ×':'—')+'</span></div>').join('')+
 '<p class="muted" style="font-size:12.5px;margin:10px 0 0">De kolom rechts telt hoeveel studio-acties een stap kostte (demo). Het logboek leeft alleen in deze browsersessie.</p></div></section>';
}
/* ---------- INZICHTEN (flywheel) ---------- */
const INS=[
 [1,'Fotografeer bij daglicht met alle lampen aan','Een gelijkmatig belichte foto geeft de beste basis voor zowel de daglicht- als de avondversie.'],
 [1,'Begin met de gevel of de straat','Kopers willen eerst weten waar ze zijn. Een kraanshot of drone-opening geeft dat overzicht.'],
 [1,'Eén camerabeweging per scène','Dolly óf pan, niet allebei. Rustige beelden voelen professioneler.'],
 [0,'Te veel virtuele styling','Als elke kamer virtueel is ingericht, gaan kopers twijfelen. Gebruik het voor lege kamers en label het altijd.'],
 [0,'Groothoek te breed','Extreme groothoek laat kamers groter lijken dan ze zijn en leidt tot teleurstelling bij de bezichtiging.'],
 [0,'Rommel en persoonlijke spullen','Foto’s van familie, post en naambordjes horen niet in beeld. Wis ze of ruim ze op vóór de opname.'],
 [1,'Verticale clip van 15 tot 30 seconden','Kort en krachtig werkt het best op Reels en TikTok, met de oproep in beeld aan het eind.'],
 [0,'Muziek met tekst','Gezongen muziek leidt af van de woning. Kies rustige, rechtenvrije instrumentale muziek.']
];
function vIns(){
 return '<section class="screen"><p class="kicker">Inzichten</p><h1>Wat werkt <span class="grad">bij woningbeelden</span></h1><p class="sub">Positieve en negatieve patronen waar de studio rekening mee houdt bij het maken van je beelden.</p>'+
 '<div class="section chips" id="insF"><button class="chip on" data-if="all" type="button">Alles ('+INS.length+')</button><button class="chip" data-if="1" type="button">Positief</button><button class="chip" data-if="0" type="button">Vermijden</button></div>'+
 '<div class="section grid g2" id="insG">'+INS.map(i=>'<div class="card insight'+(i[0]?'':' neg')+'" data-pos="'+i[0]+'"><span class="status '+(i[0]?'st-ok':'st-err')+'">'+(i[0]?'POSITIEF PATROON':'NEGATIEF PATROON')+'</span><h3 style="margin-top:10px">'+esc(i[1])+'</h3><p class="muted" style="margin:6px 0 0;font-size:14.5px">'+esc(i[2])+'</p></div>').join('')+'</div></section>';
}
function mIns(){$$('[data-if]').forEach(b=>b.onclick=()=>{$$('[data-if]').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.if;$$('#insG .insight').forEach(c=>c.style.display=(f==='all'||c.dataset.pos===f)?'':'none');});}

/* ---------- NIEUWE WONING (8-stappen productie) ---------- */
const WSTAGES=['Woning','Type productie','Dossier','Opbouw','Genereren','Goedkeuren','Montage','Klaar'];
let W=null;
function newW(){W={stage:0,name:'',plaats:'',type:'Vrijstaande woning',mode:'film',runtime:60,shots:[],approved:{},busy:false};}
function vWizard(){
 if(!W)newW(); const s=W.stage; let body='';
 if(s===0) body='<div class="field"><label for="wN">Naam van het project</label><input class="input" id="wN" value="'+esc(W.name)+'" placeholder="Bijv. Ons huis aan de dijk"></div><div class="field"><label for="wP">Plaats</label><input class="input" id="wP" value="'+esc(W.plaats)+'" placeholder="Bijv. Voorthuizen"></div><div class="field"><label for="wT">Soort woning</label><select class="input" id="wT">'+['Vrijstaande woning','Twee-onder-een-kapwoning','Tussenwoning','Hoekwoning','Appartement','Woonboerderij','Bungalow'].map(x=>'<option'+(x===W.type?' selected':'')+'>'+x+'</option>').join('')+'</select></div><div class="card" style="background:rgba(0,0,0,.25)"><span class="lbl">Foto’s</span><div class="row" style="margin-top:8px">'+Object.values(IMG).slice(0,6).map(i=>'<img src="'+i+'" alt="" style="width:64px;height:44px;object-fit:cover;border-radius:8px">').join('')+'</div><p class="muted" style="font-size:12.5px;margin:8px 0 0">Demo: de voorbeeldfoto’s worden gebruikt. In de echte studio upload je hier je eigen foto’s.</p></div>';
 if(s===1) body=[['film','🎬','Rondleiding','Een complete videorondleiding van gevel tot tuin, met camerabewegingen per ruimte.'],['social','📱','Social-campagne','Korte verticale clips met blikvanger, kenmerken en een oproep om te komen kijken.'],['alles','✨','Alles-in-één','Rondleiding, social-clips, fotoset, plattegrond en advertentietekst in één keer.']].map(o=>'<button class="opt'+(W.mode===o[0]?' on':'')+'" data-wm="'+o[0]+'" type="button"><span class="em">'+o[1]+'</span><span><b>'+o[2]+'</b><small>'+o[3]+'</small></span></button>').join('')+'<div class="field" style="margin-top:6px"><label for="wD">Doelduur: <output id="wDo">'+W.runtime+'</output> s</label><input type="range" id="wD" min="15" max="120" step="5" value="'+W.runtime+'"></div>';
 if(s===2){const pl=planScenes(W.runtime);body='<div class="card" style="background:rgba(0,0,0,.25)"><dl class="kv"><dt>Project</dt><dd>'+esc(W.name||'Nieuwe woning')+'</dd><dt>Plaats</dt><dd>'+esc(W.plaats||'—')+'</dd><dt>Type</dt><dd>'+esc(W.type)+'</dd><dt>Productie</dt><dd>'+(W.mode==='film'?'Rondleiding':W.mode==='social'?'Social-campagne':'Alles-in-één')+'</dd><dt>Duur</dt><dd>'+W.runtime+' s · '+pl.n+' scènes × '+pl.per+' s</dd><dt>Echtheid</dt><dd>0,95 — Strikt echt</dd><dt>Stijl</dt><dd>Licht & lucht</dd></dl></div><div id="wCheck" style="margin-top:12px"></div>';}
 if(s===3) body='<p class="muted" style="margin-top:0;font-size:14px">Volgorde van de scènes. Elke scène krijgt een camerabeweging uit Technieken.</p>'+W.shots.map(x=>'<div class="beat"><span class="t">SC'+String(x.n).padStart(2,'0')+' · '+x.dur+'s</span><img src="'+x.img+'" alt=""><span style="flex:1"><b>'+esc(x.beat)+'</b><br><small class="muted">'+esc(camById(x.cam).name)+'</small></span></div>').join('');
 if(s===4) body='<p class="muted" style="margin-top:0;font-size:14px">De scènes worden parallel gegenereerd in 8 sloten (demo).</p><div class="slots" id="wSlots">'+'<span></span>'.repeat(8)+'</div><div class="progress" style="margin-top:12px"><i id="wBar"></i></div><p class="mono" id="wMsg" style="font-size:11px;color:var(--sky);margin-top:8px">KLAAR OM TE STARTEN</p>';
 if(s===5) body='<p class="muted" style="margin-top:0;font-size:14px">Keur elke scène goed of laat hem opnieuw maken.</p><div class="appr">'+W.shots.map((x,i)=>'<div class="card"><div class="cam '+camById(x.cam).cls+'" style="aspect-ratio:16/10"><img src="'+x.img+'" alt=""></div><div class="row"><span class="mono" style="font-size:10px">SC'+String(x.n).padStart(2,'0')+'</span><span class="spacer"></span><button class="btn btn-sm '+(W.approved[i]?'btn-primary':'btn-ghost')+'" data-wa="'+i+'" type="button">'+(W.approved[i]?'✓':'Akkoord')+'</button><button class="btn btn-ghost btn-sm" data-wr="'+i+'" type="button" aria-label="Opnieuw">↻</button></div></div>').join('')+'</div><button class="btn btn-ghost btn-sm" id="wAll" type="button" style="margin-top:10px">Alles goedkeuren</button>';
 if(s===6) body='<p class="muted" style="margin-top:0;font-size:14px">Scènes worden aan elkaar gezet met doorloop-bruggen, titels en rechtenvrije muziek.</p><div class="player" id="wPl">'+W.shots.map((x,i)=>'<div class="frame cam '+camById(x.cam).cls+(i===0?' on':'')+'"><img src="'+x.img+'" alt=""></div>').join('')+'<div class="wm">'+LOGO+'HZV</div></div><div class="progress" style="margin-top:12px"><i id="wSt"></i></div><p class="mono" id="wStM" style="font-size:11px;color:var(--sky);margin-top:8px">MONTAGE STARTEN…</p>';
 if(s===7) body='<div style="text-align:center;padding:10px 0"><div style="font-size:52px">🏡</div><h2>'+esc(W.name||'Nieuwe woning')+' is klaar</h2><p class="sub">'+W.shots.length+' scènes · '+W.runtime+' s · toegevoegd aan je woningen.</p></div><div class="grid g2"><a class="btn btn-primary" href="#/studio">Naar Studio</a><a class="btn btn-ghost" href="#/review">Naar meekijkkamer</a></div>';
 const canNext=!(s===4&&!W.genDone)&&!(s===6&&!W.stitchDone)&&!(s===5&&Object.keys(W.approved).length<W.shots.length);
 return '<section class="screen"><div class="wiz-top"><a class="btn btn-ghost btn-sm" href="#/studio">✕ Sluiten</a><span class="wiz-stage">STAP '+String(s+1).padStart(2,'0')+' / 08 — '+WSTAGES[s].toUpperCase()+'</span></div><div class="wiz-bar">'+WSTAGES.map((_,i)=>'<i class="'+(i<=s?'on':'')+'"></i>').join('')+'</div>'+
 '<div class="card glow"><p class="kicker">Nieuwe woning</p><h2 style="margin-bottom:14px">'+['Over je woning','Wat wil je maken?','Woningdossier','Opbouw van de scènes','Scènes genereren','Scènes goedkeuren','Montage','Klaar!'][s]+'</h2>'+body+'</div>'+
 (s<7?'<div class="row section"><button class="btn btn-ghost" id="wBack" type="button"'+(s===0?' disabled':'')+'>Terug</button><span class="spacer"></span>'+(s===4&&!W.genDone?'<button class="btn btn-blue" id="wGen" type="button">Start genereren</button>':'')+'<button class="btn btn-primary" id="wNext" type="button"'+(canNext?'':' disabled')+'>'+(s===6?'Afronden':'Volgende')+'</button></div>':'')+'</section>';
}
function mWizard(){const s=W.stage;
 const save=()=>{if(s===0){W.name=$('#wN').value.trim();W.plaats=$('#wP').value.trim();W.type=$('#wT').value;}};
 if(s===1){$$('[data-wm]').forEach(b=>b.onclick=()=>{W.mode=b.dataset.wm;$$('[data-wm]').forEach(x=>x.classList.toggle('on',x===b));});const d=$('#wD');d.oninput=()=>{W.runtime=+d.value;$('#wDo').textContent=d.value;};}
 if(s===2){const c=$('#wCheck');c.innerHTML='<p class="mono" style="font-size:11px;color:var(--sky)">DOSSIERCHECK LOOPT…</p>';setTimeout(()=>{const items=[['Projectnaam',!!W.name],['Plaats',!!W.plaats],['Foto’s gekoppeld',true],['Scènevenster 6–15 s',planScenes(W.runtime).ok]];c.innerHTML=items.map(i=>'<div class="check"><span class="ico '+(i[1]?'ok':'no')+'">'+(i[1]?'✓':'!')+'</span><span>'+i[0]+(i[1]?'':' <b style="color:var(--warn)">— ontbreekt (mag, maar vul het later aan)</b>')+'</span></div>').join('');},700);}
 if(s===4){const g=$('#wGen');if(g)g.onclick=()=>{g.disabled=true;const slots=$$('#wSlots span');let k=0;sim(3000,v=>{$('#wBar').style.width=v+'%';const d=Math.floor(v/100*W.shots.length);slots.forEach((sl,i)=>{sl.className=i<Math.min(8,d)?'done':i<Math.min(8,d+3)?'busy':'';});$('#wMsg').textContent=v<100?'SCÈNE '+Math.min(W.shots.length,d+1)+' / '+W.shots.length+' · BEZIG IN DE ENGINE (DEMO)':'ALLE SCÈNES KLAAR';},()=>{slots.forEach(sl=>sl.className='done');W.genDone=true;log('Nieuwe woning',W.shots.length+' scènes gegenereerd',W.shots.length);route();});};}
 if(s===5){$$('[data-wa]').forEach(b=>b.onclick=()=>{W.approved[+b.dataset.wa]=true;route();});$$('[data-wr]').forEach(b=>b.onclick=()=>{delete W.approved[+b.dataset.wr];toast('Scène '+(+b.dataset.wr+1)+' wordt opnieuw gemaakt (demo).');route();});$('#wAll').onclick=()=>{W.shots.forEach((_,i)=>W.approved[i]=true);route();};}
 if(s===6&&!W.stitchDone){const fr=$$('#wPl .frame');let i=0;sim(3200,v=>{$('#wSt').style.width=v+'%';const n=Math.min(fr.length-1,Math.floor(v/100*fr.length));if(n!==i){fr[i].classList.remove('on');fr[n].classList.add('on');i=n;}$('#wStM').textContent=v<100?'SCÈNE '+(n+1)+' AANSLUITEN · DOORLOOP-BRUG':'MONTAGE KLAAR · −14 LUFS';},()=>{W.stitchDone=true;const b=$('#wNext');if(b)b.disabled=false;});}
 const back=$('#wBack');if(back)back.onclick=()=>{save();W.stage=Math.max(0,s-1);route();};
 const next=$('#wNext');if(next)next.onclick=()=>{save();
  if(s===1){const pl=planScenes(W.runtime);const base=W.mode==='social'?BEATS_SOCIAL:BEATS_FILM;const beats=[];for(let i=0;i<pl.n;i++)beats.push(base[i%base.length]);W.shots=mkShots(beats).map(x=>(x.dur=Math.round(pl.per),x));W.genDone=false;W.approved={};W.stitchDone=false;}
  if(s===6){const p={id:'p'+(S.projects.length+1),name:W.name||'Nieuwe woning',type:W.type,plaats:W.plaats||'—',mode:W.mode,img:IMG.gevel,step:5,runtime:W.runtime,style:'licht',lock:.95,fps:W.mode==='social'?30:24,aspect:W.mode==='social'?'9:16':'16:9',seed:true,route:'auto',shots:W.shots.map(x=>(x.status='Klaar',x)),approved:false,notes:[]};S.projects.push(p);S.cur=S.projects.length-1;log('Woning toegevoegd',p.name);}
  W.stage=Math.min(7,s+1);route();};
}

/* ---------- Router ---------- */
const VIEWS={studio:[vStudio,mStudio],dossier:[vDossier,mDossier],technieken:[vTech,mTech],creeer:[vCreate,mCreate],regie:[vRegie,mRegie],review:[vReview,mReview],logboek:[vLog,()=>{}],inzichten:[vIns,mIns],nieuw:[vWizard,mWizard]};
let lastRoute='';
function route(){
 let r=(location.hash.replace(/^#\/?/,'')||'studio').split('?')[0];
 if(!VIEWS[r])r='studio';
 if(r==='nieuw'&&lastRoute!=='nieuw'&&(!W||W.stage===7))newW();
 const v=$('#view'); v.innerHTML=VIEWS[r][0](); VIEWS[r][1]();
 renderNav(r==='nieuw'?'studio':r);
 document.body.classList.toggle('hide-fab',r!=='studio');
 if(r!==lastRoute){window.scrollTo({top:0,behavior:'instant'in window?'instant':'auto'});}
 lastRoute=r;
 const titles={studio:'Studio',dossier:'Woningdossier',technieken:'Technieken',creeer:'Creëer',regie:'Regie-assistent',review:'Meekijkkamer',logboek:'Logboek',inzichten:'Inzichten',nieuw:'Nieuwe woning'};
 document.title=titles[r]+' · HZV AI Studio — ontwerpvoorstel';
}
window.addEventListener('hashchange',route);
$('#projChip').onclick=openProjects;
$('#keyBtn').onclick=openKey;
$('#fab').onclick=()=>{newW();location.hash='#/nieuw';};
route();

/* ---------- Nebula-achtergrond met sterren ---------- */
(function nebula(){
 const c=$('#nebula'),x=c.getContext('2d');let w,h,stars=[],t=0;const dpr=Math.min(2,window.devicePixelRatio||1);
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function size(){w=c.width=innerWidth*dpr;h=c.height=innerHeight*dpr;stars=Array.from({length:Math.round(innerWidth*innerHeight/9000)},()=>({x:Math.random()*w,y:Math.random()*h,r:(Math.random()*1.2+0.2)*dpr,p:Math.random()*6.28,s:0.4+Math.random()}));}
 function blob(cx,cy,r,col){const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);}
 function frame(){t+=0.004;x.fillStyle='#030d0a';x.fillRect(0,0,w,h);x.globalCompositeOperation='lighter';
  blob(w*(0.2+0.06*Math.sin(t)),h*(0.18+0.05*Math.cos(t*1.3)),Math.max(w,h)*0.5,'rgba(0,227,138,0.10)');
  blob(w*(0.85+0.05*Math.cos(t*0.8)),h*(0.35+0.06*Math.sin(t)),Math.max(w,h)*0.45,'rgba(26,77,255,0.13)');
  blob(w*(0.5+0.08*Math.sin(t*0.6)),h*(0.95),Math.max(w,h)*0.5,'rgba(62,224,255,0.07)');
  x.globalCompositeOperation='source-over';
  for(const s of stars){const a=0.35+0.45*Math.sin(s.p+t*6*s.s);x.fillStyle='rgba(220,255,240,'+a.toFixed(3)+')';x.beginPath();x.arc(s.x,s.y,s.r,0,6.283);x.fill();}
  if(!reduce)requestAnimationFrame(frame);}
 size();addEventListener('resize',size);frame();
})();
})();
