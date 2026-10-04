# HOTFIX R2 — Regression Report

Native Chromium 151.0.7922.173 trên Linux. Modal suite chạy qua **production WEB HTTP** tại http://127.0.0.1:47382/WEB_LIVE/teacher.html và kiểm teacher.js response khớp R2. Fresh contexts ở 1366×768 và 1920×1080; không speech/app/click/handler/confirmation mocks.

| Test | Result | Evidence |
|---|---|---|
| M1 initial open, no saved lesson | PASS × 2 viewports | M1_INITIAL_*.png, modal-native.json |
| M2 click Close | PASS × 2 | lesson=null, display:none, 0 modal rects, hit-test không vào overlay |
| Teacher interactive after cold close | PASS × 2 | Fullscreen API thật bật/tắt, popup TV thật chờ lesson |
| M3 reopen | PASS × 2 | Click nút thư viện thật, importer/closeBtn đều 1 node |
| M4 close again | PASS × 2 | Close trước khi có lesson; thêm 12 reopen/close cycles mỗi viewport |
| M5 Esc | N/A (modal close) | Baseline không hỗ trợ; đã press Esc và xác nhận behavior không đổi |
| Sample action | PASS × 2 | BÀI MẪU HÌNH HỌC loads HINH8_V04_MAU, hides importer, TV sync |
| LIVE.ZIP action | PASS × 2 | Native filechooser, Tin6 W04 ZIP thật, importer đóng và TV sync |
| LESSON.JSON action | PASS × 2 | Native filechooser, original embedded Geometry sample JSON |
| Validation error + Close | PASS × 2 | JSON không hợp lệ báo lỗi; Close vẫn dismiss, lesson cũ giữ nguyên |
| Loaded lesson close/reload | PASS × 2 | Không đổi lesson; session restore; open/close vẫn hoạt động |
| Next/Back after close | PASS × 2 | Teacher buttons → actual TV index 1/0; source sample giữ nguyên |
| R1 TTS fix integration | PASS × 2 (registry) | 5 MCQ blocks giữ nguyên sau TV close + modal cycle + sync |
| Console/exceptions/no native launch | PASS | 0 pageerrors, 0 console errors, 0 /launch requests |
| Teacher Cockpit regression | PASS — 30 checks | COCKPIT_REGRESSION/cockpit-native.json, 15 fresh screenshots |
| Runtime syntax | PASS — 32 JavaScript files | syntax-check.log |
| Scope/freeze | PASS | scope-audit.json, MODAL_PATCH.diff |

Modal suite tổng 31 PASS + 2 N/A cho M5. Cockpit 30 PASS kiểm preview/actual TV parity, fullscreen, Next/Back, Hint1/2/Answer/Knowledge Close, progressive analysis/proof, scene/labels, Focus click, pen/point/label, mask/symbol/pointer/zoom, whiteboard và layouts. Presentation fixtures được ghi rõ; không dùng làm provenance bài Đại số.

HOTFIX_R2_EVIDENCE/PRE_PATCH_AUDIT chứa reproduction baseline/RC2/R1 trước sửa: fresh null lesson Close không đóng, V8 handler calls=2; loaded lesson Close đóng được; Esc không đóng ở mọi version. Console resource favicon404 trên hai static comparison origins được giữ và phân tích riêng; không có JS exception gây mất binding.

Audit toàn bộ R1 snapshot 442 files không thay đổi. Runtime R2 chỉ teacher.js đổi đúng phép bỏ if(lesson); mọi file TTS/Demo/Launcher/cockpit/TV/pedagogy/lesson khác byte-identical. Source schema/lifecycle không refactor.

Phạm vi cloud/local này xác nhận modal bugfix. **TTS WINDOWS REAL AUDIO=UNRUN, DEMO WINDOWS REAL APP=UNRUN, LAUNCHER FULL WINDOWS ACCEPTANCE=PENDING.** User đã báo Chrome/Teacher HTTP trên Windows mở được nhưng C1 R1 FAIL do modal; R2 Windows retest chưa thực hiện. Không tuyên bố Windows C1 blocker resolved hoặc Production Ready.
