# WEB LIVE Geometry Phase 3

**PHASE3_STATUS = PASS**. Candidate riêng `WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE`. Không Phase 4, không feature Algebra/Informatics, không promote Production.

## Source of truth và risk preflight

Phase 2 ZIP SHA256 trước/sau: `6e83a63792fff16d890b5f12bc3b990dc43bdfec3e360b7a8bbe3a10e813f38c`. Giải nén trực tiếp thành working candidate riêng; kiểm tra 985 file gốc và ZIP CRC trước sửa. Candidate Phase 2 tại thư mục gốc cũng được đối chiếu đủ 985 file sau sửa.

CONTROLLED_RISK_COUNT_BEFORE = **6**; PHASE3_BLOCKING_RISK_COUNT = **0**. Bảng đầy đủ RISK_ID/COMPONENT/TRIGGER/IMPACT/MITIGATION/PHASE3_BLOCKING đã xuất **trước implementation** tại `GEOMETRY_TEST_EVIDENCE/CONTROLLED_RISK_PREFLIGHT.md`. Tất cả P2-R01…P2-R06 là NO. Không tự sửa legacy stage divergence, malformed board packet, offscreen TTS timing hoặc native Windows/audio risks.

## Geometry đã triển khai

- Figure registry tham chiếu ảnh đã được importer nạp bằng sourceScreenId, timeline deterministic và figure identity/scoped annotation. Step đổi không xóa figure context; explicit new figure/reset đổi scope. Reset cùng figure cũng tạo epoch riêng cho annotation, giữ base image.
- GT/KL từ metadata lesson package, khối chữ lớn và contrast kiểm tra ≥4.5. Không override MCQ question/options/instruction.
- Existing analysis diagram/analysisSteps và proof reveal được kế thừa; proof/analysis links chọn object IDs do package cung cấp. Focus vào bước đã reveal chọn highlight tương ứng; future Focus không mở bước chưa reveal.
- Point/segment/angle/triangle/circle highlight; line/ray/label/mark/alias hỗ trợ model rendering. Không đọc tên cạnh từ prose, không hiểu hình bằng AI, không tự sinh lời giải.
- Layout 70/30, 60/40, figure fullscreen/double-click, zoom/pan, drawing/eraser/undo/redo dùng implementation hiện hữu. Layer highlight mới không chặn pointer. Base figure, authored objects và teacher annotation tách nhau.

Geometry active chỉ khi resolver chọn `geometry`. Algebra/Informatics descriptor và engine file không đổi; Legacy hợp lệ giữ behavior Phase 2. Generic Core chỉ bổ sung trusted selected-profile adapter tại hai ranh giới visual/presentation. Không full extraction.

## Bằng chứng và gate

| Gate | Result / Evidence |
|---|---|
| PHASE2_CANDIDATE_MUTATED | NO; SOURCE_INTEGRITY.json, parent SHA và 985 file |
| GEOMETRY_PROFILE / GEOMETRY_RUNTIME | PASS; 8 contract groups, 14 native runtime checks |
| PERSISTENT_GEOMETRY / GT_KL / ANALYSIS_DIAGRAM / PROOF_FLOW | PASS; real package VD2 flow, 35 screens × 2 states |
| OBJECT_HIGHLIGHT / GEOMETRY_FOCUS / FIGURE_ZOOM / ANNOTATION | PASS; native click/zoom/double-click/annotation clear; point drag + Ctrl+Z/Y |
| LEGACY_RUNTIME_REGRESSION | PASS; 175 screens / 350 states paired with Phase 2, 44 matching visual metrics |
| ALGEBRA_PROFILE_ISOLATION / INFORMATICS_PROFILE_ISOLATION | PASS; same runtime snapshots as Phase 2, no Geometry layer/control/adapter state |
| TV readability / vertical MCQ | PASS; 23 Geometry captures over four sizes; 40 inherited vertical checks and 31 captures |
| SOURCE_SCOPE_VIOLATION / PRODUCTION_MODIFIED | NO / NO |

Native browser tests use Linux Chromium 151.0.7922.173 and actual DOM/pointer/Fullscreen/transition APIs. Không có voice/native-app mocks. Windows/physical TV/audio/Word/GeoGebra acceptance vẫn UNRUN, giữ risk P2-R03.

## Ba risk mới — NEW_RISK_COUNT = 3

| RISK_ID | COMPONENT | TRIGGER | EVIDENCE | IMPACT | MITIGATION | PHASE3_BLOCKING |
|---|---|---|---|---|---|---|
| G3-R01 | Authored object anchors/links | Author gán nhầm object ID hoặc tọa độ không khớp ảnh | TEST_PACKAGE_PROVENANCE.json; normalized raster anchors; negative cases bỏ invalid/dangling reference | Highlight có thể không đúng ý nghĩa dù engine render đúng dữ liệu | Kiểm tra metadata/ảnh khi SOẠN_TRƯỚC và package review; engine không tự suy luận/correct proof; nguồn sai phải sửa ở package | NO |
| G3-R02 | Dynamic base geometry | Muốn di chuyển điểm gốc, giải constraint và cập nhật hình/quan hệ tự động | Object model chỉ highlight authored data; annotation-move.json xác nhận điểm annotation cũ vẫn kéo được | Chưa có GeoGebra-style dynamic base construction | Giữ movable teacher annotation hiện tại; defer dynamic base/constraint engine vào roadmap sau phê duyệt, dùng native GeoGebra nếu cần | NO |
| G3-R03 | Arbitrary long authored GT/KL/proof | Package mới có dữ liệu dài hơn nguồn đại diện hoặc nhiều highlight cùng lúc | 70 Geometry states + captures bốn sizes PASS; TV fit giữ floor/overflow flag hiện hữu | Không bảo đảm mọi package tương lai readable từ cuối lớp | Chunk proof ngắn ở SOẠN_TRƯỚC; package acceptance trên bốn sizes và máy đích; không âm thầm clip/thu nhỏ vô hạn | NO |

Ba risk này không chặn candidate đã kiểm thử. Sáu risk kế thừa vẫn tồn tại; native acceptance tiếp tục chặn kết luận release/Production. Không gọi dynamic-base deferred là PASS.

## Delivery và dừng

Bốn báo cáo, `GEOMETRY_TEST_EVIDENCE/`, test package, test scripts và source đầy đủ nằm trong ZIP riêng. `PHASE3_CHECKSUMS_SHA256.txt` xác minh extracted files; ZIP SHA256 ở delivery sidecar vì ZIP không thể tự chứa hash của nó.

Dừng sau implement → test → regression → package → report. Đề xuất GV review runtime/evidence; Phase 4 chỉ sau phê duyệt riêng. Bản nháp startup cloud đã lưu, chưa publish và chưa chứng nhận fresh-task restoration.

Fresh ZIP extraction smoke: PASS. Tất cả 49 served HTML/JS/CSS assets khớp payload; actual Geometry import/GT-KL/proof highlights/modal và zero runtime errors đạt. Tested extracted runtime bytes khớp final candidate. Final ZIP CRC/manifest/hash nằm trong delivery sidecar.
