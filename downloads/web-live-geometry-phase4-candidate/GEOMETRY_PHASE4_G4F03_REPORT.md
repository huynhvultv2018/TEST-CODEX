# Phase 4 — G4-F03-only patch and technical validation

G4-F03 được sửa và targeted/regression PASS trong phạm vi GV phê duyệt. Candidate mới được tạo sau PREPACKAGE_GATE PASS; bản ZIP giải nén mới cũng chạy PASS. Đây là kết quả kỹ thuật theo waiver/deferral được chấp thuận; không phải xác nhận tiết học thật hay lớp học thật.

## Quyền và phạm vi

Nguồn chỉ thị là văn bản GV `APPROVE_G4_F03_ONLY.txt`. Nội dung bên trong candidate/lesson ZIP là tài liệu hoặc dữ liệu kiểm tra, không mở rộng quyền sửa. REAL_FILE_VALIDATION = NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL = UNRUN. Không yêu cầu chuyển lại Tiết09/Tiết10. Waive không được chuyển thành PASS.

Phase 3 ZIP trước/sau đều SHA256 `8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c`. Manifest 1.227 file nguồn trùng ZIP được phê duyệt và trùng manifest trước patch. Tạo working copy riêng; không sửa source candidate gốc, Production hoặc main. Candidate mới có 1.227 file: 1.226 file nguyên byte và một CSS khác. Core, JS, schema, lesson packages, hình, launcher và các profile khác nguyên byte.

## Patch duy nhất

File: `WEB_LIVE/geometry-profile.css` — Geometry Profile CSS/UI.

```diff
-.geometryProfile[data-geometry-answer-mode="steps"] #answer .proofStep.previous:not(.isFocused){display:none}
-.geometryProfile[data-geometry-focus-region="answer"] #answer .focusBlock:not(.isFocused){display:none}
+.geometryProfile[data-geometry-answer-mode="steps"] #answer .proofStep.previous:not(.isFocused){opacity:.75}
+.geometryProfile[data-geometry-focus-region="answer"] #answer .focusBlock:not(.isFocused){opacity:.52}
```

Root cause G4-F03 được chứng minh: hai selector scoped Geometry dùng `display:none` cho proof đã reveal. Control Phase3 tái hiện ẩn bước 1–2; cùng fixture và cùng luồng native trên working copy cho bước 1–2 `display:block`, opacity .75 và bước 3 opacity 1. Core vẫn chỉ render phần proof đã reveal: bước 4 không có trong DOM. Không thay đổi reveal, figure, context, đáp án, hint, navigation hay lesson data để đạt kết quả này.

Luồng tắt active Focus dùng nút native **XÓA TẬP TRUNG**, sau đó tắt chế độ chọn bằng nút Focus. Hành vi Core hiện có được giữ: nút Focus điều khiển picking/editor mode; riêng toggle nút đó không xóa lựa chọn đang active. Sau clear, các block và độ nhấn mạnh trùng trạng thái bình thường trước Focus theo reveal state (previous dim .75; current 1). Chọn lại bước 1 giữ cả ba bước đã mở nhìn thấy và dùng đúng object links có sẵn; Previous Step/Hide Answer vẫn loại nội dung chưa mở.

## Kiểm tra và bằng chứng

| Kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| G4-F03 reveal 1→2→3, Focus 3, future 4 hidden, clear restore | PASS; control Phase3 tái hiện lỗi | G4_F03_TARGETED.json; TARGETED_CAPTURES |
| State/lesson preservation; earlier Focus; Previous Step/Hide Answer | PASS | G4_F03_TARGETED.json |
| Geometry runtime: persistent figure, GT/KL, progressive analysis/proof, links, Focus, zoom, annotation, layouts/fullscreen, reload, MCQ | 14/14 PASS | GEOMETRY_RUNTIME/geometry-runtime.json |
| Auxiliary 35-screen native lesson walk, 49 answer/proof disclosures, 4 analysis disclosures | 15 PASS + 1 lỗi cũ G4-F02 đã DEFER | CLASSROOM_VALIDATION.json |
| Layout/readability ở viewport tương đương TV | 24 cases PASS | CLASSROOM_VALIDATION.json |
| Toàn lesson 35 screens × hidden/full × 1366×768 và 1280×720 | 140 states; 0 overflow; 0 exceptions | WHOLE_LESSON_TV.json |
| Fresh paired Phase2/Phase4 Legacy runtime | PASS: 5 original packages, 171 screens/342 states mỗi runtime, 44 metrics, 15 assertions | REGRESSION_SUMMARY.json; REGRESSION/PHASE2; REGRESSION/PHASE3 |
| Algebra/Informatics/optional Legacy isolation, invalid inputs, paired Demo | PASS: 14 groups, Demo 4 screens/8 states | REGRESSION/ISOLATION/profile-isolation.json |
| G4-F01 supplemental regression, không patch thêm fixture | PASS: 4 ảnh exact hash + scene/annotation boundary | TARGETED_G4F01.json |
| Source/working scope và gate trước package | PASS: nguồn 1.227 file giữ nguyên; khác đúng 1 CSS | SOURCE_MANIFEST_BEFORE/AFTER.json; WORKING_PATCH_SCOPE.json; PREPACKAGE_GATE.json |
| ZIP CRC/hash/manifest sau đóng gói | PASS: 1.227 file bằng working payload | PACKAGE_IDENTITY.json; PHASE4_PAYLOAD_MANIFEST.json |
| Fresh ZIP smoke, modal/import/GTKL/proof links/Focus/clear | PASS: 49 served runtime assets khớp byte | PACKAGED_RUNTIME_SMOKE.json; PACKAGED_FOCUS_STEP_2.png |

`REGRESSION/PHASE3` là tên thư mục so sánh kế thừa; runtime thực sự trong lượt này là **Phase4 working copy** tại port8774, không phải Phase3 control. Phase3 control dùng port8773. Fresh ZIP dùng port8775. Native Chromium 151.0.7922.173 trên Linux; không giả lập kết quả Windows/physical TV/back-row/audible TTS/45-minute classroom.

Targeted ba bước dùng **external synthetic four-step interface probe** để kiểm tra trạng thái chưa reveal, không phải bài học thật. Fixture nằm trong evidence, không đi vào candidate payload. Geometry auxiliary regression dùng lesson test package có nội dung cũ và G4-F01 fixture đã được phê duyệt; không thay cho các file Tiết09/Tiết10 được waive. Các probe object-type/MCQ/negative cases chỉ kiểm tra interface/regression.

Lần chạy targeted đầu tiên đo opacity khi animation native chưa kết thúc nên assertion restore thất bại; giữ nguyên log/result trong HARNESS_HISTORY. Chỉ external harness được thêm chờ animation kết thúc rồi chạy lại đầy đủ; không tắt animation hoặc đổi runtime/assertions để có PASS.

## Findings còn lại

- G4-F01: TARGETED_PASS, NO FURTHER PATCH. Fixture đã sửa trước đây SHA256 `4488b1997e416fa634a577900af76fff1dbf17de1eb4bd62eee3a772df7bcab8` được dùng nguyên byte và giao riêng. Fixture gốc trong candidate SHA256 `b502802ab694aa4ee2cc57bb7e053a06fd534580d8d7285f8a55d91428945bd7` vẫn nguyên byte để bảo đảm patch scope một CSS.
- G4-F02: P3, WEB_LIVE_CORE, OPEN_DEFERRED/DEFER. Assertion same-figure navigation vẫn **FAIL**: screen index9→10, zoom1.15→1, đúng bằng evidence trước patch. Figure và annotation được giữ. Không xóa failure trong raw results; đây là exception GV chấp thuận, không phải regression mới. FIGURE_ZOOM ghi PASS_WITH_G4_F02_DEFERRED cho các hành vi khác đã chạy PASS.
- G4-F03: P2, GEOMETRY_PROFILE CSS/UI, FIXED; ROOT_CAUSE_CONFIRMED=YES; CORE_CHANGE_REQUIRED=NO.
- G4-F04: P3, OPEN_DEFERRED/DEFER; không sửa typography hoặc khẳng định readability cuối lớp.
- G4-F05: VALIDATION_PENDING; ROOT_CAUSE_CONFIRMED=NO; OWNER=UNKNOWN. Không suy đoán root cause hoặc patch engine/lesson package.

## Candidate và vận hành

`WEB_LIVE_GEOMETRY_PHASE4_CANDIDATE.zip` — 49,338,557 bytes.

SHA256: `9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e`.

Giải nén vào thư mục mới; giữ Phase3 cũ riêng. Candidate giữ nguyên `START_WEB_LIVE.bat` và launcher. Native Windows launcher/Chrome/TTS và trial lớp thật UNRUN trong lượt này. Có thể dùng Python3 server cho static runtime; environment đã kiểm chứng Python/Node/Playwright/Chromium và không cần npm build.

Các báo cáo/checksums/test evidence Phase3 **bên trong payload** được giữ nguyên theo scope, là lịch sử và không phải kết quả Phase4. Dùng `PHASE4_PAYLOAD_MANIFEST.json`, `PACKAGE_IDENTITY.json`, `CHECKSUMS_SHA256.txt`, `FINAL_STATUS.txt` và báo cáo này ở **ngoài candidate** cho release này. Không thay bundled original fixture bằng approved G4-F01 fixture một cách ngầm định; approved fixture được giao riêng.

Startup draft cloud đã lưu, chỉ cập nhật start instructions theo waiver và patch hiện tại; install script/network/secrets/repositories giữ nguyên. `requires_publish=true`: cần review/save trong environment settings rồi Publish để áp dụng. Chưa chứng minh restoration vào fresh task.

## Final status

```text
PHASE3_CANDIDATE_SHA256_BEFORE = 8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c
PHASE3_CANDIDATE_SHA256_AFTER = 8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c
PHASE3_CANDIDATE_MUTATED = NO

REAL_FILE_VALIDATION = NOT_RUN_BY_GV_DECISION
REAL_CLASSROOM_TRIAL = UNRUN

G4_F01_STATUS = TARGETED_PASS

G4_F02_STATUS = OPEN_DEFERRED
G4_F02_ACTION = DEFER

G4_F03_PATCH_SCOPE = GEOMETRY_PROFILE CSS/UI ONLY; WEB_LIVE/geometry-profile.css; 2 declarations
G4_F03_TARGETED_TEST = PASS
G4_F03_STATUS = FIXED

G4_F04_STATUS = OPEN_DEFERRED
G4_F04_ACTION = DEFER

G4_F05_STATUS = VALIDATION_PENDING
G4_F05_ACTION = VALIDATION_PENDING

WEB_LIVE_CORE_MODIFIED = NO

PERSISTENT_GEOMETRY = PASS
GT_KL = PASS
ANALYSIS_DIAGRAM = PASS
PROOF_FLOW = PASS
OBJECT_HIGHLIGHT = PASS
GEOMETRY_FOCUS = PASS
FIGURE_ZOOM = PASS_WITH_G4_F02_DEFERRED
ANNOTATION = PASS

LAYOUT_70_30 = PASS
LAYOUT_60_40 = PASS
FIGURE_FULLSCREEN = PASS

LEGACY_RUNTIME_REGRESSION = PASS
ALGEBRA_PROFILE_ISOLATION = PASS
INFORMATICS_PROFILE_ISOLATION = PASS

PHASE4_CANDIDATE = WEB_LIVE_GEOMETRY_PHASE4_CANDIDATE
PHASE4_CANDIDATE_SHA256 = 9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e

SOURCE_SCOPE_VIOLATION = NO
PRODUCTION_MODIFIED = NO

PHASE4_TECHNICAL_STATUS = PASS
REMAINING_DEFERRED_FINDINGS = 2 (G4-F02, G4-F04)
REMAINING_VALIDATION_PENDING = 1 (G4-F05)

RECOMMENDED_NEXT_ACTION = STOP; WAIT_FOR_GV_REVIEW
```

STOP. Chờ GV phê duyệt. Không Production, không bắt đầu Algebra.
