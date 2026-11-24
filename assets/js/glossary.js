(function(){
const COURSE=[
['Strategic Choice-Making Model (SCMM)','SCMM','Four stages: Prompting, Prototyping, Archetyping, Infrastructuring','The spine of how we got here','How we developed the proposal'],
['Prompt Statement','SCMM · Prompting','A claim naming a flow, an institutional position and a governance outcome','CDPH as anchor tenant reshapes how airspace data is gathered and shared','The proposal in one sentence'],
['Prototype','SCMM · Prototyping','A testable concept that traces back to the agenda','18 prototypes and 2 shared bases','A program, or a pilot'],
['Archetype','SCMM · Archetyping','A bundle of prototypes forming a new configuration of resources and relationships','Three, one per relationship','The archetype names alone: Flights pay their way, One sky many readers, The sky answers to the street'],
['Capital reading','SCMM · Reflecting','What an archetype gains and spends across eight forms of capital','The trades, said out loud','What it costs, and who pays'],
['Expanding','SCMM · Archetyping','Pushing an archetype past its current boundary under named conditions','Ride-along, then steered, then held','How it grows'],
['Infrastructuring','SCMM · stage 4','Turning archetypes into institutional fabric, and telling it','The audience versions and mock materials','Putting it in place'],
['Action situation','Ostrom · IAD framework','A bounded moment: participants, positions, information, control, outcomes','Our six moments, from the first launch to everything going quiet','A moment, or a scene'],
['Anatomy of Infrastructures (AOI)','AOI','Rings from features through affordances and impacts to goals','The poster and the explorer','How it is built and what it is for'],
['Feature','AOI · outer ring','A person, artifact, digital tool or rule','34 on the ring, 18 actors','Name the thing itself'],
['Affordance','AOI','What a feature lets an actor do','19','What it lets you do'],
['Impact, intended or unintended','AOI','A change in the socio-technical system','21 intended, 10 unintended','What changes, and side effects'],
['Check','Our method, on the AOI','What keeps an unintended impact in bounds; usually supplied by a different archetype','7 of 10 risks are held by another archetype','What keeps it fair'],
['Activation','AOI','One moment traced across the rings, from feature to goal','The explorer\'s action situations','What switches on'],
['Visible and invisible layers','Our snapshot method','What a resident sees versus what runs behind it; infrastructure is invisible until it breaks','Every action situation board','Seen on the street, and runs behind it'],
['Commons','Ostrom','A shared resource governed by rules its users help set','The shared airspace commons','The proper name, once chosen']
];
const AUD=['Council and budget','Agencies','Operators','Residents'];
const PROJECT=[
['Shared airspace commons','One system for seeing the low sky, built once',['Shared infrastructure, one budget line, many departments','One map and one queue you plug into','The city\'s single front door for drone data','The city\'s record of what flies over you']],
['CDPH as anchor tenant','Health goes first and proves it works',['A first use case that justifies the base','The first department on the platform','The first department making requests','The health department, using it to protect your air']],
['City base map','One map every department reads',['A shared asset instead of six systems','Your layer on a common grid; your settings stay yours','Where your trade-level data lands, pooled','The map behind the record']],
['Operator terms ladder','Three levels of data sharing',['Data instead of fees','One menu for every department\'s asks','Basic (required at city sites), Trade (optional), Extras (capped)','What drone companies must share to use city land']],
['Coverage credit','Credit for carrying city sensors over thin areas',['Paid in kind, never cash','Spent from a shared cap','Better renewal terms, pad slots or fee offsets','Companies earn credit for covering neglected areas']],
['Burden budget','A seasonal limit on low flights per area',['A fair-share rule enforced through siting','Your flights count against one shared allowance','A published allowance; extras pause near the line','A limit on flights over your community, and you can see the count']],
['Purpose labels','Every reading says why it was collected',['Guardrails against mission creep','You see other layers only for registered purposes','Health readings go to the city; you get a coverage receipt','A health reading stays a health reading']],
['Flight ledger','A public log of who flew, why, and who looked',['Accountability without a new office','Your use is visible to others and to the public','Your flights appear by area, after a delay','Look up what flew over your block and why']],
['Custodian board and panels','Residents decide what their sky is used for',['Oversight seated by ordinance','Purposes are approved, not assumed','Rules are set in public, once a year','Your panel votes on cameras and new uses']],
['Gap-triggered coverage','Sensing sent where the picture is thin',['Equity by rule, not by request volume','File a ticket; burdened areas get a protected share','Tickets arrive as add-on requests','Ask for sensing on your block']],
['Emergency airspace mode','One arbiter decides who flies first, with an end time',['Priority without turf fights','OEMC decides; health keeps its share','Deliveries hold; you\'re told when it ends','Emergency flights first, and you\'re told until when']],
['Grounding fallback','One backup plan for every department',['One contract instead of six','Your readings keep coming when drones are grounded','No change to you','Readings continue from ground sensors']],
['Health sensor pod and payload standard','A city sensor that clips onto delivery drones',['City-owned instrument, no aircraft to buy','One spec any department\'s sensor can use','Fits during the battery swap; sensor only, no camera','A small air sensor riding on deliveries, never a camera over homes']],
['Sensing-directed inspection','Inspections follow burden, not complaints',['Same inspectors, better list','Readings route to the office that owns them','Not applicable','Inspectors go where the air is worst, not only where people complain']],
['Resident-verified reading','A resident\'s measurement that must be answered',['Standing for residents, a deadline for CDPH','A response clock on your office','Not applicable','Your reading moves your block up the list, and CDPH must answer']],
['Permit-required monitoring','Facilities pay for evidence of their own impact',['The polluter pays, through existing permits','A data source on the base map','Approved operators fly the facility\'s survey','The facility next door pays to measure its own pollution']]
];
const ACRO=[
['CDPH','Chicago Department of Public Health','Anchor tenant: the first department on the commons, running the health layer and inspection queue'],
['DTI','Department of Technology and Innovation','Platform host: runs the base map and ledger, decides nothing about who may read what'],
['OEMC','Office of Emergency Management and Communications','Proposed arbiter in emergency airspace mode; runs the grounding fallback'],
['CDOT','Chicago Department of Transportation','A reader: bridge and viaduct inspection through the add-on menu'],
['DWM','Department of Water Management','A reader: leak and flood sensing'],
['CFD','Chicago Fire Department','A reader in emergencies; ambulance costs show up here when air harms health'],
['CPD','Chicago Police Department','Not an eligible reader of health data; its request is refused in action situation 5'],
['DPD','Department of Planning and Development','Runs the air quality siting review alongside CDPH'],
['FAA','Federal Aviation Administration','Regulates flight itself; the city\'s levers are on the ground'],
['Remote ID','FAA broadcast rule','Every drone broadcasts its ID, position, altitude, speed and control-station location, live; nothing stored for the city'],
['Part 108','Proposed FAA rule','Routine beyond-visual-line-of-sight flight; what would let delivery fleets scale into the city'],
['BVLOS','Beyond visual line of sight','Flight without a pilot watching the aircraft; needed for routine delivery and sensing'],
['Base 1','Our term','The basic record operators share at city sites: stored logs, planned routes, operator purpose, noise class'],
['PM2.5','Fine particulate matter','The fine dust most tied to asthma and heart and lung disease; what the pods and anchors measure'],
['Open Air Chicago','CDPH and UIC sensor network','277 fixed air sensors; its federal grant ended in September 2026'],
['IAD','Institutional Analysis and Development framework (Ostrom)','Where the idea of an action situation comes from']
];
const $=id=>document.getElementById(id), esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
$('gCourse').innerHTML=COURSE.map(c=>'<article class="gcard"><div class="gfw">'+esc(c[1])+'</div><h4>'+esc(c[0])+'</h4><p>'+esc(c[2])+'</p><dl><dt>How we use it</dt><dd>'+esc(c[3])+'</dd><dt>In mock materials, say</dt><dd>'+esc(c[4])+'</dd></dl></article>').join('');
$('gProject').innerHTML=PROJECT.map(c=>'<article class="gcard"><h4>'+esc(c[0])+'</h4><p class="gplain">'+esc(c[1])+'</p><dl class="gaud">'+c[2].map((v,i)=>'<dt>'+AUD[i]+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl></article>').join('');
$('gAcro').innerHTML=ACRO.map(a=>'<tr><td><b>'+esc(a[0])+'</b></td><td>'+esc(a[1])+'</td><td>'+esc(a[2])+'</td></tr>').join('');
let cur='course';
function filt(){const q=$('gq').value.trim().toLowerCase();let shown=0;
 document.querySelectorAll('.gpanel[data-g="'+cur+'"] .gcard, .gpanel[data-g="'+cur+'"] tbody tr').forEach(el=>{const ok=!q||el.textContent.toLowerCase().includes(q);el.hidden=!ok;if(ok)shown++});
 $('gNone').hidden=shown>0;}
document.querySelectorAll('#glossary .tab').forEach(t=>t.addEventListener('click',()=>{cur=t.dataset.g;
 document.querySelectorAll('#glossary .tab').forEach(x=>x.setAttribute('aria-selected',x===t?'true':'false'));
 document.querySelectorAll('#glossary .gpanel').forEach(p=>p.hidden=p.dataset.g!==cur);filt();}));
$('gq').addEventListener('input',filt);
})();

(function(){
 function prep(){document.querySelectorAll('details').forEach(d=>{d.dataset.wasOpen=d.open?'1':'';d.open=true});
  const c=document.querySelector('.bctl button[data-ph="city"]'); if(c) c.click();}
 function undo(){document.querySelectorAll('details').forEach(d=>{d.open=d.dataset.wasOpen==='1'})}
 window.addEventListener('beforeprint',prep); window.addEventListener('afterprint',undo); window.__prepPrint=prep;
})();

// Fill "live version" links with the site's own address (set by the PDF build, or taken from the page URL).
(function(){
  const meta=document.querySelector('meta[name="site-url"]');
  const base=(meta&&meta.content)||location.href.split('#')[0];
  if(!/^https?:/.test(base)) return;
  document.querySelectorAll('a.site-url').forEach(a=>{const h=a.dataset.hash||'';a.href=base+h;a.textContent=(base+h).replace(/^https?:\/\//,'');});
})();
