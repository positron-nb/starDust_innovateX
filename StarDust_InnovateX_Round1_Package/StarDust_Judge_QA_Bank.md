# StarDust: judge Q&A bank

**Answer pattern:** answer directly, give one reason, state the limit, and point to a slide if useful. Keep each answer under 30 seconds.

## A. Novelty and existing solutions

1. **What is new about StarDust if differential-level monitoring already exists?**
   The sensors are not new. What is new is the decision logic: it combines hydraulic and mechanical evidence for floating drain booms, keeps explicit FAULT and UNCERTAIN states, and is compared on the same runs against level-only and tension-only methods. Its incremental value is unproven until we test it.
2. **Isn't this just two products bolted together?**
   It could be, and that is exactly why the comparison is the core of the project. If combining the signals doesn't improve decisions, the simpler method wins and we will say so.
3. **Did you do a patent search?**
   We did a limited prior-art search (appendix A2). It is not a patent clearance, and we make no claim of global novelty.
4. **Why not just use a camera?**
   Cameras exist and work well. Their images still need a person to review them, they struggle at night and in glare, and they give no load information. A camera could complement StarDust later, but it is outside our current scope.
5. **Aquasition already does this. Why would anyone choose you?**
   Aquasition monitors fixed trash screens, mainly with level sensing. Our target is floating booms, where the head difference may be small, so we add a mechanical signal and test whether it helps. We also aim for a much lower bench cost, although the field price is not established.

## B. Sensors, calibration and interpretation

6. **Why ultrasonic and not pressure sensors?**
   Non-contact ultrasonic sensors are cheap and stay out of dirty water. Their limits are foam, spray, blind zone and beam footprint. Submersible pressure sensors are a valid alternative and can be evaluated later.
7. **How do you calibrate the level sensors?**
   We check each sensor against reference distances, survey each one to a common datum, use h = z − d, and record bias, noise and drift.
8. **How do you calibrate the load cell?**
   We calibrate through the actual fixture with reference weights, converting mass to force in newtons, and check zero, span, creep and hysteresis.
9. **Can tension tell you how much plastic is trapped?**
   No. Tension depends on flow, geometry, buoyancy and load distribution, so it cannot give a weight. Plastic is weighed separately.
10. **How do you know a change was caused by debris and not by flow?**
    We can't know that uniquely from two signals. A flow surge on a clean boom raises tension while Δh barely moves, and debris tends to raise both and keep them raised. Test C exists to measure exactly this case. When the signals are ambiguous, the system reports UNCERTAIN or WATCH, not an inspection request.
11. **What about tides and backwater?**
    Tides don't cancel perfectly. Backwater raises both levels and can shrink Δh. We test this case with the weir. Outside the conditions we have tested, the output is UNCERTAIN.
12. **What if Δh is too small to measure on a shallow boom?**
    Then Gate A fails at that site: the change sits inside the sensor uncertainty, √(uA² + uB²). We would switch to a different sensor or a different site, or stop.
13. **Why one mooring line and not all of them?**
    One line keeps cost and complexity down. It doesn't certify the whole structure, and it may miss asymmetric loading. Adding lines is a later option.
14. **Why the ESP32?**
    It is cheap, has enough I/O, has optional Wi-Fi and is easy to log from. The choice of controller is not part of our contribution.
15. **The JSN-SR04T outputs 5 V and the ESP32 runs at 3.3 V.**
    Correct. The echo line goes through a divider or level shifter, which will be documented once the module revision is fixed.

## C. Logic, false alarms and reliability

16. **What are your thresholds?**
    None have been validated. They will be calibrated from clean-baseline runs and agreed with the operator, then frozen before evaluation.
17. **What happens when a sensor fails?**
    The state becomes FAULT and the reason is logged. Any independently valid channel still raises its own limit warning.
18. **Won't AND logic miss real events?**
    It might. That trade-off is exactly what we will measure, using the missed-event rate and detection delay.
19. **Why no machine learning?**
    The data is small and every site is different. Transparent rules can be checked and explained, and ML without validation would add risk.
20. **What about network loss?**
    StarDust keeps logging locally and shows how old the last contact was. Stale data is never shown as normal.

## D. Experimental validity

21. **Where are your actual results?**
    We don't have any yet. Round 1 asks for architecture and a feasibility plan. We have a defined test matrix, metrics and go/no-go gates, and we don't present any planned work as a result.
22. **Does a tabletop rig represent a monsoon nullah?**
    No. It tests measurability and the decision logic under controlled confounders. Full-scale behaviour needs a site pilot and scaling analysis.
23. **How do you avoid tuning to your own test?**
    Calibration runs are kept separate from held-out evaluation runs, the rules are frozen first, run order is randomised, and ground truth is independent of StarDust.
24. **What happens if combined sensing doesn't improve the outcome?**
    We report it and recommend the simpler method. That is still a useful engineering result.
25. **What would make you reject the design?**
    Any of these: signals inside the noise, load dominated by flow, no advantage over the single-signal methods, excessive false alerts, or no operator willing to act on alerts.

## E. Structure, safety and deployment

26. **Is it structurally safe to put a load cell in a mooring line?**
    A bench load cell, no. A field version needs a rated marine tension link and engineering review. We won't alter a real load path without that review.
27. **Is the pilot site confirmed?**
    No. The Malad Creek catchment is a candidate because the brief names it. We still need a survey, permission, a confirmed boom and a named crew.
28. **Do you have a BMC partnership?**
    No. The responsibility split in our plan is a proposal.
29. **How will it handle corrosion and monsoon flooding?**
    Not with the bench hardware. A field version needs rated enclosures, mounting above flood level and a service interval, none of which is established yet.
30. **How is it powered in the field?**
    That isn't designed yet. Solar plus battery is likely, sized after the site survey.

## F. Cost, market and impact

31. **Why should a city pay for this instead of scheduling manual inspections?**
    A city should pay only if StarDust reduces unnecessary visits or catches failures sooner by more than it costs to own. For a permanently staffed site it may not be worth it. A multi-site owner such as an O&M contractor is the most plausible buyer, and that is still unverified.
32. **What does a field unit cost?**
    We don't know yet. ₹9,950 is the bench rig only. A field unit needs quotes for rated sensors, enclosure, power, installation and servicing.
33. **Does your device prevent flooding?**
    No. It supports inspection decisions. Flood outcomes depend on the crew's response and on the wider drainage system.
34. **How would you prove environmental benefit is due to StarDust?**
    We would weigh collected plastic independently, record where it is disposed of, compare against a baseline period or a comparison site with rain and collection effort accounted for, and credit StarDust only with the extra interception it can be shown to add.
35. **How does it scale across India?**
    It scales site by site: survey, calibration and an operator agreement at each site. There is no universal threshold. The ESP32 hardware is cheap, but scaling is limited by site engineering and crew capacity.
36. **What's the socioeconomic impact?**
    The potential impact is better use of crew time and fewer wasted visits, plus an evidence trail for O&M contracts. All of it is prospective.
37. **Who acts on an alert?**
    A named drainage engineer reviews the evidence, and an assigned crew inspects. That has to be agreed before any pilot.

## Mock jury: the 15 hardest questions (rapid fire, 20 seconds each)

Q1, Q10, Q21, Q24, Q31, Q27, Q33, Q34, Q12, Q26, Q2, Q16, Q22, Q25, Q32.

**Drill:** one member reads the questions in random order, and the answering member has 20 seconds each. Fail the answer if it claims a result, novelty, a partnership or flood prevention.
