# Geometry/global regression

**LEGACY_RUNTIME_REGRESSION = PASS**; **ALGEBRA_PROFILE_ISOLATION = PASS**; **INFORMATICS_PROFILE_ISOLATION = PASS**. Không phát hiện behavioral regression trong các ca chuẩn đã chạy.

## Phase 2 vs Phase 3

Hai runtime có origin riêng: immutable Phase 2 8771 và candidate Phase 3 8773. Năm gói Tin/Hình thật: 171 screens × 2 states = 342 states. Gói Demo thật: 4 screens × 2 states = 8. Tổng **175 screens / 350 states** mỗi runtime.

| Coverage | Actual comparison |
|---|---|
| Teacher + TV content/disclosure/stage/state keys | 342 contract hashes match |
| Embedded Preview visible DOM | Same displayed content/disclosure/image as TV |
| Image/resource/scene/layout/readability | 44 visual metric records match exactly; 0 overflow states |
| LOAD/NAV/NEXT/PREV/reset/rapid navigation/reload | 30 cockpit checks per runtime; source lesson unchanged |
| Focus/FullScreen/DrawBoard/Cover/Smart/whiteboard/layout | Native controllers/records/clicks, same outcomes |
| Native TTS registry/disclosure/settings | 20 checks per runtime, BC and without-BC; no voice/audio mock |
| Existing Demo | 8 paired states match; no app launch through navigation |
| Vertical MCQ | 40 checks / 31 captures: 2–5 options, math/instruction/long text, four sizes |
| Geometry-specific MCQ | Four-size native checks giữ vertical rows và separate instruction dù GT metadata có mặt |
| Canonical Algebra/Informatics | Same DOM/image/TTS/state snapshots as Phase 2; Geometry adapter/layer/control/context inactive |
| Missing/empty/unknown/legacy | Same Phase 2 fallback behavior; Geometry metadata ignored |
| Profile switch Geometry→other | Geometry dispose clears new SVG/controls/classes/context from Teacher/TV/Preview |

Algebra/Informatics descriptors được đối chiếu với descriptor snapshot từ Phase 2; status REGISTERED_STUB, featuresImplemented=false không đổi. Source `tv-layout-algebra.js`, `tv-layout-computer.js` và mọi file ngoài sáu approved integration files giữ nguyên byte. Không thêm feature, redesign hoặc chuẩn bị implementation cho các profile này.

## Oracle và giới hạn

Paired comparison dùng normalized semantic contracts, không random activation, incrementing version hoặc wallclock như nội dung. Guard/reload/transport được kiểm tra riêng bởi native suites. Offscreen Preview TTS registry không phải oracle instant cho broad walk, đúng risk P2-R06; riêng TTS suites giữ parity/disclosure assertions và chạy native ở hai transports.

35 enriched Geometry screens có thêm 70 state checks; không dùng chúng để thay thế Legacy regression. Geometry-only fixture không được gọi là bài Algebra thật hoặc gói SGK mới. Dữ liệu gói Hình học thật giữ nguyên fields/assets/order, metadata mới được provenance audit.

Malformatted state bỏ board vẫn là pre-existing P2-R05; không sửa DrawBoard/Core schema ngoài phạm vi. Legacy generic-label Teacher/TV stage divergence P2-R02 giữ nguyên. Windows/physical TV/audio/Word/GeoGebra vẫn UNRUN; Linux document.fullscreenElement không chứng nhận hệ hai màn hình Windows.

## Source integrity

Parent Phase 2 ZIP SHA trước/sau: `6e83a63792fff16d890b5f12bc3b990dc43bdfec3e360b7a8bbe3a10e813f38c`; 985 original files verified unchanged tại parent. Working candidate thay đúng: core-profiles.js, common.js, teacher.js, tv.js, teacher.html, tv.html. Thêm geometry-profile.js/CSS và report/test/evidence/test package riêng.

Original lesson ZIPs, original CSS, TTS, Launcher/config/BAT/Python, Algebra/Informatics engine bytes không đổi. SOURCE_SCOPE_VIOLATION = NO; PRODUCTION_MODIFIED = NO. Runtime JS syntax và tất cả served JS/CSS/HTML byte comparisons đạt. Full patch và per-file SHA nằm trong evidence; current checksum là PHASE3_CHECKSUMS_SHA256.txt.

Đã dừng ở Phase 3. Phase 4 và Production cần phê duyệt riêng sau GV review runtime/evidence.

Fresh ZIP extraction smoke: PASS. Tất cả 49 served HTML/JS/CSS assets khớp payload; actual Geometry import/GT-KL/proof highlights/modal và zero runtime errors đạt. Tested extracted runtime bytes khớp final candidate. Final ZIP CRC/manifest/hash nằm trong delivery sidecar.
