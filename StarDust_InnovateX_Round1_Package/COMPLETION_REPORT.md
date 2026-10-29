# Completion report and judge self-review

## Files
- Deck: `StarDust_InnovateX_Round1_Deck.pptx` (7 main slides + 5 appendix slides; speaker notes on every slide) and its PDF export.
- Scripts and documents: the speaker script, Q&A bank (37 questions plus a mock jury), the reading pack (`.md` and `.pdf`, including the design reference audit), the abstract, the evidence and claims register (`.csv`), the bench test plan, the blank data template (`.csv`), the one-page revision sheet (`.pdf`) and the event-day checklist.
- Source: `source/build_deck.js` regenerates the deck. The HTML and CSS used to make the PDFs are also in `source/`.

## Internal review rubric (our own rubric; these are not the official judging weights)
| Criterion | Score /5 | Main weakness |
|---|---|---|
| Problem clarity and local understanding | 4 | No surveyed site or photo |
| Novelty, defended | 3.5 | The contribution is a hypothesis until it is tested |
| Technical feasibility | 4 | No hardware has been built yet |
| Cost | 3.5 | Bench cost only; field cost unknown |
| Scalability and impact | 3 | All benefits are prospective |
| Design and readability | 4 | Diagrams are schematic, not photographic |
| Honesty and claims | 5 | — |

## What was fixed after the first render
- Two-line titles that collided with content.
- An overlapping load-cell label.
- An oversized empty team box.
- Unused space in the ESP32 block.
- A cramped closing box.
- A timing mismatch between the speaker notes and the script.

## What was verified
- The deck passes the PPTX validator.
- The deck was rendered and visually inspected; the PDF has 12 pages, matching the deck.
- The budget arithmetic (8,650 × 1.15 = 9,947.50, rounded to 9,950).
- The brief's requirements were checked against the PDF.
- The Aquasition, AMETEK and FPJ pages were opened and read.

## What could not be verified
- The live techfest.org page: it renders with JavaScript and the fetch returned only its title.
- The Ocean Engineering full text (HTTP 403).
- SIH finalist decks (no licensed public copies found).

## Three biggest residual risks
1. A judge treats "differential level already exists" as fatal. Mitigation: slide 3 and Q&A answers 1–5.
2. There are no measured results or prototype yet.
3. No Malad site, permission or operator is confirmed.

## Before presenting, the team must
1. Fill in the slide 1 placeholders: team name, ID, members, institute and contact.
2. Confirm the zonal date and slot, and resolve the abstract-upload contradiction through the portal's Doubt section.
3. Rehearse 3 times to 9:00–9:20, and run the mock jury round.
4. If time allows, run calibration (Gate A) and present it clearly labelled as preliminary.
5. Visit a nullah boom, if it can be done safely and legally, and take a dated photo for slide 2.
