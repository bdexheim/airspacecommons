(function(){
const U='#7A8896', C='#2B5FAE';
const CAP={
 pilot:[['Sensing hours a year over burdened blocks','0','2,000'],['Readings a year from paid resident crews','0','800'],['Days from a high reading to an inspection','Weeks, if someone complains','3 or fewer'],['Departments reading one shared picture','0','2'],['Blocks with a monthly flight and air record','0','about 1,200']],
 city:[['Sensing hours a year over burdened blocks','0','12,000'],['Readings a year from paid resident crews','0','3,600'],['Days from a high reading to an inspection','Weeks, if someone complains','3 or fewer'],['Departments reading one shared picture','0','5'],['Blocks with a monthly flight and air record','0','Every block']]
};
const LINES=[
 {n:'Mobile air sensing',u:'A city fleet: about 40 docked drones, sensors, remote operators, sites, insurance and approvals',c:'City pods ride on delivery flights; operators earn credits',v:{pilot:[0.9,0.15],city:[3.5,0.6]}},
 {n:'Fixed and school anchor sensors',u:'Keep the 277 sensors running and add school anchors',c:'The same. Anchors are needed either way, so no savings here',v:{pilot:[0.5,0.5],city:[0.6,0.6]}},
 {n:'Field checks near facilities',u:'Hire about six more environmental inspectors, with pensions and benefits',c:'Paid part-time resident crews and a coordinator; inspectors go where readings point',v:{pilot:[0.4,0.15],city:[0.8,0.4]}},
 {n:'Bridge, water and emergency flights',u:'Each department contracts its own flights',c:'Short loops on operator flights, plus a small fleet for emergencies',v:{pilot:[0.8,0.5],city:[2.2,0.8]}},
 {n:'Data platform and analysts',u:'Each department runs its own system',c:'One platform hosted by DTI, with analysts at CDPH',v:{pilot:[0.4,0.8],city:[0.8,1.5]}},
 {n:'Public ledger, board and panels',u:'Not part of the usual way',c:'Ledger, custodian board, paid panel seats, interpreters',v:{pilot:[0,0.2],city:[0,0.4]}},
 {n:'Backup when drones are grounded',u:'Built into each separate fleet',c:'Ground-sensor fallback and joint exercises',v:{pilot:[0,0.05],city:[0,0.2]}}
];
const ALREADY={pilot:1.6,city:2.5};
const SRC={pilot:[['City corporate fund','The base, funded centrally',0.3],['Department shares','CDOT, Water and CFD pay in instead of growing their own programs',0.15],['Grants','State and federal air and resilience grants',0.2],['Credits instead of fees','Permit fees the city forgoes as operator credits',0.1]],
 city:[['City corporate fund','The base, funded centrally',0.9],['Department shares','CDOT, Water and CFD pay in instead of growing their own programs',0.5],['Grants','State and federal air and resilience grants',0.3],['Credits instead of fees','Permit fees the city forgoes as operator credits',0.3]]};
const $=id=>document.getElementById(id), f=v=>'$'+v.toFixed(v<1&&v>0&&Math.round(v*100)%10?2:1)+'M';
const tip=$('btip'), chart=$('bchart');
function show(e){const s=e.currentTarget,r=chart.getBoundingClientRect(),b=s.getBoundingClientRect();tip.innerHTML='<b>'+s.dataset.t+'</b>'+s.dataset.b;tip.style.display='block';let x=b.left-r.left;x=Math.max(0,Math.min(x,r.width-tip.offsetWidth));tip.style.left=x+'px';tip.style.top=(b.top-r.top-tip.offsetHeight-6)+'px'}
function hide(){tip.style.display='none'}
function draw(ph){
 const max=ph==='city'?3.7:1;
 $('bCap').innerHTML=CAP[ph].map(c=>'<div class="capr"><div class="capn">'+c[0]+'</div><div class="capv"><span class="was">Today: '+c[1]+'</span><span class="now">'+c[2]+'</span></div></div>').join('');
 let tu=0,tc=0;
 $('bLines').innerHTML=LINES.map((l,i)=>{const [u,c]=l.v[ph];tu+=u;tc+=c;
  const bar=(v,col,who,how)=>'<div class="lbar"><div class="lfill" tabindex="0" data-t="'+l.n+' · '+who+'" data-b="'+f(v)+' · '+how+'" style="width:'+(v/max*100)+'%;background:'+col+'"></div><span class="lval">'+(v?f(v):'none')+'</span></div>';
  return '<div class="lrow"><div class="lname">'+l.n+'</div><div class="lbars">'+bar(u,U,'the usual way',l.u)+bar(c,C,'the commons way',l.c)+'</div></div>'}).join('');
 document.querySelectorAll('#bLines .lfill').forEach(s=>{s.onmouseenter=show;s.onfocus=show;s.onmouseleave=hide;s.onblur=hide});
 const a=ALREADY[ph], nu=tu-a, nc=tc-a;
 $('bTotals').innerHTML='<div class="card"><div class="what">The usual way</div><div class="big" style="color:'+U+'">'+f(tu)+'</div><div class="what">a year, or <b>'+f(nu)+' new</b> on top of what the city already spends or owes</div></div>'+
  '<div class="card" style="border-color:'+C+';box-shadow:inset 0 4px 0 '+C+'"><div class="what">The commons way</div><div class="big" style="color:'+C+'">'+f(tc)+'</div><div class="what">a year, or <b>'+f(nc)+' new</b> on top of what the city already spends or owes</div></div>'+
  '<div class="card"><div class="what">Already spent or owed</div><div class="big">'+f(a)+'</div><div class="what">keeping the sensors running after the grant, plus flight and inspection contracts departments already pay for</div></div>';
 $('bNote').innerHTML=ph==='pilot'
  ?'In the pilot year the gap is smaller, because the platform, ledger and board are built up front, while the usual way only has to buy a few drones and inspectors. <b>The gap widens as more blocks and departments join.</b> The usual way also adds its own flights over the same blocks; the commons rides on flights that are already there.'
  :'At citywide scale the commons delivers the same capacity for about <b>'+Math.round((1-tc/tu)*100)+'% less</b>, and adds '+f(nc)+' of new spending instead of '+f(nu)+'. Almost all of the difference comes from riding on flights that are already happening.';
 $('bRows').innerHTML=LINES.map(l=>'<tr><td>'+l.n+'</td><td>'+l.u+'</td><td>'+l.c+'</td><td>'+f(l.v[ph][0])+'</td><td>'+f(l.v[ph][1])+'</td></tr>').join('');
 $('bFoot').innerHTML='<tr><th colspan="3">Total per year</th><th>'+f(tu)+'</th><th>'+f(tc)+'</th></tr><tr><th colspan="3">New money, after what the city already spends or owes ('+f(a)+')</th><th>'+f(nu)+'</th><th>'+f(nc)+'</th></tr>';
 const share=Math.round(nc/18.7*100), n=Math.round(18.7/nc);
 $('bWorth').innerHTML='The commons adds about '+f(nc)+' a year in new spending. That\'s about '+share+'% of what one year of children\'s asthma ER visits in Chicago is charged. If earlier action near burdened facilities prevented about one in '+n+' of those visits, the health savings alone would roughly match the new cost, before counting adults, missed school and work, or the other departments\' gains.';
 $('bSrc').innerHTML=SRC[ph].map(s=>'<tr><td>'+s[0]+'</td><td>'+s[1]+'</td><td>'+f(s[2])+'</td></tr>').join('')+'<tr><th colspan="2">New money total</th><th style="text-align:right">'+f(nc)+'</th></tr>';
 document.querySelectorAll('.bctl button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ph===ph?'true':'false'));
}
document.querySelectorAll('.bctl button').forEach(b=>b.addEventListener('click',()=>draw(b.dataset.ph)));
draw('pilot');
})();
