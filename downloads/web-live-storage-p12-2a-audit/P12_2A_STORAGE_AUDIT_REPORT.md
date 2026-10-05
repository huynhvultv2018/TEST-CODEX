# P12.2A — Storage capacity audit / design only

P11-F01 (P2) = OPEN_CONFIRMED_ON_WINDOWS, NOT FIXED. GV báo Windows quota chặn full lesson load; P12-F01 Legacy subject separation/display có bằng chứng tích cực, chưa Windows FULL PASS. QUOTA_GUARD = PASS; CAPACITY_REAL_USE = INSUFFICIENT / CONFIRMED_ON_WINDOWS. PHYSICAL_TV_VALIDATION và REAL_CLASSROOM_TRIAL = UNRUN.

## Source / method / result boundaries

Source: WEB_LIVE_LESSON_LIBRARY_P12_1_CANDIDATE.zip, SHA before/after 39c0955f1c4a9371187dff791b5eeb1e4a9041335cfc235b577ac14c14c94a49. ZIP CRC PASS; 1,241 files so before/after identical, added/removed/changed 0. Core/Profile/runtime/package không sửa, Production không sửa. Không tạo runtime candidate hay Production ZIP.

Audit dùng Chromium 151.0.7922.173 và frozen served source. External diagnostic hook thay localStorage bằng RAM Map dùng chung Teacher/preview trước app execution. Đây là test double đo/trace, không phải storage adapter triển khai. getItem/setItem chạy code gốc với RAM; removeItem/clear bị chặn và assert không được gọi. Native storage writes/removes=0, clearCalls=0, IDB access=0. Không đọc/xóa/migrate dữ liệu GV. Served loader source hash được kiểm tra khớp frozen file. Package parsing/validation/staging/native save logic chạy đối với 7 fixtures đã nằm trong source candidate; không chỉnh fixture và không xác thực SGK/PPCT lại.

MEASUREMENTS/SUMMARY.json = PASS_AUDIT_MEASUREMENT. Hook đầu tiên lỗi do about:blank opaque origin, được giữ tại HARNESS_HISTORY; sửa helper để chạy HTTP/HTTPS, không sửa runtime. MEASURE_RUN.log là run hoàn tất. RAM vượt giới hạn localStorage thực có chủ đích để đo tất cả package; tổng này không chứng minh 7 bài cùng lưu được trên Windows.

Evidence ba tầng: (1) Windows quota là GV báo trong AUTHORIZE_P12_2A.txt, không có key/byte/browser trace; (2) inherited P12.1 actual Chromium quota fixture đã guard đúng, tổng storedCharacters 4,745,643, không instrument failed key; (3) P12.2A diagnostic injection bắt exact key và stack trong RAM. Không gán stack chẩn đoán là stack thu từ Windows.

## Sizes by package

| Fixture ID | Source bytes (ZIP/JSON) | Stored JSON UTF8 B | UTF16 approx B | Top-level metadata UTF8 B | HTML/plain leaf B | Asset occurrences / unique | Asset marginal JSON B | Internal raw duplication |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ALGEBRA_PHASE5_REPRESENTATIVE_TEST | 5503 | 3952 | 7402 | 323 | 0/2452 | 0/0 | 0 | N/A |
| INFORMATICS_PHASE6_REPRESENTATIVE_TEST | 16785 | 10635 | 20012 | 321 | 0/5804 | 0/0 | 0 | N/A |
| TIN6_T04_P04_SGK_RC3_PED1 | 291676 | 1856946 | 3696714 | 5956 | 0/42026 | 14/2 | 1779624 | 7.018776x |
| TIN6_T05_P05_SGK_RC3_PED1 | 496796 | 2020067 | 4025244 | 7968 | 0/37940 | 16/5 | 1952728 | 3.587059x |
| TIN8_T04_P04_SGK_RC3_PED1 | 111827 | 313281 | 612372 | 8506 | 0/34313 | 6/1 | 252336 | 6.000000x |
| HINH8_T04_T07_B12_M2_V03 | 717876 | 1441998 | 2878850 | 239 | 0/12042 | 18/15 | 1425576 | 1.261792x |
| HINH8_T04_T07_DUAL_VISUAL_TEST_V045 | 717920 | 1442845 | 2880344 | 261 | 0/12563 | 18/15 | 1425576 | 1.261792x |

Value UTF8 tổng 7 package = 7,089,724 B. Asset marginal JSON = 6,835,840 B (96.42%). Snapshot toàn bộ keys+values = 7,064,823 JS UTF16 code units; UTF8 bytes=7,094,262; UTF16 approximate bytes=14,129,646. UTF16 approx =2×JS string length; đây không phải browser quota accounting hay disk allocation.

Top-level metadata gồm các field top-level ngoài screens, có thể chứa author maps/contracts; không phải compact library metadata. HTML/plain đo string leaves ngoài dataURI; fixtures này HTML-like leaves=0, plain strings vẫn có cấu trúc/phương trình. Các metric metadata/text/JSON có overlap, không cộng thành partition. Asset marginal tính JSON trừ JSON cùng cấu trúc với dataURI thay null, đo phần encoded tăng thêm chính xác. PACKAGE_MEASUREMENTS.json có path/mime/SHA/binary bytes từng occurrence và archive entry sizes.

### ZIP / media / other assets

- TIN6_T04_P04_SGK_RC3_PED1: ZIP 291,676 B; extracted JSON 101,076 B; images 190,134 B; media 0 B; other 0 B. Stored JSON/source ZIP = 6.366x.
- TIN6_T05_P05_SGK_RC3_PED1: ZIP 496,796 B; extracted JSON 87,721 B; images 408,213 B; media 0 B; other 0 B. Stored JSON/source ZIP = 4.066x.
- TIN8_T04_P04_SGK_RC3_PED1: ZIP 111,827 B; extracted JSON 79,950 B; images 31,527 B; media 0 B; other 0 B. Stored JSON/source ZIP = 2.801x.
- HINH8_T04_T07_B12_M2_V03: ZIP 717,876 B; extracted JSON 19,227 B; images 847,124 B; media 0 B; other 0 B. Stored JSON/source ZIP = 2.009x.
- HINH8_T04_T07_DUAL_VISUAL_TEST_V045: ZIP 717,920 B; extracted JSON 20,261 B; images 847,124 B; media 0 B; other 0 B. Stored JSON/source ZIP = 2.010x.

Không lưu nguyên ZIP vào localStorage. ZIP bytes và extracted maps chỉ trong import staging; source zip.js inlines referenced image assets thành imageData/geometryImageData trên màn hình. JSON và referenced paths giữ trong payload; unreferenced extras không thành key lưu. Trong 7 fixtures: 72 dataURI occurrence đều ảnh; không có embedded video/audio binary. Informatics representative chứa local/static media references, storedBinaryBytes=0 cho references. Không được kết luận video của mọi package đều nhẹ; số liệu chỉ thuộc fixtures này.

## Duplication

Decoded asset occurrences=5,125,742 B; globally unique decoded images=1,476,998 B; raw duplication=3.470378x (nội bộ và giữa bài). Internal worst measured 7.018776x. geometry imageData và geometryImageData thường chứa cùng ảnh; nhiều screens lặp cùng ảnh. Base64 text/binary ~1.33333x (padding/prefix thêm overhead); UTF16 approximation ~2.66667x binary trước duplication. Đây là cơ chế source-confirmed giải thích dung lượng lớn; không chứng minh một ảnh cụ thể gây lỗi trên máy GV.

Import cùng source/canonical id lần nữa không tăng key/count (diagnostic PASS); code overwrites same key. Identity conflicts có suffix nguồn, nên khác bài có thể giữ ảnh giống nhau. Recent=1,107 B; library=1,285 B; current state=975 B và không dataURI: không chứa bản full package thứ hai. TV write peer reply cùng origin vào cùng lesson key, không tạo key thứ hai nhưng rewrite full JSON. Teacher/TV cũng giữ bản RAM riêng; RAM copies không tính localStorage duplication. Khác port/origin có kho độc lập, không tự chuyển dữ liệu giữa origins.

## Quota path / guard

Import → native ZIP CRC/size/path decode hoặc JSON parse → inline image assets → Loader subject/package/profile/asset validation → staged pending → commit snapshot → zip.js saveLesson → setItem('lesson:'+id, JSON.stringify(x)) → setItem('webLiveLibrary', JSON.stringify(lib)) → native start → sync → optional Recent.

Diagnostic exact failure: subject-loader.js:288 → zip.js:51:15 → setItem('lesson:TIN6_T04_P04_SGK_RC3_PED1', 1,848,357 JS code units) → injected QuotaExceededError. WRITE_TRACE.json chứng minh guard/toast, currentLessonPreserved=true, allRAMValuesPreserved=true. Native runtime chưa start bài mới khi essential write thất bại. Toast đúng GV báo được chụp trong QUOTA_GUARD_DIAGNOSTIC_RAM_ONLY.png.

Windows failed operation/key = UNKNOWN. Hai essential writes lesson:<id> hoặc webLiveLibrary đều có thể throw; không suy đoán key thứ nhất là Windows confirmed. Optional Recent lỗi được warn sau load thành công, tách khỏi essential transaction. common.js sync storage errors caught; không suy ra failure này là toast original. Guard rollback có warning riêng nếu rollback cũng thất bại: không được nâng PASS một-case thành bảo đảm mọi concurrent/rollback-failure case.

## Design conclusion / approval dependencies

IndexedDB phù hợp hơn cho structured payload/Blobs và async library, vẫn có quota/disk/eviction constraints. Recommended: Loader sở hữu adapter, IDB persistent lesson+asset data; localStorage small prefs/refs/coordination; exact image dataURI hydrate in RAM để giữ profile contract. Frozen TV direct reads/backwrites và accepted-session startup khiến migration+cleanup hoàn chỉnh cần Core storage bridge/bootstrap nhỏ. PROFILE_CHANGE_REQUIRED=NO đối với initial proposal; CORE_CHANGE_REQUIRED=YES (chỉ báo cáo).

COPY→VERIFY→COMMIT→CLEANUP được thiết kế ở báo cáo riêng. Không thể có atomic transaction chung localStorage+IDB: khi cleanup đã remove một số old keys thì cleanup thất bại không thể bảo đảm mọi old key vẫn tồn tại. Thiết kế đề xuất gate cleanup riêng sau khi GV phê duyệt contract an toàn; nếu GV giữ nguyên absolute all-old-remains tại mọi failure, cleanup phải giữ disabled. Đây là quyết định cần phê duyệt trước P12.2B, không phải exception tự cấp.

P12_2A_STATUS=COMPLETE_AUDIT_DESIGN_ONLY / AWAITING_P12_2B_APPROVAL. Không claim migration tested/implemented, capacity fixed, physical pass, Production ready. Environment draft unchanged revision12; không Save/Publish và không cần thêm cài đặt. Các báo cáo còn lại mô tả inventory, adapter/schema, recovery, tests và risks. STOP.
