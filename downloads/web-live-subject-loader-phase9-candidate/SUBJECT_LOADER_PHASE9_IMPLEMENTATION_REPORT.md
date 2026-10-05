# Phase9 — Subject-aware lesson loader

PHASE9_STATUS = PASS (cloud technical tests). Candidate only; no Production/Phase10.

## Implemented behavior

Teacher now selects HÌNH HỌC / ĐẠI SỐ / TIN HỌC / BÀI CŨ–LEGACY, selects ZIP/JSON or saved lesson, sees metadata preview, then explicitly clicks NẠP BÀI. Valid selection alone never replaces the active lesson. Mismatch shows selected subject and declared lesson subject on separate lines and disables load. Small Teacher indicator reflects the actual active profile; staged selection never changes it. Saved library filtered from actual saved lesson metadata, not titles. Existing built-in sample is accurately presented as Legacy (it has no subject_engine).

Subject truth: only top-level lesson.subject_engine; trimmed/case-normalized supported ids. Missing field or explicit legacy/default means Legacy; present null/nonstring/empty/unknown rejected. No filename, folder, subject-name, question-text or keyword inference. Registry supplies labels/mapping, so future registered subjects can be added without rewriting loading control flow.

## Transaction and integrity

New prepareLessonZip returns parsed lesson/source key/ZIP entries without persistence. Existing importZip API delegates to preparation then saveLesson, keeping backward compatibility for internal consumers. Existing ZIP parser additionally checks entry CRC. Required lesson.json, valid JSON/non-empty object screens, safe ZIP paths/size limits, image references/decoding and declared Informatics media resources validated before any native start. ZIP image media can use data-image supported by unchanged profile. Video embedded only in ZIP cannot be published through the frozen profile's data-video contract; it needs an existing local runtime URL with identical bytes or is blocked. No new media execution/renderer or engine behavior.

Latest asynchronous selection wins; close/change cancels stale pending work. On explicit valid commit, a detached copy is persisted, library UI preflight runs, then unchanged native start performs original activation/reset/render/sync. Persistence/UI failure rolls back saved keys before any new native publication. Unexpected native-start failure restores prior native values/controller model maps and re-syncs the old lesson. Teacher indicator restored as well. No new Core state keys/channel/navigation or profile semantics.

## Source scope

Changed existing files: WEB_LIVE/teacher.html (Teacher loader markup/script/CSS links), WEB_LIVE/zip.js (package preparation/CRC). Added: WEB_LIVE/subject-loader.js, WEB_LIVE/subject-loader.css. Removed: none. 1237 inherited files unchanged; candidate 1241 files.

Core common.js/core-profiles.js/teacher.js, TV HTML/scripts/CSS, state/navigation/sync, every Geometry/Algebra/Informatics/Legacy profile behavior, all lesson fixtures/pedagogy and source teaching materials remain byte-identical. Loader calls/wraps existing public Teacher entry points; native start implementation unchanged. CORE_CHANGE_REQUIRED = NO; WEB_LIVE_CORE_MUTATED = NO. Source classification and hashes in SOURCE_SCOPE.json and payload manifests; no code refactor outside importer/UI scope.

RC1 SHA BEFORE = AFTER = d09db03f88c065d1167030fa5bd45f6467fc464c31d7a228003a20ac28769fc5; RC1_MUTATED = NO. Frozen reference directory all1239file hashes unchanged. Environment Settings revision12 unchanged/unpublished.

## Validation and delivery

15 targeted groups PASS; fresh reference/candidate Legacy15 assertions, Geometry14, Algebra20, Informatics26 PASS. Candidate freshly extracted, all1241file hashes exact; packaged targeted15groups and60served asset hashes/modal lifecycle PASS. RELEASE_GATE PASS. See evidence/regression reports for normalization and retained helper failures.

Candidate: WEB_LIVE_SUBJECT_LOADER_PHASE9_CANDIDATE. SHA256: 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1.

Physical Windows/TV and Phase8 acceptance remain UNRUN/PENDING. No physical/real-classroom/SGK lesson claim. G4-F02/F04 deferred, G4-F03 fixed, G4-F05 pending and waived real-file disposition unchanged. New confirmed Phase9 open P0/P1/P2/P3=0. STOP / WAIT_FOR_GV_APPROVAL.
