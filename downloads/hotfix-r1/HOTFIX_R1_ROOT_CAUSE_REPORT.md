# HOTFIX R1 — Root Cause Analysis

Phân tích trước khi sửa runtime source. Baseline nguyên bản và RC2 được giữ nguyên; R1 là bản sao độc lập. Mọi FAIL trong báo cáo RC2 ban đầu cần tách thành lỗi thực tế, thiếu điều kiện chạy và ca chưa thực hiện.

## A. TTS

EXPECTED: Teacher dùng registry đúng với nội dung đang hiện trong shared TV Preview sau khi TV popup đóng; các block MCQ/step/hint/answer giữ đúng nguồn đọc. Voice/binding/settings/cancel core giữ chức năng baseline.

ACTUAL: native Chromium, import Tin6 W04 rồi go(14), chưa TV = 5 blocks; mở popup = 5; đóng popup và sync = 1 legacy block. Tái hiện cả có/không BroadcastChannel. Shared preview vẫn visible; không có pageerror. Evidence: HOTFIX_R1_EVIDENCE/PRE_PATCH_AUDIT/reproduction.json.

ROOT CAUSE (source): tts-teacher.refresh() xóa registry mỗi lần tvWindow.closed, kể cả khi registry mới đã đến từ embedded preview. Con trỏ popup đã đóng không được loại bỏ. Closed registry packet cũng xóa nguồn đọc nhưng không yêu cầu iframe gửi lại registry hiện tại. Trong RC2, preview gốc nằm trong ngăn editor, nên fallback previewBlocks() không còn là shared student renderer. Core không bị mất binding hay thay engine.

AFFECTED FILE: WEB_LIVE/tts-teacher.js.
AFFECTED FUNCTION: refresh(), subscriber ttsRegistry (closed packet).
MINIMAL FIX: ngừng dùng con trỏ popup đã đóng; chỉ bỏ registry của TV đã đóng, giữ registry preview. Khi TV đóng, sync state hiện tại để iframe gửi registry mới. Không thay TTSController, voice selection, settings, speech queue, lesson state/disclosure.

ROOT CAUSE (environment / acceptance): native speechSynthesis.getVoices() = []; vi voices = 0. TTSController báo NO_VOICE như baseline. Đây là thiếu voice runtime; không thể đánh giá phát âm/start/stop/replay/audio thật bằng mock. Không thêm engine mới để giả PASS.

MULTI-ENGINE: source baseline chỉ có một provider TTS Web Speech API và MathSpeech preprocessing. Multi-engine hiện hữu là các subject presentation engines; không có engine-provider selector để khôi phục. Voice selection/fallback locale/gender thuộc TTSController, byte-identical với baseline.

## B. Demo

EXPECTED: Teacher detect metadata → status/pairing → Teacher confirms → /launch app được whitelist. Cancel không gửi /launch. TV, import, Next/Back, reload và reconnect không tự launch.

ACTUAL: DemoTeacher và protocol source không đổi từng byte so với baseline/RC2. Element IDs và onclick launch/retry/return được giữ; cockpit chỉ đổi parent group. Gói config word/geogebra exe đều trống. Máy hiện tại là Linux, không có Word/GeoGebra/Win32 TV desktop. Chưa có triệu chứng lỗi Windows do người dùng cung cấp.

ROOT CAUSE (reported FAIL): trước đó FAIL là gate chưa có physical evidence, chưa chứng minh regression. Cấu hình app trống ngăn launch thật; thiếu Windows ngăn handoff. Phải kiểm thêm chain production HTTP/auto-pair/Cancel/fail-safe thực tế trong cloud rồi ghi phần app launch là UNRUN, không mock PASS.

AFFECTED FILE: chưa có source defect xác định; WEB_LIVE/demo-teacher.js không đổi.
AFFECTED FUNCTION: DemoTeacher.render/_refresh/launch và LauncherService._app_exe cần runtime evidence; không tìm thấy binding bị xóa.
MINIMAL FIX: không sửa Demo source khi chưa tái hiện lỗi. Cần configured Windows app path và máy thật cho launch/handoff; không tự hard-code path.

## C. Local Launcher / Chrome Start

EXPECTED: package relative root → local HTTP/Launcher → Chrome Teacher HTTP → auto-pair; đổi tên/di chuyển thư mục và mở lại không tạo service trùng.

ACTUAL: START_WEB_LIVE.bat, start_web_live.py, web_live_http.py, WebLiveLauncher.py, windows_handoff.py byte-identical baseline. .bat dùng %~dp0; package root Python từ __file__, không có /workspace hoặc đường dẫn người dùng được thêm vào runtime. Word/GeoGebra executable paths là cấu hình ứng dụng ngoài package, không phải đường dẫn runtime WEB LIVE.

ROOT CAUSE (reported FAIL): ca Windows Chrome/.bat/physical handoff chưa chạy; không có source regression được xác định. WebLiveLauncher.main() chủ động trả exit 2 trên Linux. Việc này có sẵn trong baseline. Không sửa guard Windows để giả khả năng chạy app OS.

AFFECTED FILE: chưa xác định defect; không có runtime patch Launcher dự kiến.
AFFECTED FUNCTION: start_services, ensure_service, main; sẽ kiểm production handler HTTP, reuse và relocation trên Linux, Windows launch vẫn UNRUN.
MINIMAL FIX: giữ nguyên Launcher/Chrome Start. Xác minh relative roots, handlers, pairing và duplicate protection bằng runtime thật; không thay app registry trống bằng đường dẫn đoán.

## Đóng băng phạm vi

Chỉ WEB_LIVE/tts-teacher.js dự kiến được sửa. UI/CSS, pedagogy architecture, lesson ZIP, Geometry/Algebra/Tin renderers, DemoTeacher, TTS core, Launcher và Chrome Start giữ nguyên. Nếu bằng chứng mới xác định lỗi khác, cập nhật RCA trước khi sửa.

PRODUCTION READY chưa thể YES khi ca âm thanh/Windows chưa được thực hiện. PASS của HTTP/registry không thay thế voice audio hoặc Win32 handoff.

## Kết quả sau hotfix

TTS FAIL: root cause source = stale closed popup pointer xóa registry preview; fix = patch adapter ở refresh/closed subscriber, giữ controller/provider. Trước patch 5→1 block sau TV close; sau patch 5→5, có/không BroadcastChannel. 20 native registry/disclosure checks và 4 foreign-context checks đạt. Âm thanh vẫn UNRUN do 0 native voices.

DEMO FAIL: root cause reported gate = thiếu configured exe và physical evidence, chưa xác định source regression; fix source = không sửa. 8 production HTTP/HMAC/native UI checks đạt; missing app được reject 404 APP_NOT_FOUND; confirmation/cancel/launch/handoff vẫn UNRUN.

LAUNCHER FAIL: root cause reported gate = môi trường Linux và thiếu Windows evidence; fix source = không sửa. Production static HTTP/API, root fingerprint, duplicate reuse, rename/move ở Linux đạt. Bootstrap native thật trả 2 Windows-only; .bat/Chrome closed/open/Win32 physical chưa chạy.

SHA audit xác nhận original 284 files và RC2 330 files không đổi, runtime R1 chỉ tts-teacher.js đổi. Kết quả đầy đủ và điều kiện còn thiếu trong HOTFIX_R1_REGRESSION_REPORT.md / HOTFIX_R1_ACCEPTANCE_REPORT.md. Không dùng evidence mock hoặc suy diễn Windows PASS từ Linux handlers.
