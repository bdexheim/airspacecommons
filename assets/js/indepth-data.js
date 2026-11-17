// Content for the in-depth page, from the team's Archetypes, Reflecting and Expanding work.
// A = archetypes, P = phases, C = next contexts, L = one block's ledger (fictional).
var A = {
    a1: {
      color: "var(--op)", rel: "Operators ↔ city", name: "Flights pay their way",
      promise: "The more drones fly, the more the city can see, and the less any one block carries.",
      protos: [["PT-TERMS"], ["PT-BUDGET"], ["PT-PODS", 1], ["PT-STEER", 1], ["PT-MANDATE", 1]],
      gives: "Operators give flight logs, sensor data and pod carriage, and stay inside burden budgets. Facilities fund their own monitoring.",
      gets: "Operators get site access, predictable approvals and a pooled weather and corridor picture. Neighborhoods get a cap on what flies over them.",
      cdph: "CDPH's siting review is the hook for Base 1. Its pods ride as add-ons, and it pays to steer them over thin, burdened blocks.",
      narr: "Flights pay their way moves the cost of monitoring off the city's budget and onto those who fly and pollute. It pays in operator goodwill and staff time. Its natural capital is mixed, because its value rises with every flight. It meets the equity mandate only through the burden budget, and sustainability only if that budget caps total flying across every agency. It holds wherever private operators use public ground, gets worse with camera payloads, and breaks at the city border, where hubs can move to avoid Base 1.",
      cap: [
        ["Financial", "±", "Monitoring the city doesn't pay for: operators pay in data, facilities fund surveys", "Operators' compliance costs; CDPH pays for steering"],
        ["Social", "±", "Burdened blocks get a cap on what flies over them", "Operators may route around capped areas, so thinly served places lose service"],
        ["Political", "−", "Health evidence at siting; a seat in airspace decisions", "Every ask spends operator goodwill; hard terms may push hubs out of the city"],
        ["Digital", "+", "A pooled picture of the airspace no one could build alone", "Flight logs are sensitive: a delivery endpoint is a home"],
        ["Natural", "±", "Air quality evidence near sources and hubs", "Value rises with every flight: more noise, energy and wildlife disturbance"],
        ["Manufactured", "+", "Hubs become sensing sites; one payload standard", "Retrofit and mounting costs"],
        ["Human", "−", "Operators gain a predictable process", "Reviewers and a city terms desk need time and skills"],
        ["Cultural", "±", "Drones read as civic infrastructure that gives back", "Constant overflight becomes the price of being seen"]
      ],
      trades: [
        ["Seeing more by flying more", "The intent decides: the cap wins over growth", "The burden budget caps total flights per neighborhood; shared pods mean more sensing without more flights."],
        ["A cap against access to delivery", "The intent only partly decides", "Watch for service avoidance in the ledger; panels can ask for exceptions inside their budget."],
        ["Every ask spends the same goodwill", "The intent is silent on operators", "One front door, a fixed menu and a cap on total asks."]
      ],
      checked: "Checked by archetype 3 (panels can lower a block's budget; the ledger shows the count) and archetype 2 (shared pods mean added readers don't add flights).",
      breaks: "Breaks at the city border, where hubs can move to avoid Base 1. Holds if the siting review covers hubs and vertiports, and Base 1 adds something beyond Remote ID."
    },
    a2: {
      color: "var(--ag)", rel: "Agency ↔ agency", name: "One sky, many readers",
      promise: "Sensing and coordination no single agency could afford or legitimately run alone.",
      protos: [["BASE-MAP"], ["PT-GAPS"], ["PT-EMERGENCY"], ["PT-FALLBACK"], ["PT-EXERCISE", 1]],
      gives: "Each agency brings its layer, its criteria and a share of base costs. OEMC arbitrates in emergencies. Partner fleets lend by rule.",
      gets: "The base map, the queue, continuity in a grounding, and other agencies' layers within its purpose. DTI runs it but doesn't decide who may use the data.",
      cdph: "CDPH brings the health layer, writes its criteria for asking for emergency mode, runs PT-WATCH on the shared simulator, and rehearses with CFD and OEMC.",
      narr: "One sky, many readers builds a coordination capacity the city doesn't have today, and each agency pays less than it would alone. The cost is agency autonomy and concentrated exposure: more readers watching the same residents, and one point of failure. It meets equity through the protected share in the gap queue, and sustainability because one flight serves many readers. It holds easily for Water Management and an ecology steward, depends on terms for CFD, OEMC and Aviation, and reaches its boundary at CPD.",
      cap: [
        ["Financial", "±", "Each agency pays less: one map, one queue, one fallback", "One shared budget line to defend every year, and one target in a cut"],
        ["Social", "−", "Better-coordinated emergency response for everyone", "More readers means more exposure for the same residents"],
        ["Political", "±", "Coordination the city lacks; clear roles for OEMC and DTI", "Agencies give up autonomy to an arbiter and an access matrix"],
        ["Digital", "±", "One standard and one map, so layers line up", "One breach exposes every agency's data"],
        ["Natural", "+", "One flight serves many readers; an ecology steward reads migration", "Emergency mode can override ecological limits"],
        ["Manufactured", "±", "Shared fleets, anchor sites and pods", "Fleets are contested in the same events"],
        ["Human", "±", "Joint exercises build shared skills", "Time spent agreeing instead of acting"],
        ["Cultural", "±", "Agencies move from owning data to sharing it", "Departments used to owning their data will resist"]
      ],
      trades: [
        ["Efficiency against exposure", "The intent decides: every reading answers to the people beneath it", "No new reader joins without the purpose rules and the panels. This trade is handed to archetype 3."],
        ["Coordination against autonomy", "The intent is silent on what agencies give up", "A named arbiter for routine conflicts; agencies keep their own playbooks."],
        ["One map, one point of failure", "The intent is silent", "Layers stay separate under the base map; the backup plan covers the platform too."]
      ],
      checked: "Checked by archetype 3 (no new reader or purpose without a public vote and the panels) and archetype 1 (operators' data is only reachable through the commons, so joining beats going alone).",
      breaks: "Reaches its boundary at CPD, where efficiency turns into surveillance. Holds if DTI gets the mandate, OEMC takes the arbiter role and agencies sign a cost split."
    },
    a3: {
      color: "var(--res)", rel: "City ↔ residents", name: "The sky answers to the street",
      promise: "The system can add agencies and flights without sliding into surveillance, because the people under it can see it, question it and say no.",
      protos: [["PT-LEDGER"], ["PT-PURPOSE"], ["PT-CUSTODIAN"], ["PT-CREWS", 1], ["PT-VERIFIED", 1]],
      gives: "Residents give time, readings and decisions on uses. Agencies give disclosure and accept purpose limits. The board gives custody and audit.",
      gets: "Residents get the ledger, a say over purposes, standing to be answered and protection from drift. Agencies get data residents will trust, and permission to keep flying.",
      cdph: "CDPH brings its health workers and messengers, accepts resident-verified readings with a duty to answer, and carries Healthy Chicago 2025's principle that the people affected decide how they are measured.",
      narr: "The sky answers to the street moves authority over purposes to residents and the burden of proof to agencies. It pays in money, in residents' unpaid time, and in the risk that a refusal leaves real harm unmeasured. It is the strongest of the three on community power and the weakest on sustainability: it earns nothing and depends on the other two to fund stipends and panels. It carries the most weight wherever the city operates directly, and it breaks if it cannot say no to CPD.",
      cap: [
        ["Financial", "−", "Nothing directly", "Board, panels, ledger and stipends cost money and earn none"],
        ["Social", "+", "Trust, standing and a public record; the burden of proof moves to agencies", "Panels can be captured by the best-organized groups"],
        ["Political", "±", "Residents gain real authority over purposes", "Agencies lose discretion; refusals block some uses; needs Council action"],
        ["Digital", "±", "Every flight and every look is on the record", "The ledger is itself a map of what the city watches"],
        ["Natural", "−", "Nothing directly", "A refusal can leave real harm unmeasured"],
        ["Manufactured", "·", "Little effect", "Little effect"],
        ["Human", "−", "Crews and panels build local skills and leadership", "Residents' time, often unpaid; health workers' time"],
        ["Cultural", "+", "The people affected decide how they are measured", "Clashes with enforcement cultures that expect access"]
      ],
      trades: [
        ["Residents' say against protection", "A tension inside our own intent", "Refusals bind on cameras and enforcement, not on sensor-only health readings; the ledger shows where refusals leave gaps."],
        ["Legitimacy paid for in residents' time", "The intent is silent", "Stipends for crews and panel members; panels decide categories once a year."],
        ["Who speaks for a neighborhood", "The intent only partly decides", "Seats for the highest-burden blocks first, open applications, and a ledger anyone can read."]
      ],
      checked: "Checked by archetype 2 (health readings stay advisory, so the protected share still reaches a block) and archetypes 1 and 2 (operator-paid data and shared costs fund stipends and panels).",
      breaks: "Breaks if it cannot say no to CPD, or if panels thin out to the organized few. Holds if the board is created by ordinance and refusals bind on cameras and enforcement."
    }
  };

var P = [
    { name: "Ride-along commons", sub: "passive data only", readers: "CDPH, Water Management",
      a1: ["Base 1 at new hubs and vertiports", "Operators' passive data under the standard"],
      a2: ["Base map live", "CDPH and Water layers", "One backup plan"],
      a3: ["Ledger live from day one", "Purpose label on every reading", "Custodian board seated"],
      gate: "A full season with the ledger running and no purpose breach. Panels seated in the highest-burden neighborhoods. Base 1 shown to add something beyond Remote ID." },
    { name: "Steered commons", sub: "add-ons and the gap queue", readers: "adds CDOT, CFD and OEMC, an ecology steward",
      a1: ["Base 2 exchange", "Add-on menu with its cap", "Shared pods on the payload standard"],
      a2: ["Gap queue with the protected share", "A named arbiter for routine conflicts", "Base costs split"],
      a3: ["Panels binding on cameras", "A rule for adding purposes", "Residents can file tickets"],
      gate: "OEMC agrees to the arbiter role. A cost split signed by the agencies. The burden budget measured, not yet enforced, for a full season." },
    { name: "Held commons", sub: "budget enforced, emergency mode", readers: "adds Aviation as a rule-holder, others by application",
      a1: ["Burden budget enforced on every flight", "Liability terms for shared pods"],
      a2: ["City emergency mode", "Airport rule", "Migration windows from the ecology steward"],
      a3: ["Panels can ask for lower budgets", "Burden definition reviewed each cycle with the EJ Index group"],
      gate: "Only once this phase is stable does the commons try another shared space." }
  ];

var C = [
    ["Water Management", "2", "Better", "Base map, gap queue, backup plan, ledger. Sensor-only readings, low surveillance risk.", "Little. Its readings are slow-moving, like CDPH's.", "A Water layer, with its purposes registered with the board."],
    ["Ecology steward", "2 and 3", "Better", "Budget, a base map layer, seasonal windows.", "Ecology can't speak; someone reads on its behalf. Migration timing moves each year.", "A named steward with a seat at the board; migration windows count against the budget."],
    ["CFD / OEMC", "2", "Depends", "The base map as a live incident layer, shared fleets, emergency mode.", "Needs minutes, not days, and wants the same fleet in the same events. Clearing an area in minutes is largely federal.", "OEMC takes the arbiter role; health keeps a protected share of the fleet; the minute-scale limit is named."],
    ["Aviation", "2", "Depends", "A shared traffic picture, Remote ID counts, dynamic zones.", "Aviation wants less sensing near airports. Burdened blocks near Midway sit beside restricted airspace.", "Where flights are blocked, ground sites and outside feeds stand in, and the ledger says so."],
    ["Utility poles", "1", "Depends", "Pole attachment agreements work like Base 1: attach your equipment, share data.", "Telecom carriers are regulated by others; sensors on poles are fixed and constant.", "Attachment terms the city can actually set, and a privacy level for pole cameras."],
    ["Sewers", "2 and 3", "Depends", "Base map, purpose labels, ledger, custodian.", "No operators, so the exchange has nothing to trade with. Wastewater data can reveal a neighborhood's health.", "Panels and purpose rules apply to the city's own sensors."],
    ["CDOT imaging", "1 and 3", "Worse", "Payload standard, add-on menu, shared pods, purpose labels.", "Cameras catch people, yards and windows, and compete with health pods for weight and power.", "Cameras ride only at a set privacy level; panels decide on imagery; camera flights count more against the budget."],
    ["The curb", "1", "Worse", "Base 1 as a condition of curb access, the ledger, a budget of curb time per block.", "Location data on vans and cars is personal in a way flight logs are not quite.", "Data conditions on curb permits, minimized and delayed. Los Angeles's scooter data disputes are the warning."],
    ["Another jurisdiction", "1", "Worse", "The whole pattern: base map, terms, ledger.", "Hubs may move outside city limits to avoid Base 1. The siting lever stops at the border.", "Matching terms in neighboring jurisdictions, or a regional body."],
    ["CPD", "3", "Boundary", "In principle, a reader like any other.", "Purpose drift. The most polluted neighborhoods are also the most policed, and any enforcement use of health data breaks trust for everyone.", "Panels bind on any enforcement-adjacent purpose; health layers are never visible to enforcement; police vehicles carry nothing by default."]
  ];

var L = [
    { t: "06:30", p: "health", label: "health", what: "<b>Pod fitted</b> at the Northline hub during a battery swap", d: [["Who", "Northline hub technician"], ["For whom", "CDPH (add-on, request #0417)"], ["Collected", "Nothing yet"], ["Counts toward budget", "No"]] },
    { t: "07:40", p: "health", label: "health", what: "<b>Delivery flight</b> takes a 3-minute detour over 6 blocks near the school", d: [["Who", "Northline, routine delivery"], ["For whom", "CDPH health layer"], ["Why", "Thin data on a burdened block (gap queue, protected share)"], ["Collected", "PM2.5, heat. Neighborhood grain."], ["Who looked", "CDPH Epidemiology"], ["Counts toward budget", "Yes, 1.0×"]] },
    { t: "07:58", p: "health", label: "health", what: "<b>Verified reading</b> from the block's sensing crew · reply due Thursday", d: [["Who", "Community sensing crew, verified against an anchor site"], ["For whom", "CDPH"], ["What it triggers", "A duty to answer by a set date"], ["Status", "Open"]] },
    { t: "10:06", p: "denied", label: "denied", what: "<b>Police request</b> to read this block's health layer · denied", d: [["Requested by", "CPD"], ["Why denied", "Enforcement is on the never-allowed list for health readings. Changing that needs the panels and a public vote."], ["Collected", "Nothing released"], ["Logged", "Yes, here and with the custodian board"]] },
    { t: "11:42", p: "safety", label: "airspace safety", what: "<b>Delivery flight</b> · route, timing and noise class only", d: [["Who", "Northline"], ["For whom", "Shared airspace picture (Base 1)"], ["Collected", "Route, timing, noise class. Endpoint stripped."], ["Released", "After 24 hours"], ["Counts toward budget", "Yes, 1.0×"]] },
    { t: "14:25", p: "emergency", label: "emergency", what: "<b>Emergency mode</b> declared by OEMC until 20:00 · heat", d: [["Who decides", "OEMC, as arbiter"], ["What changes", "Health flights first; extras over the block pause"], ["Ends", "20:00 today, then an audit"], ["Who looked", "CDPH, OEMC"]] },
    { t: "16:10", p: "safety", label: "imagery", what: "<b>Camera flight</b> for bridge inspection · waiting for a person", d: [["Requested by", "Transportation (CDOT)"], ["Status", "Held. Camera flights always go to a person, and the panel decides on imagery here."], ["Counts toward budget", "2.0× if approved: camera flights count double"]] }
  ];
