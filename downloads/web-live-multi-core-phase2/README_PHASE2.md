# WEB LIVE MULTI CORE — PHASE 2 CANDIDATE

Phase 2: **PASS**, với backward compatibility **CONTROLLED_RISK**. Đây là candidate để GV kiểm tra, chưa phải Production. Dừng tại Phase 2; chưa triển khai Geometry/Algebra/Informatics mới.

Baseline duy nhất: `TV_VERTICAL_MCQ_CANDIDATE`, SHA256 ZIP `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`. Baseline và 770 file gốc được giữ nguyên tại nơi đóng băng. Candidate này chỉ sửa sáu file runtime và thêm `WEB_LIVE/core-profiles.js`.

Mở bằng quy trình Windows hiện có của baseline, hoặc chạy HTTP tại thư mục này rồi vào `WEB_LIVE/teacher.html`. Launcher/BAT/config và các gói bài học giữ nguyên byte. Windows/TV vật lý/âm thanh thực/Word/GeoGebra vẫn cần acceptance trên máy đích.

Đọc năm báo cáo `WEB_LIVE_*REPORT.md` dành cho Phase 2 và `WEB_LIVE_PHASE2_TEST_EVIDENCE/`. Các báo cáo, checksum và evidence đời trước được giữ để truy vết, không đại diện cho kết quả Phase 2. Checksum hiện hành: **PHASE2_CHECKSUMS_SHA256.txt**; hash ZIP nằm trong file `.sha256.txt` cạnh ZIP tải về.

Metadata optional ở cấp lesson:

```json
{"subject_engine":"geometry"}
```

Bốn ID: `legacy`, `geometry`, `algebra`, `informatics`. Thiếu/empty/invalid/unknown → Legacy, giữ cách render bài cũ. Ba profile môn học là stub, dùng presentation adapter đã có. MCQ trên TV luôn giữ các option dọc, từng hàng full width; instruction tách khỏi option.

Chạy lại kiểm thử theo [WEB_LIVE_PHASE2_TESTS/README.md](WEB_LIVE_PHASE2_TESTS/README.md).
