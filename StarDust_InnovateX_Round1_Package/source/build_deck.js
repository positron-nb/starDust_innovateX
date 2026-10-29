// StarDust | InnovateX Round 1 deck generator (pptxgenjs)
// Run: NODE_PATH=<dir with node_modules> node build_deck.js
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.title = "StarDust - InnovateX Round 1";
pres.author = "Team StarDust";
pres.theme = { headFontFace: "Calibri", bodyFontFace: "Calibri" };

// ---------- palette ----------
const NAVY = "0B2545", INK = "1F2D3D", MUTED = "5B6B7F", LINE = "C9D3DD";
const TEAL = "0E8C99", TEAL_L = "E3F4F5", WATER = "BFE6EA", WATER_D = "8FD3DA";
const ORANGE = "E0702B", ORANGE_L = "FCEBDD", BG2 = "F3F6F9", WHITE = "FFFFFF";
const GREEN = "2E8B57", GREEN_L = "E4F3EA", PURPLE = "5B4B9A", PURPLE_L = "ECE9F6", RED = "B83A3A", RED_L = "F8E3E3";
const W = 13.333;

pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: WHITE },
  objects: [
    { text: { text: "StarDust  |  InnovateX 2026-27  |  Theme 3", options: { x: 0.5, y: 7.08, w: 6, h: 0.3, fontSize: 10, color: MUTED, margin: 0 } } },
  ],
  slideNumber: { x: 12.4, y: 7.08, w: 0.45, h: 0.3, fontSize: 10, color: MUTED, align: "right" },
});
pres.defineSlideMaster({ title: "COVER", background: { color: WHITE } });

// ---------- helpers ----------
const T = (s, text, o) => s.addText(text, Object.assign({ isTextBox: true, fontFace: "Calibri", color: INK, margin: 0, valign: "top" }, o));
const R = (s, o) => s.addShape(pres.shapes.RECTANGLE, Object.assign({ line: { color: o.lineColor || o.fill, width: o.lw || 0.75 } }, o, { fill: { color: o.fill } }));
const RR = (s, o) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({ rectRadius: 0.08 }, o, { fill: { color: o.fill }, line: { color: o.lineColor || o.fill, width: o.lw || 0.75 } }));
const OV = (s, o) => s.addShape(pres.shapes.OVAL, Object.assign({}, o, { fill: { color: o.fill }, line: { color: o.lineColor || o.fill, width: o.lw || 0.75 } }));
const L = (s, x1, y1, x2, y2, color, w, opt = {}) => s.addShape(pres.shapes.LINE, {
  x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
  flipH: x2 < x1, flipV: y2 < y1,
  line: Object.assign({ color, width: w || 1.5 }, opt),
});
const ARR = (s, x1, y1, x2, y2, color, w, dash) => L(s, x1, y1, x2, y2, color || NAVY, w || 1.75, { endArrowType: "triangle", dashType: dash || "solid" });

function header(s, kicker, title, kColor) {
  T(s, kicker, { x: 0.5, y: 0.32, w: 12.3, h: 0.3, fontSize: 12, bold: true, color: kColor || TEAL, charSpacing: 2 });
  T(s, title, { x: 0.5, y: 0.62, w: 12.3, h: 0.75, fontSize: 28, bold: true, color: NAVY, valign: "middle", fit: "shrink" });
}
function pill(s, x, y, w, text, fill, color, fs) {
  RR(s, { x, y, w, h: 0.36, fill, rectRadius: 0.18 });
  T(s, text, { x, y, w, h: 0.36, fontSize: fs || 12, bold: true, color, align: "center", valign: "middle" });
}
function chip(s, x, y, n, fill) {
  OV(s, { x, y, w: 0.42, h: 0.42, fill: fill || NAVY });
  T(s, String(n), { x, y, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle" });
}
function source(s, text) { T(s, text, { x: 0.5, y: 6.72, w: 12.3, h: 0.3, fontSize: 10, color: MUTED, italic: true }); }

// Plan-view barrier sketch, reused on cover (scaled by origin)
function planView(s, ox, oy, sc) {
  const X = (v) => ox + v * sc, Y = (v) => oy + v * sc, S = (v) => v * sc;
  // banks
  R(s, { x: X(0), y: Y(0), w: S(6.0), h: S(0.55), fill: "DCE3E8" });
  R(s, { x: X(0), y: Y(3.65), w: S(6.0), h: S(0.55), fill: "DCE3E8" });
  // water
  R(s, { x: X(0), y: Y(0.55), w: S(6.0), h: S(3.1), fill: WATER });
  T(s, "FLOW", { x: X(0.15), y: Y(1.95), w: S(0.8), h: 0.3, fontSize: 11, bold: true, color: TEAL });
  ARR(s, X(0.15), Y(2.35), X(1.05), Y(2.35), TEAL, 2.5);
  // debris upstream of boom
  const deb = [[2.2, 1.1], [2.5, 1.5], [2.35, 2.0], [2.7, 2.4], [2.5, 2.9], [2.9, 3.2], [2.15, 2.5], [2.75, 1.85], [3.0, 2.8]];
  deb.forEach(([a, b], i) => s.addShape(i % 3 ? pres.shapes.OVAL : pres.shapes.RECTANGLE, { x: X(a), y: Y(b), w: S(0.17), h: S(0.12), rotate: i * 25, fill: { color: i % 2 ? "8C96A3" : "C47A3A" }, line: { color: "6B7682", width: 0.5 } }));
  // boom (diagonal)
  L(s, X(2.9), Y(0.55), X(3.5), Y(3.65), ORANGE, S(10));
  T(s, "Existing trash boom", { x: X(3.55), y: Y(3.0), w: S(1.9), h: 0.3, fontSize: 11, bold: true, color: ORANGE });
  // mooring line to anchor on bank with load cell
  L(s, X(2.9), Y(0.55), X(1.9), Y(0.25), NAVY, 1.5);
  R(s, { x: X(2.2), y: Y(0.24), w: S(0.32), h: S(0.2), fill: PURPLE, rotate: 17 });
  OV(s, { x: X(1.78), y: Y(0.15), w: S(0.2), h: S(0.2), fill: NAVY });
  T(s, "Load cell on one mooring line", { x: X(0.15), y: Y(-0.42), w: S(3.4), h: 0.3, fontSize: 11, bold: true, color: PURPLE });
  // sensors A and B on brackets
  const sens = (cx, lab) => { L(s, X(cx), Y(0.3), X(cx), Y(1.0), MUTED, 2); RR(s, { x: X(cx - 0.18), y: Y(0.9), w: S(0.36), h: S(0.28), fill: TEAL, rectRadius: 0.04 }); T(s, lab, { x: X(cx - 0.18), y: Y(0.9), w: S(0.36), h: S(0.28), fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle" }); };
  sens(1.6, "A"); sens(4.8, "B");
  T(s, "Level A (upstream)", { x: X(0.9), y: Y(1.25), w: S(2), h: 0.3, fontSize: 11, color: NAVY, bold: true });
  T(s, "Level B (downstream)", { x: X(4.0), y: Y(1.25), w: S(2), h: 0.3, fontSize: 11, color: NAVY, bold: true });
  // controller on bank
  RR(s, { x: X(4.4), y: Y(3.75), w: S(1.4), h: S(0.38), fill: NAVY, rectRadius: 0.04 });
  T(s, "ESP32 node", { x: X(4.4), y: Y(3.75), w: S(1.4), h: S(0.38), fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle" });
}

// =====================================================================
// SLIDE 1 - Hook
// =====================================================================
{
  const s = pres.addSlide({ masterName: "COVER" });
  R(s, { x: 0, y: 0, w: 5.9, h: 7.5, fill: NAVY });
  T(s, "THEME 3  ·  RISING PLASTIC POLLUTION IN COASTAL CITIES", { x: 0.55, y: 0.5, w: 5.2, h: 0.3, fontSize: 11, bold: true, color: "7FD3DB", charSpacing: 1 });
  T(s, "StarDust", { x: 0.55, y: 0.95, w: 5.2, h: 1.0, fontSize: 54, bold: true, color: WHITE });
  T(s, "Is the trash barrier still doing its job — or does a crew need to go now?", { x: 0.55, y: 2.0, w: 5.0, h: 1.3, fontSize: 22, bold: true, color: "FFD3B5" });
  T(s, "A low-cost monitoring retrofit for existing drainage trash barriers. It reads the water-level difference across the barrier and the tension in one mooring line, checks whether the data is valid, and tells the maintenance team when an inspection is worth a visit.",
    { x: 0.55, y: 3.4, w: 5.0, h: 1.6, fontSize: 15, color: "E6EDF3" });
  // team block
  RR(s, { x: 0.55, y: 5.2, w: 4.95, h: 1.5, fill: "13335C", rectRadius: 0.06 });
  T(s, [
    { text: "Team: ", options: { bold: true, color: "7FD3DB" } }, { text: "[Team name]   ", options: { color: WHITE } },
    { text: "Team ID: ", options: { bold: true, color: "7FD3DB" } }, { text: "[ID]", options: { color: WHITE, breakLine: true } },
    { text: "Members: ", options: { bold: true, color: "7FD3DB" } }, { text: "[Member 1], [Member 2], [Member 3], [Member 4]", options: { color: WHITE, breakLine: true } },
    { text: "Institute: ", options: { bold: true, color: "7FD3DB" } }, { text: "[Institution]", options: { color: WHITE, breakLine: true } },
    { text: "Contact: ", options: { bold: true, color: "7FD3DB" } }, { text: "[email]  ·  [phone]", options: { color: WHITE } },
  ], { x: 0.75, y: 5.32, w: 4.6, h: 1.6, fontSize: 13, paraSpaceAfter: 4 });

  // right: plan view illustration
  T(s, "Proposed arrangement on an existing barrier (plan view)", { x: 6.4, y: 0.55, w: 6.5, h: 0.4, fontSize: 16, bold: true, color: NAVY });
  planView(s, 6.55, 1.65, 1.05);
  RR(s, { x: 6.4, y: 6.3, w: 6.5, h: 0.5, fill: ORANGE_L, rectRadius: 0.05 });
  T(s, "Conceptual illustration only. Not an installed system, not a surveyed site, not to scale.", { x: 6.55, y: 6.3, w: 6.3, h: 0.5, fontSize: 12, color: "8A3B0F", valign: "middle", bold: true });
  s.addNotes(`[0:45 | Speaker 1]
Good morning. We are Team [name], Theme 3.

Mumbai already uses floating trash booms at drain and nullah outfalls to stop plastic before it reaches creeks and mangroves. Our question is simple and operational: between two maintenance visits, is the barrier still doing its job, or does a crew need to go now?

StarDust is a monitoring retrofit for those existing barriers. It is not a garbage collector and not a robot. Two level sensors read the water surface upstream and downstream of the boom; one load cell reads the pull in one mooring line. An ESP32 checks whether those readings are valid, compares them with the clean-barrier baseline, and tells the maintenance team when inspection is worth a visit.

Everything you see on the right is a conceptual illustration, not an installed system. What we are bringing today is a defined problem, an architecture, and a test plan that can prove or disprove the idea.

Transition: let me start with where the plastic actually goes.`);
}

// =====================================================================
// SLIDE 2 - Problem
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "THE PROBLEM", "Booms catch drain plastic, but no one sees them between visits");
  // pathway
  const steps = [
    ["Streets & homes", "Bottles, wrappers, film"],
    ["Stormwater drain / nullah", "Monsoon runoff carries it"],
    ["Trash boom at outfall", "Intercepts floating litter"],
    ["Creek & mangroves", "Malad, Mithi, Dahisar…"],
    ["Arabian Sea", "Marine debris"],
  ];
  const y0 = 1.65, bw = 2.2, gap = 0.3;
  steps.forEach(([a, b], i) => {
    const x = 0.5 + i * (bw + gap);
    const hot = i === 2;
    RR(s, { x, y: y0, w: bw, h: 1.15, fill: hot ? ORANGE : (i < 2 ? BG2 : TEAL_L), lineColor: hot ? ORANGE : LINE });
    T(s, a, { x: x + 0.12, y: y0 + 0.12, w: bw - 0.24, h: 0.5, fontSize: 15, bold: true, color: hot ? WHITE : NAVY });
    T(s, b, { x: x + 0.12, y: y0 + 0.65, w: bw - 0.24, h: 0.4, fontSize: 12, color: hot ? WHITE : MUTED });
    if (i < 4) ARR(s, x + bw + 0.02, y0 + 0.58, x + bw + gap - 0.02, y0 + 0.58, TEAL, 2);
  });
  // callout under boom
  L(s, 6.1, 2.82, 6.1, 3.2, ORANGE, 1.5);
  RR(s, { x: 3.3, y: 3.2, w: 5.6, h: 1.0, fill: ORANGE_L, lineColor: ORANGE });
  T(s, [{ text: "The gap StarDust targets: ", options: { bold: true, color: "8A3B0F" } }, { text: "an overloaded or bypassed boom looks the same as a working one from the office. Crews visit on a schedule — sometimes too early, sometimes too late.", options: { color: INK } }],
    { x: 3.5, y: 3.28, w: 5.25, h: 0.85, fontSize: 14, valign: "middle" });

  // three evidence cards
  const cards = [
    ["≈ 5,000 t / yr", "plastic estimated to flow from Mumbai's waterways and nullahs to the Arabian Sea", "InnovateX Theme 3 brief (survey estimate quoted by organisers)"],
    ["₹14.5 crore", "2-year BMC contract (Jul 2026) to operate & maintain trash booms on six rivers/nullahs in the western suburbs", "Free Press Journal, 30 Jul 2026; booms commissioned Jul 2022 after NGT directions"],
    ["Visits misdirected", "Industry note: scheduled screen cleaning often visits clear screens and misses blocked ones; uncleared screens add flood risk", "Aquasition, trash-screen monitoring (2019)"],
  ];
  cards.forEach(([big, txt, src], i) => {
    const x = 0.5 + i * 4.15;
    RR(s, { x, y: 4.45, w: 3.95, h: 2.15, fill: BG2, lineColor: BG2 });
    T(s, big, { x: x + 0.2, y: 4.55, w: 3.6, h: 0.6, fontSize: 26, bold: true, color: i === 2 ? ORANGE : TEAL });
    T(s, txt, { x: x + 0.2, y: 5.15, w: 3.6, h: 0.9, fontSize: 13, color: INK });
    T(s, src, { x: x + 0.2, y: 6.1, w: 3.6, h: 0.45, fontSize: 10, italic: true, color: MUTED });
  });
  source(s, "Users: drainage engineer (reviews evidence) · clearance crew (inspects, clears) · asset owner / O&M contractor (pays for visits). Candidate area: Malad Creek catchment — outlet, barrier presence and permissions NOT yet surveyed.");
  s.addNotes(`[1:30 | Speaker 1]
Our specific source is floating packaging plastic — bottles, wrappers and film — carried by stormwater through drains and nullahs towards Mumbai's creeks. The organisers' brief quotes a survey estimate of about 5,000 tonnes a year leaving Mumbai's waterways into the Arabian Sea.

The city already responds with trash booms at outfalls. These were commissioned in July 2022 after National Green Tribunal directions, and in July 2026 the BMC Standing Committee approved a 14.5 crore, two-year contract just to operate and maintain booms on six rivers and nullahs in the western suburbs. So the infrastructure and the maintenance spend already exist. Reports across years give different site counts, so we do not quote a single number of booms.

The orange box is our problem. From the office, a boom that is overloaded, sagging or being bypassed looks exactly like one that is working. Maintenance is scheduled. A UK trash-screen monitoring supplier, Aquasition, describes the same pattern: scheduled cleaning is costly and often misdirected — crews visit clear screens and miss blocked ones, and an uncleared screen can itself raise flood risk.

Who feels this? The drainage engineer who has to assign crews, the crew itself, and the asset owner or O&M contractor who pays for each visit.

Our candidate investigation area is the Malad Creek catchment, which the brief itself names. To be clear: we have not surveyed an outlet, we have not confirmed a boom at a specific site, and we have no municipal permission or partnership. That is a next step, not a claim.

Likely objection — "Why not just look?": a worker can look, but only when they are there. StarDust records condition between visits and helps prioritise across several sites.

Sources: InnovateX brief; Free Press Journal 30 Jul 2026 (BMC Rs 14.5 cr contract); Aquasition 2019 note.
Transition: monitoring like this is not new — so what exists already?`);
}

// =====================================================================
// SLIDE 3 - Existing solutions & gap
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "EXISTING SOLUTIONS", "The sensors exist. Does combining them make better decisions?");
  const rows = [
    ["Method", "What it observes", "Already used?", "Where it falls short for drain booms"],
    ["Scheduled manual inspection", "Direct visual condition", "Yes — current practice", "Only at visit time; visits can be mistimed"],
    ["Single upstream level", "Water level rising", "Yes — commercial screens", "Rain or tide raise level with no debris"],
    ["Differential level (Δh)", "Head across screen", "Yes — Aquasition, AMETEK", "Built for fixed screens; tide/backwater confound; shallow booms give small Δh"],
    ["Camera monitoring", "Images of the screen", "Yes — commercial", "Needs a person to view; night, glare, no load info"],
    ["Mooring-line tension", "Mechanical load on boom", "Research — tank & field tests", "Flow speed alone changes load; mostly design studies, not alerts"],
    ["StarDust (proposed)", "Δh + tension + validity", "To be tested", "Must beat level-only & tension-only to justify itself"],
  ];
  const colW = [2.75, 2.4, 2.55, 4.6];
  const tbl = rows.map((r, i) => r.map((c, j) => ({
    text: c,
    options: {
      bold: i === 0 || j === 0, fontSize: i === 0 ? 13 : 13,
      color: i === 0 ? WHITE : (i === 6 ? (j === 0 ? WHITE : NAVY) : (j === 2 && i > 0 ? (c.startsWith("Yes") ? GREEN : PURPLE) : INK)),
      fill: { color: i === 0 ? NAVY : (i === 6 ? (j === 0 ? TEAL : TEAL_L) : (i % 2 ? WHITE : BG2)) },
      valign: "middle", margin: [3, 6, 3, 6],
    },
  })));
  s.addTable(tbl, { x: 0.5, y: 1.55, w: 12.3, colW, rowH: 0.5, border: { type: "solid", pt: 0.5, color: LINE } });
  // contribution band
  RR(s, { x: 0.5, y: 5.35, w: 6.0, h: 1.3, fill: BG2 });
  T(s, [{ text: "Not our claim", options: { bold: true, color: RED, breakLine: true } },
    { text: "ESP32, ultrasonic level, load cells or 'sensor fusion' being new. We found related products and research.", options: { color: INK } }],
    { x: 0.7, y: 5.45, w: 5.6, h: 1.1, fontSize: 14 });
  RR(s, { x: 6.8, y: 5.35, w: 6.0, h: 1.3, fill: TEAL_L, lineColor: TEAL });
  T(s, [{ text: "Our proposed contribution", options: { bold: true, color: TEAL, breakLine: true } },
    { text: "Site-calibrated decision logic that keeps fault and uncertainty states, and a fair test against level-only and tension-only monitoring.", options: { color: NAVY } }],
    { x: 7.0, y: 5.45, w: 5.6, h: 1.1, fontSize: 14 });
  source(s, "Aquasition (2019) trash-screen monitoring; AMETEK app note, differential measurement for traveling screens; IPT towing-tank trash-boom tests (IAHR); trash-net mooring studies (Ocean Engineering 2022, Fluids 2022). Full list in appendix.");
  s.addNotes(`[1:30 | Speaker 2]
Before anyone asks "what is new?", here is our honest answer.

Scheduled manual inspection is today's practice. Single level sensors and differential-level monitoring are already sold: Aquasition offers upstream/downstream level monitoring with SMS alarms for trash screens, and AMETEK publishes an application note using two pressure transmitters across a traveling screen to trigger cleaning. Cameras are also sold. Mooring and net tension has been studied — a Brazilian group at IPT tested a scale trash boom in a towing basin and found that line tension depends on flow speed and on how debris accumulates, and Ocean Engineering and Fluids papers model trash-net tension.

So the components and both measurement types exist. What we did not find is a low-cost retrofit for floating drain booms that reads both signals, keeps an explicit UNCERTAIN and FAULT state instead of guessing, and is tested fairly against using just one of those signals. That limited search is not a patent clearance.

Why might one signal not be enough? Level rises with rain and tide, not just debris. Tension rises with flow speed even on a clean boom. Each has its own confounder; together they may separate cases better — or they may not. That is the experiment.

Key line: "We are not claiming the sensors are new. We are testing whether combining them makes better inspection decisions, and we will publish the answer even if it is no."
Transition: here is how the system is built.`);
}

// =====================================================================
// SLIDE 4 - Architecture
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "HOW IT WORKS", "Two hydraulic + one mechanical reading → one evidence-based state");
  // ---- left: side elevation ----
  T(s, "Side view across the barrier", { x: 0.5, y: 1.5, w: 5.8, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  const gy = 5.4; // channel bed
  R(s, { x: 0.5, y: gy, w: 5.9, h: 0.25, fill: "B9C2CB" });
  // upstream water higher
  R(s, { x: 0.5, y: 3.75, w: 3.0, h: gy - 3.75, fill: WATER });
  R(s, { x: 3.5, y: 4.15, w: 2.9, h: gy - 4.15, fill: WATER_D });
  // boom float + skirt
  OV(s, { x: 3.32, y: 3.6, w: 0.36, h: 0.36, fill: ORANGE });
  R(s, { x: 3.46, y: 3.96, w: 0.08, h: 0.55, fill: "C25A1C" });
  // debris
  [[2.7, 3.62], [2.95, 3.66], [3.1, 3.6], [2.45, 3.66]].forEach(([a, b]) => OV(s, { x: a, y: b, w: 0.22, h: 0.14, fill: "8C96A3" }));
  // datum line
  L(s, 0.5, 2.1, 6.4, 2.1, MUTED, 1, { dashType: "dash" });
  T(s, "common surveyed datum", { x: 4.3, y: 1.85, w: 2.1, h: 0.25, fontSize: 10, color: MUTED, align: "right" });
  // sensors
  const sens = (x, lab) => { RR(s, { x: x - 0.3, y: 2.25, w: 0.6, h: 0.35, fill: TEAL, rectRadius: 0.04 }); T(s, lab, { x: x - 0.3, y: 2.25, w: 0.6, h: 0.35, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" }); };
  sens(1.3, "A"); sens(5.4, "B");
  L(s, 1.3, 2.62, 1.3, 3.72, TEAL, 1.25, { dashType: "sysDash", endArrowType: "triangle" });
  L(s, 5.4, 2.62, 5.4, 4.12, TEAL, 1.25, { dashType: "sysDash", endArrowType: "triangle" });
  T(s, "dA", { x: 1.38, y: 2.95, w: 0.4, h: 0.3, fontSize: 12, bold: true, color: TEAL });
  T(s, "dB", { x: 5.48, y: 3.15, w: 0.4, h: 0.3, fontSize: 12, bold: true, color: TEAL });
  // delta h marker
  L(s, 4.0, 3.75, 4.6, 3.75, NAVY, 1);
  L(s, 4.3, 3.76, 4.3, 4.14, NAVY, 1.25, { beginArrowType: "triangle", endArrowType: "triangle" });
  T(s, "Δh", { x: 4.4, y: 3.8, w: 0.5, h: 0.3, fontSize: 14, bold: true, color: NAVY });
  // mooring + load cell
  L(s, 3.5, 3.78, 0.75, 4.95, NAVY, 1.5);
  R(s, { x: 1.85, y: 4.33, w: 0.42, h: 0.24, fill: PURPLE, rotate: -23 });
  T(s, "load cell", { x: 2.1, y: 4.55, w: 1.3, h: 0.3, fontSize: 11, bold: true, color: PURPLE });
  OV(s, { x: 0.62, y: 4.92, w: 0.22, h: 0.22, fill: NAVY });
  ARR(s, 0.7, 3.2, 1.0, 3.2, TEAL, 2); T(s, "flow", { x: 0.55, y: 2.9, w: 0.6, h: 0.3, fontSize: 11, color: TEAL, bold: true });
  // equations
  RR(s, { x: 0.5, y: 5.85, w: 5.9, h: 0.8, fill: BG2 });
  T(s, [{ text: "h = z − d     Δh = hA − hB", options: { bold: true, color: NAVY, breakLine: true } },
    { text: "T [N] = k × (raw − zero offset)   — calibrated on the actual fixture", options: { color: MUTED, fontSize: 12 } }],
    { x: 0.7, y: 5.92, w: 5.6, h: 0.7, fontSize: 15 });

  // ---- right: block diagram ----
  T(s, "Data path", { x: 6.9, y: 1.5, w: 5.9, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  const inp = [["Level A — upstream", "ultrasonic, JSN-SR04T-class", TEAL_L, TEAL], ["Level B — downstream", "ultrasonic, sequential trigger", TEAL_L, TEAL], ["Mooring load cell → HX711", "24-bit bridge ADC, DOUT/SCK", PURPLE_L, PURPLE]];
  inp.forEach(([a, b, f, c], i) => {
    const y = 2.0 + i * 0.95;
    RR(s, { x: 6.9, y, w: 2.65, h: 0.78, fill: f, lineColor: c });
    T(s, a, { x: 7.0, y: y + 0.08, w: 2.5, h: 0.35, fontSize: 13, bold: true, color: NAVY });
    T(s, b, { x: 7.0, y: y + 0.43, w: 2.5, h: 0.3, fontSize: 11, color: MUTED });
    ARR(s, 9.57, y + 0.39, 9.95, 3.34, NAVY, 1.5);
  });
  RR(s, { x: 9.98, y: 2.0, w: 2.82, h: 2.68, fill: NAVY });
  T(s, [{ text: "ESP32", options: { bold: true, fontSize: 16, color: WHITE, breakLine: true } },
    { text: "timestamps & calibration", options: { bullet: true, breakLine: true } },
    { text: "range / stale / jump checks", options: { bullet: true, breakLine: true } },
    { text: "compare with clean baseline", options: { bullet: true, breakLine: true } },
    { text: "persistence rules → state", options: { bullet: true } }],
    { x: 10.1, y: 2.15, w: 2.62, h: 2.45, fontSize: 14, color: "DCE6F0", paraSpaceAfter: 8 });
  // outputs
  ARR(s, 11.39, 4.7, 11.39, 5.0, NAVY, 1.75);
  RR(s, { x: 9.98, y: 5.02, w: 2.82, h: 0.72, fill: TEAL_L, lineColor: TEAL });
  T(s, [{ text: "State + raw log + alert", options: { bold: true, color: NAVY, breakLine: true } }, { text: "microSD / laptop · LED/buzzer · Wi-Fi optional", options: { color: MUTED, fontSize: 11 } }], { x: 10.08, y: 5.07, w: 2.65, h: 0.65, fontSize: 13 });
  ARR(s, 9.96, 5.38, 9.6, 5.38, NAVY, 1.75);
  RR(s, { x: 6.9, y: 5.02, w: 2.68, h: 0.72, fill: ORANGE_L, lineColor: ORANGE });
  T(s, [{ text: "Human operator", options: { bold: true, color: "8A3B0F", breakLine: true } }, { text: "reviews · crew inspects · verifies recovery", options: { color: INK, fontSize: 11 } }], { x: 7.0, y: 5.07, w: 2.5, h: 0.65, fontSize: 13 });
  T(s, "Bench design. Field version needs rated load path, enclosure, power and permission.", { x: 6.9, y: 5.9, w: 5.9, h: 0.6, fontSize: 12, italic: true, color: MUTED });
  s.addNotes(`[1:30 | Speaker 2]
Left is a side view across the barrier. Debris piling against the boom can hold water back, so the upstream surface sits higher than the downstream one. That height difference is delta-h.

The two ultrasonic sensors measure distance down to the water, d-A and d-B — not water height. Because brackets are never at exactly the same height, each sensor's elevation is surveyed to one common datum. Water elevation h = z minus d, and delta-h = h-A minus h-B. Subtracting raw distances would give the wrong answer if mounts differ.

The second signal is mechanical: a load cell in one mooring line measures the pull the boom puts on its anchor. The HX711 is a 24-bit bridge amplifier that turns the tiny load-cell signal into digital samples for the ESP32. Tension in newtons = calibration factor times raw reading minus zero offset, calibrated through the real fixture with known weights. Kilograms of mass and newtons of force are not interchangeable — and tension does not tell us plastic weight.

Right is the data path, exactly as built for the bench: Level A and B triggered one after the other to avoid acoustic cross-talk, load through the HX711, into the ESP32. The ESP32 timestamps, applies calibration, checks validity — out of range, stale, impossible jumps — compares with a clean-barrier baseline and applies persistence rules. Output is a state, the raw log, and a local alert. Wi-Fi is optional; local logging continues if the network drops.

The final block is a person. The engineer reviews, the crew inspects and clears, and recovery is verified. StarDust never opens the boom, never removes waste.

Engineering honesty: JSN-SR04T 5 V echo needs level shifting for the 3.3 V ESP32; a hobby bar load cell is not a rated marine tension link; one monitored line does not certify the whole structure.
Transition: the hard part is deciding what those readings mean.`);
}

// =====================================================================
// SLIDE 5 - Decision logic
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "DECISION LOGIC & RELIABILITY", "Evidence, not diagnosis: StarDust is allowed to say “uncertain”");
  const box = (x, y, w, h, text, fill, color, lc, fs) => { RR(s, { x, y, w, h, fill, lineColor: lc || fill }); T(s, text, { x: x + 0.08, y, w: w - 0.16, h, fontSize: fs || 13, bold: true, color: color || NAVY, align: "center", valign: "middle" }); };
  const dia = (x, y, w, h, text) => { s.addShape(pres.shapes.DIAMOND, { x, y, w, h, fill: { color: WHITE }, line: { color: NAVY, width: 1.5 } }); T(s, text, { x: x + 0.15, y, w: w - 0.3, h, fontSize: 12, bold: true, color: NAVY, align: "center", valign: "middle" }); };
  box(0.5, 1.65, 2.3, 0.7, "Read A, B, load\n+ calibrate", BG2, NAVY, LINE);
  ARR(s, 2.82, 2.0, 3.25, 2.0);
  dia(3.27, 1.5, 2.1, 1.0, "Data valid?");
  ARR(s, 5.39, 2.0, 5.85, 2.0);
  T(s, "yes", { x: 5.4, y: 1.7, w: 0.45, h: 0.25, fontSize: 11, color: GREEN, bold: true });
  dia(5.87, 1.5, 2.3, 1.0, "Inside tested conditions?");
  ARR(s, 8.19, 2.0, 8.6, 2.0);
  T(s, "yes", { x: 8.2, y: 1.7, w: 0.45, h: 0.25, fontSize: 11, color: GREEN, bold: true });
  box(8.62, 1.65, 2.4, 0.7, "Compare to baseline\n+ persistence", BG2, NAVY, LINE);
  // no branches
  ARR(s, 4.32, 2.52, 4.32, 3.0, RED); T(s, "no", { x: 4.4, y: 2.55, w: 0.4, h: 0.25, fontSize: 11, color: RED, bold: true });
  box(3.37, 3.02, 1.9, 0.6, "FAULT", RED_L, RED, RED, 15);
  ARR(s, 7.02, 2.52, 7.02, 3.0, PURPLE); T(s, "no", { x: 7.1, y: 2.55, w: 0.4, h: 0.25, fontSize: 11, color: PURPLE, bold: true });
  box(6.02, 3.02, 2.0, 0.6, "UNCERTAIN", PURPLE_L, PURPLE, PURPLE, 15);
  // outcomes
  ARR(s, 9.82, 2.37, 9.82, 2.85);
  box(8.62, 2.87, 2.4, 0.5, "NORMAL", GREEN_L, GREEN, GREEN, 14);
  box(8.62, 3.45, 2.4, 0.5, "WATCH", "FFF4D6", "8A6A00", "D9A400", 14);
  box(8.62, 4.03, 2.4, 0.6, "INSPECTION REQUEST", ORANGE, WHITE, ORANGE, 14);
  T(s, "one signal shifts", { x: 11.1, y: 3.5, w: 1.75, h: 0.4, fontSize: 11, color: MUTED });
  T(s, "both valid signals, sustained change", { x: 11.1, y: 4.03, w: 1.75, h: 0.6, fontSize: 11, color: MUTED });
  T(s, "near baseline", { x: 11.1, y: 2.92, w: 1.75, h: 0.4, fontSize: 11, color: MUTED });
  // independent lane
  RR(s, { x: 0.5, y: 3.9, w: 7.55, h: 0.75, fill: WHITE, lineColor: ORANGE, lw: 1.5 });
  T(s, [{ text: "Independent lane: ", options: { bold: true, color: ORANGE } }, { text: "a valid high-water OR high-load limit raises its own warning — even if the other sensor is faulty. A broken sensor never silences a good one.", options: { color: INK } }],
    { x: 0.65, y: 3.93, w: 7.3, h: 0.7, fontSize: 13, valign: "middle" });
  // confounding example + boundary
  RR(s, { x: 0.5, y: 4.95, w: 7.55, h: 1.65, fill: BG2 });
  T(s, "Why one signal can mislead (illustrative, not measured)", { x: 0.7, y: 5.02, w: 7.2, h: 0.3, fontSize: 13, bold: true, color: NAVY });
  T(s, [
    { text: "Flow surge, clean boom: ", options: { bold: true, color: PURPLE } }, { text: "tension rises, Δh barely moves → WATCH, not inspection.", options: { breakLine: true } },
    { text: "High tide / backwater: ", options: { bold: true, color: PURPLE } }, { text: "both levels rise, Δh can shrink, tension steady → UNCERTAIN.", options: { breakLine: true } },
    { text: "Debris build-up: ", options: { bold: true, color: ORANGE } }, { text: "Δh and tension both stay high for the persistence window → INSPECTION REQUEST.", options: {} },
  ], { x: 0.7, y: 5.35, w: 7.2, h: 1.2, fontSize: 13, color: INK, paraSpaceAfter: 3 });
  RR(s, { x: 8.4, y: 4.95, w: 4.4, h: 1.65, fill: RED_L });
  T(s, [{ text: "System boundary — StarDust does NOT", options: { bold: true, color: RED, breakLine: true } },
    { text: "remove waste or open the boom", options: { bullet: true, breakLine: true } },
    { text: "identify plastic or weigh it", options: { bullet: true, breakLine: true } },
    { text: "guarantee flood prevention", options: { bullet: true, breakLine: true } },
    { text: "use un-validated thresholds or AI", options: { bullet: true } }],
    { x: 8.55, y: 5.02, w: 4.15, h: 1.55, fontSize: 13, color: INK });
  s.addNotes(`[1:30 | Speaker 3]
This is the most important engineering slide, because a sensor reading is evidence, not a diagnosis.

Every cycle starts with reading both levels and the load, and applying calibration. First question: is the data valid? Out of range, stale, impossible jump, disconnected — that becomes FAULT, logged with a reason. We never replace a failed reading with zero and call it normal.

Second: are we inside the conditions we actually tested — known flow direction, known regime? If not, for example tidal reversal, the honest answer is UNCERTAIN, and a person checks.

Only then do we compare with the clean-barrier baseline and apply a persistence window, so a short spike is not an alarm. Near baseline: NORMAL. One signal shifts alone: WATCH. Both valid signals show a sustained change: INSPECTION REQUEST — which means "suspected blockage, go and look", not "confirmed blockage".

The orange lane matters for safety. If valid water level or valid load crosses its own limit, that warning goes out on its own. A faulty level sensor must not suppress a valid high-load warning.

The grey box gives the confounding cases. A flow surge on a clean boom raises tension because drag rises with flow — Δh barely moves, so WATCH, not inspection. High tide or backwater raises both levels and can shrink Δh with no new debris — UNCERTAIN. Debris build-up should push both, sustained. These are the expected behaviours we will test; they are not measured results. Requiring both signals may cut false alarms but miss some events — that trade-off is measured, not assumed.

Boundary: StarDust does not clear waste, open the boom, identify or weigh plastic, or guarantee flood prevention. Thresholds and persistence times come from calibration; none are validated yet. No machine learning — transparent rules.
Transition: so how do we prove it?`);
}

// =====================================================================
// SLIDE 6 - Validation, feasibility, cost
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "VALIDATION PLAN · FEASIBILITY · COST", "A ₹9,950 bench rig that can prove — or disprove — the idea");
  // rig schematic
  T(s, "Tabletop recirculating channel (planned)", { x: 0.5, y: 1.5, w: 6.2, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  R(s, { x: 0.7, y: 2.2, w: 5.6, h: 0.75, fill: WATER, lineColor: TEAL });
  s.addShape(pres.shapes.LINE, { x: 2.9, y: 2.2, w: 0.2, h: 0.75, line: { color: ORANGE, width: 5 } });
  R(s, { x: 5.85, y: 2.45, w: 0.12, h: 0.5, fill: NAVY });
  T(s, "boom", { x: 2.55, y: 1.92, w: 0.9, h: 0.25, fontSize: 11, color: ORANGE, bold: true, align: "center" });
  T(s, "weir", { x: 5.55, y: 1.92, w: 0.7, h: 0.25, fontSize: 11, color: NAVY, bold: true, align: "center" });
  [["A", 1.6], ["B", 4.4]].forEach(([l, x]) => { RR(s, { x, y: 1.88, w: 0.4, h: 0.28, fill: TEAL, rectRadius: 0.03 }); T(s, l, { x, y: 1.88, w: 0.4, h: 0.28, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle" }); });
  RR(s, { x: 2.5, y: 3.45, w: 2.2, h: 0.5, fill: BG2, lineColor: LINE });
  T(s, "reservoir + pump", { x: 2.5, y: 3.45, w: 2.2, h: 0.5, fontSize: 12, bold: true, color: NAVY, align: "center", valign: "middle" });
  ARR(s, 6.3, 2.95, 4.72, 3.62, TEAL, 1.5, "dash"); ARR(s, 2.48, 3.62, 0.8, 2.97, TEAL, 1.5, "dash");
  // test sequence
  const tests = [["A", "Clean flow", "baseline"], ["B", "Add debris", "same flow"], ["C", "Change flow", "clean boom"], ["D", "Backwater", "raise weir"], ["E", "Fault + recovery", "unplug, clear"]];
  tests.forEach(([k, a, b], i) => {
    const x = 0.5 + i * 1.25;
    chip(s, x + 0.4, 4.2, k, i === 1 ? ORANGE : (i === 4 ? RED : NAVY));
    T(s, a, { x, y: 4.68, w: 1.22, h: 0.3, fontSize: 12, bold: true, color: NAVY, align: "center" });
    T(s, b, { x, y: 4.98, w: 1.22, h: 0.3, fontSize: 11, color: MUTED, align: "center" });
  });
  RR(s, { x: 0.5, y: 5.45, w: 6.2, h: 1.15, fill: TEAL_L });
  T(s, [{ text: "Fair comparison: ", options: { bold: true, color: TEAL } }, { text: "freeze rules first, then run level-only, tension-only and combined StarDust on the same held-out runs. Ground truth set independently (photos, rulers, known debris), never by StarDust itself. 60-run matrix in appendix.", options: { color: NAVY } }],
    { x: 0.65, y: 5.52, w: 5.9, h: 1.0, fontSize: 13 });

  // right: metrics
  T(s, "What we will report", { x: 7.1, y: 1.5, w: 5.7, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  const mets = ["False-positive rate", "Missed-event rate", "Detection delay", "Uncertain-output rate", "Valid-data fraction"];
  mets.forEach((m, i) => {
    const x = 7.1 + (i % 3) * 1.93, y = 1.95 + Math.floor(i / 3) * 0.48;
    pill(s, x, y, 1.83, m, i < 2 ? ORANGE_L : TEAL_L, i < 2 ? "8A3B0F" : NAVY, 11);
  });
  // budget mini-table
  const b = [["Bench item (planning allowance)", "INR"], ["ESP32, 2 level modules, load cell, HX711, logging, wiring", "3,400"], ["Transparent channel + leak containment", "1,800"], ["Pump, hoses, reservoir", "1,700"], ["Boom, mooring, frame · weir · reference tools · misc", "1,750"], ["Base total", "8,650"], ["15% reserve → planned total (rounded)", "9,950"]];
  s.addTable(b.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 12, bold: i === 0 || i >= 5, color: i === 0 ? WHITE : (i === 6 ? WHITE : INK), fill: { color: i === 0 ? NAVY : (i === 6 ? TEAL : (i % 2 ? WHITE : BG2)) }, align: j ? "right" : "left", valign: "middle", margin: [2, 6, 2, 6] } }))),
    { x: 7.1, y: 3.05, w: 5.7, colW: [4.7, 1.0], rowH: 0.36, border: { type: "solid", pt: 0.5, color: LINE } });
  RR(s, { x: 7.1, y: 5.75, w: 5.7, h: 0.85, fill: ORANGE_L });
  T(s, [{ text: "Go / no-go gate: ", options: { bold: true, color: ORANGE } }, { text: "if Δh and tension changes are not clearly bigger than sensor noise, or combined logic does not beat the simpler methods, we simplify or stop.", options: { color: INK } }],
    { x: 7.25, y: 5.8, w: 5.45, h: 0.78, fontSize: 12, valign: "middle" });
  source(s, "Budget = engineering planning estimates, not supplier quotes; borrowed laptop and tools assumed; excludes any field installation. All tests are PLANNED — no results yet.");
  s.addNotes(`[1:25 | Speaker 3]
Here is how we turn the idea into evidence.

The planned rig is a tabletop recirculating channel: reservoir and pump, a transparent channel, a model boom on a model mooring with the load cell, sensors A and B, and an adjustable weir at the end so we can create downstream backwater on purpose.

Five test conditions. A: clean flow, to set the baseline. B: add controlled, retrievable debris at the same flow. C: the trap — reset to a clean boom and change only the flow, to see whether anything falsely calls a blockage. D: raise the weir for backwater. E: unplug a sensor, add stale data, then clear the debris and check that readings recover.

The fairness rule: we fix all three decision methods — level-only, tension-only and combined — before evaluation, then run them on the same held-out runs. Ground truth comes from our own photos, rulers and known debris amounts, never from StarDust's output. The full matrix is three debris states, two flows, two downstream settings, five repeats — 60 runs — in the appendix.

We will report false-positive rate, missed-event rate, detection delay, how often the system says uncertain, and the fraction of valid data — with raw counts, not just percentages.

Cost: the bench rig is budgeted at 8,650 rupees base plus 15% reserve, 9,947.50, rounded to 9,950. These are planning allowances, not supplier quotes, and assume a borrowed laptop. This is not a municipal installation price — field cost needs rated sensors, enclosure, power, installation and servicing, quoted per site.

Go / no-go: first, the changes must be clearly larger than sensor uncertainty. Second, combined logic must beat the simpler methods. If not, we simplify — and that is still a useful answer for a city.
Transition: if it passes, here is the route to real impact.`);
}

// =====================================================================
// SLIDE 7 - Impact, scalability, close
// =====================================================================
{
  const s = pres.addSlide({ masterName: "CONTENT" });
  header(s, "IMPACT & SCALABILITY", "Bench evidence → one measured pilot → scale only what works");
  const st = [["Bench verification", "rig + 3-method test"], ["Permitted site survey", "Malad catchment candidate"], ["One-site pilot", "with named operator"], ["Measured evaluation", "vs baseline period"], ["Potential expansion", "per-site calibration"]];
  st.forEach(([a, b], i) => {
    const x = 0.5 + i * 2.5;
    s.addShape(pres.shapes.CHEVRON, { x, y: 1.55, w: 2.45, h: 0.95, fill: { color: i === 0 ? TEAL : (i === 4 ? BG2 : TEAL_L) }, line: { color: i === 4 ? LINE : TEAL, width: 0.75 } });
    T(s, a, { x: x + 0.35, y: 1.6, w: 1.85, h: 0.45, fontSize: 13, bold: true, color: i === 0 ? WHITE : NAVY, align: "center", valign: "middle" });
    T(s, b, { x: x + 0.35, y: 2.03, w: 1.85, h: 0.4, fontSize: 11, color: i === 0 ? "E6F6F7" : MUTED, align: "center", valign: "middle" });
  });
  T(s, "Each arrow is a gate: we move right only on evidence. Nothing beyond stage 1 is arranged yet.", { x: 0.5, y: 2.6, w: 12.3, h: 0.3, fontSize: 12, italic: true, color: MUTED });

  // workflow loop
  T(s, "Operator workflow", { x: 0.5, y: 3.05, w: 6, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  const wf = ["Condition flag", "Engineer review", "Crew inspection", "Clear if needed", "Recovery verified"];
  wf.forEach((w, i) => {
    const y = 3.5 + i * 0.6;
    RR(s, { x: 0.5, y, w: 2.9, h: 0.46, fill: i === 0 ? ORANGE : (i === 4 ? GREEN_L : BG2), lineColor: i === 0 ? ORANGE : (i === 4 ? GREEN : LINE) });
    T(s, `${i + 1}  ${w}`, { x: 0.65, y, w: 2.7, h: 0.46, fontSize: 13, bold: true, color: i === 0 ? WHITE : NAVY, valign: "middle" });
    if (i < 4) ARR(s, 1.95, y + 0.47, 1.95, y + 0.59, NAVY, 1.25);
  });
  T(s, "Unresolved conditions stay open. An acknowledgement is not proof of clearance.", { x: 3.6, y: 5.6, w: 2.8, h: 0.9, fontSize: 12, italic: true, color: MUTED });
  // measured
  T(s, "What a pilot will actually measure", { x: 3.6, y: 3.05, w: 4.5, h: 0.35, fontSize: 15, bold: true, color: NAVY });
  T(s, [
    { text: "Alert-to-inspection time (min)", options: { bullet: true, breakLine: true } },
    { text: "Inspections & unnecessary visits", options: { bullet: true, breakLine: true } },
    { text: "False alerts & missed events", options: { bullet: true, breakLine: true } },
    { text: "Plastic weighed independently (kg)", options: { bullet: true, breakLine: true } },
    { text: "Disposal destination", options: { bullet: true, breakLine: true } },
    { text: "Operating & servicing cost", options: { bullet: true } },
  ], { x: 3.6, y: 3.45, w: 4.6, h: 2.1, fontSize: 13, color: INK, paraSpaceAfter: 2 });
  // value
  RR(s, { x: 8.4, y: 3.05, w: 4.4, h: 1.7, fill: TEAL_L });
  T(s, [{ text: "Prospective value (to be measured)", options: { bold: true, color: TEAL, breakLine: true } },
    { text: "Better-timed visits across many booms", options: { bullet: true, breakLine: true } },
    { text: "Booms kept intercepting during storms", options: { bullet: true, breakLine: true } },
    { text: "An evidence trail for O&M contracts", options: { bullet: true, breakLine: true } },
    { text: "Scales by per-site calibration, not one threshold", options: { bullet: true } }],
    { x: 8.55, y: 3.12, w: 4.15, h: 1.9, fontSize: 13, color: NAVY, paraSpaceAfter: 2 });
  // close
  RR(s, { x: 8.4, y: 4.95, w: 4.4, h: 1.65, fill: NAVY });
  T(s, "We are not promising a cleaner sea. We are offering a cheap, testable way to know when a boom needs a crew — and the evidence to decide if it is worth it.", { x: 8.55, y: 5.0, w: 4.15, h: 1.55, fontSize: 15, bold: true, color: WHITE, valign: "middle" });
  s.addNotes(`[1:05 | Speaker 4]
If StarDust passes the bench, here is the route — and every arrow is a gate.

Stage one is bench verification with the three-method comparison. Stage two, a permitted site survey in the Malad Creek catchment: confirm there is an existing boom, safe bank access, a named crew and that the signals are measurable there. Stage three, one pilot with a named operator. Stage four, measured evaluation against a comparable baseline period, accounting for rain and collection effort. Only then, expansion — each site calibrated, never one universal threshold. Nothing beyond stage one is arranged yet.

The workflow keeps a human in charge: condition flag, engineer reviews the evidence, crew inspects, clears if needed, and the readings must recover before the case closes. An acknowledgement is not proof of clearance.

What we will measure: alert-to-inspection time, inspections and unnecessary visits, false alerts and missed events, plastic weighed independently with its disposal destination, and operating and servicing cost. We will not credit StarDust for all plastic the boom catches — only for any extra that better maintenance can be shown to add.

The value is prospective: better-timed visits across many booms, booms kept working through storms, and an evidence trail for O&M contracts like the one BMC just awarded. If a site is always staffed, the value may be low — and the pilot would show that.

Closing line: "We are not promising a cleaner sea. We are offering a cheap, testable way to know when a boom needs a crew — and the evidence to decide if it is worth it. Thank you."`);
}

// =====================================================================
// APPENDIX
// =====================================================================
function appx(title, kicker) { const s = pres.addSlide({ masterName: "CONTENT" }); header(s, "APPENDIX · " + kicker, title, PURPLE); return s; }
const tblOpts = (rows, hdr = NAVY) => rows.map((r, i) => r.map((c) => ({ text: c, options: { fontSize: 12, bold: i === 0, color: i === 0 ? WHITE : INK, fill: { color: i === 0 ? hdr : (i % 2 ? WHITE : BG2) }, valign: "middle", margin: [3, 6, 3, 6] } })));

{
  const s = appx("Sensor and controller interfaces (bench)", "A1 HARDWARE");
  const rows = [["Block", "Interface", "Design note (to verify)"],
    ["Level A / B: JSN-SR04T-class ultrasonic", "TRIG / ECHO GPIO, triggered one after the other", "5 V echo → divider or level shifter for 3.3 V ESP32; check blind zone & beam footprint"],
    ["Load cell + HX711", "DOUT / SCK (2-wire serial)", "Fixture sets loading direction; capacity & overload stop; zero/span, creep checks"],
    ["ESP32 dev board", "3.3 V logic, Wi-Fi optional", "Timestamps, sequence numbers, validity flags, state machine"],
    ["Logging", "microSD over SPI, or USB serial to laptop", "Raw + calibrated values, rule & calibration version"],
    ["Local indication", "GPIO → LED / buzzer (driver if needed)", "Shows state and reason"],
    ["Power (bench)", "Protected USB supply, common ground", "Pump on separate appropriate supply; spill containment"]];
  s.addTable(tblOpts(rows), { x: 0.5, y: 1.55, w: 12.3, colW: [3.5, 3.8, 5.0], rowH: 0.52, border: { type: "solid", pt: 0.5, color: LINE } });
  RR(s, { x: 0.5, y: 5.4, w: 12.3, h: 1.2, fill: BG2 });
  T(s, [{ text: "Worked example (illustrative): ", options: { bold: true, color: NAVY } }, { text: "zA = 2.00 m, dA = 0.80 m → hA = 1.20 m;  zB = 2.10 m, dB = 1.00 m → hB = 1.10 m;  Δh = 0.10 m. Raw dA − dB = −0.20 m would be wrong. Combined level uncertainty first estimate ≈ √(uA² + uB²); a Δh inside that is not meaningful.", options: { color: INK } }],
    { x: 0.7, y: 5.48, w: 11.9, h: 1.05, fontSize: 13, valign: "middle" });
  s.addNotes("Backup for hardware questions. All part choices are bench candidates, not final field selections. Numbers in the worked example are a calculation demo, not thresholds or results.");
}
{
  const s = appx("Prior art we checked — and what each shows", "A2 REFERENCES");
  const rows = [["Source", "What it establishes", "Limit of use"],
    ["InnovateX 2026-27 brief (Techfest, IIT Bombay)", "Theme 3 scope, Round 1 content, 10-min pitch, ~5,000 t/yr estimate", "Organiser-quoted estimate, original survey not cited"],
    ["Aquasition (2019) trash-screen monitoring", "Single & differential level + camera monitoring with alarms exists", "Vendor page; fixed screens, UK context"],
    ["AMETEK app note: differential measurement, traveling screen", "Two transmitters across screen → differential alarm / auto-clean", "Industrial intake screens, not floating booms"],
    ["IPT towing-basin trash-boom tests (IAHR library)", "Line tension depends on flow speed and debris accumulation", "Scale model; abstract-level access"],
    ["Ocean Engineering (2022) trash-net mooring study", "Mooring / net loads modelled for trash-blocking nets", "Abstract only (full text not accessed)"],
    ["Fluids (2022) trash-blocking net model", "Net tension rises with width & solidity", "Numerical + lab validation"],
    ["Free Press Journal, 30 Jul 2026", "BMC ₹14.5 cr, 2-yr O&M contract for booms on 6 rivers/nullahs", "News report; no site list"],
    ["JSN-SR04T & HX711 datasheets (robu.in)", "Component interfaces and ranges", "Supplier documents, not field durability"]];
  s.addTable(tblOpts(rows, PURPLE), { x: 0.5, y: 1.55, w: 12.3, colW: [4.1, 4.6, 3.6], rowH: 0.52, border: { type: "solid", pt: 0.5, color: LINE } });
  s.addNotes(`URLs:
https://www.aquasition.co.uk/2019/11/10/trash-screen-monitoring-systems/
https://www.ametekusg.com/learningzone/application-notes/differential-measurement-traveling-screen
https://www.iahr.org/library/info?pid=21351
https://www.sciencedirect.com/science/article/abs/pii/S002980182202827X
https://doaj.org/article/94350f750211417eae0115e5f3502121
https://www.freepressjournal.in/mumbai/mumbai-bmc-approves-145-crore-contract-to-maintain-trash-boom-systems-across-6-rivers-and-nullahs
https://robu.in/wp-content/uploads/2019/10/JSN-SR04T-2.0.pdf
https://robu.in/wp-content/uploads/2024/04/R101046-HX711.pdf
https://techfest.org/competitions/innovatex`);
}
{
  const s = appx("Test matrix and metric definitions", "A3 VALIDATION");
  const rows = [["Factor", "Levels", "Count"], ["Debris state", "clean · partial · heavy (retrievable sample debris)", "3"], ["Flow setting", "low · high (checked independently)", "2"], ["Downstream boundary", "free · raised weir (backwater)", "2"], ["Repeats", "physically reset, randomised order", "5"], ["Evaluation runs", "held-out, rules frozen beforehand", "60"]];
  s.addTable(tblOpts(rows), { x: 0.5, y: 1.55, w: 6.2, colW: [1.9, 3.6, 0.7], rowH: 0.5, border: { type: "solid", pt: 0.5, color: LINE } });
  T(s, "Plus separate fault-injection and recovery runs (test E). Calibration runs are kept apart from evaluation runs.", { x: 0.5, y: 4.7, w: 6.2, h: 0.7, fontSize: 13, color: MUTED, italic: true });
  const m = [["Metric", "Definition"], ["False-positive rate", "FP / (FP + TN)"], ["Missed-event rate", "FN / (FN + TP)"], ["Detection delay", "event onset → qualifying alert"], ["Uncertain-output rate", "UNCERTAIN outputs / all outputs"], ["Valid-data fraction", "valid samples / expected samples"]];
  s.addTable(tblOpts(m, TEAL), { x: 7.1, y: 1.55, w: 5.7, colW: [2.3, 3.4], rowH: 0.5, border: { type: "solid", pt: 0.5, color: LINE } });
  T(s, "Report raw counts and run conditions. Abstentions are not counted as correct. A 60-run bench test cannot support universal accuracy claims.", { x: 7.1, y: 4.7, w: 5.7, h: 0.9, fontSize: 13, color: MUTED, italic: true });
  s.addNotes("This is a plan, not completed work. If time permits only a subset, report exactly which subset.");
}
{
  const s = appx("Budget assumptions and what is excluded", "A4 COST");
  const rows = [["Bench planning item", "INR"], ["ESP32, two level modules, load cell, HX711, logging, wiring, sensor fixtures", "3,400"], ["Transparent channel + leak containment", "1,800"], ["Pump, hoses and reservoir", "1,700"], ["Model boom, mooring and frame", "650"], ["Adjustable weir / downstream level control", "350"], ["Reference rulers, weights and flow check", "450"], ["Fabrication and miscellaneous", "300"], ["Base total", "8,650"], ["15% reserve", "1,297.50"], ["Planned total (rounded from 9,947.50)", "9,950"]];
  s.addTable(rows.map((r, i) => r.map((c, j) => ({ text: c, options: { fontSize: 12, bold: i === 0 || i >= 8, color: i === 0 || i === 10 ? WHITE : INK, fill: { color: i === 0 ? NAVY : (i === 10 ? TEAL : (i % 2 ? WHITE : BG2)) }, align: j ? "right" : "left", margin: [3, 6, 3, 6] } }))),
    { x: 0.5, y: 1.55, w: 7.4, colW: [6.2, 1.2], rowH: 0.42, border: { type: "solid", pt: 0.5, color: LINE } });
  RR(s, { x: 8.3, y: 1.55, w: 4.5, h: 4.6, fill: ORANGE_L });
  T(s, [{ text: "Not included (field costs, quote per site)", options: { bold: true, color: "8A3B0F", breakLine: true } },
    { text: "Field-rated sensors and marine tension link", options: { bullet: true, breakLine: true } },
    { text: "Enclosure, corrosion protection, mounting", options: { bullet: true, breakLine: true } },
    { text: "Power (solar/battery) and communication", options: { bullet: true, breakLine: true } },
    { text: "Survey, installation, commissioning", options: { bullet: true, breakLine: true } },
    { text: "Cleaning, recalibration, replacement visits", options: { bullet: true, breakLine: true } },
    { text: "Crew time for handling alerts", options: { bullet: true, breakLine: true } },
    { text: "Planning ceiling ₹12,000 → ~₹2,050 headroom.", options: { bold: true, color: NAVY } }],
    { x: 8.5, y: 1.7, w: 4.15, h: 4.3, fontSize: 13, color: INK, paraSpaceAfter: 4 });
  s.addNotes("Value equation for discussion only: annual avoided unnecessary visits + documented avoided downtime − annualised installed cost − added service cost. No numbers are claimed because none are measured.");
}
{
  const s = appx("Limitations and deployment risks", "A5 RISKS");
  const rows = [["Risk", "Consequence", "Planned response"],
    ["Foam, spray, turbulence under ultrasonic", "Invalid or wrong range", "Validity flags, mounting checks, challenge tests"],
    ["Bracket / datum movement", "False Δh", "Survey reference checks, recalibrate after remount"],
    ["Load-cell drift, fixture friction", "Wrong tension", "Zero/span, creep, hysteresis checks"],
    ["Slack or shifted mooring", "Misleading load", "UNCERTAIN state + physical inspection"],
    ["Tide, backwater, reverse flow", "Ambiguous hydraulics", "Site-specific operating envelope → UNCERTAIN"],
    ["Shallow or angled boom", "Δh too small to measure", "Gate A: stop if inside uncertainty"],
    ["Network / power / SD failure", "Stale or missing data", "Local buffer, stale flag, fault record"],
    ["Corrosion, fouling (field)", "Drift, lost access", "Field-rated materials; service interval TBD"],
    ["No crew available", "Alert causes no action", "Agree responsibility before any pilot"]];
  s.addTable(tblOpts(rows, RED), { x: 0.5, y: 1.55, w: 12.3, colW: [4.2, 3.0, 5.1], rowH: 0.48, border: { type: "solid", pt: 0.5, color: LINE } });
  s.addNotes("No maintenance interval, battery autonomy, enclosure rating or structural rating has been established.");
}

pres.writeFile({ fileName: process.argv[2] || "StarDust_InnovateX_Round1_Deck.pptx" }).then((f) => console.log("wrote", f));
