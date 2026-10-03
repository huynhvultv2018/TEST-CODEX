# Windows Acceptance Toolkit RC2

TOOLKIT_RC2 = PENDING_WINDOWS_VALIDATION

Đã tạo bộ công cụ tách biệt để giáo viên nghiệm thu ThiTracNghiemLAN v2.3.1 trên máy Windows thật. Không sửa ứng dụng, database, license, registry, firewall hoặc machine ID; không tạo R5 và không nâng Production.

## Candidate

Candidate được đọc nguyên vẹn từ CANDIDATE/ trong ZIP HANDOFF được cung cấp. SHA-256 khớp:

`68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2`

Không repack candidate và không đưa candidate/source ứng dụng vào ZIP toolkit. Người dùng lấy nguyên candidate ZIP từ HANDOFF theo hướng dẫn.

## Thành phần

- Sáu BAT ASCII, CRLF, không BOM, dòng đầu chính xác `@echo off`; gọi PS1 qua đường dẫn tương đối có dấu ngoặc kép, tắt delayed expansion.
- `scripts/Run.ps1`: sáu tác vụ precheck, license/restart, server LAN, máy con, phòng máy, đóng gói.
- `scripts/Common.ps1`: hàm SHA, đọc mạng/firewall, HTTP, identity chỉ đọc, CSV append, ZIP.
- `scripts/Identity.py`: tái hiện độc lập thuật toán `PHAN_MEM/app.py:machine_id`, không import ứng dụng. Hash chỉ đối chiếu thuật toán nguồn, không chứng nhận runtime EXE/Python trùng nhau. Không có Python: nguồn app UNCONFIRMED; MachineGuid hash là đối chiếu Windows riêng.
- `scripts/SelfTest.ps1`: bước 01 tự kiểm byte BAT, cú pháp, SHA, log, CSV và ZIP trong thư mục tạm rồi xóa dữ liệu tự kiểm. Báo cáo ghi vào RESULTS, không giả kết quả license/LAN.
- Hướng dẫn tiếng Việt từng bước, báo cáo byte-level, RESULTS trống sẵn cho evidence thật.

## Đã xác minh

PowerShell 7.4.13 Linux được tải từ bản phát hành chính thức, kiểm SHA-256 với hashes.sha256 trước khi chạy. Cả ba PS1 parse thành công. Kiểm chức năng thực tế đạt: đúng/sai/thiếu candidate, log UTF-8, nối CSV không ghi đè, ZIP gồm evidence tệp ẩn/thư mục con và nội dung tiếng Việt, SHA ZIP, đóng gói lặp, từ chối RESULTS rỗng, từ chối port ngoài khoảng và input license không hợp lệ. Đường dẫn thử có khoảng trắng, dấu tiếng Việt và ký tự &.

HTTP GET được thử với server tạm: 200 PASS, 302 PASS không đi theo redirect, 500 FAIL. Không lưu body/cookie. Kiểm 49 máy NOT_TESTED, 50 máy đủ điều kiện chỉ EVIDENCE_RECORDED_REVIEW_REQUIRED; lỗi login/nộp bài và từng trường lỗi đều FAIL.

Đã so sánh hash Identity.py với chính hàm machine_id được trích từ AST nguồn candidate, chỉ chạy hàm thuần với thư viện chuẩn, không khởi tạo ứng dụng. Phép đối chiếu cùng tiến trình thật đạt, không mock/override nguồn identity. Hai tiến trình riêng trên Linux cho hash khác nhau do nguồn uuid.getnode có bit random/multicast; toolkit ghi cảnh báo UUID_NODE_SOURCE và không chứng nhận tính ổn định. Đây chưa phải kết quả Windows. Candidate SHA và ZIP HANDOFF SHA được kiểm lại sau tạo.

## Chưa xác minh

Chưa có Windows thật nên chưa thực thi CMD/BAT, Windows PowerShell 5.1, CIM, NetTCPIP, NetSecurity, registry read, Python launcher Windows, mạng phòng máy hoặc license qua reboot. Kiểm đường dẫn BAT hiện là kiểm tĩnh; kiểm đường dẫn PowerShell có ký tự đặc biệt đã chạy trên Linux. Không kết luận TOOLKIT_RC2 = PASS trước khi các kiểm tra bắt buộc này hoàn tất.

Giáo viên giải nén toolkit, làm bước 01–06 theo `00_HUONG_DAN.txt`, gửi ZIP kết quả để phân tích. Copy cả toolkit sang máy con, không chỉ riêng BAT. Không bật/tắt firewall bằng toolkit; khi lỗi mạng, chỉ đề nghị quản trị kiểm tra rule đúng port/profile. Bộ công cụ không tự dựng EXE, không tự mở ứng dụng và không tự restart Windows.

Các bước 01/02/03/05 kiểm candidate; 04 chỉ thăm dò mạng và 06 luôn được phép đóng gói evidence lỗi. Log bước 01/03/05/máy con giữ lượt mới nhất; CSV license append. Đóng gói mỗi đợt để giữ lịch sử. Hostname, IP và hash thiết bị là dữ liệu hạ tầng; ảnh bổ sung phải được che thông tin bí mật trước khi gửi.

## Bàn giao

BAT_FILES = 6  
BAT_WITH_BOM = 0  
SELF_TEST = PASS cho các kiểm tra đã chạy; Windows native NOT_RUN  
R4_EXPECTED_SHA256 = 68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2

Checksum ZIP toolkit nằm trong CHECKSUMS.sha256 và thông báo bàn giao. Checksum nội bộ bao phủ các tệp nội dung, không tự băm chính CHECKSUMS.sha256. ZIP chứa toàn bộ thư mục toolkit, gồm RESULTS trống. Đây là bộ công cụ nghiệm thu; không phải bằng chứng ứng dụng đã nghiệm thu thành công.
