# WEB LIVE Geometry — Phase 4 validation

**PHASE4_STATUS = NOT_PASS. CLASSROOM_READINESS = NOT_READY_FOR_WHOLE_LESSON.** Validation hoàn tất; candidate chưa phù hợp để dùng nguyên trọn lesson đã chọn. Blocker là hình LT2 tiếp tục xuất hiện khi chuyển sang Thực hành 2, Ví dụ 3, Luyện tập 3 và Vận dụng, dù packet có ảnh khác. Không patch, không feature mới, không Production.

## Nguồn, phạm vi và integrity

Source duy nhất: `WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE.zip`, SHA256 trước/sau `8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c`. CRC PASS; 1.227 extracted files trước/sau byte-identical; 49 served HTML/JS/CSS assets khớp source. Evidence ở ngoài candidate. Xem `GEOMETRY_PHASE4_TEST_EVIDENCE/SOURCE_IMMUTABILITY.json` và `SERVED_RUNTIME_IDENTITY.json`.

Yêu cầu nhận được kết thúc giữa mục 16 tại `RISK_ID = / TR`; đã hỏi bổ sung phần còn lại. Báo cáo này bao phủ mọi yêu cầu hiển thị trong văn bản đã nhận, không giả định gate/format ở phần chưa nhận. Bản exact text giữ trong evidence.

## Lesson và workflow

Dùng bài có sẵn **Bài 12. Hình bình hành — Dấu hiệu nhận biết**, lớp 8, tuần 4, tiết 7 theo metadata packet. Original `HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip` có 35 screens. Phase 3 enrichment giữ nguyên toàn bộ nội dung, thứ tự, manifest và 15 raster assets; chỉ thêm Geometry metadata. Không tạo bài giả, đổi SGK/PPCT hoặc thêm nội dung để ép PASS. Tên source/manifest cho biết đây là gói thử; chưa có SGK/PPCT bản gốc hoặc một packet SOẠN_TRƯỚC trọn tiết đã được GV nghiệm thu để chứng nhận curriculum/45 phút độc lập.

Original package chọn Legacy vì thiếu `subject_engine`; enrichment chọn Geometry. **MANUAL_INTERVENTION_COUNT = 0** chỉ cho nhập/sử dụng packet enrichment đã có. End-to-end SOẠN_TRƯỚC → KIỂM TRA → WEB_LIVE_PREP_PACKET chưa được chạy/xác minh, count là **UNRUN**. Phase 3 có 10 authored metadata blocks, 23 objects, 8 link rows và 2 figures; các con số đó là khối dữ liệu, không phải số click GV đo được. Xem báo cáo real lesson.

## Bằng chứng chính

| Nội dung | Kết quả | Bằng chứng |
|---|---|---|
| Native full lesson flow | 35 screens, 49 answer/proof blocks và 4 analysis steps | CLASSROOM_VALIDATION.json continuousFlow |
| Figure carry VD2 | PASS qua 6 stages; base SHA/scope giữ | CLASSROOM_VALIDATION.json checks |
| Figure cho exercise mới | **FAIL/BLOCKING G4-F01**; LT2 thay ảnh TT2/VD3/LT3/VDU | WHOLE_LESSON captures, own image SHA vs rendered SHA |
| VD2 proof ↔ object | PASS: AD/CB/angles → two triangles/AH/CK; future step không tự hiện | Proof trace và Focus capture |
| Full lesson object links | PARTIAL; 4/49 answer/proof blocks có link, chỉ nằm VD2 | proofCoverage; không khẳng định mọi answer đều cần highlight |
| 70/30, 60/40, full figure | PASS state round trip | stateTests |
| Zoom → teach → return | PASS figure/proof/objects giữ; cùng hình đổi screen zoom 1.15 → 1 (**G4-F02**) | stateTests |
| Focus | Objects/current step PASS; các bước đã reveal khác display:none (**G4-F03**) | focus.blocks + capture |
| Mark/draw/label/erase/undo/redo/clear | PASS; base image không bị xóa | annotation trace/capture |
| Annotation VD2 → LT2 → TT2 | Reset/scope separation PASS, không ghi nhận leakage | checks 6/7 |
| Full lesson TV fit | PASS 140 states tại 1366×768, 1280×720 | WHOLE_LESSON_TV.json |
| VD2 TV layout matrix | PASS fit/alignment 24 cases, 4 sizes × 3 stages × 2 modes | CLASSROOM_VALIDATION.json readability |
| GT/KL contrast | 13.56:1, vượt 4.5:1 | GT_KL_CONTRAST.json |
| 4K / cuối lớp | CONTROLLED_RISK G4-F04; physical/Windows/actual GV UNRUN | Typography metrics + 4K capture |
| Runtime exceptions | 0 ở hai completed runs; source lesson không sửa | Native results |

Completed classroom harness có 12 checks PASS và 1 check FAIL; exit 0 chỉ có nghĩa harness đã hoàn tất ghi nhận, **không** có nghĩa Phase 4 PASS. Ba initial harness attempts lỗi tên biến TV/nested tools/target SVG hit-layer đã được giữ riêng; harness bên ngoài candidate đã sửa, conclusions dùng completed results. Không vá app để làm test PASS.

## Operability và classroom interruptions

Baseline flow đo được CLICK_COUNT=5, KEYPRESS_COUNT=83, MODE_CHANGE_COUNT=0, UNNECESSARY_ACTION_COUNT=0 trong scripted path: 1 click focus setup, 4 analysis clicks, 34 Next keys, 49 reveal keys. Không tính OS import/Open TV, diagnostic tools, mouse movement/search time hoặc workaround chưa chạy. Khi gặp hình sai, GV phải dừng ở **BLOCKING**, không tiếp tục dạy như trace audit. Focus là **DISRUPTIVE** nếu cần liên hệ lại hai bước; zoom reset là **MINOR**; 4K readability chưa có classroom acceptance. Đây là đo thao tác phần mềm, chưa phải GV/HS dạy và học thật 45 phút.

## Risk và quyết định

Audit đủ ba risk Phase 3: G3-R01 **BLOCKING** do metadata scope tích hợp không đầy đủ; G3-R02 **DEFERRED**, không trigger trong lesson tĩnh; G3-R03 **CONTROLLED_RISK** vì không thể suy rộng mọi packet/TV và font cap 4K. Sáu inherited controlled risks không được tự sửa; P2-R03 Windows/physical TV/audio vẫn UNRUN. Xem Risk Validation và Findings.

**Dừng ở báo cáo/evidence.** Đề nghị GV review blocker và các quan sát trước khi quyết định remediation hoặc native classroom acceptance bằng yêu cầu riêng. Không phát triển Algebra/Informatics, không chuyển phase tự động, không promote Production. Cấu hình startup Phase 4 read-only đã lưu draft; cần review/save/publish Environment Settings để áp dụng phiên mới, fresh-task restoration chưa được chứng nhận.
