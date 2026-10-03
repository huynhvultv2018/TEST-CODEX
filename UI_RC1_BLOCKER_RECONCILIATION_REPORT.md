# UI RC1 — Blocker reconciliation report

RECONCILIATION = PASS
PRODUCT_DEFECT_FOUND = NO (in scope examined)
PRODUCT_PATCH_REQUIRED = NO
PRODUCTION = NO

## Locked input

Input handoff SHA-256: `8a07260b656e96811a15fb7ef53fe495d4d099a8230202d5f89df80811ca57bd`.
Candidate before/after SHA-256: `d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f`.
CANDIDATE_MUTATED = NO. All handoff member checksums and ZIP CRC validated before
extracting. All 64 frozen files and the existing original UI source are unchanged.
The old RC1 reports, candidate ZIP, handoff ZIP, tests and raw evidence remain intact.

## D001 conclusion

D001_CLASSIFICATION = TEST_HARNESS_INCOMPATIBLE (all 4 failures).
D001_CANONICAL_RESULT = PASS.

The first failed request in v22/v222/v23 integration is multipart multi/import;
v221 is student import-preview. Passive observation of each unchanged script measures
403/no redirect/native CSRF body at the exact failed assertion. F011 requires nonce
from the same signed session before every unsafe POST, including import/login.
Legacy auth and operation tokens do not meet this precondition. Expected valid
302/200/DB/scoring behavior remains correct, so it is not obsolete functionality.
The approved test-only compatibility copies negotiate the real current nonce and
retain 76 original functional assertions. All 6 run standalone PASS. Negative
missing/wrong/session-other/stale nonce cases continue to return 403, with no business
mutation; legitimate multipart/form/JSON flows are accepted without false reject.
No product CSRF, status or authorization patch is justified.

## D002 conclusion — do not conflate three root causes

D002_CLASSIFICATION = LEGACY_EXPECTATION_OBSOLETE (3 expectations).
D002_CANONICAL_RESULT = PASS.

- F006 invalid-time and invalid-counts mixed-exam assertions observe session `_flashes`
  after rendering, whereas the native template has already displayed/consumed them.
  This is an obsolete observation assumption in the uncorrected legacy harness,
  not F012 or a new R4 product defect. The prior R3 UI observer documents the corrected
  observation layer. Canonical replacement verifies rendered field notice and unchanged
  exam state for all 151 malformed cases, retaining the functional requirement.
- F008 report-export expects marker metadata edited in the bank AFTER the exam to
  appear in historical Excel. Actual raw XLSX keeps R3EXCEL code/subject/Safe/NB and
  original question text, as Contract A requires. A return to live-bank metadata
  would break F012. Canonical replacement freezes marker before snapshot and then
  genuinely edits bank after submission; all report/Excel and attempt states remain
  unchanged, while Excel text/numeric safety is separately checked.

The precise per-assertion old/current contract, classification, replacement and result
are in UI_RC1_LEGACY_TEST_MATRIX.md and machine-readable evidence. No failed original
test is deleted, changed, skipped, xpassed or silently relabeled.

## Evidence sufficiency / decision

CONTRACT_EVIDENCE_INSUFFICIENT = NO. Current R4 security/history/test reports, middleware,
history readers, prior R3 observer and the explicit GV Contract A instruction agree.
Pre-R4 PREPROD undefined-contract audit is historical context, not the current policy.
Canonical expectations were written before execution; their checksum remains locked.

Fresh runs: R4 7/7; standalone native compatibility 6/6; browser 28/28 groups and all
UI01–UI28; CF011/CF006/CF012 3/3; 50 primary/mixed/deadline/race and 60 headroom PASS.
The new report resolves the current-contract gate only. LEGACY_RAW_RESULT remains
FAIL; the previous UI implementation report is not rewritten to say its old raw
suite passed. The candidate still contains its original legacy scripts: this round
does not claim build_exe.bat raw scripts pass without the separate test-only path.

No new release/candidate version is created, no RC2, no product patch or EXE build.
Windows and physical room acceptance still require GV action; not performed here.

## Final fields

```text
CANDIDATE_BEFORE_SHA256 = d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f
CANDIDATE_AFTER_SHA256 = d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f
CANDIDATE_MUTATED = NO
D001_CLASSIFICATION = TEST_HARNESS_INCOMPATIBLE
D001_CANONICAL_RESULT = PASS
D002_CLASSIFICATION = LEGACY_EXPECTATION_OBSOLETE
D002_CANONICAL_RESULT = PASS
R4_CANONICAL_REGRESSION = PASS
UI01_UI28 = PASS
CSRF_F011 = PASS
HISTORICAL_SNAPSHOT_F012 = PASS
50_CLIENT_SIMULATION = PASS
60_CLIENT_HEADROOM = PASS
PRODUCT_DEFECT_FOUND = NO
PRODUCT_PATCH_REQUIRED = NO
RECONCILIATION = PASS
WINDOWS_RUNTIME = NOT_RUN
PHYSICAL_50_PC = NOT_RUN
PRODUCTION = NO
```

STOP after these reports and artifact handoff; wait for GV decision.
