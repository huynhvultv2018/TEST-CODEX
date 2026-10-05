# SUBJECT LOADER PHASE 10 — USABILITY AUDIT ONLY

PHASE10_STATUS = COMPLETE_AUDIT_ONLY_WITH_STORAGE_FINDING

Phase 9 được đóng băng theo AUTHORIZE_PHASE10.txt. Audit hoàn tất trên Linux/Chromium cloud; loader sử dụng được nhưng còn ma sát khi đổi bài, tìm bài và giới hạn dung lượng thư viện. Không kết luận usability Windows/TV vật lý PASS. Không implement, patch, refactor, redesign, sửa package, tạo application candidate mới hay thay Production.

## Freeze và phạm vi bằng chứng

PHASE9_CANDIDATE = WEB_LIVE_SUBJECT_LOADER_PHASE9_CANDIDATE
PHASE9_CANDIDATE_STATUS = FROZEN
PHASE9_SHA256_BEFORE = 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1
PHASE9_SHA256_AFTER = 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1
PHASE9_CANDIDATE_MUTATED = NO

Đối chiếu toàn bộ 1.241 file trước/sau: không đổi, thêm hay xóa file. SOURCE_INTEGRITY.json và FROZEN_MANIFEST_BEFORE/AFTER.json chứa bằng chứng. RC1 cũng giữ SHA256 cũ. Chỉ tạo báo cáo và helper audit ở thư mục riêng; browser contexts dùng localStorage kiểm thử độc lập. Environment Settings draft revision 12 giữ nguyên DRAFT_PENDING_SAVE_PUBLISH, không Save/Publish.

Đã đọc source teacher.html, subject-loader.js/css, cockpit.js, zip.js và đối chiếu runtime trên HTTP local của đúng unpacked candidate. RUNTIME_AUDIT.json: COMPLETE; 14 observations, 4 flow records, 3 kích thước màn hình; không pageerror hay external request trên context chính. Các assertion kiểm chứng lựa chọn môn, preview, staging Teacher-only, TV giữ activation/index/answerStep/nội dung, cancel, saved library, mismatch Legacy và fresh-page preference. Đây là audit tập trung; không chạy lại toàn bộ regression hoặc chứng nhận SGK/PPCT.

WINDOWS_PHYSICAL_RUNTIME = UNRUN
PHYSICAL_TV_VALIDATION = UNRUN

## Flow và số thao tác

Hiện tại: mở HỆ THỐNG nếu đang đóng → THƯ VIỆN / NHẬP BÀI → chọn môn → chọn file ZIP/JSON hoặc bài đã lưu → preview và validate tự động → bấm NẠP BÀI.

| Tình huống | CLICK_COUNT | DECISION_COUNT | DIALOG_COUNT | FILE_BROWSER_STEPS |
|---|---:|---:|---:|---|
| Đang dạy, gói mới, đổi môn, HỆ THỐNG mặc định đóng | 8 | 3 | 2 | 2 + điều hướng thư mục |
| Gói mới, đổi môn, HỆ THỐNG đã mở | 7 | 3 | 2 | 2 + điều hướng thư mục |
| Gói mới, cùng môn đã chọn, HỆ THỐNG đã mở | 5 | 2 | 2 | 2 + điều hướng thư mục |
| Bài đã lưu, cùng môn đã chọn, HỆ THỐNG đã mở | 3 | 2 | 1 | 0 |
| Bài đã lưu, đổi môn, HỆ THỐNG đã mở | 5 | 3 | 1 | 0 |
| Startup importer tự mở, gói mới, chọn môn | 6 | 3 | 2 | 2 + điều hướng thư mục |

Đây là mô hình click chuột desktop, chưa đo trên Windows. Trường hợp bình thường mặc định đang dạy là 8 = mở nhóm HỆ THỐNG (1) + mở importer (1) + mở/chọn dropdown (2) + nút ZIP/JSON (1) + chọn file/Open (2) + NẠP BÀI (1). Khi HỆ THỐNG đã mở là 7. Với file mới, 2 bước OS giả định file đã hiện; folder navigation, scroll và thời gian đọc chưa tính. Dialog gồm importer + native picker; không có confirmation popup bổ sung. Preview/validate tự chạy, không thêm click.

Playwright selectOption/setFiles thay thế tương tác UI native, nên số automation actions không phải số click GV. Flow record runtime ghi 7 ở trạng thái nhóm đã mở; FLOW_MODEL.json bổ sung 1 click nhóm mặc định đóng. DECISION_COUNT đếm chọn môn nếu cần, chọn package và quyết định nạp sau preview. Giữ nguyên môn bỏ quyết định thứ nhất. Một package stage đúng cấu trúc nhưng mismatch có thể chọn lại môn đúng với thêm 2 click, không cần mở lại picker.

CAN THIS BE SAFELY SHORTENED? Có: dùng thư viện đã lưu hiện có để bỏ picker; recent ordering giúp tìm nhanh; nhớ môn đã nạp thành công giúp phiên mới. Không cam kết thời gian đứng lớp hay click giảm cố định cho mọi trường hợp.

## Chọn môn / active indicator

| Tiêu chí | Quan sát | Đánh giá |
|---|---|---|
| SUBJECT VISIBILITY | Dropdown có HÌNH HỌC, ĐẠI SỐ, TIN HỌC, BÀI CŨ / LEGACY, chưa chọn mặc định | Nhãn rõ; chỉ hiện đầy đủ khi mở dropdown; entry importer nằm trong HỆ THỐNG thu gọn |
| SUBJECT SELECTION CLARITY | Routing theo top-level lesson.subject_engine; absent → Legacy | Các profile mới rõ; GV có thể nhầm bài Tin học cũ với profile Tin học mới |
| ACTIVE SUBJECT INDICATOR | Chip cạnh lessonTitle theo actual loaded profile | Đúng trong audit; pending dropdown không đổi chip/TV. Khi modal mở, nền bị làm mờ |
| ACCIDENTAL SUBJECT CHANGE RISK | Đổi dropdown chỉ stage/filter, không load; cancel giữ actual lesson | Không tự đổi engine. Tuy nhiên dropdown đã chọn rồi hủy vẫn được giữ khi mở lại, có thể khác chip active; cần đọc preview |

Bài Tin6_W04 có subject “Tin học 6” nhưng không subject_engine: chọn TIN HỌC bị block, chọn BÀI CŨ / LEGACY mới phù hợp. Đây là compatibility đúng, không phải cơ sở đoán engine từ subject/file/folder. Mismatch warning nêu selected/actual profile và disabled NẠP BÀI. LEGACY_METADATA_MISMATCH.png ghi nhận. Không tự migrate gói cũ.

Môn đã chọn được giữ khi đóng/mở importer trong cùng page. Page mới/reload có thư viện đã lưu nhưng dropdown rỗng. Vì vậy A chỉ có giá trị bổ sung ở phiên/page mới; không đề xuất lại retention đã có.

## Preview

| Metadata | Phân loại | Kết luận |
|---|---|---|
| Môn / subject | ESSENTIAL | Nhận diện môn người đọc; không thay subject_engine làm routing |
| Lớp / grade hoặc class | ESSENTIAL; MISSING trên hai synthetic fixtures | Tránh nhầm lớp; preview giữ 0 nếu có, không tự suy từ đường dẫn |
| Tuần / week | ESSENTIAL; MISSING trên hai synthetic fixtures | Xác nhận phạm vi bài định nạp; không tự sinh PPCT |
| Tiết / period | ESSENTIAL; MISSING trên hai synthetic fixtures | Quan trọng khi GV đổi tiết hoặc cùng tên bài |
| Tên bài / title | ESSENTIAL | Hai gói Legacy Geometry có cùng tên: title riêng chưa đủ phân biệt variant |
| Subject engine | USEFUL cho kiểm tra kỹ thuật, REDUNDANT với thao tác GV thường ngày | Khi có metadata thì preview hiển thị raw key; khi absent Legacy thì dòng bị bỏ. Validation/mismatch phải giữ nguyên dù cách trình bày sau này thay đổi |

Preview chỉ đọc lesson metadata có thật; field absent không hiển thị. Không lấy manifest.title khác lesson.title để “sửa” preview. Saved rows hiện chỉ có title + CHỌN BÀI/XÓA, mất ngữ cảnh lớp/tuần/tiết dù nhiều gói có metadata đó. LIBRARY_DUPLICATE_TITLES.png cho thấy hai row Geometry Legacy giống tên; cả grade/week/period cũng giống, nên thêm các field đó chưa giải quyết hết variant identity. Có thể cân nhắc mã nguồn/variant đã có để nhận diện, chỉ là nhãn thông tin, tuyệt đối không dùng cho routing.

## Metadata census và tổ chức file

METADATA_SUFFICIENCY = SUPPORTED_WITH_3_SYNTHETIC_FIXTURE_FIELD_GAPS
METADATA_GAP_COUNT = 3

METADATA_CENSUS.json xét 8 sources: 5 bundled ZIP cũ, 2 JSON profile kiểm thử Algebra/Informatics và 1 Geometry fixture G4-F01 đã được phê duyệt, giữ nguyên. Không phải census bài Production hay xác nhận real-file Windows.

Các field schema hiện có hỗ trợ subject, grade/class, week, period, title, subject_engine. Cả 6 ZIP được xét đều có subject/grade/week/period/title trong lesson.json. Năm gói Legacy không subject_engine là fallback compatibility có chủ đích, không tính metadata gap. Geometry G4-F01 có đủ sáu field. Hai JSON synthetic thiếu grade/week/period: 3 loại METADATA_GAP, 6 ô thiếu trên 2 fixtures, không phải ba lỗi của Production. Không sửa schema/fixtures hoặc dùng engine để che thiếu dữ liệu.

Có thể tổ chức thư mục do GV quản lý: MÔN → LỚP → TUẦN → TIẾT, ví dụ HÌNH HỌC/LỚP 8/TUẦN 5/TIẾT 9 và TIẾT 10; TIN HỌC/LỚP 6/TUẦN 5. Native picker hiện không tự duyệt cây này; thư viện saved hiện chỉ lọc profile. Tên thư mục hỗ trợ tìm bài nhưng không có thẩm quyền metadata/routing. Loader vẫn kiểm lesson.subject_engine thực tế. Không đổi package, file structure, manifest hay đường dẫn. Metadata thiếu phải nằm nhóm Không có thông tin nếu sau này thêm filter, không bị ẩn hoặc trở thành điều kiện từ chối gói cũ.

## PC / TV và giới hạn dung lượng

GEOMETRY_PREVIEW_1920/1366/1280.png và layouts runtime: với Geometry preview 6 field và thư viện Geometry rỗng, 1920×1080 và 1366×768 thấy subject, load và thư viện không cần scroll; 1280×720 panel scrollHeight 705 > clientHeight 660, cuối thư viện dưới fold nhưng nút NẠP BÀI vẫn thấy. Không suy diễn rằng mọi library dài đều fit. Chưa đo khoảng cách cuối lớp, Windows scaling, màn vật lý hay thời gian GV đứng lớp. Modal/preview chỉ trên Teacher; TV vẫn giữ nội dung/answer đã disclosure khi staging.

P10-U06 — STORAGE_QUOTA_OBSERVED (giới hạn inherited storage, không patch): sau nạp Algebra JSON, Informatics JSON, TIN6_W04 ZIP, Geometry LIVE_TEST ZIP và DUAL_VISUAL_TEST ZIP, thử G4-F01 Geometry ZIP báo localStorage.setItem exceeded quota. Storage trước/sau thất bại = 4.744.503 ký tự; không quy đổi thành ngưỡng byte dung lượng Windows. Lặp commit cùng package/context tái hiện cùng lỗi. Cùng package trong fresh isolated context nạp thành công profile geometry, 1 bài lưu, 1.443.850 ký tự. Activation/profile/current lesson và storage trước/sau lần thất bại giữ nguyên. Bằng chứng: hai observations cuối về repeated/fresh và LIBRARY_STORAGE_LOAD_FAILURE.png.

ROOT_CAUSE_CONFIRMED = YES ở mức trực tiếp: browser storage từ chối ghi lesson vào localStorage tại saveLesson. Không chứng minh mọi thiết bị có cùng quota, không quy lỗi nội dung Geometry fixture. SOURCE_INTEGRITY.json đối chiếu function saveLesson trong zip.js byte-identical với RC1: đây là giới hạn cơ chế lưu đã có, không phải evidence của Phase9 mutation. Sửa kiến trúc quota/storage sẽ cần đánh giá riêng ở shared storage boundary (CORE_CHANGE_REQUIRED nếu thay cơ chế), ngoài top-3 loader-local. Không triển khai eviction, IndexedDB, xóa bài, sửa Core hay giảm nội dung. Nút XÓA hiện có có thể giải phóng một bài GV chọn; audit không xóa bài thật và không coi đó là acceptance Windows.

B recent ordering chỉ đổi việc hiển thị dữ liệu đã lưu, không lưu thêm bản sao; nó không chữa quota. Cần báo rõ giới hạn thư viện trong quyết định GV, đặc biệt trước khi dùng nhiều gói ảnh lớn liên tiếp.

## A–J, safety và quyết định

Xem SUBJECT_LOADER_PHASE10_PRIORITY_MATRIX.md: đánh giá riêng đủ A–J, các field bắt buộc và scope classification. Chọn B và A ưu tiên cao; D là lựa chọn thứ ba có điều kiện khi thư viện thực tế đủ lớn. Không mặc định triển khai cả ba. C đã có; J bỏ explicit commit bị REJECT.

Mọi đề xuất giữ SUBJECT_METADATA_VALIDATION, SUBJECT_MISMATCH_BLOCK, TRANSACTIONAL_LOAD, CURRENT_LESSON_PRESERVATION, PROFILE_STATE_RESET. Không routing theo tên/folder/keyword, không auto-load, không skip preview-validation để tiết kiệm click. Bốn profile Legacy/Geometry/Algebra/Informatics và old packages phải còn đường nạp hiện tại; missing subject_engine vẫn Legacy. Không làm grade/week/period thành bắt buộc. Audit không tuyên bố mỗi failure branch đã rerun: Phase9 regression được tham chiếu, evidence mới tập trung staging/cancel/mismatch/storage/current-lesson preservation.

Hai helper attempts đầu chưa hoàn tất: lần 1 locator nhắm nút đang ẩn trong details; lần 2 timeout chờ modal đóng khi commit gặp storage quota. HARNESS_ATTEMPT_01/02.json/log giữ lại. Helper ngoài application đã bổ sung mở nhóm và quan sát lỗi commit; bản audit cuối COMPLETE có reproducer và fresh-context follow-up. Không sửa ứng dụng để làm audit pass.

RECOMMENDED_NEXT_ACTION = GV_REVIEW_AUDIT_AND_APPROVE_LOADER_LOCAL_SCOPE_BEFORE_ANY_PATCH
STOP. Chờ GV phê duyệt; không tự chuyển Phase hoặc implement proposal.
