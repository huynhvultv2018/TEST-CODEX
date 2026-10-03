# Windows Acceptance Toolkit RC4

[Tải ZIP RC4](ThiTracNghiemLAN_v2.3.1_WINDOWS_ACCEPTANCE_TOOLKIT_RC4.zip)

SHA-256: `15774863999e9b019838c135ab80527ee2f96e338bad059bc7df146ad2cff643`

57.268 byte; 22 file và RESULTS rỗng. Đã giải nén lại, kiểm CRC, checksum và sáu BAT. Self-test từ ZIP: collection/bước03 268, nhãn 96, core 411 assertions PASS nội bộ.

- [Báo cáo RC4 cuối cùng (có ZIP SHA)](WINDOWS_ACCEPTANCE_TOOLKIT_RC4_REPORT.md)
- [Self-test nội bộ](TOOLKIT_SELF_TEST_RC4.txt)
- [Xác minh ZIP](RC4_PACKAGE_VERIFICATION.json)
- [Checksum bàn giao](RC4_CHECKSUMS.sha256)

RC3 đọc `$ips.Count` từ output pipeline có thể thành null/scalar. RC4 chuẩn hóa collection và xử lý read-only discovery thiếu cmdlet/quyền/dữ liệu; giữ nguyên fix nhãn RC3.

Retest Windows: giải nén RC4 riêng (không copy vào runtime), giữ server đang chạy, chạy 03_KIEM_TRA_SERVER_LAN.bat, chọn đúng R4 candidate ZIP, nhập PORT 5000, chụp toàn bộ output. Không rebuild/reset license/restart Windows.

TOOLKIT_RC4_STATUS = READY_FOR_WINDOWS_RETEST
WINDOWS_POWERSHELL_5_1_EXECUTION = NOT_RUN
R4_RUNTIME_CHANGED = NO
R4_STATUS = PENDING_WINDOWS_VALIDATION
R4_LAN_STATUS = NOT_YET_DETERMINED

Báo cáo trong ZIP có biến thể INSIDE_ZIP và tham chiếu hash ngoài để tránh self-reference; báo cáo cuối cùng ở đây ghi chính hash ZIP đã hoàn tất. Cả hai được checksum riêng. Artifact RC2/RC3 giữ nguyên.
