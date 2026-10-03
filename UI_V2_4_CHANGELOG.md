# UI V2.4 RC1 — Changelog

Kế thừa trực tiếp R4 input `68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2`. Candidate SHA-256 `d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f`.

- Thêm teacher sidebar/shell, Tổng quan tách module và các liên kết hệ thống.
- Thêm monitor filters/search/metrics, DOM update từng dòng với chu kỳ R4 3 giây.
- Thêm focused-question UI, navigator, flag, previous/next, modal submit và CSS trạng thái lưu.
- Tổ chức create-exam/mixed-exam thành 4 bước presentation; report thành 5 tab.
- Giữ MathJax offline, toàn bộ field names/CSRF, hàm autosave/timer/ping và backend R4.
- Bổ sung kiểm thử/evidence bên ngoài source candidate; không sửa 6 native tests.

9 template changed, 5 static files added, 50 original files unchanged, 0 deleted.
Xem UI_V2_4_FILE_MANIFEST.txt cho mọi hash before/after và file unchanged.
Không migration, reset license/MID, build EXE, Production hoặc RC2.

UI_IMPLEMENTATION = PASS; REGRESSION = BLOCKED; UI_RC1_CANDIDATE = BLOCKED.
