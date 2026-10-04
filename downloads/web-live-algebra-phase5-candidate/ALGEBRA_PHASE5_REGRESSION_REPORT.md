# ALGEBRA_PHASE5_REGRESSION_REPORT

LEGACY_RUNTIME_REGRESSION=PASS; GEOMETRY_PROFILE_REGRESSION=PASS; INFORMATICS_PROFILE_ISOLATION=PASS.

Reference thực sự là frozen Geometry Phase4 ZIP SHA256 `9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e` và 1.227-file manifest đã verify; baseline runtime port8775. Phase5 working copy port8776. Không dùng Phase2 thay cho frozen Geometry reference. Raw paths REGRESSION/FROZEN_GEOMETRY và REGRESSION/PHASE5 phản ánh đúng selected roots.

## Legacy paired regression

| Original package | Screens mỗi runtime | Hidden/full states mỗi runtime | Result |
|---|---|---|---|
| RC3_PED1_TEST_PACKAGES/TIN6_W04_LIVE_RC3_PED1.zip | 41 | 82 | PASS |
| RC3_PED1_TEST_PACKAGES/TIN6_W05_LIVE_RC3_PED1.zip | 32 | 64 | PASS |
| RC3_PED1_TEST_PACKAGES/TIN8_W04_LIVE_RC3_PED1.zip | 29 | 58 | PASS |
| WEB_LIVE/HINH_HOC_8_T04_T07_LIVE_TEST.zip | 34 | 68 | PASS |
| WEB_LIVE/HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip | 35 | 70 | PASS |

171 screens/342 states, 44 captured DOM/layout metrics và 15 assertions mỗi runtime, strict equality của real/visual/assertions. Demo 4 screens/8 states strict equality. Zero overflow/exceptions/external requests; lesson memory unchanged. Các package không explicit Algebra vẫn giữ behavior cũ; đây là runtime regression, không phải một lớp thật.

## Geometry paired regression

Frozen reference và Phase5 đều 14/14 native checks PASS, 35 screens/70 hidden/full states, 23 visual metrics mỗi runtime. Checks/realStates/visuals/persistentImageHashes/persistentScopes bằng nhau. Chỉ lessonActivation UUID được normalize trong cross-run visuals vì activation khác nhau theo import; parity Teacher/Preview/TV trong mỗi run đã được kiểm không normalize.

Bao gồm persistent authored figure, GT/KL contrast, progressive analysis/proof/future hidden, links/highlights, Focus, native zoom/return/reset, annotations undo/redo/clear, 70/30,60/40,figure fullscreen, object coordinate types, full lesson fit, Geometry vertical MCQ ở four sizes, refresh và zero teacher controls trên TV. G4-F03 Focus sửa trong frozen reference được giữ nguyên.

Approved G4-F01 auxiliary fixture SHA2564488b1997e416fa634a577900af76fff1dbf17de1eb4bd62eee3a772df7bcab8 dùng nguyên byte; không patch/import replacement vào candidate Geometry fixtures. G4-F02 zoom reset vẫn OPEN_DEFERRED P3; không tuyên bố được sửa. G4-F04 OPEN_DEFERRED P3 và G4-F05 VALIDATION_PENDING giữ nguyên. Core/Geometry byte comparison bảo đảm không patch những findings này.

## Isolation và transitions

14 native selection/fallback/negative groups + paired Demo PASS; Geometry ngay trong isolation cũng paired frozen reference. Missing/empty/unknown engine giữ Legacy; Informatics stub không sửa; selected lifecycle hooks đúng profile. Eight transition/race cases PASS, including actual MathJax-active Algebra → Geometry comparison, → Legacy/Informatics comparison, optional metadata, invalid future Focus and delayed work disposal/new-screen.

## Source scope

SOURCE_SCOPE.json PASS: frozen Geometry ZIP/files unchanged; one changed Algebra-owned module (original Legacy prefix byte-identical); six additions; 1.226 old files unchanged; no removal. WEB_LIVE_CORE_MUTATED=NO; GEOMETRY_PROFILE_MUTATED=NO; INFORMATICS_PROFILE_MUTATED=NO; LEGACY_BEHAVIOR_MUTATED=NO; SOURCE_SCOPE_VIOLATION=NO; PRODUCTION_MODIFIED=NO.

Raw REGRESSION_SUMMARY.json, source manifests, compare-regression.cjs and all runtime JSON/screenshots are delivered in evidence ZIP. New candidate was created only after PREPACKAGE_GATE PASS; fresh ZIP assets and smoke also PASS. No force push/main merge or Production action is part of this phase.

REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL=UNRUN. Không chuyển geometry/physical-classroom coverage chưa chạy thành PASS.
