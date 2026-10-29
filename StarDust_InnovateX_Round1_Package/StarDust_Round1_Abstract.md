# StarDust: Round 1 abstract

**Team:** [Team name] · **Team ID:** [ID] · **Theme:** 3 (Rising plastic pollution in coastal cities)
**Members:** [Name, email, phone] × up to 4 · **Institution:** [Institution]
**Status:** concept and planned bench validation. No prototype results yet.
**Word limit:** not verified. Check the portal; the brief may not require a Round 1 upload.

## Short version (~100 words)

Mumbai uses floating trash booms at nullah outfalls to stop plastic reaching its creeks, but their condition between scheduled visits is unknown. StarDust is a low-cost monitoring retrofit for these existing booms. Two ultrasonic sensors measure the water-level difference across the boom, and a load cell with an HX711 measures tension in one mooring line. An ESP32 validates the readings, compares them with a clean baseline, and reports NORMAL, WATCH, INSPECTION REQUEST, UNCERTAIN or FAULT to the maintenance crew. Our contribution is to test, on a ₹9,950 bench rig, whether combined sensing improves inspection decisions over level-only and tension-only monitoring.

## Expanded version (~250 words)

**Problem.** Floating packaging plastic carried by stormwater is intercepted by trash booms at Mumbai's drain outfalls. The BMC recently approved a ₹14.5-crore, two-year contract to maintain such booms. Maintenance is scheduled, so crews can visit clear booms and miss overloaded or bypassed ones.

**Existing solutions.** Differential-level monitoring is already used commercially on trash screens (e.g. Aquasition, AMETEK), cameras are available, and trash-boom mooring tension has been studied in research. However, level is confounded by tide, backwater and rain, and tension is confounded by flow speed.

**Proposed solution.** StarDust retrofits an existing boom with:

- upstream and downstream level sensors, surveyed to a common datum (Δh = hA − hB)
- one mooring-line load cell read through an HX711
- an ESP32 that applies calibration, validity checks, a clean-barrier baseline and persistence rules

Invalid data produces FAULT, and untested conditions produce UNCERTAIN. Valid single-channel limits raise their own warnings. A human engineer and crew inspect, clear the boom and verify recovery. StarDust does not remove waste or prevent floods.

**Contribution and validation.** We do not claim the sensors are novel. On a tabletop channel we will compare level-only, tension-only and combined logic on 60 held-out runs, covering debris, changed flow, backwater and sensor faults. We will report false-positive rate, missed-event rate, detection delay, uncertain-output rate and valid-data fraction against explicit go/no-go gates.

**Impact and scalability.** If the bench results justify it, the route is a permitted survey in the Malad Creek catchment (candidate only), then a one-site pilot measuring alert-to-inspection time, unnecessary visits and independently weighed plastic. Scaling would proceed through per-site calibration.

**Keywords:** trash boom, stormwater plastic, differential water level, mooring tension, ESP32, condition monitoring, Mumbai.
