# P12.2B — 8 bước kiểm thử Windows

1. BACKUP: mở chrome://version xem đúng Profile Path. Đóng Chrome; sao lưu thư mục User Data/profile thực tế (kèm Local State) và các ZIP/bài gốc. Giữ bản P12.1 để rollback.
2. START: giải nén candidate vào thư mục riêng. Đóng dịch vụ WEB LIVE cũ đã xác định; chạy START_WEB_LIVE.bat của bản mới. Dùng đúng Chrome profile và đúng origin cũ (127.0.0.1 và localhost là hai kho khác nhau; cổng WEB LIVE vẫn 47382).
3. MIGRATE: mở CHỌN BÀI HỌC → CHUYỂN THƯ VIỆN CŨ AN TOÀN. Chờ thông báo đã chuyển; dữ liệu cũ vẫn giữ nguyên. Nếu lỗi, dừng và gửi thông báo.
4. VERIFY OLD: mở lại vài bài cũ nhiều ảnh; kiểm ảnh, môn/engine, bước/đáp án ẩn đúng. Với bài đang dạy, kiểm migration không làm mất bài hoặc đổi màn hình.
5. IMPORT NEW: khi bài hiện tại đang chạy và LS gần/đầy như máy GV, nhập thêm một bài mới nhiều ảnh. Kiểm lưu/nạp thành công và ảnh đầy đủ.
6. REOPEN: mở lại bài mới từ thư viện; kiểm lọc Môn/Lớp/Tuần/Tiết, Gần đây và nhớ môn.
7. RESTART: đóng Chrome và WEB LIVE; chạy lại bản mới bằng đúng profile/origin.
8. REOPEN AGAIN: mở bài cũ và bài mới, kiểm ảnh/Teacher/TV; gửi kết quả PASS/FAIL, tên bài, bước lỗi và thông báo. Kiểm màn TV thật và khả năng đọc cuối lớp riêng.

Không xóa localStorage, không clear site data, không cleanup. Nếu không thấy bài cũ: kiểm profile/origin trước, dừng báo lại; không xóa để thử. Full LS có thể còn cảnh báo lưu tùy chọn nhỏ vì dữ liệu cũ vẫn giữ nguyên. Chưa cho phép P12.2C, Phase 13 hoặc Production. P11-F01 chờ GV retest, chưa FIXED.
