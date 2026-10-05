# Phase9 — Test evidence

Linux Chromium 151.0.7922.173, existing Node/Playwright/static Python runtime. Windowsphysical/physicalTV/realclassroom UNRUN. No new install/build or Environment Settings writes. Use NODE_PATH=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules.

## Targeted groups — actual executions

TARGETED_RESULTS.json / TARGETED_RUN.log = PASS, 15groups:
- Explicit subject selection required before any load = PASS
- GEOMETRY/ALGEBRA/INFORMATICS/LEGACY matches: explicit staged commit and correct profile indicator = PASS
- Three required cross-subject mismatches BLOCKED; old lesson/reveal/Focus/zoom/storage exact = PASS
- Metadata-only preview includes present grade/week0/period/title/engine; text-safe, no inferred absent fields = PASS
- Missing subject_engine uses Legacy despite misleading file name/subject/content; absent metadata not invented = PASS
- Invalid/unknown/empty engine BLOCKED; legacy/default and normalized supported metadata valid = PASS
- Invalid JSON/screens/assets + corrupt ZIP/missing lesson/invalid ZIP JSON/missing ZIP image/CRC error BLOCKED; no partial persist/load = PASS
- ZIP-contained authored Informatics image asset decoded/staged and rendered through unchanged profile = PASS
- Latest selection wins; canceled/stale async read cannot commit or replace current lesson = PASS
- Persistence failure rollback restores library/lesson storage; active lesson state exact = PASS
- Unexpected commit-start failure restores previous lesson/disclosure/Focus/controller state and saved library (native sync version may advance) = PASS
- Commit UI preflight error restores saved library, preserves active TV/indicator and makes the error visible = PASS
- Geometry→Algebra→Informatics→Legacy→Geometry: correct TV routing/reset; no stale proof/hint/answer/Focus/CSS = PASS
- Saved library selection also stages/validates and requires explicit load = PASS
- Zero page runtime errors/external requests; preview never auto-commits, no pedagogical generation or TV teaching-ahead = PASS

Four matching profiles, three required mismatches, seven invalid-engine forms, legacy/default/normalized ids; six original malformed JSON/screen/image/media probes plus invalid embedded image; five ZIP corruption/missing/JSON/image/CRC probes; authored ZIP media success; async latest-wins/close; simulated storage quota; injected prepublish native start exception; injected library UI-preflight failure; Geometry→Algebra→Informatics→Legacy→Geometry with dirty annotation/proof/zoom/layout/math Focus and confirmed checkpoint/sample; saved-library gating. Native popup TV and embedded Preview used with original controls. Private/future/sample disclosure covered also by profile regressions. Collected page runtime errors/external runtime requests =0.

Failed-load snapshots compare lesson bytes, activation/index, hint/answer/proof/Focus/zoom/layout and saved storage. Native stateVersion counter normalized in stored sync record, and only two TTS transport registry/status keys omitted because native ready/cancel updates them independently; semantic state/storage remains exact. Unexpected restored native start may re-sync and advance version, explicitly recorded. No product assertion removed to obtain PASS.

Screenshots: SUBJECT_LOADER_PREVIEW.png and SUBJECT_LOADER_MISMATCH.png; final packaged versions also included. Visible four-step Teacher UI, small actual-profile indicator, green valid message and multiline mismatch with disabled button. Native Close/reopen supported.

## Fresh regression / commands

Reference RC1 root /workspace/phase7-multi-profile-integration/packaged-smoke/WEB_LIVE_MULTI_PROFILE_RC1 served8782; Phase9 working root served8783. External helpers under REGRESSION/RC1 and REGRESSION/PHASE9. Geometry uses existing auxiliary approved G4-F01 corrected ZIP unchanged. Algebra/Informatics use bundled synthetic fixtures; Legacy five original ZIP packages.

node /workspace/phase9-subject-loader/targeted-loader.cjs
Geometry helper: node REGRESSION/<target>/geometry-runtime.cjs (root/port bound in helper).
Algebra helper: WEB_LIVE_ALGEBRA_ROOT=<root> WEB_LIVE_ALGEBRA_BASE=<url> node REGRESSION/<target>/targeted-algebra.cjs.
Informatics helper: INFORMATICS_ROOT=<root> INFORMATICS_BASE=<url> INFORMATICS_EVIDENCE=<external-out> node REGRESSION/<target>/targeted-informatics.cjs.
Legacy helper: WEB_LIVE_TEST_ROOT=<root> WEB_LIVE_BROWSER_BASE=<url> PHASE2_EVIDENCE=<external-out> node REGRESSION/<target>/engines.cjs.
All commands from audit directory with NODE_PATH set; no evidence written inside frozen/candidate payload. Phase9 import-driving helper adds actual subject selection and explicit load; profile assertions unchanged. Main helpers may call native start/direct TV rendering for independent inherited presentation fixtures, while targeted tests enforce new public Loader path.

## Preserved harness diagnoses

HARNESS_HISTORY/ATTEMPT1: initially compared unrelated TTS transport counters and native sync-version exactly while TV-ready/modal cancellation advanced them. Semantic lesson/disclosure/storage unchanged. External snapshot now compares semantic native state and exact lesson/library, excluding only those transport fields. No application patch for that diagnosis.
HARNESS_HISTORY/LEGACY_IMPORTER_CLOSED: existing Legacy helper closes modal before loading; new visible select action needed explicit showImporter(). External helper corrected to open native modal then choose Legacy/commit. Original failure/helper preserved; final entire Legacy suite rerun PASS. No disabled profile assertion.

## Packaged candidate and scope

PREPACKAGE_GATE.json = PASS; candidate ZIP CRC/extracted1241file hashes exact. PACKAGED_SMOKE/TARGETED_RESULTS.json = PASS,15groups on fresh candidate at8784. PACKAGED_SMOKE/PACKAGED_ASSETS.json = PASS,60served runtime/profile/MathJax/media/fixture resources and native modal lifecycle; hashes match extracted payload. RELEASE_GATE.json PASS. RC1_INTEGRITY.json unchanged approved ZIP+all1239reference files. SOURCE_SCOPE.json only2existing changes+2new files; all Core/profile/pedagogy files unchanged.

Package SHA256 32afaf838e2bd598fe1a5a6180105f82d2ceefd2312ec58b993081e91fd0f5d1. Physical acceptance and actual SGK/SOẠN_TRƯỚC packages remain unvalidated; waived >32MiB files not requested. Environment startup draft revision12 unchanged, DRAFT_PENDING_SAVE_PUBLISH.
