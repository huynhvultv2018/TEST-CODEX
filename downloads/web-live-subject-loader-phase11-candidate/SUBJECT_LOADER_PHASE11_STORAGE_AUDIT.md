# Phase11 — localStorage ownership audit

Audit source Phase9 và patch Loader-local. Không storage architecture refactor. Các key dưới đây là technical evidence, không phải hướng dẫn tự động xóa dữ liệu GV.

| Key / namespace | Owner | Nội dung / kích thước | Vai trò | Phase11 được tự evict? |
|---|---|---|---|---|
| lesson:<id> | zip.js saveLesson; TV reads/caches | Full parsed lesson + embedded images; nguồn payload lớn nhất | Essential cho library/reopen/TV/current package | NO |
| webLiveLibrary | zip.js | Danh mục id/title/subject/week/period/savedAt; nhỏ hơn packages, tăng theo số bài | Essential saved package index | NO |
| webLiveStateV042 | common.js/Teacher | Current activation/index/disclosure/zoom/Focus/controller references; không full ZIP | Essential current teaching state | NO |
| drawBoard:<lesson>:<scope> | draw-board.js | Teacher annotations; có thể lớn khi nhiều objects/scenes | User lesson state, cần bảo toàn | NO |
| coverLayer:<lesson>:<scope> | cover-layer.js | Authored teacher masks | User lesson state | NO |
| smartGeometry:<lesson>:<scene> | smart-geometry.js | Teacher-created drawing/model state | User lesson state | NO |
| webLive:informatics:v1:<activation/source/index> | frozen Informatics profile | checkpoint/sample disclosure flags | Essential active pedagogical state; old activations may be stale nhưng không thuộc quyền Phase11 | NO |
| WEB_LIVE_TTS_SETTINGS_V1 | tts-controller.js | Voice/rate/gender preference map | Existing optional preferences | NO — không phải Phase11-created |
| WEB_LIVE_TTS_OWNER_V1 | tts-controller.js | Speech lease/expiry | Existing ownership coordination | NO |
| WEB_LIVE_TTS_PRESENTATION_V1 / WEB_LIVE_TTS_REGISTRY_V1 | tts-presentation.js | Presentation packets/registry, source snippets | Existing optional transport/cache | NO — không thuộc Phase11 |
| webLiveSubjectLoaderQuickAccessPhase11 | subject-loader.js Phase11 | Version + last successful subject + max5 bounded metadata/reference entries | Optional quick-access, có thể bỏ mà vẫn nạp tay | ONLY OWNED METADATA |
| Unknown legacy/application keys | Unknown | Không giả định nội dung hoặc kích thước | Preserve | NO |

## Kích thước và giới hạn

RECENT_LESSON_LIMIT = 5. Không dùng library size làm recent size; library/user packages không bị cắt. Bounded id<=512 code units, title<=160, subject<=80, grade/class/week/period string<=32; finite scalar numbers được giữ; data-URI metadata không copy. Chỉ whitelist fields, không serialize lesson/screens/assets. LAST OPENED là ISO timestamp local commit, UI dùng timezone/locale của browser.

Max optional serialized data = 8.192 UTF-16 code units. Working measured quick-access payload sau Geometry ảnh lớn = 996 code units. Measurement là một dataset runtime, không tuyên bố mọi record có cùng kích thước. Corrupted/oversized optional key được bỏ qua trong memory; không parse huge JSON, không đụng user package. Khi valid load mới thành công, có thể replace đúng optional key bằng sanitized record mới.

## Update / eviction policy

Essential commit thành công trước optional write. One optional JSON key làm lastSubject và recent cùng được ghi hoặc cùng giữ giá trị durable cũ khi setItem thất bại. Không duplicate full package. Dedupe/reorder/cap chỉ bỏ metadata references của các recent ngoài top5 do Phase11 tạo. Không quota retry bằng evict user packages, unknown data, old TTS caches, drawings, current lesson hoặc essential state. Missing recent package không auto-delete entry/package: hiển thị unavailable. Chỉ GV dùng nút XÓA hiện có nếu tự chọn xóa một bài không còn cần.

Essential transaction cleanup của partial write thất bại khác với eviction: restore snapshot values; remove only newly created attempted lesson/library/current-state writes thuộc failed transaction. Saved user package trước transaction không bị remove. Không quét toàn bộ new unknown namespace như rollback cũ; unknown Legacy sentinel đã kiểm byte-identical sau actual quota failure.

## Failure classes và chứng cứ

1. QuotaExceededError ở essential lesson write: block load, current Teacher/TV và quick-access unchanged.
2. QuotaExceededError ở library write sau partial lesson write: cleanup uncommitted new lesson, restore before snapshot, current state unchanged.
3. Storage read denial khi snapshot: safe load failure, current lesson giữ nguyên.
4. QuotaExceededError hoặc SecurityError chỉ ở optional key: essential lesson/TV load thành công, native hidden/fresh state, durable preference/history cũ giữ nguyên, warning visible khi modal đã đóng.
5. Missing/invalid/corrupted/oversized/unreadable optional data: safe manual fallback, valid package sau đó vẫn load được.
6. Actual Chromium quota: theo sequence đã phát hiện ở Phase10, 5 gói prior đã load (2 profile JSON + 3 image-bearing Legacy ZIP), rồi G4-F01 Geometry ZIP. Browser từ chối write; current lesson/storage và unknown sentinel giữ nguyên. Snapshot storage sum 4745641 code units trong working run; không coi đây là byte quota chung cho Windows.

Warning actual quota: “Không đủ dung lượng lưu bài. Bài đang dạy được giữ nguyên. Bạn có thể xóa một bài đã lưu không còn cần rồi thử lại.”

Bằng chứng working/fresh-package QUICK_ACCESS_RESULTS.json, ACTUAL_CHROMIUM_QUOTA_PRESERVATION.png và OPTIONAL_WRITE_*.png. Expected failed loads trong fault injection/reproducer là assertion PASS của guard, không phải lesson load thành công. Không giả mạo Windows PASS.

## Còn lại

P11-R01 / P2: essential lesson cache vẫn localStorage và vẫn hữu hạn. Guard không tạo thêm dung lượng. Không migrate, xóa asset, giảm chất lượng ảnh hoặc sửa engine để che lỗi. Browser từ chối rollback cũng không cho phép đảm bảo persistence restoration bằng JavaScript; implementation có controlled warning và giữ current session theo native restoration. Finite representative failure coverage và single Teacher transaction; không distributed cross-tab ACID guarantee.

Core/Profile/zip.js storage owners giữ nguyên byte; quota guard nằm trong subject-loader.js. Nếu muốn đổi essential storage/capacity/retention cần GV scope approval riêng; Phase11 dừng tại candidate/reports.
