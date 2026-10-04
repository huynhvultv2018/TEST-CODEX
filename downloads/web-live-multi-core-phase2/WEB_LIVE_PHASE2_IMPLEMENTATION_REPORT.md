# Phase 2 implementation

**PHASE2_STATUS = PASS**. Legacy regression không có khác biệt trong phạm vi đã chạy; backward compatibility = **CONTROLLED_RISK**. Chưa promote Production, chưa thực hiện Phase 3.

## Baseline và phạm vi

ZIP baseline trước/sau: `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`.

Candidate được giải nén riêng từ chính ZIP này, ban đầu 770 file khớp byte. Baseline đóng băng vẫn khớp 770 file, không thêm/xóa/sửa. Xem `WEB_LIVE_PHASE2_TEST_EVIDENCE/FROZEN_BASELINE_INTEGRITY.json` và `source-integrity.json`.

Không full extraction. Runtime patch thực tế:

| File | Thay đổi |
|---|---|
| WEB_LIVE/core-profiles.js | Module mới: resolver metadata, registry immutable, bốn hook, diagnostic bounded, stale-render guard |
| WEB_LIVE/teacher.html, tv.html | Load module sau common.js, trước pedagogy.js |
| WEB_LIVE/teacher.js | Observe lesson/step tại đầu render hiện hành |
| WEB_LIVE/tv.js | Observe full cached lesson trước paint; onTVRender sau fit/TTS registry trong rAF hiện hành |
| WEB_LIVE/tv-layout-model.js | Canonical profile adapter trước legacy resolver hiện hành |
| WEB_LIVE/pedagogy.js | Đọc cùng adapter trước fallback stage cũ |

Chỉ sáu file cũ thay đổi. CSS, common.js, ZIP importer, state transport, TTS, các engine môn học, scene resolver, drawing/cover/smart, Launcher/Python/BAT/config và lesson ZIP giữ nguyên byte. Báo cáo, test và evidence mới bổ sung ngoài runtime. `RUNTIME_PATCH.diff` là diff đầy đủ để review.

## Kết quả

- Năm gói thật Tin/Hình: 171 screens × 2 states = 342 trạng thái. Hash contract Teacher + TV khớp baseline/candidate; visible DOM Preview khớp TV; 44 visual metrics khớp; không overflow.
- Gói Demo thật: 4 screens × 2 states = 8 trạng thái, khớp baseline/candidate. Tổng 6 gói, 175 screens, 350 trạng thái.
- Mỗi runtime: 30 cockpit checks, 20 native TTS registry checks ở hai transports, 15 engine assertions. Các nguồn lesson trong memory không bị thay đổi sau thao tác.
- Candidate: 40 vertical MCQ checks ở 1920×1080, 1600×900, 1366×768, 1280×720; 31 captures; không character wrap/clip/instruction lẫn vào option.
- 6 nhóm Node contract checks; 8 browser metadata cases; selected profile lifecycle/TV hook isolation; fallback; reload; stale state guard; privacy DOM. Keyboard/reset/native CSS progress transition/clock/old packet đã so sánh hai runtime.
- 34 runtime JavaScript syntax checks và Python AST checks đạt. Mỗi asset HTML/JS/CSS phục vụ HTTP khớp source candidate.

Các bài Algebra trong test là fixture presentation, không phải nguồn SGK hay gói bài thực được xác minh. Không dùng mock giọng nói, mock native app hoặc kết quả Linux để tuyên bố Windows acceptance.

## Gate

| Gate | Result |
|---|---|
| BASELINE_MUTATED | NO |
| LEGACY_PACKAGE_LOAD / LEGACY_RUNTIME_REGRESSION | PASS / PASS |
| PROFILE_RESOLVER / UNKNOWN_PROFILE_FALLBACK | PASS / PASS |
| GEOMETRY / ALGEBRA / INFORMATICS_PROFILE_STUB | PASS / PASS / PASS |
| PROFILE_ISOLATION | PASS (dispatch/lifecycle, không phải sandbox bảo mật) |
| BACKWARD_COMPATIBILITY | CONTROLLED_RISK |
| SOURCE_SCOPE_VIOLATION / PRODUCTION_MODIFIED | NO / NO |

Sáu rủi ro được khai báo đầy đủ trong compatibility report. Dừng sau package/report; chỉ đề xuất GV xem xét phê duyệt Phase 3 riêng. Hash candidate ZIP được cung cấp ở sidecar và final delivery report, vì ZIP không thể chứa chính hash của nó.
