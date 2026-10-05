# Phase 7 — Frozen profile regression

Fresh frozen-reference and Phase7 byte-copy runs all passed; external helpers adapt only root/port/evidence paths and capture settling. Frozen helpers/application/test payload never modified.

| Profile | Reference | Fresh checks per target | Result |
|---|---|---|---|
| Geometry | Frozen Phase4 | 14 checks; 35 screens/70 states; 23 visuals | PASS |
| Algebra | Frozen Phase5 | 20 checks; 10 fixture screens; 30 question/12 disclosed viewport cases; 8 captures | PASS |
| Informatics | Frozen Phase6 | 26 checks; 21 screens×hidden/full×3 sizes=126 cases; 3 sample/comparison cases; 6 captures | PASS |
| Legacy/default | Frozen Phase6 inherited Legacy behavior | 5 lesson packages; 171 screens/342 states; 44 visual metrics; 15 assertions | PASS |

Comparison: REGRESSION_COMPARISON.json. Geometry JSON exact after removing only per-import lessonActivation UUIDs (23 records); all native intra-run Teacher/Preview/TV parity remains asserted. Algebra JSON exact with no normalization. Informatics JSON exact except video currentTime (reference0.030376s versus Phase7 0.016790s), both independent manual playback checks >0; controls/aspect ratio/autoplay and all semantic/layout assertions exact. Legacy JSON fully exact with no normalization. Screenshot raster hashes are not asserted identical; screenshots accompany exact functional/DOM/layout evidence.

All test-owned errors/request/overflow collections clean; no test case disabled to obtain PASS. Expected fallback behavior for intentionally malformed data retained. G4-F01 auxiliary corrected test fixture is test-only and imported unchanged; original bundled fixture/frozen packages untouched. Geometry own-scene annotation persistence and native Algebra answer-priority are inherited contracts.

Local MathJax/offline behavior, future-step protection, Focus emphasis, vertical MCQ options, table/code/media fit and old package no-migration all exercised. NO_TEACH_AHEAD_GLOBAL PASS for the finite tested fixtures. No new feature/pedagogy output introduced.

Packaged RC1 reruns integrated sequences/isolation/invalid/stress/layout against fresh extracted payload and verifies 58 served asset hashes/modal lifecycle. Full inherited regression evidence applies to byte-identical1239file payload; no claim of Windows/physicalTV/classroom acceptance.
