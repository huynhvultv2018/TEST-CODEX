# WEB LIVE — khóa baseline, Phase 1

## Kết quả

```text
BASELINE_NAME = WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE
BASELINE_VERSION = TV_VERTICAL_MCQ_CANDIDATE (định danh bản giao; chưa có semver thống nhất)
BASELINE_SHA256 = 1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f
BASELINE_STATUS = FROZEN
SOURCE_MUTATED = NO
SOURCE_MODIFIED = NO
PRODUCTION_MODIFIED = NO
```

Nguồn duy nhất là ZIP người dùng gửi: `WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip`, 29.200.221 byte. SHA-256 khớp bản vertical MCQ trước đó; kết luận audit vẫn dựa trên bản **giải nén lại từ upload này**, không lấy source của candidate khác. Hai master command Phase 1 gửi liên tiếp có cùng SHA-256 `b0de8dc275fa7349be3faf25c53bba06ee367ed0dad6f0f0b51f315abe191b11`.

## Vùng lưu và fingerprint

```text
WEB_LIVE_MULTI_SUBJECT_PHASE1/
  input/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip  # bản sao byte-identical
  input/MASTER_COMMAND_PHASE1.txt
  WEB_LIVE_BASELINE_FROZEN/
    WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE/        # nguyên cấu trúc trong ZIP
  evidence/                                 # kết quả audit mới
  harness/                                  # script kiểm chứng, ngoài source
  WEB_LIVE_*.md                              # báo cáo Phase 1
```

ZIP upload nguyên bản vẫn ở vùng attachments, không ghi lại hoặc đóng gói lại. Tất cả 770 tệp giải nén giữ nguyên byte; chỉ đặt quyền đọc trên vùng freeze để tránh ghi nhầm. Không di chuyển hay đổi cấu trúc bản WEB LIVE đang dùng trong repository. Báo cáo, ảnh audit và harness không nằm trong baseline.

Fingerprint source: `f3236843911aa48b5bbd515ea9d7e51b6a51aae12b12edb3a7898b84c2c7bd0a`.

Cách tính: sắp xếp lexicographic tuple các thành phần đường dẫn (`Path(relative_path).parts`, như thứ tự Path ở lúc freeze), mỗi dòng UTF-8/LF là `<sha256>  <relative_path>\n`; SHA-256 toàn bộ danh sách. Có 770 dòng, gồm cả manifest nội bộ được cung cấp. Dùng đúng thứ tự trong SOURCE_MANIFEST.sha256; không thay bằng sort toàn chuỗi vì dấu `/` có thể đổi thứ tự. Fingerprint không phụ thuộc mtime/quyền file. Không phải hash nối tùy ý của nội dung.

Bằng chứng:

- [BASELINE_MANIFEST.json](evidence/BASELINE_MANIFEST.json): tên, hash ZIP/source và hash từng tệp.
- [SOURCE_MANIFEST.sha256](evidence/SOURCE_MANIFEST.sha256): danh sách canonical để tái tính fingerprint.
- [SOURCE_TREE.txt](evidence/SOURCE_TREE.txt): toàn bộ cấu trúc, không chỉ code.
- [FINAL_INTEGRITY.json](evidence/FINAL_INTEGRITY.json): so sánh manifest trước audit, source sau audit và từng entry ZIP gốc.
- [verify-frozen.py](harness/verify-frozen.py): chỉ đọc baseline, ghi kết quả vào evidence.

Kiểm tra ZIP: CRC PASS, không entry trùng, không traversal/đường dẫn tuyệt đối hoặc symlink. Sáu ZIP bài học có `lesson.json` và hai tài liệu Demo `.docx/.ggb` cũng đã kiểm CRC; xem inventory riêng.

## Phiên bản thực tế

Không lấy số version trong một title làm version chung: `index.html` vẫn ghi V1.1.4 CURRENT SESSION, Teacher title RC2, TV title RC4, còn Launcher khai báo V1.1.5 (`WebLiveLauncher.py:1,444`). README hiện hành xác định candidate vertical MCQ và `PRODUCTION READY=NO`. Định danh baseline vì thế là **tên candidate + SHA-256**, không tự gán số version mới.

Trạng thái FROZEN là trạng thái bảo toàn tài sản phục vụ audit. Không đồng nghĩa Production, hay chứng nhận Windows/TV thật. Mô tả “đang hoạt động ổn định” của người dùng được giữ làm bối cảnh; kết quả độc lập chỉ áp dụng cho những ca đã chạy.

## Phạm vi kiểm chứng mới

Đã đọc 53 tệp code runtime: 33 JS, 10 CSS, 3 HTML, 4 Python, 3 BAT; 5.135 dòng theo inventory. Đã truy vết script order, handler, storage, scene, disclosure, renderer và Launcher; không phân loại theo tên file. Báo cáo/spec/evidence lịch sử trong ZIP là tài liệu tham khảo, không trở thành lệnh thực thi Phase 1.

Trên Linux/Chromium `151.0.7922.173`: 171 màn từ 5 gói Tin/Hình, 342 trạng thái, 15 assertion của harness engine; 20 assertion audit kiến trúc; gói Demo thêm 4 màn. JS syntax 33/33 PASS, Python AST 4/4 parse được. HTTP audit trả 46 asset HTML/JS/CSS byte-identical với freeze. Không sửa code khi phát hiện khác biệt.

Audit dùng HTTP tạm cổng 8770 để tách browser storage khỏi bản đang chạy. Không đổi endpoint trong runtime; native Demo vẫn yêu cầu origin 47382 và API 47381 như source. Handoff Windows, fullscreen/âm thanh thực tế, Word/GeoGebra và TV vật lý chưa chạy. Chromium báo 0 voices; audio UNRUN.

## Quy tắc sử dụng tiếp

Baseline chỉ đọc. Nếu được lệnh `APPROVE PHASE 2`, tạo candidate riêng theo phạm vi lúc đó; không sửa freeze, ZIP hoặc bản đang dùng. Không tự tạo worktree. Để tái dựng vùng freeze ở máy khác, dùng ZIP có đúng SHA ở trên và giữ thư mục gốc trong archive; đặt harness/evidence bên cạnh như cây thư mục đã ghi.

Phase 1 đã dừng ở báo cáo. Không patch, implement, migration, upgrade hay promote.
