[**Tải báo cáo + evidence Phase 4**](WEB_LIVE_GEOMETRY_PHASE4_VALIDATION.zip) · [SHA256](WEB_LIVE_GEOMETRY_PHASE4_VALIDATION.zip.sha256.txt)

# WEB LIVE Geometry — Phase 4 validation evidence

**NOT_PASS — có blocker hình sai khi chuyển exercise.** Đây là báo cáo/evidence; source candidate Phase 3 giữ nguyên, không có Phase 4 feature candidate hoặc hotfix.

- [Báo cáo tổng](WEB_LIVE_GEOMETRY_PHASE4_VALIDATION_REPORT.md)
- [Real lesson và provenance](GEOMETRY_REAL_LESSON_VALIDATION_REPORT.md)
- [Classroom/TV/PC](GEOMETRY_CLASSROOM_VALIDATION_REPORT.md)
- [Audit 3 risks](GEOMETRY_RISK_VALIDATION_REPORT.md)
- [Findings và recommendation](GEOMETRY_PHASE4_FINDINGS.md)
- [Native acceptance chưa chạy](WINDOWS_TV_CLASSROOM_ACCEPTANCE.md)
- [Final status](PHASE4_FINAL_STATUS.json)

Source SHA256: 8817889abb9e98e9e3c60e191be510215e02030d309c2aacaaad1e1f663dd23c. 1.227 source files và 49 served assets được xác minh byte-identical. Giữ source/report Phase 3; không ghi đè kết quả lịch sử. Evidence current Phase 4 nằm trong GEOMETRY_PHASE4_TEST_EVIDENCE.

Reproduce: giữ candidate immutable, serve root tại 8773 bằng `python3 -B -m http.server 8773 --bind 127.0.0.1 --directory /workspace/TEST-CODEX/WEB_LIVE_GEOMETRY_PHASE3_CANDIDATE`. Đối chiếu served bytes. Chạy các CJS helpers trong thư mục evidence/audit riêng với `NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules`; Chromium ở /usr/bin/chromium. Helpers hiện có absolute source path cho môi trường này; chọn thư mục audit writable ở ngoài candidate. Không chạy inherited Phase 3 scripts có default output vào candidate. Browser storage chỉ trong isolated Playwright context, không sửa ZIP/source.

13 classroom checks: 12 PASS, 1 FAIL, harness hoàn tất. Exit 0 là hoàn thành ghi nhận, không phải product PASS. Whole lesson TV 140 states + VD2 matrix 24 cases; 45 native screenshots. Raw initial harness attempts lỗi selector/TV variable được giữ để trace; dùng CLASSROOM_VALIDATION.json completed run cho conclusions. Windows/physical TV/audio/actual teacher lesson chưa chạy.

Văn bản yêu cầu nhận được bị cắt giữa mục 16; không có later gates/final format. Báo cáo bao phủ phần đã nhận và audit ba risk. Startup read-only draft đã lưu; Environment Settings review/save/publish để áp dụng cho phiên sau, fresh-task restoration UNRUN. STOP, chưa patch/feature/Production.

[Ảnh blocker Hình 3.34a đang hiện LT2](GEOMETRY_PHASE4_TEST_EVIDENCE/CAPTURES/WHOLE_LESSON_24.png) · [Ảnh Hình 3.34 đúng từ source](GEOMETRY_PHASE4_TEST_EVIDENCE/EXPECTED_FIGURES/VD3_H334.png)
