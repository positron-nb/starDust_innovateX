# StarDust — One-Page Quick Revision

**One line:** Monitoring retrofit for *existing* drain trash booms: Δh across the boom + one mooring-line tension → ESP32 validity checks + baseline → NORMAL / WATCH / INSPECTION REQUEST / UNCERTAIN / FAULT → human crew.

**Problem:** Booms intercept nullah plastic (≈5,000 t/yr estimate in brief; BMC ₹14.5 cr 2-yr O&M contract, FPJ 30 Jul 2026). Condition between scheduled visits is unknown.

**Contribution (not the sensors):** site-calibrated combined decision logic with explicit fault/uncertainty, *tested* against level-only and tension-only.

**Maths:** h = z − d · Δh = hA − hB · T = k(raw − offset) [N] · uncertainty ≈ √(uA²+uB²)

**Logic:** valid? → in tested regime? → baseline + persistence. Independent valid high-water/high-load warnings never suppressed.

**Test:** rig A clean · B debris · C flow change · D backwater · E fault+recovery. 60 held-out runs. FPR, miss rate, delay, uncertain rate, valid-data fraction. Gates: measurable → beats simpler → fault-safe.

**Cost:** ₹8,650 + 15% = ₹9,947.50 ≈ **₹9,950** bench planning estimate. Not field price.

**Never say:** results · accuracy · prevents floods · world-first · BMC partner · measures plastic weight · site confirmed.

**Hardest Qs:** What's new? · Debris vs flow? · Where are results? · What if combined doesn't help? (→ use simpler; still useful) · Why pay vs manual? (multi-site owner, unverified) · Site confirmed? (no, Malad candidate) · Flood prevention? (no) · Environmental attribution? (independent weighing vs baseline)

**Limitations:** tide/backwater · small Δh on shallow booms · one line ≠ structure · bench ≠ monsoon · needs a crew.
