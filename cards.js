// Succession Dynamics deck data — generated from data/nnherit_situation_cards_content_all (2).xlsx
// 60 cards, 12 per challenge. Colour encodes the challenge; difficulty is a 1–4 rating.
// Impact dimensions: prof Profitability, cont Continuity, ext External, gov Governance,
//                    harm Harmony, fam Family, comm Communication, read Readiness.
// Data note: SP07 "Internal Resistance" scores "-2 Employees" in the source sheet — folded
// into Governance here (the only card using that dimension; flag for the master sheet).

const DIMS={
  prof:'Profitability', cont:'Continuity', ext:'External', gov:'Governance',
  harm:'Harmony', fam:'Family', comm:'Communication', read:'Readiness'
};

const CHALLENGES={
  VS:{name:'Vision & Strategy',      full:'Disagreements over Vision and Strategy', col:'#cf4a33', tint:'#f6d8d2'},
  FR:{name:'Founder Reluctance',     full:'Founder Reluctance to Let Go',           col:'#e08a2b', tint:'#f7e4cb'},
  SP:{name:'Ill-Prepared Successors',full:'Ill-Prepared Successors',                col:'#3f7fae', tint:'#d9e7f1'},
  CT:{name:'Communication & Trust',  full:'Poor Communication and Trust',           col:'#46a24a', tint:'#d8ecd9'},
  RR:{name:'Roles & Responsibilities',full:'Unclear Roles and Responsibilities',    col:'#8a5ca8', tint:'#e6dcee'}
};

const CARDS=[
 {id:'VS01',cat:'VS',n:'Clashing Visions',d:1,desc:'The founder and successor have fundamentally different ideas about the company\'s future direction.',im:{prof:-2,harm:-3,cont:-1}},
 {id:'VS02',cat:'VS',n:'Finding Common Ground',d:4,desc:'Through negotiation and compromise, the family develops a hybrid vision that combines different perspectives.',im:{prof:1,harm:2,cont:1}},
 {id:'VS03',cat:'VS',n:'Competitor\'s Shadow',d:2,desc:'The emergence of a new competitor forces the family to confront differing opinions on how to respond.',im:{prof:-1,harm:-2,ext:-1}},
 {id:'VS04',cat:'VS',n:'Continuous Reassessment',d:4,desc:'Recognizing that needs and markets evolve, the family adopts a flexible vision that adapts to changing circumstances.',im:{prof:1,harm:1,gov:1}},
 {id:'VS05',cat:'VS',n:'External Pressures',d:2,desc:'Investors, stakeholders, or customers exert pressure, adding complexity to the vision discussion.',im:{prof:-1,ext:-2,gov:-1}},
 {id:'VS06',cat:'VS',n:'Family Feud',d:3,desc:'Power struggle around vision control escalates, leading to fractured relationships and internal divisions.',im:{prof:-2,fam:-3,gov:-1}},
 {id:'VS07',cat:'VS',n:'Generational Clash',d:2,desc:'Different generations have contrasting views on risk tolerance, market trends, and industry shifts.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'VS08',cat:'VS',n:'Hidden Agendas',d:1,desc:'Personal aspirations and unspoken goals of individual family members lead to conflicting strategies.',im:{prof:-1,harm:-2,comm:-1}},
 {id:'VS09',cat:'VS',n:'Phased Transition',d:4,desc:'Implementing the new vision through gradual, carefully planned stages mitigates risks and builds consensus.',im:{prof:1,harm:1,read:1}},
 {id:'VS10',cat:'VS',n:'Public Spat',d:3,desc:'Disagreements erupt publicly, damaging the company\'s image and employee morale.',im:{prof:-3,ext:-3,harm:-2}},
 {id:'VS11',cat:'VS',n:'Strategic Shift Crisis',d:3,desc:'A sudden unexpected event forces a hasty and potentially disastrous change in direction.',im:{prof:-3,harm:-2,cont:-1}},
 {id:'VS12',cat:'VS',n:'Stuck in the Past',d:1,desc:'The founder resists innovation and change, while the successor pushes for modernization.',im:{prof:-2,harm:-2,read:-1}},
 {id:'FR01',cat:'FR',n:'Emotional Tug-of-War',d:2,desc:'The founder struggles to emotionally detach from the business, leading to guilt and resentment between them and the successor.',im:{prof:-2,harm:-3,fam:-1}},
 {id:'FR02',cat:'FR',n:'Facing Mortality',d:4,desc:'The founder\'s approaching mortality triggers existential anxieties, impacting their willingness to let go.',im:{prof:-1,fam:-2,cont:1}},
 {id:'FR03',cat:'FR',n:'Founder vs. Family',d:3,desc:'The founder pits family members against each other, creating power struggles and fracturing family dynamics.',im:{prof:-2,fam:-3,cont:-1}},
 {id:'FR04',cat:'FR',n:'Generational Divide',d:2,desc:'Differing values and communication styles between the founder and successor create misunderstandings and conflict.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'FR05',cat:'FR',n:'Hidden Power Plays',d:2,desc:'The founder subtly undermines the successor\'s authority by manipulating information or leveraging relationships.',im:{prof:-1,gov:-2,cont:-1}},
 {id:'FR06',cat:'FR',n:'Legacy Labyrinth',d:4,desc:'The founder\'s desire to preserve their legacy hinders the company\'s ability to adapt and innovate.',im:{prof:-2,cont:-1,ext:-1}},
 {id:'FR07',cat:'FR',n:'Lingering Presence',d:1,desc:'The founder keeps hovering over the successor\'s shoulder, offering unsolicited advice and undermining decisions.',im:{prof:-1,harm:-2,read:-1}},
 {id:'FR08',cat:'FR',n:'Micromanagement Mania',d:1,desc:'The founder insists on controlling every detail, hindering progress and stifling the successor\'s initiative.',im:{prof:-3,harm:-3,read:-2}},
 {id:'FR09',cat:'FR',n:'Public Showdown',d:3,desc:'The founder publicly disagrees with the successor\'s decision, creating a media frenzy and damaging the company\'s reputation.',im:{prof:-3,ext:-3,cont:-2}},
 {id:'FR10',cat:'FR',n:'Shadow of Success',d:1,desc:'The founder\'s past achievements cast a long shadow, creating pressure and doubt for the successor.',im:{prof:-2,harm:-1,cont:-1}},
 {id:'FR11',cat:'FR',n:'Succession Dance',d:4,desc:'The founder and successor engage in a complex power struggle, testing boundaries and negotiating control.',im:{prof:-1,harm:-1,gov:1}},
 {id:'FR12',cat:'FR',n:'Sudden Departure',d:3,desc:'The founder abruptly leaves the company, leaving the successor unprepared and facing a leadership vacuum.',im:{prof:-2,harm:-2,read:-2}},
 {id:'SP01',cat:'SP',n:'Confidence Crisis',d:1,desc:'The successor struggles with self-doubt and imposter syndrome, hindering their ability to lead effectively.',im:{prof:-1,harm:-2,read:-1}},
 {id:'SP02',cat:'SP',n:'Experience Gap',d:1,desc:'The successor has limited experience in the industry or leadership roles, causing hesitation and uncertainty.',im:{prof:-1,harm:-1,read:-2}},
 {id:'SP03',cat:'SP',n:'External Doubts',d:2,desc:'Key stakeholders express concerns about the successor\'s readiness, undermining their confidence and authority.',im:{prof:-1,ext:-2,harm:-1}},
 {id:'SP04',cat:'SP',n:'Family Backlash',d:3,desc:'Family members question the successor\'s capabilities, creating tension and dividing loyalties.',im:{prof:-2,fam:-3,harm:-1}},
 {id:'SP05',cat:'SP',n:'Generational Mismatch',d:2,desc:'The successor\'s values and leadership style clash with the company\'s culture and employees\' expectations.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'SP06',cat:'SP',n:'Identity Crisis',d:4,desc:'The successor grapples with defining their own leadership style while navigating family expectations and external pressures.',im:{prof:-1,harm:1,read:1}},
 {id:'SP07',cat:'SP',n:'Internal Resistance',d:3,desc:'Employees resist the successor\'s leadership, creating conflict and undermining productivity.',im:{prof:-2,harm:-3,gov:-2}},
 {id:'SP08',cat:'SP',n:'Legacy Pressures',d:2,desc:'The successor feels overwhelmed by the pressure to live up to the founder\'s legacy.',im:{prof:-1,harm:-2,cont:-1}},
 {id:'SP09',cat:'SP',n:'Legacy vs. Innovation',d:4,desc:'The successor struggles to balance preserving the company\'s core values with embracing necessary change and innovation.',im:{prof:-1,cont:-1,read:1}},
 {id:'SP10',cat:'SP',n:'Missing Skills',d:1,desc:'The successor lacks essential business skills, leading to poor decisions and operational inefficiencies.',im:{prof:-2,harm:-1,read:-2}},
 {id:'SP11',cat:'SP',n:'Reckless Decisions',d:3,desc:'The successor makes impulsive choices that negatively impact the business, causing financial losses or reputational damage.',im:{prof:-3,harm:-2,ext:-2}},
 {id:'SP12',cat:'SP',n:'Transformational Journey',d:4,desc:'The successor\'s personal growth and development journey parallels the company\'s transformation and evolution.',im:{prof:-1,harm:1,read:2}},
 {id:'CT01',cat:'CT',n:'Closed Doors',d:1,desc:'Family members avoid open communication, resulting in missed opportunities and unresolved issues.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'CT02',cat:'CT',n:'Communication Breakdown',d:3,desc:'A critical situation arises, and lack of communication leads to disastrous consequences.',im:{prof:-3,harm:-2,comm:-2}},
 {id:'CT03',cat:'CT',n:'Generational Preconceptions',d:2,desc:'Preconceived notions about each other\'s generation create communication barriers and stifle empathy.',im:{harm:-1,fam:-1,comm:-1}},
 {id:'CT04',cat:'CT',n:'Information Blackout',d:1,desc:'The founder or successor withholds important information, breeding suspicion and hindering decision-making.',im:{prof:-2,harm:-3,gov:-1}},
 {id:'CT05',cat:'CT',n:'Legacy Traumas',d:4,desc:'Unresolved family issues from the past resurface, impacting communication and hindering progress.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'CT06',cat:'CT',n:'Lost in Translation',d:1,desc:'Misunderstandings arise due to differences in communication styles and expectations between generations.',im:{prof:-1,harm:-2,read:-1}},
 {id:'CT07',cat:'CT',n:'Media Circus',d:3,desc:'A family feud is leaked to the press, damaging the company\'s reputation and exacerbating conflict.',im:{prof:-3,ext:-3,harm:-2}},
 {id:'CT08',cat:'CT',n:'Mismatched Triggers',d:2,desc:'Family members have different emotional triggers, leading to misunderstandings and escalated conflicts.',im:{harm:-2,fam:-1,gov:-1}},
 {id:'CT09',cat:'CT',n:'Shifting Sands',d:4,desc:'Family dynamics and alliances constantly evolve, requiring ongoing communication and adaptation.',im:{harm:-1,comm:1,fam:1}},
 {id:'CT10',cat:'CT',n:'Silent Struggles',d:2,desc:'Personal agendas and unspoken expectations fuel distrust and impede collaboration.',im:{prof:-1,harm:-2,fam:-1}},
 {id:'CT11',cat:'CT',n:'Silent Treatment',d:3,desc:'Family members refuse to speak to each other, paralyzing decision-making and operations.',im:{prof:-2,harm:-3,gov:-1}},
 {id:'CT12',cat:'CT',n:'Trust Labyrinth',d:4,desc:'Building trust requires navigating complex layers of past hurts, power dynamics, and hidden anxieties.',im:{prof:-1,harm:1,fam:1}},
 {id:'RR01',cat:'RR',n:'Absent Ownership',d:1,desc:'No one takes clear ownership of projects or tasks, resulting in accountability gaps and missed deadlines.',im:{prof:-2,harm:-1,read:-1}},
 {id:'RR02',cat:'RR',n:'Ambiguous Hierarchies',d:2,desc:'Unclear reporting lines and decision-making authority create friction and impede progress.',im:{prof:-1,gov:-2,read:-1}},
 {id:'RR03',cat:'RR',n:'Balancing Legacy and Agility',d:4,desc:'Preserving family traditions while adapting to changing market demands requires flexible roles and responsibilities.',im:{prof:-1,cont:1,gov:1}},
 {id:'RR04',cat:'RR',n:'Continuous Realignment',d:4,desc:'Recognizing that roles and responsibilities need ongoing adjustment fosters adaptability and future-proofing.',im:{cont:-1,gov:1,read:1}},
 {id:'RR05',cat:'RR',n:'Evolving Landscape',d:2,desc:'Rapidly changing business environment requires constant readjustment of roles and responsibilities, causing confusion.',im:{prof:-1,gov:-1,read:-1}},
 {id:'RR06',cat:'RR',n:'External Intervention',d:3,desc:'External stakeholders intervene due to concerns about unclear leadership and governance, impacting reputation.',im:{prof:-2,ext:-2,gov:-1}},
 {id:'RR07',cat:'RR',n:'Family Duels',d:3,desc:'Power struggle erupts due to conflicting claims of authority and control, paralyzing operations.',im:{prof:-3,harm:-3,gov:-2}},
 {id:'RR08',cat:'RR',n:'Family Politics',d:2,desc:'Power struggles and competing agendas among family members lead to shifting roles and responsibilities.',im:{prof:-2,harm:-2,cont:-1}},
 {id:'RR09',cat:'RR',n:'Hidden Authority',d:1,desc:'Informal power dynamics create uncertainty about who ultimately makes decisions.',im:{prof:-1,harm:-1,gov:-1}},
 {id:'RR10',cat:'RR',n:'Key Departure',d:3,desc:'An essential family member suddenly leaves, leaving responsibilities unclear and critical tasks unattended.',im:{prof:-2,harm:-2,cont:-2}},
 {id:'RR11',cat:'RR',n:'Overlapping Duties',d:1,desc:'Multiple family members handle the same tasks, leading to confusion, redundancy, and wasted effort.',im:{prof:-2,harm:-1,gov:-1}},
 {id:'RR12',cat:'RR',n:'Shared Leadership Model',d:4,desc:'Implementing a dynamic leadership structure with rotating roles challenges traditional hierarchies but fosters collaboration.',im:{gov:-1,harm:1,read:1}}
];

const CHANCE=[
 {n:'Market shock',        t:'−2 Profitability',                 im:{prof:-2}},
 {n:'Health event',        t:'−2 Continuity, −1 Family',         im:{cont:-2,fam:-1}},
 {n:'Rival bid',           t:'−1 Profitability, −1 Readiness',   im:{prof:-1,read:-1}},
 {n:'Key person leaves',   t:'−2 Readiness, −1 Governance',      im:{read:-2,gov:-1}},
 {n:'Family rift',         t:'−2 Harmony, −2 Family',            im:{harm:-2,fam:-2}},
 {n:'Regulator inquiry',   t:'−2 Governance, −1 External',       im:{gov:-2,ext:-1}},
 {n:'Unexpected windfall', t:'+2 Profitability',                 im:{prof:2}},
 {n:'Mentor steps in',     t:'+1 Readiness, +1 Harmony',         im:{read:1,harm:1}},
 {n:'Good press',          t:'+2 External',                      im:{ext:2}},
 {n:'Family council formed',t:'+1 Communication, +1 Governance', im:{comm:1,gov:1}}
];
