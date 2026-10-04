# HOTFIX R2 — Modal Root Cause Analysis

RCA trước patch runtime. Phân tích trên bản R1 nguyên trạng, native Chromium qua production local HTTP http://127.0.0.1:47382/WEB_LIVE/teacher.html. Đối chiếu baseline trước cockpit và RC2 trong browser context mới riêng, không localStorage bài cũ. Người dùng cung cấp bằng văn bản triệu chứng Windows đã tái hiện; phiên này chưa có ảnh gốc/Chrome console Windows nên không ghi ảnh cloud thành evidence Windows.

SYMPTOM = Lần Teacher mở lần đầu chưa có lesson, modal “WEB LIVE · Chọn bài học” vẫn hiện sau click ĐÓNG, Esc và click lần nữa. Button nhận focus.

ROOT CAUSE = hideImporter() có guard `if(lesson)` trước style.display='none'. Trạng thái lesson=null ở lần khởi động mới làm nhánh ẩn không chạy. Guard là code thừa kế từ baseline, không phải ID/selector hoặc listener bị mất do cockpit.

AFFECTED FILE = WEB_LIVE/teacher.js.
AFFECTED FUNCTION = hideImporter(), dòng 52.

WHY CLICK FAILED = inline onclick="hideImporter()" tồn tại trên closeBtn duy nhất, không clone/re-render. Hit-test tại tâm nút đúng closeBtn; click thực chuyển focus. V8 precise coverage xác nhận hideImporter được gọi 2 lần, nhánh có điều kiện không chạy khi lesson=null; computed display vẫn flex. Loaded lesson thì close hoạt động ở cả ba version. Không có pageerror trước/sau click, không có overlay intercept chặn nút hay script-order exception được tái hiện.

WHY ESC FAILED = Không có Esc→hideImporter contract trong baseline/RC2/R1. Escape hiện hữu chỉ hủy thao tác Draw/Cover/Smart/Classroom. Reproduction mới và loaded lesson đều không đóng modal bằng Esc. M5 là N/A cho hành vi đóng; không thêm keyboard feature.

PATCH = Bỏ đúng `if(lesson)` để hideImporter luôn đặt importer.style.display='none'. Giữ showImporter() mở flex, IDs/onclick, import/start/render/sync, DOM modal/overlay và toàn bộ CSS. Importer là cùng node overlay fixed full-screen; display:none ẩn cả modal và lớp chặn pointer. Reopen dùng node hiện hữu, không tạo modal mới.

FILES CHANGED (runtime planned) = WEB_LIVE/teacher.js only.

## Đối chiếu implementation

| Version | Fresh lesson | Click handler calls | Click closes | With lesson closes | Esc closes | JS exceptions |
|---|---|---:|---|---|---|---:|
| Pre-cockpit baseline | null | 2 | NO | YES | NO | 0 |
| RC2 | null | 2 | NO | YES | NO | 0 |
| R1 | null | 2 | NO | YES | NO | 0 |

HTML → #importer/.import → #closeBtn (type=button) → inline hideImporter → global function → conditional style.display → same overlay div. .import CSS defaults display:flex; no competing !important/display override when inline none is set. Script tags are at end of body; handler declaration exists after page load. Cockpit moves library button into System but does not move/clone importer or closeBtn. showImporter cancels TTS exactly as baseline; this code is not edited.

Console/pageerror phases page load, modal open, click, Esc, click again are logged in PRE_PATCH_AUDIT/reproduction.json, together with function coverage. No exception stack/line exists for this native reproduction because pageerrors=0. Any console records are preserved verbatim in that JSON, with phase and location; they are not recast as Windows console.

## Scope lock

R1 snapshot is read-only baseline of R2. Only close guard is patched. tts-teacher.js and all TTS core/provider code, cockpit HTML/CSS/JS, TV renderer, pedagogy, subject engines, lessons, Demo and Launcher/Chrome Start remain byte-identical with R1. Reports/tests/evidence are additions outside runtime source.

Windows modal retest is required; physical audio/app/full Launcher acceptance is not certified by this cloud reproduction.

## Patch và xác nhận sau sửa

Patch đã áp dụng đúng một dòng như dự kiến. M1/M2/M3/M4 đạt ở 1366×768 và 1920×1080, lesson=null vẫn đóng. M5=N/A cho Esc-close theo contract baseline. 31 checks modal/action/integration PASS + 30 cockpit checks native PASS; 0 JS exceptions. 2 favicon404 ở comparison static servers trước patch được giải thích riêng trong HOTFIX_R2_EVIDENCE/CONSOLE_REPORT.md; không chặn initialization/close handler.

Runtime files changed = WEB_LIVE/teacher.js only; R1 TTS fix preserved byte-for-byte; scope violation 0. Windows user report vẫn cần kiểm lại R2 trên chính máy đó; không suy diễn cloud PASS thành Windows resolved.
