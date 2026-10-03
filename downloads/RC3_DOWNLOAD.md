# Windows Acceptance Toolkit RC3

[Tải ZIP RC3](ThiTracNghiemLAN_v2.3.1_WINDOWS_ACCEPTANCE_TOOLKIT_RC3.zip)

SHA-256: `a4bd6dd336069a8b757461ff99c4399e045fe3167f73a4c3a268620de4a99e8d`

ZIP: 34.287 byte, 17 file và thư mục RESULTS rỗng. Đã giải nén lại, kiểm CRC, checksum, encoding của sáu BAT và chạy lại 96 assertion nhãn từ ZIP.

- [Báo cáo RC3](WINDOWS_ACCEPTANCE_TOOLKIT_RC3_REPORT.md)
- [Self-test nội bộ](TOOLKIT_RC3_SELF_TEST.txt)
- [Xác minh ZIP](RC3_PACKAGE_VERIFICATION.json)
- [Checksum bàn giao](RC3_CHECKSUMS.sha256)

RC2 trên GitHub dùng WINDOWS_REBOOT; RC3 chỉ nhận BEFORE, SERVER_REOPEN, APP_REOPEN, WINDOWS_REBOOT1 (Trim và đổi chữ hoa), báo input sai và dừng sau 20 lần nhập sai.

Giải nén RC3. Trước khi chạy, sao lưu RC2 và copy nội dung RESULTS RC2 vào RESULTS còn rỗng của RC3; không sửa CSV/NOTE lịch sử. Nếu RC3 đã có kết quả, giữ hai bộ riêng để tránh ghi đè.

TOOLKIT_RC3 = READY_FOR_WINDOWS_RETEST
R4_STATUS = PENDING_WINDOWS_VALIDATION
R4_RUNTIME_CHANGED = NO
NATIVE_WINDOWS_CMD_AND_POWERSHELL_5_1 = NOT_RUN_IN_THIS_SESSION

Internal PASS chỉ chứng minh toolkit nhận nhãn và giữ chức năng đã kiểm; bạn cần chạy lại bước 02 sau reboot thật và tự ghi license PASS/FAIL/UNKNOWN. Runtime identity equivalence vẫn UNCONFIRMED. Không sửa R4 candidate, runtime, bộ test patch trước hoặc Production.
