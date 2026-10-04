# HOTFIX R1 — Windows Runtime Acceptance

Prepared UTC: 2026-10-04T06:44:17.762924+00:00

**WINDOWS RUNTIME ACCEPTANCE = UNRUN**
**ENVIRONMENT = UNAVAILABLE**
**PRODUCTION READY = NO**

Báo cáo này ghi tình trạng thực tế của phiên chuẩn bị nghiệm thu. **Chưa chạy ca nào trên Windows thật.** Không có kết quả PASS/FAIL runtime Windows để điền; UNRUN không được quy thành code FAIL hoặc PASS.

## Test subject được đóng băng

- ZIP: WEB_LIVE_TEACHER_TV_PEDAGOGY_UI_HOTFIX_R1_CANDIDATE.zip.
- SHA-256: `96eb673ef1293b99281bca100fca9f5f8a4b2f601558d3e124cb4b1dbd34a2d7` — khớp gói bàn giao GitHub.
- Xác minh 441 entries trong manifest và snapshot 442 file candidate: PASS. Đây là integrity/preparation, không phải Windows acceptance.
- Source, lesson, UI, config và ZIP R1 không sửa. Hồ sơ này được tạo ngoài candidate.

## Khả năng thực thi và điều kiện còn thiếu

Executor hiện tại là Linux x86_64. Cloud runtime connected, nhưng không có capability Windows, desktop/audio controller, remote host hoặc outbound identity/secret để truy cập máy Windows. Có ssh command không đồng nghĩa có quyền/host Windows, phiên GUI hoặc người nghe. Không có Windows machine được gắn vào phiên. Chưa có runtime evidence từ người dùng.

R1 chỉ có Web Speech TTS provider, không có selector nhiều TTS providers. Voice native phải kiểm trên Chrome Windows; phần engine/provider khác không được tự tạo để nghiệm thu. Linux voice probe và các cloud PASS cũ không chứng nhận âm thanh Windows.

`LAUNCHER/launcher_apps.json` có hai trường `word → exe` và `geogebra → exe` để trống. Chỉ cài app trên host chưa đủ: Launcher cần mapping theo thiết kế baseline. Với yêu cầu “nguyên trạng / TEST SUBJECT READ ONLY”, phiên này **không tự chỉnh config**. Cần thống nhất provisioning cấu hình máy thử trước khi chạy B2/B3/B4/C5; không dùng fake app status hoặc đoán path để biến gate thành PASS. Đây là điều kiện test chưa đáp ứng, chưa phải lỗi code đã tái hiện trên Windows.

## Gate results

| Gate | Result | Evidence / lý do |
|---|---|---|
| TTS REAL AUDIO | UNRUN | Không Windows Chrome + voice + loa/tai nghe thật (A1–A4, A6) |
| TTS CLOSE/REOPEN TV | UNRUN | Chưa chạy A5 có âm thanh Windows |
| DEMO WORD | UNRUN | Chưa Windows/Word runtime; exe mapping trống (B2/B3) |
| DEMO GEOGEBRA | UNRUN | Chưa Windows/GeoGebra runtime; exe mapping trống (B2/B4) |
| TV DEMO FAIL-SAFE | UNRUN | Chưa chạy B1/B5 trên Windows + app thật |
| LAUNCHER START | UNRUN | Chưa chạy START_WEB_LIVE.bat native (C1/C4) |
| CHROME START | UNRUN | Chưa chrome.exe clean/open-session test (C1/C4) |
| AUTO PAIR | UNRUN | Chưa pair trong phiên Windows thật (C2) |
| RELATIVE PATH | UNRUN | Chưa Desktop/ổ D: Windows thật (C3) |
| FULL CHAIN | UNRUN | Chưa chuỗi tích hợp Windows/TV/audio/app (C5) |

16 ca A1–A6, B1–B5, C1–C5 đều UNRUN. Ma trận bước làm, expected, evidence nằm trong WINDOWS_RUNTIME_TEST_MATRIX.csv; quy trình trong WINDOWS_RUNTIME_RUNBOOK.md. Chưa có screenshot/audio/app log Windows. WINDOWS_RUNTIME_EVIDENCE chỉ chứa thông tin môi trường cloud và integrity audit, được ghi đúng phạm vi.

## Quy tắc cập nhật sau chạy

PASS cần người kiểm thử Windows, thời điểm/version và evidence của ca đã chạy. FAIL cần TEST/EXPECTED/ACTUAL/STEPS TO REPRODUCE/SCREENSHOT hoặc LOG; dừng chạy, giữ R1 và chứng cứ. Thiếu OS/app/voice/thiết bị cần ghi ENVIRONMENT UNAVAILABLE, phần chưa chạy giữ UNRUN. Không cập nhật TTS/DEMO/LAUNCHER REGRESSION = PASS từ kết quả cloud trước đó. Không mở Hotfix R2 khi chưa có FAIL runtime chứng minh subsystem lỗi.

```text
WINDOWS RUNTIME ACCEPTANCE = UNRUN
ENVIRONMENT AVAILABILITY = ENVIRONMENT UNAVAILABLE
TTS REGRESSION = UNRUN (Windows real runtime)
DEMO REGRESSION = UNRUN (Windows real runtime)
LAUNCHER REGRESSION = UNRUN (Windows real runtime)
CRITICAL REGRESSION = UNVERIFIED
HOTFIX R1 = CANDIDATE / WINDOWS ACCEPTANCE PENDING
PRODUCTION READY = NO
PRODUCTION DEPLOYMENT = NOT PERFORMED
```

Chỉ khi đủ ca bắt buộc PASS, không có critical regression và freeze còn hợp lệ mới ghi ACCEPTED / READY = YES. Không tự nâng Production.
