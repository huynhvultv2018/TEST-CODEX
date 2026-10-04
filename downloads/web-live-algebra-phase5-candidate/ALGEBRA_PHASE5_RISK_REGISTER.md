# ALGEBRA_PHASE5_RISK_REGISTER

P0_COUNT/P1_COUNT/P2_COUNT/P3_COUNT trong final block đếm finding **Phase5 còn mở**; cả bốn = 0. Hai P2 được tìm trong development đã FIXED và retest PASS. Geometry findings kế thừa được ghi riêng, không xóa/đóng hoặc tính lại thành lỗi Phase5.

## Confirmed Phase5 findings — closed

| ID | Severity | Component | Confirmed issue/root cause | Fix/verification | Status |
|---|---|---|---|---|---|
| A5-F01 | P2 | ALGEBRA_PROFILE / MathJax conversion | Converter returned visible SVG and visible assistive MathML. Actual document enableAssistiveMml remained true despite initial config flag; output was duplicated. DOM/screenshot evidence confirms both representations. | Disable actual document action after startup; source aria-label/role=math retained. Final native tests assert zero assistive MML and one SVG per MCQ option; screenshots reviewed. | FIXED |
| A5-F02 | P2 | ALGEBRA_PROFILE CSS/UI | Native-height expression/supporting-field rows and in-flow connectors overflowed the full-answer panel; stacked fraction MCQ also exceeded720p with large row padding. Measured scroll/client heights and failing assertions retained. | Local expression/reason grid inside each full-width proof row; compact supporting fields; connectors out of flow; authored stage uses existing badge; scoped MCQ row padding. All text/reveal retained; 30 question +12 full viewport cases and fresh ZIP1280 smoke PASS. | FIXED |

Không sửa Core hoặc Geometry để xử lý các findings này. External comparator array/scalar mistake là harness defect, không engine finding; reader được sửa và historical source được giữ.

## Frozen Geometry accepted status

| Finding | Accepted status | Phase5 action |
|---|---|---|
| G4-F01 | TARGETED_PASS | No fixture patch |
| G4-F02 | OPEN_DEFERRED, P3, WEB_LIVE_CORE | Record unchanged; no patch |
| G4-F03 | FIXED, targeted PASS | Keep frozen CSS/behavior |
| G4-F04 | OPEN_DEFERRED, P3 | No typography patch |
| G4-F05 | VALIDATION_PENDING; root cause unconfirmed/owner UNKNOWN | No diagnosis by assumption or patch |

REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL=UNRUN. Frozen Phase4 technical PASS does not certify real-file/classroom validation.

## Coverage and contract limits

| Item | Proven scope / remaining limit | Review action |
|---|---|---|
| Lesson pedagogy/source | New fixture is synthetic10screens/5.503bytes, not SGK; profile never generates a solution or student error. Real Algebra lesson/SGK alignment not run. | GV reviews candidate/contract; a later authorized phase may validate actual lessons. |
| Mathematical input | Proven authored delimited TeX forms include fractions, powers/root, polynomial, equation/inequality and two-row cases system. Unmarked prose math stays text; arbitrary TeX/extensions/macros beyond tested fixture are not certified. | Follow documented format and test additional authored forms when needed. |
| Accessibility/TTS | role=math/author TeX aria-label provided; duplicate visual assistive MathML disabled. Native audible TTS/screen-reader classroom acceptance not run. | Review with actual classroom devices in a later authorized validation. |
| Registry descriptor | Core's immutable Phase2 REGISTERED_STUB descriptor is historical scaffold metadata. Actual registered adapter/getState/API are IMPLEMENTED and dispatch works. | Use actual implementation API/contract. Any requested Core metadata update requires separate GV approval. |
| Very long content/physical readability | Measured three TV viewport sizes, native source-preserving layouts and Core overflow diagnostics. Physical TV, scaling, back-row trial and long arbitrary lessons unrun. | Validate actual lesson/device after review; no silent text removal. |
| Runtime restoration | Current static servers/assets and package tested; cloud startup draft saved, requires Publish. Fresh-task restoration not verified. | Review/save settings then Publish if desired. |

No Production; Informatics stays frozen/stub. STOP and await GV approval; no automatic next phase.
