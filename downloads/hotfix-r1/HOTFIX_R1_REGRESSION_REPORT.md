# HOTFIX R1 — Regression Report

Runtime trên Linux + Chromium 151.0.7922.173. Kết quả chỉ áp dụng cho các ca đã chạy; không dùng evidence mock cũ để chứng nhận R1.

## Các kiểm tra đã chạy

| Phạm vi | Kết quả | Evidence hiện tại |
|---|---|---|
| Original baseline 284 files và RC2 330 files | PASS — không sửa/không thêm file | freeze-integrity.json |
| Freeze runtime/UI/bài học | PASS — chỉ tts-teacher.js đổi; scope violation 0 | freeze-integrity.json, TTS_ADAPTER_PATCH.diff |
| TTS shared registry | PASS — 20 checks, native Web Speech; default + không BroadcastChannel | native-tts.json |
| Hai Teacher, chặn context cũ, sync chủ động, đóng popup | PASS — 4 checks | context-native.json |
| Teacher Cockpit và parity preview/TV | PASS — 30 checks, 15 screenshots, 0 pageerrors | cockpit-native.json |
| Full subject/render regression | PASS — 171 màn thật × 2 trạng thái = 342; 15 assertions, 44 screenshots, 0 pageerrors/overflow/external requests | FULL_REGRESSION/multi-engine-results.json |
| Presentation regression chạy nguyên script | PASS — cùng 171 màn thật, 15 assertions và 44 captures | FULL_REGRESSION/presentation-results.json |
| MathSpeech | PASS — 21 ví dụ; không thay thế kiểm tra nghe | FULL_REGRESSION/math-speech.json |
| Demo production HTTP/HMAC chain | PASS — 8 checks; không fake response/process/app | demo-native.json |
| HTTP production, reuse services, rename/move | PASS — 3 ca native; Python bootstrap quan sát blocker Windows thật | launcher-native.json, START_WEB_LIVE.log |
| Runtime JavaScript syntax | PASS — 32 files | syntax-check.log |

Các evidence trong bảng đều nằm trong HOTFIX_R1_EVIDENCE. Teacher kiểm bằng window.open TV thật, heartbeat, import ZIP thật, refresh/close/reopen, Next/Back nhanh, fullscreen API, Focus click, vẽ/label thật, mask/symbol/pointer/zoom, whiteboard và layout 70/30. Algebra có presentation fixture; chưa có gói curriculum Đại số thật để xác minh provenance.

## TTS: đã kiểm và còn thiếu

MCQ trước/mở/đóng TV luôn giữ 5 block giống nhau. Hint1/Hint2/Answer chỉ lấy phần được tiết lộ; Knowledge Close trống trước khi GV bấm. Sau Teacher refresh, disclosure reset, source bài và rate/gender preference được giữ. Controller và handler không bị nhân đôi trong chuỗi refresh đã kiểm. Next/Back/reload popup tiếp tục sync; Geometry/Algebra không đưa future proof vào registry.

Native speechSynthesis.getVoices() = []; TTSController.read() trả false, NO_VOICE và queue = 0. Không thể chạy âm thanh START/STOP/REPLAY, NEXT/BACK WHILE SPEAKING, voice select, pause/resume hay Vietnamese voice fallback. Những ca này **UNRUN**, không phải PASS. “Multi-engine” baseline là các subject render engines; TTS provider baseline chỉ Web Speech API, không có provider selector/fallback khác.

## Demo: đã kiểm và còn thiếu

Metadata Word/GeoGebra, IDs/onclick duy nhất, /status + /pair thật, token hiện hữu, mất API/reconnect API và Teacher refresh đều đạt. UI không gửi /launch khi import/Next/Back/TV reload/reconnect. TV không có DemoTeacher hay nút launch; 0 TV launch requests.

Hai POST /launch trong evidence là negative tests do harness gọi trực tiếp sau xác thực. Server trả **404 APP_NOT_FOUND**, không có app nào được mở. Cả hai exe config đều trống. DemoTeacher guard báo “chưa được cấu hình” trước confirmation; không bịa dialog hoặc launch thành công. Teacher confirmation, Cancel, Word/GeoGebra launch/handoff/return thực tế đều **UNRUN**.

## Launcher: đã kiểm và còn thiếu

Dùng production web_live_http.py ở process riêng và production LauncherService/Pairing/LauncherHandler. API được serve bằng ThreadingHTTPServer trên Linux; không khẳng định WebLiveLauncher.main/Win32 desktop đã chạy. start_services gọi lại hai lần trả [] khi hai service đúng root đang chạy, không thêm process. Copy runtime thật sang hai thư mục Unicode/có khoảng trắng, rename/move thật, cwd /tmp: Teacher HTTP bytes và health/root fingerprint đúng; service reuse đạt. Đây là relocation Linux, không phải Desktop/ổ D: Windows.

CLI start_web_live.py thật trả 2 và thông báo chỉ dành Windows như baseline. START_WEB_LIVE.bat, Chrome đã đóng/đang mở, Win32 handoff, Desktop/ổ D: và loa/TV vật lý **UNRUN**.

## Tính toàn vẹn bài kiểm tra

Không thay các script regression có sẵn. Các bài mới native mô tả đúng phạm vi. Instrumentation Demo được sửa để observer gắn vào Teacher đã tạo, giữ nguyên assertion /pair. Bài context đợi ready handshake và sync của Teacher 2, đọc textContent cho status trong details đang đóng (innerText rỗng); không đổi expected context hoặc source runtime để tạo PASS. Evidence mock RC2 kế thừa chỉ là lịch sử.

Kết quả xác nhận trong các ca đã chạy: 0 regression còn lại. **CRITICAL REGRESSION toàn hệ thống = UNVERIFIED** vì âm thanh/Windows chưa chạy. Không công bố READY.
