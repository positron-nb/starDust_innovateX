# StarDust: bench test and demo plan

**Status:** PLANNED. No results exist. Record raw data in `StarDust_Bench_Data_Template.csv`.

## 1. Rig

- A contained recirculating channel: reservoir, pump, return hose and a transparent channel.
- A model boom with a model mooring, and the load cell in the monitored line.
- Sensors A (upstream) and B (downstream) on rigid brackets.
- An adjustable weir at the outlet.
- A spill tray and protected low-voltage electronics.

## 2. Calibration (before any evaluation)

1. **Distance.** Take ≥10 readings for each sensor at ≥3 reference distances measured with a ruler. Record the bias and standard deviation, and check the blind zone.
2. **Datum.** Measure each sensor's elevation z against one reference mark, and re-check it after any remount.
3. **Force.** Load the actual fixture with ≥4 reference masses (N = kg × 9.81, with the geometry accounted for). Record the zero offset, the calibration factor k, creep over 5 minutes, and hysteresis between loading and unloading.
4. **Flow check.** Confirm each pump setting independently, for example by timing a known volume.
5. **Log** a calibration version for every set of constants.

## 3. Ground truth (independent of StarDust)

- Weigh or count the debris added, and photograph the boom at each state.
- Define each event label before the run: `clean`, `partial` or `heavy`.
- Ground truth is never taken from StarDust's own output.

## 4. Test conditions

| Code | Condition | Purpose |
|---|---|---|
| A | Clean boom, flows F1 and F2 | Baseline envelope |
| B | Debris added at a fixed flow | Detection and delay |
| C | Clean boom, flow changed | Flow-only false alarms |
| D | Weir raised (backwater) | Hydraulic confounding |
| E | Sensor unplugged or blocked, stale data, then debris cleared | FAULT handling and recovery |

## 5. Fair comparison

- **Freeze the rules first.** Write the level-only, tension-only and combined rules, set their thresholds from calibration and baseline runs only, and save them as rule_version v1.
- **Evaluation matrix.** 3 debris states × 2 flows × 2 weir settings × 5 repeats = 60 runs, in randomised order, with the rig physically reset between runs.
- **Same data for all methods.** All three methods are evaluated on the same logged data.
- **Faults.** Fault runs (E) are reported separately.

## 6. Metrics

All metrics are reported with raw counts.

- **FPR** = FP / (FP + TN)
- **Miss rate** = FN / (FN + TP)
- **Detection delay:** time from event onset to a qualifying alert. The onset is the logged moment the debris is added.
- **Uncertain-output rate:** UNCERTAIN outputs as a share of all outputs. These are not counted as correct.
- **Valid-data fraction:** valid samples as a share of expected samples.

## 7. Go / no-go gates

| Gate | Pass condition | If it fails |
|---|---|---|
| **A: Measurable** | The Δh and tension change between clean and heavy exceeds 3× the combined sensor uncertainty at both flows. This 3× rule is a team-chosen working criterion. | Revise the sensor or geometry, or stop. |
| **B: Incremental value** | Across the 60 runs, combined logic has lower FPR than both single methods with no worse miss rate, or a trade-off the operator prefers. | Recommend the simpler method. |
| **C: Fault safety** | In every E run, FAULT or UNCERTAIN is reported within the persistence window, and valid independent warnings are never suppressed. | Fix the logic before any demo. |

## 8. Demo (Round 2, if qualified)

Run a live sequence A → B → C → E on the rig, with the laptop showing raw values, the current state and the reason. Show the logged CSV. State clearly that the demo shows behaviour on the rig, not field performance.
