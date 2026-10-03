# UI V2.4 RC1 — Defect / release-gate report

UI_RC1_CANDIDATE = BLOCKED. Không có patch backend, không tạo RC2.

## D001 — Baseline native tests chưa tương thích CSRF F011

4 file kiem_tra_v22/v221/v222/v23_integration trong input R4 thiếu nonce thật cho POST.
Expected: các positive POST functional assertions chạy sau negotiation nonce hiện hành.
Actual: raw scripts FAIL trên R4 baseline và UI RC1 trước các assertion DB/scoring tiếp theo.
Evidence: native/* và native-final/*; approved-test compatibility copy = 6/6 PASS.
Classification kế thừa audit đã duyệt: TEST_SETUP_INCOMPLETE / LEGACY_TEST_DEFECT,
PATCH_REQUIRED = TEST_ONLY. Không đổi severity hoặc sửa test trong candidate này.
Đây là blocker release gate all-tests-PASS và build_exe.bat nguyên bản; không phải defect
UI runtime đã chứng minh. GV quyết định cách áp dụng test-only patch ở vòng được duyệt riêng.

## D002 — R3 harness expectations không khớp contract R4 đã khóa

F006 mixed-exam invalid-time/invalid-counts yêu cầu flash còn trong session; template
consume flash khi render. F008 report Excel yêu cầu code/nội dung từ bank sửa sau khi thi;
F012 yêu cầu snapshot lịch sử. 3 FAIL xuất hiện giống nhau trên baseline R4 và UI RC1.
Evidence: r3/results.json, r3-baseline/results.json, r3-baseline-comparison.json,
R4 final historical snapshot/Excel PASS. Không sửa expected result để tạo PASS.
Blocker là test-contract reconciliation cần GV duyệt; không sửa backend/UI cho expectation cũ.

## UI defect đã xử lý trong cùng RC1

Nút submit vượt viewport 1366x768 ở UI first run: thu gọn vùng cuộn navigator. Final
UI05 và UI25 PASS; 5 screenshot thật. Không có unresolved HIGH/CRITICAL UI defect
được phát hiện trong các case đã chạy; không khẳng định mọi dữ liệu thực tế đã nghiệm thu.

## Data/evidence gaps

UI_DATA_GAP G01–G06 trong implementation report để an toàn, không bổ sung backend.
WINDOWS_RUNTIME = NOT_RUN; PHYSICAL_50_PC = NOT_RUN; PRODUCTION = NO.
No new runtime patch or release claimed. STOP after artifact handoff.
