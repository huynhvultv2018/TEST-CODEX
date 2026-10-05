# SUBJECT LOADER PHASE10 — MINIMAL PATCH PROPOSAL

PROPOSAL_ONLY = YES
PATCH_IMPLEMENTED = NO
NEW_APPLICATION_CANDIDATE = NO
PRODUCTION_MODIFIED = NO

Đề xuất để GV review, không phải patch hoặc authorization Phase tiếp theo. Ưu tiên duyệt B và A trước; D chỉ cân nhắc nếu thư viện thật nhiều lớp/tuần/tiết. Không cần triển khai hết top-3.

## TOP_PRIORITY_01 — B. Recent lessons trên thư viện hiện có

CLASSROOM_BENEFIT = Tìm lại bài nhanh hơn bằng recency + context, dùng saved path thay file picker khi bài đã lưu.
SCOPE = LOADER_LOCAL
FILES_EXPECTED_TO_CHANGE = WEB_LIVE/subject-loader.js; WEB_LIVE/subject-loader.css (chỉ row context nếu cần)
CORE_CHANGE_REQUIRED = NO
PROFILE_CHANGE_REQUIRED = NO
RISK = LOW, nếu không thêm storage copy và không đổi transaction/commit.

Chỉ sort existing getLibrary entries theo savedAt DESC trong Loader sau lọc subject; saveLesson hiện cập nhật savedAt khi commit kể cả bài đã lưu, nên không cần sửa zip.js. Metadata ngữ cảnh đọc getLesson(entry.id), không suy từ filename. Hiển thị title, actual profile, lớp/tuần/tiết nếu có; missing field không bịa. Có thể thêm nhãn identity/source đang có cho variant khi cần, nhưng không hứa ngữ cảnh giải quyết được hai gói có mọi field cùng nhau. Giữ CHỌN BÀI→preview→explicit NẠP BÀI. Không thay library keys, tạo DB, ghi bản sao hoặc đổi package.

Không cam kết giảm click saved path hiện đã là 3 khi nhóm mở/cùng môn. Benefit chính là giảm tìm kiếm/scroll, và đường saved vốn có tránh 2 dialog/file-navigation actions của OS. Recent display không tăng quota nhưng cũng không chữa storage quota finding P10-U06.

Acceptance đề xuất nếu được GV duyệt sau này: loaded item có savedAt mới nhất hiện trước; wrong-subject item không lọt vào filter; hai title giống không bị gộp/id collision; sparse/Legacy vẫn chọn được; cancel/stage không thay TV; failed load không update “recent thành công” sau rollback. Đây là tiêu chí tương lai, chưa có patch để test.

## TOP_PRIORITY_02 — A. Nhớ môn đã nạp thành công qua reload

CLASSROOM_BENEFIT = Bỏ tối đa 2 click chọn dropdown khi phiên mới dùng lại cùng môn; không thêm lợi ích cho retention trong cùng page đã có.
SCOPE = LOADER_LOCAL
FILES_EXPECTED_TO_CHANGE = WEB_LIVE/subject-loader.js
CORE_CHANGE_REQUIRED = NO
PROFILE_CHANGE_REQUIRED = NO
RISK = LOW, có nguy cơ preference cũ khác môn tiết mới; cần choice nhìn thấy, chỉnh được và strict mismatch.

Preference chỉ gồm supported profile id cuối cùng load thành công, lưu sau native successful commit; không cập nhật khi staging/cancel/mismatch/quota failure. Khởi tạo lựa chọn visible từ preference hợp lệ; entry thiếu/không hợp lệ giữ — Chọn môn —. Storage write preference failure không được biến successful lesson load thành failure; không đọc file/folder/title để chọn profile. Không auto-load/reopen, không thay active indicator trước commit, không giữ lại old answer/sample/analysis state.

Acceptance đề xuất: successful Geometry→reload nhớ Geometry; canceled Algebra và failed Informatics không ghi preference; Legacy cũ vẫn Legacy; chọn môn khác + matching package load được; mismatch vẫn block; localStorage unavailable không làm mất đường nạp hiện tại. Không sửa Core/reset/TV/profile files.

## TOP_PRIORITY_03 — D. Filter lớp/tuần/tiết, có điều kiện

CLASSROOM_BENEFIT = Thu hẹp thư viện lớn khi GV dạy nhiều lớp/tuần/tiết; với thư viện nhỏ nên hoãn.
SCOPE = LOADER_LOCAL
FILES_EXPECTED_TO_CHANGE = WEB_LIVE/subject-loader.js; WEB_LIVE/subject-loader.css
CORE_CHANGE_REQUIRED = NO
PROFILE_CHANGE_REQUIRED = NO
RISK = LOW nếu optional/mặc định Tất cả; MEDIUM nếu lọc gây ẩn bài thiếu field, cần tránh.

Chỉ thêm nếu GV xác nhận độ lớn và nhu cầu thật. Đọc actual grade/class/week/period từ lesson được lưu; optional filters độc lập với engine, mặc định Tất cả và có nhóm Không có thông tin. Giữ cách lọc subject hiện có, không yêu cầu upgrade schema/packages hoặc đoán SGK/PPCT/period tiếp theo. Hai synthetic profile fixtures thiếu grade/week/period vẫn phải tìm/chọn/nạp được. Không thêm các field thiếu trong Phase10.

Acceptance đề xuất: all/default không mất entry; unknown bucket có fixtures thiếu field; cùng tên khác tuần/tiết phân biệt được; đổi filter không load/reset lesson; không ẩn Legacy absent engine; ngữ cảnh filter không tự điều khiển Core/profile.

## Safeguards và giới hạn không thuộc proposal

Giữ nguyên SUBJECT_METADATA_VALIDATION, SUBJECT_MISMATCH_BLOCK, TRANSACTIONAL_LOAD, CURRENT_LESSON_PRESERVATION, PROFILE_STATE_RESET. Mọi package đi cùng validation/staging/explicit decision; cả Legacy, Geometry, Algebra, Informatics được bảo toàn. Không làm grade/week/period thành required, không tự migrate Legacy.

Không đề xuất B/A/D chỉnh teacher.js/common.js/core-profiles.js/zip.js, TV, profile engines, lesson/pedagogy hay package contents. Chỉ expected-to-change file list ở trên; không file application nào đã đổi trong Phase10. Nếu future design không giữ được Loader-local, dừng để GV review scope mới.

P10-U06 localStorage quota là shared inherited storage finding, có evidence direct failure + fresh-context success. Không dùng B để tuyên bố chữa lỗi, không xóa bài tự động hoặc vá Core trong proposal. Mọi yêu cầu cải tổ storage cần scope approval riêng. Khi review B/A, GV cần biết giới hạn này; số gói/ảnh lưu được trên Windows thật chưa đo.

Windows/physical TV vẫn UNRUN. Không đo latency/độ đọc cuối lớp bằng screenshot cloud. Sau nếu được GV duyệt implementation phải có candidate riêng và regression/safeguard checks tương ứng; Phase10 không tự tạo candidate hay bước kế tiếp.

RECOMMENDED_NEXT_ACTION = GV_REVIEW_AUDIT_AND_APPROVE_LOADER_LOCAL_SCOPE_BEFORE_ANY_PATCH
STOP. Chờ GV phê duyệt.
