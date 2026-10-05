# Phase9 — Regression against frozen RC1

Fresh reference and Phase9 runs completed all suites:

| Profile | Checks per target | Coverage | Result |
|---|---|---|---|
| Legacy/default | 15 assertions | 5packages171screens342states44metrics | PASS |
| Geometry | 14checks | 35screens70states23visual records | PASS |
| Algebra | 20checks | 10fixture screens30question/12disclosed viewport cases | PASS |
| Informatics | 26checks | 21screens126hidden/full viewport cases +3sample/comparison cases | PASS |

REGRESSION_COMPARISON.json: Geometry exact after only per-import lessonActivation UUID normalization; native intra-run Teacher/Preview/TV parity still tested. Algebra fully exact; Informatics only manual video currentTime normalized (both assert playback >0). Legacy fully exact. Raster screenshot hashes not asserted identical; functional/DOM/geometry/layout evidence exact. All recorded error/request collections clean and source memory unchanged. Offline native navigation/MathJax and vertical MCQ preserved.

Required Geometry→Algebra→Informatics→Legacy→Geometry tested through actual new Loader with state dirtied before switch (Geometry annotation/proof/zoom/layout/Focus; Algebra math steps/Focus/hint; Informatics checkpoint/sample; Legacy disclosure). New successful native activation/reset and profile CSS/control ownership PASS. No cross-reveal/foreign figure/Focus or sample leak. Own-scene persisted Geometry annotations keep accepted original behavior.

NO_TEACH_AHEAD_GLOBAL PASS for finite tested fixtures: future proof/math/code, private Teacher notes, unapproved sample and concealed hints remain protected; loader never creates lesson content. All3subject engines/Core/TV and lesson payloads byte-identical to RC1. Two importer/UI existing files changed, two loader UI files added only.

Packaged final candidate reruns complete targeted15groups plus60asset hashes/modal lifecycle. Initial failed helper assumptions preserved and corrected externally without weakening profile checks. Phase8 physical acceptance remains PENDING/UNRUN; no physical or real-classroom PASS inferred from these tests.
