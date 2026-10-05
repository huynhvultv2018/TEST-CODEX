# Phase8 — Acceptance risk register

PHASE8_STATUS = PENDING_PHYSICAL_ACCEPTANCE.
PRODUCTION_READINESS = NOT_ESTABLISHED.

No physical device accessible from this Linux environment. No physical test ran; no new application failure reproduced. Confirmed new findings P0/P1/P2/P3 counts = 0/0/0/0; these are counts of evidence-backed reports, not evidence of a clean physical runtime.

Pending prerequisites: actual GV Windows machine and teaching TV, completed result form, exact machine/display metadata, physical logs/photos/video and before/after Windows ZIP SHA. Owner: GV physical tester. This access limitation is not classified as an application P0/P1 defect, so no invented NOT_PASS result or root cause.

Known accepted items retained: G4-F02 OPEN_DEFERRED, G4-F03 FIXED, G4-F04 OPEN_DEFERRED, G4-F05 VALIDATION_PENDING. No new physical evidence. Observe if present, no patch. REAL_FILE_VALIDATION NOT_RUN_BY_GV_DECISION; REAL_CLASSROOM_TRIAL UNRUN. Environment startup instructions DRAFT_PENDING_SAVE_PUBLISH unchanged.

When an issue is observed, record finding id, exact fixture/screen/test step, expected/actual, reproduction steps and count, evidence, owner (engine/profile/lesson package/Windows setup/TV settings/UNKNOWN), severity P0/P1/P2/P3 and root-cause confirmation separately. Do not infer engine cause from a missing setup/media path or TV scaling symptom. P0/P1 means Phase8 NOT_PASS; P2/P3 wait GV PATCH/DEFER decision. MARGINAL readability must retain evidence and cannot silently become PASS. No patch/feature/Production automatically.

A sample/test fixture failing import must be classified with evidence; never modify frozen engine or fixture to hide failure. Do not build a replacement EXE or bypass a failed startup to mark startup PASS. If fallback is tested, log original failure and separate fallback result.
