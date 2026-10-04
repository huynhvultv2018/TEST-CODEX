# INFORMATICS_PROFILE_CONTRACT

## Selection, roles và ownership

Explicit lesson `subject_engine: "informatics"` chọn adapter; không suy ra từ tên môn/text. Missing/unknown/invalid giữ Legacy fallback của Core. Core schema/state/registry unchanged. REGISTERED_STUB trong immutable Core là scaffold metadata; actual API `WebLiveInformatics.status`, registered adapter và getState xác định implementation. Adapter chỉ presentation cho TV/native preview. Teacher parent controls chỉ mount bởi preview iframe same origin và dispose khi rời Informatics; Teacher source/answer panels nguyên native, luôn teacher-only.

SOẠN_TRƯỚC là source of truth; lesson JSON được import bằng native importer. Profile đọc nguồn, không mutate lesson/storage payload/Core state, không rewrite lesson/knowledge/pedagogy/code hoặc tự thực thi thao tác/phần mềm. Fixture synthetic không phải SGK hoặc acceptance SOẠN_TRƯỚC thật.

## Native disclosure và metadata tùy chọn

Screen.steps giữ array string; answer/conclusion/hint/teacherNote vẫn native. Profile bổ sung screen.informatics:

- stage: optional one of CURIOSITY, OBSERVE, THINK, PREDICT, DISCUSS, DISCOVER, STANDARDIZE, CHECK, APPLY. Không biết/thiếu stage không tạo chuỗi hay knowledge.
- blocks: optional array of source-authored records. kind: TASK, INSTRUCTION, STUDENT_ACTION, STUDENT_RESPONSE, EXPECTED_PRODUCT, STUDENT_PRODUCT, CHECKPOINT, RESULT, SELF_CHECK, DEMO, SCREEN_REFERENCE, RESOURCE, CONCLUSION, CODE, ALGORITHM, TABLE, MEDIA, PRODUCT_COMPARISON.
- Mỗi block bắt buộc explicit afterStep integer 0..native total. 0 là nguồn chủ động cho phép hiện ở QUESTION; >0 chỉ mount khi native disclosed count đạt. Missing/string/negative/out-of-range gate bị bỏ qua fail closed. Metadata không tạo native steps hoặc thay step count. Không đánh giá câu trả lời học sinh tự động.
- Optional focusStep integer1..total ánh xạ native answer step. Selected Focus hợp lệ ưu tiên; nếu không thì current native disclosure step. Block hiện tại mạnh, trước đã reveal dim, tương lai chưa mount. Task nguồn chính còn hỗ trợ native content Focus index0.
- HINT/ANSWER/SAMPLE_PRODUCT/TEACHER_NOTE không được nhét vào ordinary block kinds: bị từ chối. Hint/answer dùng native controls; sample có policy riêng; teacher notes không mount student DOM. Nguồn không được đặt kiến thức bí mật trong screen.content/options/blocks afterStep0; renderer tuân theo dữ liệu, không tự phân loại nội dung sư phạm.

Count: hidden=0; steps=bounded answerStep; full=native total. DTO getState chỉ chứa context scalars, count/total, source stage, checkpoint/sample booleans, per-step REVEALED/UNREVEALED và CURRENT/COMPLETED/UNREVEALED flags; không chứa source text của bước tương lai. Full Answer được phép reveal toàn bộ native answers theo quyết định GV; sample vẫn độc lập.

## Code, algorithm, table, media

CODE block: lines:[{text:string,afterStep:integer}], highlightLinesByStep:{"1":[1],"2":[2]} dùng 1-based original line numbers; only disclosed authored lines mount. TextContent giữ newline giữa dòng đã cung cấp, spaces/tabs/indentation trong từng text nguyên byte; không syntax rewrite/solver/execute. Noncontiguous gates giữ original line identity, không tự chèn hidden text. Current/valid earlier Focus chọn authored line map; invalid future Focus bị bỏ qua. Long unavoidable source code giữ scrolling trong code wrapper, không clip hoặc character-wrap; representative code fit TV.

ALGORITHM block: items:[{kind:INPUT|PROCESS|OUTPUT|SEQUENCE|BRANCH|LOOP,text,afterStep,focusStep?}]. Explicit authored gates áp dụng từng item; focusStep link tùy chọn, không tự suy ra thuật toán hoặc branch/loop outcome. Layout là các hàng dễ đọc, không flowchart tự sinh.

TABLE block: headers:string[], rows:string[][] với mỗi row cùng độ dài headers. Semantic table/th scope=col/tbody/td, cells giữ nguồn. Shape invalid được bỏ qua và ghi diagnostic; không flatten/rewrite/clip. Trường hợp nguồn quá rộng dùng local wrapper scroll; fixture không overflow ngang.

MEDIA block: type IMAGE|VIDEO|ANIMATION|SCREENSHOT|DIAGRAM, src, alt?, caption?. Src local same-origin .png/.jpg/.jpeg/.gif/.svg/.webp hoặc .webm/.mp4 cho video; data image PNG/JPEG/GIF/WebP/SVG được hỗ trợ. Remote/executable/protocol khác/URL credentials bị từ chối. Relative src tính từ WEB_LIVE; không resolve file OS hoặc launch exe. Video có controls, preload metadata, playsInline, autoplay=false; animation dùng image asset như GIF. Giữ object-fit contain/aspect ratio; height bounded khi step disclosure. Codec ngoài WebM VP9 fixture chưa certify. Native refresh/re-render video có thể reset playback; không đồng bộ media transport state mới vào Core.

## Products và independent control

EXPECTED_PRODUCT/STUDENT_PRODUCT là supplied read-only text snapshots, subject to authored gate. Không tự capture/upload/grade file học sinh.

sampleProduct:{text:string,checkpointStep:integer1..native total}. Checkpoint không hợp lệ/không có sample text thì hidden và không tạo reveal button. Cần native checkpointStep đạt → GV XÁC NHẬN CHECKPOINT → GV HIỆN SẢN PHẨM MẪU. Confirmation không tự reveal; hint/answer/Focus không reveal. PRODUCT_COMPARISON chỉ hiện khi afterStep đạt VÀ sample đã explicit reveal. Nút ẨN removes sample+comparison DOM. Hide/below-checkpoint resets both booleans; same-activation TV reload khôi phục only authorized reveal; new import activation resets.

Profile-local context key gồm lessonActivation, lessonSourceKey, native index; localStorage lưu only checkpoint/sample booleans, BroadcastChannel/storage events notify refresh only. Không chèn fields vào Core state, không bắt Core xử lý protocol mới, không duplicate navigation/controller. Stale teacher buttons kiểm lại current key/count/checkpoint. Same-origin storage availability là runtime prerequisite; unsupported storage báo diagnostic và sample không được falsely PASS.

teacherNote/demoNote/teacherControl là source-authored Teacher-only text; không chuyển sang student content hoặc sample/answer state. Parent source panels remain native privileged interface. Đây là chống pedagogical leak trên TV/Preview, không bảo mật trước người có quyền xem source JSON hoặc same-origin DevTools.

## Focus, fallback và validation

Native answer Focus links code/algorithm/instruction/checkpoint; native content Focus emphasizes task. Previous disclosed proof remains visible/dim; current focus strong; future absent. Clear Focus không đổi native answer mode/count/source/layout/scene/zoom/pan/pointer/board/hint. Picking mode toggle semantics nguyên baseline. Dispose xóa own markers/panel/context; CSS selectors scoped Informatics; retained stylesheet/listener cannot alter inactive Legacy/Geometry/Algebra DOM.

Chỉ tự báo diagnostics bounded; malformed optional records fail closed, không crash. Không sửa Core để sửa dữ liệu hoặc đổi historical descriptor. Core need → STOP before patch, báo policy fields và chờ GV.
