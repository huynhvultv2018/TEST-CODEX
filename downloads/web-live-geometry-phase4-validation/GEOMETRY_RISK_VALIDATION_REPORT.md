# Geometry risk validation — Phase 4

Audit đúng ba new risks Phase 3; không đổi hoặc đóng risk bằng feature/patch. Một risk blocking cho toàn bài.

## G3-R01

**TRIGGER =** Metadata coordinates/IDs/links hoặc scope do tác giả khai báo không đầy đủ/sai ngữ cảnh

**OBSERVATION =** Các anchor/links VD2 đã khai báo render khớp hình; đối chiếu proof 1/2 và ảnh native đúng. Tuy nhiên scope LT2 không kết thúc, gây hình sai ở bài sau. Full lesson chỉ 4/49 answer/proof blocks có authored link; 4 đó là VD2, không phải 49 proof đều cần highlight.

**VALIDATION_STATUS =** FAIL — BLOCKING for whole lesson

**EVIDENCE =** G4-F01; G4-F05; CLASSROOM_VALIDATION.json; PACKAGE_PROVENANCE.json; captures

**IMPACT =** HS nhìn hình khác với bài đang xét; không thể dùng nguyên lesson candidate cho trọn tiết

**MITIGATION =** Review scope/figure metadata toàn bài ở remediation được phê duyệt riêng; không suy luận hoặc sửa dữ liệu bằng engine trong validation

**BLOCKING =** YES

## G3-R02

**TRIGGER =** Bài cần kéo điểm gốc hoặc cập nhật quan hệ/constraint động

**OBSERVATION =** Các hoạt động trong lesson đã chọn là đọc/đánh dấu hình tĩnh; annotation MARK/DRAW/LABEL/ERASE/UNDO/REDO/CLEAR hoạt động native. Profile base image/object model vẫn tĩnh; không test/công nhận constraint solver. Movable annotation đã được xác minh ở Phase 3, evidence lịch sử không được trình bày là test mới Phase 4.

**VALIDATION_STATUS =** DEFERRED — not triggered by this lesson

**EVIDENCE =** CLASSROOM_VALIDATION.json annotation check; object registry; Phase 3 annotation-move.json (historical)

**IMPACT =** Không dùng candidate để chứng nhận lesson khám phá động/GeoGebra-style construction

**MITIGATION =** Giữ bài tĩnh trong phạm vi; chọn lesson/app đã nghiệm thu nếu cần dynamic geometry, không phát triển solver trong Phase 4

**BLOCKING =** NO for selected static lesson

## G3-R03

**TRIGGER =** GT/KL/proof dài hoặc màn hình/scaling khác mẫu đại diện

**OBSERVATION =** 140 whole-lesson TV states và 24 VD2 layout/viewport cases không overflow; 4K DPR1 có cap font làm chữ nhỏ tương đối. Chỉ dùng nội dung thật, không chèn stress lesson giả. Chưa đo HS cuối lớp/TV vật lý/Windows scaling.

**VALIDATION_STATUS =** CONTROLLED_RISK — physical acceptance pending

**EVIDENCE =** WHOLE_LESSON_TV.json; CLASSROOM_VALIDATION.json/readability; GT_KL_CONTRAST.json; G4-F04

**IMPACT =** Không thể suy rộng readability tới mọi packet hoặc TV/lớp học

**MITIGATION =** Acceptance đúng TV/PC/scaling/khoảng cách, dùng proof chunks từ packet đã kiểm tra; không âm thầm crop/thu nhỏ hay sửa bài trong validation

**BLOCKING =** NO additional technical blocker; classroom certification pending

## Sáu risk kế thừa

P2-R01 shared Core globals: không sửa, source frozen. P2-R02 Legacy stage divergence: không kiểm tra lại/không vá trong Phase 4. P2-R03 Windows/physical TV/TTS/native app: UNRUN, vẫn mở. P2-R04 real Algebra provenance: Algebra frozen, ngoài phạm vi. P2-R05 malformed board packet: dùng importer/state chuẩn, không retest malicious/corrupt packets và không vá. P2-R06 offscreen preview TTS timing: Phase 4 quan sát actual TV, không retest audio/timing đầy đủ, risk vẫn mở. Không gọi các inherited risks là đã giải quyết.

G3-R01 được tăng thành blocking nhờ evidence toàn bài, khác với gate đại diện VD2 ở Phase 3. R02 defer không phải feature PASS; R03 no overflow không phải physical classroom PASS. STOP để GV quyết định remediation/acceptance.
