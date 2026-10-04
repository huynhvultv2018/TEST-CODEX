# WEB LIVE GEOMETRY — PHASE4 CANDIDATE, G4-F03 ONLY

Candidate này sửa duy nhất Geometry Focus: các bước đã reveal vẫn thấy, bước hiện tại được nhấn mạnh, nội dung chưa reveal vẫn ẩn. G4-F03 targeted và regression bắt buộc PASS theo gate GV đã duyệt. Core/Production/Phase3 không đổi.

- [Tải candidate ZIP](WEB_LIVE_GEOMETRY_PHASE4_CANDIDATE.zip) — SHA256 `9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e`.
- [Báo cáo đầy đủ](GEOMETRY_PHASE4_G4F03_REPORT.md), [final status](FINAL_STATUS.txt), [checksums](CHECKSUMS_SHA256.txt).
- [Raw evidence ZIP](G4_F03_PATCH_VALIDATION_EVIDENCE.zip), [patch hai khai báo](G4_F03_ONLY.patch), [manifest payload mới](PHASE4_PAYLOAD_MANIFEST.json).
- [Approved G4-F01 patched lesson fixture](HINH8_VD2_GEOMETRY_PROFILE_TEST_G4F01_PATCHED.zip) được giao riêng, nguyên byte, không patch thêm.

Giải nén candidate vào thư mục mới và giữ bản Phase3 riêng. Launcher `START_WEB_LIVE.bat` được giữ nguyên; Windows/physical TV/audible TTS/classroom trial UNRUN. Khi bỏ active Focus, dùng **XÓA TẬP TRUNG**; nút Focus giữ chức năng bật/tắt chọn vùng như Core hiện có.

REAL_FILE_VALIDATION = NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL = UNRUN. Waive không phải PASS. G4-F02/G4-F04 DEFER; G4-F05 VALIDATION_PENDING. Lỗi zoom G4-F02 vẫn tồn tại và được giữ trong raw results. Không khẳng định trial lớp thật hoặc kiểm tra file Tiết09/Tiết10.

Chỉ một file payload đổi: `WEB_LIVE/geometry-profile.css`. 1.226 file còn lại nguyên byte. Báo cáo/checksums Phase3 bên trong payload là lịch sử; dùng manifest và báo cáo Phase4 bên ngoài ZIP. Bundled original Phase3 lesson fixture cũng giữ nguyên; auxiliary Geometry regression chạy với approved G4-F01 fixture giao riêng.

Cloud start instructions draft đã lưu; review/save trong environment settings rồi Publish để áp dụng. Chưa kiểm chứng fresh-task restoration.

STOP — chờ GV review. Không Production, không bắt đầu Algebra.
