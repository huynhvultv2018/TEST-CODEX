# UI RC1 — Canonical current-contract regression report

CANONICAL_CURRENT_CONTRACT_RESULT = PASS
LEGACY_RAW_RESULT = FAIL (unchanged evidence, not relabeled)
RECONCILIATION = PASS
PRODUCT_DEFECT_FOUND = NO (within executed scope)
PRODUCT_PATCH_REQUIRED = NO
WINDOWS_RUNTIME = NOT_RUN
PHYSICAL_50_PC = NOT_RUN
PRODUCTION = NO

## Fresh executions

| Requested suite | Result | Evidence |
|---|---|---|
| A — R4 canonical functional | 7/7 PASS + 6/6 standalone native compatibility | r4-canonical/results.json; native-final/results.json |
| B — UI01–UI28 | All 28 requirements PASS; 28 browser groups PASS | UI01_UI28_TRACEABILITY.json; ui/results.json; five screenshots |
| C — CSRF F011 canonical | PASS | canonical-contracts/results.json CF011; R4 guard matrix; LAN route matrix |
| D — F012 Contract A | PASS | CF012; 5 marker cases × 5 question types; before/after HTML/XLSX; R4 versions/legacy checks |
| E — 50-client simulation | PASS | 50 primary, mixed, deadline and retry/atomic race |
| F — 60-client headroom | PASS | 60 independent HTTP client sessions |

R4 suite repeats 344 scoring-equivalence cases, malformed scoring/snapshot controlled
rejection, semantic restore/legacy compatibility, all 35 CSRF routes and immutable
historical HTML/Excel including two versions and missing-history legacy snapshots.
It runs against the exact extracted frozen source in disposable runtime copies.

## F011 details and false-positive control

8 route families × missing/wrong/other-session nonce = 24 rejects (403, DB unchanged).
Valid multipart imports five question types; preview has 2 valid students; confirm
imports two actual rows; bulk move updates both. Form-field nonce from a real login
works. Login rotation invalidates the old nonce (403). Import operation nonce is
kept separate. Successful valid workflows show no false reject. Standalone native
compatibility executes all 16 legacy call-sites including JSON saves and submits.
R4/LAN additionally repeat all 35 routes × 5 invalid nonce/origin/referrer variants
(175 rejects per suite); negative clients do not receive automatic valid headers.
No production guard or transport changes.

## F012 / F008 canonical proof

Per case: create 5-type bank, create exam/student through valid POST; start attempt
with rotated student nonce; inspect snapshot history; autosave partial answers;
submit score 4.5; capture report context/HTML and 4-sheet Excel; edit code/subject/
topic/level NB→VD/text/points 4→9 via real bank editor; reopen report/export.
BEFORE == AFTER for metadata/content/levels and every workbook value/cell type.
Stored attempt/answers/de_json/score remain byte-equivalent. Bank actually changes,
so unchanged report is not a no-op test. All five question types are included in
each of five =/+/−/@/normal marker cases; Excel has no formula cells and numeric
cells remain numeric. Actual results do not determine expected contract/oracle.

Canonical expectations were saved before execution and their SHA remains
`4af14583e52b548976a43822b8df36e157efd3acb98cc501a586314f6cf84165`. Candidate code is never modified or monkeypatched by these tests.

## F006 observation replacement

11 invalid time inputs + 5 types × 4 levels × 7 invalid count inputs = 151 cases.
Each produces its field-specific notice in the rendered response and no exam write.
Remaining session flash list is empty, explaining the two legacy failures. No status
change or validation relaxation is introduced; the response is the original R4 behavior.

## Native raw vs compatibility

| Native script | Raw frozen original | Current-contract test copy |
|---|---|---|
| kiem_tra_v22.py | FAIL | PASS |
| kiem_tra_v221.py | FAIL | PASS |
| kiem_tra_mathjax.py | PASS | PASS |
| kiem_tra_v222.py | FAIL | PASS |
| kiem_tra_v23.py | PASS | PASS |
| kiem_tra_v23_integration.py | FAIL | PASS |

The six original scripts and four previous approved compatibility scripts are not
edited in their existing locations. Tests execute with no PYTHONPATH adapter and
no sitecustomize injection. Test-only patch and assertion AST proof are delivered
as reconciliation artifacts outside the immutable candidate.

## UI evidence

Linux + real Chromium/Playwright. Both 1366x768 and 1920x1080; focused-question
navigation 10/20/30/40/50/60; all five types/MathJax; genuine autosave saved and
offline failure states; submit modal/response; nonce regression; refresh/resume;
50-row monitor/search/filter/keyed updates; tabs; keyboard focus; no normal overflow.
0 browser page errors. Screenshots are genuine fixture runs, not Windows/physical PC.

| Requirement | Result | Fresh browser check |
|---|---|---|
| UI01 | PASS | `UI01_UI02_SIDEBAR_ACTIVE` |
| UI02 | PASS | `UI01_UI02_SIDEBAR_ACTIVE` |
| UI03 | PASS | `UI03_TEACHER_1366` |
| UI04 | PASS | `UI04_TEACHER_1920` |
| UI05 | PASS | `UI05_STUDENT_1366` |
| UI06 | PASS | `UI06_STUDENT_1920` |
| UI07 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI08 | PASS | `UI08_UI19_ANSWERED_AND_AUTOSAVE` |
| UI09 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI10 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI11 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI12 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI13 | PASS | `UI13_SINGLE` |
| UI14 | PASS | `UI14_MULTI` |
| UI15 | PASS | `UI15_TF` |
| UI16 | PASS | `UI16_MATCH` |
| UI17 | PASS | `UI17_FILL` |
| UI18 | PASS | `UI18_MATHJAX` |
| UI19 | PASS | `UI08_UI19_ANSWERED_AND_AUTOSAVE` |
| UI20 | PASS | `UI20_UI21_SUBMIT_MODAL_WARNING` |
| UI21 | PASS | `UI20_UI21_SUBMIT_MODAL_WARNING` |
| UI22 | PASS | `UI22_SUCCESSFUL_SUBMIT` |
| UI23 | PASS | `UI23_MONITOR_50_ROWS` |
| UI24 | PASS | `UI24_REPORT_TABS` |
| UI25 | PASS | `UI07_UI25_10_TO_60_QUESTIONS` |
| UI26 | PASS | `UI26_KEYBOARD_FOCUS` |
| UI27 | PASS | `UI27_CSRF_NEW_UI` |
| UI28 | PASS | `UI28_REFRESH_RESUME` |

## HTTP load / limits

50-scope: 8448 requests; 0 unexpected failed;
0 HTTP 500. 1 planned 0.0005-second
read timeout tests retry and is not hidden as an unexplained failure.
60-scope: 2760 requests; 0 unexpected failed;
0 HTTP 500. Peak 60 concurrent requests. Answer/score comparisons
find no mismatch, cross-student contamination, lost submission or late overwrite.
CPU/RSS samples and raw events included. This is cloud Linux HTTP simulation using
the unmodified native app.py/Waitress entry point in its own data directory; no real
50-PC room, Windows runtime or EXE build is claimed.

## Integrity

BEFORE_SHA256 = AFTER_SHA256 = `d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f`.
The frozen extracted 64-file manifest and original working UI source also match.
No candidate, template, CSS/JS, backend, scoring, CSRF, license, MID, database of
the product or previous report/evidence is edited. Only newly generated disposable
fixture databases receive authorized test workflow writes; no production DB is opened.
