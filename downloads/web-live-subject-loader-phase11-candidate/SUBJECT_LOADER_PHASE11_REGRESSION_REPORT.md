# Phase11 — four-profile regression

REGRESSION = PASS on cloud Chromium. Native Core/Profile/TV/common/teacher.js/zip.js and all lesson/assets byte-identical Phase9; full source delta gate protects all 1.239 inherited files ngoài hai Loader files. Không chỉ so sánh vài protected names.

| Profile | Check groups | Result | Semantic comparison normalization |
|---|---:|---|---|
| GEOMETRY | 14 | PASS | Only per-load lessonActivation UUID; within-run Teacher/TV/preview parity remains exact |
| ALGEBRA | 20 | PASS | NONE |
| INFORMATICS | 26 | PASS | Only manual video playback currentTime; both playback >0 assertions executed |
| LEGACY | 15 | PASS | NONE |

REGRESSION_COMPARISON.json đối chiếu exact semantic JSON với completed Phase9 reference results. Geometry bỏ only per-run random lessonActivation UUID, vẫn assert exact same activation trong Teacher/TV/preview của từng run. Informatics bỏ only manual video currentTime, vẫn chạy playback >0 assertions. Legacy và Algebra không normalization. Không dùng screenshot pixel hash để tuyên bố visual equality; captures/overflow/layout assertions nằm trong raw result artifacts.

Legacy coverage: 5 existing bundled packages TIN6_W04, TIN6_W05, TIN8_W04 và 2 Geometry Legacy variants; hidden/full screens, native pedagogical sequence, TV preview parity, vertical MCQ/no clipping theo suite. Geometry coverage: G4-F01 approved fixture, persistent base figure, GT/KL, progressive analysis/proof, object links, Focus, native zoom/layout, annotation scope, reset, conclusion, no future proof. Algebra: authored math/MathJax, native step/focus/diagram/disclosure, no future steps. Informatics: instruction/checkpoint/sample, independent sample control, code/algorithm/table/media, Focus, hints/answers, Future code/sample/teacher-private separation. Synthetic fixtures chỉ interface tests, không chứng nhận SGK/PPCT/real files.

GEOMETRY_LOAD = PASS
ALGEBRA_LOAD = PASS
INFORMATICS_LOAD = PASS
LEGACY_LOAD = PASS
SUBJECT_MISMATCH_BLOCK = PASS
TRANSACTIONAL_LOAD = PASS
PROFILE_STATE_RESET = PASS
LEGACY_RUNTIME_REGRESSION = PASS
GEOMETRY_PROFILE_REGRESSION = PASS
ALGEBRA_PROFILE_REGRESSION = PASS
INFORMATICS_PROFILE_REGRESSION = PASS
NO_TEACH_AHEAD_GLOBAL = PASS

Quick-access/Safeguard switch tests sau disclosed answer/sample/Focus/zoom xác nhận new profile hidden/fresh state, no stale proof/hint/answer/Focus/CSS. Recent reopen dùng native start/reset qua same Loader pipeline. Preference/history/lastOpened không đi vào Core teaching packets hoặc TV. Package subject text/file/folder không quyết định engine; missing subject_engine vẫn Legacy.

Source ZIP Phase9 SHA before/after = 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1; frozen root 1.241 files exact. New candidate SHA = 1a04b5e9ae52068e9bf7d194b0767f233e0aecab3a17dd490ff2606178005954; file count1.241; unchanged1.239, changed2; no added/removed source file. Environment Settings unchanged/unpublished. Production/main untouched; delivery branch riêng chứa candidate và reports, không merge.

P0=0, P1=0. P2=1 retained capacity limit, không assertion failure: quota guard expected load block PASS nhưng không tăng essential storage capacity. P3=0. G4-F02/F04 OPEN_DEFERRED, G4-F03 FIXED, G4-F05 VALIDATION_PENDING và REAL_FILE_VALIDATION NOT_RUN_BY_GV_DECISION giữ nguyên; excluded khỏi new Phase11 defect counts, không tự resolve inherited items.

WINDOWS_PHYSICAL_RUNTIME = UNRUN
PHYSICAL_TV_VALIDATION = UNRUN
REAL_CLASSROOM_TRIAL = UNRUN

STOP. Không Production/Phase tiếp theo.
