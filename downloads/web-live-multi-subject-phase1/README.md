# WEB LIVE MULTI-SUBJECT — bàn giao Phase 1

**Đã hoàn tất freeze/audit/design. Source và Production giữ nguyên. Chưa implement CORE/profile mới; chưa sang Phase 2.**

Gói bàn giao này chứa bảy báo cáo bắt buộc, manifest/hash/evidence mới, harness audit và **ZIP source gốc byte-identical** trong `input/`. Nó không phải runtime candidate mới và không nâng version.

Đọc theo thứ tự:

1. [Baseline freeze](WEB_LIVE_BASELINE_FREEZE_REPORT.md): tên/version/hash và tính bất biến.
2. [Architecture audit](WEB_LIVE_ARCHITECTURE_AUDIT.md): source/runtime/dependencies, gaps có bằng chứng.
3. [Component classification](WEB_LIVE_COMPONENT_CLASSIFICATION.md): A/B/C/D, dependency và mixed files.
4. [Multi-subject design](WEB_LIVE_MULTI_SUBJECT_DESIGN.md): một CORE, ba profile, Geometry ưu tiên, legacy adapter.
5. [Backward compatibility](WEB_LIVE_BACKWARD_COMPATIBILITY_PLAN.md): không đóng lại gói cũ, giữ state/storage/scene/Demo.
6. [Regression plan](WEB_LIVE_REGRESSION_PLAN.md): matrix bốn nhóm và native gates.
7. [Phase 2 scope](WEB_LIVE_PHASE2_IMPLEMENTATION_PLAN.md): boundary/interface, acceptance và điểm dừng.

Kết luận: CORE extraction `PARTIAL` vì còn globals/scene/policy coupling; thiết kế ba profile đều `YES`; backward compatibility đích `RISK`. `subject_engine` chưa có consumer hiện hành; stage Teacher/TV lệch với explicit Geometry + nhãn môn chung; chưa MathJax và chưa package Đại số thật. Các phát hiện chỉ ghi nhận, không tự sửa.

Kiểm chứng mới: 171 màn/342 trạng thái từ 5 gói Tin/Hình, Demo 4 màn, 15 engine assertions +20 architecture assertions PASS,0 page errors. Các assertion gap xác nhận phát hiện tái hiện đúng, không nghĩa đã sửa gap. Chromium151/Linux; native Windows/TV/apps/audio chưa chạy, voices0. Không gọi Production PASS.

## Tái dựng freeze trên máy khác

Ở workspace audit hiện tại, thư mục `WEB_LIVE_BASELINE_FROZEN/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE` đã tồn tại và 770 tệp khớp ZIP sau audit. Bundle tải xuống không lặp lại toàn bộ bản giải nén để tránh nhân đôi source; vẫn mang đúng ZIP gốc để tái dựng:

1. Kiểm SHA-256 `input/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip` phải là `1ccce4f35bf807e498bdf13ca3275e660faa7b50842298ffdeb825e8a3ed917f`.
2. Tạo `WEB_LIVE_BASELINE_FROZEN` bên cạnh `evidence/harness`, giải nén ZIP vào đó, giữ thư mục gốc trong archive. Không giải nén đè bản đang dùng.
3. Chạy `python3 -B harness/verify-frozen.py`: so manifest trước audit/770 file sau/ZIP và fingerprint. Script chỉ đọc source; output ở evidence. Đặt vùng freeze read-only nếu cần.
4. Audit runtime là tùy chọn để tái kiểm; cách chạy và requirements trong regression plan. Trên Windows máy GV không chạy harness Linux với claim native acceptance; kiểm native theo matrix riêng khi candidate phase sau được duyệt.

Baseline gốc cũng có [link GitHub đã bàn giao](https://github.com/huynhvultv2018/TEST-CODEX/raw/refs/heads/codex/web-live-tv-vertical-mcq-download/downloads/tv-vertical-mcq/WEB_LIVE_TV_VERTICAL_MCQ_CANDIDATE.zip), cùng SHA ở trên. Bản `input/` trong bundle này đủ để kiểm độc lập, không cần dựa link mutable.

[PHASE1_FINAL_STATUS.json](PHASE1_FINAL_STATUS.json) ghi toàn bộ field kết thúc master command; [FINAL_INTEGRITY](evidence/FINAL_INTEGRITY.json) xác nhận không thêm/xóa/đổi tệp baseline. `CHECKSUMS_PHASE1_SHA256.txt` chỉ là manifest **artifact báo cáo**, không thay manifest bên trong source gốc.

Gate tiếp theo của chính master command: GV đọc báo cáo rồi ra lệnh **APPROVE PHASE 2** nếu muốn. Không implement/patch/promote trước lệnh đó.
