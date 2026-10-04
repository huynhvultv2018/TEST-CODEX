# WEB LIVE — regression matrix cho một CORE và ba profile

Baseline `TV_VERTICAL_MCQ_CANDIDATE`, SHA-256 `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`. Matrix dưới đây là **acceptance dự kiến cho phase implementation**, không phải toàn bộ đã chạy trong Phase 1.

## Fixture set và evidence baseline

| Nhóm | Nguồn hiện có | Bổ sung cần trước chứng nhận |
|---|---|---|
| LEGACY | 2 Hình ZIP thiếu subject_engine; Demo 4 màn; explicit GENERIC/default probes | Lesson mơ hồ môn, thiếu optional fields, unknown metadata, collision library |
| GEOMETRY | HINH_HOC_8_T04_T07_LIVE_TEST 34; DUAL_VISUAL 35; runtime scene/tools | Các scene boundary/imageMode/fullscreen/semantic refs future |
| ALGEBRA | Fixture expression/equation/system/identity/table/graph/MCQ/steps | Package Đại số thực tế có provenance; TeX/error compare khi feature được duyệt |
| INFORMATICS | Tin6 W04 41, W05 32; Tin8 W04 29, preparedContract RC3 | Code/algorithm/task/product structured cases future; native apps |

Fixture trình bày không phải bài SGK và không chứng nhận phạm vi curriculum. Dùng raw lesson ZIP/hash để truy nguồn ca thật. Với tính năng chưa hiện hữu, viết fixture mới trong candidate/tests của phase được duyệt, không sửa freeze.

## Cross-subject CORE matrix

Mỗi ô là hành vi cần kiểm; “N/A có lý do” chỉ dùng khi capability/data không áp dụng. Không đánh PASS cho N/A hoặc UNRUN.

| Chức năng CORE | LEGACY | GEOMETRY | ALGEBRA | INFORMATICS |
|---|---|---|---|---|
| Lesson load/JSON/ZIP/library | Missing metadata/optional fields không crash, old asset formats | Base+analysis resources đúng roles | Unicode/TeX declaration fallback và source preserved | RC3 contract/trace/resources giữ nguyên |
| Navigation/Teacher/keyboard | Next/prev/jump/clamp/reset cũ | Scene giữ base figure, boundaries reset đúng | Reset disclosure, visible transformation count | Không skip stage/CORE task, không autorun Demo |
| TV/preview rendering | Same normalized task/MCQ/cards | Figure+GT/KL+analysis+proof đúng preset | Equation/system/table/graph/MCQ no clipping | Observe/question/application/product media đúng source |
| Answer/progressive steps | Full/hidden/steps đúng legacy | Proof count/current/conclusion gate | Transform steps/future answer absent | Answer/close chưa bấm vẫn ẩn |
| Hint/close/analysis | Legacy hint compatible | Analysis future nodes ẩn; image không đè figure | Hint riêng, không tự solve | Hint1→Hint2 gate, knowledge close GV-controlled |
| Focus | Source offsets/indices không đổi | Text/object focus đúng target | Math block/chunk/source map ổn định | Instruction/code/task focus không phá whitespace |
| Fullscreen/layout/zoom | Browser fullscreen nếu support, không đổi source | 70/30,60/40,figure mode, zoom/pan+overlay lock | Readable fonts, fit sau typeset, no horizontal clipping | Preview ratio/resource/task viewport phù hợp |
| Media | Static assets/offline fallback | Image base+diagram/native GeoGebra khi có | Graph image/math renderer resources | Word/GeoGebra/files/media chỉ khi action GV |
| Animation/timers | Common CSS/presence/clock không stale | Drag preview revision, không duplicate rAF | Async typeset stale callbacks không ghi màn mới | Poller/clock/demo lifecycle không tự mở app |
| State/transport/recovery | Keys/source identity/version/activation preserved | Scene/board/cover/smart scope và snapshot | Profile state namespace đúng, legacy keys không đổi | Restore index/source/clock; disclosures reset |
| TTS/privacy | Một Teacher owner, visible blocks only | Proof/current analysis, không đọc bước ẩn | Accessible text, không đọc TeX/internal DOM artifacts | Không notes/probe/offline guidance/private answer |
| Packaging/runtime | ZIP CRC/SHA, startup entry cũ | Scene assets/layers không đổi | Offline MathJax optional local bundle | Demo config/install key matching, old aliases |

## Ca isolation bắt buộc

Trong cùng browser context và same origin: Geometry→Algebra→Tin→legacy→Geometry. Mỗi lần đổi activation: current lesson hash/raw screens giữ; profile timers/listeners/typeset disposed; board/cover/smart/highlights không lọt vào môn khác; tools capability state đúng; zoom/focus/reveal không stale; Teacher/TV cùng profile/stage/block registry.

Hai cửa sổ Teacher: TTS lease chỉ một owner; foreign context không đọc/paint nội dung khác. Đóng popup TV → preview registry phục hồi (R1); reload TV có needLesson/snapshot recovery; refresh Teacher đúng source/index nhưng hint/answer/close reset. Old stateVersion cùng activation không thay màn; khác source/lesson/activation không chấp nhận lesson packet cũ.

Negative routing: explicit canonical thắng heuristic, unknown subject_engine diagnostic+legacy safe; canonical legacy/default khóa adapter; explicit cũ ưu tiên theo baseline; title “Giải phương trình” chỉ dùng heuristic trong legacy path. Ca `subjectMode=GEOMETRY`, subject chung phải Teacher/TV parity sau boundary change (baseline divergence B03 đã được ghi, chưa sửa).

## Kiểm visual và disclosure

TV viewports: 1920×1080,1600×900,1366×768,1280×720. Thêm actual Windows Extend/DPI/laptop+TV trong native gate; 4K optional chỉ claim khi chạy. Preview lấy virtual viewport/actual TV size theo baseline, không so chữ trên iframe đã scale với font vật lý trực tiếp.

MCQ: 2–5 choices, long words/expressions/figures, generic và từng profile; từng option độc lập full cognitive width, marker + body cùng hàng, wrap tại word/operator hợp lệ; không ký tự rời, không clip, không instruction trong option. Đo bbox/contentWidth/scrollWidth/scrollHeight/min font, exact expression/chunk text, option count, overlap và TTS order. Knowledge card grid được test riêng, không tái áp MCQ columns.

Math: dấu âm/binary operator, powers/groups, H2O/A1/HTML5/IPv6/version/time không tự tách; code Tin preserve. Không normalization global theo digits. Future MathJax cần đo after-typeset, cancel generation, fallback khi assets lỗi/offline; không type hidden future steps. Proof/analysis conclusion, double-click figure restore, layer transform và context assets phải được so sánh ảnh + DOM/state.

No clipped source/delete/summarize để vượt test; overflow phải có diagnostic và acceptance xử lý theo task mới. Pixel golden chỉ bổ trợ, semantic assertions là chính; font/OS rendering khác phải được ghi môi trường.

## Packaging, Windows và Demo gate

Fresh extract từ ZIP đúng SHA; stale server phải được phân biệt bằng asset bytes/health/runtime root. Test `START_WEB_LIVE.bat` cold start/re-run và mở Chrome; Python 3.10+; không ghi __pycache__ vào freeze. Không đổi port/source để làm test giả PASS.

Native Demo: allowed origin47382→API47381, pairing cùng package, explicit click/confirm, correct docx/ggb, no launch on nav, whitelist/file errors, reuse/retry/return preserve LIVE state; 1 monitor/2 monitors/3+selection, TV trái/phải/mixed DPI/fullscreen. TTS: có giọng vi-VN, thật sự nghe đúng thiết bị/Windows settings, pause/resume/stop/read-again, context cancel. Mocks không thay native PASS.

## Kết quả Phase 1 đã chạy

| Kiểm chứng mới | Kết quả | Evidence |
|---|---|---|
| 5 package Tin/Hình: 171 screens,342 states | Không overflow đo được ở các trạng thái chạy; raw runtime lesson sau import không đổi trong traversal | ENGINE_AUDIT/results.json + engine-audit.log |
| Engine structural behavior | 15 assertions PASS,44 captures,0 page errors/0 external requests trong suite này | ENGINE_AUDIT/results.json |
| Architecture probes | 20 assertions PASS, gồm **xác nhận gap/divergence**, không phải gap đã fix | ARCHITECTURE_RUNTIME_PROBES.json + architecture-probes.log |
| Demo package | 4 screens import/navigation; no /launch,/present,/return by navigation | Runtime probes; DEMO_BASELINE.png |
| Served-source integrity | 46 HTML/JS/CSS asset hashes equal freeze | Runtime probes sourceHashes |
| Syntax/source inventory | 33 JS syntax PASS;4 Python AST parse;53 code files reviewed | JS_SYNTAX_AUDIT.json / RUNTIME_SOURCE_INVENTORY.json |
| ZIP/source freeze | Original CRC/SHA and770 entries equal before/after | FINAL_INTEGRITY.json |
| Windows/browser fullscreen/TV thật/native apps/audio | UNRUN; voices=0 trên Chromium | Runtime probes và limitations audit |
| New CORE/profile implementation regression | UNRUN — chưa implement | Phase 1 stop rule |

Kết quả B03 Teacher ANSWER/TV PROOF là behavior observation tái hiện đúng, vì thế assertion kiểm observation PASS **không nghĩa stage parity PASS**. Không cộng 342 states vào 35 assertion như một số test duy nhất. Chỉ đánh broad compatibility PASS khi các phase implementation đã qua matrix và gaps liên quan được đóng.

## Tái chạy read-only characterization

Trong vùng audit có sibling `WEB_LIVE_BASELINE_FROZEN`, chạy `python3 -B -m http.server 8770 --bind 127.0.0.1 --directory <frozen_root>/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE`; xác minh byte root. Harness ngoài source:

```bash
WEB_LIVE_TEST_ROOT=<frozen_root>/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE \
  node harness/baseline-engines.cjs
node harness/architecture-probes.cjs
python3 -B harness/verify-frozen.py
```

Requires installed Node/Playwright/Chromium; cloud runtime hiện đã có. Dùng existing checkout, không tạo worktree; report/evidence nằm ngoài freeze. Harness engine được sao chép từ test trong ZIP, chỉ thay base URL và output path, không thay assertions/code app. Fresh Chromium contexts; không dùng browser profile lớp học. Kết thúc chỉ stop server audit do task tạo. Không giữ server 8770 thành runtime production hoặc môi trường native Launcher.

Tests/evidence lịch sử có sẵn trong ZIP được giữ nguyên nhưng không tính là kết quả mới của Phase 1. Saved onboarding start_skill trước đó vẫn dành bản vertical MCQ; audit này không cần sửa environment config hoặc source.
