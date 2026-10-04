# WEB LIVE — kế hoạch Phase 2 để GV xem xét

Baseline `TV_VERTICAL_MCQ_CANDIDATE`, SHA-256 `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`. **Chưa có Phase 2 implementation.** Báo cáo này là concrete scope/design để review, không là lệnh chuyển phase.

## Mục tiêu và entry gate

Chỉ sau lệnh `APPROVE PHASE 2`, mở candidate riêng, giữ source freeze/ZIP/bản hiện dùng. Kế thừa một CORE; establish boundary/profile interface/legacy adapter trong runtime hiện có, không xây tính năng Geometry mới, không MathJax, không migrate dữ liệu hoặc Launcher chọn môn.

Không cần đổi framework/bundler hay di chuyển toàn bộ source. Candidate có thể thêm adapter/service scripts nhỏ, giữ entry/HTML handler/DOM IDs/state packet/storage keys và script order có kiểm soát. Tên/cách đóng gói candidate phải phản ánh boundary candidate, không tăng version Production mặc định.

## Các bước dự kiến

| Bước | Change set sau khi được duyệt | Validation / điều kiện xong |
|---|---|---|
| P2.1 | Tạo candidate từ đúng frozen ZIP; record parent SHA + file manifest | All unchanged assets/lesson/launcher bytes match baseline trước thay đổi |
| P2.2 | Shared subject resolution service và canonical aliases; legacy/default adapter giữ resolver priority cũ | Routing cases actual Teacher/TV; missing/unknown canonical không crash; no lesson mutation |
| P2.3 | One private resolved context cho Teacher/TV stage mapping, phục vụ descriptors | B03 explicit Geometry+generic label có parity; phase2 không đổi legacy labels/flows ngoài intentional documented correction |
| P2.4 | Profile descriptor/interface registry; thin wrappers cho 3 presentation engines hiện hữu | One runtime/renderer dispatch; no copied engine/shell/TTS/loader; active profile capability contract rõ |
| P2.5 | Bridge common services: read-only lesson model, disclosed blocks, existing commands/layout/focus, tool ownership inventory | Profile hooks không trực tiếp mutate globals/storage/transport; globals bridge dependency allowlist |
| P2.6 | Identify subject policy boundaries trong common/pedagogy/Classroom/cockpit, chuyển từng responsibility nếu cần để đạt interface | Mỗi move giữ behavior bằng tests; không big-bang relocation/refactor unrelated |
| P2.7 | Scope style registration và lifecycle cleanup contracts; keep legacy CSS path | Cross-profile switch/no stale callbacks; MCQ vertical/figures/TTS parity no regression |
| P2.8 | Run matrix baseline+new routing/interface cases, package/diff/report review | Candidate ZIP hash/CRC, native gates recorded; user review trước phase tiếp |

Geometry scene semantics có coupling sâu nên P2 chỉ tạo ranh giới policy/service có adapter; không phải implement semantic object model/full persistent viewport. Nếu việc di chuyển toàn scene cần quá nhiều change, để adapter explicit ở Phase 2 và ghi extraction remaining cho Phase 3. Không coi `PARTIAL` là quyền làm mọi refactor trong một bước.

## Trách nhiệm file dự kiến

| Vùng source | Mục đích sửa candidate (chưa thực hiện) | Điều phải bảo toàn |
|---|---|---|
| `tv-layout-model.js` resolver + dispatch | Delegate shared resolver; descriptor adapter hiện engine hooks | model/source/focus/options/disclosure unchanged |
| `pedagogy.js` liveUIStage | Dùng shared resolved subject; tách generic actuator và subject policy boundary | Tin close/hint locks, no authoring logic |
| Teacher/TV HTML script lists | Load common resolver/interface trước consumers | Paths/DOM handlers/tools/tv preview source intact |
| Teacher lifecycle/TV model bridge | Bind context/service access; dispose hook | stateVersion/activation/source/restore/index semantics |
| Scene/common/Classroom/drawing adapter | Inventory boundary/injection, move only minimal necessary | layer order, scene scopes/old records/revisions, no wipe |
| Engine wrappers/scoped style registry | Register current geometry/algebra/informatics renderers | No new profile feature/third shell or CSS global cross-effects |

Tên file interface mới là decision implementation sau approval; không tạo “proposed runtime” `.js` vào baseline trong Phase 1. Nếu phải đổi wire schema/storage/state để thực hiện P2, dừng change đó và trình scope riêng; thiết kế P2 hiện ưu tiên không cần thay.

## Gate acceptance Phase 2

- Loader: tất cả 6 package cũ mở nguyên ZIP, optional metadata missing/unknown giữ fallback. Source lesson/asset hashes không đổi; không repackage authoring.
- Teacher/TV/preview: one shared resolution, same stage, state/view/block text parity; explicit mới và aliases cũ tương thích. B03 khép bằng test có thể fail nếu resolver lại chỉ TV.
- CORE: navigation/keyboard/hint/full-answer/step reveal/close/focus/clock/TTS ownership/privacy/reload/version/source recovery giữ behavior.
- Geometry nền: same scene inheritance, GT-KL/analysis/proof/overlay order/70-60/full figure/zoom lock; Draw/Cover/Smart/whiteboard records đọc v1.
- Tin: preparedContract RC3 policy/guide/source trace và close lock; Demo không launch khi chuyển màn. Native endpoints/config/files unchanged.
- Algebra: current Unicode fixtures/MCQ/math chunks/table/system/answer steps giữ nguyên; **chưa MathJax hoặc real package claim**.
- Isolation: switch profiles và no stale listener/timer/rAF; profile không tạo duplicate common controller/transport/renderer engine.
- Delivery: source diff có lý do/file hash, syntax và required regression; ZIP CRC/SHA verified. Windows/TV/audio/apps còn UNRUN phải ghi chính xác, không promote.

Có thể dùng existing tests làm characterization nhưng output phải ở candidate/evidence riêng. Không giảm assertion/clip source/alter fixtures để pass. Khi gặp baseline behavior issue khác, record/classify/evidence/propose; không mở rộng patch scope không liên quan.

## Rủi ro/blocker trước phase feature

`B04 — ACCEPTANCE_DATA_GAP`: không có package Algebra thật, evidence inventory 6 ZIP; chặn acceptance production Algebra Phase 5/6, không chặn chuẩn bị interface. Khuyến nghị dùng gói thực do GV cung cấp khi bước đó được duyệt.

`B05 — PLATFORM_UNRUN`: Linux/0 voices/không Win32 TV/apps; chặn native release acceptance. Khuyến nghị chạy candidate trên Windows máy GV + TV Extend, native app/voice/device thật; không giả lập thay chứng nhận.

`B01/B02/B03` thuộc implementation scope P2 với adapters/parity; `B06` capability future thuộc phase profile; `B07` compatibility cần matrix. Không blocker nào được dùng làm lý do sửa baseline Phase 1.

## Điểm dừng hiện tại

```text
PHASE1 = COMPLETE
PHASE2_IMPLEMENTED = NO
SOURCE_MODIFIED = NO
PRODUCTION_MODIFIED = NO
RECOMMENDED_NEXT_PHASE = PHASE 2 — CORE BOUNDARY / PROFILE INTERFACE
ENTRY_COMMAND_REQUIRED = APPROVE PHASE 2
```

Đã hoàn thành freeze/audit/design/reports. Dừng tại đây, để GV kiểm tra báo cáo rồi ra lệnh phase tiếp nếu muốn. Không tự patch/implement/promote.
