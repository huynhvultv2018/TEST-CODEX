# Geometry TV/PC classroom validation

Native Linux Chromium 151.0.7922.173, actual Teacher window.open TV, native events/localStorage/BroadcastChannel; no fake renderer or speech mocks. Teacher viewport 1366×768; TV equivalents 1280×720, 1366×768, 1920×1080, 3840×2160, DPR=1. Windows runtime, TV vật lý, HS cuối lớp, actual GV 45 phút và audible TTS **UNRUN**.

## TV readability

24 cases: authored GT/KL / real 4-step analysis / real 2-step proof × 70/30 và 60/40 × 4 sizes. Có 140 additional states của mọi 35 screens, hidden/full ở 1366×768 và 1280×720. Không chèn nội dung giả hoặc dùng browser zoom. Không text-pane overflow/horizontal overflow; student TV không có Geometry teacher controls. Highlight SVG và raster bounding boxes khớp trong 2 px. Native GT/KL contrast 13.56:1.

| Viewport | Visible GT/analysis/proof fonts trong VD2 matrix | Overflow cases |
|---|---|---|
| 1280×720 | 23.65–33.92 px | 0 |
| 1366×768 | 25.24–36.20 px | 0 |
| 1920×1080 | 35.48–50.88 px | 0 |
| 3840×2160 | 42.00–52.00 px | 0 |

Font range trên gồm analysis lines được giảm nhấn mạnh; toàn lesson ở 720/768 có substantive text tối thiểu 28 px, title có thể 22.4 px. Chữ không wrap từng ký tự. GT/KL ở 70/30 xuống dòng nhiều hơn 60/40 nhưng không clip. 4K cap 42–52 px tương đương 21–26 px ở chiều cao 1080, hình chiếm nhiều diện tích và text tương đối nhỏ (G4-F04). **FIT=PASS; READABILITY cuối lớp chưa chứng nhận**, đặc biệt 4K và display scaling máy đích.

## Các mode phù hợp để GV review

| Hoạt động | Mode đề nghị theo captures | Lý do / hạn chế |
|---|---|---|
| Quan sát hình | Full figure hoặc 70/30 | Hình lớn; full figure ẩn text nhưng giữ proof/highlight state |
| GT/KL | 60/40 | Ít xuống dòng hơn ở 720p; 70/30 vẫn fit |
| Phân tích | 60/40 | 4 analysis steps có chỗ; 70/30 phù hợp nếu GV ưu tiên hình |
| Chứng minh | 60/40 | Đọc current step và objects dễ hơn; previous proof bị ẩn |
| Chốt VD2 | 60/40 / 70/30 | Tùy cần đọc kết luận hay nhìn cạnh; không suy rộng tới exercise bị sai hình |

Đây là recommendation từ equivalent captures; chưa phải preference GV đã xác nhận.

## State và thao tác

70/30 → 60/40 → full → return giữ base SHA, answerStep và object IDs. UI transitions chờ đồng bộ/rAF có median 180 ms, max 249 ms trong automation; không phải phép đo thời gian thao tác/search của người.

Zoom 1 → 1.15 → return giữ proof/object/base. Navigation screen 10 → 11 cùng VD2 đặt zoom 1.15 → 1 (G4-F02); annotation/base giữ. Highlight thay đúng theo bước hiện hành; không coi đổi highlight giữa các proof khác nhau là lỗi mất state. Focus chọn bước 1 đã mở vẫn answerStep=2 nhưng bước 2 display:none (G4-F03), làm mất ngữ cảnh nhìn đồng thời.

MARK, DRAW segment, point, LABEL P, ERASE, UNDO, REDO và CLEAR ANNOTATION đã thao tác native. Clear giữ base SHA. VD2→LT2 tách scope; LT2 annotation không leak sang TT2 dù **ảnh hiển thị TT2 bị sai độc lập**. Undo/redo mới của Phase 4 cho thao tác erase; point drag của Phase 3 là historical, không giả thành test mới.

## Operability và interruptions

CLICK_COUNT=5, KEYPRESS_COUNT=83, MODE_CHANGE_COUNT=0, UNNECESSARY_ACTION_COUNT=0 trên baseline full walk. 1 click focus page là setup; 4 clicks mở analysis, 34 keys Next, 49 keys reveal. Excludes import/Open TV và diagnostic tool path. Không đo mouse distance/human search; zero unnecessary actions trên trace không chứng nhận mọi GV có flow tối ưu.

Công cụ mở bằng outer Classroom details rồi inner Tools details (2 clicks); Focus/drawing mở Annotation Editor. Label dùng prompt; clear cần confirm. Các thao tác chủ động này thuộc diagnostic flow, không lẫn với baseline counts.

| Điểm dừng | Mức | Hệ quả |
|---|---|---|
| TT2/VD3/LT3/VDU hiện hình LT2 | BLOCKING | Phải dừng; tiếp tục dạy sẽ dùng hình sai |
| So sánh hai proof steps khi Focus | DISRUPTIVE | Cần đổi disclosure/Focus để lấy lại ngữ cảnh |
| Chuyển screen cùng hình đang zoom | MINOR | Muốn giữ zoom phải thao tác lại |
| Metadata authoring cho original packet | DISRUPTIVE trước giờ dạy | Không có end-to-end producer được xác minh; không phải chỉnh data lúc import |
| Mode/annotation controls hoạt động | NONE về runtime defect trong flow đã thử | Native test đạt; click/confirm là thao tác chủ đích |

**TEACHER_OPERABILITY=PARTIAL; CLASSROOM_READINESS=NOT_READY_FOR_WHOLE_LESSON.** Chưa dạy thật 45 phút; automated duration không được dùng làm thời lượng sư phạm.
