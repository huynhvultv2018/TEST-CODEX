# ALGEBRA_PHASE5_IMPLEMENTATION_REPORT

Algebra Profile đã được triển khai và qua targeted/global regression theo phê duyệt `AUTHORIZE_PHASE5.txt`. Không cần thay Core. Geometry Phase4 đã được đóng băng và không sửa. Candidate mới được tạo sau gate PASS; fresh ZIP smoke cũng PASS.

## Geometry freeze và trạng thái giữ nguyên

`WEB_LIVE_GEOMETRY_PHASE4_CANDIDATE`, SHA256 `9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e`, technical PASS, status FROZEN. 1.227 file nguồn trùng ZIP và manifest trước/sau. Không Production.

G4-F01 TARGETED_PASS; G4-F02 OPEN_DEFERRED P3; G4-F03 FIXED/targeted PASS; G4-F04 OPEN_DEFERRED P3; G4-F05 VALIDATION_PENDING. REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL=UNRUN. Không chuyển waiver/pending/deferred thành PASS, không yêu cầu transfer các real files được waive.

## Kiến trúc/phạm vi

Sử dụng Core/Profile hiện tại. `WEB_LIVE/tv-layout-algebra.js` giữ nguyên byte phần `TVAlgebraEngine` cũ rồi thêm adapter `WebLiveProfiles.registerAdapter('algebra', {presentation})` và lifecycle cleanup. Không dựng engine độc lập/solver/state controller; không sửa HTML để nối script. Native Teacher controls và iframe preview vẫn là giao diện điều khiển.

Working copy riêng: `working/WEB_LIVE_ALGEBRA_PHASE5_WORKING_COPY`. Payload mới 1.233 file: khác đúng một file Algebra-owned; 1.226 file cũ nguyên byte; thêm đúng sáu file được liệt kê trong SOURCE_SCOPE.json. Core registry, importer, state/sync/navigation/disclosure, shared CSS/math, Geometry JS/CSS/contract/fixtures, Informatics stub, launcher không sửa. Existing Legacy layout code trong file Algebra giữ nguyên prefix và behavior được kiểm bằng paired regression.

Thêm Algebra CSS scoped `.algebraProfile`, local MathJax 3.2.2 `tex-svg-full.js`/Apache-2.0 LICENSE/package metadata, test-only JSON và README. MathJax npm tarball integrity SHA512 được xác minh trước khi lấy selected files; provenance trong ALGEBRA_PATCH_PROVENANCE.json/MATHJAX_PACKAGE_METADATA.json. Không thay dependency/lockfile cũ, không CDN hoặc remote font.

Actual runtime implementation status là `WebLiveAlgebra.status=IMPLEMENTED`. Core descriptor Phase2 vẫn có `REGISTERED_STUB`; đó là scaffold metadata cố định, không gate dispatch. Không sửa Core chỉ để đổi label này; contract giải thích rõ cách xác định implementation.

## Behavior

- MathJax SVG dựng phân số tử/bar/mẫu, lũy thừa, căn, đa thức/biểu thức, phương trình, bất phương trình và hệ hai hàng có ngoặc. Chỉ convert authored TeX delimited; không suy luận công thức/phương pháp từ prose.
- Native steps quyết định reveal. Read-only state phân biệt UNREVEALED/REVEALED, CURRENT/COMPLETED. Future proof và supporting metadata không mount vào DOM. Native Previous Step/Hide Answer tiếp tục hoạt động.
- Current/selected step được nhấn mạnh; các bước đã mở vẫn nhìn thấy và giảm nhấn mạnh. Focus không đổi reveal/source/hint/answer/navigation/board/figure state. XÓA TẬP TRUNG phục hồi presentation theo reveal state.
- Optional metadata `original/reason/result` đi cùng native step đã mở. Equation và reason có thể đặt cạnh nhau trong cùng full-width step row; không mất source text. Arrows không lấy thêm chiều cao mỗi row. MCQ vẫn bốn hàng độc lập full-width và instruction riêng.
- Student/correct comparison chỉ từ dữ liệu được cung cấp và chỉ hiện sau reveal step liên quan. Không tự tạo lỗi học sinh. Hint/answer obey native control và native priority; hint bị che không có trong TV DOM.
- Tám stage labels là optional authored metadata; không ép mọi lesson đủ chuỗi và không tạo màn hình/nội dung.
- Async MathJax jobs được guard theo profile/activation/source/index/version/epoch/connected nodes. Switching profile dọn owned context/markers; stale jobs không chèn nội dung vào màn hình mới.

## Validation và candidate

Targeted 20 checks PASS; 30 question viewport cases + 12 full-answer cases ở 1920×1080/1366×768/1280×720; eight captured states. Eight lifecycle/race cases PASS. Global Legacy/Geometry/Informatics PASS against frozen Phase4. Fresh ZIP: 53 served assets byte-identical, eight smoke checks PASS, four-step full answer fits 1280×720.

Hai lỗi P2 trong quá trình phát triển (visible duplicate assistive MathML; Algebra layout overflow) đã FIXED và retest PASS; failure evidence giữ trong HARNESS_HISTORY. Xem risk register để phân biệt finding đã đóng, Geometry findings kế thừa và coverage chưa chạy. Các bộ đếm P0–P3 trong final block đếm **finding Phase5 còn mở**: đều 0.

Candidate `WEB_LIVE_ALGEBRA_PHASE5_CANDIDATE.zip`: 50,064,903 bytes, 1.233 files, CRC PASS, payload bằng working manifest. SHA256 `575b466dc839d54c6ad91327bc5a7454ece42cbacfd69ae916eca4aa1bcaf01d`. Không overwrite Geometry/Phase3 candidate.

Các báo cáo/checksums Phase3/4 kế thừa **trong payload** là lịch sử. Release Phase5 dùng các báo cáo, PHASE5_PAYLOAD_MANIFEST.json, PACKAGE_IDENTITY.json và CHECKSUMS_SHA256.txt **ngoài ZIP**. Fixture mới chỉ 5.503 bytes/10 screens, không phải SGK/source sư phạm; chưa xác nhận lesson/classroom thật hoặc native Windows/physical TV/audible TTS.

Cloud startup draft đã lưu, chỉ cập nhật instructions; install/network/secrets/repositories giữ nguyên. Review/save trong Environment Settings rồi Publish để áp dụng. Fresh-task restoration chưa được kiểm chứng.

## Final block

```text
GEOMETRY_PHASE4_CANDIDATE = WEB_LIVE_GEOMETRY_PHASE4_CANDIDATE (FROZEN)
GEOMETRY_PHASE4_SHA256 = 9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e
GEOMETRY_PHASE4_MUTATED = NO

ALGEBRA_PROFILE = IMPLEMENTED

MATHJAX_RENDERING = PASS
FRACTION_RENDERING = PASS
EXPRESSION_RENDERING = PASS
EQUATION_RENDERING = PASS
SYSTEM_RENDERING = PASS

STEP_REVEAL = PASS
STEP_HIGHLIGHT = PASS
ALGEBRA_FOCUS = PASS
ERROR_COMPARISON = PASS
HINT_CONTROL = PASS
ANSWER_CONTROL = PASS
NO_TEACH_AHEAD = PASS

CORE_CHANGE_REQUIRED = NO
WEB_LIVE_CORE_MUTATED = NO

LEGACY_RUNTIME_REGRESSION = PASS
GEOMETRY_PROFILE_REGRESSION = PASS
INFORMATICS_PROFILE_ISOLATION = PASS

P0_COUNT = 0
P1_COUNT = 0
P2_COUNT = 0
P3_COUNT = 0

SOURCE_SCOPE_VIOLATION = NO
PRODUCTION_MODIFIED = NO

PHASE5_CANDIDATE = WEB_LIVE_ALGEBRA_PHASE5_CANDIDATE
PHASE5_CANDIDATE_SHA256 = 575b466dc839d54c6ad91327bc5a7454ece42cbacfd69ae916eca4aa1bcaf01d

PHASE5_STATUS = PASS
RECOMMENDED_NEXT_PHASE = WAIT_FOR_GV_APPROVAL
```

STOP — chờ GV review. Không Production, không bắt đầu Informatics Profile.
