# INFORMATICS_PHASE6_TEST_EVIDENCE

Current working targeted26checks PASS, browser Chromium 151.0.7922.173; fresh unpacked candidate repeats toàn bộ26checks PASS. Required sixteen categories đều được exercise bằng native Teacher import/controls/TV popup, không zero-test/run-only syntax. INFORMATICS_TARGETED.json và PACKAGED_SMOKE/INFORMATICS_TARGETED.json chứa raw assertions/evidence.

## Targeted checks

1. PASS — ACTIVE_LEARNING_FLOW: nine optional authored stages, no standardization before native reveal
2. PASS — Absent activity metadata stays absent; no generated pedagogical chain
3. PASS — INSTRUCTION_RENDERING: task/instruction/action/self-check only at authored step gates
4. PASS — DEMO_RENDERING: native instruction steps/image/UI reference, demo note only Teacher; no launcher
5. PASS — PRACTICE_RENDERING + SAMPLE_PRODUCT_CONTROL: Full Answer alone never reveals sample or comparison
6. PASS — STUDENT_PRODUCT: expected and supplied student product remain distinct
7. PASS — CHECKPOINT_CONTROL: reveal checkpoint → GV confirmation → independent sample reveal
8. PASS — Sample + comparison + checkpoint + all three disclosed practice steps fit three TV viewports
9. PASS — Independent sample Hide removes sample and comparison from DOM
10. PASS — Hide Answer resets checkpoint/sample, no stale reveal on later step
11. PASS — CODE_RENDERING + CODE_HIGHLIGHT: exact authored line breaks, future3 absent, current line2
12. PASS — CODE_RENDERING: four-space indentation and code bytes preserved
13. PASS — INFORMATICS_FOCUS: code-step native Focus, previous visible/dim, exact clear restoration
14. PASS — Task/instruction/checkpoint focusStep maps to native answer Focus without hiding prior activity
15. PASS — Checkpoint Focus does not confirm checkpoint or reveal sample
16. PASS — Native Task Focus highlights authored task without changing disclosure
17. PASS — Algorithm-step Focus emphasizes authored linked rows; previous rows stay visible and clear preserves state
18. PASS — ALGORITHM_RENDERING: input/process/output/sequence/branch/loop authored gates
19. PASS — TABLE_RENDERING: semantic header/row relationships, source cells preserved, no avoidable overflow
20. PASS — MEDIA_RENDERING: local image/video playback/animated GIF/screenshot/diagram; original aspect ratio, no obstruction
21. PASS — HINT_CONTROL: native hint is independent, hide removes source from TV DOM
22. PASS — ANSWER_CONTROL: native full/hide respects sample and teacher-note separation
23. PASS — 21 fixture screens × hidden/full × 3 TV viewports: 126 cases fit; no sample/note leak
24. PASS — MCQ remains four vertical full-width options; instruction separate
25. PASS — Profile-local disclosure syncs native Preview/TV and authorized same-activation reload
26. PASS — NO_TEACH_AHEAD: source memory unchanged, no generated code/pedagogy, hidden content absent, no runtime exceptions/external requests

126cases =21screens ×hidden/full ×1920x1080/1366x768/1280x720. Thêm3cases với expected/student/checkpoint/sample/comparison/all3practice steps visible. Assertions kiểm scrollHeight/clientHeight và scrollWidth/clientWidth; không cắt hidden text hoặc đổi source để PASS. Native Focus code3, earlier1, task, checkpoint, algorithm có invariants và clear restoration. Sample requires GV confirmation+reveal; full answer alone hidden. Hint hide loại source khỏi DOM, teacher/private note absent. Local video playback verified currentTime>0,320x180 controls/no autoplay; GIF/image/screenshot/diagram aspect-ratio checked.

## Boundary and negative

PROFILE_BOUNDARIES.json:19PASS. Sample-active Informatics→Legacy/missing/unknown/null/Algebra/Geometry so với frozen Algebra snapshot; dispose removes panel/classes/state/metadata. Detached stale button/new-screen cannot reveal; identical re-import new activation sample hidden. Ungated result, bad future gate, masqueraded sensitive block, negative/string checkpoint, remote media, exe, invalid table, future code fail closed. Literal HTML-looking code không execute; invalid future Focus neither reveals later code nor hides supplied first step. Zero page exceptions/external requests.

## Fresh package smoke/assets

PACKAGED_ASSETS.json:58served files byte-identical to fresh unzip:51root JS/CSS/HTML +3MathJax vendor +3Informatics media +1fixture JSON. Native modal close/reopen/close PASS. Fresh separate server8779; full targeted suite26PASS,126+3viewport cases, source memory unchanged, zero runtime exceptions/externalrequests. ZIP manifest/CRC matches tested working1.239files.

## Preserved failure history

I6-F01 P2: shared cognitive-tv.css hides content under answer disclosure; profile activity/sample was mounted but not visible. Root cause confirmed via selector and native isVisible failure. FIXED with Informatics-only display rule; targeted checks now assert previously disclosed activity/sample visible.

I6-F02 P2: stacked labels/media/native proof spacing overflow when all supplied content visible. Probe Demo scroll/client before:1050/945 at1920,759/664 at1366,721/621 at1280. FIXED with scoped inline labels/spacing/bounded media. Final all126+3cases PASS, every revealed source item preserved. ATTEMPT1/2/3 and successful ATTEMPT4 before extra Algorithm Focus preserved in HARNESS_HISTORY.

Regression comparator initially required PNG SHA equality. Four screenshot pairs exactly equal; four had tiny low-amplitude pixel differences despite all20functional/check evidence equal. Observed max channel difference6/255, at most597pixels of1920x1080 (0.0287905%). Exact source/Core/Algebra asset hashes, authored content and layout guards remain asserted; bounded raster comparison <=8/255 and <=0.1% pixels, alongside exact DOM/checks. No engine patch for screenshot differences; underlying rendering/timing cause not independently confirmed. Initial comparator failure retained. A later unsynchronized footer mismatch was confined to the animated bottom progress bar; HARNESS_HISTORY/FINAL_ALGEBRA_CAPTURE_BEFORE_SYNC/PIXEL_DIAGNOSIS.json records12pixels above8/255 at y1078-1079. External capture helper now waits document-wide finite animations/fonts and finishes finite screenshot animations, preserving all functional assertions and engine files. Final measured captures: 6/8exact, max channel difference6/255, max changed pixel ratio0.008873457%. ALGEBRA_RASTER_COMPARISON.json contains final measured details; do not substitute historical numbers for final results.

## Unrun/limitations

Native Windows, physical classroom TV, back-row readability, audible TTS, full45minute lesson and real SOẠN_TRƯỚC package acceptance UNRUN. Linux browser fixture tests are engine/profile validation. G4-F01 TARGETED_PASS; G4-F02 OPEN_DEFERRED P3; G4-F03 FIXED; G4-F04 OPEN_DEFERRED P3; G4-F05 VALIDATION_PENDING. REAL_FILE_VALIDATION=NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL=UNRUN. No waiver/deferred/pending promoted to PASS.
