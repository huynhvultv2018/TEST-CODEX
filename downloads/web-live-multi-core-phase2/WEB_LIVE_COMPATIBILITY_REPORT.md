# Compatibility

**LEGACY_COMPATIBILITY = PASS** trong phạm vi package/state hợp lệ của baseline. **BACKWARD_COMPATIBILITY = CONTROLLED_RISK**; không tuyên bố hỗ trợ mọi schema lịch sử hoặc native Windows acceptance.

## Adapter và bằng chứng

Không thêm required field vào validator. Không sửa JSON/ZIP lesson cũ. Missing/empty/invalid/unknown subject_engine → Legacy descriptor, `layoutMode=null`, rơi xuống nguyên resolver/pedagogy hiện hành. Vì thế old subjectMode/layoutEngine/labels vẫn có hiệu lực như baseline. Dữ liệu full lesson giữ metadata optional bằng import/storage cũ, không migration hàng loạt.

State channel `web-live-v04`, storage key `webLiveStateV042`, state field shape, version/activation/source guards, focus/disclosure/navigation giữ nguyên. Không thêm profile field vào packet hoặc storage key. TV resolve từ full cached/imported lesson, không từ state.lesson lightweight vốn thiếu subject_engine. Khi TV chưa có lesson, luồng needLesson cũ vẫn hoạt động. Reload Teacher/TV và đóng/mở popup đạt; Teacher reload vẫn reset reveals như trước.

Năm gói Tin/Hình + Demo thật, 175 màn hình/350 trạng thái khớp baseline. Old TV packet fixture thiếu subject_engine, activation, source key và version vẫn render cùng baseline khi giữ overlay contract đã có. Không dùng packet này để suy luận toàn bộ schema cũ; packet tự tạo bỏ luôn board phát hiện lỗi pre-existing, được ghi thành R05. Unknown/invalid metadata không gây crash.

Không có thay đổi stage/render/pedagogical flow/answer/hint cho old package không metadata. Khi metadata mới hợp lệ, canonical routing được phép chọn presentation adapter hiện hữu và đồng nhất stage Teacher/TV; chưa có subject-specific feature mới.

## Risk register — 6 rủi ro còn lại

| RISK_ID | AFFECTED_COMPONENT | TRIGGER | EVIDENCE | IMPACT | MITIGATION | PHASE3_BLOCKING |
|---|---|---|---|---|---|---|
| P2-R01 | Shared globals/controller/scene storage | Feature sau này truy cập trực tiếp globals hoặc bỏ qua interface | CORE_BOUNDARY_REPORT; source-integrity; runtime patch chỉ sáu điểm gắn | Hook dispatch isolation không bảo đảm độc lập hoàn toàn mọi engine/controller | Giữ Core tại chỗ; Geometry Phase 3 phải dùng lifecycle, thêm adapter có test riêng trước thay dependency | NO |
| P2-R02 | Legacy Teacher vs TV stage | Old lesson subject='Toán 8', screen.subjectMode='GEOMETRY', không subject_engine; reveal proof | compatibility-extras.json: Teacher ANSWER, TV PROOF ở cả hai runtime | Caption stage có thể khác nhau dù giữ nội dung/flow cũ | Không sửa hành vi Legacy trong Phase 2. New canonical geometry metadata đã test stage PROOF cùng nhau; migration chỉ sau phê duyệt | NO |
| P2-R03 | Windows/physical TV/TTS/native Demo | Chạy Word/GeoGebra, Win32 handoff hoặc phát giọng Việt trên máy đích | TTS/native-tts.json: zero voices, NO_VOICE; cockpit blocked; Linux Chromium 151 | Chưa chứng nhận âm thanh, native app, hai màn hình hoặc Windows runtime | Acceptance trên Windows và TV thật trước release/Production; không lấy Linux/fullscreen API làm chứng nhận vật lý | NO |
| P2-R04 | Real Algebra package provenance/coverage | Muốn đánh giá bài Algebra thực hoặc các feature Đại số sau này | Inventory sáu package; engines results ghi Algebra presentation fixture | Chỉ xác minh interface/presentation, chưa xác minh lesson SGK Algebra thực | Dùng gói Algebra thực đã xác minh khi phê duyệt phase Algebra; Geometry phase không phụ thuộc ca này | NO |
| P2-R05 | Existing DrawBoardTV state contract | Packet tự tạo/malformed bỏ pre-existing board summary trong screen có hình | compatibility-extras.json: hai runtime cùng lỗi 'baseRevision'; packet giữ board render PASS | Không bảo đảm render an toàn với arbitrary/corrupt old state | Giữ packet contract cũ; standard import/restore/sync đã test. Nếu cần nhận schema ngoài baseline, phê duyệt migration/validator riêng, không vá DrawBoard ngoài phạm vi | NO |
| P2-R06 | Offscreen Preview TTS registry timing | Đi nhanh qua màn hình khi iframe không visible; callback rAF bị trì hoãn | INITIAL_BASELINE_PREVIEW_REGISTRY_TIMING.json: DOM đã đổi nhưng registry còn câu màn trước; paired native TTS suite PASS khi sử dụng chuẩn | Broad walk không thể dùng instant registry equality làm oracle mọi thời điểm | So sánh actual visible DOM; TTS suite riêng kiểm tra registry/disclosure và context guard ở hai transports. Kiểm tra thêm trên Windows nếu phát sinh trong thao tác dạy thật | NO |

R03 không chặn nghiên cứu/triển khai Phase 3 sau phê duyệt, nhưng chặn kết luận native acceptance và promote Production. Không rủi ro nào được đổi thành PASS chỉ vì source chưa sửa; kết quả Phase 2 dùng CONTROLLED_RISK và giữ giới hạn kiểm thử.

## Điều kiện dừng

Phase 2 đóng gói riêng; baseline/Production không thay đổi. Đề xuất tiếp theo là GV review candidate và quyết định có phê duyệt Phase 3 Geometry hay không. Chưa bắt đầu Phase 3.
