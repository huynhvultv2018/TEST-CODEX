# ALGEBRA_PHASE5_TEST_EVIDENCE

Browser native Chromium 151.0.7922.173 trên Linux. Không mock MathJax/Core/disclosure. Native Teacher importer/buttons/Focus drives real TV popup và native preview. Tests/helpers/evidence ở ngoài source/candidate; runtime assets served và verified từ selected roots.

## Targeted — PASS

Fixture: ALGEBRA_PHASE5_TEST_PACKAGES/ALGEBRA_PROFILE_REPRESENTATIVE_TEST.json, 10 screens, 5.503 bytes, TEST_ONLY_NOT_SGK. Có expression/fraction/root/power, bốn transformation steps, equation/inequality/system, authored comparison, hint/answer, optional stages và vertical MCQ. Fixture không chứng minh SGK alignment hoặc lớp thật.

| # | Check | Result |
|---|---|---|
| 1 | MATHJAX_RENDERING + EXPRESSION_RENDERING: local SVG powers/root/polynomial | PASS |
| 2 | Hidden hint source and answer absent from TV DOM | PASS |
| 3 | FRACTION_RENDERING: numerator above denominator with visible bar | PASS |
| 4 | HINT_CONTROL: native toggle reveals/hides only hint, no answer | PASS |
| 5 | STEP_REVEAL + STEP_HIGHLIGHT: native 1→2→3, current/completed/disclosure states; future4 absent | PASS |
| 6 | ALGEBRA_FOCUS: previous visible/dim, current strong, exact clear restoration and preserved native state | PASS |
| 7 | Earlier-step Focus changes emphasis only; native current step remains current | PASS |
| 8 | Previous Step/Hide Answer remove later proof and all concealed metadata | PASS |
| 9 | ANSWER_CONTROL + authored original/transformation/reason/result: full only on native command | PASS |
| 10 | EQUATION_RENDERING: native equation and disclosed transformation rendered SVG | PASS |
| 11 | INEQUALITY_RENDERING: authored inequality direction and reason preserved | PASS |
| 12 | SYSTEM_RENDERING: brace, two separate equation rows, not flattened | PASS |
| 13 | ERROR_COMPARISON: authored student/correct/rule only after associated step reveal | PASS |
| 14 | No student error or correction invented on a lesson without error-comparison data | PASS |
| 15 | All eight optional authored pedagogical stages; ten-screen questions fit three TV viewports | PASS |
| 16 | Algebra MCQ preserves four full-width vertical options, one rendered formula per option and separate instruction | PASS |
| 17 | Disclosed transformation/inequality/system/error-comparison fit 12 TV viewport cases | PASS |
| 18 | Local MathJax continues after network disabled once assets are loaded | PASS |
| 19 | Native Teacher controls and embedded student preview share TV MathJax/disclosure | PASS |
| 20 | NO_TEACH_AHEAD: source memory unchanged, no generated methods, no future/answer/hint leak, no external runtime requests/errors | PASS |

Raw: ALGEBRA_TARGETED.json, TARGETED_ALGEBRA_RUN.log, targeted-algebra.cjs. Fraction test kiểm SVG mfrac, numerator y < denominator y và fraction bar; system test kiểm brace, hai mtr rows và hai equals glyph. Step/Focus tests kiểm native states, absence của future/correction/conclusion/hint trong DOM và state invariants. 30 question viewport cases và 12 full-answer viewport cases đều không overflow ngang/dọc. Assertions không bị bỏ hoặc nới để có PASS.

## Lifecycle/async transitions — PASS

| Case | Result |
|---|---|
| MathJax-active Algebra → Geometry native proof2 matches frozen Phase4 after cleanup | PASS |
| Algebra cleanup → informatics matches frozen runtime | PASS |
| Algebra cleanup → missing Legacy matches frozen runtime | PASS |
| Algebra cleanup → unknown matches frozen runtime | PASS |
| Algebra metadata/stage optional; no pedagogical chain or hint generated | PASS |
| Invalid/future Focus index does not reveal or hide any proof | PASS |
| Delayed MathJax job → new-screen rejects stale insertion | PASS |
| Delayed MathJax job → geometry-dispose rejects stale insertion | PASS |

Raw PROFILE_TRANSITIONS.json, profile-transitions.cjs. Hai race cases delay local MathJax bundle 600ms ở test harness; runtime không thêm delay. Actual MathJax-active Algebra chuyển Geometry/Legacy/Informatics phải bằng frozen snapshot; không chỉ so profile label.

## Fresh ZIP — PASS

PACKAGED_ALGEBRA_SMOKE.json: 53 assets (50 root runtime + three MathJax files) match exact bytes, eight checks; modal close/reopen, bundled JSON import, fraction, reveal/Focus/clear, full four-step answer/conclusion at1280×720, system rows, authored error disclosure, vertical MCQ/one formula per option, unchanged lesson memory. Errors/external runtime requests = 0.

PACKAGE_IDENTITY.json/PHASE5_PAYLOAD_MANIFEST.json: ZIP CRC PASS, 1.233 files equal tested working copy. SHA256 `575b466dc839d54c6ad91327bc5a7454ece42cbacfd69ae916eca4aa1bcaf01d`. PACKAGED_FULL_TRANSFORM_1280.png được kiểm tra trực quan: đủ bốn bước, quy tắc, original/result/conclusion; không clip. Target screenshots Focus3, stacked fraction, system và MCQ cũng được kiểm tra.

## Failure history giữ nguyên

ATTEMPT1/2: native MCQ720p overflow; screenshots và MathJax display probe cho thấy visible SVG + visible assistive MathML. Initialization flag không đổi actual MathJax document action; explicit document flag false loại duplicate output, supplied aria-label giữ accessibility source. MCQ scoped padding được giảm, giữ native readable floor.

ATTEMPT3/4: full transformation with supporting fields overflow. FULL_TRANSFORM_BEFORE_METRICS ghi pane/scroll 945/1031 tại1920, 664/747 tại1366 và 621/725 tại1280; MathML duplicate đã 0. Fix local row grid, inline supporting fields, stage label dùng native badge, connectors ra khỏi flow; giữ toàn bộ text và reveal state. Final target/full ZIP smoke PASS. Không sửa Geometry hoặc Core.

COMPARE_ATTEMPT1.cjs có external reader assertion nhầm `realStates` array là scalar70. Sửa reader thành `.length===70` và thêm strict array equality/overflow assertions. Browser runs không đổi, không rerun/patch engine để che lỗi reader.

Native Windows launcher/physical TV/scaling/back-row/audible TTS/actual classroom trial = UNRUN. REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION. Những trạng thái này không phải PASS.
