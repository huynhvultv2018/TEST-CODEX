# UI RC1 — Legacy test reconciliation matrix

LEGACY_RAW_RESULT = FAIL (4 native scripts + 3 R3 assertions, preserved)
CANONICAL_CURRENT_CONTRACT_RESULT = PASS

Candidate `d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f` is unchanged. This report replaces no old test/log/report; it records
why current contracts require a distinct canonical path.

## Required matrix

| TEST | OLD CONTRACT | CURRENT CONTRACT | CLASSIFICATION | REPLACEMENT CANONICAL TEST | RESULT | RATIONALE |
|---|---|---|---|---|---|---|
| D001-01 — `kiem_tra_v22.py:main, assert line 36` | 302, five imported types and subsequent score 10 | Valid session nonce required before multipart import | TEST_HARNESS_INCOMPATIBLE | Standalone approved nonce-aware v22 + CF011 | PASS | 302 remains correct for a valid request; missing nonce makes the legacy request invalid. |
| D001-02 — `kiem_tra_v221.py:main, assert line 59` | 200 + 2 valid students in preview | Multipart preview needs CSRF; operation import token is separate | TEST_HARNESS_INCOMPATIBLE | Standalone approved nonce-aware v221 + CF011 | PASS | Manual teacher session and import-confirm token do not replace submitted CSRF nonce. |
| D001-03 — `kiem_tra_v222.py:main, assert line 70` | 302, all grades/types and legacy Excel import valid | Valid session nonce required for each import | TEST_HARNESS_INCOMPATIBLE | Standalone approved nonce-aware v222 + CF011 | PASS | New/legacy workbook transport is valid; nonce setup is missing, not the import behavior. |
| D001-04 — `kiem_tra_v23_integration.py:main, assert line 36` | 302; later partial score 5, scoring roundtrip/timeout/frozen snapshot | Header/form nonce required on every unsafe request, current after login rotation | TEST_HARNESS_INCOMPATIBLE | Standalone approved nonce-aware v23 integration + CF011 | PASS | Missing nonce blocks the first POST before subsequent functional assertions can execute. |
| D002-01 — `r3_regression.py:invalid_time(mixed-exam) → invalid_request, assert line 80` | Session _flashes still contains minutes error after response | F006 requires controlled rejection, visible notice and no new exam; native template consumes flashes | LEGACY_EXPECTATION_OBSOLETE | CF006 time cases (11) | PASS | Wrong observation layer, not F012. Prior R3 UI observer already observes response notices for non-redirects. |
| D002-02 — `r3_regression.py:invalid_counts(mixed-exam) → invalid_request, assert line 80` | Session _flashes retains quota-field error after response | F006 requires rejecting malformed quota and displaying field notice; not retaining consumed flash state | LEGACY_EXPECTATION_OBSOLETE | CF006 5 types × 4 levels × 7 invalid counts (140) | PASS | Same obsolete observation assumption; no product input-validation failure and no F012 involvement. |
| D002-03 — `r3_regression.py:reports_export, assert line 216` | PhanTichCauHoi code starts with marker set in bank AFTER exam; other text cells reflect live bank | F012 Contract A: metadata/content from submitted attempt snapshot; current bank must not rewrite history | LEGACY_EXPECTATION_OBSOLETE | CF012 before/after HTML/Excel; marker fixture exists BEFORE snapshot | PASS | Old live-bank expectation contradicts explicit Contract A. New canonical test verifies history freeze and original F008 text/numeric safety separately. |

## D001 precise observed failures

All four first failures are in `main()`: v22 line 36, v221 line 59, v222 line 70,
v23 integration line 36. Passive exception observation of unchanged scripts records
HTTP 403, Location absent and native CSRF text. Evidence: `legacy-first-failure/*.json`.
The raw standalone executions still fail; observer completion is not counted as a
functional PASS. The first diagnostic observer attempted to decode an XLSX response
as UTF-8 and failed; its source/error record is retained. Corrected observer reads
only failure responses; no request/middleware/source injection occurs.

The expected functional 302/200 is still correct for a VALID request. Therefore D001
is `TEST_HARNESS_INCOMPATIBLE`, not `PRODUCT_DEFECT` and not a reason to change status
or authorize nonce-free requests. Login/auth/attempt/client_token/import operation
token and CSRF are distinct prerequisites. JSON requires X-CSRF-Token, not a JSON
body token. Current nonce must be obtained after rotation; multipart remains multipart.

## All 16 legacy POST call-sites are covered

| Site | Original file:line | Route suffix | Original functional expectation | Canonical path result |
|---|---|---|---|---|
| TC01 | v22:35 | multi/import | multipart, 302 | PASS in standalone compatibility copy |
| TC02 | v22:41 | mixed-exam | form, 302 | PASS in standalone compatibility copy |
| TC03 | v22:53 | api/save-answer | JSON/header, 200; loop five types | PASS in standalone compatibility copy |
| TC04 | v22:59 | exam | form, 302 | PASS in standalone compatibility copy |
| TC05 | v221:58 | students/import-preview | multipart, 200 + preview | PASS in standalone compatibility copy |
| TC06 | v221:61 | students/import-confirm | form + operation token; follow redirect 200 | PASS in standalone compatibility copy |
| TC07 | v221:70 | students/bulk | move; follow redirect 200 | PASS in standalone compatibility copy |
| TC08 | v221:74 | students/bulk | delete; follow redirect 200 | PASS in standalone compatibility copy |
| TC09 | v222:67 | multi/import | new format, multipart 302 | PASS in standalone compatibility copy |
| TC10 | v222:71 | multi/import | legacy format, multipart 302 | PASS in standalone compatibility copy |
| TC11 | v23_integration:35 | multi/import | multipart, 302 | PASS in standalone compatibility copy |
| TC12 | v23_integration:46 | multi/edit/<id> | form, 302; loop five types | PASS in standalone compatibility copy |
| TC13 | v23_integration:50 | multi/import | roundtrip; DB payload equality retained | PASS in standalone compatibility copy |
| TC14 | v23_integration:54 | mixed-exam | form, 302 | PASS in standalone compatibility copy |
| TC15 | v23_integration:68 | api/save-answer | JSON/header, 200 | PASS in standalone compatibility copy |
| TC16 | v23_integration:74 | exam | form, 302 | PASS in standalone compatibility copy |

Six native scripts run in build_exe.bat order, each as its own `python script.py`
process in a temporary source copy. The already approved 4-file test-only compatibility
patch adds a local current-session nonce helper and headers, retaining all 76 original
functional assertions and whole-module AST after removing only those additions.
MathJax/v23 tests are byte-identical. No external transport/sitecustomize adapter,
CSRF exemption, middleware monkeypatch, test skip or xpass is used. Original candidate
test files remain byte-identical to the input ZIP; compatibility files are outside it.

## D002 contract distinctions

The two F006 failures are not historical-report/F012 failures. The R3 native
mixed-exam response renders `get_flashed_messages()`, consuming session flash data.
Session persistence is an obsolete harness assumption. Existing R3 observer source
already used HTML notices for a non-redirect response. CF006 checks all 11 bad times
and 140 malformed quota cells: exact field notice visible, 200 controlled response,
0 new/changed exam rows, consumed `_flashes` observed separately. Returning 200 for
the validation form is permitted by the existing R3 status assertion (200/302/400).

The third failure directly conflicts with F012. Old fixture changes bank code/text
after submission then expects those changed values in Excel. Actual raw XLSX contains
the original R3EXCEL metadata; this is correct Contract A. CF012 places the original
Excel marker before snapshot, edits all five bank questions afterwards through the
real editor, and asserts HTML context/Excel values unchanged. Numeric/text cell types
and no formulas are independently asserted; no expected live-bank alias is added.

Current contract sources: HOTFIX_R4_SECURITY_REPORT (F011), HOTFIX_R4_HISTORY_REPORT
(Contract A), HOTFIX_R4_TEST_REPORT (raw failures/fixture timing), prior R3 UI observer,
app.py middleware/history readers and native mixed_exam template. All copied with hashes
in CONTRACT_SOURCES; no PREPROD undefined proposal overrides implemented R4 policy.
