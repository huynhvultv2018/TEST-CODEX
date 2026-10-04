# Geometry runtime test

**GEOMETRY_RUNTIME = PASS** ở Linux native Chromium 151.0.7922.173. Test chạy bằng Playwright trên HTTP source thật, actual popup TV/embedded Preview, actual pointer/keyboard và inherited controllers. Không mock voice, renderer output hoặc native Launcher.

## Test lesson

`GEOMETRY_PHASE3_TEST_PACKAGES/HINH8_VD2_GEOMETRY_PROFILE_TEST.zip` được tạo từ `WEB_LIVE/HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip`. Giữ nguyên mọi field cũ, 35 screens, nội dung, thứ tự, SGK/PPCT references và asset bytes. Chỉ thêm lesson.subject_engine, lesson.geometry và screen.geometry. Provenance/hashes nằm trong `TEST_PACKAGE_PROVENANCE.json`.

Ví dụ 2: ABCD hình bình hành; AH, CK ⟂ BD; chứng minh AHCK hình bình hành. Nội dung analysis/proof/conclusion lấy nguyên từ package có sẵn. Tọa độ A/B/C/D/H/K được author thủ công theo raster 1620×675; engine không nhận dạng hình. Circle/line/ray/label/mark fixture là ca renderer riêng, không thêm giả thiết vào bài thật.

## TEST / INPUT / EXPECTED / ACTUAL / RESULT

| TEST | INPUT | EXPECTED | ACTUAL | RESULT |
|---|---|---|---|---|
| Load | Geometry enriched real ZIP | Import đúng profile, base figure | 35 screens, metadata geometry, PNG decoded | PASS |
| GT/KL | Screen index 5 / màn 6, arrays givens/goals | Hai khối rõ, từ data, không tự answer/highlight | Labels GIẢ THIẾT/KẾT LUẬN; highlight empty; contrast ≥4.5 | PASS |
| Persistent figure | Index 5→6→7→8→9→10 | Cùng ảnh và annotation scope | Sáu image SHA identical, six scope identical | PASS |
| Analysis | Index 7, reveal 1 rồi 2 | Chỉ disclosed nodes; đổi highlights | AH/CK → AH/CK/BD; ∆AHD chưa reveal không vào text DOM | PASS |
| Proof 1 | Index 9, revealStep lần 1 | Step 1 + related objects | AD/CB + angle_ADH/angle_CBK; future proof absent | PASS |
| Proof 2 | revealStep lần 2 | Step 2 + highlight change | triangle_AHD/triangle_CKB + AH/CK | PASS |
| Geometry Focus | Existing Focus Mode, click dòng proof đầu | Bước đã reveal và đối tượng liên quan cùng được focus | Highlight trở lại AD/CB/góc; TV isFocused=1; Teacher/TV/Preview state parity | PASS |
| Future Focus | Fake Focus index chưa reveal | Không teach ahead | Future proof vẫn vắng; không chọn future link | PASS |
| Zoom/layout | zoomBy, native 70/30, 60/40 | Giữ proof/highlight, ratio phù hợp | Zoom=1.4; ratios >2 và 1.35…1.7; step vẫn 2 | PASS |
| Figure fullscreen/return | Double-click TV figure hai lần | Text pane ẩn/hiện; proof/object state không mất | Native Teacher roundtrip; highlight IDs giữ nguyên | PASS |
| Annotation | Add point, undo/redo, next cùng hình | Nét GV sống qua bước; base không đổi | Overlay record giữ trong scene, cùng base SHA | PASS |
| Clear annotation | Click Geometry XÓA CHÚ THÍCH + confirm | Xóa nét, giữ hình | Overlay empty, base SHA unchanged | PASS |
| Movable annotation | Native mouse drag point; Ctrl+Z/Y | Điểm GV di chuyển, undo/redo đúng | Coordinates thay đổi rồi restore/reapply; base image không đổi | PASS |
| Reset | VỀ HÌNH GỐC | Native zoom/pan/pointer/Focus reset, giữ proof | Zoom=1, proof step=1, highlight đúng | PASS |
| Conclusion | Index 10 reveal | Hình tồn tại; conclusion đúng package | AHCK là hình bình hành; AH/CK/HC/AK highlight | PASS |
| New figure | Index 11, explicit LT2/reset | New image/scope, không lẫn annotation VD2 | New figure SHA/scope; overlay empty | PASS |
| Same-figure reset | Contract fixture reset cùng ID | Base image giữ, scope mới | Cache key khác; imageData same | PASS (contract) |
| Full Geometry walk | 35 screens × question/full | Không overflow/mutation/crash | 70 states, 0 overflow; JSON memory lesson unchanged | PASS |
| Object model | Authored point/segment/angle/triangle/circle/line/ray/label/mark IDs | Render explicit coordinates only | SVG types và IDs khớp input | PASS |
| Four TV sizes | 1920×1080, 1600×900, 1366×768, 1280×720 | GT/KL, analysis/proof fit | 23 captures total, all checked pane overflow/horizontal=false | PASS |
| Geometry MCQ | Three options + instruction + GT metadata present | MCQ full-width vertical, không bị statement thay thế | Four sizes: 3 independent rows; instruction separate | PASS |
| Refresh | TV reload at proof step 2 | Restore figure/proof/highlight | Authored triangles + AH/CK restored từ existing state | PASS |
| Teacher/TV separation | Geometry controls và notes | Teacher only | TV button count ngoài Fullscreen=0; private note absent | PASS |
| Bad metadata | Unknown figure/source/object, non-finite coordinate | Không crash hoặc đoán hình/đối tượng | Empty invalid highlight, future proof absent; 14 isolation/negative cases tổng | PASS |
| Windows/physical TV/audio/native app | Môi trường cloud Linux | Không tuyên bố acceptance giả | UNRUN | UNRUN |

## Evidence

- `geometry-runtime.json`: 14 grouped runtime checks, 70 real Geometry states, 23 captures, image/scope proof và zero errors.
- `geometry-contract.json`: 8 boundary/metadata groups, không mutation/guessing; reset epoch và frozen other-profile descriptors.
- `annotation-move.json`, `ANNOTATION_MOVE.png`: mouse drag + keyboard undo/redo thật.
- `profile-isolation.json`: 14 metadata/switch/negative cases, paired Demo 4 screens/8 states.
- `PHASE2/` và `PHASE3/`: global suites chạy độc lập; paired comparator assert equality.
- `SOURCE_INTEGRITY.json`, `RUNTIME_PATCH.diff`, `CONTROLLED_RISK_PREFLIGHT.md`: source/scope/risk bằng chứng.

PERSISTENT_GEOMETRY, GT_KL, ANALYSIS_DIAGRAM, PROOF_FLOW, OBJECT_HIGHLIGHT, GEOMETRY_FOCUS, FIGURE_ZOOM, ANNOTATION = PASS trong phạm vi đã chạy. Dynamic base geometry không triển khai; movable teacher annotation được giữ và kiểm chứng. Không dùng dòng PASS này để chứng nhận Windows/native release.
