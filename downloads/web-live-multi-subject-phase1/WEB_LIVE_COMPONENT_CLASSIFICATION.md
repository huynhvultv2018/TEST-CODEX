# WEB LIVE — phân loại component theo hành vi

Baseline `TV_VERTICAL_MCQ_CANDIDATE`; ZIP SHA-256 `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`. [Runtime inventory](evidence/RUNTIME_SOURCE_INVENTORY.json) có hash/dòng cho 53 tệp. A/B dưới đây là **trách nhiệm hiện tại**, không có nghĩa đã trích module. Một tệp mixed được tách theo symbol/trách nhiệm, không buộc một nhãn cho toàn tệp.

```text
A = CORE_SHARED
B = SUBJECT_SPECIFIC (informatics / algebra / geometry)
C = LEGACY (không tham gia đường runtime chính đã xác minh)
D = UNKNOWN (không đủ bằng chứng về semantics/acceptance)
```

## A — CORE_SHARED

| Component / source | Lý do từ source và runtime | Dependency cần giữ |
|---|---|---|
| Entry `WEB_LIVE/index.html`, shell Teacher/TV | Một cặp screen dùng cho tất cả package; redirect + preview iframe + actual TV | Script order, DOM IDs; phần tool Hình trong shell là B mixed |
| `teacher.js` lifecycle/navigation/import/state/sync | Import ZIP thật, index controls, activation/version/source, peer recovery | common/zip/pedagogy/DOM/tools; sample Hình và image interaction là B |
| `common.js:1–6` transport/escaping/state | Cùng channel và key cho Tin/Hình/fixtures/legacy | BroadcastChannel, localStorage, postMessage |
| `common.js:99–135` text normalization, linear steps/disclosure | Không tính đáp án; preserve text, slice supplied sequence | Source string + answer mode/count; semantics phân tích Hình có thể chuyển policy B |
| `zip.js` toàn bộ | Format loader/asset resolution/library/collision dùng chung | Browser DecompressionStream, File API, localStorage; không tạo bài |
| `tv.js` receive/applyState/step cards/presence | Một state pipeline cho preview và TV; old-state guard | common, Classroom, TVLayout, engine model, overlay viewers, TTSPresentation; scene/view logic mixed B |
| `TVLayout.fit/textProfile` + shared chrome/layout regions | Chọn font/region chung; MCQ vertical giữ cùng layout giữa môn | CSS, semantic blocks, viewport; geometry fit/ratio/resourceTrace là B mixed |
| `TVMultiEngine.model/apply` shell + registry dispatcher | Thực tế gọi đúng engine trên cùng stage, MCQ chung | resolver + engines + TVContent + Classroom; field/type parsers từng môn là B |
| `TVContent.options/explicitOptions/knowledge/mcq/close/focus` | Parser MCQ chung A–E, instruction sibling, close cards; source giữ nguyên | Classroom.parts/source mapping/DOM + state disclosure |
| `Classroom.parts/focusText/step/elapsed/clockText` | Focus index và timer dùng tất cả text/steps | math-atomic + state; `draw` highlight Hình là B |
| `ClassroomTeacher` focus/font/clock, capability-independent layout control primitive | Common controls; đặt policy/capability cho surface có ảnh | teacher globals/DOM; tool/highlight/scene/lock coupling là B |
| `ui-teacher.js`, `cockpit.js` layout/fullscreen/presence/preview fit | One cockpit, iframe resize, status, system controls | Teacher commands, Mutation/ResizeObserver; `cockpit.decision` policy Tin/Proof là mixed B |
| `math-atomic.js` | Safe relation typography ở Teacher/TV, không giải toán | DOM text, CSS nowrap; vocab ưu tiên Toán nhưng utility chia sẻ được |
| `tts-controller.js`, `tts-presentation.js`, `tts-teacher.js`, `tts-tv.js` | Một speech owner ở Teacher, visible blocks và context toàn hệ thống | Web Speech/native voices, storage lease, renderer block contract |
| `math-speech.js` transport-independent speech preprocessing | Conversion dùng chung cho source có biểu thức; không tác động hiển thị | TTS pipeline; dictionary Hình/Algebra có thể là B codec hooks, không clone controller |
| DrawBoard primitives/model history/coordinate mapping/render | Whiteboard + marker/label/undo cho mọi môn; runtime tested | SVG + localStorage; overlay scene scope/reference Hình là B |
| CoverLayer generic mask primitive/history | Có thể dùng chung để che resource do GV chọn | SVG/storage; scene coupling và hiện chỉ bật cho resolved geometry là B |
| `demo-teacher.js` request/auth/explicit launch/return | Bridge ứng dụng dùng chung Word/GeoGebra; không chỉ riêng Tin | runtime-config, API 47381, allowed origins; profile chỉ cung cấp metadata hợp lệ |
| `runtime-config.js` | Config pairing cài đặt, không nội dung môn | Phải tương ứng launcher-config; không tiết lộ giá trị trong báo cáo |
| `style.css`, `teacher-ui.css`, `tts-ui.css`, `tts-highlight.css`, `cockpit.css` common shell styles | Trực tiếp load trong entry hiện hành; cascade active | CSS class/DOM + load order; annotation selectors mixed B |
| `tv-ui.css`, `cognitive-tv.css`, `classroom.css`, `draw-board.css` common portions | Chrome, card, semantic/MCQ/focus/whiteboard/transition dùng chung | Đang global CSS; selectors Hình/Algebra/Tin là B, không coi cả file là A |
| `START_WEB_LIVE.bat`; `LAUNCHER/start_web_live.py`, `web_live_http.py` | One installation/server/browser startup, không đọc nội dung môn | Python, Windows, ports, package path fingerprint |
| `LAUNCHER/START_LAUNCHER.bat`, `BUILD_WINDOWS_EXE.bat` | Auxiliary native start/build, không phải subject engine | Python/PyInstaller; build EXE chưa chạy |
| `WebLiveLauncher.py` Pairing/handler/app whitelist/service | Native app transport/control có thể phục vụ các profile chung | Windows desktop bridge, installation/app/display config, demos; không copy theo môn |
| `windows_handoff.py` | Monitor/window move/minimize, không sư phạm Hình | Win32 ctypes; đọc source, native acceptance UNRUN |

## B — SUBJECT_SPECIFIC và dependency cụ thể

| Môn | Trách nhiệm hiện có | Dependency | Ranh giới đề xuất |
|---|---|---|---|
| Geometry | `common.js:9–97`: legacySceneKey/isAnalysisScreen/sceneKeyForScreen/visualRole/rebuildSceneIndex | lesson/screens/metadata/asset naming; Teacher/TV/DrawBoard scope đều dùng | Geometry visual policy qua scene lifecycle service chung; legacy adapter giữ heuristic |
| Geometry | `TVGeometryEngine.render`, GT/KL group, proof dependency branches | disclosed model.bodyBlocks, analysisStep nodes, semantic UI helpers | GEOMETRY_PROFILE renderer |
| Geometry | `SmartGeometry` và Teacher/TV wrappers; `smart-geometry.css` | DrawBoard objects/anchors/scope, SVG, teacher globals/state/snapshots | Geometry tools; dependency geometry → common annotation primitives |
| Geometry | Classroom highlight point/segment/triangle; Teacher pickGeometry/setTool/scene; geometry ratio/fit | normalized coords, DrawBoard.at, resolved geometry, interaction locks, state.classroom | Geometry highlight/control hooks; core chỉ cung cấp input/layout primitives |
| Geometry | Zoom/pan/pointer, figure inheritance, overlay versions; DrawBoard overlay scope, Cover scope | currentImage/common scene + figureInner + screen reset | Geometry context/view policy; shared viewport renderer nhận descriptor |
| Geometry | `teacher.js:5–6,25` sample bài Hình | Inline SVG và lesson literal | Sample asset/profile example; đang **active** khi GV bấm, không LEGACY |
| Algebra | `TVAlgebraEngine.kind/table/render` | activityType, source/bodyBlocks/mathBlocks, resolvedImage, disclosed steps, renderStepCards | ALGEBRA_PROFILE; table primitive có thể share, math activity parsing riêng |
| Algebra | `TVContent.prose/tokens/mathText/inline/polish` phần mode Algebra | Bounded lexical parser + CSS math chunk + semantic roles/focus/TTS | Algebra codec; MCQ structure vẫn CORE |
| Algebra | SYSTEM/EXPRESSION/IDENTITY/FACTORIZATION/word-problem selectors | subject dataset + parsed model | Algebra-scoped styles; không solver |
| Informatics | `TVComputerEngine.render` APPLICATION/instruction | supplied bodyBlocks/instruction/options + UI helpers | INFORMATICS_PROFILE |
| Informatics | `livePedagogyEnabled/Stage/IsClose/Hint` RC3 Tin contract và activity mappings | preparedContract, pedagogy metadata, Teacher commands, TVLayout kinds | Profile policy đọc metadata; common disclosure actuator giữ một bản |
| Informatics | `PedagogyTeacher.render` flow/source/resource/online guidance; `TVLayout.contextResource/primaryTask/infoContext/hierarchy` dùng SGK trace/activity | supplied metadata + prior assets + Classroom focus + DOM | Subject policy/planner, shared resource/card renderer |
| Informatics / Geometry | `cockpit.decision`, `liveUIStage` label/pedagogic ordering | hint/analysis/proof count, subject mode, close gate | Profile action/stage proposal; core không tự chọn/bấm thay GV |
| Cả ba môn | `resolveSubjectLayout` label/type/title rules; `TVMultiEngine` body labels/activity labels | Current lesson+screen metadata | Common resolver + profile registration; heuristics chỉ trong compatibility adapter |

Dependency trọng yếu là **shared module đang gọi subject semantics**, không chỉ subject module gọi CORE: common scene → Hình; Teacher → tools/Hình; pedagogy → Tin/Hình; TV fit/CSS → Hình/Algebra. Đó là lý do không thể đổi tên thư mục rồi kết luận isolation đã đạt.

Các năng lực persistent_geometry, analysis_diagram, proof_flow, geometry annotations đã có nền tảng source/runtime; semantic highlights theo ID/step mapping còn thiếu. Algebra có presentation steps và Unicode math nhưng không MathJax/solver/error comparison. Informatics có activity/DEMO/task/application nhưng chưa structured code/algorithm renderer hay web editor. Xem design để phân biệt kế thừa và bổ sung.

## C — LEGACY

`tv.js:33–51` giữ đường fitText cũ sau guard ở dòng 32. Trên entry hiện hành, `TVLayout.apply → studentUi` đặt `rc4` và multi-engine ghi tiếp marker; các màn audit đi qua `TVLayout.fit` rồi return. Vì vậy nhánh fit cũ không tham gia đường render chính đã kiểm. Giữ code; chưa xóa hay sửa. Nếu entry/custom embed không chuẩn sử dụng đoạn này, mức compatibility đó chưa được kiểm và cần đưa vào D/fixture bổ sung.

**Không có tệp JS runtime nào được chứng minh toàn bộ là dead code.** Các helper fallback vẫn có thể active theo điều kiện. Các CSS đời trước vẫn load và có selector còn hiệu lực; không phân loại C chỉ từ comment version. `getLesson` của zip.js nằm Teacher, TV có hàm riêng và không load zip.js: đây là hai context khác nhau, không phải hàm dead hoặc “ba engine duplicate”.

Các thư mục `HOTFIX_R1/R2_*`, `TV_MATH_TYPOGRAPHY_*`, `TV_MULTI_ENGINE_*`, `TTS_UI_*`, `CHROME_START_*`, `RC2_TESTS`, `RC3/RC4/TV_LAYOUT_REPORTS`, `HISTORICAL_MATH_PARENT_REPORTS` là test/evidence/docs lịch sử; HTML/BAT/Python entry không nạp chúng. Chúng là artifact tham khảo, không gán nhãn “LEGACY runtime” cho toàn bộ. Test vertical hiện hành cũng không được app entry tự chạy. Không xóa.

## D — UNKNOWN

| Thành phần / nghĩa cần xác minh | Bằng chứng hiện có | Điều chưa kết luận |
|---|---|---|
| MathJax/general animation/player integration | Code search + runtime undefined/no players | Không có implementation để phân loại; capability gap, không “module ẩn” |
| Native app/Win32/physical TV/TTS audio | Source + assets; Linux 0 voices | Acceptance hoạt động thực tế trên máy GV chưa được xác minh |
| Package Algebra thực tế | Chỉ có fixtures trong các tests | Compatibility SGK/lesson production Algebra UNKNOWN |
| Metadata authoring gates `lessonOpeningGate/noPreteachCheck/sgkKnowledgeMap/sgkStructureLock` | Có trong Tin JSON, không thấy runtime consumer | Không biết nghĩa ngoài workflow SOẠN_TRƯỚC; preserve, không tạo logic LIVE |
| Lesson formats ngoài 6 ZIP được cung cấp / unknown field consumers bên ngoài | Validator chỉ tối thiểu, không source ngoài baseline | Không mở rộng lời khẳng định “mọi bài cũ PASS” |
| Custom entry/embedding/old fit path | Source còn nhánh legacy, entry chuẩn bypass | Reachability/compatibility ngoài entry audit cần fixture |

Phân loại D không phải lệnh tìm/sửa module bên ngoài. Phase 1 giữ source duy nhất do người dùng cung cấp.
