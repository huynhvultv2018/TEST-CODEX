# HOTFIX R1 — Changelog

Candidate riêng; baseline, RC2 và ZIP RC2 giữ nguyên. Chỉ **WEB_LIVE/tts-teacher.js** đổi runtime.

- Xóa con trỏ TV popup đã đóng một lần, tránh xóa registry preview ở mọi refresh sau đó.
- Giữ registry shared preview đã nhận; yêu cầu sync lại khi nguồn TV đóng để preview gửi registry hiện tại. Gộp yêu cầu bằng requestAnimationFrame, không tạo controller/listener mới.
- Giữ guard context khi Teacher khác đang điều khiển TV.

Không đổi TTSController/Web Speech provider, MathSpeech, selector/settings, lesson content, state schema, CSS, subject renderers, pedagogy, DemoTeacher, Launcher hoặc START_WEB_LIVE. Demo/Launcher chưa xác định source defect; không có patch cho hai subsystem này.

Thêm HOTFIX_R1_TESTS, HOTFIX_R1_EVIDENCE, các báo cáo và manifest mới. Các script native không giả voice, app status, HTTP success hoặc confirmation. Test presentation có fixtures được ghi rõ, không phải bài học thật.

Chi tiết diff: HOTFIX_R1_EVIDENCE/TTS_ADAPTER_PATCH.diff. RCA được tạo trước khi sửa runtime. PRODUCTION READY = NO: audio/Windows còn UNRUN.
