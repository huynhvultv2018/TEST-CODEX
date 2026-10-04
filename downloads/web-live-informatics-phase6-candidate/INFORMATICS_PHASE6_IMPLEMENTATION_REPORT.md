# INFORMATICS_PHASE6_IMPLEMENTATION_REPORT

Phase6 Informatics Profile đã được triển khai theo AUTHORIZE_PHASE6.txt, PASS targeted/global regression và fresh-package validation. Không cần thay Core. Không Production, không merge profile, không chuyển phase tiếp theo.

## Frozen baselines

Geometry Phase4 FROZEN: `9974d9fb4d4e4db023846c0ee42258b3fd193acfe37bd63b8fe6c7d2ee5f9b8e`, 1.227 file khớp ZIP/manifest trước và sau. Algebra Phase5 FROZEN: `575b466dc839d54c6ad91327bc5a7454ece42cbacfd69ae916eca4aa1bcaf01d`, 1.233 file khớp ZIP/manifest trước và sau. Không sửa baseline JS/CSS/contract/fixture/candidate ZIP. G4-F01 TARGETED_PASS; G4-F02 OPEN_DEFERRED P3; G4-F03 FIXED; G4-F04 OPEN_DEFERRED P3; G4-F05 VALIDATION_PENDING. REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL=UNRUN.

## Phạm vi và kiến trúc

Bản làm việc riêng `working/WEB_LIVE_INFORMATICS_PHASE6_WORKING_COPY` sao chép từ Algebra Phase5 frozen. Chỉ thay một file payload đã có: `WEB_LIVE/tv-layout-computer.js`. Giữ nguyên 538 byte `TVComputerEngine` cũ, thêm `WebLiveInformatics` đăng ký `WebLiveProfiles.registerAdapter('informatics', {presentation})` và onDispose. 1.232 file Phase5 khác giữ nguyên byte. Sáu file thêm gồm CSS riêng, ba media kiểm thử cục bộ, JSON test nhỏ và README. Tổng payload 1.239 file; xem SOURCE_SCOPE.json và INFORMATICS_PHASE6_RUNTIME.patch.

Không sửa Core registry, common, importer, lesson state, navigation, native reveal/hint/answer, sync/storage, HTML, shared CSS/math/TTS, launcher, Geometry/Algebra. Không tạo engine Tin học độc lập hoặc duplicate Core. Core descriptor REGISTERED_STUB là metadata scaffold Phase2 bất biến, không gate dispatch. Actual runtime API `WebLiveInformatics.status=IMPLEMENTED` cùng adapter/getState được kiểm chứng. Không sửa Core chỉ để đổi label.

Native `tv.html?preview=1` iframe đã tải file computer adapter; adapter preview gắn Teacher controls riêng vào Teacher DOM cùng origin, không sửa Teacher HTML/JS. UI có XÁC NHẬN CHECKPOINT và HIỆN/ẨN SẢN PHẨM MẪU; teacher note/demo note/control note chỉ ở Teacher. onDispose tháo panel; stale detached button được chặn theo context.

## Hành vi đã triển khai

Chín nhãn activity tùy chọn từ dữ liệu: TÒ MÒ, QUAN SÁT, SUY NGHĨ, DỰ ĐOÁN, TRAO ĐỔI, PHÁT HIỆN, GV CHUẨN HÓA, KIỂM TRA HIỂU, VẬN DỤNG. Không ép đủ chuỗi; thiếu metadata giữ native content. Không sinh kiến thức/code/lesson/pedagogy.

Activity có task/instruction/action/response/checkpoint/result/self-check/conclusion/resource khi nguồn cung cấp. Native steps là chuỗi giữ Core contract; metadata bổ sung chỉ mount khi explicit afterStep đã được reveal. Code là textContent, giữ nguyên newline/indentation, không chạy hoặc sửa code. Code và algorithm highlight/Focus dùng native current step và mapping source-authored. Algorithm hỗ trợ input/process/output/sequence/branch/loop; table giữ semantic header/rows/cells. Media local/data image, video có controls và không autoplay; GIF/ảnh/screenshot/diagram giữ aspect ratio, không che task. Không chạy exe hoặc phụ thuộc Local Launcher.

Expected product, supplied student product và sample product tách nhau. Sản phẩm là snapshot text từ lesson, không tự thu thập/sinh sản phẩm. Sample mặc định hidden; cần native checkpointStep đạt, GV xác nhận checkpoint và GV reveal sample riêng. Full Answer/Hints/Focus không reveal sample. Comparison cần source-authored afterStep và sample đã được GV reveal. Hide/below-checkpoint reset checkpoint/sample; re-import tạo activation mới bắt đầu hidden. Profile-local booleans dùng localStorage/BroadcastChannel keyed bởi activation/source/index; không thêm vào Core state. Channel chỉ yêu cầu refresh context tương ứng, không nhận lesson/state mới.

Focus: bước hiện tại mạnh, trước đã reveal visible/dim, tương lai không có trong DOM; native XÓA TẬP TRUNG khôi phục đúng disclosure/current state. Toggle Focus chỉ bật/tắt picking mode như baseline. Scoped CSS giữ activity visible bên cạnh native steps; MCQ vẫn full-width vertical, instruction riêng.

## Gate, candidate và giới hạn

Targeted26checks PASS; 126 hidden/full viewport cases +3sample/compare cases; boundary19cases PASS; Legacy/Geometry/Algebra regression PASS; fresh ZIP targeted26checks +58served assets exact byte +native modal smoke PASS. Hai P2 Phase6 đã FIXED/retest; open Phase6 P0/P1/P2/P3=0. Các finding Geometry được giữ nguyên, không cộng/trừ giả vào Phase6.

Candidate `WEB_LIVE_INFORMATICS_PHASE6_CANDIDATE.zip`, SHA256 `d67c062b5bd7b431e92918698c3c47b04e71c783cfeeaa8a20f20e909e12ea5e`, 50,116,564bytes. Test trước packaging gate PASS; ZIP CRC/manifest exact tested payload và fresh unpacked native test PASS. Năm báo cáo ở ngoài ZIP là tài liệu release hiện hành. Docs/checksums Phase3/4/5 được kế thừa trong payload là lịch sử, không đại diện SHA Phase6.

Browser Chromium 151.0.7922.173 trên Linux. Native Windows/TV vật lý/cuối lớp/âm thanh TTS/thử lớp 45phút UNRUN. Fixture synthetic, không SGK/real SOẠN_TRƯỚC validation. Cấu hình startup lưu draft only; review/save/Publish trong Environment Settings để áp dụng, fresh-task restoration chưa xác minh.
