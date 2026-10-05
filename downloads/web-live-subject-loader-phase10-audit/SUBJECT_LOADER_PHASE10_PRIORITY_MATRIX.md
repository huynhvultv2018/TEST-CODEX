# SUBJECT LOADER PHASE10 — PRIORITY MATRIX

AUDIT ONLY. Các mức benefit/risk là đánh giá source + cloud runtime, chưa chứng nhận Windows/physical TV. Chỉ đề xuất tối đa B, A và D có điều kiện; không mặc định triển khai A–J.

| ID | Khả năng | CLASSROOM_VALUE | IMPLEMENTATION_COMPLEXITY | CORE_IMPACT | PROFILE_IMPACT | BACKWARD_COMPATIBILITY_RISK | RECOMMENDATION | SCOPE |
|---|---|---|---|---|---|---|---|---|
| A | REMEMBER LAST SUBJECT | HIGH | LOW | NONE | NONE | LOW | HIGH_PRIORITY | LOADER_LOCAL |
| B | RECENT LESSONS | HIGH | LOW | NONE | NONE | LOW | HIGH_PRIORITY | LOADER_LOCAL |
| C | FILTER LESSONS BY SUBJECT | ALREADY PROVIDED | NONE — EXISTING | NONE | NONE | LOW | LOW_PRIORITY | LOADER_LOCAL |
| D | CLASS / WEEK / PERIOD FILTER | MEDIUM — CONDITIONAL | MEDIUM | NONE | NONE | LOW IF OPTIONAL | MEDIUM_PRIORITY | LOADER_LOCAL |
| E | ONE-CLICK REOPEN LAST LESSON | MEDIUM | LOW–MEDIUM | NONE | NONE | MEDIUM — ACCIDENTAL RELOAD | MEDIUM_PRIORITY | LOADER_LOCAL |
| F | NEXT LESSON SHORTCUT | LOW UNTIL AUTHORITATIVE SEQUENCE EXISTS | HIGH | NONE FOR APPROVED LINK + EXISTING LOAD | NONE | HIGH — WRONG LESSON ORDER | LOW_PRIORITY | PACKAGE_CHANGE_REQUIRED |
| G | FAVORITE LESSON FOLDERS | LOW | HIGH | NONE IF LOADER-ONLY API | NONE | MEDIUM — BROWSER/PERMISSION | LOW_PRIORITY | LOADER_LOCAL |
| H | DRAG-AND-DROP PACKAGE | LOW | LOW–MEDIUM | NONE | NONE | LOW IF SAME STAGING PATH | LOW_PRIORITY | LOADER_LOCAL |
| I | SUBJECT-SPECIFIC LOAD BUTTONS | LOW | LOW | NONE | NONE | LOW–MEDIUM — UI CROWDING | LOW_PRIORITY | LOADER_LOCAL |
| J | LOAD CONFIRMATION ONLY WHEN NECESSARY | NO ADDITIONAL POPUP TO REMOVE | LOW FOR UI / HIGH SAFETY RISK | NONE — REJECTED | NONE — REJECTED | HIGH IF AUTO-COMMIT | REJECT | LOADER_LOCAL |

## A. REMEMBER LAST SUBJECT

CLASSROOM_VALUE = HIGH
IMPLEMENTATION_COMPLEXITY = LOW
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW
RECOMMENDATION = HIGH_PRIORITY
SCOPE = LOADER_LOCAL

Nhớ môn đã NẠP THÀNH CÔNG qua reload/page mới; cùng page đã nhớ sẵn. Có thể bỏ 2 click dropdown ở phiên mới cùng môn.

Chỉ lưu supported profile id sau successful commit; không lưu canceled/failed choice; preference nhìn thấy và sửa được, không auto-load, vẫn validate actual package.

## B. RECENT LESSONS

CLASSROOM_VALUE = HIGH
IMPLEMENTATION_COMPLEXITY = LOW
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW
RECOMMENDATION = HIGH_PRIORITY
SCOPE = LOADER_LOCAL

Tìm lại bài trong thư viện đã có nhanh hơn, giảm search/scroll và dùng saved path để tránh native picker.

Đọc savedAt đã có, sort descending ở Loader; hiển thị ngữ cảnh thực của saved lesson. Existing reopen cập nhật savedAt nhưng entry cũ vẫn ở index cũ. Không tạo DB/cache hay bản sao package; không chữa quota.

## C. FILTER LESSONS BY SUBJECT

CLASSROOM_VALUE = ALREADY PROVIDED
IMPLEMENTATION_COMPLEXITY = NONE — EXISTING
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW
RECOMMENDATION = LOW_PRIORITY
SCOPE = LOADER_LOCAL

Đã lọc saved library theo engine actual lesson. Không cần triển khai thêm.

Giữ cách lọc hiện tại và Legacy fallback; không lọc theo filename, title hay subject text.

## D. CLASS / WEEK / PERIOD FILTER

CLASSROOM_VALUE = MEDIUM — CONDITIONAL
IMPLEMENTATION_COMPLEXITY = MEDIUM
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW IF OPTIONAL
RECOMMENDATION = MEDIUM_PRIORITY
SCOPE = LOADER_LOCAL

Có ích khi thư viện nhiều lớp/tuần/tiết; thư viện nhỏ thêm controls và decisions không cần thiết.

Filter optional đọc actual metadata grade/class/week/period, mặc định Tất cả; bucket Không có thông tin. Không sửa schema, không ẩn old/synthetic packages thiếu field.

## E. ONE-CLICK REOPEN LAST LESSON

CLASSROOM_VALUE = MEDIUM
IMPLEMENTATION_COMPLEXITY = LOW–MEDIUM
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = MEDIUM — ACCIDENTAL RELOAD
RECOMMENDATION = MEDIUM_PRIORITY
SCOPE = LOADER_LOCAL

Một nút explicit có tên bài giúp mở lại bài vừa dùng; kém phù hợp khi cần bài tiếp theo.

Chỉ nếu button tự biểu đạt quyết định commit rõ ràng, chạy full validation/mismatch/transaction/reset và error preservation; không tự resume answer/sample/reveal. Chưa chọn top-3.

## F. NEXT LESSON SHORTCUT

CLASSROOM_VALUE = LOW UNTIL AUTHORITATIVE SEQUENCE EXISTS
IMPLEMENTATION_COMPLEXITY = HIGH
CORE_IMPACT = NONE FOR APPROVED LINK + EXISTING LOAD
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = HIGH — WRONG LESSON ORDER
RECOMMENDATION = LOW_PRIORITY
SCOPE = PACKAGE_CHANGE_REQUIRED

Có thể giúp sang tiết kế nhưng dữ liệu hiện xét không có authoritative next-lesson link/sequence.

Một quan hệ next-lesson được tác giả/GV duyệt là prerequisite, không phải metadata gap trong 6 field hiện tại. Không đoán period+1, file order, title hay PPCT. Không đề xuất sửa package trong Phase10.

## G. FAVORITE LESSON FOLDERS

CLASSROOM_VALUE = LOW
IMPLEMENTATION_COMPLEXITY = HIGH
CORE_IMPACT = NONE IF LOADER-ONLY API
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = MEDIUM — BROWSER/PERMISSION
RECOMMENDATION = LOW_PRIORITY
SCOPE = LOADER_LOCAL

Có thể bớt điều hướng OS nhưng normal file input không giữ quyền/path thư mục để truy cập tùy ý.

Nếu xét sau này cần File System Access capability/permission và fallback file picker, Windows support UNRUN. Ưu tiên GV dùng OS Quick Access có sẵn; không thêm launcher/Core work-around.

## H. DRAG-AND-DROP PACKAGE

CLASSROOM_VALUE = LOW
IMPLEMENTATION_COMPLEXITY = LOW–MEDIUM
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW IF SAME STAGING PATH
RECOMMENDATION = LOW_PRIORITY
SCOPE = LOADER_LOCAL

Tiện khi GV đã mở Explorer; không chắc nhanh hơn keyboard/native picker khi đang đứng lớp.

Nếu triển khai sau chỉ nhận một file vào importer, cùng stage→preview→validate→explicit commit. Không auto-load/drop nhiều file, không bypass subject checks.

## I. SUBJECT-SPECIFIC LOAD BUTTONS

CLASSROOM_VALUE = LOW
IMPLEMENTATION_COMPLEXITY = LOW
CORE_IMPACT = NONE
PROFILE_IMPACT = NONE
BACKWARD_COMPATIBILITY_RISK = LOW–MEDIUM — UI CROWDING
RECOMMENDATION = LOW_PRIORITY
SCOPE = LOADER_LOCAL

Có thể thay 2 dropdown clicks bằng 1 chọn môn, nhưng thêm 4 button/entrypoints làm cockpit đông.

Chỉ preset visible selected subject rồi dùng cùng loader; không nút ép engine/mismatch. Không redesign top-level cockpit ở Phase10.

## J. LOAD CONFIRMATION ONLY WHEN NECESSARY

CLASSROOM_VALUE = NO ADDITIONAL POPUP TO REMOVE
IMPLEMENTATION_COMPLEXITY = LOW FOR UI / HIGH SAFETY RISK
CORE_IMPACT = NONE — REJECTED
PROFILE_IMPACT = NONE — REJECTED
BACKWARD_COMPATIBILITY_RISK = HIGH IF AUTO-COMMIT
RECOMMENDATION = REJECT
SCOPE = LOADER_LOCAL

Hiện không có confirmation dialog riêng; NẠP BÀI là quyết định explicit sau preview.

Reject global auto-commit khi file match metadata. Match môn không chứng minh đúng lớp/tuần/tiết/bài. Giữ explicit NẠP BÀI, transaction/current lesson/reset; không xóa safeguard. E là tình huống explicit button khác, không cho phép auto-load ở J.

## Priority boundary

TOP_PRIORITY_01 = B_RECENT_LESSONS_USING_EXISTING_LIBRARY
TOP_PRIORITY_02 = A_REMEMBER_LAST_SUCCESSFULLY_LOADED_SUBJECT
TOP_PRIORITY_03 = D_OPTIONAL_CLASS_WEEK_PERIOD_FILTER_IF_LIBRARY_SIZE_JUSTIFIES

Không đề xuất Core/Profile change cho top-3. F chỉ khả thi khi có authoritative relationship, không tự tạo. Shared localStorage quota được ghi nhận riêng trong audit: recent UI không chữa nó, không thêm storage migration vào proposal. Không sửa package để che lỗi/thiếu metadata. Không dùng filename/folder/content để định engine. Tất cả đường nạp phải giữ metadata validation, mismatch block, transaction, current-lesson preservation và fresh profile state reset.

STOP. Chờ GV duyệt phạm vi, không triển khai.
