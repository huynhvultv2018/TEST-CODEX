# Phase 2 regression

**LEGACY_RUNTIME_REGRESSION = PASS**. Behavioral regression = NONE trong các ca chuẩn đã chạy. Native Windows/audio/physical TV/Word/GeoGebra = UNRUN; malformed state limitation được công khai, không gộp vào standard PASS.

Môi trường: Linux native Chromium 151.0.7922.173 + Playwright, hai HTTP origins riêng (frozen baseline 8770, candidate 8771). Không speech/native app protocol mock. Browser fixtures chỉ dành cho contract/presentation, không phải nội dung giáo khoa.

## Packages và phép đối chiếu

| Package thực | Screens | States mỗi runtime |
|---|---:|---:|
| TIN6_W04_LIVE_RC3_PED1.zip | 41 | 82 |
| TIN6_W05_LIVE_RC3_PED1.zip | 32 | 64 |
| TIN8_W04_LIVE_RC3_PED1.zip | 29 | 58 |
| HINH_HOC_8_T04_T07_LIVE_TEST.zip | 34 | 68 |
| HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip | 35 | 70 |
| DEMO_TRUC_TIEP_SAMPLE_LIVE.zip | 4 | 8 |
| **Total** | **175** | **350** |

Hai trạng thái mỗi screen: question và full answer/analysis có sẵn. Năm gói đầu đối chiếu hash Teacher + TV contract ở toàn bộ 342 trạng thái, visible Preview parity, source lesson unchanged, state field keys, mode/stage/text/disclosure/options/visible images. 44 visual metric records khớp hoàn toàn. Demo đối chiếu nội dung/mode/stage/disclosure/state keys ở tám trạng thái.

Không so sánh random activation, incrementing stateVersion hoặc timestamp như nội dung; version/activation/reload guards được test riêng. Broad walk không so sánh immediate hidden iframe TTS registry vì baseline rAF throttling đã tái hiện; native TTS suite riêng assert actual registry parity và disclosure ở hai transports. Initial mismatch được giữ trong evidence; test harness đã sửa oracle lấy Teacher stage từ cockpitStage, không từ thuộc tính TV-only trên Teacher screen. Không sửa product để giải quyết hai vấn đề harness này.

## TEST / INPUT / EXPECTED / ACTUAL / RESULT

| TEST | INPUT | EXPECTED | ACTUAL | RESULT |
|---|---|---|---|---|
| LOAD | Sáu ZIP thật nguyên byte | Import và render, không mandatory metadata | 175 màn hình, source không bị sửa sau thao tác | PASS |
| NAV/NEXT/PREV/keyboard | Jump, rapid next/back, Arrow keys | Index và view đồng bộ | Hai runtime cùng kết quả; popup/Preview/TV restore | PASS |
| TV + TEACHER | Từng screen, question/full | Contract/DOM/render metrics giống baseline | 342 state hashes + 8 Demo states khớp; 0 overflow | PASS |
| ANSWER/HINT | Hint1/Hint2/full/progressive/previousStep/close gate | Đúng disclosure, không lộ bước tương lai | 30 cockpit và 20 TTS checks mỗi runtime | PASS |
| FOCUS/tools | Real click, draw point/label, cover/smart/highlight/whiteboard | Overlay đúng scene và nguồn focus | Native runtime records hiện trên TV, source lesson giữ nguyên | PASS |
| FULLSCREEN | Click Teacher/TV fullscreen button | document.fullscreenElement tồn tại rồi exit | Fullscreen API thật ở cả runtime | PASS (Linux API) |
| STATE | Default BC, không BC, popup close/reopen, reload, stale version, old lightweight packet | Wire shape không đổi, reject stale, restore đúng | Cả hai transports, field keys và old supported packet khớp | PASS |
| MEDIA | Existing geometry/analysis SVG/PNG assets | Đúng scene, ảnh và layers không đổi | Image SHA, progressive analysis, overlay order khớp | PASS (existing images) |
| ANIMATION | Native CSS bar transition + clock | transitionend width 0.15s, clock tăng | Hai runtime width=60%, completed=true; clock tick | PASS (existing animation) |
| RESET | Zoom/pan/pointer/hint/answer rồi next/resetZoom/Teacher reload | Trả view/reveals về baseline | Zoom=1, pan=0, pointer=null, answer hidden | PASS |
| TTS | Native registry + NO_VOICE | Chỉ đọc phần đã reveal; thiếu voice báo rõ | 20 checks mỗi runtime; zero voice, không speech queue | PASS registry; AUDIO UNRUN |
| Demo | Package thật/navigation/reload | Không auto launch/present/return | Không native launch request; bốn screen khớp | PASS UI; NATIVE APP UNRUN |
| MCQ vertical | 2–5 options, math/instruction/long content, 4 viewports | Mỗi option full-width độc lập, readable, không clip/character wrap | 40 checks, 31 captures, 0 overflow/errors | PASS |
| Missing/empty/unknown/invalid | Optional metadata absent hoặc sai | Legacy không crash, đúng diagnostic | Native browser fallback giống baseline | PASS |
| Subject stubs/isolation | geometry/algebra/informatics, conflicting old labels | Đúng adapter; chỉ selected hooks/renderer | Native load/step/TV render; no other-profile activation | PASS |
| Malformed packet | Bỏ board khỏi state trên figure screen | Characterize baseline, không che lỗi | Hai runtime cùng lỗi baseRevision; ghi P2-R05 | KNOWN_BASELINE_LIMIT |
| Windows/TV thật/âm thanh/native app | Môi trường Linux không có Win32/voice/physical TV | Không giả native success | Chưa chạy trên máy đích | UNRUN |

## Evidence và chạy lại

`paired-comparison.json`, `BASELINE/` và `CANDIDATE/` (ENGINES/COCKPIT/TTS), `VERTICAL/`, `profile-contract.json`, `profile-runtime.json`, `compatibility-extras.json`, `source-integrity.json`, `FROZEN_BASELINE_INTEGRITY.json` và captures là evidence hiện hành. Logs kết thúc thành công; sáu file runtime cũ + một module mới trong patch review.

Chạy lại theo `WEB_LIVE_PHASE2_TESTS/README.md`; các test đời trước vẫn được giữ nguyên. Candidate checksum và ZIP CRC được kiểm tra khi đóng gói. Cài đặt cloud/startup được lưu thành draft; save draft chưa publish môi trường hay chứng nhận fresh-task restoration.

Fresh extraction package smoke: PASS. Payload runtime bytes và mọi asset HTML/JS/CSS tại 8772 khớp candidate; importer cold Close/reopen, fixture MCQ vertical/instruction, knowledge gate/math/no-overflow và zero runtime errors đạt. Final ZIP CRC/manifest được xác minh riêng trong delivery sidecar.
