# Phase11 — Classroom quick-access implementation

PHASE11_STATUS = PASS — technical cloud candidate; GV review required.

Nguồn application duy nhất: WEB_LIVE_SUBJECT_LOADER_PHASE9_CANDIDATE, SHA256 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1. Đã kiểm SHA và CRC trước patch, giải nén working copy riêng. Không dùng Phase10 reports làm source candidate. ZIP và 1.241 file frozen Phase9 giữ nguyên sau patch/tests. Source delta chỉ WEB_LIVE/subject-loader.js và WEB_LIVE/subject-loader.css; 1.239 file khác byte-identical. PATCH_FILES.diff chứa thay đổi cụ thể. Không thêm/sửa file candidate, Core, Profile, TV, teacher.js, zip.js, assets hay package.

## A. Môn đã nhớ

Trước: dropdown được giữ trong cùng page nhưng rỗng sau reload. Sau: chỉ sau validation, essential save, preflight và native start/clear thành công mới ghi optional preference. Khôi phục giá trị literal geometry/algebra/informatics/legacy qua reload; “MÔN ĐÃ NHỚ” là nhãn preference, còn active indicator vẫn thuộc lesson đã load thực tế. Không auto-load hoặc auto-resume. Click chọn môn, staging, cancel, mismatch, invalid package và essential load failure không ghi preference.

Missing/invalid/corrupted/oversized/unreadable optional data fallback về lựa chọn rỗng và đường nạp tay; có warning khi unreadable/corrupted. Dữ liệu đó không có thẩm quyền routing: actual lesson.subject_engine và pipeline Phase9 vẫn quyết định.

## B. BÀI GẦN ĐÂY

Giới hạn cứng 5 bài; dữ liệu tối đa 8.192 UTF-16 code units (không gọi đây là 8KB byte quota). Một key optional riêng của Phase11 lưu version, lastSubject và tối đa 5 entry. Entry chỉ có canonical saved lesson id, subjectEngine, ISO LAST OPENED và metadata scalar nhỏ nếu tồn tại: title, subject, grade/class, week, period. Không screens/image/imageData/ZIP/video hoặc full lesson; user packages vẫn nằm duy nhất ở existing lesson storage. Dùng copy.id sau saveLesson xử lý collision, không tự suy id/engine từ tên bài/file/folder.

Thành công → entry lên đầu, dedupe bằng canonical id, timestamp cập nhật, bỏ metadata ngoài top-5. Không bỏ package khỏi thư viện. Nếu optional write fail, giữ durable quick-access data cũ; lesson vừa nạp vẫn thành công và có warning nhìn thấy trên Teacher sau khi importer đóng. Không retry bằng cách xóa package hay key khác.

“BÀI GẦN ĐÂY” là một section nhỏ, danh sách scroll tối đa 180px; mỗi row có tên, subject/lớp/tuần/tiết nếu có, last opened và CHỌN BÀI. Metadata hiển thị ưu tiên actual saved lesson; missing package được đánh dấu unavailable, button disabled. Nhấn CHỌN BÀI gọi cùng openSaved→stage→validate/assets→mismatch gate→explicit NẠP BÀI. Không silently đổi môn để bypass mismatch. Reopen tạo native activation mới và reset profile state như đường nạp hiện có.

## C. Quota / storage guard

Essential storage failure chặn commit trước native start; snapshot/rollback giữ current lesson, library và dữ liệu đang có trong các failure cases đã test. Guard nhận QuotaExceededError/code22/code1014 và lỗi write/read khác, cảnh báo tiếng Việt. Rollback best effort được bao trong catch, không để exception phục hồi thoát ra UI. Chỉ cleanup các write mới của failed transaction (attempted lesson key/library/state); không quét xóa unknown keys hoặc evict saved packages. Không tuyên bố distributed/durable ACID khi browser từ chối cả rollback; warning riêng yêu cầu kiểm tra library trước reload trong tình huống đó. Các tests xác nhận các failure classes cụ thể, không mô phỏng mọi browser permission fault.

Optional quick-access write nằm sau essential successful transaction, ngoài catch rollback essential lesson. Vì thế quota/write failure ở optional key không biến valid load thành FAIL. Warning dùng role=status trên Teacher, ngoài importer nên không bị ẩn sau successful load. TV không load module này, không nhận preference/history/warning.

Storage ownership/eviction boundaries xem STORAGE_AUDIT. Giới hạn lưu package bằng localStorage vẫn tồn tại: P11-R01 (P2), guarded capacity limitation từ Phase10. Không migration hoặc auto-eviction package.

## Không mở rộng scope

Không class/week/period filter, favorites, next lesson, drag/drop, library redesign, IndexedDB hay storage migration. Không xóa safeguards; không đoán SGK/PPCT/profile. Subject metadata validation, mismatch block, invalid-package safety, transaction, current preservation và native profile reset được kiểm PASS. Mọi profile/old packages giữ đường nạp hiện có.

## Candidate và evidence

PHASE11_CANDIDATE = WEB_LIVE_SUBJECT_LOADER_PHASE11_CANDIDATE
PHASE11_CANDIDATE_SHA256 = 1a04b5e9ae52068e9bf7d194b0767f233e0aecab3a17dd490ff2606178005954
FILES = 1241
BYTES = 50168768

Working và fresh-extracted candidate đều PASS 16 quick-access groups + 15 inherited safeguard groups. Four-profile regression: Geometry14, Algebra20, Informatics26, Legacy15 groups; semantic JSON equality với Phase9 (chỉ normalization UUID activation Geometry/video currentTime Informatics, không pixel-hash equality). Fresh HTTP assets 60/60 exact bytes; ZIP CRC và full manifest equality PASS. Candidate chỉ tạo sau working gates PASS, release gate chốt sau fresh-packaged tests.

Không cài dependency hoặc đổi Environment Settings: toolchain/runtime đã có; draft revision12 unchanged, DRAFT_PENDING_SAVE_PUBLISH. Không Save/Publish. Không Production/main merge/Phase tiếp theo. Reports/evidence là sidecars, candidate giữ nguyên inherited historical documents; báo cáo Phase11 bên ngoài ZIP là kết quả hiện hành.

WINDOWS_PHYSICAL_RUNTIME = UNRUN
PHYSICAL_TV_VALIDATION = UNRUN
REAL_CLASSROOM_TRIAL = UNRUN

STOP. Chờ GV review candidate và P2, không Production.
