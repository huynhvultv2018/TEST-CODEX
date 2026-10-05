# Phase 12 — Lesson Library Filter

PHASE12_STATUS = PASS (cloud technical candidate, chờ GV phê duyệt).

GV đã phê duyệt/freeze Phase11: SHA256 1a04b5e9ae52068e9bf7d194b0767f233e0aecab3a17dd490ff2606178005954. ZIP nguồn và toàn bộ 1.241 file frozen giữ nguyên. Working copy riêng; chỉ sửa WEB_LIVE/subject-loader.js và WEB_LIVE/subject-loader.css. 1.239 file còn lại byte-identical; không thêm/xóa file runtime, không Core/Profile/Production change. PATCH_FILES.diff và SOURCE_SCOPE.json là bằng chứng phạm vi.

Loader hiện có bộ lọc Môn → Lớp → Tuần → Tiết cho bài đã lưu. Grade/week/period lấy trực tiếp từ cached lesson metadata; subject_engine dùng đúng mapping có sẵn Phase9/11. Chỉ tạo lựa chọn có dữ liệu, sắp xếp số và cascade reset. Tên bài và metadata gọn hiển thị trong một modal hiện có. Preview và explicit NẠP BÀI được đặt gần bộ lọc; nút ĐÓNG ở đầu modal. File/ZIP import và Recent vẫn có trong modal đó.

Bài thiếu dữ liệu nằm trong nhóm CHƯA ĐỦ THÔNG TIN, có ghi trường còn thiếu. Không lấy metadata từ nội dung, câu hỏi, tên file hoặc class8A. Bài trùng tên/cùng bộ metadata có Mã bài để phân biệt. Không dùng filename fallback. Chọn bài vẫn stage/validate/route; chỉ nút explicit load mới commit. Đổi bộ lọc hủy pending preview và giữ bài đang dạy. Recent ngoài bộ lọc chỉ reset bộ lọc khám phá, vẫn qua cùng openSaved/stage pipeline.

Không thêm localStorage namespace hay cache index. FilterState chỉ có ba giá trị trong RAM; descriptor giữ scalar bounded metadata và reference, không giữ package/assets clone. Quota/transaction/quick-access đoạn mã giữ byte-exact so với Phase11. Recent tối đa5, metadata ≤8192 ký tự; native essential lesson storage vẫn hiện hữu. P11-F01=P2 OPEN_DEFERRED; capacity limit chưa loại bỏ.

Kiểm chứng: working và fresh-extracted ZIP đều21 library +16 quick-access +15 safeguard groups PASS; bốn profile75 groups PASS với exact semantic JSON comparison Phase11 (chỉ UUID Geometry/currentTime video Informatics được normalization). HTTP60 assets exact bytes, ZIP CRC/full1241file manifest PASS. Không tuyên bố ảnh chụp pixel-identical hay physical PASS.

Common load đạt5 meaningful interactions trong ca nhớ sẵn môn, System đang đóng, chọn Lớp8 và bài đầu: mở System → mở Loader → chọn Lớp → chọn bài → explicit load. Dropdown native được selectOption trong automation; mô hình chuột6click, Windows physical UNRUN. Không cần scroll trong ca đã đo. Chọn cả bốn cấp từ đầu có thể nhiều hơn5; thời gian đọc/tìm bài và cuộn danh sách tùy thư viện không được đo như physical interaction.

Khôi phục phiên bài đã được chấp nhận trên reload là hành vi native frozen pedagogy-teacher.js. Giữ hành vi đó, không tạo auto-load từ remembered subject/Recent. Trong fresh context có lastSubject nhưng không native saved session, lesson vẫn null; G/W/P không persist.

Environment Settings draft revision12 unchanged; không write/Save/Publish, trạng thái DRAFT_PENDING_SAVE_PUBLISH. Python3/Node/Playwright/Chromium sẵn có, static app không cần npm build. Hướng dẫn chạy/kiểm tra trong README_PHASE12.txt; fresh managed-task restoration chưa được kiểm chứng. Windows/TV vật lý/lớp thật đều UNRUN.

Candidate: WEB_LIVE_LESSON_LIBRARY_PHASE12_CANDIDATE.zip; SHA256 329dca2256104ef5d9ccca18a2dad2e9c921324260f31249b165683128a2d5e9; 50171510bytes,1241files. Reports/checksums cũ trong payload là lịch sử inherited và được giữ nguyên; bộ báo cáo Phase12 bên ngoài ZIP là release authority. STOP; không Production/Phase13.
