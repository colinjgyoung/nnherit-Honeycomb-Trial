const CARDS=[
 {id:'VS01',n:'Clashing Visions',c:'Vision & Strategy',d:1,p:-2,h:-3,co:-1,r:0,x:''},
 {id:'VS07',n:'Generational Clash',c:'Vision & Strategy',d:2,p:-1,h:-2,co:0,r:0,x:'−1 Family'},
 {id:'VS10',n:'Public Spat',c:'Vision & Strategy',d:3,p:-3,h:-2,co:0,r:0,x:'−3 External'},
 {id:'VS04',n:'Finding Common Ground',c:'Vision & Strategy',d:4,p:1,h:2,co:1,r:0,x:''},
 {id:'VS09',n:'Phased Transition',c:'Vision & Strategy',d:4,p:1,h:1,co:0,r:1,x:''},
 {id:'FR01',n:'Emotional Tug-of-War',c:'Founder Reluctance',d:2,p:-2,h:-3,co:0,r:0,x:'−1 Family'},
 {id:'FR07',n:'Lingering Presence',c:'Founder Reluctance',d:2,p:-1,h:-2,co:-1,r:0,x:''},
 {id:'FR03',n:'Facing Mortality',c:'Founder Reluctance',d:3,p:-1,h:0,co:1,r:0,x:'−2 Family'},
 {id:'FR11',n:'Graceful Handover',c:'Founder Reluctance',d:4,p:1,h:2,co:1,r:1,x:''},
 {id:'SP07',n:'Internal Resistance',c:'Ill-Prepared Successors',d:1,p:-2,h:-3,co:0,r:-2,x:''},
 {id:'SP10',n:'Structured Onboarding',c:'Ill-Prepared Successors',d:4,p:1,h:0,co:1,r:2,x:''},
 {id:'CT01',n:'Silent Resentment',c:'Communication & Trust',d:1,p:0,h:-3,co:0,r:-1,x:'−2 Communication'},
 {id:'CT04',n:'Open Conversations',c:'Communication & Trust',d:4,p:0,h:3,co:0,r:1,x:'+2 Communication'},
 {id:'RR05',n:'Overlapping Roles',c:'Unclear Roles',d:2,p:-1,h:-1,co:-1,r:0,x:''},
 {id:'RR09',n:'Clear Mandate',c:'Unclear Roles',d:4,p:0,h:1,co:2,r:1,x:''}
];
const CHANCE=[
 {n:'Market shock',t:'−2 Profitability',p:-2,h:0,co:0,r:0},
 {n:'Health event',t:'−2 Continuity',p:0,h:0,co:-2,r:0},
 {n:'Rival bid',t:'−1 Profitability, −1 Readiness',p:-1,h:0,co:0,r:-1},
 {n:'Key person leaves',t:'−2 Readiness',p:0,h:0,co:0,r:-2},
 {n:'Family rift',t:'−2 Harmony',p:0,h:-2,co:0,r:0},
 {n:'Unexpected windfall',t:'+2 Profitability',p:2,h:0,co:0,r:0},
 {n:'Mentor steps in',t:'+1 Readiness, +1 Harmony',p:0,h:1,co:0,r:1}
];
const DCOL={1:'var(--d1)',2:'var(--d2)',3:'var(--d3)',4:'var(--d4)'};
const ROWS=[2,3,3,3,2];
const CORE=6;
const DIALS=[['p','Profitability'],['h','Harmony'],['co','Continuity'],['r','Readiness']];
const THRESH=2;

let placed={}, selected=null, chanceMod={p:0,h:0,co:0,r:0}, chanceLog=[];

function totals(){
  let t={p:0,h:0,co:0,r:0};
  Object.values(placed).forEach(id=>{const c=CARDS.find(x=>x.id===id);['p','h','co','r'].forEach(k=>t[k]+=c[k]);});
  ['p','h','co','r'].forEach(k=>t[k]+=chanceMod[k]);
  return t;
}
function placedCount(){return Object.keys(placed).length;}
function imText(c){let a=[];if(c.p)a.push((c.p>0?'+':'')+c.p+' Prof');if(c.h)a.push((c.h>0?'+':'')+c.h+' Harm');if(c.co)a.push((c.co>0?'+':'')+c.co+' Cont');if(c.r)a.push((c.r>0?'+':'')+c.r+' Read');if(c.x)a.push(c.x);return a.join(', ');}

function render(){
  const board=document.getElementById('board');board.innerHTML='';
  let idx=0;
  ROWS.forEach(len=>{
    const row=document.createElement('div');row.className='hrow';
    for(let i=0;i<len;i++){
      const slot=idx;const hex=document.createElement('div');
      if(slot===CORE){hex.className='hex core';hex.innerHTML='<div class="nm">Legacy<br>Core</div>';}
      else if(placed[slot]){
        const c=CARDS.find(x=>x.id===placed[slot]);
        hex.className='hex filled';hex.title=c.n+' — '+imText(c);
        hex.style.background={1:'#f6d5cd',2:'#f6e3c8',3:'#f6efc6',4:'#d4ead5'}[c.d];
        hex.innerHTML='<div class="ddot" style="background:'+DCOL[c.d]+'"></div><div class="nm">'+c.n+'</div><div class="im">'+(((c.p>0?'+':'')+c.p)+' P · '+((c.h>0?'+':'')+c.h)+' H')+'</div>';
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
  const tray=document.getElementById('tray');tray.innerHTML='';
  CARDS.filter(c=>!placedIds.includes(c.id)).forEach(c=>{
    const el=document.createElement('div');el.className='tcard'+(selected===c.id?' sel':'');
    el.innerHTML='<div class="swatch" style="background:'+DCOL[c.d]+'"></div><div><div class="nm">'+c.n+'</div><div class="ch">'+c.c+' · difficulty '+c.d+'</div><div class="im">'+imText(c)+'</div></div>';
    el.onclick=()=>{selected=(selected===c.id?null:c.id);render();};
    tray.appendChild(el);
  });

  const t=totals();const dials=document.getElementById('dials');dials.innerHTML='';
  DIALS.forEach(([k,label])=>{
    const v=t[k];const pct=Math.max(0,Math.min(100,(v+12)/24*100));
    const col=v>=THRESH?'#46a24a':(v>=-2?'#e08a2b':'#e0492f');
    const d=document.createElement('div');d.className='dial';
    d.innerHTML='<div class="lab"><span>'+label+'</span><span class="val" style="color:'+col+'">'+(v>0?'+':'')+v+'</span></div><div class="track"><div class="bar" style="width:'+pct+'%;background:'+col+'"></div><div class="tick"></div></div>';
    dials.appendChild(d);
  });

  const total=ROWS.reduce((a,b)=>a+b,0)-1;
  document.getElementById('progress').textContent=placedCount()+' / '+total+' hexes placed'+(selected?' — now click an empty hex':'');
  document.getElementById('roadmapBtn').disabled=placedCount()<total;
}

function flash(msg){const b=document.getElementById('banner');b.classList.remove('hidden');b.innerHTML=msg;}

document.getElementById('chanceBtn').onclick=()=>{
  const c=CHANCE[Math.floor(Math.random()*CHANCE.length)];
  ['p','h','co','r'].forEach(k=>chanceMod[k]+=c[k]);chanceLog.push(c.n);
  flash('<b>Chance card:</b> '+c.n+' ('+c.t+'). The family adapts the plan.');
  render();
};
document.getElementById('resetBtn').onclick=()=>{placed={};selected=null;chanceMod={p:0,h:0,co:0,r:0};chanceLog=[];document.getElementById('banner').classList.add('hidden');document.getElementById('roadmap').classList.add('hidden');render();};
document.getElementById('roadmapBtn').onclick=()=>{
  const t=totals();
  const order=Object.keys(placed).map(Number).sort((a,b)=>a-b);
  let items=order.map(s=>{const c=CARDS.find(x=>x.id===placed[s]);return '<li><b>'+c.n+'</b> — '+c.c+'</li>';}).join('');
  let v=DIALS.map(([k,label])=>{const val=t[k];const ok=val>=THRESH;return '<div class="vbox"><span style="color:'+(ok?'#46a24a':'#e0492f')+'">'+(ok?'on track':'at risk')+'</span><b>'+(val>0?'+':'')+val+'</b>'+label+'</div>';}).join('');
  const allOk=DIALS.every(([k])=>t[k]>=THRESH);
  const rm=document.getElementById('roadmap');rm.classList.remove('hidden');
  rm.innerHTML='<h3>Transition roadmap</h3><p style="font-size:.88rem;color:var(--text-secondary);margin:0 0 8px;">The scenarios the family worked through, in board order:</p><ol>'+items+'</ol>'+(chanceLog.length?'<p style="font-size:.82rem;color:var(--text-muted);">Chance events weathered: '+chanceLog.join(', ')+'</p>':'')+'<h3 style="margin-top:10px;">Where the family lands</h3><div class="verdict">'+v+'</div><p style="margin-top:12px;font-weight:600;color:'+(allOk?'#46a24a':'#b06a00')+'">'+(allOk?'Viable handover path — all four dials above the line.':'Workable, but one or more dials are still at risk. Worth another round before sign-off.')+'</p>';
  rm.scrollIntoView({behavior:'smooth',block:'nearest'});
};
render();
