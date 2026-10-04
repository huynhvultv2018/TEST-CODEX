# Windows runtime — Runbook cho R1 đóng băng

Bộ này chuẩn bị nghiệm thu; không chứa kết quả Windows đã chạy, không chỉnh source và không bổ sung feature. Dùng nguyên ZIP R1. Giữ hồ sơ/evidence ở thư mục khác bên ngoài bản giải nén. Không chép script/log mới lên source để giả source nguyên vẹn.

## Chuẩn bị

Cần Windows thật, Python 3.10+/py -3, Google Chrome, giọng Việt native của Chrome, tai nghe/loa và TV/monitor Extend mode. Không dùng Wine, Windows container, mocked speech hoặc process fake để chứng nhận. Ghi người kiểm, thời điểm, Windows/Chrome/Python version, voice name/lang/localService, audio device, số màn hình và thứ tự Primary/TV.

ZIP R1 hiện có mapping exe Word/GeoGebra trống. **Chưa tự cấu hình:** yêu cầu hiện tại đóng băng cả candidate. Nếu cần provisioning per-machine launcher_apps.json để test app, phải thống nhất ngoại lệ cấu hình trước; giữ ZIP gốc, ghi config-before/config-after ngoài candidate và bảo đảm không đổi source. Không thể báo B2/B3/B4/C5 PASS khi exe mapping vẫn trống. Không sửa installationKey/runtime-config hoặc lesson.

Giải nén toàn bộ ZIP riêng. Dừng dịch vụ WEB LIVE cũ bằng Ctrl+C trong cửa sổ của nó. Không kill Chrome/Word hoặc dịch vụ khác tùy tiện. Kiểm tra port cũ trước C1; nếu đang có root khác, đóng đúng phiên đó trước relocation. Ghi browser tabs/server/process counts trước/sau; Chrome có nhiều process thường là bình thường, không tự kết luận duplicate chỉ từ count.

Dùng PowerShell để kiểm ZIP (lệnh read-only; thay đường dẫn theo vị trí file của máy):

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath '.\WEB_LIVE_TEACHER_TV_PEDAGOGY_UI_HOTFIX_R1_CANDIDATE.zip'
py -3 --version
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | Where-Object { $_.LocalPort -in 47381,47382 } | Select-Object LocalAddress,LocalPort,OwningProcess
```

SHA mong đợi: `96eb673ef1293b99281bca100fca9f5f8a4b2f601558d3e124cb4b1dbd34a2d7`. Ghi hash source/config trước/sau từ HOTFIX_R1_CHECKSUMS_SHA256.txt. Browser localStorage và log phát sinh là runtime output, không sửa file source/static đã có trong manifest. Không chặn ghi runtime bằng việc làm cả thư mục read-only, vì có thể tạo lỗi môi trường ngoài ý muốn. ZIP và các test inputs vẫn đóng băng theo hash.

## Thứ tự chạy

1. C1 clean start trước: Chrome đóng, START_WEB_LIVE.bat từ root giải nén, xác nhận Teacher **http://127.0.0.1:47382/WEB_LIVE/teacher.html**. Không mở file:// và không dùng API port47381 làm trang Teacher. Ghi video/window output, ports, screenshot Teacher.
2. C2 pair: import WEB_LIVE/DEMO_TRUC_TIEP_SAMPLE_LIVE.zip rồi tới màn Word index1. Baseline kích hoạt /status+/pair khi có Demo metadata; không đòi pairing ở màn importer rỗng. Không điền token/sửa path/source. Ghi ready, metadata và app availability thật. Nếu app thiếu, vẫn kiểm được pair; phần app launch ghi chưa chạy.
3. A1–A6: import RC3_PED1_TEST_PACKAGES/TIN6_W04_LIVE_RC3_PED1.zip; màn15/index14 MCQ có 5 block. Chọn voice native, nghe A1; A2 Stop; A3 Next khi speech đang phát; A4 Back; A5 mở/đóng/mở lại TV. Nghe A5 cả trước/sau đóng popup và sau sync/navigation. Kiểm Hint1/2, Answer, Knowledge Close chỉ đọc phần được phép. Ghi âm thanh thực cùng màn hình hoặc nhật ký xác nhận nghe bởi người kiểm.
4. A6 dùng provider Web Speech duy nhất; selector nhiều TTS providers không có trong R1 ghi N/A. Ghi và kiểm mỗi voice thực được chọn, play/stop/screen change. Voice/provider khả dụng trên host không có thì ENVIRONMENT UNAVAILABLE; không mock voices hoặc coi đó là code FAIL.
5. B1/B2 rồi B3 Word/B4 GeoGebra sau khi app/config prerequisites đủ. Cancel phải không launch; Confirm mới mở app. Word đúng demo_word.docx, GeoGebra đúng demo.ggb. Kiểm process/app cửa sổ thật, file đúng, whitelist, không duplicate ngoài reuse thiết kế, WEB LIVE/TV không crash, handoff/return giữ lesson. Nếu app guard chặn vì config trống thì ghi ENVIRONMENT UNAVAILABLE, không giả confirmation.
6. B5: TV không có nút điều hướng/launch Teacher. GV dùng Next/Back trên Teacher và quan sát TV; TV refresh/reopen/reconnect tới Demo, không bấm Demo/Confirm. Theo dõi 0 TV /launch và app không tự mở. Không thêm điều khiển TV chỉ để test. Reconnect Launcher cũng không auto-launch.
7. C3: dừng đúng dịch vụ root cũ, di chuyển toàn bộ thư mục tới Desktop, đổi tên có khoảng trắng, ổ D: nếu có; chạy START lại. Kiểm root/fingerprint bản đang thử, source hashes, HTTP/Chrome/pair. Không có ổ D: ghi ENVIRONMENT UNAVAILABLE cho vị trí đó và vẫn ghi kết quả vị trí đã chạy.
8. C4: Chrome đã mở phiên/tab sẵn; START, pair, chạy START thêm hai lần; kiểm phiên Chrome giữ nguyên, không thêm dịch vụ trùng hoặc lỗi nghiêm trọng.
9. C5: một phiên tích hợp START → Teacher → TV → TTS audible → Demo → Word/GeoGebra thật → trở lại WEB LIVE. Ghi video có âm thanh, steps/screen và app. C5 chỉ chạy khi prerequisites đủ, các ca trước không có FAIL.

## Evidence và khi gặp lỗi

Điền WINDOWS_RUNTIME_TEST_MATRIX.csv hoặc WINDOWS_RUNTIME_RESULTS_TEMPLATE.json. Mỗi PASS/FAIL có actual, operator, executedUTC và đường dẫn evidence. Không ghi người kiểm/thời điểm giả. Dùng tên evidence trong ma trận cho dễ đối chiếu. Screenshot speech state không thay thế việc nghe âm thanh; app available/ready không thay thế app launch/handoff thật. Chỉ lưu request path/method/status cần thiết; che installationKey/token/auth headers, không phát hành HAR chưa xử lý.

Nếu ca FAIL: **dừng**, không sửa R1, không thay expectation/test để ép PASS. Điền:

```text
TEST:
EXPECTED:
ACTUAL:
STEPS TO REPRODUCE:
WINDOWS/CHROME/PYTHON VERSION:
SCREENSHOT/LOG/AUDIO:
```

Chỉ mở R2 đúng subsystem sau evidence; các ca chưa chạy giữ UNRUN. Trước khi gửi kết quả, xác minh ZIP/source hashes vẫn đúng và note riêng runtime output/config provisioning (nếu đã được thống nhất). Cập nhật acceptance từ evidence: tất cả bắt buộc PASS mới READY=YES; không có deployment tự động.

Trong Chrome DevTools Console có thể **đọc** voice/state, không override API hoặc controller:

```javascript
JSON.stringify({userAgent:navigator.userAgent,voices:speechSynthesis.getVoices().map(v=>({name:v.name,lang:v.lang,localService:v.localService}))},null,2)
JSON.stringify({index:i,blocks:ttsUI.blocks.map(b=>({id:b.id,region:b.region,text:b.text})),state:ttsUI.controller.state,error:ttsUI.controller.errorCode},null,2)
```

voices có thể nạp trễ; kiểm lại sau khi voice list thực sẵn sàng. Không in nguyên demoController/runtime-config vì chứa khóa/token.
