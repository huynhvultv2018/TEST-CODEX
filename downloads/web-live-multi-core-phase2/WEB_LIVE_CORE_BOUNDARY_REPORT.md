# Core boundary

**CORE_BOUNDARY_STATUS = PASS (PARTIAL, MINIMAL PATCH)**. Core hiện tại được giữ tại chỗ; boundary mới là resolver và giao diện lifecycle quan sát runtime. Không di chuyển engine/controller hoặc tách lại cấu trúc thư mục.

| Trách nhiệm | Source giữ nguyên tại chỗ | Dependency chưa tách |
|---|---|---|
| ZIP load/library/schema/cache | zip.js, teacher.js | Browser storage, image embedding, DOM importer |
| Navigation/disclosure/reset | teacher.js, pedagogy-teacher.js | Globals lesson/index, controllers, render/sync |
| State/transport | common.js, teacher.js, tv.js | Channel/key, activation/version/source guards, popup/Preview/localStorage |
| Teacher controls/focus/fullscreen/keyboard | teacher.js, cockpit.js, classroom-teacher.js, ui-teacher.js | DOM IDs, existing controller instances |
| TV rendering/fitting | tv.js, tv-layout*.js, tv-content.js | Existing DOM, geometry resource resolver, disclosure helpers |
| Images/scenes/overlays | common.js, drawing/cover/smart modules | Shared scene keys and persistent storage scopes |
| Animation/timer | existing CSS, Classroom clock, TV rAF | Layout measurements, clock state |
| TTS/Demo | tts*.js, demo-teacher.js, Launcher | Disclosed DOM registry; native API/Win32 access |
| New profile boundary | core-profiles.js | Scalars only from existing runtime; presentation mode adapter |

`teacher.render()` gọi `observe('teacher', fullLesson, scalarState)` sau reset/navigation hiện hành. `tv.applyState()` chỉ gọi observe khi đã lấy được màn hình từ full cached lesson; không resolve từ lightweight state.lesson. Callback rAF cũ vẫn fit và refresh TTS, sau đó gọi hook nếu identity/version còn khớp. Lesson switch dispatch dispose cho profile trước rồi load profile mới; đổi index dispatch step; repaint cùng index không tái phát load/step.

Hook context không chứa lesson/screen mutable, DOM node, đáp án, ghi chú riêng, board model hay token Launcher. Profile không ghi storage và không mở rộng wire state. Extension có thể dùng global browser API của cùng trang; đây là isolation của dispatch, không phải capability/security sandbox.

Ba existing presentation engines vẫn được load theo script chain cũ. Profile stub chọn đúng mode adapter; branch điều phối không chạy renderer của profile khác. Controllers hình học dùng chung vẫn khởi tạo theo baseline trong mọi session; chưa coi chúng là profile feature hoặc khai báo full engine isolation. Hook subscribers chỉ thuộc profile được chọn, được thử ở Teacher/TV/Preview.

Lý do giữ tại chỗ: các component dùng shared globals, scene/storage identity và DOM. Di chuyển trước khi có adapter riêng sẽ tăng phạm vi và rủi ro regression. Phase 3 có thể subscribe Geometry lifecycle nhưng cần thiết kế feature riêng và test riêng sau phê duyệt; Phase 2 chưa triển khai feature đó.

Bằng chứng: `RUNTIME_PATCH.diff`, `source-integrity.json`, `profile-contract.json`, `profile-runtime.json`, `paired-comparison.json`.
