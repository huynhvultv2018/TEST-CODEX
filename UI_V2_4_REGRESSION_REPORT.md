# UI V2.4 RC1 — Regression report

REGRESSION = BLOCKED (literal all-existing-tests-PASS gate not satisfied)
R4_FUNCTIONAL_LOCK = PASS (internal tests and exact source integrity)
UI_IMPLEMENTATION = PASS
50_CLIENT_SIMULATION = PASS
60_CLIENT_HEADROOM = PASS
WINDOWS_RUNTIME = NOT_RUN
PHYSICAL_50_PC = NOT_RUN
PRODUCTION = NO
UI_RC1_CANDIDATE = BLOCKED

## Native tests: đúng thứ tự build_exe.bat, standalone

| Script | Nguyên bản trong candidate | Bản sao validation + test-only patch đã duyệt |
|---|---|---|
| kiem_tra_v22.py | FAIL | PASS |
| kiem_tra_v221.py | FAIL | PASS |
| kiem_tra_mathjax.py | PASS | PASS |
| kiem_tra_v222.py | FAIL | PASS |
| kiem_tra_v23.py | PASS | PASS |
| kiem_tra_v23_integration.py | FAIL | PASS |

4 FAIL nguyên bản tái hiện cả trên ZIP R4 không sửa: các POST legacy thiếu nonce CSRF.
`TEST_SETUP_INCOMPLETE`, không chứng minh regression runtime UI. Không đổi source test
trong candidate. Validation bổ sung chỉ overlay 4 script test-only đã được GV duyệt
trước đây trong một bản sao tạm: cả 6 chạy độc lập bằng `python script.py`, không
sitecustomize, không transport adapter bên ngoài, không disable/exempt CSRF.
Thử nghiệm bổ sung không được dùng để đổi trạng thái 4 FAIL gốc thành PASS.
Log trước/sau ở native/ và native-final/; các file test trong ZIP vẫn hash giống R4.

## R1–R4 và kiểm tra dữ liệu

| Suite | Kết quả | Evidence / giới hạn |
|---|---|---|
| R1 | 18/18 PASS | Deadline POST/GET; boundary; wait-under-lock; 8-submit race; autosave/submitted; rollback; ALL/PARTIAL/weights; comma-topic 20 ô; backward compatibility |
| R2 | 15/15 PASS | availability type/level fallback; token/result isolation; unlock/retake; queued requests; legacy editor validation |
| R3 | 12 PASS / 3 FAIL | Tất cả 15 trạng thái giống R4 baseline; xem r3-baseline-comparison.json |
| R4 final | 7/7 PASS | 344 scoring cases; malformed rules/snapshot controlled rejection; restore semantics; all 35 CSRF routes; historical HTML/Excel |
| Browser UI | 28/28 nhóm PASS | Genuine form/header CSRF, login rotation, autosave/reload/submit/result, offline failed state, 5 types/MathJax, wizard comma roundtrip |
| Native HTTP security smoke | PASS | 35 route × 5 CSRF-negative variants = 175 rejections; DB unchanged; Excel/import, backup/restore, history, unlock |
| 50 primary/mixed/deadline | PASS | 40 câu × 5 types × 4 levels; no answer/score mismatch, lost submission or contamination |
| HTTP race/retry | PASS | 8 parallel submits, single consistent winner; timeout retry; late save/submit rejected correctly |
| 60 headroom | PASS | 60 independent cookie sessions, 40 câu mỗi bài, 0 score mismatch |

R1–R3 harness có trước F011. Bản harness sao chép độc lập thương lượng nonce thật từ
application/session cho positive POST; không monkeypatch CSRF, không đổi assertion.
AST của toàn bộ assertion giống nguyên bản (provenance ghi hash/count). Instrumentation
lock/clock/rollback có sẵn trong harness R1/R2 chỉ chạy trên runtime/database fixture.
CSRF negative cases dùng raw clients riêng, không được thêm nonce giúp PASS.

3 FAIL R3 không được bỏ qua: hai case kỳ vọng flash còn trong session sau khi template
đã tiêu thụ flash (`mixed-exam`); một case kỳ vọng dữ liệu câu hỏi hiện tại trong Excel
trái contract snapshot lịch sử F012. Cả ba FAIL giống baseline R4; không sửa expected
test. R4 harness kiểm độc lập rằng report/Excel giữ đúng snapshot và text/numeric.
Yêu cầu regression “clone exam” = NOT_SUPPORTED_IN_R4; clone question 4 lớp × 5 types
× 2 modes PASS. Không thêm chức năng clone exam.

## Load evidence

50-scope: 8.408 HTTP requests, 0 failed unexpected, 0 HTTP 500; 82 rejection dự kiến.
1 read timeout được chủ động đặt 0,0005 giây để kiểm retry; ghi riêng là planned timeout.
60-scope: 2.760 HTTP requests, 0 failed, 0 HTTP 500, 0 timeout.
Peak = 60 request đồng thời. CPU/RSS được đo; đây là HTTP simulation trên cloud Linux,
không thay cho Windows native hoặc phòng máy 50 PC vật lý. Xem requests/metrics,
submit burst, final-answer-score-comparison, deadline, reconnect và resource samples.

LAN harness dùng entry point app.py/Waitress nguyên bản trong clone riêng, không UI
adapter. Oracle độc lập giữ thứ tự binary-float/Decimal của scoring v2.3; không đổi
scoring để khớp oracle rational khác. Hàm/tệp oracle có provenance trong HARNESS.

## UI01–UI28

| Case | Status | Browser check |
|---|---|---|
| UI01 | PASS | `UI01_UI02_SIDEBAR_ACTIVE` |
| UI02 | PASS | `UI01_UI02_SIDEBAR_ACTIVE` |
| UI03 | PASS | `UI03_TEACHER_1366` |
| UI04 | PASS | `UI04_TEACHER_1920` |
| UI05 | PASS | `UI05_STUDENT_1366` |
| UI06 | PASS | `UI06_STUDENT_1920` |
| UI07 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI08 | PASS | `UI08_UI19_ANSWERED_AND_AUTOSAVE` |
| UI09 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI10 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI11 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI12 | PASS | `UI07_UI09_UI10_UI11_UI12_NAVIGATOR` |
| UI13 | PASS | `UI13_SINGLE` |
| UI14 | PASS | `UI14_MULTI` |
| UI15 | PASS | `UI15_TF` |
| UI16 | PASS | `UI16_MATCH` |
| UI17 | PASS | `UI17_FILL` |
| UI18 | PASS | `UI18_MATHJAX` |
| UI19 | PASS | `UI08_UI19_ANSWERED_AND_AUTOSAVE` |
| UI20 | PASS | `UI20_UI21_SUBMIT_MODAL_WARNING` |
| UI21 | PASS | `UI20_UI21_SUBMIT_MODAL_WARNING` |
| UI22 | PASS | `UI22_SUCCESSFUL_SUBMIT` |
| UI23 | PASS | `UI23_MONITOR_50_ROWS` |
| UI24 | PASS | `UI24_REPORT_TABS` |
| UI25 | PASS | `UI07_UI25_10_TO_60_QUESTIONS` |
| UI26 | PASS | `UI26_KEYBOARD_FOCUS` |
| UI27 | PASS | `UI27_CSRF_NEW_UI` |
| UI28 | PASS | `UI28_REFRESH_RESUME` |

## Lịch sử validation giữ nguyên

- UI first run phát hiện nút submit quá thấp ở 1366 và selector checkbox chưa scoped;
  sửa presentation CSS và stimulus test tương ứng. Log/ảnh first run vẫn giữ.
- Offline probe trước đó giả định câu 0 là SINGLE hoặc check lại radio đã checked;
  R4 shuffle khiến probe không phát sinh change. Final harness tìm SINGLE theo snapshot,
  chọn radio khác, giữ nguyên assertion failed/saved và cleanup offline bằng finally.
- LAN first run hoàn tất mọi functional assertion nhưng lỗi ghi summary chứa Client
  object; chỉnh serializer harness, giữ raw first-run evidence và chạy lại full suite.
- Không sửa assertion chức năng cũ; không bỏ case FAIL; không dựng screenshot hoặc số liệu.

## Release gate

Không phát hiện regression mới của UI/core trong scope đã chạy. Tuy nhiên điều kiện
“toàn bộ test hiện có PASS” không đạt ở 4 native tests và 3 stale R3 assertions.
Không được gọi UI_RC1_CANDIDATE = PASS. Giữ BLOCKED và dừng ở candidate, chờ GV quyết định.
