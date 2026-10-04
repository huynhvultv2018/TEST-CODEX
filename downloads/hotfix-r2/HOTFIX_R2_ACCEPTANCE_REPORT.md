# HOTFIX R2 — Acceptance Report

**HOTFIX R2 MODAL FIX = PASS (cloud/local automated)**
**WINDOWS RE-TEST REQUIRED = YES**
**PRODUCTION READY = NO**

Nguyên nhân: hideImporter() bỏ qua thao tác khi lesson=null. R2 chỉ bỏ guard đó; nút ĐÓNG luôn ẩn importer/overlay. Đây là lỗi inherited baseline, được tái hiện trong native browser, không phải missing binding/exception. Esc-close không có trong baseline nên không thêm hành vi mới.

| Gate | Result |
|---|---|
| M1 INITIAL OPEN | PASS |
| M2 CLOSE BUTTON + OVERLAY INACTIVE | PASS |
| M3 REOPEN / NO DUPLICATE | PASS |
| M4 CLOSE AGAIN | PASS |
| M5 ESC CLOSE | N/A — baseline không có contract |
| ZIP / JSON / SAMPLE ACTIONS | PASS |
| TEACHER INTERACTIVE AFTER CLOSE | PASS |
| R1 TTS FIX PRESERVED | PASS — identical hash + native registry integration |
| TEACHER COCKPIT PRESERVED | PASS |
| TV UI PRESERVED | PASS |
| PEDAGOGY / SUBJECT ENGINES / LESSONS PRESERVED | PASS |
| DEMO CODE PRESERVED | PASS |
| LAUNCHER / CHROME START CODE PRESERVED | PASS |
| PACKAGE | PASS — CRC, extraction, SHA-256, extracted modal smoke |

```text
FILES CHANGED (runtime) = WEB_LIVE/teacher.js
MODAL PATCH = PASS
R1 TTS FIX PRESERVED = PASS
TEACHER COCKPIT PRESERVED = PASS
TV UI PRESERVED = PASS
PEDAGOGY PRESERVED = PASS
DEMO CODE PRESERVED = PASS
LAUNCHER CODE PRESERVED = PASS
SCOPE VIOLATION = 0

TTS WINDOWS REAL AUDIO = UNRUN
DEMO WINDOWS REAL APP = UNRUN
LAUNCHER FULL WINDOWS ACCEPTANCE = PENDING
WINDOWS C1 UI BLOCKER (R2) = PENDING RE-TEST
HOTFIX R2 MODAL FIX = PASS (cloud/local automated)
PACKAGE = PASS
WINDOWS RE-TEST REQUIRED = YES
PRODUCTION READY = NO
```

User report xác nhận C1 R1 FAIL, Chrome mở Teacher HTTP được; không có raw Windows console/screenshot/audio trong phiên này. R2 cloud images/logs được ghi đúng nền tảng. Trên chính máy Windows đã tái hiện, chạy START_WEB_LIVE.bat → Teacher → modal → ĐÓNG. Test lần đầu/fresh browser profile để lesson=null; nếu chỉ thử profile có bài lưu cũ thì đã có lesson, R1 cũng close được và có thể bỏ sót bug. Kiểm reopened modal đóng lại, import actions và Teacher interactive. Khi retest Windows đạt mới ghi C1 UI BLOCKER=RESOLVED, rồi tiếp tục C2/TTS/Demo/full Launcher acceptance.

R1 candidate, R1 ZIP và GitHub nhánh R1 không ghi đè. Không nâng Production. Báo cáo R2/evidence R2/manifest R2 có hiệu lực cho candidate này; các báo cáo/checksum RC1/RC2/R1 kế thừa chỉ là lịch sử.
