# StarDust: 10-minute Round 1 speaker script

**Target:** 9:15 spoken, which leaves about 45 s of the 10-minute slot (InnovateX brief) as buffer.
**Deck:** `StarDust_InnovateX_Round1_Deck.pptx`. Slides 1–7 are the talk. Slides 8–12 are appendix backup, shown only during Q&A.

## Role division (four members; adapt if fewer)

| Speaker | Owns | Slides | Q&A domain |
|---|---|---|---|
| S1 – Problem & context lead | Local context, users, sources | 1, 2 | Mumbai context, pilot site, users |
| S2 – Hardware lead | Prior art, architecture | 3, 4 | Novelty, sensors, calibration, interfaces |
| S3 – Logic & test lead | Decision logic, validation, cost | 5, 6 | False alarms, tides, test validity, budget |
| S4 – Impact & close | Roadmap, impact, close | 7 | Economics, environment, scaling |

With 3 members, S3 also presents slide 7. With 2 members, split the deck as slides 1–3 and 4–7.

| Slide | Time | Cumulative |
|---|---|---|
| 1 Hook | 0:45 | 0:45 |
| 2 Problem | 1:30 | 2:15 |
| 3 Existing solutions | 1:30 | 3:45 |
| 4 Architecture | 1:30 | 5:15 |
| 5 Decision logic | 1:30 | 6:45 |
| 6 Validation & cost | 1:25 | 8:10 |
| 7 Impact & close | 1:05 | 9:15 |

The English text below is the script itself. The **Hinglish** lines are for team understanding only and are not spoken.

---

## Slide 1: Hook (0:45, S1)

**Opening line:** "Is the trash barrier still doing its job, or does a crew need to go now?"

Good morning. We are Team [name], Theme 3. Mumbai already uses floating trash booms at drain and nullah outfalls to stop plastic before it reaches creeks and mangroves. Between two maintenance visits, though, nobody knows whether a boom is still working. StarDust is a monitoring retrofit for those existing barriers. It is not a garbage collector and it is not a robot. Two level sensors read the water surface upstream and downstream of the boom, and one load cell reads the pull in a mooring line. An ESP32 checks whether those readings are valid, compares them with the clean-barrier baseline, and tells the maintenance team when an inspection is worth a visit. The picture on the right is a conceptual illustration, not an installed system.

> **Hinglish:** Pehli line mein hi bata do ki hum machine nahi, monitoring add-on bana rahe hain. "Concept illustration" bolna mat bhoolna.

**Transition:** "Let me start with where the plastic actually goes."

## Slide 2: Problem (1:30, S1)

Our specific source is floating packaging plastic: bottles, wrappers and film that stormwater carries through nullahs towards the creeks. The organisers' brief quotes a survey estimate of about 5,000 tonnes a year leaving Mumbai's waterways for the Arabian Sea.

The city already responds with trash booms. They were commissioned in July 2022 after National Green Tribunal directions. In July 2026 the BMC approved a ₹14.5-crore, two-year contract just to operate and maintain booms on six rivers and nullahs in the western suburbs. So the infrastructure exists, and so does the spending.

The orange box is the gap. From the office, an overloaded or bypassed boom looks exactly like a working one. Maintenance runs on a schedule. A UK trash-screen monitoring supplier, Aquasition, describes the same pattern: scheduled cleaning often visits clear screens and misses blocked ones, and an uncleared screen can itself add flood risk.

Three people feel this problem: the drainage engineer who assigns crews, the crew itself, and the asset owner or contractor who pays for every visit. Our candidate area is the Malad Creek catchment, which the brief names. We have not surveyed an outlet there, we have not confirmed a barrier, and we have no permission or partnership. That is a next step.

> **Hinglish:** Booms already hain, contract bhi hai. Problem yeh hai ki do visits ke beech condition pata nahi chalti. Malad sirf candidate hai. "Survey nahi kiya" clearly bolo.

**Transition:** "Monitoring screens is not new. So what already exists?"

## Slide 3: Existing solutions (1:30, S2)

Here is our honest answer to the question "what is new?"

- **Manual inspection** is what happens today.
- **Single-level and differential-level monitoring** is already sold. Aquasition monitors levels upstream and downstream of a screen and sends SMS alarms. AMETEK publishes an application note that puts two transmitters across a traveling screen to trigger cleaning.
- **Cameras** are also sold.
- **Mooring and net tension** has been studied in research. A towing-tank study at IPT, Brazil found that line tension depends on both flow speed and debris accumulation.

So the components and the measurements both exist. What we did not find is a low-cost retrofit for floating drain booms that combines both signals, keeps explicit FAULT and UNCERTAIN states, and is tested fairly against using one signal alone. Our search was limited and is not a patent clearance.

Why might one signal be insufficient? Level rises with rain and tide, not only with debris. Tension rises with flow speed, even on a clean boom. Each signal has its own confounder.

**Key line:** "We are not claiming the sensors are new. We are testing whether combining them makes better inspection decisions, and we will report the answer even if it is no."

> **Hinglish:** Novelty ka sawaal pehle hi khud uthao. Components naye nahi hain. Naya hai calibrated decision logic aur fair comparison.

## Slide 4: Architecture (1:30, S2)

The left side shows a side view across the barrier. Debris against the boom can hold water back, so the upstream surface sits higher than the downstream one. That difference is Δh. The ultrasonic sensors measure the *distance* down to the water, so each sensor is surveyed to a common datum. Water elevation is h = z − d, and Δh = hA − hB. Subtracting raw distances gives the wrong answer whenever the mounts sit at different heights.

The second signal is mechanical. A load cell in one mooring line measures the boom's pull on its anchor. The HX711, a 24-bit bridge amplifier, digitises the load-cell signal. Tension in newtons is the calibration factor × (raw reading − zero offset), calibrated on the real fixture with known weights. Tension does not tell us how much plastic the boom is holding.

The right side shows the data path. Levels A and B are triggered one after the other to avoid cross-talk. The load signal goes through the HX711. Inside the ESP32, every reading is timestamped, calibrated, checked for validity, compared with the baseline and run through persistence rules. The outputs are a state, a raw log and a local alert. Wi-Fi is optional, and logging continues without a network. The last block is a person: StarDust never opens the boom and never removes waste.

> **Hinglish:** Distance aur elevation ka difference samjhao. Datum survey zaroori hai. 5 V echo ko level-shift karna padega. Hobby load cell field-rated nahi hai.

## Slide 5: Decision logic (1:30, S3)

A reading is evidence, not a diagnosis.

1. **Valid?** If a reading is out of range, stale, jumps impossibly or is disconnected, the state is FAULT and the reason is logged. A failed reading is never replaced with a normal-looking value.
2. **Inside the conditions we tested?** If not, for example during tidal reversal, the state is UNCERTAIN and a person checks.
3. **Only then** does StarDust compare against the baseline and apply a persistence window, so a short spike does not raise an alarm. The result is NORMAL near baseline, WATCH when one signal shifts, and INSPECTION REQUEST when both valid signals show a sustained change. An inspection request means "suspected, go and look", not "confirmed".

The orange lane is for safety. A valid high-water or high-load limit raises its own warning, even when the other sensor is faulty.

The grey box shows how readings can mislead. These cases are illustrative and have not been measured:

- A flow surge on a clean boom raises tension while Δh barely moves, so the state is WATCH.
- Backwater raises both levels and can shrink Δh, so the state is UNCERTAIN.
- Debris pushes both signals and keeps them there, so the state is INSPECTION REQUEST.

Requiring both signals may cut false alarms but miss some events. We will measure that trade-off rather than assume it.

**Boundary:** StarDust does not clear waste, identify or weigh plastic, or prevent floods. It uses transparent rules, no AI, and no thresholds have been validated yet.

> **Hinglish:** UNCERTAIN bolna weakness nahi, honesty hai. Ek kharab sensor achhe sensor ki warning ko block nahi karega.

## Slide 6: Validation & cost (1:25, S3)

The planned rig is a tabletop recirculating channel. It has a reservoir and pump, a model boom on a mooring with the load cell, sensors A and B, and an adjustable weir that creates backwater on purpose.

The five tests are:

- **A.** Clean baseline.
- **B.** Debris added at the same flow.
- **C.** The trap: a clean boom with only the flow changed.
- **D.** Backwater.
- **E.** Sensor fault, then debris removal and recovery.

All three methods (level-only, tension-only and combined) are frozen before evaluation and run on the same held-out runs. Ground truth comes from our own photos, rulers and known debris, never from StarDust's output.

We will report false-positive rate, missed-event rate, detection delay, uncertain-output rate and valid-data fraction, all with raw counts.

The cost is ₹8,650 base plus a 15% reserve, which gives ₹9,947.50, rounded to ₹9,950. These are planning allowances, not supplier quotes, and not a field installation price.

**Go/no-go:** if the signal changes are not bigger than sensor noise, or the combined method does not beat the simpler ones, we simplify or stop.

> **Hinglish:** "Planned" word baar-baar bolo. Koi result nahi hai abhi. ₹9,950 bench ka hai, field ka nahi.

## Slide 7: Impact & close (1:05, S4)

Every arrow on this slide is a gate: bench verification, then a permitted survey in the Malad catchment, then one pilot with a named operator, then measured evaluation against a baseline period, and only then expansion with per-site calibration. Nothing beyond stage one is arranged yet.

A human stays in charge throughout. The workflow runs from condition flag to engineer review, crew inspection, clearance if needed, and recovery verification. An acknowledgement is not proof that the boom was cleared.

A pilot would measure:

- alert-to-inspection time
- unnecessary visits
- false alerts and missed events
- plastic weighed independently, with its disposal destination
- operating and servicing cost

We will not credit StarDust for everything the boom catches, only for any extra that better maintenance can be shown to add.

**Closing line:** "We are not promising a cleaner sea. We are offering a cheap, testable way to know when a boom needs a crew, and the evidence to decide whether it is worth it. Thank you."

---

## 60-second informal explanation

"You know the floating barriers in Mumbai's nullahs that catch plastic? Nobody knows when they're full or failing until someone goes to look. StarDust adds two cheap level sensors, one on each side, and a load sensor on the rope holding the barrier. When debris builds up, water usually backs up on one side and the rope pulls harder. A small ESP32 board checks whether the readings are real, compares them with the clean condition, and tells the crew 'go and check this one'. It doesn't clean anything itself. The real question we're testing is whether using both signals together beats using just one. If it doesn't, we'll say so."

## Rules for the whole team

- Never say "results", "accuracy", "we found that the device…" or "prevents floods".
- Say "planned", "proposed", "we will test" and "illustrative".
- If you run over time, cut the confounding examples on slide 5 first. The architecture explanation stays.
