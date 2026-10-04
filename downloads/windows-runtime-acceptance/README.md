# HOTFIX R1 — Windows Acceptance Preparation

**Windows runtime chưa chạy: UNRUN / ENVIRONMENT UNAVAILABLE. PRODUCTION READY = NO.** Candidate ZIP/source/config không đổi.

- WINDOWS_RUNTIME_ACCEPTANCE_REPORT.md: trạng thái gate thực tế.
- WINDOWS_RUNTIME_RUNBOOK.md: prerequisites và thứ tự chạy trên Windows thật.
- WINDOWS_RUNTIME_TEST_MATRIX.csv: 16 ca A1–C5, cột result/actual/evidence để điền.
- WINDOWS_RUNTIME_RESULTS_TEMPLATE.json: biểu mẫu kết quả, mặc định UNRUN.
- WINDOWS_RUNTIME_EVIDENCE/: cloud availability và freeze integrity, không phải Windows evidence.

Không có screenshot/âm thanh/app-launch log Windows trong bộ chuẩn bị này. Không dùng bộ này làm chứng nhận PASS. Word/GeoGebra exe mapping trong ZIP R1 đang trống; cần thống nhất provisioning với yêu cầu candidate read-only trước khi chạy app tests.
