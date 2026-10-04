# Geometry real-lesson validation

## Provenance và tính thực tế

Bài 12 — Hình bình hành, Dấu hiệu nhận biết; metadata Hình học 8, tuần 4, tiết 7. Bài có kiểm tra cũ (screens 1–2), dẫn bài (3), dấu hiệu nhận biết (4–5), Ví dụ 2 (6–11), Luyện tập 2 (12–20), Thực hành/Định lí 3/Ví dụ 3 (21–26), Luyện tập 3 (27–29), Vận dụng (30–33), củng cố/BTVN (34–35). Screens ở báo cáo là 1-based; JSON index là 0-based.

| File đã có trong candidate | SHA256 | Vai trò |
|---|---|---|
| HINH_HOC_8_T04_T07_DUAL_VISUAL_TEST.zip | 86f95e57641647c3441f615cd6f5e3437c0e509afc2d13e030781ce9a23cf033 | Source thực tế có sẵn, 35 screens, resolver Legacy |
| HINH8_VD2_GEOMETRY_PROFILE_TEST.zip | b502802ab694aa4ee2cc57bb7e053a06fd534580d8d7285f8a55d91428945bd7 | Enrichment Phase 3, cùng nội dung/assets, resolver Geometry |

Không chỉnh bất kỳ byte của hai package. Manifest ghi WEB_LIVE v0.3 và “Gói thử hai loại hình — Ví dụ 2”. Có 15 raster assets giống hệt và manifest giống hệt. Chưa có nguồn SGK/PPCT để độc lập xác nhận scope/đáp án; đây là validation nội dung đã có, không xác nhận lại curriculum và không tự tạo SOẠN_TRƯỚC.

## Thành phần pedagogy

| Yêu cầu | Nguồn đã có / đánh giá |
|---|---|
| Kiểm tra cũ, dẫn bài, quan sát | Screens 1–6: có sẵn, không thêm giả |
| Hình gốc, GT/KL | VD2 screen 6: từ ảnh và metadata, đọc rõ ở equivalent viewports |
| Sơ đồ phân tích | Screen 8: 4 analysisSteps thật, reveal theo thứ tự |
| Proof nhiều bước và highlight | Screen 10: 2 bước thật với segment/angle → triangle links |
| Kết luận | Screen 11: giữ VD2 và highlight AH/CK/HC/AK |
| Luyện tập/vận dụng | Có sẵn nhiều bài, nhưng hình sau LT2 bị giữ sai, BLOCKING |

## SOẠN_TRƯỚC → packet → runtime

1. Nhập original ZIP: tự đọc assets thành imageData, chọn Legacy; không tự suy luận Geometry từ subject “Hình học”.
2. Nhập enrichment Phase 3: tự đọc assets, chọn Geometry, không cần chỉnh data sau nhập. MANUAL_INTERVENTION_COUNT=0 trong thao tác runtime này.
3. Enrichment trước đó cần subject_engine, registry 2 figures/23 objects và metadata cho 8 screens, tổng 10 metadata blocks. Có 8 rows liên kết analysis/proof. Không có bằng chứng producer SOẠN_TRƯỚC tự sinh toàn bộ dữ liệu này; END_TO_END_MANUAL_INTERVENTION_COUNT=UNRUN.
4. Registry chỉ hoàn thiện VD2, LT2 không có objects; thiếu figure scope transitions cho TT2, VD3, LT3 và VDU. Không thể coi packet đó là Geometry full-lesson export đã nghiệm thu. G4-F01/F05.

49 answer/proof blocks được mở; 4 có authored proof links và đều thuộc VD2. Một số câu trả lời ngắn không cần object links; các proof thực tế ở LT2/LT3/VDU chưa được liên kết metadata. Không tự bổ sung links trong Phase 4.

## Full lesson walk và mismatch

Đi toàn bộ 35 screens bằng native keyboard/buttons. 6 VD2 screens có cùng base image hash/scope. Đến screen 12 chuyển LT2 đúng. Screen 21 cần ảnh TT2_H333.png, 24 cần VD3_H334.png, 27 cần LT3_Hinh.png và 30 cần VDU_H327.png; cả bốn vẫn render LT2_H332.png (SHA f2dabdd956f7499d913e222756f161243799c295747768188f8bb073076c75b4). Trace có ownImageSha256 và imageSha256 để kiểm chứng, cùng screenshots.

Compile timeline Geometry vẫn giữ LT2 khi packet không reset/chọn figure mới; visual adapter ưu tiên current registry image. Việc giữ base đúng ở VD2 không đủ để chứng nhận toàn tiết. **REAL_LESSON_VALIDATION=NOT_PASS.** Không sửa ảnh, scope, lesson hoặc code. Recommendation là review authoring/contract toàn bài sau phê duyệt riêng.
