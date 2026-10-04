# HOTFIX R2 — Changelog

R2 là copy riêng của R1, không ghi đè R1/ZIP R1. Runtime chỉ đổi **WEB_LIVE/teacher.js: hideImporter()**:

```diff
-function hideImporter(){if(lesson)$('importer').style.display='none'}
+function hideImporter(){$('importer').style.display='none'}
```

Nút ĐÓNG giờ ẩn modal/overlay ngay cả trước khi chọn bài. Cùng node có thể mở lại bằng nút thư viện. Giữ nguyên DOM/onclick/IDs/CSS, import actions, lesson lifecycle và Esc contract baseline (không đóng importer).

Không đổi cockpit, TV, pedagogy, engines, lesson, TTS R1, Demo, Launcher hoặc Chrome Start. Thêm HOTFIX_R2_TESTS, HOTFIX_R2_EVIDENCE và báo cáo/checksum cho R2. Các báo cáo/evidence/checksum cũ kế thừa từ R1 là lịch sử; manifest R2 có hiệu lực cho R2.
