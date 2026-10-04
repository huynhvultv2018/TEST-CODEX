# Visual acceptance

**CLOUD TV VISUAL ACCEPTANCE = PASS for executed examples/packages.**
**ACTUAL ALGEBRA LESSON + WINDOWS/PHYSICAL TV ACCEPTANCE = PENDING.**
**PRODUCTION READY = NO.**

All gates below are PASS within the executed scope. A cloud screenshot is not a Windows screenshot or distance-readability measurement. If the actual lesson/TV retest reveals a critical failure, record TV VISUAL ACCEPTANCE=FAIL and retain PRODUCTION READY=NO.

| Gate | Current evidence |
| --- | --- |
| MCQ STRUCTURE | PASS — stem separate from A/B/C cards; raw strings and explicit arrays |
| OPTION DISTRIBUTION | PASS — three short choices in equal columns; four choices in 2×2 |
| OPTION CONSISTENCY | PASS — equal class, padding, font, line-height, background, marker/body treatment |
| WHITESPACE NORMALIZATION | PASS — grammatical Algebra context, no blanket identifier splitting |
| ZERO SPACING | PASS — all required zero/digit/power cases and rendered knowledge |
| MATH OPERATOR SPACING | PASS — required operators, B · Q = A, unary minus |
| MATH LINE BREAK | PASS — Question 14 retains wording; monomials and short math runs atomic |
| NUMBERED LIST | PASS — 1/2/3 marker/body share li and baseline, no detached marker |
| KNOWLEDGE CLOSE HIERARCHY | PASS — headings/cards/list items; complete source content |
| TV NO-OVERFLOW | PASS — measured pane/child bounds at four supported viewports; real regression 342 states |
| TV NO-UNNECESSARY-SCROLL | PASS — no scroll/truncation in executed normal flows; minimum content font 30px |
| ALGEBRA REGRESSION | PASS — user examples + controlled presentation fixtures; actual lesson unavailable |
| GEOMETRY REGRESSION | PASS — two real lesson packages, scene/progressive proof/tools |
| TIN REGRESSION | PASS — three real lesson packages; literal identifiers preserved |
| PEDAGOGY LOCKS | PASS — waiting/reveals/exclusivity/future-step secrecy, unchanged pedagogy source |
| TEACHER-TV SYNC | PASS — actual Teacher preview/popup parity, Focus, navigation/reload/reconnect |

Required captures are in `TV_MATH_TYPOGRAPHY_EVIDENCE/AFTER`:

- QUICK_CHECK_1, ANSWER_1, QUICK_CHECK_2, KNOWLEDGE_CLOSE and QUESTION_14 at each of four viewports.
- GEOMETRY_REGRESSION_1280x720 and TIN_REGRESSION_1280x720 from real packages.
- FOUR_EXPLICIT_OPTIONS_1280x720 and MULTIPLE_KNOWLEDGE_PAGES_1280x720.

Before/after screenshots show the original failure and final rendering. Screenshot inspection confirms separate uniform options, consistent list baselines, visible headings and spacing. Automated metrics check font floor, collisions/element bounds, scroll dimensions and parity; they cannot certify actual Windows pixels or viewing distance.

Windows retest: extract the full candidate into a separate short path, stop the previous task-owned server, run START_WEB_LIVE.bat and import the original Algebra lesson. Use TV fullscreen at actual resolution. Check QC1 → Answer1 → QC2 → explicit Knowledge Close → Question14; test Hint1/2, Next/Back and Geometry/Tin. For multiple knowledge pages use Teacher Focus in the existing annotation editor to select a source item on the next page. Confirm preview/TV agree and hidden content is not read. Keep all existing TTS/Demo/Launcher acceptance requirements; no new native certification is inferred.
