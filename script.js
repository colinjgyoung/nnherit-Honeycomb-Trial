// Game logic. Deck data (DIMS, CHALLENGES, CARDS, CHANCE) lives in cards.js.

const ROWS=[2,3,3,3,2];
const CORE=6;
const SLOTS=ROWS.reduce((a,b)=>a+b,0)-1; // 12 placeable hexes
const DKEYS=Object.keys(DIMS);
const DSHORT={prof:'Prof',cont:'Cont',ext:'Ext',gov:'Gov',harm:'Harm',fam:'Fam',comm:'Comm',read:'Read'};
const METERS=[
  {label:'Business health',dims:['prof','cont','ext','gov']},
  {label:'Family health',dims:['harm','fam','comm','read']}
];
const VMIN=-24, VMAX=24;   // master meter range
const DMIN=-12, DMAX=12;   // per-dimension mini-bar range

let placed={}, selected=null, filterCat='ALL', chanceLog=[], target=0;
let chanceMod=Object.fromEntries(DKEYS.map(k=>[k,0]));

function cardById(id){return CARDS.find(x=>x.id===id);}
function totals(){
  const t=Object.fromEntries(DKEYS.map(k=>[k,0]));
  Object.values(placed).forEach(id=>{const c=cardById(id);DKEYS.forEach(k=>t[k]+=(c.im[k]||0));});
  DKEYS.forEach(k=>t[k]+=chanceMod[k]);
  return t;
}
function meterVal(m,t){return m.dims.reduce((a,k)=>a+t[k],0);}
function placedCount(){return Object.keys(placed).length;}
function fmt(v){return (v>0?'+':'')+v;}
function diffDots(d){return '●'.repeat(d)+'○'.repeat(4-d);}
function imText(c){return DKEYS.filter(k=>c.im[k]).map(k=>fmt(c.im[k])+' '+DSHORT[k]).join(', ');}

// --- radial gauge (adapted from dial-preview.html; range unified to −24..+24) ---
function pt(cx,cy,R,deg){const a=deg*Math.PI/180;return [cx+R*Math.cos(a),cy-R*Math.sin(a)];}
function ang(v){return 180-((v-VMIN)/(VMAX-VMIN))*180;}
function arc(cx,cy,R,a1,a2){const p1=pt(cx,cy,R,a1),p2=pt(cx,cy,R,a2);return `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A ${R} ${R} 0 0 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}
function colorFor(v){return v>=target?'#46a24a':(v>=target-6?'#e08a2b':'#e0492f');}
function gauge(v,label){
  const cx=90,cy=96,R=66,sw=15;
  const bAmb=Math.max(VMIN,Math.min(VMAX,target-6)), bGrn=Math.max(VMIN,Math.min(VMAX,target));
  const aR=ang(bAmb), aA=ang(bGrn);
  const tk1=pt(cx,cy,R-11,aA), tk2=pt(cx,cy,R+11,aA);
  const nd=pt(cx,cy,R-14,ang(Math.max(VMIN,Math.min(VMAX,v))));
  const col=colorFor(v);
  let bands='';
  if(180>aR+0.5)bands+=`<path d="${arc(cx,cy,R,180,aR)}" fill="none" stroke="#e0492f" stroke-width="${sw}"/>`;
  if(aR>aA+0.5)bands+=`<path d="${arc(cx,cy,R,aR,aA)}" fill="none" stroke="#e08a2b" stroke-width="${sw}"/>`;
  if(aA>0.5)bands+=`<path d="${arc(cx,cy,R,aA,0)}" fill="none" stroke="#46a24a" stroke-width="${sw}"/>`;
  return `<svg viewBox="0 0 180 124" width="100%" style="max-width:240px" role="img" aria-label="${label}: ${fmt(v)}">
    ${bands}
    <line x1="${tk1[0].toFixed(1)}" y1="${tk1[1].toFixed(1)}" x2="${tk2[0].toFixed(1)}" y2="${tk2[1].toFixed(1)}" stroke="#1a1a1a" stroke-width="3"/>
    <line x1="${cx}" y1="${cy}" x2="${nd[0].toFixed(1)}" y2="${nd[1].toFixed(1)}" stroke="#1a1a1a" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="8" fill="#1a1a1a"/>
    <circle cx="${cx}" cy="${cy}" r="3.4" fill="#F3D600"/>
    <text x="${cx}" y="58" text-anchor="middle" font-family="Source Sans Pro,Segoe UI,sans-serif" font-size="22" font-weight="700" fill="${col}">${fmt(v)}</text>
  </svg>`;
}
function dimRow(k,v){
  const half=Math.max(0,Math.min(50,Math.abs(v)/(DMAX)*50));
  const side=v<0?`right:50%;width:${half}%`:`left:50%;width:${half}%`;
  const col=v>0?'#46a24a':(v<0?'#e0492f':'#cfccbf');
  return `<div class="dimrow"><span class="dl">${DIMS[k]}</span><span class="dtrack"><span class="dzero"></span><span class="dbar" style="${side};background:${col}"></span></span><span class="dv" style="color:${col}">${fmt(v)}</span></div>`;
}

function render(){
  const board=document.getElementById('board');board.innerHTML='';
  let idx=0;
  ROWS.forEach(len=>{
    const row=document.createElement('div');row.className='hrow';
    for(let i=0;i<len;i++){
      const slot=idx;const hex=document.createElement('div');
      if(slot===CORE){hex.className='hex core';hex.innerHTML='<div class="nm">Legacy<br>Core</div>';}
      else if(placed[slot]){
        const c=cardById(placed[slot]);const ch=CHALLENGES[c.cat];
        hex.className='hex filled';hex.title=c.n+' ('+ch.name+', difficulty '+c.d+') — '+imText(c);
        hex.style.background=ch.tint;
        hex.innerHTML='<div class="ddot" style="background:'+ch.col+'"></div><div class="nm">'+c.n+'</div><div class="df">'+diffDots(c.d)+'</div>';
        hex.onclick=()=>{delete placed[slot];selected=null;render();};
      } else {
        hex.className='hex empty'+(selected?' target':'');
        hex.innerHTML='<div class="plus">+</div>';
        hex.onclick=()=>{if(selected){placed[slot]=selected;selected=null;render();}};
      }
      row.appendChild(hex);idx++;
    }
    board.appendChild(row);
  });

  const placedIds=Object.values(placed);

  // challenge filter chips
  const chips=document.getElementById('chips');chips.innerHTML='';
  const mkChip=(key,label,col)=>{
    const b=document.createElement('button');b.className='chip'+(filterCat===key?' on':'');
    b.innerHTML=(col?'<span class="cdot" style="background:'+col+'"></span>':'')+label;
    b.onclick=()=>{filterCat=key;render();};chips.appendChild(b);
  };
  mkChip('ALL','All');
  Object.entries(CHALLENGES).forEach(([k,ch])=>mkChip(k,ch.name,ch.col));

  const tray=document.getElementById('tray');tray.innerHTML='';
  CARDS.filter(c=>!placedIds.includes(c.id)&&(filterCat==='ALL'||c.cat===filterCat)).forEach(c=>{
    const ch=CHALLENGES[c.cat];
    const el=document.createElement('div');el.className='tcard'+(selected===c.id?' sel':'');
    el.innerHTML='<div class="swatch" style="background:'+ch.col+'"></div><div class="tbody"><div class="nm">'+c.n+'</div><div class="ch">'+ch.name+' · <span class="ddots">'+diffDots(c.d)+'</span> difficulty '+c.d+'</div><div class="im">'+imText(c)+'</div></div><button class="info" title="Card details" aria-label="Card details for '+c.n+'">i</button>';
    el.onclick=()=>{selected=(selected===c.id?null:c.id);render();};
    el.querySelector('.info').onclick=(e)=>{e.stopPropagation();openCard(c.id);};
    tray.appendChild(el);
  });

  const t=totals();const meters=document.getElementById('dials');meters.innerHTML='';
  METERS.forEach(m=>{
    const v=meterVal(m,t);
    const d=document.createElement('div');d.className='meter';
    d.innerHTML='<div class="gwrap">'+gauge(v,m.label)+'</div><div class="cap">'+m.label+'</div>'+m.dims.map(k=>dimRow(k,t[k])).join('');
    meters.appendChild(d);
  });
  document.getElementById('tgtVal').textContent=fmt(target);

  document.getElementById('progress').textContent=placedCount()+' / '+SLOTS+' hexes placed'+(selected?' — now click an empty hex':'');
  document.getElementById('roadmapBtn').disabled=placedCount()<SLOTS;
}

// --- card detail (the card back) ---
function openCard(id){
  const c=cardById(id);const ch=CHALLENGES[c.cat];
  const m=document.getElementById('cardModal');
  m.querySelector('.cm-head').style.background=ch.col;
  m.querySelector('.cm-cat').textContent=ch.name;
  m.querySelector('.cm-name').textContent=c.n;
  m.querySelector('.cm-desc').textContent=c.desc;
  m.querySelector('.cm-diff').innerHTML='Difficulty <b>'+c.d+'</b> / 4 <span class="cm-slider">'+[1,2,3,4].map(i=>'<span class="seg'+(i<=c.d?' fill':'')+'"></span>').join('')+'</span>';
  m.querySelector('.cm-im').innerHTML=DKEYS.filter(k=>c.im[k]).map(k=>'<li><b>'+fmt(c.im[k])+'</b> '+DIMS[k]+'</li>').join('');
  m.classList.remove('hidden');
}
document.getElementById('cardModal').onclick=(e)=>{if(e.target.id==='cardModal'||e.target.classList.contains('cm-close'))document.getElementById('cardModal').classList.add('hidden');};

function flash(msg){const b=document.getElementById('banner');b.classList.remove('hidden');b.innerHTML=msg;}

document.getElementById('chanceBtn').onclick=()=>{
  const c=CHANCE[Math.floor(Math.random()*CHANCE.length)];
  DKEYS.forEach(k=>chanceMod[k]+=(c.im[k]||0));chanceLog.push(c.n);
  flash('<b>Chance card:</b> '+c.n+' ('+c.t+'). The family adapts the plan.');
  render();
};
document.getElementById('resetBtn').onclick=()=>{placed={};selected=null;chanceMod=Object.fromEntries(DKEYS.map(k=>[k,0]));chanceLog=[];filterCat='ALL';document.getElementById('banner').classList.add('hidden');document.getElementById('roadmap').classList.add('hidden');render();};
document.getElementById('tgtMinus').onclick=()=>{target=Math.max(-12,target-1);render();};
document.getElementById('tgtPlus').onclick=()=>{target=Math.min(8,target+1);render();};

document.getElementById('roadmapBtn').onclick=()=>{
  const t=totals();
  const order=Object.keys(placed).map(Number).sort((a,b)=>a-b);
  const items=order.map(s=>{const c=cardById(placed[s]);const ch=CHALLENGES[c.cat];return '<li><span class="cdot" style="background:'+ch.col+'"></span><b>'+c.n+'</b> — '+ch.name+'</li>';}).join('');
  const v=METERS.map(m=>{const val=meterVal(m,t);const col=colorFor(val);const word=val>=target?'on track':(val>=target-6?'watch':'under pressure');return '<div class="vbox"><span style="color:'+col+'">'+word+'</span><b>'+fmt(val)+'</b>'+m.label+'</div>';}).join('');
  const low=DKEYS.filter(k=>t[k]<0).sort((a,b)=>t[a]-t[b]).slice(0,3);
  const prio=low.length?'<p style="margin-top:10px;font-size:.9rem;"><b>Priority areas for the transition plan:</b> '+low.map(k=>DIMS[k]+' ('+fmt(t[k])+')').join(', ')+'.</p>':'<p style="margin-top:10px;font-size:.9rem;"><b>No dimension ended below zero</b> — a strong board.</p>';
  const rm=document.getElementById('roadmap');rm.classList.remove('hidden');
  rm.innerHTML='<h3>Transition roadmap</h3><p style="font-size:.88rem;color:var(--text-secondary);margin:0 0 8px;">The scenarios the family worked through, in board order:</p><ol class="rm-list">'+items+'</ol>'
    +(chanceLog.length?'<p style="font-size:.82rem;color:var(--text-muted);">Chance events weathered: '+chanceLog.join(', ')+'</p>':'')
    +'<h3 style="margin-top:10px;">Where the family lands</h3><div class="verdict">'+v+'</div>'+prio
    +'<p style="margin-top:12px;font-size:.85rem;color:var(--text-secondary);">The point of the meters is the conversation, not the score — each low dimension is a prompt for "what would protect this?", and the answers become the roadmap.</p>';
  rm.scrollIntoView({behavior:'smooth',block:'nearest'});
};
render();
