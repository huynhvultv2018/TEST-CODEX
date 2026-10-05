# Phase 12 — Test evidence

Chromium 151.0.7922.173, Linux managed cloud, Playwright. Tests viết/chạy ngoài candidate. Không Windows runtime hay TV vật lý.

| Suite | Groups | Result | Raw evidence |
|---|---:|---|---|
| workingLibrary | 21 | PASS | LIBRARY_RESULTS.json |
| workingQuick | 16 | PASS | QUICK_ACCESS_REGRESSION/QUICK_ACCESS_RESULTS.json |
| workingSafeguards | 15 | PASS | SAFEGUARDS/TARGETED_RESULTS.json |
| packagedLibrary | 21 | PASS | PACKAGED_LIBRARY/LIBRARY_RESULTS.json |
| packagedQuick | 16 | PASS | PACKAGED_QUICK_ACCESS/QUICK_ACCESS_RESULTS.json |
| packagedSafeguards | 15 | PASS | PACKAGED_SAFEGUARDS/TARGETED_RESULTS.json |

660 synthetic lessons:4profiles ×4grades(6–9) ×5weeks(1,2,5,10,11) ×4periods(1,2,9,10) ×2variants =640complete, cộng5missing per profile =20incomplete. Legacy thiếu subject_engine; lesson content/title cố ý có tín hiệu gây nhiễu; clone/catalog metadata lệch không được thay source truth. Bài trùng title+gwp có2IDs. Đây là TEST ONLY, không dữ liệu SGK.

21 library groups kiểm: empty library/no phantom values; numeric grade/week/period sort; four subject groups; cascade narrowing/reset; missing field visibility và no false metadata; missing option narrowing; list stability after reverse catalog; duplicate identification; actual cached metadata priority; subject/filter preserving actual Teacher/TV snapshot; zero filter storage writes; cancel pending; disappeared reference clears stale selection; Recent shared pipeline/reset; common5actions; reload native session behavior; rememberedSubject-only không auto-load; all metadata absent still loadable; zero runtime/external errors. Screenshots1366/1280/1920 + validated preview nằm trong evidence ZIP.

Common scenario actions=["open System group", "open existing Loader", "choose Grade8", "choose lesson", "explicit validated LOAD"]. Working và packaged đều5meaningful /6modeled mouse clicks, một modal, zero file-browser steps. selectOption là native dropdown automation, chưa kiểm chuột Windows. Ca đầu tiên visible trước click và explicitLoad visible sau preview được assert; arbitrary scroll/search/reading không có bảo đảm ≤5.

Performance observational only: working [{"operation": "select subject / render large library", "elapsedMs": 527, "libraryCount": 660}]; packaged [{"operation": "select subject / render large library", "elapsedMs": 434, "libraryCount": 660}]. Không benchmark physical/acceptance threshold; mỗi render đọc current metadata, tránh cache stale.

Quota: actual Chromium capacity reached at 4745641 stored characters working /4745641 packaged trong ca fixture. Essential commit bị block đúng; current Teacher/TV và unknown storage sentinel giữ nguyên, Recent không thêm failed lesson, warning visible. Fault injection lesson/library/snapshot failures preserve current; optional quota/security quick-access failures giữ successful load và warning sau modal close. Capacity limit vẫn tồn tại; test không tăng quota/xóa package.

Inherited safeguards15groups gồm four profile routing/mismatch, invalid metadata/packages/missing assets, preview not commit, rollback lỗi persistence/start/UI preflight, profile reset/TV no stale state, no teach ahead. G4-F01 patched real representative fixture được dùng nguyên byte (SHA2564488b1997e416fa634a577900af76fff1dbf17de1eb4bd62eee3a772df7bcab8); không patch lesson package mới.

Fresh extracted artifact được kiểm ZIP CRC/full manifest1241files, target52groups lặp trên root/port riêng và60runtime/vendor/media assets HTTP byte-identical + modal close/reopen/close. Four regressions chạy một lần trên working; allpayloadhashes exact chứng minh fresh artifact cùng implementation, không tuyên bố đã lặp tất cả75groups trên ZIP.

HARNESS_HISTORY giữ run đầu thất bại vì helper giả định lesson=null sau reload. Frozen pedagogy-teacher.js đã có accepted-session restore; helper sửa để assert cùng accepted current ID + hidden disclosure và thêm fresh quick-subject-only context lesson=null. Không runtime change cho lỗi helper, không bỏ safeguard assertion.

WINDOWS_PHYSICAL_RUNTIME=UNRUN; PHYSICAL_TV_VALIDATION=UNRUN; REAL_CLASSROOM_TRIAL=UNRUN. Inherited waived Ti09/Ti10 real-file test không re-run hay convert thành PASS.
