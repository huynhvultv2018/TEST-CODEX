# Phase11 — targeted / storage evidence

Final selected runs: working QUICK_ACCESS_RESULTS.json và PACKAGED_QUICK_ACCESS/QUICK_ACCESS_RESULTS.json, cả hai PASS, 16 groups, 0 page errors, 0 external requests. Working và fresh-package SAFEGUARDS/TARGETED_RESULTS.json PASS 15 groups mỗi run. Faults giữ riêng expected-failure outcomes; không gọi quota-blocked load là success.

| Test group | Working | Fresh candidate |
|---|---|---|
| REMEMBER_SUBJECT_AFTER_SUCCESS | PASS | PASS |
| RECENT_LESSON_ADD | PASS | PASS |
| RESTORE_LAST_SUBJECT_AFTER_RELOAD | PASS | PASS |
| DO_NOT_REMEMBER_SUBJECT_AFTER_FAILURE | PASS | PASS |
| RECENT_LESSON_DEDUPLICATION | PASS | PASS |
| RECENT_LESSON_LIMIT | PASS | PASS |
| RECENT_LESSON_ORDER | PASS | PASS |
| RECENT_REOPEN_VALIDATION | PASS | PASS |
| RECENT_FAILED_LOAD_NOT_ADDED | PASS | PASS |
| QUOTA_FAILURE_NO_CRASH | PASS | PASS |
| QUOTA_FAILURE_CURRENT_LESSON_PRESERVED | PASS | PASS |
| OPTIONAL_QUICK_ACCESS_FAILURE_DOES_NOT_CORRUPT_SUCCESS | PASS | PASS |
| INVALID_STORED_SUBJECT_FALLBACK | PASS | PASS |
| RECENT_DOES_NOT_STORE_LARGE_PAYLOAD | PASS | PASS |
| ACTUAL_QUOTA_REPRODUCER_PRESERVED_CURRENT_AND_UNKNOWN_DATA | PASS | PASS |
| ZERO_PAGE_ERRORS_AND_EXTERNAL_REQUESTS | PASS | PASS |

13 mandatory groups của command Phase11 nằm trong bảng; 3 additional groups kiểm optional write failure không corrupt success, actual Chromium quota + unknown data, zero runtime errors/external requests. Stored-data tests gồm missing, malformed JSON, unsupported subject, malformed recents, incomplete entry, oversized raw data, unsupported version; thêm optional read denial. Fixture init scripts assert raw data injected thật trên intended Teacher origin, không chỉ test empty key.

## Essential / optional faults

QUICK_ACCESS_RESULTS.json faults: essential lesson quota, library quota sau partial write, snapshot read SecurityError; optional quick-access QuotaExceededError và SecurityError. Với essential faults, complete Teacher snapshot (lesson/activation/index/disclosure/zoom/Focus + relevant storage) và actual TV activation/index/answerStep/body exact trước/sau. Khi optional write fail, new lesson id/profile/state được publish thành công; modal đóng; warning còn visible; previous durable quick-access string exact. Stored old/current/unknown lessons không bị evict.

Large Geometry package dùng G4-F01 fixture đã phê duyệt làm test input giữ SHA gốc; không thêm/sửa nó trong candidate source. Metadata/reference whitelist test đảm bảo không screens/asset fields hoặc data:image trong Recent; measured 996 code units, hard cap 8192, max 5 entries. Reopen đủ stage→validation→explicit load; mismatch và cached lesson tampered subject_engine bị block. Reopen same id dedup, cập nhật timestamp và activation fresh.

## Inherited safeguard suite

15 nhóm Phase9 assertions được giữ, chỉ external runner path/base/output đổi: explicit selection; four profile matches; three cross-subject mismatches; safe metadata preview/XSS/week0; Legacy fallback; invalid engines; malformed packages/assets/ZIP CRC; contained Informatics image; async stale/cancel; storage rollback; native-start rollback; preflight error preservation; Geometry→Algebra→Informatics→Legacy→Geometry routing/reset; saved reopen; zero errors/no teaching ahead. No assertions disabled. Các injection TEST_QUOTA/TEST_START/TEST_POST_START phân biệt với lỗi browser quota thật.

## Fresh packaged artifact

Candidate ZIP CRC PASS; fresh extraction tất cả 1.241 file byte-identical working; candidate HTTP local server riêng. PACKAGED_SMOKE/PACKAGED_ASSETS.json kiểm 60 asset JS/CSS/HTML/vendor/media exact bytes/SHA + native modal close/reopen/close. Fresh quick-access16 + safeguards15 repeat PASS trên actual packaged root, không trên working server.

Candidate SHA256 = 1a04b5e9ae52068e9bf7d194b0767f233e0aecab3a17dd490ff2606178005954

## Reproduce trong cloud

Toolchain có sẵn: Python3 static HTTP; Node + Playwright từ /opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules; /usr/bin/chromium. Không install hoặc đổi saved Environment Settings. Dùng checkout đã có, không tạo Git worktree.

```sh
python -m http.server 8785 --bind 127.0.0.1 --directory /workspace/phase11-subject-loader/working/WEB_LIVE_SUBJECT_LOADER_PHASE11_WORKING_COPY
```

Terminal khác, NODE_PATH theo đường dẫn trên: node /workspace/phase11-subject-loader/quick-access-tests.cjs. Runner hỗ trợ P11_ROOT/P11_BASE/P11_EVIDENCE cho fresh artifact. Safeguards runner hỗ trợ P11_ROOT/P11_BASE/P11_SAFEGUARD_OUT. Geometry test input cần đúng unchanged G4-F01 fixture; external helpers chứa path workspace đã chạy, không tuyên bố standalone Windows automated runner. Evidence bundle kèm test inputs cho review, không đưa test fixtures vào candidate mới.

## Helper history

First quick-access attempt chưa hoàn tất zero-error gate vì addInitScript test seed chạy trên blank preview iframe không có localStorage origin. 15 functional groups đã qua nhưng toàn run là FAIL; giữ ATTEMPT01 JSON/log. Chỉ sửa external harness: restrict seed/fault script to Teacher/top + intended origin, assert seeded raw persisted; rerun full suite PASS trên working và packaged. Không sửa application để che harness error.

First Informatics invocation dùng sai env variable prefix, nên default base 8778 thay vì candidate8785; interrupted, giữ wrong-base result/log, không dùng làm regression evidence. Corrected INFORMATICS_BASE/ROOT/EVIDENCE run PASS26. Không disable assertions hoặc overwrite frozen Phase9 result.

WINDOWS_PHYSICAL_RUNTIME = UNRUN
PHYSICAL_TV_VALIDATION = UNRUN
REAL_CLASSROOM_TRIAL = UNRUN

STOP. Chờ GV review.
