# UI V2.4 RC1 — Implementation report

UI_IMPLEMENTATION = PASS (internal Chromium validation)
UI_RC1_CANDIDATE = BLOCKED
PRODUCTION = NO

## Baseline và phạm vi

Input duy nhất: `ThiTracNghiemLAN_v2.3.1_HOTFIX_R4_CANDIDATE.zip`.
SHA-256: `68219167829986f39d025251bf4681d7298e6c652689420d82cfe8a08d130ec2` — MATCH với expected value của GV.
Candidate mới: `ThiTracNghiemLAN_v2.4_UI_RC1_CANDIDATE.zip`; SHA-256: `d9765ac36c954190a63ac56fa55088a8b4e3eed9c9316a87a4246ff6a705b21f`.
Không ghi đè R4. 59 file baseline được giữ đầy đủ; 9 template đổi presentation,
5 file CSS/JS mới; 50 file baseline giữ nguyên byte. Toàn bộ 30 file ngoài
templates/static giữ nguyên, gồm Python backend, scoring, question types,
snapshot, license, công cụ cấp mã, build_exe.bat, requirements và 6 native tests.
Không migration/schema change; không tạo database/license state trong candidate.

## Giao diện đã triển khai

- Shell sidebar cố định 212 px, 8 mục, active state, keyboard focus; Segoe UI/system-ui/Arial.
- Tổng quan: health thật, IP/cổng từ trang system-status R4, chọn kỳ thi và số đếm theo lớp từ monitor API. Form thêm câu hỏi, nhập học sinh, sao lưu, license nằm ở module riêng.
- Giám sát: 6 chỉ số từ API, 8 cột, tìm mã/tên, 5 bộ lọc, sticky header, 50 dòng trong vùng cuộn. Dòng DOM được tái sử dụng; polling 3 giây, không chồng request, bỏ qua lúc tab ẩn. Lỗi đọc API giữ dữ liệu cuối và báo chưa cập nhật.
- Bài thi: giữ toàn bộ input/question DOM, tên field và các hàm `choice`, `save`, `tick`, `ping` nguyên byte. JS chỉ đổi câu visible, đánh dấu xem lại trong sessionStorage theo attempt, cập nhật navigator/ARIA và quan sát trạng thái lưu thực tế. Không tự lưu hoặc sửa giá trị đáp án khi chuyển câu.
- SINGLE radio; MULTI checkbox + hướng dẫn; TF/MATCH hai cột; FILL input rộng. MathJax offline và các helper R4 nguyên byte, kiểm tra đủ 5 loại.
- Modal nộp hiển thị số câu đã trả lời/chưa trả lời và danh sách số câu còn thiếu. Xác nhận gọi native form POST kèm CSRF hiện hành. Timer tự nộp và deadline server không đổi. Thông báo thành công chỉ nằm trên result do server xác nhận.
- Tạo kỳ thi: wizard 4 bước trên `/teacher?view=exams`; giữ availability API, repeated topic fields, ma trận 20 ô và validation R4. Route mixed-exam cũ cũng có 4 bước presentation, server vẫn kiểm tra đủ câu.
- Báo cáo từng kỳ thi: 5 tab, giữ nguyên dữ liệu/công thức/thang điểm/ngưỡng có sẵn; export R4 giữ nguyên. Báo cáo tổng hợp vẫn dùng analytics hiện có và liên kết tới report từng kỳ thi.
- Hệ thống giữ các liên kết đổi mật khẩu, backup, thiết lập/tài khoản/nhật ký theo quyền R4.

## UI_DATA_GAP — không tự tạo dữ liệu

| ID | Dữ liệu thiếu / giới hạn R4 | Presentation an toàn |
|---|---|---|
| G01 | API không đếm session hiện đang đăng nhập | Dùng nhãn “Đã vào thi” = số có attempt; nêu rõ không phải số phiên đăng nhập |
| G02 | Monitor API không trả started_at/submitted_at | Hai cột thời gian ghi “Chưa có dữ liệu”; không suy từ last_seen |
| G03 | Không có trạng thái lỗi máy con ngoài trạng thái monitor hiện có | Hiển thị đúng R4; mất kết nối có text/⚠, lỗi API có banner; không giả lập lỗi từng máy |
| G04 | MO là mở nhận bài, không phải lịch start/end thực tế | Dashboard ghi “Kỳ thi đang mở”, không tuyên bố kỳ thi đang diễn ra theo lịch |
| G05 | R4 không có route clone exam | NOT_SUPPORTED_IN_R4; không thêm chức năng. Clone question hiện có đã được kiểm |
| G06 | Không có phân loại Giỏi/Khá/TB/Yếu mới | Giữ ngưỡng >=5/>=8 và bands của R4, không phát minh rule |

BACKEND_CHANGE_REQUEST = NONE_IMPLEMENTED. Các gap được để an toàn theo chỉ thị;
không sửa backend để bổ sung dữ liệu. Không đổi license, machine identity hoặc quyền truy cập.

## Evidence và giới hạn

Chromium thật `/usr/bin/chromium`, Playwright, Linux, runtime sao chép vào thư mục
tạm. 28 nhóm kiểm tra cuối PASS; mapping UI01–UI28 và 5 screenshot nằm trong
`UI_V2_4_TEST_EVIDENCE/ui/`. Đã kiểm teacher dashboard/exams/monitor/report/mixed-exam
ở 1366x768 và 1920x1080; student với 10/20/30/40/50/60 câu; không horizontal overflow
ở fixture bình thường. Nút Nộp bài và timer thấy được ở 1366x768.
Ảnh dùng học sinh/câu hỏi fixture, không phải lớp học thực tế.

HOST_WINDOWS_RUNTIME = NOT_RUN; PHYSICAL_50_PC = NOT_RUN.
Không build EXE, không Production. Release gate BLOCKED vì các test legacy nguyên bản
chưa PASS; xem regression/defect report. Không tạo RC2.

## File thay đổi/thêm

- `PHAN_MEM/templates/base.html`
- `PHAN_MEM/templates/exam.html`
- `PHAN_MEM/templates/mixed_exam.html`
- `PHAN_MEM/templates/monitor.html`
- `PHAN_MEM/templates/multi_bank.html`
- `PHAN_MEM/templates/report.html`
- `PHAN_MEM/templates/result.html`
- `PHAN_MEM/templates/system_status.html`
- `PHAN_MEM/templates/teacher.html`
- `PHAN_MEM/static/css/ui-v24.css`
- `PHAN_MEM/static/js/exam-ui.js`
- `PHAN_MEM/static/js/monitor-ui.js`
- `PHAN_MEM/static/js/simple-wizard.js`
- `PHAN_MEM/static/js/ui-shell.js`
