# HOTFIX R1 — Acceptance Report

**PRODUCTION READY = NO**
**HOTFIX R1 = CANDIDATE / PARTIALLY VERIFIED**

R1 sửa một lỗi TTS adapter có tái hiện trước/sau. Demo/Launcher không có source regression được xác định. Các FAIL ở RC2 ban đầu đã gộp cả physical tests chưa thực hiện; R1 tách rõ lỗi source và thiếu evidence. Không công bố đủ ba gate PASS khi âm thanh/Windows vẫn UNRUN.

| Gate | Trạng thái R1 | Căn cứ / giới hạn |
|---|---|---|
| BASELINE LOCK | PASS | Original và RC2 không thay đổi; hash toàn bộ |
| TEACHER COCKPIT | PASS | 30 checks native, parity và controls |
| TV COGNITIVE WORKSPACE | PASS | 342 trạng thái bài thật, các viewport và tools |
| PEDAGOGY LOCKS | PASS | Hint1/2, explicit Answer/Knowledge, Teacher-only notes |
| GEOMETRY ENGINE | PASS | Scene/labels, phân tích/proof tăng dần |
| ALGEBRA ENGINE | PASS (presentation fixtures) | Cards, atomic formulas, future-step secrecy; không có gói Đại số thật |
| TIN ENGINE | PASS | Tin6 W04/W05, Tin8 W04 ZIP thật |
| PROGRESSIVE DISCLOSURE | PASS | Future content không nằm trong registry/DOM được đọc |
| TEACHER-TV SYNC | PASS | Native popup, preview parity, refresh/reconnect/Next/Back/context guard |
| TTS REGRESSION | BLOCKED / UNRUN phần audio | Adapter PASS; native Việt voices = 0; chưa nghe/start/stop/replay/fallback |
| DEMO REGRESSION | BLOCKED / UNRUN phần app | Metadata/API/pair/fail-safe PASS; confirmation/cancel/launch/handoff chưa chạy |
| LAUNCHER REGRESSION | BLOCKED / UNRUN phần Windows | Native HTTP/reuse/relocation PASS; .bat/Chrome/Win32 chưa chạy |
| VISUAL ACCEPTANCE | PASS (browser) | Fresh images, 4 TV viewports, Teacher 1920/1366; chưa TV vật lý |
| PACKAGE | PASS | ZIP integrity, extraction, internal SHA-256; candidate riêng |

```text
HOTFIX SCOPE VIOLATION = 0
CONFIRMED REGRESSION REMAINING IN EXECUTED TESTS = 0
CRITICAL REGRESSION = UNVERIFIED
PRODUCTION READY = NO
```

Điều kiện còn thiếu: Windows + Python 3.10/py -3 + Chrome, giọng Việt thực trong Web Speech, Word/GeoGebra đã cài và cấu hình launcher_apps.json, màn TV/loa để nghe và kiểm handoff. Xem WINDOWS_RUNTIME_CHECKLIST.md để hoàn tất các ca. Không có Production deployment/publication trong phiên này.

Báo cáo/chứng cứ R1 có hiệu lực: HOTFIX_R1_* và HOTFIX_R1_EVIDENCE/RUN_INDEX.json. Các README/report/evidence RC1–RC2 kế thừa là lịch sử, kể cả checksum cũ; dùng HOTFIX_R1_CHECKSUMS_SHA256.txt cho candidate hiện tại. Checksum trong ZIP bao phủ file candidate (trừ chính manifest); bản checksum ở thư mục output bao phủ ZIP và báo cáo bàn giao.
