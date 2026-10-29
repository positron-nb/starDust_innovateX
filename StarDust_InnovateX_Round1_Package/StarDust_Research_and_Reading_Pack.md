# StarDust: research and reading pack

Key: **[Published]** = external source · **[Design]** = our proposal · **[Illustrative]** = example only.

## 1. Competition requirements (verified from the supplied brief)

- **Theme 3:** monitor, intercept and reduce plastic leakage into Mumbai's coastal and urban drainage networks, addressing a specific source.
- **Round 1:** a physical concept pitch at the regional zonal centre covering team information, problem statement, background and existing solutions, proposed solution, and impact and scalability. Each team gets **10 minutes**. The top five per zonal centre qualify.
- **Team size:** up to 4 members.
- **Final report:** due **1 December 2026**. Finals are 15–18 December 2026 at IIT Bombay.
- **Evaluation criteria** (no weights published): creativity and novelty; functionality and usability; cost and market value; technical feasibility; regional scalability; environmental and socioeconomic impact; design and ergonomics; and a bonus for a problem-centric approach.

**Inconsistency to resolve:** the brief says both "You do not need to make any submissions for Round 1" and "Participants must submit their Abstract Submission … on the website". The team leader must check the portal's Doubt section.

**Website check:** `techfest.org/competitions/innovatex` is rendered by JavaScript, and our fetch returned only the page title, so we could not verify the brief against the live page. No word limit, date or format has been verified, and none is invented in this pack.

## 2. Local context [Published]

- **Plastic volume:** the brief quotes a survey estimate of ~5,000 t/yr of plastic flowing from Mumbai's waterways and nullahs to the Arabian Sea. The primary survey is not cited.
- **BMC contract:** the BMC approved a ₹14.5 crore, 2-year O&M contract for trash booms on six rivers and nullahs near the mangrove belts of the western suburbs. The booms were commissioned in July 2022 after NGT directions. The article gives no site list and does not mention Malad. (Free Press Journal, 30 Jul 2026.)
- **Site counts vary:** other reports differ, ranging from 21 outfalls (Outlook) to 8 listed locations (Hindustan Times 2022, incl. Mogra, Oshiwara, Poisar, Dahisar, Vakola and Mithi at BKC). Do not quote a single count.
- **Effectiveness is contested:** environmentalists question cost and effectiveness (Citizen Matters).

## 3. Existing approaches [Published]

| Approach | Source | Takeaway |
|---|---|---|
| Single or differential level, plus camera, for trash screens | Aquasition 2019 | Differential level monitoring with SMS alarms already exists. Planned cleaning is described as "often misdirected". |
| Differential pressure across a traveling screen | AMETEK application note | Two transmitters at equal height; a set-point triggers an alarm or automatic cleaning. |
| Trash-boom tank tests | IPT towing basin (IAHR library) | Line tension depends on flow velocity and debris accumulation. |
| Trash-net tension models | Fluids 2022; Ocean Engineering 2022 (abstract only) | Tension rises with net width and solidity. |
| Field boom tension | KRISO (Korean, 2002) | Tension was measured under fast currents. |

## 4. Technical principles [Design]

- **Water level:** a sensor reads the distance d to the water surface. Water elevation is h = z − d, where z is the sensor's elevation surveyed to a common datum. The level difference across the barrier is Δh = hA − hB.
- **Level uncertainty:** a first estimate of the combined uncertainty is √(uA² + uB²), assuming independent errors. Mounting bias needs a separate check.
- **Tension:** T = k × (raw − offset), in newtons, calibrated through the real fixture. The HX711 is a 24-bit bridge ADC with a 2-wire DOUT/SCK interface.
- **Why combine signals:** each signal has its own confounder. Level is affected by tide, rain and backwater. Tension is affected by flow speed and anchor geometry. Combining them may separate debris from those causes, and the test checks whether it does.
- **System states:** NORMAL, WATCH, INSPECTION REQUEST, UNCERTAIN and FAULT. Valid single-channel limit warnings are always independent of the combined logic.

## 5. Test plan summary

See `StarDust_Bench_Test_and_Demo_Plan.md`. The matrix is 3 debris states × 2 flows × 2 downstream conditions × 5 repeats = 60 held-out runs. Metrics are FPR, miss rate, detection delay, uncertain-output rate and valid-data fraction.

## 6. Cost assumptions

The bench budget is ₹8,650 + 15% reserve = ₹9,947.50, rounded to ₹9,950. These are planning allowances, not quotes. Field costs are excluded.

## 7. Limitations

- Tide and backwater make interpretation ambiguous.
- On a shallow boom, Δh may be too small to measure.
- Tension cannot give plastic weight.
- One line cannot certify the structure.
- The bench rig does not represent monsoon conditions.
- No crew means no impact.
- No measured results exist yet.

## 8. Design reference audit (presentation research)

| Source | What it does well | Adapted for StarDust |
|---|---|---|
| gitbrent/PptxGenJS demos (github.com/gitbrent/PptxGenJS, MIT) | Editable native shapes and tables; slide masters for consistency | All diagrams are native, editable shapes. A master carries the footer and slide number. |
| Aquasition monitoring page | Explains a problem by contrasting "clear screen vs blocked screen" | A pathway diagram with one highlighted failure point (slide 2) |
| AMETEK app note | One simple schematic: two sensors, one difference, one action | Side view with an explicit Δh and datum (slide 4) |
| SIH-style engineering decks (team's own reference) | Light canvas, navy headings, coloured technical blocks | Kept: light canvas, navy and teal, orange reserved for risk and action |
| Scientific-poster practice | Assertion-style titles that make each title the message | Every slide title is a full claim sentence |

**Limits on this research:** we could not inspect SIH finalist decks directly because public copies are scattered and usually unlicensed. No third-party slide content or images were copied.

## 9. Glossary

- **Boom:** a floating barrier.
- **Mooring:** the lines and anchors that hold the boom in place.
- **Retrofit:** an add-on fitted to existing infrastructure.
- **Datum:** a common height reference.
- **Δh:** the head (water-level) difference across the barrier.
- **HX711:** a load-cell ADC.
- **Persistence window:** the time a change must last before it counts.
- **Held-out runs:** test runs not used for tuning.
- **FPR:** false-positive rate.
- **Backwater:** downstream water level raised by tide or obstruction.

## 10. References

1. InnovateX 2026-27 brief (supplied PDF); https://techfest.org/competitions/innovatex
2. Aquasition, Trash screen monitoring systems (2019): https://www.aquasition.co.uk/2019/11/10/trash-screen-monitoring-systems/
3. AMETEK, Differential measurement – traveling screen: https://www.ametekusg.com/learningzone/application-notes/differential-measurement-traveling-screen
4. Ocean Engineering (2022), trash-net mooring (abstract; full text returned HTTP 403): https://www.sciencedirect.com/science/article/abs/pii/S002980182202827X
5. IAHR library, IPT trash-boom towing tests: https://www.iahr.org/library/info?pid=21351
6. Fluids (2022), trash-blocking net model: https://doaj.org/article/94350f750211417eae0115e5f3502121
7. KRISO boom tension field trial: https://www.kriso.re.kr/sciwatch/handle/2021.sw.kriso/1904
8. Free Press Journal, BMC ₹14.5-crore trash boom contract (30 Jul 2026): https://www.freepressjournal.in/mumbai/mumbai-bmc-approves-145-crore-contract-to-maintain-trash-boom-systems-across-6-rivers-and-nullahs
9. Outlook India, Mumbai beach waste: https://www.outlookindia.com/national/the-sea-is-returning-mumbais-garbage-how-2500-tonnes-of-waste-washed-up-on-the-citys-beaches
10. Citizen Matters, Mithi clean-up: https://citizenmatters.in/how-mumbai-most-polluted-river-is-being-cleaned-up/
11. JSN-SR04T datasheet: https://robu.in/wp-content/uploads/2019/10/JSN-SR04T-2.0.pdf
12. HX711 datasheet: https://robu.in/wp-content/uploads/2024/04/R101046-HX711.pdf
